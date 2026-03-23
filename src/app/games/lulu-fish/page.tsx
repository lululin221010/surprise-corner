'use client';
// 📄 路徑：src/app/games/lulu-fish/page.tsx
// 貓爪跟著滑鼠/手指，碰到魚就抓到

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

const W = 600;
const H = 320;
const GAME_DURATION = 30;
const PAW_R = 28; // 貓爪碰撞半徑

type Fish = {
  id: number;
  x: number; y: number;
  w: number; h: number;
  speed: number;
  dir: 1 | -1;
  color: string;
  points: number;
  caught: boolean;
  splashTimer: number;
  wobble: number;
};

type Bubble = { x: number; y: number; r: number; speed: number; };
type FloatScore = { id: number; x: number; y: number; pts: number; life: number; };

let fishIdCounter = 0;
let floatId = 0;

function makeFish(): Fish {
  const fromLeft = Math.random() < 0.5;
  const size = Math.random();
  let w: number, h: number, speed: number, color: string, points: number;
  if (size < 0.5)       { w=36; h=18; speed=2.5+Math.random()*1.5; color='#f97316'; points=1; }
  else if (size < 0.82) { w=52; h=26; speed=1.6+Math.random()*1;   color='#38bdf8'; points=2; }
  else                  { w=70; h=35; speed=0.9+Math.random()*0.6;  color='#fbbf24'; points=3; }
  return {
    id: fishIdCounter++,
    x: fromLeft ? -w-10 : W+10,
    y: 40 + Math.random() * (H - 100),
    w, h, speed, dir: fromLeft ? 1 : -1,
    color, points, caught: false, splashTimer: 0,
    wobble: Math.random() * Math.PI * 2,
  };
}

function drawFish(ctx: CanvasRenderingContext2D, f: Fish, tick: number) {
  ctx.save();
  const cx = f.x + f.w / 2;
  const cy = f.y + f.h / 2 + Math.sin(f.wobble + tick * 0.05) * 3;
  ctx.translate(cx, cy);
  if (f.dir === -1) ctx.scale(-1, 1);
  // 身體
  ctx.beginPath(); ctx.ellipse(0,0,f.w/2,f.h/2,0,0,Math.PI*2);
  ctx.fillStyle = f.color; ctx.fill();
  // 光澤
  ctx.beginPath(); ctx.ellipse(-f.w*0.05,-f.h*0.15,f.w*0.25,f.h*0.18,-0.3,0,Math.PI*2);
  ctx.fillStyle='rgba(255,255,255,0.25)'; ctx.fill();
  // 尾巴
  ctx.beginPath(); ctx.moveTo(-f.w/2+4,0);
  ctx.lineTo(-f.w/2-f.w*0.3,-f.h*0.5); ctx.lineTo(-f.w/2-f.w*0.3,f.h*0.5);
  ctx.closePath(); ctx.fillStyle=f.color; ctx.fill();
  // 眼睛
  ctx.beginPath(); ctx.arc(f.w*0.28,-f.h*0.1,f.h*0.14,0,Math.PI*2);
  ctx.fillStyle='#fff'; ctx.fill();
  ctx.beginPath(); ctx.arc(f.w*0.29,-f.h*0.1,f.h*0.08,0,Math.PI*2);
  ctx.fillStyle='#1e293b'; ctx.fill();
  ctx.restore();
}

function drawPaw(ctx: CanvasRenderingContext2D, px: number, py: number, tick: number) {
  ctx.save();
  ctx.translate(px, py);
  const bob = Math.sin(tick * 0.12) * 2;
  ctx.translate(0, bob);
  // 手掌
  ctx.beginPath(); ctx.ellipse(0,0,PAW_R,PAW_R*0.85,0,0,Math.PI*2);
  ctx.fillStyle='#fde68a'; ctx.fill();
  ctx.strokeStyle='#d97706'; ctx.lineWidth=1.5; ctx.stroke();
  // 肉墊
  ctx.beginPath(); ctx.ellipse(0,PAW_R*0.18,PAW_R*0.42,PAW_R*0.32,0,0,Math.PI*2);
  ctx.fillStyle='#fca5a5'; ctx.fill();
  // 四個爪指
  const fingers: [number,number][] = [[-PAW_R*0.5,-PAW_R*0.55],[-PAW_R*0.17,-PAW_R*0.65],[PAW_R*0.17,-PAW_R*0.65],[PAW_R*0.5,-PAW_R*0.55]];
  for (const [dx,dy] of fingers) {
    ctx.beginPath(); ctx.ellipse(dx,dy,PAW_R*0.22,PAW_R*0.19,0,0,Math.PI*2);
    ctx.fillStyle='#fde68a'; ctx.fill();
    ctx.strokeStyle='#d97706'; ctx.lineWidth=1; ctx.stroke();
  }
  ctx.restore();
}

