'use client';
// 📄 路徑：src/app/games/page.tsx

import Link from 'next/link';
import { useState } from 'react';

const BASE_URL = 'https://surprise-corner.vercel.app';

const GAMES = [
  {
    href: '/games/lulu-run',
    icon: '🐱',
    title: '魯魯跑酷',
    desc: '幫魯魯躲開掃地機器人和水盆，跑越遠越好！',
    color: '#f59e0b',
    glow: 'rgba(245,158,11,0.3)',
    tag: '動作',
  },
  {
    href: '/games/lulu-fish',
    icon: '🐟',
    title: '魯魯抓魚',
    desc: '30 秒限時！點擊飄過的魚，大魚 3 分、中魚 2 分、小魚 1 分。',
    color: '#0ea5e9',
    glow: 'rgba(14,165,233,0.3)',
    tag: '反應',
  },
  {
    href: '/tarot',
    icon: '🔮',
    title: '塔羅占卜',
    desc: '單張、三張、五張牌陣，讓牌陣為你指引方向。',
    color: '#9333ea',
    glow: 'rgba(147,51,234,0.3)',
    tag: '占卜',
  },
  {
    href: '/horoscope',
    icon: '⭐',
    title: '每日星座運勢',
    desc: '12星座今日運勢，愛情、事業、財運、健康一次看。',
    color: '#f59e0b',
    glow: 'rgba(245,158,11,0.3)',
    tag: '星座',
  },
  {
    href: '/bazi',
    icon: '🧧',
    title: '八字命盤',
    desc: '輸入生日算出四柱天干地支，解析你的五行命格與個性特質。',
    color: '#dc2626',
    glow: 'rgba(220,38,38,0.3)',
    tag: '命理',
  },
  {
    href: '/moon-sign',
    icon: '🌙',
    title: '月亮星座',
    desc: '輸入生日算太陽座＋月亮座＋上升座，解析你的內外在宇宙。',
    color: '#06b6d4',
    glow: 'rgba(6,182,212,0.3)',
    tag: '星座',
  },
  {
    href: '/tarot-year',
    icon: '🎴',
    title: '流年塔羅',
    desc: '生命靈數對應大阿爾克那，看見今年的主題牌與關鍵字。',
    color: '#9333ea',
    glow: 'rgba(147,51,234,0.3)',
    tag: '命理',
  },
  {
    href: '/name-numerology',
    icon: '📝',
    title: '姓名學',
    desc: '三才五格筆劃姓名學，輸入筆劃數算出五格吉凶與命格分析。',
    color: '#ec4899',
    glow: 'rgba(236,72,153,0.3)',
    tag: '命理',
  },
  {
    href: '/games/sudoku',
    icon: '🔢',
    title: '數獨',
    desc: '填滿每行、每列、每個 3×3 宮格，數字 1–9 各一次。三種難度，手機鍵盤支援。',
    color: '#06b6d4',
    glow: 'rgba(6,182,212,0.3)',
    tag: '益智',
  },
  {
    href: '/quiz',
    icon: '🧠',
    title: '心理測驗',
    desc: '多種心理測驗，了解自己的個性、情緒與思維模式。',
    color: '#8b5cf6',
    glow: 'rgba(139,92,246,0.3)',
    tag: '測驗',
  },
];

const TOOLS = [
  {
    href: '/tools/watermark',
    icon: '🖼️',
    title: '圖片浮水印',
    desc: '幫照片加上文字浮水印，保護你的作品版權。',
    color: '#10b981',
    glow: 'rgba(16,185,129,0.3)',
    tag: '圖片',
  },
  {
    href: '/tools/id-photo',
    icon: '📷',
    title: '證件照製作',
    desc: '上傳照片，一鍵製作各尺寸證件照，免費下載。',
    color: '#3b82f6',
    glow: 'rgba(59,130,246,0.3)',
    tag: '生活',
  },
  {
    href: '/tools/audio-to-text',
    icon: '🎙️',
    title: '語音轉文字',
    desc: '上傳音檔，AI 幫你轉成文字，支援多種語言。',
    color: '#f59e0b',
    glow: 'rgba(245,158,11,0.3)',
    tag: 'AI',
  },
  {
    href: '/tools/reminder',
    icon: '⏰',
    title: '提醒小工具',
    desc: '設定倒數提醒，時間到會發出通知。',
    color: '#ec4899',
    glow: 'rgba(236,72,153,0.3)',
    tag: '生活',
  },
  {
    href: '/tools',
    icon: '✨',
    title: 'AI 生活工具箱',
    desc: '情書、生日祝福、每日鼓勵、命名靈感…各種 AI 小工具一次搞定。',
    color: '#a78bfa',
    glow: 'rgba(167,139,250,0.3)',
    tag: 'AI',
  },
];

const COMING_SOON = [
  { icon: '🃏', title: '魯魯記憶配對', desc: '翻牌配對魯魯的照片，考驗你的記憶力。' },
  { icon: '🎯', title: '幸運轉盤', desc: '轉出今日關鍵字，帶著它去過一天。' },
];

