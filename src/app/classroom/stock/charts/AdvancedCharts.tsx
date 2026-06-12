'use client'
// 進階課圖殼引擎：一個元件吃 chart.type，內部 registry 分派 draw 函式
// ⚠️ 鐵則：文字標籤只放「頂部標題區 / 底部軸線上方 / 圖中保證空白區（如缺口）」，
//          不放走勢中間，避免窄視窗撞 K 棒（2026-06-12 妹驗收回饋）
import { useRef, useEffect } from 'react'

type Bar = { o: number; h: number; l: number; c: number }

interface Geom {
  W: number; H: number
  leftX: number; rightX: number; topY: number; botY: number
  py: (p: number) => number
  bx: (i: number) => number
  barW: number
}

function makeGeom(W: number, H: number, pMin: number, pMax: number, n: number, botFrac = 0.87, topFrac = 0.22): Geom {
  const leftX = W * 0.08
  const rightX = W * 0.92
  const topY = H * topFrac
  const botY = H * botFrac
  return {
    W, H, leftX, rightX, topY, botY,
    py: (p: number) => botY - ((p - pMin) / (pMax - pMin)) * (botY - topY),
    bx: (i: number) => leftX + (i + 1) * ((rightX - leftX) / (n + 1)),
    barW: Math.min(10, (rightX - leftX) / (n + 1) * 0.55),
  }
}

function drawBars(ctx: CanvasRenderingContext2D, g: Geom, bars: Bar[], offset = 0) {
  bars.forEach((bar, i) => {
    const x = g.bx(i + offset)
    const color = bar.c >= bar.o ? '#ef4444' : '#16a34a'
    ctx.strokeStyle = color
    ctx.lineWidth = 1.5
    ctx.setLineDash([])
    ctx.beginPath()
    ctx.moveTo(x, g.py(bar.h))
    ctx.lineTo(x, g.py(bar.l))
    ctx.stroke()
    const top = g.py(Math.max(bar.o, bar.c))
    const bot = g.py(Math.min(bar.o, bar.c))
    ctx.fillStyle = color
    ctx.fillRect(x - g.barW / 2, top, g.barW, Math.max(bot - top, 2))
  })
}

function lbl(ctx: CanvasRenderingContext2D, text: string, x: number, y: number,
  color = '#374151', size = 10.5, bold = false, align: CanvasTextAlign = 'left') {
  ctx.save()
  ctx.fillStyle = color
  ctx.font = `${bold ? '700' : '500'} ${size}px sans-serif`
  ctx.textAlign = align
  ctx.textBaseline = 'middle'
  ctx.fillText(text, x, y)
  ctx.restore()
}

function axis(ctx: CanvasRenderingContext2D, g: Geom) {
  ctx.strokeStyle = '#e5e7eb'
  ctx.lineWidth = 1
  ctx.setLineDash([])
  ctx.beginPath()
  ctx.moveTo(g.leftX, g.botY + 4)
  ctx.lineTo(g.rightX + 4, g.botY + 4)
  ctx.stroke()
}

function header(ctx: CanvasRenderingContext2D, g: Geom, line1: string, line2?: string) {
  lbl(ctx, line1, g.leftX, g.H * 0.06, '#1e1b4b', 11.5, true)
  if (line2) lbl(ctx, line2, g.leftX, g.H * 0.06 + 16, '#7c3aed', 10)
}

function footer(ctx: CanvasRenderingContext2D, g: Geom, note: string, color = '#94a3b8') {
  lbl(ctx, note, g.rightX, g.botY - 8, color, 10, false, 'right')
}

