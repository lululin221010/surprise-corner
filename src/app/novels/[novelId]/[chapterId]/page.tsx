// 📄 路徑：src/app/novels/[novelId]/[chapterId]/page.tsx

import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import novelsData from '@/data/novels.json'
import chaptersData from '@/data/chapters.json'

// ✅ 判斷章節是否已到發布日（台灣時區 UTC+8）
function isPublishedByDate(publishedAt: string): boolean {
  const now = new Date()
  const taiwanToday = new Date(now.getTime() + 8 * 60 * 60 * 1000)
    .toISOString()
    .slice(0, 10)
  return publishedAt <= taiwanToday
}

// ✅ 計算滾動免費窗口：novelId 最新 N 章的 id 集合
function getRollingFreeIds(novelId: string, windowSize: number): Set<string> {
  const published = (chaptersData as any[])
    .filter(c => c.novelId === novelId && isPublishedByDate(c.publishedAt))
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
  return new Set(published.slice(0, windowSize).map((c: any) => c.id))
}

// ✅ 判斷章節是否應被鎖定
function isChapterLocked(chapter: any, novel: any): boolean {
  // 發布日期未到 → 鎖（無論任何模式）
  if (!isPublishedByDate(chapter.publishedAt)) return true
  // 連載滾動窗口模式（novel.freeWindow 存在時啟用）
  if (novel?.freeWindow) {
    const freeIds = getRollingFreeIds(novel.id, novel.freeWindow)
    return !freeIds.has(chapter.id)
  }
  // 一般模式：看 isFree 欄位
  return !chapter.isFree
}

// ✅ 計算下一個更新日（每週一、三、五）
function getNextUpdateDay(): string {
  const now = new Date()
  const taiwanNow = new Date(now.getTime() + 8 * 60 * 60 * 1000)
  const day = taiwanNow.getDay() // 0=日,1=一,...,6=六
  const updateDays = [1, 3, 5]
  for (let i = 1; i <= 7; i++) {
    const next = (day + i) % 7
    if (updateDays.includes(next)) {
      const nextDate = new Date(taiwanNow)
      nextDate.setDate(taiwanNow.getDate() + i)
      return nextDate.toLocaleDateString('zh-TW', { month: 'long', day: 'numeric', weekday: 'short' })
    }
  }
  return '下週'
}

