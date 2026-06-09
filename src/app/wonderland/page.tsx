'use client'

import Link from 'next/link'
import dynamic from 'next/dynamic'
import ShareButtons from '@/components/ShareButtons'

const StarCanvas = dynamic(() => import('@/components/StarCanvas'), { ssr: false })

// 7 張卡片，從正上方（-90°）順時針均分，間隔約 51.4°
const STEP = 360 / 7
const zones = [
  { name: '靈異鬼屋', icon: '👻', desc: '每天都有新鬼故事，你敢一個人看嗎？', href: '/feeling',   angle: -90 },
  { name: '玩樂區',   icon: '🎮', desc: '各種互動小遊戲，無聊的時候來玩一下',  href: '/play',     angle: -90 + STEP },
  { name: '心理學館', icon: '🧠', desc: '了解自己，比你想像的有趣多了',        href: '/quiz',     angle: -90 + STEP * 2 },
  { name: '快訊站',   icon: '⚡', desc: '世界發生什麼了？AI 幫你整理重點',     href: '/ai-news',  angle: -90 + STEP * 3 },
  { name: '收租 AI',  icon: '🤖', desc: 'AI 幫你整理，而不只是你幫 AI 打工',  href: '/intro',    angle: -90 + STEP * 4 },
  { name: '小教室',   icon: '📚', desc: '每次學一點，慢慢就什麼都懂了',        href: '/classroom',angle: -90 + STEP * 5 },
  { name: '冷知識',   icon: '🧊', desc: '99% 的人不知道的事，今天你知道了',    href: '/',         angle: -90 + STEP * 6 },
]

