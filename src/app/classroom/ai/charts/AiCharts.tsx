// 📄 路徑：src/app/classroom/ai/charts/AiCharts.tsx
// AI書院 — 所有圖表元件統一收錄

import type { SlideChart } from '../courses';

// ── 入門系列 ─────────────────────────────────────────────────

function AiHistoryTimeline() {
  return (
    <svg viewBox="0 0 560 200" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', borderRadius: 12, background: '#f8f7ff' }}>
      {/* 時間軸線 */}
      <line x1="50" y1="100" x2="510" y2="100" stroke="#c4b5fd" strokeWidth="3" />
      {/* 節點與標籤 */}
      {[
        { x: 80,  year: '1956', label: '達特茅斯\n會議', color: '#7c3aed' },
        { x: 160, year: '1970s', label: 'AI寒冬\n第一次', color: '#94a3b8' },
        { x: 240, year: '1997', label: '深藍\n打敗棋王', color: '#0ea5e9' },
        { x: 320, year: '2012', label: '深度學習\n突破', color: '#059669' },
        { x: 400, year: '2017', label: 'Transformer\n架構誕生', color: '#d97706' },
        { x: 480, year: '2022', label: 'ChatGPT\n引爆熱潮', color: '#dc2626' },
      ].map(({ x, year, label, color }) => (
        <g key={year}>
          <circle cx={x} cy="100" r="10" fill={color} />
          <text x={x} y="80" textAnchor="middle" fontSize="11" fontWeight="700" fill={color}>{year}</text>
          {label.split('\n').map((line, i) => (
            <text key={i} x={x} y={125 + i * 14} textAnchor="middle" fontSize="10" fill="#4b5563">{line}</text>
          ))}
        </g>
      ))}
      <text x="280" y="30" textAnchor="middle" fontSize="13" fontWeight="800" fill="#1e1b4b">AI 發展里程碑</text>
    </svg>
  );
}

function AiOverviewPipeline() {
  const stages = ['資料', '訓練', '對齊', '部署', '推論'];
  const colors = ['#7c3aed', '#0ea5e9', '#059669', '#d97706', '#dc2626'];
  const emojis = ['📦', '🏋️', '⚖️', '🚀', '⚙️'];
  const W = 560;
  const step = W / 5;
  return (
    <svg viewBox={`0 0 ${W} 140`} xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', borderRadius: 12, background: '#f8f7ff' }}>
      <text x="280" y="22" textAnchor="middle" fontSize="13" fontWeight="800" fill="#1e1b4b">AI 完整運作五階段</text>
      {stages.map((s, i) => {
        const cx = step * i + step / 2;
        return (
          <g key={s}>
            <rect x={cx - 40} y="38" width="80" height="64" rx="12" fill={colors[i]} opacity="0.12" />
            <rect x={cx - 40} y="38" width="80" height="64" rx="12" fill="none" stroke={colors[i]} strokeWidth="1.5" />
            <text x={cx} y="65" textAnchor="middle" fontSize="20">{emojis[i]}</text>
            <text x={cx} y="84" textAnchor="middle" fontSize="11" fontWeight="700" fill={colors[i]}>{s}</text>
            {i < 4 && (
              <text x={cx + 46} y="75" textAnchor="middle" fontSize="14" fill="#c4b5fd">→</text>
            )}
          </g>
        );
      })}
      <text x="280" y="122" textAnchor="middle" fontSize="10" fill="#9ca3af">持續循環・不斷迭代</text>
    </svg>
  );
}

