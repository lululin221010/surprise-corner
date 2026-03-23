'use client';
// 📄 路徑：src/app/horoscope/page.tsx
// 12星座每日運勢 — 日期種子組裝，每天固定、每天換新

import { useState } from 'react';

const SIGNS = [
  { name:'牡羊座', symbol:'♈', emoji:'🔥', dates:'3/21－4/19', element:'火', color:'#ef4444', desc:'衝勁十足的開拓者' },
  { name:'金牛座', symbol:'♉', emoji:'🌿', dates:'4/20－5/20', element:'土', color:'#84cc16', desc:'踏實穩健的守護者' },
  { name:'雙子座', symbol:'♊', emoji:'💨', dates:'5/21－6/20', element:'風', color:'#facc15', desc:'靈活多變的溝通者' },
  { name:'巨蟹座', symbol:'♋', emoji:'🌙', dates:'6/21－7/22', element:'水', color:'#38bdf8', desc:'溫柔細膩的守護者' },
  { name:'獅子座', symbol:'♌', emoji:'☀️', dates:'7/23－8/22', element:'火', color:'#f97316', desc:'熱情耀眼的領導者' },
  { name:'處女座', symbol:'♍', emoji:'🌾', dates:'8/23－9/22', element:'土', color:'#10b981', desc:'精準完美的分析者' },
  { name:'天秤座', symbol:'♎', emoji:'⚖️', dates:'9/23－10/22', element:'風', color:'#ec4899', desc:'優雅和諧的平衡者' },
  { name:'天蠍座', symbol:'♏', emoji:'🦂', dates:'10/23－11/21', element:'水', color:'#8b5cf6', desc:'深邃神秘的洞察者' },
  { name:'射手座', symbol:'♐', emoji:'🏹', dates:'11/22－12/21', element:'火', color:'#f59e0b', desc:'樂觀自由的探索者' },
  { name:'摩羯座', symbol:'♑', emoji:'🏔️', dates:'12/22－1/19', element:'土', color:'#6b7280', desc:'自律堅毅的實踐者' },
  { name:'水瓶座', symbol:'♒', emoji:'⚡', dates:'1/20－2/18', element:'風', color:'#06b6d4', desc:'前衛獨特的革新者' },
  { name:'雙魚座', symbol:'♓', emoji:'🐟', dates:'2/19－3/20', element:'水', color:'#a78bfa', desc:'浪漫夢幻的感知者' },
];

// ── 運勢詞庫 ──────────────────────────────────────────────
const OVERALL = [
  '今天的能量特別順暢，凡事順勢而為，好事自然降臨。',
  '有些事看似停滯，其實是在為更大的突破積蓄力量，耐心等待。',
  '保持平常心，今天適合整理思緒，而非急於行動。',
  '直覺力強，相信第一感覺，往往比反覆思量更準確。',
  '今天可能遇到小波折，但都在掌控之中，無需過度擔心。',
  '貴人運旺盛，主動開口，往往能得到意想不到的幫助。',
  '放慢步伐，今天不適合倉促決定，靜待最佳時機。',
  '創意能量充沛，任何靈感都值得記錄，不要讓好點子溜走。',
  '與其糾結昨天，不如專注當下，今天有美好的事等著你。',
  '運勢平穩，適合處理積壓的日常事務，逐一清理心頭大石。',
  '今天適合與人交流，一次看似普通的對話可能帶來意外的轉機。',
  '能量偏低，記得補充休息，照顧好自己才能照顧好其他事。',
  '今天的小勝利值得慶祝，別讓它輕易溜走，享受當下的滿足。',
  '心情可能有些起伏，允許自己感受，不必急著調整。',
  '今天適合做長期規劃，冷靜分析勝過衝動執行。',
  '舊緣有機會重新連結，不妨回覆那條一直沒回的訊息。',
  '今天的努力不會白費，即使現在看不見結果，種子已經種下。',
  '別讓完美主義拖住你，完成比完美更重要，先踏出第一步。',
  '今天適合獨處充電，不必勉強社交，給自己一點空間。',
  '意外的好消息可能在下午或傍晚出現，保持開放的心情。',
];

