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

function boxRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, fill: string, stroke: string) {
  ctx.save()
  ctx.fillStyle = fill
  ctx.fillRect(x, y, w, h)
  ctx.strokeStyle = stroke
  ctx.lineWidth = 1.2
  ctx.setLineDash([])
  ctx.strokeRect(x, y, w, h)
  ctx.restore()
}

// ══ 進04 MACD ══

// MACD 三元素＋紅柱擴散
function drawMacdHistogram(ctx: CanvasRenderingContext2D, W: number, H: number) {
  const dif = [-6, -4, -1, 2, 5, 7, 8, 7, 5, 3, 1, -1, -2, -1, 1, 4, 7, 10, 12, 13]
  const mac = [-4, -4, -3, -1, 1, 3, 5, 6, 6, 5, 4, 3, 2, 1, 1, 2, 4, 6, 8, 10]
  const n = dif.length
  const leftX = W * 0.08, rightX = W * 0.92
  const bx = (i: number) => leftX + (i + 0.5) * ((rightX - leftX) / n)
  // 上：股價
  const pTop = H * 0.2, pBot = H * 0.42
  const price = [50, 52, 55, 58, 62, 66, 69, 71, 70, 68, 66, 64, 63, 64, 66, 70, 75, 80, 86, 90]
  poly(ctx, price.map((p, i) => [bx(i), pBot - ((p - 48) / 44) * (pBot - pTop)] as [number, number]), '#475569', 1.8)
  // 下：MACD 面板
  const mTop = H * 0.48, mBot = H * 0.84, zero = (mTop + mBot) / 2
  const my = (v: number) => zero - (v / 14) * (mBot - mTop) / 2
  poly(ctx, [[leftX, zero], [rightX, zero]], '#cbd5e1', 1)
  dif.forEach((d, i) => {
    const h2 = my(d - mac[i]) - zero
    ctx.fillStyle = d - mac[i] >= 0 ? '#fca5a5' : '#86efac'
    ctx.fillRect(bx(i) - 3, Math.min(zero, zero + h2), 6, Math.abs(h2))
  })
  poly(ctx, dif.map((v, i) => [bx(i), my(v)] as [number, number]), '#f59e0b', 1.8)
  poly(ctx, mac.map((v, i) => [bx(i), my(v)] as [number, number]), '#2563eb', 1.8)
  const circ = (i: number, color: string) => { ctx.strokeStyle = color; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.arc(bx(i), my(dif[i]), 8, 0, Math.PI * 2); ctx.stroke() }
  circ(1, '#f59e0b'); circ(8, '#64748b'); circ(14, '#f59e0b')
  lbl(ctx, '金叉', bx(1), mBot + 11, '#f59e0b', 9.5, true, 'center')
  lbl(ctx, '死叉', bx(8), mBot + 11, '#64748b', 9.5, true, 'center')
  lbl(ctx, '金叉＋紅柱擴散', bx(16), mBot + 11, '#ef4444', 9.5, true, 'center')
  lbl(ctx, 'MACD 三元素：DIF（橘）/ MACD線（藍）/ 柱狀圖', leftX, H * 0.06, '#1e1b4b', 11.5, true)
  lbl(ctx, '柱＝DIF−MACD線的距離，紅柱在零軸上、綠柱在零軸下', leftX, H * 0.06 + 16, '#7c3aed', 9.5)
  lbl(ctx, '─ 股價', rightX, pTop - 8, '#94a3b8', 9, false, 'right')
}

// 紅柱收斂：價漲柱縮
function drawMacdConvergence(ctx: CanvasRenderingContext2D, W: number, H: number) {
  const n = 13
  const leftX = W * 0.08, rightX = W * 0.92
  const bx = (i: number) => leftX + (i + 0.5) * ((rightX - leftX) / n)
  const pTop = H * 0.22, pBot = H * 0.46
  const price = [60, 63, 66, 69, 72, 74, 76, 78, 79, 80, 81, 82, 82.5]
  poly(ctx, price.map((p, i) => [bx(i), pBot - ((p - 58) / 26) * (pBot - pTop)] as [number, number]), '#ef4444', 2)
  lbl(ctx, '股價還在漲 ↗', rightX, pTop - 8, '#ef4444', 10, true, 'right')
  const mTop = H * 0.52, mBot = H * 0.8, zero = mBot
  const hist = [8, 9, 10, 9.5, 8.5, 7.5, 6.5, 5.5, 4.5, 3.5, 2.8, 2, 1.4]
  hist.forEach((v, i) => {
    const h2 = (v / 10) * (mBot - mTop)
    ctx.fillStyle = '#fca5a5'
    ctx.fillRect(bx(i) - 4, zero - h2, 8, h2)
  })
  poly(ctx, [[leftX, zero], [rightX, zero]], '#cbd5e1', 1)
  lbl(ctx, '紅柱越來越短 ＝ 上漲動能在衰退（預警）', (leftX + rightX) / 2, mBot + 14, '#b45309', 10, true, 'center')
  lbl(ctx, '柱狀圖收斂：價格與動能說不同的話', leftX, H * 0.06, '#1e1b4b', 11.5, true)
  lbl(ctx, '不是馬上跌，是「準備轉了」的早期訊號', leftX, H * 0.06 + 16, '#7c3aed', 9.5)
}

// 頂背離 / 底背離
function drawMacdDivergence(ctx: CanvasRenderingContext2D, W: number, H: number) {
  const mid = W / 2
  const panel = (x0: number, x1: number, pricePts: number[], difPts: number[], dash1: [number, number, number, number], dash2: [number, number, number, number], color: string) => {
    const pTop = H * 0.22, pBot = H * 0.48, dTop = H * 0.54, dBot = H * 0.78
    const px = (f: number) => x0 + (x1 - x0) * f
    const ppy = (v: number) => pBot - v * (pBot - pTop)
    const dpy = (v: number) => dBot - v * (dBot - dTop)
    poly(ctx, pricePts.map((v, i) => [px(i / (pricePts.length - 1)), ppy(v)] as [number, number]), '#475569', 1.8)
    poly(ctx, difPts.map((v, i) => [px(i / (difPts.length - 1)), dpy(v)] as [number, number]), '#f59e0b', 1.8)
    poly(ctx, [[px(dash1[0]), ppy(dash1[1])], [px(dash1[2]), ppy(dash1[3])]], color, 1.4, [4, 3])
    poly(ctx, [[px(dash2[0]), dpy(dash2[1])], [px(dash2[2]), dpy(dash2[3])]], color, 1.4, [4, 3])
  }
  // 左：頂背離（價高點墊高，DIF高點降低）
  panel(W * 0.07, mid - 14, [0.2, 0.7, 0.45, 0.9, 0.5], [0.3, 0.8, 0.5, 0.6, 0.3], [0.25, 0.7, 0.75, 0.9], [0.25, 0.8, 0.75, 0.6], '#ef4444')
  // 右：底背離（價低點更低，DIF低點墊高）
  panel(mid + 14, W * 0.93, [0.8, 0.3, 0.55, 0.1, 0.5], [0.7, 0.2, 0.5, 0.4, 0.7], [0.25, 0.3, 0.75, 0.1], [0.25, 0.2, 0.75, 0.4], '#16a34a')
  ctx.strokeStyle = '#e5e7eb'; ctx.lineWidth = 1
  ctx.beginPath(); ctx.moveTo(mid, H * 0.2); ctx.lineTo(mid, H * 0.8); ctx.stroke()
  lbl(ctx, '頂背離：價新高、DIF更低', (W * 0.07 + mid) / 2, H * 0.84, '#ef4444', 10, true, 'center')
  lbl(ctx, '底背離：價新低、DIF更高', (mid + W * 0.93) / 2, H * 0.84, '#16a34a', 10, true, 'center')
  lbl(ctx, 'MACD 背離：最強的反轉預警', W * 0.08, H * 0.06, '#1e1b4b', 11.5, true)
  lbl(ctx, '上排＝股價　下排＝DIF。背離是預警，要等確認訊號', W * 0.08, H * 0.06 + 16, '#7c3aed', 9.5)
}

// 零軸多空分水嶺
function drawMacdZeroline(ctx: CanvasRenderingContext2D, W: number, H: number) {
  const leftX = W * 0.08, rightX = W * 0.92
  const top = H * 0.24, bot = H * 0.8, zero = (top + bot) / 2
  ctx.fillStyle = 'rgba(239,68,68,0.06)'; ctx.fillRect(leftX, top, rightX - leftX, zero - top)
  ctx.fillStyle = 'rgba(22,163,74,0.06)'; ctx.fillRect(leftX, zero, rightX - leftX, bot - zero)
  poly(ctx, [[leftX, zero], [rightX, zero]], '#64748b', 1.4)
  const px = (f: number) => leftX + (rightX - leftX) * f
  const vy = (v: number) => zero - v * (zero - top) // v: -1..1
  // DIF（橘）與 MACD（藍）：零下金叉 → 上穿零 → 零上金叉
  poly(ctx, [[px(0), vy(-0.7)], [px(0.12), vy(-0.55)], [px(0.24), vy(-0.35)], [px(0.36), vy(-0.1)], [px(0.5), vy(0.2)], [px(0.62), vy(0.35)], [px(0.7), vy(0.28)], [px(0.8), vy(0.45)], [px(1), vy(0.75)]], '#f59e0b', 2)
  poly(ctx, [[px(0), vy(-0.5)], [px(0.16), vy(-0.48)], [px(0.3), vy(-0.4)], [px(0.45), vy(-0.15)], [px(0.6), vy(0.15)], [px(0.72), vy(0.3)], [px(0.84), vy(0.35)], [px(1), vy(0.55)]], '#2563eb', 2)
  const circ = (f: number, v: number, color: string) => { ctx.strokeStyle = color; ctx.lineWidth = 1.8; ctx.beginPath(); ctx.arc(px(f), vy(v), 9, 0, Math.PI * 2); ctx.stroke() }
  circ(0.13, -0.53, '#b45309')
  circ(0.79, 0.41, '#ef4444')
  lbl(ctx, '零軸下金叉＝反彈，謹慎', px(0.13), bot + 13, '#b45309', 9.5, true, 'center')
  lbl(ctx, '零軸上金叉＝順勢，可信', px(0.79), bot + 13, '#ef4444', 9.5, true, 'center')
  lbl(ctx, '多方區（均線多頭）', rightX - 4, top + 10, '#ef4444', 9.5, true, 'right')
  lbl(ctx, '空方區（均線空頭）', leftX + 4, bot - 10, '#16a34a', 9.5, true)
  lbl(ctx, '零軸＝多空分水嶺：金叉在哪裡出現，比金叉本身重要', leftX, H * 0.06, '#1e1b4b', 11, true)
  lbl(ctx, '─ DIF（橘）　─ MACD線（藍）', leftX, H * 0.06 + 16, '#7c3aed', 9.5)
}

// ══ 進05 布林通道 ══

function bollingerBands(ctx: CanvasRenderingContext2D, leftX: number, rightX: number, midFn: (f: number) => number, widthFn: (f: number) => number, py: (p: number) => number) {
  const up: Array<[number, number]> = [], mi: Array<[number, number]> = [], lo: Array<[number, number]> = []
  for (let f = 0; f <= 1.001; f += 0.04) {
    const x = leftX + (rightX - leftX) * f
    up.push([x, py(midFn(f) + widthFn(f))])
    mi.push([x, py(midFn(f))])
    lo.push([x, py(midFn(f) - widthFn(f))])
  }
  poly(ctx, up, '#ef4444', 1.8)
  poly(ctx, mi, '#f59e0b', 1.8, [5, 3])
  poly(ctx, lo, '#16a34a', 1.8)
}

