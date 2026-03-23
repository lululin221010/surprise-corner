// 📁 路徑：src/app/api/admin/wall/route.ts
import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const approved = searchParams.get('approved'); // 'true' | 'false' | 'all'
  const client = await clientPromise;
  const db = client.db();
  const query: Record<string, any> = {};
  if (approved === 'true') query.approved = true;
  else if (approved === 'false') query.approved = false;
  const posts = await db.collection('wall').find(query)
    .sort({ createdAt: -1 }).limit(100).toArray();
  return NextResponse.json({ posts });
}

export async function PATCH(req: Request) {
  const body = await req.json();
  const { id, approved, reply } = body;
  if (!id) return NextResponse.json({ error: '缺少 id' }, { status: 400 });
  const client = await clientPromise;
  const db = client.db();
  const update: Record<string, any> = {};
  if (typeof approved === 'boolean') update.approved = approved;
  if (typeof reply === 'string') update.reply = reply;
  await db.collection('wall').updateOne(
    { _id: new ObjectId(id) },
    { $set: update }
  );
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: Request) {
  const body = await req.json();
  const { id } = body;
  if (!id) return NextResponse.json({ error: '缺少 id' }, { status: 400 });
  const client = await clientPromise;
  const db = client.db();
  await db.collection('wall').deleteOne({ _id: new ObjectId(id) });
  return NextResponse.json({ ok: true });
}