function InferenceFlow() {
  const steps = [
    { label: '你的\n輸入', emoji: '💬', color: '#7c3aed' },
    { label: 'Token\n拆解', emoji: '🧩', color: '#0ea5e9' },
    { label: '參數\n運算', emoji: '⚙️', color: '#059669' },
    { label: '機率\n計算', emoji: '📊', color: '#d97706' },
    { label: '選字\n輸出', emoji: '✍️', color: '#dc2626' },
  ];
  const W = 560;
  const step = W / 5;
  return (
    <svg viewBox={`0 0 ${W} 150`} xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', borderRadius: 12, background: '#f8f7ff' }}>
      <text x="280" y="22" textAnchor="middle" fontSize="13" fontWeight="800" fill="#1e1b4b">推論過程（逐字重複）</text>
      {steps.map(({ label, emoji, color }, i) => {
        const cx = step * i + step / 2;
        return (
          <g key={i}>
            <circle cx={cx} cy="80" r="34" fill={color} opacity="0.12" />
            <circle cx={cx} cy="80" r="34" fill="none" stroke={color} strokeWidth="1.5" />
            <text x={cx} y="72" textAnchor="middle" fontSize="18">{emoji}</text>
            {label.split('\n').map((line, j) => (
              <text key={j} x={cx} y={90 + j * 13} textAnchor="middle" fontSize="10" fontWeight="600" fill={color}>{line}</text>
            ))}
            {i < 4 && <text x={cx + 38} y="85" textAnchor="middle" fontSize="13" fill="#c4b5fd">→</text>}
          </g>
        );
      })}
      <text x="280" y="135" textAnchor="middle" fontSize="10" fill="#9ca3af">每生成一個字，重複一次完整流程</text>
    </svg>
  );
}

function ModelCompare() {
  const models = [
    { name: 'GPT', kw: '全能外向', color: '#10b981' },
    { name: 'Claude', kw: '謹慎細膩', color: '#7c3aed' },
    { name: 'Gemini', kw: '生態整合', color: '#3b82f6' },
    { name: '開源', kw: '可客製化', color: '#f59e0b' },
  ];
  return (
    <svg viewBox="0 0 560 160" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', borderRadius: 12, background: '#f8f7ff' }}>
      <text x="280" y="22" textAnchor="middle" fontSize="13" fontWeight="800" fill="#1e1b4b">主流 AI 模型個性對比</text>
      {models.map(({ name, kw, color }, i) => {
        const x = 70 + i * 110;
        return (
          <g key={name}>
            <rect x={x - 44} y="35" width="88" height="95" rx="14" fill={color} opacity="0.1" />
            <rect x={x - 44} y="35" width="88" height="95" rx="14" fill="none" stroke={color} strokeWidth="1.5" />
            <text x={x} y="67" textAnchor="middle" fontSize="22">🤖</text>
            <text x={x} y="88" textAnchor="middle" fontSize="13" fontWeight="800" fill={color}>{name}</text>
            <text x={x} y="105" textAnchor="middle" fontSize="10" fill="#4b5563">{kw}</text>
          </g>
        );
      })}
      <text x="280" y="145" textAnchor="middle" fontSize="10" fill="#9ca3af">沒有絕對最強，要看使用情境</text>
    </svg>
  );
}

function ModelTier() {
  return (
    <svg viewBox="0 0 560 180" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', borderRadius: 12, background: '#f8f7ff' }}>
      <text x="280" y="22" textAnchor="middle" fontSize="13" fontWeight="800" fill="#1e1b4b">免費版 vs 付費版差異</text>
      {/* 免費 */}
      <rect x="40" y="38" width="220" height="120" rx="12" fill="#f0fdf4" stroke="#86efac" strokeWidth="1.5" />
      <text x="150" y="60" textAnchor="middle" fontSize="12" fontWeight="700" fill="#15803d">免費版 Free</text>
      {['較舊/較小的模型版本', '有使用次數上限', '上下文長度較短', '較慢的回應速度'].map((t, i) => (
        <text key={i} x="60" y={78 + i * 18} fontSize="10" fill="#166534">• {t}</text>
      ))}
      {/* 付費 */}
      <rect x="300" y="38" width="220" height="120" rx="12" fill="#faf5ff" stroke="#c4b5fd" strokeWidth="1.5" />
      <text x="410" y="60" textAnchor="middle" fontSize="12" fontWeight="700" fill="#7c3aed">付費版 Pro</text>
      {['最新/最強的模型版本', '更高甚至無限的額度', '更長的上下文', '穩定且快速的回應'].map((t, i) => (
        <text key={i} x="318" y={78 + i * 18} fontSize="10" fill="#4c1d95">• {t}</text>
      ))}
      <text x="280" y="175" textAnchor="middle" fontSize="10" fill="#9ca3af">輕量日常使用，免費版通常已足夠</text>
    </svg>
  );
}