// ── 進02：跳空缺口示意 ──
function drawGapIntro(ctx: CanvasRenderingContext2D, W: number, H: number) {
  const bars: Bar[] = [
    { o: 86, h: 89, l: 84, c: 88 }, { o: 88, h: 91, l: 86, c: 90 },
    { o: 90, h: 93, l: 88, c: 89 }, { o: 89, h: 94, l: 88, c: 93 },
    { o: 93, h: 96, l: 91, c: 95 }, // 昨收 95
    { o: 105, h: 110, l: 103, c: 108 }, // 今開 105，跳空
    { o: 108, h: 113, l: 106, c: 112 }, { o: 112, h: 117, l: 110, c: 116 },
  ]
  const g = makeGeom(W, H, 80, 120, bars.length)
  // 缺口陰影區（95–105 之間、跨在兩根之間）
  const gx1 = g.bx(3.6), gx2 = g.bx(5.4)
  ctx.fillStyle = 'rgba(124, 58, 237, 0.10)'
  ctx.fillRect(gx1, g.py(104.5), gx2 - gx1, g.py(95.5) - g.py(104.5))
  ctx.strokeStyle = '#7c3aed'
  ctx.setLineDash([4, 3])
  ctx.lineWidth = 1.2
  ctx.strokeRect(gx1, g.py(104.5), gx2 - gx1, g.py(95.5) - g.py(104.5))
  ctx.setLineDash([])
  drawBars(ctx, g, bars)
  // 「缺口」標籤放在缺口空白區正中（保證淨空）
  lbl(ctx, '缺口', (gx1 + gx2) / 2, g.py(100), '#7c3aed', 11, true, 'center')
  header(ctx, g, '跳空上漲缺口：兩天之間的空白', '昨收95 → 今開105，中間沒有任何成交')
  footer(ctx, g, '缺口區日後常成支撐/壓力')
  axis(ctx, g)
}

// ── 進02：四種缺口位置 ──
function drawGapFourTypes(ctx: CanvasRenderingContext2D, W: number, H: number) {
  const bars: Bar[] = [
    // 盤整（0–4）
    { o: 60, h: 63, l: 58, c: 61 }, { o: 61, h: 63, l: 59, c: 60 },
    { o: 60, h: 62, l: 58, c: 61 }, { o: 61, h: 64, l: 59, c: 62 }, { o: 62, h: 64, l: 60, c: 63 },
    // ① 突破缺口（5）
    { o: 70, h: 74, l: 69, c: 73 }, { o: 73, h: 77, l: 71, c: 76 }, { o: 76, h: 79, l: 74, c: 78 },
    // ② 逃逸缺口（8）
    { o: 85, h: 89, l: 84, c: 88 }, { o: 88, h: 92, l: 86, c: 91 }, { o: 91, h: 95, l: 89, c: 94 },
    // ③ 竭盡缺口（11）後反轉
    { o: 101, h: 105, l: 99, c: 102 }, { o: 102, h: 104, l: 97, c: 98 }, { o: 98, h: 100, l: 93, c: 94 },
  ]
  const g = makeGeom(W, H, 52, 112, bars.length, 0.87, 0.26)
  drawBars(ctx, g, bars)
  // 三個缺口圈號：放在缺口空白帶中
  const mark = (xi: number, pMid: number, t: string, color: string) => {
    const x = (g.bx(xi) + g.bx(xi + 1)) / 2
    ctx.strokeStyle = color
    ctx.lineWidth = 1.6
    ctx.setLineDash([])
    ctx.beginPath()
    ctx.arc(x, g.py(pMid), 9, 0, Math.PI * 2)
    ctx.stroke()
    lbl(ctx, t, x, g.py(pMid), color, 10, true, 'center')
  }
  mark(4, 66.5, '①', '#ef4444')   // 63→70 之間
  mark(7, 81.5, '②', '#2563eb')   // 78→85 之間
  mark(10, 97.5, '③', '#f59e0b')  // 94→101 之間
  header(ctx, g, '缺口看「位置」：①突破（盤整末）②逃逸（中段）③竭盡（末端）', '盤整區內的普通缺口意義不大，幾天就回補')
  footer(ctx, g, '③之後量大不漲 → 反轉警示')
  axis(ctx, g)
}

