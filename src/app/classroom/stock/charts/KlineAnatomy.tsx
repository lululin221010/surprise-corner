'use client'
import { useRef, useEffect } from 'react'

export default function KlineAnatomy() {
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

      // ── K線座標 ──
      const cx   = W * 0.38
      const bw   = 36
      const high = H * 0.10   // 最高（上影線頂）
      const open = H * 0.30   // 開盤（實體頂，陽線）
      const close= H * 0.62   // 收盤（實體底，陽線）
      const low  = H * 0.85   // 最低（下影線底）

      // 上影線
      ctx.strokeStyle = '#ef4444'; ctx.lineWidth = 2; ctx.setLineDash([])
      ctx.beginPath(); ctx.moveTo(cx, high); ctx.lineTo(cx, open); ctx.stroke()

      // 實體（陽線，紅色）
      ctx.fillStyle = '#ef4444'
      ctx.fillRect(cx - bw / 2, open, bw, close - open)

      // 下影線
      ctx.beginPath(); ctx.moveTo(cx, close); ctx.lineTo(cx, low); ctx.stroke()

      // ── 輔助函式 ──
      const lbl = (text: string, x: number, y: number, align: CanvasTextAlign, color: string, size: number, bold = false) => {
        ctx.save()
        ctx.fillStyle = color
        ctx.font = `${bold ? '700' : '500'} ${size}px sans-serif`
        ctx.textAlign = align; ctx.textBaseline = 'middle'
        ctx.fillText(text, x, y); ctx.restore()
      }

      const dash = (x1: number, y1: number, x2: number, y2: number, color = '#9ca3af') => {
        ctx.save(); ctx.strokeStyle = color; ctx.lineWidth = 1
        ctx.setLineDash([3, 3]); ctx.beginPath()
        ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke(); ctx.restore()
      }

      const labelX = cx + bw / 2 + 10
      const labelXL = cx - bw / 2 - 10

      // 最高價（右側）
      dash(cx, high, labelX + 4, high)
      lbl('最高價', labelX + 6, high, 'left', '#374151', 11, true)
      lbl('當天到過最高點', labelX + 6, high + 13, 'left', '#6b7280', 9)

      // 上影線標示（左側）
      const usMid = (high + open) / 2
      dash(cx - bw / 2, usMid, labelXL - 4, usMid, '#9ca3af')
      lbl('上影線', labelXL - 6, usMid - 6, 'right', '#9ca3af', 10)
      lbl('衝高被打回', labelXL - 6, usMid + 6, 'right', '#9ca3af', 9)

      // 開盤價（左側）
      dash(cx - bw / 2, open, labelXL - 4, open)
      lbl('開盤價', labelXL - 6, open - 6, 'right', '#374151', 11, true)
      lbl('第一筆成交', labelXL - 6, open + 7, 'right', '#6b7280', 9)

      // 實體標示（右側中間）
      const bodyMid = (open + close) / 2
      lbl('實體', labelX + 6, bodyMid - 7, 'left', '#ef4444', 11, true)
      lbl('開盤→收盤', labelX + 6, bodyMid + 7, 'left', '#ef4444', 9)

      // 收盤價（左側）
      dash(cx - bw / 2, close, labelXL - 4, close)
      lbl('收盤價', labelXL - 6, close - 6, 'right', '#374151', 11, true)
      lbl('最後一筆成交', labelXL - 6, close + 7, 'right', '#6b7280', 9)

      // 下影線標示（右側）
      const dsMid = (close + low) / 2
      dash(cx + bw / 2, dsMid, labelX + 4, dsMid, '#9ca3af')
      lbl('下影線', labelX + 6, dsMid - 6, 'left', '#9ca3af', 10)
      lbl('跌深被撐回', labelX + 6, dsMid + 6, 'left', '#9ca3af', 9)

      // 最低價（右側）
      dash(cx, low, labelX + 4, low)
      lbl('最低價', labelX + 6, low, 'left', '#374151', 11, true)
      lbl('當天到過最低點', labelX + 6, low + 13, 'left', '#6b7280', 9)

      // 底部說明
      lbl('陽線（紅K）＝收盤 > 開盤，多方勝出', W / 2, H * 0.95, 'center', '#ef4444', 10, true)
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