const LOVE = [
  '單身者：有緣分悄悄靠近，保持微笑比刻意追求更有效。',
  '伴侶關係溫馨，一句「今天怎麼樣」就能讓對方感受到你的心意。',
  '感情上有些話憋在心裡，今天是說出口的好時機。',
  '不必為愛情焦慮，緣分自有安排，先把自己過好。',
  '今天容易對伴侶期望過高，記得對方也是凡人，多一點包容。',
  '舊情人的消息可能出現，保持清醒，想清楚再做決定。',
  '與伴侶一起做一件小事，比大計畫更能拉近距離。',
  '單身者：今天的相遇不一定是愛情，但可能是很好的朋友。',
  '感情運平穩，不追不跑，讓關係自然流動。',
  '愛自己是一切的前提，今天多做一件讓自己開心的事。',
  '伴侶可能有些情緒，耐心傾聽比給建議更重要。',
  '感情上有小誤會，直接說清楚，別讓猜測越滾越大。',
  '今天的浪漫指數高，主動製造小驚喜，對方一定很開心。',
  '單身者：別把所有能量都放在等待愛情，先充實自己。',
  '與另一半的默契加深，不需要語言也能明白對方的意思。',
  '今天適合思考自己在感情中真正需要什麼，誠實面對自己。',
  '緣分有時候就藏在日常之中，對身邊的人多一點用心。',
  '感情需要經營，今天送出一個訊息，讓對方知道你在想他。',
  '放下過去的傷，不是為了對方，而是為了讓自己更自由。',
  '今天的心情容易影響感情判斷，重大決定留到情緒平穩再說。',
];

const CAREER = [
  '工作上的努力開始有人看見，繼續保持，機會正在靠近。',
  '今天適合主動提出新想法，拖延只會讓好機會溜走。',
  '遇到棘手問題，不妨換個角度，往往有意想不到的解法。',
  '與同事的合作順暢，團隊的力量今天特別明顯。',
  '今天容易分心，把最重要的事排在上午，效率最高。',
  '職場上有貴人相助，留意身邊願意給你建議的人。',
  '適合學習新技能，今天吸收知識的效率比平常高。',
  '某個被擱置的計畫值得重新檢視，時機可能比之前更成熟。',
  '今天不適合倉促做決定，多蒐集資訊再行動。',
  '工作壓力稍大，記得在忙碌中給自己五分鐘的喘息。',
  '今天的專注力強，適合處理需要深度思考的工作。',
  '與上司的溝通有機會，把握時機表達你的想法。',
  '細節決定成敗，今天仔細檢查你的工作，避免小錯誤。',
  '創意靈感源源不絕，把腦中的想法先記下來，之後整理。',
  '今天適合清理工作清單，把不重要的事項刪掉，聚焦核心。',
  '一件讓你拖很久的事，今天做掉它，會感覺輕鬆很多。',
  '職場競爭感受加重，做好自己就是最好的策略，不必比較。',
  '今天的溝通效果好，適合洽談合作或處理懸而未決的事項。',
  '工作節奏比較慢，不要勉強加速，穩紮穩打最可靠。',
  '今天的努力是在為未來鋪路，即使現在看不見，繼續做。',
];

const WEALTH = [
  '財運穩健，適合小額投資或儲蓄計畫，不宜大起大落。',
  '今天可能有意外的小收入，留意身邊的機會。',
  '消費前多想三秒，衝動購物今天特別容易發生。',
  '適合整理財務狀況，把帳目理清，心情也會更輕鬆。',
  '今天不適合借貸，金錢往來保持謹慎。',
  '有機會透過人脈得到財務上的好消息，保持聯繫。',
  '今天的財運偏低，守財為上，避免重大支出。',
  '投資需謹慎，不聽小道消息，做好功課再決定。',
  '今天適合思考開源節流的方法，小習慣也能帶來大改變。',
  '財運上升，之前的付出開始有所回報，繼續努力。',
  '今天不宜衝動投資，等待市場更明朗再行動。',
  '適合把多餘的錢存起來，留一筆緊急備用金很重要。',
  '今天的消費運高，適合購買自己真正需要的東西，物超所值。',
  '與錢有關的決定，今天多聽一個人的意見再做。',
  '副業或兼職的機會可能出現，值得評估看看。',
  '今天不適合賭博或高風險操作，理性比衝動更值錢。',
  '財務上的小困擾只是暫時，很快就會解決，不必太焦慮。',
  '今天適合思考長期財務目標，小步慢走也能走得遠。',
  '意外支出可能出現，手邊保持一點彈性資金比較安心。',
  '今天的努力有機會在未來轉換成財富，現在種下的種子很重要。',
];

