'use client';
// 📄 路徑：src/app/baseball/page.tsx

import { useEffect, useState } from 'react';

interface NewsItem {
  title: string;
  link: string;
  pubDate: string;
  source: string;
  description: string;
  image?: string;
}

const SOURCE_COLORS: Record<string, string> = {
  'TSNA':     '#003580',
  'Yahoo MLB':'#6001d2',
  'MLB官網':  '#002d72',
  'BBC Sport':'#bb1919',
  '聯合新聞網':'#c0392b',
  '科技新報': '#e65c00',
};

const KEYWORD_THEMES: { keywords: string[]; icon: string; gradient: string }[] = [
  { keywords: ['WBC', '世界棒球', '經典賽', '台灣隊', '中華隊'],
    icon: '🏆', gradient: 'linear-gradient(135deg, #b45309, #78350f)' },
  { keywords: ['MLB', '大聯盟', 'World Series', '季後賽'],
    icon: '⚾', gradient: 'linear-gradient(135deg, #1e40af, #1e3a8a)' },
  { keywords: ['中職', '中華職棒', '兄弟', '統一', '富邦', '樂天', '味全'],
    icon: '🦁', gradient: 'linear-gradient(135deg, #065f46, #064e3b)' },
  { keywords: ['投手', '先發', '中繼', '終結者', '三振', '完投'],
    icon: '🤾', gradient: 'linear-gradient(135deg, #7c3aed, #4c1d95)' },
  { keywords: ['全壘打', '安打', '打點', '打擊', '盜壘'],
    icon: '💥', gradient: 'linear-gradient(135deg, #dc2626, #7f1d1d)' },
  { keywords: ['轉隊', '交易', '自由球員', 'FA', '簽約'],
    icon: '📋', gradient: 'linear-gradient(135deg, #0369a1, #0c4a6e)' },
  { keywords: ['受傷', '傷勢', 'DL', '傷兵'],
    icon: '🩹', gradient: 'linear-gradient(135deg, #475569, #1e293b)' },
  { keywords: ['陳偉殷', '林子偉', '王建民', '郭泓志', '曹錦輝', '張育成', '吳念庭'],
    icon: '🇹🇼', gradient: 'linear-gradient(135deg, #0369a1, #7e22ce)' },
  { keywords: ['大谷', 'Ohtani', 'Judge', 'Trout', 'Shohei'],
    icon: '⭐', gradient: 'linear-gradient(135deg, #d97706, #92400e)' },
];

function getTheme(title: string) {
  const lower = title.toLowerCase();
  for (const t of KEYWORD_THEMES) {
    if (t.keywords.some(k => lower.includes(k.toLowerCase()))) return t;
  }
  return { icon: '⚾', gradient: 'linear-gradient(135deg, #1e3a8a, #0f172a)' };
}

function timeAgo(dateStr: string) {
  if (!dateStr) return '';
  const diff = Date.now() - new Date(dateStr).getTime();
  const hours = Math.floor(diff / 3600000);
  if (hours < 1) return '剛剛';
  if (hours < 24) return `${hours} 小時前`;
  return `${Math.floor(hours / 24)} 天前`;
}

function NewsImage({ item, height = 180 }: { item: NewsItem; height?: number }) {
  const [err, setErr] = useState(false);
  const { icon, gradient } = getTheme(item.title);
  if (item.image && !err) {
    return (
      <img src={item.image} alt={item.title} onError={() => setErr(true)}
        style={{ width: '100%', height, objectFit: 'cover', borderRadius: '10px 10px 0 0', display: 'block' }} />
    );
  }
  return (
    <div style={{
      width: '100%', height, background: gradient,
      borderRadius: '10px 10px 0 0',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: height > 150 ? '3.5rem' : '2.2rem',
    }}>
      {icon}
    </div>
  );
}

