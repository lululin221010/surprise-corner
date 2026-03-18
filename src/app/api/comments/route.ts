// src/app/api/comments/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/lib/dbConnect';

// GET /api/comments?chapterId=xxx
// Returns approved comments for a chapter
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const chapterId = searchParams.get('chapterId');

  if (!chapterId) {
    return NextResponse.json({ error: '缺少 chapterId' }, { status: 400 });
  }

  try {
    const db = await dbConnect();
    const comments = await db
      .collection('chapter_comments')
      .find({ chapterId, approved: true })
      .sort({ createdAt: 1 })
      .toArray();

    return NextResponse.json({ comments });
  } catch (err) {
    console.error('GET /api/comments error:', err);
    return NextResponse.json({ error: '伺服器錯誤' }, { status: 500 });
  }
}

// POST /api/comments
// Body: { chapterId, novelId, nickname, petName?, content }
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { chapterId, novelId, nickname, petName, content } = body;

    if (!chapterId || !novelId || !nickname || !content) {
      return NextResponse.json({ error: '缺少必要欄位' }, { status: 400 });
    }

    if (nickname.trim().length < 1 || nickname.trim().length > 20) {
      return NextResponse.json({ error: '暱稱長度需介於 1–20 字' }, { status: 400 });
    }

    if (content.trim().length < 1 || content.trim().length > 500) {
      return NextResponse.json({ error: '留言長度需介於 1–500 字' }, { status: 400 });
    }

    const db = await dbConnect();
    const result = await db.collection('chapter_comments').insertOne({
      chapterId: chapterId.trim(),
      novelId: novelId.trim(),
      nickname: nickname.trim(),
      petName: petName ? petName.trim() : '',
      content: content.trim(),
      approved: false,
      createdAt: new Date(),
    });

    return NextResponse.json({ success: true, id: result.insertedId });
  } catch (err) {
    console.error('POST /api/comments error:', err);
    return NextResponse.json({ error: '伺服器錯誤' }, { status: 500 });
  }
}
