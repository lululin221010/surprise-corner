'use client'
import { useRef, useEffect } from 'react'

export default function MaLines() {
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

      const leftX = W * 0.06
      const rightX = W * 0.94
      const topY = H * 0.12
      const botY = H * 0.82

      // 模擬股價序列（30根，先下跌整理後上漲）
      const prices = [
        82, 80, 78, 76, 75, 74, 73, 74, 75, 76,
        75, 74, 75, 76, 78, 80, 82, 83, 85, 86,
        85, 86, 88, 89, 91, 90, 92, 93, 95, 94,
      ]
      const n = prices.length
      const step = (rightX - leftX) / (n - 1)

      const pMin = Math.min(...prices) - 3
      const pMax = Math.max(...prices) + 3
      const py = (p: number) => botY - ((p - pMin) / (pMax - pMin)) * (botY - topY)
      const px = (i: number) => leftX + i * step

      // 計算均線
      const ma = (data: number[], period: number): (number | null)[] =>
        data.map((_, i) =>
          i < period - 1 ? null : data.slice(i - period + 1, i + 1).reduce((a, b) => a + b, 0) / period
        )

      const ma5  = ma(prices, 5)
      const ma20 = ma(prices, 20)

      // ── 畫均線 ──
      const drawLine = (data: (number | null)[], color: string, width: number) => {
        ctx.save()
        ctx.strokeStyle = color
        ctx.lineWidth = width
        ctx.lineJoin = 'round'
        ctx.setLineDash([])
        ctx.beginPath()
        let started = false
        data.forEach((v, i) => {
          if (v === null) return
          if (!started) { ctx.moveTo(px(i), py(v)); started = true }
          else ctx.lineTo(px(i), py(v))
        })
        ctx.stroke()
        ctx.restore()
      }

      // ── 股價 K 棒（細柱）──
      const barW = Math.max((rightX - leftX) / n * 0.5, 3)
      prices.forEach((p, i) => {
        const prevP = i > 0 ? prices[i - 1] : p
        const isUp = p >= prevP
        ctx.fillStyle = isUp ? '#fca5a5' : '#bbf7d0'
        const top = py(Math.max(p, prevP))
        const bot = py(Math.min(p, prevP))
        ctx.fillRect(px(i) - barW / 2, top, barW, Math.max(bot - top, 2))
      })

      drawLine(ma5,  '#f59e0b', 2)
      drawLine(ma20, '#3b82f6', 2.5)

      // ── 標籤輔助 ──
      const lbl = (
        text: string, x: number, y: number,
        align: CanvasTextAlign = 'left',
        color = '#374151', size = 11, bold = false
      ) => {
        ctx.save()
        ctx.fillStyle = color
        ctx.font = `${bold ? '700' : '500'} ${size}px sans-serif`
        ctx.textAlign = align
        ctx.textBaseline = 'middle'
        ctx.fillText(text, x, y)
        ctx.restore()
      }

      // ── 圖例 ──
      const legendY = topY - 6
      ctx.save()
      ctx.strokeStyle = '#f59e0b'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(leftX, legendY)
      ctx.lineTo(leftX + 20, legendY)
      ctx.stroke()
      ctx.restore()
      lbl('MA5（5日）', leftX + 24, legendY, 'left', '#f59e0b', 11, true)

      const leg2X = leftX + 105
      ctx.save()
      ctx.strokeStyle = '#3b82f6'
      ctx.lineWidth = 2.5
      ctx.beginPath()
      ctx.moveTo(leg2X, legendY)
      ctx.lineTo(leg2X + 20, legendY)
      ctx.stroke()
      ctx.restore()
      lbl('MA20（月線）', leg2X + 24, legendY, 'left', '#3b82f6', 11, true)

      // ── 區域標示 ──
      lbl('股價在均線上方', W * 0.76, py(91), 'center', '#16a34a', 10, true)
      lbl('→ 順勢，積極', W * 0.76, py(91) + 13, 'center', '#16a34a', 10)

      lbl('股價在均線下方', W * 0.22, py(76), 'center', '#ef4444', 10, true)
      lbl('→ 逆勢，謹慎', W * 0.22, py(76) + 13, 'center', '#ef4444', 10)

      // ── 底部說明 ──
      lbl('均線 = 過去 N 天收盤價的平均，方向代表趨勢', W / 2, H * 0.93, 'center', '#9ca3af', 10)
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