interface Props { params: Promise<{ novelId: string; chapterId: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { novelId, chapterId } = await params
  const chapter = (chaptersData as any[]).find(c => c.id === chapterId)
  const novel = novelsData.find(n => n.id === novelId)
  if (!chapter || !novel) return { title: '找不到章節' }
  return {
    title: `${chapter.title} — ${novel.title}`,
    description: chapter.content.slice(0, 100) + '...',
  }
}

export default async function ChapterPage({ params }: Props) {
  const { novelId, chapterId } = await params
  const novel = novelsData.find(n => n.id === novelId)
  const chapter = (chaptersData as any[]).find(c => c.id === chapterId && c.novelId === novelId)
  if (!novel || !chapter) notFound()

  const sortedChapters = (chaptersData as any[])
    .filter(c => c.novelId === novelId && c.isPublished)
    .sort((a, b) => a.chapterNumber - b.chapterNumber)

  const currentIndex = sortedChapters.findIndex(c => c.id === chapterId)
  const prevChapter = currentIndex > 0 ? sortedChapters[currentIndex - 1] : null
  const nextChapter = currentIndex < sortedChapters.length - 1 ? sortedChapters[currentIndex + 1] : null

  // ✅ 鎖章判斷
  const isPaidLocked = isChapterLocked(chapter, novel) && isPublishedByDate(chapter.publishedAt)

  if (isChapterLocked(chapter, novel)) {
    const nextUpdate = getNextUpdateDay()
    return (
      <main style={{ minHeight: '100vh', background: '#0c0b08', color: '#d8ccb8', fontFamily: 'Georgia, serif', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem' }}>
        <div style={{ maxWidth: 480, width: '100%', textAlign: 'center' }}>

          {/* 鎖頭 */}
          <div style={{ fontSize: '3.5rem', marginBottom: '1.5rem', opacity: 0.8 }}>{isPaidLocked ? '🔐' : '🔒'}</div>

          <h2 style={{ color: '#e8dcc8', fontSize: '1.5rem', fontWeight: 400, margin: '0 0 0.8rem', letterSpacing: '0.05em' }}>
            第 {chapter.chapterNumber} 章・{isPaidLocked ? '付費章節' : '尚未開放'}
          </h2>

          <p style={{ color: '#6a5a4a', lineHeight: 1.9, margin: '0 0 0.3rem', fontSize: '0.9rem' }}>
            {chapter.isFree
              ? `本章將於 ${chapter.publishedAt} 開放`
              : `免費章節（免費章節）已全數開放`}
          </p>

          {/* 更新時程 */}
          <div style={{
            margin: '1.8rem 0',
            padding: '1.2rem',
            border: '1px solid rgba(180,144,80,0.2)',
            borderRadius: '4px',
          }}>
            <p style={{ color: '#b49050', fontSize: '0.85rem', margin: '0 0 0.4rem', letterSpacing: '0.1em' }}>
              每週一・三・五　更新一章
            </p>
            <p style={{ color: '#4a3a2a', fontSize: '0.8rem', margin: 0 }}>
              下次更新：{nextUpdate}
            </p>
          </div>

          <p style={{ color: '#5a4a3a', fontSize: '0.85rem', marginBottom: '2rem', lineHeight: 1.8 }}>
            等待的時候，去小舖逛逛？<br />
            也許有什麼在等著你 💜
          </p>

          {/* 按鈕 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', alignItems: 'center' }}>
            <a
              href="https://still-time-corner.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block', width: '100%', maxWidth: 320,
                padding: '0.9rem 2rem',
                background: 'linear-gradient(135deg, rgba(180,144,80,0.3), rgba(180,80,120,0.3))',
                border: '1px solid rgba(180,144,80,0.35)',
                color: '#d4a860', textDecoration: 'none',
                fontSize: '0.9rem', letterSpacing: '0.05em',
                transition: 'all 0.2s',
              }}
            >
              ✨ Still Time Corner 小舖
            </a>

            <Link
              href={`/novels/${novelId}`}
              style={{
                display: 'inline-block', width: '100%', maxWidth: 320,
                padding: '0.8rem 2rem',
                border: '1px solid rgba(255,255,255,0.06)',
                color: '#6a5a4a', textDecoration: 'none',
                fontSize: '0.85rem', letterSpacing: '0.05em',
              }}
            >
              ← 回到章節目錄
            </Link>
          </div>
        </div>
      </main>
    )
  }

  // ✅ 正常顯示章節內容（原有樣式完整保留）
  const videoUrl = (chapter as any).videoUrl as string | undefined
  const hasVideo = !!videoUrl && chapter.content.includes('[[VIDEO]]')
  const contentParts = chapter.content.includes('[[VIDEO]]')
    ? chapter.content.split('[[VIDEO]]')
    : [chapter.content]
  const paragraphsBefore = contentParts[0].split('\n').filter((p: string) => p.trim())
  const paragraphsAfter = contentParts[1] ? contentParts[1].split('\n').filter((p: string) => p.trim()) : []

  return (
    <main style={{ minHeight: '100vh', background: '#0c0b08', color: '#d8ccb8', fontFamily: 'Georgia, serif' }}>
      <nav style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '20px 40px', fontSize: '0.8rem', borderBottom: '1px solid rgba(255,255,255,0.04)', position: 'sticky', top: 0, background: 'rgba(12,11,8,0.95)', zIndex: 10 }}>
        <Link href={'/novels/' + novel.id} style={{ color: '#8a7060', textDecoration: 'none' }}>{novel.title}</Link>
        <span style={{ color: '#3a2a1a' }}>/</span>
        <span style={{ color: '#6a5a4a' }}>{chapter.title}</span>
      </nav>

      <article style={{ maxWidth: 680, margin: '0 auto', padding: '60px 32px 80px' }}>
        <header style={{ textAlign: 'center', marginBottom: 64 }}>
          {!chapter.title.match(/^第[一二三四五六七八九十百\d]/) && (
            <span style={{ display: 'block', fontSize: '0.75rem', letterSpacing: '0.3em', color: '#7a6050', marginBottom: 16 }}>第 {chapter.chapterNumber} 章</span>
          )}
          <h1 style={{ fontSize: '2rem', fontWeight: 400, color: '#e8dcc8', margin: '0 0 20px' }}>{chapter.title}</h1>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 10, fontSize: '0.78rem', color: '#4a3a2a' }}>
            <span>{chapter.publishedAt}</span><span>·</span><span>{chapter.wordCount} 字</span>
          </div>
        </header>

        {/* ✅ 章節插圖 */}
        {(chapter as any).imageUrl && (
          <div style={{ margin: '0 auto 48px', textAlign: 'center' }}>
            <img
              src={(chapter as any).imageUrl}
              alt={chapter.title}
              style={{ maxWidth: '100%', maxHeight: 420, objectFit: 'cover', borderRadius: 4, opacity: 0.9 }}
            />
          </div>
        )}

        {!(chapter as any).imageUrl && (
          <div style={{ width: 40, height: 1, background: 'rgba(180,144,80,0.3)', margin: '0 auto 48px' }} />
        )}

        {paragraphsBefore.map((para: string, i: number) => (
          <p key={`before-${i}`} style={{ fontSize: '1.05rem', lineHeight: 2, color: '#c8bcaa', margin: '0 0 1.8em', textAlign: 'justify' }}>{para}</p>
        ))}

        {hasVideo && (
          <div style={{ margin: '2rem 0' }}>
            <iframe
              width="100%"
              style={{ aspectRatio: '9/16', maxWidth: 360, margin: '1.5rem auto', display: 'block', borderRadius: 12 } as React.CSSProperties}
              src={videoUrl}
              title="魯魯撞牆"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}

        {paragraphsAfter.map((para: string, i: number) => (
          <p key={`after-${i}`} style={{ fontSize: '1.05rem', lineHeight: 2, color: '#c8bcaa', margin: '0 0 1.8em', textAlign: 'justify' }}>{para}</p>
        ))}

        {/* ✅ 第 FREE_CHAPTERS 章結尾：免費章節讀完提示 */}
        {chapter.isFree && nextChapter && !nextChapter.isFree && (
          <div style={{
            margin: '3rem 0 0',
            padding: '2rem',
            border: '1px solid rgba(180,144,80,0.2)',
            textAlign: 'center',
          }}>
            <p style={{ color: '#b49050', fontSize: '0.9rem', margin: '0 0 0.5rem', letterSpacing: '0.08em' }}>
              — 免費章節已全數開放 —
            </p>
            <p style={{ color: '#5a4a3a', fontSize: '0.82rem', margin: '0 0 1.2rem', lineHeight: 1.9 }}>
              每週一・三・五更新一章，記得常回來 💜<br />
              等待期間，去小舖找找驚喜？
            </p>
            <a
              href="https://still-time-corner.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block', padding: '0.7rem 2rem',
                background: 'linear-gradient(135deg, rgba(180,144,80,0.25), rgba(180,80,120,0.25))',
                border: '1px solid rgba(180,144,80,0.3)',
                color: '#c4a060', textDecoration: 'none',
                fontSize: '0.85rem', letterSpacing: '0.05em',
              }}
            >
              ✨ Still Time Corner →
            </a>
          </div>
        )}

        <footer style={{ marginTop: 80, paddingTop: 40, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>

            {/* 上一章 */}
            {prevChapter ? (
              <Link href={'/novels/' + novel.id + '/' + prevChapter.id} style={{ flex: 1, textDecoration: 'none', color: 'inherit' }}>
                <div style={{ fontSize: '0.75rem', color: '#b49050' }}>← 上一章</div>
                <div style={{ fontSize: '0.85rem', color: '#8a7a6a' }}>{prevChapter.title}</div>
              </Link>
            ) : (
              <div style={{ flex: 1, opacity: 0.3, fontSize: '0.75rem', color: '#b49050' }}>← 已是第一章</div>
            )}

            <Link href={'/novels/' + novel.id} style={{ padding: '10px 24px', border: '1px solid rgba(180,144,80,0.25)', color: '#8a7060', textDecoration: 'none', fontSize: '0.8rem' }}>目錄</Link>

            {/* 下一章：超過免費章節或未到發布日顯示🔒 */}
            {nextChapter ? (
              <Link href={'/novels/' + novel.id + '/' + nextChapter.id} style={{ flex: 1, textDecoration: 'none', color: 'inherit', textAlign: 'right' }}>
                <div style={{ fontSize: '0.75rem', color: isChapterLocked(nextChapter, novel) ? '#4a3a2a' : '#b49050' }}>
                  {isChapterLocked(nextChapter, novel) ? '🔒 ' : ''}下一章 →
                </div>
                <div style={{ fontSize: '0.85rem', color: '#8a7a6a' }}>{nextChapter.title}</div>
              </Link>
            ) : (
              <div style={{ flex: 1, opacity: 0.3, fontSize: '0.75rem', color: '#b49050', textAlign: 'right' }}>已是最新章 →</div>
            )}

          </div>
        </footer>
      </article>
    </main>
  )
}