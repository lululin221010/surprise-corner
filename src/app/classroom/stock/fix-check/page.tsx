'use client'
// 臨時驗證頁（驗完即刪）：只放妹回饋要修的 4 張圖
import AdvancedChart from '../charts/AdvancedCharts'

const TYPES = ['stock-screen-flow', 'position-pyramid', 'system-iteration-cycle', 'exit-trailing']

export default function FixCheckPage() {
  return (
    <div style={{ maxWidth: 400, margin: '0 auto', padding: '0.5rem', background: '#f8fafc' }}>
      {TYPES.map(type => (
        <div key={type} style={{ marginBottom: '0.8rem' }}>
          <div style={{ fontSize: '0.75rem', color: '#7c3aed', fontWeight: 700, marginBottom: 2 }}>{type}</div>
          <div style={{ border: '1px solid #e5e7eb', borderRadius: 10 }}>
            <AdvancedChart type={type} />
          </div>
        </div>
      ))}
    </div>
  )
}