function MultimodalFlow() {
  return (
    <svg viewBox="0 0 560 170" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', borderRadius: 12, background: '#f8f7ff' }}>
      <text x="280" y="22" textAnchor="middle" fontSize="13" fontWeight="800" fill="#1e1b4b">多模態處理流程</text>
      {/* 文字路徑 */}
      <rect x="30" y="50" width="90" height="50" rx="10" fill="#7c3aed" opacity="0.12" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="75" y="72" textAnchor="middle" fontSize="20">💬</text>
      <text x="75" y="90" textAnchor="middle" fontSize="10" fontWeight="700" fill="#7c3aed">文字輸入</text>
      {/* 圖片路徑 */}
      <rect x="30" y="110" width="90" height="50" rx="10" fill="#0ea5e9" opacity="0.12" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="75" y="132" textAnchor="middle" fontSize="20">🖼️</text>
      <text x="75" y="150" textAnchor="middle" fontSize="10" fontWeight="700" fill="#0ea5e9">圖片輸入</text>
      {/* 轉換 */}
      <text x="145" y="100" textAnchor="middle" fontSize="14" fill="#c4b5fd">→</text>
      <text x="145" y="140" textAnchor="middle" fontSize="14" fill="#c4b5fd">→</text>
      {/* 數字格式 */}
      <rect x="165" y="60" width="110" height="110" rx="14" fill="#059669" opacity="0.10" stroke="#059669" strokeWidth="1.5" />
      <text x="220" y="105" textAnchor="middle" fontSize="22">🔢</text>
      <text x="220" y="124" textAnchor="middle" fontSize="10" fontWeight="700" fill="#059669">轉換為</text>
      <text x="220" y="138" textAnchor="middle" fontSize="10" fill="#059669">數字格式</text>
      {/* → */}
      <text x="295" y="120" textAnchor="middle" fontSize="14" fill="#c4b5fd">→</text>
      {/* 參數運算 */}
      <rect x="310" y="60" width="110" height="110" rx="14" fill="#d97706" opacity="0.10" stroke="#d97706" strokeWidth="1.5" />
      <text x="365" y="105" textAnchor="middle" fontSize="22">⚙️</text>
      <text x="365" y="124" textAnchor="middle" fontSize="10" fontWeight="700" fill="#d97706">參數運算</text>
      <text x="365" y="138" textAnchor="middle" fontSize="10" fill="#d97706">統一處理</text>
      {/* → */}
      <text x="438" y="120" textAnchor="middle" fontSize="14" fill="#c4b5fd">→</text>
      {/* 文字輸出 */}
      <rect x="450" y="80" width="90" height="50" rx="10" fill="#dc2626" opacity="0.12" stroke="#dc2626" strokeWidth="1.5" />
      <text x="495" y="102" textAnchor="middle" fontSize="20">📝</text>
      <text x="495" y="120" textAnchor="middle" fontSize="10" fontWeight="700" fill="#dc2626">文字回答</text>
    </svg>
  );
}

function TokenNumber() {
  return (
    <svg viewBox="0 0 560 170" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', borderRadius: 12, background: '#f8f7ff' }}>
      <text x="280" y="22" textAnchor="middle" fontSize="13" fontWeight="800" fill="#1e1b4b">Token → 數字 的轉換橋樑</text>
      {/* 文字 */}
      <rect x="30" y="60" width="120" height="80" rx="12" fill="#7c3aed" opacity="0.10" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="90" y="88" textAnchor="middle" fontSize="18">💬</text>
      <text x="90" y="108" textAnchor="middle" fontSize="11" fontWeight="700" fill="#7c3aed">「台灣最高的</text>
      <text x="90" y="124" textAnchor="middle" fontSize="11" fontWeight="700" fill="#7c3aed">山是哪座？」</text>
      {/* → */}
      <text x="170" y="105" textAnchor="middle" fontSize="14" fill="#c4b5fd">→ 拆 →</text>
      {/* Tokens */}
      <rect x="210" y="60" width="140" height="80" rx="12" fill="#0ea5e9" opacity="0.10" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="280" y="88" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0ea5e9">Token碎片</text>
      <text x="280" y="105" textAnchor="middle" fontSize="10" fill="#0ea5e9">「台灣」「最高」</text>
      <text x="280" y="120" textAnchor="middle" fontSize="10" fill="#0ea5e9">「的」「山」…</text>
      {/* → */}
      <text x="365" y="105" textAnchor="middle" fontSize="14" fill="#c4b5fd">→ 編號 →</text>
      {/* 數字 */}
      <rect x="400" y="60" width="130" height="80" rx="12" fill="#059669" opacity="0.10" stroke="#059669" strokeWidth="1.5" />
      <text x="465" y="88" textAnchor="middle" fontSize="11" fontWeight="700" fill="#059669">數字串</text>
      <text x="465" y="108" textAnchor="middle" fontSize="10" fill="#059669" fontFamily="monospace">3810, 1234</text>
      <text x="465" y="124" textAnchor="middle" fontSize="10" fill="#059669" fontFamily="monospace">892, 567…</text>
      <text x="280" y="158" textAnchor="middle" fontSize="10" fill="#9ca3af">AI骨子裡只認得數字，Token是翻譯橋樑</text>
    </svg>
  );
}

