'use client';
// 📄 檔案路徑：src/app/podcast/page.tsx
// 功能：Podcast 節目頁面 — 每集節目列表 + 製作 SOP 說明

import { useState } from 'react';

interface Episode {
  ep: number;
  title: string;
  desc: string;
  icon: string;
  color: string;
  glow: string;
  date: string;
  duration: string;
  notebooklmUrl?: string; // NotebookLM 嵌入連結（有的話填入）
  tags: string[];
}

const EPISODES: Episode[] = [
  {
    ep: 1,
    title: 'Surprise Corner 是什麼？品牌初登場',
    desc: '介紹 Surprise Corner 的誕生故事：每天不一樣的小驚喜、連載小說、AI快訊，一個療癒心情的角落。',
    icon: '🎙️',
    color: '#7c3aed',
    glow: 'rgba(124,58,237,0.4)',
    date: '2026/02',
    duration: '約 10 分鐘',
    tags: ['品牌介紹', '網站導覽'],
  },
  // ✏️ 未來新增集數請在這裡加入，複製上面格式即可
  // {
  //   ep: 2,
  //   title: '本週 AI 大事件',
  //   desc: '這週最值得知道的 3 件 AI 大事，用輕鬆的方式帶你聽懂趨勢。',
  //   icon: '🤖',
  //   color: '#0ea5e9',
  //   glow: 'rgba(14,165,233,0.4)',
  //   date: '2026/03',
  //   duration: '約 12 分鐘',
  //   tags: ['AI科技', '本週快訊'],
  //   notebooklmUrl: '', // 填入 NotebookLM 分享連結
  // },
];

const SOP_STEPS = [
  { step: '01', icon: '📌', title: '決定本集主題', desc: '選一個主題：AI快訊 / 棒球賽事 / 連載故事 / 工具介紹' },
  { step: '02', icon: '📎', title: '收集素材', desc: '找 3–5 篇相關文章或素材（URL 或文字）' },
  { step: '03', icon: '🆕', title: '建立新 Notebook', desc: '在 NotebookLM 建一個全新 Notebook，不要沿用舊的！' },
  { step: '04', icon: '📥', title: '貼入素材', desc: '把收集的 URL 或文字貼進新 Notebook 作為來源' },
  { step: '05', icon: '🎙️', title: '生成 Audio Overview', desc: '點「Audio Overview」，等待生成完成' },
  { step: '06', icon: '✅', title: '加上固定開場白', desc: '手動加一句：「我是 Surprise Corner，今天帶你...」' },
];

const FORMAT = [
  { time: '開場 30 秒', desc: '固定台詞提到 Surprise Corner（只出現這一次）', highlight: true },
  { time: '主題討論 8–12 分鐘', desc: '本集素材深度討論，完全不提品牌', highlight: false },
  { time: '結尾 1 分鐘', desc: '預告下集主題，邀聽眾回來', highlight: false },
];

