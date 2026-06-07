'use client'

import Link from 'next/link'
import { useState } from 'react'
import ShareButtons from '@/components/ShareButtons'

// ── 36本書資料 ──────────────────────────────────────
const BOOKS = [
  // 系列 1：靈魂意識
  { series: 1, seriesName: '靈魂意識', seriesColor: '#6b4fa0', vol: 1, title: '你死了，然後呢？', trial: '/that-feeling-1-vol1-trial.html' },
  { series: 1, seriesName: '靈魂意識', seriesColor: '#6b4fa0', vol: 2, title: '靈魂出竅是真的嗎？', trial: '/that-feeling-1-vol2-trial.html' },
  { series: 1, seriesName: '靈魂意識', seriesColor: '#6b4fa0', vol: 3, title: '輪迴，有證據嗎？', trial: '/that-feeling-1-vol3-trial.html' },
  { series: 1, seriesName: '靈魂意識', seriesColor: '#6b4fa0', vol: 4, title: '瀕死體驗的真相', trial: '/that-feeling-1-vol4-trial.html' },
  { series: 1, seriesName: '靈魂意識', seriesColor: '#6b4fa0', vol: 5, title: '意識與大腦的邊界', trial: '/that-feeling-1-vol5-trial.html' },
  { series: 1, seriesName: '靈魂意識', seriesColor: '#6b4fa0', vol: 6, title: '宇宙意識場理論', trial: '/that-feeling-1-vol6-trial.html' },
  // 系列 2：台灣在地
  { series: 2, seriesName: '台灣在地', seriesColor: '#c0392b', vol: 1, title: '台灣鬼月的科學', trial: '/that-feeling-2-vol1-trial.html' },
  { series: 2, seriesName: '台灣在地', seriesColor: '#c0392b', vol: 2, title: '廟會裡的心理學', trial: '/that-feeling-2-vol2-trial.html' },
  { series: 2, seriesName: '台灣在地', seriesColor: '#c0392b', vol: 3, title: '都市傳說的原型', trial: '/that-feeling-2-vol3-trial.html' },
  { series: 2, seriesName: '台灣在地', seriesColor: '#c0392b', vol: 4, title: '台灣靈異地圖', trial: '/that-feeling-2-vol4-trial.html' },
  { series: 2, seriesName: '台灣在地', seriesColor: '#c0392b', vol: 5, title: '老一輩說的話', trial: '/that-feeling-2-vol5-trial.html' },
  { series: 2, seriesName: '台灣在地', seriesColor: '#c0392b', vol: 6, title: '那個地方不能去', trial: '/that-feeling-2-vol6-trial.html' },
  // 系列 3：詛咒心理
  { series: 3, seriesName: '詛咒心理', seriesColor: '#2c3e50', vol: 1, title: '詛咒為什麼有效？', trial: '/that-feeling-3-vol1-trial.html' },
  { series: 3, seriesName: '詛咒心理', seriesColor: '#2c3e50', vol: 2, title: '惡意的心理學', trial: '/that-feeling-3-vol2-trial.html' },
  { series: 3, seriesName: '詛咒心理', seriesColor: '#2c3e50', vol: 3, title: '集體信念的力量', trial: '/that-feeling-3-vol3-trial.html' },
  { series: 3, seriesName: '詛咒心理', seriesColor: '#2c3e50', vol: 4, title: '解咒的儀式與科學', trial: '/that-feeling-3-vol4-trial.html' },
  { series: 3, seriesName: '詛咒心理', seriesColor: '#2c3e50', vol: 5, title: '惡眼與嫉妒', trial: '/that-feeling-3-vol5-trial.html' },
  { series: 3, seriesName: '詛咒心理', seriesColor: '#2c3e50', vol: 6, title: '你能咒傷自己嗎？', trial: '/that-feeling-3-vol6-trial.html' },
  // 系列 4：死亡不死
  { series: 4, seriesName: '死亡不死', seriesColor: '#5d6d7e', vol: 1, title: '好好死亡的練習', trial: '/that-feeling-4-vol1-trial.html' },
  { series: 4, seriesName: '死亡不死', seriesColor: '#5d6d7e', vol: 2, title: '臨終前的大腦', trial: '/that-feeling-4-vol2-trial.html' },
  { series: 4, seriesName: '死亡不死', seriesColor: '#5d6d7e', vol: 3, title: '悲傷是什麼感覺', trial: '/that-feeling-4-vol3-trial.html' },
  { series: 4, seriesName: '死亡不死', seriesColor: '#5d6d7e', vol: 4, title: '告別的儀式', trial: '/that-feeling-4-vol4-trial.html' },
  { series: 4, seriesName: '死亡不死', seriesColor: '#5d6d7e', vol: 5, title: '死後的身體', trial: '/that-feeling-4-vol5-trial.html' },
  { series: 4, seriesName: '死亡不死', seriesColor: '#5d6d7e', vol: 6, title: '我們如何記住死去的人', trial: '/that-feeling-4-vol6-trial.html' },
  // 系列 5：集體靈異
  { series: 5, seriesName: '集體靈異', seriesColor: '#1a6b4a', vol: 1, title: '群體幻覺的案例', trial: '/that-feeling-5-vol1-trial.html' },
  { series: 5, seriesName: '集體靈異', seriesColor: '#1a6b4a', vol: 2, title: '集體恐慌的結構', trial: '/that-feeling-5-vol2-trial.html' },
  { series: 5, seriesName: '集體靈異', seriesColor: '#1a6b4a', vol: 3, title: '宗教儀式中的見證', trial: '/that-feeling-5-vol3-trial.html' },
  { series: 5, seriesName: '集體靈異', seriesColor: '#1a6b4a', vol: 4, title: '社群媒體加速了什麼', trial: '/that-feeling-5-vol4-trial.html' },
  { series: 5, seriesName: '集體靈異', seriesColor: '#1a6b4a', vol: 5, title: 'UFO 集體目擊事件', trial: '/that-feeling-5-vol5-trial.html' },
  { series: 5, seriesName: '集體靈異', seriesColor: '#1a6b4a', vol: 6, title: '你的記憶是你的嗎？', trial: '/that-feeling-5-vol6-trial.html' },
  // 系列 6：科學邊界
  { series: 6, seriesName: '科學邊界', seriesColor: '#1565a0', vol: 1, title: '量子力學與意識', trial: '/that-feeling-6-vol1-trial.html' },
  { series: 6, seriesName: '科學邊界', seriesColor: '#1565a0', vol: 2, title: '暗物質知道什麼？', trial: '/that-feeling-6-vol2-trial.html' },
  { series: 6, seriesName: '科學邊界', seriesColor: '#1565a0', vol: 3, title: '時間真的存在嗎？', trial: '/that-feeling-6-vol3-trial.html' },
  { series: 6, seriesName: '科學邊界', seriesColor: '#1565a0', vol: 4, title: '多重宇宙的可能', trial: '/that-feeling-6-vol4-trial.html' },
  { series: 6, seriesName: '科學邊界', seriesColor: '#1565a0', vol: 5, title: '超自然現象的測量', trial: '/that-feeling-6-vol5-trial.html' },
  { series: 6, seriesName: '科學邊界', seriesColor: '#1565a0', vol: 6, title: '科學的盡頭是信仰？', trial: '/that-feeling-6-vol6-trial.html' },
]

