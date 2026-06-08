'use client'

import Link from 'next/link'
import dynamic from 'next/dynamic'
import ShareButtons from '@/components/ShareButtons'

const StarCanvas = dynamic(() => import('@/components/StarCanvas'), { ssr: false })

const zones = [
  {
    name: '靈異鬼屋',
    color: 'purple',
    icon: '👻',
    desc: '每天都有新鬼故事，你敢一個人看嗎？',
    href: '/feeling',
    glow: '#a855f7',
  },
  {
    name: '玩樂區',
    color: 'orange',
    icon: '🎮',
    desc: '各種互動小遊戲，無聊的時候來玩一下',
    href: '/play',
    glow: '#f97316',
  },
  {
    name: '心理學館',
    color: 'emerald',
    icon: '🧠',
    desc: '了解自己，比你想像的有趣多了',
    href: '/quiz',
    glow: '#10b981',
  },
  {
    name: '快訊站',
    color: 'blue',
    icon: '⚡',
    desc: '世界發生什麼了？AI 幫你整理重點',
    href: '/ai-news',
    glow: '#3b82f6',
  },
  {
    name: '收租 AI',
    color: 'cyan',
    icon: '🤖',
    desc: 'AI 幫你整理，而不只是你幫 AI 打工',
    href: '/intro',
    glow: '#06b6d4',
  },
  {
    name: '小教室',
    color: 'slate',
    icon: '📚',
    desc: '每次學一點，慢慢就什麼都懂了',
    href: '/classroom',
    glow: '#94a3b8',
  },
]

// Tailwind 動態 class 用 safelist 方式避免 purge，改用 inline style 注入
const colorMap: Record<string, { border: string; shadow: string; bar: string }> = {
  purple:  { border: 'rgba(168,85,247,0.3)',  shadow: 'rgba(168,85,247,0.4)',  bar: 'linear-gradient(90deg,transparent,#a855f7,transparent)' },
  orange:  { border: 'rgba(249,115,22,0.3)',  shadow: 'rgba(249,115,22,0.4)',  bar: 'linear-gradient(90deg,transparent,#f97316,transparent)' },
  emerald: { border: 'rgba(16,185,129,0.3)',  shadow: 'rgba(16,185,129,0.4)',  bar: 'linear-gradient(90deg,transparent,#10b981,transparent)' },
  blue:    { border: 'rgba(59,130,246,0.3)',  shadow: 'rgba(59,130,246,0.4)',  bar: 'linear-gradient(90deg,transparent,#3b82f6,transparent)' },
  cyan:    { border: 'rgba(6,182,212,0.3)',   shadow: 'rgba(6,182,212,0.4)',   bar: 'linear-gradient(90deg,transparent,#06b6d4,transparent)' },
  slate:   { border: 'rgba(148,163,184,0.3)', shadow: 'rgba(148,163,184,0.4)', bar: 'linear-gradient(90deg,transparent,#94a3b8,transparent)' },
}

