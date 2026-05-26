import Link from 'next/link';

const FREE_READS = [
  {
    id: 'the-last-signal',
    title: '最後的信號',
    desc: '工程師意外截獲來自深空的訊號，解碼過程中逐漸發現隱藏組織的秘密。',
    emoji: '📡',
    tag: '科幻連載・免費',
    tagColor: '#22d3ee',
    href: '/novels/the-last-signal/ebook',
  },
  {
    id: 'lulu-diary',
    title: '默默的日記',
    desc: '普通上班族與 AI 助理的日常，記錄那些微小卻真實的生活片段。',
    emoji: '🤖',
    tag: '日常連載・免費',
    tagColor: '#a78bfa',
    href: '/novels/lulu-diary/ebook',
  },
  {
    id: 'that-feeling',
    title: '那個感覺 系列',
    desc: '台灣在地靈異・世界各地奇談・科學解釋，短篇故事集，六冊共 36 篇。',
    emoji: '👁️',
    tag: '靈異短篇・試讀',
    tagColor: '#f472b6',
    href: '/novels/that-feeling/ebook',
  },
  {
    id: 'psychology',
    title: '心理學圖書館',
    desc: '暗黑、認知、成長、人格、關係、潛意識，28 冊心理學電子書，首章免費試讀。',
    emoji: '🧠',
    tag: '心理學・試讀',
    tagColor: '#34d399',
    href: '/novels/psychology/ebook',
  },
];

export default function SurpriseGoodies() {
  return (
    <main style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #1a1040 100%)',
      color: '#fff',
      padding: '3rem 1.2rem 4rem',
    }}>
      <div style={{ maxWidth: '520px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ fontSize: '2.8rem', marginBottom: '0.5rem' }}>🍭</div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 900, margin: 0 }}>驚喜好料</h1>
          <p style={{ color: '#7c6fa0', fontSize: '0.85rem', marginTop: '0.5rem' }}>
            免費試讀、連載閱讀，還有小舖獨家好康
          </p>
        </div>

        {/* 免費閱讀區 */}
        <h2 style={{ fontSize: '0.75rem', fontWeight: 700, color: '#a855f7', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem' }}>
          ✨ 免費閱讀
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2.5rem' }}>
          {FREE_READS.map(book => (
            <a key={book.id} href={book.href}
              style={{
                display: 'flex', alignItems: 'center', gap: '1rem',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(168,85,247,0.3)',
                borderRadius: '16px', padding: '1rem 1.1rem',
                textDecoration: 'none', color: '#fff',
                transition: 'border-color 0.2s',
              }}>
              <span style={{ fontSize: '1.8rem', flexShrink: 0 }}>{book.emoji}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>{book.title}</span>
                  <span style={{
                    fontSize: '0.65rem', fontWeight: 700, padding: '2px 8px',
                    borderRadius: '20px', border: `1px solid ${book.tagColor}`,
                    color: book.tagColor, whiteSpace: 'nowrap',
                  }}>{book.tag}</span>
                </div>
                <p style={{ color: '#7c6fa0', fontSize: '0.78rem', margin: '0.25rem 0 0', lineHeight: 1.5 }}>
                  {book.desc}
                </p>
              </div>
              <span style={{ color: '#a855f7', fontSize: '0.85rem', flexShrink: 0 }}>→</span>
            </a>
          ))}
        </div>

        {/* 前往小舖領更多好康 */}
        <div style={{
          background: 'rgba(251,191,36,0.08)',
          border: '1px solid rgba(251,191,36,0.35)',
          borderRadius: '20px',
          padding: '1.4rem 1.2rem',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: '1.6rem', marginBottom: '0.4rem' }}>🎁</div>
          <p style={{ fontWeight: 700, fontSize: '0.95rem', margin: '0 0 0.3rem' }}>還有更多好康在小舖</p>
          <p style={{ color: '#7c6fa0', fontSize: '0.78rem', margin: '0 0 1rem', lineHeight: 1.5 }}>
            那個感覺系列會員免費閱讀、收租AI 股票工具體驗、神秘贈品⋯
          </p>
          <a href="https://still-time-corner.vercel.app/my-perks"
            target="_blank" rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              background: 'linear-gradient(135deg, #f59e0b, #d97706)',
              color: '#fff', fontWeight: 700, fontSize: '0.9rem',
              padding: '10px 28px', borderRadius: '50px',
              textDecoration: 'none',
              boxShadow: '0 4px 16px rgba(245,158,11,0.4)',
            }}>
            前往小舖領好康 ↗
          </a>
        </div>

        <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
          <Link href="/" style={{ color: '#4a4868', fontSize: '0.8rem', textDecoration: 'none' }}>
            ← 回首頁
          </Link>
        </div>
      </div>
    </main>
  );
}
