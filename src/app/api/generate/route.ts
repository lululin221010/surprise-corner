// 📁 路徑：src/app/api/generate/route.ts
import { NextResponse } from "next/server";

const PROMPTS: Record<string, (input: string) => string> = {
  love:     (name) => `用繁體中文寫一段真誠感人的告白給「${name}」，50字以內，不要用引號包住。`,
  birthday: (name) => `用繁體中文寫一段溫暖的生日祝福給「${name}」，50字以內，不要用引號包住。`,
  fortune:  (sign) => `用繁體中文為「${sign}」星座寫今日運勢，50字以內，語氣正向，不要用引號包住。`,
  healing:  (mood) => `根據「${mood}」這個心情，用繁體中文寫一段療癒小語，50字以內，溫柔有力，不要用引號包住。`,
};

export async function POST(req: Request) {
  const { type, input } = await req.json();
  if (!PROMPTS[type] || !input) {
    return NextResponse.json({ error: "參數錯誤" }, { status: 400 });
  }
  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: PROMPTS[type](input) }] }],
        }),
      }
    );
    const data = await res.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    return NextResponse.json({ result: text || "生成失敗" });
  } catch {
    return NextResponse.json({ error: "生成失敗" }, { status: 500 });
  }
}