'use client';
// 📁 src/app/games/lulu-run/page.tsx
// 🐱 魯魯跑酷 — HTML5 Canvas 小遊戲

import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';

// ── 常數 ─────────────────────────────────────────────
const W = 600, H = 200;
const GROUND = 158;
const GRAVITY = 0.65;
const JUMP_V = -13.5;
const CAT_X = 75;
const CAT_W = 40, CAT_H = 30;

type ObsType = 'roomba' | 'bowl' | 'wall';
interface Obs { x: number; type: ObsType }

const OBS: Record<ObsType, { w: number; h: number }> = {
  roomba: { w: 36, h: 30 },
  bowl:   { w: 32, h: 16 },
  wall:   { w: 18, h: 44 },
};

// ── 繪圖：背景 ───────────────────────────────────────
function drawBg(ctx: CanvasRenderingContext2D, offset: number) {
  const g = ctx.createLinearGradient(0, 0, 0, H);
  g.addColorStop(0, '#070514');
  g.addColorStop(1, '#0f0a28');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);

  // 星星（靜態）
  ctx.fillStyle = 'rgba(255,255,255,0.35)';
  [[40,12],[110,8],[190,18],[300,6],[420,14],[530,10],[570,22]].forEach(([x,y]) => {
    ctx.fillRect(x, y, 1.5, 1.5);
  });

  // 地板線
  ctx.fillStyle = 'rgba(124,58,237,0.25)';
  ctx.fillRect(0, GROUND, W, 2);

  // 地板格線（滾動）
  const tile = 50;
  const off = offset % tile;
  ctx.fillStyle = 'rgba(124,58,237,0.07)';
  for (let x = -off; x < W; x += tile) {
    ctx.fillRect(x, GROUND + 2, 1, H - GROUND - 2);
  }
}

