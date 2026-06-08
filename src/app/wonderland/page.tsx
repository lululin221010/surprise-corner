'use client'

import Link from 'next/link'
import dynamic from 'next/dynamic'
import ShareButtons from '@/components/ShareButtons'

// 星空背景（lazy load，SSR 關閉）
const StarCanvas = dynamic(() => import('@/components/StarCanvas'), { ssr: false })

// ─────────────────────────────────────────────────────────────────
// 六大區域定義
// ─────────────────────────────────────────────────────────────────
const ZONES = [
  {
    icon: '👻',
    title: '靈異鬼屋',
    subtitle: '那個感覺系列',
    desc: '每天都有新鬼故事，你敢一個人看嗎？',
    href: '/feeling',
    color: 'purple',
    glow: '#a855f7',
    border: 'border-purple-500/40',
    hoverBorder: 'hover:border-purple-400',
    bg: 'from-purple-950/60 to-purple-900/30',
    badge: '35 本',
  },
  {
    icon: '🎮',
    title: '玩樂區',
    subtitle: '互動小遊戲',
    desc: '各種互動小遊戲，無聊的話就來玩一下。',
    href: '/play',
    color: 'orange',
    glow: '#f97316',
    border: 'border-orange-500/40',
    hoverBorder: 'hover:border-orange-400',
    bg: 'from-orange-950/60 to-orange-900/30',
    badge: '隨時更新',
  },
  {
    icon: '🧠',
    title: '心理學館',
    subtitle: '心理測驗・塔羅・占卜',
    desc: '了解自己，比你想像的有趣多了。',
    href: '/quiz',
    color: 'green',
    glow: '#22c55e',
    border: 'border-green-500/40',
    hoverBorder: 'hover:border-green-400',
    bg: 'from-green-950/60 to-green-900/30',
    badge: '免費',
  },
  {
    icon: '⚡',
    title: '快訊站',
    subtitle: 'AI 每日快報',
    desc: '世界發生什麼了？AI 幫你整理重點。',
    href: '/ai-news',
    color: 'blue',
    glow: '#3b82f6',
    border: 'border-blue-500/40',
    hoverBorder: 'hover:border-blue-400',
    bg: 'from-blue-950/60 to-blue-900/30',
    badge: '每日更新',
  },
  {
    icon: '🤖',
    title: '收租 AI',
    subtitle: 'AI 工具完全指南',
    desc: '讓 AI 幫你賺錢，而不是你幫 AI 打工。',
    href: '/intro',
    color: 'cyan',
    glow: '#06b6d4',
    border: 'border-cyan-500/40',
    hoverBorder: 'hover:border-cyan-400',
    bg: 'from-cyan-950/60 to-cyan-900/30',
    badge: '工具',
  },
  {
    icon: '📚',
    title: '小教室',
    subtitle: '冷知識・財務・生活',
    desc: '每次學一點點，慢慢就什麼都懂了。',
    href: '/classroom',
    color: 'gray',
    glow: '#94a3b8',
    border: 'border-slate-500/40',
    hoverBorder: 'hover:border-slate-400',
    bg: 'from-slate-800/60 to-slate-700/30',
    badge: '持續增加中',
  },
]

export default function WonderlandPage() {
  return (
    <div className="relative min-h-screen bg-[#0a0a1a] text-white overflow-x-hidden">
      {/* 星空背景 */}
      <StarCanvas />

      {/* 頂部光暈裝飾 */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-purple-700/20 blur-[120px] rounded-full" />
        <div className="absolute top-40 right-10 w-[200px] h-[200px] bg-pink-600/10 blur-[80px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 py-8">

        {/* ── Header ── */}
        <div className="mb-8 flex items-center justify-between flex-wrap gap-3">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
          >
            <span>←</span>
            <span>返回首頁</span>
          </Link>
          <ShareButtons
            title="SURPRISE CORNER 驚喜樂世界"
            content="六大神秘區域，每天都有新發現 💖"
          />
        </div>

        {/* ── 主標題 ── */}
        <div className="text-center mb-4">
          {/* 皇宮魔法圖示（SVG glow 裝飾） */}
          <div className="mb-4 flex justify-center">
            <div
              className="text-7xl select-none"
              style={{ filter: 'drop-shadow(0 0 24px #f0abfc) drop-shadow(0 0 48px #a855f7)' }}
            >
              🏰
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide mb-2">
            <span className="bg-gradient-to-r from-yellow-200 via-pink-300 to-purple-300 bg-clip-text text-transparent">
              SURPRISE CORNER
            </span>
          </h1>
          <h2 className="text-xl sm:text-2xl font-semibold text-purple-200 mb-3">
            驚喜樂世界
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            六大神秘區域，每天都有新發現 💖
          </p>
        </div>

        {/* ── 分隔線 ── */}
        <div className="my-8 flex items-center gap-3">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
          <span className="text-purple-400 text-xs tracking-widest">探索六大區域</span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
        </div>

        {/* ── 六大區域卡片網格 ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {ZONES.map((zone) => (
            <ZoneCard key={zone.href} zone={zone} />
          ))}
        </div>

        {/* ── 底部 slogan ── */}
        <div className="text-center text-slate-500 text-sm pb-8">
          <p>每天都有新發現 💖 &nbsp;·&nbsp; 好奇心沒有盡頭</p>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────
// ZoneCard 元件
// ─────────────────────────────────────────────────────────────────
type Zone = (typeof ZONES)[number]

function ZoneCard({ zone }: { zone: Zone }) {
  return (
    <Link href={zone.href} className="group block">
      <div
        className={`
          relative rounded-2xl border ${zone.border} ${zone.hoverBorder}
          bg-gradient-to-br ${zone.bg}
          p-5 h-full
          transition-all duration-300
          hover:scale-[1.03] hover:shadow-2xl
          cursor-pointer overflow-hidden
        `}
        style={{
          boxShadow: `0 0 0px ${zone.glow}00`,
          transition: 'transform 0.3s, box-shadow 0.3s, border-color 0.3s',
        }}
        onMouseEnter={(e) => {
          ;(e.currentTarget as HTMLDivElement).style.boxShadow =
            `0 0 28px ${zone.glow}55, 0 0 60px ${zone.glow}22`
        }}
        onMouseLeave={(e) => {
          ;(e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 0px ${zone.glow}00`
        }}
      >
        {/* 右上角 badge */}
        <span
          className="absolute top-3 right-3 text-[10px] px-2 py-0.5 rounded-full border opacity-60"
          style={{ borderColor: zone.glow, color: zone.glow }}
        >
          {zone.badge}
        </span>

        {/* icon */}
        <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
          {zone.icon}
        </div>

        {/* 標題 */}
        <h3 className="text-lg font-bold text-white mb-0.5 group-hover:text-opacity-90">
          {zone.title}
        </h3>

        {/* 副標題 */}
        <p className="text-xs mb-2" style={{ color: zone.glow }}>
          {zone.subtitle}
        </p>

        {/* 描述 */}
        <p className="text-slate-400 text-sm leading-relaxed">
          {zone.desc}
        </p>

        {/* 底部箭頭 */}
        <div
          className="mt-4 flex items-center gap-1 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ color: zone.glow }}
        >
          <span>進入區域</span>
          <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
        </div>
      </div>
    </Link>
  )
}