// ── 進02：逃逸缺口等距目標價 ──
function drawGapMeasuredTarget(ctx: CanvasRenderingContext2D, W: number, H: number) {
  const g = makeGeom(W, H, 44, 98, 10, 0.87, 0.24)
  const pathEndX = g.leftX + (g.rightX - g.leftX) * 0.66 // 路徑只佔左 2/3，右側留給等距標尺
  const px = (f: number) => g.leftX + (pathEndX - g.leftX) * f
  // 三條水平虛線：起點50 / 缺口70 / 目標90
  const hline = (p: number, color: string) => {
    ctx.strokeStyle = color
    ctx.setLineDash([5, 4])
    ctx.lineWidth = 1.2
    ctx.beginPath()
    ctx.moveTo(g.leftX, g.py(p))
    ctx.lineTo(g.rightX, g.py(p))
    ctx.stroke()
    ctx.setLineDash([])
  }
  hline(50, '#94a3b8'); hline(70, '#7c3aed'); hline(90, '#ef4444')
  // 價格路徑：50 → 68 — 缺口 — 72 → 86，虛線延伸到 90
  ctx.strokeStyle = '#2563eb'
  ctx.lineWidth = 2.2
  ctx.beginPath()
  ctx.moveTo(px(0), g.py(50))
  ctx.lineTo(px(0.18), g.py(56))
  ctx.lineTo(px(0.3), g.py(53))
  ctx.lineTo(px(0.52), g.py(68))
  ctx.stroke()
  ctx.beginPath()
  ctx.moveTo(px(0.56), g.py(72))
  ctx.lineTo(px(0.72), g.py(79))
  ctx.lineTo(px(0.82), g.py(76))
  ctx.lineTo(px(1), g.py(86))
  ctx.stroke()
  ctx.setLineDash([4, 4])
  ctx.beginPath()
  ctx.moveTo(px(1), g.py(86))
  ctx.lineTo(px(1) + 24, g.py(90))
  ctx.stroke()
  ctx.setLineDash([])
  // 缺口小圈
  ctx.strokeStyle = '#7c3aed'
  ctx.lineWidth = 1.6
  ctx.beginPath()
  ctx.arc(px(0.54), g.py(70), 8, 0, Math.PI * 2)
  ctx.stroke()
  // 右側等距標尺（路徑外的保留區）
  const mx = g.rightX - 14
  const arrow = (p1: number, p2: number, color: string, text: string) => {
    ctx.strokeStyle = color
    ctx.lineWidth = 1.6
    ctx.beginPath()
    ctx.moveTo(mx, g.py(p1)); ctx.lineTo(mx, g.py(p2))
    ctx.stroke()
    ctx.beginPath(); ctx.moveTo(mx - 4, g.py(p1) - 6); ctx.lineTo(mx, g.py(p1)); ctx.lineTo(mx + 4, g.py(p1) - 6); ctx.stroke()
    ctx.beginPath(); ctx.moveTo(mx - 4, g.py(p2) + 6); ctx.lineTo(mx, g.py(p2)); ctx.lineTo(mx + 4, g.py(p2) + 6); ctx.stroke()
    lbl(ctx, text, mx - 8, g.py((p1 + p2) / 2), color, 10, true, 'right')
  }
  arrow(50, 70, '#7c3aed', '20元')
  arrow(70, 90, '#ef4444', '再20元')
  // 水平線標籤放最左側線上方（路徑由左下開始，左上空白）
  lbl(ctx, '目標 90', g.leftX, g.py(90) - 9, '#ef4444', 10, true)
  lbl(ctx, '缺口 70', g.leftX, g.py(70) - 9, '#7c3aed', 10, true)
  lbl(ctx, '起點 50', g.leftX, g.py(50) - 9, '#94a3b8', 10, true)
  header(ctx, g, '逃逸缺口等距估目標：起點→缺口 ＝ 缺口→目標', '50→70 漲20元，目標估 70+20＝90')
  axis(ctx, g)
}