const HEALTH = [
  '今天精力充沛，適合運動或戶外活動，好好消耗能量。',
  '注意水分補充，今天容易忘記喝水，設個提醒。',
  '睡眠品質影響今天的狀態，今晚早點關燈，明天更有精神。',
  '肩頸有些緊繃，每隔一小時起來活動一下，別讓它積累。',
  '今天情緒容易波動，給自己五分鐘深呼吸，穩定心神。',
  '腸胃需要注意，飲食清淡一些，避免刺激性食物。',
  '今天適合做一件讓身體放鬆的事：泡澡、拉筋或散步都好。',
  '眼睛容易疲勞，記得讓螢幕休息，望向遠方放鬆一下。',
  '今天身體狀態良好，是開始新健康習慣的好時機。',
  '心理健康也很重要，今天允許自己什麼都不做。',
  '飲食均衡很重要，今天多吃一份蔬菜，身體會謝謝你。',
  '今天容易感到疲憊，聽從身體的聲音，需要休息就休息。',
  '適度運動能幫助今天的情緒穩定，哪怕只是走路十分鐘。',
  '今天免疫力稍弱，注意保暖，不要讓自己著涼。',
  '壓力過大時，找一個讓自己放鬆的出口，不要悶著。',
  '今天精神比較散，把最重要的事情排好優先順序，一件一件來。',
  '保持規律作息是今天的重點，早睡早起讓能量更穩定。',
  '今天適合嘗試一種新的放鬆方式，冥想或輕音樂都不錯。',
  '身體傳遞的小訊號要留意，不舒服的地方別一直拖。',
  '今天心情影響健康，保持正向思考，身體也會跟著好轉。',
];

const LUCKY = [
  { color:'#ef4444', name:'紅色', numbers:'3, 9' },
  { color:'#f97316', name:'橙色', numbers:'2, 7' },
  { color:'#facc15', name:'黃色', numbers:'5, 1' },
  { color:'#84cc16', name:'綠色', numbers:'4, 8' },
  { color:'#06b6d4', name:'青色', numbers:'6, 0' },
  { color:'#3b82f6', name:'藍色', numbers:'1, 6' },
  { color:'#8b5cf6', name:'紫色', numbers:'7, 3' },
  { color:'#ec4899', name:'粉色', numbers:'2, 5' },
  { color:'#ffffff', name:'白色', numbers:'8, 4' },
  { color:'#6b7280', name:'灰色', numbers:'9, 2' },
  { color:'#fbbf24', name:'金色', numbers:'5, 0' },
  { color:'#f9a8d4', name:'玫瑰色', numbers:'3, 6' },
];

const STARS = ['★★★★★','★★★★☆','★★★☆☆','★★★★★','★★★☆☆','★★★★☆','★★★★★','★★★☆☆','★★★★☆','★★★★★'];

// ── 日期種子 ──────────────────────────────────────────────
function dateHash(signIdx: number, aspect: number): number {
  const d = new Date();
  const n = (d.getFullYear() * 10000 + (d.getMonth()+1) * 100 + d.getDate()) * 100 + signIdx * 13 + aspect * 7;
  let h = n ^ (n >>> 16);
  h = Math.imul(h, 0x45d9f3b);
  h ^= h >>> 16;
  return Math.abs(h);
}
function pick<T>(arr: T[], signIdx: number, aspect: number): T {
  return arr[dateHash(signIdx, aspect) % arr.length];
}

function getTodayStr() {
  const d = new Date();
  return `${d.getFullYear()} 年 ${d.getMonth()+1} 月 ${d.getDate()} 日`;
}

