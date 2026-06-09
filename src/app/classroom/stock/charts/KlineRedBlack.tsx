'use client'
import { useRef, useEffect } from 'react'

export default function KlineRedBlack() {
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

      const bw = 36          // 蠟燭寬度
      const topY = H * 0.10
      const botY = H * 0.88
      const range = botY - topY

      // ── 陽線（紅K）：收盤 > 開盤 ──
      const rx = W * 0.28
      const rHigh  = topY + range * 0.05
      const rClose = topY + range * 0.22   // 收盤（上方）
      const rOpen  = topY + range * 0.62   // 開盤（下方）
      const rLow   = topY + range * 0.90

      // 影線
      ctx.strokeStyle = '#dc2626'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(rx, rHigh)
      ctx.lineTo(rx, rLow)
      ctx.stroke()
      // 實體
      ctx.fillStyle = '#dc2626'
      ctx.fillRect(rx - bw / 2, rClose, bw, rOpen - rClose)

      // ── 陰線（黑K / 綠K）：收盤 < 開盤 ──
      const bx = W * 0.72
      const bHigh  = topY + range * 0.05
      const bOpen  = topY + range * 0.22   // 開盤（上方）
      const bClose = topY + range * 0.62   // 收盤（下方）
      const bLow   = topY + range * 0.90

      ctx.strokeStyle = '#16a34a'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(bx, bHigh)
      ctx.lineTo(bx, bLow)
      ctx.stroke()
      ctx.fillStyle = '#16a34a'
      ctx.fillRect(bx - bw / 2, bOpen, bw, bClose - bOpen)

      // ── 虛線輔助線 ──
      const dash = (x1: number, y1: number, x2: number, y2: number) => {
        ctx.save()
        ctx.strokeStyle = '#d1d5db'
        ctx.lineWidth = 1
        ctx.setLineDash([4, 3])
        ctx.beginPath()
        ctx.moveTo(x1, y1)
        ctx.lineTo(x2, y2)
        ctx.stroke()
        ctx.restore()
      }

      // ── 標籤 ──
      const lbl = (
        text: string,
        x: number,
        y: number,
        align: CanvasTextAlign = 'left',
        color = '#374151',
        size = 12
      ) => {
        ctx.save()
        ctx.fillStyle = color
        ctx.font = `500 ${size}px sans-serif`
        ctx.textAlign = align
        ctx.textBaseline = 'middle'
        ctx.fillText(text, x, y)
        ctx.restore()
      }

      const pad = 10

      // 陽線標籤（左側）
      dash(rx - bw / 2 - pad, rHigh,  rx - bw / 2 - pad - 52, rHigh)
      lbl('最高價', rx - bw / 2 - pad - 56, rHigh, 'right', '#7c3aed')

      dash(rx - bw / 2 - pad, rClose, rx - bw / 2 - pad - 52, rClose)
      lbl('收盤價 ▲', rx - bw / 2 - pad - 56, rClose, 'right', '#dc2626')

      dash(rx - bw / 2 - pad, rOpen,  rx - bw / 2 - pad - 52, rOpen)
      lbl('開盤價', rx - bw / 2 - pad - 56, rOpen, 'right', '#374151')

      dash(rx - bw / 2 - pad, rLow,   rx - bw / 2 - pad - 52, rLow)
      lbl('最低價', rx - bw / 2 - pad - 56, rLow, 'right', '#7c3aed')

      // 陰線標籤（右側）
      dash(bx + bw / 2 + pad, bHigh,  bx + bw / 2 + pad + 52, bHigh)
      lbl('最高價', bx + bw / 2 + pad + 56, bHigh, 'left', '#7c3aed')

      dash(bx + bw / 2 + pad, bOpen,  bx + bw / 2 + pad + 52, bOpen)
      lbl('開盤價', bx + bw / 2 + pad + 56, bOpen, 'left', '#374151')

      dash(bx + bw / 2 + pad, bClose, bx + bw / 2 + pad + 52, bClose)
      lbl('收盤價 ▼', bx + bw / 2 + pad + 56, bClose, 'left', '#16a34a')

      dash(bx + bw / 2 + pad, bLow,   bx + bw / 2 + pad + 52, bLow)
      lbl('最低價', bx + bw / 2 + pad + 56, bLow, 'left', '#7c3aed')

      // ── 實體中央文字 ──
      ctx.save()
      ctx.fillStyle = '#ffffff'
      ctx.font = '600 11px sans-serif'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText('實體', rx, (rClose + rOpen) / 2)
      ctx.fillText('實體', bx, (bOpen + bClose) / 2)
      ctx.restore()

      // ── 標題 ──
      lbl('陽線（紅K）', rx, H * 0.97, 'center', '#dc2626', 13)
      lbl('收盤 > 開盤', rx, H * 0.97 + 16, 'center', '#6b7280', 11)
      lbl('陰線（綠K）', bx, H * 0.97, 'center', '#16a34a', 13)
      lbl('收盤 < 開盤', bx, H * 0.97 + 16, 'center', '#6b7280', 11)
    }

    // 等 canvas 實際渲染後才畫
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
