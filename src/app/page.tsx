'use client';
// 📄 檔案路徑：src/app/page.tsx
// 功能：首頁 - 粒子動畫 + 打字機效果 + 霓虹卡片

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';

const TYPEWRITER_TEXTS = [
  '每天不一樣的小驚喜，等你來發現 ✨',
  '連載小說，每週更新原創故事 📖',
  '最新 AI 科技快訊，掌握未來趨勢 🤖',
  '實用工具箱，讓你的生活更有效率 🛠',
];

const FEATURES = [
  {
    icon: '📖',
    title: '連載小說',
    desc: '原創故事，每週更新。跟著角色一起冒險，錯過就等下週！',
    href: '/novels',
    color: '#7c3aed',
    glow: 'rgba(124,58,237,0.4)',
  },
  {
  icon: '🔥',
  title: '作品牆',
  desc: '大家用 AI 生成的驚喜創作，每天都有新內容出現。',
  href: '/wall',
  color: '#ef4444',
  glow: 'rgba(239,68,68,0.4)',
},
  {
    icon: '🤖',
    title: 'AI 科技快訊',
    desc: '每小時自動更新最新人工智慧動態，讓你走在時代前端。',
    href: '/ai-news',
    color: '#0ea5e9',
    glow: 'rgba(14,165,233,0.4)',
  },
  {
    icon: '🛠',
    title: '實用工具箱',
    desc: '字數計算、名言產生、待辦清單、番茄計時，一站搞定。',
    href: '/tools',
    color: '#10b981',
    glow: 'rgba(16,185,129,0.4)',
  },
  {
    icon: '🎁',
    title: 'Still Time Corner',
    desc: '每日驚喜小舖，療癒心情的好物等著你去發現。',
    href: 'https://still-time-corner.vercel.app/',
    color: '#f59e0b',
    glow: 'rgba(245,158,11,0.4)',
    external: true,
  },
];

// 粒子
function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number }[] = [];
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.6 + 0.2,
      });
    }

    let animId: number;
    function draw() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(196,181,253,${p.opacity})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    }
    draw();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas ref={canvasRef} style={{
      position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
      pointerEvents: 'none', zIndex: 0,
    }} />
  );
}

// 打字機
function Typewriter() {
  const [textIndex, setTextIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const target = TYPEWRITER_TEXTS[textIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && displayed.length < target.length) {
      timeout = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 60);
    } else if (!deleting && displayed.length === target.length) {
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 30);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setTextIndex((textIndex + 1) % TYPEWRITER_TEXTS.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, textIndex]);

  return (
    <p style={{ color: '#c4b5fd', fontSize: '1.1rem', minHeight: '2rem', marginTop: '1rem' }}>
      {displayed}<span style={{ animation: 'blink 1s infinite', opacity: 1 }}>|</span>
    </p>
  );
}

