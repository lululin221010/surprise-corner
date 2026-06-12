'use client'
// 進階圖殼總覽（QA 用，無入口連結）：/classroom/stock/charts-test
import AdvancedChart, { ADVANCED_CHART_TYPES } from '../charts/AdvancedCharts'

export default function ChartsTestPage() {
  return (
    <div style={{ maxWidth: 480, margin: '0 auto', padding: '1rem', background: '#f8fafc' }}>
      <h1 style={{ fontSize: '1rem', color: '#1e1b4b', marginBottom: '1rem' }}>
        進階圖殼總覽（{ADVANCED_CHART_TYPES.length} 張）
      </h1>
      {ADVANCED_CHART_TYPES.map(type => (
        <div key={type} style={{ marginBottom: '1.5rem' }}>
          <div style={{ fontSize: '0.78rem', color: '#7c3aed', fontWeight: 700, marginBottom: 4 }}>{type}</div>
          <div style={{ border: '1px solid #e5e7eb', borderRadius: 10 }}>
            <AdvancedChart type={type} />
          </div>
        </div>
      ))}
    </div>
  )
}
