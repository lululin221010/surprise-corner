// 📄 檔案路徑：src/app/api/surprise/today/route.ts
// 功能：取得今日驚喜
// 優先順序：MongoDB 有效記錄 → Pool 日期種子 fallback

import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { getPoolSurprise } from '@/data/surprise-pool';

export async function GET() {
  const today = new Date();
  const dateStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

  try {
    const client = await clientPromise;
    const db = client.db('SurpriseCornerDB');
    const collection = db.collection('surprises');

    const surprise = await collection.findOne({ date: dateStr });

    // DB 有記錄且有實際內容 → 優先使用
    if (surprise && (surprise.message || surprise.content)) {
      return NextResponse.json(surprise);
    }
  } catch (error) {
    console.error('MongoDB 查詢失敗，使用 pool fallback:', error);
  }

  // Fallback：用日期種子從 pool 選一則，永遠不會「準備中」
  const poolItem = getPoolSurprise(dateStr);
  return NextResponse.json({ date: dateStr, ...poolItem });
}

export const dynamic = 'force-dynamic';
