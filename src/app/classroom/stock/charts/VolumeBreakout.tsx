'use client'
import { useRef, useEffect } from 'react'

export default function VolumeBreakout() {
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

      const leftX  = W * 0.07
      const rightX = W * 0.93
      const kTopY  = H * 0.08
      const kBotY  = H * 0.60
      const vTopY  = H * 0.66
      const vBotY  = H * 0.92
      const kRange = kBotY - kTopY
      const vRange = vBotY - vTopY

      // 整段走勢：整理→低點爆量突破→後續上漲
      // { o, h, l, c } 皆為 0~1 相對比例（0=最高, 1=最低）
      const bars = [
        // 前段整理（5根）
        { o: 0.45, h: 0.38, l: 0.52, c: 0.48, vol: 0.20, up: false },
        { o: 0.48, h: 0.40, l: 0.55, c: 0.44, vol: 0.18, up: true  },
        { o: 0.44, h: 0.36, l: 0.50, c: 0.47, vol: 0.15, up: false },
        { o: 0.47, h: 0.39, l: 0.52, c: 0.43, vol: 0.17, up: true  },
        { o: 0.43, h: 0.37, l: 0.48, c: 0.46, vol: 0.19, up: false },
        // 爆量突破那根（第6根，超大量）
        { o: 0.46, h: 0.15, l: 0.48, c: 0.18, vol: 0.95, up: true  },
        // 突破後繼續上漲（4根）
        { o: 0.18, h: 0.10, l: 0.22, c: 0.13, vol: 0.60, up: true  },
        { o: 0.13, h: 0.06, l: 0.16, c: 0.09, vol: 0.45, up: true  },
        { o: 0.09, h: 0.04, l: 0.12, c: 0.07, vol: 0.38, up: true  },
        { o: 0.07, h: 0.02, l: 0.10, c: 0.05, vol: 0.40, up: true  },
      ]

      const n = bars.length
      const step = (rightX - leftX) / (n + 1)
      const barW = Math.max(step * 0.55, 8)

      bars.forEach((bar, i) => {
        const x = leftX + (i + 1) * step
        const isBreak = i === 5
        const kColor = bar.up ? '#ef4444' : '#16a34a'

        // K線影線
        ctx.strokeStyle = isBreak ? '#dc2626' : kColor
        ctx.lineWidth = isBreak ? 2 : 1.5
        ctx.setLineDash([])
        ctx.beginPath()
        ctx.moveTo(x, kTopY + bar.h * kRange)
        ctx.lineTo(x, kTopY + bar.l * kRange)
        ctx.stroke()

        // K線實體
        const top = kTopY + Math.min(bar.o, bar.c) * kRange
        const ht = Math.abs(bar.c - bar.o) * kRange
        ctx.fillStyle = isBreak ? '#dc2626' : kColor
        ctx.fillRect(x - barW / 2, top, barW, Math.max(ht, 3))

        // 成交量柱
        const volH = bar.vol * vRange
        ctx.fillStyle = isBreak ? '#dc2626' : (bar.up ? '#fca5a5' : '#bbf7d0')
        ctx.fillRect(x - barW / 2, vBotY - volH, barW, volH)
      })

      // ── 壓力線（突破前的頂部）──
      const resistY = kTopY + 0.38 * kRange
      ctx.save()
      ctx.strokeStyle = '#ef4444'
      ctx.lineWidth = 1.5
      ctx.setLineDash([6, 4])
      ctx.beginPath()
      ctx.moveTo(leftX, resistY)
      ctx.lineTo(leftX + 6 * step, resistY)
      ctx.stroke()
      ctx.restore()

      // ── 標籤 ──
      const lbl = (text: string, x: number, y: number, align: CanvasTextAlign, color: string, size: number, bold = false) => {
        ctx.save()
        ctx.fillStyle = color
        ctx.font = `${bold ? '700' : '500'} ${size}px sans-serif`
        ctx.textAlign = align
        ctx.textBaseline = 'middle'
        ctx.fillText(text, x, y)
        ctx.restore()
      }

      // 壓力線標籤
      lbl('壓力線', leftX + step * 4, resistY - 9, 'center', '#ef4444', 10)

      // 突破箭頭標示
      const breakX = leftX + 6 * step
      lbl('⬆ 爆量突破！', breakX, kTopY + 0.05 * kRange, 'center', '#dc2626', 11, true)
      lbl('有效突破訊號', breakX, kTopY + 0.05 * kRange + 13, 'center', '#7c3aed', 9)

      // 整理期標示
      lbl('整理期：量縮', leftX + step * 3, vBotY + 10, 'center', '#9ca3af', 10)
      lbl('突破：爆量', leftX + step * 6, vBotY + 10, 'center', '#dc2626', 10, true)
      lbl('後續：量仍在', leftX + step * 8.5, vBotY + 10, 'center', '#16a34a', 10)

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

      lbl('K線', leftX - 2, (kTopY + kBotY) / 2, 'right', '#9ca3af', 10)
      lbl('成交量', leftX - 2, (vTopY + vBotY) / 2, 'right', '#9ca3af', 10)
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
