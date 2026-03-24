'use client';
// 📄 路徑：src/app/moon-sign/page.tsx
// 月亮星座：輸入生日（+時間+城市）算太陽座、月亮座、上升座

import { useState } from 'react';
import Link from 'next/link';

// ── 星座資料 ───────────────────────────────────────────────
const SIGNS = [
  { name:'牡羊座', symbol:'♈', emoji:'🔥', color:'#ef4444', start:[3,21], element:'火', quality:'基本', ruler:'火星' },
  { name:'金牛座', symbol:'♉', emoji:'🌿', color:'#84cc16', start:[4,20], element:'土', quality:'固定', ruler:'金星' },
  { name:'雙子座', symbol:'♊', emoji:'💨', color:'#facc15', start:[5,21], element:'風', quality:'變動', ruler:'水星' },
  { name:'巨蟹座', symbol:'♋', emoji:'🌙', color:'#38bdf8', start:[6,21], element:'水', quality:'基本', ruler:'月亮' },
  { name:'獅子座', symbol:'♌', emoji:'☀️', color:'#f97316', start:[7,23], element:'火', quality:'固定', ruler:'太陽' },
  { name:'處女座', symbol:'♍', emoji:'🌾', color:'#10b981', start:[8,23], element:'土', quality:'變動', ruler:'水星' },
  { name:'天秤座', symbol:'♎', emoji:'⚖️', color:'#ec4899', start:[9,23], element:'風', quality:'基本', ruler:'金星' },
  { name:'天蠍座', symbol:'♏', emoji:'🦂', color:'#8b5cf6', start:[10,23], element:'水', quality:'固定', ruler:'冥王星' },
  { name:'射手座', symbol:'♐', emoji:'🏹', color:'#f59e0b', start:[11,22], element:'火', quality:'變動', ruler:'木星' },
  { name:'摩羯座', symbol:'♑', emoji:'🏔️', color:'#6b7280', start:[12,22], element:'土', quality:'基本', ruler:'土星' },
  { name:'水瓶座', symbol:'♒', emoji:'⚡', color:'#06b6d4', start:[1,20], element:'風', quality:'固定', ruler:'天王星' },
  { name:'雙魚座', symbol:'♓', emoji:'🐟', color:'#a78bfa', start:[2,19], element:'水', quality:'變動', ruler:'海王星' },
];

// 三方星座個性說明
const SIGN_DESC: Record<string, { sun:string; moon:string; rising:string }> = {
  牡羊座:{ sun:'充滿衝勁與活力，天生領袖，做事果斷直接，熱愛挑戰。', moon:'情緒直接、來得快去得也快，需要即時回應，不喜歡拐彎抹角。', rising:'給人充滿活力、直接爽快的第一印象，行動力強。' },
  金牛座:{ sun:'踏實穩健，重視安全感與物質舒適，對美好事物有高度品味。', moon:'情感穩定深厚，需要安全感，對喜歡的人十分忠誠，慢熱但長久。', rising:'給人可靠、溫和、有品味的第一印象，讓人感到放心。' },
  雙子座:{ sun:'思維靈活，好奇心旺盛，擅長溝通，什麼都想嘗試一點。', moon:'情緒多變善變，需要心智刺激，透過說話和寫作來釋放感受。', rising:'給人機智幽默、善於表達的第一印象，很快讓人感到輕鬆。' },
  巨蟹座:{ sun:'情感豐富，重視家庭，天生的照顧者，保護欲強。', moon:'情緒敏感細膩，需要被呵護，記憶力強，情感深藏不露。', rising:'給人溫柔體貼、有親切感的第一印象，讓人想靠近。' },
  獅子座:{ sun:'熱情自信，愛被欣賞，創造力強，有天生的舞台魅力。', moon:'需要被重視和讚美，感情熱烈慷慨，情緒表達大方直接。', rising:'給人氣場強大、閃亮自信的第一印象，吸引目光。' },
  處女座:{ sun:'細心分析，追求完美，實際務實，重視健康與秩序。', moon:'情緒內斂，透過服務和幫助他人來表達情感，擔心事情很多。', rising:'給人謹慎細心、可靠整潔的第一印象，讓人放心交付任務。' },
  天秤座:{ sun:'優雅和諧，重視公平，天生外交家，很難做決定。', moon:'需要和諧的關係，情感上容易被影響，不喜歡衝突和爭執。', rising:'給人優雅迷人、有教養的第一印象，自然散發魅力。' },
  天蠍座:{ sun:'深邃神秘，情感強烈，洞察力驚人，全力以赴或完全放棄。', moon:'情緒深沉複雜，感情佔有欲強，一旦受傷很難忘記。', rising:'給人神秘深邃、難以看透的第一印象，讓人好奇。' },
  射手座:{ sun:'樂觀自由，熱愛冒險與哲學，不喜歡被束縛，永遠向前看。', moon:'需要自由和空間，情緒豁達，透過旅行和學習來滋養心靈。', rising:'給人開朗豪爽、充滿活力的第一印象，帶來好心情。' },
  摩羯座:{ sun:'自律堅毅，目標明確，重視成就，責任感超強。', moon:'情感內斂保守，需要時間建立信任，情緒用行動而非語言表達。', rising:'給人成熟穩重、值得信賴的第一印象，讓人覺得靠得住。' },
  水瓶座:{ sun:'獨立前衛，思想超前，重視友誼與人道，標新立異。', moon:'情緒理智化，不喜歡被情感綁住，需要空間和自由。', rising:'給人特立獨行、聰明有個性的第一印象，令人印象深刻。' },
  雙魚座:{ sun:'浪漫夢幻，直覺豐富，同理心強，容易沉浸在自己的世界。', moon:'情感極為豐富敏感，容易受周遭影響，需要有靈性的出口。', rising:'給人溫柔夢幻、神秘飄渺的第一印象，讓人想保護。' },
};

