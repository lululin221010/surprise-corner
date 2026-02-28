// 📄 路徑：src/app/novels/[novelId]/ebook/page.tsx

'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import novelsData from '@/data/novels.json'
import chaptersData from '@/data/chapters.json'

// ✅ 與主站邏輯一致
const FREE_CHAPTERS = 10

function isPublishedByDate(publishedAt: string): boolean {
  const now = new Date()
  const taiwanToday = new Date(now.getTime() + 8 * 60 * 60 * 1000)
    .toISOString()
    .slice(0, 10)
  return publishedAt <= taiwanToday
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

  const publishedChapters = (chaptersData as any[])
    .filter(c =>
      c.novelId === novelId &&
      c.isPublished &&
      c.chapterNumber <= FREE_CHAPTERS &&
      isPublishedByDate(c.publishedAt)
    )
    .sort((a, b) => a.chapterNumber - b.chapterNumber)

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
          --dark-text: #d8ccb8;
          --dark-muted: #6a5a4a;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .ebook-root {
          min-height: 100vh;
          background: var(--dark-bg);
          color: var(--dark-text);
          font-family: 'Noto Serif TC', Georgia, serif;
        }

        /* 進度條 */
        .progress-bar {
          position: fixed;
          top: 0; left: 0;
          height: 2px;
          background: linear-gradient(90deg, #b49050, #c87060);
          transition: width 0.1s linear;
          z-index: 100;
          print-color-adjust: exact;
        }

        /* 頂部導覽 */
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
          color: #8a7060;
          letter-spacing: 0.05em;
        }

        .nav-divider { color: #3a2a1a; }

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

        /* 封面區 */
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
          color: #7a6050;
          margin-bottom: 8px;
        }

        .cover-author {
          font-size: 0.88rem;
          color: #6a5a4a;
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
          color: #4a3a2a;
        }

        .cover-desc {
          max-width: 460px;
          margin: 0 auto 32px;
          font-size: 0.95rem;
          color: #8a7a6a;
          line-height: 1.9;
          font-style: italic;
        }

        /* 目錄 */
        .toc-section {
          max-width: 680px;
          margin: 0 auto;
          padding: 48px 40px;
          border-bottom: 1px solid rgba(255,255,255,0.04);
        }

        .toc-label {
          font-size: 0.72rem;
          letter-spacing: 0.4em;
          color: #7a6050;
          margin-bottom: 24px;
        }

        .toc-row {
          display: flex;
          align-items: baseline;
          gap: 8px;
          padding: 8px 0;
          border-bottom: 1px solid rgba(255,255,255,0.03);
          font-size: 0.88rem;
          color: #8a7a6a;
        }

        .toc-num {
          color: #4a3a2a;
          font-size: 0.75rem;
          width: 28px;
          flex-shrink: 0;
        }

        .toc-dots {
          flex: 1;
          border-bottom: 1px dotted rgba(255,255,255,0.06);
          margin-bottom: 3px;
        }

        .toc-page {
          color: #4a3a2a;
          font-size: 0.72rem;
        }

        /* 章節內容 */
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
          font-size: 0.7rem;
          letter-spacing: 0.4em;
          color: #7a6050;
          margin-bottom: 20px;
          text-align: center;
        }

        .chapter-heading {
          font-family: 'Playfair Display', 'Noto Serif TC', serif;
          font-size: 1.8rem;
          font-weight: 400;
          color: #e8dcc8;
          text-align: center;
          margin-bottom: 12px;
          letter-spacing: 0.06em;
        }

        .chapter-dateline {
          text-align: center;
          font-size: 0.72rem;
          color: #3a2a1a;
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
          font-size: 1.05rem;
          line-height: 2.1;
          color: #c8bcaa;
          margin-bottom: 1.8em;
          text-align: justify;
          text-indent: 2em;
          letter-spacing: 0.02em;
        }

        /* 電子書尾頁 */
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

        .footer-text {
          font-size: 0.82rem;
          color: #4a3a2a;
          line-height: 2;
          margin-bottom: 24px;
        }

        .footer-shop {
          display: inline-block;
          padding: 0.7rem 2rem;
          background: linear-gradient(135deg, rgba(180,144,80,0.2), rgba(160,80,100,0.2));
          border: 1px solid rgba(180,144,80,0.25);
          color: #c4a060;
          text-decoration: none;
          font-size: 0.82rem;
          letter-spacing: 0.08em;
        }

        /* 閱讀進度提示 */
        .reading-tip {
          position: fixed;
          bottom: 24px;
          right: 24px;
          background: rgba(20,16,10,0.9);
          border: 1px solid rgba(180,144,80,0.2);
          padding: 8px 16px;
          font-size: 0.72rem;
          color: #6a5a4a;
          letter-spacing: 0.08em;
          backdrop-filter: blur(4px);
          z-index: 50;
        }

        /* ── 列印樣式 ─────────────────────────────── */
        @media print {
          @page {
            size: A4;
            margin: 25mm 20mm;
          }

          .progress-bar,
          .ebook-nav,
          .reading-tip,
          .ebook-footer .footer-shop,
          .btn-print,
          .btn-back { display: none !important; }

          .ebook-root {
            background: white !important;
            color: #1a1008 !important;
          }

          .ebook-cover {
            page-break-after: always;
            padding: 80px 40px;
          }

          .cover-title {
            color: #1a1008 !important;
            font-size: 3rem;
          }

          .cover-genre, .cover-author, .cover-desc, .cover-meta {
            color: #5a4a3a !important;
          }

          .toc-section {
            page-break-after: always;
          }

          .toc-label, .toc-row, .toc-num { color: #4a3a2a !important; }

          .chapter-block {
            page-break-before: always;
            border-bottom: none;
          }

          .chapter-heading { color: #1a1008 !important; }
          .chapter-eyebrow, .chapter-dateline { color: #8a7060 !important; }

          .chapter-paragraph {
            color: #2a1f12 !important;
            font-size: 11pt;
            line-height: 1.9;
          }

          .chapter-rule {
            background: #c4a060 !important;
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }

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

        {/* 閱讀進度條 */}
        {mounted && (
          <div className="progress-bar" style={{ width: `${progress}%` }} />
        )}

        {/* 頂部導覽 */}
        <nav className="ebook-nav">
          <div className="ebook-nav-left">
            <Link href={`/novels/${novelId}`} className="btn-back">← 目錄</Link>
            <span className="ebook-nav-title">{novel.title}</span>
            <span className="nav-divider">/</span>
            <span className="ebook-badge">電子書</span>
          </div>
          <div className="ebook-nav-actions">
            <button
              className="btn-print"
              onClick={handlePrint}
              disabled={isPrinting}
            >
              ⬇ <span className="label">下載 PDF</span>
            </button>
          </div>
        </nav>

        {/* 封面 */}
        <div className="ebook-cover">
          <p className="cover-ornament">✦ &nbsp; SURPRISE CORNER &nbsp; ✦</p>
          <h1 className="cover-title">{novel.title}</h1>
          <p className="cover-genre">{novel.genre}</p>
          <p className="cover-author">作者　{novel.author}</p>
          <div className="cover-line" />
          <p className="cover-desc">{novel.description}</p>
          <div className="cover-meta">
            <span>共 {publishedChapters.length} 章</span>
            <span>·</span>
            <span>約 {totalWords.toLocaleString()} 字</span>
            <span>·</span>
            <span>免費試讀版</span>
          </div>
        </div>

        {/* 目錄 */}
        {publishedChapters.length > 0 && (
          <div className="toc-section">
            <p className="toc-label">目　錄</p>
            {publishedChapters.map((c, i) => (
              <div key={c.id} className="toc-row">
                <span className="toc-num">{String(c.chapterNumber).padStart(2, '0')}</span>
                <span>{c.title}</span>
                <span className="toc-dots" />
                <span className="toc-page">{c.publishedAt}</span>
              </div>
            ))}
          </div>
        )}

        {/* 無可閱讀章節 */}
        {publishedChapters.length === 0 && (
          <div style={{ textAlign: 'center', padding: '80px 40px', color: '#5a4a3a', fontSize: '0.9rem' }}>
            <p>目前還沒有可閱讀的章節，請稍後再回來 💜</p>
            <Link href={`/novels/${novelId}`} style={{ display: 'inline-block', marginTop: '20px', color: '#b49050', textDecoration: 'none', fontSize: '0.82rem' }}>
              ← 回到章節目錄
            </Link>
          </div>
        )}

        {/* 章節內容 */}
        <div className="chapters-body">
          {publishedChapters.map((chapter) => {
            const paragraphs = chapter.content.split('\n').filter((p: string) => p.trim())
            return (
              <div key={chapter.id} className="chapter-block" id={`ch-${chapter.chapterNumber}`}>
                <p className="chapter-eyebrow">第 {chapter.chapterNumber} 章</p>
                <h2 className="chapter-heading">{chapter.title}</h2>
                <p className="chapter-dateline">{chapter.publishedAt} &nbsp;·&nbsp; {chapter.wordCount} 字</p>
                <div className="chapter-rule" />
                {paragraphs.map((para: string, i: number) => (
                  <p key={i} className="chapter-paragraph">{para}</p>
                ))}
              </div>
            )
          })}
        </div>

        {/* 尾頁 */}
        {publishedChapters.length > 0 && (
          <div className="ebook-footer">
            <div className="footer-ornament">✦</div>
            <p className="footer-text">
              本電子書為免費試讀版，包含第 1 至第 {FREE_CHAPTERS} 章。<br />
              更多章節每週一・三・五更新，歡迎回到網站繼續閱讀。<br /><br />
              surprise-corner.vercel.app
            </p>
            <a
              href="https://still-time-corner.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-shop"
            >
              ✨ Still Time Corner 小舖 →
            </a>
          </div>
        )}

        {/* 閱讀進度提示 */}
        {mounted && progress > 5 && progress < 98 && (
          <div className="reading-tip">
            已讀 {Math.round(progress)}%
          </div>
        )}

      </div>
    </>
  )
}