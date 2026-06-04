'use client';
import { useState } from 'react';
import Link from 'next/link';
import ShareButtons from '@/components/ShareButtons';

// [風險意願, 分析傾向, 耐心指數, 系統紀律] 各 0–10
const QUESTIONS = [
  {
    label: 'Q1｜朋友報明牌',
    q: '朋友說某檔股票下週會大漲，訊息「很可靠」。你？',
    options: [
      { text: '不理，沒有研究過的不碰', type: 'A', s: [1, 5, 8, 9] },
      { text: '拿小錢進去試試，反正不多', type: 'B', s: [5, 2, 5, 4] },
      { text: '先查一下這檔股票再決定', type: 'C', s: [6, 9, 6, 7] },
      { text: '問他怎麼操作，跟著買', type: 'D', s: [7, 1, 3, 2] },
    ],
  },
  {
    label: 'Q2｜帳面虧損',
    q: '你買的ETF這個月跌了15%，你？',
    options: [
      { text: '沒感覺，繼續定期定額', type: 'A', s: [4, 5, 9, 9] },
      { text: '有點緊張，但還是撐著不動', type: 'B', s: [3, 3, 7, 5] },
      { text: '開始查原因，看是不是要調整', type: 'C', s: [5, 9, 6, 8] },
      { text: '賣掉，等跌夠了再買回來', type: 'D', s: [6, 2, 2, 3] },
    ],
  },
  {
    label: 'Q3｜閒錢怎麼放',
    q: '突然多了10萬閒錢，你第一個念頭是？',
    options: [
      { text: '存定存，至少不會少', type: 'A', s: [1, 3, 9, 8] },
      { text: '買ETF繼續放著', type: 'B', s: [5, 5, 8, 7] },
      { text: '研究一下現在什麼機會比較好', type: 'C', s: [7, 9, 5, 7] },
      { text: '看看朋友在買什麼', type: 'D', s: [6, 1, 3, 2] },
    ],
  },
  {
    label: 'Q4｜看到新聞',
    q: '新聞說某個市場「今年一定漲」，你？',
    options: [
      { text: '看看就好，不會因為新聞動作', type: 'A', s: [2, 6, 8, 9] },
      { text: '有點心動，但不確定要不要進', type: 'B', s: [4, 3, 5, 4] },
      { text: '去查這個說法的根據是什麼', type: 'C', s: [5, 9, 6, 8] },
      { text: '趕快買，怕來不及', type: 'D', s: [8, 1, 2, 2] },
    ],
  },
  {
    label: 'Q5｜停損測試',
    q: '你買的股票已經跌了30%，繼續跌的機率不明。你？',
    options: [
      { text: '早就設好停損，已經出場了', type: 'A', s: [4, 7, 7, 10] },
      { text: '很痛，但還是沒動，希望它回來', type: 'B', s: [3, 3, 8, 3] },
      { text: '重新評估基本面，決定要不要加碼或出場', type: 'C', s: [6, 9, 6, 8] },
      { text: '不知道該怎麼辦，問了幾個人意見都不一樣', type: 'D', s: [4, 2, 4, 2] },
    ],
  },
  {
    label: 'Q6｜定期定額被質疑',
    q: '朋友說定期定額「太慢了，這樣賺不到什麼」，你？',
    options: [
      { text: '慢沒關係，穩就好', type: 'A', s: [2, 4, 9, 9] },
      { text: '有點動搖，但還是繼續做', type: 'B', s: [4, 3, 6, 5] },
      { text: '跟他解釋定期定額的複利邏輯', type: 'C', s: [5, 9, 7, 8] },
      { text: '開始懷疑自己，考慮換方法', type: 'D', s: [6, 2, 3, 3] },
    ],
  },
  {
    label: 'Q7｜市場大漲',
    q: '你沒買的市場這個月漲了20%，你的感受？',
    options: [
      { text: '沒關係，不是我的策略範圍', type: 'A', s: [2, 5, 9, 9] },
      { text: '有點後悔，但接受', type: 'B', s: [4, 4, 6, 5] },
      { text: '研究為什麼漲，下次要不要納入配置', type: 'C', s: [6, 9, 6, 7] },
      { text: '馬上想衝進去，怕再錯過', type: 'D', s: [8, 2, 2, 2] },
    ],
  },
  {
    label: 'Q8｜理財動力',
    q: '你開始理財最主要的原因是？',
    options: [
      { text: '不想老了沒錢，未雨綢繆', type: 'A', s: [2, 4, 9, 8] },
      { text: '想讓錢慢慢變多，不急', type: 'B', s: [4, 5, 7, 6] },
      { text: '對投資本身有興趣，喜歡研究', type: 'C', s: [6, 9, 6, 8] },
      { text: '看到別人賺錢，覺得自己也應該要做', type: 'D', s: [7, 2, 3, 2] },
    ],
  },
  {
    label: 'Q9｜做決定的依據',
    q: '你做決定的依據通常是？',
    options: [
      { text: '安全感，不虧就好', type: 'A', s: [1, 3, 9, 8] },
      { text: '感覺，看起來穩就做', type: 'B', s: [3, 3, 6, 4] },
      { text: '數據和邏輯，查清楚再動', type: 'C', s: [6, 9, 7, 9] },
      { text: '別人的反應，大家說好就好', type: 'D', s: [6, 1, 3, 2] },
    ],
  },
];

