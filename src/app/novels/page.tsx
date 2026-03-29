import Link from 'next/link'
import Image from 'next/image'
import { Metadata } from 'next'
import novelsData from '@/data/novels.json'
import chaptersData from '@/data/chapters.json'

export const metadata: Metadata = {
  title: '連載小說・試看空間 | Surprise Corner',
  description: '免費連載小說與電子書試閱，睡前・等車・最好的陪伴',
}

// 封面元件：有圖用圖，沒圖用文字佔位
function NovélCover({ cover, title }: { cover: string; title: string }) {
  if (cover) {
    return (
      <div className="novel-cover">
        <img src={cover} alt={title} className="novel-cover-img" />
      </div>
    )
  }
  return (
    <div className="novel-cover">
      <div className="novel-cover-placeholder">
        <span>{title[0]}</span>
      </div>
    </div>
  )
}
function getLastPublishedDate(novelId: string): string {
  const chapters = (chaptersData as any[])
    .filter(c => {
  const today = new Date().toISOString().slice(0, 10)
  return c.novelId === novelId && c.isPublished === true && c.publishedAt <= today
})
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
  return chapters[0]?.publishedAt ?? ''
}
export default function NovelsPage() {
  const serials = novelsData.filter((n: any) => n.category === 'serial')
  const previews = novelsData.filter((n: any) => n.category === 'preview')
  const guides = novelsData.filter((n: any) => n.category === 'guide')

  return (
    <>
      <style>{`
        .novels-page { min-height: 100vh; background: #0a0a0f; color: #e8e0d0; font-family: Georgia, serif; padding: 0 0 80px; }

        /* 頁首 */
        .novels-header { text-align: center; padding: 80px 24px 60px; border-bottom: 1px solid rgba(255,255,255,0.06); background: linear-gradient(180deg,#0f0f1a 0%,#0a0a0f 100%); }
        .novels-title { font-size: 3.5rem; font-weight: 400; letter-spacing: 0.15em; color: #f0e8d8; margin: 0 0 12px; }
        .novels-subtitle { font-size: 0.95rem; color: #8a7a6a; letter-spacing: 0.3em; margin: 0; }

        /* 區塊標題 */
        .section-label { max-width: 900px; margin: 0 auto; padding: 56px 24px 0; }
        .section-label h2 { font-size: 0.8rem; letter-spacing: 0.35em; color: #b49050; font-weight: 400; font-family: sans-serif; margin: 0 0 4px; }
        .section-label p { font-size: 0.8rem; color: #5a4a3a; font-family: sans-serif; margin: 0; }

        /* 書卡列表 */
        .novels-grid { max-width: 900px; margin: 0 auto; padding: 16px 24px 0; display: flex; flex-direction: column; }
        .novel-card { display: flex; gap: 32px; padding: 36px 0; border-bottom: 1px solid rgba(255,255,255,0.05); text-decoration: none; color: inherit; transition: all 0.3s; position: relative; }
        .novel-card:hover { padding-left: 16px; }
        .novel-card::before { content: ''; position: absolute; left: 0; top: 50%; transform: translateY(-50%); width: 2px; height: 0; background: #b49050; transition: height 0.3s; }
        .novel-card:hover::before { height: 60%; }

        /* 封面 */
        .novel-cover { flex-shrink: 0; width: 100px; height: 140px; }
        .novel-cover-img { width: 100%; height: 100%; object-fit: cover; border-radius: 4px; border: 1px solid rgba(180,144,80,0.2); }
        .novel-cover-placeholder { width: 100%; height: 100%; background: linear-gradient(135deg,#1a1a2e,#16213e,#0f3460); border: 1px solid rgba(180,144,80,0.3); border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 2.5rem; color: rgba(180,144,80,0.6); }

        /* 書訊 */
        .novel-info { flex: 1; display: flex; flex-direction: column; gap: 8px; }
        .novel-genre { font-size: 0.75rem; letter-spacing: 0.2em; color: #b49050; }
        .novel-name { font-size: 1.9rem; font-weight: 400; margin: 0; color: #f0e8d8; }
        .novel-author { font-size: 0.85rem; color: #7a6a5a; margin: 0; }
        .novel-desc { font-size: 1rem; color: #a09080; line-height: 1.7; margin: 4px 0; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        .novel-meta { display: flex; align-items: center; gap: 16px; font-size: 0.8rem; color: #6a5a4a; flex-wrap: wrap; }
        .novel-status { padding: 2px 10px; border-radius: 20px; font-size: 0.75rem; }
        .novel-status-ongoing { background: rgba(80,180,120,0.15); color: #50b478; border: 1px solid rgba(80,180,120,0.2); }
        .novel-status-completed { background: rgba(100,100,180,0.15); color: #8080c0; border: 1px solid rgba(100,100,180,0.2); }
        .novel-tags { display: flex; gap: 8px; flex-wrap: wrap; }
        .novel-tag { font-size: 0.75rem; color: #6a5a4a; }
        .novel-footer { display: flex; align-items: center; justify-content: space-between; margin-top: 4px; flex-wrap: wrap; gap: 8px; }

        /* 按鈕 */
        .novel-read-btn { display: inline-flex; align-items: center; gap: 6px; padding: 7px 18px; border-radius: 20px; background: rgba(180,144,80,0.12); border: 1px solid rgba(180,144,80,0.35); color: #b49050; font-size: 0.82rem; letter-spacing: 0.08em; font-family: Georgia, serif; transition: all 0.25s; white-space: nowrap; }
        .novel-card:hover .novel-read-btn { background: rgba(180,144,80,0.22); border-color: rgba(180,144,80,0.6); color: #d4b070; }
        .novel-read-btn-arrow { font-size: 0.9rem; transition: transform 0.25s; }
        .novel-card:hover .novel-read-btn-arrow { transform: translateX(4px); }

        /* 試看空間專用：價格 + 購買按鈕 */
        .novel-price { font-size: 0.85rem; color: #b49050; font-family: sans-serif; }
        .novel-buy-btn { display: inline-flex; align-items: center; gap: 6px; padding: 7px 18px; border-radius: 20px; background: rgba(80,180,120,0.12); border: 1px solid rgba(80,180,120,0.3); color: #50b478; font-size: 0.82rem; font-family: sans-serif; transition: all 0.25s; white-space: nowrap; }
        .novel-buy-btn:hover { background: rgba(80,180,120,0.22); border-color: rgba(80,180,120,0.6); color: #70d498; }

        /* 試看空間分隔線 */
        .section-divider { max-width: 900px; margin: 40px auto 0; padding: 0 24px; border-top: 1px solid rgba(255,255,255,0.06); }
      `}</style>

      <main className="novels-page">
        <header className="novels-header">
          <h1 className="novels-title">連載小說</h1>
          <p className="novels-subtitle">睡前・等車・最好的陪伴 💜</p>
        </header>

        {/* ── 連載中 ── */}
        <div className="section-label">
          <h2>■ 連載中</h2>
          <p>免費同步更新，週一三五・週二四六</p>
        </div>
        <div className="novels-grid">
          {serials.map((novel: any) => (
            <Link key={novel.id} href={`/novels/${novel.id}/ebook`} className="novel-card">
              <NovélCover cover={novel.cover} title={novel.title} />
              <div className="novel-info">
                <span className="novel-genre">{novel.genre}</span>
                <h2 className="novel-name">{novel.title}</h2>
                <p className="novel-author">作者：{novel.author}</p>
                <p className="novel-desc">{novel.description}</p>
                <div className="novel-meta">
                  <span className="novel-status novel-status-ongoing">{novel.status}</span>
                  <span>共 {novel.totalChapters} 章</span>
                  {(novel as any).scheduleNote && (
                    <span style={{ color: '#b49050', fontSize: '0.78rem', letterSpacing: '0.05em' }}>
                      {(novel as any).scheduleNote}
                    </span>
                  )}
                  <span>更新於 {getLastPublishedDate(novel.id) || novel.updatedAt}</span>
                </div>
                <div className="novel-footer">
                  <div className="novel-tags">
                    {novel.tags.map((tag: string) => (
                      <span key={tag} className="novel-tag">#{tag}</span>
                    ))}
                  </div>
                  <span className="novel-read-btn">
                    開始閱讀
                    <span className="novel-read-btn-arrow">→</span>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* ── 認識小舖的書 ── */}
        {guides.length > 0 && (
          <>
            <div className="section-divider" />
            <div className="section-label">
              <h2>📚 認識小舖的書</h2>
              <p>進來翻翻，看看哪本最對你的胃口</p>
            </div>
            <div className="novels-grid">
              {guides.map((novel: any) => (
                <div key={novel.id} className="novel-card" style={{ cursor: 'default' }}>
                  <NovélCover cover={novel.cover} title={novel.title} />
                  <div className="novel-info">
                    <span className="novel-genre">{novel.genre}</span>
                    <h2 className="novel-name" style={{ fontSize: '1.6rem' }}>{novel.title}</h2>
                    <p className="novel-author">作者：{novel.author}</p>
                    <p className="novel-desc">{novel.description}</p>
                    <div className="novel-footer">
                      <div className="novel-tags">
                        {novel.tags.map((tag: string) => (
                          <span key={tag} className="novel-tag">#{tag}</span>
                        ))}
                      </div>
                      <a
                        href={(novel as any).directPdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="novel-read-btn"
                      >
                        📖 進來翻翻
                        <span className="novel-read-btn-arrow">→</span>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ── 試看空間 ── */}
        <div className="section-divider" />
        <div className="section-label">
          <h2>📖 試看空間</h2>
          <p>前幾章試讀・完整版在小舖</p>
        </div>
        <div className="novels-grid">
          {previews.map((novel: any) => (
            <div key={novel.id} className="novel-card" style={{ cursor: 'default' }}>
              <NovélCover cover={novel.cover} title={novel.title} />
              <div className="novel-info">
                <span className="novel-genre">{novel.genre}</span>
                <h2 className="novel-name" style={{ fontSize: '1.6rem' }}>{novel.title}</h2>
                <p className="novel-author">作者：{novel.author}</p>
                <p className="novel-desc">{novel.description}</p>
                <div className="novel-meta">
                  <span>完整版 {novel.totalChapters} 章</span>
                </div>
                <div className="novel-footer">
                  <div className="novel-tags">
                    {novel.tags.map((tag: string) => (
                      <span key={tag} className="novel-tag">#{tag}</span>
                    ))}
                  </div>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
                    <Link href={`/novels/${novel.id}/ebook`} className="novel-read-btn">
                      👀 看看喜不喜歡
                      <span className="novel-read-btn-arrow">→</span>
                    </Link>
                    {(novel as any).shopPrice && (
                      <a
                        href={novel.shopUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="novel-buy-btn"
                      >
                        {(novel as any).shopPrice} 購買完整版 ↗
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  )
}
