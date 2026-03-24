'use client';
// 📄 路徑：src/app/bazi/page.tsx
// 八字命盤：輸入生日+時辰，算四柱天干地支＋五行分析

import { useState } from 'react';
import Link from 'next/link';

// ── 基礎資料 ───────────────────────────────────────────────
const STEMS  = ['甲','乙','丙','丁','戊','己','庚','辛','壬','癸'];
const BRANCHES = ['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'];
const ZODIAC   = ['鼠','牛','虎','兔','龍','蛇','馬','羊','猴','雞','狗','豬'];

// 天干五行
const STEM_ELEMENT = ['木','木','火','火','土','土','金','金','水','水'];
// 地支五行
const BRANCH_ELEMENT = ['水','土','木','木','土','火','火','土','金','金','土','水'];
// 地支藏干（簡化，主氣）
const BRANCH_HIDDEN = ['壬','己','甲','乙','戊','丙','丁','己','庚','辛','戊','壬'];

const ELEMENT_COLOR: Record<string,string> = {
  木:'#22c55e', 火:'#ef4444', 土:'#f59e0b', 金:'#a78bfa', 水:'#38bdf8',
};
const ELEMENT_EMOJI: Record<string,string> = {
  木:'🌿', 火:'🔥', 土:'🏔️', 金:'⚡', 水:'💧',
};

// 日主個性
const DAY_MASTER_DESC: Record<string,{ title:string; desc:string; gift:string; challenge:string }> = {
  甲:{ title:'甲木 — 參天大樹', desc:'正直、堅毅、有原則，像大樹屹立不搖。天生領袖氣質，做事有始有終，重視名譽與自尊。', gift:'領導力、責任感、意志力強', challenge:'容易固執，有時過於死板，難以彎腰' },
  乙:{ title:'乙木 — 柔韌藤蔓', desc:'靈活、適應力強、善於人際，像藤蔓找到縫隙就能生長。溫柔卻有韌性，懂得以柔克剛。', gift:'親和力、創意、情商高', challenge:'容易搖擺不定，有時過於在意他人眼光' },
  丙:{ title:'丙火 — 溫暖太陽', desc:'熱情、開朗、慷慨，像太陽般照耀身邊的人。自信、積極，天生受人喜愛的磁場。', gift:'熱情感染力、行動力、樂觀', challenge:'容易大起大落，衝動行事後悔' },
  丁:{ title:'丁火 — 細緻燭光', desc:'細膩、溫柔、充滿智慧，像燭光般溫暖而專注。重視精神層面，觀察力敏銳。', gift:'細心、直覺力、藝術感', challenge:'容易鑽牛角尖，情緒起伏較大' },
  戊:{ title:'戊土 — 穩重高山', desc:'踏實、可靠、包容，像大山般承載一切。做事穩健，是身邊人的精神支柱。', gift:'穩定性、包容心、執行力', challenge:'有時過於保守，缺乏彈性' },
  己:{ title:'己土 — 滋養田地', desc:'勤勉、踏實、善解人意，像田地般默默滋養周遭。照顧欲強，重視家庭與細節。', gift:'細心照顧、耐心、親和力', challenge:'容易操心過度，難以放手' },
  庚:{ title:'庚金 — 剛烈寶劍', desc:'果斷、剛強、重義氣，像寶劍般鋒利直接。有決斷力，不喜歡拐彎抹角。', gift:'決斷力、行動力、義氣', challenge:'容易太直接傷人，固執難以妥協' },
  辛:{ title:'辛金 — 璀璨珠寶', desc:'精緻、敏感、追求完美，像珠寶般閃耀。審美力強，對品質有高度要求。', gift:'審美力、敏銳度、完美主義', challenge:'容易鑽牛角尖，對自己和他人要求過高' },
  壬:{ title:'壬水 — 奔流江河', desc:'聰明、靈活、志向遠大，像江河般奔流不息。思維敏捷，適應力強，不拘一格。', gift:'智慧、靈活應變、大局觀', challenge:'容易三心二意，難以持之以恆' },
  癸:{ title:'癸水 — 溫柔甘露', desc:'細膩、直覺力強、溫柔內斂，像甘露般滋潤人心。感受力豐富，富有同理心。', gift:'同理心、直覺、藝術靈感', challenge:'容易情緒化，過度敏感' },
};