// ── 計算太陽星座 ───────────────────────────────────────────
function getSunSign(month: number, day: number): number {
  const dates: [number,number,number][] = [
    [0,3,21],[1,4,20],[2,5,21],[3,6,21],[4,7,23],[5,8,23],
    [6,9,23],[7,10,23],[8,11,22],[9,12,22],[10,1,20],[11,2,19],
  ];

  for (let i = dates.length - 1; i >= 0; i--) {
    const [idx, sm, sd] = dates[i];
    if (month > sm || (month === sm && day >= sd)) return idx;
  }
  return 11; // 雙魚
}

// ── 計算月亮星座（簡化版，以月亮約27.32天繞地球一圈） ────
// 使用已知基準：2000/1/1 月亮在摩羯座(9)
function getMoonSign(year: number, month: number, day: number, hour: number): number {
  const ref = new Date(2000, 0, 1, 12); // 2000-01-01 noon
  const target = new Date(year, month - 1, day, hour);
  const diffMs = target.getTime() - ref.getTime();
  const diffDays = diffMs / 86400000;
  // 月亮每天移動約 13.176° = 12星座/27.32天
  // 基準：月亮在摩羯座(9)起點
  const moonCycleDays = 27.32153;
  const refMoonSign = 9; // 摩羯座
  const signsPassed = (diffDays / moonCycleDays) * 12;
  return ((Math.floor(signsPassed) + refMoonSign) % 12 + 12) % 12;
}

// ── 計算上升星座（需要出生時間，以台北UTC+8為預設） ────
// 上升星座每2小時換一個，以正午前後估算
function getRisingSign(month: number, day: number, hour: number, sunSignIdx: number): number {
  // 簡化公式：上升星座 = 太陽座 + 出生時間偏移
  // 正午(12點)上升星座 ≈ 太陽座 + 1（估算值）
  // 每2小時推進一個星座
  const noonOffset = Math.round((hour - 12) / 2);
  return ((sunSignIdx + 1 + noonOffset) % 12 + 12) % 12;
}

