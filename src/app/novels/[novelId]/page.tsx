import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import novelsData from '@/data/novels.json'
import chaptersData from '@/data/chapters.json'

interface Props { params: Promise<{ novelId: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { novelId } = await params
  const novel = novelsData.find(n => n.id === novelId)
  if (!novel) return { title: '找不到小說' }
  return { title: `${novel.title} | 連載小說`, description: novel.description }
}

export default async function NovelDetailPage({ params }: Props) {
  const { novelId } = await params
  const novel = novelsData.find(n => n.id === novelId)
  if (!novel) notFound()

  const chapters = (chaptersData as any[])
    .filter(c => c.novelId === novelId && c.isPublished)
    .sort((a, b) => a.chapterNumber - b.chapterNumber)

  return (
    <main style={{ minHeight: '100vh', background: '#0a0a0f', color: '#e8e0d0', fontFamily: 'Georgia, serif' }}>
      <section style={{ position: 'relative', padding: '0 0 60px', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,#0f0f1a 0%,#0a0a0f 100%)' }} />
        <div style={{ position: 'relative', maxWidth: 900, margin: '0 auto', padding: '40px 24px 0' }}>
          <Link href="/novels" style={{ display: 'inline-block', fontSize: '0.85rem', color: '#6a5a4a', textDecoration: 'none', marginBottom: 40 }}>
            ← 返回書庫
          </Link>
          <div style={{ display: 'flex', gap: 48, alignItems: 'flex-start' }}>
            <div style={{ flexShrink: 0, width: 160, height: 225, background: 'linear-gradient(135deg,#1a1a2e,#16213e,#0f3460)', border: '1px solid rgba(180,144,80,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '4rem', color: 'rgba(180,144,80,0.5)' }}>
              <span>{novel.title[0]}</span>
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <span style={{ display: 'inline-block', fontSize: '0.75rem', letterSpacing: '0.25em', color: '#b49050', border: '1px solid rgba(180,144,80,0.3)', padding: '3px 12px', width: 'fit-content' }}>
                {novel.genre}
              </span>
              <h1 style={{ fontSize: '2.5rem', fontWeight: 400, margin: 0, color: '#f0e8d8' }}>{novel.title}</h1>
              <p style={{ fontSize: '0.9rem', color: '#7a6a5a', margin: 0 }}>作者：{novel.author}</p>
              <p style={{ fontSize: '0.95rem', color: '#9a8a7a', lineHeight: 1.8, margin: '8px 0' }}>{novel.description}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 24, padding: '20px 0', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <span style={{ fontSize: '1rem', color: '#d0c0a0' }}>{novel.totalChapters}</span>
                  <span style={{ fontSize: '0.7rem', color: '#5a4a3a' }}>章節</span>
                </div>
                <div style={{ width: 1, height: 30, background: 'rgba(255,255,255,0.06)' }} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <span style={{ fontSize: '1rem', color: '#d0c0a0' }}>{novel.status}</span>
                  <span style={{ fontSize: '0.7rem', color: '#5a4a3a' }}>狀態</span>
                </div>
                <div style={{ width: 1, height: 30, background: 'rgba(255,255,255,0.06)' }} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <span style={{ fontSize: '1rem', color: '#d0c0a0' }}>{novel.updatedAt}</span>
                  <span style={{ fontSize: '0.7rem', color: '#5a4a3a' }}>最新更新</span>
                </div>
              </div>
              {chapters.length > 0 && (
                <Link href={`/novels/${novel.id}/${chapters[0].id}`} style={{ display: 'inline-block', background: 'rgba(180,144,80,0.12)', border: '1px solid rgba(180,144,80,0.4)', color: '#c0a060', textDecoration: 'none', padding: '12px 32px', fontSize: '0.9rem', letterSpacing: '0.15em', width: 'fit-content', marginTop: 8 }}>
                  開始閱讀
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '60px 24px 80px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <h2 style={{ fontSize: '0.85rem', letterSpacing: '0.3em', color: '#5a4a3a', fontWeight: 400, margin: '0 0 32px', paddingBottom: 16, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            章節目錄
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {chapters.map((chapter: any) => (
              <Link key={chapter.id} href={`/novels/${novel.id}/${chapter.id}`} style={{ display: 'flex', alignItems: 'center', gap: 24, padding: '20px 0', borderBottom: '1px solid rgba(255,255,255,0.04)', textDecoration: 'none', color: 'inherit' }}>
                <span style={{ fontSize: '2rem', color: 'rgba(90,74,58,0.4)', minWidth: 48 }}>
                  {String(chapter.chapterNumber).padStart(2, '0')}
                </span>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <span style={{ fontSize: '1.05rem', color: '#d0c0a8' }}>{chapter.title}</span>
                  <span style={{ fontSize: '0.78rem', color: '#5a4a3a' }}>{chapter.publishedAt} · {chapter.wordCount} 字</span>
                </div>
                <span style={{ fontSize: '1rem', color: '#b49050' }}>→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}