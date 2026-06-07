'use client'

import Link from 'next/link'
import { useState } from 'react'
import ShareButtons from '@/components/ShareButtons'

// ── 35 本書資料（從 MD frontmatter 取得，death 系列無 Vol.4）──────
// 系列對照：soul=S1 taiwan=S2 curse=S3 death=S4 collective=S5 science=S6
const BOOKS = [
  // 系列一：靈魂與意識
  { series: 1, seriesName: '靈魂與意識', seriesColor: '#6b4fa0', vol: 1, title: '你離開身體的那一刻',   trial: '/that-feeling-1-vol1-trial.html' },
  { series: 1, seriesName: '靈魂與意識', seriesColor: '#6b4fa0', vol: 2, title: '你不是你以為的你',     trial: '/that-feeling-1-vol2-trial.html' },
  { series: 1, seriesName: '靈魂與意識', seriesColor: '#6b4fa0', vol: 3, title: '睡著之後你去了哪裡',   trial: '/that-feeling-1-vol3-trial.html' },
  { series: 1, seriesName: '靈魂與意識', seriesColor: '#6b4fa0', vol: 4, title: '另一個人的記憶',       trial: '/that-feeling-1-vol4-trial.html' },
  { series: 1, seriesName: '靈魂與意識', seriesColor: '#6b4fa0', vol: 5, title: '意識的邊界在哪裡',     trial: '/that-feeling-1-vol5-trial.html' },
  { series: 1, seriesName: '靈魂與意識', seriesColor: '#6b4fa0', vol: 6, title: '你和你之間的距離',     trial: '/that-feeling-1-vol6-trial.html' },
  // 系列二：台灣在地
  { series: 2, seriesName: '台灣在地',   seriesColor: '#c0392b', vol: 1, title: '這裡本來就不一樣',     trial: '/that-feeling-2-vol1-trial.html' },
  { series: 2, seriesName: '台灣在地',   seriesColor: '#c0392b', vol: 2, title: '那些廟在說什麼',       trial: '/that-feeling-2-vol2-trial.html' },
  { series: 2, seriesName: '台灣在地',   seriesColor: '#c0392b', vol: 3, title: '你家附近的鬼故事',     trial: '/that-feeling-2-vol3-trial.html' },
  { series: 2, seriesName: '台灣在地',   seriesColor: '#c0392b', vol: 4, title: '死了要去哪',           trial: '/that-feeling-2-vol4-trial.html' },
  { series: 2, seriesName: '台灣在地',   seriesColor: '#c0392b', vol: 5, title: '台灣人為什麼這麼怕',   trial: '/that-feeling-2-vol5-trial.html' },
  { series: 2, seriesName: '台灣在地',   seriesColor: '#c0392b', vol: 6, title: '這塊土地上的聲音',     trial: '/that-feeling-2-vol6-trial.html' },
  // 系列三：詛咒心理
  { series: 3, seriesName: '詛咒心理',   seriesColor: '#2c3e50', vol: 1, title: '詛咒是真的嗎',         trial: '/that-feeling-3-vol1-trial.html' },
  { series: 3, seriesName: '詛咒心理',   seriesColor: '#2c3e50', vol: 2, title: '你被詛咒了嗎',         trial: '/that-feeling-3-vol2-trial.html' },
  { series: 3, seriesName: '詛咒心理',   seriesColor: '#2c3e50', vol: 3, title: '世界怎麼詛咒人',       trial: '/that-feeling-3-vol3-trial.html' },
  { series: 3, seriesName: '詛咒心理',   seriesColor: '#2c3e50', vol: 4, title: '家族的咒',             trial: '/that-feeling-3-vol4-trial.html' },
  { series: 3, seriesName: '詛咒心理',   seriesColor: '#2c3e50', vol: 5, title: '詛咒怎麼殺人・解咒之道', trial: '/that-feeling-3-vol5-trial.html' },
  { series: 3, seriesName: '詛咒心理',   seriesColor: '#2c3e50', vol: 6, title: '解咒',                 trial: '/that-feeling-3-vol6-trial.html' },
  // 系列四：死亡不死（無 Vol.4，共 5 冊）
  { series: 4, seriesName: '死亡不死',   seriesColor: '#5d6d7e', vol: 1, title: '你為什麼怕死',         trial: '/that-feeling-4-vol1-trial.html' },
  { series: 4, seriesName: '死亡不死',   seriesColor: '#5d6d7e', vol: 2, title: '瀕死之後',             trial: '/that-feeling-4-vol2-trial.html' },
  { series: 4, seriesName: '死亡不死',   seriesColor: '#5d6d7e', vol: 3, title: '與死者同在',           trial: '/that-feeling-4-vol3-trial.html' },
  { series: 4, seriesName: '死亡不死',   seriesColor: '#5d6d7e', vol: 5, title: '不死的執念',           trial: '/that-feeling-4-vol5-trial.html' },
  { series: 4, seriesName: '死亡不死',   seriesColor: '#5d6d7e', vol: 6, title: '好好告別',             trial: '/that-feeling-4-vol6-trial.html' },
  // 系列五：集體靈異
  { series: 5, seriesName: '集體靈異',   seriesColor: '#1a6b4a', vol: 1, title: '你們都看見了',         trial: '/that-feeling-5-vol1-trial.html' },
  { series: 5, seriesName: '集體靈異',   seriesColor: '#1a6b4a', vol: 2, title: '都市傳說解剖',         trial: '/that-feeling-5-vol2-trial.html' },
  { series: 5, seriesName: '集體靈異',   seriesColor: '#1a6b4a', vol: 3, title: 'UFO 與我們',           trial: '/that-feeling-5-vol3-trial.html' },
  { series: 5, seriesName: '集體靈異',   seriesColor: '#1a6b4a', vol: 4, title: '恐慌怎麼擴散',         trial: '/that-feeling-5-vol4-trial.html' },
  { series: 5, seriesName: '集體靈異',   seriesColor: '#1a6b4a', vol: 5, title: '邪教的邏輯',           trial: '/that-feeling-5-vol5-trial.html' },
  { series: 5, seriesName: '集體靈異',   seriesColor: '#1a6b4a', vol: 6, title: '你記錯了，我們一起記錯了', trial: '/that-feeling-5-vol6-trial.html' },
  // 系列六：科學邊界
  { series: 6, seriesName: '科學邊界',   seriesColor: '#1565a0', vol: 1, title: '儀器測到了，但科學家不敢說', trial: '/that-feeling-6-vol1-trial.html' },
  { series: 6, seriesName: '科學邊界',   seriesColor: '#1565a0', vol: 2, title: '那個實驗從來沒有結論', trial: '/that-feeling-6-vol2-trial.html' },
  { series: 6, seriesName: '科學邊界',   seriesColor: '#1565a0', vol: 3, title: '你的大腦在你死後還在運作', trial: '/that-feeling-6-vol3-trial.html' },
  { series: 6, seriesName: '科學邊界',   seriesColor: '#1565a0', vol: 4, title: '當科學碰到邊界',       trial: '/that-feeling-6-vol4-trial.html' },
  { series: 6, seriesName: '科學邊界',   seriesColor: '#1565a0', vol: 5, title: '他們研究這個，然後不說話了', trial: '/that-feeling-6-vol5-trial.html' },
  { series: 6, seriesName: '科學邊界',   seriesColor: '#1565a0', vol: 6, title: '那些論文，最後沒有寄出去', trial: '/that-feeling-6-vol6-trial.html' },
]

