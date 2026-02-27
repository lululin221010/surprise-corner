'use client';
// 📄 檔案路徑：src/app/ai-news/page.tsx

import { useEffect, useState } from 'react';

interface NewsItem {
  title: string;
  link: string;
  pubDate: string;
  source: string;
  description: string;
  image?: string; // ✅ 新增：若 API 有提供圖片網址
}

const SOURCE_COLORS: Record<string, string> = {
  'TechCrunch': '#0a8a4c',
  'The Verge': '#ff3b30',
  'BBC Tech': '#bb1919',
  'iThome': '#0066cc',
  '科技新報': '#e65c00',
  '鉅亨網': '#c0392b',
  'MoneyDJ': '#27ae60',
};

// ✅ 各來源沒有圖片時，用漸層色區塊代替
const SOURCE_GRADIENTS: Record<string, string> = {
  'TechCrunch':  'linear-gradient(135deg, #0a8a4c, #0d6e3e)',
  'The Verge':   'linear-gradient(135deg, #ff3b30, #c0392b)',
  'BBC Tech':    'linear-gradient(135deg, #bb1919, #8b0000)',
  'iThome':      'linear-gradient(135deg, #0066cc, #004499)',
  '科技新報':    'linear-gradient(135deg, #e65c00, #b84700)',
  '鉅亨網':      'linear-gradient(135deg, #c0392b, #922b21)',
  'MoneyDJ':     'linear-gradient(135deg, #27ae60, #1e8449)',
};

// ✅ 各來源的 Emoji icon（沒圖時顯示在色塊上）
const SOURCE_ICONS: Record<string, string> = {
  'TechCrunch': '🚀',
  'The Verge':  '⚡',
  'BBC Tech':   '📡',
  'iThome':     '💻',
  '科技新報':   '🤖',
  '鉅亨網':     '📈',
  'MoneyDJ':    '💹',
};

function timeAgo(dateStr: string) {
  if (!dateStr) return '';
  const diff = Date.now() - new Date(dateStr).getTime();
  const hours = Math.floor(diff / 3600000);
  if (hours < 1) return '剛剛';
  if (hours < 24) return `${hours} 小時前`;
  return `${Math.floor(hours / 24)} 天前`;
}

// ✅ 圖片區塊元件（有圖用圖，沒圖用漸層色塊）
function NewsImage({ item, height = 180 }: { item: NewsItem; height?: number }) {
  const [imgError, setImgError] = useState(false);
  const bg = SOURCE_GRADIENTS[item.source] || 'linear-gradient(135deg, #6d28d9, #4c1d95)';
  const icon = SOURCE_ICONS[item.source] || '📰';

  if (item.image && !imgError) {
    return (
      <img
        src={item.image}
        alt={item.title}
        onError={() => setImgError(true)}
        style={{
          width: '100%', height, objectFit: 'cover',
          borderRadius: '10px 10px 0 0', display: 'block',
        }}
      />
    );
  }
  return (
    <div style={{
      width: '100%', height,
      background: bg,
      borderRadius: '10px 10px 0 0',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: height > 150 ? '3.5rem' : '2rem',
    }}>
      {icon}
    </div>
  );
}