// ── 計算函式 ───────────────────────────────────────────────

// 年柱
function getYearGZ(year: number, month: number, day: number) {
  // 立春（約2/4）前算上一年
  const isBeforeLiChun = month < 2 || (month === 2 && day < 4);
  const y = isBeforeLiChun ? year - 1 : year;
  const stemIdx   = ((y - 4) % 10 + 10) % 10;
  const branchIdx = ((y - 4) % 12 + 12) % 12;
  return { stemIdx, branchIdx };
}

// 月柱 — 月支固定，月干依年干推
function getMonthGZ(year: number, month: number, day: number) {
  const isBeforeLiChun = month < 2 || (month === 2 && day < 4);
  const y = isBeforeLiChun ? year - 1 : year;
  const yearStemIdx = ((y - 4) % 10 + 10) % 10;

  // 月支：寅(2)月=2月 → 依序
  const MONTH_BRANCH = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 0]; // Jan~Dec
  const branchIdx = MONTH_BRANCH[month - 1];

  // 月干起始（以寅月為起點）
  const stemStarts = [2, 4, 6, 8, 0]; // 甲己、乙庚、丙辛、丁壬、戊癸年
  const stemStart = stemStarts[yearStemIdx % 5];
  const monthOffset = (branchIdx - 2 + 12) % 12;
  const stemIdx = (stemStart + monthOffset) % 10;

  return { stemIdx, branchIdx };
}

// 日柱 — 以1900/1/1=甲戌(index=10)為基準
function getDayGZ(year: number, month: number, day: number) {
  const ref = new Date(1900, 0, 1);
  const target = new Date(year, month - 1, day);
  const diff = Math.round((target.getTime() - ref.getTime()) / 86400000);
  const idx = ((diff + 10) % 60 + 60) % 60;
  return { stemIdx: idx % 10, branchIdx: idx % 12 };
}

// 時柱 — hour=0~23
function getHourGZ(hour: number, dayStemIdx: number) {
  // 子時從23點開始
  const adjusted = hour === 23 ? 0 : Math.floor((hour + 1) / 2);
  const branchIdx = adjusted % 12;
  const stemStarts = [0, 2, 4, 6, 8];
  const stemStart = stemStarts[dayStemIdx % 5];
  const stemIdx = (stemStart + branchIdx) % 10;
  return { stemIdx, branchIdx };
}

// 五行計數
function countElements(pillars: { stemIdx:number; branchIdx:number }[]) {
  const count: Record<string,number> = { 木:0, 火:0, 土:0, 金:0, 水:0 };
  for (const p of pillars) {
    count[STEM_ELEMENT[p.stemIdx]]++;
    count[BRANCH_ELEMENT[p.branchIdx]]++;
  }
  return count;
}

// ── 介面 ───────────────────────────────────────────────────
type Pillar = { label:string; stemIdx:number; branchIdx:number };

