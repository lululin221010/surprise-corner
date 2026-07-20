// 📄 路徑：src/app/classroom/ai-robot/charts/AiRobotCharts.tsx
import React from 'react';
import type { SlideChart } from '../courses';

function WheelTypesChart() {
  const rows = [
    { type: '普通輪（兩輪差速）', move: '左右輪速度差 = 轉彎', use: '掃地機器人' },
    { type: '全向輪（Omni Wheel）', move: '可以橫向移動，不需要轉身', use: '倉儲機器人' },
    { type: '履帶', move: '抓地力強，可過崎嶇地形', use: '軍用/搜救機器人' },
  ];
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.78rem' }}>
        <thead>
          <tr style={{ background: '#16a34a', color: '#fff' }}>
            <th style={{ padding: '0.5rem 0.6rem', textAlign: 'left', borderRadius: '8px 0 0 0' }}>輪子類型</th>
            <th style={{ padding: '0.5rem 0.6rem', textAlign: 'left' }}>移動方式</th>
            <th style={{ padding: '0.5rem 0.6rem', textAlign: 'left', borderRadius: '0 8px 0 0' }}>適合場景</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={r.type} style={{ background: i % 2 === 0 ? '#f0fdf4' : '#fff' }}>
              <td style={{ padding: '0.5rem 0.6rem', fontWeight: 700, color: '#166534', borderBottom: '1px solid #e5e7eb' }}>{r.type}</td>
              <td style={{ padding: '0.5rem 0.6rem', color: '#374151', borderBottom: '1px solid #e5e7eb' }}>{r.move}</td>
              <td style={{ padding: '0.5rem 0.6rem', color: '#374151', borderBottom: '1px solid #e5e7eb' }}>{r.use}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function VacuumSummaryChart() {
  const rows = [
    { action: '感知房間環境', concept: '感測器（LiDAR/超聲波/紅外線）' },
    { action: '建立房間地圖', concept: 'SLAM定位（第6堂）' },
    { action: '規劃掃地路線', concept: '路徑規劃演算法' },
    { action: '移動和轉向', concept: 'DC馬達+輪子（第3堂執行器）' },
    { action: '不掉下樓梯', concept: '懸崖感測器 + 停止指令' },
    { action: '撞到東西停下', concept: '碰撞感測器（第7堂安全設計）' },
    { action: '找回充電座', concept: '紅外線訊號引導' },
    { action: '保持直線行進', concept: '里程計+控制迴路（第4堂平衡控制的簡化版）' },
  ];
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.76rem' }}>
        <thead>
          <tr>
            <th style={{ padding: '0.4rem 0.6rem', textAlign: 'left', background: '#ede9fe', color: '#5b21b6', borderRadius: '8px 0 0 0' }}>動作</th>
            <th style={{ padding: '0.4rem 0.6rem', textAlign: 'left', background: '#ede9fe', color: '#5b21b6', borderRadius: '0 8px 0 0' }}>用到的概念</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={r.action} style={{ background: i % 2 === 0 ? '#faf5ff' : '#fff' }}>
              <td style={{ padding: '0.4rem 0.6rem', fontWeight: 700, color: '#374151', borderBottom: '1px solid #e5e7eb' }}>{r.action}</td>
              <td style={{ padding: '0.4rem 0.6rem', color: '#4b5563', borderBottom: '1px solid #e5e7eb' }}>{r.concept}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function PowerConsumptionChart() {
  const rows = [
    { type: '掃地機器人', power: '20-40W', battery: '約60Wh', duration: '1.5-3小時' },
    { type: '倉儲搬運機器人', power: '500-2000W', battery: '約40kWh', duration: '8小時（換電池）' },
    { type: '雙足人形機器人（研究級）', power: '2000-5000W', battery: '約1kWh', duration: '0.5-1小時' },
    { type: '協作機器人手臂', power: '200-500W', battery: '有線供電（不用電池）', duration: '無限制' },
  ];
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.74rem' }}>
        <thead>
          <tr style={{ background: '#dc2626', color: '#fff' }}>
            <th style={{ padding: '0.5rem 0.5rem', textAlign: 'left', borderRadius: '8px 0 0 0' }}>機器人類型</th>
            <th style={{ padding: '0.5rem 0.5rem', textAlign: 'left' }}>典型功耗</th>
            <th style={{ padding: '0.5rem 0.5rem', textAlign: 'left' }}>電池容量</th>
            <th style={{ padding: '0.5rem 0.5rem', textAlign: 'left', borderRadius: '0 8px 0 0' }}>續航時間</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={r.type} style={{ background: i % 2 === 0 ? '#fef2f2' : '#fff' }}>
              <td style={{ padding: '0.5rem 0.5rem', fontWeight: 700, color: '#991b1b', borderBottom: '1px solid #e5e7eb' }}>{r.type}</td>
              <td style={{ padding: '0.5rem 0.5rem', color: '#374151', borderBottom: '1px solid #e5e7eb' }}>{r.power}</td>
              <td style={{ padding: '0.5rem 0.5rem', color: '#374151', borderBottom: '1px solid #e5e7eb' }}>{r.battery}</td>
              <td style={{ padding: '0.5rem 0.5rem', color: '#374151', borderBottom: '1px solid #e5e7eb' }}>{r.duration}</td>
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

export function renderAiRobotChart(chart: SlideChart): React.ReactNode {
  switch (chart.type) {
    case 'wheel-types':       return <WheelTypesChart />;
    case 'vacuum-summary':    return <VacuumSummaryChart />;
    case 'power-consumption': return <PowerConsumptionChart />;
    case 'svg-figure':        return <SvgFigure file={String(chart.config?.file ?? '')} />;
    default: return null;
  }
}
