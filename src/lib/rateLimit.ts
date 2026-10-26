// src/lib/rateLimit.ts
// 共用的每日IP額度限制：用MongoDB atomic findOneAndUpdate同時處理計數+檢查，
// 避免「先查再寫」在並發請求下都通過檢查的race condition
import clientPromise from '@/lib/mongodb';

export async function checkDailyIpLimit(
  collectionName: string,
  ip: string,
  limit: number
): Promise<boolean> {
  try {
    const taiwanDate = new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString().slice(0, 10);
    const client = await clientPromise;
    const col = client.db().collection(collectionName);

    const result = await col.findOneAndUpdate(
      { ip, date: taiwanDate },
      { $inc: { count: 1 } },
      { upsert: true, returnDocument: 'after' }
    );
    return (result?.count ?? 1) <= limit;
  } catch {
    return true; // MongoDB 掛掉時不擋用戶
  }
}

// ── 寄信端點防洗信（同步自ST 2026-10-25 src/lib/rateLimit.js）──
// 同IP、同email各60秒內只能觸發一次，另外每email每小時上限5次。in-memory計數，
// 不保證serverless多實例間共享；DB層的per-email冷卻仍保留作為第二道。
const buckets = new Map<string, { count: number; resetAt: number }>();

// 不可信任x-forwarded-for最左值（client可偽造）：優先用Vercel平台覆寫的標頭，再取XFF最右段。
export function getClientIP(request: Request): string {
  const vercelIP = request.headers.get('x-vercel-forwarded-for');
  if (vercelIP) return vercelIP.split(',').pop()!.trim() || 'unknown';
  const realIP = request.headers.get('x-real-ip');
  if (realIP) return realIP.trim() || 'unknown';
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',').pop()!.trim() || 'unknown';
  return 'unknown';
}

export function checkRateLimit(key: string, { maxRequests, windowMs }: { maxRequests: number; windowMs: number }): boolean {
  const now = Date.now();
  for (const [k, v] of buckets.entries()) {
    if (now > v.resetAt) buckets.delete(k);
  }
  let bucket = buckets.get(key);
  if (!bucket || now > bucket.resetAt) {
    bucket = { count: 0, resetAt: now + windowMs };
    buckets.set(key, bucket);
  }
  if (bucket.count >= maxRequests) return false;
  bucket.count++;
  return true;
}

export const MAIL_COOLDOWN_MS = 60 * 1000;
export const MAIL_HOURLY_LIMIT = 5;

export function checkMailSendLimit(
  route: string,
  { ip, email }: { ip?: string | null; email?: string | null }
): boolean {
  if (ip && !checkRateLimit(`${route}:cd-ip:${ip}`, { maxRequests: 1, windowMs: MAIL_COOLDOWN_MS })) return false;
  if (email) {
    const e = String(email).toLowerCase().trim();
    if (!checkRateLimit(`${route}:cd-email:${e}`, { maxRequests: 1, windowMs: MAIL_COOLDOWN_MS })) return false;
    if (!checkRateLimit(`${route}:hr-email:${e}`, { maxRequests: MAIL_HOURLY_LIMIT, windowMs: 60 * 60 * 1000 })) return false;
  }
  return true;
}
