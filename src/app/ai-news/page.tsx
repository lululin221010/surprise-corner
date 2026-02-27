'use client';
// 📄 檔案路徑：src/app/ai-news/page.tsx

import { useEffect, useState } from 'react';

interface NewsItem {
  title: string;
  link: string;
  pubDate: string;
  source: string;
  description: string;
  image?: string;
  category?: string;
}

const SOURCE_COLORS: Record<string, string> = {
  'TechCrunch': '#0a8a4c',
  'The Verge': '#ff3b30',
  'BBC Tech': '#bb1919',
  'BBC Sport': '#bb1919',
  'iThome': '#0066cc',
  '科技新報': '#e65c00',
  '鉅亨網': '#c0392b',
  'MoneyDJ': '#27ae60',
  'TSNA': '#1a6f38',
  'Yahoo MLB': '#6001d2',
  'MLB官網': '#002d72',
  '聯合新聞網': '#c8102e',
  'ETtoday 美食': '#e67e22',
  'ETtoday 旅遊': '#2980b9',
  '上下游': '#27ae60',
  'TTNews 旅報': '#16a085',
};

const KEYWORD_THEMES: { keywords: string[]; icon: string; gradient: string }[] = [
  { keywords: ['AI', '人工智慧', 'ChatGPT', 'GPT', 'Gemini', 'Claude', 'LLM', 'OpenAI', 'Anthropic'],
    icon: '🤖', gradient: 'linear-gradient(135deg, #6d28d9, #4c1d95)' },
  { keywords: ['robot', 'robotics', '機器人'],
    icon: '🦾', gradient: 'linear-gradient(135deg, #0f766e, #134e4a)' },
  { keywords: ['chip', 'semiconductor', '晶片', '半導體', 'NVIDIA', 'Intel', 'AMD', 'TSMC', '台積電'],
    icon: '🔬', gradient: 'linear-gradient(135deg, #1d4ed8, #1e3a8a)' },
  { keywords: ['iPhone', 'Apple', 'Mac', 'iPad'],
    icon: '🍎', gradient: 'linear-gradient(135deg, #374151, #111827)' },
  { keywords: ['stock', '股票', '投資', '漲', '跌', '大盤', 'ETF', '台股'],
    icon: '📈', gradient: 'linear-gradient(135deg, #15803d, #14532d)' },
  { keywords: ['crypto', 'bitcoin', 'BTC', '加密', '幣'],
    icon: '₿', gradient: 'linear-gradient(135deg, #d97706, #92400e)' },
  { keywords: ['棒球', 'WBC', 'MLB', '中職', '台灣隊', 'baseball'],
    icon: '⚾', gradient: 'linear-gradient(135deg, #1a4731, #0d2b1d)' },
  { keywords: ['餐廳', '美食', '料理', '小吃', '食物', '飲食', '吃', '食尚'],
    icon: '🍜', gradient: 'linear-gradient(135deg, #c2410c, #7c2d12)' },
  { keywords: ['旅遊', '旅行', '景點', '飯店', '訂房', '出遊', '旅報'],
    icon: '✈️', gradient: 'linear-gradient(135deg, #0369a1, #0c4a6e)' },
  { keywords: ['security', 'hack', '資安', '駭客'],
    icon: '🔐', gradient: 'linear-gradient(135deg, #7c3aed, #4c1d95)' },
  { keywords: ['game', 'gaming', 'Xbox', 'PlayStation', 'PS5', 'Nintendo', '遊戲'],
    icon: '🎮', gradient: 'linear-gradient(135deg, #7c3aed, #be185d)' },
];

function getThemeForTitle(title: string): { icon: string; gradient: string } {
  const lower = title.toLowerCase();
  for (const theme of KEYWORD_THEMES) {
    if (theme.keywords.some(k => lower.includes(k.toLowerCase()))) {
      return { icon: theme.icon, gradient: theme.gradient };
    }
  }
  return { icon: '📰', gradient: 'linear-gradient(135deg, #6d28d9, #4c1d95)' };
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
  const [imgError, setImgError] = useState(false);
  const { icon, gradient: bg } = getThemeForTitle(item.title);
  if (item.image && !imgError) {
    return <img src={item.image} alt={item.title} onError={() => setImgError(true)}
      style={{ width: '100%', height, objectFit: 'cover', borderRadius: '10px 10px 0 0', display: 'block' }} />;
  }
  return (
    <div style={{ width: '100%', height, background: bg, borderRadius: '10px 10px 0 0',
      display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: height > 150 ? '3.5rem' : '2rem' }}>
      {icon}
    </div>
  );
}

