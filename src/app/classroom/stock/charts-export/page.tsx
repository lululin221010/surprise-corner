'use client'
// 圖殼匯出頁：全部進階+高階圖殼，一鍵打包成 ZIP（每張獨立 PNG，檔名=序號_圖名）
import { useEffect, useRef, useState } from 'react'
import { ADVANCED_CHART_TYPES, drawAdvancedChart } from '../charts/AdvancedCharts'

const CW = 560, CH = 320, DPR = 2

export default function ChartsExportPage() {
  const refs = useRef<(HTMLCanvasElement | null)[]>([])
  const [busy, setBusy] = useState(false)
  const [done, setDone] = useState('')

  useEffect(() => {
    refs.current.forEach((cv, i) => {
      if (!cv) return
      cv.width = CW * DPR
      cv.height = CH * DPR
      const ctx = cv.getContext('2d')
      if (!ctx) return
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0)
      drawAdvancedChart(ctx, ADVANCED_CHART_TYPES[i], CW, CH)
    })
  }, [])

  function canvasToBlob(cv: HTMLCanvasElement): Promise<Blob | null> {
    return new Promise(res => cv.toBlob(b => res(b), 'image/png'))
  }

  async function downloadZip() {
    setBusy(true); setDone('')
    const JSZip = (await import('jszip')).default
    const zip = new JSZip()
    for (let i = 0; i < ADVANCED_CHART_TYPES.length; i++) {
      const cv = refs.current[i]
      if (!cv) continue
      const blob = await canvasToBlob(cv)
      if (blob) zip.file(`${String(i + 1).padStart(2, '0')}_${ADVANCED_CHART_TYPES[i]}.png`, blob)
    }
    const out = await zip.generateAsync({ type: 'blob' })
    const url = URL.createObjectURL(out)
    const a = document.createElement('a')
    a.href = url
    a.download = '股市圖殼_全部.zip'
    a.click()
    URL.revokeObjectURL(url)
    setBusy(false); setDone(`✅ 已下載 ${ADVANCED_CHART_TYPES.length} 張`)
  }

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: '1rem', background: '#f8fafc' }}>
      <div style={{ position: 'sticky', top: 0, background: '#f8fafc', padding: '0.6rem 0', zIndex: 10 }}>
        <h1 style={{ fontSize: '1rem', color: '#1e1b4b', margin: '0 0 0.5rem' }}>
          進階+高階圖殼匯出（{ADVANCED_CHART_TYPES.length} 張）
        </h1>
        <button
          onClick={downloadZip}
          disabled={busy}
          style={{
            background: busy ? '#94a3b8' : '#7c3aed', color: '#fff', border: 'none',
            borderRadius: 8, padding: '10px 18px', fontSize: '0.9rem', fontWeight: 700,
            cursor: busy ? 'default' : 'pointer',
          }}
        >
          {busy ? '打包中…' : '⬇ 下載全部 ZIP（每張獨立 PNG）'}
        </button>
        {done && <span style={{ marginLeft: 10, color: '#16a34a', fontSize: '0.82rem' }}>{done}</span>}
      </div>
      {ADVANCED_CHART_TYPES.map((type, i) => (
        <div key={type} style={{ marginBottom: '1rem' }}>
          <div style={{ fontSize: '0.78rem', color: '#7c3aed', fontWeight: 700, marginBottom: 3 }}>
            {String(i + 1).padStart(2, '0')}. {type}
          </div>
          <canvas
            ref={el => { refs.current[i] = el }}
            style={{ width: CW, height: CH, maxWidth: '100%', border: '1px solid #e5e7eb', borderRadius: 8, display: 'block' }}
          />
        </div>
      ))}
    </div>
  )
}
