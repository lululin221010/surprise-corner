const fs = require("fs");
const content = `import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  
  // 放行 API 路徑
  if (pathname.startsWith('/api/')) return NextResponse.next();
  
  const token = req.cookies.get('admin_token')?.value;
  const validToken = process.env.ADMIN_PASSWORD;

  if (token !== validToken) {
    // 沒有 cookie，但已經在密碼頁面了，不要再擋
    return NextResponse.next();
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/comments'],
};
`;
fs.writeFileSync("middleware.ts", content, "utf8");
console.log("done");
