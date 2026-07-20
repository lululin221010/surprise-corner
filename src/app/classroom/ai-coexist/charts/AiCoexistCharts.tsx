// 📄 路徑：src/app/classroom/ai-coexist/charts/AiCoexistCharts.tsx
import React from 'react';
import type { SlideChart } from '../courses';

function SvgFigure({ file }: { file: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={`/images/course-figures/${file}`} alt=""
      style={{ width: '100%', maxWidth: 560, display: 'block', margin: '0 auto' }} />
  );
}

export function renderAiCoexistChart(chart: SlideChart): React.ReactNode {
  switch (chart.type) {
    case 'svg-figure': return <SvgFigure file={String(chart.config?.file ?? '')} />;
    default: return null;
  }
}
