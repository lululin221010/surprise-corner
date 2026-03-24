'use client';
// 📄 路徑：src/app/tarot-year/page.tsx
// 流年塔羅：輸入生日 → 生命靈數 → 今年主題牌 + 關鍵字

import { useState } from 'react';
import Link from 'next/link';

// ── 大阿爾克那 22 張 ───────────────────────────────────────
const MAJOR_ARCANA = [
  { num:0,  name:'愚者',     emoji:'🃏', color:'#facc15', keyword:'新開始、勇敢踏出', desc:'今年是全新起點的一年，放下過去的包袱，帶著赤子之心往未知出發。不需要完美的計畫，只需要踏出第一步的勇氣。', light:'冒險精神、自由、無限可能', shadow:'衝動、輕率、逃避責任' },
  { num:1,  name:'魔術師',   emoji:'🔮', color:'#ef4444', keyword:'意志、顯化、行動力', desc:'今年你擁有將夢想化為現實的能量。你手中已有所有需要的工具，關鍵是相信自己並付諸行動。', light:'創造力、自信、執行力', shadow:'操控、自負、力量濫用' },
  { num:2,  name:'女祭司',   emoji:'🌙', color:'#8b5cf6', keyword:'直覺、秘密、內在智慧', desc:'今年適合向內探索，相信直覺勝過邏輯。很多答案藏在你的潛意識裡，靜下來聆聽內心的聲音。', light:'智慧、直覺、神秘感', shadow:'壓抑情感、過度神秘、被動' },
  { num:3,  name:'女皇',     emoji:'🌸', color:'#ec4899', keyword:'豐盛、創造、滋養', desc:'今年充滿豐盛與創造的能量，無論是事業、感情或個人成長都會有所收穫。懂得照顧自己的人才能滋養他人。', light:'豐盛、美麗、創造力', shadow:'依賴、放縱、過度保護' },
  { num:4,  name:'皇帝',     emoji:'👑', color:'#f97316', keyword:'秩序、掌控、建立架構', desc:'今年需要建立穩固的基礎與秩序。你的領導力與決斷力是最大的資產，適合規劃長期目標並嚴格執行。', light:'領導力、穩定、責任感', shadow:'獨裁、固執、控制欲' },
  { num:5,  name:'教皇',     emoji:'⛪', color:'#6b7280', keyword:'傳承、信仰、正統', desc:'今年的功課在於尋找人生的信仰與價值觀。師長或導師的智慧對你特別有幫助，也是傳承知識的好時機。', light:'智慧傳承、道德、精神成長', shadow:'墨守成規、教條主義、壓抑' },
  { num:6,  name:'戀人',     emoji:'💕', color:'#f9a8d4', keyword:'選擇、連結、真實的愛', desc:'今年面臨重要的選擇與承諾。感情上有深化的機會，但關鍵在於做出與內心真實一致的選擇，而非迎合他人期待。', light:'愛、和諧、真實選擇', shadow:'猶豫不決、誘惑、不忠' },
  { num:7,  name:'戰車',     emoji:'🏆', color:'#0ea5e9', keyword:'意志、勝利、自律', desc:'今年是克服挑戰、邁向勝利的一年。只要意志堅定、紀律到位，你能突破所有阻礙。記住，方向比速度更重要。', light:'勝利、自律、決心', shadow:'攻擊性、過度控制、衝動' },
  { num:8,  name:'力量',     emoji:'🦁', color:'#f59e0b', keyword:'內在力量、耐心、慈悲', desc:'今年的力量來自溫柔而非蠻力。用耐心和同理心面對困難，你會發現真正的強大是從容應對一切。', light:'勇氣、耐心、內在力量', shadow:'懷疑自己、壓抑本能', },
  { num:9,  name:'隱者',     emoji:'🕯️', color:'#94a3b8', keyword:'獨處、內省、尋找真理', desc:'今年需要一段獨處與沉澱的時光。退一步，向內尋找答案，你的智慧在安靜中才能被聽見。', light:'智慧、內省、引導他人', shadow:'孤立、過度退縮、與世隔絕' },
  { num:10, name:'命運之輪', emoji:'☯️', color:'#10b981', keyword:'轉機、循環、命運轉折', desc:'今年是命運轉折的時刻，好壞皆有可能。把握機會，在低谷時保持信心，一切都在更大的循環之中。', light:'命運轉機、機會、循環', shadow:'運氣不穩、失控感、宿命論' },
  { num:11, name:'正義',     emoji:'⚖️', color:'#38bdf8', keyword:'公正、因果、誠實', desc:'今年強調因果與公平。你的過去所做所為將有所回報，誠實面對自己和他人是這一年最重要的功課。', light:'公平、誠實、因果', shadow:'不公正、偏執、過度批判' },
  { num:12, name:'倒吊人',   emoji:'🙃', color:'#a78bfa', keyword:'等待、犧牲、換個視角', desc:'今年需要暫停和等待。換個角度看問題，有時候放棄控制才能獲得真正的自由。犧牲某些東西是為了更大的收穫。', light:'新視角、犧牲、接受', shadow:'停滯、殉道情結、無力感' },
  { num:13, name:'死神',     emoji:'🌑', color:'#1e293b', keyword:'結束、蛻變、新生', desc:'今年某段旅程將告終，但這是為了讓新的可能誕生。不要害怕結束，蛻變永遠伴隨著一定程度的告別。', light:'轉化、蛻變、放下', shadow:'抗拒改變、恐懼、停滯' },
  { num:14, name:'節制',     emoji:'🌈', color:'#06b6d4', keyword:'平衡、耐心、整合', desc:'今年的主題是尋找平衡。不走極端，把不同面向整合成和諧的一體。慢慢來，耐心地讓事情自然流動。', light:'平衡、耐心、療癒', shadow:'失衡、過度放縱、缺乏節制' },
  { num:15, name:'惡魔',     emoji:'⛓️', color:'#7f1d1d', keyword:'束縛、執念、陰暗面', desc:'今年需要正視自己的執念與陰暗面。那些讓你感到被困住的事物，其實只有你自己才能解開枷鎖。', light:'誠實面對黑暗、釋放、自由', shadow:'上癮、物質主義、自我囚禁' },
  { num:16, name:'高塔',     emoji:'⚡', color:'#dc2626', keyword:'突破、衝擊、重建', desc:'今年可能有突如其來的衝擊或變化。雖然當下感到震驚，但倒塌的往往是需要被清除的，之後的重建會更穩固。', light:'突破、清除舊有、重建', shadow:'混亂、創傷、抗拒改變' },
  { num:17, name:'星星',     emoji:'⭐', color:'#fbbf24', keyword:'希望、療癒、指引', desc:'今年充滿希望與療癒的能量。就算還有傷痛，星星的光始終在那裡為你指引方向。相信未來，一切都在好轉。', light:'希望、療癒、靈感', shadow:'幻想、逃避現實、失望' },
  { num:18, name:'月亮',     emoji:'🌕', color:'#7c3aed', keyword:'幻象、直覺、潛意識', desc:'今年你的直覺特別靈敏，但同時也容易受幻象迷惑。分辨真實與幻想是今年的功課，相信你的感覺但保持清醒。', light:'直覺、夢境、靈性', shadow:'幻象、恐懼、自我欺騙' },
  { num:19, name:'太陽',     emoji:'☀️', color:'#f59e0b', keyword:'喜悅、成功、活力', desc:'今年充滿光明與喜悅！你的努力將得到認可，自信與活力讓你光芒四射。這是展現自我、享受生命的一年。', light:'喜悅、成功、自信', shadow:'自我中心、驕傲、膚淺' },
  { num:20, name:'審判',     emoji:'📯', color:'#10b981', keyword:'覺醒、召喚、重生', desc:'今年是覺醒與回顧的時刻。你將聽到內心深處的召喚，勇敢誠實地評估過去，為下一段旅程做好準備。', light:'覺醒、原諒、重生', shadow:'自責、無法釋懷、逃避審視' },
  { num:21, name:'世界',     emoji:'🌍', color:'#22c55e', keyword:'完成、整合、里程碑', desc:'今年是一個重要循環的完成。你已走過漫長的路，現在是收穫與整合的時刻。慶祝你的成就，然後準備迎接下一個旅程。', light:'完成、成就、整合', shadow:'停滯不前、完美主義阻礙完成' },
];

