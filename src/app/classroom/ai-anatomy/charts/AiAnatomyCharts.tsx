// 📄 路徑：src/app/classroom/ai-anatomy/charts/AiAnatomyCharts.tsx
import React from 'react';
import type { SlideChart } from '../courses';
import { renderAiChart as renderS1Chart } from '../../ai/charts/AiCharts';

function NeuralNetworkChart() {
  const layers = [
    { label: '輸入層', nodes: 3, color: '#7c3aed' },
    { label: '隱藏層1', nodes: 4, color: '#2563eb' },
    { label: '隱藏層2', nodes: 4, color: '#0891b2' },
    { label: '輸出層', nodes: 2, color: '#16a34a' },
  ];
  const W = 300, H = 180;
  const xStep = W / (layers.length + 1);
  const positions = layers.map((l, li) => {
    const x = xStep * (li + 1);
    return Array.from({ length: l.nodes }, (_, ni) => ({
      x, y: (H / (l.nodes + 1)) * (ni + 1), color: l.color,
    }));
  });
  return (
    <svg viewBox={`0 0 ${W} ${H + 20}`} style={{ width: '100%', maxWidth: 320, display: 'block', margin: '0 auto' }}>
      {positions.slice(0, -1).map((layerNodes, li) =>
        layerNodes.flatMap((from, fi) =>
          positions[li + 1].map((to, ti) => (
            <line key={`e-${li}-${fi}-${ti}`} x1={from.x} y1={from.y} x2={to.x} y2={to.y} stroke="#e5e7eb" strokeWidth="0.8" />
          ))
        )
      )}
      {positions.map((layerNodes, li) =>
        layerNodes.map((n, ni) => (
          <circle key={`n-${li}-${ni}`} cx={n.x} cy={n.y} r={7} fill={n.color} opacity={0.85} />
        ))
      )}
      {layers.map((l, li) => (
        <text key={`lbl-${li}`} x={xStep * (li + 1)} y={H + 16} textAnchor="middle" fontSize="7.5" fill="#6b7280">{l.label}</text>
      ))}
    </svg>
  );
}

function ParameterScaleChart() {
  const items = [
    { label: '1B', r: 10, color: '#a5f3fc' },
    { label: '7B', r: 20, color: '#7c3aed' },
    { label: '70B', r: 36, color: '#2563eb' },
    { label: '175B', r: 54, color: '#0891b2' },
  ];
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: '1.2rem', padding: '0.5rem 0 0.8rem' }}>
      {items.map(item => (
        <div key={item.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.3rem' }}>
          <div style={{ width: item.r * 2, height: item.r * 2, borderRadius: '50%', background: item.color, opacity: 0.85 }} />
          <span style={{ fontSize: '0.68rem', color: '#374151', fontWeight: 600 }}>{item.label}</span>
        </div>
      ))}
    </div>
  );
}

function TransformerBlockChart() {
  const blocks = [
    { label: 'Input', bg: '#f3f4f6', color: '#374151' },
    { label: 'Multi-Head Attention', bg: '#ede9fe', color: '#7c3aed' },
    { label: 'Add & Norm', bg: '#dbeafe', color: '#1d4ed8' },
    { label: 'Feed Forward', bg: '#dcfce7', color: '#15803d' },
    { label: 'Add & Norm', bg: '#dbeafe', color: '#1d4ed8' },
    { label: 'Output', bg: '#f3f4f6', color: '#374151' },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', maxWidth: 200, margin: '0 auto' }}>
      {blocks.map((b, i) => (
        <React.Fragment key={i}>
          {i > 0 && <div style={{ width: 1, height: 8, background: '#9ca3af' }} />}
          <div style={{ background: b.bg, color: b.color, borderRadius: 6, padding: '4px 14px', fontSize: '0.7rem', fontWeight: 600, textAlign: 'center', width: '100%' }}>
            {b.label}
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}

function AttentionMapChart() {
  const tokens = ['我', '喜歡', '吃', '蘋果'];
  const weights = [
    [0.9, 0.05, 0.03, 0.02],
    [0.1, 0.7,  0.1,  0.1 ],
    [0.05,0.1,  0.8,  0.05],
    [0.1, 0.05, 0.15, 0.7 ],
  ];
  const cellSize = 34, offset = 26;
  return (
    <svg viewBox={`0 0 ${offset + cellSize * 4 + 4} ${offset + cellSize * 4 + 4}`}
      style={{ width: '100%', maxWidth: 190, display: 'block', margin: '0 auto' }}>
      {tokens.map((t, i) => (
        <text key={`c${i}`} x={offset + i * cellSize + cellSize / 2} y={13} textAnchor="middle" fontSize="7.5" fill="#374151">{t}</text>
      ))}
      {tokens.map((t, i) => (
        <text key={`r${i}`} x={offset - 3} y={offset + i * cellSize + cellSize / 2 + 3} textAnchor="end" fontSize="7.5" fill="#374151">{t}</text>
      ))}
      {weights.map((row, ri) =>
        row.map((w, ci) => (
          <rect key={`cell-${ri}-${ci}`}
            x={offset + ci * cellSize} y={offset + ri * cellSize}
            width={cellSize - 2} height={cellSize - 2} rx={3}
            fill={`rgba(124,58,237,${w})`} />
        ))
      )}
    </svg>
  );
}

function DistillationFlowChart() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.8rem', padding: '0.4rem 0' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ width: 62, height: 62, borderRadius: '50%', background: 'rgba(124,58,237,0.12)', border: '2px solid #7c3aed', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto', fontSize: '0.6rem', color: '#7c3aed', fontWeight: 700, lineHeight: 1.3 }}>
          Teacher<br/>Model
        </div>
        <div style={{ fontSize: '0.62rem', color: '#6b7280', marginTop: '0.25rem' }}>大模型</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1px' }}>
        <div style={{ fontSize: '0.6rem', color: '#9ca3af' }}>知識蒸餾</div>
        <div style={{ fontSize: '1.3rem', color: '#7c3aed', lineHeight: 1 }}>→</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(37,99,235,0.1)', border: '2px solid #2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto', fontSize: '0.58rem', color: '#2563eb', fontWeight: 700, lineHeight: 1.3 }}>
          Student
        </div>
        <div style={{ fontSize: '0.62rem', color: '#6b7280', marginTop: '0.25rem' }}>小模型</div>
      </div>
    </div>
  );
}

export function renderAiAnatomyChart(chart: SlideChart): React.ReactNode {
  switch (chart.type) {
    case 'neural-network':    return <NeuralNetworkChart />;
    case 'parameter-scale':   return <ParameterScaleChart />;
    case 'transformer-block': return <TransformerBlockChart />;
    case 'attention-map':     return <AttentionMapChart />;
    case 'distillation-flow': return <DistillationFlowChart />;
    default:                  return renderS1Chart(chart);
  }
}
