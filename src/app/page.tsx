'use client';
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import coldDataRaw from '../data/cold-knowledge.json';
import questionsRaw from '../data/daily-questions.json';

type ColdEntry = {
  id: number;
  category: string;
  text: string;
  lulu?: string;
  media_hint?: string;
  seed_comments: { name: string; text: string }[];
};

const coldData = coldDataRaw as ColdEntry[];

type DailyQuestion = { id: number; question: string; options: string[]; insight: string };
const questionsData = questionsRaw as DailyQuestion[];

function getTodayQuestion(): DailyQuestion {
  return questionsData[getDayOfYear() % questionsData.length];
}

const LULU_QUOTES = [
  '喵。你今天看起來需要這個。',
  '我一天睡十六小時。這不是懶，這是智慧。',
  '人類真奇怪。花一輩子找自己，我一出生就知道。',
  '我不需要心理學，我就是答案。',
  '（盯著你看三秒）……喵。',
  '你在看我嗎？我也在看你。',
];

const BOOK_PREVIEWS = [
  {
    series: '暗黑心理學',
    title: '暗黑心理學 Vol.1《操控的藝術》',
    color: '#9333ea',
    excerpt: '你有沒有想過，為什麼有些人就是特別會讓你感到愧疚？他們不需要大吼大叫，只需要沉默幾秒，或者輕描淡寫地說一句「沒事，我理解你」——然後你就開始道歉了。這種技術有個名字，叫做「情感勒索」。而它的核心，是對你的罪惡感進行精準的外科手術。',
    buyUrl: 'https://still-time-corner.vercel.app/digital',
  },
  {
    series: '認知心理學',
    title: '認知心理學 Vol.1《你以為你在思考》',
    color: '#0ea5e9',
    excerpt: '你今天做的第一個決定，大概是在你還沒完全清醒的狀態下完成的。不是早餐吃什麼，而是要不要繼續賴床。你的大腦在那個瞬間啟動了一套它偏愛的預設程序——而你，幾乎沒有參與這個過程。這就是認知心理學最讓人不安的入口：我們以為自己在思考，其實只是在執行。',
    buyUrl: 'https://still-time-corner.vercel.app/digital',
  },
  {
    series: '成長心理學',
    title: '成長心理學 Vol.1《為什麼努力沒有用》',
    color: '#10b981',
    excerpt: '「再努力一點就好了。」這句話你聽過多少次？說這句話的人，包括你自己。問題不在努力夠不夠，而在努力的方向有沒有根據你真正的動機結構設計。心理學告訴我們，人有兩種截然不同的動機系統——一種越燒越旺，一種越逼越熄火。你現在用的是哪一種？',
    buyUrl: 'https://still-time-corner.vercel.app/digital',
  },
  {
    series: '人格心理學',
    title: '人格心理學 Vol.1《你為什麼是這樣的人》',
    color: '#f59e0b',
    excerpt: '人格不是你選的。那是你在一次又一次微小的反應中，被環境、被關係、被你根本記不得的早期經歷，一層一層塑造出來的。但這不代表你沒有辦法。真正的改變，從理解自己的人格結構開始——不是貼標籤，而是看清那些你以為是「個性」的東西，其實是一套可以被理解的防禦系統。',
    buyUrl: 'https://still-time-corner.vercel.app/digital',
  },
  {
    series: '關係心理學',
    title: '關係心理學 Vol.1《為什麼愛會傷人》',
    color: '#ec4899',
    excerpt: '最傷你的人，通常不是壞人。他們只是帶著自己未被療癒的傷，走進了你的生命。而你也一樣。關係心理學不是教你找到「對的人」，而是幫你看清楚你在關係裡的模式——那些你一再重複的劇本，那些你以為對方的問題，其實更早出現在你的童年地圖裡。',
    buyUrl: 'https://still-time-corner.vercel.app/digital',
  },
  {
    series: '潛意識心理學',
    title: '潛意識心理學 Vol.1《那些你以為忘了的事》',
    color: '#8b5cf6',
    excerpt: '記憶不會消失。它只是換了個地方。那些你以為自己已經放下的事，那些你說「沒關係、過去了」的經歷——它們住在你的身體反應裡，住在你莫名其妙的情緒裡，住在你選擇某些人的直覺裡。潛意識心理學的第一課，是承認：你的過去比你以為的更活躍。',
    buyUrl: 'https://still-time-corner.vercel.app/digital',
  },
];

