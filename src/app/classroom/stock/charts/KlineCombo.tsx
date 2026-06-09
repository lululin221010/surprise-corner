'use client'
import { useRef, useEffect } from 'react'

export default function KlineCombo() {
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

      const topY  = H * 0.10
      const botY  = H * 0.72
      const range = botY - topY
      const bw    = 13

      const lbl = (text: string, x: number, y: number, align: CanvasTextAlign, color: string, size: number, bold = false) => {
        ctx.save()
        ctx.fillStyle = color
        ctx.font = `${bold ? '700' : '500'} ${size}px sans-serif`
        ctx.textAlign = align; ctx.textBaseline = 'middle'
        ctx.fillText(text, x, y); ctx.restore()
      }

      type Bar = { o: number; h: number; l: number; c: number }

      const drawBar = (cx: number, bar: Bar, color: string) => {
        ctx.strokeStyle = color; ctx.lineWidth = 1.5; ctx.setLineDash([])
        ctx.beginPath()
        ctx.moveTo(cx, topY + bar.h * range); ctx.lineTo(cx, topY + bar.l * range); ctx.stroke()
        const top = topY + Math.min(bar.o, bar.c) * range
        const ht  = Math.abs(bar.c - bar.o) * range
        ctx.fillStyle = color
        ctx.fillRect(cx - bw / 2, top, bw, Math.max(ht, 3))
      }

      // ── 三個段落 ──
      // 1. 三紅兵（連三根陽線，越來越高）
      const g1X = W * 0.15
      const g1 = [
        { o: 0.75, h: 0.58, l: 0.80, c: 0.62 },
        { o: 0.62, h: 0.42, l: 0.65, c: 0.46 },
        { o: 0.46, h: 0.26, l: 0.48, c: 0.30 },
      ]
      g1.forEach((b, i) => drawBar(g1X + i * 22, b, '#ef4444'))
      lbl('三紅兵', g1X + 22, botY + 12, 'center', '#ef4444', 11, true)
      lbl('多頭持續強勢', g1X + 22, botY + 24, 'center', '#6b7280', 9)

      // 2. 三黑鴉（連三根陰線，越來越低）
      const g2X = W * 0.43
      const g2 = [
        { o: 0.30, h: 0.25, l: 0.48, c: 0.44 },
        { o: 0.44, h: 0.40, l: 0.62, c: 0.58 },
        { o: 0.58, h: 0.54, l: 0.76, c: 0.72 },
      ]
      g2.forEach((b, i) => drawBar(g2X + i * 22, b, '#16a34a'))
      lbl('三黑鴉', g2X + 22, botY + 12, 'center', '#16a34a', 11, true)
      lbl('空頭持續強勢', g2X + 22, botY + 24, 'center', '#6b7280', 9)

      // 3. 早晨之星（下跌→十字星→反彈陽線）
      const g3X = W * 0.72
      const g3 = [
        { o: 0.28, h: 0.22, l: 0.50, c: 0.46, color: '#16a34a' },  // 長黑
        { o: 0.52, h: 0.48, l: 0.58, c: 0.54, color: '#9ca3af' },  // 十字小星
        { o: 0.54, h: 0.30, l: 0.56, c: 0.34, color: '#ef4444' },  // 長紅
      ]
      g3.forEach((b, i) => drawBar(g3X + i * 22, b, b.color))
      lbl('早晨之星', g3X + 22, botY + 12, 'center', '#7c3aed', 11, true)
      lbl('下跌後反轉訊號', g3X + 22, botY + 24, 'center', '#6b7280', 9)

      // 星號標示（十字星）
      ctx.save()
      ctx.fillStyle = '#9ca3af'
      ctx.font = '700 14px sans-serif'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'bottom'
      ctx.fillText('★', g3X + 22, topY + 0.42 * range)
      ctx.restore()

      // 分隔線
      const div = (x: number) => {
        ctx.save(); ctx.strokeStyle = '#e5e7eb'; ctx.lineWidth = 1; ctx.setLineDash([4, 3])
        ctx.beginPath(); ctx.moveTo(x, topY - 4); ctx.lineTo(x, botY + 4); ctx.stroke(); ctx.restore()
      }
      div(W * 0.30)
      div(W * 0.60)

      lbl('三種組合K線：連續走勢說一個故事，比單根更可信', W / 2, H * 0.91, 'center', '#9ca3af', 10)
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
