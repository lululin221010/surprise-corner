'use client'
import { useRef, useEffect } from 'react'

export default function KdOscillator() {
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

      // ── 模擬 KD 值（30根）：先高檔死亡交叉，再低檔黃金交叉，再頂背離 ──
      const kVals = [
        85, 88, 82, 75, 65, 55, 45, 35, 28, 22,
        18, 15, 20, 28, 38, 50, 62, 72, 80, 85,
        88, 82, 84, 80, 75, 70, 62, 55, 48, 42,
      ]
      const dVals = [
        80, 82, 83, 80, 75, 65, 55, 45, 36, 28,
        23, 19, 17, 20, 28, 38, 50, 62, 72, 80,
        83, 85, 84, 83, 80, 75, 70, 62, 55, 48,
      ]
      // 對應股價（上漲→下跌→反彈→再衝高但衰弱）
      const prices = [
        88, 91, 89, 85, 82, 78, 74, 70, 67, 64,
        62, 60, 62, 65, 68, 72, 76, 80, 84, 87,
        90, 88, 92, 91, 90, 88, 86, 84, 82, 80,
      ]

      const n = kVals.length
      const step = (rightX - leftX) / (n - 1)
      const px = (i: number) => leftX + i * step

      // 價格映射
      const pMin = Math.min(...prices) - 2
      const pMax = Math.max(...prices) + 2
      const kPy = (p: number) => kBotY - ((p - pMin) / (pMax - pMin)) * (kBotY - kTopY)

      // KD 映射 (0~100)
      const kdPy = (v: number) => dBotY - (v / 100) * (dBotY - dTopY)

      // ── 股價折線 ──
      ctx.save()
      ctx.strokeStyle = '#6b7280'
      ctx.lineWidth = 1.5
      ctx.lineJoin = 'round'
      ctx.setLineDash([])
      ctx.beginPath()
      prices.forEach((p, i) => {
        i === 0 ? ctx.moveTo(px(i), kPy(p)) : ctx.lineTo(px(i), kPy(p))
      })
      ctx.stroke()
      ctx.restore()

      // ── KD 參考線 80 / 20 ──
      const refLine = (y: number, color: string, label: string) => {
        ctx.save()
        ctx.strokeStyle = color
        ctx.lineWidth = 1
        ctx.setLineDash([4, 3])
        ctx.globalAlpha = 0.5
        ctx.beginPath()
        ctx.moveTo(leftX, y)
        ctx.lineTo(rightX, y)
        ctx.stroke()
        ctx.restore()
        ctx.save()
        ctx.fillStyle = color
        ctx.font = '500 9px sans-serif'
        ctx.textAlign = 'right'
        ctx.textBaseline = 'middle'
        ctx.fillText(label, leftX - 2, y)
        ctx.restore()
      }

      refLine(kdPy(80), '#ef4444', '80')
      refLine(kdPy(50), '#9ca3af', '50')
      refLine(kdPy(20), '#16a34a', '20')

      // ── K 線（橘）──
      ctx.save()
      ctx.strokeStyle = '#f59e0b'
      ctx.lineWidth = 2
      ctx.lineJoin = 'round'
      ctx.setLineDash([])
      ctx.beginPath()
      kVals.forEach((v, i) => {
        i === 0 ? ctx.moveTo(px(i), kdPy(v)) : ctx.lineTo(px(i), kdPy(v))
      })
      ctx.stroke()
      ctx.restore()

      // ── D 線（藍）──
      ctx.save()
      ctx.strokeStyle = '#3b82f6'
      ctx.lineWidth = 2
      ctx.lineJoin = 'round'
      ctx.setLineDash([])
      ctx.beginPath()
      dVals.forEach((v, i) => {
        i === 0 ? ctx.moveTo(px(i), kdPy(v)) : ctx.lineTo(px(i), kdPy(v))
      })
      ctx.stroke()
      ctx.restore()

      // ── 標注：高檔死亡交叉（約 index 2~3）──
      const dcI = 3
      ctx.save()
      ctx.fillStyle = '#ef4444'
      ctx.beginPath()
      ctx.arc(px(dcI), kdPy(kVals[dcI]), 5, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
      ctx.save()
      ctx.fillStyle = '#ef4444'
      ctx.font = '600 9px sans-serif'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'bottom'
      ctx.fillText('死亡交叉', px(dcI), kdPy(kVals[dcI]) - 6)
      ctx.restore()

      // ── 標注：低檔黃金交叉（約 index 12~13）──
      const gcI = 12
      ctx.save()
      ctx.fillStyle = '#16a34a'
      ctx.beginPath()
      ctx.arc(px(gcI), kdPy(kVals[gcI]), 5, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
      ctx.save()
      ctx.fillStyle = '#16a34a'
      ctx.font = '600 9px sans-serif'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'top'
      ctx.fillText('黃金交叉', px(gcI), kdPy(kVals[gcI]) + 6)
      ctx.restore()

      // ── 標注：頂背離（股價 index 20 比 19 高，但 KD 比前低）──
      const divI = 22
      ctx.save()
      ctx.strokeStyle = '#7c3aed'
      ctx.lineWidth = 1.5
      ctx.setLineDash([3, 2])
      ctx.beginPath()
      ctx.moveTo(px(19), kPy(prices[19]))
      ctx.lineTo(px(divI), kPy(prices[divI]))
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(px(19), kdPy(kVals[19]))
      ctx.lineTo(px(divI), kdPy(kVals[divI]))
      ctx.stroke()
      ctx.restore()
      ctx.save()
      ctx.fillStyle = '#7c3aed'
      ctx.font = '600 9px sans-serif'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'top'
      ctx.fillText('頂背離', px((19 + divI) / 2), dTopY + 2)
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
      ctx.save(); ctx.strokeStyle = '#f59e0b'; ctx.lineWidth = 2; ctx.beginPath()
      ctx.moveTo(leftX, legY); ctx.lineTo(leftX + 18, legY); ctx.stroke(); ctx.restore()
      lbl('K值', leftX + 22, legY, 'left', '#f59e0b', 11, true)

      ctx.save(); ctx.strokeStyle = '#3b82f6'; ctx.lineWidth = 2; ctx.beginPath()
      ctx.moveTo(leftX + 50, legY); ctx.lineTo(leftX + 68, legY); ctx.stroke(); ctx.restore()
      lbl('D值', leftX + 72, legY, 'left', '#3b82f6', 11, true)

      lbl('股價', leftX + 8, kTopY + 6, 'left', '#6b7280', 10)
      lbl('KD指標', leftX + 8, dTopY + 6, 'left', '#374151', 10, true)

      // 橫軸
      ctx.strokeStyle = '#e5e7eb'
      ctx.lineWidth = 1
      ctx.setLineDash([])
      ctx.beginPath()
      ctx.moveTo(leftX, kBotY + 2); ctx.lineTo(rightX, kBotY + 2); ctx.stroke()
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
