'use client';
// 📄 路徑：src/app/games/lulu-fish/page.tsx

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

const W = 600;
const H = 320;
const GAME_DURATION = 30;

type Fish = {
  id: number;
  x: number;
  y: number;
  w: number;
  h: number;
  speed: number;
  dir: 1 | -1; // 1=往右, -1=往左
  color: string;
  points: number;
  caught: boolean;
  splashTimer: number;
  wobble: number; // 上下擺動 phase
};

type Bubble = {
  x: number;
  y: number;
  r: number;
  speed: number;
};

let fishIdCounter = 0;

function makeFish(): Fish {
  const fromLeft = Math.random() < 0.5;
  const size = Math.random();
  let w: number, h: number, speed: number, color: string, points: number;

  if (size < 0.5) {
    // 小魚 — 快，1分
    w = 36; h = 18; speed = 2.5 + Math.random() * 1.5;
    color = '#f97316'; points = 1;
  } else if (size < 0.82) {
    // 中魚 — 中速，2分
    w = 52; h = 26; speed = 1.6 + Math.random() * 1;
    color = '#38bdf8'; points = 2;
  } else {
    // 大金魚 — 慢，3分
    w = 70; h = 35; speed = 0.9 + Math.random() * 0.6;
    color = '#fbbf24'; points = 3;
  }

  return {
    id: fishIdCounter++,
    x: fromLeft ? -w - 10 : W + 10,
    y: 40 + Math.random() * (H - 100),
    w, h, speed,
    dir: fromLeft ? 1 : -1,
    color, points,
    caught: false,
    splashTimer: 0,
    wobble: Math.random() * Math.PI * 2,
  };
}

function makeBubble(): Bubble {
  return {
    x: Math.random() * W,
    y: H,
    r: 2 + Math.random() * 4,
    speed: 0.4 + Math.random() * 0.6,
  };
}

function drawFish(ctx: CanvasRenderingContext2D, f: Fish, tick: number) {
  ctx.save();
  const cx = f.x + f.w / 2;
  const cy = f.y + f.h / 2 + Math.sin(f.wobble + tick * 0.05) * 3;
  ctx.translate(cx, cy);
  if (f.dir === -1) ctx.scale(-1, 1); // 翻轉方向

  // 身體
  ctx.beginPath();
  ctx.ellipse(0, 0, f.w / 2, f.h / 2, 0, 0, Math.PI * 2);
  ctx.fillStyle = f.color;
  ctx.fill();

  // 魚鱗光澤
  ctx.beginPath();
  ctx.ellipse(-f.w * 0.05, -f.h * 0.15, f.w * 0.25, f.h * 0.18, -0.3, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(255,255,255,0.25)';
  ctx.fill();

  // 尾巴
  ctx.beginPath();
  ctx.moveTo(-f.w / 2 + 4, 0);
  ctx.lineTo(-f.w / 2 - f.w * 0.3, -f.h * 0.5);
  ctx.lineTo(-f.w / 2 - f.w * 0.3, f.h * 0.5);
  ctx.closePath();
  ctx.fillStyle = f.color;
  ctx.fill();

  // 眼睛
  ctx.beginPath();
  ctx.arc(f.w * 0.28, -f.h * 0.1, f.h * 0.14, 0, Math.PI * 2);
  ctx.fillStyle = '#fff';
  ctx.fill();
  ctx.beginPath();
  ctx.arc(f.w * 0.29, -f.h * 0.1, f.h * 0.08, 0, Math.PI * 2);
  ctx.fillStyle = '#1e293b';
  ctx.fill();

  // 嘴巴
  ctx.beginPath();
  ctx.arc(f.w * 0.42, f.h * 0.05, f.h * 0.07, 0, Math.PI);
  ctx.strokeStyle = 'rgba(0,0,0,0.3)';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.restore();
}

function drawSplash(ctx: CanvasRenderingContext2D, f: Fish) {
  const cx = f.x + f.w / 2;
  const cy = f.y + f.h / 2;
  const progress = 1 - f.splashTimer / 30;
  const r = f.w * 0.6 * progress;
  ctx.save();
  ctx.globalAlpha = f.splashTimer / 30;
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.strokeStyle = '#fff';
  ctx.lineWidth = 2;
  ctx.stroke();
  // 星形爆炸
  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * Math.PI * 2;
    const len = r * 0.8;
    ctx.beginPath();
    ctx.moveTo(cx + Math.cos(angle) * r * 0.4, cy + Math.sin(angle) * r * 0.4);
    ctx.lineTo(cx + Math.cos(angle) * len, cy + Math.sin(angle) * len);
    ctx.stroke();
  }
  ctx.restore();
}

