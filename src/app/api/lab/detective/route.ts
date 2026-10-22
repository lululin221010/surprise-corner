// src/app/api/lab/detective/route.ts
// 魯魯偵探社 01：匿名投票（不存任何個資；ip 只用來限速，不寫進文件）
import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

const VERSIONS = ['A', 'B', 'C'];
const MIN_TO_SHOW = 30; // 樣本不足 30 票不顯示百分比，避免造假感

type Count = { total: number; trust: number; discussA: number; discussB: number };

export async function GET(req: NextRequest) {
  const version = new URL(req.url).searchParams.get('version') || '';
  if (!VERSIONS.includes(version)) {
    return NextResponse.json({ error: 'bad version' }, { status: 400 });
  }
  try {
    const db = (await clientPromise).db();
    const col = db.collection('detective_votes');
    const total = await col.countDocuments({ case: 1, version });
    if (total < MIN_TO_SHOW) {
      return NextResponse.json({ total, show: false });
    }
    const trust = await col.countDocuments({ case: 1, version, belief: 'trust' });
    const discussA = await col.countDocuments({ case: 1, version, discuss: 'a' });
    const discussB = await col.countDocuments({ case: 1, version, discuss: 'b' });
    const out: Count & { show: boolean } = { total, trust, discussA, discussB, show: true };
    return NextResponse.json(out);
  } catch {
    return NextResponse.json({ total: 0, show: false });
  }
}

export async function POST(req: NextRequest) {
  let body: Record<string, unknown> = {};
  try { body = await req.json(); } catch { return NextResponse.json({ error: 'bad json' }, { status: 400 }); }
  const version = String(body.version || '');
  const belief = String(body.belief || '');
  const discuss = String(body.discuss || '');
  const deviceId = String(body.deviceId || '').slice(0, 40);
  if (!VERSIONS.includes(version) || !['trust', 'doubt'].includes(belief) || !['a', 'b'].includes(discuss) || !deviceId) {
    return NextResponse.json({ error: 'bad input' }, { status: 400 });
  }
  try {
    const db = (await clientPromise).db();
    const col = db.collection('detective_votes');
    // 每個裝置每個版本只算一票
    const exists = await col.findOne({ case: 1, version, deviceId });
    if (exists) {
      const total = await col.countDocuments({ case: 1, version });
      return NextResponse.json({ ok: true, duplicate: true, total });
    }
    // 簡單限速：同 ip 一分鐘最多 10 票
    const ip = req.headers.get('x-forwarded-for') || 'unknown';
    const recent = await col.countDocuments({ ipHash: hash(ip), createdAt: { $gt: new Date(Date.now() - 60000) } });
    if (recent >= 10) return NextResponse.json({ error: 'too fast' }, { status: 429 });
    await col.insertOne({
      case: 1, version, belief, discuss, deviceId,
      cookie: String(body.cookie || '').slice(0, 10),
      milk: String(body.milk || '').slice(0, 10),
      ipHash: hash(ip),
      createdAt: new Date(),
    });
    const total = await col.countDocuments({ case: 1, version });
    return NextResponse.json({ ok: true, total });
  } catch {
    return NextResponse.json({ error: 'server' }, { status: 500 });
  }
}

function hash(s: string): string {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return String(h);
}
