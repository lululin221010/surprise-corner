'use client';
// 📄 檔案路徑：src/app/podcast/page.tsx
// 功能：Podcast 節目頁面 — 集數列表 + 嵌入式 MP3 播放器（Vercel Blob）

import { useState, useRef } from 'react';

const BASE = 'https://88lwhikbeo2pkibc.public.blob.vercel-storage.com/podcast';

interface Episode {
  ep: number;
  title: string;
  desc: string;
  color: string;
  glow: string;
  date: string;
  duration: string;
  audioUrl: string;
  tags: string[];
  coverImage: string;
}

// ✏️ 每次新增集數只要在這裡加一筆資料即可
const EPISODES: Episode[] = [
  {
    ep: 1,
    title: 'AI 驚喜與兔崽子書店',
    desc: '介紹 Surprise Corner 的誕生故事：每天不一樣的小驚喜、連載小說、AI 快訊，還有那間藏在角落的兔崽子書店。',
    color: '#7c3aed',
    glow: 'rgba(124,58,237,0.5)',
    date: '2026/02',
    duration: '約 20 分鐘',
    audioUrl: `${BASE}/ep01-surprise-corner-intro.mp3`,
    tags: ['品牌介紹', 'AI', '兔崽子書店'],
    coverImage: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800&auto=format&fit=crop&q=80',
  },
  {
    ep: 2,
    title: '上班族低風險副業實戰地圖',
    desc: '別再說沒時間！這集整理出上班族最適合的低門檻副業路線，從選項到執行，有地圖就不會迷路。',
    color: '#0ea5e9',
    glow: 'rgba(14,165,233,0.5)',
    date: '2026/03',
    duration: '約 21 分鐘',
    audioUrl: `${BASE}/ep02-side-hustle-map.mp3`,
    tags: ['副業', '職場', '理財'],
    coverImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop&q=80',
  },
  {
    ep: 3,
    title: '台股紅綠燈：戰勝投資心魔',
    desc: '台股漲跌背後，最大的敵人其實是自己。這集用紅綠燈法則幫你整理投資情緒，看清買賣時機。',
    color: '#16a34a',
    glow: 'rgba(22,163,74,0.5)',
    date: '2026/03',
    duration: '約 20 分鐘',
    audioUrl: `${BASE}/ep03-taiwan-stock.mp3`,
    tags: ['台股', '投資', '理財心理'],
    coverImage: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&auto=format&fit=crop&q=80',
  },
  {
    ep: 4,
    title: 'AI 從打字停頓讀懂你的孤獨',
    desc: 'AI 分析你的訊息節奏，就能看出你今天是否感到孤獨？科技與情感的邊界，比你想的更模糊。',
    color: '#db2777',
    glow: 'rgba(219,39,119,0.5)',
    date: '2026/03',
    duration: '約 20 分鐘',
    audioUrl: `${BASE}/ep04-ai-loneliness.mp3`,
    tags: ['AI科技', '心理', '孤獨'],
    coverImage: 'https://images.unsplash.com/photo-1516110833967-0b5716ca1387?w=800&auto=format&fit=crop&q=80',
  },
  {
    ep: 5,
    title: '台北廢墟收到的太空求救',
    desc: '在台北某處廢棄建築裡，一台舊設備接收到了不明訊號。這是故事，也是對城市與宇宙的想像。',
    color: '#d97706',
    glow: 'rgba(217,119,6,0.5)',
    date: '2026/03',
    duration: '約 11 分鐘',
    audioUrl: `${BASE}/ep05-taipei-ruin.mp3`,
    tags: ['短篇故事', '科幻', '台北'],
    coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&auto=format&fit=crop&q=80',
  },
  {
    ep: 6,
    title: '用 AI 一人拍大片',
    desc: '從腳本、分鏡到後製，一個人搭配 AI 工具也能做出電影等級的作品？這集帶你看實戰流程。',
    color: '#e11d48',
    glow: 'rgba(225,29,72,0.5)',
    date: '2026/03',
    duration: '約 23 分鐘',
    audioUrl: `${BASE}/ep06-ai-film.mp3`,
    tags: ['AI創作', '影片製作', '一人團隊'],
    coverImage: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&auto=format&fit=crop&q=80',
  },
  {
    ep: 7,
    title: '長照路上的崩潰與解脫',
    desc: '照顧家人是愛，但也可能是一條讓人喘不過氣的路。這集聊聊長照者的心理重量，以及如何在不放棄自己的前提下撐下去。',
    color: '#f59e0b',
    glow: 'rgba(245,158,11,0.5)',
    date: '2026/03',
    duration: '約 26 分鐘',
    audioUrl: `${BASE}/ep07-caregiver-burnout.m4a`,
    tags: ['長照', '照顧者', '情感療癒'],
    coverImage: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&auto=format&fit=crop&q=80',
  },
  {
    ep: 8,
    title: '離世是靈魂計畫好的畢業',
    desc: '如果死亡不是終點，而是靈魂早就安排好的一場畢業典禮呢？這集從不同角度重新看待「離開」這件事。',
    color: '#8b5cf6',
    glow: 'rgba(139,92,246,0.5)',
    date: '2026/03',
    duration: '約 27 分鐘',
    audioUrl: `${BASE}/ep08-soul-graduation.m4a`,
    tags: ['靈魂', '生命觀', '療癒'],
    coverImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&auto=format&fit=crop&q=80',
  },
];

