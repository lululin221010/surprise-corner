'use client'

import Link from 'next/link'
import { useState } from 'react'
import ShareButtons from '@/components/ShareButtons'

// ─────────────────────────────────────────────────────────────────
// 35 本書（MD frontmatter 來源，death 系列無 Vol.4）
// soul=S1 taiwan=S2 curse=S3 death=S4 collective=S5 science=S6
// ─────────────────────────────────────────────────────────────────
const BOOKS = [
  { s:1, v:1, title:'你離開身體的那一刻',       trial:'/that-feeling-1-vol1-trial.html' },
  { s:1, v:2, title:'你不是你以為的你',          trial:'/that-feeling-1-vol2-trial.html' },
  { s:1, v:3, title:'睡著之後你去了哪裡',        trial:'/that-feeling-1-vol3-trial.html' },
  { s:1, v:4, title:'另一個人的記憶',            trial:'/that-feeling-1-vol4-trial.html' },
  { s:1, v:5, title:'意識的邊界在哪裡',          trial:'/that-feeling-1-vol5-trial.html' },
  { s:1, v:6, title:'你和你之間的距離',          trial:'/that-feeling-1-vol6-trial.html' },

  { s:2, v:1, title:'這裡本來就不一樣',          trial:'/that-feeling-2-vol1-trial.html' },
  { s:2, v:2, title:'那些廟在說什麼',            trial:'/that-feeling-2-vol2-trial.html' },
  { s:2, v:3, title:'你家附近的鬼故事',          trial:'/that-feeling-2-vol3-trial.html' },
  { s:2, v:4, title:'死了要去哪',                trial:'/that-feeling-2-vol4-trial.html' },
  { s:2, v:5, title:'台灣人為什麼這麼怕',        trial:'/that-feeling-2-vol5-trial.html' },
  { s:2, v:6, title:'這塊土地上的聲音',          trial:'/that-feeling-2-vol6-trial.html' },

  { s:3, v:1, title:'詛咒是真的嗎',             trial:'/that-feeling-3-vol1-trial.html' },
  { s:3, v:2, title:'你被詛咒了嗎',             trial:'/that-feeling-3-vol2-trial.html' },
  { s:3, v:3, title:'世界怎麼詛咒人',           trial:'/that-feeling-3-vol3-trial.html' },
  { s:3, v:4, title:'家族的咒',                 trial:'/that-feeling-3-vol4-trial.html' },
  { s:3, v:5, title:'詛咒怎麼殺人・解咒之道',   trial:'/that-feeling-3-vol5-trial.html' },
  { s:3, v:6, title:'解咒',                     trial:'/that-feeling-3-vol6-trial.html' },

  { s:4, v:1, title:'你為什麼怕死',             trial:'/that-feeling-4-vol1-trial.html' },
  { s:4, v:2, title:'瀕死之後',                 trial:'/that-feeling-4-vol2-trial.html' },
  { s:4, v:3, title:'與死者同在',               trial:'/that-feeling-4-vol3-trial.html' },
  { s:4, v:5, title:'不死的執念',               trial:'/that-feeling-4-vol5-trial.html' },
  { s:4, v:6, title:'好好告別',                 trial:'/that-feeling-4-vol6-trial.html' },

  { s:5, v:1, title:'你們都看見了',             trial:'/that-feeling-5-vol1-trial.html' },
  { s:5, v:2, title:'都市傳說解剖',             trial:'/that-feeling-5-vol2-trial.html' },
  { s:5, v:3, title:'UFO 與我們',               trial:'/that-feeling-5-vol3-trial.html' },
  { s:5, v:4, title:'恐慌怎麼擴散',             trial:'/that-feeling-5-vol4-trial.html' },
  { s:5, v:5, title:'邪教的邏輯',               trial:'/that-feeling-5-vol5-trial.html' },
  { s:5, v:6, title:'你記錯了，我們一起記錯了', trial:'/that-feeling-5-vol6-trial.html' },

  { s:6, v:1, title:'儀器測到了，但科學家不敢說',   trial:'/that-feeling-6-vol1-trial.html' },
  { s:6, v:2, title:'那個實驗從來沒有結論',         trial:'/that-feeling-6-vol2-trial.html' },
  { s:6, v:3, title:'你的大腦在你死後還在運作',     trial:'/that-feeling-6-vol3-trial.html' },
  { s:6, v:4, title:'當科學碰到邊界',               trial:'/that-feeling-6-vol4-trial.html' },
  { s:6, v:5, title:'他們研究這個，然後不說話了',   trial:'/that-feeling-6-vol5-trial.html' },
  { s:6, v:6, title:'那些論文，最後沒有寄出去',     trial:'/that-feeling-6-vol6-trial.html' },
] as const

