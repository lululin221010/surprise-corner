// 📄 檔案路徑：src/app/novels/[novelId]/page.tsx

import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import novelsData from '@/data/novels.json'
import chaptersData from '@/data/chapters.json'

const FREE_CHAPTERS = 10

function isPublishedByDate(publishedAt: string): boolean {
  const now = new Date()
  const taiwanToday = new Date(now.getTime() + 8 * 60 * 60 * 1000)
    .toISOString()
    .slice(0, 10)
  return publishedAt <= taiwanToday
}

// 每本小說對應的角色聊天頁面
const NOVEL_CHAT: Record<string, { path: string; label: string; color: string; border: string; textColor: string }> = {
  'lulu-diary': {
    path: '/chat/lulu',
    label: '🐱 找 Lulu 聊聊',
    color: 'linear-gradient(135deg, rgba(124,58,237,0.2), rgba(168,85,247,0.15))',
    border: 'rgba(167,139,250,0.35)',
    textColor: '#c4b5fd',
  },
  'the-last-signal': {
    path: '/chat/signal',
    label: '📡 跟 林悅 說說話',
    color: 'linear-gradient(135deg, rgba(14,165,233,0.2), rgba(2,132,199,0.15))',
    border: 'rgba(125,211,252,0.35)',
    textColor: '#7dd3fc',
  },
}