// ── 生命靈數計算 ────────────────────────────────────────
function reduceNumber(n: number): number {
  while (n > 22) {
    n = String(n).split('').reduce((a, b) => a + parseInt(b), 0);
  }
  return n;
}

function getLifeNumber(year: number, month: number, day: number): number {
  const sum = String(year).split('').reduce((a,b)=>a+parseInt(b),0)
    + month + day;
  return reduceNumber(sum);
}

function getYearNumber(birthMonth: number, birthDay: number): number {
  const currentYear = new Date().getFullYear();
  const sum = birthMonth + birthDay + String(currentYear).split('').reduce((a,b)=>a+parseInt(b),0);
  return reduceNumber(sum);
}

export default function TarotYearPage() {
  const [date, setDate] = useState('');
  const [result, setResult] = useState<null|{
    lifeNum: number; yearNum: number;
    lifeCard: typeof MAJOR_ARCANA[0];
    yearCard: typeof MAJOR_ARCANA[0];
  }>(null);

  function calculate() {
    if (!date) return;
    const [y, m, d] = date.split('-').map(Number);
    const lifeNum = getLifeNumber(y, m, d);
    const yearNum = getYearNumber(m, d);
    const lifeCard = MAJOR_ARCANA[lifeNum % 22];
    const yearCard = MAJOR_ARCANA[yearNum % 22];
    setResult({ lifeNum, yearNum, lifeCard, yearCard });
  }

  const currentYear = new Date().getFullYear();

  return (
    <div style={{ minHeight:'100vh', background:'linear-gradient(135deg,#0f0a1e 0%,#1a0533 50%,#0a1628 100%)', padding:'2rem 1rem 6rem' }}>
      <div style={{ maxWidth:'700px', margin:'0 auto' }}>

        {/* 標題 */}
        <div style={{ textAlign:'center', marginBottom:'2rem' }}>
          <div style={{ fontSize:'2.5rem', marginBottom:'0.3rem' }}>🎴</div>
          <h1 style={{ color:'#fff', fontSize:'1.8rem', fontWeight:800, margin:'0 0 0.3rem' }}>流年塔羅</h1>
          <p style={{ color:'#9ca3af', fontSize:'0.88rem', margin:0 }}>生命靈數 × 大阿爾克那，看見 {currentYear} 年的主題牌</p>
        </div>

        {/* 輸入區 */}
        <div style={{ background:'rgba(255,255,255,0.06)', border:'1px solid rgba(167,139,250,0.25)', borderRadius:'20px', padding:'1.5rem', marginBottom:'1.5rem' }}>
          <label style={{ color:'#a78bfa', fontSize:'0.82rem', fontWeight:700, display:'block', marginBottom:'0.4rem' }}>📅 出生日期</label>
          <input type="date" value={date} onChange={e=>setDate(e.target.value)}
            style={{ width:'100%', background:'rgba(0,0,0,0.3)', border:'1px solid rgba(167,139,250,0.3)', borderRadius:'10px', color:'#fff', padding:'0.65rem 0.9rem', fontSize:'0.95rem', outline:'none', boxSizing:'border-box', marginBottom:'1rem' }} />
          <button onClick={calculate} style={{ width:'100%', background:'linear-gradient(135deg,#7c3aed,#9333ea)', color:'#fff', border:'none', borderRadius:'12px', padding:'0.85rem', fontSize:'1rem', fontWeight:800, cursor:'pointer' }}>
            🔮 抽出我的流年牌
          </button>
        </div>

        {/* 結果 */}
        {result && (
          <div style={{ animation:'fadeIn 0.4s ease' }}>

            {/* 兩張牌 */}
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem', marginBottom:'1.2rem' }}>
              {[
                { label:'🌟 生命牌（一生主題）', num:result.lifeNum, card:result.lifeCard },
                { label:`✨ ${currentYear} 流年牌`, num:result.yearNum, card:result.yearCard },
              ].map(({ label, num, card }) => (
                <div key={label} style={{ background:`${card.color}15`, border:`2px solid ${card.color}44`, borderRadius:'20px', padding:'1.5rem', textAlign:'center' }}>
                  <div style={{ color:'#6b7280', fontSize:'0.72rem', fontWeight:700, marginBottom:'0.8rem' }}>{label}</div>
                  <div style={{ fontSize:'3.5rem', marginBottom:'0.3rem' }}>{card.emoji}</div>
                  <div style={{ color:'#9ca3af', fontSize:'0.75rem', marginBottom:'0.2rem' }}>第 {card.num} 張</div>
                  <div style={{ color:card.color, fontSize:'1.3rem', fontWeight:800, marginBottom:'0.5rem' }}>{card.name}</div>
                  <div style={{ background:`${card.color}22`, color:card.color, padding:'0.2rem 0.6rem', borderRadius:'20px', fontSize:'0.75rem', fontWeight:700, display:'inline-block', marginBottom:'0.8rem' }}>
                    {card.keyword}
                  </div>
                  <div style={{ color:'#6b7280', fontSize:'0.75rem' }}>靈數 {num}</div>
                </div>
              ))}
            </div>

            {/* 流年牌詳解 */}
            <div style={{ background:`${result.yearCard.color}12`, border:`1px solid ${result.yearCard.color}33`, borderRadius:'16px', padding:'1.3rem', marginBottom:'1rem' }}>
              <h3 style={{ color:result.yearCard.color, fontSize:'1rem', fontWeight:800, margin:'0 0 0.7rem' }}>
                {currentYear} 年詳解：{result.yearCard.name}
              </h3>
              <p style={{ color:'#d1d5db', fontSize:'0.88rem', lineHeight:1.8, margin:'0 0 1rem' }}>{result.yearCard.desc}</p>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.6rem' }}>
                <div style={{ background:'rgba(34,197,94,0.08)', border:'1px solid rgba(34,197,94,0.2)', borderRadius:'10px', padding:'0.6rem 0.8rem' }}>
                  <div style={{ color:'#22c55e', fontSize:'0.72rem', fontWeight:700, marginBottom:'0.2rem' }}>✨ 正位能量</div>
                  <div style={{ color:'#d1d5db', fontSize:'0.82rem' }}>{result.yearCard.light}</div>
                </div>
                <div style={{ background:'rgba(251,191,36,0.08)', border:'1px solid rgba(251,191,36,0.2)', borderRadius:'10px', padding:'0.6rem 0.8rem' }}>
                  <div style={{ color:'#fbbf24', fontSize:'0.72rem', fontWeight:700, marginBottom:'0.2rem' }}>⚠️ 逆位提醒</div>
                  <div style={{ color:'#d1d5db', fontSize:'0.82rem' }}>{result.yearCard.shadow}</div>
                </div>
              </div>
            </div>

            {/* 生命牌詳解（摺疊感） */}
            <div style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:'16px', padding:'1.2rem', marginBottom:'1rem' }}>
              <h3 style={{ color:'#e9d5ff', fontSize:'0.95rem', fontWeight:700, margin:'0 0 0.6rem' }}>
                🌟 生命牌詳解：{result.lifeCard.name}
              </h3>
              <p style={{ color:'#9ca3af', fontSize:'0.85rem', lineHeight:1.75, margin:0 }}>{result.lifeCard.desc}</p>
            </div>

            {/* 組合解讀 */}
            {result.lifeCard.num !== result.yearCard.num && (
              <div style={{ background:'rgba(124,58,237,0.1)', border:'1px solid rgba(124,58,237,0.25)', borderRadius:'16px', padding:'1.2rem', marginBottom:'1rem' }}>
                <h3 style={{ color:'#a78bfa', fontSize:'0.9rem', fontWeight:700, margin:'0 0 0.5rem' }}>🔭 生命牌 × 流年牌 組合</h3>
                <p style={{ color:'#d1d5db', fontSize:'0.85rem', lineHeight:1.75, margin:0 }}>
                  你的生命主題是「<span style={{color:result.lifeCard.color,fontWeight:700}}>{result.lifeCard.keyword}</span>」，
                  今年的主旋律是「<span style={{color:result.yearCard.color,fontWeight:700}}>{result.yearCard.keyword}</span>」。
                  {result.lifeCard.num < result.yearCard.num
                    ? ' 今年的課題正在推動你的生命主題向前演化，是一個重要的成長節點。'
                    : ' 今年的能量與你的生命底色高度共鳴，可以把握這段時間深化自我理解。'
                  }
                </p>
              </div>
            )}

            {result.lifeCard.num === result.yearCard.num && (
              <div style={{ background:'rgba(251,191,36,0.1)', border:'1px solid rgba(251,191,36,0.3)', borderRadius:'16px', padding:'1.2rem', marginBottom:'1rem', textAlign:'center' }}>
                <div style={{ fontSize:'1.5rem', marginBottom:'0.3rem' }}>✨</div>
                <p style={{ color:'#fbbf24', fontWeight:700, margin:'0 0 0.3rem' }}>生命牌 = 流年牌！</p>
                <p style={{ color:'#d1d5db', fontSize:'0.85rem', margin:0 }}>今年的能量與你的生命主題完全重合，這是特別關鍵的一年，{result.yearCard.name}的能量在你身上被高度放大。</p>
              </div>
            )}

            <p style={{ color:'#4b5563', fontSize:'0.72rem', textAlign:'center' }}>
              ✨ 流年牌以出生月日加當年份計算生命靈數，再對應大阿爾克那，僅供娛樂參考
            </p>
          </div>
        )}

        {/* 導航 */}
        <div style={{ textAlign:'center', marginTop:'2rem', display:'flex', gap:'1.5rem', justifyContent:'center', flexWrap:'wrap' }}>
          <Link href="/games" style={{ color:'#7c3aed', fontSize:'0.9rem', textDecoration:'none', fontWeight:600 }}>← 小遊戲</Link>
          <Link href="/moon-sign" style={{ color:'#06b6d4', fontSize:'0.9rem', textDecoration:'none', fontWeight:600 }}>🌙 月亮星座</Link>
          <Link href="/tarot" style={{ color:'#9333ea', fontSize:'0.9rem', textDecoration:'none', fontWeight:600 }}>🔮 塔羅占卜</Link>
        </div>

      </div>
      <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}`}</style>
    </div>
  );
}
