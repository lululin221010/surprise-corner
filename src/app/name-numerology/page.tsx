'use client';
// 📄 路徑：src/app/name-numerology/page.tsx
// 姓名學：三才五格筆劃姓名學（使用者自填筆劃，無需字典）

import { useState } from 'react';
import Link from 'next/link';

// ── 81 數吉凶 ─────────────────────────────────────────────
type Fortune = { rating: '大吉'|'吉'|'半吉'|'凶'|'大凶'; color: string; title: string; desc: string };

const FORTUNE_81: Record<number, Fortune> = {
  1:  { rating:'大吉', color:'#fbbf24', title:'太極數', desc:'萬物之始，領袖之才。意志堅定，開創能力強，容易成為各領域的先驅。' },
  2:  { rating:'凶',   color:'#ef4444', title:'兩儀數', desc:'事事不穩，容易動搖。需培養定力，避免輕易改變方向。' },
  3:  { rating:'大吉', color:'#fbbf24', title:'三才數', desc:'聰明才智出眾，表達能力強，善於溝通，容易受人喜愛。' },
  4:  { rating:'凶',   color:'#ef4444', title:'四象數', desc:'辛苦勞碌，起伏不定。雖有才能，卻易遭阻礙，需要更多耐心。' },
  5:  { rating:'大吉', color:'#fbbf24', title:'五行數', desc:'德才兼備，福壽雙全。為人正直，有貴人相助，一生運勢穩健。' },
  6:  { rating:'大吉', color:'#fbbf24', title:'六合數', desc:'天賜福澤，家庭和諧。做事踏實，人緣極佳，財運與感情皆順。' },
  7:  { rating:'吉',   color:'#22c55e', title:'七政數', desc:'剛毅果斷，意志力強。雖有些許波折，但憑藉堅持終能成功。' },
  8:  { rating:'吉',   color:'#22c55e', title:'八卦數', desc:'努力不懈，踏實積累。通過持續努力，能夠建立穩固的基業。' },
  9:  { rating:'凶',   color:'#ef4444', title:'九星數', desc:'雖有才華，卻易遭嫉妒或波折。需保持謙遜，避免樹大招風。' },
  10: { rating:'凶',   color:'#ef4444', title:'終結數', desc:'十全十美反成空，易有虎頭蛇尾之憾。需培養善始善終的習慣。' },
  11: { rating:'大吉', color:'#fbbf24', title:'根生數', desc:'如樹生根，基礎穩固。一步一腳印，晚年運勢特別旺盛。' },
  12: { rating:'凶',   color:'#ef4444', title:'薄弱數', desc:'體力精神較弱，易受外界影響。需注重健康，建立穩定的生活作息。' },
  13: { rating:'大吉', color:'#fbbf24', title:'智略數', desc:'聰明機智，謀略過人。善於分析局勢，在競爭中往往能勝出。' },
  14: { rating:'凶',   color:'#ef4444', title:'破兆數', desc:'聰明反被聰明誤，易因小失大。需學習放下，不要過分計較得失。' },
  15: { rating:'大吉', color:'#fbbf24', title:'福壽數', desc:'福氣深厚，長壽之象。性格溫和，受人敬重，家庭幸福美滿。' },
  16: { rating:'大吉', color:'#fbbf24', title:'德望數', desc:'品德高尚，深受敬仰。天生有領袖魅力，適合從事公眾服務。' },
  17: { rating:'吉',   color:'#22c55e', title:'統馭數', desc:'意志堅強，有領導才能。雖偶有阻力，但憑藉魄力終能克服。' },
  18: { rating:'大吉', color:'#fbbf24', title:'有志數', desc:'志向遠大，意志力強。無論遭遇多少挫折，都能重新站起來。' },
  19: { rating:'凶',   color:'#ef4444', title:'苦難數', desc:'一生多波折，情感與事業易有挫傷。但也因此培養出超人的毅力。' },
  20: { rating:'凶',   color:'#ef4444', title:'空虛數', desc:'有才無運，努力常難見回報。需調整心態，珍惜現有的一切。' },
  21: { rating:'大吉', color:'#fbbf24', title:'頭領數', desc:'天生領袖，獨立自主。開創能力強，適合自行創業，前途光明。' },
  22: { rating:'凶',   color:'#ef4444', title:'秋草數', desc:'如秋天的草，外表繁盛內心空虛。需培養內在充實感，莫只求表面。' },
  23: { rating:'大吉', color:'#fbbf24', title:'旭日數', desc:'如旭日東升，前途光明。年輕時或許辛苦，中年後運勢大開。' },
  24: { rating:'大吉', color:'#fbbf24', title:'立身數', desc:'腳踏實地，財運亨通。靠自己努力白手起家，越做越有成就感。' },
  25: { rating:'吉',   color:'#22c55e', title:'安全數', desc:'平安穩健，衣食無憂。雖不是大富大貴，但生活踏實安穩。' },
  26: { rating:'凶',   color:'#ef4444', title:'變怪數', desc:'命運多變，起伏不定。雖有奇才，卻易遭遇意外或變故。' },
  27: { rating:'凶',   color:'#ef4444', title:'中斷數', desc:'做事易半途而廢，缺乏持續力。需培養長遠眼光，不要輕易放棄。' },
  28: { rating:'凶',   color:'#ef4444', title:'海水數', desc:'如大海波濤，起伏不定。人生充滿變數，需學習隨遇而安。' },
  29: { rating:'大吉', color:'#fbbf24', title:'智謀數', desc:'智慧過人，謀略深遠。善於在逆境中找到出路，越挫越勇。' },
  30: { rating:'半吉', color:'#f59e0b', title:'浮沉數', desc:'半吉半凶，機會與危機並存。全憑個人智慧與選擇決定命運走向。' },
  31: { rating:'大吉', color:'#fbbf24', title:'興業數', desc:'開創事業之象，有領導才能。適合開創新局，能聚集志同道合之人。' },
  32: { rating:'大吉', color:'#fbbf24', title:'幸運數', desc:'天生幸運兒，貴人多助。機會常常在不經意間降臨，懂得把握即可。' },
  33: { rating:'大吉', color:'#fbbf24', title:'旺盛數', desc:'精力旺盛，才能出眾。充滿活力與創意，是天生的領袖人物。' },
  34: { rating:'大凶', color:'#7f1d1d', title:'破壞數', desc:'一生多災難，破財傷身之象。需特別謹慎，凡事三思而後行。' },
  35: { rating:'吉',   color:'#22c55e', title:'平和數', desc:'平穩溫和，與人為善。雖無大起伏，但生活滿足，人際關係良好。' },
  36: { rating:'凶',   color:'#ef4444', title:'波浪數', desc:'人生如浪，起伏不定。英雄多磨難，需培養堅韌不拔的意志。' },
  37: { rating:'大吉', color:'#fbbf24', title:'忠義數', desc:'忠誠正直，深得人心。品格高尚，做事有始有終，是可靠的夥伴。' },
  38: { rating:'半吉', color:'#f59e0b', title:'文藝數', desc:'富有藝術天分，創作力強。在文藝領域能有所成就，但財運稍遜。' },
  39: { rating:'吉',   color:'#22c55e', title:'長命數', desc:'健康長壽，福氣綿延。生活態度樂觀，懂得知足常樂的道理。' },
  40: { rating:'凶',   color:'#ef4444', title:'無常數', desc:'命運多變，難以把握。需培養隨機應變的能力，學習在變化中成長。' },
  41: { rating:'大吉', color:'#fbbf24', title:'有德數', desc:'德高望重，受人尊敬。以德服人，廣結善緣，晚年福報豐厚。' },
  42: { rating:'凶',   color:'#ef4444', title:'苦行數', desc:'一生辛苦努力，不輕易得到回報。但堅持到底的精神令人敬佩。' },
  43: { rating:'凶',   color:'#ef4444', title:'散財數', desc:'財來財去，難以積累。需培養理財意識，避免衝動消費。' },
  44: { rating:'凶',   color:'#ef4444', title:'磨難數', desc:'多磨多難，但也因此成就非凡的韌性。人生的苦難都是成長的養分。' },
  45: { rating:'大吉', color:'#fbbf24', title:'大智數', desc:'智慧超群，洞察力強。能夠看清事物本質，在複雜局勢中游刃有餘。' },
  46: { rating:'凶',   color:'#ef4444', title:'失意數', desc:'才高志大，卻易懷才不遇。需調整期望，腳踏實地，機會自然降臨。' },
  47: { rating:'大吉', color:'#fbbf24', title:'開運數', desc:'運勢漸開，越來越好。中年後運勢大轉，事業與感情都有美好發展。' },
  48: { rating:'大吉', color:'#fbbf24', title:'有德數', desc:'積善之家，必有餘慶。廣做善事，福報加倍，是天生的福德之人。' },
  49: { rating:'半吉', color:'#f59e0b', title:'隱遁數', desc:'適合從事幕後工作，不適合太高調。低調行事反而能保護自己。' },
  50: { rating:'凶',   color:'#ef4444', title:'不定數', desc:'命運難以捉摸，時好時壞。需培養穩定的心態，不隨外境起伏。' },
  51: { rating:'半吉', color:'#f59e0b', title:'浮沉數', desc:'人生起落較大，但每次低谷後都有反彈機會。保持信念是關鍵。' },
  52: { rating:'吉',   color:'#22c55e', title:'先苦後甘', desc:'年輕時辛苦，中年後轉運。堅持下去，甜蜜的果實正在等待你。' },
  53: { rating:'半吉', color:'#f59e0b', title:'進退數', desc:'進退之間需拿捏得宜。有時候退一步才能走更遠，懂得時機最重要。' },
  54: { rating:'凶',   color:'#ef4444', title:'苦難數', desc:'多苦少樂，但苦中有樂。每一次挑戰都是讓你變得更強的機會。' },
  55: { rating:'半吉', color:'#f59e0b', title:'不完全數', desc:'諸事不夠圓滿，總有遺憾。學習接受不完美，反而能找到真正的幸福。' },
  56: { rating:'凶',   color:'#ef4444', title:'蹉跎數', desc:'時光易逝，機會難留。需提高效率，把握當下，不要讓時間白白流逝。' },
  57: { rating:'吉',   color:'#22c55e', title:'月照秋水', desc:'外表平靜，內心豐富。雖然低調，但有著深厚的內涵與智慧。' },
  58: { rating:'半吉', color:'#f59e0b', title:'後福數', desc:'晚年比早年好，老來享福。中年後運勢逐漸轉強，值得期待。' },
  59: { rating:'凶',   color:'#ef4444', title:'不定數', desc:'變數多，難以預料。培養靈活應變的能力，才能在變局中站穩腳跟。' },
  60: { rating:'凶',   color:'#ef4444', title:'暗黑數', desc:'前途不明，易走彎路。需多請教有經驗的人，避免孤注一擲。' },
  61: { rating:'大吉', color:'#fbbf24', title:'月明數', desc:'如明月高掛，光明磊落。人品出眾，深受信賴，晚年尤其幸福。' },
  62: { rating:'凶',   color:'#ef4444', title:'衰弱數', desc:'精力易衰，需特別注意健康。規律作息與適當運動是最好的護身符。' },
  63: { rating:'大吉', color:'#fbbf24', title:'順和數', desc:'萬事順遂，和氣生財。性格圓融，凡事能化干戈為玉帛。' },
  64: { rating:'凶',   color:'#ef4444', title:'轉禍數', desc:'易遭橫禍，需謹言慎行。凡事低調，不輕易樹敵，可減少無謂麻煩。' },
  65: { rating:'大吉', color:'#fbbf24', title:'福德數', desc:'福德深厚，善有善報。為人厚道，廣結善緣，生命中貴人不斷。' },
  66: { rating:'凶',   color:'#ef4444', title:'疑雲數', desc:'易有誤解與猜疑。需加強溝通，以坦誠化解不必要的誤會。' },
  67: { rating:'大吉', color:'#fbbf24', title:'強壯數', desc:'體魄強健，精力充沛。行動力超強，能把想法迅速化為行動。' },
  68: { rating:'吉',   color:'#22c55e', title:'明利數', desc:'頭腦靈活，善於把握機會。財運不錯，懂得在合適時機做出正確判斷。' },
  69: { rating:'凶',   color:'#ef4444', title:'苦難數', desc:'人生多坎坷，但也培養出強大的內心。越是艱難，越能顯出你的價值。' },
  70: { rating:'凶',   color:'#ef4444', title:'暗黑數', desc:'前途晦暗，易陷困境。需保持正向心態，多尋求他人協助與支持。' },
  71: { rating:'凶',   color:'#ef4444', title:'無謀數', desc:'行事欠缺謀略，易衝動行事。多思考後再行動，可避免許多不必要的損失。' },
  72: { rating:'凶',   color:'#ef4444', title:'暗黑數', desc:'陰暗之中尋光明。要相信黑暗之後必有黎明，堅持下去就是勝利。' },
  73: { rating:'半吉', color:'#f59e0b', title:'平安數', desc:'平穩安定，不求大富。生活雖然平淡，卻有著難得的安心感。' },
  74: { rating:'凶',   color:'#ef4444', title:'無望數', desc:'努力難以得到預期回報。調整目標，從小處做起，慢慢累積成果。' },
  75: { rating:'半吉', color:'#f59e0b', title:'欠安數', desc:'身心難以完全安定。需學習放鬆，找到屬於自己的心靈平靜之道。' },
  76: { rating:'凶',   color:'#ef4444', title:'失路數', desc:'迷失方向，難找正途。需靜下心來重新定位自己，找回人生目標。' },
  77: { rating:'半吉', color:'#f59e0b', title:'喜怒數', desc:'情緒起伏較大，喜怒容易形於色。學習情緒管理，是你人生的重要功課。' },
  78: { rating:'半吉', color:'#f59e0b', title:'有得有失', desc:'得到的同時也在失去，人生總是平衡的。珍惜擁有，不過分執著於失去的。' },
  79: { rating:'凶',   color:'#ef4444', title:'末路數', desc:'需特別謹慎，避免鋌而走險。守住本分，踏實過日子，才是最佳策略。' },
  80: { rating:'凶',   color:'#ef4444', title:'隱退數', desc:'不宜太過高調，隱退守成比進取更適合。低調行事，保存實力。' },
  81: { rating:'大吉', color:'#fbbf24', title:'還本數', desc:'81歸一，圓滿完成。如同太極重生，具備成就大事業的圓融智慧。' },
};

