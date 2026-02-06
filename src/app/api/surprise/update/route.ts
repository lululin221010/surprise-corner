import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { date, type, message, toolUrl, story, imageUrl } = body;

    // 必填欄位檢查
    if (!date || !type || !message) {
      return NextResponse.json(
        { error: '缺少必要欄位：date, type, message' },
        { status: 400 }
      );
    }

    // 日期格式簡單驗證
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return NextResponse.json({ error: '日期格式應為 yyyy-MM-dd' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db('SurpriseCornerDB');
    const collection = db.collection('surprises');

    // 更新或新增（upsert: true）
    const result = await collection.updateOne(
      { date: date },
      {
        $set: {
          type,
          message,
          toolUrl: toolUrl || null,
          story: story || null,
          imageUrl: imageUrl || null,
          updatedAt: new Date()
        },
        $setOnInsert: {
          createdAt: new Date()
        }
      },
      { upsert: true }
    );

    if (result.matchedCount > 0 || result.upsertedCount > 0) {
      return NextResponse.json({
        success: true,
        message: result.matchedCount > 0 ? '更新成功' : '新增成功',
        date
      });
    }

    return NextResponse.json({ success: false, error: '更新失敗' }, { status: 500 });
  } catch (error) {
    console.error('更新驚喜失敗:', error);
    return NextResponse.json({ error: '伺服器錯誤' }, { status: 500 });
  }
}