interface Props { params: Promise<{ novelId: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { novelId } = await params
  const novel = novelsData.find(n => n.id === novelId)
  if (!novel) return { title: '找不到小說' }
  return {
    title: `${novel.title} | 連載小說`,
    description: novel.description,
  }
}

export default async function NovelPage({ params }: Props) {
  const { novelId } = await params
  const novel = novelsData.find(n => n.id === novelId)
  if (!novel) notFound()

  const chapters = (chaptersData as any[])
    .filter(c => c.novelId === novelId && c.isPublished)
    .sort((a, b) => a.chapterNumber - b.chapterNumber)

  const freeChapters = chapters.filter(
    c => c.isFree === true && isPublishedByDate(c.publishedAt)
  )

  const lockedChapters = chapters.filter(
    c => c.isFree !== true || !isPublishedByDate(c.publishedAt)
  )

  const ebookAvailable = freeChapters.length > 0
  const chatInfo = NOVEL_CHAT[novelId]

  return (
    <>
      <style>{`
        .novel-page { min-height: 100vh; background: #0c0b08; color: #d8ccb8; font-family: Georgia, serif; padding-bottom: 80px; }
        .novel-hero { max-width: 760px; margin: 0 auto; padding: 60px 32px 48px; display: flex; gap: 40px; border-bottom: 1px solid rgba(255,255,255,0.05); }
        .novel-cover-box { flex-shrink: 0; width: 120px; height: 168px; background: linear-gradient(135deg,#1a1a2e,#16213e,#0f3460); border: 1px solid rgba(180,144,80,0.3); display: flex; align-items: center; justify-content: center; font-size: 3rem; color: rgba(180,144,80,0.6); overflow: hidden; border-radius: 4px; }
        .novel-cover-img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .novel-hero-info { flex: 1; display: flex; flex-direction: column; gap: 10px; padding-top: 4px; }
        .novel-hero-genre { font-size: 0.75rem; letter-spacing: 0.25em; color: #b49050; }
        .novel-hero-title { font-size: 2.2rem; font-weight: 400; color: #e8dcc8; margin: 0; line-height: 1.3; }
        .novel-hero-author { font-size: 0.85rem; color: #6a5a4a; }
        .novel-hero-desc { font-size: 0.95rem; color: #8a7a6a; line-height: 1.8; margin: 4px 0; }
        .novel-hero-meta { display: flex; gap: 12px; align-items: center; flex-wrap: wrap; }
        .novel-status-badge { padding: 3px 12px; border-radius: 20px; font-size: 0.75rem; background: rgba(80,180,120,0.12); color: #50b478; border: 1px solid rgba(80,180,120,0.2); }
        .novel-hero-tags { display: flex; gap: 8px; }
        .novel-tag { font-size: 0.75rem; color: #5a4a3a; }

        .ebook-btn-row { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 4px; align-items: center; }
        .ebook-btn {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 7px 18px;
          background: linear-gradient(135deg, rgba(180,144,80,0.2), rgba(160,80,100,0.18));
          border: 1px solid rgba(180,144,80,0.3);
          color: #c4a060; text-decoration: none;
          font-family: Georgia, serif; font-size: 0.8rem; letter-spacing: 0.06em;
          transition: all 0.2s;
        }
        .ebook-btn:hover { background: linear-gradient(135deg, rgba(180,144,80,0.35), rgba(160,80,100,0.3)); border-color: rgba(180,144,80,0.5); color: #d4b070; }
        .ebook-btn-hint { font-size: 0.72rem; color: #4a3a2a; line-height: 1.6; padding-top: 2px; }

        .chapters-section { max-width: 760px; margin: 0 auto; padding: 40px 32px 0; }
        .chapters-label { font-size: 0.75rem; letter-spacing: 0.25em; color: #7a6050; margin: 0 0 20px; }
        .chapter-row { display: flex; align-items: center; gap: 16px; padding: 14px 0; border-bottom: 1px solid rgba(255,255,255,0.04); text-decoration: none; color: inherit; transition: all 0.2s; }
        .chapter-row:hover { padding-left: 8px; background: rgba(180,144,80,0.05); border-radius: 6px; }
        .chapter-row:hover .chapter-title { color: #e8c880; }
        .chapter-row:hover .chapter-arrow { opacity: 1; }
        .chapter-row.locked { opacity: 0.55; cursor: default; pointer-events: none; }
        .chapter-num { font-size: 0.75rem; color: #7a6a58; width: 28px; flex-shrink: 0; text-align: right; }
        .chapter-title { flex: 1; font-size: 0.95rem; color: #c8b8a8; transition: color 0.2s; }
        .chapter-arrow { font-size: 0.8rem; color: #b49050; opacity: 0; transition: opacity 0.2s; }
        .chapter-date { font-size: 0.75rem; color: #9a8878; }
        .chapter-lock { font-size: 0.85rem; }
        .lock-notice { margin: 28px 0 0; padding: 20px; border: 1px solid rgba(180,144,80,0.15); text-align: center; }
        .lock-notice p { color: #6a5a4a; font-size: 0.85rem; margin: 0 0 12px; line-height: 1.8; }
        .shop-btn { display: inline-block; padding: 0.6rem 1.8rem; background: linear-gradient(135deg, rgba(180,144,80,0.25), rgba(180,80,120,0.25)); border: 1px solid rgba(180,144,80,0.3); color: #c4a060; text-decoration: none; font-size: 0.85rem; letter-spacing: 0.05em; font-family: Georgia, serif; }
        @media (max-width: 600px) {
          .novel-hero { flex-direction: column; gap: 20px; padding: 40px 20px 32px; }
          .chapters-section { padding: 32px 20px 0; }
        }
      `}</style>

      <main className="novel-page">

        {/* 小說 Hero */}
        <div className="novel-hero">
          <div className="novel-cover-box">
            {(novel as any).cover ? (
              <img src={(novel as any).cover} alt={novel.title} className="novel-cover-img" />
            ) : (
              <span>{novel.title[0]}</span>
            )}
          </div>
          <div className="novel-hero-info">
            <span className="novel-hero-genre">{novel.genre}</span>
            <h1 className="novel-hero-title">{novel.title}</h1>
            <p className="novel-hero-author">作者：{novel.author}</p>
            <p className="novel-hero-desc">{novel.description}</p>
            <div className="novel-hero-meta">
              <span className="novel-status-badge">{novel.status}</span>
              <span style={{ fontSize: '0.78rem', color: '#4a3a2a' }}>共 {chapters.length} 章</span>
            </div>
            <div className="novel-hero-tags">
              {novel.tags.map(tag => (
                <span key={tag} className="novel-tag">#{tag}</span>
              ))}
            </div>

            {/* 電子書按鈕 */}
            {ebookAvailable && (
              <div className="ebook-btn-row">
                <Link href={`/novels/${novelId}/ebook`} className="ebook-btn">
                  📖 免費試讀電子書
                </Link>
                <span className="ebook-btn-hint">
                  前 {freeChapters.length} 章免費，可匯出 PDF
                </span>
              </div>
            )}

            {/* 角色聊天按鈕 */}
            {chatInfo && (
              <div style={{ marginTop: '4px' }}>
                <Link
                  href={chatInfo.path}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '6px',
                    padding: '7px 18px',
                    background: chatInfo.color,
                    border: `1px solid ${chatInfo.border}`,
                    color: chatInfo.textColor,
                    textDecoration: 'none',
                    fontFamily: 'Georgia, serif',
                    fontSize: '0.8rem',
                    letterSpacing: '0.06em',
                    borderRadius: '4px',
                    transition: 'all 0.2s',
                  }}
                >
                  {chatInfo.label}
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* 章節列表 */}
        <div className="chapters-section">
          <p className="chapters-label">章節目錄</p>

          {freeChapters.map(chapter => (
            <Link
              key={chapter.id}
              href={`/novels/${novelId}/${chapter.id}`}
              className="chapter-row"
            >
              <span className="chapter-num">{chapter.chapterNumber}</span>
              <span className="chapter-title">{chapter.title}</span>
              <span className="chapter-date">{chapter.publishedAt}</span>
              <span className="chapter-arrow">→</span>
            </Link>
          ))}

          {lockedChapters.map(chapter => (
            <div key={chapter.id} className="chapter-row locked">
              <span className="chapter-num">{chapter.chapterNumber}</span>
              <span className="chapter-title">{chapter.title}</span>
              <span className="chapter-date">{chapter.publishedAt}</span>
              <span className="chapter-lock">🔒</span>
            </div>
          ))}

          {lockedChapters.length > 0 && (
            <div className="lock-notice">
              <p>
                後續章節為付費內容，前往小舖解鎖完整故事。<br />
                一次購買，永久閱讀。
              </p>
              <a
                href={novel.shopUrl || "https://still-time-corner.vercel.app/digital"}
                target="_blank"
                rel="noopener noreferrer"
                className="shop-btn"
              >
                🛒 前往小舖購買完整版
              </a>
            </div>
          )}

          <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
            <Link href="/novels" style={{ fontSize: '0.82rem', color: '#5a4a3a', textDecoration: 'none', letterSpacing: '0.05em' }}>
              ← 返回小說列表
            </Link>
          </div>
        </div>

      </main>
    </>
  )
}