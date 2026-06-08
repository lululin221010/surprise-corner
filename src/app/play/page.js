// src/app/play/page.js — 玩一玩入口頁
import Link from 'next/link';

export const metadata = {
  title: '玩一玩 | Surprise Corner',
  description: '小遊戲、小工具、測驗，隨便玩玩。',
};

const CARDS = [
  {
    icon: '🎮',
    label: '小遊戲',
    desc: '文字冒險、猜謎、互動故事，玩完再走',
    href: '/games',
    color: '#7c3aed',
    border: 'rgba(124,58,237,0.4)',
    glow: 'rgba(124,58,237,0.25)',
  },
  {
    icon: '🛠️',
    label: '小工具',
    desc: '塔羅、運勢、生活小幫手，隨取隨用',
    href: '/tools',
    color: '#0891b2',
    border: 'rgba(8,145,178,0.4)',
    glow: 'rgba(8,145,178,0.2)',
  },
  {
    icon: '🧠',
    label: '測驗',
    desc: '心理測驗、性格分析，看看你是哪種人',
    href: '/quiz',
    color: '#059669',
    border: 'rgba(5,150,105,0.4)',
    glow: 'rgba(5,150,105,0.2)',
  },
];

export default function PlayPage() {
  return (
    <main style={{
      minHeight: '100vh',
      background: '#0d0820',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '48px 20px 80px',
      fontFamily: 'sans-serif',
    }}>
      <p style={{ margin: '0 0 10px', fontSize: '0.7rem', letterSpacing: '0.38em', color: '#6b4fa0', textTransform: 'uppercase' }}>
        Surprise Corner
      </p>
      <h1 style={{ margin: '0 0 10px', fontSize: 'clamp(1.8rem,5vw,2.8rem)', fontWeight: 700, color: '#e9d5ff', textAlign: 'center' }}>
        玩一玩
      </h1>
      <p style={{ margin: '0 0 52px', fontSize: '0.92rem', color: '#9ca3af', textAlign: 'center' }}>
        選一個，隨便玩玩
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '20px',
        width: '100%',
        maxWidth: '720px',
      }}>
        {CARDS.map(card => (
          <Link key={card.href} href={card.href} style={{ textDecoration: 'none' }}>
            <div style={{
              background: 'rgba(255,255,255,0.04)',
              border: `1.5px solid ${card.border}`,
              borderRadius: '20px',
              padding: '36px 28px',
              textAlign: 'center',
              transition: 'transform 0.18s ease, box-shadow 0.18s ease',
              cursor: 'pointer',
              boxShadow: `0 0 0 0 ${card.glow}`,
            }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = `0 8px 32px ${card.glow}`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = '';
                e.currentTarget.style.boxShadow = `0 0 0 0 ${card.glow}`;
              }}
            >
              <div style={{ fontSize: '2.8rem', marginBottom: '14px' }}>{card.icon}</div>
              <h2 style={{ margin: '0 0 10px', fontSize: '1.2rem', fontWeight: 700, color: '#e9d5ff' }}>
                {card.label}
              </h2>
              <p style={{ margin: 0, fontSize: '0.84rem', color: '#9ca3af', lineHeight: 1.6 }}>
                {card.desc}
              </p>
            </div>
          </Link>
        ))}
      </div>

      <Link href="/" style={{ marginTop: 52, color: '#6b4fa0', fontSize: '0.82rem', textDecoration: 'none' }}>
        ← 回首頁
      </Link>
    </main>
  );
}