export default function PodcastPage() {
  const [expandedEp, setExpandedEp] = useState<number | null>(null);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)',
      padding: '2rem 1rem',
    }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>

        {/* ── Header ── */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{ fontSize: '3.5rem', marginBottom: '0.5rem' }}>🎙️</div>
          <h1 style={{ color: '#fff', fontSize: '2.2rem', fontWeight: 900, margin: '0 0 0.5rem' }}>
            Surprise Corner Podcast
          </h1>
          <p style={{ color: '#a78bfa', fontSize: '1rem', margin: 0 }}>
            每集一個主題，用聲音帶你探索 AI・棒球・生活・故事
          </p>
          <div style={{ marginTop: '1.2rem', display: 'flex', gap: '0.8rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <span style={{ background: 'rgba(124,58,237,0.2)', border: '1px solid rgba(167,139,250,0.3)', color: '#c4b5fd', padding: '0.3rem 1rem', borderRadius: '20px', fontSize: '0.82rem' }}>
              🎵 由 NotebookLM 生成
            </span>
            <span style={{ background: 'rgba(124,58,237,0.2)', border: '1px solid rgba(167,139,250,0.3)', color: '#c4b5fd', padding: '0.3rem 1rem', borderRadius: '20px', fontSize: '0.82rem' }}>
              📅 不定期更新
            </span>
            <span style={{ background: 'rgba(124,58,237,0.2)', border: '1px solid rgba(167,139,250,0.3)', color: '#c4b5fd', padding: '0.3rem 1rem', borderRadius: '20px', fontSize: '0.82rem' }}>
              ⏱ 每集 10–15 分鐘
            </span>
          </div>
        </div>

        {/* ── 節目格式說明 ── */}
        <div style={{
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(167,139,250,0.2)',
          borderRadius: '16px',
          padding: '1.5rem',
          marginBottom: '2.5rem',
        }}>
          <h2 style={{ color: '#e9d5ff', fontSize: '1.1rem', fontWeight: 800, margin: '0 0 1rem' }}>
            📻 固定節目格式
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {FORMAT.map((f, i) => (
              <div key={i} style={{
                display: 'flex', gap: '1rem', alignItems: 'flex-start',
                padding: '0.7rem 1rem',
                borderRadius: '10px',
                background: f.highlight ? 'rgba(124,58,237,0.15)' : 'rgba(255,255,255,0.03)',
                border: f.highlight ? '1px solid rgba(167,139,250,0.3)' : '1px solid transparent',
              }}>
                <span style={{ color: '#a78bfa', fontSize: '0.82rem', fontWeight: 700, minWidth: '100px', whiteSpace: 'nowrap' }}>
                  {f.time}
                </span>
                <span style={{ color: '#d1d5db', fontSize: '0.88rem' }}>{f.desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── 集數列表 ── */}
        <h2 style={{ color: '#e9d5ff', fontSize: '1.4rem', fontWeight: 800, marginBottom: '1.2rem' }}>
          🎧 所有集數
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem' }}>
          {EPISODES.map(ep => (
            <div
              key={ep.ep}
              style={{
                background: 'rgba(255,255,255,0.07)',
                border: `1px solid ${expandedEp === ep.ep ? ep.color + '88' : 'rgba(167,139,250,0.2)'}`,
                borderRadius: '14px',
                overflow: 'hidden',
                transition: 'all 0.25s',
              }}
            >
              {/* 集數標題列 */}
              <button
                onClick={() => setExpandedEp(expandedEp === ep.ep ? null : ep.ep)}
                style={{
                  width: '100%', background: 'none', border: 'none', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: '1rem',
                  padding: '1.2rem 1.5rem', textAlign: 'left',
                }}
              >
                <div style={{
                  width: '52px', height: '52px', borderRadius: '12px', flexShrink: 0,
                  background: `linear-gradient(135deg, ${ep.color}, ${ep.color}88)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.6rem', boxShadow: `0 4px 15px ${ep.glow}`,
                }}>
                  {ep.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.3rem', flexWrap: 'wrap' }}>
                    <span style={{
                      background: ep.color + '33', color: ep.color,
                      fontSize: '0.72rem', fontWeight: 800, padding: '2px 8px', borderRadius: '20px',
                    }}>
                      EP{String(ep.ep).padStart(2, '0')}
                    </span>
                    <span style={{ color: '#6b7280', fontSize: '0.75rem' }}>{ep.date}</span>
                    <span style={{ color: '#6b7280', fontSize: '0.75rem' }}>⏱ {ep.duration}</span>
                  </div>
                  <div style={{ color: '#f3f4f6', fontSize: '1rem', fontWeight: 700 }}>{ep.title}</div>
                </div>
                <span style={{ color: '#a78bfa', fontSize: '1.2rem', flexShrink: 0 }}>
                  {expandedEp === ep.ep ? '▲' : '▼'}
                </span>
              </button>

              {/* 展開內容 */}
              {expandedEp === ep.ep && (
                <div style={{ padding: '0 1.5rem 1.5rem', borderTop: '1px solid rgba(167,139,250,0.1)' }}>
                  <p style={{ color: '#d1d5db', fontSize: '0.9rem', lineHeight: 1.7, margin: '1rem 0' }}>
                    {ep.desc}
                  </p>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                    {ep.tags.map(tag => (
                      <span key={tag} style={{
                        background: 'rgba(167,139,250,0.1)', color: '#a78bfa',
                        fontSize: '0.75rem', padding: '2px 10px', borderRadius: '20px',
                      }}>#{tag}</span>
                    ))}
                  </div>
                  {ep.notebooklmUrl ? (
                    <a href={ep.notebooklmUrl} target="_blank" rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                        background: `linear-gradient(135deg, ${ep.color}, ${ep.color}aa)`,
                        color: '#fff', padding: '0.6rem 1.5rem', borderRadius: '30px',
                        textDecoration: 'none', fontWeight: 700, fontSize: '0.88rem',
                      }}>
                      🎵 收聽本集
                    </a>
                  ) : (
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                      background: 'rgba(255,255,255,0.08)', color: '#6b7280',
                      padding: '0.6rem 1.5rem', borderRadius: '30px', fontSize: '0.88rem',
                    }}>
                      🔒 音檔準備中
                    </span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* ── 製作 SOP ── */}
        <div style={{
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(167,139,250,0.2)',
          borderRadius: '16px',
          padding: '1.5rem',
          marginBottom: '2.5rem',
        }}>
          <h2 style={{ color: '#e9d5ff', fontSize: '1.1rem', fontWeight: 800, margin: '0 0 1.2rem' }}>
            🛠 每集製作 SOP（NotebookLM）
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '0.8rem' }}>
            {SOP_STEPS.map(s => (
              <div key={s.step} style={{
                background: 'rgba(124,58,237,0.08)',
                border: '1px solid rgba(124,58,237,0.2)',
                borderRadius: '12px', padding: '1rem',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
                  <span style={{
                    background: 'rgba(124,58,237,0.3)', color: '#c4b5fd',
                    fontWeight: 800, fontSize: '0.75rem', padding: '2px 8px', borderRadius: '8px',
                  }}>STEP {s.step}</span>
                  <span style={{ fontSize: '1.2rem' }}>{s.icon}</span>
                </div>
                <div style={{ color: '#e9d5ff', fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.3rem' }}>{s.title}</div>
                <div style={{ color: '#9ca3af', fontSize: '0.82rem', lineHeight: 1.5 }}>{s.desc}</div>
              </div>
            ))}
          </div>
          <div style={{
            marginTop: '1rem',
            padding: '0.8rem 1rem',
            background: 'rgba(239,68,68,0.1)',
            border: '1px solid rgba(239,68,68,0.25)',
            borderRadius: '10px',
            color: '#fca5a5',
            fontSize: '0.85rem',
          }}>
            ⚠️ 重點：每集都要開一個<strong>全新 Notebook</strong>，不要沿用同一個！否則每集都會變成網站介紹廣告。
          </div>
        </div>

        {/* ── Ko-fi 支持區 ── */}
        <div style={{
          background: 'linear-gradient(135deg, #f59e0b22, #ec489922)',
          border: '1px solid rgba(245,158,11,0.3)',
          borderRadius: '16px', padding: '1.5rem', textAlign: 'center',
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
              background: 'linear-gradient(135deg, #FF5E5B, #ff8c42)',
              color: '#fff', padding: '0.6rem 1.8rem', borderRadius: '30px',
              textDecoration: 'none', fontWeight: 700, fontSize: '0.9rem',
              boxShadow: '0 4px 15px rgba(255,94,91,0.35)',
            }}>
            ☕ 前往 Ko-fi
          </a>
        </div>

      </div>
    </div>
  );
}