// ── 進02：旗形延續型態（含量能子圖）──
function drawFlagPattern(ctx: CanvasRenderingContext2D, W: number, H: number) {
  const bars: Bar[] = [
    // 旗杆（0–4）急漲
    { o: 60, h: 65, l: 59, c: 64 }, { o: 64, h: 70, l: 63, c: 69 },
    { o: 69, h: 75, l: 68, c: 74 }, { o: 74, h: 79, l: 72, c: 78 }, { o: 78, h: 82, l: 76, c: 80 },
    // 旗面（5–10）量縮小幅下修
    { o: 80, h: 81, l: 77, c: 78 }, { o: 78, h: 80, l: 76, c: 79 }, { o: 79, h: 80, l: 75, c: 76 },
    { o: 76, h: 78, l: 74, c: 77 }, { o: 77, h: 78, l: 74, c: 75 }, { o: 75, h: 77, l: 73, c: 76 },
    // 突破（11–13）放量
    { o: 76, h: 84, l: 75, c: 83 }, { o: 83, h: 88, l: 81, c: 87 }, { o: 87, h: 92, l: 85, c: 91 },
  ]
  const vols = [55, 70, 85, 75, 60, 30, 24, 20, 18, 15, 14, 90, 70, 60]
  const g = makeGeom(W, H, 55, 108, bars.length, 0.66, 0.24) // 價格區壓縮，下方留量能子圖
  drawBars(ctx, g, bars)
  // 目標價虛線（突破76＋旗杆20≈100附近畫示意）
  ctx.strokeStyle = '#ef4444'
  ctx.setLineDash([5, 4])
  ctx.lineWidth = 1.4
  ctx.beginPath()
  ctx.moveTo(g.leftX, g.py(100))
  ctx.lineTo(g.rightX, g.py(100))
  ctx.stroke()
  ctx.setLineDash([])
  lbl(ctx, '目標＝突破點＋旗杆長度', g.rightX, g.py(100) - 9, '#ef4444', 10, true, 'right')
  // 量能子圖
  const vTop = H * 0.70, vBot = H * 0.87
  vols.forEach((v, i) => {
    const x = g.bx(i)
    const h2 = (v / 100) * (vBot - vTop)
    ctx.fillStyle = i === 11 ? '#ef4444' : i >= 5 && i <= 10 ? '#cbd5e1' : '#94a3b8'
    ctx.fillRect(x - g.barW / 2, vBot - h2, g.barW, h2)
  })
  // 量能區段標籤放在子圖下方軸線上（淨空）
  lbl(ctx, '量大', (g.bx(0) + g.bx(4)) / 2, vBot + 9, '#64748b', 9.5, true, 'center')
  lbl(ctx, '量縮（健康）', (g.bx(5) + g.bx(10)) / 2, vBot + 9, '#16a34a', 9.5, true, 'center')
  lbl(ctx, '放量突破', (g.bx(11) + g.bx(13)) / 2, vBot + 9, '#ef4444', 9.5, true, 'center')
  header(ctx, g, '旗形：旗杆急漲 → 旗面量縮整理 → 放量突破', '旗面是強勢股的喘息，不是趨勢結束')
}