// 系列封面（Blob URL）
const SERIES_COVERS: Record<number, string> = {
  1: 'https://88lwhikbeo2pkibc.public.blob.vercel-storage.com/covers/that-feeling/that-feeling-01.png',
  2: 'https://88lwhikbeo2pkibc.public.blob.vercel-storage.com/covers/that-feeling/that-feeling-02.png',
  3: 'https://88lwhikbeo2pkibc.public.blob.vercel-storage.com/covers/that-feeling/that-feeling-03.png',
  4: 'https://88lwhikbeo2pkibc.public.blob.vercel-storage.com/covers/that-feeling/that-feeling-04.png',
  5: 'https://88lwhikbeo2pkibc.public.blob.vercel-storage.com/covers/that-feeling/that-feeling-05.png',
  6: 'https://88lwhikbeo2pkibc.public.blob.vercel-storage.com/covers/that-feeling/that-feeling-06.png',
}

const SERIES_EMOJIS: Record<number, string> = { 1:'🌌', 2:'🏮', 3:'🖤', 4:'⚰️', 5:'👁️', 6:'🔬' }

const SHARE_TITLE = '你也有過「那個感覺」嗎？'
const SHARE_CONTENT = '我在 Still Time 找到「那個感覺」，39 個故事陪你走過情緒夜晚，你也來看看吧！\nhttps://surprise-corner.vercel.app/feeling'