function TokenSplit() {
  const tokens = [
    { text: 'run', color: '#7c3aed' },
    { text: 'ning', color: '#0ea5e9' },
    { text: '你好', color: '#059669' },
    { text: '，', color: '#d97706' },
    { text: '世界', color: '#dc2626' },
    { text: '！', color: '#ec4899' },
  ];
  return (
    <svg viewBox="0 0 560 160" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', borderRadius: 12, background: '#f8f7ff' }}>
      <text x="280" y="22" textAnchor="middle" fontSize="13" fontWeight="800" fill="#1e1b4b">Token 拆解示意</text>
      <text x="280" y="45" textAnchor="middle" fontSize="11" fill="#6b7280">句子→被拆成不同大小的碎片，每個碎片就是一個 Token</text>
      {tokens.map(({ text, color }, i) => {
        const x = 40 + i * 82;
        return (
          <g key={i}>
            <rect x={x} y="58" width="72" height="52" rx="10" fill={color} opacity="0.12" stroke={color} strokeWidth="1.5" />
            <text x={x + 36} y="88" textAnchor="middle" fontSize="14" fontWeight="700" fill={color}>{text}</text>
          </g>
        );
      })}
      <text x="280" y="130" textAnchor="middle" fontSize="10" fill="#9ca3af">一個英文詞可能被拆成多個Token；中文字也可能合成一個Token</text>
      <text x="280" y="148" textAnchor="middle" fontSize="10" fill="#9ca3af">不同模型的拆法不同，Token數≠字數</text>
    </svg>
  );
}

function TrainingCompare() {
  return (
    <svg viewBox="0 0 560 200" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', borderRadius: 12, background: '#f8f7ff' }}>
      <text x="280" y="22" textAnchor="middle" fontSize="13" fontWeight="800" fill="#1e1b4b">人類學語言 vs AI 訓練</text>
      {/* 表格 */}
      <rect x="20" y="35" width="520" height="145" rx="12" fill="white" stroke="#e5e7eb" strokeWidth="1" />
      {/* 標頭 */}
      <rect x="20" y="35" width="520" height="30" rx="12" fill="#f3f4f6" />
      <rect x="20" y="50" width="520" height="15" fill="#f3f4f6" />
      {['', '人類學語言', 'AI訓練'].map((h, i) => (
        <text key={i} x={20 + i * 173 + 86} y="56" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1e1b4b">{h}</text>
      ))}
      {/* 分隔線 */}
      <line x1="193" y1="35" x2="193" y2="180" stroke="#e5e7eb" strokeWidth="1" />
      <line x1="366" y1="35" x2="366" y2="180" stroke="#e5e7eb" strokeWidth="1" />
      {/* 資料行 */}
      {[
        { label: '時間', human: '數年累積', ai: '數週~數月' },
        { label: '互動方式', human: '真實生活互動', ai: '大量文字資料比對' },
        { label: '資料量', human: '一生有限的話語', ai: '數兆字等級的文字' },
        { label: '伴隨體驗', human: '情感與生活連結', ai: '機械式猜字練習' },
      ].map(({ label, human, ai }, i) => {
        const y = 80 + i * 25;
        if (i % 2 === 1) {
          return (
            <g key={i}>
              <rect x="20" y={y - 12} width="520" height="25" fill="#fafafa" />
              <text x="106" y={y + 5} textAnchor="middle" fontSize="10" fill="#1e1b4b" fontWeight="600">{label}</text>
              <text x="279" y={y + 5} textAnchor="middle" fontSize="10" fill="#059669">{human}</text>
              <text x="452" y={y + 5} textAnchor="middle" fontSize="10" fill="#7c3aed">{ai}</text>
            </g>
          );
        }
        return (
          <g key={i}>
            <text x="106" y={y + 5} textAnchor="middle" fontSize="10" fill="#1e1b4b" fontWeight="600">{label}</text>
            <text x="279" y={y + 5} textAnchor="middle" fontSize="10" fill="#059669">{human}</text>
            <text x="452" y={y + 5} textAnchor="middle" fontSize="10" fill="#7c3aed">{ai}</text>
          </g>
        );
      })}
    </svg>
  );
}

