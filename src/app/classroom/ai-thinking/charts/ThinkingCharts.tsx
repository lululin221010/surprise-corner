// 📄 路徑：src/app/classroom/ai-thinking/charts/ThinkingCharts.tsx
import React from 'react';
import type { SlideChart } from '../courses';

function HumanVsAiThinkingChart() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', padding: '0.6rem 0' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.3rem' }}>
        <div style={{ fontSize: '1.6rem' }}>🤖</div>
        <div style={{ background: 'rgba(8,145,178,0.1)', border: '1px solid rgba(8,145,178,0.3)', borderRadius: '10px', padding: '0.5rem 0.7rem', fontSize: '0.68rem', color: '#0e7490', fontWeight: 700, textAlign: 'center', lineHeight: 1.5 }}>
          預測<br/>下一個字
        </div>
      </div>
      <div style={{ fontSize: '1.1rem', color: '#9ca3af' }}>vs</div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.3rem' }}>
        <div style={{ fontSize: '1.6rem' }}>🧑</div>
        <div style={{ background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.25)', borderRadius: '10px', padding: '0.5rem 0.7rem', fontSize: '0.68rem', color: '#5b21b6', fontWeight: 700, textAlign: 'center', lineHeight: 1.5 }}>
          理解 → 組織<br/>→ 表達
        </div>
      </div>
    </div>
  );
}

export function renderThinkingChart(chart: SlideChart): React.ReactNode {
  switch (chart.type) {
    case 'human-vs-ai-thinking': return <HumanVsAiThinkingChart />;
    default: return null;
  }
}