// ── 大型分享區塊 ──────────────────────────────────
function BigShareBlock({ label }: { label: string }) {
  return (
    <div style={{
      background: 'linear-gradient(135deg, rgba(255,248,230,0.95), rgba(255,240,210,0.9))',
      border: '1.5px solid rgba(200,150,50,0.3)',
      borderRadius: 18,
      padding: '24px 24px 20px',
      textAlign: 'center',
    }}>
      <p style={{ margin: '0 0 4px', fontWeight: 700, color: '#7a4a10', fontSize: '1rem', fontFamily: 'sans-serif' }}>
        🫂 {label}
      </p>
      <p style={{ margin: '0 0 16px', color: '#9a6830', fontSize: '0.82rem', fontFamily: 'sans-serif' }}>
        「我在 Still Time 找到「那個感覺」，你也來看看吧！」
      </p>
      <ShareButtons title={SHARE_TITLE} content={SHARE_CONTENT} />
    </div>
  )
}

// ── 導流條 ──────────────────────────────────────────
function LeadOut() {
  return (
    <div style={{ marginTop: 20, padding: '14px 18px', borderRadius: 10, background: 'rgba(255,248,230,0.8)', border: '1px solid rgba(200,150,50,0.2)', textAlign: 'center' }}>
      <span style={{ color: '#8a5a20', fontSize: '0.83rem', fontFamily: 'sans-serif' }}>
        想看更深入的心理學？
      </span>
      <a
        href="https://still-time-corner.vercel.app/digital"
        target="_blank"
        rel="noopener noreferrer"
        style={{ marginLeft: 8, color: '#c8762a', fontWeight: 700, fontSize: '0.83rem', fontFamily: 'sans-serif', textDecoration: 'none', borderBottom: '1px solid #c8762a' }}>
        去有的沒的小舖 →
      </a>
    </div>
  )
}

// ── 書卡元件 ──────────────────────────────────────
function BookCard({ book }: { book: typeof BOOKS[0] }) {
  const [shareOpen, setShareOpen] = useState(false)
  const cover = SERIES_COVERS[book.series]

  return (
    <div style={{
      background: '#fff',
      borderRadius: 12,
      border: `1.5px solid ${book.seriesColor}22`,
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
    }}>
      {/* 系列色條 */}
      <div style={{ height: 3, background: book.seriesColor }} />

      <div style={{ padding: '14px 14px 10px', flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
        {/* 系列標 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: '0.9rem' }}>{SERIES_EMOJIS[book.series]}</span>
          <span style={{ fontSize: '0.68rem', color: book.seriesColor, fontWeight: 700, fontFamily: 'sans-serif', letterSpacing: '0.08em' }}>
            S{book.series}·{book.seriesName} Vol.{book.vol}
          </span>
        </div>

        {/* 封面 + 書名 */}
        <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
          <img
            src={cover}
            alt={book.seriesName}
            style={{ width: 44, height: 60, objectFit: 'cover', borderRadius: 4, flexShrink: 0, border: '1px solid rgba(0,0,0,0.08)' }}
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
          />
          <h3 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 600, color: '#1a0f05', lineHeight: 1.45, fontFamily: 'sans-serif', flex: 1 }}>
            {book.title}
          </h3>
        </div>

        {/* 操作列 */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 'auto', paddingTop: 8 }}>
          <a
            href={book.trial}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '5px 12px', borderRadius: 16,
              background: book.seriesColor, color: '#fff',
              textDecoration: 'none', fontSize: '0.75rem', fontFamily: 'sans-serif', fontWeight: 600,
            }}>
            試讀首章 →
          </a>
          <button
            onClick={() => setShareOpen(o => !o)}
            style={{
              padding: '5px 10px', borderRadius: 16,
              background: shareOpen ? '#f5e8c8' : 'rgba(0,0,0,0.04)',
              color: '#8a5020', border: '1px solid rgba(180,120,40,0.25)',
              cursor: 'pointer', fontSize: '0.75rem', fontFamily: 'sans-serif',
            }}>
            {shareOpen ? '收起' : '分享'}
          </button>
        </div>

        {shareOpen && (
          <div style={{ marginTop: 6 }}>
            <ShareButtons title={`那個感覺・${book.seriesName}｜${book.title}`} content={SHARE_CONTENT} />
          </div>
        )}
      </div>
    </div>
  )
}

