const fs = require("fs");
let c = fs.readFileSync("src/app/api/admin/comments/route.ts", "utf8");
const postFn = `\r\n// POST /api/admin/comments - 站長直接發文，自動 approved\r\nexport async function POST(req: NextRequest) {\r\n  try {\r\n    const { chapterId, novelId, nickname, content } = await req.json();\r\n    if (!chapterId || !content) return NextResponse.json({ error: '缺少欄位' }, { status: 400 });\r\n    const db = await dbConnect();\r\n    await db.collection('chapter_comments').insertOne({\r\n      chapterId,\r\n      novelId: novelId || '',\r\n      nickname: nickname || '站長',\r\n      petName: '',\r\n      content,\r\n      approved: true,\r\n      createdAt: new Date(),\r\n    });\r\n    return NextResponse.json({ success: true });\r\n  } catch (err) {\r\n    console.error('POST /api/admin/comments error:', err);\r\n    return NextResponse.json({ error: '伺服器錯誤' }, { status: 500 });\r\n  }\r\n}`;
c = c + postFn;
fs.writeFileSync("src/app/api/admin/comments/route.ts", c, "utf8");
console.log(c.includes("站長直接發文"));