const PERSONALITIES: Record<string, {
  emoji: string; name: string; tag: string;
  headline: string; desc: string; report: string; action: string;
  color: string; radar: number[];
}> = {
  vault: {
    emoji: '🔒', name: '保險庫型', tag: '穩守本金',
    headline: '你的錢從來不冒險，但你知道嗎——不動也是一種風險。',
    desc: '你重視安全感勝過一切，本金不能少是你的底線。市場漲跌對你來說是別人的事，你寧可少賺也不要睡不著覺。',
    report: '這不是缺點，這是清醒的自我認識。問題不在你的個性，在於「保本工具」本身有沒有跑贏通膨——如果沒有，帳面沒動，實質購買力正在縮水。你需要的不是改變風格，而是搞清楚你現在用的工具，真的保住了什麼。',
    action: '想深入了解？進小教室跟 LuLu 聊聊',
    color: '#3b82f6',
    radar: [20, 45, 90, 85],
  },
  analyst: {
    emoji: '📊', name: '穩健分析型', tag: '看懂才動',
    headline: '你不衝動，但你也不會讓錢閒著——你只是需要看懂才敢動。',
    desc: '你會查資料，會比較，不跟風但也不排斥機會。你的問題通常不是「敢不敢」，而是「資訊夠不夠、邏輯通不通」。',
    report: '這個模式長期來看勝率最高。你的風險在另一邊——分析太久變成遲遲不動，或是資訊太多反而卡住。調查局叫這個「分析癱瘓」，是穩健型最常見的隱性成本。你需要的不是更多資訊，而是一套讓你知道「夠了可以動」的判斷框架。',
    action: '想深入了解？進小教室跟 LuLu 聊聊',
    color: '#8b5cf6',
    radar: [60, 90, 65, 80],
  },
  active: {
    emoji: '⚡', name: '積極出擊型', tag: '有意識地衝',
    headline: '你敢進場，也敢出場——但你知道自己在賭什麼嗎？',
    desc: '你有研究習慣，也有行動力，不怕波動，喜歡主動掌控。你不是衝動，你是有意識地選擇積極。',
    report: '積極本身不是問題，問題在於積極的邊界在哪裡。歷史數據顯示，主動操作者中長期跑贏指數的比例不到20%——不是因為他們不努力，是因為交易成本和情緒在侵蝕報酬。你的功課是：搞清楚你的積極，有沒有在創造真實的超額報酬。你需要的不是收手，而是一套檢驗自己是否真的在贏的方法。',
    action: '想深入了解？進小教室跟 LuLu 聊聊',
    color: '#f59e0b',
    radar: [85, 80, 40, 70],
  },
  follower: {
    emoji: '🌊', name: '情緒驅動型', tag: '感覺跑在邏輯前',
    headline: '你不是不聰明，你只是讓感覺跑在邏輯前面。',
    desc: '市場熱的時候你會心動，市場跌的時候你會懷疑自己。你的決定常常來自外部——別人說好、新聞說漲、朋友在買。這不是缺點，這是人類大腦的預設值，85%的散戶都在這裡。',
    report: '問題不在你的個性，在於你目前沒有一個系統在保護你不被情緒帶著走。靠意志力對抗情緒，長期勝率極低。真正有效的方法是：設計一個讓情緒沒有機會出手的結構——定期定額、自動扣款、勞退自提，讓機制替你做決定。你需要的不是改變個性，而是建一個不需要靠意志力的系統。',
    action: '想深入了解？進小教室跟 LuLu 聊聊',
    color: '#06b6d4',
    radar: [65, 20, 35, 25],
  },
};