function drawSplash(ctx: CanvasRenderingContext2D, f: Fish) {
  const cx = f.x+f.w/2, cy = f.y+f.h/2;
  const progress = f.splashTimer/30;
  ctx.save(); ctx.globalAlpha = progress;
  const r = f.w*0.6*(1-progress);
  ctx.beginPath(); ctx.arc(cx,cy,r,0,Math.PI*2);
  ctx.strokeStyle='#7dd3fc'; ctx.lineWidth=2; ctx.stroke();
  for(let i=0;i<6;i++){
    const a=(i/6)*Math.PI*2;
    ctx.beginPath();
    ctx.moveTo(cx+Math.cos(a)*r*0.4,cy+Math.sin(a)*r*0.4);
    ctx.lineTo(cx+Math.cos(a)*r,cy+Math.sin(a)*r);
    ctx.stroke();
  }
  ctx.restore();
}

export default function LuluFishPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const s = useRef({
    status: 'idle' as 'idle'|'playing'|'gameover',
    score: 0, timeLeft: GAME_DURATION,
    fishes: [] as Fish[],
    bubbles: [] as Bubble[],
    floatScores: [] as FloatScore[],
    pawX: W/2, pawY: H/2,
    spawnTimer: 0, bubbleTimer: 0, tick: 0,
    highScore: 0,
  });
  const animRef = useRef<number>(0);
  const timerRef = useRef<ReturnType<typeof setInterval>|null>(null);
  const [ui, setUi] = useState({ status:'idle' as 'idle'|'playing'|'gameover', score:0, timeLeft:GAME_DURATION, highScore:0 });

  useEffect(()=>{
    const hs = parseInt(localStorage.getItem('lulu-fish-hs')||'0');
    s.current.highScore = hs;
    setUi(u=>({...u, highScore:hs}));
    loop();
    return ()=>{ cancelAnimationFrame(animRef.current); if(timerRef.current) clearInterval(timerRef.current); };
  },[]);

  function startGame() {
    const g = s.current;
    g.status='playing'; g.score=0; g.timeLeft=GAME_DURATION;
    g.fishes=[]; g.floatScores=[];
    g.bubbles=Array.from({length:6},()=>({ x:Math.random()*W, y:Math.random()*H, r:2+Math.random()*4, speed:0.4+Math.random()*0.6 }));
    g.spawnTimer=0; g.bubbleTimer=0; g.tick=0;
    setUi(u=>({...u,status:'playing',score:0,timeLeft:GAME_DURATION}));
    if(timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(()=>{
      g.timeLeft--;
      setUi(u=>({...u,timeLeft:g.timeLeft}));
      if(g.timeLeft<=0) endGame();
    },1000);
  }

  function endGame() {
    const g = s.current;
    g.status='gameover';
    if(timerRef.current) clearInterval(timerRef.current);
    if(g.score>g.highScore){ g.highScore=g.score; localStorage.setItem('lulu-fish-hs',String(g.score)); }
    setUi(u=>({...u,status:'gameover',score:g.score,highScore:g.highScore}));
  }

  // 滑鼠移動
  function onMouseMove(e: React.MouseEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    s.current.pawX = (e.clientX-rect.left)*(W/rect.width);
    s.current.pawY = (e.clientY-rect.top)*(H/rect.height);
  }

  // 手機觸控
  function onTouchMove(e: React.TouchEvent<HTMLCanvasElement>) {
    e.preventDefault();
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const t = e.touches[0];
    s.current.pawX = (t.clientX-rect.left)*(W/rect.width);
    s.current.pawY = (t.clientY-rect.top)*(H/rect.height);
  }

  function onTouchStart(e: React.TouchEvent<HTMLCanvasElement>) {
    const g = s.current;
    if(g.status==='idle'||g.status==='gameover'){ startGame(); return; }
    onTouchMove(e as any);
  }

  function loop() {
    const canvas = canvasRef.current;
    if(!canvas){ animRef.current=requestAnimationFrame(loop); return; }
    const ctx = canvas.getContext('2d')!;
    const g = s.current;
    g.tick++;

    // 背景
    const grad = ctx.createLinearGradient(0,0,0,H);
    grad.addColorStop(0,'#0c4a6e'); grad.addColorStop(1,'#082f49');
    ctx.fillStyle=grad; ctx.fillRect(0,0,W,H);

    // 水波
    for(let i=0;i<3;i++){
      ctx.beginPath(); ctx.moveTo(0,12+i*8);
      for(let x=0;x<=W;x+=20) ctx.lineTo(x,12+i*8+Math.sin(x*0.02+g.tick*0.04+i)*4);
      ctx.strokeStyle=`rgba(125,211,252,${0.07+i*0.03})`; ctx.lineWidth=1.5; ctx.stroke();
    }

    // 海草
    for(let i=0;i<5;i++){
      const bx=60+i*110+Math.sin(i)*20;
      const sway=Math.sin(g.tick*0.04+i)*8;
      ctx.beginPath(); ctx.moveTo(bx,H);
      ctx.quadraticCurveTo(bx+sway,H-30,bx+sway*0.5,H-55);
      ctx.quadraticCurveTo(bx+sway*1.2,H-75,bx+sway*0.8,H-90);
      ctx.strokeStyle='rgba(34,197,94,0.45)'; ctx.lineWidth=3; ctx.lineCap='round'; ctx.stroke();
    }

    // 泡泡
    g.bubbleTimer++;
    if(g.status==='playing'&&g.bubbleTimer>50){ g.bubbleTimer=0; g.bubbles.push({x:Math.random()*W,y:H,r:2+Math.random()*4,speed:0.4+Math.random()*0.6}); }
    g.bubbles=g.bubbles.filter(b=>b.y>-10);
    for(const b of g.bubbles){
      b.y-=b.speed; b.x+=Math.sin(g.tick*0.05+b.r)*0.4;
      ctx.beginPath(); ctx.arc(b.x,b.y,b.r,0,Math.PI*2);
      ctx.strokeStyle='rgba(186,230,253,0.35)'; ctx.lineWidth=1; ctx.stroke();
    }

    if(g.status==='playing'){
      // 生魚
      g.spawnTimer++;
      const rate=Math.max(55,110-(GAME_DURATION-g.timeLeft)*2);
      if(g.spawnTimer>rate){ g.spawnTimer=0; g.fishes.push(makeFish()); }

      // 移魚
      for(const f of g.fishes){
        if(!f.caught){ f.x+=f.speed*f.dir; f.wobble+=0.05; }
        if(f.splashTimer>0) f.splashTimer--;
      }

      // 碰撞：貓爪 vs 魚
      const px=g.pawX, py=g.pawY;
      for(const f of g.fishes){
        if(f.caught) continue;
        const fx=f.x+f.w/2, fy=f.y+f.h/2;
        const dist=Math.sqrt((px-fx)**2+(py-fy)**2);
        if(dist < PAW_R + f.w*0.45){
          f.caught=true; f.splashTimer=30;
          g.score+=f.points;
          g.floatScores.push({id:floatId++,x:fx,y:fy,pts:f.points,life:45});
          setUi(u=>({...u,score:g.score}));
        }
      }

      g.fishes=g.fishes.filter(f=>!(f.caught&&f.splashTimer<=0)&&!(f.x>W+80||f.x<-80));
    }

    // 畫魚
    for(const f of g.fishes){
      if(f.caught){ if(f.splashTimer>0) drawSplash(ctx,f); }
      else drawFish(ctx,f,g.tick);
    }

    // 浮動分數
    g.floatScores=g.floatScores.filter(fs=>fs.life>0);
    for(const fs of g.floatScores){
      fs.y-=1; fs.life--;
      ctx.save(); ctx.globalAlpha=fs.life/45;
      ctx.font=`bold ${16+fs.pts*2}px sans-serif`;
      ctx.fillStyle=fs.pts===3?'#fbbf24':fs.pts===2?'#38bdf8':'#fb923c';
      ctx.textAlign='center';
      ctx.fillText(`+${fs.pts}`,fs.x,fs.y);
      ctx.restore();
    }

    // 貓爪（跟著游標）
    if(g.status==='playing') drawPaw(ctx,g.pawX,g.pawY,g.tick);

    // Idle
    if(g.status==='idle'){
      ctx.fillStyle='rgba(0,0,0,0.55)'; ctx.fillRect(0,0,W,H);
      ctx.textAlign='center';
      ctx.font='bold 28px sans-serif'; ctx.fillStyle='#fff';
      ctx.fillText('🐱 魯魯抓魚',W/2,H/2-35);
      ctx.font='16px sans-serif'; ctx.fillStyle='#bae6fd';
      ctx.fillText('移動滑鼠／手指 讓貓爪碰到魚就抓到！',W/2,H/2+2);
      ctx.font='13px sans-serif'; ctx.fillStyle='#94a3b8';
      ctx.fillText('30 秒限時 · 大魚 3分 · 中魚 2分 · 小魚 1分',W/2,H/2+28);
      ctx.font='15px sans-serif'; ctx.fillStyle='#fbbf24';
      ctx.fillText('▶ 點擊開始',W/2,H/2+58);
    }

    // 結束
    if(g.status==='gameover'){
      ctx.fillStyle='rgba(0,0,0,0.62)'; ctx.fillRect(0,0,W,H);
      ctx.textAlign='center';
      ctx.font='bold 24px sans-serif'; ctx.fillStyle='#fbbf24';
      ctx.fillText('時間到！',W/2,H/2-45);
      ctx.font='bold 48px sans-serif'; ctx.fillStyle='#fff';
      ctx.fillText(`${g.score} 分`,W/2,H/2+5);
      ctx.font='15px sans-serif'; ctx.fillStyle='#94a3b8';
      ctx.fillText(`最高紀錄：${g.highScore} 分`,W/2,H/2+35);
      ctx.font='14px sans-serif'; ctx.fillStyle='#bae6fd';
      ctx.fillText('點擊再玩一次',W/2,H/2+62);
    }

    animRef.current=requestAnimationFrame(loop);
  }

  useEffect(()=>{
    function onKey(e:KeyboardEvent){
      if(e.code==='Space'){
        e.preventDefault();
        const g=s.current;
        if(g.status==='idle'||g.status==='gameover') startGame();
      }
    }
    window.addEventListener('keydown',onKey);
    return ()=>window.removeEventListener('keydown',onKey);
  },[]);

  return (
    <div style={{ minHeight:'100vh', background:'linear-gradient(135deg,#0f0a1e 0%,#082f49 50%,#0a1628 100%)', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'1rem' }}>
      <div style={{textAlign:'center',marginBottom:'0.8rem'}}>
        <h1 style={{color:'#fff',fontSize:'1.6rem',fontWeight:800,margin:'0 0 0.2rem'}}>🐟 魯魯抓魚</h1>
        <p style={{color:'#7dd3fc',fontSize:'0.85rem',margin:0}}>移動貓爪碰到魚就抓到，30 秒限時！</p>
      </div>

      <div style={{display:'flex',gap:'2rem',marginBottom:'0.8rem',color:'#fff',fontSize:'0.95rem',fontWeight:700}}>
        <span>🐟 {ui.score} 分</span>
        <span style={{color:ui.timeLeft<=10?'#f87171':'#7dd3fc'}}>⏱ {ui.timeLeft}s</span>
        <span style={{color:'#fbbf24'}}>🏆 {ui.highScore}</span>
      </div>

      <canvas
        ref={canvasRef} width={W} height={H}
        onClick={()=>{ const g=s.current; if(g.status==='idle'||g.status==='gameover') startGame(); }}
        onMouseMove={onMouseMove}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        style={{ width:'100%', maxWidth:`${W}px`, borderRadius:'16px', border:'2px solid rgba(125,211,252,0.3)', cursor:'none', touchAction:'none', boxShadow:'0 0 40px rgba(14,165,233,0.3)' }}
      />

      <div style={{marginTop:'0.8rem',color:'#94a3b8',fontSize:'0.78rem',textAlign:'center'}}>
        🐾 移動滑鼠讓貓爪碰魚 &nbsp;|&nbsp; 📱 手機滑動螢幕
      </div>
      <div style={{marginTop:'0.3rem',color:'#64748b',fontSize:'0.75rem',textAlign:'center'}}>
        🟡 大金魚 3分 &nbsp;·&nbsp; 🔵 中魚 2分 &nbsp;·&nbsp; 🟠 小魚 1分
      </div>

      <div style={{marginTop:'1.5rem',display:'flex',gap:'1.5rem'}}>
        <Link href="/games" style={{color:'#7c3aed',fontSize:'0.9rem',textDecoration:'none',fontWeight:600}}>← 小遊戲</Link>
        <Link href="/games/lulu-run" style={{color:'#f59e0b',fontSize:'0.9rem',textDecoration:'none',fontWeight:600}}>🐱 魯魯跑酷</Link>
      </div>
    </div>
  );
}
