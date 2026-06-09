// POST /api/auth/magic-link
// 輸入 email + nickname → 寄出一次性登入連結（15 分鐘有效）
// 若 email 不存在 → 自動建立帳號（首次註冊）
import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { Resend } from 'resend';
import { dbConnect } from '@/lib/dbConnect';

const resend  = new Resend(process.env.RESEND_API_KEY);
const SS_URL  = process.env.NEXT_PUBLIC_SITE_URL || 'https://surprise-corner.vercel.app';
const FROM    = '有的沒的小舖 <noreply@still-time-corner.vercel.app>';

export async function POST(request: Request) {
  try {
    const { email, nickname } = await request.json();
    if (!email) return NextResponse.json({ success: false, error: '請輸入 email' }, { status: 400 });

    const db    = await dbConnect();
    const users = db.collection('academyUsers');

    let user = await users.findOne({ email: email.toLowerCase().trim() });

    if (!user) {
      // 首次註冊
      const nick = (nickname || '').trim() || email.split('@')[0];
      await users.insertOne({
        email:              email.toLowerCase().trim(),
        nickname:           nick,
        points:             0,
        completedLessons:   [],
        completedAcademies: [],
        createdAt:          new Date(),
      });
      user = await users.findOne({ email: email.toLowerCase().trim() });
    }

    // 產生 token，15 分鐘有效
    const token  = crypto.randomBytes(32).toString('hex');
    const expiry = new Date(Date.now() + 15 * 60 * 1000);

    await users.updateOne(
      { email: user!.email },
      { $set: { magicToken: token, magicTokenExpiry: expiry } }
    );

    const loginUrl = `${SS_URL}/api/auth/verify-magic?token=${token}`;

    await resend.emails.send({
      from:    FROM,
      to:      user!.email,
      subject: '【驚喜學院】一鍵登入連結',
      html: `
<!DOCTYPE html>
<html lang="zh-TW">
<head><meta charset="UTF-8"/></head>
<body style="margin:0;padding:0;background:#0f0f1a;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0f0f1a;padding:40px 20px;">
    <tr><td align="center">
      <table width="520" cellpadding="0" cellspacing="0"
             style="background:#1a1a2e;border-radius:16px;overflow:hidden;border:1px solid #2d2d4e;">
        <tr>
          <td style="padding:32px;text-align:center;background:linear-gradient(135deg,#1a1a2e,#16213e);">
            <div style="font-size:32px;margin-bottom:8px;">🎓</div>
            <h1 style="margin:0;color:#c4b5fd;font-size:20px;font-weight:700;letter-spacing:1px;">驚喜學院</h1>
            <p style="margin:6px 0 0;color:#7c6fcd;font-size:13px;">Surprise Corner Academy</p>
          </td>
        </tr>
        <tr>
          <td style="padding:36px;">
            <p style="color:#e2e8f0;font-size:15px;line-height:1.8;margin:0 0 24px;">
              你好，<strong style="color:#c4b5fd;">${user!.nickname}</strong>！<br/>
              點下方按鈕即可直接登入學院，不需要密碼。<br/>
              <span style="color:#64748b;font-size:13px;">連結 15 分鐘內有效，使用一次後失效。</span>
            </p>
            <div style="text-align:center;margin:32px 0;">
              <a href="${loginUrl}"
                 style="display:inline-block;padding:14px 40px;
                        background:linear-gradient(135deg,#7c3aed,#4f46e5);
                        color:#fff;font-size:16px;font-weight:700;
                        border-radius:12px;text-decoration:none;">
                進入學院 →
              </a>
            </div>
            <p style="color:#475569;font-size:12px;line-height:1.8;margin:0;">
              如果按鈕無法點擊，複製以下網址到瀏覽器：<br/>
              <a href="${loginUrl}" style="color:#7c6fcd;word-break:break-all;">${loginUrl}</a>
            </p>
          </td>
        </tr>
        <tr>
          <td style="padding:16px 32px;background:#111827;text-align:center;border-top:1px solid #1f2937;">
            <p style="margin:0;color:#4b5563;font-size:12px;">
              沒有申請此登入？請忽略這封信，你的帳號不受影響。
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
    });

    return NextResponse.json({ success: true, isNew: !user });
  } catch (error) {
    console.error('❌ SS magic-link 失敗:', error);
    return NextResponse.json({ success: false, error: '寄信失敗，請稍後再試' }, { status: 500 });
  }
}