// ── 繪圖：魯魯 ───────────────────────────────────────
function drawCat(ctx: CanvasRenderingContext2D, catY: number, frame: number, onGround: boolean) {
  const x = CAT_X;
  ctx.save();

  // 陰影
  ctx.fillStyle = 'rgba(124,58,237,0.18)';
  ctx.beginPath();
  ctx.ellipse(x + 18, GROUND + 5, 16, 4, 0, 0, Math.PI * 2);
  ctx.fill();

  // 身體
  ctx.fillStyle = '#f2ece0';
  ctx.beginPath();
  ctx.ellipse(x + 16, catY + 18, 16, 12, 0, 0, Math.PI * 2);
  ctx.fill();

  // 頭
  ctx.beginPath();
  ctx.arc(x + 28, catY + 9, 12, 0, Math.PI * 2);
  ctx.fill();

  // 耳朵
  ctx.fillStyle = '#f2ece0';
  [[x+22, catY+2, x+18, catY-7, x+27, catY+1],
   [x+33, catY+2, x+37, catY-7, x+40, catY+1]].forEach(([ax,ay,bx,by,cx,cy]) => {
    ctx.beginPath(); ctx.moveTo(ax,ay); ctx.lineTo(bx,by); ctx.lineTo(cx,cy); ctx.fill();
  });
  // 內耳粉
  ctx.fillStyle = '#e8a0a8';
  [[x+23, catY+1, x+20, catY-4, x+26, catY+0],
   [x+34, catY+1, x+36, catY-4, x+39, catY+0]].forEach(([ax,ay,bx,by,cx,cy]) => {
    ctx.beginPath(); ctx.moveTo(ax,ay); ctx.lineTo(bx,by); ctx.lineTo(cx,cy); ctx.fill();
  });

  // 眼睛（藍色）
  ctx.fillStyle = '#5ba8f0';
  ctx.beginPath(); ctx.ellipse(x+25, catY+8, 2.8, 3.2, 0, 0, Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(x+33, catY+8, 2.8, 3.2, 0, 0, Math.PI*2); ctx.fill();
  // 瞳孔
  ctx.fillStyle = '#1a1030';
  ctx.beginPath(); ctx.ellipse(x+26, catY+8, 1.4, 2.2, 0, 0, Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(x+34, catY+8, 1.4, 2.2, 0, 0, Math.PI*2); ctx.fill();

  // 鼻子
  ctx.fillStyle = '#e8a0a8';
  ctx.beginPath();
  ctx.moveTo(x+29, catY+13); ctx.lineTo(x+27, catY+11); ctx.lineTo(x+31, catY+11);
  ctx.fill();

  // 鬍鬚
  ctx.strokeStyle = 'rgba(200,185,165,0.55)';
  ctx.lineWidth = 0.8;
  [[x+26,catY+12,x+16,catY+10],[x+26,catY+13,x+16,catY+13],
   [x+32,catY+12,x+42,catY+10],[x+32,catY+13,x+42,catY+13]].forEach(([ax,ay,bx,by]) => {
    ctx.beginPath(); ctx.moveTo(ax,ay); ctx.lineTo(bx,by); ctx.stroke();
  });

  // 尾巴
  ctx.strokeStyle = '#f2ece0';
  ctx.lineWidth = 3.5;
  ctx.lineCap = 'round';
  const wag = Math.sin(frame * 0.13) * 7;
  ctx.beginPath();
  ctx.moveTo(x, catY+20);
  ctx.quadraticCurveTo(x-10, catY+30+wag, x-4, catY+16+wag);
  ctx.stroke();

  // 腳
  ctx.strokeStyle = '#f2ece0';
  ctx.lineWidth = 3.5;

  if (!onGround) {
    // 跳躍姿勢：腳收起
    ctx.beginPath(); ctx.moveTo(x+10,catY+26); ctx.lineTo(x+7,catY+20); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x+22,catY+26); ctx.lineTo(x+25,catY+20); ctx.stroke();
  } else {
    const lf = Math.floor(frame/5) % 4;
    const poses = [[0,10,18,26],[4,14,14,22],[8,18,10,18],[4,14,14,22]];
    const [a,b,c,d] = poses[lf];
    ctx.beginPath(); ctx.moveTo(x+20,catY+26); ctx.lineTo(x+20-a,catY+32); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x+26,catY+26); ctx.lineTo(x+26+b,catY+32); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x+8,catY+26); ctx.lineTo(x+8-c,catY+32); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x+14,catY+26); ctx.lineTo(x+14+d,catY+32); ctx.stroke();
  }

  ctx.restore();
}

