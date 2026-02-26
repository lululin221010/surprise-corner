// 📄 路徑：src/app/novels/[novelId]/page.tsx

import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import novelsData from '@/data/novels.json'
import chaptersData from '@/data/chapters.json'

const FREE_CHAPTERS = 10

// ✅ 判斷章節是否已到發布日（台灣時區 UTC+8）
function isPublishedByDate(publishedAt: string): boolean {
  const now = new Date()
  // 取得台灣今天日期字串 YYYY-MM-DD
  const taiwanToday = new Date(now.getTime() + 8 * 60 * 60 * 1000)
    .toISOString()
    .slice(0, 10)
  return publishedAt <= taiwanToday
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

  // ✅ 同時判斷：章節數 <= FREE_CHAPTERS 且 發布日期已到
  const freeChapters = chapters.filter(
    c => c.chapterNumber <= FREE_CHAPTERS && isPublishedByDate(c.publishedAt)
  )
  const lockedChapters = chapters.filter(
    c => c.chapterNumber > FREE_CHAPTERS || !isPublishedByDate(c.publishedAt)
  )

  return (
    <>
      <style>{`
        .novel-page { min-height: 100vh; background: #0c0b08; color: #d8ccb8; font-family: Georgia, serif; padding-bottom: 80px; }
        .novel-hero { max-width: 760px; margin: 0 auto; padding: 60px 32px 48px; display: flex; gap: 40px; border-bottom: 1px solid rgba(255,255,255,0.05); }
        .novel-cover-box { flex-shrink: 0; width: 120px; height: 168px; background: linear-gradient(135deg,#1a1a2e,#16213e,#0f3460); border: 1px solid rgba(180,144,80,0.3); display: flex; align-items: center; justify-content: center; font-size: 3rem; color: rgba(180,144,80,0.6); }
        .novel-hero-info { flex: 1; display: flex; flex-direction: column; gap: 10px; padding-top: 4px; }
        .novel-hero-genre { font-size: 0.75rem; letter-spacing: 0.25em; color: #b49050; }
        .novel-hero-title { font-size: 2.2rem; font-weight: 400; color: #e8dcc8; margin: 0; line-height: 1.3; }
        .novel-hero-author { font-size: 0.85rem; color: #6a5a4a; }
        .novel-hero-desc { font-size: 0.95rem; color: #8a7a6a; line-height: 1.8; margin: 4px 0; }
        .novel-hero-meta { display: flex; gap: 12px; align-items: center; flex-wrap: wrap; }
        .novel-status-badge { padding: 3px 12px; border-radius: 20px; font-size: 0.75rem; background: rgba(80,180,120,0.12); color: #50b478; border: 1px solid rgba(80,180,120,0.2); }
        .novel-hero-tags { display: flex; gap: 8px; }
        .novel-tag { font-size: 0.75rem; color: #5a4a3a; }
        .chapters-section { max-width: 760px; margin: 0 auto; padding: 40px 32px 0; }
        .chapters-label { font-size: 0.75rem; letter-spacing: 0.25em; color: #7a6050; margin: 0 0 20px; }
        .chapter-row { display: flex; align-items: center; gap: 16px; padding: 14px 0; border-bottom: 1px solid rgba(255,255,255,0.04); text-decoration: none; color: inherit; transition: padding-left 0.2s; }
        .chapter-row:hover { padding-left: 8px; }
        .chapter-row.locked { opacity: 0.45; cursor: default; pointer-events: none; }
        .chapter-num { font-size: 0.75rem; color: #4a3a2a; width: 28px; flex-shrink: 0; text-align: right; }
        .chapter-title { flex: 1; font-size: 0.95rem; color: #b8a898; }
        .chapter-date { font-size: 0.75rem; color: #4a3a2a; }
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

        {/* 小說資訊 Hero */}
        <div className="novel-hero">
          <div className="novel-cover-box">
            <span>{novel.title[0]}</span>
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
          </div>
        </div>

        {/* 章節列表 */}
        <div className="chapters-section">
          <p className="chapters-label">章節目錄</p>

          {/* 免費且已發布章節 */}
          {freeChapters.map(chapter => (
            <Link
              key={chapter.id}
              href={`/novels/${novelId}/${chapter.id}`}
              className="chapter-row"
            >
              <span className="chapter-num">{chapter.chapterNumber}</span>
              <span className="chapter-title">{chapter.title}</span>
              <span className="chapter-date">{chapter.publishedAt}</span>
            </Link>
          ))}

          {/* 鎖定章節（未到日期 or 超過免費章節數） */}
          {lockedChapters.map(chapter => (
            <div key={chapter.id} className="chapter-row locked">
              <span className="chapter-num">{chapter.chapterNumber}</span>
              <span className="chapter-title">{chapter.title}</span>
              <span className="chapter-date">{chapter.publishedAt}</span>
              <span className="chapter-lock">🔒</span>
            </div>
          ))}

          {/* 鎖章說明 */}
          {lockedChapters.length > 0 && (
            <div className="lock-notice">
              <p>
                每週一・三・五更新一章，記得常回來 💜<br />
                等待期間，去小舖找找驚喜？
              </p>
              <a
                href="https://still-time-corner.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="shop-btn"
              >
                ✨ Still Time Corner →
              </a>
            </div>
          )}

          {/* 回上層 */}
          <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
            <Link href="/novels" style={{ fontSize: '0.82rem', color: '#5a4a3a', textDecoration: 'none', letterSpacing: '0.05em' }}>
              ← 所有小說
            </Link>
          </div>
        </div>

      </main>
    </>
  )
}