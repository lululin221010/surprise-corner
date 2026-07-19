// 📄 檔案路徑：src/app/novels/page.tsx

import Link from 'next/link'
import { Metadata } from 'next'
import novelsData from '@/data/novels.json'

export const metadata: Metadata = {
  title: '小說連載 | 驚喜角落',
  description: '免費線上閱讀連載小說與精選作品，隨時更新。',
}

const novels = (novelsData as any[]).filter(n => n.category === 'serial' || n.category === 'preview')

export default function NovelsPage() {
  return (
    <>
      <style>{`
        .novels-page { min-height: 100vh; background: #0c0b08; color: #d8ccb8; font-family: Georgia, serif; padding: 60px 32px 80px; }
        .novels-header { max-width: 900px; margin: 0 auto 48px; text-align: center; }
        .novels-eyebrow { font-size: 0.75rem; letter-spacing: 0.4em; color: #b49050; margin-bottom: 16px; }
        .novels-title { font-size: 2rem; font-weight: 400; color: #e8dcc8; margin: 0; }
        .novels-grid { max-width: 900px; margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 24px; }
        .novel-card { display: flex; flex-direction: column; text-decoration: none; color: inherit; border: 1px solid rgba(180,144,80,0.15); border-radius: 8px; overflow: hidden; transition: all 0.2s; background: rgba(255,255,255,0.02); }
        .novel-card:hover { border-color: rgba(180,144,80,0.4); transform: translateY(-2px); }
        .novel-cover { width: 100%; aspect-ratio: 3/4; background: linear-gradient(135deg,#1a1a2e,#16213e,#0f3460); display: flex; align-items: center; justify-content: center; font-size: 2.4rem; color: rgba(180,144,80,0.6); overflow: hidden; }
        .novel-cover img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .novel-card-body { padding: 16px 18px 20px; display: flex; flex-direction: column; gap: 6px; flex: 1; }
        .novel-card-genre { font-size: 0.7rem; letter-spacing: 0.2em; color: #b49050; }
        .novel-card-title { font-size: 1.05rem; color: #e8dcc8; margin: 0; line-height: 1.4; }
        .novel-card-desc { font-size: 0.82rem; color: #8a7a6a; line-height: 1.6; flex: 1; }
        .novel-card-status { font-size: 0.72rem; color: #50b478; margin-top: 4px; }
        @media (max-width: 600px) {
          .novels-page { padding: 40px 20px 60px; }
        }
      `}</style>

      <main className="novels-page">
        <div className="novels-header">
          <p className="novels-eyebrow">✦ SURPRISE CORNER ✦</p>
          <h1 className="novels-title">小說連載</h1>
        </div>

        <div className="novels-grid">
          {novels.map(novel => (
            <Link key={novel.id} href={`/novels/${novel.id}`} className="novel-card">
              <div className="novel-cover">
                {novel.cover ? (
                  <img src={novel.cover} alt={novel.title} />
                ) : (
                  <span>{novel.title[0]}</span>
                )}
              </div>
              <div className="novel-card-body">
                <span className="novel-card-genre">{novel.genre}</span>
                <h2 className="novel-card-title">{novel.title}</h2>
                <p className="novel-card-desc">{novel.description}</p>
                <span className="novel-card-status">{novel.status}</span>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </>
  )
}