// 音波動畫
function SoundWave({ color }: { color: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', height: '32px' }}>
      {[1,2,3,4,5,4,3,2,1].map((h, i) => (
        <div key={i} style={{
          width: '5px', height: `${h * 6}px`,
          background: color, borderRadius: '3px',
          animation: `wave ${0.5 + i * 0.08}s ease-in-out infinite alternate`,
        }} />
      ))}
      <style>{`@keyframes wave{from{transform:scaleY(0.3)}to{transform:scaleY(1)}}`}</style>
    </div>
  );
}

// 格式化時間（秒 → m:ss）
function fmt(s: number) {
  if (!isFinite(s) || isNaN(s)) return '--:--';
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, '0')}`;
}

// 嵌入式音頻播放器
function AudioPlayer({ url, color }: { url: string; color: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('0:00');
  const [duration, setDuration] = useState('--:--');

  const togglePlay = () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) { a.pause(); setPlaying(false); }
    else { a.play(); setPlaying(true); }
  };

  const onTimeUpdate = () => {
    const a = audioRef.current;
    if (!a) return;
    setCurrentTime(fmt(a.currentTime));
    setProgress(a.duration ? (a.currentTime / a.duration) * 100 : 0);
  };

  const onLoadedMetadata = () => {
    const a = audioRef.current;
    if (!a) return;
    setDuration(fmt(a.duration));
  };

  const onEnded = () => setPlaying(false);

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const a = audioRef.current;
    if (!a || !a.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    a.currentTime = ratio * a.duration;
  };

  return (
    <div style={{ padding: '0 1.5rem 1.2rem' }}>
      <audio
        ref={audioRef}
        src={url}
        onTimeUpdate={onTimeUpdate}
        onLoadedMetadata={onLoadedMetadata}
        onEnded={onEnded}
        preload="metadata"
      />
      <div style={{
        background: 'rgba(0,0,0,0.3)', borderRadius: '14px', padding: '1rem 1.2rem',
        border: `1px solid ${color}44`,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* 播放 / 暫停 */}
          <button
            onClick={togglePlay}
            style={{
              width: '46px', height: '46px', borderRadius: '50%', border: 'none',
              background: `linear-gradient(135deg,${color},${color}bb)`,
              color: '#fff', fontSize: '1.1rem', cursor: 'pointer', flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: `0 4px 14px ${color}66`,
            }}
          >
            {playing ? '⏸' : '▶'}
          </button>

          {/* 進度條 + 時間 */}
          <div style={{ flex: 1 }}>
            <div
              onClick={seek}
              style={{
                height: '6px', background: 'rgba(255,255,255,0.12)',
                borderRadius: '4px', cursor: 'pointer', marginBottom: '0.4rem',
              }}
            >
              <div style={{
                height: '100%', width: `${progress}%`,
                background: `linear-gradient(90deg,${color},${color}cc)`,
                borderRadius: '4px', transition: 'width 0.15s',
              }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#9ca3af' }}>
              <span>{currentTime}</span>
              <span>{duration}</span>
            </div>
          </div>

          {/* 音波動畫（播放中才顯示） */}
          {playing && <SoundWave color={color} />}
        </div>
      </div>
    </div>
  );
}

export default function PodcastPage() {
  const [activeEp, setActiveEp] = useState<number | null>(null);

  return (
    <div style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>

      {/* ── 錄音間背景圖（Unsplash 免費）── */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0,
        backgroundImage: 'url(https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=1600&auto=format&fit=crop&q=70)',
        backgroundSize: 'cover', backgroundPosition: 'center',
        filter: 'brightness(0.22) saturate(1.5)',
      }} />
      {/* 漸層遮罩 */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 1,
        background: 'linear-gradient(180deg, rgba(15,12,41,0.72) 0%, rgba(48,43,99,0.55) 50%, rgba(15,12,41,0.88) 100%)',
      }} />

      {/* ── 內容區 ── */}
      <div style={{ position: 'relative', zIndex: 2, padding: '2.5rem 1rem 5rem' }}>
        <div style={{ maxWidth: '820px', margin: '0 auto' }}>

          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <div style={{ fontSize: '4rem', marginBottom: '0.5rem', filter: 'drop-shadow(0 0 24px rgba(167,139,250,0.9))' }}>
              🎙️
            </div>
            <h1 style={{
              color: '#fff', fontSize: 'clamp(1.8rem, 5vw, 2.8rem)',
              fontWeight: 900, margin: '0 0 0.6rem',
              textShadow: '0 2px 24px rgba(124,58,237,0.7)',
            }}>
              Surprise Corner Podcast
            </h1>
            <p style={{ color: '#c4b5fd', fontSize: '1rem', margin: '0 0 1.4rem' }}>
              AI・理財・故事・創作，一個療癒你心情的角落
            </p>
            <div style={{ display: 'flex', gap: '0.7rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              {['🎵 由 NotebookLM 生成', '📅 不定期更新', '🎧 直接線上收聽'].map(t => (
                <span key={t} style={{
                  background: 'rgba(124,58,237,0.25)', border: '1px solid rgba(167,139,250,0.35)',
                  color: '#e9d5ff', padding: '0.3rem 1rem', borderRadius: '20px',
                  fontSize: '0.82rem', backdropFilter: 'blur(8px)',
                }}>{t}</span>
              ))}
            </div>
          </div>

          {/* 集數列表 */}
          <h2 style={{ color: '#e9d5ff', fontSize: '1.3rem', fontWeight: 800, marginBottom: '1.2rem' }}>
            🎧 所有集數
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            {EPISODES.map(ep => {
              const isActive = activeEp === ep.ep;
              return (
                <div key={ep.ep} style={{
                  background: isActive
                    ? `linear-gradient(135deg,${ep.color}28,rgba(255,255,255,0.09))`
                    : 'rgba(255,255,255,0.07)',
                  border: `1px solid ${isActive ? ep.color + 'bb' : 'rgba(167,139,250,0.2)'}`,
                  borderRadius: '18px', overflow: 'hidden',
                  backdropFilter: 'blur(14px)',
                  boxShadow: isActive ? `0 0 36px ${ep.glow}` : 'none',
                  transition: 'all 0.35s ease',
                }}>

                  {/* 展開時：氛圍封面圖 */}
                  {isActive && (
                    <div style={{ position: 'relative', height: '180px', overflow: 'hidden' }}>
                      <img
                        src={ep.coverImage}
                        alt={ep.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.5) saturate(1.4)' }}
                      />
                      <div style={{
                        position: 'absolute', inset: 0,
                        display: 'flex', flexDirection: 'column',
                        alignItems: 'center', justifyContent: 'center', gap: '0.8rem',
                        background: 'linear-gradient(135deg, rgba(15,12,41,0.35), rgba(124,58,237,0.15))',
                      }}>
                        <div style={{ fontSize: '2.5rem', filter: 'drop-shadow(0 0 16px rgba(255,255,255,0.9))' }}>🎙️</div>
                        <span style={{ color: '#fff', fontWeight: 700, fontSize: '0.9rem', textShadow: '0 1px 6px rgba(0,0,0,0.9)' }}>
                          點擊播放按鈕開始收聽
                        </span>
                      </div>
                    </div>
                  )}

                  {/* 集數主資訊 */}
                  <div style={{ padding: '1.3rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    {/* EP 徽章 */}
                    <div style={{
                      width: '56px', height: '56px', borderRadius: '14px', flexShrink: 0,
                      background: `linear-gradient(135deg,${ep.color},${ep.color}88)`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontWeight: 900, fontSize: '0.8rem', color: '#fff',
                      boxShadow: `0 4px 18px ${ep.glow}`,
                    }}>
                      EP{String(ep.ep).padStart(2, '0')}
                    </div>

                    {/* 標題 + 說明 */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', gap: '0.6rem', marginBottom: '0.25rem', alignItems: 'center', flexWrap: 'wrap' }}>
                        <span style={{ color: '#9ca3af', fontSize: '0.75rem' }}>{ep.date}</span>
                        <span style={{ color: '#6b7280', fontSize: '0.75rem' }}>•</span>
                      </div>
                      <div style={{ color: '#f3f4f6', fontWeight: 700, fontSize: '1rem', marginBottom: '0.3rem' }}>
                        {ep.title}
                      </div>
                      <p style={{
                        color: '#9ca3af', fontSize: '0.82rem', margin: 0, lineHeight: 1.5,
                        display: '-webkit-box', WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical', overflow: 'hidden',
                      }}>
                        {ep.desc}
                      </p>
                    </div>

                    {/* 展開 / 收合 按鈕 */}
                    <div style={{ flexShrink: 0 }}>
                      <button
                        onClick={() => setActiveEp(isActive ? null : ep.ep)}
                        style={{
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          width: '50px', height: '50px', borderRadius: '50%', border: 'none',
                          background: `linear-gradient(135deg,${ep.color},${ep.color}bb)`,
                          boxShadow: `0 4px 18px ${ep.glow}`,
                          cursor: 'pointer', fontSize: '1.2rem', color: '#fff',
                          transition: 'transform 0.2s',
                        }}
                        onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.1)')}
                        onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                        title={isActive ? '收合' : '展開播放器'}
                      >
                        {isActive ? '▼' : '▶'}
                      </button>
                    </div>
                  </div>

                  {/* 嵌入式音頻播放器（展開時顯示） */}
                  {isActive && <AudioPlayer url={ep.audioUrl} color={ep.color} />}

                  {/* 標籤 */}
                  <div style={{ padding: '0 1.5rem 1.2rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {ep.tags.map(tag => (
                      <span key={tag} style={{
                        background: `${ep.color}22`, color: ep.color,
                        fontSize: '0.73rem', padding: '2px 10px', borderRadius: '20px', fontWeight: 600,
                      }}>#{tag}</span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* 更多集數預告 */}
          <div style={{
            marginTop: '1.5rem',
            background: 'rgba(255,255,255,0.04)',
            border: '1px dashed rgba(167,139,250,0.3)',
            borderRadius: '16px', padding: '1.5rem', textAlign: 'center',
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.4rem' }}>🎵</div>
            <p style={{ color: '#a78bfa', fontWeight: 700, fontSize: '0.95rem', margin: '0 0 0.3rem' }}>
              更多集數持續更新中
            </p>
            <p style={{ color: '#6b7280', fontSize: '0.82rem', margin: 0 }}>
              追蹤 Surprise Corner，第一時間收到新集通知
            </p>
          </div>

          {/* 請魯魯吃罐罐 */}
          <div style={{
            marginTop: '2rem',
            background: 'linear-gradient(135deg,rgba(251,191,36,0.12),rgba(249,115,22,0.12))',
            border: '1px solid rgba(251,191,36,0.35)',
            borderRadius: '16px', padding: '1.5rem', textAlign: 'center',
            backdropFilter: 'blur(8px)',
          }}>
            <div style={{ fontSize: '2.2rem', marginBottom: '0.4rem' }}>🐾</div>
            <p style={{ color: '#fcd34d', fontWeight: 800, fontSize: '1.05rem', margin: '0 0 0.4rem' }}>
              喜歡這個節目？請魯魯吃罐罐！
            </p>
            <p style={{ color: '#d1d5db', fontSize: '0.88rem', margin: '0 0 0.3rem' }}>
              你的支持讓節目繼續做，也讓魯魯罐頭不斷糧 🥫
            </p>
            <p style={{ color: '#9ca3af', fontSize: '0.8rem', margin: '0 0 1.2rem' }}>
              加 LINE 私訊「請罐罐」，我會回傳轉帳帳號，一罐 NT$50 起，數量不限 😄
            </p>
            <a href="https://line.me/R/ti/p/@983agawb" target="_blank" rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                background: 'linear-gradient(135deg,#06C755,#00a040)',
                color: '#fff', padding: '0.65rem 2rem', borderRadius: '30px',
                textDecoration: 'none', fontWeight: 700, fontSize: '0.9rem',
                boxShadow: '0 4px 16px rgba(6,199,85,0.4)',
              }}>
              💬 加 LINE 請罐罐
            </a>
            <p style={{ marginTop: '0.75rem', color: 'rgba(209,213,219,0.5)', fontSize: '0.75rem' }}>
              每一罐都會被魯魯親自認證好吃 🐈
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