// ── 進02：旗形 vs 頭肩頂 對比 ──
function drawPatternComparison(ctx: CanvasRenderingContext2D, W: number, H: number) {
  const topY = H * 0.24, priceBot = H * 0.62, volTop = H * 0.66, volBot = H * 0.80
  const mid = W / 2
  const pane = (x0: number, x1: number, pts: number[], vols: number[], volColor: (i: number) => string) => {
    const px = (f: number) => x0 + (x1 - x0) * f
    const py = (v: number) => priceBot - v * (priceBot - topY)
    ctx.strokeStyle = '#2563eb'
    ctx.lineWidth = 2
    ctx.beginPath()
    pts.forEach((v, i) => {
      const x = px(i / (pts.length - 1))
      if (i === 0) ctx.moveTo(x, py(v)); else ctx.lineTo(x, py(v))
    })
    ctx.stroke()
    const n = vols.length
    const bw = (x1 - x0) / (n + 2)
    vols.forEach((v, i) => {
      const x = x0 + (i + 1) * bw
      const h2 = v * (volBot - volTop)
      ctx.fillStyle = volColor(i)
      ctx.fillRect(x - bw * 0.32, volBot - h2, bw * 0.64, h2)
    })
  }
  // 左：旗形（漲→小幅整理→續漲）
  pane(W * 0.07, mid - 14,
    [0.05, 0.3, 0.55, 0.5, 0.45, 0.48, 0.43, 0.7, 0.95],
    [0.7, 0.9, 0.8, 0.3, 0.25, 0.2, 0.95, 0.7],
    i => (i >= 3 && i <= 5 ? '#86efac' : i === 6 ? '#ef4444' : '#94a3b8'))
  // 右：頭肩頂（左肩→頭→右肩一波比一波低）
  pane(mid + 14, W * 0.93,
    [0.1, 0.6, 0.35, 0.85, 0.4, 0.55, 0.3, 0.05],
    [0.9, 0.75, 0.6, 0.8, 0.5, 0.35, 0.85],
    i => (i >= 4 && i <= 5 ? '#fca5a5' : i === 6 ? '#16a34a' : '#94a3b8'))
  // 中線
  ctx.strokeStyle = '#e5e7eb'
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(mid, topY - 6)
  ctx.lineTo(mid, volBot + 4)
  ctx.stroke()
  // 標籤全部放底部淨空帶
  lbl(ctx, '旗形＝延續', (W * 0.07 + mid) / 2, volBot + 13, '#16a34a', 10.5, true, 'center')
  lbl(ctx, '整理量縮 ✓ 突破放量 ✓', (W * 0.07 + mid) / 2, volBot + 27, '#16a34a', 9.5, false, 'center')
  lbl(ctx, '頭肩頂＝反轉', (mid + W * 0.93) / 2, volBot + 13, '#ef4444', 10.5, true, 'center')
  lbl(ctx, '右肩量縮 ✗ 高點下移 ✗', (mid + W * 0.93) / 2, volBot + 27, '#ef4444', 9.5, false, 'center')
  lbl(ctx, '旗形（延續） vs 頭肩頂（反轉）：看量能分高下', W * 0.08, H * 0.06, '#1e1b4b', 11.5, true)
  lbl(ctx, '同樣是「漲完震盪」，量縮是休息，量亂是出貨', W * 0.08, H * 0.06 + 16, '#7c3aed', 10)
}

function poly(ctx: CanvasRenderingContext2D, pts: Array<[number, number]>, color: string, width = 2, dash?: number[]) {
  ctx.save()
  ctx.strokeStyle = color
  ctx.lineWidth = width
  if (dash) ctx.setLineDash(dash)
  ctx.beginPath()
  pts.forEach(([x, y], i) => { if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y) })
  ctx.stroke()
  ctx.restore()
}

const MA_COLORS = { ma5: '#ef4444', ma20: '#f59e0b', ma60: '#2563eb' }

// ── 進03：多頭排列 vs 空頭排列 ──
function drawMaAlignment(ctx: CanvasRenderingContext2D, W: number, H: number) {
  const topY = H * 0.26, botY = H * 0.78, mid = W / 2
  const lane = (x0: number, x1: number, up: boolean) => {
    const px = (f: number) => x0 + (x1 - x0) * f
    const py = (v: number) => botY - v * (botY - topY) // v: 0..1
    const base = up ? [0.15, 0.3, 0.45, 0.6, 0.75] : [0.85, 0.7, 0.55, 0.4, 0.25]
    const mk = (offset: number, color: string) =>
      poly(ctx, base.map((v, i) => [px(i / 4), py(Math.min(0.98, Math.max(0.02, v + offset)))] as [number, number]), color, 2.2)
    if (up) { mk(0.14, MA_COLORS.ma5); mk(0, MA_COLORS.ma20); mk(-0.14, MA_COLORS.ma60) }
    else { mk(-0.14, MA_COLORS.ma5); mk(0, MA_COLORS.ma20); mk(0.14, MA_COLORS.ma60) }
  }
  lane(W * 0.08, mid - 16, true)
  lane(mid + 16, W * 0.92, false)
  ctx.strokeStyle = '#e5e7eb'; ctx.lineWidth = 1
  ctx.beginPath(); ctx.moveTo(mid, topY - 6); ctx.lineTo(mid, botY + 4); ctx.stroke()
  lbl(ctx, '多頭排列：5 > 20 > 60', (W * 0.08 + mid) / 2, botY + 16, '#ef4444', 10.5, true, 'center')
  lbl(ctx, '短線騎在長線上面', (W * 0.08 + mid) / 2, botY + 30, '#64748b', 9.5, false, 'center')
  lbl(ctx, '空頭排列：5 < 20 < 60', (mid + W * 0.92) / 2, botY + 16, '#16a34a', 10.5, true, 'center')
  lbl(ctx, '短線壓在長線下面', (mid + W * 0.92) / 2, botY + 30, '#64748b', 9.5, false, 'center')
  lbl(ctx, '均線排列：誰在上面，誰說話', W * 0.08, H * 0.06, '#1e1b4b', 11.5, true)
  const ly = H * 0.06 + 16
  lbl(ctx, '━ 5日', W * 0.08, ly, MA_COLORS.ma5, 10, true)
  lbl(ctx, '━ 20日', W * 0.08 + 52, ly, MA_COLORS.ma20, 10, true)
  lbl(ctx, '━ 60日', W * 0.08 + 112, ly, MA_COLORS.ma60, 10, true)
}

