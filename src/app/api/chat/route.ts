// 📄 src/app/api/chat/route.ts
import { NextRequest, NextResponse } from 'next/server';

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
};

export async function POST(req: NextRequest) {
  try {
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