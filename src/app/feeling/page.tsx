'use client'

import Link from 'next/link'
import { useState } from 'react'

// 那個感覺 6 大系列資料
const TF_SERIES = [
  {
    id: 1,
    slug: 'that-feeling-1',
    name: '靈魂意識',
    emoji: '🌌',
    tagline: '你有沒有想過，意識消失之後去哪裡？',
    color: '#6b4fa0',
    bg: 'rgba(107,79,160,0.08)',
    border: 'rgba(107,79,160,0.25)',
    cover: 'https://88lwhikbeo2pkibc.public.blob.vercel-storage.com/covers/that-feeling/that-feeling-01.png',
    vols: [
      { vol: 1, title: '你死了，然後呢？', trial: '/that-feeling-1-vol1-trial.html' },
      { vol: 2, title: '靈魂出竅是真的嗎？', trial: '/that-feeling-1-vol2-trial.html' },
      { vol: 3, title: '輪迴，有證據嗎？', trial: '/that-feeling-1-vol3-trial.html' },
      { vol: 4, title: '瀕死體驗的真相', trial: '/that-feeling-1-vol4-trial.html' },
      { vol: 5, title: '意識與大腦的邊界', trial: '/that-feeling-1-vol5-trial.html' },
      { vol: 6, title: '宇宙意識場理論', trial: '/that-feeling-1-vol6-trial.html' },
    ],
    stUrl: 'https://still-time-corner.vercel.app/digital',
  },
  {
    id: 2,
    slug: 'that-feeling-2',
    name: '台灣在地',
    emoji: '🏮',
    tagline: '這座島上，曾經發生過太多說不清楚的事。',
    color: '#c0392b',
    bg: 'rgba(192,57,43,0.08)',
    border: 'rgba(192,57,43,0.25)',
    cover: 'https://88lwhikbeo2pkibc.public.blob.vercel-storage.com/covers/that-feeling/that-feeling-02.png',
    vols: [
      { vol: 1, title: '台灣鬼月的科學', trial: '/that-feeling-2-vol1-trial.html' },
      { vol: 2, title: '廟會裡的心理學', trial: '/that-feeling-2-vol2-trial.html' },
      { vol: 3, title: '都市傳說的原型', trial: '/that-feeling-2-vol3-trial.html' },
      { vol: 4, title: '台灣靈異地圖', trial: '/that-feeling-2-vol4-trial.html' },
      { vol: 5, title: '老一輩說的話', trial: '/that-feeling-2-vol5-trial.html' },
      { vol: 6, title: '那個地方不能去', trial: '/that-feeling-2-vol6-trial.html' },
    ],
    stUrl: 'https://still-time-corner.vercel.app/digital',
  },
  {
    id: 3,
    slug: 'that-feeling-3',
    name: '詛咒心理',
    emoji: '🖤',
    tagline: '你有沒有被咒過？還是你在不知情咒別人？',
    color: '#2c3e50',
    bg: 'rgba(44,62,80,0.08)',
    border: 'rgba(44,62,80,0.3)',
    cover: 'https://88lwhikbeo2pkibc.public.blob.vercel-storage.com/covers/that-feeling/that-feeling-03.png',
    vols: [
      { vol: 1, title: '詛咒為什麼有效？', trial: '/that-feeling-3-vol1-trial.html' },
      { vol: 2, title: '惡意的心理學', trial: '/that-feeling-3-vol2-trial.html' },
      { vol: 3, title: '集體信念的力量', trial: '/that-feeling-3-vol3-trial.html' },
      { vol: 4, title: '解咒的儀式與科學', trial: '/that-feeling-3-vol4-trial.html' },
      { vol: 5, title: '惡眼與嫉妒', trial: '/that-feeling-3-vol5-trial.html' },
      { vol: 6, title: '你能咒傷自己嗎？', trial: '/that-feeling-3-vol6-trial.html' },
    ],
    stUrl: 'https://still-time-corner.vercel.app/digital',
  },
  {
    id: 4,
    slug: 'that-feeling-4',
    name: '死亡不死',
    emoji: '⚰️',
    tagline: '每個人都在逃避這個話題，但它從未停止等你。',
    color: '#5d6d7e',
    bg: 'rgba(93,109,126,0.08)',
    border: 'rgba(93,109,126,0.25)',
    cover: 'https://88lwhikbeo2pkibc.public.blob.vercel-storage.com/covers/that-feeling/that-feeling-04.png',
    vols: [
      { vol: 1, title: '好好死亡的練習', trial: '/that-feeling-4-vol1-trial.html' },
      { vol: 2, title: '臨終前的大腦', trial: '/that-feeling-4-vol2-trial.html' },
      { vol: 3, title: '悲傷是什麼感覺', trial: '/that-feeling-4-vol3-trial.html' },
      { vol: 4, title: '告別的儀式', trial: '/that-feeling-4-vol4-trial.html' },
      { vol: 5, title: '死後的身體', trial: '/that-feeling-4-vol5-trial.html' },
      { vol: 6, title: '我們如何記住死去的人', trial: '/that-feeling-4-vol6-trial.html' },
    ],
    stUrl: 'https://still-time-corner.vercel.app/digital',
  },
  {
    id: 5,
    slug: 'that-feeling-5',
    name: '集體靈異',
    emoji: '👁️',
    tagline: '當很多人同時看見同一件事，那是真實的嗎？',
    color: '#1a6b4a',
    bg: 'rgba(26,107,74,0.08)',
    border: 'rgba(26,107,74,0.25)',
    cover: 'https://88lwhikbeo2pkibc.public.blob.vercel-storage.com/covers/that-feeling/that-feeling-05.png',
    vols: [
      { vol: 1, title: '群體幻覺的案例', trial: '/that-feeling-5-vol1-trial.html' },
      { vol: 2, title: '集體恐慌的結構', trial: '/that-feeling-5-vol2-trial.html' },
      { vol: 3, title: '宗教儀式中的見證', trial: '/that-feeling-5-vol3-trial.html' },
      { vol: 4, title: '社群媒體加速了什麼', trial: '/that-feeling-5-vol4-trial.html' },
      { vol: 5, title: 'UFO 集體目擊事件', trial: '/that-feeling-5-vol5-trial.html' },
      { vol: 6, title: '你的記憶是你的嗎？', trial: '/that-feeling-5-vol6-trial.html' },
    ],
    stUrl: 'https://still-time-corner.vercel.app/digital',
  },
  {
    id: 6,
    slug: 'that-feeling-6',
    name: '科學邊界',
    emoji: '🔬',
    tagline: '那些科學說「不確定」的事情，才是最有趣的。',
    color: '#1565a0',
    bg: 'rgba(21,101,160,0.08)',
    border: 'rgba(21,101,160,0.25)',
    cover: 'https://88lwhikbeo2pkibc.public.blob.vercel-storage.com/covers/that-feeling/that-feeling-06.png',
    vols: [
      { vol: 1, title: '量子力學與意識', trial: '/that-feeling-6-vol1-trial.html' },
      { vol: 2, title: '暗物質知道什麼？', trial: '/that-feeling-6-vol2-trial.html' },
      { vol: 3, title: '時間真的存在嗎？', trial: '/that-feeling-6-vol3-trial.html' },
      { vol: 4, title: '多重宇宙的可能', trial: '/that-feeling-6-vol4-trial.html' },
      { vol: 5, title: '超自然現象的測量', trial: '/that-feeling-6-vol5-trial.html' },
      { vol: 6, title: '科學的盡頭是信仰？', trial: '/that-feeling-6-vol6-trial.html' },
    ],
    stUrl: 'https://still-time-corner.vercel.app/digital',
  },
]