function bollLegend(ctx: CanvasRenderingContext2D, W: number, H: number) {
  const ly = H * 0.06 + 16
  lbl(ctx, '━ 上軌+2σ', W * 0.08, ly, '#ef4444', 9.5, true)
  lbl(ctx, '┅ 中軌MA20', W * 0.08 + 70, ly, '#f59e0b', 9.5, true)
  lbl(ctx, '━ 下軌-2σ', W * 0.08 + 152, ly, '#16a34a', 9.5, true)
}

// 三軌結構
function drawBollingerStructure(ctx: CanvasRenderingContext2D, W: number, H: number) {
  const leftX = W * 0.08, rightX = W * 0.92
  const top = H * 0.26, bot = H * 0.84
  const py = (p: number) => bot - ((p - 40) / 50) * (bot - top)
  bollingerBands(ctx, leftX, rightX, f => 62 + f * 6 + Math.sin(f * 6) * 2, () => 11, py)
  // 股價在通道內震盪
  const pts: Array<[number, number]> = []
  for (let f = 0; f <= 1.001; f += 0.05) {
    const x = leftX + (rightX - leftX) * f
    pts.push([x, py(62 + f * 6 + Math.sin(f * 6) * 2 + Math.sin(f * 14) * 7)])
  }
  poly(ctx, pts, '#475569', 1.6)
  lbl(ctx, '股價約95%時間在上下軌之間震盪', (leftX + rightX) / 2, bot + 13, '#64748b', 9.5, false, 'center')
  lbl(ctx, '布林通道＝趨勢（中軌）＋波動（上下軌間距）', leftX, H * 0.06, '#1e1b4b', 11, true)
  bollLegend(ctx, W, H)
}

// 縮口
function drawBollingerSqueeze(ctx: CanvasRenderingContext2D, W: number, H: number) {
  const leftX = W * 0.08, rightX = W * 0.92
  const top = H * 0.26, bot = H * 0.62
  const py = (p: number) => bot - ((p - 40) / 55) * (bot - top)
  const widthFn = (f: number) => f < 0.3 ? 12 - f * 20 : f < 0.62 ? 5 : 5 + (f - 0.62) * 26
  const midFn = (f: number) => f < 0.62 ? 60 : 60 + (f - 0.62) * 28
  bollingerBands(ctx, leftX, rightX, midFn, widthFn, py)
  // 縮口虛線框
  const sx0 = leftX + (rightX - leftX) * 0.3, sx1 = leftX + (rightX - leftX) * 0.62
  ctx.strokeStyle = '#94a3b8'; ctx.setLineDash([5, 4]); ctx.lineWidth = 1.1
  ctx.strokeRect(sx0, py(68), sx1 - sx0, py(52) - py(68))
  ctx.setLineDash([])
  // 量能子圖
  const vTop = H * 0.68, vBot = H * 0.82
  const n = 16
  for (let i = 0; i < n; i++) {
    const f = i / (n - 1)
    const v = f < 0.3 ? 0.7 : f < 0.62 ? 0.22 : 0.9
    const x = leftX + (rightX - leftX) * f
    ctx.fillStyle = f >= 0.62 ? '#ef4444' : '#cbd5e1'
    ctx.fillRect(x - 4, vBot - v * (vBot - vTop), 8, v * (vBot - vTop))
  }
  lbl(ctx, '開口', leftX + (rightX - leftX) * 0.13, vBot + 12, '#64748b', 9.5, true, 'center')
  lbl(ctx, '縮口＝量縮蓄能', (sx0 + sx1) / 2, vBot + 12, '#7c3aed', 9.5, true, 'center')
  lbl(ctx, '再開口＝放量爆發', leftX + (rightX - leftX) * 0.84, vBot + 12, '#ef4444', 9.5, true, 'center')
  lbl(ctx, '縮口：能量蓄積，等方向（縮越久爆發越強）', leftX, H * 0.06, '#1e1b4b', 11, true)
  bollLegend(ctx, W, H)
}

// 開口沿上軌
function drawBollingerExpansion(ctx: CanvasRenderingContext2D, W: number, H: number) {
  const leftX = W * 0.08, rightX = W * 0.92
  const top = H * 0.26, bot = H * 0.8
  const py = (p: number) => bot - ((p - 40) / 60) * (bot - top)
  const midFn = (f: number) => 55 + f * 26
  const widthFn = (f: number) => 6 + f * 9
  bollingerBands(ctx, leftX, rightX, midFn, widthFn, py)
  // 股價貼上軌
  const pts: Array<[number, number]> = []
  for (let f = 0; f <= 1.001; f += 0.05) {
    const x = leftX + (rightX - leftX) * f
    pts.push([x, py(midFn(f) + widthFn(f) - 2.2 + Math.sin(f * 12) * 1.4)])
  }
  poly(ctx, pts, '#475569', 1.8)
  lbl(ctx, '沿上軌走＝強勢特徵，不要急著賣', (leftX + rightX) / 2, bot + 13, '#ef4444', 10, true, 'center')
  lbl(ctx, '開口：趨勢確立，上軌是軌道邊界不是壓力', leftX, H * 0.06, '#1e1b4b', 11, true)
  bollLegend(ctx, W, H)
}

// 布林＋MA20確認
function drawBollingerMaConfirm(ctx: CanvasRenderingContext2D, W: number, H: number) {
  const leftX = W * 0.08, rightX = W * 0.92
  const top = H * 0.26, bot = H * 0.62
  const py = (p: number) => bot - ((p - 42) / 52) * (bot - top)
  const midFn = (f: number) => f < 0.5 ? 58 - f * 2 : 57 + (f - 0.5) * 30
  const widthFn = (f: number) => f < 0.5 ? 9 - f * 10 : 4 + (f - 0.5) * 22
  bollingerBands(ctx, leftX, rightX, midFn, widthFn, py)
  const pts: Array<[number, number]> = []
  for (let f = 0; f <= 1.001; f += 0.05) {
    const x = leftX + (rightX - leftX) * f
    const base = midFn(f) + (f < 0.5 ? Math.sin(f * 16) * 3 : widthFn(f) - 3)
    pts.push([x, py(base)])
  }
  poly(ctx, pts, '#475569', 1.6)
  const vTop = H * 0.68, vBot = H * 0.8
  for (let i = 0; i < 14; i++) {
    const f = i / 13
    const v = f < 0.5 ? 0.25 : 0.85
    const x = leftX + (rightX - leftX) * f
    ctx.fillStyle = f >= 0.5 ? '#ef4444' : '#cbd5e1'
    ctx.fillRect(x - 4, vBot - v * (vBot - vTop), 8, v * (vBot - vTop))
  }
  lbl(ctx, '✓ MA20轉上　✓ 縮口結束　✓ 放量突破', (leftX + rightX) / 2, vBot + 13, '#ef4444', 10, true, 'center')
  lbl(ctx, '布林＋均線雙重確認：三個條件齊到才進場', leftX, H * 0.06, '#1e1b4b', 11, true)
  bollLegend(ctx, W, H)
}

// ══ 進06 量價 ══

// 量價四象限
function drawVolumePriceMatrix(ctx: CanvasRenderingContext2D, W: number, H: number) {
  const x0 = W * 0.08, x1 = W * 0.92
  const y0 = H * 0.2, y1 = H * 0.88
  const cw = (x1 - x0) / 2 - 6, ch = (y1 - y0) / 2 - 6
  const cell = (cx: number, cy: number, fill: string, stroke: string, t1: string, t2: string, t3: string, color: string) => {
    boxRect(ctx, cx, cy, cw, ch, fill, stroke)
    lbl(ctx, t1, cx + cw / 2, cy + ch * 0.26, color, 12, true, 'center')
    lbl(ctx, t2, cx + cw / 2, cy + ch * 0.52, color, 10.5, true, 'center')
    lbl(ctx, t3, cx + cw / 2, cy + ch * 0.76, '#64748b', 9, false, 'center')
  }
  cell(x0, y0, '#fef2f2', '#fecaca', '✅ 價漲量增', '最健康', '買盤積極，可跟進', '#ef4444')
  cell(x0 + cw + 12, y0, '#fffbeb', '#fde68a', '⚠️ 價漲量縮', '漲勢有疑慮', '追漲意願下降，留意頭部', '#b45309')
  cell(x0, y0 + ch + 12, '#fffbeb', '#fde68a', '⚠️ 價跌量縮', '賣壓減輕', '可能築底，觀察止跌', '#b45309')
  cell(x0 + cw + 12, y0 + ch + 12, '#f0fdf4', '#bbf7d0', '❌ 價跌量增', '最危險', '主力出貨，跌勢恐加速', '#16a34a')
  lbl(ctx, '量價四象限：價的方向 × 量的大小', W * 0.08, H * 0.07, '#1e1b4b', 11.5, true)
}

// 天量天價
function drawVolumeClimax(ctx: CanvasRenderingContext2D, W: number, H: number) {
  const bars: Bar[] = [
    { o: 60, h: 64, l: 58, c: 63 }, { o: 63, h: 68, l: 62, c: 67 }, { o: 67, h: 72, l: 65, c: 71 },
    { o: 71, h: 77, l: 70, c: 76 }, { o: 76, h: 82, l: 74, c: 81 }, { o: 81, h: 88, l: 80, c: 87 },
    { o: 87, h: 95, l: 86, c: 92 }, // 天量天價
    { o: 92, h: 94, l: 86, c: 88 }, { o: 88, h: 90, l: 82, c: 84 }, { o: 84, h: 86, l: 78, c: 80 },
  ]
  const vols = [30, 35, 42, 50, 58, 70, 100, 65, 50, 40]
  const g = makeGeom(W, H, 55, 100, bars.length, 0.62, 0.24)
  drawBars(ctx, g, bars)
  const vTop = H * 0.68, vBot = H * 0.84
  vols.forEach((v, i) => {
    ctx.fillStyle = i === 6 ? '#ef4444' : '#cbd5e1'
    ctx.fillRect(g.bx(i) - g.barW / 2, vBot - (v / 100) * (vBot - vTop), g.barW, (v / 100) * (vBot - vTop))
  })
  lbl(ctx, '天量', g.bx(6), vBot + 11, '#ef4444', 10, true, 'center')
  lbl(ctx, '之後量縮價跌＝出貨完成', g.bx(8), vBot + 24, '#64748b', 9, false, 'center')
  lbl(ctx, '天量天價：高檔爆量是頭部警報，不是加碼訊號', W * 0.08, H * 0.06, '#1e1b4b', 11, true)
  lbl(ctx, '巨量＝主力出貨給追高的散戶', W * 0.08, H * 0.06 + 16, '#7c3aed', 9.5)
}

