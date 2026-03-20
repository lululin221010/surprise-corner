// src/app/api/admin/comments/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/lib/dbConnect';
import { ObjectId } from 'mongodb';

// GET /api/admin/comments?approved=false (or true, or all)
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const filter = searchParams.get('approved'); // 'true' | 'false' | 'all'

  try {
    const db = await dbConnect();
    const query: Record<string, unknown> = {};
    if (filter === 'true') query.approved = true;
    else if (filter === 'false') query.approved = false;
    // else 'all' => no filter

    const comments = await db
      .collection('chapter_comments')
      .find(query)
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({ comments });
  } catch (err) {
    console.error('GET /api/admin/comments error:', err);
    return NextResponse.json({ error: '伺服器錯誤' }, { status: 500 });
  }
}

// PATCH /api/admin/comments — approve or reject
// Body: { id, approved: boolean }
export async function PATCH(req: NextRequest) {
  try {
    const { id, approved, reply } = await req.json();
    if (!id) return NextResponse.json({ error: '缺少 id' }, { status: 400 });

    const db = await dbConnect();
    const updateFields: Record<string, unknown> = { approved };
    if (typeof reply === 'string') {
      updateFields.reply = reply.trim();
      updateFields.repliedAt = new Date();
    }
    await db
      .collection('chapter_comments')
      .updateOne({ _id: new ObjectId(id) }, { $set: updateFields });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('PATCH /api/admin/comments error:', err);
    return NextResponse.json({ error: '伺服器錯誤' }, { status: 500 });
  }
}

// DELETE /api/admin/comments
// Body: { id }
export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    if (!id) return NextResponse.json({ error: '缺少 id' }, { status: 400 });

    const db = await dbConnect();
    await db.collection('chapter_comments').deleteOne({ _id: new ObjectId(id) });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('DELETE /api/admin/comments error:', err);
    return NextResponse.json({ error: '伺服器錯誤' }, { status: 500 });
  }
}

// POST /api/admin/comments - 站長直接發文，自動 approved
export async function POST(req: NextRequest) {
  try {
    const { chapterId, novelId, nickname, content } = await req.json();
    if (!chapterId || !content) return NextResponse.json({ error: '缺少欄位' }, { status: 400 });
    const db = await dbConnect();
    await db.collection('chapter_comments').insertOne({
      chapterId,
      novelId: novelId || '',
      nickname: nickname || '站長',
      petName: '',
      content,
      approved: true,
      createdAt: new Date(),
    });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('POST /api/admin/comments error:', err);
    return NextResponse.json({ error: '伺服器錯誤' }, { status: 500 });
  }
}