export default function MoonSignPage() {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('12:00');
  const [result, setResult] = useState<null|{
    sun: number; moon: number; rising: number;
  }>(null);

  function calculate() {
    if (!date) return;
    const [y, m, d] = date.split('-').map(Number);
    const [h] = time.split(':').map(Number);
    const sun    = getSunSign(m, d);
    const moon   = getMoonSign(y, m, d, h);
    const rising = getRisingSign(m, d, h, sun);
    setResult({ sun, moon, rising });
  }

  const renderSignCard = (label: string, emoji: string, signIdx: number, descKey: 'sun'|'moon'|'rising') => {
    const s = SIGNS[signIdx];
    const desc = SIGN_DESC[s.name]?.[descKey] ?? '';
    return (
      <div style={{ background:`${s.color}15`, border:`1px solid ${s.color}44`, borderRadius:'16px', padding:'1.2rem', flex:'1', minWidth:'180px' }}>
        <div style={{ color:'#6b7280', fontSize:'0.72rem', fontWeight:700, marginBottom:'0.5rem' }}>{label}</div>
        <div style={{ fontSize:'2rem' }}>{s.emoji}</div>
        <div style={{ color:s.color, fontSize:'1.3rem', fontWeight:800, margin:'0.2rem 0' }}>{s.name} {s.symbol}</div>
        <div style={{ display:'flex', gap:'0.4rem', flexWrap:'wrap', marginBottom:'0.7rem' }}>
          <span style={{ background:`${s.color}22`, color:s.color, padding:'0.15rem 0.5rem', borderRadius:'10px', fontSize:'0.7rem' }}>{s.element}象</span>
          <span style={{ background:'rgba(255,255,255,0.06)', color:'#9ca3af', padding:'0.15rem 0.5rem', borderRadius:'10px', fontSize:'0.7rem' }}>{s.ruler}</span>
          <span style={{ background:'rgba(255,255,255,0.06)', color:'#9ca3af', padding:'0.15rem 0.5rem', borderRadius:'10px', fontSize:'0.7rem' }}>{s.quality}</span>
        </div>
        <p style={{ color:'#d1d5db', fontSize:'0.83rem', lineHeight:1.7, margin:0 }}>{desc}</p>
      </div>
    );
  };

  return (
    <div style={{ minHeight:'100vh', background:'linear-gradient(135deg,#0f0a1e 0%,#1a0533 50%,#0a1628 100%)', padding:'2rem 1rem 6rem' }}>
      <div style={{ maxWidth:'750px', margin:'0 auto' }}>

        {/* 標題 */}
        <div style={{ textAlign:'center', marginBottom:'2rem' }}>
          <div style={{ fontSize:'2.5rem', marginBottom:'0.3rem' }}>🌙</div>
          <h1 style={{ color:'#fff', fontSize:'1.8rem', fontWeight:800, margin:'0 0 0.3rem' }}>月亮星座</h1>
          <p style={{ color:'#9ca3af', fontSize:'0.88rem', margin:0 }}>算出你的太陽座、月亮座、上升座，解析內外在宇宙</p>
        </div>

        {/* 輸入區 */}
        <div style={{ background:'rgba(255,255,255,0.06)', border:'1px solid rgba(167,139,250,0.25)', borderRadius:'20px', padding:'1.5rem', marginBottom:'1.5rem' }}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem', marginBottom:'1.2rem' }}>
            <div>
              <label style={{ color:'#a78bfa', fontSize:'0.82rem', fontWeight:700, display:'block', marginBottom:'0.4rem' }}>📅 出生日期</label>
              <input type="date" value={date} onChange={e=>setDate(e.target.value)}
                style={{ width:'100%', background:'rgba(0,0,0,0.3)', border:'1px solid rgba(167,139,250,0.3)', borderRadius:'10px', color:'#fff', padding:'0.65rem 0.9rem', fontSize:'0.95rem', outline:'none', boxSizing:'border-box' }} />
            </div>
            <div>
              <label style={{ color:'#a78bfa', fontSize:'0.82rem', fontWeight:700, display:'block', marginBottom:'0.4rem' }}>🕐 出生時間（影響上升座）</label>
              <input type="time" value={time} onChange={e=>setTime(e.target.value)}
                style={{ width:'100%', background:'rgba(0,0,0,0.3)', border:'1px solid rgba(167,139,250,0.3)', borderRadius:'10px', color:'#fff', padding:'0.65rem 0.9rem', fontSize:'0.95rem', outline:'none', boxSizing:'border-box' }} />
            </div>
          </div>
          <button onClick={calculate} style={{ width:'100%', background:'linear-gradient(135deg,#7c3aed,#06b6d4)', color:'#fff', border:'none', borderRadius:'12px', padding:'0.85rem', fontSize:'1rem', fontWeight:800, cursor:'pointer' }}>
            🔍 計算我的三方星座
          </button>
          <p style={{ color:'#4b5563', fontSize:'0.72rem', textAlign:'center', margin:'0.7rem 0 0' }}>上升座需要精確時間，不知道的話預設12:00（誤差±1座）</p>
        </div>

        {/* 結果 */}
        {result && (
          <div style={{ animation:'fadeIn 0.4s ease' }}>

            {/* 三方星座卡片 */}
            <div style={{ display:'flex', gap:'0.8rem', flexWrap:'wrap', marginBottom:'1.2rem' }}>
              {renderSignCard('☀️ 太陽星座（外在個性）','☀️', result.sun, 'sun')}
              {renderSignCard('🌙 月亮星座（內在情感）','🌙', result.moon, 'moon')}
              {renderSignCard('⬆️ 上升星座（第一印象）','⬆️', result.rising, 'rising')}
            </div>

            {/* 組合解析 */}
            <div style={{ background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:'16px', padding:'1.3rem', marginBottom:'1.2rem' }}>
              <h3 style={{ color:'#e9d5ff', fontSize:'0.95rem', fontWeight:700, margin:'0 0 0.8rem' }}>🔭 三方組合解析</h3>
              <p style={{ color:'#d1d5db', fontSize:'0.88rem', lineHeight:1.8, margin:0 }}>
                你的外在表現是 <span style={{ color:SIGNS[result.sun].color, fontWeight:700 }}>{SIGNS[result.sun].name}</span> 的{SIGNS[result.sun].element}象特質，
                給人 <span style={{ color:SIGNS[result.rising].color, fontWeight:700 }}>{SIGNS[result.rising].name}</span> 的第一印象，
                但內心深處藏著 <span style={{ color:SIGNS[result.moon].color, fontWeight:700 }}>{SIGNS[result.moon].name}</span> 的情感世界。
                {SIGNS[result.sun].element === SIGNS[result.moon].element
                  ? ` 太陽與月亮同屬${SIGNS[result.sun].element}象，個性與內心一致，你是個表裡如一的人。`
                  : ` 太陽${SIGNS[result.sun].element}象與月亮${SIGNS[result.moon].element}象的差異，讓你外表與內心有些不同，需要花時間才能讓人真正了解你。`
                }
              </p>
            </div>

            {/* 元素分析 */}
            <div style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:'16px', padding:'1.2rem' }}>
              <div style={{ display:'flex', gap:'1.5rem', justifyContent:'center', flexWrap:'wrap' }}>
                {[
                  { label:'守護星', value:`${SIGNS[result.sun].ruler}（太陽）` },
                  { label:'元素組合', value:`${SIGNS[result.sun].element}×${SIGNS[result.moon].element}×${SIGNS[result.rising].element}` },
                  { label:'特質組合', value:`${SIGNS[result.sun].quality}×${SIGNS[result.moon].quality}` },
                ].map(item => (
                  <div key={item.label} style={{ textAlign:'center' }}>
                    <div style={{ color:'#6b7280', fontSize:'0.72rem', marginBottom:'0.2rem' }}>{item.label}</div>
                    <div style={{ color:'#e9d5ff', fontWeight:700, fontSize:'0.88rem' }}>{item.value}</div>
                  </div>
                ))}
              </div>
            </div>

            <p style={{ color:'#4b5563', fontSize:'0.72rem', textAlign:'center', marginTop:'1rem' }}>
              ✨ 月亮座使用簡化公式計算，上升座需精確出生時間與出生地，結果僅供娛樂參考
            </p>
          </div>
        )}

        {/* 導航 */}
        <div style={{ textAlign:'center', marginTop:'2rem', display:'flex', gap:'1.5rem', justifyContent:'center', flexWrap:'wrap' }}>
          <Link href="/games" style={{ color:'#7c3aed', fontSize:'0.9rem', textDecoration:'none', fontWeight:600 }}>← 小遊戲</Link>
          <Link href="/bazi" style={{ color:'#dc2626', fontSize:'0.9rem', textDecoration:'none', fontWeight:600 }}>🧧 八字命盤</Link>
          <Link href="/horoscope" style={{ color:'#f59e0b', fontSize:'0.9rem', textDecoration:'none', fontWeight:600 }}>⭐ 星座運勢</Link>
        </div>

      </div>
      <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}`}</style>
    </div>
  );
}