// ── 進03：黃金交叉 / 死亡交叉 ──
function drawMaCrossover(ctx: CanvasRenderingContext2D, W: number, H: number) {
  const g = makeGeom(W, H, 0, 100, 10, 0.85, 0.24)
  const px = (f: number) => g.leftX + (g.rightX - g.leftX) * f
  // 20日（橘）：先降後升再降；60日（藍）：平緩
  const ma60: Array<[number, number]> = [[px(0), g.py(52)], [px(0.25), g.py(50)], [px(0.5), g.py(52)], [px(0.75), g.py(56)], [px(1), g.py(54)]]
  const ma20: Array<[number, number]> = [[px(0), g.py(38)], [px(0.18), g.py(42)], [px(0.3), g.py(52)], [px(0.5), g.py(72)], [px(0.68), g.py(74)], [px(0.82), g.py(58)], [px(1), g.py(42)]]
  poly(ctx, ma60, MA_COLORS.ma60, 2.2)
  poly(ctx, ma20, MA_COLORS.ma20, 2.2)
  // 交叉點：黃金 ≈ px(0.3)、死亡 ≈ px(0.84)
  const gx = px(0.3), gy = g.py(52), dx = px(0.84), dy = g.py(57)
  ctx.strokeStyle = '#f59e0b'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(gx, gy, 10, 0, Math.PI * 2); ctx.stroke()
  ctx.strokeStyle = '#64748b'; ctx.beginPath(); ctx.arc(dx, dy, 10, 0, Math.PI * 2); ctx.stroke()
  // 黃金交叉下方空白、死亡交叉上方空白
  lbl(ctx, '↑ 黃金交叉', gx, gy + 26, '#f59e0b', 10.5, true, 'center')
  lbl(ctx, '短均線上穿長均線', gx, gy + 40, '#94a3b8', 9.5, false, 'center')
  lbl(ctx, '↓ 死亡交叉', dx, dy - 38, '#64748b', 10.5, true, 'center')
  lbl(ctx, '短均線下穿長均線', dx, dy - 24, '#94a3b8', 9.5, false, 'center')
  header(ctx, g, '交叉＝排列形成的瞬間', '⚠️ 配合量能確認：放量交叉才可信，縮量可疑')
  axis(ctx, g)
}