export default function AINewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/ai-news')
      .then(r => r.json())
      .then(data => { setNews(data.news || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const featured = news[0];       // 第一則：大圖置頂
  const rest = news.slice(1);     // 其餘：2欄網格

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)', padding: '2rem 1rem' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* ── Header ── */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🤖</div>
          <h1 style={{ color: '#fff', fontSize: '2rem', fontWeight: 800, margin: 0 }}>AI 科技快訊</h1>
          <p style={{ color: '#a78bfa', marginTop: '0.5rem' }}>最新人工智慧與科技動態，每小時自動更新</p>
        </div>

        {/* ── Loading ── */}
        {loading && (
          <div style={{ textAlign: 'center', color: '#a78bfa', padding: '3rem' }}>
            <div style={{ fontSize: '2rem' }}>⚡</div>
            <p>載入最新消息中...</p>
          </div>
        )}

        {/* ── 無資料 ── */}
        {!loading && news.length === 0 && (
          <div style={{ textAlign: 'center', color: '#a78bfa', padding: '3rem' }}>
            <p>目前無法取得新聞，請稍後再試</p>
          </div>
        )}

        {/* ── ✅ 置頂精選新聞（第一則，大圖） ── */}
        {!loading && featured && (
          <a
            href={featured.link}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'block',
              background: 'rgba(255,255,255,0.07)',
              border: '1px solid rgba(167,139,250,0.25)',
              borderRadius: '12px',
              overflow: 'hidden',
              textDecoration: 'none',
              marginBottom: '1.5rem',
              transition: 'all 0.25s',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(167,139,250,0.6)';
              (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(167,139,250,0.25)';
              (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
            }}
          >
            <NewsImage item={featured} height={280} />
            <div style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.7rem' }}>
                <span style={{
                  background: SOURCE_COLORS[featured.source] || '#6d28d9',
                  color: '#fff', fontSize: '0.75rem',
                  padding: '3px 10px', borderRadius: '20px', fontWeight: 700,
                }}>
                  {featured.source}
                </span>
                <span style={{ color: '#a78bfa', fontSize: '0.75rem', fontWeight: 600 }}>🔥 精選</span>
                <span style={{ color: '#9ca3af', fontSize: '0.75rem' }}>{timeAgo(featured.pubDate)}</span>
              </div>
              <h2 style={{ color: '#f9fafb', fontSize: '1.3rem', fontWeight: 800, margin: '0 0 0.6rem', lineHeight: 1.4 }}>
                {featured.title}
              </h2>
              <p style={{ color: '#d1d5db', fontSize: '0.9rem', margin: 0, lineHeight: 1.6 }}>
                {featured.description}
              </p>
            </div>
          </a>
        )}

        {/* ── ✅ 其餘新聞：2 欄卡片網格 ── */}
        {!loading && rest.length > 0 && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '1.2rem',
          }}>
            {rest.map((item, i) => (
              <a
                key={i}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  background: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(167,139,250,0.2)',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  textDecoration: 'none',
                  transition: 'all 0.25s',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(167,139,250,0.55)';
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 24px rgba(124,58,237,0.2)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(167,139,250,0.2)';
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                  (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                }}
              >
                <NewsImage item={item} height={160} />
                <div style={{ padding: '1rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <span style={{
                      background: SOURCE_COLORS[item.source] || '#6d28d9',
                      color: '#fff', fontSize: '0.68rem',
                      padding: '2px 8px', borderRadius: '20px', fontWeight: 700,
                    }}>
                      {item.source}
                    </span>
                    <span style={{ color: '#9ca3af', fontSize: '0.72rem' }}>{timeAgo(item.pubDate)}</span>
                  </div>
                  <h2 style={{ color: '#f3f4f6', fontSize: '0.95rem', fontWeight: 700, margin: '0 0 0.4rem', lineHeight: 1.5, flex: 1 }}>
                    {item.title}
                  </h2>
                  <p style={{ color: '#9ca3af', fontSize: '0.82rem', margin: 0, lineHeight: 1.5,
                    display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
                  }}>
                    {item.description}
                  </p>
                </div>
              </a>
            ))}
          </div>
        )}

        {/* ── 導流 Still Time Corner ── */}
        <div style={{
          marginTop: '3rem',
          background: 'linear-gradient(135deg, #f59e0b22, #ec489922)',
          border: '1px solid rgba(245,158,11,0.3)',
          borderRadius: '16px', padding: '1.5rem', textAlign: 'center',
        }}>
          <p style={{ color: '#fcd34d', fontWeight: 700, fontSize: '1rem', margin: '0 0 0.5rem' }}>✨ 看完新聞，去找點靈感？</p>
          <p style={{ color: '#d1d5db', fontSize: '0.9rem', margin: '0 0 1rem' }}>Still Time Corner — 每天一個小驚喜等著你</p>
          <a
            href="https://still-time-corner.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              background: 'linear-gradient(135deg, #f59e0b, #ec4899)',
              color: '#fff', padding: '0.6rem 1.5rem',
              borderRadius: '30px', textDecoration: 'none',
              fontWeight: 700, fontSize: '0.9rem',
            }}
          >
            前往小舖 →
          </a>
        </div>

      </div>
    </div>
  );
}