// 爆量反轉（底部）
function drawVolumeReversalBottom(ctx: CanvasRenderingContext2D, W: number, H: number) {
  const bars: Bar[] = [
    { o: 88, h: 90, l: 83, c: 84 }, { o: 84, h: 86, l: 79, c: 80 }, { o: 80, h: 82, l: 75, c: 76 },
    { o: 76, h: 78, l: 70, c: 72 }, { o: 72, h: 73, l: 66, c: 68 },
    { o: 68, h: 70, l: 56, c: 67 }, // 爆量長下影
    { o: 67, h: 72, l: 65, c: 71 }, // 次日紅K
    { o: 71, h: 74, l: 69, c: 72 }, { o: 72, h: 75, l: 70, c: 74 }, { o: 74, h: 77, l: 72, c: 76 },
  ]
  const vols = [40, 45, 50, 55, 60, 100, 70, 40, 32, 28]
  const g = makeGeom(W, H, 50, 95, bars.length, 0.62, 0.24)
  drawBars(ctx, g, bars)
  const vTop = H * 0.68, vBot = H * 0.84
  vols.forEach((v, i) => {
    ctx.fillStyle = i === 5 ? '#7c3aed' : '#cbd5e1'
    ctx.fillRect(g.bx(i) - g.barW / 2, vBot - (v / 100) * (vBot - vTop), g.barW, (v / 100) * (vBot - vTop))
  })
  lbl(ctx, '恐慌爆量＋長下影', g.bx(5), vBot + 11, '#7c3aed', 9.5, true, 'center')
  lbl(ctx, '量縮價穩＝底部確認', g.bx(8.4), vBot + 24, '#16a34a', 9, true, 'center')
  lbl(ctx, '爆量反轉：低檔恐慌賣壓一次出清', W * 0.08, H * 0.06, '#1e1b4b', 11, true)
  lbl(ctx, '次日收紅確認承接力道，才算訊號完整', W * 0.08, H * 0.06 + 16, '#7c3aed', 9.5)
}

// 量價背離
function drawVolumeDivergence(ctx: CanvasRenderingContext2D, W: number, H: number) {
  const mid = W / 2
  const panel = (x0: number, x1: number, pricePts: number[], volPts: number[]) => {
    const pTop = H * 0.22, pBot = H * 0.5, vTop = H * 0.56, vBot = H * 0.76
    const px = (f: number) => x0 + (x1 - x0) * f
    poly(ctx, pricePts.map((v, i) => [px(i / (pricePts.length - 1)), pBot - v * (pBot - pTop)] as [number, number]), '#475569', 1.8)
    const n = volPts.length
    const bw = (x1 - x0) / (n + 2)
    volPts.forEach((v, i) => {
      ctx.fillStyle = '#94a3b8'
      ctx.fillRect(x0 + (i + 1) * bw - bw * 0.3, vBot - v * (vBot - vTop), bw * 0.6, v * (vBot - vTop))
    })
  }
  panel(W * 0.07, mid - 14, [0.2, 0.65, 0.45, 0.9, 0.6], [0.9, 0.8, 0.6, 0.45, 0.3])
  panel(mid + 14, W * 0.93, [0.85, 0.35, 0.55, 0.1, 0.4], [0.95, 0.75, 0.55, 0.35, 0.25])
  ctx.strokeStyle = '#e5e7eb'; ctx.lineWidth = 1
  ctx.beginPath(); ctx.moveTo(mid, H * 0.2); ctx.lineTo(mid, H * 0.78); ctx.stroke()
  lbl(ctx, '頂背離：價新高、量縮', (W * 0.07 + mid) / 2, H * 0.82, '#ef4444', 10, true, 'center')
  lbl(ctx, '漲勢燃料不足', (W * 0.07 + mid) / 2, H * 0.895, '#94a3b8', 9, false, 'center')
  lbl(ctx, '底背離：價新低、量縮', (mid + W * 0.93) / 2, H * 0.82, '#16a34a', 10, true, 'center')
  lbl(ctx, '賣盤在枯竭', (mid + W * 0.93) / 2, H * 0.895, '#94a3b8', 9, false, 'center')
  lbl(ctx, '量價背離：趨勢轉彎的早期預警', W * 0.08, H * 0.06, '#1e1b4b', 11.5, true)
  lbl(ctx, '上排＝股價　下排＝成交量', W * 0.08, H * 0.06 + 16, '#7c3aed', 9.5)
}

// ══ 進07 多指標整合 ══

// 三重框架總覽
function drawMultiIndicatorOverview(ctx: CanvasRenderingContext2D, W: number, H: number) {
  const x0 = W * 0.07, x1 = W * 0.93
  const cw = (x1 - x0 - 24) / 3
  const y0 = H * 0.2, ch = H * 0.42
  const col = (i: number, fill: string, stroke: string, t1: string, t2: string, t3: string, color: string) => {
    const cx = x0 + i * (cw + 12)
    boxRect(ctx, cx, y0, cw, ch, fill, stroke)
    lbl(ctx, t1, cx + cw / 2, y0 + ch * 0.2, color, 12, true, 'center')
    lbl(ctx, t2, cx + cw / 2, y0 + ch * 0.48, '#1e1b4b', 9.5, true, 'center')
    lbl(ctx, t3, cx + cw / 2, y0 + ch * 0.74, '#64748b', 8.5, false, 'center')
  }
  col(0, '#eef2ff', '#c7d2fe', 'KD', '動能偵測器', '低檔金叉＝起點', '#4338ca')
  col(1, '#fff7ed', '#fed7aa', 'MACD', '趨勢確認器', '柱由負轉正＝方向', '#c2410c')
  col(2, '#fef2f2', '#fecaca', '量價', '力道驗證器', '放量≥1.5倍＝資金', '#b91c1c')
  // 匯流箭頭
  const ay = y0 + ch + 10, by = ay + 22
  for (let i = 0; i < 3; i++) {
    const cx = x0 + i * (cw + 12) + cw / 2
    poly(ctx, [[cx, ay], [W / 2, by]], '#94a3b8', 1.4)
  }
  boxRect(ctx, W * 0.22, by + 6, W * 0.56, H * 0.13, '#1e1b4b', '#1e1b4b')
  lbl(ctx, '三重確認同時成立 → 進場', W / 2, by + 6 + H * 0.065, '#f0d080', 11, true, 'center')
  lbl(ctx, '一個指標說話叫訊號，三個說同一句話才叫確認', W * 0.07, H * 0.07, '#1e1b4b', 11, true)
}

// KD 低檔金叉 vs 高檔金叉
function drawMultiKdSignal(ctx: CanvasRenderingContext2D, W: number, H: number) {
  const leftX = W * 0.08, rightX = W * 0.92
  const top = H * 0.24, bot = H * 0.8
  const ky = (v: number) => bot - (v / 100) * (bot - top)
  poly(ctx, [[leftX, ky(80)], [rightX, ky(80)]], '#fca5a5', 1.2, [5, 4])
  poly(ctx, [[leftX, ky(20)], [rightX, ky(20)]], '#86efac', 1.2, [5, 4])
  const px = (f: number) => leftX + (rightX - leftX) * f
  // K（紫）與 D（灰）：低檔金叉(f0.22) → 漲 → 高檔糾纏假金叉(f0.7)
  poly(ctx, [[px(0), ky(35)], [px(0.1), ky(22)], [px(0.18), ky(14)], [px(0.26), ky(24)], [px(0.4), ky(55)], [px(0.55), ky(78)], [px(0.64), ky(86)], [px(0.7), ky(82)], [px(0.76), ky(88)], [px(0.85), ky(80)], [px(1), ky(70)]], '#7c3aed', 2)
  poly(ctx, [[px(0), ky(42)], [px(0.12), ky(30)], [px(0.22), ky(20)], [px(0.34), ky(28)], [px(0.48), ky(50)], [px(0.6), ky(72)], [px(0.72), ky(84)], [px(0.82), ky(85)], [px(1), ky(78)]], '#94a3b8', 2)
  const circ = (f: number, v: number, color: string) => { ctx.strokeStyle = color; ctx.lineWidth = 1.8; ctx.beginPath(); ctx.arc(px(f), ky(v), 9, 0, Math.PI * 2); ctx.stroke() }
  circ(0.235, 21, '#16a34a')
  circ(0.73, 84, '#ef4444')
  lbl(ctx, '✅ 低檔金叉（20以下）有效', px(0.235), bot + 13, '#16a34a', 9.5, true, 'center')
  lbl(ctx, '❌ 高檔金叉假訊號多', px(0.75), top - 10, '#ef4444', 9.5, true, 'center')
  lbl(ctx, 'KD 的角色：偵測短期動能轉折', leftX, H * 0.06, '#1e1b4b', 11.5, true)
  lbl(ctx, '─ K值（紫）　─ D值（灰）；上虛線80超買、下虛線20超賣', leftX, H * 0.06 + 16, '#7c3aed', 9)
}

// MACD 柱轉正
function drawMultiMacdSignal(ctx: CanvasRenderingContext2D, W: number, H: number) {
  const leftX = W * 0.08, rightX = W * 0.92
  const n = 15
  const bx = (i: number) => leftX + (i + 0.5) * ((rightX - leftX) / n)
  const pTop = H * 0.22, pBot = H * 0.44
  const price = [70, 68, 66, 64, 63, 62, 62.5, 63, 64, 66, 68, 71, 74, 77, 80]
  poly(ctx, price.map((p, i) => [bx(i), pBot - ((p - 60) / 22) * (pBot - pTop)] as [number, number]), '#475569', 1.8)
  const mTop = H * 0.5, mBot = H * 0.82, zero = (mTop + mBot) / 2
  poly(ctx, [[leftX, zero], [rightX, zero]], '#cbd5e1', 1)
  const hist = [-7, -8, -7.5, -6, -4.5, -3, -1.5, -0.5, 1, 2.5, 4, 5.5, 7, 8, 8.5]
  hist.forEach((v, i) => {
    const h2 = (v / 9) * (mBot - mTop) / 2
    ctx.fillStyle = v >= 0 ? '#fca5a5' : '#86efac'
    ctx.fillRect(bx(i) - 4, Math.min(zero, zero - h2), 8, Math.abs(h2))
  })
  ctx.strokeStyle = '#ef4444'; ctx.lineWidth = 1.6
  ctx.beginPath(); ctx.arc(bx(8), zero, 10, 0, Math.PI * 2); ctx.stroke()
  lbl(ctx, '柱由負轉正＝趨勢轉多確認', bx(8), mBot + 13, '#ef4444', 10, true, 'center')
  lbl(ctx, 'MACD 的角色：確認中期趨勢方向', leftX, H * 0.06, '#1e1b4b', 11.5, true)
  lbl(ctx, '綠柱漸縮 → 翻紅 → 紅柱漸長，空轉多的完整過程', leftX, H * 0.06 + 16, '#7c3aed', 9.5)
}

