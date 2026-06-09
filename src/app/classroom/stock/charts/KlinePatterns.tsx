'use client'
import { useRef, useEffect } from 'react'

export default function KlinePatterns() {
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
      const botY  = H * 0.78
      const range = botY - topY
      const bw    = 14  // 蠟燭寬

      // ── 標籤輔助 ──
      const lbl = (
        text: string, x: number, y: number,
        align: CanvasTextAlign = 'center',
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

      // ── 畫單根K線 ──
      const drawBar = (
        cx: number, o: number, h: number, l: number, c: number,
        color: string
      ) => {
        // 影線
        ctx.strokeStyle = color
        ctx.lineWidth = 1.5
        ctx.setLineDash([])
        ctx.beginPath()
        ctx.moveTo(cx, topY + h * range)
        ctx.lineTo(cx, topY + l * range)
        ctx.stroke()
        // 實體
        const top = topY + Math.min(o, c) * range
        const ht  = Math.abs(c - o) * range
        ctx.fillStyle = color
        ctx.fillRect(cx - bw / 2, top, bw, Math.max(ht, 3))
      }

      // ── 分隔線 ──
      const divLine = (x: number) => {
        ctx.save()
        ctx.strokeStyle = '#e5e7eb'
        ctx.lineWidth = 1
        ctx.setLineDash([4, 3])
        ctx.beginPath()
        ctx.moveTo(x, topY - 4)
        ctx.lineTo(x, botY + 4)
        ctx.stroke()
        ctx.restore()
      }

      // ────────────────────────────────
      // 區塊一：頭肩頂（中間）
      // ────────────────────────────────
      const cx1 = W * 0.20
      // 左肩
      drawBar(cx1 - 28, 0.55, 0.20, 0.60, 0.28, '#ef4444')
      drawBar(cx1 - 14, 0.65, 0.28, 0.70, 0.60, '#16a34a')
      // 頭部
      drawBar(cx1,      0.40, 0.05, 0.42, 0.12, '#ef4444')
      // 右肩
      drawBar(cx1 + 14, 0.28, 0.15, 0.68, 0.55, '#16a34a')
      drawBar(cx1 + 28, 0.55, 0.22, 0.62, 0.35, '#16a34a')

      // 頸線
      ctx.save()
      ctx.strokeStyle = '#f59e0b'
      ctx.lineWidth = 1.5
      ctx.setLineDash([5, 3])
      ctx.beginPath()
      ctx.moveTo(cx1 - 36, topY + 0.58 * range)
      ctx.lineTo(cx1 + 36, topY + 0.58 * range)
      ctx.stroke()
      ctx.restore()
      lbl('頸線', cx1 + 42, topY + 0.58 * range, 'left', '#f59e0b', 10)

      lbl('頭肩頂', cx1, botY + 12, 'center', '#ef4444', 11, true)
      lbl('跌破頸線才確認', cx1, botY + 24, 'center', '#6b7280', 9)

      divLine(W * 0.38)

      // ────────────────────────────────
      // 區塊二：雙底 W 底（右中）
      // ────────────────────────────────
      const cx2 = W * 0.60
      drawBar(cx2 - 36, 0.20, 0.10, 0.22, 0.70, '#16a34a')
      drawBar(cx2 - 22, 0.70, 0.65, 0.88, 0.78, '#16a34a')
      // 第一個底
      drawBar(cx2 - 8,  0.78, 0.70, 0.92, 0.82, '#16a34a')
      // 反彈
      drawBar(cx2 + 6,  0.82, 0.75, 0.85, 0.38, '#ef4444')
      // 第二個底
      drawBar(cx2 + 20, 0.38, 0.32, 0.90, 0.80, '#16a34a')
      // 突破頸線
      drawBar(cx2 + 34, 0.80, 0.72, 0.82, 0.30, '#ef4444')

      // 頸線
      ctx.save()
      ctx.strokeStyle = '#f59e0b'
      ctx.lineWidth = 1.5
      ctx.setLineDash([5, 3])
      ctx.beginPath()
      ctx.moveTo(cx2 - 44, topY + 0.38 * range)
      ctx.lineTo(cx2 + 44, topY + 0.38 * range)
      ctx.stroke()
      ctx.restore()
      lbl('頸線', cx2 - 50, topY + 0.38 * range, 'right', '#f59e0b', 10)

      lbl('雙底（W底）', cx2, botY + 12, 'center', '#16a34a', 11, true)
      lbl('突破頸線才進場', cx2, botY + 24, 'center', '#6b7280', 9)

      divLine(W * 0.82)

      // ────────────────────────────────
      // 區塊三：對稱三角形
      // ────────────────────────────────
      const cx3 = W * 0.91
      // 高點越來越低、低點越來越高 → 三角收斂
      const triData = [
        { o: 0.30, h: 0.12, l: 0.70, c: 0.65 },
        { o: 0.65, h: 0.60, l: 0.72, c: 0.68 },
        { o: 0.68, h: 0.22, l: 0.72, c: 0.28 },
        { o: 0.28, h: 0.25, l: 0.68, c: 0.64 },
        { o: 0.64, h: 0.30, l: 0.66, c: 0.36 },
        { o: 0.36, h: 0.33, l: 0.60, c: 0.55 },
      ]
      const triStep = 10
      triData.forEach((b, i) => {
        const tx = cx3 - 25 + i * triStep
        const color = b.c < b.o ? '#16a34a' : '#ef4444'
        drawBar(tx, b.o, b.h, b.l, b.c, color)
      })

      // 上壓線（斜線）
      ctx.save()
      ctx.strokeStyle = '#ef4444'
      ctx.lineWidth = 1.5
      ctx.setLineDash([4, 3])
      ctx.beginPath()
      ctx.moveTo(cx3 - 25, topY + 0.12 * range)
      ctx.lineTo(cx3 + 30, topY + 0.30 * range)
      ctx.stroke()
      ctx.restore()

      // 下支線（斜線）
      ctx.save()
      ctx.strokeStyle = '#16a34a'
      ctx.lineWidth = 1.5
      ctx.setLineDash([4, 3])
      ctx.beginPath()
      ctx.moveTo(cx3 - 25, topY + 0.70 * range)
      ctx.lineTo(cx3 + 30, topY + 0.58 * range)
      ctx.stroke()
      ctx.restore()

      lbl('三角整理', cx3 + 4, botY + 12, 'center', '#7c3aed', 11, true)
      lbl('等突破方向', cx3 + 4, botY + 24, 'center', '#6b7280', 9)
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
