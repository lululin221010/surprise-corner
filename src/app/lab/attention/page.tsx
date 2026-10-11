'use client';
// 📄 路徑：src/app/lab/attention/page.tsx
// #07《你剛剛有看到嗎？》——兩回合的注意力小實驗（純前端，無後端）
// 規格：AIOS/05_Knowledge/SS_MiniApp_Candidate_Forest_v1_20261011.md（#07）＋策 2026-10-11 規格
// 埋點：GA4 事件 attn_*（沿用 layout.tsx 已接的 gtag）；?internal=1 可在這台裝置排除自己人的資料

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import ShareButtons from '@/components/ShareButtons';

/* ───────────── 軌跡（預先編排＝每個人看到同樣的畫面，正確答案固定且可計算） ───────────── */
type P = { cx: number; ax: number; wx: number; px: number; cy: number; ay: number; wy: number; py: number };

const AR = 1.25;            // 舞台高 = 寬 × 1.25（手機直式）
const R = 0.035;            // 圓點半徑（以舞台寬為 1）
const R1_SEC = 20;
const R2_SEC = 16;
const MARK_SEC = 4;         // 前 4 秒繼續標出目標（說明頁與倒數時也先停格看過一次）
const CLIP_SEC = 6.28;      // 魯魯走路影片長度（原 10 秒，後製加速 1.6 倍）
const CLIP_AR = 752 / 416;  // 影片寬高比（16:9 橫式，綠幕已去背成「彩色＋透明度」疊圖）
const CLIP_FEET = 0.9;      // 腳底在影片畫面高度的比例
const CAT_T0 = 6.5;         // 魯魯進場時間（秒）
const CAT_T1 = CAT_T0 + CLIP_SEC;   // 魯魯離場時間（秒）
const CAT_Y = 0.9;          // 腳底落在舞台高度的位置（0～1），可調

// 回合一：5 個圓點，前兩顆是目標（座標 y 用「以舞台寬為 1」的單位）
// 多個預先編排好的版本，每次遊玩隨機挑一個，答案不會永遠是同一個數字（正確答案由軌跡算出）
const R1_VARIANTS: P[][] = [
  [   // 碰 3 次
    { cx: 0.3842, ax: 0.1871, wx: 0.5067, px: 1.5653, cy: 0.3652, ay: 0.1623, wy: 0.529, py: 2.0238 },
    { cx: 0.3989, ax: 0.1665, wx: 0.6745, px: 0.0313, cy: 0.4146, ay: 0.2332, wy: 0.8323, py: 3.0468 },
    { cx: 0.5784, ax: 0.17, wx: 0.8116, px: 5.2943, cy: 0.4459, ay: 0.1494, wy: 0.6363, py: 0.6228 },
    { cx: 0.4139, ax: 0.1754, wx: 0.3861, px: 3.8503, cy: 0.3361, ay: 0.1625, wy: 0.4276, py: 1.9666 },
    { cx: 0.5501, ax: 0.2163, wx: 0.7906, px: 4.6687, cy: 0.4163, ay: 0.1591, wy: 0.7648, py: 3.338 },
  ],
  [   // 碰 2 次（目標與干擾圓點重疊也較少）
    { cx: 0.41, ax: 0.3271, wx: 0.4982, px: 1.4774, cy: 0.288, ay: 0.1873, wy: 0.5287, py: 3.7657 },
    { cx: 0.3343, ax: 0.308, wx: 0.4543, px: 3.6474, cy: 0.3664, ay: 0.114, wy: 0.4731, py: 4.9629 },
    { cx: 0.6733, ax: 0.2069, wx: 0.752, px: 0.5564, cy: 0.3936, ay: 0.112, wy: 0.4188, py: 2.3196 },
    { cx: 0.6858, ax: 0.23, wx: 0.3638, px: 4.0909, cy: 0.3344, ay: 0.1159, wy: 0.556, py: 5.9091 },
    { cx: 0.6597, ax: 0.1686, wx: 0.7553, px: 5.5526, cy: 0.4506, ay: 0.1128, wy: 0.8265, py: 0.2128 },
  ],
];