export default function BaseballNewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'wbc' | 'mlb' | 'cpbl'>('all');

  useEffect(() => {
    fetch('/api/baseball-news')
      .then(r => r.json())
      .then(data => { setNews(data.news || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const filtered = news.filter(item => {
    if (filter === 'all') return true;
    const t = item.title.toLowerCase();
    if (filter === 'wbc') return ['wbc', '世界棒球', '經典賽', '台灣隊', '中華隊'].some(k => t.includes(k));
    if (filter === 'mlb') return ['mlb', '大聯盟', 'world series'].some(k => t.includes(k));
    if (filter === 'cpbl') return ['中職', '中華職棒', '兄弟', '統一', '富邦', '樂天', '味全'].some(k => t.includes(k));
    return true;
  });

  const featured = filtered[0];
  const rest = filtered.slice(1);

  const filterBtns = [
    { key: 'all', label: '⚾ 全部' },
    { key: 'wbc', label: '🏆 WBC' },
    { key: 'mlb', label: '🇺🇸 MLB' },
    { key: 'cpbl', label: '🦁 中職' },
  ] as const;

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0a0a1a, #0f1a3a, #0a1628)', padding: '2rem 1rem' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3.5rem', marginBottom: '0.5rem' }}>⚾</div>
          <h1 style={{ color: '#fff', fontSize: '2.2rem', fontWeight: 800, margin: 0 }}>棒球快訊</h1>
          <p style={{ color: '#93c5fd', marginTop: '0.5rem' }}>WBC・MLB・中職，最新棒球動態即時追蹤</p>
        </div>

        {/* 分類篩選 */}
        <div style={{ display: 'flex', gap: '0.6rem', justifyContent: 'center', marginBottom: '2rem', flexWrap: 'wrap' }}>
          {filterBtns.map(btn => (
            <button key={btn.key} onClick={() => setFilter(btn.key)} style={{
              padding: '0.45rem 1.2rem', borderRadius: '20px', cursor: 'pointer',
              fontWeight: 600, fontSize: '0.85rem', transition: 'all 0.2s',
              background: filter === btn.key ? 'linear-gradient(135deg, #1d4ed8, #1e40af)' : 'rgba(255,255,255,0.07)',
              border: `1px solid ${filter === btn.key ? '#3b82f6' : 'rgba(147,197,253,0.2)'}`,
              color: filter === btn.key ? '#fff' : '#93c5fd',
              boxShadow: filter === btn.key ? '0 0 12px rgba(59,130,246,0.4)' : 'none',
            }}>
              {btn.label}
            </button>
          ))}
        </div>

        {/* Loading */}
        {loading && (
          <div style={{ textAlign: 'center', color: '#93c5fd', padding: '3rem' }}>
            <div style={{ fontSize: '2rem' }}>⚾</div>
            <p>載入棒球新聞中...</p>
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <div style={{ textAlign: 'center', color: '#93c5fd', padding: '3rem' }}>
            <p>目前沒有相關新聞，請稍後再試</p>
          </div>
        )}

        {/* 精選新聞（第一則大圖） */}
        {!loading && featured && (
          <a href={featured.link} target="_blank" rel="noopener noreferrer"
            style={{
              display: 'block', textDecoration: 'none', marginBottom: '1.5rem',
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(147,197,253,0.25)',
              borderRadius: '14px', overflow: 'hidden', transition: 'all 0.25s',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(59,130,246,0.6)';
              (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(147,197,253,0.25)';
              (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
            }}
          >
            <NewsImage item={featured} height={300} />
            <div style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.7rem' }}>
                <span style={{
                  background: SOURCE_COLORS[featured.source] || '#1d4ed8',
                  color: '#fff', fontSize: '0.75rem', padding: '3px 10px', borderRadius: '20px', fontWeight: 700,
                }}>{featured.source}</span>
                <span style={{ color: '#fbbf24', fontSize: '0.75rem', fontWeight: 600 }}>🔥 精選</span>
                <span style={{ color: '#6b7280', fontSize: '0.75rem' }}>{timeAgo(featured.pubDate)}</span>
              </div>
              <h2 style={{ color: '#f9fafb', fontSize: '1.4rem', fontWeight: 800, margin: '0 0 0.6rem', lineHeight: 1.4 }}>
                {featured.title}
              </h2>
              <p style={{ color: '#d1d5db', fontSize: '0.9rem', margin: 0, lineHeight: 1.6 }}>
                {featured.description}
              </p>
            </div>
          </a>
        )}

        {/* 其餘新聞網格 */}
        {!loading && rest.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))', gap: '1.2rem' }}>
            {rest.map((item, i) => (
              <a key={i} href={item.link} target="_blank" rel="noopener noreferrer"
                style={{
                  display: 'flex', flexDirection: 'column', textDecoration: 'none',
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(147,197,253,0.15)',
                  borderRadius: '12px', overflow: 'hidden', transition: 'all 0.25s',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(59,130,246,0.5)';
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 24px rgba(29,78,216,0.2)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(147,197,253,0.15)';
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                  (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                }}
              >
                <NewsImage item={item} height={160} />
                <div style={{ padding: '1rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <span style={{
                      background: SOURCE_COLORS[item.source] || '#1d4ed8',
                      color: '#fff', fontSize: '0.68rem', padding: '2px 8px', borderRadius: '20px', fontWeight: 700,
                    }}>{item.source}</span>
                    <span style={{ color: '#6b7280', fontSize: '0.72rem' }}>{timeAgo(item.pubDate)}</span>
                  </div>
                  <h2 style={{ color: '#f3f4f6', fontSize: '0.95rem', fontWeight: 700, margin: '0 0 0.4rem', lineHeight: 1.5, flex: 1 }}>
                    {item.title}
                  </h2>
                  <p style={{
                    color: '#9ca3af', fontSize: '0.82rem', margin: 0, lineHeight: 1.5,
                    display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
                  }}>
                    {item.description}
                  </p>
                </div>
              </a>
            ))}
          </div>
        )}

        {/* 底部 */}
        <div style={{
          marginTop: '3rem', textAlign: 'center',
          color: '#374151', fontSize: '0.8rem',
        }}>
          ⚾ 資料來源：TSNA、Yahoo MLB、MLB官網、聯合新聞網 · 每 30 分鐘自動更新
        </div>
      </div>
    </div>
  );
}