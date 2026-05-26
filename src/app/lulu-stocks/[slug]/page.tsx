// 📄 路徑：src/app/lulu-stocks/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Metadata } from 'next'
import articlesData from '@/data/lulu-stocks.json'

type Article = {
  slug: string
  title: string
  date: string
  published: boolean
  excerpt: string
  image: string | null
  content: string
}

const allArticles = articlesData as Article[]

export async function generateStaticParams() {
  return allArticles
    .filter(a => a.published)
    .map(a => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const article = allArticles.find(a => a.slug === params.slug && a.published)
  if (!article) return { title: '找不到文章' }
  return {
    title: `${article.title} | 魯魯說股票`,
    description: article.excerpt,
  }
}

export default function LuluStockArticlePage({ params }: { params: { slug: string } }) {
  const article = allArticles.find(a => a.slug === params.slug && a.published)
  if (!article) notFound()

  const paragraphs = article.content.split(/\n\n+/).filter(Boolean)

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f0c29, #1a1a2e, #16213e)',
      color: '#e5e7eb',
      padding: '2rem 1rem',
    }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>

        {/* Back link */}
        <Link
          href="/lulu-stocks"
          style={{ color: '#a78bfa', textDecoration: 'none', fontSize: '0.85rem', display: 'inline-block', marginBottom: '1.5rem' }}
        >
          ← 回到魯魯說股票
        </Link>

        {/* Article header */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.8rem' }}>
            <span style={{
              background: 'rgba(52,211,153,0.15)',
              color: '#34d399', fontSize: '0.75rem', fontWeight: 700,
              padding: '3px 10px', borderRadius: '20px',
              border: '1px solid rgba(52,211,153,0.3)',
            }}>魯魯說股票</span>
            <span style={{ color: '#6b7280', fontSize: '0.82rem' }}>{article.date}</span>
          </div>
          <h1 style={{
            color: '#f9fafb', fontSize: '1.8rem', fontWeight: 900,
            lineHeight: 1.4, margin: '0 0 1rem',
          }}>
            {article.title}
          </h1>
        </div>

        {/* 魯魯插圖區 */}
        {article.image ? (
          <img
            src={article.image}
            alt={article.title}
            style={{ width: '100%', borderRadius: '14px', marginBottom: '2rem', maxHeight: '360px', objectFit: 'cover' }}
          />
        ) : (
          <div style={{
            width: '100%', borderRadius: '14px', marginBottom: '2rem',
            background: 'rgba(255,255,255,0.04)',
            border: '1px dashed rgba(167,139,250,0.3)',
            padding: '2rem', textAlign: 'center',
          }}>
            <div style={{ fontSize: '4rem' }}>🐱</div>
            <div style={{ color: '#6b7280', fontSize: '0.78rem', marginTop: '0.5rem' }}>魯魯插圖</div>
          </div>
        )}

        {/* Article content */}
        <article style={{ lineHeight: 1.9, fontSize: '1rem', color: '#d1d5db' }}>
          {paragraphs.map((para, i) => (
            <p key={i} style={{ margin: '0 0 1.4rem' }}>{para}</p>
          ))}
        </article>

        {/* ── 自動附加 CTA（所有「魯魯說股票」文章底部都有）── */}
        <div style={{
          marginTop: '2.5rem',
          background: 'linear-gradient(135deg, rgba(5,150,105,0.15), rgba(4,120,87,0.1))',
          border: '1px solid rgba(52,211,153,0.4)',
          borderRadius: '14px', padding: '1.5rem', textAlign: 'center',
        }}>
          <p style={{ color: '#34d399', fontWeight: 800, fontSize: '1.05rem', margin: '0 0 0.4rem' }}>
            📊 想看 K 線圖＋完整 AI 分析？
          </p>
          <p style={{ color: '#9ca3af', fontSize: '0.85rem', margin: '0 0 1rem' }}>
            免費體驗・每週精選 1 支完整版・不需信用卡
          </p>
          <a
            href="https://stock-dashboard-ochre-sigma.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              background: 'linear-gradient(135deg, #059669, #047857)',
              color: '#fff', fontWeight: 800,
              padding: '0.7rem 2rem', borderRadius: '30px',
              textDecoration: 'none', fontSize: '0.9rem',
            }}
          >
            🚀 免費體驗收租AI →
          </a>
          <p style={{ color: '#6b7280', fontSize: '0.75rem', margin: '0.8rem 0 0' }}>
            不用登入・免費使用・本站所有內容不構成投資建議
          </p>
        </div>

        {/* Navigation */}
        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <Link
            href="/lulu-stocks"
            style={{ color: '#a78bfa', textDecoration: 'none', fontSize: '0.85rem' }}
          >
            ← 回到所有文章
          </Link>
        </div>

      </div>
    </div>
  )
}