// 三重確認整合走勢
function drawMultiVolumeConfirm(ctx: CanvasRenderingContext2D, W: number, H: number) {
  const leftX = W * 0.1, rightX = W * 0.92
  const n = 14
  const bx = (i: number) => leftX + (i + 0.5) * ((rightX - leftX) / n)
  const SIG = 8 // 訊號發生的位置
  // 價格（頂部）
  const pTop = H * 0.2, pBot = H * 0.4
  const price = [66, 64, 63, 62, 61.5, 61, 61.5, 62, 63, 66, 70, 74, 78, 82]
  poly(ctx, price.map((p, i) => [bx(i), pBot - ((p - 60) / 24) * (pBot - pTop)] as [number, number]), '#475569', 1.8)
  // KD 軌
  const kTop = H * 0.46, kBot = H * 0.58
  const k = [55, 45, 35, 25, 18, 15, 16, 19, 26, 40, 55, 68, 76, 82]
  const d = [60, 52, 44, 36, 28, 22, 19, 18, 20, 30, 44, 58, 68, 75]
  poly(ctx, k.map((v, i) => [bx(i), kBot - (v / 100) * (kBot - kTop)] as [number, number]), '#7c3aed', 1.6)
  poly(ctx, d.map((v, i) => [bx(i), kBot - (v / 100) * (kBot - kTop)] as [number, number]), '#94a3b8', 1.6)
  // MACD 柱軌
  const mTop = H * 0.62, mBot = H * 0.74, mzero = (mTop + mBot) / 2
  poly(ctx, [[leftX, mzero], [rightX, mzero]], '#cbd5e1', 0.8)
  const hist = [-4, -4.5, -4, -3.5, -3, -2.2, -1.4, -0.5, 0.8, 2, 3.2, 4.2, 5, 5.5]
  hist.forEach((v, i) => {
    const h2 = (v / 6) * (mBot - mTop) / 2
    ctx.fillStyle = v >= 0 ? '#fca5a5' : '#86efac'
    ctx.fillRect(bx(i) - 3.5, Math.min(mzero, mzero - h2), 7, Math.abs(h2))
  })
  // 量軌
  const vTop = H * 0.78, vBot = H * 0.88
  const vols = [0.4, 0.38, 0.35, 0.3, 0.28, 0.25, 0.27, 0.3, 0.85, 0.9, 0.8, 0.7, 0.65, 0.6]
  vols.forEach((v, i) => {
    ctx.fillStyle = i >= SIG ? '#ef4444' : '#cbd5e1'
    ctx.fillRect(bx(i) - 3.5, vBot - v * (vBot - vTop), 7, v * (vBot - vTop))
  })
  // 對齊虛線
  poly(ctx, [[bx(SIG), pTop - 4], [bx(SIG), vBot + 4]], '#ef4444', 1.2, [4, 3])
  lbl(ctx, '▲ 三訊號同時出現＝進場', bx(SIG), H * 0.94, '#ef4444', 10, true, 'center')
  // 軌道名稱（左緣）
  lbl(ctx, '價', leftX - 16, (pTop + pBot) / 2, '#475569', 9, true)
  lbl(ctx, 'KD', leftX - 20, (kTop + kBot) / 2, '#7c3aed', 9, true)
  lbl(ctx, '柱', leftX - 16, (mTop + mBot) / 2, '#c2410c', 9, true)
  lbl(ctx, '量', leftX - 16, (vTop + vBot) / 2, '#64748b', 9, true)
  lbl(ctx, '三重確認：KD金叉＋MACD轉正＋放量，同一時間', W * 0.08, H * 0.06, '#1e1b4b', 11, true)
  lbl(ctx, '任一缺席都先等，寧可錯過不衝動', W * 0.08, H * 0.06 + 16, '#7c3aed', 9.5)
}

// 買進/賣出核查清單
function drawMultiIndicatorChecklist(ctx: CanvasRenderingContext2D, W: number, H: number) {
  const x0 = W * 0.07, x1 = W * 0.93
  const cw = (x1 - x0 - 14) / 2
  const y0 = H * 0.18, ch = H * 0.62
  boxRect(ctx, x0, y0, cw, ch, '#fef2f2', '#fecaca')
  boxRect(ctx, x0 + cw + 14, y0, cw, ch, '#f8fafc', '#cbd5e1')
  lbl(ctx, '買進核查（全到才進）', x0 + cw / 2, y0 + ch * 0.12, '#b91c1c', 10.5, true, 'center')
  const buy = ['✅ KD 低檔(20–40)金叉', '✅ MACD 柱由負轉正', '✅ 量 ≥ 均量1.5倍']
  buy.forEach((t, i) => lbl(ctx, t, x0 + 10, y0 + ch * (0.32 + i * 0.2), '#1e1b4b', 9.5, false))
  lbl(ctx, '賣出核查（兩項就警戒）', x0 + cw + 14 + cw / 2, y0 + ch * 0.12, '#475569', 10.5, true, 'center')
  const sell = ['⚠️ KD 高檔(80+)死叉', '⚠️ MACD 柱由正轉負', '⚠️ 價漲量縮/天量天價']
  sell.forEach((t, i) => lbl(ctx, t, x0 + cw + 24, y0 + ch * (0.32 + i * 0.2), '#1e1b4b', 9.5, false))
  lbl(ctx, '三步驟核查清單：照表操課，不靠感覺', x0, H * 0.07, '#1e1b4b', 11.5, true)
  lbl(ctx, '進場前就確認停損位置——框架提高勝率，不是保證', (x0 + x1) / 2, y0 + ch + 18, '#94a3b8', 9.5, false, 'center')
}

// ══ 進08 週月線 ══

// 時間框架層次
function drawTimeframeHierarchy(ctx: CanvasRenderingContext2D, W: number, H: number) {
  const x0 = W * 0.14, bw = W * 0.5
  const items: Array<[string, string, string, string]> = [
    ['月線', '定方向：牛市還是熊市？', '#1e1b4b', '#eef2ff'],
    ['週線', '定節奏：回檔還是主升？', '#7c3aed', '#f5f3ff'],
    ['日線', '找時機：進場K棒在哪？', '#ef4444', '#fef2f2'],
  ]
  const y0 = H * 0.18, bh = H * 0.17, gap = H * 0.08
  items.forEach(([t, d, color, fill], i) => {
    const y = y0 + i * (bh + gap)
    boxRect(ctx, x0, y, bw, bh, fill, color)
    lbl(ctx, t, x0 + 14, y + bh / 2, color, 13, true)
    lbl(ctx, d, x0 + bw + 10, y + bh / 2, '#475569', 9.5, false)
    if (i < 2) {
      poly(ctx, [[x0 + bw / 2, y + bh], [x0 + bw / 2, y + bh + gap]], '#94a3b8', 1.6)
      lbl(ctx, '▼', x0 + bw / 2, y + bh + gap / 2, '#94a3b8', 9, true, 'center')
    }
  })
  lbl(ctx, '由大到小：先看月線、再看週線、最後日線', W * 0.08, H * 0.07, '#1e1b4b', 11.5, true)
  lbl(ctx, '反過來操作（日線先找訊號）＝最常見的新手錯誤', W * 0.08, y0 + 3 * bh + 2 * gap + 16, '#94a3b8', 9.5)
}

// 週線過濾雜訊
function drawWeeklyFilter(ctx: CanvasRenderingContext2D, W: number, H: number) {
  const mid = W / 2
  const top = H * 0.24, bot = H * 0.74
  const draw = (x0: number, x1: number, noisy: boolean) => {
    const px = (f: number) => x0 + (x1 - x0) * f
    const py = (v: number) => bot - v * (bot - top)
    const pts: Array<[number, number]> = []
    for (let f = 0; f <= 1.001; f += noisy ? 0.03 : 0.1) {
      const noise = noisy ? Math.sin(f * 60) * 0.1 + Math.sin(f * 23) * 0.06 : 0
      pts.push([px(f), py(0.15 + f * 0.65 + noise)])
    }
    poly(ctx, pts, noisy ? '#94a3b8' : '#ef4444', noisy ? 1.4 : 2.2)
  }
  draw(W * 0.07, mid - 14, true)
  draw(mid + 14, W * 0.93, false)
  ctx.strokeStyle = '#e5e7eb'; ctx.lineWidth = 1
  ctx.beginPath(); ctx.moveTo(mid, top - 6); ctx.lineTo(mid, bot + 4); ctx.stroke()
  lbl(ctx, '日線：鋸齒雜訊，兩天下跌就心慌', (W * 0.07 + mid) / 2, bot + 16, '#64748b', 9.5, true, 'center')
  lbl(ctx, '週線：同一段走勢，趨勢一目了然', (mid + W * 0.93) / 2, bot + 16, '#ef4444', 9.5, true, 'center')
  lbl(ctx, '週線的功能：過濾日線雜訊', W * 0.08, H * 0.07, '#1e1b4b', 11.5, true)
  lbl(ctx, '一根週K＝五個交易日，小波動被壓縮，留下真趨勢', W * 0.08, H * 0.07 + 16, '#7c3aed', 9.5)
}

// 月線大週期
function drawMonthlyCycle(ctx: CanvasRenderingContext2D, W: number, H: number) {
  const leftX = W * 0.08, rightX = W * 0.92
  const top = H * 0.24, bot = H * 0.76
  const px = (f: number) => leftX + (rightX - leftX) * f
  const py = (v: number) => bot - v * (bot - top)
  // 牛市區（紅底）/ 熊市區（綠底）— 台股配色
  ctx.fillStyle = 'rgba(239,68,68,0.07)'; ctx.fillRect(px(0), top, px(0.42) - px(0), bot - top)
  ctx.fillStyle = 'rgba(22,163,74,0.07)'; ctx.fillRect(px(0.42), top, px(0.68) - px(0.42), bot - top)
  ctx.fillStyle = 'rgba(239,68,68,0.07)'; ctx.fillRect(px(0.68), top, px(1) - px(0.68), bot - top)
  // 月線波形
  const pts: Array<[number, number]> = [
    [px(0), py(0.15)], [px(0.12), py(0.32)], [px(0.22), py(0.45)], [px(0.32), py(0.62)], [px(0.42), py(0.78)],
    [px(0.5), py(0.6)], [px(0.58), py(0.42)], [px(0.68), py(0.25)],
    [px(0.78), py(0.4)], [px(0.88), py(0.6)], [px(1), py(0.82)],
  ]
  poly(ctx, pts, '#475569', 2.2)
  lbl(ctx, '牛市：做多為主', px(0.21), bot + 14, '#ef4444', 9.5, true, 'center')
  lbl(ctx, '熊市：空手也是策略', px(0.55), bot + 14, '#16a34a', 9.5, true, 'center')
  lbl(ctx, '新牛市', px(0.85), bot + 14, '#ef4444', 9.5, true, 'center')
  lbl(ctx, '月線：確認你站在大週期的哪裡', W * 0.08, H * 0.07, '#1e1b4b', 11.5, true)
  lbl(ctx, '不是預測下個月，是知道現在的環境該多積極', W * 0.08, H * 0.07 + 16, '#7c3aed', 9.5)
}

// 三線共振
function drawTripleTimeframeConfluence(ctx: CanvasRenderingContext2D, W: number, H: number) {
  const x0 = W * 0.07, x1 = W * 0.93
  const cw = (x1 - x0 - 24) / 3
  const y0 = H * 0.2, ch = H * 0.36
  const items: Array<[string, string]> = [['月線', '多頭環境 ✓'], ['週線', '站上20週MA ✓'], ['日線', 'KD翻揚 ✓']]
  items.forEach(([t, d], i) => {
    const cx = x0 + i * (cw + 12)
    boxRect(ctx, cx, y0, cw, ch, '#fef2f2', '#fecaca')
    lbl(ctx, t, cx + cw / 2, y0 + ch * 0.3, '#1e1b4b', 11.5, true, 'center')
    lbl(ctx, d, cx + cw / 2, y0 + ch * 0.66, '#ef4444', 9, true, 'center')
  })
  const ay = y0 + ch + 12
  for (let i = 0; i < 3; i++) poly(ctx, [[x0 + i * (cw + 12) + cw / 2, ay], [W / 2, ay + 20]], '#94a3b8', 1.4)
  boxRect(ctx, W * 0.2, ay + 26, W * 0.6, H * 0.14, '#1e1b4b', '#1e1b4b')
  lbl(ctx, '✦ 三線共振 ＝ 高勝率進場點', W / 2, ay + 26 + H * 0.07, '#f0d080', 11, true, 'center')
  lbl(ctx, '頻率不高，但出現時往往「買了就走」', W / 2, ay + 26 + H * 0.14 + 14, '#94a3b8', 9.5, false, 'center')
  lbl(ctx, '長中短線同時做多，才進場', W * 0.07, H * 0.07, '#1e1b4b', 11.5, true)
}

