import { NextRequest, NextResponse } from 'next/server';
import {
  ADMIN_COOKIE_NAME,
  createAdminSessionToken,
  isAdminPasswordCorrect,
  setAdminSessionCookie,
} from '@/lib/adminAuth';

export async function POST(req: NextRequest) {
  const { password } = await req.json().catch(() => ({}));
  if (!isAdminPasswordCorrect(password)) {
    return NextResponse.json({ success: false }, { status: 401 });
  }
  // cookie 存簽章 token（8小時到期），不再存 ADMIN_PASSWORD 明文
  const token = createAdminSessionToken();
  if (!token) {
    // JWT_SECRET 未設定或太短：fail-closed，不發 cookie
    return NextResponse.json({ success: false, error: 'server misconfigured' }, { status: 500 });
  }
  const res = NextResponse.json({ success: true });
  setAdminSessionCookie(res, token);
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ success: true });
  res.cookies.delete(ADMIN_COOKIE_NAME);
  return res;
}
