'use client'
import { useRef, useEffect } from 'react'

export default function VolumeBar() {
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

      // ── 版面分割：上 60% K線，下 35% 成交量，中間 5% 間距 ──
      const leftX = W * 0.07
      const rightX = W * 0.93
      const kTopY = H * 0.08
      const kBotY = H * 0.60
      const vTopY = H * 0.66
      const vBotY = H * 0.92

      // 兩段走勢：左=量增價漲（有力），右=量縮價漲（虛漲）
      // 格式: { o, h, l, c, vol }  o/h/l/c 為 0~1 相對比例
      const leftBars = [
        { o: 0.70, h: 0.55, l: 0.75, c: 0.60, vol: 0.35 },
        { o: 0.60, h: 0.42, l: 0.62, c: 0.48, vol: 0.55 },
        { o: 0.48, h: 0.30, l: 0.50, c: 0.35, vol: 0.70 },
        { o: 0.35, h: 0.15, l: 0.38, c: 0.20, vol: 0.88 },
        { o: 0.20, h: 0.05, l: 0.22, c: 0.10, vol: 0.95 },
      ]
      const rightBars = [
        { o: 0.70, h: 0.55, l: 0.75, c: 0.60, vol: 0.30 },
        { o: 0.60, h: 0.45, l: 0.62, c: 0.50, vol: 0.22 },
        { o: 0.50, h: 0.35, l: 0.52, c: 0.40, vol: 0.18 },
        { o: 0.40, h: 0.25, l: 0.42, c: 0.30, vol: 0.14 },
        { o: 0.30, h: 0.15, l: 0.32, c: 0.20, vol: 0.10 },
      ]

      const drawSection = (bars: typeof leftBars, startX: number, endX: number, label: string, labelColor: string, subLabel: string) => {
        const n = bars.length
        const sectionW = endX - startX
        const step = sectionW / (n + 1)
        const barW = Math.max(step * 0.5, 8)

        const kRange = kBotY - kTopY
        const vRange = vBotY - vTopY

        bars.forEach((bar, i) => {
          const x = startX + (i + 1) * step

          // K線
          const kColor = '#ef4444' // 全部上漲
          ctx.strokeStyle = kColor
          ctx.lineWidth = 1.5
          ctx.setLineDash([])
          ctx.beginPath()
          ctx.moveTo(x, kTopY + bar.h * kRange)
          ctx.lineTo(x, kTopY + bar.l * kRange)
          ctx.stroke()
          const top = kTopY + Math.min(bar.o, bar.c) * kRange
          const ht = Math.abs(bar.c - bar.o) * kRange
          ctx.fillStyle = kColor
          ctx.fillRect(x - barW / 2, top, barW, Math.max(ht, 3))

          // 成交量柱
          const volH = bar.vol * vRange
          ctx.fillStyle = '#fca5a5'
          ctx.fillRect(x - barW / 2, vBotY - volH, barW, volH)
        })

        // 標題
        ctx.save()
        ctx.fillStyle = labelColor
        ctx.font = '700 12px sans-serif'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(label, (startX + endX) / 2, H * 0.97)
        ctx.restore()
        ctx.save()
        ctx.fillStyle = '#6b7280'
        ctx.font = '500 10px sans-serif'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(subLabel, (startX + endX) / 2, H * 0.97 + 13)
        ctx.restore()
      }

      const midX = W * 0.50

      // 分隔線
      ctx.save()
      ctx.strokeStyle = '#e5e7eb'
      ctx.lineWidth = 1
      ctx.setLineDash([4, 3])
      ctx.beginPath()
      ctx.moveTo(midX, kTopY - 4)
      ctx.lineTo(midX, vBotY + 4)
      ctx.stroke()
      ctx.restore()

      drawSection(leftBars,  leftX, midX - 4, '量增價漲 ✓', '#16a34a', '有力，多方主導')
      drawSection(rightBars, midX + 4, rightX, '量縮價漲 ⚠', '#f59e0b', '虛漲，撐不住')

      // 區域標籤
      const lbl = (text: string, x: number, y: number, align: CanvasTextAlign, color: string, size: number) => {
        ctx.save()
        ctx.fillStyle = color
        ctx.font = `500 ${size}px sans-serif`
        ctx.textAlign = align
        ctx.textBaseline = 'middle'
        ctx.fillText(text, x, y)
        ctx.restore()
      }

      lbl('K線', leftX - 2, (kTopY + kBotY) / 2, 'right', '#9ca3af', 10)
      lbl('成交量', leftX - 2, (vTopY + vBotY) / 2, 'right', '#9ca3af', 10)

      // 橫軸
      ctx.strokeStyle = '#e5e7eb'
      ctx.lineWidth = 1
      ctx.setLineDash([])
      ctx.beginPath()
      ctx.moveTo(leftX, kBotY + 2)
      ctx.lineTo(rightX, kBotY + 2)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(leftX, vBotY + 2)
      ctx.lineTo(rightX, vBotY + 2)
      ctx.stroke()
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
