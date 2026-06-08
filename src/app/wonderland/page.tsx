'use client'

import Link from 'next/link'
import dynamic from 'next/dynamic'
import ShareButtons from '@/components/ShareButtons'

const StarCanvas = dynamic(() => import('@/components/StarCanvas'), { ssr: false })

const ZONES = [
  {
    icon: '👻',
    name: '靈異鬼屋',
    desc: '每天都有新鬼故事',
    href: '/feeling',
    color: '#a855f7',
    bg: 'rgba(88,28,135,0.45)',
    border: 'rgba(168,85,247,0.35)',
  },
  {
    icon: '🎮',
    name: '玩樂區',
    desc: '各種互動小遊戲',
    href: '/play',
    color: '#f97316',
    bg: 'rgba(124,45,18,0.45)',
    border: 'rgba(249,115,22,0.35)',
  },
  {
    icon: '🧠',
    name: '心理學館',
    desc: '了解自己，比你想像的有趣多了',
    href: '/quiz',
    color: '#22c55e',
    bg: 'rgba(20,83,45,0.45)',
    border: 'rgba(34,197,94,0.35)',
  },
  {
    icon: '⚡',
    name: '快訊站',
    desc: '世界發生什麼了？AI 幫你整理重點',
    href: '/ai-news',
    color: '#3b82f6',
    bg: 'rgba(23,37,84,0.45)',
    border: 'rgba(59,130,246,0.35)',
  },
  {
    icon: '🤖',
    name: '收租 AI',
    desc: 'AI 幫你賺錢，而不是你幫 AI 打工',
    href: '/intro',
    color: '#06b6d4',
    bg: 'rgba(8,51,68,0.45)',
    border: 'rgba(6,182,212,0.35)',
  },
  {
    icon: '📚',
    name: '小教室',
    desc: '每次學一點點，慢慢就什麼都懂了',
    href: '/classroom',
    color: '#94a3b8',
    bg: 'rgba(30,41,59,0.45)',
    border: 'rgba(148,163,184,0.35)',
  },
]

