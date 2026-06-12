'use client'
import { useRef, useEffect } from 'react'

// 趨勢通道：下軌支撐（買點參考）＋上軌壓力（觀察/減碼）
export default function TrendlineChannel() {
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

      const priceMin = 55, priceMax = 95
      const py = (p: number) => botY - ((p - priceMin) / (priceMax - priceMin)) * (botY - topY)

      // 下軌：60 + i*1.4；上軌：平行 +13
      const lo = (i: number) => 60 + i * 1.4
      const hi = (i: number) => lo(i) + 13

      // 在通道內震盪向上
      const bars = [
        { o: 61, h: 64, l: 59, c: 63 },
        { o: 63, h: 67, l: 61, c: 66 },
        { o: 66, h: 71, l: 65, c: 70 },
        { o: 70, h: 76, l: 69, c: 75 }, // 靠近上軌
        { o: 75, h: 77, l: 72, c: 73 },
        { o: 73, h: 74, l: 67, c: 68 }, // 拉回下軌
        { o: 68, h: 72, l: 67, c: 71 },
        { o: 71, h: 76, l: 70, c: 75 },
        { o: 75, h: 81, l: 74, c: 80 }, // 靠近上軌
        { o: 80, h: 82, l: 76, c: 77 },
        { o: 77, h: 78, l: 73, c: 74 }, // 拉回下軌
        { o: 74, h: 79, l: 73, c: 78 },
        { o: 78, h: 84, l: 77, c: 83 },
      ]
      const n = bars.length
      const barW = 10
      const step = (rightX - leftX) / (n + 1)
      const bx = (i: number) => leftX + (i + 1) * step

      // ── 通道底色 ──
      ctx.save()
      ctx.fillStyle = 'rgba(124, 58, 237, 0.05)'
      ctx.beginPath()
      ctx.moveTo(bx(-0.5), py(lo(-0.5)))
      ctx.lineTo(bx(12.6), py(lo(12.6)))
      ctx.lineTo(bx(12.6), py(hi(12.6)))
      ctx.lineTo(bx(-0.5), py(hi(-0.5)))
      ctx.closePath()
      ctx.fill()
      ctx.restore()

      // ── 下軌（綠實線）／上軌（紅實線）──
      ctx.save()
      ctx.strokeStyle = '#16a34a'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(bx(-0.5), py(lo(-0.5)))
      ctx.lineTo(bx(12.6), py(lo(12.6)))
      ctx.stroke()
      ctx.strokeStyle = '#ef4444'
      ctx.beginPath()
      ctx.moveTo(bx(-0.5), py(hi(-0.5)))
      ctx.lineTo(bx(12.6), py(hi(12.6)))
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

      // ── 買點 / 觀察點標註 ──
      lbl('▲ 買點參考', bx(5), py(lo(5)) + 18, '#16a34a', 10, true)
      lbl('▲ 買點參考', bx(10), py(lo(10)) + 18, '#16a34a', 10, true)
      lbl('▼ 注意（減碼/觀察）', bx(3), py(hi(3)) - 14, '#ef4444', 10, true)
      lbl('▼ 注意', bx(8), py(hi(8)) - 14, '#ef4444', 10, true)

      // ── 軌道名稱 ──
      lbl('上軌＝壓力線', bx(12.4), py(hi(12.4)) - 12, '#ef4444', 10.5, true, 'right')
      lbl('下軌＝支撐線', bx(12.4), py(lo(12.4)) + 14, '#16a34a', 10.5, true, 'right')

      // ── 頂部說明 ──
      lbl('趨勢通道：天花板和地板一目了然', leftX, topY + 2, '#1e1b4b', 11.5, true, 'left')

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
