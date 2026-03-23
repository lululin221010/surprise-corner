// 📄 路徑：src/app/novels/[novelId]/ebook/page.tsx

'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import novelsData from '@/data/novels.json'
import chaptersData from '@/data/chapters.json'
import WallPostForm from '@/components/WallPostForm'

function isPublishedByDate(publishedAt: string): boolean {
  const now = new Date()
  const taiwanToday = new Date(now.getTime() + 8 * 60 * 60 * 1000)
    .toISOString()
    .slice(0, 10)
  return publishedAt <= taiwanToday
}

// ✅ 滾動窗口：最新 N 章的 id 集合
function getRollingFreeIds(novelId: string, windowSize: number): Set<string> {
  const published = (chaptersData as any[])
    .filter(c => c.novelId === novelId && isPublishedByDate(c.publishedAt))
    .sort((a: any, b: any) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
  return new Set(published.slice(0, windowSize).map((c: any) => c.id))
}

export default function EbookPage() {
  const params = useParams()
  const novelId = params?.novelId as string

  const novel = novelsData.find(n => n.id === novelId)
  const [mounted, setMounted] = useState(false)
  const [isPrinting, setIsPrinting] = useState(false)
  const [progress, setProgress] = useState(0)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!contentRef.current) return
    const handleScroll = () => {
      const el = contentRef.current
      if (!el) return
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setProgress(docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [mounted])

  if (!novel) {
    return (
      <main style={{ minHeight: '100vh', background: '#0c0b08', color: '#d8ccb8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Georgia, serif' }}>
        <p>找不到小說</p>
      </main>
    )
  }

  // ✅ 決定哪些章節是免費的（滾動窗口 or isFree 欄位）
  const novelAny = novel as any
  const freeIds = novelAny.freeWindow
    ? getRollingFreeIds(novelId, novelAny.freeWindow)
    : null

  const publishedChapters = (chaptersData as any[])
    .filter(c => {
      if (c.novelId !== novelId || !c.isPublished) return false
      if (!isPublishedByDate(c.publishedAt)) return false
      if (!c.content || (Array.isArray(c.content) ? c.content.length === 0 : !c.content.trim())) return false
      // 滾動窗口模式
      if (freeIds) return freeIds.has(c.id)
      // 一般模式
      return c.isFree === true
    })
    .sort((a: any, b: any) => a.chapterNumber - b.chapterNumber)

  // ✅ 顯示實際免費章節數
  const freeCount = publishedChapters.length

  const handlePrint = () => {
    setIsPrinting(true)
    setTimeout(() => {
      window.print()
      setIsPrinting(false)
    }, 100)
  }

  const totalWords = publishedChapters.reduce((sum, c) => sum + (c.wordCount || 0), 0)

  return (
    <>
      <style>{`
        /* ── 螢幕樣式 ─────────────────────────────── */
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+TC:wght@300;400;500&family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap');

        :root {
          --ink: #2a1f12;
          --paper: #f5f0e8;
          --gold: #b49050;
          --dark-bg: #0c0b08;
          --dark-text: #e2dace;
          --dark-muted: #7a6a58;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .ebook-root {
          min-height: 100vh;
          background: var(--dark-bg);
          color: var(--dark-text);
          font-family: 'Noto Serif TC', Georgia, serif;
        }

        .progress-bar {
          position: fixed;
          top: 0; left: 0;
          height: 2px;
          background: linear-gradient(90deg, #b49050, #c87060);
          transition: width 0.1s linear;
          z-index: 100;
          print-color-adjust: exact;
        }

        .ebook-nav {
          position: sticky;
          top: 0;
          background: rgba(12,11,8,0.96);
          backdrop-filter: blur(8px);
          border-bottom: 1px solid rgba(180,144,80,0.12);
          padding: 14px 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          z-index: 50;
        }

        .ebook-nav-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .ebook-nav-title {
          font-size: 0.85rem;
          color: #9a8878;
          letter-spacing: 0.05em;
        }

        .nav-divider { color: #5a4a38; }

        .ebook-badge {
          font-size: 0.7rem;
          letter-spacing: 0.2em;
          color: #b49050;
          border: 1px solid rgba(180,144,80,0.3);
          padding: 2px 10px;
        }

        .ebook-nav-actions {
          display: flex;
          gap: 10px;
          align-items: center;
        }

        .btn-print {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 20px;
          background: linear-gradient(135deg, rgba(180,144,80,0.25), rgba(160,80,100,0.2));
          border: 1px solid rgba(180,144,80,0.35);
          color: #d4a860;
          font-family: 'Noto Serif TC', Georgia, serif;
          font-size: 0.82rem;
          letter-spacing: 0.08em;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-print:hover {
          background: linear-gradient(135deg, rgba(180,144,80,0.4), rgba(160,80,100,0.35));
          border-color: rgba(180,144,80,0.55);
        }

        .btn-back {
          font-size: 0.78rem;
          color: #5a4a3a;
          text-decoration: none;
          padding: 8px 14px;
          border: 1px solid rgba(255,255,255,0.06);
          transition: color 0.2s;
        }

        .btn-back:hover { color: #8a7060; }

        .ebook-cover {
          max-width: 680px;
          margin: 0 auto;
          padding: 72px 40px 64px;
          text-align: center;
          border-bottom: 1px solid rgba(180,144,80,0.12);
          position: relative;
        }

        .cover-ornament {
          font-size: 0.7rem;
          letter-spacing: 0.5em;
          color: #b49050;
          margin-bottom: 40px;
          opacity: 0.7;
        }

        .cover-title {
          font-family: 'Playfair Display', 'Noto Serif TC', serif;
          font-size: 3.2rem;
          font-weight: 400;
          color: #e8dcc8;
          letter-spacing: 0.12em;
          line-height: 1.2;
          margin-bottom: 16px;
        }

        .cover-genre {
          font-size: 0.78rem;
          letter-spacing: 0.35em;
          color: #9a8070;
          margin-bottom: 8px;
        }

        .cover-author {
          font-size: 0.88rem;
          color: #8a7868;
          letter-spacing: 0.1em;
          margin-bottom: 36px;
        }

        .cover-line {
          width: 80px;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(180,144,80,0.5), transparent);
          margin: 0 auto 32px;
        }

        .cover-meta {
          display: flex;
          justify-content: center;
          gap: 24px;
          font-size: 0.78rem;
          color: #7a6a58;
        }

        .cover-desc {
          max-width: 460px;
          margin: 0 auto 32px;
          font-size: 1rem;
          color: #b8a890;
          line-height: 2;
          font-style: italic;
        }

        .toc-section {
          max-width: 680px;
          margin: 0 auto;
          padding: 48px 40px;
          border-bottom: 1px solid rgba(255,255,255,0.04);
        }

        .toc-label {
          font-size: 0.72rem;
          letter-spacing: 0.4em;
          color: #9a8070;
          margin-bottom: 24px;
        }

        .toc-row {
          display: flex;
          align-items: baseline;
          gap: 8px;
          padding: 10px 0;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          font-size: 0.97rem;
          color: #baaE96;
          text-decoration: none;
          transition: color 0.2s, padding-left 0.2s;
          cursor: pointer;
        }
        a.toc-row:hover {
          color: #e8c880;
          padding-left: 6px;
        }

        .toc-num {
          color: #7a6a58;
          font-size: 0.78rem;
          width: 28px;
          flex-shrink: 0;
        }

        .toc-dots {
          flex: 1;
          border-bottom: 1px dotted rgba(255,255,255,0.08);
          margin-bottom: 3px;
        }

        .toc-page {
          color: #7a6a58;
          font-size: 0.75rem;
        }

        .chapters-body {
          max-width: 680px;
          margin: 0 auto;
          padding: 0 40px 80px;
        }

        .chapter-block {
          padding: 72px 0 48px;
          border-bottom: 1px solid rgba(255,255,255,0.04);
        }

        .chapter-block:last-child {
          border-bottom: none;
        }

        .chapter-eyebrow {
          font-size: 0.72rem;
          letter-spacing: 0.4em;
          color: #9a8878;
          margin-bottom: 20px;
          text-align: center;
        }

        .chapter-heading {
          font-family: 'Playfair Display', 'Noto Serif TC', serif;
          font-size: 2rem;
          font-weight: 500;
          color: #f5ead8;
          text-align: center;
          margin-bottom: 12px;
          letter-spacing: 0.06em;
        }

        .chapter-dateline {
          text-align: center;
          font-size: 0.75rem;
          color: #7a6a58;
          margin-bottom: 40px;
          letter-spacing: 0.1em;
        }

        .chapter-rule {
          width: 48px;
          height: 1px;
          background: rgba(180,144,80,0.3);
          margin: 0 auto 40px;
        }

        .chapter-paragraph {
          font-size: 1.16rem;
          line-height: 2.2;
          color: #e5ddd0;
          margin-bottom: 1.8em;
          text-align: justify;
          text-indent: 2em;
          letter-spacing: 0.03em;
          font-weight: 400;
        }

        /* ── 圖片 & 影片 ─────────────── */
        .chapter-figure {
          margin: 2em 0;
          text-align: center;
        }

        .chapter-img {
          max-width: 100%;
          width: 100%;
          border-radius: 8px;
          border: 1px solid rgba(180,144,80,0.15);
          display: block;
          margin: 0 auto;
        }

        .chapter-figcaption {
          font-size: 0.82rem;
          color: #7a6a58;
          margin-top: 10px;
          letter-spacing: 0.05em;
          font-style: italic;
        }

        .chapter-video {
          margin: 2em 0;
          position: relative;
          padding-bottom: 56.25%;
          height: 0;
          overflow: hidden;
          border-radius: 8px;
          border: 1px solid rgba(180,144,80,0.15);
        }

        .chapter-video iframe {
          position: absolute;
          top: 0; left: 0;
          width: 100%;
          height: 100%;
          border: none;
        }

        .ebook-footer {
          max-width: 680px;
          margin: 0 auto;
          padding: 60px 40px;
          text-align: center;
          border-top: 1px solid rgba(180,144,80,0.12);
        }

        .footer-ornament {
          font-size: 1.5rem;
          margin-bottom: 20px;
          opacity: 0.5;
        }

        .footer-hook {
          font-size: 1.1rem;
          color: #e0d8c8;
          margin-bottom: 8px;
          letter-spacing: 0.05em;
        }

        .footer-text {
          font-size: 0.85rem;
          color: #7a6a58;
          line-height: 2;
          margin-bottom: 28px;
        }

        .footer-btns {
          display: flex;
          gap: 14px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .footer-shop {
          display: inline-block;
          padding: 0.7rem 2rem;
          background: linear-gradient(135deg, rgba(180,144,80,0.25), rgba(160,80,100,0.2));
          border: 1px solid rgba(180,144,80,0.35);
          color: #c4a060;
          text-decoration: none;
          font-size: 0.85rem;
          letter-spacing: 0.08em;
          transition: all 0.2s;
        }

        .footer-shop:hover {
          background: linear-gradient(135deg, rgba(180,144,80,0.4), rgba(160,80,100,0.35));
          border-color: rgba(180,144,80,0.55);
          color: #d4b070;
        }

        .footer-browse {
          display: inline-block;
          padding: 0.7rem 2rem;
          border: 1px solid rgba(255,255,255,0.1);
          color: #6a5a4a;
          text-decoration: none;
          font-size: 0.82rem;
          letter-spacing: 0.08em;
          transition: all 0.2s;
        }

        .footer-browse:hover { color: #9a8a7a; border-color: rgba(255,255,255,0.2); }

        .reading-tip {
          position: fixed;
          bottom: 24px;
          right: 24px;
          background: rgba(20,16,10,0.9);
          border: 1px solid rgba(180,144,80,0.2);
          padding: 8px 16px;
          font-size: 0.75rem;
          color: #8a7a68;
          letter-spacing: 0.08em;
          backdrop-filter: blur(4px);
          z-index: 50;
        }

        @media print {
          @page { size: A4; margin: 25mm 20mm; }
          .progress-bar, .ebook-nav, .reading-tip, .ebook-footer .footer-shop, .btn-print, .btn-back { display: none !important; }
          .ebook-root { background: white !important; color: #1a1008 !important; }
          .ebook-cover { page-break-after: always; padding: 80px 40px; }
          .cover-title { color: #1a1008 !important; font-size: 3rem; }
          .cover-genre, .cover-author, .cover-desc, .cover-meta { color: #5a4a3a !important; }
          .toc-section { page-break-after: always; }
          .toc-label, .toc-row, .toc-num { color: #4a3a2a !important; }
          .chapter-block { page-break-before: always; border-bottom: none; }
          .chapter-heading { color: #1a1008 !important; }
          .chapter-eyebrow, .chapter-dateline { color: #8a7060 !important; }
          .chapter-paragraph { color: #2a1f12 !important; font-size: 11pt; line-height: 1.9; }
          .chapter-rule { background: #c4a060 !important; print-color-adjust: exact; -webkit-print-color-adjust: exact; }
          .ebook-footer { page-break-before: always; }
          .footer-text { color: #5a4a3a !important; }
        }

        @media (max-width: 600px) {
          .ebook-nav { padding: 12px 16px; }
          .ebook-nav-title { display: none; }
          .ebook-cover, .toc-section, .chapters-body { padding-left: 20px; padding-right: 20px; }
          .cover-title { font-size: 2.2rem; }
          .chapter-heading { font-size: 1.4rem; }
          .btn-print span.label { display: none; }
        }
      `}</style>

      <div className="ebook-root" ref={contentRef}>

        {mounted && (
          <div className="progress-bar" style={{ width: `${progress}%` }} />
        )}

        <nav className="ebook-nav">
          <div className="ebook-nav-left">
            <Link href={`/novels/${novelId}`} className="btn-back">← 目錄</Link>
            <span className="ebook-nav-title">{novel.title}</span>
            <span className="nav-divider">/</span>
            <span className="ebook-badge">電子書</span>
          </div>
          <div className="ebook-nav-actions">
            {(novel as any).forSale !== false && (
              <a
                href={(novel as any).shopUrl || 'https://still-time-corner.vercel.app/digital'}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-print"
              >
                🛒 <span className="label">購買完整版</span>
              </a>
            )}
          </div>
        </nav>

        <div className="ebook-cover">
          <p className="cover-ornament">✦ &nbsp; SURPRISE CORNER &nbsp; ✦</p>
          <h1 className="cover-title">{novel.title}</h1>
          <p className="cover-genre">{novel.genre}</p>
          <p className="cover-author">作者　{novel.author}</p>
          <div className="cover-line" />
          <p className="cover-desc">{novel.description}</p>
          <div className="cover-meta">
            <span>約 {totalWords.toLocaleString()} 字</span>
          </div>
        </div>

        {publishedChapters.length > 0 && (
          <div className="toc-section">
            <p className="toc-label">目　錄</p>
            {publishedChapters.map((c) => (
              <Link key={c.id} href={`/novels/${novelId}/${c.id}`} className="toc-row">
                <span className="toc-num">{String(c.chapterNumber).padStart(2, '0')}</span>
                <span>{c.title}</span>
                <span className="toc-dots" />
                <span className="toc-page">{c.publishedAt}</span>
              </Link>
            ))}
          </div>
        )}

        {publishedChapters.length === 0 && (
          <div style={{ textAlign: 'center', padding: '80px 40px', color: '#5a4a3a', fontSize: '0.9rem' }}>
            <p>目前還沒有可閱讀的章節，請稍後再回來 💜</p>
            <Link href={`/novels/${novelId}`} style={{ display: 'inline-block', marginTop: '20px', color: '#b49050', textDecoration: 'none', fontSize: '0.82rem' }}>
              ← 回到章節目錄
            </Link>
          </div>
        )}

        <div className="chapters-body">
          {publishedChapters.map((chapter) => {
            const paragraphs = Array.isArray(chapter.content)
              ? chapter.content.filter((p: string) => p && p.trim())
              : chapter.content.split('\n').filter((p: string) => p.trim())
            return (
              <div key={chapter.id} className="chapter-block" id={`ch-${chapter.chapterNumber}`}>
                <p className="chapter-eyebrow">第 {chapter.chapterNumber} 章</p>
                <h2 className="chapter-heading">{chapter.title}</h2>
                <p className="chapter-dateline">{chapter.publishedAt} &nbsp;·&nbsp; {chapter.wordCount} 字</p>
                <div className="chapter-rule" />
                {paragraphs.map((para: string, i: number) => {
                  // 圖片：![說明](url)
                  const imgMatch = para.match(/^!\[([^\]]*)\]\(([^)]+)\)$/)
                  if (imgMatch) {
                    return (
                      <figure key={i} className="chapter-figure">
                        <img src={imgMatch[2]} alt={imgMatch[1]} className="chapter-img" />
                        {imgMatch[1] && <figcaption className="chapter-figcaption">{imgMatch[1]}</figcaption>}
                      </figure>
                    )
                  }
                  // [[VIDEO]] 佔位符 → 用 chapter.videoUrl 嵌入
                  if (para.trim() === '[[VIDEO]]') {
                    const vUrl = (chapter as any).videoUrl as string | undefined
                    if (!vUrl) return null
                    return (
                      <div key={i} className="chapter-video">
                        <iframe
                          src={vUrl}
                          title="影片"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    )
                  }
                  // 影片：[video](youtube-url 或 直接 URL)
                  const vidMatch = para.match(/^\[video\]\(([^)]+)\)$/)
                  if (vidMatch) {
                    const url = vidMatch[1]
                    const ytMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|shorts\/))([A-Za-z0-9_-]{11})/)
                    if (ytMatch) {
                      return (
                        <div key={i} className="chapter-video">
                          <iframe
                            src={`https://www.youtube.com/embed/${ytMatch[1]}`}
                            title="影片"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        </div>
                      )
                    }
                  }
                  // 一般文字段落
                  return <p key={i} className="chapter-paragraph">{para}</p>
                })}
                {/* 🐾 魯魯碎碎念照片 */}
                {(chapter as any).photoUrl && (
                  <div style={{ margin: '2rem auto 0', textAlign: 'center', maxWidth: 320 }}>
                    <img
                      src={(chapter as any).photoUrl}
                      alt="魯魯"
                      style={{ width: '100%', borderRadius: 16, objectFit: 'cover', opacity: 0.92, boxShadow: '0 4px 24px rgba(0,0,0,0.4)' }}
                    />
                    {(chapter as any).photoCaption && (
                      <p style={{ marginTop: '0.6rem', fontSize: '0.75rem', color: '#9a8878', fontStyle: 'italic' }}>
                        ✨ {(chapter as any).photoCaption}
                      </p>
                    )}
                  </div>
                )}
                {/* 試看區不顯示互動聊天，只有連載章節頁才有角色聊天 */}
              </div>
            )
          })}
        </div>

        {publishedChapters.length > 0 && (
          <div className="ebook-footer">
            <div className="footer-ornament">✦</div>
            <p className="footer-hook">喜歡這個故事？</p>
            {(novel as any).forSale === false ? (
              <>
                <p className="footer-text">
                  連載更新中，歡迎繼續追蹤 🐾<br />
                  小舖還有更多精采的書等你探索。
                </p>
                <div className="footer-btns">
                  <a
                    href="https://still-time-corner.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-shop"
                  >
                    去小舖看看其他精采的書 →
                  </a>
                  <Link href="/novels" className="footer-browse">
                    繼續逛驚喜角落 →
                  </Link>
                </div>
              </>
            ) : (
              <>
                <p className="footer-text">
                  完整版收錄全部精彩內容。<br />
                  前往小舖購買後，店長透過 LINE 寄送完整閱讀連結。
                </p>
                <div className="footer-btns">
                  <a
                    href={(novel as any).shopUrl || 'https://still-time-corner.vercel.app/digital'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-shop"
                  >
                    前往小舖購買完整版 →
                  </a>
                  <Link href="/novels" className="footer-browse">
                    繼續逛驚喜角落 →
                  </Link>
                </div>
              </>
            )}

            {/* 留言表單 → 發布到作品牆 */}
            <div style={{ marginTop: '2.5rem' }}>
              <WallPostForm label={novelId === 'lulu-life' ? '魯魯讀者' : '連載讀者'} />
            </div>

            {/* 角色聊天 CTA：看完故事後引導去和角色說說話 */}
            {(novelId === 'lulu-diary' || novelId === 'the-last-signal') && (
              <div style={{
                marginTop: '2rem',
                padding: '1.5rem',
                background: 'rgba(168,85,247,0.08)',
                border: '1px solid rgba(168,85,247,0.2)',
                borderRadius: '16px',
              }}>
                <p style={{ fontSize: '0.88rem', color: '#c4b5fd', marginBottom: '0.8rem', lineHeight: 1.7 }}>
                  {novelId === 'lulu-diary'
                    ? '💬 看完 Lulu 的故事，有沒有想和她說說話？'
                    : '💬 看完林悅的故事，有沒有想問她那個訊號的事？'}
                </p>
                <Link
                  href={novelId === 'lulu-diary' ? '/chat/lulu' : '/chat/signal'}
                  style={{
                    display: 'inline-block',
                    background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
                    color: '#fff',
                    borderRadius: '10px',
                    padding: '0.6rem 1.4rem',
                    fontWeight: 700,
                    fontSize: '0.88rem',
                    textDecoration: 'none',
                  }}
                >
                  {novelId === 'lulu-diary' ? '🐱 和 Lulu 聊聊' : '📡 和林悅說說話'} →
                </Link>
              </div>
            )}
          </div>
        )}

        {mounted && progress > 5 && progress < 98 && (
          <div className="reading-tip">
            已讀 {Math.round(progress)}%
          </div>
        )}

      </div>
    </>
  )
}