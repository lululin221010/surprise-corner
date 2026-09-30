// GET /api/cron/fb-comments
// 每天由 Vercel Cron 呼叫一次：檢查 FB 粉專＋IG 最近貼文有沒有新留言，有就寄信通知（沒有就不寄）
// 起因（2026-09-30）：9/7「最後的信號」貼文 9/10 有人留言「怎麼沒有連結」，20天沒人發現
// 已通知過的留言記在 fbCommentsSeen（FB/IG 共用），避免重複寄
// IG token（Instagram Login，60天效期）存在 socialTokens.ig，超過7天自動 refresh；首次用 env IG_ACCESS_TOKEN
import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import clientPromise from '@/lib/mongodb';

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM = '驚喜角落留言通知 <lulu@stilltimecorner.com>';
const NOTIFY_TO = process.env.COMMENT_NOTIFY_EMAIL || 'lululin221010@gmail.com';
const GRAPH = 'https://graph.facebook.com/v21.0';
const IG_GRAPH = 'https://graph.instagram.com/v21.0';
const LOOKBACK_DAYS = 14; // 只看最近兩週發的貼文
const IG_REFRESH_DAYS = 7;

type Found = { id: string; platform: 'FB' | 'IG' | 'Threads'; postText: string; text: string; who: string; at: string; link: string };

// IG / Threads 長效 token 約 60 天，存在 socialTokens，超過7天自動換新；首次用 env
const REFRESH = {
  ig: { env: 'IG_ACCESS_TOKEN', url: (t: string) => `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${t}` },
  threads: { env: 'THREADS_ACCESS_TOKEN', url: (t: string) => `https://graph.threads.net/refresh_access_token?grant_type=th_refresh_token&access_token=${t}` },
};
async function getToken(db: any, key: 'ig' | 'threads'): Promise<string | null> {
  const col = db.collection('socialTokens');
  const doc = await col.findOne({ _id: key } as any);
  let token: string | undefined = doc?.token || process.env[REFRESH[key].env];
  if (!token) return null;
  const last = doc?.refreshedAt ? new Date(doc.refreshedAt).getTime() : 0;
  if (Date.now() - last > IG_REFRESH_DAYS * 86400000) {
    const r = await fetch(REFRESH[key].url(token), { cache: 'no-store' });
    const j = await r.json().catch(() => ({}));
    if (j.access_token) {
      token = j.access_token;
      await col.updateOne({ _id: key } as any, { $set: { token, refreshedAt: new Date(), expiresIn: j.expires_in } }, { upsert: true });
    } else if (!doc) {
      // 新發的 token 24 小時內不能 refresh，先記下來，下次再換
      await col.updateOne({ _id: key } as any, { $set: { token, refreshedAt: new Date(0) } }, { upsert: true });
    }
  }
  return token || null;
}