const SERIES_META: Record<number, { emoji: string; tagline: string; cover: string }> = {
  1: { emoji: '🌌', tagline: '你離開身體的那一刻，發生了什麼？',                cover: 'https://88lwhikbeo2pkibc.public.blob.vercel-storage.com/covers/that-feeling/that-feeling-01.png' },
  2: { emoji: '🏮', tagline: '這座島上，曾經發生過太多說不清楚的事。',           cover: 'https://88lwhikbeo2pkibc.public.blob.vercel-storage.com/covers/that-feeling/that-feeling-02.png' },
  3: { emoji: '🖤', tagline: '你有沒有被咒過？還是你在不知情咒別人？',           cover: 'https://88lwhikbeo2pkibc.public.blob.vercel-storage.com/covers/that-feeling/that-feeling-03.png' },
  4: { emoji: '⚰️', tagline: '每個人都在逃避這個話題，但它從未停止等你。',       cover: 'https://88lwhikbeo2pkibc.public.blob.vercel-storage.com/covers/that-feeling/that-feeling-04.png' },
  5: { emoji: '👁️', tagline: '當很多人同時看見同一件事，那是真實的嗎？',         cover: 'https://88lwhikbeo2pkibc.public.blob.vercel-storage.com/covers/that-feeling/that-feeling-05.png' },
  6: { emoji: '🔬', tagline: '那些科學說「不確定」的事情，才是最有趣的。',       cover: 'https://88lwhikbeo2pkibc.public.blob.vercel-storage.com/covers/that-feeling/that-feeling-06.png' },
}