// ── 進03：葛蘭碧四大時機 ──
function drawMaGranville(ctx: CanvasRenderingContext2D, W: number, H: number) {
  const g = makeGeom(W, H, 0, 100, 10, 0.85, 0.24)
  const px = (f: number) => g.leftX + (g.rightX - g.leftX) * f
  // 20日均線：山丘型
  const ma: Array<[number, number]> = []
  for (let f = 0; f <= 1.001; f += 0.05) {
    ma.push([px(f), g.py(35 + 38 * Math.sin(Math.PI * Math.min(1, f)))])
  }
  poly(ctx, ma, MA_COLORS.ma20, 2.4)
  // 股價（藍細線）繞著均線：①上穿 ②回測彈起 ③跌破 ④反彈遇壓
  const price: Array<[number, number]> = [
    [px(0), g.py(26)], [px(0.1), g.py(33)], [px(0.16), g.py(45)], // ① 上穿
    [px(0.26), g.py(62)], [px(0.34), g.py(58)], [px(0.38), g.py(66)], // ② 回測彈起
    [px(0.48), g.py(80)], [px(0.56), g.py(76)], [px(0.62), g.py(64)], // ③ 跌破
    [px(0.7), g.py(54)], [px(0.78), g.py(62)], [px(0.84), g.py(52)], // ④ 反彈遇壓
    [px(0.94), g.py(38)], [px(1), g.py(30)],
  ]
  poly(ctx, price, '#475569', 1.8)
  const mark = (f: number, p: number, t: string, buy: boolean, above: boolean) => {
    const x = px(f), y = g.py(p)
    const color = buy ? '#ef4444' : '#16a34a'
    ctx.strokeStyle = color; ctx.lineWidth = 1.8
    ctx.beginPath(); ctx.arc(x, y, 9, 0, Math.PI * 2); ctx.stroke()
    lbl(ctx, t, x, y + (above ? -18 : 20), color, 10.5, true, 'center')
  }
  mark(0.13, 38, '①買', true, false)
  mark(0.34, 58, '②買', true, false)
  mark(0.6, 67, '③賣', false, true)
  mark(0.78, 62, '④賣', false, true)
  header(ctx, g, '葛蘭碧精華四式：①②買　③④賣', '核心：均線是趨勢，股價偏離會回歸')
  footer(ctx, g, '━ 20日均線　─ 股價')
  axis(ctx, g)
}

// ── 進03：均線糾結與發散 ──
function drawMaSqueeze(ctx: CanvasRenderingContext2D, W: number, H: number) {
  const g = makeGeom(W, H, 0, 100, 10, 0.85, 0.24)
  const px = (f: number) => g.leftX + (g.rightX - g.leftX) * f
  const SPLIT = 0.58
  const tangle = (phase: number, color: string, endOff: number) => {
    const pts: Array<[number, number]> = []
    for (let f = 0; f <= SPLIT; f += 0.04) {
      pts.push([px(f), g.py(46 + Math.sin(f * 18 + phase) * 4)])
    }
    for (let f = SPLIT + 0.04; f <= 1.001; f += 0.04) {
      const t = (f - SPLIT) / (1 - SPLIT)
      pts.push([px(f), g.py(46 + t * endOff + Math.sin(f * 6 + phase) * 1)])
    }
    poly(ctx, pts, color, 2.2)
  }
  tangle(0, MA_COLORS.ma5, 34)
  tangle(2, MA_COLORS.ma20, 20)
  tangle(4, MA_COLORS.ma60, 8)
  // 糾結區虛線框
  ctx.strokeStyle = '#94a3b8'; ctx.setLineDash([5, 4]); ctx.lineWidth = 1.2
  ctx.strokeRect(px(0.02), g.py(56), px(SPLIT) - px(0.02), g.py(36) - g.py(56))
  ctx.setLineDash([])
  // 標籤：糾結區下方空白、發散區下方空白
  lbl(ctx, '糾結期＝觀望', px(0.28), g.py(24), '#64748b', 10.5, true, 'center')
  lbl(ctx, '交叉頻繁，進場易被洗', px(0.28), g.py(15), '#94a3b8', 9.5, false, 'center')
  lbl(ctx, '發散＝趨勢確立', px(0.82), g.py(24), '#ef4444', 10.5, true, 'center')
  lbl(ctx, '間距擴大才出手', px(0.82), g.py(15), '#94a3b8', 9.5, false, 'center')
  header(ctx, g, '均線糾結不進場，發散才出手')
  const ly2 = H * 0.06 + 16
  lbl(ctx, '━ 5日', W * 0.08, ly2, MA_COLORS.ma5, 10, true)
  lbl(ctx, '━ 20日', W * 0.08 + 52, ly2, MA_COLORS.ma20, 10, true)
  lbl(ctx, '━ 60日', W * 0.08 + 112, ly2, MA_COLORS.ma60, 10, true)
  axis(ctx, g)
}

