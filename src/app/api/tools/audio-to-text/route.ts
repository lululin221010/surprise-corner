// 📄 路徑：src/app/api/tools/audio-to-text/route.ts
// 呼叫 Groq Whisper API 轉換音訊檔案為文字

import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: '未設定 GROQ_API_KEY' }, { status: 500 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: '請上傳音訊檔案' }, { status: 400 });
    }

    // 檢查檔案格式
    const allowed = ['audio/mpeg', 'audio/mp4', 'audio/wav', 'audio/x-wav', 'audio/m4a', 'audio/x-m4a', 'video/mp4'];
    const ext = file.name.split('.').pop()?.toLowerCase() || '';
    const allowedExt = ['mp3', 'mp4', 'wav', 'm4a', 'webm', 'ogg', 'flac'];
    if (!allowed.includes(file.type) && !allowedExt.includes(ext)) {
      return NextResponse.json({ error: '僅支援 mp3、mp4、wav、m4a 格式' }, { status: 400 });
    }

    // 大小限制 25MB（Groq 限制）
    if (file.size > 25 * 1024 * 1024) {
      return NextResponse.json({ error: '檔案大小不能超過 25MB' }, { status: 400 });
    }

    // 轉發給 Groq Whisper API
    const groqForm = new FormData();
    groqForm.append('file', file);
    groqForm.append('model', 'whisper-large-v3-turbo');
    groqForm.append('response_format', 'json');
    groqForm.append('language', 'zh');   // 預設中文，也能自動偵測

    const groqRes = await fetch('https://api.groq.com/openai/v1/audio/transcriptions', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}` },
      body: groqForm,
    });

    if (!groqRes.ok) {
      const errText = await groqRes.text();
      console.error('Groq API error:', errText);
      return NextResponse.json({ error: 'Groq API 錯誤，請稍後再試' }, { status: 502 });
    }

    const data = await groqRes.json();
    return NextResponse.json({ text: data.text || '' });
  } catch (err) {
    console.error('audio-to-text error:', err);
    return NextResponse.json({ error: '伺服器錯誤，請稍後再試' }, { status: 500 });
  }
}
