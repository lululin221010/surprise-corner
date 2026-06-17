'use client';
// 📄 路徑：src/app/classroom/page.tsx
// 小教室入口 — 驚喜學院

import Link from 'next/link';
import ShareButtons from '@/components/ShareButtons';
import './classroom.css';

const LIVE_ACADEMIES = [
  { icon: '📈', title: '股市書院', desc: 'K線怎麼看？法人籌碼是什麼？用最白話的方式，帶你看懂股市的基本語言。', href: '/classroom/stock' },
  { icon: '🎁', title: '好康書院', desc: '各書院精選第一組，完全免費。心理學、股市……喜歡再去小舖買完整版。', href: '/classroom/bonus' },
];

const COMING_TOPICS = [
  { icon: '🧠', title: '心理學書院', desc: '每篇5分鐘，讀懂一個心理學概念。依附、防禦、認知偏誤……從日常角度出發，不燒腦。' },
  { icon: '💰', title: '理財書院', desc: '存錢、記帳、保險、ETF……從日常理財到長期規劃，一步一步來。' },
  { icon: '🤖', title: 'AI工具書院', desc: '哪些 AI 工具值得用？怎麼下 prompt？實用教學，不廢話，直接上手。' },
  { icon: '✍️', title: '創作書院', desc: '如何開始寫作？怎麼克服空白頁恐懼？陪你從第一句話開始。' },
  { icon: '🔬', title: '科學書院', desc: '量子力學、相對論、演化論……用你看得懂的語言，講清楚那些聽起來很難的科學。' },
  { icon: '🌍', title: '人文書院', desc: '歷史、哲學、社會學……幫你建立思考框架，看懂這個世界為什麼是這樣。' },
];

export default function ClassroomPage() {
  return (
    <div className="classroom-content">

      {/* 標題 */}
      <div style={{ textAlign: 'center', marginBottom: '2rem', paddingTop: '1rem' }}>
        <div style={{ fontSize: '3rem', marginBottom: '0.6rem' }}>🏫</div>
        <h1 style={{ color: '#1e1b4b', fontSize: '1.8rem', fontWeight: 800, margin: '0 0 0.3rem' }}>
          驚喜學院
        </h1>
        <p style={{ color: '#6b7280', fontSize: '0.9rem', margin: 0 }}>
          走進小門，發現大世界
        </p>
      </div>

      {/* 已開放的學院 */}
      <p style={{ color: '#a78bfa', fontSize: '0.72rem', letterSpacing: '0.1em', margin: '0 0 0.8rem 0.2rem', fontWeight: 600 }}>
        現在開課
      </p>
      <div style={{ marginBottom: '1.5rem' }}>
        {LIVE_ACADEMIES.map(t => (
          <Link key={t.title} href={t.href} style={{ textDecoration: 'none' }}>
            <div className="course-list-item" style={{
              padding: '1.2rem 1.4rem', borderRadius: '14px',
              border: '1px solid #c4b5fd', background: '#faf5ff',
            }}>
              <span style={{ fontSize: '1.8rem', flexShrink: 0 }}>{t.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ color: '#1e1b4b', fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.25rem' }}>
                  {t.title}
                </div>
                <div style={{ color: '#6b7280', fontSize: '0.82rem', lineHeight: 1.6 }}>
                  {t.desc}
                </div>
              </div>
              <div style={{ color: '#7c3aed', fontSize: '0.78rem', fontWeight: 700, flexShrink: 0 }}>
                進入學院 →
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* 即將推出 */}
      <p style={{ color: '#a78bfa', fontSize: '0.72rem', letterSpacing: '0.1em', margin: '0 0 0.8rem 0.2rem', fontWeight: 600 }}>
        即將推出的學院
      </p>
      <div style={{ marginBottom: '2rem' }}>
        {COMING_TOPICS.map(t => (
          <div key={t.title} className="course-list-item locked" style={{ padding: '1rem 1.4rem', borderRadius: '12px' }}>
            <span style={{ fontSize: '1.6rem', flexShrink: 0 }}>{t.icon}</span>
            <div style={{ flex: 1 }}>
              <div style={{ color: '#1e1b4b', fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.15rem' }}>
                {t.title}
              </div>
              <div style={{ color: '#9ca3af', fontSize: '0.8rem', lineHeight: 1.5 }}>
                {t.desc}
              </div>
            </div>
            <div style={{ color: '#c4b5fd', fontSize: '0.72rem', flexShrink: 0 }}>🔨 籌備中</div>
          </div>
        ))}
      </div>

      {/* LINE 訂閱 */}
      <div style={{
        background: '#f0fdf4', border: '1px solid #bbf7d0',
        borderRadius: '14px', padding: '1.4rem',
        textAlign: 'center', marginBottom: '2rem',
      }}>
        <div style={{ fontSize: '1.6rem', marginBottom: '0.4rem' }}>💬</div>
        <p style={{ color: '#15803d', fontWeight: 700, fontSize: '0.95rem', margin: '0 0 0.3rem' }}>
          想第一個知道驚喜學院開課？
        </p>
        <p style={{ color: '#6b7280', fontSize: '0.82rem', margin: '0 0 1rem' }}>
          加入 LINE，新學院開放第一時間通知你
        </p>
        <a
          href="https://line.me/R/ti/p/@983agawb"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-block',
            background: '#00B900', color: '#fff',
            fontWeight: 700, padding: '0.6rem 1.8rem',
            borderRadius: '30px', textDecoration: 'none', fontSize: '0.88rem',
          }}
        >
          加入 LINE 訂閱通知
        </a>
      </div>

      {/* 分享 */}
      <div style={{ marginBottom: '1.5rem' }}>
        <p style={{ color: '#9ca3af', fontSize: '0.78rem', textAlign: 'center', marginBottom: '0.8rem' }}>
          覺得有趣？先分享給朋友，一起等開課 👇
        </p>
        <ShareButtons title="驚喜學院 — 即將開課！" content="股市、心理學、AI工具……走進小門，發現大世界！快來訂閱搶先知道！" />
      </div>

      {/* 我的證書 + 商店 */}
      <div style={{ display: 'flex', gap: '0.6rem', justifyContent: 'center', marginBottom: '1rem', flexWrap: 'wrap' }}>
        <Link href="/classroom/my-certs" style={{
          display: 'inline-flex', alignItems: 'center', gap: '6px',
          background: '#faf5ff', border: '1px solid #c4b5fd',
          borderRadius: '20px', padding: '8px 18px',
          color: '#7c3aed', fontSize: '0.85rem', textDecoration: 'none', fontWeight: 600,
        }}>
          🏅 我的榮譽證書
        </Link>
        <Link href="/classroom/shop" style={{
          display: 'inline-flex', alignItems: 'center', gap: '6px',
          background: '#fef9c3', border: '1px solid #fde68a',
          borderRadius: '20px', padding: '8px 18px',
          color: '#92400e', fontSize: '0.85rem', textDecoration: 'none', fontWeight: 600,
        }}>
          🛒 金幣商店
        </Link>
      </div>

      {/* 返回 */}
      <div style={{ textAlign: 'center', marginTop: '0.5rem' }}>
        <Link href="/" style={{ color: '#7c3aed', fontSize: '0.88rem', textDecoration: 'none', fontWeight: 600 }}>
          ← 回首頁
        </Link>
      </div>

    </div>
  );
}
