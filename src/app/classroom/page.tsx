'use client';
// 📄 路徑：src/app/classroom/page.tsx
// 小教室 — 籌備中

import Link from 'next/link';
import ShareButtons from '@/components/ShareButtons';

const LIVE_ACADEMIES = [
  { icon: '📈', title: '股市學院', desc: 'K線怎麼看？法人籌碼是什麼？用最白話的方式，帶你看懂股市的基本語言。', href: '/classroom/stock' },
];

const COMING_TOPICS = [
  { icon: '🧠', title: '心理學院', desc: '每篇5分鐘，讀懂一個心理學概念。依附、防禦、認知偏誤……從日常角度出發，不燒腦。' },
  { icon: '💰', title: '理財學院', desc: '存錢、記帳、保險、ETF……從日常理財到長期規劃，一步一步來。' },
  { icon: '🤖', title: 'AI 工具學院', desc: '哪些 AI 工具值得用？怎麼下 prompt？實用教學，不廢話，直接上手。' },
  { icon: '✍️', title: '創作學院', desc: '如何開始寫作？怎麼克服空白頁恐懼？陪你從第一句話開始。' },
  { icon: '🔬', title: '科學學院', desc: '量子力學、相對論、演化論……用你看得懂的語言，講清楚那些聽起來很難的科學。' },
  { icon: '🌍', title: '人文學院', desc: '歷史、哲學、社會學……幫你建立思考框架，看懂這個世界為什麼是這樣。' },
];

export default function ClassroomPage() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f0a1e 0%, #1a0533 50%, #0a1628 100%)',
      padding: '2rem 1rem 6rem',
    }}>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>

        {/* 標題 */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{ fontSize: '3.5rem', marginBottom: '0.8rem' }}>🏫</div>
          <h1 style={{
            color: '#fff', fontSize: '2rem', fontWeight: 900,
            margin: '0 0 0.3rem',
            background: 'linear-gradient(135deg, #fff 0%, #c4b5fd 60%, #f0abfc 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>
            驚喜學院
          </h1>
          <p style={{ color: '#9ca3af', fontSize: '0.95rem', lineHeight: 1.7, margin: '0 0 1rem' }}>
            走進小門，發現大世界
          </p>
        </div>

        {/* 已開放的學院 */}
        <p style={{ color: '#6b7280', fontSize: '0.75rem', letterSpacing: '0.1em', margin: '0 0 1rem 0.2rem' }}>
          現在開課
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
          {LIVE_ACADEMIES.map(t => (
            <Link key={t.title} href={t.href} style={{
              background: 'rgba(52,211,153,0.06)',
              border: '1px solid rgba(52,211,153,0.3)',
              borderRadius: '16px', padding: '1.4rem 1.5rem',
              display: 'flex', gap: '1rem', alignItems: 'flex-start',
              textDecoration: 'none',
            }}>
              <span style={{ fontSize: '2rem', flexShrink: 0 }}>{t.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ color: '#6ee7b7', fontWeight: 700, fontSize: '1rem', marginBottom: '0.3rem' }}>
                  {t.title}
                </div>
                <div style={{ color: '#6b7280', fontSize: '0.85rem', lineHeight: 1.6 }}>
                  {t.desc}
                </div>
              </div>
              <div style={{
                flexShrink: 0, alignSelf: 'center',
                color: '#34d399', fontSize: '0.72rem', fontWeight: 700,
              }}>
                進入學院 →
              </div>
            </Link>
          ))}
        </div>

        {/* 即將推出的主題 */}
        <p style={{ color: '#6b7280', fontSize: '0.75rem', letterSpacing: '0.1em', margin: '0 0 1rem 0.2rem' }}>
          即將推出的主題
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '3rem' }}>
          {COMING_TOPICS.map(t => (
            <div key={t.title} style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px dashed rgba(167,139,250,0.25)',
              borderRadius: '16px', padding: '1.4rem 1.5rem',
              display: 'flex', gap: '1rem', alignItems: 'flex-start',
            }}>
              <span style={{ fontSize: '2rem', flexShrink: 0 }}>{t.icon}</span>
              <div>
                <div style={{ color: '#e9d5ff', fontWeight: 700, fontSize: '1rem', marginBottom: '0.3rem' }}>
                  {t.title}
                </div>
                <div style={{ color: '#6b7280', fontSize: '0.85rem', lineHeight: 1.6 }}>
                  {t.desc}
                </div>
              </div>
              <div style={{
                flexShrink: 0, alignSelf: 'center',
                color: '#4b5563', fontSize: '0.72rem', fontWeight: 700,
              }}>
                🔨 即將推出
              </div>
            </div>
          ))}
        </div>

        {/* LINE 訂閱通知 */}
        <div style={{
          background: 'rgba(0,185,0,0.08)',
          border: '1px solid rgba(0,185,0,0.25)',
          borderRadius: '16px', padding: '1.5rem',
          textAlign: 'center', marginBottom: '3rem',
        }}>
          <div style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>💬</div>
          <p style={{ color: '#4ade80', fontWeight: 700, fontSize: '1rem', margin: '0 0 0.4rem' }}>
            想第一個知道驚喜學院開課？
          </p>
          <p style={{ color: '#6b7280', fontSize: '0.85rem', margin: '0 0 1rem' }}>
            加入 LINE，新學院開放第一時間通知你
          </p>
          <a
            href="https://line.me/R/ti/p/@983agawb"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              background: '#00B900', color: '#fff',
              fontWeight: 700, padding: '0.65rem 2rem',
              borderRadius: '30px', textDecoration: 'none', fontSize: '0.9rem',
            }}
          >
            加入 LINE 訂閱通知
          </a>
        </div>

        {/* 分享 */}
        <div style={{ marginBottom: '2rem' }}>
          <p style={{ color: '#6b7280', fontSize: '0.8rem', textAlign: 'center', marginBottom: '0.8rem' }}>
            覺得有趣？先分享給朋友，一起等開課 👇
          </p>
          <ShareButtons title="驚喜學院 — 即將開課！" content="股市、心理學、AI工具……走進小門，發現大世界！快來訂閱搶先知道！" />
        </div>

        {/* 返回 */}
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <Link href="/" style={{
            color: '#7c3aed', fontSize: '0.9rem', textDecoration: 'none', fontWeight: 600,
          }}>← 回首頁</Link>
        </div>

      </div>
    </div>
  );
}