function TrainingFlow() {
  return (
    <svg viewBox="0 0 560 170" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', borderRadius: 12, background: '#f8f7ff' }}>
      <text x="280" y="22" textAnchor="middle" fontSize="13" fontWeight="800" fill="#1e1b4b">訓練循環：猜字→微調→重複</text>
      {[
        { x: 90, label: '海量\n文字資料', emoji: '📚', color: '#7c3aed' },
        { x: 220, label: '蓋住後半\n讓AI猜', emoji: '🎲', color: '#0ea5e9' },
        { x: 350, label: '猜對保留\n猜錯微調', emoji: '🔧', color: '#059669' },
        { x: 470, label: '億萬次\n重複', emoji: '🔄', color: '#d97706' },
      ].map(({ x, label, emoji, color }) => (
        <g key={x}>
          <circle cx={x} cy="90" r="42" fill={color} opacity="0.10" stroke={color} strokeWidth="1.5" />
          <text x={x} y="80" textAnchor="middle" fontSize="22">{emoji}</text>
          {label.split('\n').map((line, i) => (
            <text key={i} x={x} y={98 + i * 14} textAnchor="middle" fontSize="10" fontWeight="600" fill={color}>{line}</text>
          ))}
          {x < 470 && <text x={x + 64} y="95" textAnchor="middle" fontSize="14" fill="#c4b5fd">→</text>}
        </g>
      ))}
      {/* 最終結果 */}
      <text x="280" y="148" textAnchor="middle" fontSize="11" fill="#1e1b4b" fontWeight="600">→ 訓練完成：AI 形成一套「參數直覺」</text>
    </svg>
  );
}

// ── 進階系列（殼，進階課程上線後再補細節） ───────────────────

function AlignmentSpectrum() {
  return (
    <svg viewBox="0 0 560 120" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', borderRadius: 12, background: '#f8f7ff' }}>
      <text x="280" y="25" textAnchor="middle" fontSize="13" fontWeight="800" fill="#1e1b4b">對齊光譜</text>
      <defs>
        <linearGradient id="align-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="50%" stopColor="#d97706" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
      </defs>
      <rect x="40" y="50" width="480" height="20" rx="10" fill="url(#align-grad)" opacity="0.8" />
      <text x="60" y="88" fontSize="10" fill="#dc2626" fontWeight="700">危險行為</text>
      <text x="250" y="88" textAnchor="middle" fontSize="10" fill="#d97706" fontWeight="700">中立輸出</text>
      <text x="500" y="88" textAnchor="end" fontSize="10" fill="#059669" fontWeight="700">符合人類期待</text>
      <text x="280" y="108" textAnchor="middle" fontSize="10" fill="#9ca3af">對齊技術的目標：讓AI輸出靠近右側</text>
    </svg>
  );
}

function ContextCutoff() {
  return (
    <svg viewBox="0 0 560 120" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', borderRadius: 12, background: '#f8f7ff' }}>
      <text x="280" y="25" textAnchor="middle" fontSize="13" fontWeight="800" fill="#1e1b4b">知識截止日示意</text>
      <line x1="40" y1="70" x2="520" y2="70" stroke="#e5e7eb" strokeWidth="2" />
      <rect x="40" y="50" width="300" height="40" rx="8" fill="#7c3aed" opacity="0.12" />
      <text x="190" y="73" textAnchor="middle" fontSize="11" fill="#7c3aed" fontWeight="600">AI知道這段期間的事</text>
      <line x1="340" y1="40" x2="340" y2="90" stroke="#dc2626" strokeWidth="2" strokeDasharray="4,3" />
      <text x="340" y="32" textAnchor="middle" fontSize="10" fill="#dc2626" fontWeight="700">截止日</text>
      <rect x="340" y="50" width="180" height="40" rx="8" fill="#e5e7eb" opacity="0.5" />
      <text x="430" y="73" textAnchor="middle" fontSize="11" fill="#9ca3af">AI不知道的事</text>
    </svg>
  );
}