// 週線回測均線買法
function drawWeeklyPullbackEntry(ctx: CanvasRenderingContext2D, W: number, H: number) {
  const bars: Bar[] = [
    { o: 60, h: 63, l: 58, c: 62 }, { o: 62, h: 66, l: 61, c: 65 },
    { o: 65, h: 72, l: 64, c: 71 }, { o: 71, h: 78, l: 70, c: 77 }, { o: 77, h: 83, l: 75, c: 81 }, // 突破拉升
    { o: 81, h: 82, l: 76, c: 78 }, { o: 78, h: 79, l: 73, c: 74 }, { o: 74, h: 76, l: 71, c: 72 }, // 量縮回測
    { o: 72, h: 77, l: 71, c: 76 }, // 收紅反彈（進場）
    { o: 76, h: 82, l: 75, c: 81 }, { o: 81, h: 87, l: 80, c: 86 },
  ]
  const g = makeGeom(W, H, 55, 92, bars.length, 0.74, 0.24)
  // 20週均線
  const ma = [58, 59.5, 61, 63, 65.5, 67.5, 69, 70, 71, 72.5, 74.5]
  poly(ctx, ma.map((v, i) => [g.bx(i), g.py(v)] as [number, number]), '#f59e0b', 2)
  drawBars(ctx, g, bars)
  // 進場與停損
  ctx.strokeStyle = '#ef4444'; ctx.lineWidth = 1.6
  ctx.beginPath(); ctx.arc(g.bx(8), g.py(76), 9, 0, Math.PI * 2); ctx.stroke()
  poly(ctx, [[g.leftX, g.py(66)], [g.rightX, g.py(66)]], '#64748b', 1.2, [5, 4])
  lbl(ctx, '▲ 進場：回測20週MA收紅', g.bx(8), g.botY + 12, '#ef4444', 9.5, true, 'center')
  lbl(ctx, '停損：20週MA下方', g.rightX, g.py(66) + 12, '#64748b', 9, true, 'right')
  lbl(ctx, '突破 → 量縮回測 → 收紅反彈＝黃金買點', W * 0.08, H * 0.06, '#1e1b4b', 11, true)
  lbl(ctx, '─ 20週均線（橘）；上有突破確認、下有均線支撐', W * 0.08, H * 0.06 + 16, '#7c3aed', 9.5)
}

// ══ 進09 選股系統 ══

// 三層漏斗
function drawStockScreenFunnel(ctx: CanvasRenderingContext2D, W: number, H: number) {
  const cxm = W / 2
  const layers: Array<[number, string, string, string]> = [
    [0.78, '第一層：大環境（月/週線多頭嗎？）', '#eef2ff', '#4338ca'],
    [0.58, '第二層：強勢族群（法人買哪裡？）', '#f5f3ff', '#7c3aed'],
    [0.38, '第三層：個股技術（位置/量價OK？）', '#fef2f2', '#ef4444'],
  ]
  const y0 = H * 0.18, lh = H * 0.155, gap = H * 0.035
  layers.forEach(([wf, t, fill, color], i) => {
    const y = y0 + i * (lh + gap)
    const w = W * (wf as number)
    boxRect(ctx, cxm - w / 2, y, w, lh, fill as string, color as string)
    lbl(ctx, t as string, cxm, y + lh / 2, color as string, 9.5, true, 'center')
  })
  const by = y0 + 3 * (lh + gap) + 4
  boxRect(ctx, cxm - W * 0.27, by, W * 0.54, H * 0.12, '#1e1b4b', '#1e1b4b')
  lbl(ctx, 'Watchlist：10–15 檔', cxm, by + H * 0.06, '#f0d080', 11, true, 'center')
  lbl(ctx, '選股三層漏斗：一層一層篩，不靠感覺', W * 0.08, H * 0.07, '#1e1b4b', 11.5, true)
  lbl(ctx, '大環境偏空 → 漏斗直接關上，選股再認真也沒用', cxm, by + H * 0.12 + 14, '#94a3b8', 9, false, 'center')
}

// 大環境儀表板
function drawMarketEnvironmentGauge(ctx: CanvasRenderingContext2D, W: number, H: number) {
  const x0 = W * 0.07, x1 = W * 0.93
  const cw = (x1 - x0 - 24) / 3
  const y0 = H * 0.2, ch = H * 0.4
  const items: Array<[string, string, string]> = [
    ['月線方向', '均線多頭排列', '🟢'],
    ['融資餘額', '溫和增加', '🟢'],
    ['外資動向', '連續買超', '🟢'],
  ]
  items.forEach(([t, d, light], i) => {
    const cx = x0 + i * (cw + 12)
    boxRect(ctx, cx, y0, cw, ch, '#f8fafc', '#cbd5e1')
    lbl(ctx, light, cx + cw / 2, y0 + ch * 0.24, '#16a34a', 16, true, 'center')
    lbl(ctx, t, cx + cw / 2, y0 + ch * 0.55, '#1e1b4b', 10, true, 'center')
    lbl(ctx, d, cx + cw / 2, y0 + ch * 0.8, '#64748b', 8.5, false, 'center')
  })
  const by = y0 + ch + 14
  boxRect(ctx, x0, by, x1 - x0, H * 0.13, '#fef2f2', '#fecaca')
  lbl(ctx, '環境評分：偏多 → 漏斗全開，積極找股', (x0 + x1) / 2, by + H * 0.065, '#b91c1c', 10.5, true, 'center')
  lbl(ctx, '第一層：大環境篩選（一週確認一次就夠）', W * 0.07, H * 0.07, '#1e1b4b', 11.5, true)
  lbl(ctx, '中性→只做最強勢；偏空→空手等待', (x0 + x1) / 2, by + H * 0.13 + 14, '#94a3b8', 9.5, false, 'center')
}

// 族群輪動熱力圖
function drawSectorRotationMap(ctx: CanvasRenderingContext2D, W: number, H: number) {
  const x0 = W * 0.07, x1 = W * 0.93
  const cw = (x1 - x0 - 24) / 3, chh = H * 0.24
  const sectors: Array<[string, string, string, string]> = [
    ['AI伺服器', '+12%', '#ef4444', '#fef2f2'],
    ['半導體', '+8%', '#f87171', '#fef2f2'],
    ['軍工', '+5%', '#fca5a5', '#fff7f7'],
    ['金融', '+1%', '#e5e7eb', '#fafafa'],
    ['傳產塑化', '-3%', '#86efac', '#f0fdf4'],
    ['航運', '-6%', '#4ade80', '#f0fdf4'],
  ]
  sectors.forEach(([t, pct, stroke, fill], i) => {
    const cx = x0 + (i % 3) * (cw + 12)
    const cy = H * 0.2 + Math.floor(i / 3) * (chh + 12)
    boxRect(ctx, cx, cy, cw, chh, fill, stroke)
    lbl(ctx, t, cx + cw / 2, cy + chh * 0.34, '#1e1b4b', 9.5, true, 'center')
    lbl(ctx, pct, cx + cw / 2, cy + chh * 0.68, stroke === '#e5e7eb' ? '#64748b' : stroke, 10.5, true, 'center')
  })
  lbl(ctx, '★ 投信連買', x0 + cw / 2, H * 0.2 - 8, '#b45309', 8.5, true, 'center')
  lbl(ctx, '第二層：找強勢族群（紅強綠弱）', W * 0.07, H * 0.07, '#1e1b4b', 11.5, true)
  lbl(ctx, '在強勢族群裡選股＝順著最大資金流向操作', (x0 + x1) / 2, H * 0.2 + 2 * chh + 12 + 18, '#94a3b8', 9.5, false, 'center')
}

// 個股技術四格清單
function drawStockTechnicalChecklist(ctx: CanvasRenderingContext2D, W: number, H: number) {
  const x0 = W * 0.07, x1 = W * 0.93
  const cw = (x1 - x0 - 12) / 2, chh = H * 0.26
  const items: Array<[string, string]> = [
    ['週線多頭結構', '站上20週MA，均線向上'],
    ['量價健康', '漲有量、回檔量縮'],
    ['位置合理', '在支撐附近，不追高'],
    ['指標配合', 'KD/MACD 翻揚跡象'],
  ]
  items.forEach(([t, d], i) => {
    const cx = x0 + (i % 2) * (cw + 12)
    const cy = H * 0.18 + Math.floor(i / 2) * (chh + 12)
    boxRect(ctx, cx, cy, cw, chh, '#f0fdf4', '#86efac')
    lbl(ctx, `✓ ${t}`, cx + 10, cy + chh * 0.32, '#15803d', 10, true)
    lbl(ctx, d, cx + 10, cy + chh * 0.68, '#64748b', 8.5, false)
  })
  lbl(ctx, '第三層：個股技術四條件', W * 0.07, H * 0.07, '#1e1b4b', 11.5, true)
  lbl(ctx, '符合三個以上 → 列入 Watchlist；不必四個全滿', (x0 + x1) / 2, H * 0.18 + 2 * chh + 12 + 18, '#94a3b8', 9.5, false, 'center')
}

// 每週選股流程
function drawWatchlistWeeklyWorkflow(ctx: CanvasRenderingContext2D, W: number, H: number) {
  const x0 = W * 0.07, x1 = W * 0.93
  const steps: Array<[string, string, string]> = [
    ['Step 1', '確認大環境', '10分'],
    ['Step 2', '找強勢族群', '15分'],
    ['Step 3', '個股技術篩選', '30分'],
    ['Step 4', '設定價格提醒', '5分'],
  ]
  const bh = H * 0.135, gap = H * 0.035, y0 = H * 0.16
  steps.forEach(([s, t, m], i) => {
    const y = y0 + i * (bh + gap)
    boxRect(ctx, x0, y, x1 - x0, bh, i === 3 ? '#fef2f2' : '#f8fafc', i === 3 ? '#fecaca' : '#cbd5e1')
    lbl(ctx, s, x0 + 12, y + bh / 2, '#7c3aed', 10, true)
    lbl(ctx, t, x0 + 70, y + bh / 2, '#1e1b4b', 10, true)
    lbl(ctx, m, x1 - 12, y + bh / 2, '#94a3b8', 9.5, true, 'right')
  })
  const ty = y0 + 4 * (bh + gap) + 4
  lbl(ctx, '每週一次，總計約 60 分鐘', (x0 + x1) / 2, ty, '#b45309', 10.5, true, 'center')
  lbl(ctx, '比每天盯盤八小時更有效率', (x0 + x1) / 2, ty + 15, '#94a3b8', 9, false, 'center')
  lbl(ctx, 'Watchlist 每週維護流程（建議週末）', W * 0.07, H * 0.07, '#1e1b4b', 11.5, true)
  lbl(ctx, '不設提醒等於白做——機會來了你在睡覺', W * 0.07, H * 0.07 + 16, '#7c3aed', 9.5)
}

// ══ 進10 交易計畫 ══

function drawTradePlanTemplate(ctx: CanvasRenderingContext2D, W: number, H: number) {
  const x0 = W * 0.07, x1 = W * 0.93
  const rows: Array<[string, string]> = [
    ['進場條件', 'KD金叉＋MACD轉正＋量1.5倍，三項同到'],
    ['停損點', '最近有效支撐之下（結構價，非百分比）'],
    ['目標價', '第一目標減1/3；第二目標移動停損保護'],
    ['持股期間', '預計2–6週（週線波段）'],
  ]
  const bh = H * 0.14, gap = H * 0.03, y0 = H * 0.18
  rows.forEach(([t, d], i) => {
    const y = y0 + i * (bh + gap)
    boxRect(ctx, x0, y, W * 0.24, bh, '#1e1b4b', '#1e1b4b')
    lbl(ctx, t, x0 + W * 0.12, y + bh / 2, '#f0d080', 9.5, true, 'center')
    boxRect(ctx, x0 + W * 0.24 + 6, y, x1 - x0 - W * 0.24 - 6, bh, '#f8fafc', '#cbd5e1')
    lbl(ctx, d, x0 + W * 0.24 + 16, y + bh / 2, '#475569', 8.5, false)
  })
  const ty = y0 + 4 * (bh + gap) + 6
  lbl(ctx, '四欄都填好才下單；成交後只執行、不調整', (x0 + x1) / 2, ty, '#b91c1c', 10, true, 'center')
  lbl(ctx, '交易計畫表：下單前寫死', W * 0.07, H * 0.07, '#1e1b4b', 11.5, true)
  lbl(ctx, '90%的虧損不是判斷錯，是執行亂', W * 0.07, H * 0.07 + 16, '#7c3aed', 9.5)
}

