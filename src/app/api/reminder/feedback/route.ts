// src/app/api/reminder/feedback/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/lib/dbConnect';

export async function GET() {
  try {
    const db = await dbConnect();
    const feedbacks = await db
      .collection('reminderFeedback')
      .find({})
      .sort({ createdAt: -1 })
      .limit(10)
      .toArray();
    return NextResponse.json({ feedbacks });
  } catch (err) {
    console.error('GET /api/reminder/feedback error:', err);
    return NextResponse.json({ error: '伺服器錯誤' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { nickname, content } = body;

    if (!nickname?.trim() || !content?.trim()) {
      return NextResponse.json({ error: '缺少必要欄位' }, { status: 400 });
    }
    if (nickname.trim().length > 20) {
      return NextResponse.json({ error: '暱稱最多 20 字' }, { status: 400 });
    }
    if (content.trim().length > 300) {
      return NextResponse.json({ error: '留言最多 300 字' }, { status: 400 });
    }

    const db = await dbConnect();
    await db.collection('reminderFeedback').insertOne({
      nickname: nickname.trim(),
      content: content.trim(),
      createdAt: new Date(),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('POST /api/reminder/feedback error:', err);
    return NextResponse.json({ error: '伺服器錯誤' }, { status: 500 });
  }
}