// 其他好康卡片
const EXTRAS = [
  {
    icon: '🧠',
    title: '情緒小測驗',
    desc: '你的心理防禦機制是什麼？依附類型測出來了嗎？',
    href: '/quiz',
    cta: '去測測看 →',
    bg: 'rgba(139,92,246,0.06)',
    border: 'rgba(139,92,246,0.2)',
    accent: '#7c3aed',
  },
  {
    icon: '🔮',
    title: '今日運勢',
    desc: '塔羅・星座・八字，選一個你最信的，看看今天怎麼說。',
    href: '/tarot',
    cta: '抽一張牌 →',
    bg: 'rgba(236,72,153,0.06)',
    border: 'rgba(236,72,153,0.2)',
    accent: '#db2777',
  },
  {
    icon: '💬',
    title: '魯魯聊天室',
    desc: '跟 AI 魯魯說說話。牠不評判，只是陪著你。',
    href: '/chat/lulu',
    cta: '跟魯魯說話 →',
    bg: 'rgba(20,184,166,0.06)',
    border: 'rgba(20,184,166,0.2)',
    accent: '#0d9488',
  },
  {
    icon: '🎮',
    title: '小遊戲區',
    desc: '兔子釣魚、數獨…睡前玩五分鐘，清空大腦。',
    href: '/games',
    cta: '來玩一下 →',
    bg: 'rgba(245,158,11,0.06)',
    border: 'rgba(245,158,11,0.2)',
    accent: '#d97706',
  },
]