export default function Home() {
  const [surprise, setSurprise] = useState<{ title?: string; content?: string; message?: string; type?: string } | null>(null);
  const [revealed, setRevealed] = useState(false);
  const today = new Date().toLocaleDateString('zh-TW', { year: 'numeric', month: '2-digit', day: '2-digit' });

  useEffect(() => {
    fetch('/api/surprise/today')
      .then(r => r.ok ? r.json() : null)
      .then(data => setSurprise(data))
      .catch(() => {});
  }, []);

  return (
    <main style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #1a1040 100%)', color: '#fff', position: 'relative', overflow: 'hidden' }}>
      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes glow { 0%,100%{box-shadow:0 0 20px rgba(124,58,237,0.3)} 50%{box-shadow:0 0 40px rgba(124,58,237,0.6)} }
        @keyframes fadeInUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
        .feature-card:hover { transform: translateY(-6px) scale(1.02); }
        .feature-card { transition: all 0.3s ease; }
        .reveal-btn:hover { transform: scale(1.05); filter: brightness(1.15); }
        .reveal-btn { transition: all 0.2s ease; }
      `}</style>

      <Particles />

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Hero */}
        <header style={{ textAlign: 'center', padding: '5rem 1rem 3rem', animation: 'fadeInUp 0.8s ease' }}>
          <div style={{ fontSize: '3rem', animation: 'float 3s ease-in-out infinite', marginBottom: '1rem' }}>✨</div>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 900, margin: 0,
            background: 'linear-gradient(135deg, #fff 0%, #c4b5fd 50%, #f0abfc 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            letterSpacing: '-0.02em',
          }}>
            Surprise Corner
          </h1>
          <Typewriter />
          <p style={{ color: '#7c7a9e', fontSize: '0.85rem', marginTop: '0.5rem' }}>今天日期：{today}</p>
        </header>

        {/* 今日驚喜卡 */}
        <div style={{ maxWidth: '600px', margin: '0 auto 4rem', padding: '0 1rem', animation: 'fadeInUp 1s ease 0.2s both' }}>
          <div style={{
            background: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(20px)',
            borderRadius: '24px', padding: '2.5rem',
            border: '1px solid rgba(196,181,253,0.2)',
            animation: 'glow 3s ease-in-out infinite',
            textAlign: 'center',
          }}>
            {!revealed ? (
              <>
                <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>🎁</div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: '0 0 0.8rem' }}>今日驚喜等你揭曉！</h2>
                <p style={{ color: '#9ca3af', marginBottom: '1.5rem' }}>每天一個小驚喜，療癒你的心情 💜</p>
                <button
                  className="reveal-btn"
                  onClick={() => setRevealed(true)}
                  style={{
                    background: 'linear-gradient(135deg, #7c3aed, #ec4899)',
                    color: '#fff', border: 'none', borderRadius: '30px',
                    padding: '0.9rem 2.5rem', fontSize: '1.1rem', fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  揭曉今天的驚喜！
                </button>
              </>
            ) : surprise ? (
              <>
                <div style={{ fontSize: '2rem', marginBottom: '0.8rem' }}>🌟</div>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 800, margin: '0 0 1rem', color: '#e9d5ff' }}>
                  {surprise.title || surprise.type}
                </h2>
                <p style={{ color: '#d1d5db', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                  {surprise.content || surprise.message}
                </p>
                <a href="https://still-time-corner.vercel.app/" target="_blank" rel="noopener noreferrer"
                  style={{
                    display: 'inline-block',
                    background: 'linear-gradient(135deg, #f59e0b, #ec4899)',
                    color: '#fff', padding: '0.6rem 1.5rem', borderRadius: '30px',
                    textDecoration: 'none', fontWeight: 700, fontSize: '0.9rem',
                  }}>
                  意猶未盡？去小舖逛逛 →
                </a>
              </>
            ) : (
              <>
                <div style={{ fontSize: '2rem', marginBottom: '0.8rem' }}>📬</div>
                <h2 style={{ fontSize: '1.3rem', fontWeight: 700, margin: '0 0 0.5rem' }}>準備中...</h2>
                <p style={{ color: '#9ca3af' }}>連載從 2/6 正式開始，每天都有新驚喜等著你！</p>
              </>
            )}
          </div>
        </div>

        {/* 功能卡片 */}
        <section style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 1rem 6rem' }}>
          <h2 style={{ textAlign: 'center', fontSize: '1.8rem', fontWeight: 800, marginBottom: '2rem', color: '#e9d5ff' }}>
            探索更多 🚀
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.2rem' }}>
            {FEATURES.map(f => (
              <Link
                key={f.href}
                href={f.href}
                target={f.external ? '_blank' : undefined}
                rel={f.external ? 'noopener noreferrer' : undefined}
                className="feature-card"
                style={{
                  display: 'block', textDecoration: 'none',
                  background: 'rgba(255,255,255,0.06)',
                  border: `1px solid ${f.color}44`,
                  borderRadius: '18px', padding: '1.8rem 1.5rem',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <div style={{ fontSize: '2.5rem', marginBottom: '0.8rem' }}>{f.icon}</div>
                <h3 style={{ color: '#f3f4f6', fontSize: '1.1rem', fontWeight: 800, margin: '0 0 0.5rem' }}>{f.title}</h3>
                <p style={{ color: '#9ca3af', fontSize: '0.85rem', lineHeight: 1.6, margin: 0 }}>{f.desc}</p>
                <div style={{
                  marginTop: '1rem', display: 'inline-block',
                  color: f.color, fontSize: '0.85rem', fontWeight: 700,
                }}>
                  前往 →
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}