// ── 進03：均線排列＋量能辨真假 ──
function drawMaVolume(ctx: CanvasRenderingContext2D, W: number, H: number) {
  const bars: Bar[] = [
    { o: 60, h: 64, l: 58, c: 63 }, { o: 63, h: 68, l: 62, c: 67 },
    { o: 67, h: 72, l: 65, c: 71 }, { o: 71, h: 76, l: 70, c: 75 },
    { o: 75, h: 80, l: 73, c: 79 }, { o: 79, h: 83, l: 77, c: 82 },
    { o: 82, h: 85, l: 80, c: 83 }, { o: 83, h: 86, l: 81, c: 84 },
    { o: 84, h: 86, l: 82, c: 85 }, { o: 85, h: 87, l: 83, c: 84 },
    { o: 84, h: 86, l: 82, c: 85 }, { o: 85, h: 87, l: 84, c: 86 },
  ]
  const vols = [55, 65, 78, 85, 90, 80, 45, 38, 30, 26, 22, 18]
  const g = makeGeom(W, H, 50, 95, bars.length, 0.62, 0.24)
  drawBars(ctx, g, bars)
  // 20日均線（在K棒下方）
  const maPts: Array<[number, number]> = bars.map((b, i) => [g.bx(i), g.py(b.c - 6)] as [number, number])
  poly(ctx, maPts, MA_COLORS.ma20, 2)
  // 量能子圖
  const vTop = H * 0.66, vBot = H * 0.84
  vols.forEach((v, i) => {
    const x = g.bx(i)
    const h2 = (v / 100) * (vBot - vTop)
    ctx.fillStyle = i <= 5 ? '#ef4444' : '#cbd5e1'
    ctx.fillRect(x - g.barW / 2, vBot - h2, g.barW, h2)
  })
  lbl(ctx, '放量多頭 ✓ 可跟', (g.bx(0) + g.bx(5)) / 2, vBot + 11, '#ef4444', 9.5, true, 'center')
  lbl(ctx, '量縮虛漲 ⚠ 小心頭部', (g.bx(6) + g.bx(11)) / 2, vBot + 11, '#64748b', 9.5, true, 'center')
  header(ctx, g, '排列看方向，量能辨真假', '同樣是多頭排列，量縮的後半段要提高警覺')
}

// ── registry ──
const REGISTRY: Record<string, (ctx: CanvasRenderingContext2D, W: number, H: number) => void> = {
  'gap-intro': drawGapIntro,
  'gap-four-types': drawGapFourTypes,
  'gap-measured-target': drawGapMeasuredTarget,
  'flag-pattern': drawFlagPattern,
  'pattern-comparison': drawPatternComparison,
  'ma-alignment': drawMaAlignment,
  'ma-crossover': drawMaCrossover,
  'ma-granville': drawMaGranville,
  'ma-squeeze': drawMaSqueeze,
  'ma-volume': drawMaVolume,
}

// 圖殼總覽測試頁用（/classroom/stock/charts-test）
export const ADVANCED_CHART_TYPES = Object.keys(REGISTRY)

export default function AdvancedChart({ type }: { type: string }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const draw = REGISTRY[type]
    if (!draw) return

    const dpr = window.devicePixelRatio || 1
    const W = canvas.offsetWidth
    const H = canvas.offsetHeight
    canvas.width = W * dpr
    canvas.height = H * dpr
    ctx.scale(dpr, dpr)

    const id = requestAnimationFrame(() => {
      ctx.clearRect(0, 0, W, H)
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, W, H)
      draw(ctx, W, H)
    })
    return () => cancelAnimationFrame(id)
  }, [type])

  if (!REGISTRY[type]) return null

  return (
    <div style={{ background: '#ffffff', borderRadius: 10, padding: '8px 0', width: '100%' }}>
      <canvas ref={ref} style={{ width: '100%', height: '280px', display: 'block' }} />
    </div>
  )
}