const READER_QUOTES = [
  { text: '看完暗黑心理學 Vol.1 才發現，我媽一直在對我情感勒索。說出來很痛，但終於說出來了。', name: '讀者 C.', series: '暗黑心理學' },
  { text: '認知心理學 Vol.3 把「確認偏誤」解釋得太清楚，我當下把手機放下來，重新看了一次我跟前男友的對話記錄。', name: '讀者 小艾', series: '認知心理學' },
  { text: '買之前以為是說教書，結果根本是在說我。成長心理學看到一半眼眶紅了。', name: '讀者 YJ', series: '成長心理學' },
  { text: '盧林的書不是那種讀完覺得「好有道理」然後繼續過一樣的生活——它讓我開始問問題。', name: '讀者 默默', series: '潛意識心理學' },
];

const BOOK_SERIES = [
  { name: '暗黑心理學', vols: 4, color: '#9333ea', desc: '操控、謊言與黑暗人格的真相' },
  { name: '認知心理學', vols: 6, color: '#0ea5e9', desc: '你以為你在思考，其實你沒有' },
  { name: '成長心理學', vols: 6, color: '#10b981', desc: '失敗、動機與改變的科學' },
  { name: '人格心理學', vols: 4, color: '#f59e0b', desc: '你是誰？你怎麼變成這樣？' },
  { name: '關係心理學', vols: 4, color: '#ec4899', desc: '愛、傷害與邊界的心理學' },
  { name: '潛意識心理學', vols: 4, color: '#8b5cf6', desc: '那些你以為忘了的事' },
];

const CATEGORY_COLORS: Record<string, string> = {
  '心理學': '#9333ea',
  '腦科學': '#0ea5e9',
  '靈異意識': '#8b5cf6',
  '貓咪科學': '#f97316',
  '睡眠科學': '#06b6d4',
  '行為經濟學': '#84cc16',
};

function getPercents(questionId: number, optCount: number): number[] {
  const seeds = Array.from({ length: optCount }, (_, i) => {
    const x = Math.sin(questionId * 9301 + i * 49297 + 233) * 10000;
    const raw = Math.abs(x - Math.floor(x));
    return 15 + Math.round(raw * 45);
  });
  const total = seeds.reduce((a, b) => a + b, 0);
  const percents = seeds.map(s => Math.round(s / total * 100));
  percents[0] += 100 - percents.reduce((a, b) => a + b, 0);
  return percents;
}

function getDayOfYear(): number {
  const start = new Date(new Date().getFullYear(), 0, 0);
  return Math.floor((Date.now() - start.getTime()) / 86400000);
}

function getCurrentHourEntry(): ColdEntry {
  const hourIndex = Math.floor(Date.now() / 3600000);
  return coldData[hourIndex % coldData.length];
}

function getTodayPreview() {
  const slot = getDayOfYear() * 2 + (new Date().getHours() >= 12 ? 1 : 0);
  return BOOK_PREVIEWS[slot % BOOK_PREVIEWS.length];
}

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
        p.x += p.vx; p.y += p.vy;
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
    const onResize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    window.addEventListener('resize', onResize);
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', onResize); };
  }, []);
  return (
    <canvas ref={canvasRef} style={{
      position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
      pointerEvents: 'none', zIndex: 0,
    }} />
  );
}

