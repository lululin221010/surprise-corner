// 📄 路徑：src/app/classroom/ai-communication/charts/AiCommunicationCharts.tsx
import React from 'react';
import type { SlideChart } from '../courses';

function SimpleTable({ headers, rows, headerBg, headerColor }: { headers: string[]; rows: string[][]; headerBg: string; headerColor: string }) {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.74rem' }}>
        <thead>
          <tr style={{ background: headerBg, color: headerColor }}>
            {headers.map((h, i) => (
              <th key={h} style={{ padding: '0.45rem 0.5rem', textAlign: 'left', borderRadius: i === 0 ? '8px 0 0 0' : i === headers.length - 1 ? '0 8px 0 0' : undefined }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} style={{ background: ri % 2 === 0 ? '#f9fafb' : '#fff' }}>
              {row.map((cell, ci) => (
                <td key={ci} style={{ padding: '0.45rem 0.5rem', color: ci === 0 ? '#1e1b4b' : '#374151', fontWeight: ci === 0 ? 700 : 400, borderBottom: '1px solid #e5e7eb' }}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function MemoryMethodsCompare() {
  return (
    <SimpleTable
      headerBg="#7c3aed" headerColor="#fff"
      headers={['做法', '記錄什麼', '查詢方式', '適合用途']}
      rows={[
        ['關鍵事實提取', '使用者的基本資訊、偏好', '直接帶入', '個人化設定、使用者背景'],
        ['摘要記憶庫', '對話的精華大意', '關鍵字或向量', '長期專案追蹤、服務記錄'],
        ['向量資料庫', '全文、文件片段', '語意搜索', '大量資料的智慧查詢（RAG）'],
      ]}
    />
  );
}

function RagVsFinetune() {
  return (
    <SimpleTable
      headerBg="#2563eb" headerColor="#fff"
      headers={['比較', 'RAG', '微調（Fine-tuning）']}
      rows={[
        ['做法', '即時查詢外部資料庫', '把資料「訓練進」模型參數'],
        ['更新資料', '加入資料庫，馬上生效', '需要重新訓練'],
        ['可解釋性', '能引用具體來源', '來源隱含在模型裡，不易追蹤'],
        ['成本', '較低（運算成本在查詢時）', '較高（訓練成本）'],
        ['適合', '即時更新的知識庫、個人文件', '特定風格或任務的固化能力'],
      ]}
    />
  );
}

function ModelMemoryCompare() {
  return (
    <SimpleTable
      headerBg="#0891b2" headerColor="#fff"
      headers={['維度', 'ChatGPT', 'Claude', 'Gemini', 'Copilot']}
      rows={[
        ['記憶透明度', '高（條目可見）', '中（可查看概覽）', '中（依授權範圍）', '低（情境感知為主）'],
        ['使用者控制', '高（可手動管理）', '中高（可設定）', '中（依Google設定）', '低（企業IT管理）'],
        ['整合廣度', '獨立（GPTs分開）', 'Projects為主', 'Google生態', 'Microsoft 365'],
        ['適合情境', '個人偏好管理', '長期任務工作流', 'Google生態用戶', '企業Microsoft用戶'],
      ]}
    />
  );
}

function SvgFigure({ file }: { file: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={`/images/course-figures/${file}`} alt=""
      style={{ width: '100%', maxWidth: 560, display: 'block', margin: '0 auto' }} />
  );
}

export function renderAiCommunicationChart(chart: SlideChart): React.ReactNode {
  switch (chart.type) {
    case 'memory-methods-compare': return <MemoryMethodsCompare />;
    case 'rag-vs-finetune':        return <RagVsFinetune />;
    case 'model-memory-compare':   return <ModelMemoryCompare />;
    case 'svg-figure':             return <SvgFigure file={String(chart.config?.file ?? '')} />;
    default: return null;
  }
}