// ─────────────────────────────────────────────────────────────────
// 系列 meta
// ─────────────────────────────────────────────────────────────────
const SERIES: Record<number, { name:string; tagline:string; emoji:string; color:string; cover:string }> = {
  1: { name:'靈魂與意識', emoji:'🌌', color:'#6b4fa0', tagline:'你離開身體的那一刻，發生了什麼？',           cover:'https://88lwhikbeo2pkibc.public.blob.vercel-storage.com/covers/that-feeling/that-feeling-01.png' },
  2: { name:'台灣在地',   emoji:'🏮', color:'#c0392b', tagline:'這座島上，曾經發生過太多說不清楚的事。',     cover:'https://88lwhikbeo2pkibc.public.blob.vercel-storage.com/covers/that-feeling/that-feeling-02.png' },
  3: { name:'詛咒心理',   emoji:'🖤', color:'#2c3e50', tagline:'你有沒有被咒過？還是你在不知情咒別人？',     cover:'https://88lwhikbeo2pkibc.public.blob.vercel-storage.com/covers/that-feeling/that-feeling-03.png' },
  4: { name:'死亡不死',   emoji:'⚰️', color:'#5d6d7e', tagline:'每個人都在逃避這個話題，但它從未停止等你。', cover:'https://88lwhikbeo2pkibc.public.blob.vercel-storage.com/covers/that-feeling/that-feeling-04.png' },
  5: { name:'集體靈異',   emoji:'👁️', color:'#1a6b4a', tagline:'當很多人同時看見同一件事，那是真實的嗎？',   cover:'https://88lwhikbeo2pkibc.public.blob.vercel-storage.com/covers/that-feeling/that-feeling-05.png' },
  6: { name:'科學邊界',   emoji:'🔬', color:'#1565a0', tagline:'那些科學說「不確定」的事情，才是最有趣的。', cover:'https://88lwhikbeo2pkibc.public.blob.vercel-storage.com/covers/that-feeling/that-feeling-06.png' },
}

// ─────────────────────────────────────────────────────────────────
// 本週新感覺（每週手動換這裡就好）
// ─────────────────────────────────────────────────────────────────
const THIS_WEEK = [
  { title:'你離開身體的那一刻', series:'靈魂與意識', trial:'/that-feeling-1-vol1-trial.html', color:'#6b4fa0', why:'靈魂出竅真的發生過嗎？本週最推首讀。' },
  { title:'詛咒是真的嗎',       series:'詛咒心理',   trial:'/that-feeling-3-vol1-trial.html', color:'#2c3e50', why:'詛咒的科學解釋，比你以為的更可怕。' },
  { title:'你為什麼怕死',       series:'死亡不死',   trial:'/that-feeling-4-vol1-trial.html', color:'#5d6d7e', why:'每個人都該讀一次的死亡課。' },
]

