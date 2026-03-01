'use client';
// AIBookPromo.tsx
// 可嵌入 surprise-corner.vercel.app 的《影音AI工具完全指南》促銷元件
// 風格：深紫色星空調，與網站主題一致

import React, { useState } from 'react';

interface Chapter {
  num: number;
  emoji: string;
  title: string;
  tools: string[];
}

const CHAPTERS: Chapter[] = [
  { num: 1, emoji: '🚀', title: '什麼是影音AI？新手入門', tools: ['生成式AI', '學習路線'] },
  { num: 2, emoji: '🎬', title: 'AI文字生影片工具', tools: ['Sora', 'Runway', 'Kling', 'Pika'] },
  { num: 3, emoji: '🎨', title: 'AI圖片生成工具', tools: ['Midjourney', 'DALL-E 3', 'Ideogram', 'Flux'] },
  { num: 4, emoji: '🎵', title: 'AI音樂生成工具', tools: ['Suno', 'Udio', 'Stable Audio'] },
  { num: 5, emoji: '🎙️', title: 'AI配音與聲音克隆', tools: ['ElevenLabs', 'Play.ht'] },
  { num: 6, emoji: '✂️', title: 'AI影片剪輯與後製', tools: ['CapCut AI', 'Adobe Firefly'] },
  { num: 7, emoji: '💰', title: '免費工具總整理', tools: ['零預算方案', '推薦組合'] },
  { num: 8, emoji: '⚡', title: '實戰案例與Prompt技巧', tools: ['SCAQ公式', '完整案例'] },
];