// ══ 高階版共用 ══
function arrow(ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number, color: string, width = 1.4) {
  poly(ctx, [[x1, y1], [x2, y2]], color, width)
  const a = Math.atan2(y2 - y1, x2 - x1)
  ctx.save(); ctx.strokeStyle = color; ctx.lineWidth = width; ctx.setLineDash([])
  ctx.beginPath()
  ctx.moveTo(x2 - 7 * Math.cos(a - 0.45), y2 - 7 * Math.sin(a - 0.45))
  ctx.lineTo(x2, y2)
  ctx.lineTo(x2 - 7 * Math.cos(a + 0.45), y2 - 7 * Math.sin(a + 0.45))
  ctx.stroke(); ctx.restore()
}

// ══ 高01 選股系統 ══

// 三層篩選流程（縱向）
function drawStockScreenFlow(ctx: CanvasRenderingContext2D, W: number, H: number) {
  const cxm = W / 2, bw = W * 0.56
  const steps: Array<[string, string, string]> = [
    ['① 市場條件', '大盤多空？適合進場嗎？', '#eef2ff'],
    ['② 個股條件', '技術面 + 籌碼面篩選', '#f5f3ff'],
    ['③ 時機條件', '進場訊號出現了嗎？', '#fef2f2'],
  ]
  const y0 = H * 0.17, bh = H * 0.13, gap = H * 0.055
  steps.forEach(([t, d, fill], i) => {
    const y = y0 + i * (bh + gap)
    boxRect(ctx, cxm - bw / 2, y, bw, bh, fill, '#7c3aed')
    lbl(ctx, t, cxm - bw / 2 + 12, y + bh / 2, '#1e1b4b', 10.5, true)
    lbl(ctx, d, cxm - bw / 2 + 88, y + bh / 2, '#64748b', 9)
    lbl(ctx, '✗ 淘汰', cxm + bw / 2 + 8, y + bh / 2, '#94a3b8', 8.5, false)
    if (i < 2) arrow(ctx, cxm, y + bh, cxm, y + bh + gap, '#94a3b8', 1.6)
  })
  const wy = y0 + 3 * (bh + gap) - gap * 0.4
  arrow(ctx, cxm, wy + bh * 0.6, cxm, wy + bh, '#94a3b8', 1.6)
  boxRect(ctx, cxm - bw / 2, wy + bh, bw, bh * 0.92, '#1e1b4b', '#1e1b4b')
  lbl(ctx, '三層都過 → 進 Watchlist → 等進場訊號', cxm, wy + bh + bh * 0.46, '#f0d080', 9.5, true, 'center')
  lbl(ctx, '選股三層漏斗：缺一層都會降低勝率', W * 0.07, H * 0.06, '#1e1b4b', 11.5, true)
}

// 市場三相位（多頭/整理/空頭）— 共用 高01、高08
function drawMarketCyclePhase(ctx: CanvasRenderingContext2D, W: number, H: number) {
  const x0 = W * 0.07, x1 = W * 0.93
  const cw = (x1 - x0 - 20) / 3
  const top = H * 0.24, bot = H * 0.6
  const phase = (i: number, title: string, color: string, strat: string, trend: 'up' | 'flat' | 'down') => {
    const cx = x0 + i * (cw + 10)
    const px = (f: number) => cx + cw * (0.1 + f * 0.8)
    const py = (v: number) => bot - v * (bot - top)
    const pts: Array<[number, number]> = []
    for (let f = 0; f <= 1.001; f += 0.1) {
      let v
      if (trend === 'up') v = 0.1 + f * 0.8 + Math.sin(f * 12) * 0.05
      else if (trend === 'down') v = 0.9 - f * 0.8 + Math.sin(f * 12) * 0.05
      else v = 0.5 + Math.sin(f * 16) * 0.18
      pts.push([px(f), py(v)])
    }
    poly(ctx, pts, color, 2.2)
    lbl(ctx, title, cx + cw / 2, bot + 16, color, 10.5, true, 'center')
    lbl(ctx, strat, cx + cw / 2, bot + 30, '#64748b', 8.5, false, 'center')
  }
  phase(0, '多頭', '#ef4444', '突破順勢、放寬停利', 'up')
  phase(1, '整理', '#f59e0b', '箱型操作、縮小部位', 'flat')
  phase(2, '空頭', '#16a34a', '現金為王、不做多', 'down')
  lbl(ctx, '市場三相位：先確認在哪一段，再決定用哪套策略', W * 0.07, H * 0.07, '#1e1b4b', 11, true)
}

// 個股篩選條件表
function drawStockScreenCriteria(ctx: CanvasRenderingContext2D, W: number, H: number) {
  const x0 = W * 0.07, x1 = W * 0.93
  const rows: Array<[string, string, string]> = [
    ['趨勢', '日線20MA向上，股價在其上', '#fef2f2'],
    ['量能', '近5日均量 > 20日均量1.5倍', '#fffbeb'],
    ['籌碼', '融資近5日不增（無散戶追漲）', '#eef2ff'],
    ['位置', '週KD < 80（尚有上漲空間）', '#f0fdf4'],
  ]
  const y0 = H * 0.2, rh = H * 0.15, gap = H * 0.025
  rows.forEach(([t, d, fill], i) => {
    const y = y0 + i * (rh + gap)
    boxRect(ctx, x0, y, W * 0.16, rh, '#1e1b4b', '#1e1b4b')
    lbl(ctx, t, x0 + W * 0.08, y + rh / 2, '#f0d080', 10, true, 'center')
    boxRect(ctx, x0 + W * 0.16 + 5, y, x1 - x0 - W * 0.16 - 5 - W * 0.1, rh, fill, '#cbd5e1')
    lbl(ctx, d, x0 + W * 0.16 + 15, y + rh / 2, '#475569', 9)
    boxRect(ctx, x1 - W * 0.08, y, W * 0.08, rh, '#f0fdf4', '#86efac')
    lbl(ctx, '✓', x1 - W * 0.04, y + rh / 2, '#16a34a', 13, true, 'center')
  })
  lbl(ctx, '個股篩選清單：可量化、可複製、可回測', W * 0.07, H * 0.07, '#1e1b4b', 11.5, true)
  lbl(ctx, '（這是示範結構，不是標準答案——選你最懂的3–5個條件）', W * 0.07, H * 0.95, '#94a3b8', 8.5)
}

// ══ 高02 進場訊號整合 ══

// 三維度匯聚進場
function drawEntrySignalMulti(ctx: CanvasRenderingContext2D, W: number, H: number) {
  const x0 = W * 0.07, x1 = W * 0.93
  const cw = (x1 - x0 - 24) / 3, y0 = H * 0.2, ch = H * 0.4
  const col = (i: number, fill: string, stroke: string, t1: string, t2: string, color: string) => {
    const cx = x0 + i * (cw + 12)
    boxRect(ctx, cx, y0, cw, ch, fill, stroke)
    lbl(ctx, t1, cx + cw / 2, y0 + ch * 0.28, color, 11, true, 'center')
    lbl(ctx, t2, cx + cw / 2, y0 + ch * 0.62, '#475569', 8.5, false, 'center')
    arrow(ctx, cx + cw / 2, y0 + ch + 6, W / 2, y0 + ch + 28, '#94a3b8', 1.4)
  }
  col(0, '#eef2ff', '#c7d2fe', '技術面', '趨勢+型態+動能', '#4338ca')
  col(1, '#fff7ed', '#fed7aa', '籌碼面', '法人方向一致', '#c2410c')
  col(2, '#f0fdf4', '#bbf7d0', '時間框架', '週線+日線同向', '#15803d')
  boxRect(ctx, W * 0.24, y0 + ch + 32, W * 0.52, H * 0.14, '#1e1b4b', '#1e1b4b')
  lbl(ctx, '三維度對齊 → 進場決策', W / 2, y0 + ch + 32 + H * 0.07, '#f0d080', 11, true, 'center')
  lbl(ctx, '進場三維度：彼此獨立，不是同類指標的堆疊', W * 0.07, H * 0.07, '#1e1b4b', 11, true)
  lbl(ctx, '3綠燈→進場　2綠→減半　1綠→觀望', W / 2, y0 + ch + 32 + H * 0.14 + 14, '#94a3b8', 9, false, 'center')
}

// 技術確認三步驟（縱向）
function drawEntrySignalTechConfirm(ctx: CanvasRenderingContext2D, W: number, H: number) {
  const cxm = W / 2, bw = W * 0.62
  const steps: Array<[string, string]> = [
    ['STEP 1　週線定方向', '多 / 空 / 整理'],
    ['STEP 2　日線找型態', '突破 / 反轉 / 低點墊高'],
    ['STEP 3　動能確認力道', 'MACD紅柱 / KD同向'],
  ]
  const y0 = H * 0.18, bh = H * 0.17, gap = H * 0.06
  steps.forEach(([t, d], i) => {
    const y = y0 + i * (bh + gap)
    boxRect(ctx, cxm - bw / 2, y, bw, bh, i === 2 ? '#fef2f2' : '#eef2ff', '#7c3aed')
    lbl(ctx, t, cxm - bw / 2 + 14, y + bh * 0.38, '#1e1b4b', 10.5, true)
    lbl(ctx, d, cxm - bw / 2 + 14, y + bh * 0.74, '#64748b', 9)
    if (i < 2) arrow(ctx, cxm, y + bh, cxm, y + bh + gap, '#94a3b8', 1.6)
  })
  lbl(ctx, '技術面確認：三步一次對齊才算完成', W * 0.07, H * 0.06, '#1e1b4b', 11.5, true)
}

// 進場核查表 + 燈號
function drawEntrySignalChecklist(ctx: CanvasRenderingContext2D, W: number, H: number) {
  const x0 = W * 0.07, x1 = W * 0.93
  const rows: Array<[string, string]> = [
    ['技術·週線', '均線方向'],
    ['技術·日線', '型態 + 動能'],
    ['籌碼·法人', '近5日方向'],
    ['時間框架', '日線對齊週線？'],
  ]
  const y0 = H * 0.18, rh = H * 0.11, gap = H * 0.02
  rows.forEach(([t, d], i) => {
    const y = y0 + i * (rh + gap)
    boxRect(ctx, x0, y, x1 - x0, rh, i % 2 ? '#f8fafc' : '#eef2ff', '#cbd5e1')
    lbl(ctx, t, x0 + 12, y + rh / 2, '#1e1b4b', 9.5, true)
    lbl(ctx, d, x0 + W * 0.36, y + rh / 2, '#64748b', 9)
    lbl(ctx, 'Y / N', x1 - 16, y + rh / 2, '#7c3aed', 9.5, true, 'right')
  })
  const ly = y0 + 4 * (rh + gap) + 6
  const lights: Array<[string, string, string]> = [['3Y', '正常部位', '#16a34a'], ['2Y', '50%試水', '#f59e0b'], ['1Y↓', '觀望', '#ef4444']]
  const lw = (x1 - x0 - 16) / 3
  lights.forEach(([n, d, c], i) => {
    const lx = x0 + i * (lw + 8)
    boxRect(ctx, lx, ly, lw, H * 0.12, '#fff', c)
    lbl(ctx, n, lx + lw / 2, ly + H * 0.04, c, 11, true, 'center')
    lbl(ctx, d, lx + lw / 2, ly + H * 0.085, '#475569', 8.5, false, 'center')
  })
  lbl(ctx, '進場前 3 分鐘核查表：可複製、可覆盤', W * 0.07, H * 0.07, '#1e1b4b', 11, true)
}

