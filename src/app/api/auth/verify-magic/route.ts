// GET /api/auth/verify-magic?token=xxx
// 驗證 token → 設 cookie → 導向 /classroom/stock
import { NextResponse } from 'next/server';
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