const SHARE_TITLE = '你也有過「那個感覺」嗎？'
const SHARE_CONTENT = '我在 Still Time 找到「那個感覺」，35 個故事陪你走過情緒夜晚，你也來看看吧！\nhttps://surprise-corner.vercel.app/feeling'

// ── 大型分享區塊 ──────────────────────────────────────────────────
function BigShareBlock({ label }: { label: string }) {
  return (
    <div style={{
      background: 'linear-gradient(135deg, rgba(255,248,230,0.97), rgba(255,240,210,0.92))',
      border: '1.5px solid rgba(200,150,50,0.28)',
      borderRadius: 18,
      padding: '22px 22px 18px',
      textAlign: 'center',
    }}>
      <p style={{ margin: '0 0 4px', fontWeight: 700, color: '#7a4a10', fontSize: '0.97rem', fontFamily: 'sans-serif' }}>
        🫂 {label}
      </p>
      <p style={{ margin: '0 0 14px', color: '#9a6830', fontSize: '0.8rem', fontFamily: 'sans-serif' }}>
        「我在 Still Time 找到「那個感覺」，你也來看看吧！」
      </p>
      <ShareButtons title={SHARE_TITLE} content={SHARE_CONTENT} />
    </div>
  )
}

// ── 導流條 ────────────────────────────────────────────────────────
function LeadOut() {
  return (
    <div style={{ marginTop: 18, padding: '12px 16px', borderRadius: 10, background: 'rgba(255,248,230,0.8)', border: '1px solid rgba(200,150,50,0.18)', textAlign: 'center' }}>
      <span style={{ color: '#8a5a20', fontSize: '0.82rem', fontFamily: 'sans-serif' }}>
        想看更深入的心理學？
      </span>
      <a href="https://still-time-corner.vercel.app/digital" target="_blank" rel="noopener noreferrer"
        style={{ marginLeft: 8, color: '#c8762a', fontWeight: 700, fontSize: '0.82rem', fontFamily: 'sans-serif', textDecoration: 'none', borderBottom: '1px solid #c8762a55' }}>
        去有的沒的小舖 →
      </a>
    </div>
  )
}