// 回合二：6 個圖形，前三個是目標；y 用「以舞台高為 1」的單位
const R2_VARIANTS: P[][] = [
  [   // 共穿過 5 次
    { cx: 0.4519, ax: 0.2775, wx: 0.4503, px: 4.3706, cy: 0.3051, ay: 0.0615, wy: 0.7094, py: 1.4998 },
    { cx: 0.5009, ax: 0.1532, wx: 0.5571, px: 0.4607, cy: 0.5242, ay: 0.0454, wy: 0.3803, py: 5.9957 },
    { cx: 0.5271, ax: 0.16, wx: 0.3639, px: 0.2473, cy: 0.7434, ay: 0.0611, wy: 0.6764, py: 4.8619 },
    { cx: 0.4356, ax: 0.2399, wx: 0.4793, px: 3.1426, cy: 0.2893, ay: 0.0663, wy: 0.3623, py: 5.4065 },
    { cx: 0.4754, ax: 0.3013, wx: 0.7498, px: 3.2116, cy: 0.5311, ay: 0.0828, wy: 0.6246, py: 1.9329 },
    { cx: 0.4687, ax: 0.1629, wx: 0.4551, px: 6.2792, cy: 0.7441, ay: 0.0582, wy: 0.324, py: 2.778 },
  ],
  [   // 共穿過 4 次
    { cx: 0.4855, ax: 0.3533, wx: 0.3265, px: 2.8104, cy: 0.2718, ay: 0.0619, wy: 0.6424, py: 3.3363 },
    { cx: 0.4765, ax: 0.2727, wx: 0.3726, px: 0.3428, cy: 0.4902, ay: 0.072, wy: 0.4577, py: 1.9336 },
    { cx: 0.5637, ax: 0.161, wx: 0.3255, px: 4.4262, cy: 0.7358, ay: 0.0443, wy: 0.6408, py: 2.9034 },
    { cx: 0.5146, ax: 0.2699, wx: 0.5153, px: 3.2747, cy: 0.3121, ay: 0.041, wy: 0.6159, py: 5.0751 },
    { cx: 0.5654, ax: 0.3269, wx: 0.387, px: 1.5903, cy: 0.5458, ay: 0.0702, wy: 0.5457, py: 6.2083 },
    { cx: 0.5549, ax: 0.1696, wx: 0.5157, px: 4.4981, cy: 0.7156, ay: 0.0356, wy: 0.3361, py: 1.6119 },
  ],
  [   // 共穿過 6 次
    { cx: 0.5308, ax: 0.1485, wx: 0.5281, px: 0.4705, cy: 0.3158, ay: 0.0637, wy: 0.5434, py: 1.0161 },
    { cx: 0.4669, ax: 0.2616, wx: 0.3975, px: 0.525, cy: 0.5328, ay: 0.0634, wy: 0.6969, py: 5.525 },
    { cx: 0.4753, ax: 0.2919, wx: 0.4434, px: 4.221, cy: 0.7416, ay: 0.0882, wy: 0.57, py: 0.0729 },
    { cx: 0.5528, ax: 0.2083, wx: 0.7684, px: 4.8316, cy: 0.2952, ay: 0.08, wy: 0.3772, py: 2.3106 },
    { cx: 0.5312, ax: 0.1403, wx: 0.3042, px: 3.0038, cy: 0.5418, ay: 0.0722, wy: 0.641, py: 4.938 },
    { cx: 0.5118, ax: 0.268, wx: 0.3355, px: 2.338, cy: 0.7419, ay: 0.0887, wy: 0.5065, py: 2.9137 },
  ],
];

const posOf = (p: P, t: number): [number, number] => [
  p.cx + p.ax * Math.sin(p.wx * t + p.px),
  p.cy + p.ay * Math.sin(p.wy * t + p.py),
];

// 正確答案由軌跡本身算出來，畫面看到什麼、答案就是什麼
function countR1(dots: P[]): number {
  let on = false;
  let c = 0;
  for (let i = 0; i <= R1_SEC * 60; i++) {
    const t = i / 60;
    const a = posOf(dots[0], t);
    const b = posOf(dots[1], t);
    const d = Math.hypot(a[0] - b[0], a[1] - b[1]);
    if (!on && d < 2 * R) { on = true; c++; }
    else if (on && d > 2 * R + 0.01) on = false;
  }
  return c;
}
function countR2(shapes: P[]): number {
  let total = 0;
  for (let k = 0; k < 3; k++) {
    const p = shapes[k];
    let prev = Math.sign(posOf(p, 0)[0] - 0.5);
    for (let i = 1; i <= R2_SEC * 60; i++) {
      const s = Math.sign(posOf(p, i / 60)[0] - 0.5);
      if (s !== prev && s !== 0) { total++; prev = s; }
    }
  }
  return total;
}
const R1_ANSWERS = R1_VARIANTS.map(countR1);
const R2_ANSWERS = R2_VARIANTS.map(countR2);

/* ───────────── 埋點 ───────────── */
declare global {
  interface Window { gtag?: (...args: unknown[]) => void; }
}
const INTERNAL_KEY = 'ss_internal';
function isInternal(): boolean {
  try { return localStorage.getItem(INTERNAL_KEY) === '1'; } catch { return false; }
}
function track(name: string, params: Record<string, string | number | boolean> = {}) {
  if (typeof window === 'undefined') return;
  const payload = { event_category: 'attention_lab', ...params };
  if (isInternal()) {
    // 自己人的資料不進統計，只留在 console 方便除錯
    console.debug('[attn:internal]', name, payload);
    return;
  }
  window.gtag?.('event', name, payload);
}

/* ───────────── 繪圖 ───────────── */
function smooth(x: number) { const c = Math.min(1, Math.max(0, x)); return c * c * (3 - 2 * c); }
function mix(a: number[], b: number[], u: number) { return a.map((v, i) => Math.round(v + (b[i] - v) * u)); }