// 尾數五行
function numElement(n: number): string {
  const u = n % 10;
  if (u === 1 || u === 2) return '木';
  if (u === 3 || u === 4) return '火';
  if (u === 5 || u === 6) return '土';
  if (u === 7 || u === 8) return '金';
  return '水';
}
const EL_COLOR: Record<string,string> = { 木:'#22c55e', 火:'#ef4444', 土:'#f59e0b', 金:'#a78bfa', 水:'#38bdf8' };
const EL_EMOJI: Record<string,string> = { 木:'🌿', 火:'🔥', 土:'🏔️', 金:'⚡', 水:'💧' };

function getFortune(n: number): Fortune {
  if (n > 81) n = ((n - 1) % 81) + 1;
  return FORTUNE_81[n] || { rating:'半吉', color:'#f59e0b', title:'', desc:'' };
}

// 評分顏色
const RATING_COLOR = { '大吉':'#fbbf24', '吉':'#22c55e', '半吉':'#f59e0b', '凶':'#ef4444', '大凶':'#7f1d1d' };
const RATING_BG    = { '大吉':'rgba(251,191,36,0.15)', '吉':'rgba(34,197,94,0.12)', '半吉':'rgba(245,158,11,0.12)', '凶':'rgba(239,68,68,0.12)', '大凶':'rgba(127,29,29,0.2)' };

