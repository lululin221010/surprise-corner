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
