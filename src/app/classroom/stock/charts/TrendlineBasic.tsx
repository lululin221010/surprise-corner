'use client'
import { useRef, useEffect } from 'react'

// 趨勢線基本示意：收盤價取點，三點確認有效
export default function TrendlineBasic() {
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

      const priceMin = 55, priceMax = 90
      const py = (p: number) => botY - ((p - priceMin) / (priceMax - priceMin)) * (botY - topY)

      // 上升走勢，三個收盤波段低點剛好落在趨勢線上（62 / 67 / 72）
      const bars = [
        { o: 62, h: 65, l: 60, c: 63 },
        { o: 63, h: 66, l: 61, c: 62 }, // 接觸點① close 62
        { o: 62, h: 68, l: 61, c: 67 },
        { o: 67, h: 72, l: 66, c: 71 },
        { o: 71, h: 73, l: 68, c: 69 },
        { o: 69, h: 71, l: 65, c: 67 }, // 接觸點② close 67
        { o: 67, h: 73, l: 66, c: 72 },
        { o: 72, h: 77, l: 71, c: 76 },
        { o: 76, h: 78, l: 73, c: 74 },
        { o: 74, h: 76, l: 70, c: 72 }, // 接觸點③ close 72
        { o: 72, h: 78, l: 71, c: 77 },
        { o: 77, h: 82, l: 76, c: 81 },
        { o: 81, h: 86, l: 80, c: 84 },
      ]
      const n = bars.length
      const barW = 10
      const step = (rightX - leftX) / (n + 1)
      const bx = (i: number) => leftX + (i + 1) * step

      // 趨勢線：通過 (1,62)、(5,67)、(9,72) → price = 62 + (i-1)*1.25
      const tl = (i: number) => 62 + (i - 1) * 1.25

      // ── 趨勢線（藍實線）──
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

      // ── 接觸點圓圈 ──
      const touch: Array<[number, number, string]> = [[1, 62, '①'], [5, 67, '②'], [9, 72, '③']]
      touch.forEach(([i, p, t]) => {
        const x = bx(i as number), y = py(p as number)
        ctx.save()
        ctx.strokeStyle = '#7c3aed'
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.arc(x, y, 9, 0, Math.PI * 2)
        ctx.stroke()
        ctx.fillStyle = '#7c3aed'
        ctx.font = '700 11px sans-serif'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(String(t), x, y + 22)
        ctx.restore()
      })

      // ── 標籤 ──
      const lbl = (text: string, x: number, y: number, color = '#374151', size = 11, bold = false, align: CanvasTextAlign = 'left') => {
        ctx.save()
        ctx.fillStyle = color
        ctx.font = `${bold ? '700' : '500'} ${size}px sans-serif`
        ctx.textAlign = align
        ctx.textBaseline = 'middle'
        ctx.fillText(text, x, y)
        ctx.restore()
      }
      lbl('上升趨勢線：連「收盤價」波段低點', leftX, topY + 2, '#2563eb', 11.5, true)
      lbl('三點吻合 ＝ 有效趨勢線', leftX, topY + 18, '#7c3aed', 10.5)
      lbl('影線可以穿過，取點看收盤', rightX, botY - 8, '#94a3b8', 10, false, 'right')

      // 底部軸線
      ctx.strokeStyle = '#e5e7eb'
      ctx.lineWidth = 1
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