// ══ 高03 出場 ══

// 三種出場策略比較
function drawExitTarget(ctx: CanvasRenderingContext2D, W: number, H: number) {
  const x0 = W * 0.07, x1 = W * 0.93
  const rows: Array<[string, string, string, string]> = [
    ['目標價', '到設定價就出，不管後續', '波段、有明確壓力位', '#eef2ff'],
    ['移動停利', '停利點隨股價上移', '強勢趨勢、漲幅不確定', '#f0fdf4'],
    ['訊號出場', '等反轉訊號再出', '能判讀技術訊號者', '#fffbeb'],
  ]
  const y0 = H * 0.2, rh = H * 0.2, gap = H * 0.03
  rows.forEach(([t, logic, fit, fill], i) => {
    const y = y0 + i * (rh + gap)
    boxRect(ctx, x0, y, x1 - x0, rh, fill, '#cbd5e1')
    lbl(ctx, t, x0 + 14, y + rh * 0.32, '#1e1b4b', 11, true)
    lbl(ctx, logic, x0 + 14, y + rh * 0.7, '#475569', 9)
    lbl(ctx, '適合：' + fit, x1 - 14, y + rh / 2, '#7c3aed', 8.5, false, 'right')
  })
  lbl(ctx, '出場三策略：沒有最好，只有適不適合', W * 0.07, H * 0.07, '#1e1b4b', 11.5, true)
  lbl(ctx, '關鍵：策略在「進場前」就決定好', W * 0.07, H * 0.95, '#94a3b8', 8.5)
}

// 移動停利折線
function drawExitTrailing(ctx: CanvasRenderingContext2D, W: number, H: number) {
  const leftX = W * 0.08, rightX = W * 0.92, top = H * 0.24, bot = H * 0.82
  const px = (f: number) => leftX + (rightX - leftX) * f
  const py = (v: number) => bot - ((v - 50) / 50) * (bot - top)
  // 股價：先漲後回
  const price: Array<[number, number]> = [
    [px(0), py(58)], [px(0.12), py(66)], [px(0.24), py(74)], [px(0.36), py(82)],
    [px(0.46), py(90)], [px(0.54), py(86)], [px(0.62), py(88)], [px(0.7), py(80)],
    [px(0.78), py(74)], [px(0.86), py(72)],
  ]
  poly(ctx, price, '#475569', 2)
  // 移動停利線：跟著最高點階梯上移（最高點下方8）
  const peak = [58, 66, 74, 82, 90, 90, 90, 90, 90, 90]
  const stop: Array<[number, number]> = peak.map((p, i) => [px(i * (0.86 / 9)), py(p - 8)] as [number, number])
  poly(ctx, stop, '#ef4444', 1.8, [5, 4])
  // 出場點（股價跌破停利線 ≈ f0.7, 價80 vs 停利82）
  const ex = px(0.7), ey = py(82)
  ctx.strokeStyle = '#ef4444'; ctx.lineWidth = 1.8; ctx.beginPath(); ctx.arc(ex, ey, 9, 0, Math.PI * 2); ctx.stroke()
  lbl(ctx, '✕ 跌破停利線→出場', ex, ey - 16, '#ef4444', 9.5, true, 'center')
  lbl(ctx, '停利線跟著最高點上移', px(0.2), py(72), '#ef4444', 9, true)
  lbl(ctx, '─ 股價　┅ 移動停利線', rightX, top - 8, '#94a3b8', 9, false, 'right')
  lbl(ctx, '移動停利：讓獲利奔跑，回落才下車', W * 0.08, H * 0.07, '#1e1b4b', 11, true)
  lbl(ctx, '幅度依「該股正常波動」設定，不是你的心理承受度', W * 0.08, H * 0.95, '#94a3b8', 8.5)
}

// ══ 高04 資金管理 ══

// 部位計算流程
function drawPositionSizing(ctx: CanvasRenderingContext2D, W: number, H: number) {
  const x0 = W * 0.07, x1 = W * 0.93
  const cw = (x1 - x0 - 16) / 2, y0 = H * 0.22, ch = H * 0.22
  boxRect(ctx, x0, y0, cw, ch, '#eef2ff', '#c7d2fe')
  lbl(ctx, '① 帳戶 × 風險%', x0 + cw / 2, y0 + ch * 0.32, '#4338ca', 10, true, 'center')
  lbl(ctx, '= 可承受損失', x0 + cw / 2, y0 + ch * 0.62, '#475569', 9, false, 'center')
  lbl(ctx, '100萬×1% = 1萬', x0 + cw / 2, y0 + ch * 0.88, '#94a3b8', 8.5, false, 'center')
  boxRect(ctx, x0 + cw + 16, y0, cw, ch, '#fffbeb', '#fde68a')
  lbl(ctx, '② 進場價 − 停損價', x0 + cw + 16 + cw / 2, y0 + ch * 0.32, '#b45309', 10, true, 'center')
  lbl(ctx, '= 每股風險', x0 + cw + 16 + cw / 2, y0 + ch * 0.62, '#475569', 9, false, 'center')
  lbl(ctx, '50 − 47 = 3 元', x0 + cw + 16 + cw / 2, y0 + ch * 0.88, '#94a3b8', 8.5, false, 'center')
  arrow(ctx, x0 + cw / 2, y0 + ch + 4, W / 2, y0 + ch + 26, '#94a3b8', 1.4)
  arrow(ctx, x0 + cw + 16 + cw / 2, y0 + ch + 4, W / 2, y0 + ch + 26, '#94a3b8', 1.4)
  boxRect(ctx, W * 0.22, y0 + ch + 30, W * 0.56, ch, '#1e1b4b', '#1e1b4b')
  lbl(ctx, '③ 可承受損失 ÷ 每股風險', W / 2, y0 + ch + 30 + ch * 0.36, '#f0d080', 9.5, true, 'center')
  lbl(ctx, '= 部位上限 1萬÷3 ≈ 3,333股', W / 2, y0 + ch + 30 + ch * 0.72, '#fff', 9.5, true, 'center')
  lbl(ctx, '固定每筆風險，不固定買多少錢', W * 0.07, H * 0.07, '#1e1b4b', 11.5, true)
  lbl(ctx, '算出的是「上限」不是「目標」——訊號強度決定買到幾成', W * 0.07, H * 0.96, '#94a3b8', 8.5)
}

// 分批進出場階梯
function drawPositionPyramid(ctx: CanvasRenderingContext2D, W: number, H: number) {
  const mid = W / 2, top = H * 0.24, bot = H * 0.82
  // 左：分批進場（50→100%）
  const lx0 = W * 0.08, lx1 = mid - 14
  const inSteps = [[0, 0.5], [0.5, 1]]
  inSteps.forEach(([s, e], i) => {
    const y = bot - (i + 1) * ((bot - top) / 2.4)
    const h2 = (bot - top) / 2.4 - 4
    boxRect(ctx, lx0, y, (lx1 - lx0) * (e as number), h2, '#fef2f2', '#fca5a5')
    lbl(ctx, i === 0 ? '先進50%' : '回測支撐 +50%', lx0 + 8, y + h2 / 2, '#b91c1c', 9, true)
  })
  lbl(ctx, '分批進場', (lx0 + lx1) / 2, bot + 14, '#ef4444', 10, true, 'center')
  // 右：分批出場（-30→移動停利→-70）
  const rx0 = mid + 14, rx1 = W * 0.92
  const outSteps = ['第一目標 出30–50%', '移動停利保護', '轉弱/反轉 全出']
  outSteps.forEach((t, i) => {
    const y = top + i * ((bot - top) / 3.2) + 4
    const h2 = (bot - top) / 3.2 - 6
    boxRect(ctx, rx0, y, (rx1 - rx0) * (1 - i * 0.22), h2, '#f0fdf4', '#86efac')
    lbl(ctx, t, rx0 + 8, y + h2 / 2, '#15803d', 8.5, true)
  })
  lbl(ctx, '分批出場', (rx0 + rx1) / 2, bot + 14, '#16a34a', 10, true, 'center')
  ctx.strokeStyle = '#e5e7eb'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(mid, top - 6); ctx.lineTo(mid, bot + 4); ctx.stroke()
  lbl(ctx, '分批：對沖不確定性，不讓單次失誤毀掉整筆', W * 0.07, H * 0.07, '#1e1b4b', 11, true)
}

// ══ 高05/06 心理 ══

// 情緒循環環形 — 共用 高05、高06
function drawPsychologyCycle(ctx: CanvasRenderingContext2D, W: number, H: number) {
  const cx = W / 2, cy = H * 0.56, r = Math.min(W, H) * 0.3
  const nodes: Array<[string, string]> = [
    ['獲利', '#16a34a'], ['樂觀', '#16a34a'], ['貪婪', '#ef4444'], ['過度加碼', '#ef4444'],
    ['虧損', '#7c3aed'], ['恐懼', '#7c3aed'], ['懊悔', '#f59e0b'], ['謹慎', '#94a3b8'],
  ]
  const n = nodes.length
  // 環形連線
  ctx.strokeStyle = '#e5e7eb'; ctx.lineWidth = 1.5
  ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.stroke()
  nodes.forEach(([t, color], i) => {
    const a = -Math.PI / 2 + (i / n) * Math.PI * 2
    const x = cx + r * Math.cos(a), y = cy + r * Math.sin(a)
    ctx.fillStyle = '#fff'; ctx.strokeStyle = color; ctx.lineWidth = 1.8
    ctx.beginPath(); ctx.arc(x, y, 6, 0, Math.PI * 2); ctx.fill(); ctx.stroke()
    const lx = cx + (r + 22) * Math.cos(a), ly = cy + (r + 16) * Math.sin(a)
    lbl(ctx, t, lx, ly, color, 9.5, true, 'center')
  })
  lbl(ctx, '多巴胺', cx, cy - 12, '#ef4444', 9, true, 'center')
  lbl(ctx, '↑高估勝算', cx, cy, '#ef4444', 8, false, 'center')
  lbl(ctx, '杏仁核', cx, cy + 14, '#7c3aed', 9, true, 'center')
  lbl(ctx, '↑逃跑/凍結', cx, cy + 26, '#7c3aed', 8, false, 'center')
  lbl(ctx, '情緒循環：恐懼與貪婪是生理機制，不是性格', W * 0.06, H * 0.08, '#1e1b4b', 11, true)
  lbl(ctx, '對策＝在情緒平靜時寫規則，高峰時只執行', W * 0.06, H * 0.95, '#94a3b8', 8.5)
}

// ══ 高07 覆盤 ══