function ShareButton({ href, title }: { href: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const url = BASE_URL + href;

  async function handleShare(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (navigator.share) {
      try {
        await navigator.share({ title, text: `來玩「${title}」！`, url });
      } catch { /* 取消分享不處理 */ }
    } else {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <button
      onClick={handleShare}
      title="分享這個"
      style={{
        position: 'absolute', top: '0.8rem', left: '0.8rem',
        background: 'rgba(0,0,0,0.35)', border: '1px solid rgba(255,255,255,0.15)',
        borderRadius: '50%', width: '2rem', height: '2rem',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', fontSize: '0.85rem', color: '#d1d5db',
        transition: 'all 0.2s', zIndex: 2,
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.background = 'rgba(124,58,237,0.5)';
        (e.currentTarget as HTMLElement).style.color = '#fff';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.background = 'rgba(0,0,0,0.35)';
        (e.currentTarget as HTMLElement).style.color = '#d1d5db';
      }}
    >
      {copied ? '✓' : '🔗'}
    </button>
  );
}

interface Item {
  href: string;
  icon: string;
  title: string;
  desc: string;
  color: string;
  glow: string;
  tag: string;
}

function ItemCard({ item, actionLabel }: { item: Item; actionLabel: string }) {
  return (
    <Link key={item.href} href={item.href} style={{ textDecoration: 'none' }}>
      <div style={{
        background: 'rgba(255,255,255,0.07)',
        border: `1px solid ${item.color}44`,
        borderRadius: '20px',
        padding: '1.8rem 1.5rem',
        cursor: 'pointer',
        transition: 'all 0.2s',
        boxShadow: `0 0 20px ${item.glow}`,
        position: 'relative',
        overflow: 'hidden',
      }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
          (e.currentTarget as HTMLElement).style.borderColor = `${item.color}99`;
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLElement).style.transform = 'none';
          (e.currentTarget as HTMLElement).style.borderColor = `${item.color}44`;
        }}
      >
        <ShareButton href={item.href} title={item.title} />
        <span style={{
          position: 'absolute', top: '1rem', right: '1rem',
          background: `${item.color}33`, color: item.color,
          fontSize: '0.7rem', fontWeight: 700, padding: '0.2rem 0.6rem',
          borderRadius: '20px', border: `1px solid ${item.color}44`,
        }}>{item.tag}</span>
        <div style={{ fontSize: '3rem', marginBottom: '0.8rem' }}>{item.icon}</div>
        <h2 style={{ color: '#f3f4f6', fontSize: '1.2rem', fontWeight: 800, margin: '0 0 0.5rem' }}>{item.title}</h2>
        <p style={{ color: '#9ca3af', fontSize: '0.85rem', lineHeight: 1.6, margin: '0 0 1.2rem' }}>{item.desc}</p>
        <span style={{
          display: 'inline-block',
          background: `linear-gradient(135deg, ${item.color}, ${item.color}cc)`,
          color: '#fff', fontSize: '0.85rem', fontWeight: 700,
          padding: '0.4rem 1.2rem', borderRadius: '30px',
        }}>{actionLabel}</span>
      </div>
    </Link>
  );
}

export default function GamesPage() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f0a1e 0%, #1a0533 50%, #0a1628 100%)',
      padding: '2rem 1rem 6rem',
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>

        {/* 標題 */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🎮</div>
          <h1 style={{ color: '#fff', fontSize: '2rem', fontWeight: 800, margin: '0 0 0.5rem' }}>遊戲 & 工具</h1>
          <p style={{ color: '#9ca3af', fontSize: '0.95rem', margin: 0 }}>放空、好玩、順便做點事</p>
        </div>

        {/* ── 小遊戲 & 占卜 ── */}
        <p style={{ color: '#6b7280', fontSize: '0.75rem', letterSpacing: '0.1em', margin: '0 0 1rem 0.2rem' }}>🎮 小遊戲 & 占卜</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.2rem', marginBottom: '3rem' }}>
          {GAMES.map(g => <ItemCard key={g.href} item={g} actionLabel="▶ 開始" />)}
        </div>

        {/* ── 小工具 ── */}
        <p style={{ color: '#6b7280', fontSize: '0.75rem', letterSpacing: '0.1em', margin: '0 0 1rem 0.2rem' }}>🛠️ 小工具</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.2rem', marginBottom: '3rem' }}>
          {TOOLS.map(t => <ItemCard key={t.href} item={t} actionLabel="→ 使用" />)}
        </div>

        {/* 即將推出 */}
        <div style={{ marginBottom: '2rem' }}>
          <p style={{ color: '#6b7280', fontSize: '0.75rem', letterSpacing: '0.05em', margin: '0 0 1rem 0.2rem' }}>即將推出</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.8rem' }}>
            {COMING_SOON.map(g => (
              <div key={g.title} style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px dashed rgba(255,255,255,0.1)',
                borderRadius: '14px', padding: '1.2rem 1rem',
                opacity: 0.6,
              }}>
                <div style={{ fontSize: '1.8rem', marginBottom: '0.4rem' }}>{g.icon}</div>
                <div style={{ color: '#6b7280', fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.2rem' }}>{g.title}</div>
                <div style={{ color: '#4b5563', fontSize: '0.78rem', lineHeight: 1.5 }}>{g.desc}</div>
                <div style={{ marginTop: '0.6rem', color: '#4b5563', fontSize: '0.75rem' }}>🔨 製作中...</div>
              </div>
            ))}
          </div>
        </div>

        {/* 回首頁 */}
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <Link href="/" style={{
            color: '#7c3aed', fontSize: '0.9rem', textDecoration: 'none', fontWeight: 600,
          }}>← 回首頁</Link>
        </div>

      </div>
    </div>
  );
}
