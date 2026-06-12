'use client'
import { useRef, useEffect } from 'react'

// 假突破 vs 有效跌破：盤中穿越收盤拉回 / 收盤確認＋幅度確認
export default function TrendlineBreakout() {
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

      const leftX = W * 0.08
      const rightX = W * 0.92
      const topY = H * 0.10
      const botY = H * 0.87

      const priceMin = 58, priceMax = 84
      const py = (p: number) => botY - ((p - priceMin) / (priceMax - priceMin)) * (botY - topY)

      // 上升趨勢線：price = 62 + i*0.9
      const tl = (i: number) => 62 + i * 0.9

      // 走勢：i5 盤中跌破收盤收回（假跌破）；i11 收盤跌破且幅度大（有效跌破）
      const bars = [
        { o: 64, h: 67, l: 63, c: 66 },
        { o: 66, h: 69, l: 64, c: 68 },
        { o: 68, h: 70, l: 65, c: 66 },
        { o: 66, h: 70, l: 65, c: 69 },
        { o: 69, h: 72, l: 68, c: 71 },
        { o: 71, h: 72, l: 62, c: 70 }, // 假跌破：盤中 62 < 線66.5，收盤 70 收回
        { o: 70, h: 74, l: 69, c: 73 },
        { o: 73, h: 76, l: 72, c: 75 },
        { o: 75, h: 78, l: 73, c: 74 },
        { o: 74, h: 77, l: 72, c: 76 },
        { o: 76, h: 78, l: 73, c: 74 },
        { o: 74, h: 75, l: 68, c: 69 }, // 有效跌破：收盤 69 < 線71.9，幅度約4%
        { o: 69, h: 70, l: 64, c: 65 }, // 續跌確認
      ]
      const n = bars.length
      const barW = 10
      const step = (rightX - leftX) / (n + 1)
      const bx = (i: number) => leftX + (i + 1) * step

      // ── 趨勢線 ──
      ctx.save()
      ctx.strokeStyle = '#2563eb'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(bx(-0.5), py(tl(-0.5)))
      ctx.lineTo(bx(12.6), py(tl(12.6)))
      ctx.stroke()
      ctx.restore()

      // ── K 線 ──
      bars.forEach((bar, i) => {
        const x = bx(i)
        const isUp = bar.c >= bar.o
        const color = isUp ? '#ef4444' : '#16a34a'
        ctx.strokeStyle = color
        ctx.lineWidth = 1.5
        ctx.beginPath()
        ctx.moveTo(x, py(bar.h))
        ctx.lineTo(x, py(bar.l))
        ctx.stroke()
        const top = py(Math.max(bar.o, bar.c))
        const bot = py(Math.min(bar.o, bar.c))
        ctx.fillStyle = color
        ctx.fillRect(x - barW / 2, top, barW, Math.max(bot - top, 2))
      })

      const lbl = (text: string, x: number, y: number, color = '#374151', size = 10.5, bold = false, align: CanvasTextAlign = 'center') => {
        ctx.save()
        ctx.fillStyle = color
        ctx.font = `${bold ? '700' : '500'} ${size}px sans-serif`
        ctx.textAlign = align
        ctx.textBaseline = 'middle'
        ctx.fillText(text, x, y)
        ctx.restore()
      }

      // ── 假跌破標註（i5）──
      const fx = bx(5)
      ctx.save()
      ctx.strokeStyle = '#f59e0b'
      ctx.lineWidth = 1.5
      ctx.setLineDash([3, 3])
      ctx.beginPath()
      ctx.arc(fx, py(63.5), 14, 0, Math.PI * 2)
      ctx.stroke()
      ctx.restore()
      lbl('假跌破', fx, py(60) + 14, '#f59e0b', 11, true)
      lbl('盤中跌破，收盤收回', fx, py(60) + 28, '#f59e0b', 9.5)

      // ── 有效跌破標註（i11–12）──
      const vx = bx(11.5)
      lbl('有效跌破', vx, py(64) + 14, '#16a34a', 11, true)
      lbl('收盤確認＋幅度>3%', vx, py(64) + 28, '#16a34a', 9.5)

      // ── 頂部說明 ──
      lbl('突破不突破，看「收盤」說話', leftX, topY + 2, '#1e1b4b', 11.5, true, 'left')
      lbl('盤中穿越＝洗盤嫌疑；收盤站穩線外＋幅度夠＝才算數', leftX, topY + 18, '#94a3b8', 10, false, 'left')

      // 底部軸線
      ctx.strokeStyle = '#e5e7eb'
      ctx.lineWidth = 1
      ctx.setLineDash([])
      ctx.beginPath()
      ctx.moveTo(leftX, botY + 4)
      ctx.lineTo(rightX + 4, botY + 4)
      ctx.stroke()
    }

    const id = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(id)
  }, [])

  return (
    <div style={{ background: '#ffffff', borderRadius: 10, padding: '8px 0', width: '100%' }}>
      <canvas ref={ref} style={{ width: '100%', height: '260px', display: 'block' }} />
    </div>
  )
}