// ─────────────────────────────────────────────────────────────────
// 情緒工具箱
// ─────────────────────────────────────────────────────────────────
const TOOLS = [
  { icon:'🧠', title:'情緒測驗',   desc:'依附類型・心理防禦機制',     href:'/quiz',      color:'#7c3aed' },
  { icon:'🔮', title:'塔羅占卜',   desc:'抽一張牌，讓牌說話',         href:'/tarot',     color:'#9333ea' },
  { icon:'☯️', title:'八字命盤',   desc:'生辰洩漏的性格底色',         href:'/bazi',      color:'#b45309' },
  { icon:'💬', title:'魯魯聊天',   desc:'只陪不評判的 AI 好友',       href:'/chat/lulu', color:'#0d9488' },
  { icon:'🎮', title:'小遊戲',     desc:'睡前五分鐘清空大腦',         href:'/games',     color:'#d97706' },
]

// ─────────────────────────────────────────────────────────────────
// 分享文案
// ─────────────────────────────────────────────────────────────────
const PAGE_URL  = 'https://surprise-corner.vercel.app/feeling'
const SHARE = {
  title:   '你也有過「那個感覺」嗎？',
  line:    `我在 Surprise Corner 找到「那個感覺」系列，35 個故事陪你療癒每個情緒夜晚 👉 ${PAGE_URL}`,
  fb:      `我在 Surprise Corner 找到「那個感覺」，靈異・心理・科學 35 冊免費閱讀！ ${PAGE_URL}`,
  copy:    `你也有過「那個感覺」嗎？\n35 個故事・測驗・運勢・遊戲，免費！\n👉 ${PAGE_URL}`,
}