function drawWindow(ctx: CanvasRenderingContext2D, W: number, H: number, t: number) {
  const x = 0.06 * W, y = 0.035 * H, w = 0.34 * W, h = 0.15 * H;
  const u = smooth((t - 8) / 3);                 // 第 8～11 秒漸變
  const day = [143, 211, 255], dusk = [255, 158, 107], night = [11, 18, 48];
  const c = u < 0.5 ? mix(day, dusk, u * 2) : mix(dusk, night, (u - 0.5) * 2);
  ctx.fillStyle = `rgb(${c[0]},${c[1]},${c[2]})`;
  ctx.fillRect(x, y, w, h);
  if (u > 0.55) {                                // 星星
    ctx.fillStyle = `rgba(255,255,255,${(u - 0.55) / 0.45})`;
    for (const [sx, sy] of [[0.2, 0.25], [0.55, 0.2], [0.8, 0.45], [0.35, 0.6], [0.7, 0.75]]) {
      ctx.fillRect(x + sx * w, y + sy * h, 2, 2);
    }
  }
  ctx.beginPath();                               // 太陽 → 月亮
  ctx.fillStyle = u < 0.6 ? `rgba(255,236,150,${1 - u})` : `rgba(235,240,255,${(u - 0.5) * 2})`;
  ctx.arc(x + w * 0.72, y + h * (0.42 + 0.2 * u), h * 0.16, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = 'rgba(255,255,255,0.35)';    // 窗框
  ctx.lineWidth = 3;
  ctx.strokeRect(x, y, w, h);
  ctx.beginPath(); ctx.moveTo(x + w / 2, y); ctx.lineTo(x + w / 2, y + h); ctx.stroke();
}

function drawShape(ctx: CanvasRenderingContext2D, kind: number, x: number, y: number, s: number) {
  ctx.beginPath();
  if (kind === 0) ctx.arc(x, y, s, 0, Math.PI * 2);
  else if (kind === 1) { ctx.moveTo(x, y - s * 1.15); ctx.lineTo(x + s * 1.05, y + s * 0.8); ctx.lineTo(x - s * 1.05, y + s * 0.8); ctx.closePath(); }
  else ctx.rect(x - s * 0.9, y - s * 0.9, s * 1.8, s * 1.8);
  ctx.fill();
}

function drawScene(ctx: CanvasRenderingContext2D, W: number, H: number, round: 1 | 2, t: number, set: P[]) {
  ctx.clearRect(0, 0, W, H);
  const g = ctx.createLinearGradient(0, 0, 0, H);
  g.addColorStop(0, '#222a43'); g.addColorStop(1, '#141a2c');
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  const marking = t < MARK_SEC;
  const pulse = 0.5 + 0.5 * Math.sin(t * 8);

  if (round === 1) {
    set.forEach((p, i) => {
      const [x, y] = posOf(p, t);
      const px = x * W, py = y * W;
      ctx.beginPath(); ctx.fillStyle = '#e9edf7'; ctx.arc(px, py, R * W, 0, Math.PI * 2); ctx.fill();
      if (marking && i < 2) {
        ctx.beginPath(); ctx.strokeStyle = `rgba(255,180,84,${0.55 + 0.45 * pulse})`; ctx.lineWidth = 3;
        ctx.arc(px, py, R * W + 6, 0, Math.PI * 2); ctx.stroke();
      }
    });
  } else {
    drawWindow(ctx, W, H, t);
    ctx.setLineDash([6, 8]); ctx.strokeStyle = 'rgba(255,255,255,0.28)'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(W / 2, H * 0.22); ctx.lineTo(W / 2, H); ctx.stroke(); ctx.setLineDash([]);
    set.forEach((p, i) => {
      const [x, y] = posOf(p, t);
      const px = x * W, py = y * H, s = 0.045 * W;
      ctx.fillStyle = '#e9edf7';
      drawShape(ctx, i % 3, px, py, s);
      if (marking && i < 3) {
        ctx.beginPath(); ctx.strokeStyle = `rgba(255,180,84,${0.55 + 0.45 * pulse})`; ctx.lineWidth = 3;
        ctx.arc(px, py, s * 1.55 + 4, 0, Math.PI * 2); ctx.stroke();
      }
    });
  }
}

// 魯魯（回合一）：影片本身就是從右走到左的完整畫面。這裡只需要「貓的大約位置」來放揭曉時的橘圈。
// 取樣自原影片（秒, 貓身體中心的 x 比例），查表時時間已換算成加速後的影片時間
const CAT_X: [number, number][] = [
  [0.25, 0.964], [0.5, 0.915], [1.0, 0.832], [1.5, 0.777], [2.0, 0.734], [2.5, 0.678], [3.0, 0.604],
  [3.5, 0.511], [4.0, 0.496], [4.5, 0.5], [5.0, 0.485], [5.5, 0.463], [6.0, 0.423], [6.5, 0.327],
  [7.0, 0.308], [7.5, 0.213], [8.0, 0.185], [8.5, 0.125], [9.0, 0.064], [9.5, 0.019],
].map(([s, x]) => [s / 1.6, x] as [number, number]);

function catCenterX(tv: number): number {
  if (tv <= CAT_X[0][0]) return CAT_X[0][1];
  for (let i = 1; i < CAT_X.length; i++) {
    if (tv <= CAT_X[i][0]) {
      const [t0, x0] = CAT_X[i - 1], [t1, x1] = CAT_X[i];
      return x0 + (x1 - x0) * ((tv - t0) / (t1 - t0));
    }
  }
  return CAT_X[CAT_X.length - 1][1];
}

/* ───────────── 畫面 ───────────── */
type Phase =
  | 'intro' | 'r1-brief' | 'r1-run' | 'r1-count' | 'r1-notice' | 'r1-reveal'
  | 'r2-brief' | 'r2-run' | 'r2-count' | 'r2-notice' | 'result';

type Seen1 = 'yes' | 'maybe' | 'no';
const SEEN1_OPTS: { id: Seen1; label: string }[] = [
  { id: 'yes', label: '有，我看到了' },
  { id: 'maybe', label: '好像有，但不確定' },
  { id: 'no', label: '沒有，只有圓點' },
];
const SEEN2_OPTS: { id: string; label: string }[] = [
  { id: 'grow', label: '有個圖形變大了' },
  { id: 'dusk', label: '窗外的天色變暗了' },
  { id: 'animal', label: '有動物走過去' },
  { id: 'none', label: '什麼也沒發生' },
  { id: 'unsure', label: '不確定' },
];

const btn = 'w-full rounded-xl px-4 py-3 text-base font-semibold transition-colors active:scale-[0.99]';
const btnMain = `${btn} bg-amber-400 text-slate-900 hover:bg-amber-300`;
const btnSub = `${btn} bg-white/10 text-white hover:bg-white/20 border border-white/15`;
const card = 'rounded-2xl border border-white/10 bg-white/5 p-5 text-white';

// 連續 count 個數字，正確答案落在其中的哪一格由 offset 決定（隨機），避免永遠擺在正中間
function numberOptions(answer: number, count: number, offset: number): number[] {
  const start = Math.max(0, answer - Math.min(offset, count - 1));
  return Array.from({ length: count }, (_, i) => start + i);
}

// 「怎樣才算」的小圖：把「碰到／穿過」跟「只是經過、靠近」分清楚
function RuleCard({ round }: { round: 1 | 2 }) {
  const dot = '#e9edf7';
  return (
    <div className="mb-4 grid grid-cols-2 gap-3 text-center text-sm">
      <div className="rounded-xl bg-white/5 p-3">
        <svg viewBox="0 0 120 70" className="mx-auto mb-2 h-16" aria-hidden="true">
          {round === 1 ? (
            <>
              <circle cx="50" cy="35" r="18" fill={dot} />
              <circle cx="72" cy="35" r="18" fill={dot} fillOpacity="0.8" />
            </>
          ) : (
            <>
              <line x1="60" y1="2" x2="60" y2="68" stroke="rgba(255,255,255,.45)" strokeDasharray="4 4" />
              <rect x="24" y="24" width="20" height="20" fill={dot} opacity="0.35" />
              <path d="M46 34 L82 34" stroke="#34d399" strokeWidth="2.5" />
              <rect x="84" y="24" width="20" height="20" fill={dot} />
            </>
          )}
        </svg>
        <div className="font-semibold text-emerald-300">✓ 算一次</div>
        <div className="text-white/70">{round === 1 ? '兩顆圓點「重疊」在一起' : '圖形越過虛線，跑到另一邊'}</div>
      </div>
      <div className="rounded-xl bg-white/5 p-3">
        <svg viewBox="0 0 120 70" className="mx-auto mb-2 h-16" aria-hidden="true">
          {round === 1 ? (
            <>
              <circle cx="40" cy="18" r="13" fill={dot} />
              <circle cx="82" cy="52" r="13" fill={dot} />
            </>
          ) : (
            <>
              <line x1="60" y1="2" x2="60" y2="68" stroke="rgba(255,255,255,.45)" strokeDasharray="4 4" />
              <rect x="22" y="24" width="20" height="20" fill={dot} />
              <path d="M44 34 L54 34 Q58 34 54 40 L44 52" stroke="#f87171" strokeWidth="2.5" fill="none" />
            </>
          )}
        </svg>
        <div className="font-semibold text-rose-300">✕ 不算</div>
        <div className="text-white/70">{round === 1 ? '只是從上方或下方經過、靠近，沒有重疊' : '碰到虛線又退回原來那一邊'}</div>
      </div>
    </div>
  );
}

export default function AttentionPage() {
  const [phase, setPhase] = useState<Phase>('intro');
  const [stageW, setStageW] = useState(340);
  const [r1Count, setR1Count] = useState<number | null>(null);
  const [r1Seen, setR1Seen] = useState<Seen1 | null>(null);
  const [r2Count, setR2Count] = useState<number | null>(null);
  const [r2Seen, setR2Seen] = useState<string | null>(null);
  const [skippedR2, setSkippedR2] = useState(false);
  const [cd, setCd] = useState<number | null>(null);   // 開始前倒數
  // 每次遊玩隨機挑軌跡版本與選項位置（初始值固定，掛載後才隨機，避免伺服器與瀏覽器畫面不一致）
  const [r1v, setR1v] = useState(0);
  const [r2v, setR2v] = useState(0);
  const [r1off, setR1off] = useState(2);
  const [r2off, setR2off] = useState(2);
  const r1Answer = R1_ANSWERS[r1v];
  const r2Answer = R2_ANSWERS[r2v];

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const catCanvasRef = useRef<HTMLCanvasElement>(null);   // 魯魯影片（去綠幕後逐格畫在這裡）
  const vidRef = useRef<HTMLVideoElement>(null);
  const offRef = useRef<HTMLCanvasElement | null>(null);   // 解碼用的離屏畫布（上半彩色、下半透明度）
  const ringRef = useRef<HTMLDivElement>(null);
  const stageWrapRef = useRef<HTMLDivElement>(null);
  const catFailedRef = useRef(false);                       // 魯魯影片是否沒能播出來（給事件處理用）
  const [catFailed, setCatFailed] = useState(false);        // 同上（給畫面顯示用）
  const firedRef = useRef<Set<string>>(new Set());

  const fireOnce = useCallback((key: string, name: string, params: Record<string, string | number | boolean> = {}) => {
    if (firedRef.current.has(key)) return;
    firedRef.current.add(key);
    track(name, params);
  }, []);

  // 隨機挑版本與選項位置；avoidR1 給「再數一次」用，確保換成不同的軌跡
  const reshuffle = useCallback((avoidR1: number | null = null) => {
    const randInt = (n: number) => Math.floor(Math.random() * n);
    let v = randInt(R1_VARIANTS.length);
    if (avoidR1 !== null && R1_VARIANTS.length > 1) {
      while (v === avoidR1) v = randInt(R1_VARIANTS.length);
    }
    setR1v(v);
    setR1off(randInt(5));
    setR2v(randInt(R2_VARIANTS.length));
    setR2off(randInt(5));
  }, []);

  // 排除自己人：網址帶 ?internal=1 之後這台裝置不再送事件，?internal=0 解除
  useEffect(() => {
    try {
      const q = new URLSearchParams(window.location.search).get('internal');
      if (q === '1') localStorage.setItem(INTERNAL_KEY, '1');
      if (q === '0') localStorage.removeItem(INTERNAL_KEY);
    } catch { /* 無痕模式等情況略過 */ }
  }, []);

  useEffect(() => {
    const fit = () => setStageW(Math.max(260, Math.min(window.innerWidth - 32, 420)));
    fit();
    window.addEventListener('resize', fit);
    return () => window.removeEventListener('resize', fit);
  }, []);

  const stageH = Math.round(stageW * AR);
  const running = phase === 'r1-run' || phase === 'r2-run' || phase === 'r1-reveal';
  const frozen = phase === 'r1-brief' || phase === 'r2-brief';   // 說明頁：停格顯示要盯的目標

  // 倒數 3、2、1 後才真正開始（目標框保持停格，讓人先看清楚要盯哪幾個）
  useEffect(() => {
    if (cd === null) return;
    const id = setTimeout(() => {
      if (cd > 1) { setCd(cd - 1); return; }
      setCd(null);
      if (phase === 'r1-brief') { setPhase('r1-run'); fireOnce('start', 'attn_start', { round: 1, variant: r1v }); }
      else if (phase === 'r2-brief') setPhase('r2-run');
    }, 1000);
    return () => clearTimeout(id);
  }, [cd, phase, fireOnce, r1v]);

  // 動畫迴圈
  useEffect(() => {
    if (!running && !frozen) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = Math.round(stageW * dpr);
    canvas.height = Math.round(stageH * dpr);
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const round: 1 | 2 = phase === 'r2-run' || phase === 'r2-brief' ? 2 : 1;
    const duration = round === 1 ? R1_SEC : R2_SEC;
    const replay = phase === 'r1-reveal';
    const REPLAY_FROM = CAT_T0 - 0.6, REPLAY_LEN = CAT_T1 - CAT_T0 + 1.2;
    const start = performance.now();
    let raf = 0;

    const frame = (now: number) => {
      const el = (now - start) / 1000;
      let t = el;
      if (frozen) t = 0;
      else if (replay) t = REPLAY_FROM + (el % REPLAY_LEN);
      else if (el >= duration) {
        setPhase(round === 1 ? 'r1-count' : 'r2-count');
        return;
      }
      drawScene(ctx, stageW, stageH, round, t, round === 1 ? R1_VARIANTS[r1v] : R2_VARIANTS[r2v]);

      // 魯魯：影片時間 = 舞台時間 - 進場時間；影片「彩色在上、透明度在下」，逐格合成
      const catCv = catCanvasRef.current;
      const vid = vidRef.current;
      const ringEl = ringRef.current;
      const tv = t - CAT_T0;
      const catOn = round === 1 && !frozen && tv >= 0 && tv <= CLIP_SEC;
      // 影片載入失敗（例如部分內建瀏覽器擋影片）：標記起來，這一回合不算「沒看到魯魯」
      if (round === 1 && !frozen && !replay && tv > 0.8 && vid && (vid.error || vid.readyState < 2)) {
        if (!catFailedRef.current) { catFailedRef.current = true; setCatFailed(true); }
      }
      if (catCv) {
        const fw = stageW, fh = Math.round(stageW / CLIP_AR);
        if (catCv.width !== fw || catCv.height !== fh) { catCv.width = fw; catCv.height = fh; }
        const cctx = catCv.getContext('2d');
        if (cctx && vid && catOn && vid.readyState >= 2) {
          if (vid.paused || Math.abs(vid.currentTime - tv) > 0.35) {
            vid.currentTime = Math.min(tv, CLIP_SEC - 0.05);
            void vid.play().catch(() => undefined);
          }
          let off = offRef.current;
          if (!off) { off = document.createElement('canvas'); offRef.current = off; }
          if (off.width !== fw || off.height !== fh * 2) { off.width = fw; off.height = fh * 2; }
          const octx = off.getContext('2d', { willReadFrequently: true });
          if (octx) {
            octx.drawImage(vid, 0, 0, fw, fh * 2);
            const src = octx.getImageData(0, 0, fw, fh * 2).data;
            const out = cctx.createImageData(fw, fh);
            const d = out.data, half = fw * fh * 4;
            for (let i = 0; i < half; i += 4) {
              d[i] = src[i]; d[i + 1] = src[i + 1]; d[i + 2] = src[i + 2];
              d[i + 3] = src[half + i];            // 下半部的紅色通道＝透明度
            }
            cctx.putImageData(out, 0, 0);
          }
        } else if (cctx) {
          cctx.clearRect(0, 0, fw, fh);
          if (vid && !vid.paused && !catOn) vid.pause();
        }
        const top = stageH * CAT_Y - fh * CLIP_FEET;
        catCv.style.transform = `translateY(${top}px)`;
      }
      if (ringEl) {
        if (replay && catOn) {
          const fh = stageW / CLIP_AR;
          const top = stageH * CAT_Y - fh * CLIP_FEET;
          const cx = catCenterX(tv) * stageW;
          const rw = stageW * 0.5, rh = fh * 0.62;
          ringEl.style.opacity = '1';
          ringEl.style.width = `${rw}px`;
          ringEl.style.height = `${rh}px`;
          ringEl.style.transform = `translate(${cx - rw / 2}px, ${top + fh * 0.6 - rh / 2}px)`;
        } else ringEl.style.opacity = '0';
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [running, frozen, phase, stageW, stageH, r1v, r2v]);

  // 在使用者按下按鈕的當下先「解鎖」影片播放（iOS Safari 要求第一次播放來自使用者操作）
  const unlockVideo = () => {
    const v = vidRef.current;
    if (!v) return;
    v.muted = true;
    void v.play().then(() => { v.pause(); v.currentTime = 0; }).catch(() => undefined);
  };
  const startR1 = () => { unlockVideo(); setCd(3); };

  const answerR1Count = (n: number) => { setR1Count(n); setPhase('r1-notice'); };

  const answerR1Seen = (s: Seen1) => {
    setR1Seen(s);
    const seen = s === 'yes';
    fireOnce('r1_answer', 'attn_r1_answer', {
      round: 1,
      primary_correct: r1Count === r1Answer,
      variant: r1v,
      unexpected_seen: seen,
      unexpected_choice: s,
      cat_unavailable: catFailedRef.current,   // true＝這個人的裝置沒播出魯魯，分析時要排除
    });
    if (catFailedRef.current) fireOnce('cat_unavailable', 'attn_cat_unavailable', { round: 1 });
    setPhase('r1-reveal');
    fireOnce('reveal', 'attn_reveal', { round: 1, unexpected_seen: seen });
  };

  const goR2Brief = () => {
    setPhase('r2-brief');
    fireOnce('retry', 'attn_retry', { round: 2 });
  };
  const startR2 = () => setCd(3);

  // 第一題數錯時，重新數一次（這次已經知道魯魯會來，所以不再計入事件）
  const retryR1 = () => {
    setR1Count(null);
    setR1Seen(null);
    reshuffle(r1v);   // 換一個不同的軌跡，答案也跟著不同，不能靠記憶
    setPhase('r1-brief');
  };

  const answerR2Count = (n: number) => { setR2Count(n); setPhase('r2-notice'); };

  const answerR2Seen = (id: string) => {
    setR2Seen(id);
    fireOnce('r2_answer', 'attn_r2_answer', {
      round: 2,
      primary_correct: r2Count === r2Answer,
      variant: r2v,
      unexpected_seen: id === 'dusk',
      unexpected_choice: id,
    });
    fireOnce('complete', 'attn_complete', { rounds: 2 });
    setPhase('result');
  };

  const skipToResult = () => {
    setSkippedR2(true);
    fireOnce('complete', 'attn_complete', { rounds: 1 });
    setPhase('result');
  };

  useEffect(() => {
    if (phase === 'result') fireOnce('result_view', 'attn_result_view', { rounds: skippedR2 ? 1 : 2 });
  }, [phase, skippedR2, fireOnce]);

  const restart = () => {
    firedRef.current = new Set();
    catFailedRef.current = false;
    setCatFailed(false);
    setR1Count(null); setR1Seen(null); setR2Count(null); setR2Seen(null); setSkippedR2(false);
    setPhase('intro');
  };

  /* ── 結果文字（只描述實際發生的事，不給能力標籤） ── */
  const seen1 = r1Seen === 'yes';
  const seen2 = r2Seen === 'dusk';
  const ok1 = r1Count === r1Answer;
  const ok2 = r2Count === r2Answer;
  let headline = '';
  if (skippedR2) headline = seen1 ? '第一次我就抓到魯魯了。' : '第一次我盯著圓點，魯魯從旁邊走過去了。';
  else if (!seen1 && seen2) headline = '第一次我漏掉魯魯。第二次，我開始防你了。';
  else if (seen1 && seen2) headline = '你抓到了我藏的兩件事。下次得換招了。';
  else if (seen1 && !seen2) headline = '魯魯抓到了，窗外的天色倒是溜走了。';
  else headline = '兩次都盯著主任務走。魯魯倒是很自在地路過了。';

  const showStage = running || frozen;
  const compact = frozen || phase === 'r1-reveal';   // 說明頁與揭曉頁：舞台縮小，讓文字與舞台同一屏看得到
  const showCat = phase === 'r1-run' || phase === 'r1-reveal';

  // 手機上舞台常在第一屏之外：開始倒數與正式播放時把舞台捲到最上面；其他畫面回到頂端
  useEffect(() => {
    const toStage = cd !== null || phase === 'r1-run' || phase === 'r2-run';
    const id = requestAnimationFrame(() => {
      const el = stageWrapRef.current;
      if (toStage && el) {
        // 網站頂端有固定導覽列，舞台要排在它下面，不能被蓋住
        let fixedTop = 0;
        let node = document.elementFromPoint(window.innerWidth / 2, 2) as HTMLElement | null;
        while (node && node !== document.body) {
          const pos = getComputedStyle(node).position;
          if (pos === 'fixed' || pos === 'sticky') { fixedTop = node.getBoundingClientRect().bottom; break; }
          node = node.parentElement;
        }
        const top = el.getBoundingClientRect().top + window.scrollY - fixedTop - 8;
        window.scrollTo({ top: Math.max(0, top), behavior: 'auto' });
      } else {
        window.scrollTo({ top: 0, behavior: 'auto' });
      }
    });
    return () => cancelAnimationFrame(id);
  }, [phase, cd]);

  return (
    <main className="min-h-screen px-4 py-6" style={{ background: 'linear-gradient(180deg,#0f1224 0%,#1a1740 100%)' }}>
      <div className="mx-auto flex flex-col" style={{ maxWidth: 440 }}>
        <div className="mb-3 flex items-center justify-between text-sm text-white/60" style={{ order: -2 }}>
          <Link href="/tools" className="hover:text-white">← 工具</Link>
          <span>專注力小遊戲 · 約 1 分鐘</span>
        </div>

        {/* 舞台：只在播放與回放時出現，問答時隱藏，避免對著停格畫面數。
            說明頁（frozen）時縮小成 60%，並讓說明卡片排在舞台上方，手機第一眼就看得到說明 */}
        <div ref={stageWrapRef} style={{ height: compact ? Math.round(stageH * 0.6) : undefined }}>
        <div
          className="relative mx-auto overflow-hidden rounded-2xl border border-white/10"
          style={{
            width: stageW,
            height: showStage ? stageH : 0,
            display: showStage ? 'block' : 'none',
            touchAction: 'manipulation',
            transform: compact ? 'scale(0.6)' : undefined,
            transformOrigin: 'top center',
          }}
          aria-label="注意力實驗舞台"
        >
          <canvas ref={canvasRef} style={{ width: stageW, height: stageH, display: 'block' }} />
          <div
            ref={ringRef}
            style={{ position: 'absolute', left: 0, top: 0, opacity: 0, border: '3px solid rgba(255,180,84,.95)', borderRadius: '50%', pointerEvents: 'none' }}
          />
          <canvas
            ref={catCanvasRef}
            style={{ position: 'absolute', left: 0, top: 0, width: stageW, height: Math.round(stageW / CLIP_AR), pointerEvents: 'none', display: showCat ? 'block' : 'none' }}
          />
          <video
            ref={vidRef}
            src="/lab/attention/lulu-walk.mp4"
            muted
            playsInline
            preload="auto"
            aria-hidden="true"
            style={{ position: 'fixed', left: 0, top: 0, width: 2, height: 2, opacity: 0, pointerEvents: 'none' }}
          />
          {phase === 'r1-brief' && (
            <div className="pointer-events-none absolute bottom-3 left-0 right-0 text-center text-sm font-semibold text-amber-300">
              橘框 ＝ 要盯的那兩顆
            </div>
          )}
          {phase === 'r2-brief' && (
            <div className="pointer-events-none absolute bottom-3 left-0 right-0 text-center text-sm font-semibold text-amber-300">
              橘框 ＝ 要盯的那三個
            </div>
          )}
          {cd !== null && (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/35 text-7xl font-bold text-white">
              {cd}
            </div>
          )}
          {phase === 'r1-run' && (
            <div className="pointer-events-none absolute bottom-3 left-0 right-0 text-center text-xs text-white/70">
              盯住剛才橘框的那兩顆，數它們互相碰到幾次
            </div>
          )}
          {phase === 'r2-run' && (
            <div className="pointer-events-none absolute bottom-3 left-0 right-0 text-center text-xs text-white/70">
              盯住剛才橘框的三個，數它們一共穿過中間虛線幾次
            </div>
          )}
        </div>
        </div>

        {phase === 'intro' && (
          <section className={card}>
            <h1 className="mb-1 text-2xl font-bold">你剛剛有看到嗎？</h1>
            <p className="mb-5 text-lg text-white/80">測試你的專注力</p>
            <button className={btnMain} onClick={() => { reshuffle(); setPhase('r1-brief'); }}>開始</button>
          </section>
        )}

        {phase === 'r1-brief' && (
          <section className={`${card} mb-3`} style={{ order: -1 }}>
            <h2 className="mb-2 text-xl font-bold">第一回合：盯住橘框的兩顆</h2>
            <p className="mb-2 leading-relaxed text-white/85">
              下面的圓點等一下會開始慢慢移動，橘框只會亮幾秒。
              請一直盯著那<b className="text-amber-300">兩顆</b>，看它們<b>互相碰到幾次</b>。
            </p>
            <RuleCard round={1} />
            <p className="mb-5 text-sm text-white/55">只要看、不用點，約 20 秒。看完我會問你幾次。</p>
            {cd === null
              ? <button className={btnMain} onClick={startR1}>我懂了，開始倒數</button>
              : <p className="text-center text-white/60">準備…</p>}
          </section>
        )}

        {phase === 'r1-count' && (
          <section className={card}>
            <h2 className="mb-4 text-xl font-bold">剛才橘框的那兩顆，互相碰到幾次？</h2>
            <div className="grid grid-cols-5 gap-2">
              {numberOptions(r1Answer, 5, r1off).map(n => (
                <button key={n} className={btnSub} onClick={() => answerR1Count(n)}>{n}</button>
              ))}
            </div>
          </section>
        )}

        {phase === 'r1-notice' && (
          <section className={card}>
            <h2 className="mb-4 text-xl font-bold">剛剛的畫面裡，除了圓點，還有出現別的東西嗎？</h2>
            <div className="flex flex-col gap-2">
              {SEEN1_OPTS.map(o => (
                <button key={o.id} className={btnSub} onClick={() => answerR1Seen(o.id)}>{o.label}</button>
              ))}
            </div>
          </section>
        )}

        {phase === 'r1-reveal' && (
          <section className={`${card} mt-3`}>
            {catFailed ? (
              <>
                <h2 className="mb-2 text-2xl font-bold">魯魯這次沒能走出來</h2>
                <p className="mb-2 leading-relaxed text-white/85">
                  你的瀏覽器沒有成功播放魯魯的影片，所以這一題「有沒有看到」不算數。
                  如果想完整玩，可以改用 Safari 或 Chrome 直接開這個網址。
                </p>
              </>
            ) : seen1 ? (
              <>
                <h2 className="mb-2 text-2xl font-bold">抓到了。😏</h2>
                <p className="mb-2 text-white/85">你有看到魯魯。那主任務呢？</p>
              </>
            ) : (
              <>
                <h2 className="mb-2 text-2xl font-bold">魯魯剛剛散步經過了。</h2>
                <p className="mb-2 leading-relaxed text-white/85">
                  不是你沒在看。你剛剛專心盯著圓點，眼前的東西就容易被漏掉。
                </p>
              </>
            )}
            <p className="mb-4 text-white/85">
              {ok1
                ? (seen1 ? `🎉 圓點碰了 ${r1Answer} 次，你數對了——兩邊都顧到了！` : `🎉 圓點碰了 ${r1Answer} 次，你數對了，盯得很準！`)
                : (seen1 ? `圓點其實碰了 ${r1Answer} 次。抓到魯魯了，圓點倒是趁機跑掉了，這題本來就容易數花眼。` : `圓點其實碰了 ${r1Answer} 次。這題本來就容易數花眼，數不中很正常。`)}
            </p>
            {!ok1 && (
              <div className="mb-4 rounded-xl bg-white/5 p-3 text-sm text-white/80">
                想扳回一城？
                <button className="ml-1 font-semibold text-amber-300 underline" onClick={retryR1}>這題再數一次</button>
                ，或者先<b>找朋友來試試</b>，看他們數幾次、有沒有看到魯魯。
                <div onClickCapture={(e) => {
                  if ((e.target as HTMLElement).closest('button')) track('attn_share_click', { rounds: 1, from: 'wrong_answer' });
                }}>
                  <ShareButtons
                    title="你剛剛有看到嗎？"
                    content="我數錯了……你來試試看，你數得出幾次嗎？👀（不劇透）"
                  />
                </div>
              </div>
            )}
            <button className={btnMain} onClick={goR2Brief}>不信？再來一次。這次你知道我會搞鬼了</button>
            <button className="mt-3 w-full text-sm text-white/50 underline" onClick={skipToResult}>先看結果就好</button>
          </section>
        )}

        {phase === 'r2-brief' && (
          <section className={`${card} mb-3`} style={{ order: -1 }}>
            <h2 className="mb-2 text-xl font-bold">第二回合：盯住橘框的三個</h2>
            <p className="mb-2 leading-relaxed text-white/85">
              這次有 6 個圖形在動，橘框只會亮幾秒。請一直盯著那<b className="text-amber-300">三個</b>，
              數它們<b>一共穿過中間虛線幾次</b>（來回都算，三個加起來）。
            </p>
            <RuleCard round={2} />
            <p className="mb-5 text-sm text-white/55">這次你知道畫面裡不只有圖形。約 16 秒。</p>
            {cd === null
              ? <button className={btnMain} onClick={startR2}>我懂了，開始倒數</button>
              : <p className="text-center text-white/60">準備…</p>}
          </section>
        )}

        {phase === 'r2-count' && (
          <section className={card}>
            <h2 className="mb-1 text-xl font-bold">那三個圖形，一共穿過中間線幾次？</h2>
            <p className="mb-4 text-sm text-white/55">三個加起來算，來回都算一次。</p>
            <div className="grid grid-cols-5 gap-2">
              {numberOptions(r2Answer, 5, r2off).map(n => (
                <button key={n} className={btnSub} onClick={() => answerR2Count(n)}>{n}</button>
              ))}
            </div>
          </section>
        )}

        {phase === 'r2-notice' && (
          <section className={card}>
            <h2 className="mb-4 text-xl font-bold">這次畫面還發生了什麼？</h2>
            <div className="flex flex-col gap-2">
              {SEEN2_OPTS.map(o => (
                <button key={o.id} className={btnSub} onClick={() => answerR2Seen(o.id)}>{o.label}</button>
              ))}
            </div>
          </section>
        )}

        {phase === 'result' && (
          <section className={card}>
            <h2 className="mb-1 text-xl font-bold">{headline}</h2>
            <ul className="my-4 space-y-2 text-white/85">
              <li>第一回合：主任務 {ok1 ? '✓' : '✕'}　魯魯 {seen1 ? '✓ 看到' : r1Seen === 'maybe' ? '？不確定' : '✕ 沒看到'}</li>
              {!skippedR2 && <li>第二回合：主任務 {ok2 ? '✓' : '✕'}　窗外的變化 {seen2 ? '✓ 看到' : '✕ 沒抓到'}</li>}
            </ul>
            <p className="mb-3 text-white/90">
              {skippedR2
                ? (ok1 ? '🎉 這題數對了，盯得很準！' : '這題數不中很正常。再玩一次，或找朋友來比比看？')
                : ok1 && ok2 ? '🎉 兩回合的數字都數對了，盯得很準！'
                : ok1 || ok2 ? '🎉 有一回合數對了。想拿滿分的話，再玩一次，或找朋友來比比看？'
                : '這次數字沒數中，這遊戲本來就容易看花眼。再玩一次，或找朋友來比比看？'}
            </p>
            <p className="text-sm text-white/55">
              這只是個小遊戲，不代表你的專注力好壞。換個心情再玩，結果可能就不一樣。
            </p>
            <div onClickCapture={(e) => {
              if ((e.target as HTMLElement).closest('button')) track('attn_share_click', { rounds: skippedR2 ? 1 : 2 });
            }}>
              <ShareButtons
                title="你剛剛有看到嗎？"
                content="我明明一直盯著螢幕，結果……算了，你自己試。👀（不劇透）"
              />
            </div>
            <button className={`${btnSub} mt-5`} onClick={restart}>再玩一次</button>
          </section>
        )}
      </div>
    </main>
  );
}