export default function WonderlandPage() {
  return (
    <div className="relative min-h-screen bg-[#07071a] text-white overflow-x-hidden">
      <StarCanvas />

      {/* 全頁光暈底層 */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-purple-800/20 blur-[140px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-pink-700/10 blur-[120px] rounded-full" />
      </div>

      {/* ── CSS 星點動畫（補充星空密度）── */}
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50%       { opacity: 1;   transform: scale(1.4); }
        }
        .star { position:absolute; border-radius:50%; background:#fff; animation: twinkle linear infinite; }
        @keyframes palace-glow {
          0%, 100% { filter: drop-shadow(0 0 20px #f0abfc) drop-shadow(0 0 50px #a855f7); }
          50%       { filter: drop-shadow(0 0 40px #fde68a) drop-shadow(0 0 80px #f59e0b); }
        }
        .palace-emoji { animation: palace-glow 3s ease-in-out infinite; }
        @keyframes ring-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes ring-spin-r {
          from { transform: rotate(0deg); }
          to   { transform: rotate(-360deg); }
        }
        .ring-1 { animation: ring-spin   8s linear infinite; }
        .ring-2 { animation: ring-spin-r 12s linear infinite; }
        @keyframes zone-float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-6px); }
        }
      `}</style>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-8">

        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
          <Link href="/" className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
            <span>←</span><span>返回首頁</span>
          </Link>
          <ShareButtons title="SURPRISE CORNER 驚喜樂世界" content="六大神秘區域，每天都有新發現 💖" />
        </div>

        {/* 主標題 */}
        <div className="text-center mb-2">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-widest bg-gradient-to-r from-yellow-200 via-pink-300 to-purple-300 bg-clip-text text-transparent mb-1">
            SURPRISE CORNER
          </h1>
          <p className="text-lg sm:text-2xl font-semibold text-purple-200">驚喜樂世界</p>
          <p className="mt-2 text-sm text-slate-500">六大神秘區域，每天都有新發現 💖</p>
        </div>

        {/* ────── 中央皇宮 + 環繞卡片 ────── */}
        <div className="relative flex items-center justify-center" style={{ minHeight: '600px' }}>

          {/* 桌機版：六張卡片環繞（CSS grid absolute 定位） */}
          <div className="hidden lg:block w-full h-full absolute inset-0">
            {ZONES.map((zone, i) => {
              // 6 個位置：角度從頂部順時針均分 60°，稍微偏移讓皇宮可見
              const angles = [-80, -20, 40, 110, 170, 230]
              const rad = (angles[i] * Math.PI) / 180
              const rx = 310 // 水平半徑
              const ry = 240 // 垂直半徑
              const cx = 50  // center %
              const cy = 50
              const px = cx + (rx / 6) * 100 * Math.cos(rad) / 10  // px unit
              const py = cy + (ry / 6) * 100 * Math.sin(rad) / 10

              return (
                <FloatingCard
                  key={zone.name}
                  zone={zone}
                  style={{
                    position: 'absolute',
                    left: `calc(50% + ${Math.cos(rad) * rx}px - 108px)`,
                    top: `calc(50% + ${Math.sin(rad) * ry}px - 72px)`,
                    width: '216px',
                    animationDelay: `${i * 0.4}s`,
                  }}
                />
              )
            })}
          </div>

          {/* 中央皇宮圓形展示 */}
          <div className="relative flex flex-col items-center justify-center z-10">
            {/* 外旋轉裝飾環 */}
            <div
              className="ring-1 absolute"
              style={{
                width: 280, height: 280,
                borderRadius: '50%',
                border: '2px dashed rgba(251,191,36,0.25)',
              }}
            />
            <div
              className="ring-2 absolute"
              style={{
                width: 240, height: 240,
                borderRadius: '50%',
                border: '1.5px dashed rgba(216,180,254,0.2)',
              }}
            />

            {/* 主光暈圓 */}
            <div
              className="absolute rounded-full"
              style={{
                width: 220, height: 220,
                background: 'radial-gradient(circle, rgba(168,85,247,0.25) 0%, rgba(245,158,11,0.1) 60%, transparent 100%)',
              }}
            />

            {/* 皇宮 emoji */}
            <div className="palace-emoji text-[120px] sm:text-[150px] select-none leading-none mb-1">🏰</div>

            {/* 標語牌 */}
            <div
              className="mt-2 px-6 py-1.5 rounded-full text-sm font-bold text-black"
              style={{ background: 'linear-gradient(135deg, #fde68a, #f59e0b, #ec4899)' }}
            >
              驚喜樂世界 皇宮
            </div>
          </div>
        </div>

        {/* 手機版：一般垂直卡片列表 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:hidden mt-6">
          {ZONES.map((zone) => (
            <FloatingCard key={zone.name} zone={zone} />
          ))}
        </div>

        {/* 底部 */}
        <div className="text-center text-slate-600 text-xs mt-8 pb-4">
          好奇心沒有盡頭 · 每天都有新發現 💖
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────
type Zone = (typeof ZONES)[number]

function FloatingCard({ zone, style }: { zone: Zone; style?: React.CSSProperties }) {
  return (
    <Link href={zone.href} className="group block" style={style}>
      <div
        className="rounded-2xl p-4 h-full transition-all duration-300 hover:scale-105 cursor-pointer"
        style={{
          background: zone.bg,
          border: `1px solid ${zone.border}`,
          backdropFilter: 'blur(10px)',
        }}
        onMouseEnter={(e) => {
          ;(e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 24px ${zone.color}66, 0 0 60px ${zone.color}22`
          ;(e.currentTarget as HTMLDivElement).style.borderColor = zone.color
        }}
        onMouseLeave={(e) => {
          ;(e.currentTarget as HTMLDivElement).style.boxShadow = 'none'
          ;(e.currentTarget as HTMLDivElement).style.borderColor = zone.border
        }}
      >
        <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">{zone.icon}</div>
        <div className="font-bold text-base text-white mb-1">{zone.name}</div>
        <div className="text-xs text-slate-400 leading-relaxed">{zone.desc}</div>
        <div
          className="mt-3 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1"
          style={{ color: zone.color }}
        >
          進入 <span className="group-hover:translate-x-0.5 transition-transform">→</span>
        </div>
      </div>
    </Link>
  )
}