// ─────────────────────────────────────────────────────────────────
// 元件：大型分享區塊（頭尾各一）
// ─────────────────────────────────────────────────────────────────
function BigShareBlock({ label }: { label: string }) {
  const [copied, setCopied] = useState(false)

  function shareLine() {
    window.open(`https://line.me/R/msg/text/?${encodeURIComponent(SHARE.line)}`, '_blank')
  }
  function shareFb() {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(PAGE_URL)}`, '_blank')
  }
  function shareThreads() {
    window.open(`https://www.threads.net/intent/post?text=${encodeURIComponent(SHARE.line)}`, '_blank')
  }
  function copyLink() {
    navigator.clipboard.writeText(SHARE.copy).then(() => {
      setCopied(true); setTimeout(() => setCopied(false), 2200)
    })
  }

  return (
    <div style={{
      background: 'linear-gradient(135deg,#fdf6e3,#faf0d7)',
      border: '1.5px solid rgba(200,150,50,0.28)',
      borderRadius: 18, padding: '22px 22px 20px', textAlign: 'center',
    }}>
      <p style={{ margin:'0 0 4px', fontWeight:700, color:'#7a4a10', fontSize:'0.97rem', fontFamily:'sans-serif' }}>
        🫂 {label}
      </p>
      <p style={{ margin:'0 0 16px', color:'#9a6830', fontSize:'0.8rem', fontFamily:'sans-serif' }}>
        「我在 Still Time 找到那個感覺，你也來看看吧！」
      </p>
      <div style={{ display:'flex', gap:10, justifyContent:'center', flexWrap:'wrap' }}>
        {/* LINE */}
        <button onClick={shareLine} style={{ display:'flex', alignItems:'center', gap:6, padding:'8px 18px', borderRadius:20, background:'#00B900', color:'#fff', border:'none', cursor:'pointer', fontSize:'0.84rem', fontFamily:'sans-serif', fontWeight:700 }}>
          <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/></svg>
          LINE 分享
        </button>
        {/* Facebook */}
        <button onClick={shareFb} style={{ display:'flex', alignItems:'center', gap:6, padding:'8px 18px', borderRadius:20, background:'#1877F2', color:'#fff', border:'none', cursor:'pointer', fontSize:'0.84rem', fontFamily:'sans-serif', fontWeight:700 }}>
          <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
          FB 分享
        </button>
        {/* Threads */}
        <button onClick={shareThreads} style={{ display:'flex', alignItems:'center', gap:6, padding:'8px 18px', borderRadius:20, background:'#000', color:'#fff', border:'none', cursor:'pointer', fontSize:'0.84rem', fontFamily:'sans-serif', fontWeight:700 }}>
          <svg width="16" height="16" fill="currentColor" viewBox="0 0 192 192"><path d="M141.537 88.988a66.667 66.667 0 0 0-2.518-1.143c-1.482-27.307-16.403-42.94-41.457-43.1h-.34c-14.986 0-27.449 6.396-35.12 18.036l13.779 9.452c5.73-8.695 14.724-10.548 21.348-10.548h.229c8.249.053 14.474 2.452 18.503 7.129 2.932 3.405 4.893 8.111 5.864 14.05-7.314-1.243-15.224-1.626-23.68-1.14-23.82 1.371-39.134 15.264-38.105 34.568.522 9.792 5.4 18.216 13.735 23.719 7.047 4.652 16.124 6.927 25.557 6.412 12.458-.683 22.231-5.436 29.049-14.127 5.178-6.6 8.453-15.153 9.899-25.93 5.937 3.583 10.337 8.298 12.767 13.966 4.132 9.635 4.373 25.468-8.546 38.376-11.319 11.308-24.925 16.2-45.488 16.351-22.809-.169-40.051-7.484-51.235-21.742C35.573 137.004 29.807 116.641 29.605 90c.202-26.641 5.968-47.004 17.142-60.516C57.93 15.226 75.172 7.911 97.981 7.742c22.976.17 40.526 7.52 52.171 21.847 5.71 7.026 10.015 15.86 12.853 26.162l16.147-4.308c-3.44-12.68-8.853-23.606-16.219-32.668C147.036 3.24 125.056-6.004 98.02 5.862c-27.16-.164-49.48 9.13-66.38 27.64C16.236 50.286 8.877 74.09 8.647 90c.23 15.91 7.59 39.714 23.013 56.496 16.9 18.51 39.22 27.804 66.38 27.64 27.036.164 48.68-8.958 65.145-27.072 14.79-16.39 14.425-36.892 9.527-49.533-3.674-9.263-10.549-16.881-20.175-22.543zM96.513 160.268c-10.481.578-21.404-2.597-29.054-8.567-6.184-4.816-9.302-11.17-9.596-16.977-.494-9.343 6.648-19.845 28.087-21.082 2.458-.141 4.863-.209 7.22-.209 5.801 0 11.226.539 16.19 1.584-1.834 22.786-11.919 43.817-12.847 45.251z"/></svg>
          Threads
        </button>
        {/* 複製 */}
        <button onClick={copyLink} style={{ display:'flex', alignItems:'center', gap:6, padding:'8px 18px', borderRadius:20, background: copied ? '#16a34a' : '#e8dcc8', color: copied ? '#fff' : '#7a4a10', border:'none', cursor:'pointer', fontSize:'0.84rem', fontFamily:'sans-serif', fontWeight:700, transition:'all 0.2s' }}>
          {copied ? '✓ 已複製！' : '複製連結'}
        </button>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────
// 元件：導流條
// ─────────────────────────────────────────────────────────────────
function LeadOut({ text = '想看更深入的心理學？' }: { text?: string }) {
  return (
    <div style={{ marginTop:18, padding:'11px 16px', borderRadius:10, background:'rgba(255,248,230,0.82)', border:'1px solid rgba(200,150,50,0.18)', display:'flex', alignItems:'center', justifyContent:'center', gap:8, flexWrap:'wrap' }}>
      <span style={{ color:'#8a5a20', fontSize:'0.82rem', fontFamily:'sans-serif' }}>{text}</span>
      <a href="https://still-time-corner.vercel.app/digital" target="_blank" rel="noopener noreferrer"
        style={{ color:'#c8762a', fontWeight:700, fontSize:'0.82rem', fontFamily:'sans-serif', textDecoration:'none', borderBottom:'1px solid #c8762a55' }}>
        去有的沒的小舖 →
      </a>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────
// 元件：書卡（含展開分享）
// ─────────────────────────────────────────────────────────────────
function BookCard({ book }: { book: typeof BOOKS[number] }) {
  const [shareOpen, setShareOpen] = useState(false)
  const meta = SERIES[book.s]

  return (
    <div style={{ background:'#fff', borderRadius:11, border:`1.5px solid ${meta.color}1e`, overflow:'hidden', display:'flex', flexDirection:'column' }}>
      <div style={{ height:3, background:meta.color }} />
      <div style={{ padding:'12px 12px 10px', flex:1, display:'flex', flexDirection:'column', gap:5 }}>
        <div style={{ display:'flex', alignItems:'center', gap:5 }}>
          <span style={{ fontSize:'0.82rem' }}>{meta.emoji}</span>
          <span style={{ fontSize:'0.65rem', color:meta.color, fontWeight:700, fontFamily:'sans-serif', letterSpacing:'0.05em' }}>
            {meta.name} Vol.{book.v}
          </span>
        </div>
        <div style={{ display:'flex', gap:8, alignItems:'flex-start' }}>
          <img src={meta.cover} alt={meta.name}
            style={{ width:34, height:48, objectFit:'cover', borderRadius:3, flexShrink:0, border:'1px solid rgba(0,0,0,0.06)' }}
            onError={(e)=>{ (e.target as HTMLImageElement).style.display='none' }} />
          <h3 style={{ margin:0, fontSize:'0.85rem', fontWeight:600, color:'#1a0f05', lineHeight:1.45, fontFamily:'sans-serif', flex:1 }}>
            {book.title}
          </h3>
        </div>
        <div style={{ display:'flex', gap:6, marginTop:'auto', paddingTop:6 }}>
          <a href={book.trial} target="_blank" rel="noopener noreferrer"
            style={{ padding:'4px 11px', borderRadius:13, background:meta.color, color:'#fff', textDecoration:'none', fontSize:'0.72rem', fontFamily:'sans-serif', fontWeight:700 }}>
            試讀 →
          </a>
          <button onClick={()=>setShareOpen(o=>!o)}
            style={{ padding:'4px 9px', borderRadius:13, background: shareOpen?'#f5e8c8':'#f5f5f0', color:'#8a5020', border:'1px solid rgba(180,120,40,0.2)', cursor:'pointer', fontSize:'0.72rem', fontFamily:'sans-serif' }}>
            {shareOpen?'收起':'分享'}
          </button>
        </div>
        {shareOpen && (
          <div style={{ marginTop:6 }}>
            <ShareButtons
              title={`那個感覺・${meta.name}｜${book.title}`}
              content={`我在 Surprise Corner 讀到「${book.title}」，你也來看看！\n${PAGE_URL}`}
            />
          </div>
        )}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────
// 主頁面
// ─────────────────────────────────────────────────────────────────
export default function FeelingPage() {
  const [openSeries, setOpenSeries] = useState<number | null>(null)

  function toggleSeries(sid: number) {
    setOpenSeries(prev => prev === sid ? null : sid)
  }

  return (
    <main style={{ minHeight:'100vh', background:'#faf7f2', paddingBottom:80, fontFamily:'sans-serif' }}>

      {/* ══════════════════ HERO ══════════════════════════════════ */}
      {/*
        ★ 未來換背景圖：在下方 section 的 style 加上
          backgroundImage: "url('/images/feeling-hero.jpg')",
          backgroundSize: 'cover', backgroundPosition: 'center'
        目前用純漸層色
      */}
      <section style={{
        background:'linear-gradient(155deg,#fdf6e3 0%,#faf0d7 45%,#f0e0c0 100%)',
        padding:'clamp(52px,9vw,88px) 24px clamp(40px,7vw,64px)',
        textAlign:'center',
        borderBottom:'1px solid rgba(200,160,60,0.15)',
        position:'relative', overflow:'hidden',
      }}>
        {/* 裝飾圓點 */}
        <div style={{ position:'absolute', top:-100, right:-80, width:300, height:300, borderRadius:'50%', background:'rgba(210,160,60,0.07)', pointerEvents:'none' }} />
        <div style={{ position:'absolute', bottom:-60, left:-60, width:200, height:200, borderRadius:'50%', background:'rgba(180,100,30,0.05)', pointerEvents:'none' }} />

        <p style={{ margin:'0 0 14px', fontSize:'0.72rem', letterSpacing:'0.42em', color:'#b08040' }}>SURPRISE CORNER</p>

        <h1 style={{ margin:'0 0 16px', fontSize:'clamp(2rem,5.8vw,3.6rem)', fontWeight:400, color:'#2a1800', lineHeight:1.18, fontFamily:'Georgia,serif', letterSpacing:'0.02em' }}>
          你也有過「那個感覺」嗎？
        </h1>

        <p style={{ margin:'0 auto 10px', maxWidth:520, fontSize:'clamp(0.9rem,2.2vw,1.08rem)', color:'#7a5820', lineHeight:1.82 }}>
          35 個故事．測驗．運勢．遊戲<br />
          <span style={{ color:'#a07040', fontSize:'0.92em' }}>每天陪你療癒</span>
        </p>

        {/* 誘因標語 */}
        <p style={{ margin:'0 auto 28px', maxWidth:420, fontSize:'0.83rem', color:'#9a6030', background:'rgba(255,220,140,0.35)', display:'inline-block', padding:'6px 18px', borderRadius:20, border:'1px solid rgba(200,150,50,0.3)' }}>
          ✨ 全部免費・不需登入・直接試讀
        </p>

        <div style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap' }}>
          <a href="#tf-series" style={{
            display:'inline-block', padding:'13px 36px', borderRadius:32,
            background:'linear-gradient(135deg,#c8862a,#9a5010)',
            color:'#fff', textDecoration:'none', fontWeight:700, fontSize:'0.95rem',
            boxShadow:'0 4px 20px rgba(160,80,16,0.28)', letterSpacing:'0.04em',
          }}>
            試讀 35 冊故事 ↓
          </a>
          <a href="https://still-time-corner.vercel.app/digital" target="_blank" rel="noopener noreferrer" style={{
            display:'inline-block', padding:'13px 28px', borderRadius:32,
            background:'rgba(255,255,255,0.78)', color:'#8a5020',
            border:'1.5px solid rgba(180,120,40,0.32)',
            textDecoration:'none', fontWeight:500, fontSize:'0.88rem',
          }}>
            去小舖看完整版 ✨
          </a>
        </div>
      </section>

      <div style={{ maxWidth:880, margin:'0 auto', padding:'30px 18px 0' }}>

        {/* ══ 頂部分享 ════════════════════════════════════════════ */}
        <BigShareBlock label="邀請朋友一起感受「那個感覺」" />

        {/* ══ 本週新感覺 ══════════════════════════════════════════ */}
        {/* ★ 維護說明：每週只要改上方 THIS_WEEK 陣列，這裡自動更新 */}
        <section style={{ marginTop:36 }}>
          <div style={{ marginBottom:16, display:'flex', alignItems:'baseline', gap:10 }}>
            <p style={{ margin:0, fontSize:'0.7rem', letterSpacing:'0.35em', color:'#b08040', fontWeight:700 }}>■ 本週新感覺</p>
            <span style={{ fontSize:'0.75rem', color:'#b08040', background:'rgba(200,150,50,0.12)', padding:'2px 10px', borderRadius:10, border:'1px solid rgba(200,150,50,0.25)' }}>每週更新</span>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))', gap:12 }}>
            {THIS_WEEK.map((item,i) => (
              <a key={i} href={item.trial} target="_blank" rel="noopener noreferrer"
                style={{ display:'block', padding:'18px 16px', borderRadius:12, background:'#fff', border:`2px solid ${item.color}30`, textDecoration:'none', position:'relative', overflow:'hidden' }}>
                <div style={{ position:'absolute', top:0, left:0, right:0, height:4, background:`linear-gradient(90deg,${item.color},${item.color}99)` }} />
                <span style={{ fontSize:'0.68rem', color:item.color, fontWeight:700, letterSpacing:'0.08em', display:'block', marginBottom:5 }}>
                  {item.series}
                </span>
                <h3 style={{ margin:'0 0 6px', fontSize:'0.95rem', fontWeight:700, color:'#1a0f05', lineHeight:1.4 }}>
                  {item.title}
                </h3>
                <p style={{ margin:'0 0 10px', fontSize:'0.78rem', color:'#7a5a38', lineHeight:1.55 }}>
                  {item.why}
                </p>
                <span style={{ fontSize:'0.75rem', color:item.color, fontWeight:700 }}>立刻試讀 →</span>
              </a>
            ))}
          </div>
        </section>

        {/* ══ 那個感覺 35 本（手風琴）═══════════════════════════ */}
        <section id="tf-series" style={{ marginTop:40 }}>
          <div style={{ marginBottom:18 }}>
            <p style={{ margin:'0 0 3px', fontSize:'0.7rem', letterSpacing:'0.35em', color:'#b08040', fontWeight:700 }}>■ 那個感覺 系列</p>
            <p style={{ margin:0, color:'#8a6030', fontSize:'0.83rem' }}>6 大系列 · 35 冊，點系列標題展開，點書名直接試讀</p>
          </div>

          {[1,2,3,4,5,6].map(sid => {
            const meta  = SERIES[sid]
            const books = BOOKS.filter(b => b.s === sid)
            const isOpen = openSeries === sid
            return (
              <div key={sid} style={{ marginBottom:10, borderRadius:13, border:`1.5px solid ${meta.color}25`, overflow:'hidden', background:'#fff' }}>
                {/* 手風琴頭：點擊展開 */}
                <button
                  onClick={() => toggleSeries(sid)}
                  style={{
                    width:'100%', display:'flex', alignItems:'center', gap:12, padding:'14px 16px',
                    background: isOpen ? `${meta.color}0f` : '#fff',
                    border:'none', cursor:'pointer', textAlign:'left',
                    borderBottom: isOpen ? `1px solid ${meta.color}20` : 'none',
                    transition:'background 0.2s',
                  }}
                >
                  <img src={meta.cover} alt={meta.name}
                    style={{ width:44, height:60, objectFit:'cover', borderRadius:4, flexShrink:0, border:`1px solid ${meta.color}30` }}
                    onError={(e)=>{ (e.target as HTMLImageElement).style.display='none' }} />
                  <div style={{ flex:1, minWidth:0, textAlign:'left' }}>
                    <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:3 }}>
                      <span style={{ fontSize:'1rem' }}>{meta.emoji}</span>
                      <span style={{ fontWeight:700, color:meta.color, fontSize:'0.86rem' }}>系列 {sid}｜{meta.name}</span>
                      <span style={{ fontSize:'0.71rem', color:'#aaa', marginLeft:'auto' }}>{books.length} 冊</span>
                    </div>
                    <p style={{ margin:0, fontSize:'0.78rem', color:'#7a5a38', lineHeight:1.5 }}>{meta.tagline}</p>
                  </div>
                  <span style={{ color:meta.color, fontSize:'1.1rem', flexShrink:0, transform: isOpen?'rotate(180deg)':'none', transition:'transform 0.25s' }}>▾</span>
                </button>

                {/* 展開：書卡網格 */}
                {isOpen && (
                  <div style={{ padding:'14px 14px 16px' }}>
                    <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(195px,1fr))', gap:8 }}>
                      {books.map(b => <BookCard key={`${b.s}-${b.v}`} book={b} />)}
                    </div>
                    {/* 系列底部導流 */}
                    <div style={{ marginTop:12, textAlign:'right' }}>
                      <a href="https://still-time-corner.vercel.app/digital" target="_blank" rel="noopener noreferrer"
                        style={{ fontSize:'0.78rem', color:meta.color, textDecoration:'none', borderBottom:`1px dashed ${meta.color}` }}>
                        深入閱讀心理學？去小舖看看 →
                      </a>
                    </div>
                  </div>
                )}
              </div>
            )
          })}

          <LeadOut />
        </section>

        {/* ══ 情緒工具箱 ═════════════════════════════════════════ */}
        <section style={{ marginTop:44 }}>
          <div style={{ marginBottom:16 }}>
            <p style={{ margin:'0 0 3px', fontSize:'0.7rem', letterSpacing:'0.35em', color:'#b08040', fontWeight:700 }}>■ 情緒工具箱</p>
            <p style={{ margin:0, color:'#8a6030', fontSize:'0.83rem' }}>測驗・占卜・聊天・遊戲，全免費</p>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(155px,1fr))', gap:10 }}>
            {TOOLS.map(tool => (
              <Link key={tool.href} href={tool.href} style={{
                display:'block', padding:'18px 14px', borderRadius:12,
                background:'#fff', border:`1.5px solid ${tool.color}20`,
                textDecoration:'none', textAlign:'center',
                transition:'box-shadow 0.15s',
              }}>
                <span style={{ fontSize:'1.8rem', display:'block', marginBottom:8 }}>{tool.icon}</span>
                <h3 style={{ margin:'0 0 4px', fontSize:'0.9rem', fontWeight:700, color:'#1a0f05' }}>{tool.title}</h3>
                <p style={{ margin:'0 0 8px', fontSize:'0.75rem', color:'#6a4a28', lineHeight:1.5 }}>{tool.desc}</p>
                <span style={{ fontSize:'0.75rem', color:tool.color, fontWeight:700 }}>進去看看 →</span>
              </Link>
            ))}
          </div>
          <LeadOut text="工具箱用完，還想繼續？" />
        </section>

        {/* ══ 快訊入口 ════════════════════════════════════════════ */}
        <section style={{ marginTop:36 }}>
          <Link href="/ai-news" style={{
            display:'flex', alignItems:'center', justifyContent:'space-between',
            padding:'16px 20px', borderRadius:12, background:'#fff',
            border:'1.5px solid rgba(100,116,139,0.2)', textDecoration:'none',
            flexWrap:'wrap', gap:8,
          }}>
            <div>
              <p style={{ margin:'0 0 3px', fontSize:'0.7rem', letterSpacing:'0.3em', color:'#64748b', fontWeight:700 }}>■ 快訊</p>
              <p style={{ margin:0, fontSize:'0.9rem', fontWeight:600, color:'#1a0f05' }}>📰 AI 快訊・今天發生了什麼</p>
              <p style={{ margin:'3px 0 0', fontSize:'0.77rem', color:'#6a7a8a' }}>每小時更新，掌握最新趨勢</p>
            </div>
            <span style={{ fontSize:'0.82rem', color:'#64748b', fontWeight:700 }}>前往 →</span>
          </Link>
        </section>

        {/* ══ 底部分享 ════════════════════════════════════════════ */}
        <section style={{ marginTop:48 }}>
          <BigShareBlock label="分享這個角落給朋友" />
          <p style={{ marginTop:12, textAlign:'center', color:'#aaa', fontSize:'0.76rem' }}>
            完整版心理學書籍在
            <a href="https://still-time-corner.vercel.app/digital" target="_blank" rel="noopener noreferrer"
              style={{ color:'#c8762a', marginLeft:4, borderBottom:'1px solid #c8762a40' }}>
              有的沒的小舖 ✨
            </a>
          </p>
        </section>

      </div>
    </main>
  )
}
