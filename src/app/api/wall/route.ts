// 📁 路徑：src/app/api/wall/route.ts
// ✅ 新增：to（寫給誰，必填）、from（寫的人，可匿名）、label（類型）

import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(req: Request) {
  const body = await req.json();

  // 防空內容
  if (!body.text || body.text.length < 5) {
    return NextResponse.json({ error: "內容太短" }, { status: 400 });
  }
  // ✅ 收件人必填
  if (!body.to || body.to.trim().length < 1) {
    return NextResponse.json({ error: "請填寫寫給誰" }, { status: 400 });
  }

  const client = await clientPromise;
  const db = client.db();

  const ip = req.headers.get("x-forwarded-for") || "unknown";
  const oneMinuteAgo = new Date(Date.now() - 60 * 1000);
  const recent = await db.collection("wall").countDocuments({
    ip, createdAt: { $gt: oneMinuteAgo },
  });
  if (recent >= 3) {
    return NextResponse.json({ error: "太頻繁，請稍後再試" }, { status: 429 });
  }

  const result = await db.collection("wall").insertOne({
    text: body.text.slice(0, 300),
    to: body.to.trim().slice(0, 20),           // ✅ 收件人（必填）
    from: body.from?.trim().slice(0, 20) || '', // ✅ 寄件人（空白=匿名）
    label: body.label || '',                    // ✅ 類型標籤
    creatorId: body.creatorId || null,
    approved: false,                            // ✅ 預設待審核
    reply: '',
    ip,
    createdAt: new Date(),
  });

  return NextResponse.json({ ok: true, id: result.insertedId });
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const label = searchParams.get('label');
  const client = await clientPromise;
  const db = client.db();
  const query: Record<string, any> = { approved: true };
  if (label) query.label = label;
  const posts = await db.collection("wall").find(query)
    .sort({ createdAt: -1 }).limit(50).toArray();
  return NextResponse.json(posts);
}