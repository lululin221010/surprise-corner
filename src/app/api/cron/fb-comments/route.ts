// GET /api/cron/fb-comments
// 每天由 Vercel Cron 呼叫一次：檢查FB粉專最近貼文有沒有新留言，有就寄信通知（沒有就不寄）
// 起因（2026-09-30）：9/7「最後的信號」貼文 9/10 有人留言「怎麼沒有連結」，20天沒人發現
// 已通知過的留言記在 fbCommentsSeen，避免重複寄
import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import clientPromise from '@/lib/mongodb';

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM = '驚喜角落留言通知 <lulu@stilltimecorner.com>';
const NOTIFY_TO = process.env.COMMENT_NOTIFY_EMAIL || 'lululin221010@gmail.com';
const GRAPH = 'https://graph.facebook.com/v21.0';
const LOOKBACK_DAYS = 14; // 只看最近兩週發的貼文

type FbComment = { id: string; message?: string; created_time: string; from?: { id: string; name?: string }; permalink_url?: string };
type FbPost = { id: string; message?: string; permalink_url?: string; comments?: { data: FbComment[] } };

export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get('authorization') !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const pageId = process.env.FB_PAGE_ID;
  const token = process.env.FB_PAGE_ACCESS_TOKEN;
  if (!pageId || !token) {
    return NextResponse.json({ error: 'FB_PAGE_ID / FB_PAGE_ACCESS_TOKEN 未設定' }, { status: 500 });
  }

  // ?days=N 可手動加大回看範圍（測試/補抓用，上限60天）
  const qDays = Number(new URL(request.url).searchParams.get('days'));
  const days = qDays > 0 ? Math.min(qDays, 60) : LOOKBACK_DAYS;
  const since = Math.floor((Date.now() - days * 86400000) / 1000);
  const fields = 'message,permalink_url,comments.filter(stream).limit(50){id,message,created_time,from,permalink_url}';
  const url = `${GRAPH}/${pageId}/posts?fields=${encodeURIComponent(fields)}&since=${since}&limit=50&access_token=${token}`;
  const res = await fetch(url, { cache: 'no-store' });
  const data = await res.json();
  if (!res.ok || data.error) {
    return NextResponse.json({ error: 'FB API 失敗', detail: data.error?.message }, { status: 502 });
  }

  const found: { post: FbPost; comment: FbComment }[] = [];
  for (const post of (data.data || []) as FbPost[]) {
    for (const c of post.comments?.data || []) {
      if (c.from?.id === pageId) continue; // 粉專自己的回覆不算
      found.push({ post, comment: c });
    }
  }

  const client = await clientPromise;
  const col = client.db('SurpriseCornerDB').collection('fbCommentsSeen');
  const ids = found.map((f) => f.comment.id);
  const seen = new Set((await col.find({ _id: { $in: ids } } as any).toArray()).map((d: any) => d._id));
  const fresh = found.filter((f) => !seen.has(f.comment.id));

  if (fresh.length === 0) {
    return NextResponse.json({ ok: true, checked: found.length, new: 0 });
  }

  const esc = (s = '') => s.replace(/[&<>"]/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch]!));
  const rows = fresh.map(({ post, comment }) => `
    <div style="border:1px solid #e7e5e4;border-radius:10px;padding:12px;margin:0 0 12px">
      <div style="font-size:12px;color:#78716c">貼文：${esc((post.message || '').slice(0, 40))}…</div>
      <div style="font-size:15px;margin:6px 0">「${esc(comment.message || '(貼圖或圖片)')}」</div>
      <div style="font-size:12px;color:#78716c">${esc(comment.from?.name || '（名字未提供）')}・${new Date(comment.created_time).toLocaleString('zh-TW', { timeZone: 'Asia/Taipei' })}</div>
      <a href="${comment.permalink_url || post.permalink_url || '#'}" style="font-size:13px">到FB看／回覆</a>
    </div>`).join('');

  const { error: sendError } = await resend.emails.send({
    from: FROM,
    to: NOTIFY_TO,
    subject: `【FB粉專】有 ${fresh.length} 則新留言`,
    html: `<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:560px;margin:0 auto;color:#1c1917;padding:16px">
      <h2 style="margin:0 0 12px">粉專有新留言</h2>${rows}</div>`,
  });
  if (sendError) {
    return NextResponse.json({ error: '寄信失敗', detail: sendError.message }, { status: 502 });
  }

  await col.insertMany(fresh.map((f) => ({ _id: f.comment.id, postId: f.post.id, notifiedAt: new Date() })) as any, { ordered: false });
  return NextResponse.json({ ok: true, checked: found.length, new: fresh.length });
}