// 2×2 覆盤四格
function drawJournalTemplate(ctx: CanvasRenderingContext2D, W: number, H: number) {
  const x0 = W * 0.16, x1 = W * 0.93, y0 = H * 0.24, y1 = H * 0.86
  const cw = (x1 - x0) / 2 - 4, ch = (y1 - y0) / 2 - 4
  const cell = (cxi: number, cyi: number, fill: string, stroke: string, mark: string, t: string, color: string) => {
    const cx = x0 + cxi * (cw + 8), cy = y0 + cyi * (ch + 8)
    boxRect(ctx, cx, cy, cw, ch, fill, stroke)
    lbl(ctx, mark, cx + cw / 2, cy + ch * 0.32, color, 14, true, 'center')
    lbl(ctx, t, cx + cw / 2, cy + ch * 0.68, '#475569', 8.5, false, 'center')
  }
  cell(0, 0, '#f0fdf4', '#86efac', '✅ 系統在工作', '按計畫+獲利→強化', '#15803d')
  cell(1, 0, '#fffbeb', '#fde68a', '⚠️ 運氣獲利', '沒按計畫+獲利→別強化', '#b45309')
  cell(0, 1, '#eef2ff', '#c7d2fe', '✅ 正常成本', '按計畫+虧損→記樣本', '#4338ca')
  cell(1, 1, '#fef2f2', '#fecaca', '❌ 執行問題', '沒按計畫+虧損→修正', '#b91c1c')
  // 軸標
  lbl(ctx, '獲利', x0 - 10, y0 + ch / 2, '#16a34a', 9, true, 'right')
  lbl(ctx, '虧損', x0 - 10, y0 + ch + 8 + ch / 2, '#ef4444', 9, true, 'right')
  lbl(ctx, '按計畫', x0 + cw / 2, y1 + 12, '#475569', 9, true, 'center')
  lbl(ctx, '沒按計畫', x0 + cw + 8 + cw / 2, y1 + 12, '#475569', 9, true, 'center')
  lbl(ctx, '覆盤先問：結果來自能力還是運氣？', W * 0.06, H * 0.08, '#1e1b4b', 11, true)
}

// ══ 高09 建立系統 ══

// 三圓交集
function drawSystemDefinitionFramework(ctx: CanvasRenderingContext2D, W: number, H: number) {
  const cx = W / 2, cy = H * 0.5, r = Math.min(W, H) * 0.26
  const circles: Array<[number, number, string, string]> = [
    [cx, cy - r * 0.6, '可複製', '#ef4444'],
    [cx - r * 0.6, cy + r * 0.5, '可檢驗', '#2563eb'],
    [cx + r * 0.6, cy + r * 0.5, '有邊界', '#16a34a'],
  ]
  circles.forEach(([x, y, t, color]) => {
    ctx.fillStyle = color + '18'; ctx.strokeStyle = color as string; ctx.lineWidth = 1.8
    ctx.beginPath(); ctx.arc(x as number, y as number, r, 0, Math.PI * 2); ctx.fill(); ctx.stroke()
    const dx = (x as number) - cx, dy = (y as number) - cy
    const len = Math.hypot(dx, dy) || 1
    lbl(ctx, t as string, (x as number) + dx / len * r * 0.7, (y as number) + dy / len * r * 0.7, color as string, 10.5, true, 'center')
  })
  lbl(ctx, '交易系統', cx, cy, '#1e1b4b', 11, true, 'center')
  lbl(ctx, '系統＝一組你願意持續遵守的規則', W * 0.07, H * 0.08, '#1e1b4b', 11, true)
}

// 六模組循環
function drawPersonalSystemSixModules(ctx: CanvasRenderingContext2D, W: number, H: number) {
  const x0 = W * 0.07, x1 = W * 0.93
  const cw = (x1 - x0 - 24) / 3, ch = H * 0.26
  const mods: Array<[string, string]> = [
    ['選股條件', '高1'], ['進場規則', '高2'], ['出場規則', '高3'],
    ['資金配置', '高4'], ['停損規則', '高5'], ['覆盤節奏', '高7'],
  ]
  mods.forEach(([t, d], i) => {
    const cx = x0 + (i % 3) * (cw + 12)
    const cy = H * 0.22 + Math.floor(i / 3) * (ch + 14)
    boxRect(ctx, cx, cy, cw, ch, i < 3 ? '#eef2ff' : '#f0fdf4', i < 3 ? '#c7d2fe' : '#86efac')
    lbl(ctx, t, cx + cw / 2, cy + ch * 0.38, '#1e1b4b', 10, true, 'center')
    lbl(ctx, d, cx + cw / 2, cy + ch * 0.72, '#7c3aed', 9, true, 'center')
  })
  lbl(ctx, '個人交易手冊 = 六個模組', W * 0.07, H * 0.07, '#1e1b4b', 11.5, true)
  lbl(ctx, '把前八堂的內容，對應寫進這六頁', W * 0.07, H * 0.96, '#94a3b8', 8.5)
}

// 模糊 vs 具體
function drawRuleSpecificityComparison(ctx: CanvasRenderingContext2D, W: number, H: number) {
  const x0 = W * 0.07, x1 = W * 0.93
  const cw = (x1 - x0 - 12) / 2, y0 = H * 0.2, ch = H * 0.62
  boxRect(ctx, x0, y0, cw, ch, '#fef2f2', '#fecaca')
  boxRect(ctx, x0 + cw + 12, y0, cw, ch, '#f0fdf4', '#86efac')
  lbl(ctx, '✗ 模糊版（無法執行）', x0 + cw / 2, y0 + ch * 0.12, '#b91c1c', 10, true, 'center')
  const vague = ['「均線向上就進場」', '「跌太多就停損」', '「感覺不對就出場」']
  vague.forEach((t, i) => lbl(ctx, t, x0 + 12, y0 + ch * (0.32 + i * 0.2), '#7f1d1d', 9, false))
  lbl(ctx, '✓ 具體版（可執行）', x0 + cw + 12 + cw / 2, y0 + ch * 0.12, '#15803d', 10, true, 'center')
  const exact = ['20MA向上+股價在上+量1.5倍', '收盤破進場價-8%隔日出', '高量長黑破前低→出場']
  exact.forEach((t, i) => lbl(ctx, t, x0 + cw + 22, y0 + ch * (0.32 + i * 0.2), '#14532d', 8.5, false))
  lbl(ctx, '規則寫不清楚，等於沒有規則', W * 0.07, H * 0.07, '#1e1b4b', 11.5, true)
}

// 週期→系統設定 號誌
function drawCycleSystemSettingsMap(ctx: CanvasRenderingContext2D, W: number, H: number) {
  const x0 = W * 0.07, x1 = W * 0.93
  const cw = (x1 - x0 - 20) / 3, y0 = H * 0.2, ch = H * 0.56
  const cols: Array<[string, string, string, string]> = [
    ['🟢 多頭', '條件放寬', '部位 8 成', '#16a34a'],
    ['🟡 整理', '只做高確定', '部位 3–5 成', '#f59e0b'],
    ['🔴 空頭', '條件嚴格', '部位 3–4 成', '#ef4444'],
  ]
  cols.forEach(([t, c1, c2, color], i) => {
    const cx = x0 + i * (cw + 10)
    boxRect(ctx, cx, y0, cw, ch, '#fff', color)
    lbl(ctx, t, cx + cw / 2, y0 + ch * 0.18, color, 11, true, 'center')
    lbl(ctx, c1, cx + cw / 2, y0 + ch * 0.48, '#475569', 9, false, 'center')
    lbl(ctx, c2, cx + cw / 2, y0 + ch * 0.72, '#1e1b4b', 9.5, true, 'center')
  })
  lbl(ctx, '週期 → 系統設定：手冊最容易漏、最重要的一頁', W * 0.07, H * 0.07, '#1e1b4b', 10.5, true)
  lbl(ctx, '沒這頁，空頭期會繼續用多頭方式操作，直到帳戶受傷', W * 0.07, H * 0.95, '#94a3b8', 8.5)
}

// 系統迭代圓
function drawSystemIterationCycle(ctx: CanvasRenderingContext2D, W: number, H: number) {
  const cx = W / 2, cy = H * 0.56, r = Math.min(W, H) * 0.3
  const nodes = ['v1.0 上線', '真實跑 3 個月', '覆盤歸因', 'v2.0 修訂']
  const n = nodes.length
  nodes.forEach((t, i) => {
    const a = -Math.PI / 2 + (i / n) * Math.PI * 2
    const x = cx + r * Math.cos(a), y = cy + r * Math.sin(a)
    boxRect(ctx, x - W * 0.13, y - 14, W * 0.26, 28, '#eef2ff', '#7c3aed')
    lbl(ctx, t, x, y, '#1e1b4b', 9.5, true, 'center')
    // 弧形箭頭到下一節點
    const a2 = -Math.PI / 2 + ((i + 1) / n) * Math.PI * 2
    const mx = cx + r * 1.0 * Math.cos((a + a2) / 2), my = cy + r * 1.0 * Math.sin((a + a2) / 2)
    arrow(ctx, x + r * 0.3 * Math.cos(a + 1.3), y + r * 0.3 * Math.sin(a + 1.3), mx, my, '#94a3b8', 1.2)
  })
  lbl(ctx, '個人系統', cx, cy, '#7c3aed', 10.5, true, 'center')
  lbl(ctx, '系統不是寫完就固定，會隨你成長更新', W * 0.07, H * 0.08, '#1e1b4b', 11, true)
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
  'macd-histogram': drawMacdHistogram,
  'macd-convergence': drawMacdConvergence,
  'macd-divergence': drawMacdDivergence,
  'macd-zeroline': drawMacdZeroline,
  'bollinger-structure': drawBollingerStructure,
  'bollinger-squeeze': drawBollingerSqueeze,
  'bollinger-expansion': drawBollingerExpansion,
  'bollinger-ma-confirm': drawBollingerMaConfirm,
  'volume-price-matrix': drawVolumePriceMatrix,
  'volume-climax': drawVolumeClimax,
  'volume-reversal-bottom': drawVolumeReversalBottom,
  'volume-divergence': drawVolumeDivergence,
  'multi-indicator-overview': drawMultiIndicatorOverview,
  'multi-kd-signal': drawMultiKdSignal,
  'multi-macd-signal': drawMultiMacdSignal,
  'multi-volume-confirm': drawMultiVolumeConfirm,
  'multi-indicator-checklist': drawMultiIndicatorChecklist,
  'timeframe-hierarchy': drawTimeframeHierarchy,
  'weekly-filter': drawWeeklyFilter,
  'monthly-cycle': drawMonthlyCycle,
  'triple-timeframe-confluence': drawTripleTimeframeConfluence,
  'weekly-pullback-entry': drawWeeklyPullbackEntry,
  'stock-screen-funnel': drawStockScreenFunnel,
  'market-environment-gauge': drawMarketEnvironmentGauge,
  'sector-rotation-map': drawSectorRotationMap,
  'stock-technical-checklist': drawStockTechnicalChecklist,
  'watchlist-weekly-workflow': drawWatchlistWeeklyWorkflow,
  'trade-plan-template': drawTradePlanTemplate,
  'stock-screen-flow': drawStockScreenFlow,
  'market-cycle-phase': drawMarketCyclePhase,
  'stock-screen-criteria': drawStockScreenCriteria,
  'entry-signal-multi': drawEntrySignalMulti,
  'entry-signal-tech-confirm': drawEntrySignalTechConfirm,
  'entry-signal-checklist': drawEntrySignalChecklist,
  'exit-target': drawExitTarget,
  'exit-trailing': drawExitTrailing,
  'position-sizing': drawPositionSizing,
  'position-pyramid': drawPositionPyramid,
  'psychology-cycle': drawPsychologyCycle,
  'journal-template': drawJournalTemplate,
  'system-definition-framework': drawSystemDefinitionFramework,
  'personal-system-six-modules': drawPersonalSystemSixModules,
  'rule-specificity-comparison': drawRuleSpecificityComparison,
  'cycle-system-settings-map': drawCycleSystemSettingsMap,
  'system-iteration-cycle': drawSystemIterationCycle,
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
