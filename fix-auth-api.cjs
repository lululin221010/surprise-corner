const fs = require("fs");
const content = `import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { password } = await req.json();
  if (password === process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ success: true });
  }
  return NextResponse.json({ success: false }, { status: 401 });
}
`;
fs.mkdirSync("src/app/api/admin/auth", { recursive: true });
fs.writeFileSync("src/app/api/admin/auth/route.ts", content, "utf8");
console.log("done");
