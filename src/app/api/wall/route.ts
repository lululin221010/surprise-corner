// 📁 路徑：src/app/api/wall/route.ts

import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(req: Request) {
  const body = await req.json();

  // 防空內容
  if (!body.text || body.text.length < 5) {
    return NextResponse.json({ error: "內容太短" }, { status: 400 });
  }

  const client = await clientPromise;
  const db = client.db();

  // IP 限制（不用登入）
  const ip = req.headers.get("x-forwarded-for") || "unknown";
  const oneMinuteAgo = new Date(Date.now() - 60 * 1000);

  const recent = await db.collection("wall").countDocuments({
    ip,
    createdAt: { $gt: oneMinuteAgo },
  });

  // 一分鐘最多三次
  if (recent >= 3) {
    return NextResponse.json({ error: "太頻繁，請稍後再試" }, { status: 429 });
  }

  const result = await db.collection("wall").insertOne({
    text: body.text.slice(0, 300),
    creatorId: body.creatorId || null,
    ip,
    createdAt: new Date(),
  });

  return NextResponse.json({
    ok: true,
    id: result.insertedId,
  });
}

export async function GET() {
  const client = await clientPromise;
  const db = client.db();

  const posts = await db
    .collection("wall")
    .find({})
    .sort({ createdAt: -1 })
    .limit(50)
    .toArray();

  return NextResponse.json(posts);
}