'use client';
// 📄 檔案路徑：src/app/podcast/page.tsx
// 功能：Podcast 節目頁面（聽眾版）— 集數列表 + 錄音間背景 + 播放氛圍圖

import { useState } from 'react';

interface Episode {
  ep: number;
  title: string;
  desc: string;
  color: string;
  glow: string;
  date: string;
  duration: string;
  notebooklmUrl?: string;
  tags: string[];
  coverImage: string; // Unsplash 免費氛圍圖（播放時顯示）
}

// ✏️ 每次新增集數只要在這裡加一筆資料即可
// notebooklmUrl：到 NotebookLM → Audio Overview → Share → 複製連結貼這裡
const EPISODES: Episode[] = [
  {
    ep: 1,
    title: 'Surprise Corner 是什麼？品牌初登場',
    desc: '介紹 Surprise Corner 的誕生故事：每天不一樣的小驚喜、連載小說、AI快訊，一個療癒你心情的角落。',
    color: '#7c3aed',
    glow: 'rgba(124,58,237,0.5)',
    date: '2026/02',
    duration: '約 10 分鐘',
    tags: ['品牌介紹', '網站導覽'],
    // Unsplash 免費圖：麥克風錄音氛圍
    coverImage: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800&auto=format&fit=crop&q=80',
    // notebooklmUrl: 'https://notebooklm.google.com/...',
  },
  // 新增 EP02 範例（取消註解後填入資料）：
  // {
  //   ep: 2,
  //   title: '本週 AI 大事件',
  //   desc: '這週最值得知道的 3 件 AI 大事，用輕鬆的方式帶你聽懂趨勢。',
  //   color: '#0ea5e9',
  //   glow: 'rgba(14,165,233,0.5)',
  //   date: '2026/03',
  //   duration: '約 12 分鐘',
  //   tags: ['AI科技', '本週快訊'],
  //   coverImage: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&auto=format&fit=crop&q=80',
  //   notebooklmUrl: '',
  // },
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

export default function PodcastPage() {
  const [playingEp, setPlayingEp] = useState<number | null>(null);

  return (
    <div style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>

      {/* ── 錄音間背景圖（Unsplash 免費）── */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0,
        backgroundImage: 'url(https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=1600&auto=format&fit=crop&q=70)',
        backgroundSize: 'cover', backgroundPosition: 'center',
        filter: 'brightness(0.22) saturate(1.5)',
      }} />
      {/* 漸層遮罩讓文字清楚 */}
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
              每集一個主題，用聲音帶你探索 AI・棒球・生活・故事
            </p>
            <div style={{ display: 'flex', gap: '0.7rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              {['🎵 由 NotebookLM 生成', '📅 不定期更新', '⏱ 每集 10–15 分鐘'].map(t => (
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
              const isActive = playingEp === ep.ep;
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

                  {/* 播放中：顯示氛圍封面圖 + 音波 */}
                  {isActive && (
                    <div style={{ position: 'relative', height: '210px', overflow: 'hidden' }}>
                      <img
                        src={ep.coverImage}
                        alt={ep.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.55) saturate(1.4)' }}
                      />
                      <div style={{
                        position: 'absolute', inset: 0,
                        display: 'flex', flexDirection: 'column',
                        alignItems: 'center', justifyContent: 'center', gap: '0.8rem',
                        background: 'linear-gradient(135deg, rgba(15,12,41,0.4), rgba(124,58,237,0.2))',
                      }}>
                        <div style={{ fontSize: '2.8rem', filter: 'drop-shadow(0 0 16px rgba(255,255,255,0.9))' }}>🎙️</div>
                        <SoundWave color={ep.color} />
                        <span style={{ color: '#fff', fontWeight: 700, fontSize: '0.9rem', textShadow: '0 1px 6px rgba(0,0,0,0.9)' }}>
                          正在收聽中...
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
                        <span style={{ color: '#9ca3af', fontSize: '0.75rem' }}>⏱ {ep.duration}</span>
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

                    {/* 播放 / 鎖定 按鈕 */}
                    <div style={{ flexShrink: 0 }}>
                      {ep.notebooklmUrl ? (
                        <a
                          href={ep.notebooklmUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => setPlayingEp(isActive ? null : ep.ep)}
                          style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            width: '50px', height: '50px', borderRadius: '50%',
                            background: `linear-gradient(135deg,${ep.color},${ep.color}bb)`,
                            boxShadow: `0 4px 18px ${ep.glow}`,
                            textDecoration: 'none', fontSize: '1.4rem',
                            transition: 'transform 0.2s',
                          }}
                          onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.1)')}
                          onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                        >
                          {isActive ? '⏸' : '▶️'}
                        </a>
                      ) : (
                        <div style={{
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          width: '50px', height: '50px', borderRadius: '50%',
                          background: 'rgba(255,255,255,0.07)',
                          fontSize: '1.2rem',
                        }} title="音檔準備中">🔒</div>
                      )}
                    </div>
                  </div>

                  {/* 標籤 */}
                  <div style={{ padding: '0 1.5rem 1.2rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {ep.tags.map(tag => (
                      <span key={tag} style={{
                        background: `${ep.color}22`, color: ep.color,
                        fontSize: '0.73rem', padding: '2px 10px', borderRadius: '20px', fontWeight: 600,
                      }}>#{tag}</span>
                    ))}
                    {!ep.notebooklmUrl && (
                      <span style={{
                        background: 'rgba(107,114,128,0.18)', color: '#6b7280',
                        fontSize: '0.73rem', padding: '2px 10px', borderRadius: '20px',
                      }}>音檔準備中</span>
                    )}
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

          {/* Ko-fi */}
          <div style={{
            marginTop: '2rem',
            background: 'linear-gradient(135deg,rgba(245,158,11,0.15),rgba(236,72,153,0.15))',
            border: '1px solid rgba(245,158,11,0.3)',
            borderRadius: '16px', padding: '1.5rem', textAlign: 'center',
            backdropFilter: 'blur(8px)',
          }}>
            <p style={{ color: '#fcd34d', fontWeight: 700, fontSize: '1rem', margin: '0 0 0.4rem' }}>
              ☕ 喜歡這個節目？請我喝杯咖啡！
            </p>
            <p style={{ color: '#d1d5db', fontSize: '0.88rem', margin: '0 0 1rem' }}>
              你的支持讓每集節目更有動力繼續做下去 💜
            </p>
            <a href="https://ko-fi.com/surprisecorner" target="_blank" rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                background: 'linear-gradient(135deg,#FF5E5B,#ff8c42)',
                color: '#fff', padding: '0.65rem 2rem', borderRadius: '30px',
                textDecoration: 'none', fontWeight: 700, fontSize: '0.9rem',
                boxShadow: '0 4px 16px rgba(255,94,91,0.4)',
              }}>
              ☕ 前往 Ko-fi 支持
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}