function ContextWindow() {
  return (
    <svg viewBox="0 0 560 120" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', borderRadius: 12, background: '#f8f7ff' }}>
      <text x="280" y="25" textAnchor="middle" fontSize="13" fontWeight="800" fill="#1e1b4b">上下文視窗（Context Window）</text>
      <rect x="40" y="45" width="480" height="45" rx="10" fill="#7c3aed" opacity="0.08" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="280" y="72" textAnchor="middle" fontSize="11" fill="#7c3aed" fontWeight="600">← 這次對話中 AI 能「記住」的全部內容 →</text>
      <text x="280" y="105" textAnchor="middle" fontSize="10" fill="#9ca3af">超過上下文限制 → 最舊的內容自動被遺忘</text>
    </svg>
  );
}

function FinetuneCompare() {
  return (
    <svg viewBox="0 0 560 140" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', borderRadius: 12, background: '#f8f7ff' }}>
      <text x="280" y="22" textAnchor="middle" fontSize="13" fontWeight="800" fill="#1e1b4b">基礎模型 vs 微調模型</text>
      <rect x="30" y="40" width="230" height="80" rx="12" fill="#0ea5e9" opacity="0.10" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="145" y="70" textAnchor="middle" fontSize="13" fontWeight="700" fill="#0ea5e9">基礎模型</text>
      <text x="145" y="90" textAnchor="middle" fontSize="10" fill="#0369a1">什麼都懂一點</text>
      <text x="145" y="108" textAnchor="middle" fontSize="10" fill="#0369a1">通用能力強</text>
      <rect x="300" y="40" width="230" height="80" rx="12" fill="#059669" opacity="0.10" stroke="#059669" strokeWidth="1.5" />
      <text x="415" y="70" textAnchor="middle" fontSize="13" fontWeight="700" fill="#059669">微調模型</text>
      <text x="415" y="90" textAnchor="middle" fontSize="10" fill="#065f46">特定領域精深</text>
      <text x="415" y="108" textAnchor="middle" fontSize="10" fill="#065f46">垂直應用更強</text>
      <text x="270" y="83" textAnchor="middle" fontSize="18">→</text>
      <text x="280" y="135" textAnchor="middle" fontSize="10" fill="#9ca3af">微調 = 在基礎模型上，針對特定任務再訓練</text>
    </svg>
  );
}

function RlhfFlow() {
  const steps = ['蒐集\n人類反饋', '訓練\n評分模型', '用評分\n優化AI', '迭代\n改進'];
  const colors = ['#7c3aed', '#0ea5e9', '#059669', '#d97706'];
  return (
    <svg viewBox="0 0 560 140" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', borderRadius: 12, background: '#f8f7ff' }}>
      <text x="280" y="22" textAnchor="middle" fontSize="13" fontWeight="800" fill="#1e1b4b">RLHF 流程（人類回饋強化學習）</text>
      {steps.map((label, i) => {
        const x = 60 + i * 115;
        return (
          <g key={i}>
            <circle cx={x} cy="80" r="36" fill={colors[i]} opacity="0.12" stroke={colors[i]} strokeWidth="1.5" />
            {label.split('\n').map((line, j) => (
              <text key={j} x={x} y={76 + j * 14} textAnchor="middle" fontSize="10" fontWeight="600" fill={colors[i]}>{line}</text>
            ))}
            {i < 3 && <text x={x + 50} y="85" textAnchor="middle" fontSize="13" fill="#c4b5fd">→</text>}
          </g>
        );
      })}
      <text x="280" y="130" textAnchor="middle" fontSize="10" fill="#9ca3af">RLHF 是對齊技術的重要方法之一</text>
    </svg>
  );
}

