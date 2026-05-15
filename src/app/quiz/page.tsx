'use client';
import Link from 'next/link';

const QUIZZES = [
  {
    slug: 'attachment',
    emoji: '🔗',
    title: '你的依附類型是哪一種？',
    description: '不是測你「愛不愛人」，是測你怎麼在親密裡生存。',
    time: '約 3 分鐘',
    ready: true,
    color: '#ec4899',
  },
  {
    slug: 'defense',
    emoji: '🛡',
    title: '你用哪種防禦機制保護自己？',
    description: '否認、投射、合理化——你的大腦在幫你擋什麼？',
    time: '約 3 分鐘',
    ready: true,
    color: '#8b5cf6',
  },
  {
    slug: 'trauma-response',
    emoji: '⚡',
    title: '你的創傷反應是哪一型？',
    description: 'Fight / Flight / Freeze / Fawn——壓力來了你的身體怎麼反應。',
    time: '約 3 分鐘',
    ready: true,
    color: '#f59e0b',
  },
  {
    slug: 'self-drain',
    emoji: '🕳',
    title: '你有多擅長把自己搞垮？',
    description: '自我內耗不是脆弱，是一種長期養成的思考習慣。',
    time: '約 3 分鐘',
    ready: true,
    color: '#6366f1',
  },
  {
    slug: 'never-wrong',
    emoji: '🔮',
    title: '錯的永遠不是我？',
    description: '責任感盲區——你有多難開口說「是我的問題」？',
    time: '約 3 分鐘',
    ready: true,
    color: '#dc2626',
  },
  {
    slug: 'self-doubt',
    emoji: '🌫',
    title: '你的內在批評者有多大聲？',
    description: '自我懷疑不是謙遜，那個聲音從哪裡來、說了什麼。',
    time: '約 3 分鐘',
    ready: true,
    color: '#0ea5e9',
  },
  {
    slug: 'no-good-people',
    emoji: '🌑',
    title: '你相信這世界有好人嗎？',
    description: '信任創傷測驗——你對人的防備，是怎麼被養出來的。',
    time: '約 3 分鐘',
    ready: true,
    color: '#7c3aed',
  },
  {
    slug: 'only-good-people',
    emoji: '🌸',
    title: '你是不是太相信這世界的好？',
    description: '天真型防禦——善良有時是一種你沒發現的迴避方式。',
    time: '約 3 分鐘',
    ready: false,
    color: '#10b981',
  },
  {
    slug: 'family-wounds',
    emoji: '🏚',
    title: '你從原生家庭帶走了什麼？',
    description: '你現在的某些反應，是很小的時候學會的生存方式。',
    time: '約 4 分鐘',
    ready: false,
    color: '#f97316',
  },
  {
    slug: 'social-pressure',
    emoji: '👁',
    title: '你有多在乎別人怎麼看你？',
    description: '社會輿論綁架測驗——臉面、眼光與你的日常決策。',
    time: '約 3 分鐘',
    ready: true,
    color: '#a855f7',
  },
  {
    slug: 'procrastination',
    emoji: '⏳',
    title: '你為什麼拖延？',
    description: '完美主義、恐懼失敗、還是根本不想做——原因不同解法不同。',
    time: '約 3 分鐘',
    ready: true,
    color: '#84cc16',
  },
  {
    slug: 'dark-side',
    emoji: '🧬',
    title: '你的心理黑暗面是哪一型？',
    description: '控制者、破壞者、面具、逃離者——四種類型，你是哪一個？',
    time: '約 4 分鐘',
    ready: false,
    color: '#9333ea',
  },
];

