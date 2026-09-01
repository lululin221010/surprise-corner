// GET /api/auth/verify-magic?token=xxx
// 驗證 token → 設 cookie → 導向 /classroom/stock
import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { dbConnect } from '@/lib/dbConnect';

const SS_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://surprise-corner.vercel.app';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');

    if (!token) return NextResponse.redirect(`${SS_URL}/login?error=invalid`);

    const db    = await dbConnect();
    const users = db.collection('academyUsers');

    const user = await users.findOne({
      magicToken:       token,
      magicTokenExpiry: { $gt: new Date() },
    });

    if (!user) return NextResponse.redirect(`${SS_URL}/login?error=expired`);

    // 清除 token（一次性）
    await users.updateOne(
      { _id: user._id },
      {
        $unset: { magicToken: '', magicTokenExpiry: '' },
        $set:   { lastLoginAt: new Date() },
      }
    );

    // 這裡才是真正驗證過email擁有權的時間點，在ST BookStoreDB建立鏡射帳號
    // （若不存在）——原本這步驟放在magic-link請求階段就做，任何人送任意email
    // 都能建立一個能登入書店的帳號，不用真的收到信、點過連結
    try {
      const stDb    = await dbConnect('BookStoreDB');
      const stUsers = stDb.collection('users');
      const exists  = await stUsers.findOne({ email: user.email });
      if (!exists) {
        await stUsers.insertOne({
          email:       user.email,
          // 隨機無法使用的密碼雜湊，讓用戶只能走 magic link 登入
          password:    '$2b$10$' + crypto.randomBytes(22).toString('base64').slice(0, 53),
          name:        user.nickname || String(user.email).split('@')[0],
          fullAccess:  false,
          createdAt:   new Date(),
          updatedAt:   new Date(),
          fromAcademy: true,  // 標記從學院註冊
        });
      }
    } catch (stErr) {
      // ST 建帳失敗不影響 SS 登入流程，只記 log
      console.warn('⚠️ ST 建帳失敗（不影響 SS）:', stErr);
    }

    const response = NextResponse.redirect(`${SS_URL}/classroom/stock`);
    response.cookies.set('academy_session', user.email as string, {
      httpOnly: true,
      secure:   process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge:   60 * 60 * 24 * 30,  // 30 天
      path:     '/',
    });

    return response;
  } catch (error) {
    console.error('❌ SS verify-magic 失敗:', error);
    return NextResponse.redirect(`${SS_URL}/login?error=server`);
  }
}
