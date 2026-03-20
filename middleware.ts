import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('admin_token')?.value;
  const validToken = process.env.ADMIN_PASSWORD;

  if (token !== validToken) {
    return NextResponse.redirect(new URL('/admin/comments', req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/comments'],
};