export default function QuizListPage() {
  const ready = QUIZZES.filter(q => q.ready);
  const coming = QUIZZES.filter(q => !q.ready);

  return (
    <main style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #1a1040 100%)',
      color: '#fff', padding: '0 0 5rem',
    }}>
      <div style={{ maxWidth: '820px', margin: '0 auto', padding: '3rem 1.4rem 0' }}>

        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{ fontSize: '0.72rem', letterSpacing: '0.2em', color: '#4a4868', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
            心理測驗庫
          </div>
          <h1 style={{
            fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', fontWeight: 900, margin: '0 0 0.7rem',
            background: 'linear-gradient(135deg, #fff 0%, #c4b5fd 55%, #f0abfc 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>
            你真的了解自己嗎？
          </h1>
          <p style={{ color: '#6b5a8a', fontSize: '0.9rem', maxWidth: '420px', margin: '0 auto', lineHeight: 1.7 }}>
            每個測驗都有深度——10 題情境、完整解析、讀完有被看穿的感覺。
          </p>
        </div>

        {/* 引導測驗入口 */}
        <Link href="/quiz/intro" style={{ textDecoration: 'none', display: 'block', marginBottom: '2.5rem' }}>
          <div style={{
            background: 'linear-gradient(135deg, rgba(124,58,237,0.15), rgba(236,72,153,0.1))',
            border: '1px solid rgba(139,92,246,0.4)',
            borderRadius: '20px', padding: '2rem',
            transition: 'transform 0.2s',
          }}
            onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-3px)')}
            onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.8rem' }}>
              <span style={{ fontSize: '2rem' }}>🧭</span>
              <div>
                <div style={{ fontSize: '0.65rem', color: '#8b5cf6', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.2rem' }}>
                  先從這裡開始
                </div>
                <h2 style={{ color: '#f0eeff', fontWeight: 900, fontSize: '1.1rem', margin: 0 }}>
                  你的心理盲點在哪裡？
                </h2>
              </div>
            </div>
            <p style={{ color: '#7a788e', fontSize: '0.85rem', lineHeight: 1.65, margin: '0 0 1rem' }}>
              不是線性問卷，是一條會分叉的路——你的答案決定你走哪條路，最後推薦最適合你的深入測驗。
            </p>
            <span style={{ color: '#a855f7', fontWeight: 700, fontSize: '0.88rem' }}>找出我的盲點 →</span>
          </div>
        </Link>

        {/* 已上線 */}
        {ready.length > 0 && (
          <>
            <div style={{ fontSize: '0.72rem', color: '#6b5a8a', letterSpacing: '0.1em', marginBottom: '1rem', textTransform: 'uppercase' }}>
              ✦ 現在可以測
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem', marginBottom: '3rem' }}>
              {ready.map(q => (
                <Link key={q.slug} href={`/quiz/${q.slug}`} style={{ textDecoration: 'none' }}>
                  <div style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: `1px solid ${q.color}44`,
                    borderTop: `3px solid ${q.color}`,
                    borderRadius: '16px', padding: '1.6rem',
                    transition: 'transform 0.2s, border-color 0.2s',
                    cursor: 'pointer',
                  }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'; (e.currentTarget as HTMLElement).style.borderColor = q.color; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.borderColor = `${q.color}44`; }}
                  >
                    <div style={{ fontSize: '1.8rem', marginBottom: '0.7rem' }}>{q.emoji}</div>
                    <h2 style={{ color: '#f0eeff', fontWeight: 800, fontSize: '1rem', margin: '0 0 0.5rem', lineHeight: 1.4 }}>{q.title}</h2>
                    <p style={{ color: '#6b5a8a', fontSize: '0.82rem', lineHeight: 1.6, margin: '0 0 1rem' }}>{q.description}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ color: '#4a4060', fontSize: '0.72rem' }}>{q.time}</span>
                      <span style={{ color: q.color, fontSize: '0.82rem', fontWeight: 700 }}>開始 →</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}

        {/* 即將上線 */}
        <div style={{ fontSize: '0.72rem', color: '#4a4060', letterSpacing: '0.1em', marginBottom: '1rem', textTransform: 'uppercase' }}>
          即將上線
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '0.8rem' }}>
          {coming.map(q => (
            <div key={q.slug} style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '14px', padding: '1.3rem 1.4rem',
              opacity: 0.6,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
                <span style={{ fontSize: '1.3rem' }}>{q.emoji}</span>
                <span style={{ color: '#5a5070', fontSize: '0.88rem', fontWeight: 700 }}>{q.title}</span>
              </div>
              <p style={{ color: '#3d3558', fontSize: '0.78rem', lineHeight: 1.55, margin: 0 }}>{q.description}</p>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <Link href="/" style={{ color: '#4a4060', fontSize: '0.82rem', textDecoration: 'none' }}>← 回首頁</Link>
        </div>
      </div>
    </main>
  );
}
