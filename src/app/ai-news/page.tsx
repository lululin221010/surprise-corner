'use client';
// 📄 檔案路徑：src/app/ai-news/page.tsx

import { useEffect, useState } from 'react';

interface NewsItem {
  title: string;
  link: string;
  pubDate: string;
  source: string;
  description: string;
}

const SOURCE_COLORS: Record<string, string> = {
  'TechCrunch': '#0a8a4c',
  'The Verge': '#ff3b30',
  'BBC Tech': '#bb1919',
};

function timeAgo(dateStr: string) {
  if (!dateStr) return '';
  const diff = Date.now() - new Date(dateStr).getTime();
  const hours = Math.floor(diff / 3600000);
  if (hours < 1) return '剛剛';
  if (hours < 24) return `${hours} 小時前`;
  return `${Math.floor(hours / 24)} 天前`;
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

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)', padding: '2rem 1rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🤖</div>
          <h1 style={{ color: '#fff', fontSize: '2rem', fontWeight: 800, margin: 0 }}>AI 科技快訊</h1>
          <p style={{ color: '#a78bfa', marginTop: '0.5rem' }}>最新人工智慧與科技動態，每小時自動更新</p>
        </div>

        {/* News List */}
        {loading ? (
          <div style={{ textAlign: 'center', color: '#a78bfa', padding: '3rem' }}>
            <div style={{ fontSize: '2rem', animation: 'spin 1s linear infinite' }}>⚡</div>
            <p>載入最新消息中...</p>
          </div>
        ) : news.length === 0 ? (
          <div style={{ textAlign: 'center', color: '#a78bfa', padding: '3rem' }}>
            <p>目前無法取得新聞，請稍後再試</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {news.map((item, i) => (
              <a
                key={i}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'block',
                  background: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(167,139,250,0.2)',
                  borderRadius: '12px',
                  padding: '1.2rem 1.5rem',
                  textDecoration: 'none',
                  transition: 'all 0.2s',
                  backdropFilter: 'blur(10px)',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(167,139,250,0.15)';
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(167,139,250,0.5)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.07)';
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(167,139,250,0.2)';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <span style={{
                    background: SOURCE_COLORS[item.source] || '#6d28d9',
                    color: '#fff',
                    fontSize: '0.7rem',
                    padding: '2px 8px',
                    borderRadius: '20px',
                    fontWeight: 600,
                  }}>
                    {item.source}
                  </span>
                  <span style={{ color: '#9ca3af', fontSize: '0.75rem' }}>{timeAgo(item.pubDate)}</span>
                </div>
                <h2 style={{ color: '#f3f4f6', fontSize: '1rem', fontWeight: 700, margin: '0 0 0.4rem 0', lineHeight: 1.4 }}>
                  {item.title}
                </h2>
                <p style={{ color: '#9ca3af', fontSize: '0.85rem', margin: 0, lineHeight: 1.5 }}>
                  {item.description}
                </p>
              </a>
            ))}
          </div>
        )}

        {/* 導流到 Still Time Corner */}
        <div style={{
          marginTop: '2.5rem',
          background: 'linear-gradient(135deg, #f59e0b22, #ec489922)',
          border: '1px solid rgba(245,158,11,0.3)',
          borderRadius: '16px',
          padding: '1.5rem',
          textAlign: 'center',
        }}>
          <p style={{ color: '#fcd34d', fontWeight: 700, fontSize: '1rem', margin: '0 0 0.5rem 0' }}>✨ 看完新聞，去找點靈感？</p>
          <p style={{ color: '#d1d5db', fontSize: '0.9rem', margin: '0 0 1rem 0' }}>Still Time Corner — 每天一個小驚喜等著你</p>
          <a
            href="https://still-time-corner.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              background: 'linear-gradient(135deg, #f59e0b, #ec4899)',
              color: '#fff',
              padding: '0.6rem 1.5rem',
              borderRadius: '30px',
              textDecoration: 'none',
              fontWeight: 700,
              fontSize: '0.9rem',
            }}
          >
            前往小舖 →
          </a>
        </div>
      </div>
    </div>
  );
}