export default function Wonderland() {
  return (
    <div className="min-h-screen bg-[#0a0719] text-white overflow-x-hidden relative">
      <StarCanvas />

      {/* CSS 動畫 */}
      <style>{`
        @keyframes palace-pulse {
          0%,100% { filter: drop-shadow(0 0 30px #ffe066) drop-shadow(0 0 60px #a855f7); }
          50%      { filter: drop-shadow(0 0 60px #ffe066) drop-shadow(0 0 100px #ec4899); }
        }
        .palace { animation: palace-pulse 3s ease-in-out infinite; }

        @keyframes ring-cw  { to { transform: rotate(360deg);  } }
        @keyframes ring-ccw { to { transform: rotate(-360deg); } }
        .ring-cw  { animation: ring-cw  10s linear infinite; }
        .ring-ccw { animation: ring-ccw 15s linear infinite; }

        .zone-card { transition: transform .4s, box-shadow .4s, border-color .4s; }
        .zone-card:hover { transform: translateY(-12px); }

        .bar-line { width: 0; transition: width .5s; background: var(--bar); }
        .zone-card:hover .bar-line { width: 100%; }

        .bg-ghost { transition: opacity .4s; }
        .zone-card:hover .bg-ghost { opacity: 0.18 !important; }
      `}</style>

      {/* 頂層光暈 */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-purple-700/20 blur-[140px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">

        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-3 mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-purple-300 hover:text-white transition-colors text-sm">
            ← 返回首頁
          </Link>
          <ShareButtons title="SURPRISE CORNER 驚喜樂世界" content="六大神秘區域，每天都有新發現 💖" />
        </div>

        {/* 主標題 */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold tracking-wider bg-gradient-to-r from-pink-400 via-purple-400 to-yellow-300 bg-clip-text text-transparent drop-shadow-2xl">
            SURPRISE CORNER
          </h1>
          <p className="text-3xl md:text-5xl font-medium bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-pink-300 mt-2">
            驚喜樂世界
          </p>
          <p className="mt-6 text-lg text-purple-200/80">六大神秘區域，每天都有新發現 ❤️</p>
        </div>

        {/* 中央發光皇宮 */}
        <div className="flex justify-center mb-20 relative">
          <div className="relative group">
            {/* 背景大光暈 */}
            <div className="absolute -inset-12 bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-400 rounded-full blur-3xl opacity-25 group-hover:opacity-45 transition-opacity duration-700" />

            {/* 旋轉裝飾環 */}
            <div
              className="ring-cw absolute"
              style={{
                inset: -24,
                borderRadius: '50%',
                border: '2px dashed rgba(251,191,36,0.3)',
                pointerEvents: 'none',
              }}
            />
            <div
              className="ring-ccw absolute"
              style={{
                inset: -8,
                borderRadius: '50%',
                border: '1.5px dashed rgba(216,180,254,0.25)',
                pointerEvents: 'none',
              }}
            />

            {/* 皇宮主體圓 */}
            <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full border-[10px] border-yellow-400/40 flex items-center justify-center shadow-2xl shadow-purple-600/50">
              <div className="palace text-[180px] md:text-[230px] leading-none select-none group-hover:scale-105 transition-transform duration-500">
                🏰
              </div>
            </div>

            {/* 皇宮標籤 */}
            <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-pink-500 text-black font-bold px-8 py-2.5 rounded-full text-xl shadow-xl whitespace-nowrap">
              驚喜樂世界 皇宮
            </div>
          </div>
        </div>

        {/* 六大區域卡片 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {zones.map((zone, i) => {
            const c = colorMap[zone.color]
            return (
              <Link key={i} href={zone.href}>
                <div
                  className="zone-card relative p-8 rounded-3xl overflow-hidden cursor-pointer"
                  style={{
                    background: 'linear-gradient(135deg, #0f0a1e 0%, #000 100%)',
                    border: `1px solid ${c.border}`,
                  }}
                  onMouseEnter={(e) => {
                    ;(e.currentTarget as HTMLDivElement).style.boxShadow = `0 20px 60px ${c.shadow}`
                    ;(e.currentTarget as HTMLDivElement).style.borderColor = zone.glow
                  }}
                  onMouseLeave={(e) => {
                    ;(e.currentTarget as HTMLDivElement).style.boxShadow = 'none'
                    ;(e.currentTarget as HTMLDivElement).style.borderColor = c.border
                  }}
                >
                  {/* 背景大 ghost icon */}
                  <div
                    className="bg-ghost absolute -right-4 -top-4 text-[110px] opacity-[0.07] pointer-events-none select-none leading-none"
                  >
                    {zone.icon}
                  </div>

                  <div className="relative z-10">
                    <div className="text-6xl mb-5 inline-block transition-transform duration-300 group-hover:scale-110">
                      {zone.icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{zone.name}</h3>
                    <p className="text-purple-200/65 leading-relaxed text-[15px]">{zone.desc}</p>
                  </div>

                  {/* 底部光條 */}
                  <div
                    className="bar-line absolute bottom-0 left-0 h-[3px] rounded-full"
                    style={{ '--bar': c.bar } as React.CSSProperties}
                  />
                </div>
              </Link>
            )
          })}
        </div>

        <p className="text-center mt-16 text-purple-300/50 text-sm">
          好奇心沒有盡頭，每天都有新發現 💖
        </p>
      </div>
    </div>
  )
}
