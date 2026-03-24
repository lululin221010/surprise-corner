'use client';
// 📄 路徑：src/app/games/page.tsx

import Link from 'next/link';

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
];

const COMING_SOON = [
  { icon: '🎴', title: '流年塔羅', desc: '數字命理＋今年關鍵字，看看這一年的主題牌。' },
  { icon: '🃏', title: '魯魯記憶配對', desc: '翻牌配對魯魯的照片，考驗你的記憶力。' },
  { icon: '🎯', title: '幸運轉盤', desc: '轉出今日關鍵字，帶著它去過一天。' },
];

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
          <h1 style={{ color: '#fff', fontSize: '2rem', fontWeight: 800, margin: '0 0 0.5rem' }}>小遊戲</h1>
          <p style={{ color: '#9ca3af', fontSize: '0.95rem', margin: 0 }}>放空一下，玩幾分鐘再走</p>
        </div>

        {/* 遊戲卡片 */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.2rem', marginBottom: '3rem' }}>
          {GAMES.map(g => (
            <Link key={g.href} href={g.href} style={{ textDecoration: 'none' }}>
              <div style={{
                background: 'rgba(255,255,255,0.07)',
                border: `1px solid ${g.color}44`,
                borderRadius: '20px',
                padding: '1.8rem 1.5rem',
                cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: `0 0 20px ${g.glow}`,
                position: 'relative',
                overflow: 'hidden',
              }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
                  (e.currentTarget as HTMLElement).style.borderColor = `${g.color}99`;
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.transform = 'none';
                  (e.currentTarget as HTMLElement).style.borderColor = `${g.color}44`;
                }}
              >
                <span style={{
                  position: 'absolute', top: '1rem', right: '1rem',
                  background: `${g.color}33`, color: g.color,
                  fontSize: '0.7rem', fontWeight: 700, padding: '0.2rem 0.6rem',
                  borderRadius: '20px', border: `1px solid ${g.color}44`,
                }}>{g.tag}</span>
                <div style={{ fontSize: '3rem', marginBottom: '0.8rem' }}>{g.icon}</div>
                <h2 style={{ color: '#f3f4f6', fontSize: '1.2rem', fontWeight: 800, margin: '0 0 0.5rem' }}>{g.title}</h2>
                <p style={{ color: '#9ca3af', fontSize: '0.85rem', lineHeight: 1.6, margin: '0 0 1.2rem' }}>{g.desc}</p>
                <span style={{
                  display: 'inline-block',
                  background: `linear-gradient(135deg, ${g.color}, ${g.color}cc)`,
                  color: '#fff', fontSize: '0.85rem', fontWeight: 700,
                  padding: '0.4rem 1.2rem', borderRadius: '30px',
                }}>▶ 開始遊玩</span>
              </div>
            </Link>
          ))}
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
