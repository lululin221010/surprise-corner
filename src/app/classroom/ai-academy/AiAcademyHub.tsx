'use client';
// 📄 路徑：src/app/classroom/ai-academy/AiAcademyHub.tsx
// AI書院總覽頁 — 列出九大系列，已上線的可點進去，其餘顯示籌備中

import Link from 'next/link';
import '../classroom.css';

const AI_SERIES = [
  { n: 1, emoji: '🕰️', title: 'AI是什麼做的', desc: '從歷史演進到完整運作全貌', href: '/classroom/ai', live: true },
  { n: 2, emoji: '🔬', title: 'AI解剖學', desc: '從構造、產生到操作，把AI從裡到外拆給你看', href: '/classroom/ai-anatomy', live: true },
  { n: 3, emoji: '💬', title: 'AI怎麼傳訊溝通', desc: '從Prompt理解、Agent行動到AI記憶', href: '/classroom/ai-communication', live: true },
  { n: 4, emoji: '🤔', title: 'AI與人類思考差異', desc: '搞懂AI跟人類想事情的根本不同', href: '/classroom/ai-thinking', live: true },
  { n: 5, emoji: '🤝', title: '互動共存', desc: '工作、信任、教育——AI時代怎麼當一個人', href: '/classroom/ai-coexist', live: true },
  { n: 6, emoji: '🧬', title: 'AI心理學', desc: '自我意識、幻覺、偏見的心理拆解', href: '/classroom/ai-psychology-hub', live: true },
  { n: 7, emoji: '🛠️', title: 'DIY AI 實作', desc: '從免費工具到自架本地AI', href: '', live: false },
  { n: 8, emoji: '🛡️', title: 'AI世界局勢', desc: '安全、失控邊界、國家競爭', href: '', live: false },
  { n: 9, emoji: '🤖', title: '機器人／具身智能', desc: '機器人怎麼動、怎麼想、會取代誰', href: '', live: false },
];

export default function AiAcademyHub() {
  return (
    <div className="classroom-content">
      <div style={{ maxWidth: 680, margin: '0 auto' }}>

        {/* 麵包屑 */}
        <div style={{ marginBottom: '0.5rem', display: 'flex', gap: '0.4rem', fontSize: '0.78rem', color: '#7c3aed' }}>
          <Link href="/classroom" style={{ color: '#7c3aed', textDecoration: 'none' }}>驚喜學院</Link>
          <span style={{ color: '#c4b5fd' }}>›</span>
          <span style={{ color: '#1e1b4b', fontWeight: 600 }}>AI書院</span>
        </div>

        {/* 標題 */}
        <div style={{ marginBottom: '1.8rem' }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.3rem' }}>🤖</div>
          <h1 style={{ color: '#1e1b4b', fontSize: '1.6rem', fontWeight: 800, margin: 0 }}>AI書院</h1>
          <p style={{ color: '#4b5563', fontSize: '0.92rem', marginTop: '0.5rem', lineHeight: 1.6 }}>
            9大系列，從AI原理到實作，全面理解AI時代。系列1~6已上線，更多系列陸續開課。
          </p>
        </div>

        {/* 系列列表 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem', marginBottom: '2rem' }}>
          {AI_SERIES.map(s => (
            s.live ? (
              <Link key={s.n} href={s.href} style={{ textDecoration: 'none' }}>
                <div style={{
                  background: '#faf5ff', border: '1px solid #c4b5fd',
                  borderRadius: '12px', padding: '1rem 1.2rem',
                  display: 'flex', alignItems: 'center', gap: '0.9rem', cursor: 'pointer',
                }}>
                  <div style={{ fontSize: '1.5rem', flexShrink: 0 }}>{s.emoji}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ color: '#4c1d95', fontSize: '0.7rem', fontWeight: 600, marginBottom: '0.2rem' }}>
                      系列{s.n}
                    </div>
                    <div style={{ color: '#1e1b4b', fontWeight: 700, fontSize: '0.92rem' }}>{s.title}</div>
                    <div style={{ color: '#6b7280', fontSize: '0.8rem', marginTop: '0.1rem' }}>{s.desc}</div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.3rem', flexShrink: 0 }}>
                    <span style={{ background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.3)', color: '#7c3aed', fontSize: '0.7rem', padding: '0.15rem 0.5rem', borderRadius: '10px' }}>已上線</span>
                    <span style={{ color: '#7c3aed', fontSize: '0.85rem', fontWeight: 700 }}>進入 →</span>
                  </div>
                </div>
              </Link>
            ) : (
              <div key={s.n} className="course-list-item locked" style={{
                borderRadius: '12px', padding: '1rem 1.2rem',
                display: 'flex', alignItems: 'center', gap: '0.9rem',
              }}>
                <div style={{ fontSize: '1.5rem', flexShrink: 0 }}>{s.emoji}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ color: '#9ca3af', fontSize: '0.7rem', fontWeight: 600, marginBottom: '0.2rem' }}>
                    系列{s.n}
                  </div>
                  <div style={{ color: '#6b7280', fontWeight: 600, fontSize: '0.9rem' }}>{s.title}</div>
                  <div style={{ color: '#9ca3af', fontSize: '0.78rem', marginTop: '0.1rem' }}>{s.desc}</div>
                </div>
                <div style={{ color: '#c4b5fd', fontSize: '0.72rem', flexShrink: 0 }}>🔨 籌備中</div>
              </div>
            )
          ))}
        </div>

        {/* 返回 */}
        <div style={{ textAlign: 'center' }}>
          <Link href="/classroom" style={{ color: '#7c3aed', fontSize: '0.85rem', textDecoration: 'none' }}>
            ← 回驚喜學院
          </Link>
        </div>

      </div>
    </div>
  );
}