// ── 書卡 ──────────────────────────────────────────────────────────
function BookCard({ book }: { book: typeof BOOKS[0] }) {
  const [shareOpen, setShareOpen] = useState(false)
  const meta = SERIES_META[book.series]

  return (
    <div style={{
      background: '#fff',
      borderRadius: 11,
      border: `1.5px solid ${book.seriesColor}20`,
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <div style={{ height: 3, background: book.seriesColor }} />
      <div style={{ padding: '13px 13px 10px', flex: 1, display: 'flex', flexDirection: 'column', gap: 5 }}>
        {/* 系列標 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <span style={{ fontSize: '0.85rem' }}>{meta.emoji}</span>
          <span style={{ fontSize: '0.67rem', color: book.seriesColor, fontWeight: 700, fontFamily: 'sans-serif', letterSpacing: '0.06em' }}>
            {book.seriesName} Vol.{book.vol}
          </span>
        </div>
        {/* 封面 + 書名 */}
        <div style={{ display: 'flex', gap: 9, alignItems: 'flex-start' }}>
          <img src={meta.cover} alt={book.seriesName}
            style={{ width: 38, height: 52, objectFit: 'cover', borderRadius: 3, flexShrink: 0, border: '1px solid rgba(0,0,0,0.07)' }}
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
          <h3 style={{ margin: 0, fontSize: '0.87rem', fontWeight: 600, color: '#1a0f05', lineHeight: 1.45, fontFamily: 'sans-serif', flex: 1 }}>
            {book.title}
          </h3>
        </div>
        {/* 按鈕列 */}
        <div style={{ display: 'flex', gap: 6, marginTop: 'auto', paddingTop: 7 }}>
          <a href={book.trial} target="_blank" rel="noopener noreferrer"
            style={{
              padding: '5px 11px', borderRadius: 14,
              background: book.seriesColor, color: '#fff',
              textDecoration: 'none', fontSize: '0.73rem', fontFamily: 'sans-serif', fontWeight: 700,
            }}>
            試讀 →
          </a>
          <button onClick={() => setShareOpen(o => !o)}
            style={{
              padding: '5px 9px', borderRadius: 14,
              background: shareOpen ? '#f5e8c8' : '#f5f5f0',
              color: '#8a5020', border: '1px solid rgba(180,120,40,0.22)',
              cursor: 'pointer', fontSize: '0.73rem', fontFamily: 'sans-serif',
            }}>
            {shareOpen ? '收起' : '分享'}
          </button>
        </div>
        {shareOpen && (
          <div style={{ marginTop: 6 }}>
            <ShareButtons
              title={`那個感覺・${book.seriesName}｜${book.title}`}
              content={`我在 Still Time 讀到「${book.title}」，你也來看看！\nhttps://surprise-corner.vercel.app/feeling`}
            />
          </div>
        )}
      </div>
    </div>
  )
}

// ── 其他好康 ─────────────────────────────────────────────────────
const EXTRAS = [
  { icon: '🧠', title: '情緒小測驗',   desc: '依附類型、心理防禦，測出來了嗎？',         href: '/quiz',       cta: '去測測看',   color: '#7c3aed', bg: 'rgba(124,58,237,0.05)',  border: 'rgba(124,58,237,0.16)' },
  { icon: '♈', title: '今日星座運勢', desc: '每天更新，看看宇宙今天對你說什麼。',        href: '/horoscope',  cta: '看運勢',     color: '#db2777', bg: 'rgba(219,39,119,0.05)', border: 'rgba(219,39,119,0.16)' },
  { icon: '🔮', title: '塔羅占卜',     desc: '抽一張牌，讓牌說說今天的方向。',           href: '/tarot',      cta: '抽一張牌',   color: '#9333ea', bg: 'rgba(147,51,234,0.05)', border: 'rgba(147,51,234,0.16)' },
  { icon: '☯️', title: '八字命盤',     desc: '輸入生辰，看看你的先天性格底色。',         href: '/bazi',       cta: '算算看',     color: '#b45309', bg: 'rgba(180,83,9,0.05)',   border: 'rgba(180,83,9,0.16)'  },
  { icon: '🌙', title: '月亮星座',     desc: '你的內在情緒語言，月亮星座說得最準。',     href: '/moon-sign',  cta: '找月亮',     color: '#0369a1', bg: 'rgba(3,105,161,0.05)',  border: 'rgba(3,105,161,0.16)' },
  { icon: '💬', title: '魯魯聊天室',   desc: '跟 AI 魯魯說說心事，只陪不評判。',         href: '/chat/lulu',  cta: '找魯魯說話', color: '#0d9488', bg: 'rgba(13,148,136,0.05)', border: 'rgba(13,148,136,0.16)' },
  { icon: '🎮', title: '小遊戲',       desc: '兔子釣魚、數獨……睡前清空大腦用的。',       href: '/games',      cta: '來玩一下',   color: '#d97706', bg: 'rgba(217,119,6,0.05)',  border: 'rgba(217,119,6,0.16)'  },
  { icon: '🌌', title: '每日驚喜',     desc: '冷知識・小測驗・隨機療癒，今天不一樣。', href: '/random',     cta: '給我驚喜',   color: '#64748b', bg: 'rgba(100,116,139,0.05)', border: 'rgba(100,116,139,0.16)' },
]

// ── 主頁面 ────────────────────────────────────────────────────────
export default function FeelingPage() {
  const seriesIds = [1, 2, 3, 4, 5, 6]

  return (
    <main style={{ minHeight: '100vh', background: '#faf7f2', paddingBottom: 80 }}>

      {/* ══ Hero ══════════════════════════════════════════════════ */}
      <section style={{
        background: 'linear-gradient(160deg, #fdf6e3 0%, #faf0d7 50%, #f5e8c8 100%)',
        padding: 'clamp(48px, 8vw, 80px) 24px clamp(36px, 6vw, 60px)',
        textAlign: 'center',
        borderBottom: '1px solid rgba(200,160,60,0.16)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: -80, right: -80, width: 260, height: 260, borderRadius: '50%', background: 'rgba(210,160,60,0.06)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -50, left: -50, width: 180, height: 180, borderRadius: '50%', background: 'rgba(180,120,40,0.04)', pointerEvents: 'none' }} />
        <p style={{ margin: '0 0 14px', fontSize: '0.74rem', letterSpacing: '0.38em', color: '#b08040', fontFamily: 'sans-serif' }}>
          SURPRISE CORNER
        </p>
        <h1 style={{ margin: '0 0 16px', fontSize: 'clamp(1.9rem, 5.5vw, 3.4rem)', fontWeight: 400, color: '#2a1800', lineHeight: 1.2, fontFamily: 'Georgia, serif', letterSpacing: '0.02em' }}>
          你也有過「那個感覺」嗎？
        </h1>
        <p style={{ margin: '0 auto 30px', maxWidth: 500, fontSize: 'clamp(0.88rem, 2.2vw, 1.08rem)', color: '#8a6030', lineHeight: 1.8, fontFamily: 'sans-serif' }}>
          35 個故事・測驗・運勢・遊戲<br />
          <span style={{ color: '#a07040', fontSize: '0.9em' }}>陪你療癒每個情緒夜晚</span>
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="#tf-series" style={{
            display: 'inline-block', padding: '13px 34px', borderRadius: 32,
            background: 'linear-gradient(135deg, #c8862a, #9a5010)',
            color: '#fff', textDecoration: 'none',
            fontFamily: 'sans-serif', fontWeight: 700, fontSize: '0.94rem',
            boxShadow: '0 4px 18px rgba(160,80,16,0.26)', letterSpacing: '0.04em',
          }}>
            免費試讀全系列 35 冊 ↓
          </a>
          <a href="https://still-time-corner.vercel.app/digital" target="_blank" rel="noopener noreferrer" style={{
            display: 'inline-block', padding: '13px 28px', borderRadius: 32,
            background: 'rgba(255,255,255,0.75)', color: '#8a5020',
            border: '1.5px solid rgba(180,120,40,0.32)',
            textDecoration: 'none', fontFamily: 'sans-serif', fontWeight: 500, fontSize: '0.88rem',
          }}>
            去小舖買完整版 ✨
          </a>
        </div>
      </section>

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '30px 18px 0' }}>

        {/* ══ 頂部分享 ══════════════════════════════════════════════ */}
        <BigShareBlock label="邀請朋友一起療癒，傳出去吧" />

        {/* ══ 那個感覺 35 本 ════════════════════════════════════════ */}
        <section id="tf-series" style={{ marginTop: 36 }}>
          <div style={{ marginBottom: 20 }}>
            <p style={{ margin: '0 0 3px', fontSize: '0.71rem', letterSpacing: '0.32em', color: '#b08040', fontFamily: 'sans-serif', fontWeight: 600 }}>■ 那個感覺 系列</p>
            <p style={{ margin: 0, color: '#8a6030', fontSize: '0.84rem', fontFamily: 'sans-serif' }}>
              6 大系列 · 35 冊故事，點「試讀」直接開啟，不需登入
            </p>
          </div>

          {seriesIds.map(sid => {
            const seriesBooks = BOOKS.filter(b => b.series === sid)
            const meta = SERIES_META[sid]
            const first = seriesBooks[0]
            return (
              <div key={sid} style={{ marginBottom: 30 }}>
                {/* 系列標題 */}
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '8px 14px', borderRadius: 8,
                  background: first.seriesColor + '10',
                  border: `1px solid ${first.seriesColor}28`,
                  marginBottom: 10,
                }}>
                  <span style={{ fontSize: '1.1rem' }}>{meta.emoji}</span>
                  <div style={{ flex: 1 }}>
                    <span style={{ fontWeight: 700, color: first.seriesColor, fontSize: '0.84rem', fontFamily: 'sans-serif' }}>
                      系列 {sid}｜{first.seriesName}
                    </span>
                    <span style={{ marginLeft: 10, color: '#9a7040', fontSize: '0.76rem', fontFamily: 'sans-serif' }}>
                      {meta.tagline}
                    </span>
                  </div>
                  <span style={{ fontSize: '0.72rem', color: first.seriesColor, fontFamily: 'sans-serif', flexShrink: 0 }}>
                    {seriesBooks.length} 冊
                  </span>
                </div>
                {/* 書卡網格 */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 9 }}>
                  {seriesBooks.map(b => <BookCard key={`${b.series}-${b.vol}`} book={b} />)}
                </div>
              </div>
            )
          })}

          <LeadOut />
        </section>

        {/* ══ 其他好康 ══════════════════════════════════════════════ */}
        <section style={{ marginTop: 44 }}>
          <div style={{ marginBottom: 18 }}>
            <p style={{ margin: '0 0 3px', fontSize: '0.71rem', letterSpacing: '0.32em', color: '#b08040', fontFamily: 'sans-serif', fontWeight: 600 }}>■ 驚喜角落還有這些</p>
            <p style={{ margin: 0, color: '#8a6030', fontSize: '0.84rem', fontFamily: 'sans-serif' }}>測驗・運勢・聊天・遊戲，全免費不用登入</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(205px, 1fr))', gap: 9 }}>
            {EXTRAS.map(ex => (
              <Link key={ex.href} href={ex.href} style={{
                display: 'block', padding: '17px 15px', borderRadius: 11,
                background: ex.bg, border: `1.5px solid ${ex.border}`, textDecoration: 'none',
              }}>
                <span style={{ fontSize: '1.65rem', display: 'block', marginBottom: 6 }}>{ex.icon}</span>
                <h3 style={{ margin: '0 0 4px', fontSize: '0.9rem', fontWeight: 700, color: '#1a0f05', fontFamily: 'sans-serif' }}>{ex.title}</h3>
                <p style={{ margin: '0 0 9px', fontSize: '0.77rem', color: '#6a4a28', lineHeight: 1.55, fontFamily: 'sans-serif' }}>{ex.desc}</p>
                <span style={{ fontSize: '0.77rem', color: ex.color, fontFamily: 'sans-serif', fontWeight: 700 }}>{ex.cta} →</span>
              </Link>
            ))}
          </div>
          <LeadOut />
        </section>

        {/* ══ 底部分享 ══════════════════════════════════════════════ */}
        <section style={{ marginTop: 48 }}>
          <BigShareBlock label="分享這個角落給朋友" />
          <p style={{ marginTop: 12, textAlign: 'center', color: '#aaa', fontSize: '0.76rem', fontFamily: 'sans-serif' }}>
            完整版心理學書籍在
            <a href="https://still-time-corner.vercel.app/digital" target="_blank" rel="noopener noreferrer"
              style={{ color: '#c8762a', marginLeft: 4, borderBottom: '1px solid #c8762a40' }}>
              有的沒的小舖 ✨
            </a>
          </p>
        </section>

      </div>
    </main>
  )
}
