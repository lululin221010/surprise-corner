'use client'
import { useRef, useEffect } from 'react'

export default function RsiLine() {
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
      const kBotY  = H * 0.50
      const dTopY  = H * 0.56
      const dBotY  = H * 0.90

      // 股價：下跌→底背離→反彈越過50→頂背離
      const prices = [
        92, 90, 87, 84, 80, 76, 72, 68, 65, 63,
        62, 60, 61, 63, 66, 70, 74, 78, 82, 85,
        88, 91, 90, 93, 92, 91, 90, 88, 86, 84,
      ]
      // RSI 值
      const rsiVals = [
        72, 68, 62, 55, 48, 40, 33, 26, 22, 19,
        17, 15, 18, 24, 32, 42, 52, 60, 67, 72,
        76, 80, 74, 77, 73, 69, 65, 60, 54, 48,
      ]

      const n = prices.length
      const step = (rightX - leftX) / (n - 1)
      const px = (i: number) => leftX + i * step

      const pMin = Math.min(...prices) - 2
      const pMax = Math.max(...prices) + 2
      const kPy  = (p: number) => kBotY - ((p - pMin) / (pMax - pMin)) * (kBotY - kTopY)
      const rPy  = (v: number) => dBotY - (v / 100) * (dBotY - dTopY)

      // ── 股價折線 ──
      ctx.save()
      ctx.strokeStyle = '#6b7280'
      ctx.lineWidth = 1.5
      ctx.lineJoin = 'round'
      ctx.setLineDash([])
      ctx.beginPath()
      prices.forEach((p, i) => i === 0 ? ctx.moveTo(px(i), kPy(p)) : ctx.lineTo(px(i), kPy(p)))
      ctx.stroke()
      ctx.restore()

      // ── 參考線 70 / 50 / 30 ──
      const refLine = (v: number, color: string) => {
        ctx.save()
        ctx.strokeStyle = color
        ctx.lineWidth = 1
        ctx.setLineDash([4, 3])
        ctx.globalAlpha = 0.45
        ctx.beginPath()
        ctx.moveTo(leftX, rPy(v)); ctx.lineTo(rightX, rPy(v))
        ctx.stroke()
        ctx.restore()
        ctx.save()
        ctx.fillStyle = color
        ctx.font = '500 9px sans-serif'
        ctx.textAlign = 'right'
        ctx.textBaseline = 'middle'
        ctx.fillText(String(v), leftX - 2, rPy(v))
        ctx.restore()
      }

      refLine(70, '#ef4444')
      refLine(50, '#9ca3af')
      refLine(30, '#16a34a')

      // ── RSI 曲線（紫）──
      ctx.save()
      ctx.strokeStyle = '#8b5cf6'
      ctx.lineWidth = 2.5
      ctx.lineJoin = 'round'
      ctx.setLineDash([])
      ctx.beginPath()
      rsiVals.forEach((v, i) => i === 0 ? ctx.moveTo(px(i), rPy(v)) : ctx.lineTo(px(i), rPy(v)))
      ctx.stroke()
      ctx.restore()

      // ── 50線穿越標注（上穿 index ~15）──
      const cross50I = 15
      ctx.save()
      ctx.fillStyle = '#16a34a'
      ctx.beginPath()
      ctx.arc(px(cross50I), rPy(rsiVals[cross50I]), 4, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
      ctx.save()
      ctx.fillStyle = '#16a34a'
      ctx.font = '600 9px sans-serif'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'bottom'
      ctx.fillText('穿越50↑', px(cross50I), rPy(rsiVals[cross50I]) - 5)
      ctx.fillText('多方主導', px(cross50I), rPy(rsiVals[cross50I]) - 5 + 12)
      ctx.restore()

      // ── 底背離（股價 index 9 vs 11，更低；RSI index 9 vs 11，沒更低）──
      const div1A = 9, div1B = 11
      ctx.save()
      ctx.strokeStyle = '#7c3aed'
      ctx.lineWidth = 1.5
      ctx.setLineDash([3, 2])
      ctx.beginPath()
      ctx.moveTo(px(div1A), kPy(prices[div1A])); ctx.lineTo(px(div1B), kPy(prices[div1B]))
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(px(div1A), rPy(rsiVals[div1A])); ctx.lineTo(px(div1B), rPy(rsiVals[div1B]))
      ctx.stroke()
      ctx.restore()
      ctx.save()
      ctx.fillStyle = '#7c3aed'
      ctx.font = '600 9px sans-serif'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'top'
      ctx.fillText('底背離', px((div1A + div1B) / 2), rPy(15) + 2)
      ctx.restore()

      // ── 頂背離（股價 index 21 vs 23，更高；RSI 沒更高）──
      const div2A = 21, div2B = 23
      ctx.save()
      ctx.strokeStyle = '#ef4444'
      ctx.lineWidth = 1.5
      ctx.setLineDash([3, 2])
      ctx.beginPath()
      ctx.moveTo(px(div2A), kPy(prices[div2A])); ctx.lineTo(px(div2B), kPy(prices[div2B]))
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(px(div2A), rPy(rsiVals[div2A])); ctx.lineTo(px(div2B), rPy(rsiVals[div2B]))
      ctx.stroke()
      ctx.restore()
      ctx.save()
      ctx.fillStyle = '#ef4444'
      ctx.font = '600 9px sans-serif'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'bottom'
      ctx.fillText('頂背離', px((div2A + div2B) / 2), rPy(80) - 2)
      ctx.restore()

      // ── 圖例 ──
      const lbl = (text: string, x: number, y: number, align: CanvasTextAlign, color: string, size: number, bold = false) => {
        ctx.save()
        ctx.fillStyle = color
        ctx.font = `${bold ? '700' : '500'} ${size}px sans-serif`
        ctx.textAlign = align
        ctx.textBaseline = 'middle'
        ctx.fillText(text, x, y)
        ctx.restore()
      }

      const legY = dTopY - 6
      ctx.save(); ctx.strokeStyle = '#8b5cf6'; ctx.lineWidth = 2.5; ctx.beginPath()
      ctx.moveTo(leftX, legY); ctx.lineTo(leftX + 20, legY); ctx.stroke(); ctx.restore()
      lbl('RSI（14日）', leftX + 24, legY, 'left', '#8b5cf6', 11, true)

      lbl('股價', leftX + 8, kTopY + 6, 'left', '#6b7280', 10)
      lbl('RSI指標', leftX + 8, dTopY + 6, 'left', '#374151', 10, true)

      ctx.strokeStyle = '#e5e7eb'; ctx.lineWidth = 1; ctx.setLineDash([])
      ctx.beginPath(); ctx.moveTo(leftX, kBotY + 2); ctx.lineTo(rightX, kBotY + 2); ctx.stroke()
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
