'use client'

import Link from 'next/link'
import dynamic from 'next/dynamic'
import ShareButtons from '@/components/ShareButtons'
import { Suspense } from 'react'

const StarCanvas = dynamic(() => import('@/components/StarCanvas'), { ssr: false })

// 7 張卡片，從正上方（-90°）順時針均分，間隔約 51.4°
const STEP = 360 / 7
const zones = [
  { name: '靈異鬼屋', icon: '👻', desc: '每天都有新鬼故事，你敢一個人看嗎？', href: '/feeling',    angle: -90,            color: '#06b6d4' },
  { name: '玩樂區',   icon: '🎮', desc: '各種互動小遊戲，無聊的時候來玩一下',  href: '/play',      angle: -90 + STEP,     color: '#f59e0b' },
  { name: '心理學館', icon: '🧠', desc: '了解自己，比你想像的有趣多了',         href: '/quiz',      angle: -90 + STEP * 2, color: '#ec4899' },
  { name: '快訊站',   icon: '⚡', desc: '世界發生什麼了？AI 幫你整理重點',      href: '/ai-news',   angle: -90 + STEP * 3, color: '#3b82f6' },
  { name: '收租 AI',  icon: '🤖', desc: 'AI 幫你整理，而不只是你幫 AI 打工',   href: 'https://stock-dashboard-ochre-sigma.vercel.app', angle: -90 + STEP * 4, color: '#10b981' },
  { name: '小教室',   icon: '📚', desc: '每次學一點，慢慢就什麼都懂了',         href: '/classroom', angle: -90 + STEP * 5, color: '#a78bfa' },
  { name: '冷知識',   icon: '🧊', desc: '99% 的人不知道的事，今天你知道了',     href: '/ai-news',   angle: -90 + STEP * 6, color: '#fb923c' },
]

// 城堡周圍漂浮粒子
const SPARKS = ['✨','🌟','💫','⭐','🎇','🎆','🌠','💥','🎉','🎊']

export default function Wonderland() {
  const R = 340 // 環繞半徑（px）

  return (
    <div className="min-h-screen text-white overflow-x-hidden relative" style={{
      background: 'radial-gradient(ellipse at 20% 0%, rgba(139,92,246,0.35) 0%, transparent 50%), radial-gradient(ellipse at 80% 10%, rgba(236,72,153,0.2) 0%, transparent 45%), radial-gradient(ellipse at 50% 100%, rgba(251,191,36,0.15) 0%, transparent 50%), #0f0823',
    }}>
      <Suspense fallback={null}><StarCanvas /></Suspense>

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

        @keyframes spark-orbit {
          0%   { transform: rotate(var(--sa)) translateX(var(--sr)) scale(1);   opacity: 0.9; }
          50%  { transform: rotate(calc(var(--sa) + 180deg)) translateX(var(--sr)) scale(1.4); opacity: 1; }
          100% { transform: rotate(calc(var(--sa) + 360deg)) translateX(var(--sr)) scale(1);   opacity: 0.9; }
        }
        .spark {
          position: absolute; top: 50%; left: 50%;
          animation: spark-orbit var(--sd) linear infinite;
          transform-origin: 0 0;
          font-size: var(--ss);
          margin-top: -0.5em; margin-left: -0.5em;
          pointer-events: none;
        }

        @keyframes confetti-fall {
          0%   { transform: translateY(-20px) rotate(0deg);   opacity: 0; }
          20%  { opacity: 1; }
          100% { transform: translateY(80px)  rotate(360deg); opacity: 0; }
        }
        .confetti { animation: confetti-fall var(--cd) ease-in-out infinite; pointer-events: none; }
      `}</style>

      {/* 背景彩霞光暈 */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[500px] h-[300px] bg-purple-600/25 blur-[120px] rounded-full" />
        <div className="absolute top-0 right-1/4 w-[400px] h-[250px] bg-pink-500/20 blur-[100px] rounded-full" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-amber-400/10 blur-[120px] rounded-full" />
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

          {/* 中央城堡 */}
          <div className="relative z-20 flex flex-col items-center">
            {/* 外光暈 */}
            <div className="absolute -inset-10 bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-400 rounded-full blur-3xl opacity-30" />

            {/* 漂浮粒子 */}
            {SPARKS.map((s, i) => (
              <span key={i} className="spark" style={{
                '--sa': `${i * 36}deg`,
                '--sr': `${155 + (i % 3) * 20}px`,
                '--sd': `${4 + (i % 4)}s`,
                '--ss': `${14 + (i % 3) * 4}px`,
                animationDelay: `${i * 0.4}s`,
              } as React.CSSProperties}>{s}</span>
            ))}

            <div className="relative w-56 h-56 md:w-72 md:h-72 rounded-full border-[8px] border-amber-400/50 shadow-2xl shadow-purple-600/50 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-950 via-indigo-950 to-black" />
              <img src="/images/wonderland-castle.png" alt="驚喜樂世界" className="palace relative w-full h-full object-cover select-none" />
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
                  top: '50%', left: '50%',
                  '--base-t': tx,
                  transform: tx,
                  animationDelay: `${i * 0.5}s`,
                } as React.CSSProperties}
              >
                <div
                  className="rounded-2xl p-5 backdrop-blur-xl transition-all duration-300 group-hover:scale-110"
                  style={{
                    background: `rgba(22,14,50,0.88)`,
                    border: `1px solid ${zone.color}44`,
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLDivElement
                    el.style.borderColor = zone.color
                    el.style.boxShadow = `0 0 28px ${zone.color}66, 0 8px 40px ${zone.color}33`
                    el.style.background = `rgba(22,14,50,0.95)`
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLDivElement
                    el.style.borderColor = `${zone.color}44`
                    el.style.boxShadow = 'none'
                    el.style.background = 'rgba(22,14,50,0.88)'
                  }}
                >
                  <div className="text-4xl mb-3 transition-transform duration-300 group-hover:scale-125">{zone.icon}</div>
                  <h3 className="text-base font-bold mb-1 text-white">{zone.name}</h3>
                  <p className="text-xs leading-relaxed line-clamp-3" style={{ color: `${zone.color}99` }}>{zone.desc}</p>
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
                  background: 'rgba(22,14,50,0.90)',
                  border: `1px solid ${zone.color}44`,
                  boxShadow: `0 2px 12px ${zone.color}22`,
                }}
              >
                <div className="text-3xl mb-2">{zone.icon}</div>
                <div className="text-sm font-bold text-white mb-1">{zone.name}</div>
                <div className="text-[11px] leading-relaxed line-clamp-2" style={{ color: `${zone.color}aa` }}>{zone.desc}</div>
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
