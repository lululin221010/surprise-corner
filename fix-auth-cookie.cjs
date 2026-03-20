const fs = require("fs");
const content = `import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { password } = await req.json();
  if (password === process.env.ADMIN_PASSWORD) {
    const res = NextResponse.json({ success: true });
    res.cookies.set('admin_token', process.env.ADMIN_PASSWORD || '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 8, // 8小時
      path: '/',
    });
    return res;
  }
  return NextResponse.json({ success: false }, { status: 401 });
}

export async function DELETE() {
  const res = NextResponse.json({ success: true });
  res.cookies.delete('admin_token');
  return res;
}
`;
fs.writeFileSync("src/app/api/admin/auth/route.ts", content, "utf8");
console.log("done");