function InviteBlock() {
  const [copied, setCopied] = useState(false)
  const url = 'https://surprise-corner.vercel.app/feeling'
  const text = '我在 Surprise Corner 找到那個感覺，你也來看看？'

  function copyLink() {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }
  function shareLine() {
    window.open(`https://line.me/R/msg/text/?${encodeURIComponent(text + '\n' + url)}`, '_blank')
  }
  function shareFb() {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank')
  }

  return (
    <div style={{
      background: 'rgba(255,248,235,0.9)',
      border: '1.5px solid rgba(210,160,60,0.35)',
      borderRadius: 16,
      padding: '20px 24px',
      marginBottom: 12,
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      gap: 12,
    }}>
      <div style={{ flex: 1, minWidth: 180 }}>
        <p style={{ margin: 0, fontWeight: 600, color: '#7a4f1a', fontSize: '0.95rem' }}>
          🫂 邀請朋友一起療癒
        </p>
        <p style={{ margin: '2px 0 0', color: '#9a7040', fontSize: '0.82rem' }}>
          分享連結，讓朋友也找到「那個感覺」
        </p>
      </div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <button onClick={shareLine}
          style={{ padding: '7px 16px', borderRadius: 20, background: '#00B900', color: '#fff', border: 'none', cursor: 'pointer', fontSize: '0.82rem', fontWeight: 600 }}>
          LINE 分享
        </button>
        <button onClick={shareFb}
          style={{ padding: '7px 16px', borderRadius: 20, background: '#1877F2', color: '#fff', border: 'none', cursor: 'pointer', fontSize: '0.82rem', fontWeight: 600 }}>
          FB 分享
        </button>
        <button onClick={copyLink}
          style={{ padding: '7px 16px', borderRadius: 20, background: copied ? '#16a34a' : '#e8dcc8', color: copied ? '#fff' : '#7a4f1a', border: 'none', cursor: 'pointer', fontSize: '0.82rem', fontWeight: 600, transition: 'all 0.2s' }}>
          {copied ? '✓ 已複製' : '複製連結'}
        </button>
      </div>
    </div>
  )
}

function SeriesCard({ series }: { series: typeof TF_SERIES[0] }) {
  const [open, setOpen] = useState(false)

  function shareThis() {
    const text = `我剛在 Still Time 找到那個感覺，你也來看看？\n「${series.name}」系列：${series.tagline}`
    const url = `https://surprise-corner.vercel.app/feeling`
    window.open(`https://line.me/R/msg/text/?${encodeURIComponent(text + '\n' + url)}`, '_blank')
  }

  return (
    <div style={{
      background: series.bg,
      border: `1.5px solid ${series.border}`,
      borderRadius: 14,
      overflow: 'hidden',
      transition: 'box-shadow 0.2s',
    }}>
      {/* 卡頭：封面 + 標題 + 展開按鈕 */}
      <div style={{ display: 'flex', gap: 16, padding: '18px 18px 16px', alignItems: 'flex-start' }}>
        <img
          src={series.cover}
          alt={series.name}
          style={{ width: 64, height: 88, objectFit: 'cover', borderRadius: 6, flexShrink: 0, border: `1px solid ${series.border}` }}
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
        />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <span style={{ fontSize: '1.1rem' }}>{series.emoji}</span>
            <span style={{ fontSize: '0.72rem', letterSpacing: '0.15em', color: series.color, fontWeight: 600 }}>
              系列 {series.id} · {series.name}
            </span>
          </div>
          <p style={{ margin: '0 0 8px', color: '#4a3a2a', fontSize: '0.88rem', lineHeight: 1.5 }}>
            {series.tagline}
          </p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <button
              onClick={() => setOpen(o => !o)}
              style={{ padding: '5px 14px', borderRadius: 20, background: series.color, color: '#fff', border: 'none', cursor: 'pointer', fontSize: '0.78rem', fontWeight: 600 }}>
              {open ? '收起 ▲' : `看 6 冊內容 ▼`}
            </button>
            <button
              onClick={shareThis}
              style={{ padding: '5px 14px', borderRadius: 20, background: 'rgba(255,255,255,0.7)', color: series.color, border: `1px solid ${series.border}`, cursor: 'pointer', fontSize: '0.78rem' }}>
              分享 LINE
            </button>
          </div>
        </div>
      </div>

      {/* 展開：6 冊列表 */}
      {open && (
        <div style={{ borderTop: `1px solid ${series.border}`, padding: '12px 18px 16px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 8 }}>
            {series.vols.map(v => (
              <a
                key={v.vol}
                href={v.trial}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '8px 12px',
                  background: 'rgba(255,255,255,0.6)',
                  borderRadius: 8,
                  textDecoration: 'none',
                  color: '#3a2a1a',
                  fontSize: '0.83rem',
                  border: '1px solid rgba(0,0,0,0.06)',
                  transition: 'background 0.15s',
                }}
              >
                <span style={{ color: series.color, fontWeight: 700, fontSize: '0.78rem', minWidth: 24 }}>
                  Vol.{v.vol}
                </span>
                <span style={{ lineHeight: 1.4 }}>{v.title}</span>
                <span style={{ marginLeft: 'auto', color: series.color, fontSize: '0.75rem' }}>試讀 →</span>
              </a>
            ))}
          </div>
          <div style={{ marginTop: 12, textAlign: 'right' }}>
            <a
              href={series.stUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: series.color, fontSize: '0.8rem', textDecoration: 'none', borderBottom: `1px dashed ${series.color}` }}>
              想深入了解？去有的沒的小舖看心理學書籍 →
            </a>
          </div>
        </div>
      )}
    </div>
  )
}

