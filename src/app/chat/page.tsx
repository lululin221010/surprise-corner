'use client';

import Link from 'next/link';

const CHARACTERS = [
  {
    id: 'lulu',
    name: 'Lulu',
    title: '來自《Lulu 的日記》',
    desc: '溫柔的 AI 貓咪，記得你說過的每一句話。\n今天過得怎麼樣？什麼都可以說。',
    emoji: '🐱',
    color: '#a855f7',
    border: 'rgba(168,85,247,0.4)',
    bg: 'rgba(168,85,247,0.08)',
    href: '/chat/lulu',
    novelHref: '/novels/lulu-diary/ebook',
  },
  {
    id: 'signal',
    name: '林悅',
    title: '來自《最後的信號》',
    desc: '廢土紀元的信號監聽員，收到了來自九萬公里外的訊號。\n你有話想對她說嗎？',
    emoji: '📡',
    color: '#0ea5e9',
    border: 'rgba(14,165,233,0.4)',
    bg: 'rgba(14,165,233,0.08)',
    href: '/chat/signal',
    novelHref: '/novels/the-last-signal/ebook',
  },
];

export default function ChatIndexPage() {
  return (
    <main style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #1a1040 100%)',
      color: '#fff',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem 1rem',
    }}>
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <div style={{ fontSize: '2.5rem', marginBottom: '0.8rem' }}>💬</div>
        <h1 style={{
          fontSize: 'clamp(1.8rem, 5vw, 2.8rem)',
          fontWeight: 900,
          background: 'linear-gradient(135deg, #fff 0%, #c4b5fd 50%, #f0abfc 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '0.6rem',
        }}>
          角色聊天室
        </h1>
        <p style={{ color: '#9ca3af', fontSize: '1rem' }}>
          選一個角色，說說今天的心情 ✨
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1.5rem',
        maxWidth: '700px',
        width: '100%',
      }}>
        {CHARACTERS.map(c => (
          <div key={c.id} style={{
            background: c.bg,
            border: `1px solid ${c.border}`,
            borderRadius: '24px',
            padding: '2rem 1.8rem',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}>
            <div style={{ fontSize: '3rem' }}>{c.emoji}</div>
            <div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#f3f4f6', margin: '0 0 0.2rem' }}>
                {c.name}
              </h2>
              <p style={{ fontSize: '0.78rem', color: c.color, fontWeight: 700, margin: '0 0 0.8rem', letterSpacing: '0.05em' }}>
                {c.title}
              </p>
              <p style={{ fontSize: '0.88rem', color: '#9ca3af', lineHeight: 1.7, margin: 0, whiteSpace: 'pre-line' }}>
                {c.desc}
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginTop: 'auto' }}>
              <Link href={c.href} style={{
                display: 'block', textAlign: 'center',
                background: `linear-gradient(135deg, ${c.color}, ${c.color}cc)`,
                color: '#fff', borderRadius: '12px',
                padding: '0.75rem 1.5rem',
                fontWeight: 800, fontSize: '0.95rem',
                textDecoration: 'none',
                transition: 'opacity 0.2s',
              }}>
                和 {c.name} 聊聊 →
              </Link>
              <Link href={c.novelHref} style={{
                display: 'block', textAlign: 'center',
                color: c.color, fontSize: '0.8rem', fontWeight: 600,
                textDecoration: 'none', opacity: 0.7,
              }}>
                📖 先去看她的故事
              </Link>
            </div>
          </div>
        ))}
      </div>

      <Link href="/" style={{
        marginTop: '2.5rem', color: '#6b7280', fontSize: '0.85rem',
        textDecoration: 'none',
      }}>
        ← 回首頁
      </Link>
    </main>
  );
}