function RlhfReward() {
  return (
    <svg viewBox="0 0 560 150" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', borderRadius: 12, background: '#f8f7ff' }}>
      <text x="280" y="22" textAnchor="middle" fontSize="13" fontWeight="800" fill="#1e1b4b">評分模型：AI 的「品味評審」</text>
      <rect x="30" y="45" width="180" height="80" rx="12" fill="#0ea5e9" opacity="0.10" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="120" y="78" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0ea5e9">AI 回答 A</text>
      <text x="120" y="100" textAnchor="middle" fontSize="10" fill="#0369a1">「詳細且友善」</text>
      <rect x="230" y="60" width="120" height="60" rx="10" fill="#d97706" opacity="0.10" stroke="#d97706" strokeWidth="1.5" />
      <text x="290" y="88" textAnchor="middle" fontSize="12" fontWeight="700" fill="#d97706">評分模型</text>
      <text x="290" y="106" textAnchor="middle" fontSize="10" fill="#92400e">→ A勝</text>
      <rect x="360" y="45" width="170" height="80" rx="12" fill="#9ca3af" opacity="0.10" stroke="#9ca3af" strokeWidth="1.5" />
      <text x="445" y="78" textAnchor="middle" fontSize="12" fontWeight="700" fill="#9ca3af">AI 回答 B</text>
      <text x="445" y="100" textAnchor="middle" fontSize="10" fill="#6b7280">「簡短但有誤」</text>
      <text x="280" y="140" textAnchor="middle" fontSize="10" fill="#9ca3af">評分結果回饋給AI，強化「好答案」的傾向</text>
    </svg>
  );
}

function TemperatureDistribution() {
  return (
    <svg viewBox="0 0 560 160" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', borderRadius: 12, background: '#f8f7ff' }}>
      <text x="280" y="22" textAnchor="middle" fontSize="13" fontWeight="800" fill="#1e1b4b">Temperature：創意度旋鈕</text>
      {/* 低溫 */}
      <rect x="30" y="50" width="150" height="85" rx="12" fill="#0ea5e9" opacity="0.10" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="105" y="75" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0ea5e9">低 Temperature</text>
      <text x="105" y="96" textAnchor="middle" fontSize="10" fill="#0369a1">最高機率的字</text>
      <text x="105" y="112" textAnchor="middle" fontSize="10" fill="#0369a1">穩定可預測</text>
      <text x="105" y="126" textAnchor="middle" fontSize="10" fill="#0369a1">適合：事實問答</text>
      {/* 高溫 */}
      <rect x="380" y="50" width="150" height="85" rx="12" fill="#dc2626" opacity="0.10" stroke="#dc2626" strokeWidth="1.5" />
      <text x="455" y="75" textAnchor="middle" fontSize="12" fontWeight="700" fill="#dc2626">高 Temperature</text>
      <text x="455" y="96" textAnchor="middle" fontSize="10" fill="#991b1b">更多隨機性</text>
      <text x="455" y="112" textAnchor="middle" fontSize="10" fill="#991b1b">創意且多樣</text>
      <text x="455" y="126" textAnchor="middle" fontSize="10" fill="#991b1b">適合：創意寫作</text>
      {/* 滑塊 */}
      <line x1="190" y1="93" x2="380" y2="93" stroke="#e5e7eb" strokeWidth="3" strokeLinecap="round" />
      <text x="285" y="88" textAnchor="middle" fontSize="12" fill="#d97706">🎛️</text>
      <text x="285" y="120" textAnchor="middle" fontSize="10" fill="#9ca3af">可調整旋鈕</text>
      <text x="280" y="148" textAnchor="middle" fontSize="10" fill="#9ca3af">Temperature 越高 → 答案越多樣，但也越不穩定</text>
    </svg>
  );
}

// ── 高階系列 ─────────────────────────────────────────────────

function AiToolCategory() {
  const categories = [
    { name: '文字生成', emoji: '✍️', color: '#7c3aed' },
    { name: '圖像生成', emoji: '🎨', color: '#0ea5e9' },
    { name: '程式撰寫', emoji: '💻', color: '#059669' },
    { name: '語音處理', emoji: '🎙️', color: '#d97706' },
    { name: '多模態', emoji: '🔮', color: '#dc2626' },
  ];
  return (
    <svg viewBox="0 0 560 150" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', borderRadius: 12, background: '#f8f7ff' }}>
      <text x="280" y="22" textAnchor="middle" fontSize="13" fontWeight="800" fill="#1e1b4b">AI 工具分類</text>
      {categories.map(({ name, emoji, color }, i) => {
        const x = 50 + i * 95;
        return (
          <g key={name}>
            <rect x={x - 36} y="38" width="80" height="84" rx="12" fill={color} opacity="0.10" stroke={color} strokeWidth="1.5" />
            <text x={x + 4} y="74" textAnchor="middle" fontSize="24">{emoji}</text>
            <text x={x + 4} y="96" textAnchor="middle" fontSize="10" fontWeight="700" fill={color}>{name}</text>
          </g>
        );
      })}
      <text x="280" y="138" textAnchor="middle" fontSize="10" fill="#9ca3af">每種類型解決不同問題，選對工具更重要</text>
    </svg>
  );
}