export default function FeelingPage() {
  return (
    <main style={{ minHeight: '100vh', background: '#faf7f2', fontFamily: 'Georgia, serif', paddingBottom: 80 }}>

      {/* ── Hero ── */}
      <section style={{
        background: 'linear-gradient(160deg, #fdf6e3 0%, #faf0d7 40%, #f5e8c8 100%)',
        padding: '60px 24px 48px',
        textAlign: 'center',
        borderBottom: '1px solid rgba(200,160,80,0.2)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* 裝飾圓 */}
        <div style={{ position: 'absolute', top: -60, right: -60, width: 220, height: 220, borderRadius: '50%', background: 'rgba(210,160,60,0.07)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -40, left: -40, width: 160, height: 160, borderRadius: '50%', background: 'rgba(180,120,60,0.05)', pointerEvents: 'none' }} />

        <p style={{ margin: '0 0 12px', fontSize: '0.8rem', letterSpacing: '0.3em', color: '#b08040', fontFamily: 'sans-serif' }}>
          SURPRISE CORNER
        </p>
        <h1 style={{ margin: '0 0 16px', fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 400, color: '#3a2a10', lineHeight: 1.2 }}>
          這裡有「那個感覺」
        </h1>
        <p style={{ margin: '0 0 28px', fontSize: 'clamp(0.95rem, 2.5vw, 1.15rem)', color: '#8a6030', lineHeight: 1.7, maxWidth: 480, marginLeft: 'auto', marginRight: 'auto' }}>
          39 個故事 + 測驗 + 塔羅 + 每日驚喜<br />
          <span style={{ fontSize: '0.9em', color: '#a07040' }}>靈異・心理・科學，那些讓你睡不著的問題，這裡都在問。</span>
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a
            href="#tf-series"
            style={{
              display: 'inline-block', padding: '12px 32px', borderRadius: 30,
              background: 'linear-gradient(135deg, #c8862a, #a06020)',
              color: '#fff', textDecoration: 'none', fontFamily: 'sans-serif',
              fontWeight: 600, fontSize: '0.95rem', letterSpacing: '0.05em',
              boxShadow: '0 4px 16px rgba(160,96,32,0.25)',
            }}>
            免費試讀全系列 ↓
          </a>
          <a
            href="https://still-time-corner.vercel.app/digital"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block', padding: '12px 28px', borderRadius: 30,
              background: 'rgba(255,255,255,0.7)', color: '#8a5020',
              border: '1.5px solid rgba(180,120,40,0.4)',
              textDecoration: 'none', fontFamily: 'sans-serif',
              fontWeight: 500, fontSize: '0.9rem',
            }}>
            去小舖看完整版 ✨
          </a>
        </div>
      </section>

      <div style={{ maxWidth: 780, margin: '0 auto', padding: '32px 20px 0' }}>

        {/* ── 邀請區塊 ── */}
        <InviteBlock />

        {/* ── 那個感覺系列 ── */}
        <section id="tf-series" style={{ paddingTop: 8 }}>
          <div style={{ marginBottom: 20 }}>
            <h2 style={{ margin: '0 0 4px', fontSize: '0.78rem', letterSpacing: '0.3em', color: '#b08040', fontFamily: 'sans-serif', fontWeight: 400 }}>
              ■ 那個感覺 系列
            </h2>
            <p style={{ margin: 0, color: '#7a5a30', fontSize: '0.85rem', fontFamily: 'sans-serif' }}>
              6 大系列 × 6 冊，36 個故事，全部免費試讀首章
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {TF_SERIES.map(s => <SeriesCard key={s.id} series={s} />)}
          </div>

          {/* 底部導流 */}
          <div style={{
            marginTop: 24, padding: '16px 20px', borderRadius: 12,
            background: 'rgba(255,248,230,0.8)', border: '1px solid rgba(200,160,60,0.25)',
            textAlign: 'center',
          }}>
            <p style={{ margin: '0 0 8px', color: '#7a4f1a', fontSize: '0.88rem', fontFamily: 'sans-serif' }}>
              喜歡這個感覺？推薦你深入閱讀心理學書籍
            </p>
            <a
              href="https://still-time-corner.vercel.app/digital"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block', padding: '9px 24px', borderRadius: 20,
                background: 'linear-gradient(135deg, #c8862a, #a06020)',
                color: '#fff', textDecoration: 'none',
                fontFamily: 'sans-serif', fontWeight: 600, fontSize: '0.85rem',
              }}>
              去有的沒的小舖看看心理學書籍 →
            </a>
          </div>
        </section>

        {/* ── 其他好康 ── */}
        <section style={{ marginTop: 40 }}>
          <div style={{ marginBottom: 20 }}>
            <h2 style={{ margin: '0 0 4px', fontSize: '0.78rem', letterSpacing: '0.3em', color: '#b08040', fontFamily: 'sans-serif', fontWeight: 400 }}>
              ■ 驚喜角落還有這些
            </h2>
            <p style={{ margin: 0, color: '#7a5a30', fontSize: '0.85rem', fontFamily: 'sans-serif' }}>
              測驗・運勢・聊天・遊戲，全免費
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 12 }}>
            {EXTRAS.map(ex => (
              <Link
                key={ex.href}
                href={ex.href}
                style={{
                  display: 'block', padding: '20px', borderRadius: 12,
                  background: ex.bg, border: `1.5px solid ${ex.border}`,
                  textDecoration: 'none', color: 'inherit',
                  transition: 'transform 0.15s, box-shadow 0.15s',
                }}
              >
                <span style={{ fontSize: '1.8rem', display: 'block', marginBottom: 8 }}>{ex.icon}</span>
                <h3 style={{ margin: '0 0 6px', fontSize: '1rem', fontWeight: 600, color: '#2a1a0a', fontFamily: 'sans-serif' }}>
                  {ex.title}
                </h3>
                <p style={{ margin: '0 0 12px', fontSize: '0.82rem', color: '#6a5040', lineHeight: 1.6, fontFamily: 'sans-serif' }}>
                  {ex.desc}
                </p>
                <span style={{ fontSize: '0.82rem', color: ex.accent, fontFamily: 'sans-serif', fontWeight: 600 }}>
                  {ex.cta}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* ── 底部分享 ── */}
        <section style={{ marginTop: 48, textAlign: 'center' }}>
          <p style={{ margin: '0 0 16px', color: '#8a6030', fontSize: '0.9rem', fontFamily: 'sans-serif' }}>
            「我剛在 Still Time 找到那個感覺，你也來看看？」
          </p>
          <InviteBlock />
          <p style={{ marginTop: 16, color: '#aaa', fontSize: '0.78rem', fontFamily: 'sans-serif' }}>
            完整版心理學書籍在
            <a href="https://still-time-corner.vercel.app/digital" target="_blank" rel="noopener noreferrer"
              style={{ color: '#c8862a', marginLeft: 4 }}>
              有的沒的小舖 ✨
            </a>
          </p>
        </section>

      </div>
    </main>
  )
}