const TABS = [
  { key: 'all',  label: '全部',    icon: '📡' },
  { key: 'AI',   label: 'AI 科技', icon: '🤖' },
  { key: '股市', label: '股市',    icon: '📈' },
  { key: '棒球', label: '棒球',    icon: '⚾' },
 
];

const CATEGORY_BADGE: Record<string, { bg: string; color: string; label: string }> = {
  '棒球': { bg: '#1a4731', color: '#6ee7b7', label: '⚾ 棒球' },
  '股市': { bg: '#14532d', color: '#86efac', label: '📈 股市' },
  
};

export default function NewsPage() {
  const [allNews, setAllNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    Promise.allSettled([
      fetch('/api/ai-news').then(r => r.json()),
      fetch('/api/baseball-news').then(r => r.json()),
    ]).then(results => {
      const aiNews: NewsItem[] = (results[0].status === 'fulfilled' ? results[0].value.news : []) || [];
      const baseballRaw: NewsItem[] = (results[1].status === 'fulfilled' ? results[1].value.news : []) || [];
      const baseballNews = baseballRaw.map(item => ({ ...item, category: '棒球' }));
      const merged = [...aiNews, ...baseballNews].sort(
        (a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
      );
      setAllNews(merged);
      setLoading(false);
    });
  }, []);

  const filtered = activeTab === 'all' ? allNews : allNews.filter(i => i.category === activeTab);
  const featured = filtered[0];
  const rest = filtered.slice(1);
  const countFor = (key: string) => key === 'all' ? allNews.length : allNews.filter(i => i.category === key).length;

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)', padding: '2rem 1rem' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>📡</div>
          <h1 style={{ color: '#fff', fontSize: '2rem', fontWeight: 800, margin: 0 }}>最新快訊</h1>
          <p style={{ color: '#a78bfa', marginTop: '0.5rem' }}>AI 科技・股市・棒球・美食・旅遊，每小時自動更新</p>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginBottom: '2rem', flexWrap: 'wrap' }}>
          {TABS.map(tab => {
            const isActive = activeTab === tab.key;
            const count = countFor(tab.key);
            return (
              <button key={tab.key} onClick={() => setActiveTab(tab.key)} style={{
                display: 'flex', alignItems: 'center', gap: '0.4rem',
                padding: '0.5rem 1.2rem', borderRadius: '30px',
                border: isActive ? '2px solid #a78bfa' : '2px solid rgba(167,139,250,0.3)',
                background: isActive ? 'rgba(167,139,250,0.2)' : 'rgba(255,255,255,0.05)',
                color: isActive ? '#e9d5ff' : '#9ca3af',
                fontWeight: isActive ? 700 : 500, fontSize: '0.9rem', cursor: 'pointer', transition: 'all 0.2s',
              }}>
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
                {count > 0 && (
                  <span style={{ background: isActive ? '#7c3aed' : 'rgba(124,58,237,0.4)', color: '#fff',
                    fontSize: '0.7rem', fontWeight: 700, padding: '1px 7px', borderRadius: '20px', minWidth: '20px', textAlign: 'center' }}>
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {loading && (
          <div style={{ textAlign: 'center', color: '#a78bfa', padding: '3rem' }}>
            <div style={{ fontSize: '2rem' }}>⚡</div><p>載入最新消息中...</p>
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <div style={{ textAlign: 'center', color: '#a78bfa', padding: '3rem' }}>
            <p>目前無法取得新聞，請稍後再試</p>
          </div>
        )}

        {!loading && featured && (
          <a href={featured.link} target="_blank" rel="noopener noreferrer" style={{
            display: 'block', background: 'rgba(255,255,255,0.07)',
            border: '1px solid rgba(167,139,250,0.25)', borderRadius: '12px',
            overflow: 'hidden', textDecoration: 'none', marginBottom: '1.5rem', transition: 'all 0.25s',
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(167,139,250,0.6)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(167,139,250,0.25)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
          >
            <NewsImage item={featured} height={280} />
            <div style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.7rem', flexWrap: 'wrap' }}>
                <span style={{ background: SOURCE_COLORS[featured.source] || '#6d28d9', color: '#fff', fontSize: '0.75rem', padding: '3px 10px', borderRadius: '20px', fontWeight: 700 }}>
                  {featured.source}
                </span>
                {featured.category && CATEGORY_BADGE[featured.category] && (
                  <span style={{ background: CATEGORY_BADGE[featured.category].bg, color: CATEGORY_BADGE[featured.category].color, fontSize: '0.72rem', padding: '2px 8px', borderRadius: '20px', fontWeight: 700 }}>
                    {CATEGORY_BADGE[featured.category].label}
                  </span>
                )}
                <span style={{ color: '#a78bfa', fontSize: '0.75rem', fontWeight: 600 }}>🔥 精選</span>
                <span style={{ color: '#9ca3af', fontSize: '0.75rem' }}>{timeAgo(featured.pubDate)}</span>
              </div>
              <h2 style={{ color: '#f9fafb', fontSize: '1.3rem', fontWeight: 800, margin: '0 0 0.6rem', lineHeight: 1.4 }}>{featured.title}</h2>
              <p style={{ color: '#d1d5db', fontSize: '0.9rem', margin: 0, lineHeight: 1.6 }}>{featured.description}</p>
            </div>
          </a>
        )}

        {!loading && rest.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.2rem' }}>
            {rest.map((item, i) => (
              <a key={i} href={item.link} target="_blank" rel="noopener noreferrer" style={{
                display: 'flex', flexDirection: 'column', background: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(167,139,250,0.2)', borderRadius: '12px',
                overflow: 'hidden', textDecoration: 'none', transition: 'all 0.25s',
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(167,139,250,0.55)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 24px rgba(124,58,237,0.2)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(167,139,250,0.2)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
              >
                <NewsImage item={item} height={160} />
                <div style={{ padding: '1rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                    <span style={{ background: SOURCE_COLORS[item.source] || '#6d28d9', color: '#fff', fontSize: '0.68rem', padding: '2px 8px', borderRadius: '20px', fontWeight: 700 }}>
                      {item.source}
                    </span>
                    {item.category && CATEGORY_BADGE[item.category] && (
                      <span style={{ background: CATEGORY_BADGE[item.category].bg, color: CATEGORY_BADGE[item.category].color, fontSize: '0.65rem', padding: '2px 6px', borderRadius: '20px', fontWeight: 700 }}>
                        {CATEGORY_BADGE[item.category].label}
                      </span>
                    )}
                    <span style={{ color: '#9ca3af', fontSize: '0.72rem' }}>{timeAgo(item.pubDate)}</span>
                  </div>
                  <h2 style={{ color: '#f3f4f6', fontSize: '0.95rem', fontWeight: 700, margin: '0 0 0.4rem', lineHeight: 1.5, flex: 1 }}>{item.title}</h2>
                  <p style={{ color: '#9ca3af', fontSize: '0.82rem', margin: 0, lineHeight: 1.5,
                    display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {item.description}
                  </p>
                </div>
              </a>
            ))}
          </div>
        )}

        <div style={{ marginTop: '3rem', background: 'linear-gradient(135deg, #f59e0b22, #ec489922)',
          border: '1px solid rgba(245,158,11,0.3)', borderRadius: '16px', padding: '1.5rem', textAlign: 'center' }}>
          <p style={{ color: '#fcd34d', fontWeight: 700, fontSize: '1rem', margin: '0 0 0.5rem' }}>✨ 看完新聞，去找點靈感？</p>
          <p style={{ color: '#d1d5db', fontSize: '0.9rem', margin: '0 0 1rem' }}>Still Time Corner — 每天一個小驚喜等著你</p>
          <a href="https://still-time-corner.vercel.app/" target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-block', background: 'linear-gradient(135deg, #f59e0b, #ec4899)', color: '#fff',
              padding: '0.6rem 1.5rem', borderRadius: '30px', textDecoration: 'none', fontWeight: 700, fontSize: '0.9rem' }}>
            前往小舖 →
          </a>
        </div>

      </div>
    </div>
  );
}