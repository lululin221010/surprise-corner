'use client'

import Link from 'next/link'
import { useState, Suspense } from 'react'
import dynamic from 'next/dynamic'
import ShareButtons from '@/components/ShareButtons'

const StarCanvas = dynamic(() => import('@/components/StarCanvas'), { ssr: false })

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
  line:    `我在 Still Time 看到這個感覺，你也來看看？ 👉 ${PAGE_URL}`,
  fb:      `我在 Still Time 看到這個感覺，你也來看看？ ${PAGE_URL}`,
  copy:    `我在 Still Time 看到這個感覺，你也來看看？\n👉 ${PAGE_URL}`,
}

// ─────────────────────────────────────────────────────────────────
// 元件：頂部小分享條（簡潔版）
// ─────────────────────────────────────────────────────────────────
function SmallShareBar() {
  const [copied, setCopied] = useState(false)
  const shareLine    = () => window.open(`https://line.me/R/msg/text/?${encodeURIComponent(SHARE.line)}`, '_blank')
  const shareFb      = () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(PAGE_URL)}`, '_blank')
  const shareThreads = () => window.open(`https://www.threads.net/intent/post?text=${encodeURIComponent(SHARE.line)}`, '_blank')
  const copyLink     = () => { navigator.clipboard.writeText(SHARE.copy).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2200) }) }

  return (
    <div style={{ display:'flex', alignItems:'center', gap:8, flexWrap:'wrap', padding:'10px 16px', borderRadius:10, background:'rgba(250,245,235,0.8)', border:'1px solid rgba(200,150,50,0.18)' }}>
      <span style={{ fontSize:'0.78rem', color:'#9a6830', fontFamily:'sans-serif', marginRight:4 }}>分享給朋友 →</span>
      <button onClick={shareLine}    style={{ padding:'5px 13px', borderRadius:14, background:'#00B900', color:'#fff', border:'none', cursor:'pointer', fontSize:'0.76rem', fontFamily:'sans-serif', fontWeight:700 }}>LINE</button>
      <button onClick={shareFb}      style={{ padding:'5px 13px', borderRadius:14, background:'#1877F2', color:'#fff', border:'none', cursor:'pointer', fontSize:'0.76rem', fontFamily:'sans-serif', fontWeight:700 }}>FB</button>
      <button onClick={shareThreads} style={{ padding:'5px 13px', borderRadius:14, background:'#000', color:'#fff', border:'none', cursor:'pointer', fontSize:'0.76rem', fontFamily:'sans-serif', fontWeight:700 }}>Threads</button>
      <button onClick={copyLink}     style={{ padding:'5px 13px', borderRadius:14, background: copied ? '#16a34a' : '#e8dcc8', color: copied ? '#fff' : '#7a4a10', border:'none', cursor:'pointer', fontSize:'0.76rem', fontFamily:'sans-serif', fontWeight:700, transition:'all 0.2s' }}>
        {copied ? '✓ 已複製' : '複製'}
      </button>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────
// 元件：底部大分享區塊
// ─────────────────────────────────────────────────────────────────
function BigShareBlock({ label }: { label: string }) {
  const [copied, setCopied] = useState(false)
  const shareLine    = () => window.open(`https://line.me/R/msg/text/?${encodeURIComponent(SHARE.line)}`, '_blank')
  const shareFb      = () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(PAGE_URL)}`, '_blank')
  const shareThreads = () => window.open(`https://www.threads.net/intent/post?text=${encodeURIComponent(SHARE.line)}`, '_blank')
  const copyLink     = () => { navigator.clipboard.writeText(SHARE.copy).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2200) }) }

  return (
    <div style={{ background:'linear-gradient(135deg,#fdf6e3,#faf0d7)', border:'1.5px solid rgba(200,150,50,0.28)', borderRadius:18, padding:'22px 22px 20px', textAlign:'center' }}>
      <p style={{ margin:'0 0 14px', fontWeight:700, color:'#7a4a10', fontSize:'0.93rem', fontFamily:'sans-serif' }}>🌙 {label}</p>
      <div style={{ display:'flex', gap:10, justifyContent:'center', flexWrap:'wrap' }}>
        <button onClick={shareLine}    style={{ display:'flex', alignItems:'center', gap:6, padding:'8px 18px', borderRadius:20, background:'#00B900', color:'#fff', border:'none', cursor:'pointer', fontSize:'0.84rem', fontFamily:'sans-serif', fontWeight:700 }}>
          <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24"><path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/></svg>
          LINE
        </button>
        <button onClick={shareFb}      style={{ display:'flex', alignItems:'center', gap:6, padding:'8px 18px', borderRadius:20, background:'#1877F2', color:'#fff', border:'none', cursor:'pointer', fontSize:'0.84rem', fontFamily:'sans-serif', fontWeight:700 }}>
          <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
          Facebook
        </button>
        <button onClick={shareThreads} style={{ display:'flex', alignItems:'center', gap:6, padding:'8px 18px', borderRadius:20, background:'#000', color:'#fff', border:'none', cursor:'pointer', fontSize:'0.84rem', fontFamily:'sans-serif', fontWeight:700 }}>
          <svg width="15" height="15" fill="currentColor" viewBox="0 0 192 192"><path d="M141.537 88.988a66.667 66.667 0 0 0-2.518-1.143c-1.482-27.307-16.403-42.94-41.457-43.1h-.34c-14.986 0-27.449 6.396-35.12 18.036l13.779 9.452c5.73-8.695 14.724-10.548 21.348-10.548h.229c8.249.053 14.474 2.452 18.503 7.129 2.932 3.405 4.893 8.111 5.864 14.05-7.314-1.243-15.224-1.626-23.68-1.14-23.82 1.371-39.134 15.264-38.105 34.568.522 9.792 5.4 18.216 13.735 23.719 7.047 4.652 16.124 6.927 25.557 6.412 12.458-.683 22.231-5.436 29.049-14.127 5.178-6.6 8.453-15.153 9.899-25.93 5.937 3.583 10.337 8.298 12.767 13.966 4.132 9.635 4.373 25.468-8.546 38.376-11.319 11.308-24.925 16.2-45.488 16.351-22.809-.169-40.051-7.484-51.235-21.742C35.573 137.004 29.807 116.641 29.605 90c.202-26.641 5.968-47.004 17.142-60.516C57.93 15.226 75.172 7.911 97.981 7.742c22.976.17 40.526 7.52 52.171 21.847 5.71 7.026 10.015 15.86 12.853 26.162l16.147-4.308c-3.44-12.68-8.853-23.606-16.219-32.668C147.036 3.24 125.056-6.004 98.02 5.862c-27.16-.164-49.48 9.13-66.38 27.64C16.236 50.286 8.877 74.09 8.647 90c.23 15.91 7.59 39.714 23.013 56.496 16.9 18.51 39.22 27.804 66.38 27.64 27.036.164 48.68-8.958 65.145-27.072 14.79-16.39 14.425-36.892 9.527-49.533-3.674-9.263-10.549-16.881-20.175-22.543zM96.513 160.268c-10.481.578-21.404-2.597-29.054-8.567-6.184-4.816-9.302-11.17-9.596-16.977-.494-9.343 6.648-19.845 28.087-21.082 2.458-.141 4.863-.209 7.22-.209 5.801 0 11.226.539 16.19 1.584-1.834 22.786-11.919 43.817-12.847 45.251z"/></svg>
          Threads
        </button>
        <button onClick={copyLink}     style={{ display:'flex', alignItems:'center', gap:6, padding:'8px 18px', borderRadius:20, background: copied ? '#16a34a' : '#e8dcc8', color: copied ? '#fff' : '#7a4a10', border:'none', cursor:'pointer', fontSize:'0.84rem', fontFamily:'sans-serif', fontWeight:700, transition:'all 0.2s' }}>
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

// 其他角落（用於折疊發現區）
const MORE_CORNERS = [
  { icon:'🏫', label:'小教室',   desc:'有趣的知識小課，那些沒人教你的事',  href:'/classroom', color:'#9333ea' },
  { icon:'📰', label:'AI 快訊', desc:'每小時更新，今天發生了什麼',         href:'/ai-news',   color:'#475569' },
  { icon:'📚', label:'書評角落', desc:'好書說給你聽，找到下一本',          href:'/books',     color:'#0369a1' },
]

// ─────────────────────────────────────────────────────────────────
// 主頁面
// ─────────────────────────────────────────────────────────────────
export default function FeelingPage() {
  const [openSeries,   setOpenSeries]   = useState<number | null>(null)
  const [moreExpanded, setMoreExpanded] = useState(false)

  return (
    <main style={{ minHeight:'100vh', background:'#faf7f2', paddingBottom:80, fontFamily:'sans-serif' }}>

      {/* ══════════════════ HERO（魯魯星空風）══════════════════════ */}
      <section style={{ position:'relative', minHeight:460, background:'#0d0820', overflow:'hidden', display:'flex', alignItems:'center', justifyContent:'center' }}>
        <Suspense fallback={null}>
          <StarCanvas />
        </Suspense>

        <div style={{ position:'relative', zIndex:10, textAlign:'center', padding:'52px 24px 60px', display:'flex', flexDirection:'column', alignItems:'center' }}>
          {/* 魯魯圓形照 */}
          <div style={{
            width:120, height:120, borderRadius:'50%', overflow:'hidden', marginBottom:20,
            border:'2.5px solid rgba(168,85,247,0.6)',
            boxShadow:'0 0 30px rgba(168,85,247,0.5), 0 0 60px rgba(88,28,135,0.35)',
          }}>
            <img src="/images/lulu.jpg" alt="魯魯" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
          </div>

          <p style={{ margin:'0 0 10px', fontSize:'0.68rem', letterSpacing:'0.42em', color:'#7c3aed' }}>SURPRISE CORNER</p>

          <h1 style={{ margin:'0 0 14px', fontSize:'clamp(1.7rem,5.2vw,3rem)', fontWeight:700, color:'#e9d5ff', lineHeight:1.25, letterSpacing:'0.02em' }}>
            你也有過「那個感覺」嗎？
          </h1>

          <p style={{ margin:'0 auto 8px', maxWidth:520, fontSize:'clamp(0.88rem,2vw,1rem)', color:'#c4b5fd', lineHeight:1.7 }}>
            35 個靈異故事 · 測驗 · 塔羅 · 運勢 · 遊戲 · 快訊……
          </p>
          <p style={{ margin:'0 auto 20px', maxWidth:380, fontSize:'0.8rem', color:'#9ca3af', lineHeight:1.65 }}>
            這裡有很多角落，等你慢慢探索
          </p>

          <p style={{ margin:'0 auto 24px', fontSize:'0.79rem', color:'#c4b5fd', background:'rgba(124,58,237,0.18)', display:'inline-block', padding:'5px 18px', borderRadius:18, border:'1px solid rgba(167,139,250,0.3)' }}>
            🎁 免費註冊，立即閱讀完整版
          </p>

          <a href="#tf-series" style={{
            display:'inline-block', padding:'11px 32px', borderRadius:28,
            background:'linear-gradient(135deg,#7c3aed,#4f1d96)',
            color:'#fff', textDecoration:'none', fontWeight:700, fontSize:'0.9rem',
            boxShadow:'0 4px 18px rgba(124,58,237,0.4)', letterSpacing:'0.03em',
          }}>
            開始探索 ↓
          </a>
        </div>
      </section>

      <div style={{ maxWidth:880, margin:'0 auto', padding:'28px 18px 0' }}>

        {/* ══ 本週新感覺 ══════════════════════════════════════════
            ★ 維護：每週只改上方 THIS_WEEK 陣列即可              */}
        <section>
          <div style={{ marginBottom:14, display:'flex', alignItems:'baseline', gap:10 }}>
            <p style={{ margin:0, fontSize:'0.68rem', letterSpacing:'0.35em', color:'#b08040', fontWeight:700 }}>■ 本週新感覺</p>
            <span style={{ fontSize:'0.73rem', color:'#b08040', background:'rgba(200,150,50,0.1)', padding:'2px 9px', borderRadius:9, border:'1px solid rgba(200,150,50,0.22)' }}>每週更新</span>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(230px,1fr))', gap:10 }}>
            {THIS_WEEK.map((item,i) => (
              <a key={i} href={item.trial} target="_blank" rel="noopener noreferrer"
                style={{ display:'block', padding:'16px 15px', borderRadius:11, background:'#fff', border:`2px solid ${item.color}28`, textDecoration:'none', position:'relative', overflow:'hidden' }}>
                <div style={{ position:'absolute', top:0, left:0, right:0, height:3, background:`linear-gradient(90deg,${item.color},${item.color}80)` }} />
                <span style={{ fontSize:'0.66rem', color:item.color, fontWeight:700, letterSpacing:'0.08em', display:'block', marginBottom:4 }}>{item.series}</span>
                <h3 style={{ margin:'0 0 5px', fontSize:'0.93rem', fontWeight:700, color:'#1a0f05', lineHeight:1.4 }}>{item.title}</h3>
                <p style={{ margin:'0 0 9px', fontSize:'0.77rem', color:'#7a5a38', lineHeight:1.5 }}>{item.why}</p>
                <span style={{ fontSize:'0.73rem', color:item.color, fontWeight:700 }}>立刻試讀 →</span>
              </a>
            ))}
          </div>
        </section>

        {/* ══ 那個感覺 35 本（手風琴）═══════════════════════════ */}
        <section id="tf-series" style={{ marginTop:38 }}>
          <div style={{ marginBottom:16 }}>
            <p style={{ margin:'0 0 3px', fontSize:'0.68rem', letterSpacing:'0.35em', color:'#b08040', fontWeight:700 }}>■ 那個感覺 系列</p>
            <p style={{ margin:0, color:'#8a6030', fontSize:'0.82rem' }}>6 大系列 · 35 冊，點系列標題展開，點書名直接進入</p>
          </div>

          {[1,2,3,4,5,6].map(sid => {
            const meta   = SERIES[sid]
            const books  = BOOKS.filter(b => b.s === sid)
            const isOpen = openSeries === sid
            return (
              <div key={sid} style={{ marginBottom:9, borderRadius:12, border:`1.5px solid ${meta.color}22`, overflow:'hidden', background:'#fff' }}>
                <button
                  onClick={() => setOpenSeries(prev => prev === sid ? null : sid)}
                  style={{
                    width:'100%', display:'flex', alignItems:'center', gap:12, padding:'13px 15px',
                    background: isOpen ? `${meta.color}0d` : '#fff',
                    border:'none', cursor:'pointer', textAlign:'left',
                    borderBottom: isOpen ? `1px solid ${meta.color}18` : 'none',
                    transition:'background 0.2s',
                  }}
                >
                  <img src={meta.cover} alt={meta.name}
                    style={{ width:42, height:58, objectFit:'cover', borderRadius:4, flexShrink:0, border:`1px solid ${meta.color}28` }}
                    onError={(e)=>{ (e.target as HTMLImageElement).style.display='none' }} />
                  <div style={{ flex:1, minWidth:0, textAlign:'left' }}>
                    <div style={{ display:'flex', alignItems:'center', gap:7, marginBottom:3 }}>
                      <span style={{ fontSize:'0.95rem' }}>{meta.emoji}</span>
                      <span style={{ fontWeight:700, color:meta.color, fontSize:'0.84rem' }}>系列 {sid}｜{meta.name}</span>
                      <span style={{ fontSize:'0.69rem', color:'#bbb', marginLeft:'auto' }}>{books.length} 冊</span>
                    </div>
                    <p style={{ margin:0, fontSize:'0.77rem', color:'#7a5a38', lineHeight:1.5 }}>{meta.tagline}</p>
                  </div>
                  <span style={{ color:meta.color, fontSize:'1rem', flexShrink:0, display:'inline-block', transform: isOpen?'rotate(180deg)':'none', transition:'transform 0.25s' }}>▾</span>
                </button>

                {isOpen && (
                  <div style={{ padding:'12px 13px 14px' }}>
                    <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(185px,1fr))', gap:7 }}>
                      {books.map(b => <BookCard key={`${b.s}-${b.v}`} book={b} />)}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </section>

        {/* ══ 情緒工具箱（緻密小卡）══════════════════════════════ */}
        <section style={{ marginTop:40 }}>
          <div style={{ marginBottom:14 }}>
            <p style={{ margin:'0 0 3px', fontSize:'0.68rem', letterSpacing:'0.35em', color:'#b08040', fontWeight:700 }}>■ 情緒工具箱</p>
            <p style={{ margin:0, color:'#8a6030', fontSize:'0.82rem' }}>測驗、塔羅、命盤、聊天、遊戲——全免費，隨時進入</p>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(130px,1fr))', gap:8 }}>
            {TOOLS.map(tool => (
              <Link key={tool.href} href={tool.href} style={{
                display:'block', padding:'14px 10px 12px', borderRadius:10,
                background:'#fff', border:`1.5px solid ${tool.color}18`,
                textDecoration:'none', textAlign:'center',
              }}>
                <span style={{ fontSize:'1.5rem', display:'block', marginBottom:6 }}>{tool.icon}</span>
                <h3 style={{ margin:'0 0 3px', fontSize:'0.82rem', fontWeight:700, color:'#1a0f05' }}>{tool.title}</h3>
                <p style={{ margin:'0 0 7px', fontSize:'0.7rem', color:'#7a5a38', lineHeight:1.45 }}>{tool.desc}</p>
                <span style={{ fontSize:'0.69rem', color:tool.color, fontWeight:700 }}>進去 →</span>
              </Link>
            ))}
          </div>
        </section>

        {/* ══ 還有更多角落（可展開）═══════════════════════════════ */}
        <section style={{ marginTop:32 }}>
          <button
            onClick={() => setMoreExpanded(p => !p)}
            style={{
              width:'100%', display:'flex', alignItems:'center', justifyContent:'space-between',
              padding:'13px 18px', borderRadius:11, background:'#fff',
              border:'1.5px solid rgba(180,140,80,0.2)', cursor:'pointer',
              transition:'background 0.15s',
            }}
          >
            <div style={{ textAlign:'left' }}>
              <span style={{ fontSize:'0.68rem', letterSpacing:'0.3em', color:'#b08040', fontWeight:700, display:'block', marginBottom:2 }}>■ 還有這些角落</span>
              <span style={{ fontSize:'0.82rem', color:'#6a4a28' }}>快訊・書評・魯魯說股票・小教室……繼續挖</span>
            </div>
            <span style={{ color:'#b08040', fontSize:'1rem', display:'inline-block', transform: moreExpanded?'rotate(180deg)':'none', transition:'transform 0.25s', flexShrink:0, marginLeft:12 }}>▾</span>
          </button>

          {moreExpanded && (
            <div style={{ marginTop:8, display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(180px,1fr))', gap:8 }}>
              {MORE_CORNERS.map(c => (
                <Link key={c.href} href={c.href} style={{
                  display:'block', padding:'14px 14px 12px', borderRadius:10,
                  background:'#fff', border:`1.5px solid ${c.color}18`,
                  textDecoration:'none',
                }}>
                  <span style={{ fontSize:'1.3rem', display:'block', marginBottom:5 }}>{c.icon}</span>
                  <h3 style={{ margin:'0 0 3px', fontSize:'0.84rem', fontWeight:700, color:'#1a0f05' }}>{c.label}</h3>
                  <p style={{ margin:'0 0 8px', fontSize:'0.72rem', color:'#7a5a38', lineHeight:1.45 }}>{c.desc}</p>
                  <span style={{ fontSize:'0.7rem', color:c.color, fontWeight:700 }}>前往 →</span>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* ══ 底部分享 + 一次導流 ═════════════════════════════════ */}
        <section style={{ marginTop:52 }}>
          <BigShareBlock label="分享這個角落給朋友" />
          <p style={{ marginTop:14, textAlign:'center', color:'#b0a090', fontSize:'0.75rem' }}>
            想看更深入的心理學？
            <a href="https://still-time-corner.vercel.app/digital" target="_blank" rel="noopener noreferrer"
              style={{ color:'#c8762a', marginLeft:4, textDecoration:'none', borderBottom:'1px solid rgba(200,120,42,0.28)' }}>
              去有的沒的小舖 →
            </a>
          </p>
        </section>

      </div>
    </main>
  )
}