// ── 繪圖：障礙物 ─────────────────────────────────────
function drawObs(ctx: CanvasRenderingContext2D, obs: Obs) {
  const { x, type } = obs;
  ctx.save();

  if (type === 'roomba') {
    // 掃地機器人
    ctx.fillStyle = '#3a3a58';
    ctx.beginPath(); ctx.arc(x+18, GROUND-15, 18, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = '#5a5a78';
    ctx.beginPath(); ctx.arc(x+18, GROUND-15, 13, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = '#50c878';
    ctx.beginPath(); ctx.arc(x+13, GROUND-17, 2, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(x+21, GROUND-17, 2, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = '#222232';
    ctx.fillRect(x+4, GROUND-4, 7, 4);
    ctx.fillRect(x+25, GROUND-4, 7, 4);

  } else if (type === 'bowl') {
    // 水盆（魯魯的剋星）
    ctx.fillStyle = '#1e4a7a';
    ctx.beginPath();
    ctx.moveTo(x, GROUND-16); ctx.lineTo(x+32, GROUND-16);
    ctx.lineTo(x+28, GROUND); ctx.lineTo(x+4, GROUND);
    ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#4a90d0';
    ctx.beginPath(); ctx.ellipse(x+16, GROUND-13, 13, 4, 0, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,0.25)';
    ctx.beginPath(); ctx.ellipse(x+11, GROUND-14, 5, 1.8, -0.2, 0, Math.PI*2); ctx.fill();

  } else {
    // 牆角
    const g = ctx.createLinearGradient(x, 0, x+18, 0);
    g.addColorStop(0, '#3a2e20'); g.addColorStop(1, '#5a4a38');
    ctx.fillStyle = g;
    ctx.fillRect(x, GROUND-44, 18, 44);
    ctx.fillStyle = '#7a6a58';
    ctx.fillRect(x, GROUND-8, 18, 8);
    ctx.strokeStyle = 'rgba(255,255,255,0.05)';
    ctx.lineWidth = 1;
    for (let wy = GROUND-44+10; wy < GROUND-8; wy += 11) {
      ctx.beginPath(); ctx.moveTo(x, wy); ctx.lineTo(x+18, wy); ctx.stroke();
    }
  }
  ctx.restore();
}

// ── 主元件 ───────────────────────────────────────────
export default function LuluRunPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef    = useRef<number>(0);
  const uiRef     = useRef<'idle'|'running'|'over'>('idle');

  const gs = useRef({
    catY: GROUND - CAT_H, catVY: 0, onGround: true,
    frame: 0, offset: 0, speed: 4,
    score: 0, highScore: 0,
    obstacles: [] as Obs[],
    nextObs: 90,
  });

  const [ui, setUi]         = useState<'idle'|'running'|'over'>('idle');
  const [score, setScore]   = useState(0);
  const [best, setBest]     = useState(0);
  const [isNew, setIsNew]   = useState(false);

  useEffect(() => {
    const hs = parseInt(localStorage.getItem('lulu-run-hs') || '0');
    gs.current.highScore = hs;
    setBest(hs);
  }, []);

  const jump = useCallback(() => {
    if (gs.current.onGround) {
      gs.current.catVY = JUMP_V;
      gs.current.onGround = false;
    }
  }, []);

  const startGame = useCallback(() => {
    const s = gs.current;
    s.catY = GROUND - CAT_H; s.catVY = 0; s.onGround = true;
    s.frame = 0; s.offset = 0; s.speed = 4;
    s.score = 0; s.obstacles = []; s.nextObs = 90;
    uiRef.current = 'running';
    setUi('running'); setScore(0); setIsNew(false);
  }, []);

  // Game loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    const loop = () => {
      const s = gs.current;

      if (uiRef.current === 'running') {
        s.frame++;
        s.offset += s.speed;
        s.score = Math.floor(s.offset / 10);
        s.speed = Math.min(4 + s.score * 0.003, 9);

        // 物理
        s.catVY += GRAVITY;
        s.catY  += s.catVY;
        if (s.catY >= GROUND - CAT_H) {
          s.catY = GROUND - CAT_H; s.catVY = 0; s.onGround = true;
        }

        // 生成障礙物
        s.nextObs -= s.speed;
        if (s.nextObs <= 0) {
          const types: ObsType[] = ['roomba','bowl','wall','roomba','bowl'];
          s.obstacles.push({ x: W + 20, type: types[Math.floor(Math.random() * types.length)] });
          s.nextObs = 180 + Math.random() * 240;
        }
        s.obstacles = s.obstacles.map(o => ({ ...o, x: o.x - s.speed })).filter(o => o.x > -60);

        // 碰撞
        const cx = CAT_X + 10, cy = s.catY + 4, cw = CAT_W - 16, ch = CAT_H - 6;
        for (const obs of s.obstacles) {
          const { w, h } = OBS[obs.type];
          const ox = obs.x + 4, oy = GROUND - h + 2, ow = w - 8, oh = h - 2;
          if (cx < ox+ow && cx+cw > ox && cy < oy+oh && cy+ch > oy) {
            uiRef.current = 'over';
            const newRecord = s.score > s.highScore;
            if (newRecord) { s.highScore = s.score; localStorage.setItem('lulu-run-hs', String(s.score)); }
            setUi('over'); setScore(s.score); setBest(s.highScore); setIsNew(newRecord);
            break;
          }
        }

        if (s.frame % 20 === 0) setScore(s.score);
      }

      // 繪製
      drawBg(ctx, gs.current.offset);
      gs.current.obstacles.forEach(o => drawObs(ctx, o));
      drawCat(ctx, gs.current.catY, gs.current.frame, gs.current.onGround);

      // 分數
      ctx.fillStyle = 'rgba(255,255,255,0.65)';
      ctx.font = 'bold 13px monospace';
      ctx.textAlign = 'right';
      ctx.fillText(`${gs.current.score}m`, W - 12, 20);
      ctx.fillStyle = 'rgba(167,139,250,0.45)';
      ctx.font = '10px monospace';
      ctx.fillText(`最高 ${gs.current.highScore}m`, W - 12, 34);

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // 鍵盤
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code !== 'Space' && e.code !== 'ArrowUp') return;
      e.preventDefault();
      if (uiRef.current === 'idle' || uiRef.current === 'over') startGame();
      else jump();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [jump, startGame]);

  const handleTap = () => {
    if (uiRef.current === 'idle' || uiRef.current === 'over') startGame();
    else jump();
  };

  return (
    <div style={{ minHeight: '100vh', background: '#070514', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>

      <h1 style={{ background: 'linear-gradient(135deg,#e9d5ff,#a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontSize: '1.5rem', fontWeight: 900, marginBottom: '0.2rem' }}>
        🐱 魯魯跑酷
      </h1>
      <p style={{ color: '#6b7280', fontSize: '0.78rem', marginBottom: '1.2rem', textAlign: 'center' }}>
        幫魯魯跨過障礙物——別讓牠再撞牆了！
      </p>

      <div
        style={{ position: 'relative', cursor: 'pointer', borderRadius: '14px', overflow: 'hidden', border: '1px solid rgba(124,58,237,0.4)', boxShadow: '0 0 28px rgba(124,58,237,0.18)', userSelect: 'none' }}
        onClick={handleTap}
        onTouchStart={e => { e.preventDefault(); handleTap(); }}
      >
        <canvas ref={canvasRef} width={W} height={H} style={{ display: 'block', maxWidth: '100%', height: 'auto' }} />

        {/* 開始畫面 */}
        {ui === 'idle' && (
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(7,5,20,0.78)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ fontSize: '2.2rem', marginBottom: '0.5rem' }}>🐱</div>
            <p style={{ color: '#e9d5ff', fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.3rem' }}>點擊螢幕 / 按空白鍵 開始</p>
            <p style={{ color: '#4b5563', fontSize: '0.74rem' }}>跳過 掃地機器人 🤖　水盆 💧　牆角 🧱</p>
          </div>
        )}

        {/* 結束畫面 */}
        {ui === 'over' && (
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(7,5,20,0.82)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ fontSize: '1.8rem', marginBottom: '0.3rem' }}>💥</div>
            <p style={{ color: '#fca5a5', fontWeight: 700, fontSize: '1rem', margin: '0 0 0.3rem' }}>魯魯撞到了！</p>
            <p style={{ color: '#e9d5ff', fontSize: '1rem', margin: '0 0 0.15rem' }}>跑了 <strong style={{ color: '#c4b5fd' }}>{score}m</strong></p>
            {isNew && <p style={{ color: '#fcd34d', fontSize: '0.82rem', margin: '0 0 0.3rem' }}>🏆 新紀錄！</p>}
            <p style={{ color: '#6b7280', fontSize: '0.72rem', marginTop: '0.5rem' }}>點擊 / 空白鍵 再試一次</p>
          </div>
        )}
      </div>

      <p style={{ color: '#374151', fontSize: '0.72rem', marginTop: '0.9rem', textAlign: 'center' }}>
        桌機：空白鍵跳　手機：點螢幕跳
      </p>

      <Link href="/" style={{ color: '#4b5563', fontSize: '0.78rem', marginTop: '1.5rem', textDecoration: 'none' }}>
        ← 回首頁
      </Link>
    </div>
  );
}