export default function AIBookPromo() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section
      style={{
        background: 'linear-gradient(135deg, #0d0030 0%, #1a0050 50%, #060015 100%)',
        border: '1px solid rgba(124,58,237,0.3)',
        borderRadius: '20px',
        padding: 'clamp(24px, 4vw, 48px)',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: "'Noto Sans TC', 'PingFang TC', sans-serif",
      }}
    >
      {/* 背景光暈 */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(124,58,237,0.18), transparent)',
      }} />

      {/* ── 頂部標籤 ── */}
      <div style={{ position: 'relative', textAlign: 'center', marginBottom: '28px' }}>
        <span style={{
          display: 'inline-block',
          background: 'rgba(124,58,237,0.2)',
          border: '1px solid rgba(124,58,237,0.4)',
          color: '#a855f7', fontSize: '11px', fontWeight: 700,
          letterSpacing: '2px', textTransform: 'uppercase' as const,
          padding: '5px 16px', borderRadius: '100px',
        }}>
          📚 電子書上架
        </span>
      </div>

      {/* ── 書封 + 書名 ── */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        gap: '24px', flexWrap: 'wrap' as const, marginBottom: '28px',
        position: 'relative',
      }}>
        {/* CSS 書封 */}
        <div style={{
          width: '100px', height: '140px', flexShrink: 0,
          background: 'linear-gradient(160deg, #1a0050 0%, #2d0080 55%, #0d0030 100%)',
          borderRadius: '10px 4px 4px 10px',
          boxShadow: '8px 12px 40px rgba(124,58,237,0.6), -4px 0 0 rgba(0,0,0,0.5)',
          display: 'flex', flexDirection: 'column' as const,
          alignItems: 'center', justifyContent: 'center',
          padding: '14px 12px', position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
            background: 'linear-gradient(90deg, transparent, #fbbf24, transparent)',
          }} />
          <span style={{ fontSize: '28px', marginBottom: '8px' }}>🎬</span>
          <div style={{
            fontSize: '9px', fontWeight: 900, color: '#e2d9f3',
            textAlign: 'center', lineHeight: 1.5,
          }}>影音AI工具<br />完全指南</div>
        </div>

        <div style={{ textAlign: 'left', maxWidth: '380px' }}>
          <h2 style={{
            fontSize: 'clamp(18px, 2.5vw, 26px)', fontWeight: 900,
            background: 'linear-gradient(135deg, #e2d9f3, #c4b5fd, #fbbf24)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            backgroundClip: 'text', margin: '0 0 10px', lineHeight: 1.3,
          }}>
            影音AI工具完全指南
          </h2>
          <p style={{ color: '#9ca3b0', fontSize: '14px', lineHeight: 1.75, margin: '0 0 14px' }}>
            從零學會 Sora、Midjourney、Suno、ElevenLabs 等 <strong style={{ color: '#c4b5fd' }}>20+ 款</strong>熱門AI工具。
            繁體中文，完全不需要技術背景。
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: '6px' }}>
            {['🎬 影片', '🎨 圖片', '🎵 音樂', '🎙️ 配音', '✂️ 剪輯'].map(tag => (
              <span key={tag} style={{
                background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '100px', padding: '3px 10px',
                fontSize: '11px', color: '#c4b5fd',
              }}>{tag}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ── 統計數字 ── */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px',
        marginBottom: '24px', position: 'relative',
      }}>
        {[
          { n: '8', l: '完整章節' },
          { n: '20+', l: '工具介紹' },
          { n: '50+', l: 'Prompt範例' },
          { n: '15K', l: '字完整內容' },
        ].map(s => (
          <div key={s.l} style={{
            background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '12px', padding: '12px 8px', textAlign: 'center',
          }}>
            <div style={{ fontSize: '22px', fontWeight: 900, color: '#a855f7' }}>{s.n}</div>
            <div style={{ fontSize: '11px', color: '#6b7280', marginTop: '2px' }}>{s.l}</div>
          </div>
        ))}
      </div>

      {/* ── 章節列表 ── */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))',
        gap: '8px', marginBottom: '24px', position: 'relative',
      }}>
        {CHAPTERS.map(ch => (
          <div
            key={ch.num}
            onMouseEnter={() => setHovered(ch.num)}
            onMouseLeave={() => setHovered(null)}
            style={{
              background: hovered === ch.num ? 'rgba(124,58,237,0.15)' : 'rgba(255,255,255,0.04)',
              border: `1px solid ${hovered === ch.num ? 'rgba(124,58,237,0.45)' : 'rgba(255,255,255,0.08)'}`,
              borderRadius: '12px', padding: '12px', transition: 'all 0.2s', cursor: 'default',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '6px' }}>
              <span style={{ fontSize: '15px' }}>{ch.emoji}</span>
              <span style={{ fontSize: '10px', color: '#7c3aed', fontWeight: 700 }}>CH.0{ch.num}</span>
            </div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#e2d9f3', marginBottom: '7px', lineHeight: 1.4 }}>
              {ch.title}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: '4px' }}>
              {ch.tools.slice(0, 3).map(tool => (
                <span key={tool} style={{
                  background: 'rgba(124,58,237,0.2)', borderRadius: '4px',
                  padding: '1px 6px', fontSize: '10px', color: '#a855f7',
                  border: '1px solid rgba(124,58,237,0.2)',
                }}>{tool}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ── 定價 + CTA ── */}
      <div style={{ position: 'relative', textAlign: 'center' }}>
        {/* 價格列 */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          gap: '14px', marginBottom: '18px', flexWrap: 'wrap' as const,
        }}>
          <span style={{ fontSize: '15px', color: '#6b7280', textDecoration: 'line-through' }}>NT$680</span>
          <span style={{ fontSize: '38px', fontWeight: 900, color: '#fbbf24', lineHeight: 1 }}>NT$380</span>
          <span style={{
            background: 'rgba(239,68,68,0.2)', border: '1px solid rgba(239,68,68,0.3)',
            color: '#f87171', fontSize: '11px', fontWeight: 700,
            padding: '3px 10px', borderRadius: '100px',
          }}>🔥 限時特惠</span>
        </div>

        {/* 購買按鈕 */}
        <a
          href="https://still-time-corner.vercel.app/digital"
          style={{
            display: 'inline-flex', flexDirection: 'column' as const, alignItems: 'center', gap: '4px',
            background: 'linear-gradient(135deg, #fbbf24, #f59e0b, #d97706)',
            color: '#1c1917', fontWeight: 900, fontSize: '16px',
            padding: '16px 40px', borderRadius: '100px', textDecoration: 'none',
            boxShadow: '0 8px 32px rgba(251,191,36,0.45)',
            transition: 'all 0.3s',
          }}
          onMouseEnter={e => {
            const el = e.currentTarget as HTMLAnchorElement;
            el.style.transform = 'translateY(-3px)';
            el.style.boxShadow = '0 12px 40px rgba(251,191,36,0.65)';
          }}
          onMouseLeave={e => {
            const el = e.currentTarget as HTMLAnchorElement;
            el.style.transform = 'translateY(0)';
            el.style.boxShadow = '0 8px 32px rgba(251,191,36,0.45)';
          }}
        >
          🔓 立即購買完整版
          <small style={{ fontSize: '12px', fontWeight: 400, opacity: 0.8 }}>
            PDF + EPUB · 永久使用 · PayPal / 銀行轉帳
          </small>
        </a>

        {/* 包含內容列 */}
        <div style={{
          display: 'flex', flexWrap: 'wrap' as const, justifyContent: 'center',
          gap: '10px', marginTop: '18px',
        }}>
          {[
            '完整8章 15,000字',
            'PDF 精美排版版',
            'EPUB 電子閱讀器版',
            '50+ Prompt範例',
            '下載後永久使用',
          ].map(item => (
            <span key={item} style={{
              display: 'flex', alignItems: 'center', gap: '5px',
              fontSize: '12px', color: '#9ca3b0',
            }}>
              <span style={{ color: '#86efac', fontWeight: 900 }}>✓</span>
              {item}
            </span>
          ))}
        </div>

        {/* 安全說明 */}
        <p style={{ marginTop: '14px', fontSize: '12px', color: '#6b7280' }}>
          🛡️ 數位商品付款後立即提供下載連結
        </p>

        {/* 免費預覽連結 */}
        <div style={{
          marginTop: '16px', padding: '12px 16px',
          background: 'rgba(255,255,255,0.04)', borderRadius: '12px',
          border: '1px solid rgba(255,255,255,0.08)',
        }}>
          <span style={{ color: '#9ca3b0', fontSize: '13px' }}>還不確定適不適合你？ </span>
          <a href="/ebook/ai-ebook-free.html" target="_blank" rel="noopener noreferrer" style={{ color: '#a855f7', fontSize: '13px', textDecoration: 'underline' }}>
            先讀免費預覽（第一章完整）→
          </a>
        </div>
      </div>
    </section>
  );
}

/*
  使用方式：
  ─────────────────────────────────────────────
  import AIBookPromo from '@/components/AIBookPromo';

  // 在頁面中直接嵌入：
  <AIBookPromo />

  // 或放在 AI快訊 區塊中：
  <section>
    <h2>AI 快訊</h2>
    <AIBookPromo />
  </section>
  ─────────────────────────────────────────────

  如果網站有 Google Fonts，請確認已載入：
  'Noto Sans TC' (weights: 400, 700, 900)

  href="https://still-time-corner.vercel.app/digital" 指向數位商品購買頁面，
  如果網址不同請修改。
*/
