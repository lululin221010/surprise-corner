// POST /api/admin/owner-login
// 店長輸入 email → 寄出一次性驗證連結（10分鐘有效），取代帳號密碼登入
// 驗證連結見 src/app/api/admin/owner-login/verify/route.ts
import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { Resend } from 'resend';
import clientPromise from '@/lib/mongodb';

const resend = new Resend(process.env.RESEND_API_KEY);
const SS_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://surprise-corner.vercel.app';
const FROM = '驚喜角落後台 <noreply@still-time-corner.vercel.app>';
const EXPIRE_MS = 10 * 60 * 1000; // 10分鐘

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    const ownerEmail = process.env.OWNER_EMAIL || '';
    const normalized = (email || '').trim().toLowerCase();

    if (!ownerEmail || normalized !== ownerEmail.toLowerCase()) {
      return NextResponse.json({ error: 'Email 不符合' }, { status: 401 });
    }

    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + EXPIRE_MS);

    const client = await clientPromise;
    const db = client.db('SurpriseCornerDB');
    await db.collection('adminLoginTokens').insertOne({
      token,
      expiresAt,
      used: false,
      createdAt: new Date(),
    });

    const verifyUrl = `${SS_URL}/api/admin/owner-login/verify?token=${token}`;

    await resend.emails.send({
      from: FROM,
      to: normalized,
      subject: '【驚喜角落】後台登入驗證連結（10分鐘有效）',
      html: `
        <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:480px;margin:0 auto;color:#1c1917;padding:20px">
          <h2 style="margin:0 0 16px">後台登入驗證</h2>
          <p style="font-size:14px;color:#374151">點擊下方按鈕完成後台登入，連結<strong style="color:#dc2626">10分鐘內</strong>有效。</p>
          <p style="text-align:center;margin:24px 0">
            <a href="${verifyUrl}" style="display:inline-block;padding:12px 28px;background:#292524;color:#fff;text-decoration:none;border-radius:10px;font-weight:bold">
              進入後台
            </a>
          </p>
          <p style="font-size:12px;color:#9ca3af">如果不是您本人操作，請忽略此信。</p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true, message: '驗證信已寄出，請至信箱點擊連結完成登入' });
  } catch (error) {
    console.error('❌ POST /api/admin/owner-login 失敗:', error);
    return NextResponse.json(
      { error: '寄送驗證信失敗，請稍後再試或改用帳號密碼登入' },
      { status: 500 }
    );
  }
}

export const dynamic = 'force-dynamic';