function LuluBubble() {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const t = setInterval(() => {
      setVisible(false);
      setTimeout(() => { setIdx(i => (i + 1) % LULU_QUOTES.length); setVisible(true); }, 400);
    }, 5000);
    return () => clearInterval(t);
  }, []);
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: '10px',
      background: 'rgba(139,92,246,0.12)', border: '1px solid rgba(139,92,246,0.35)',
      borderRadius: '24px', padding: '10px 20px',
      opacity: visible ? 1 : 0, transition: 'opacity 0.4s ease',
      maxWidth: '360px',
    }}>
      <span style={{ fontSize: '1.3rem', flexShrink: 0 }}>🐱</span>
      <span style={{ color: '#c4b5fd', fontSize: '0.87rem', fontStyle: 'italic', lineHeight: 1.5 }}>
        {LULU_QUOTES[idx]}
      </span>
    </div>
  );
}

export default function Home() {
  const [todayEntry, setTodayEntry] = useState<ColdEntry | null>(null);
  const [todayPreview, setTodayPreview] = useState<typeof BOOK_PREVIEWS[0] | null>(null);
  const [todayQuestion] = useState<DailyQuestion>(() => getTodayQuestion());
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [quoteIdx, setQuoteIdx] = useState(0);
  const [aiNews, setAiNews] = useState<{ title: string; description: string; link: string; source: string }[]>([]);
  const [heroOffset, setHeroOffset] = useState(0);

  useEffect(() => {
    setTodayEntry(getCurrentHourEntry());
    setTodayPreview(getTodayPreview());
    // 每小時整點自動更新
    const now = new Date();
    const msToNextHour = (60 - now.getMinutes()) * 60000 - now.getSeconds() * 1000;
    const timeout = setTimeout(() => {
      setTodayEntry(getCurrentHourEntry());
      setTodayPreview(getTodayPreview());
    }, msToNextHour);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    fetch('/api/ai-news')
      .then(r => r.ok ? r.json() : null)
      .then(data => { if (data?.news) setAiNews(data.news.slice(0, 3)); })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const onScroll = () => setHeroOffset(window.scrollY * 0.25);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setQuoteIdx(i => (i + 1) % READER_QUOTES.length), 5000);
    return () => clearInterval(t);
  }, []);

  const catColor = todayEntry ? (CATEGORY_COLORS[todayEntry.category] || '#8b5cf6') : '#8b5cf6';

  return (
    <main style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #1a1040 100%)',
      color: '#fff', position: 'relative', overflow: 'hidden',
    }}>
      <style>{`
        @keyframes fadeInUp { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes softGlow { 0%,100%{box-shadow:0 0 24px rgba(124,58,237,0.15)} 50%{box-shadow:0 0 48px rgba(124,58,237,0.4)} }
        .book-card { transition: transform 0.3s ease, border-color 0.3s ease; }
        .book-card:hover { transform: translateY(-5px); }
        .news-card { transition: transform 0.25s ease; }
        .news-card:hover { transform: translateY(-3px); }
        .footer-link { color: #3d3b5a; font-size: 0.82rem; text-decoration: none; transition: color 0.2s; }
        .footer-link:hover { color: #8b5cf6; }
      `}</style>

      <Particles />

      <div style={{ position: 'relative', zIndex: 1 }}>

        {/* ── HERO ── */}
        <header style={{
          textAlign: 'center',
          padding: '5rem 1rem 3.5rem',
          transform: `translateY(${heroOffset}px)`,
          animation: 'fadeInUp 0.8s ease',
        }}>
          <div style={{ fontSize: '0.75rem', letterSpacing: '0.22em', color: '#5a5878', marginBottom: '0.8rem', textTransform: 'uppercase' }}>
            盧林 · 有的沒的小舖
          </div>
          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 3.8rem)', fontWeight: 900, margin: '0 0 0.6rem',
            background: 'linear-gradient(135deg, #fff 0%, #c4b5fd 55%, #f0abfc 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            letterSpacing: '-0.02em', lineHeight: 1.15,
          }}>
            盧林的電子書角落
          </h1>
          <p style={{ color: '#7c7a9e', fontSize: '0.95rem', marginBottom: '2rem' }}>
            每天一個冷知識，每一本書都是更深的答案
          </p>
          <LuluBubble />
        </header>

        {/* ── 今日冷知識 ── */}
        <section style={{ maxWidth: '680px', margin: '0 auto 5rem', padding: '0 1.2rem', animation: 'fadeInUp 0.9s ease 0.12s both' }}>
          {todayEntry ? (
            <div style={{
              background: 'rgba(255,255,255,0.055)', backdropFilter: 'blur(20px)',
              borderRadius: '24px', padding: '2.2rem 2.4rem',
              border: `1px solid ${catColor}40`,
              animation: 'softGlow 4s ease-in-out infinite',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem', flexWrap: 'wrap', gap: '8px' }}>
                <span style={{
                  background: `${catColor}1a`, border: `1px solid ${catColor}55`,
                  color: catColor, borderRadius: '20px', padding: '3px 13px',
                  fontSize: '0.76rem', fontWeight: 700, letterSpacing: '0.04em',
                }}>
                  🧠 {todayEntry.category}
                </span>
                <span style={{ color: '#3d3b5a', fontSize: '0.74rem', fontFamily: 'monospace' }}>
                  今日冷知識 #{todayEntry.id}
                </span>
              </div>

              <p style={{ fontSize: '0.97rem', lineHeight: 1.95, color: '#ddd8f0', marginBottom: '1.2rem' }}>
                {todayEntry.text}
              </p>

              {todayEntry.lulu && (
                <div style={{
                  background: 'rgba(139,92,246,0.09)', border: '1px solid rgba(139,92,246,0.28)',
                  borderRadius: '14px', padding: '0.85rem 1.1rem', marginBottom: '1.2rem',
                  display: 'flex', gap: '10px', alignItems: 'flex-start',
                }}>
                  <span style={{ fontSize: '1.1rem', flexShrink: 0, marginTop: '1px' }}>🐱</span>
                  <p style={{ color: '#c4b5fd', fontSize: '0.87rem', fontStyle: 'italic', margin: 0, lineHeight: 1.65 }}>
                    {todayEntry.lulu}
                  </p>
                </div>
              )}

              <Link href="/wall" style={{
                display: 'inline-block', color: '#4a4868', fontSize: '0.78rem',
                textDecoration: 'none', transition: 'color 0.2s',
              }}
                onMouseEnter={e => (e.currentTarget.style.color = catColor)}
                onMouseLeave={e => (e.currentTarget.style.color = '#4a4868')}
              >
                💬 有話想說？去互動牆
              </Link>
            </div>
          ) : (
            <div style={{ textAlign: 'center', color: '#3d3b5a', padding: '3rem' }}>載入中…</div>
          )}
        </section>

        {/* ── 今日一問 ── */}
        <section style={{ maxWidth: '680px', margin: '0 auto 5rem', padding: '0 1.2rem', animation: 'fadeInUp 0.92s ease 0.15s both' }}>
          <div style={{ textAlign: 'center', marginBottom: '1.2rem' }}>
            <span style={{ color: '#4a4868', fontSize: '0.78rem', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              今日一問
            </span>
          </div>
          <div style={{
            background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(16px)',
            borderRadius: '22px', padding: '2rem 2.2rem',
            border: '1px solid rgba(236,72,153,0.25)',
          }}>
            <p style={{ color: '#f0eeff', fontSize: '1.05rem', fontWeight: 700, margin: '0 0 1.4rem', lineHeight: 1.6 }}>
              {todayQuestion.question}
            </p>
            {(() => {
              const percents = getPercents(todayQuestion.id, todayQuestion.options.length);
              return (
                <>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem', marginBottom: '1.4rem' }}>
                    {todayQuestion.options.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedOption(i)}
                        style={{
                          textAlign: 'left', padding: '0.75rem 1.1rem',
                          borderRadius: '12px', cursor: 'pointer', fontSize: '0.92rem',
                          border: selectedOption === i ? '1px solid rgba(236,72,153,0.7)' : '1px solid rgba(255,255,255,0.12)',
                          background: selectedOption === i ? 'rgba(236,72,153,0.15)' : 'rgba(255,255,255,0.04)',
                          color: selectedOption === i ? '#f9a8d4' : '#c4b5fd',
                          transition: 'all 0.2s ease',
                          position: 'relative', overflow: 'hidden',
                        }}
                      >
                        {selectedOption !== null && (
                          <div style={{
                            position: 'absolute', left: 0, top: 0, bottom: 0,
                            width: `${percents[i]}%`,
                            background: selectedOption === i ? 'rgba(236,72,153,0.12)' : 'rgba(255,255,255,0.04)',
                            transition: 'width 0.6s ease',
                            borderRadius: '12px',
                          }} />
                        )}
                        <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span>{opt}</span>
                          {selectedOption !== null && (
                            <span style={{ fontSize: '0.78rem', fontWeight: 700, opacity: 0.75, marginLeft: '0.8rem', whiteSpace: 'nowrap' }}>
                              {percents[i]}%
                            </span>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                  {selectedOption === null && (
                    <div style={{ textAlign: 'center', color: '#4a3d6a', fontSize: '0.74rem', letterSpacing: '0.04em', marginTop: '-0.5rem', marginBottom: '0.4rem' }}>
                      選一個，看看你和多少人一樣
                    </div>
                  )}
                  {selectedOption !== null && (
                    <div style={{
                      borderTop: '1px solid rgba(236,72,153,0.2)', paddingTop: '1.2rem',
                      color: '#f9a8d4', fontSize: '0.87rem', fontStyle: 'italic', lineHeight: 1.7,
                    }}>
                      💗 {todayQuestion.insight}
                      <div style={{ marginTop: '0.5rem', color: '#6b5a7a', fontSize: '0.75rem', fontStyle: 'normal' }}>
                        {percents[selectedOption] >= 40
                          ? `${percents[selectedOption]}% 的人跟你選一樣`
                          : percents[selectedOption] <= 20
                          ? `只有 ${percents[selectedOption]}% 的人選這個`
                          : `${percents[selectedOption]}% 的人也這樣選`}
                      </div>
                    </div>
                  )}
                </>
              );
            })()}
          </div>
        </section>

        {/* ── 今日試讀 ── */}
        {todayPreview && (
          <section style={{ maxWidth: '680px', margin: '0 auto 5rem', padding: '0 1.2rem', animation: 'fadeInUp 0.95s ease 0.18s both' }}>
            <div style={{ textAlign: 'center', marginBottom: '1.2rem' }}>
              <span style={{ color: '#4a4868', fontSize: '0.78rem', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                今日試讀
              </span>
            </div>
            <div style={{
              background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(16px)',
              borderRadius: '22px', padding: '2rem 2.2rem',
              border: `1px solid ${todayPreview.color}35`,
            }}>
              <div style={{ marginBottom: '0.6rem' }}>
                <span style={{
                  background: `${todayPreview.color}18`, border: `1px solid ${todayPreview.color}45`,
                  color: todayPreview.color, borderRadius: '20px', padding: '3px 12px',
                  fontSize: '0.73rem', fontWeight: 700,
                }}>
                  {todayPreview.series}
                </span>
              </div>
              <h3 style={{ color: '#f0eeff', fontSize: '0.98rem', fontWeight: 800, margin: '0 0 1rem', lineHeight: 1.45 }}>
                {todayPreview.title}
              </h3>
              <p style={{
                color: '#c8c4e0', fontSize: '0.92rem', lineHeight: 2, margin: '0 0 1.4rem',
                borderLeft: `3px solid ${todayPreview.color}60`, paddingLeft: '1rem',
              }}>
                {todayPreview.excerpt}
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.6rem' }}>
                <span style={{ color: '#3d3b5a', fontSize: '0.76rem' }}>想繼續讀？</span>
                <Link href="/books" style={{
                  background: `linear-gradient(135deg, ${todayPreview.color}, ${todayPreview.color}aa)`,
                  color: '#fff', borderRadius: '20px', padding: '0.45rem 1.3rem',
                  textDecoration: 'none', fontWeight: 700, fontSize: '0.82rem',
                }}>
                  進書評角落 →
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* ── 書評角落入口 ── */}
        <section style={{ maxWidth: '680px', margin: '0 auto 5rem', padding: '0 1.2rem', animation: 'fadeInUp 1s ease 0.25s both' }}>
          <Link href="/books" className="book-card" style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            textDecoration: 'none',
            background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(12px)',
            border: '1px solid rgba(139,92,246,0.3)', borderRadius: '20px',
            padding: '1.5rem 2rem', gap: '1rem',
          }}>
            <div>
              <div style={{ color: '#c4b5fd', fontWeight: 800, fontSize: '1rem', marginBottom: '0.3rem' }}>
                📚 心理學電子書
              </div>
              <div style={{ color: '#5a5878', fontSize: '0.82rem' }}>
                28本 · 6系列 · NT$199／冊
              </div>
            </div>
            <span style={{ color: '#8b5cf6', fontWeight: 700, fontSize: '0.88rem', whiteSpace: 'nowrap' }}>
              進書評角落 →
            </span>
          </Link>
        </section>

        {/* ── 讀者說（單卡輪播）── */}
        <section style={{ maxWidth: '680px', margin: '0 auto 5rem', padding: '0 1.2rem', animation: 'fadeInUp 1s ease 0.3s both' }}>
          <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
            <span style={{ color: '#4a4868', fontSize: '0.78rem', letterSpacing: '0.12em', textTransform: 'uppercase' }}>讀者說</span>
          </div>
          <div style={{
            background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)',
            borderRadius: '20px', padding: '1.8rem 2rem', minHeight: '110px',
          }}>
            <p style={{ color: '#d4d0ea', fontSize: '0.9rem', lineHeight: 1.9, margin: '0 0 1rem', fontStyle: 'italic' }}>
              「{READER_QUOTES[quoteIdx].text}」
            </p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#5a5878', fontSize: '0.76rem' }}>— {READER_QUOTES[quoteIdx].name}</span>
              <div style={{ display: 'flex', gap: '6px' }}>
                {READER_QUOTES.map((_, i) => (
                  <button key={i} onClick={() => setQuoteIdx(i)} style={{
                    width: i === quoteIdx ? '18px' : '6px', height: '6px', borderRadius: '3px',
                    background: i === quoteIdx ? '#8b5cf6' : '#3d3b5a',
                    border: 'none', cursor: 'pointer', transition: 'all 0.3s ease', padding: 0,
                  }} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── AI快訊 + 工具遊戲（各一張）── */}
        <section style={{ maxWidth: '680px', margin: '0 auto 5rem', padding: '0 1.2rem', display: 'flex', flexDirection: 'column', gap: '1rem', animation: 'fadeInUp 1s ease 0.35s both' }}>
          {/* AI快訊 1則 */}
          {aiNews[0] ? (
            <div className="news-card" style={{
              background: 'rgba(14,165,233,0.07)', border: '1px solid rgba(14,165,233,0.22)',
              borderRadius: '18px', padding: '1.4rem 1.6rem',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.7rem', color: '#38bdf8', fontWeight: 700 }}>🤖 AI 快訊 · {aiNews[0].source}</span>
                <Link href="/ai-news" style={{ color: '#38bdf8', fontSize: '0.72rem', textDecoration: 'none', whiteSpace: 'nowrap', marginLeft: '1rem' }}>
                  看更多 →
                </Link>
              </div>
              <a href={aiNews[0].link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'block' }}>
                <h3 style={{
                  color: '#f0f4f8', fontSize: '0.9rem', fontWeight: 700, margin: '0 0 0.4rem', lineHeight: 1.45,
                  display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' as const, overflow: 'hidden',
                }}>{aiNews[0].title}</h3>
                <p style={{
                  color: '#8a9ab0', fontSize: '0.78rem', lineHeight: 1.6, margin: 0,
                  display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' as const, overflow: 'hidden',
                }}>{aiNews[0].description}</p>
              </a>
            </div>
          ) : (
            <div style={{ background: 'rgba(14,165,233,0.04)', border: '1px solid rgba(14,165,233,0.12)', borderRadius: '18px', padding: '1.4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#2a3a4a', fontSize: '0.8rem' }}>🤖 AI 快訊載入中…</span>
              <Link href="/ai-news" style={{ color: '#38bdf8', fontSize: '0.78rem', textDecoration: 'none' }}>看更多 →</Link>
            </div>
          )}

          {/* 工具箱 + 小遊戲 */}
          <div style={{
            background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '18px', padding: '1.3rem 1.6rem',
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem',
          }}>
            <Link href="/tools" style={{
              textDecoration: 'none', textAlign: 'center',
              background: 'rgba(132,204,22,0.08)', border: '1px solid rgba(132,204,22,0.2)',
              borderRadius: '12px', padding: '0.9rem 0.5rem',
            }}>
              <div style={{ fontSize: '1.3rem', marginBottom: '0.3rem' }}>🛠</div>
              <div style={{ color: '#bef264', fontSize: '0.82rem', fontWeight: 700 }}>工具箱</div>
              <div style={{ color: '#4a5a2a', fontSize: '0.72rem' }}>實用小工具</div>
            </Link>
            <Link href="/games" style={{
              textDecoration: 'none', textAlign: 'center',
              background: 'rgba(251,191,36,0.08)', border: '1px solid rgba(251,191,36,0.2)',
              borderRadius: '12px', padding: '0.9rem 0.5rem',
            }}>
              <div style={{ fontSize: '1.3rem', marginBottom: '0.3rem' }}>🎮</div>
              <div style={{ color: '#fde68a', fontSize: '0.82rem', fontWeight: 700 }}>小遊戲</div>
              <div style={{ color: '#5a4a1a', fontSize: '0.72rem' }}>動動腦放鬆一下</div>
            </Link>
          </div>
        </section>

        {/* ── 測驗 CTA ── */}
        <section style={{ maxWidth: '540px', margin: '0 auto 5.5rem', padding: '0 1.2rem', textAlign: 'center', animation: 'fadeInUp 1s ease 0.45s both' }}>
          <div style={{
            background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.32)',
            borderRadius: '22px', padding: '2.4rem 2rem',
          }}>
            <div style={{ fontSize: '2.4rem', marginBottom: '0.8rem', animation: 'float 3s ease-in-out infinite', display: 'inline-block' }}>🧬</div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#e9d5ff', margin: '0 0 0.6rem' }}>
              你的心理黑暗面是哪一型？
            </h2>
            <p style={{ color: '#7a788e', fontSize: '0.86rem', marginBottom: '1.5rem', lineHeight: 1.65 }}>
              控制者、破壞者、面具、逃離者——<br />四種類型，你是哪一個？
            </p>
            <Link href="/quiz" style={{
              display: 'inline-block',
              background: 'linear-gradient(135deg, #7c3aed, #ec4899)',
              color: '#fff', borderRadius: '30px', padding: '0.7rem 2.2rem',
              textDecoration: 'none', fontWeight: 700, fontSize: '0.93rem',
              transition: 'opacity 0.2s',
            }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              測一測 →
            </Link>
          </div>
        </section>

        {/* ── 底部小連結 ── */}
        <footer style={{ borderTop: '1px solid rgba(255,255,255,0.07)', padding: '2rem 1.2rem 2.5rem', textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '1.2rem 2rem', marginBottom: '1.2rem' }}>
            {[
              { label: '💬 互動牆', href: '/wall' },
              { label: '🛒 小舖', href: 'https://still-time-corner.vercel.app', external: true },
            ].map(l => (
              l.external
                ? <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="footer-link">{l.label}</a>
                : <Link key={l.href} href={l.href} className="footer-link">{l.label}</Link>
            ))}
          </div>
          <p style={{ color: '#2a2840', fontSize: '0.72rem', margin: 0 }}>© 2026 盧林 · 有的沒的小舖</p>
        </footer>

      </div>
    </main>
  );
}