function BusinessModel() {
  return (
    <svg viewBox="0 0 560 170" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', borderRadius: 12, background: '#f8f7ff' }}>
      <text x="280" y="22" textAnchor="middle" fontSize="13" fontWeight="800" fill="#1e1b4b">AI 產業商業模式</text>
      {[
        { label: 'API 授權', desc: '賣API存取給企業開發者', color: '#7c3aed', x: 90 },
        { label: '訂閱制', desc: '個人/企業月付或年付方案', color: '#0ea5e9', x: 280 },
        { label: '廣告/整合', desc: '免費使用換廣告收入', color: '#059669', x: 470 },
      ].map(({ label, desc, color, x }) => (
        <g key={label}>
          <rect x={x - 80} y="40" width="160" height="90" rx="14" fill={color} opacity="0.10" stroke={color} strokeWidth="1.5" />
          <text x={x} y="72" textAnchor="middle" fontSize="13" fontWeight="800" fill={color}>{label}</text>
          <text x={x} y="92" textAnchor="middle" fontSize="9" fill="#4b5563">{desc}</text>
        </g>
      ))}
      <text x="280" y="148" textAnchor="middle" fontSize="10" fill="#9ca3af">大多數AI公司同時採用多種模式</text>
    </svg>
  );
}

function RevenueFlow() {
  return (
    <svg viewBox="0 0 560 140" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', borderRadius: 12, background: '#f8f7ff' }}>
      <text x="280" y="22" textAnchor="middle" fontSize="13" fontWeight="800" fill="#1e1b4b">AI 公司收入來源流向</text>
      {[
        { label: '個人用戶\n訂閱', x: 80, color: '#7c3aed' },
        { label: '企業\nAPI費', x: 220, color: '#0ea5e9' },
        { label: '投資方\n融資', x: 360, color: '#d97706' },
        { label: '政府\n合約', x: 490, color: '#059669' },
      ].map(({ label, x, color }) => (
        <g key={x}>
          <rect x={x - 50} y="40" width="100" height="52" rx="10" fill={color} opacity="0.12" stroke={color} strokeWidth="1.5" />
          {label.split('\n').map((line, i) => (
            <text key={i} x={x} y={63 + i * 15} textAnchor="middle" fontSize="11" fontWeight="600" fill={color}>{line}</text>
          ))}
          <line x1={x} y1="92" x2="280" y2="115" stroke={color} strokeWidth="1.5" strokeDasharray="4,3" />
        </g>
      ))}
      <rect x="220" y="112" width="120" height="18" rx="9" fill="#1e1b4b" />
      <text x="280" y="125" textAnchor="middle" fontSize="10" fill="white" fontWeight="700">AI 公司運營</text>
    </svg>
  );
}

// ── 統一 renderChart 入口 ─────────────────────────────────────

export function renderAiChart(chart: SlideChart) {
  switch (chart.type) {
    case 'ai-history-timeline':     return <AiHistoryTimeline />;
    case 'ai-overview-pipeline':    return <AiOverviewPipeline />;
    case 'inference-flow':          return <InferenceFlow />;
    case 'model-compare':           return <ModelCompare />;
    case 'model-tier':              return <ModelTier />;
    case 'multimodal-flow':         return <MultimodalFlow />;
    case 'token-number':            return <TokenNumber />;
    case 'token-split':             return <TokenSplit />;
    case 'training-compare':        return <TrainingCompare />;
    case 'training-flow':           return <TrainingFlow />;
    case 'alignment-spectrum':      return <AlignmentSpectrum />;
    case 'context-cutoff':          return <ContextCutoff />;
    case 'context-window':          return <ContextWindow />;
    case 'finetune-compare':        return <FinetuneCompare />;
    case 'rlhf-flow':               return <RlhfFlow />;
    case 'rlhf-reward':             return <RlhfReward />;
    case 'temperature-distribution':return <TemperatureDistribution />;
    case 'ai-tool-category':        return <AiToolCategory />;
    case 'business-model':          return <BusinessModel />;
    case 'revenue-flow':            return <RevenueFlow />;
    default:                        return null;
  }
}