export default function NameNumerologyPage() {
  // 姓 最多2字，名 最多2字
  const [sur1, setSur1] = useState({ char:'', strokes:'' });
  const [sur2, setSur2] = useState({ char:'', strokes:'' }); // 複姓第二字
  const [name1, setName1] = useState({ char:'', strokes:'' });
  const [name2, setName2] = useState({ char:'', strokes:'' }); // 名第二字
  const [result, setResult] = useState<null|{
    grids: { label:string; num:number; fortune:Fortune; element:string }[];
    sancai: string;
    overall: string;
  }>(null);
  const [error, setError] = useState('');

  function calculate() {
    setError('');
    const s1 = parseInt(sur1.strokes);
    const s2 = sur2.strokes ? parseInt(sur2.strokes) : 0;
    const n1 = parseInt(name1.strokes);
    const n2 = name2.strokes ? parseInt(name2.strokes) : 0;

    if (!s1 || isNaN(s1)) { setError('請填寫姓氏的筆劃數'); return; }
    if (!n1 || isNaN(n1)) { setError('請填寫名字第一個字的筆劃數'); return; }
    if (sur2.char && !s2) { setError('請填寫姓氏第二個字的筆劃數'); return; }
    if (name2.char && !n2) { setError('請填寫名字第二個字的筆劃數'); return; }

    const isDoubleSur = !!sur2.char;
    const isDoubleName = !!name2.char;

    let tianGe: number, renGe: number, diGe: number, waiGe: number, zongGe: number;

    if (!isDoubleSur && !isDoubleName) {
      // 姓1名1
      tianGe = s1 + 1;
      renGe  = s1 + n1;
      diGe   = n1 + 1;
      waiGe  = 1;
      zongGe = s1 + n1;
    } else if (!isDoubleSur && isDoubleName) {
      // 姓1名2（最常見）
      tianGe = s1 + 1;
      renGe  = s1 + n1;
      diGe   = n1 + n2;
      waiGe  = 1 + n2;
      zongGe = s1 + n1 + n2;
    } else if (isDoubleSur && !isDoubleName) {
      // 姓2名1
      tianGe = s1 + s2;
      renGe  = s2 + n1;
      diGe   = n1 + 1;
      waiGe  = s1 + 1;
      zongGe = s1 + s2 + n1;
    } else {
      // 姓2名2
      tianGe = s1 + s2;
      renGe  = s2 + n1;
      diGe   = n1 + n2;
      waiGe  = s1 + n2;
      zongGe = s1 + s2 + n1 + n2;
    }

    const grids = [
      { label:'天格', num:tianGe, fortune:getFortune(tianGe), element:numElement(tianGe) },
      { label:'人格', num:renGe,  fortune:getFortune(renGe),  element:numElement(renGe)  },
      { label:'地格', num:diGe,   fortune:getFortune(diGe),   element:numElement(diGe)   },
      { label:'外格', num:waiGe,  fortune:getFortune(waiGe),  element:numElement(waiGe)  },
      { label:'總格', num:zongGe, fortune:getFortune(zongGe), element:numElement(zongGe) },
    ];

    // 三才（天地人五行）
    const sancai = `${numElement(tianGe)}${numElement(renGe)}${numElement(diGe)}`;

    // 綜合判斷（依人格+總格）
    const goodCount = grids.filter(g=>g.fortune.rating==='大吉'||g.fortune.rating==='吉').length;
    const badCount  = grids.filter(g=>g.fortune.rating==='凶'||g.fortune.rating==='大凶').length;
    let overall = '';
    if (goodCount >= 4)      overall = '名字整體運勢極佳！五格中吉數居多，各方面運勢相輔相成。';
    else if (goodCount >= 3) overall = '名字整體不錯，多數格局吉利，稍有瑕疵但不影響大局。';
    else if (goodCount >= 2) overall = '名字吉凶各半，需靠後天努力彌補不足，但也有發揮空間。';
    else                     overall = '名字中凶數偏多，後天需更加努力，也可考慮調整名字補運。';

    setResult({ grids, sancai, overall });
  }

  const inputStyle = {
    background:'rgba(0,0,0,0.3)', border:'1px solid rgba(167,139,250,0.3)',
    borderRadius:'8px', color:'#fff', padding:'0.5rem 0.7rem',
    fontSize:'0.95rem', outline:'none', width:'100%', boxSizing:'border-box' as const,
  };

  const renderCharInput = (
    label: string, sub: string,
    val: { char:string; strokes:string },
    setVal: (v:{char:string;strokes:string})=>void,
    required = true
  ) => (
    <div style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:'12px', padding:'0.8rem', flex:'1', minWidth:'120px' }}>
      <div style={{ color:'#a78bfa', fontSize:'0.75rem', fontWeight:700, marginBottom:'0.5rem' }}>{label}<span style={{color:'#6b7280',fontWeight:400}}> {sub}</span></div>
      <input placeholder="字" value={val.char} onChange={e=>setVal({...val,char:e.target.value})}
        style={{...inputStyle, marginBottom:'0.4rem', textAlign:'center', fontSize:'1.1rem'}} />
      <input type="number" placeholder="筆劃數" value={val.strokes} onChange={e=>setVal({...val,strokes:e.target.value})}
        min="1" max="50" style={{...inputStyle, textAlign:'center'}} />
    </div>
  );

  return (
    <div style={{ minHeight:'100vh', background:'linear-gradient(135deg,#0f0a1e 0%,#1a0533 50%,#0a1628 100%)', padding:'2rem 1rem 6rem' }}>
      <div style={{ maxWidth:'720px', margin:'0 auto' }}>

        {/* 標題 */}
        <div style={{ textAlign:'center', marginBottom:'2rem' }}>
          <div style={{ fontSize:'2.5rem', marginBottom:'0.3rem' }}>📝</div>
          <h1 style={{ color:'#fff', fontSize:'1.8rem', fontWeight:800, margin:'0 0 0.3rem' }}>姓名學</h1>
          <p style={{ color:'#9ca3af', fontSize:'0.88rem', margin:0 }}>三才五格筆劃姓名學 · 請輸入每個字的筆劃數</p>
        </div>

        {/* 輸入區 */}
        <div style={{ background:'rgba(255,255,255,0.06)', border:'1px solid rgba(167,139,250,0.25)', borderRadius:'20px', padding:'1.5rem', marginBottom:'1.5rem' }}>

          {/* 姓氏 */}
          <div style={{ marginBottom:'1rem' }}>
            <div style={{ color:'#e9d5ff', fontSize:'0.85rem', fontWeight:700, marginBottom:'0.6rem' }}>姓氏</div>
            <div style={{ display:'flex', gap:'0.6rem' }}>
              {renderCharInput('第一字', '（必填）', sur1, setSur1)}
              {renderCharInput('第二字', '（複姓選填）', sur2, setSur2, false)}
            </div>
          </div>

          {/* 名字 */}
          <div style={{ marginBottom:'1.2rem' }}>
            <div style={{ color:'#e9d5ff', fontSize:'0.85rem', fontWeight:700, marginBottom:'0.6rem' }}>名字</div>
            <div style={{ display:'flex', gap:'0.6rem' }}>
              {renderCharInput('第一字', '（必填）', name1, setName1)}
              {renderCharInput('第二字', '（選填）', name2, setName2, false)}
            </div>
          </div>

          <p style={{ color:'#4b5563', fontSize:'0.72rem', margin:'0 0 1rem' }}>
            💡 不確定筆劃數？可用手機輸入法查詢，或參考「康熙字典筆劃」
          </p>

          {error && <p style={{ color:'#f87171', fontSize:'0.85rem', margin:'0 0 0.8rem' }}>⚠️ {error}</p>}

          <button onClick={calculate} style={{ width:'100%', background:'linear-gradient(135deg,#7c3aed,#ec4899)', color:'#fff', border:'none', borderRadius:'12px', padding:'0.85rem', fontSize:'1rem', fontWeight:800, cursor:'pointer' }}>
            🔍 開始分析
          </button>
        </div>

        {/* 結果 */}
        {result && (
          <div style={{ animation:'fadeIn 0.4s ease' }}>

            {/* 五格 */}
            <div style={{ display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:'0.5rem', marginBottom:'1.2rem' }}>
              {result.grids.map(g => (
                <div key={g.label} style={{ background:RATING_BG[g.fortune.rating], border:`1px solid ${g.fortune.color}44`, borderRadius:'14px', padding:'0.8rem 0.3rem', textAlign:'center' }}>
                  <div style={{ color:'#6b7280', fontSize:'0.68rem', marginBottom:'0.3rem' }}>{g.label}</div>
                  <div style={{ color:'#fff', fontSize:'1.5rem', fontWeight:800, lineHeight:1 }}>{g.num}</div>
                  <div style={{ fontSize:'0.65rem', color:EL_COLOR[g.element], margin:'0.2rem 0' }}>{EL_EMOJI[g.element]}{g.element}</div>
                  <div style={{ background:RATING_BG[g.fortune.rating], color:g.fortune.color, fontSize:'0.68rem', fontWeight:700, padding:'0.15rem 0.3rem', borderRadius:'8px', display:'inline-block' }}>{g.fortune.rating}</div>
                </div>
              ))}
            </div>

            {/* 各格解析 */}
            {result.grids.map(g => (
              <div key={g.label} style={{ background:RATING_BG[g.fortune.rating], border:`1px solid ${g.fortune.color}33`, borderRadius:'14px', padding:'1rem', marginBottom:'0.7rem' }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'0.4rem' }}>
                  <span style={{ color:g.fortune.color, fontWeight:700, fontSize:'0.9rem' }}>{g.label} {g.num} — {g.fortune.title}</span>
                  <span style={{ background:RATING_BG[g.fortune.rating], color:g.fortune.color, padding:'0.15rem 0.6rem', borderRadius:'10px', fontSize:'0.75rem', fontWeight:700 }}>{g.fortune.rating}</span>
                </div>
                <p style={{ color:'#d1d5db', fontSize:'0.85rem', lineHeight:1.7, margin:0 }}>{g.fortune.desc}</p>
              </div>
            ))}

            {/* 三才 + 總評 */}
            <div style={{ background:'rgba(124,58,237,0.1)', border:'1px solid rgba(124,58,237,0.25)', borderRadius:'16px', padding:'1.2rem', marginBottom:'1rem' }}>
              <div style={{ display:'flex', gap:'1.5rem', marginBottom:'0.8rem', flexWrap:'wrap' }}>
                <div>
                  <div style={{ color:'#6b7280', fontSize:'0.72rem', marginBottom:'0.2rem' }}>三才（天人地五行）</div>
                  <div style={{ color:'#a78bfa', fontWeight:800, fontSize:'1rem' }}>
                    {result.sancai.split('').map((el,i)=>(
                      <span key={i} style={{ color:EL_COLOR[el] }}>{EL_EMOJI[el]}{el} </span>
                    ))}
                  </div>
                </div>
              </div>
              <p style={{ color:'#d1d5db', fontSize:'0.88rem', lineHeight:1.75, margin:0 }}>{result.overall}</p>
            </div>

            <p style={{ color:'#4b5563', fontSize:'0.72rem', textAlign:'center' }}>
              ✨ 姓名學派別眾多，本工具採傳統三才五格筆劃法，僅供娛樂參考
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
