import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('SurpriseCornerDB');
    const collection = db.collection('surprises');

    // 獲取今天的日期 (台灣時區 UTC+8)
    const today = new Date();
    const taipeiDate = new Date(today.getTime() + (8 * 60 * 60 * 1000));
    const dateString = taipeiDate.toISOString().split('T')[0];

    const surprise = await collection.findOne({ date: dateString });

    if (!surprise) {
      return NextResponse.json(
        { error: '今天還沒有驚喜' },
        { status: 404 }
      );
    }

    return NextResponse.json(surprise);
  } catch (error) {
    console.error('獲取今日驚喜失敗:', error);
    return NextResponse.json(
      { error: '伺服器錯誤' },
      { status: 500 }
    );
  }
}

export const revalidate = 0; // 不快取