export default function LuluFishPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef({
    status: 'idle' as 'idle' | 'playing' | 'gameover',
    score: 0,
    timeLeft: GAME_DURATION,
    fishes: [] as Fish[],
    bubbles: [] as Bubble[],
    spawnTimer: 0,
    bubbleTimer: 0,
    tick: 0,
    highScore: 0,
  });
  const animRef = useRef<number>(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [ui, setUi] = useState({ status: 'idle' as 'idle' | 'playing' | 'gameover', score: 0, timeLeft: GAME_DURATION, highScore: 0 });

  useEffect(() => {
    const hs = parseInt(localStorage.getItem('lulu-fish-hs') || '0');
    stateRef.current.highScore = hs;
    setUi(u => ({ ...u, highScore: hs }));
    drawFrame();
    return () => {
      cancelAnimationFrame(animRef.current);
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  function startGame() {
    const s = stateRef.current;
    s.status = 'playing';
    s.score = 0;
    s.timeLeft = GAME_DURATION;
    s.fishes = [];
    s.bubbles = Array.from({ length: 8 }, makeBubble);
    s.spawnTimer = 0;
    s.bubbleTimer = 0;
    s.tick = 0;
    setUi(u => ({ ...u, status: 'playing', score: 0, timeLeft: GAME_DURATION }));

    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      s.timeLeft -= 1;
      setUi(u => ({ ...u, timeLeft: s.timeLeft }));
      if (s.timeLeft <= 0) {
        endGame();
      }
    }, 1000);
  }

  function endGame() {
    const s = stateRef.current;
    s.status = 'gameover';
    if (timerRef.current) clearInterval(timerRef.current);
    if (s.score > s.highScore) {
      s.highScore = s.score;
      localStorage.setItem('lulu-fish-hs', String(s.score));
    }
    setUi(u => ({ ...u, status: 'gameover', score: s.score, highScore: s.highScore }));
  }

  function handleClick(e: React.MouseEvent<HTMLCanvasElement>) {
    const s = stateRef.current;
    if (s.status !== 'playing') return;
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const scaleX = W / rect.width;
    const scaleY = H / rect.height;
    const mx = (e.clientX - rect.left) * scaleX;
    const my = (e.clientY - rect.top) * scaleY;

    for (const f of s.fishes) {
      if (f.caught) continue;
      if (mx >= f.x && mx <= f.x + f.w && my >= f.y && my <= f.y + f.h) {
        f.caught = true;
        f.splashTimer = 30;
        s.score += f.points;
        setUi(u => ({ ...u, score: s.score }));
        break;
      }
    }
  }

  function handleTouch(e: React.TouchEvent<HTMLCanvasElement>) {
    e.preventDefault();
    const s = stateRef.current;
    if (s.status === 'idle' || s.status === 'gameover') { startGame(); return; }
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const scaleX = W / rect.width;
    const scaleY = H / rect.height;
    const touch = e.touches[0];
    const mx = (touch.clientX - rect.left) * scaleX;
    const my = (touch.clientY - rect.top) * scaleY;

    for (const f of s.fishes) {
      if (f.caught) continue;
      if (mx >= f.x && mx <= f.x + f.w && my >= f.y && my <= f.y + f.h) {
        f.caught = true;
        f.splashTimer = 30;
        s.score += f.points;
        setUi(u => ({ ...u, score: s.score }));
        break;
      }
    }
  }

  function drawFrame() {
    const canvas = canvasRef.current;
    if (!canvas) { animRef.current = requestAnimationFrame(drawFrame); return; }
    const ctx = canvas.getContext('2d')!;
    const s = stateRef.current;
    s.tick++;

    // 背景水底
    const grad = ctx.createLinearGradient(0, 0, 0, H);
    grad.addColorStop(0, '#0c4a6e');
    grad.addColorStop(1, '#082f49');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    // 水波紋
    for (let i = 0; i < 4; i++) {
      const waveY = 15 + i * 8;
      const offset = Math.sin(s.tick * 0.03 + i) * 8;
      ctx.beginPath();
      ctx.moveTo(0, waveY);
      for (let x = 0; x <= W; x += 20) {
        ctx.lineTo(x, waveY + Math.sin(x * 0.02 + s.tick * 0.04 + i) * 4 + offset * 0.3);
      }
      ctx.strokeStyle = `rgba(125,211,252,${0.08 + i * 0.03})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }

    // 海草
    for (let i = 0; i < 5; i++) {
      const bx = 60 + i * 110 + Math.sin(i) * 20;
      const sway = Math.sin(s.tick * 0.04 + i) * 8;
      ctx.beginPath();
      ctx.moveTo(bx, H);
      ctx.quadraticCurveTo(bx + sway, H - 30, bx + sway * 0.5, H - 55);
      ctx.quadraticCurveTo(bx + sway * 1.2, H - 75, bx + sway * 0.8, H - 90);
      ctx.strokeStyle = `rgba(34,197,94,0.5)`;
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      ctx.stroke();
    }

    // 泡泡
    if (s.status === 'playing') {
      s.bubbleTimer++;
      if (s.bubbleTimer > 40) { s.bubbleTimer = 0; s.bubbles.push(makeBubble()); }
    }
    s.bubbles = s.bubbles.filter(b => b.y > -10);
    for (const b of s.bubbles) {
      b.y -= b.speed;
      b.x += Math.sin(s.tick * 0.05 + b.r) * 0.4;
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(186,230,253,0.4)';
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    if (s.status === 'playing') {
      // 生魚
      s.spawnTimer++;
      const spawnRate = Math.max(60, 120 - (GAME_DURATION - s.timeLeft) * 2);
      if (s.spawnTimer > spawnRate) {
        s.spawnTimer = 0;
        s.fishes.push(makeFish());
      }

      // 移動 + 清理
      s.fishes = s.fishes.filter(f => {
        if (f.caught && f.splashTimer <= 0) return false;
        if (!f.caught && (f.x > W + 80 || f.x < -80)) return false;
        return true;
      });

      for (const f of s.fishes) {
        if (!f.caught) {
          f.x += f.speed * f.dir;
          f.wobble += 0.05;
        }
        if (f.splashTimer > 0) f.splashTimer--;
      }
    }

    // 畫魚
    for (const f of s.fishes) {
      if (f.caught) {
        if (f.splashTimer > 0) drawSplash(ctx, f);
      } else {
        drawFish(ctx, f, s.tick);
      }
    }

    // 魯魯貓爪（右下角）
    ctx.save();
    ctx.translate(W - 55, H - 10);
    ctx.rotate(-0.3 + Math.sin(s.tick * 0.08) * 0.08);
    // 手掌
    ctx.beginPath();
    ctx.ellipse(0, 0, 28, 22, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#fde68a';
    ctx.fill();
    ctx.strokeStyle = '#d97706';
    ctx.lineWidth = 1.5;
    ctx.stroke();
    // 肉墊
    ctx.beginPath();
    ctx.ellipse(0, 4, 12, 9, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#fca5a5';
    ctx.fill();
    // 爪指
    [[-14, -8], [-5, -14], [6, -14], [15, -8]].forEach(([dx, dy]) => {
      ctx.beginPath();
      ctx.ellipse(dx, dy, 6, 5, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#fde68a';
      ctx.fill();
      ctx.strokeStyle = '#d97706';
      ctx.lineWidth = 1;
      ctx.stroke();
    });
    ctx.restore();

    // Idle 畫面
    if (s.status === 'idle') {
      ctx.fillStyle = 'rgba(0,0,0,0.55)';
      ctx.fillRect(0, 0, W, H);
      ctx.textAlign = 'center';
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 28px sans-serif';
      ctx.fillText('🐱 魯魯抓魚', W / 2, H / 2 - 30);
      ctx.font = '16px sans-serif';
      ctx.fillStyle = '#bae6fd';
      ctx.fillText('點擊或按空白鍵開始', W / 2, H / 2 + 5);
      ctx.font = '13px sans-serif';
      ctx.fillStyle = '#94a3b8';
      ctx.fillText('30 秒內抓越多越好！大魚值 3 分、中魚 2 分、小魚 1 分', W / 2, H / 2 + 32);
    }

    // 結束畫面
    if (s.status === 'gameover') {
      ctx.fillStyle = 'rgba(0,0,0,0.6)';
      ctx.fillRect(0, 0, W, H);
      ctx.textAlign = 'center';
      ctx.font = 'bold 26px sans-serif';
      ctx.fillStyle = '#fbbf24';
      ctx.fillText('時間到！', W / 2, H / 2 - 40);
      ctx.font = 'bold 42px sans-serif';
      ctx.fillStyle = '#fff';
      ctx.fillText(`${s.score} 分`, W / 2, H / 2 + 5);
      ctx.font = '15px sans-serif';
      ctx.fillStyle = '#94a3b8';
      ctx.fillText(`最高紀錄：${s.highScore} 分`, W / 2, H / 2 + 32);
      ctx.font = '14px sans-serif';
      ctx.fillStyle = '#bae6fd';
      ctx.fillText('點擊或按空白鍵再玩一次', W / 2, H / 2 + 58);
    }

    animRef.current = requestAnimationFrame(drawFrame);
  }

  // 鍵盤
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.code === 'Space') {
        e.preventDefault();
        const s = stateRef.current;
        if (s.status === 'idle' || s.status === 'gameover') startGame();
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f0a1e 0%, #082f49 50%, #0a1628 100%)',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', padding: '1rem',
    }}>
      {/* 標題 */}
      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <h1 style={{ color: '#fff', fontSize: '1.6rem', fontWeight: 800, margin: '0 0 0.2rem' }}>🐟 魯魯抓魚</h1>
        <p style={{ color: '#7dd3fc', fontSize: '0.85rem', margin: 0 }}>點魚抓魚，30 秒限時挑戰！</p>
      </div>

      {/* 分數列 */}
      <div style={{ display: 'flex', gap: '2rem', marginBottom: '0.8rem', color: '#fff', fontSize: '0.95rem', fontWeight: 700 }}>
        <span>🐟 {ui.score} 分</span>
        <span style={{ color: ui.timeLeft <= 10 ? '#f87171' : '#7dd3fc' }}>⏱ {ui.timeLeft}s</span>
        <span style={{ color: '#fbbf24' }}>🏆 {ui.highScore}</span>
      </div>

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        width={W}
        height={H}
        onClick={(e) => {
          const s = stateRef.current;
          if (s.status === 'idle' || s.status === 'gameover') { startGame(); return; }
          handleClick(e);
        }}
        onTouchStart={handleTouch}
        style={{
          width: '100%', maxWidth: `${W}px`,
          borderRadius: '16px',
          border: '2px solid rgba(125,211,252,0.3)',
          cursor: 'crosshair',
          touchAction: 'none',
          boxShadow: '0 0 40px rgba(14,165,233,0.3)',
        }}
      />

      {/* 說明 */}
      <div style={{ marginTop: '1rem', color: '#94a3b8', fontSize: '0.78rem', textAlign: 'center' }}>
        🖱 點魚抓魚 &nbsp;|&nbsp; ⌨️ 空白鍵開始 &nbsp;|&nbsp; 📱 手機點螢幕
      </div>
      <div style={{ marginTop: '0.4rem', color: '#64748b', fontSize: '0.75rem', textAlign: 'center' }}>
        🟡 大金魚 3分 &nbsp;·&nbsp; 🔵 中魚 2分 &nbsp;·&nbsp; 🟠 小魚 1分
      </div>

      {/* 導航 */}
      <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1.5rem' }}>
        <Link href="/games" style={{ color: '#7c3aed', fontSize: '0.9rem', textDecoration: 'none', fontWeight: 600 }}>← 小遊戲</Link>
        <Link href="/games/lulu-run" style={{ color: '#f59e0b', fontSize: '0.9rem', textDecoration: 'none', fontWeight: 600 }}>🐱 魯魯跑酷</Link>
      </div>
    </div>
  );
}