export default function HoroscopePage() {
  const [selected, setSelected] = useState<number | null>(null);

  const sign = selected !== null ? SIGNS[selected] : null;
  const lucky = selected !== null ? pick(LUCKY, selected, 10) : null;
  const stars = {
    overall: pick(STARS, selected??0, 0),
    love:    pick(STARS, selected??0, 1),
    career:  pick(STARS, selected??0, 2),
    wealth:  pick(STARS, selected??0, 3),
    health:  pick(STARS, selected??0, 4),
  };

  return (
    <div style={{ minHeight:'100vh', background:'linear-gradient(135deg,#0f0a1e 0%,#1a0533 50%,#0a1628 100%)', padding:'2rem 1rem 6rem' }}>
      <div style={{ maxWidth:'800px', margin:'0 auto' }}>

        {/* 標題 */}
        <div style={{ textAlign:'center', marginBottom:'2rem' }}>
          <div style={{ fontSize:'2.5rem', marginBottom:'0.3rem' }}>⭐</div>
          <h1 style={{ color:'#fff', fontSize:'1.8rem', fontWeight:800, margin:'0 0 0.3rem' }}>每日星座運勢</h1>
          <p style={{ color:'#9ca3af', fontSize:'0.88rem', margin:0 }}>{getTodayStr()} · 選擇你的星座</p>
        </div>

        {/* 12星座格 */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(110px,1fr))', gap:'0.7rem', marginBottom:'2rem' }}>
          {SIGNS.map((s, i) => (
            <button key={s.name} onClick={() => setSelected(i)} style={{
              background: selected===i ? `${s.color}33` : 'rgba(255,255,255,0.06)',
              border: `2px solid ${selected===i ? s.color : 'rgba(255,255,255,0.1)'}`,
              borderRadius:'14px', padding:'0.8rem 0.4rem', cursor:'pointer',
              transition:'all 0.2s', color:'#fff',
            }}>
              <div style={{ fontSize:'1.4rem' }}>{s.emoji}</div>
              <div style={{ fontSize:'0.8rem', fontWeight:700, marginTop:'0.2rem', color: selected===i ? s.color : '#e9d5ff' }}>{s.name}</div>
              <div style={{ fontSize:'0.65rem', color:'#6b7280', marginTop:'0.1rem' }}>{s.dates}</div>
            </button>
          ))}
        </div>

        {/* 運勢內容 */}
        {sign && selected !== null && (
          <div style={{ animation:'fadeIn 0.4s ease' }}>

            {/* 星座標題 */}
            <div style={{ background:`linear-gradient(135deg,${sign.color}22,${sign.color}11)`, border:`1px solid ${sign.color}44`, borderRadius:'20px', padding:'1.5rem', marginBottom:'1.2rem', textAlign:'center' }}>
              <div style={{ fontSize:'3rem' }}>{sign.emoji}</div>
              <h2 style={{ color:sign.color, fontSize:'1.5rem', fontWeight:800, margin:'0.3rem 0 0.2rem' }}>{sign.name} {sign.symbol}</h2>
              <p style={{ color:'#9ca3af', fontSize:'0.82rem', margin:'0 0 0.8rem' }}>{sign.desc} · {sign.element}象星座</p>
              <div style={{ background:'rgba(0,0,0,0.2)', borderRadius:'12px', padding:'0.8rem 1rem', marginBottom:'0.6rem' }}>
                <p style={{ color:'#e9d5ff', fontSize:'0.92rem', lineHeight:1.7, margin:0 }}>
                  {pick(OVERALL, selected, 0)}
                </p>
              </div>
              <div style={{ display:'flex', justifyContent:'center', gap:'0.5rem', flexWrap:'wrap' }}>
                <span style={{ background:`${sign.color}22`, color:sign.color, padding:'0.25rem 0.8rem', borderRadius:'20px', fontSize:'0.78rem', fontWeight:700 }}>整體 {stars.overall}</span>
                <span style={{ background:'rgba(255,255,255,0.08)', color:'#f9a8d4', padding:'0.25rem 0.8rem', borderRadius:'20px', fontSize:'0.78rem' }}>愛情 {stars.love}</span>
                <span style={{ background:'rgba(255,255,255,0.08)', color:'#7dd3fc', padding:'0.25rem 0.8rem', borderRadius:'20px', fontSize:'0.78rem' }}>事業 {stars.career}</span>
                <span style={{ background:'rgba(255,255,255,0.08)', color:'#fbbf24', padding:'0.25rem 0.8rem', borderRadius:'20px', fontSize:'0.78rem' }}>財運 {stars.wealth}</span>
                <span style={{ background:'rgba(255,255,255,0.08)', color:'#6ee7b7', padding:'0.25rem 0.8rem', borderRadius:'20px', fontSize:'0.78rem' }}>健康 {stars.health}</span>
              </div>
            </div>

            {/* 四大面向 */}
            {[
              { label:'💕 愛情運', text: pick(LOVE, selected, 1), color:'#f9a8d4', stars: stars.love },
              { label:'💼 事業運', text: pick(CAREER, selected, 2), color:'#7dd3fc', stars: stars.career },
              { label:'💰 財運',   text: pick(WEALTH, selected, 3), color:'#fbbf24', stars: stars.wealth },
              { label:'🌿 健康運', text: pick(HEALTH, selected, 4), color:'#6ee7b7', stars: stars.health },
            ].map(a => (
              <div key={a.label} style={{ background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:'16px', padding:'1.2rem', marginBottom:'0.8rem' }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'0.6rem' }}>
                  <span style={{ color:a.color, fontWeight:700, fontSize:'0.95rem' }}>{a.label}</span>
                  <span style={{ color:a.color, fontSize:'0.8rem' }}>{a.stars}</span>
                </div>
                <p style={{ color:'#d1d5db', fontSize:'0.88rem', lineHeight:1.75, margin:0 }}>{a.text}</p>
              </div>
            ))}

            {/* 今日幸運 */}
            {lucky && (
              <div style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:'16px', padding:'1.2rem', display:'flex', gap:'2rem', justifyContent:'center', flexWrap:'wrap' }}>
                <div style={{ textAlign:'center' }}>
                  <div style={{ color:'#6b7280', fontSize:'0.75rem', marginBottom:'0.3rem' }}>幸運顏色</div>
                  <div style={{ display:'flex', alignItems:'center', gap:'0.4rem' }}>
                    <div style={{ width:'18px', height:'18px', borderRadius:'50%', background:lucky.color, border:'2px solid rgba(255,255,255,0.3)' }}></div>
                    <span style={{ color:'#e9d5ff', fontWeight:700 }}>{lucky.name}</span>
                  </div>
                </div>
                <div style={{ textAlign:'center' }}>
                  <div style={{ color:'#6b7280', fontSize:'0.75rem', marginBottom:'0.3rem' }}>幸運數字</div>
                  <span style={{ color:'#fbbf24', fontWeight:700, fontSize:'1rem' }}>{lucky.numbers}</span>
                </div>
                <div style={{ textAlign:'center' }}>
                  <div style={{ color:'#6b7280', fontSize:'0.75rem', marginBottom:'0.3rem' }}>元素</div>
                  <span style={{ color:'#a78bfa', fontWeight:700 }}>{sign.element} 象</span>
                </div>
              </div>
            )}

            <p style={{ color:'#4b5563', fontSize:'0.72rem', textAlign:'center', marginTop:'1rem' }}>
              ✨ 運勢僅供娛樂參考，每天 0 點更新
            </p>
          </div>
        )}

        {/* 尚未選擇提示 */}
        {selected === null && (
          <div style={{ textAlign:'center', color:'#6b7280', padding:'2rem' }}>
            <div style={{ fontSize:'2rem', marginBottom:'0.5rem' }}>👆</div>
            <p>點選上方星座，查看今日運勢</p>
          </div>
        )}

        {/* 導航 */}
        <div style={{ textAlign:'center', marginTop:'2rem', display:'flex', gap:'1.5rem', justifyContent:'center', flexWrap:'wrap' }}>
          <a href="/games" style={{ color:'#7c3aed', fontSize:'0.9rem', textDecoration:'none', fontWeight:600 }}>← 小遊戲</a>
          <a href="/tarot" style={{ color:'#9333ea', fontSize:'0.9rem', textDecoration:'none', fontWeight:600 }}>🔮 塔羅占卜</a>
        </div>

      </div>

      <style>{`
        @keyframes fadeIn { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:none; } }
      `}</style>
    </div>
  );
}