// ── 其他好康卡片 ──────────────────────────────────
const EXTRAS = [
  { icon: '🧠', title: '情緒小測驗', desc: '你的依附類型、心理防禦機制，測出來了嗎？', href: '/quiz', cta: '去測測看', color: '#7c3aed', bg: 'rgba(124,58,237,0.06)', border: 'rgba(124,58,237,0.18)' },
  { icon: '♈', title: '今日星座運勢', desc: '每天更新，看看宇宙今天對你說什麼。', href: '/horoscope', cta: '看運勢', color: '#db2777', bg: 'rgba(219,39,119,0.06)', border: 'rgba(219,39,119,0.18)' },
  { icon: '🔮', title: '塔羅占卜', desc: '抽一張牌，讓牌說說看今天的方向。', href: '/tarot', cta: '抽一張牌', color: '#9333ea', bg: 'rgba(147,51,234,0.06)', border: 'rgba(147,51,234,0.18)' },
  { icon: '☯️', title: '八字命盤', desc: '輸入生辰，看看你的先天性格底色。', href: '/bazi', cta: '算算看', color: '#b45309', bg: 'rgba(180,83,9,0.06)', border: 'rgba(180,83,9,0.18)' },
  { icon: '🌙', title: '月亮星座', desc: '你的內在情緒語言，月亮星座說得最準。', href: '/moon-sign', cta: '找月亮', color: '#0369a1', bg: 'rgba(3,105,161,0.06)', border: 'rgba(3,105,161,0.18)' },
  { icon: '💬', title: '魯魯聊天室', desc: '跟 AI 魯魯說說心事，牠只陪不評判。', href: '/chat/lulu', cta: '找魯魯說話', color: '#0d9488', bg: 'rgba(13,148,136,0.06)', border: 'rgba(13,148,136,0.18)' },
  { icon: '🎮', title: '小遊戲', desc: '兔子釣魚、數獨……睡前清空大腦用的。', href: '/games', cta: '來玩一下', color: '#d97706', bg: 'rgba(217,119,6,0.06)', border: 'rgba(217,119,6,0.18)' },
  { icon: '🌌', title: '每日驚喜', desc: '冷知識・小測驗・隨機療癒，今天不一樣。', href: '/random', cta: '給我驚喜', color: '#64748b', bg: 'rgba(100,116,139,0.06)', border: 'rgba(100,116,139,0.18)' },
]

