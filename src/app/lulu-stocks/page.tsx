// 📄 路徑：src/app/lulu-stocks/page.tsx
import Link from 'next/link'
import { Metadata } from 'next'
import articlesData from '@/data/lulu-stocks.json'

export const metadata: Metadata = {
  title: '魯魯說股票 | Surprise Corner',
  description: '由魯魯為你精選解析，台股趨勢、個股分析、投資觀點。看完文章別忘了到收租AI看今日訊號！',
}

const articles = (articlesData as Array<{
  slug: string
  title: string
  date: string
  published: boolean
  excerpt: string
  image: string | null
  content: string
}>).filter(a => a.published)

export default function LuluStocksPage() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f0c29, #1a1a2e, #16213e)',
      color: '#e5e7eb',
      padding: '2rem 1rem',
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{ fontSize: '3.5rem', marginBottom: '0.5rem' }}>🐱📈</div>
          <h1 style={{ color: '#fff', fontSize: '2rem', fontWeight: 800, margin: '0 0 0.5rem' }}>
            魯魯說股票
          </h1>
          <p style={{ color: '#a78bfa', margin: '0 0 1rem' }}>
            每週精選・個股觀點・趨勢解析
          </p>
          <a
            href="https://stock-dashboard-ochre-sigma.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              background: 'linear-gradient(135deg, #059669, #047857)',
              color: '#fff', fontWeight: 700, fontSize: '0.85rem',
              padding: '0.5rem 1.4rem', borderRadius: '30px',
              textDecoration: 'none',
            }}
          >
            📊 看今日 AI 選股訊號 →
          </a>
        </div>

        {/* Article list */}
        {articles.length === 0 ? (
          <div style={{
            textAlign: 'center', padding: '4rem 2rem',
            background: 'rgba(255,255,255,0.04)',
            border: '1px dashed rgba(167,139,250,0.3)',
            borderRadius: '16px',
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✍️</div>
            <p style={{ color: '#a78bfa', fontWeight: 700, fontSize: '1.1rem', margin: '0 0 0.5rem' }}>
              敬請期待
            </p>
            <p style={{ color: '#6b7280', fontSize: '0.9rem', margin: 0 }}>
              魯魯正在趕稿中，首篇文章即將上線！
            </p>
            <div style={{ marginTop: '1.5rem' }}>
              <a
                href="https://stock-dashboard-ochre-sigma.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: '#34d399', fontSize: '0.9rem', textDecoration: 'underline',
                }}
              >
                讀好書、收好租，一起來小舖
              </a>
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {articles.map(article => (
              <Link
                key={article.slug}
                href={`/lulu-stocks/${article.slug}`}
                style={{
                  display: 'block',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(167,139,250,0.2)',
                  borderRadius: '14px',
                  padding: '1.5rem',
                  textDecoration: 'none',
                  transition: 'all 0.2s',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.6rem' }}>
                  <span style={{
                    background: 'rgba(52,211,153,0.15)',
                    color: '#34d399',
                    fontSize: '0.72rem', fontWeight: 700,
                    padding: '2px 8px', borderRadius: '20px',
                    border: '1px solid rgba(52,211,153,0.3)',
                  }}>魯魯說股票</span>
                  <span style={{ color: '#6b7280', fontSize: '0.78rem' }}>{article.date}</span>
                </div>
                {article.image && (
                  <img
                    src={article.image}
                    alt={article.title}
                    style={{ width: '100%', borderRadius: '10px', marginBottom: '1rem', maxHeight: '200px', objectFit: 'cover' }}
                  />
                )}
                <h2 style={{ color: '#f3f4f6', fontSize: '1.15rem', fontWeight: 800, margin: '0 0 0.5rem', lineHeight: 1.4 }}>
                  {article.title}
                </h2>
                <p style={{ color: '#9ca3af', fontSize: '0.88rem', margin: 0, lineHeight: 1.6 }}>
                  {article.excerpt}
                </p>
                <div style={{ color: '#a78bfa', fontSize: '0.82rem', marginTop: '0.8rem', fontWeight: 600 }}>
                  繼續閱讀 →
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Footer CTA */}
        <div style={{
          marginTop: '3rem', padding: '1.5rem',
          background: 'rgba(52,211,153,0.08)',
          border: '1px solid rgba(52,211,153,0.25)',
          borderRadius: '14px', textAlign: 'center',
        }}>
          <p style={{ color: '#34d399', fontWeight: 700, margin: '0 0 0.4rem' }}>
            📊 想看 K 線圖＋完整 AI 分析？
          </p>
          <p style={{ color: '#6b7280', fontSize: '0.82rem', margin: '0 0 0.8rem' }}>
            免費體驗・每週精選 1 支完整版・不需信用卡
          </p>
          <a
            href="https://stock-dashboard-ochre-sigma.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              background: '#059669', color: '#fff',
              fontWeight: 700, padding: '0.6rem 1.5rem',
              borderRadius: '30px', textDecoration: 'none', fontSize: '0.9rem',
            }}
          >
            🚀 免費體驗收租AI →
          </a>
        </div>

      </div>
    </div>
  )
}
