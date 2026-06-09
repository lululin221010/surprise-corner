'use client'
import { useRef, useEffect } from 'react'

export default function MaCrossGold() {
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
      const topY = H * 0.10
      const botY = H * 0.84

      const prices = [
        85, 83, 81, 79, 78, 76, 75, 74, 75, 76,
        77, 79, 81, 83, 86, 89, 92, 94, 96, 98,
      ]
      const n = prices.length
      const step = (rightX - leftX) / (n - 1)
      const pMin = Math.min(...prices) - 2
      const pMax = Math.max(...prices) + 4
      const py = (p: number) => botY - ((p - pMin) / (pMax - pMin)) * (botY - topY)
      const px = (i: number) => leftX + i * step

      const ma = (data: number[], period: number): (number | null)[] =>
        data.map((_, i) =>
          i < period - 1 ? null : data.slice(i - period + 1, i + 1).reduce((a, b) => a + b, 0) / period
        )

      const ma5  = ma(prices, 5)
      const ma20 = ma(prices, Math.min(20, n))  // 資料只有20根，所以 ma20 最後幾根才出現

      // ── 股價 K 棒 ──
      const barW = Math.max(step * 0.5, 6)
      prices.forEach((p, i) => {
        const prevP = i > 0 ? prices[i - 1] : p
        const isUp = p >= prevP
        ctx.fillStyle = isUp ? '#fca5a5' : '#bbf7d0'
        const top = py(Math.max(p, prevP))
        const bot = py(Math.min(p, prevP))
        ctx.fillRect(px(i) - barW / 2, top, barW, Math.max(bot - top, 2))
      })

      // ── 均線 ──
      const drawLine = (data: (number | null)[], color: string, width: number) => {
        ctx.save(); ctx.strokeStyle = color; ctx.lineWidth = width
        ctx.lineJoin = 'round'; ctx.setLineDash([])
        ctx.beginPath()
        let started = false
        data.forEach((v, i) => {
          if (v === null) return
          if (!started) { ctx.moveTo(px(i), py(v)); started = true }
          else ctx.lineTo(px(i), py(v))
        })
        ctx.stroke(); ctx.restore()
      }

      drawLine(ma5,  '#f59e0b', 2)
      drawLine(ma20, '#3b82f6', 2.5)

      // ── 找黃金交叉點（MA5 從下穿越 MA20）──
      let crossI = -1
      for (let i = 1; i < n; i++) {
        if (ma5[i] !== null && ma20[i] !== null &&
            ma5[i - 1] !== null && ma20[i - 1] !== null) {
          const prev5 = ma5[i - 1] as number
          const prev20 = ma20[i - 1] as number
          const cur5 = ma5[i] as number
          const cur20 = ma20[i] as number
          if (prev5 <= prev20 && cur5 > cur20) { crossI = i; break }
        }
      }

      if (crossI > 0) {
        const crossX = px(crossI)
        const crossY = py(ma5[crossI] as number)

        // 圓圈標注
        ctx.save()
        ctx.strokeStyle = '#16a34a'
        ctx.lineWidth = 2.5
        ctx.setLineDash([])
        ctx.beginPath()
        ctx.arc(crossX, crossY, 9, 0, Math.PI * 2)
        ctx.stroke()
        ctx.restore()

        // 箭頭向上
        ctx.save()
        ctx.fillStyle = '#16a34a'
        ctx.font = '700 18px sans-serif'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'bottom'
        ctx.fillText('↑', crossX, crossY - 12)
        ctx.restore()

        // 標籤
        ctx.save()
        ctx.fillStyle = '#16a34a'
        ctx.font = '700 11px sans-serif'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'top'
        ctx.fillText('黃金交叉', crossX, crossY + 14)
        ctx.fillText('MA5 穿越 MA20 向上', crossX, crossY + 27)
        ctx.restore()
      }

      // ── 區域標示 ──
      const lbl = (text: string, x: number, y: number, align: CanvasTextAlign, color: string, size: number, bold = false) => {
        ctx.save()
        ctx.fillStyle = color
        ctx.font = `${bold ? '700' : '500'} ${size}px sans-serif`
        ctx.textAlign = align; ctx.textBaseline = 'middle'
        ctx.fillText(text, x, y); ctx.restore()
      }

      lbl('空方期（MA5 在下方）', W * 0.20, botY + 10, 'center', '#ef4444', 9)
      lbl('多方期（MA5 在上方）', W * 0.76, botY + 10, 'center', '#16a34a', 9)

      // 圖例
      const legY = topY - 4
      ctx.save(); ctx.strokeStyle = '#f59e0b'; ctx.lineWidth = 2; ctx.beginPath()
      ctx.moveTo(leftX, legY); ctx.lineTo(leftX + 18, legY); ctx.stroke(); ctx.restore()
      lbl('MA5', leftX + 22, legY, 'left', '#f59e0b', 11, true)

      ctx.save(); ctx.strokeStyle = '#3b82f6'; ctx.lineWidth = 2.5; ctx.beginPath()
      ctx.moveTo(leftX + 58, legY); ctx.lineTo(leftX + 76, legY); ctx.stroke(); ctx.restore()
      lbl('MA20', leftX + 80, legY, 'left', '#3b82f6', 11, true)

      // 底軸
      ctx.strokeStyle = '#e5e7eb'; ctx.lineWidth = 1; ctx.setLineDash([])
      ctx.beginPath(); ctx.moveTo(leftX, botY + 2); ctx.lineTo(rightX, botY + 2); ctx.stroke()
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
