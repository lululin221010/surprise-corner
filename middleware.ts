import { NextRequest, NextResponse } from 'next/server';

// 2026-08-29：SS北極星原則（純免費，不導購不解鎖）定案後，classroom/底下這些付費解鎖書院
// 暫時封存下架，全部導回 /classroom（不分是否已輸入過解鎖碼，一律擋）。
// 免費試讀路由（bonus/、stock/trial、stock/trial-investigation）不在此清單內，不受影響。
const GATED_CLASSROOM_PATHS = [
  '/classroom/stock',
  '/classroom/psychology',
  '/classroom/ai-academy',
  '/classroom/ai',
  '/classroom/ai-anatomy',
  '/classroom/ai-communication',
  '/classroom/ai-thinking',
  '/classroom/ai-coexist',
  '/classroom/ai-psychology-hub',
  '/classroom/ai-diy',
  '/classroom/ai-safety',
  '/classroom/ai-robot',
  '/classroom/brain-universe',
  '/classroom/brain-universe/autonomic',
];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 放行 API 路徑
  if (pathname.startsWith('/api/')) return NextResponse.next();

  if (GATED_CLASSROOM_PATHS.includes(pathname)) {
    return NextResponse.redirect(new URL('/classroom', req.url));
  }

  const token = req.cookies.get('admin_token')?.value;
  const validToken = process.env.ADMIN_PASSWORD;

  if (token !== validToken) {
    // 沒有 cookie，但已經在密碼頁面了，不要再擋
    return NextResponse.next();
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/comments',
    '/classroom/stock',
    '/classroom/psychology',
    '/classroom/ai-academy',
    '/classroom/ai',
    '/classroom/ai-anatomy',
    '/classroom/ai-communication',
    '/classroom/ai-thinking',
    '/classroom/ai-coexist',
    '/classroom/ai-psychology-hub',
    '/classroom/ai-diy',
    '/classroom/ai-safety',
    '/classroom/ai-robot',
    '/classroom/brain-universe',
    '/classroom/brain-universe/autonomic',
  ],
};
