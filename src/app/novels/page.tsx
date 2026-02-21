import Link from 'next/link'
import { Metadata } from 'next'
import novelsData from '@/data/novels.json'

export const metadata: Metadata = {
  title: '連載小說 | Surprise Corner',
  description: '探索精彩的原創連載小說',
}

export default function NovelsPage() {
  return (
    <>
      <style>{`
        .novels-page { min-height: 100vh; background: #0a0a0f; color: #e8e0d0; font-family: Georgia, serif; padding: 0 0 80px; }
        .novels-header { text-align: center; padding: 80px 24px 60px; border-bottom: 1px solid rgba(255,255,255,0.06); background: linear-gradient(180deg,#0f0f1a 0%,#0a0a0f 100%); }
        .novels-title { font-size: 3.5rem; font-weight: 400; letter-spacing: 0.15em; color: #f0e8d8; margin: 0 0 12px; }
        .novels-subtitle { font-size: 0.95rem; color: #8a7a6a; letter-spacing: 0.3em; margin: 0; }
        .novels-grid { max-width: 900px; margin: 0 auto; padding: 60px 24px 0; display: flex; flex-direction: column; }
        .novel-card { display: flex; gap: 32px; padding: 36px 0; border-bottom: 1px solid rgba(255,255,255,0.05); text-decoration: none; color: inherit; transition: all 0.3s; position: relative; }
        .novel-card:hover { padding-left: 16px; }
        .novel-card::before { content: ''; position: absolute; left: 0; top: 50%; transform: translateY(-50%); width: 2px; height: 0; background: #b49050; transition: height 0.3s; }
        .novel-card:hover::before { height: 60%; }
        .novel-cover { flex-shrink: 0; width: 100px; height: 140px; }
        .novel-cover-placeholder { width: 100%; height: 100%; background: linear-gradient(135deg,#1a1a2e,#16213e,#0f3460); border: 1px solid rgba(180,144,80,0.3); display: flex; align-items: center; justify-content: center; font-size: 2.5rem; color: rgba(180,144,80,0.6); }
        .novel-info { flex: 1; display: flex; flex-direction: column; gap: 8px; }
        .novel-genre { font-size: 0.75rem; letter-spacing: 0.2em; color: #b49050; }
        .novel-name { font-size: 1.9rem; font-weight: 400; margin: 0; color: #f0e8d8; }
        .novel-author { font-size: 0.85rem; color: #7a6a5a; margin: 0; }
        .novel-desc { font-size: 1rem; color: #a09080; line-height: 1.7; margin: 4px 0; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        .novel-meta { display: flex; align-items: center; gap: 16px; font-size: 0.8rem; color: #6a5a4a; }
        .novel-status { padding: 2px 10px; border-radius: 20px; font-size: 0.75rem; }
        .novel-status-ongoing { background: rgba(80,180,120,0.15); color: #50b478; border: 1px solid rgba(80,180,120,0.2); }
        .novel-status-completed { background: rgba(100,100,180,0.15); color: #8080c0; border: 1px solid rgba(100,100,180,0.2); }
        .novel-tags { display: flex; gap: 8px; flex-wrap: wrap; }
        .novel-tag { font-size: 0.75rem; color: #6a5a4a; }
      `}</style>
      <main className="novels-page">
        <header className="novels-header">
          <h1 className="novels-title">連載小說</h1>
          <p className="novels-subtitle">每週更新 · 原創故事</p>
        </header>

        <div className="novels-grid">
          {novelsData.map((novel) => (
            <Link key={novel.id} href={`/novels/${novel.id}`} className="novel-card">
              <div className="novel-cover">
                <div className="novel-cover-placeholder">
                  <span>{novel.title[0]}</span>
                </div>
              </div>
              <div className="novel-info">
                <span className="novel-genre">{novel.genre}</span>
                <h2 className="novel-name">{novel.title}</h2>
                <p className="novel-author">作者：{novel.author}</p>
                <p className="novel-desc">{novel.description}</p>
                <div className="novel-meta">
                  <span className={`novel-status ${novel.status === '連載中' ? 'novel-status-ongoing' : 'novel-status-completed'}`}>
                    {novel.status}
                  </span>
                  <span>共 {novel.totalChapters} 章</span>
                  <span>更新於 {novel.updatedAt}</span>
                </div>
                <div className="novel-tags">
                  {novel.tags.map(tag => (
                    <span key={tag} className="novel-tag">#{tag}</span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </>
  )
}