export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get('authorization') !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  // ?days=N 可手動加大回看範圍（測試/補抓用，上限60天）
  const qDays = Number(new URL(request.url).searchParams.get('days'));
  const days = qDays > 0 ? Math.min(qDays, 60) : LOOKBACK_DAYS;
  const sinceMs = Date.now() - days * 86400000;
  const since = Math.floor(sinceMs / 1000);

  const client = await clientPromise;
  const db = client.db('SurpriseCornerDB');
  const found: Found[] = [];
  const errors: string[] = [];

  // --- FB 粉專 ---
  const pageId = process.env.FB_PAGE_ID;
  const pageToken = process.env.FB_PAGE_ACCESS_TOKEN;
  if (pageId && pageToken) {
    const fields = 'message,permalink_url,comments.filter(stream).limit(50){id,message,created_time,from,permalink_url}';
    const res = await fetch(`${GRAPH}/${pageId}/posts?fields=${encodeURIComponent(fields)}&since=${since}&limit=50&access_token=${pageToken}`, { cache: 'no-store' });
    const data = await res.json();
    if (!res.ok || data.error) errors.push(`FB: ${data.error?.message || res.status}`);
    for (const post of data.data || []) {
      for (const c of post.comments?.data || []) {
        if (c.from?.id === pageId) continue; // 粉專自己的回覆不算
        found.push({ id: c.id, platform: 'FB', postText: post.message || '', text: c.message || '(貼圖或圖片)', who: c.from?.name || '（名字未提供）', at: c.created_time, link: c.permalink_url || post.permalink_url || '' });
      }
    }
  } else {
    errors.push('FB: FB_PAGE_ID / FB_PAGE_ACCESS_TOKEN 未設定');
  }

  // --- IG ---
  try {
    const igToken = await getToken(db, 'ig');
    if (igToken) {
      const me = await (await fetch(`${IG_GRAPH}/me?fields=username&access_token=${igToken}`, { cache: 'no-store' })).json();
      const fields = 'timestamp,caption,permalink,comments.limit(50){id,text,username,timestamp,replies{id,text,username,timestamp}}';
      const res = await fetch(`${IG_GRAPH}/me/media?fields=${encodeURIComponent(fields)}&limit=30&access_token=${igToken}`, { cache: 'no-store' });
      const data = await res.json();
      if (!res.ok || data.error) errors.push(`IG: ${data.error?.message || res.status}`);
      for (const m of data.data || []) {
        if (new Date(m.timestamp).getTime() < sinceMs) continue;
        const all = (m.comments?.data || []).flatMap((c: any) => [c, ...(c.replies?.data || [])]);
        for (const c of all) {
          if (me.username && c.username === me.username) continue; // 自己的回覆不算
          found.push({ id: `ig_${c.id}`, platform: 'IG', postText: m.caption || '', text: c.text || '', who: c.username ? `@${c.username}` : '（名字未提供）', at: c.timestamp, link: m.permalink || '' });
        }
      }
    }
  } catch (e: any) {
    errors.push(`IG: ${e.message}`);
  }

  // --- Threads ---
  try {
    const thToken = await getToken(db, 'threads');
    if (thToken) {
      const TH = 'https://graph.threads.net/v1.0';
      const me = await (await fetch(`${TH}/me?fields=username&access_token=${thToken}`, { cache: 'no-store' })).json();
      const res = await fetch(`${TH}/me/threads?fields=id,timestamp,text,permalink&since=${since}&limit=30&access_token=${thToken}`, { cache: 'no-store' });
      const data = await res.json();
      if (!res.ok || data.error) errors.push(`Threads: ${data.error?.message || res.status}`);
      for (const p of data.data || []) {
        if (new Date(p.timestamp).getTime() < sinceMs) continue;
        const r = await (await fetch(`${TH}/${p.id}/conversation?fields=id,text,username,timestamp,permalink&access_token=${thToken}`, { cache: 'no-store' })).json();
        for (const c of r.data || []) {
          if (me.username && c.username === me.username) continue; // 自己的回覆不算
          found.push({ id: `th_${c.id}`, platform: 'Threads', postText: p.text || '', text: c.text || '(圖片或貼圖)', who: c.username ? `@${c.username}` : '（名字未提供）', at: c.timestamp, link: c.permalink || p.permalink || '' });
        }
      }
    }
  } catch (e: any) {
    errors.push(`Threads: ${e.message}`);
  }

  const col = db.collection('fbCommentsSeen');
  const ids = found.map((f) => f.id);
  const seen = new Set((await col.find({ _id: { $in: ids } } as any).toArray()).map((d: any) => d._id));
  const fresh = found.filter((f) => !seen.has(f.id));

  if (fresh.length === 0) {
    return NextResponse.json({ ok: true, checked: found.length, new: 0, errors });
  }

  const esc = (s = '') => s.replace(/[&<>"]/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch]!));
  const rows = fresh.map((f) => `
    <div style="border:1px solid #e7e5e4;border-radius:10px;padding:12px;margin:0 0 12px">
      <div style="font-size:12px;color:#78716c">【${f.platform}】貼文：${esc(f.postText.slice(0, 40))}…</div>
      <div style="font-size:15px;margin:6px 0">「${esc(f.text)}」</div>
      <div style="font-size:12px;color:#78716c">${esc(f.who)}・${new Date(f.at).toLocaleString('zh-TW', { timeZone: 'Asia/Taipei' })}</div>
      <a href="${f.link || '#'}" style="font-size:13px">到${f.platform}看／回覆</a>
    </div>`).join('');
  const platforms = Array.from(new Set(fresh.map((f) => f.platform))).join('／');

  const { error: sendError } = await resend.emails.send({
    from: FROM,
    to: NOTIFY_TO,
    subject: `【${platforms}】有 ${fresh.length} 則新留言`,
    html: `<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:560px;margin:0 auto;color:#1c1917;padding:16px">
      <h2 style="margin:0 0 12px">社群有新留言</h2>${rows}</div>`,
  });
  if (sendError) {
    return NextResponse.json({ error: '寄信失敗', detail: sendError.message }, { status: 502 });
  }

  await col.insertMany(fresh.map((f) => ({ _id: f.id, platform: f.platform, notifiedAt: new Date() })) as any, { ordered: false });
  return NextResponse.json({ ok: true, checked: found.length, new: fresh.length, errors });
}
