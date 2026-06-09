'use client'
import { useRef, useEffect } from 'react'

export default function KlineShadow() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    const W = canvas.offsetWidth
    const H = canvas.offsetHeight
    canvas.width = W * dpr
    canvas.height = H * dpr
    ctx.scale(dpr, dpr)

    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, W, H)

      const topY  = H * 0.08
      const botY  = H * 0.82
      const range = botY - topY
      const bw    = 28

      const lbl = (text: string, x: number, y: number, align: CanvasTextAlign, color: string, size: number, bold = false) => {
        ctx.save()
        ctx.fillStyle = color
        ctx.font = `${bold ? '700' : '500'} ${size}px sans-serif`
        ctx.textAlign = align; ctx.textBaseline = 'middle'
        ctx.fillText(text, x, y); ctx.restore()
      }

      const dash = (x1: number, y1: number, x2: number, y2: number, color = '#d1d5db') => {
        ctx.save(); ctx.strokeStyle = color; ctx.lineWidth = 1
        ctx.setLineDash([4, 3]); ctx.beginPath()
        ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke(); ctx.restore()
      }

      // ────────────────────────────────────
      // 左：上影線很長（上方有賣壓）
      // ────────────────────────────────────
      const cx1 = W * 0.25
      const l1High  = topY + range * 0.05   // 最高（被打回）
      const l1Close = topY + range * 0.42   // 收盤
      const l1Open  = topY + range * 0.52   // 開盤
      const l1Low   = topY + range * 0.62   // 最低

      ctx.strokeStyle = '#16a34a'; ctx.lineWidth = 2; ctx.setLineDash([])
      ctx.beginPath(); ctx.moveTo(cx1, l1High); ctx.lineTo(cx1, l1Low); ctx.stroke()
      ctx.fillStyle = '#16a34a'
      ctx.fillRect(cx1 - bw / 2, l1Close, bw, l1Open - l1Close)

      // 長上影線區域標示
      ctx.save()
      ctx.fillStyle = '#fef2f2'
      ctx.fillRect(cx1 - bw / 2, l1High, bw, l1Close - l1High)
      ctx.restore()
      ctx.save()
      ctx.strokeStyle = '#ef4444'; ctx.lineWidth = 1; ctx.setLineDash([2, 2])
      ctx.strokeRect(cx1 - bw / 2, l1High, bw, l1Close - l1High)
      ctx.restore()

      // 標籤
      dash(cx1 - bw / 2 - 6, l1High,  cx1 - bw / 2 - 58, l1High,  '#ef4444')
      lbl('最高價', cx1 - bw / 2 - 62, l1High, 'right', '#ef4444', 10)
      lbl('↓ 衝上去了但被打回', cx1 - bw / 2 - 62, l1High + 12, 'right', '#ef4444', 9)

      dash(cx1 - bw / 2 - 6, l1Close, cx1 - bw / 2 - 58, l1Close, '#374151')
      lbl('收盤', cx1 - bw / 2 - 62, l1Close, 'right', '#374151', 10)

      lbl('上影線長', cx1, topY + (l1High + l1Close) / 2 - topY * 0.7, 'center', '#ef4444', 9, true)
      lbl('→ 上方賣壓很重', cx1, H * 0.91, 'center', '#ef4444', 10, true)

      // ────────────────────────────────────
      // 右：下影線很長（下方有買盤撐）
      // ────────────────────────────────────
      const cx2 = W * 0.75
      const l2High  = topY + range * 0.35
      const l2Open  = topY + range * 0.42
      const l2Close = topY + range * 0.52
      const l2Low   = topY + range * 0.92   // 最低（被撐回）

      ctx.strokeStyle = '#ef4444'; ctx.lineWidth = 2; ctx.setLineDash([])
      ctx.beginPath(); ctx.moveTo(cx2, l2High); ctx.lineTo(cx2, l2Low); ctx.stroke()
      ctx.fillStyle = '#ef4444'
      ctx.fillRect(cx2 - bw / 2, l2Open, bw, l2Close - l2Open)

      // 長下影線區域標示
      ctx.save()
      ctx.fillStyle = '#f0fdf4'
      ctx.fillRect(cx2 - bw / 2, l2Close, bw, l2Low - l2Close)
      ctx.restore()
      ctx.save()
      ctx.strokeStyle = '#16a34a'; ctx.lineWidth = 1; ctx.setLineDash([2, 2])
      ctx.strokeRect(cx2 - bw / 2, l2Close, bw, l2Low - l2Close)
      ctx.restore()

      // 標籤
      dash(cx2 + bw / 2 + 6, l2Low,   cx2 + bw / 2 + 58, l2Low,   '#16a34a')
      lbl('最低價', cx2 + bw / 2 + 62, l2Low, 'left', '#16a34a', 10)
      lbl('↑ 跌下去了但被撐住', cx2 + bw / 2 + 62, l2Low + 12, 'left', '#16a34a', 9)

      dash(cx2 + bw / 2 + 6, l2Close, cx2 + bw / 2 + 58, l2Close, '#374151')
      lbl('收盤', cx2 + bw / 2 + 62, l2Close, 'left', '#374151', 10)

      lbl('下影線長', cx2, l2Low - (l2Low - l2Close) * 0.5, 'center', '#16a34a', 9, true)
      lbl('→ 下方買盤很強', cx2, H * 0.91, 'center', '#16a34a', 10, true)

      // 分隔線
      ctx.save(); ctx.strokeStyle = '#e5e7eb'; ctx.lineWidth = 1; ctx.setLineDash([4, 3])
      ctx.beginPath(); ctx.moveTo(W / 2, topY); ctx.lineTo(W / 2, botY + 4); ctx.stroke(); ctx.restore()
    }

    const id = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(id)
  }, [])

  return (
    <div style={{ background: '#ffffff', borderRadius: 10, padding: '8px 0', width: '100%' }}>
      <canvas
        ref={ref}
        style={{ width: '100%', height: '260px', display: 'block' }}
      />
    </div>
  )
}
