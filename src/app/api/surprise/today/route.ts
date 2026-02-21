// 📄 檔案路徑：src/app/api/surprise/today/route.ts
// 功能：取得今日驚喜

import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
  try {
    const today = new Date();
    const dateStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

    const client = await clientPromise;
    const db = client.db('SurpriseCornerDB');
    const collection = db.collection('surprises');

    const surprise = await collection.findOne({ date: dateStr });

    if (!surprise) {
      return NextResponse.json(null, { status: 404 });
    }

    return NextResponse.json(surprise);
  } catch (error) {
    console.error('取得今日驚喜失敗:', error);
    return NextResponse.json({ error: '伺服器錯誤' }, { status: 500 });
  }
}

export const dynamic = 'force-dynamic';