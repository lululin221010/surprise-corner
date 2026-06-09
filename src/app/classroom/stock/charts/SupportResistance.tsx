'use client'
import { useRef, useEffect } from 'react'

export default function SupportResistance() {
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

      // ── 座標系 ──
      const leftX = W * 0.08
      const rightX = W * 0.88
      const topY = H * 0.08
      const botY = H * 0.87

      // 價格映射：100 → topY，50 → botY
      const priceMin = 50, priceMax = 100
      const py = (p: number) => botY - ((p - priceMin) / (priceMax - priceMin)) * (botY - topY)

      // ── K線資料（模擬一段走勢：下跌→支撐→突破→壓力變支撐）──
      const bars = [
        // 初段下跌
        { o: 88, h: 91, l: 85, c: 86 },
        { o: 86, h: 88, l: 82, c: 83 },
        { o: 83, h: 85, l: 80, c: 81 },
        // 第一次碰支撐反彈
        { o: 81, h: 84, l: 70, c: 83 },
        { o: 83, h: 87, l: 82, c: 86 },
        { o: 86, h: 89, l: 84, c: 85 },
        // 再次下跌測試支撐
        { o: 85, h: 87, l: 79, c: 81 },
        // 第二次碰支撐反彈（守住）
        { o: 81, h: 84, l: 70, c: 83 },
        { o: 83, h: 86, l: 82, c: 85 },
        // 衝擊壓力線
        { o: 85, h: 90, l: 84, c: 88 },
        { o: 88, h: 91, l: 86, c: 87 },
        { o: 87, h: 90, l: 85, c: 86 },
        // 突破壓力（爆量）
        { o: 86, h: 93, l: 85, c: 92 },
        // 突破後回測（壓力→支撐）
        { o: 92, h: 94, l: 88, c: 89 },
        { o: 89, h: 92, l: 88, c: 91 },
        // 後段上漲
        { o: 91, h: 95, l: 90, c: 94 },
        { o: 94, h: 97, l: 92, c: 96 },
      ]

      const n = bars.length
      const barW = 10
      const step = (rightX - leftX) / (n + 1)

      const supportPrice = 70
      const resistPrice = 90

      // ── 支撐線（綠虛線）──
      ctx.save()
      ctx.strokeStyle = '#16a34a'
      ctx.lineWidth = 1.5
      ctx.setLineDash([6, 4])
      ctx.beginPath()
      ctx.moveTo(leftX, py(supportPrice))
      ctx.lineTo(rightX * 0.72, py(supportPrice))
      ctx.stroke()
      ctx.restore()

      // ── 壓力線（紅虛線）──
      ctx.save()
      ctx.strokeStyle = '#ef4444'
      ctx.lineWidth = 1.5
      ctx.setLineDash([6, 4])
      ctx.beginPath()
      ctx.moveTo(leftX, py(resistPrice))
      ctx.lineTo(rightX * 0.72, py(resistPrice))
      ctx.stroke()
      ctx.restore()

      // ── 突破後新支撐線（綠虛線，右半段）──
      ctx.save()
      ctx.strokeStyle = '#16a34a'
      ctx.lineWidth = 1.5
      ctx.setLineDash([6, 4])
      ctx.beginPath()
      ctx.moveTo(rightX * 0.72, py(resistPrice))
      ctx.lineTo(rightX + 4, py(resistPrice))
      ctx.stroke()
      ctx.restore()

      // ── 畫 K 線 ──
      bars.forEach((bar, i) => {
        const x = leftX + (i + 1) * step
        const isUp = bar.c >= bar.o
        const color = isUp ? '#ef4444' : '#16a34a'

        // 影線
        ctx.strokeStyle = color
        ctx.lineWidth = 1.5
        ctx.setLineDash([])
        ctx.beginPath()
        ctx.moveTo(x, py(bar.h))
        ctx.lineTo(x, py(bar.l))
        ctx.stroke()

        // 實體
        const top = py(Math.max(bar.o, bar.c))
        const bot = py(Math.min(bar.o, bar.c))
        const bodyH = Math.max(bot - top, 2)
        ctx.fillStyle = color
        ctx.fillRect(x - barW / 2, top, barW, bodyH)
      })

      // ── 標籤輔助函式 ──
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

      // ── 文字標籤 ──
      // 支撐線標籤
      lbl('支撐線', leftX - 4, py(supportPrice) - 10, 'left', '#16a34a', 11, true)
      lbl('↑ 跌到這裡有人撐', leftX - 4, py(supportPrice) + 11, 'left', '#16a34a', 10)

      // 壓力線標籤
      lbl('壓力線', leftX - 4, py(resistPrice) - 10, 'left', '#ef4444', 11, true)
      lbl('↓ 漲到這裡有人賣', leftX - 4, py(resistPrice) + 11, 'left', '#ef4444', 10)

      // 突破箭頭區
      const breakBarX = leftX + 13 * step
      ctx.save()
      ctx.fillStyle = '#7c3aed'
      ctx.font = '600 10px sans-serif'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText('突破！', breakBarX, py(resistPrice) - 18)
      ctx.restore()

      // 天花板→地板標籤
      lbl('天花板 → 地板', W * 0.76, py(resistPrice) - 10, 'left', '#7c3aed', 10, true)
      lbl('壓力變支撐', W * 0.76, py(resistPrice) + 10, 'left', '#7c3aed', 10)

      // ── 底部軸線 ──
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
      <canvas
        ref={ref}
        style={{ width: '100%', height: '260px', display: 'block' }}
      />
    </div>
  )
}
