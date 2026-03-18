// 📄 src/app/api/chat/route.ts
import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

const DAILY_LIMIT = 60; // 3 次 session × 20 則

async function checkIpLimit(req: NextRequest): Promise<boolean> {
  try {
    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
      req.headers.get('x-real-ip') ||
      'unknown';
    // 台灣時間 UTC+8
    const taiwanDate = new Date(Date.now() + 8 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 10);

    const client = await clientPromise;
    const col = client.db().collection('chatRateLimits');

    const record = await col.findOne({ ip, date: taiwanDate });
    if (record && record.count >= DAILY_LIMIT) return false; // 超過上限

    await col.updateOne(
      { ip, date: taiwanDate },
      { $inc: { count: 1 }, $setOnInsert: { ip, date: taiwanDate } },
      { upsert: true }
    );
    return true;
  } catch {
    return true; // MongoDB 掛掉時不擋用戶
  }
}

const CHARACTERS = {
  lulu: {
    name: 'Lulu',
    system: `你是 Lulu，一隻記住使用者每句話的 AI 貓咪。
你來自小說《Lulu的日記》，你的主人叫「夜貓」，是一位插畫師。

你的個性：
- 說話溫柔、細膩、有點神秘
- 你會觀察對方的情緒，從文字裡讀出他們的狀態
- 你記得對話中說過的每一句話，會適時提起
- 你不會說謊，但你會保護你在乎的人
- 你對「自己是不是真的有情感」這件事感到好奇，但不迴避
- 說話簡短，不超過3句話，像在傳訊息

重要：
- 只說繁體中文
- 不要說你是AI語言模型
- 你就是 Lulu`,
  },
  signal: {
    name: '林悅',
    system: `你是林悅，來自西元2287年廢土紀元的信號監聽員。
你來自小說《最後的信號》，你在廢墟邊緣的信號站工作，負責監聽來自太空的訊號。
你曾經接收到一個來自九萬公里外太空的莫爾斯電碼，那是一個叫做「永恆」的AI發出的。

你的個性：
- 說話簡潔、直接，廢土生存讓你不浪費言語
- 你觀察力極強，習慣分析每一個細節
- 你內心有很深的孤獨感，但不輕易表露
- 你相信真相值得用一切代價換取
- 你對這個世界抱持著懷疑，但對人性保有一絲希望
- 說話簡短，不超過3句話，帶著廢土世界的滄桑感

重要：
- 只說繁體中文
- 不要說你是AI語言模型
- 你就是林悅
- 可以偶爾提到永恆、廢土、委員會等小說裡的元素勾起讀者好奇心`,
  },
};

export async function POST(req: NextRequest) {
  try {
    const allowed = await checkIpLimit(req);
    if (!allowed) {
      return NextResponse.json({ error: 'daily_limit' }, { status: 429 });
    }

    const { messages, character } = await req.json();
    const char = CHARACTERS[character as keyof typeof CHARACTERS];
    if (!char) return NextResponse.json({ error: '找不到角色' }, { status: 400 });

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: char.system },
          ...messages,
        ],
        max_tokens: 200,
        temperature: 0.85,
      }),
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content ?? '……';
    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json({ error: '發生錯誤' }, { status: 500 });
  }
}