export default function Wonderland() {
  const R = 340 // 環繞半徑（px）

  return (
    <div className="min-h-screen bg-[#0a0719] text-white overflow-x-hidden relative">
      <StarCanvas />

      <style>{`
        @keyframes palace-glow {
          0%,100% { filter: drop-shadow(0 0 24px #fbbf24) drop-shadow(0 0 60px #a855f7); }
          50%      { filter: drop-shadow(0 0 48px #fde68a) drop-shadow(0 0 100px #ec4899); }
        }
        .palace { animation: palace-glow 3s ease-in-out infinite; }

        @keyframes ring-cw  { to { transform: rotate(360deg);  } }
        @keyframes ring-ccw { to { transform: rotate(-360deg); } }
        .ring-cw  { animation: ring-cw  12s linear infinite; }
        .ring-ccw { animation: ring-ccw 18s linear infinite; }

        @keyframes float {
          0%,100% { transform: var(--base-t) translateY(0px); }
          50%      { transform: var(--base-t) translateY(-8px); }
        }
        .zone-float { animation: float 3s ease-in-out infinite; }
      `}</style>

      {/* 頂部光暈 */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-purple-700/20 blur-[140px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-10">

        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-3 mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-purple-300 hover:text-white transition-colors text-sm">
            ← 返回首頁
          </Link>
          <ShareButtons title="SURPRISE CORNER 驚喜樂世界" content="七大神秘區域，每天都有新發現 💖" />
        </div>

        {/* 主標題 */}
        <div className="text-center mb-10">
          <h1 className="text-5xl md:text-7xl font-bold tracking-widest bg-gradient-to-r from-pink-400 via-purple-400 to-amber-300 bg-clip-text text-transparent">
            SURPRISE CORNER
          </h1>
          <p className="text-3xl md:text-5xl mt-2 bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent font-medium">
            驚喜樂世界
          </p>
          <p className="mt-4 text-lg text-purple-200/80">七大神秘區域，每天都有新發現 ❤️</p>
        </div>

        {/* ── 桌機版：圓形環繞 ── */}
        <div
          className="relative hidden md:flex justify-center items-center mx-auto"
          style={{ width: (R + 120) * 2, height: (R + 120) * 2, maxWidth: '100%' }}
        >
          {/* 裝飾旋轉環 */}
          <div
            className="ring-cw pointer-events-none absolute rounded-full"
            style={{ inset: 60, border: '1.5px dashed rgba(251,191,36,0.2)' }}
          />
          <div
            className="ring-ccw pointer-events-none absolute rounded-full"
            style={{ inset: 90, border: '1px dashed rgba(216,180,254,0.15)' }}
          />

          {/* 中央皇宮 */}
          <div className="relative z-20 flex flex-col items-center">
            {/* 外光暈 */}
            <div className="absolute -inset-10 bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-400 rounded-full blur-3xl opacity-20" />

            <div className="relative w-56 h-56 md:w-72 md:h-72 rounded-full border-[8px] border-amber-400/40 shadow-2xl shadow-purple-600/50 flex items-center justify-center overflow-hidden">
              {/* 內部漸層底色 */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-950 via-indigo-950 to-black" />
              <div className="palace relative text-[140px] md:text-[180px] leading-none select-none">🏰</div>
              {/* pulse 環 */}
              <div className="absolute inset-0 rounded-full border-4 border-amber-300/40 animate-pulse" />
            </div>

            <div className="mt-4 bg-gradient-to-r from-amber-400 via-yellow-300 to-pink-500 text-black font-bold px-8 py-2 rounded-full text-lg shadow-xl whitespace-nowrap">
              驚喜樂世界
            </div>
          </div>

          {/* 六張環繞卡片 */}
          {zones.map((zone, i) => {
            const rad = (zone.angle * Math.PI) / 180
            const x = Math.cos(rad) * R
            const y = Math.sin(rad) * R
            const tx = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`

            return (
              <Link
                key={i}
                href={zone.href}
                className="zone-float absolute w-48 group"
                style={{
                  top: '50%',
                  left: '50%',
                  '--base-t': tx,
                  transform: tx,
                  animationDelay: `${i * 0.5}s`,
                } as React.CSSProperties}
              >
                <div
                  className="rounded-2xl p-5 backdrop-blur-xl transition-all duration-400 group-hover:scale-110"
                  style={{
                    background: 'rgba(10,7,30,0.85)',
                    border: '1px solid rgba(168,85,247,0.3)',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLDivElement
                    el.style.borderColor = 'rgba(216,180,254,0.8)'
                    el.style.boxShadow = '0 0 28px rgba(168,85,247,0.5), 0 8px 40px rgba(168,85,247,0.2)'
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLDivElement
                    el.style.borderColor = 'rgba(168,85,247,0.3)'
                    el.style.boxShadow = 'none'
                  }}
                >
                  <div className="text-4xl mb-3 transition-transform duration-300 group-hover:scale-125">{zone.icon}</div>
                  <h3 className="text-base font-bold mb-1 text-white">{zone.name}</h3>
                  <p className="text-xs text-purple-200/60 leading-relaxed line-clamp-3">{zone.desc}</p>
                </div>
              </Link>
            )
          })}
        </div>

        {/* ── 手機版：2欄卡片 ── */}
        <div className="grid grid-cols-2 gap-4 md:hidden">
          {zones.map((zone, i) => (
            <Link key={i} href={zone.href} className="group">
              <div
                className="rounded-2xl p-4 transition-all duration-300 group-hover:scale-105"
                style={{
                  background: 'rgba(10,7,30,0.85)',
                  border: '1px solid rgba(168,85,247,0.3)',
                }}
              >
                <div className="text-3xl mb-2">{zone.icon}</div>
                <div className="text-sm font-bold text-white mb-1">{zone.name}</div>
                <div className="text-[11px] text-purple-200/60 leading-relaxed line-clamp-2">{zone.desc}</div>
              </div>
            </Link>
          ))}
        </div>

        <p className="text-center mt-12 pb-8 text-purple-300/50 text-sm">
          好奇心沒有盡頭，每天都有新發現 💖
        </p>
      </div>
    </div>
  )
}