const DIMS = ['風險意願', '分析傾向', '耐心指數', '系統紀律'];

function classify(answers: string[]): string {
  const count: Record<string, number> = { A: 0, B: 0, C: 0, D: 0 };
  answers.forEach(a => { count[a] = (count[a] || 0) + 1; });
  const q8 = answers[7]; // Q8 index
  const q9 = answers[8]; // Q9 index
  const sorted = Object.entries(count).sort((a, b) => b[1] - a[1]);
  const top = sorted[0][0];
  if (top === 'D') {
    return (q8 === 'C' || q9 === 'C') ? 'active' : 'follower';
  }
  if (top === 'A') return 'vault';
  if (top === 'B') return 'follower';
  return 'analyst';
}

function calcRadar(answers: string[]): number[] {
  const totals = [0, 0, 0, 0];
  answers.forEach((ans, qi) => {
    const opt = QUESTIONS[qi].options.find(o => o.type === ans);
    if (opt) opt.s.forEach((v, i) => { totals[i] += v; });
  });
  // max per dim = 10 * 9 = 90, normalize to 0-100
  return totals.map(v => Math.round((v / 90) * 100));
}

function RadarChart({ scores }: { scores: number[] }) {
  const cx = 120, cy = 120, r = 90;
  const dims = DIMS.length;
  const angleStep = (2 * Math.PI) / dims;
  const toXY = (angle: number, radius: number) => ({
    x: cx + radius * Math.sin(angle),
    y: cy - radius * Math.cos(angle),
  });
  const gridLevels = [0.25, 0.5, 0.75, 1];
  const axes = Array.from({ length: dims }, (_, i) => toXY(i * angleStep, r));
  const points = scores.map((s, i) => toXY(i * angleStep, (s / 100) * r));
  const polyPts = points.map(p => `${p.x},${p.y}`).join(' ');
  return (
    <svg viewBox="0 0 240 240" style={{ width: '100%', maxWidth: 240 }}>
      {gridLevels.map((lv) => {
        const gPts = Array.from({ length: dims }, (_, i) => toXY(i * angleStep, r * lv));
        return (
          <polygon key={lv}
            points={gPts.map(p => `${p.x},${p.y}`).join(' ')}
            fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
        );
      })}
      {axes.map((pt, i) => (
        <line key={i} x1={cx} y1={cy} x2={pt.x} y2={pt.y}
          stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
      ))}
      <polygon points={polyPts} fill="rgba(139,92,246,0.3)" stroke="#a78bfa" strokeWidth="2" />
      {points.map((pt, i) => (
        <circle key={i} cx={pt.x} cy={pt.y} r="4" fill="#a78bfa" />
      ))}
      {axes.map((pt, i) => {
        const angle = i * angleStep;
        const lx = cx + (r + 20) * Math.sin(angle);
        const ly = cy - (r + 20) * Math.cos(angle);
        return (
          <text key={i} x={lx} y={ly} textAnchor="middle" dominantBaseline="middle"
            fill="#d1d5db" fontSize="9" fontWeight="600">
            {DIMS[i]}
          </text>
        );
      })}
      {scores.map((s, i) => {
        const pt = points[i];
        return (
          <text key={i} x={pt.x} y={pt.y - 8} textAnchor="middle"
            fill="#a78bfa" fontSize="9" fontWeight="700">{s}</text>
        );
      })}
    </svg>
  );
}

