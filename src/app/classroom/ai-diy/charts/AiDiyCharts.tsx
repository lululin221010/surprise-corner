// 📄 路徑：src/app/classroom/ai-diy/charts/AiDiyCharts.tsx
import React from 'react';
import type { SlideChart } from '../courses';

function RamModelTable() {
  const rows = [
    { ram: '8GB', model: '小型模型（1-3B參數）', note: '能跑，但慢，且能力有限', color: '#fee2e2' },
    { ram: '16GB', model: '中型模型（7B參數）', note: '入門標準，堪用', color: '#fef3c7' },
    { ram: '32GB', model: '大型模型（13B參數）', note: '流暢，推薦', color: '#dcfce7' },
    { ram: '64GB以上', model: '超大模型（34B+）', note: '接近雲端模型能力', color: '#dbeafe' },
  ];
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.78rem' }}>
        <thead>
          <tr style={{ background: '#164e63', color: '#fff' }}>
            <th style={{ padding: '0.5rem 0.6rem', textAlign: 'left', borderRadius: '8px 0 0 0' }}>RAM大小</th>
            <th style={{ padding: '0.5rem 0.6rem', textAlign: 'left' }}>能跑的模型</th>
            <th style={{ padding: '0.5rem 0.6rem', textAlign: 'left', borderRadius: '0 8px 0 0' }}>體驗</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={r.ram} style={{ background: r.color }}>
              <td style={{ padding: '0.5rem 0.6rem', fontWeight: 700, color: '#164e63', borderBottom: i < rows.length - 1 ? '1px solid #fff' : 'none' }}>{r.ram}</td>
              <td style={{ padding: '0.5rem 0.6rem', color: '#374151', borderBottom: i < rows.length - 1 ? '1px solid #fff' : 'none' }}>{r.model}</td>
              <td style={{ padding: '0.5rem 0.6rem', color: '#374151', borderBottom: i < rows.length - 1 ? '1px solid #fff' : 'none' }}>{r.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function LocalVsCloudChart() {
  const rows = [
    { dim: '隱私', local: '✅ 完全掌控', cloud: '⚠️ 依賴對方政策' },
    { dim: '速度', local: '⚠️ 取決於硬體', cloud: '✅ 通常較快' },
    { dim: '成本', local: '✅ 省月費', cloud: '⚠️ 持續支出' },
    { dim: '能力', local: '⚠️ 有限', cloud: '✅ 頂尖模型更強' },
    { dim: '維護', local: '⚠️ 自己來', cloud: '✅ 對方負責' },
  ];
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.78rem' }}>
        <thead>
          <tr>
            <th style={{ padding: '0.5rem 0.6rem', textAlign: 'left', color: '#6b7280' }}>維度</th>
            <th style={{ padding: '0.5rem 0.6rem', textAlign: 'left', background: '#dbeafe', color: '#1d4ed8', borderRadius: '8px 8px 0 0' }}>🔵 本地AI</th>
            <th style={{ padding: '0.5rem 0.6rem', textAlign: 'left', background: '#cffafe', color: '#0e7490', borderRadius: '8px 8px 0 0' }}>☁️ 雲端AI</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={r.dim}>
              <td style={{ padding: '0.5rem 0.6rem', fontWeight: 700, color: '#374151', borderTop: '1px solid #e5e7eb' }}>{r.dim}</td>
              <td style={{ padding: '0.5rem 0.6rem', background: '#eff6ff', color: '#1e3a8a', borderTop: '1px solid #e5e7eb' }}>{r.local}</td>
              <td style={{ padding: '0.5rem 0.6rem', background: '#ecfeff', color: '#164e63', borderTop: '1px solid #e5e7eb' }}>{r.cloud}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SvgFigure({ file }: { file: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={`/images/course-figures/${file}`} alt=""
      style={{ width: '100%', maxWidth: 560, display: 'block', margin: '0 auto' }} />
  );
}

export function renderAiDiyChart(chart: SlideChart): React.ReactNode {
  switch (chart.type) {
    case 'ram-model-table': return <RamModelTable />;
    case 'local-vs-cloud':  return <LocalVsCloudChart />;
    case 'svg-figure':      return <SvgFigure file={String(chart.config?.file ?? '')} />;
    default: return null;
  }
}