export default function BaziPage() {
  const [year, setYear]   = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay]     = useState('');
  const [hour, setHour]   = useState('');
  const [result, setResult] = useState<null | {
    pillars: Pillar[];
    elements: Record<string,number>;
    dayMaster: string;
    yearZodiac: string;
  }>(null);

  function calculate() {
    const y = parseInt(year), m = parseInt(month), d = parseInt(day);
    if (!y || !m || !d) return;
    const h = hour ? parseInt(hour) : -1;

    const yearGZ  = getYearGZ(y, m, d);
    const monthGZ = getMonthGZ(y, m, d);
    const dayGZ   = getDayGZ(y, m, d);
    const hourGZ  = h >= 0 ? getHourGZ(h, dayGZ.stemIdx) : null;

    const pillars: Pillar[] = [
      { label:'年柱', ...yearGZ },
      { label:'月柱', ...monthGZ },
      { label:'日柱', ...dayGZ },
      ...(hourGZ ? [{ label:'時柱', ...hourGZ }] : []),
    ];

    setResult({
      pillars,
      elements: countElements(pillars),
      dayMaster: STEMS[dayGZ.stemIdx],
      yearZodiac: ZODIAC[yearGZ.branchIdx],
    });
  }

  const hours = Array.from({length:24},(_,i)=>`${String(i).padStart(2,'0')}:00`);

  return (
    <div style={{ minHeight:'100vh', background:'linear-gradient(135deg,#0f0a1e 0%,#1a0533 50%,#0a1628 100%)', padding:'2rem 1rem 6rem' }}>
      <div style={{ maxWidth:'700px', margin:'0 auto' }}>

        {/* 標題 */}
        <div style={{ textAlign:'center', marginBottom:'2rem' }}>
          <div style={{ fontSize:'2.5rem', marginBottom:'0.3rem' }}>🧧</div>
          <h1 style={{ color:'#fff', fontSize:'1.8rem', fontWeight:800, margin:'0 0 0.3rem' }}>八字命盤</h1>
          <p style={{ color:'#9ca3af', fontSize:'0.88rem', margin:0 }}>輸入生日，算出四柱天干地支與五行命格</p>
        </div>

        {/* 輸入區 */}
        <div style={{ background:'rgba(255,255,255,0.06)', border:'1px solid rgba(167,139,250,0.25)', borderRadius:'20px', padding:'1.5rem', marginBottom:'1.5rem' }}>
          <div style={{ marginBottom:'0.5rem' }}>
            <label style={{ color:'#a78bfa', fontSize:'0.82rem', fontWeight:700, display:'block', marginBottom:'0.5rem' }}>📅 出生日期（請輸入西元年）</label>
            <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr 1fr', gap:'0.6rem', marginBottom:'0.4rem' }}>
              <input type="number" placeholder="西元年　例：1990" value={year} onChange={e=>setYear(e.target.value)} min="1900" max="2099"
                style={{ background:'rgba(0,0,0,0.3)', border:'1px solid rgba(167,139,250,0.3)', borderRadius:'10px', color:'#fff', padding:'0.65rem 0.9rem', fontSize:'0.95rem', outline:'none', width:'100%', boxSizing:'border-box' }} />
              <select value={month} onChange={e=>setMonth(e.target.value)}
                style={{ background:'rgba(0,0,0,0.3)', border:'1px solid rgba(167,139,250,0.3)', borderRadius:'10px', color: month ? '#fff' : '#6b7280', padding:'0.65rem 0.5rem', fontSize:'0.95rem', outline:'none', boxSizing:'border-box' }}>
                <option value=''>月</option>
                {Array.from({length:12},(_,i)=><option key={i+1} value={i+1} style={{background:'#1a0533'}}>{i+1} 月</option>)}
              </select>
              <select value={day} onChange={e=>setDay(e.target.value)}
                style={{ background:'rgba(0,0,0,0.3)', border:'1px solid rgba(167,139,250,0.3)', borderRadius:'10px', color: day ? '#fff' : '#6b7280', padding:'0.65rem 0.5rem', fontSize:'0.95rem', outline:'none', boxSizing:'border-box' }}>
                <option value=''>日</option>
                {Array.from({length:31},(_,i)=><option key={i+1} value={i+1} style={{background:'#1a0533'}}>{i+1} 日</option>)}
              </select>
            </div>
            <p style={{ color:'#4b5563', fontSize:'0.72rem', margin:'0 0 1rem' }}>⚠️ 八字以節氣（立春約2/4）為年分界，非農曆也非國曆，以西元年輸入即可</p>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr', gap:'1rem', marginBottom:'1.2rem' }}>
            <div>
            <div>
              <label style={{ color:'#a78bfa', fontSize:'0.82rem', fontWeight:700, display:'block', marginBottom:'0.4rem' }}>🕐 出生時辰（選填）</label>
              <select value={hour} onChange={e=>setHour(e.target.value)}
                style={{ width:'100%', background:'rgba(0,0,0,0.3)', border:'1px solid rgba(167,139,250,0.3)', borderRadius:'10px', color: hour ? '#fff' : '#6b7280', padding:'0.65rem 0.9rem', fontSize:'0.95rem', outline:'none', boxSizing:'border-box' }}>
                <option value=''>不知道</option>
                {hours.map((h,i)=>(
                  <option key={i} value={i} style={{background:'#1a0533'}}>{h} — {BRANCHES[i===23?0:Math.floor((i+1)/2)%12]}時</option>
                ))}
              </select>
            </div>
          </div>
          <button onClick={calculate} style={{ width:'100%', background:'linear-gradient(135deg,#7c3aed,#ec4899)', color:'#fff', border:'none', borderRadius:'12px', padding:'0.85rem', fontSize:'1rem', fontWeight:800, cursor:'pointer' }}>
            🔍 排盤
          </button>
        </div>

        {/* 結果 */}
        {result && (
          <div style={{ animation:'fadeIn 0.4s ease' }}>

            {/* 四柱 */}
            <div style={{ display:'grid', gridTemplateColumns:`repeat(${result.pillars.length},1fr)`, gap:'0.7rem', marginBottom:'1.2rem' }}>
              {result.pillars.map((p, i) => {
                const stemEl  = STEM_ELEMENT[p.stemIdx];
                const branchEl = BRANCH_ELEMENT[p.branchIdx];
                const isDay = p.label === '日柱';
                return (
                  <div key={i} style={{ background: isDay ? 'linear-gradient(135deg,rgba(124,58,237,0.3),rgba(236,72,153,0.2))' : 'rgba(255,255,255,0.06)', border:`1px solid ${isDay?'rgba(167,139,250,0.6)':'rgba(255,255,255,0.1)'}`, borderRadius:'16px', padding:'1rem 0.5rem', textAlign:'center' }}>
                    <div style={{ color:'#6b7280', fontSize:'0.72rem', marginBottom:'0.5rem' }}>{p.label}{isDay?' (日主)':''}</div>
                    {/* 天干 */}
                    <div style={{ fontSize:'2rem', fontWeight:800, color: ELEMENT_COLOR[stemEl], lineHeight:1 }}>{STEMS[p.stemIdx]}</div>
                    <div style={{ fontSize:'0.68rem', color:ELEMENT_COLOR[stemEl], marginBottom:'0.4rem' }}>{ELEMENT_EMOJI[stemEl]}{stemEl}</div>
                    {/* 地支 */}
                    <div style={{ fontSize:'1.6rem', fontWeight:800, color:'#e9d5ff', lineHeight:1 }}>{BRANCHES[p.branchIdx]}</div>
                    <div style={{ fontSize:'0.65rem', color:'#9ca3af' }}>{ZODIAC[p.branchIdx]} · {BRANCH_ELEMENT[p.branchIdx]}</div>
                  </div>
                );
              })}
            </div>

            {/* 日主個性 */}
            {DAY_MASTER_DESC[result.dayMaster] && (
              <div style={{ background:'rgba(124,58,237,0.12)', border:'1px solid rgba(124,58,237,0.3)', borderRadius:'16px', padding:'1.3rem', marginBottom:'1.2rem' }}>
                <h3 style={{ color:'#a78bfa', fontSize:'1rem', fontWeight:800, margin:'0 0 0.6rem' }}>
                  {DAY_MASTER_DESC[result.dayMaster].title}
                  <span style={{ color:'#6b7280', fontSize:'0.78rem', fontWeight:400, marginLeft:'0.5rem' }}>生肖：{result.yearZodiac}</span>
                </h3>
                <p style={{ color:'#d1d5db', fontSize:'0.88rem', lineHeight:1.75, margin:'0 0 0.8rem' }}>{DAY_MASTER_DESC[result.dayMaster].desc}</p>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.6rem' }}>
                  <div style={{ background:'rgba(34,197,94,0.1)', border:'1px solid rgba(34,197,94,0.2)', borderRadius:'10px', padding:'0.6rem 0.8rem' }}>
                    <div style={{ color:'#22c55e', fontSize:'0.72rem', fontWeight:700, marginBottom:'0.2rem' }}>✨ 天賦特質</div>
                    <div style={{ color:'#d1d5db', fontSize:'0.82rem' }}>{DAY_MASTER_DESC[result.dayMaster].gift}</div>
                  </div>
                  <div style={{ background:'rgba(251,191,36,0.1)', border:'1px solid rgba(251,191,36,0.2)', borderRadius:'10px', padding:'0.6rem 0.8rem' }}>
                    <div style={{ color:'#fbbf24', fontSize:'0.72rem', fontWeight:700, marginBottom:'0.2rem' }}>⚡ 成長功課</div>
                    <div style={{ color:'#d1d5db', fontSize:'0.82rem' }}>{DAY_MASTER_DESC[result.dayMaster].challenge}</div>
                  </div>
                </div>
              </div>
            )}

            {/* 五行分析 */}
            <div style={{ background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:'16px', padding:'1.3rem', marginBottom:'1.2rem' }}>
              <h3 style={{ color:'#e9d5ff', fontSize:'0.95rem', fontWeight:700, margin:'0 0 1rem' }}>🌈 五行分佈</h3>
              {(['木','火','土','金','水'] as const).map(el => {
                const count = result.elements[el] || 0;
                const total = result.pillars.length * 2;
                const pct = Math.round(count / total * 100);
                let note = '';
                if (count === 0) note = '缺 — 可多接觸相關顏色或方位';
                else if (count >= 4) note = '旺 — 個性中此特質鮮明';
                return (
                  <div key={el} style={{ marginBottom:'0.7rem' }}>
                    <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'0.25rem' }}>
                      <span style={{ color:ELEMENT_COLOR[el], fontWeight:700, fontSize:'0.88rem' }}>{ELEMENT_EMOJI[el]} {el}</span>
                      <span style={{ color:'#9ca3af', fontSize:'0.78rem' }}>{count} 個 {note && `· ${note}`}</span>
                    </div>
                    <div style={{ background:'rgba(255,255,255,0.08)', borderRadius:'6px', height:'8px', overflow:'hidden' }}>
                      <div style={{ width:`${pct}%`, height:'100%', background:ELEMENT_COLOR[el], borderRadius:'6px', transition:'width 0.6s ease' }}></div>
                    </div>
                  </div>
                );
              })}
            </div>

            <p style={{ color:'#4b5563', fontSize:'0.72rem', textAlign:'center' }}>
              ✨ 以節氣（立春約2/4）為年分界，月柱以各月4日左右為基準，僅供娛樂參考
            </p>
          </div>
        )}

        {/* 導航 */}
        <div style={{ textAlign:'center', marginTop:'2rem', display:'flex', gap:'1.5rem', justifyContent:'center', flexWrap:'wrap' }}>
          <Link href="/games" style={{ color:'#7c3aed', fontSize:'0.9rem', textDecoration:'none', fontWeight:600 }}>← 小遊戲</Link>
          <Link href="/horoscope" style={{ color:'#f59e0b', fontSize:'0.9rem', textDecoration:'none', fontWeight:600 }}>⭐ 星座運勢</Link>
        </div>

      </div>
      <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}`}</style>
    </div>
  );
}
