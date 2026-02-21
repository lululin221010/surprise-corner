import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import novelsData from '@/data/novels.json'
import chaptersData from '@/data/chapters.json'

interface Props { params: Promise<{ novelId: string; chapterId: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { novelId, chapterId } = await params
  const chapter = (chaptersData as any[]).find(c => c.id === chapterId)
  const novel = novelsData.find(n => n.id === novelId)
  if (!chapter || !novel) return { title: '找不到章節' }
  return { title: `${chapter.title} — ${novel.title}`, description: chapter.content.slice(0, 100) + '...' }
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
  const paragraphs = chapter.content.split('\n').filter((p: string) => p.trim())

  return (
    <main style={{ minHeight: '100vh', background: '#0c0b08', color: '#d8ccb8', fontFamily: 'Georgia, serif' }}>
      <nav style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '20px 40px', fontSize: '0.8rem', borderBottom: '1px solid rgba(255,255,255,0.04)', position: 'sticky', top: 0, background: 'rgba(12,11,8,0.95)', zIndex: 10 }}>
        <Link href={'/novels/' + novel.id} style={{ color: '#8a7060', textDecoration: 'none' }}>{novel.title}</Link>
        <span style={{ color: '#3a2a1a' }}>/</span>
        <span style={{ color: '#6a5a4a' }}>{chapter.title}</span>
      </nav>
      <article style={{ maxWidth: 680, margin: '0 auto', padding: '60px 32px 80px' }}>
        <header style={{ textAlign: 'center', marginBottom: 64 }}>
          <span style={{ display: 'block', fontSize: '0.75rem', letterSpacing: '0.3em', color: '#7a6050', marginBottom: 16 }}>第 {chapter.chapterNumber} 章</span>
          <h1 style={{ fontSize: '2rem', fontWeight: 400, color: '#e8dcc8', margin: '0 0 20px' }}>{chapter.title}</h1>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 10, fontSize: '0.78rem', color: '#4a3a2a' }}>
            <span>{chapter.publishedAt}</span><span>·</span><span>{chapter.wordCount} 字</span>
          </div>
        </header>
        <div style={{ width: 40, height: 1, background: 'rgba(180,144,80,0.3)', margin: '0 auto 48px' }} />
        {paragraphs.map((para: string, i: number) => (
          <p key={i} style={{ fontSize: '1.05rem', lineHeight: 2, color: '#c8bcaa', margin: '0 0 1.8em', textAlign: 'justify' }}>{para}</p>
        ))}
        <footer style={{ marginTop: 80, paddingTop: 40, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
            {prevChapter ? (
              <Link href={'/novels/' + novel.id + '/' + prevChapter.id} style={{ flex: 1, textDecoration: 'none', color: 'inherit' }}>
                <div style={{ fontSize: '0.75rem', color: '#b49050' }}>← 上一章</div>
                <div style={{ fontSize: '0.85rem', color: '#8a7a6a' }}>{prevChapter.title}</div>
              </Link>
            ) : <div style={{ flex: 1, opacity: 0.3, fontSize: '0.75rem', color: '#b49050' }}>← 已是第一章</div>}
            <Link href={'/novels/' + novel.id} style={{ padding: '10px 24px', border: '1px solid rgba(180,144,80,0.25)', color: '#8a7060', textDecoration: 'none', fontSize: '0.8rem' }}>目錄</Link>
            {nextChapter ? (
              <Link href={'/novels/' + novel.id + '/' + nextChapter.id} style={{ flex: 1, textDecoration: 'none', color: 'inherit', textAlign: 'right' }}>
                <div style={{ fontSize: '0.75rem', color: '#b49050' }}>下一章 →</div>
                <div style={{ fontSize: '0.85rem', color: '#8a7a6a' }}>{nextChapter.title}</div>
              </Link>
            ) : <div style={{ flex: 1, opacity: 0.3, fontSize: '0.75rem', color: '#b49050', textAlign: 'right' }}>已是最新章 →</div>}
          </div>
        </footer>
      </article>
    </main>
  )
}