// ── 主頁面 ──────────────────────────────────────────
export default function FeelingPage() {
  const groups = [1, 2, 3, 4, 5, 6]

  return (
    <main style={{ minHeight: '100vh', background: '#faf7f2', paddingBottom: 80 }}>

      {/* ══ Hero ══════════════════════════════════════ */}
      <section style={{
        background: 'linear-gradient(160deg, #fdf6e3 0%, #faf0d7 50%, #f5e8c8 100%)',
        padding: 'clamp(48px, 8vw, 80px) 24px clamp(36px, 6vw, 60px)',
        textAlign: 'center',
        borderBottom: '1px solid rgba(200,160,60,0.18)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: -80, right: -80, width: 260, height: 260, borderRadius: '50%', background: 'rgba(210,160,60,0.06)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -50, left: -50, width: 180, height: 180, borderRadius: '50%', background: 'rgba(180,120,40,0.04)', pointerEvents: 'none' }} />

        <p style={{ margin: '0 0 14px', fontSize: '0.75rem', letterSpacing: '0.35em', color: '#b08040', fontFamily: 'sans-serif' }}>
          SURPRISE CORNER
        </p>
        <h1 style={{
          margin: '0 0 16px',
          fontSize: 'clamp(1.9rem, 5.5vw, 3.4rem)',
          fontWeight: 400,
          color: '#2a1800',
          lineHeight: 1.2,
          fontFamily: 'Georgia, serif',
          letterSpacing: '0.03em',
        }}>
          你也有過「那個感覺」嗎？
        </h1>
        <p style={{
          margin: '0 auto 30px',
          maxWidth: 500,
          fontSize: 'clamp(0.9rem, 2.2vw, 1.1rem)',
          color: '#8a6030',
          lineHeight: 1.75,
          fontFamily: 'sans-serif',
        }}>
          39 個故事・測驗・運勢・遊戲<br />
          <span style={{ color: '#a07040', fontSize: '0.92em' }}>陪你療癒每個情緒夜晚</span>
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="#tf-series" style={{
            display: 'inline-block', padding: '13px 34px', borderRadius: 32,
            background: 'linear-gradient(135deg, #c8862a, #9a5010)',
            color: '#fff', textDecoration: 'none',
            fontFamily: 'sans-serif', fontWeight: 700, fontSize: '0.95rem',
            boxShadow: '0 4px 18px rgba(160,80,16,0.28)',
            letterSpacing: '0.04em',
          }}>
            免費試讀全系列 36 冊 ↓
          </a>
          <a href="https://still-time-corner.vercel.app/digital" target="_blank" rel="noopener noreferrer" style={{
            display: 'inline-block', padding: '13px 28px', borderRadius: 32,
            background: 'rgba(255,255,255,0.75)', color: '#8a5020',
            border: '1.5px solid rgba(180,120,40,0.35)',
            textDecoration: 'none', fontFamily: 'sans-serif', fontWeight: 500, fontSize: '0.9rem',
          }}>
            去小舖買完整版 ✨
          </a>
        </div>
      </section>

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '32px 18px 0' }}>

        {/* ══ 頂部大型分享區塊 ═══════════════════════════ */}
        <BigShareBlock label="邀請朋友一起療癒，傳出去吧" />

        {/* ══ 那個感覺 36 本 ══════════════════════════════ */}
        <section id="tf-series" style={{ marginTop: 36 }}>
          <div style={{ marginBottom: 22 }}>
            <p style={{ margin: '0 0 3px', fontSize: '0.72rem', letterSpacing: '0.32em', color: '#b08040', fontFamily: 'sans-serif', fontWeight: 600 }}>
              ■ 那個感覺 系列
            </p>
            <p style={{ margin: 0, color: '#8a6030', fontSize: '0.85rem', fontFamily: 'sans-serif' }}>
              6 大系列 × 6 冊，36 個故事，免費試讀首章
            </p>
          </div>

          {groups.map(sid => {
            const seriesBooks = BOOKS.filter(b => b.series === sid)
            const first = seriesBooks[0]
            return (
              <div key={sid} style={{ marginBottom: 32 }}>
                {/* 系列標題 */}
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '8px 14px', borderRadius: 8,
                  background: first.seriesColor + '12',
                  border: `1px solid ${first.seriesColor}30`,
                  marginBottom: 12,
                }}>
                  <span style={{ fontSize: '1.1rem' }}>{SERIES_EMOJIS[sid]}</span>
                  <div>
                    <span style={{ fontWeight: 700, color: first.seriesColor, fontSize: '0.85rem', fontFamily: 'sans-serif' }}>
                      系列 {sid}｜{first.seriesName}
                    </span>
                  </div>
                </div>
                {/* 6本卡片網格 */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 10 }}>
                  {seriesBooks.map(b => <BookCard key={`${b.series}-${b.vol}`} book={b} />)}
                </div>
              </div>
            )
          })}

          <LeadOut />
        </section>

        {/* ══ 其他好康 ════════════════════════════════════ */}
        <section style={{ marginTop: 44 }}>
          <div style={{ marginBottom: 20 }}>
            <p style={{ margin: '0 0 3px', fontSize: '0.72rem', letterSpacing: '0.32em', color: '#b08040', fontFamily: 'sans-serif', fontWeight: 600 }}>
              ■ 驚喜角落還有這些
            </p>
            <p style={{ margin: 0, color: '#8a6030', fontSize: '0.85rem', fontFamily: 'sans-serif' }}>
              測驗・運勢・聊天・遊戲，全免費不用登入
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', gap: 10 }}>
            {EXTRAS.map(ex => (
              <Link key={ex.href} href={ex.href} style={{
                display: 'block', padding: '18px 16px',
                borderRadius: 12, background: ex.bg,
                border: `1.5px solid ${ex.border}`,
                textDecoration: 'none',
              }}>
                <span style={{ fontSize: '1.7rem', display: 'block', marginBottom: 7 }}>{ex.icon}</span>
                <h3 style={{ margin: '0 0 5px', fontSize: '0.92rem', fontWeight: 700, color: '#1a0f05', fontFamily: 'sans-serif' }}>{ex.title}</h3>
                <p style={{ margin: '0 0 10px', fontSize: '0.78rem', color: '#6a4a28', lineHeight: 1.55, fontFamily: 'sans-serif' }}>{ex.desc}</p>
                <span style={{ fontSize: '0.78rem', color: ex.color, fontFamily: 'sans-serif', fontWeight: 700 }}>{ex.cta} →</span>
              </Link>
            ))}
          </div>
          <LeadOut />
        </section>

        {/* ══ 底部大型分享區塊 ═══════════════════════════ */}
        <section style={{ marginTop: 48 }}>
          <BigShareBlock label="分享這個角落給朋友" />
          <p style={{ marginTop: 14, textAlign: 'center', color: '#aaa', fontSize: '0.77rem', fontFamily: 'sans-serif' }}>
            完整版心理學書籍在
            <a href="https://still-time-corner.vercel.app/digital" target="_blank" rel="noopener noreferrer"
              style={{ color: '#c8762a', marginLeft: 4, borderBottom: '1px solid #c8762a30' }}>
              有的沒的小舖 ✨
            </a>
          </p>
        </section>

      </div>
    </main>
  )
}