export default function FinancePersonalityQuiz() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [resultKey, setResultKey] = useState<string | null>(null);
  const [radarScores, setRadarScores] = useState<number[]>([]);

  const total = QUESTIONS.length;
  const progress = Math.round((current / total) * 100);

  function handleSelect(type: string) {
    setSelected(type);
    setTimeout(() => {
      const newAnswers = [...answers, type];
      if (current + 1 >= total) {
        const key = classify(newAnswers);
        setResultKey(key);
        setRadarScores(calcRadar(newAnswers));
      } else {
        setAnswers(newAnswers);
        setCurrent(current + 1);
        setSelected(null);
      }
    }, 380);
  }

  function reset() {
    setCurrent(0);
    setAnswers([]);
    setSelected(null);
    setResultKey(null);
    setRadarScores([]);
  }

  if (resultKey) {
    const p = PERSONALITIES[resultKey];
    const shareText = `我是${p.name}投資人${p.emoji} — 你是哪一型？側寫你的財務人格`;
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f0c29, #1a1a2e, #16213e)', color: '#e5e7eb', padding: '2rem 1rem' }}>
        <div style={{ maxWidth: '680px', margin: '0 auto' }}>

          {/* Back */}
          <Link href="/quiz" style={{ color: '#6b7280', fontSize: '0.85rem', textDecoration: 'none', display: 'block', marginBottom: '1.5rem' }}>
            ← 回測驗列表
          </Link>

          {/* Result header */}
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ fontSize: '3.5rem', marginBottom: '0.5rem' }}>{p.emoji}</div>
            <div style={{
              display: 'inline-block',
              background: p.color + '22',
              border: `1px solid ${p.color}55`,
              color: p.color,
              fontSize: '0.75rem', fontWeight: 700,
              padding: '3px 12px', borderRadius: '20px', marginBottom: '0.6rem',
            }}>{p.tag}</div>
            <h1 style={{ color: '#fff', fontSize: '1.8rem', fontWeight: 900, margin: '0 0 0.6rem' }}>
              {p.name}
            </h1>
            <p style={{ color: '#d1d5db', fontSize: '0.95rem', lineHeight: 1.7, margin: 0 }}>
              {p.headline}
            </p>
          </div>

          {/* Radar chart */}
          <div style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(167,139,250,0.2)',
            borderRadius: '16px',
            padding: '1.5rem',
            marginBottom: '1.5rem',
          }}>
            <p style={{ color: '#a78bfa', fontWeight: 700, fontSize: '0.85rem', margin: '0 0 1rem', textAlign: 'center' }}>
              📋 鑑識報告｜你的四維財務人格
            </p>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <RadarChart scores={radarScores} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginTop: '1rem' }}>
              {DIMS.map((dim, i) => (
                <div key={dim} style={{
                  background: 'rgba(139,92,246,0.1)',
                  borderRadius: '8px',
                  padding: '0.5rem 0.75rem',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                }}>
                  <span style={{ color: '#9ca3af', fontSize: '0.8rem' }}>{dim}</span>
                  <span style={{ color: '#a78bfa', fontWeight: 700, fontSize: '0.9rem' }}>{radarScores[i]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Description */}
          <div style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '16px',
            padding: '1.5rem',
            marginBottom: '1.5rem',
          }}>
            <p style={{ color: '#e5e7eb', lineHeight: 1.8, margin: '0 0 1rem', fontSize: '0.95rem' }}>
              {p.desc}
            </p>
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1rem' }}>
              <p style={{ color: '#a78bfa', fontWeight: 700, fontSize: '0.8rem', margin: '0 0 0.6rem' }}>
                🔍 調查局鑑識報告
              </p>
              <p style={{ color: '#d1d5db', lineHeight: 1.8, margin: 0, fontSize: '0.9rem' }}>
                {p.report}
              </p>
            </div>
          </div>

          {/* Share */}
          <div style={{ marginBottom: '1.5rem' }}>
            <ShareButtons title={shareText} content={`理財人格測驗｜${p.name} ${p.emoji}\n${p.headline}`} />
          </div>

          {/* CTA */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(139,92,246,0.15), rgba(6,182,212,0.1))',
            border: '1px solid rgba(139,92,246,0.3)',
            borderRadius: '16px',
            padding: '1.5rem',
            textAlign: 'center',
            marginBottom: '1.5rem',
          }}>
            <p style={{ color: '#e5e7eb', fontWeight: 700, margin: '0 0 0.4rem' }}>
              {`去看${p.name}同學最常踩的坑`}
            </p>
            <p style={{ color: '#6b7280', fontSize: '0.82rem', margin: '0 0 1rem' }}>
              靜態Q&A，看看跟你一樣的人在問什麼
            </p>
            <Link href="/classroom" style={{
              display: 'inline-block',
              background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
              color: '#fff', fontWeight: 700,
              padding: '0.65rem 1.8rem', borderRadius: '30px',
              textDecoration: 'none', fontSize: '0.9rem',
            }}>
              進小教室跟 LuLu 聊聊 →
            </Link>
          </div>

          {/* Retake */}
          <div style={{ textAlign: 'center' }}>
            <button onClick={reset} style={{
              background: 'none', border: 'none',
              color: '#6b7280', cursor: 'pointer', fontSize: '0.85rem', textDecoration: 'underline',
            }}>
              重新測驗
            </button>
          </div>
        </div>
      </div>
    );
  }

  const q = QUESTIONS[current];
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f0c29, #1a1a2e, #16213e)', color: '#e5e7eb', padding: '2rem 1rem' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.3rem' }}>🔍💰</div>
          <h1 style={{ color: '#fff', fontSize: '1.4rem', fontWeight: 800, margin: '0 0 0.3rem' }}>
            理財人格測驗
          </h1>
          <p style={{ color: '#6b7280', fontSize: '0.8rem', margin: 0 }}>
            側寫你的財務性格，不是投資建議
          </p>
        </div>

        {/* Progress */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
            <span style={{ color: '#6b7280', fontSize: '0.78rem' }}>{q.label}</span>
            <span style={{ color: '#a78bfa', fontSize: '0.78rem', fontWeight: 700 }}>{current + 1} / {total}</span>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: '4px', height: '4px' }}>
            <div style={{
              background: 'linear-gradient(90deg, #7c3aed, #a78bfa)',
              height: '100%', borderRadius: '4px',
              width: `${progress}%`,
              transition: 'width 0.4s ease',
            }} />
          </div>
        </div>

        {/* Question */}
        <div style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(167,139,250,0.2)',
          borderRadius: '16px',
          padding: '1.5rem',
          marginBottom: '1.5rem',
        }}>
          <p style={{ color: '#f3f4f6', fontSize: '1.05rem', fontWeight: 700, lineHeight: 1.7, margin: 0 }}>
            {q.q}
          </p>
        </div>

        {/* Options */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {q.options.map((opt) => {
            const isSelected = selected === opt.type;
            return (
              <button
                key={opt.type}
                onClick={() => !selected && handleSelect(opt.type)}
                style={{
                  background: isSelected
                    ? 'rgba(139,92,246,0.25)'
                    : 'rgba(255,255,255,0.04)',
                  border: isSelected
                    ? '1px solid rgba(139,92,246,0.6)'
                    : '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  padding: '1rem 1.2rem',
                  color: isSelected ? '#c4b5fd' : '#d1d5db',
                  fontSize: '0.9rem',
                  textAlign: 'left',
                  cursor: selected ? 'default' : 'pointer',
                  transition: 'all 0.15s',
                  lineHeight: 1.5,
                  display: 'flex', alignItems: 'center', gap: '0.75rem',
                }}
              >
                <span style={{
                  minWidth: '24px', height: '24px',
                  background: isSelected ? '#7c3aed' : 'rgba(255,255,255,0.08)',
                  borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.75rem', fontWeight: 700,
                  color: isSelected ? '#fff' : '#9ca3af',
                  flexShrink: 0,
                }}>
                  {opt.type}
                </span>
                {opt.text}
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
}
