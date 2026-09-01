// 📁 路徑：src/app/api/wall/[id]/route.ts
// ✅ 新增：查詢單筆作品 API（供 wall/[id]/page.tsx Client Component 使用）

import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const client = await clientPromise;
    const db = client.db();
    const post = await db.collection('wall').findOne(
      { _id: new ObjectId(id), approved: true },
      { projection: { ip: 0, creatorId: 0 } }
    );
    if (!post) return NextResponse.json({ error: '找不到作品' }, { status: 404 });
    return NextResponse.json({ ...post, _id: post._id.toString() });
  } catch {
    return NextResponse.json({ error: 'ID 格式錯誤' }, { status: 400 });
  }
}