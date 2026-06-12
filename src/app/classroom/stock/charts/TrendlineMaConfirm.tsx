'use client'
import { useRef, useEffect } from 'react'

// 趨勢線與均線雙重確認：趨勢線＋20MA 同時支撐
export default function TrendlineMaConfirm() {
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

      const priceMin = 56, priceMax = 92
      const py = (p: number) => botY - ((p - priceMin) / (priceMax - priceMin)) * (botY - topY)

      // 上升走勢
      const bars = [
        { o: 62, h: 65, l: 60, c: 64 },
        { o: 64, h: 67, l: 62, c: 66 },
        { o: 66, h: 68, l: 63, c: 64 },
        { o: 64, h: 68, l: 63, c: 67 },
        { o: 67, h: 71, l: 66, c: 70 },
        { o: 70, h: 72, l: 67, c: 68 },
        { o: 68, h: 72, l: 67, c: 71 },
        { o: 71, h: 75, l: 70, c: 74 },
        { o: 74, h: 76, l: 71, c: 72 },
        { o: 72, h: 76, l: 71, c: 75 },
        { o: 75, h: 79, l: 74, c: 78 },
        { o: 78, h: 81, l: 76, c: 80 },
        { o: 80, h: 84, l: 79, c: 83 },
      ]
      const n = bars.length
      const barW = 10
      const step = (rightX - leftX) / (n + 1)
      const bx = (i: number) => leftX + (i + 1) * step

      // 趨勢線：60.5 + i*1.5（在 K 線下方）
      const tl = (i: number) => 60.5 + i * 1.5
      // 20MA：平滑曲線，略高於趨勢線、低於收盤
      const ma = (i: number) => 62.5 + i * 1.45 + Math.sin(i * 0.9) * 0.7

      // ── 趨勢線（藍實線）──
      ctx.save()
      ctx.strokeStyle = '#2563eb'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(bx(-0.5), py(tl(-0.5)))
      ctx.lineTo(bx(12.6), py(tl(12.6)))
      ctx.stroke()
      ctx.restore()

      // ── 20MA（橘色曲線）──
      ctx.save()
      ctx.strokeStyle = '#f59e0b'
      ctx.lineWidth = 2
      ctx.beginPath()
      for (let i = -0.5; i <= 12.6; i += 0.25) {
        const x = bx(i), y = py(ma(i))
        if (i === -0.5) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
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

      const lbl = (text: string, x: number, y: number, color = '#374151', size = 10.5, bold = false, align: CanvasTextAlign = 'left') => {
        ctx.save()
        ctx.fillStyle = color
        ctx.font = `${bold ? '700' : '500'} ${size}px sans-serif`
        ctx.textAlign = align
        ctx.textBaseline = 'middle'
        ctx.fillText(text, x, y)
        ctx.restore()
      }

      // ── 線標籤（20日均線上移到K棒上方空白，趨勢線放右下空白）──
      lbl('20日均線', rightX, topY + 36, '#f59e0b', 10.5, true, 'right')
      lbl('趨勢線', rightX, py(tl(12.6)) + 14, '#2563eb', 10.5, true, 'right')

      // ── 雙重確認框 ──
      lbl('雙重確認 ＝ 相對安全的多方環境', leftX, topY + 2, '#1e1b4b', 11.5, true)
      lbl('① 股價在趨勢線上方  ② 均線多頭排列', leftX, topY + 18, '#7c3aed', 10.5)

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
