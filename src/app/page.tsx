'use client';
import { useEffect, useState, Suspense } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import coldDataRaw from '../data/cold-knowledge.json';
import surprisesRaw from '../data/surprises.json';
import featuredQuizRaw from '../data/featured-quiz.json';

const StarCanvas = dynamic(() => import('../components/StarCanvas'), { ssr: false });

type ColdEntry = {
  id: number;
  category: string;
  text: string;
  lulu?: string;
  media_hint?: string;
  seed_comments: { name: string; text: string }[];
};

const coldData = coldDataRaw as ColdEntry[];

type SurpriseEntry = { id: number; text: string; image?: string; caption?: string; date: string };
const surprises = surprisesRaw as SurpriseEntry[];

type FeaturedQuiz = { slug: string; title: string; desc: string };
const featuredQuizzes = featuredQuizRaw as FeaturedQuiz[];

const LULU_QUOTES = [
  // 好奇心系
  '今天又來了，你果然沒辦法抵抗好奇心。',
  '你知道嗎，好奇心不會殺死貓，但會讓你在這裡待很久。',
  '又來了。我就知道你會來。',
  '你以為你只是路過，其實你已經上鉤了。',
  '歡迎回來，我一直在等你。',
  // 知識系
  '貓咪說：你知道的太少了。',
  '每天一個冷知識，讓你在朋友面前很厲害。',
  '知識這種東西，知道了就回不去了。',
  '不看你會後悔的，我說的。',
  '今天學一件事，明天少問一個問題。',
  // 慵懶哲學系
  '驚喜已備好，就等你了。',
  '我睡了16小時，起來發現世界還在，很好。',
  '人類真奇怪，花一輩子找自己，我一出生就知道。',
  '努力是好事，但先看完這個再說。',
  '今天的任務：活著，然後學一件有趣的事。',
  '我不是懶，我是在節省能量給重要的事。',
  '你有沒有想過，貓咪其實什麼都懂，只是不想說。',
  '放鬆一下，世界不會因為你多學一件事而崩塌。',
  '今天適合待著不動，順便吸收一點知識。',
  '我花了三秒決定今天的驚喜，你要感謝我。',
  // 毒舌系
  '你又來了，我就說你戒不掉。',
  '別假裝只是路過，你根本是特地來的。',
  '你今天的樣子，跟昨天一樣需要驚喜。',
  '我準備好了，你呢？',
  '不是我厲害，是你太需要我。',
  '承認吧，這裡是你今天最期待的地方。',
  '你滑了很多頁面，最後還是回來這裡。',
  '我沒有判斷你，我只是……有點想笑。',
  '你的朋友不知道你在這裡，這是我們的秘密。',
  '今天的你，需要一點點不一樣的東西。',
  // 溫柔系
  '今天辛苦了，來，看個有趣的東西。',
  '不管今天過得怎樣，這裡永遠有新東西等你。',
  '你願意來，我就很開心了。',
  '有些事情，知道了心情會變好，今天就是這種。',
  '我在這裡，每天都在。',
  '你來得正好，今天的驚喜特別有意思。',
  '累了嗎？先看完這個再去忙。',
  '每天一點點，就夠了。',
  '你不需要很努力，只需要來一下。',
  '今天的你，值得一個小驚喜。',
  // 神秘系
  '今天的知識，99%的人不知道。',
  '這件事你知道之後，會忍不住告訴別人。',
  '有些事情，不知道也沒關係，但知道了會很有趣。',
  '今天的驚喜，是宇宙特別安排給你的。',
  '點進來是緣分，看完是智慧。',
  '我選的，一定有原因。',
  '今天的知識，適合在深夜告訴朋友。',
  '這件事，知道的人都覺得自己很特別。',
  '宇宙很大，今天先了解這一件。',
  '有些事，只有常來這裡的人才會知道。',
  // 季節時間系
  '今天也是值得好好過的一天。',
  '一天24小時，花三分鐘在這裡，很划算。',
  '今天的驚喜，明天你還會想起來。',
  '每天一點好奇心，是最便宜的娛樂。',
  '時間過得很快，但今天這件事你會記住。',
  '今天學的，下週就能用上。',
  '現在看，待會兒有話題。',
  '今天的你，比昨天的你多知道一件事。',
  '日子要過得有趣，從這裡開始。',
  '今天也是，有驚喜的一天。',
];

const BOOK_PREVIEWS = [
  {
    series: '暗黑心理學',
    title: '暗黑心理學 Vol.1《操控的藝術》',
    color: '#9333ea',
    excerpt: '你有沒有想過，為什麼有些人就是特別會讓你感到愧疚？他們不需要大吼大叫，只需要沉默幾秒，或者輕描淡寫地說一句「沒事，我理解你」——然後你就開始道歉了。這種技術有個名字，叫做「情感勒索」。而它的核心，是對你的罪惡感進行精準的外科手術。',
    buyUrl: 'https://still-time-corner.vercel.app/digital',
  },
  {
    series: '認知心理學',
    title: '認知心理學 Vol.1《你以為你在思考》',
    color: '#0ea5e9',
    excerpt: '你今天做的第一個決定，大概是在你還沒完全清醒的狀態下完成的。不是早餐吃什麼，而是要不要繼續賴床。你的大腦在那個瞬間啟動了一套它偏愛的預設程序——而你，幾乎沒有參與這個過程。這就是認知心理學最讓人不安的入口：我們以為自己在思考，其實只是在執行。',
    buyUrl: 'https://still-time-corner.vercel.app/digital',
  },
  {
    series: '成長心理學',
    title: '成長心理學 Vol.1《為什麼努力沒有用》',
    color: '#10b981',
    excerpt: '「再努力一點就好了。」這句話你聽過多少次？說這句話的人，包括你自己。問題不在努力夠不夠，而在努力的方向有沒有根據你真正的動機結構設計。心理學告訴我們，人有兩種截然不同的動機系統——一種越燒越旺，一種越逼越熄火。你現在用的是哪一種？',
    buyUrl: 'https://still-time-corner.vercel.app/digital',
  },
  {
    series: '人格心理學',
    title: '人格心理學 Vol.1《你為什麼是這樣的人》',
    color: '#f59e0b',
    excerpt: '人格不是你選的。那是你在一次又一次微小的反應中，被環境、被關係、被你根本記不得的早期經歷，一層一層塑造出來的。但這不代表你沒有辦法。真正的改變，從理解自己的人格結構開始——不是貼標籤，而是看清那些你以為是「個性」的東西，其實是一套可以被理解的防禦系統。',
    buyUrl: 'https://still-time-corner.vercel.app/digital',
  },
  {
    series: '關係心理學',
    title: '關係心理學 Vol.1《為什麼愛會傷人》',
    color: '#ec4899',
    excerpt: '最傷你的人，通常不是壞人。他們只是帶著自己未被療癒的傷，走進了你的生命。而你也一樣。關係心理學不是教你找到「對的人」，而是幫你看清楚你在關係裡的模式——那些你一再重複的劇本，那些你以為對方的問題，其實更早出現在你的童年地圖裡。',
    buyUrl: 'https://still-time-corner.vercel.app/digital',
  },
  {
    series: '潛意識心理學',
    title: '潛意識心理學 Vol.1《那些你以為忘了的事》',
    color: '#8b5cf6',
    excerpt: '記憶不會消失。它只是換了個地方。那些你以為自己已經放下的事，那些你說「沒關係、過去了」的經歷——它們住在你的身體反應裡，住在你莫名其妙的情緒裡，住在你選擇某些人的直覺裡。潛意識心理學的第一課，是承認：你的過去比你以為的更活躍。',
    buyUrl: 'https://still-time-corner.vercel.app/digital',
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  '心理學': '#9333ea',
  '腦科學': '#0ea5e9',
  '靈異意識': '#8b5cf6',
  '貓咪科學': '#f97316',
  '睡眠科學': '#06b6d4',
  '行為經濟學': '#84cc16',
};

function getDayOfYear(): number {
  const start = new Date(new Date().getFullYear(), 0, 0);
  return Math.floor((Date.now() - start.getTime()) / 86400000);
}

// 每3小時換一次，切換點在 01:30/04:30/07:30…，與試讀的00:00/12:00錯開
const SLOT_BOUNDARIES = [90, 270, 450, 630, 810, 990, 1170, 1350]; // 分鐘
function getCurrentEntry(): ColdEntry {
  const d = new Date();
  const totalMin = d.getHours() * 60 + d.getMinutes();
  const slotIdx = SLOT_BOUNDARIES.filter(b => totalMin >= b).length;
  return coldData[(getDayOfYear() * 8 + slotIdx) % coldData.length];
}
function msToNextEntry(): number {
  const now = new Date();
  const totalMin = now.getHours() * 60 + now.getMinutes();
  const next = SLOT_BOUNDARIES.find(b => b > totalMin) ?? (SLOT_BOUNDARIES[0] + 1440);
  return ((next - totalMin) * 60 - now.getSeconds()) * 1000;
}

function getTodayPreview() {
  const slot = getDayOfYear() * 2 + (new Date().getHours() >= 12 ? 1 : 0);
  return BOOK_PREVIEWS[slot % BOOK_PREVIEWS.length];
}

export default function Home() {
  const [todayEntry, setTodayEntry] = useState<ColdEntry | null>(null);
  const [todayPreview, setTodayPreview] = useState<typeof BOOK_PREVIEWS[0] | null>(null);
  const [aiNews, setAiNews] = useState<{ title: string; description: string; link: string; source: string }[]>([]);
  const [luruIdx, setLuruIdx] = useState(0);
  const [bubbleVisible, setBubbleVisible] = useState(true);

  useEffect(() => {
    setTodayEntry(getCurrentEntry());
    setTodayPreview(getTodayPreview());
    const timeout = setTimeout(() => {
      setTodayEntry(getCurrentEntry());
      setTodayPreview(getTodayPreview());
    }, msToNextEntry());
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    fetch('/api/ai-news')
      .then(r => r.ok ? r.json() : null)
      .then(data => { if (data?.news) setAiNews(data.news.slice(0, 3)); })
      .catch(() => {});
  }, []);

  // 每天從不同位置開始，點擊往後循環，確保每天第一句不同
  const luruStartIdx = (() => {
    const d = new Date();
    const seed = d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
    return seed % LULU_QUOTES.length;
  })();

  function handleLuruClick() {
    setBubbleVisible(false);
    setTimeout(() => {
      setLuruIdx(i => i + 1);
      setBubbleVisible(true);
    }, 180);
  }

  const catColor = todayEntry ? (CATEGORY_COLORS[todayEntry.category] || '#8b5cf6') : '#8b5cf6';
  const weekQuiz = featuredQuizzes[Math.floor(getDayOfYear() / 7) % featuredQuizzes.length];
  const latestSurprise = surprises[surprises.length - 1];

  return (
    <main style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #1a1040 100%)',
      color: '#fff', position: 'relative', overflow: 'hidden',
    }}>
      <style>{`
        @keyframes fadeInUp { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes ruruFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
        @keyframes softGlow { 0%,100%{box-shadow:0 0 24px rgba(124,58,237,0.15)} 50%{box-shadow:0 0 48px rgba(124,58,237,0.4)} }
        @keyframes bounceArrow { 0%,100%{transform:translateY(0);opacity:0.28} 50%{transform:translateY(5px);opacity:0.5} }
        .ruru-float { animation: ruruFloat 3.2s ease-in-out infinite; display: inline-block; }
        .bounce-arrow { animation: bounceArrow 1.6s ease-in-out infinite; display: inline-block; }
        .book-card { transition: transform 0.3s ease, border-color 0.3s ease; }
        .book-card:hover { transform: translateY(-5px); }
        .news-card { transition: transform 0.25s ease; }
        .news-card:hover { transform: translateY(-3px); }
        .footer-link { color: #3d3b5a; font-size: 0.82rem; text-decoration: none; transition: color 0.2s; }
        .footer-link:hover { color: #8b5cf6; }
      `}</style>

      <div style={{ position: 'relative', zIndex: 1 }}>

        {/* ── HERO ── */}
        <section style={{ position: 'relative', minHeight: '560px', background: '#0d0820', overflow: 'hidden' }}>
          <Suspense fallback={null}>
            <StarCanvas />
          </Suspense>

          {/* 中央內容 */}
          <div style={{
            position: 'relative',
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '52px 16px 88px',
          }}>
            {/* 魯魯照片球 */}
            <div style={{ marginBottom: '16px' }}>
              {/* 球 + 泡泡一起浮動 */}
              <div className="ruru-float" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <button
                  onClick={handleLuruClick}
                  style={{
                    width: '280px',
                    height: '280px',
                    borderRadius: '50%',
                    border: '3px solid rgba(168,85,247,0.55)',
                    boxShadow: '0 0 40px rgba(168,85,247,0.6), 0 0 80px rgba(88,28,135,0.4)',
                    cursor: 'pointer',
                    overflow: 'hidden',
                    padding: 0,
                    background: 'none',
                    transition: 'filter 0.15s ease',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.filter = 'brightness(1.3) drop-shadow(0 0 18px rgba(168,85,247,0.9))';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.filter = '';
                  }}
                  title="點我讓魯魯說話"
                >
                  <img
                    src="/images/lulu.jpg"
                    alt="魯魯"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                </button>
                {/* 說話泡泡 — 球正下方，箭頭朝上 */}
                <div style={{
                  marginTop: '14px',
                  background: 'rgba(255,255,255,0.93)',
                  color: '#3b0764',
                  padding: '9px 18px',
                  borderRadius: '18px',
                  fontSize: '14px',
                  fontWeight: 600,
                  maxWidth: '280px',
                  textAlign: 'center',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.35)',
                  opacity: bubbleVisible ? 1 : 0,
                  transition: 'opacity 0.15s ease',
                  pointerEvents: 'none',
                  letterSpacing: '0.02em',
                  position: 'relative',
                }}>
                  <span style={{
                    position: 'absolute',
                    bottom: '100%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: 0,
                    height: 0,
                    borderLeft: '7px solid transparent',
                    borderRight: '7px solid transparent',
                    borderBottom: '9px solid rgba(255,255,255,0.93)',
                    display: 'block',
                  }} />
                  {LULU_QUOTES[(luruStartIdx + luruIdx) % LULU_QUOTES.length]}
                </div>
              </div>
            </div>

            {/* 一句話 */}
            <p style={{
              color: 'rgba(255,255,255,0.92)',
              fontSize: 'clamp(16px, 3.2vw, 24px)',
              fontWeight: 400,
              letterSpacing: '0.18em',
              marginBottom: '18px',
              textShadow: '0 2px 14px rgba(168,85,247,0.5)',
            }}>
              每天一個讓你想傳給朋友的驚喜
            </p>

            {/* 兩個按鈕 */}
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', justifyContent: 'center' }}>
              <a
                href="#gifts"
                style={{
                  background: 'linear-gradient(135deg, #7c50ee, #9333ea)',
                  color: '#fff',
                  padding: '13px 30px',
                  borderRadius: '50px',
                  fontWeight: 700,
                  fontSize: '15px',
                  textDecoration: 'none',
                  boxShadow: '0 4px 22px rgba(124,80,238,0.55)',
                  border: '1px solid rgba(167,139,250,0.3)',
                  letterSpacing: '0.05em',
                  display: 'inline-block',
                  transition: 'filter 0.15s ease',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.filter = 'brightness(1.15)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.filter = ''; }}
              >
                今天這個你一定要看 ↓
              </a>
            </div>

            {/* 三個內容預覽卡片 */}
            <div style={{
              display: 'flex', gap: '10px', flexWrap: 'wrap',
              justifyContent: 'center', marginTop: '24px',
              maxWidth: '560px', width: '100%',
            }}>
              {/* Card 1：隨手驚喜（最新一筆） */}
              <a href="/random" style={{ flex: '1 1 150px', minWidth: '140px', maxWidth: '175px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(168,85,247,0.35)', borderRadius: '16px', padding: '1rem 0.8rem', textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px', textAlign: 'center' }}>
                {latestSurprise.image
                  ? <img src={latestSurprise.image} alt="" style={{ width: '52px', height: '52px', borderRadius: '50%', objectFit: 'cover' }} />
                  : <span style={{ fontSize: '1.4rem' }}>✨</span>
                }
                <span style={{ color: '#a855f7', fontWeight: 700, fontSize: '0.85rem' }}>隨手驚喜</span>
                <span style={{ color: '#5a5278', fontSize: '0.72rem', lineHeight: 1.5 }}>{latestSurprise.text.slice(0, 28)}…</span>
                <span style={{ marginTop: '4px', color: '#a855f7', fontSize: '0.75rem', fontWeight: 600, border: '1px solid rgba(168,85,247,0.55)', borderRadius: '20px', padding: '3px 12px' }}>進入 →</span>
              </a>

              {/* Card 2：本週測驗（週數輪換） */}
              <a href={`/quiz/${weekQuiz.slug}`} style={{ flex: '1 1 150px', minWidth: '140px', maxWidth: '175px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(236,72,153,0.35)', borderRadius: '16px', padding: '1rem 0.8rem', textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px', textAlign: 'center' }}>
                <span style={{ fontSize: '1.4rem' }}>🧭</span>
                <span style={{ color: '#ec4899', fontWeight: 700, fontSize: '0.82rem', lineHeight: 1.3 }}>{weekQuiz.title}</span>
                <span style={{ color: '#5a5278', fontSize: '0.72rem', lineHeight: 1.5 }}>{weekQuiz.desc}</span>
                <span style={{ marginTop: '4px', color: '#ec4899', fontSize: '0.75rem', fontWeight: 600, border: '1px solid rgba(236,72,153,0.55)', borderRadius: '20px', padding: '3px 12px' }}>測一測 →</span>
              </a>

              {/* Card 3：今日冷知識 */}
              {todayEntry && (
                <a href="#gifts" style={{ flex: '1 1 150px', minWidth: '140px', maxWidth: '175px', background: 'rgba(255,255,255,0.04)', border: `1px solid ${CATEGORY_COLORS[todayEntry.category] || '#8b5cf6'}55`, borderRadius: '16px', padding: '1rem 0.8rem', textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px', textAlign: 'center' }}>
                  <span style={{ fontSize: '1.4rem' }}>🧠</span>
                  <span style={{ color: CATEGORY_COLORS[todayEntry.category] || '#8b5cf6', fontWeight: 700, fontSize: '0.85rem' }}>{todayEntry.category}</span>
                  <span style={{ color: '#5a5278', fontSize: '0.72rem', lineHeight: 1.5, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' as const }}>{todayEntry.text.slice(0, 40)}…</span>
                  <span style={{ marginTop: '4px', color: CATEGORY_COLORS[todayEntry.category] || '#8b5cf6', fontSize: '0.75rem', fontWeight: 600, border: `1px solid ${CATEGORY_COLORS[todayEntry.category] || '#8b5cf6'}55`, borderRadius: '20px', padding: '3px 12px' }}>看完整 →</span>
                </a>
              )}
            </div>

            {/* 向下提示 */}
            <div style={{
              position: 'absolute',
              bottom: '28px',
              left: '50%',
              transform: 'translateX(-50%)',
              color: 'rgba(200,180,255,0.7)',
              fontSize: '12px',
              letterSpacing: '0.1em',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              pointerEvents: 'none',
            }}>
              <span>🧠 今日冷知識在下方</span>
              <span className="bounce-arrow" style={{ fontSize: '16px' }}>↓</span>
            </div>
          </div>
        </section>


        {/* ── 今日冷知識 ── */}
        <section id="gifts" style={{ maxWidth: '680px', margin: '0 auto 5rem', padding: '3rem 1.2rem 0', animation: 'fadeInUp 0.9s ease 0.12s both' }}>
          {todayEntry ? (
            <div style={{
              background: 'rgba(255,255,255,0.055)', backdropFilter: 'blur(20px)',
              borderRadius: '24px', padding: '2.2rem 2.4rem',
              border: `1px solid ${catColor}40`,
              animation: 'softGlow 4s ease-in-out infinite',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem', flexWrap: 'wrap', gap: '8px' }}>
                <span style={{
                  background: `${catColor}1a`, border: `1px solid ${catColor}55`,
                  color: catColor, borderRadius: '20px', padding: '3px 13px',
                  fontSize: '0.76rem', fontWeight: 700, letterSpacing: '0.04em',
                }}>
                  🧠 {todayEntry.category}
                </span>
                <span style={{ color: '#3d3b5a', fontSize: '0.74rem', fontFamily: 'monospace' }}>
                  今日冷知識 #{todayEntry.id}
                </span>
              </div>

              <p style={{ fontSize: '0.97rem', lineHeight: 1.95, color: '#ddd8f0', marginBottom: '1.2rem' }}>
                {todayEntry.text}
              </p>

              {todayEntry.lulu && (
                <div style={{
                  background: 'rgba(139,92,246,0.09)', border: '1px solid rgba(139,92,246,0.28)',
                  borderRadius: '14px', padding: '0.85rem 1.1rem', marginBottom: '1.2rem',
                  display: 'flex', gap: '10px', alignItems: 'flex-start',
                }}>
                  <span style={{ fontSize: '1.1rem', flexShrink: 0, marginTop: '1px' }}>🐱</span>
                  <p style={{ color: '#c4b5fd', fontSize: '0.87rem', fontStyle: 'italic', margin: 0, lineHeight: 1.65 }}>
                    {todayEntry.lulu}
                  </p>
                </div>
              )}

              <Link href="/wall" style={{
                display: 'inline-block', color: '#4a4868', fontSize: '0.78rem',
                textDecoration: 'none', transition: 'color 0.2s',
              }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = catColor)}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = '#4a4868')}
              >
                💬 有話想說？去互動牆
              </Link>
            </div>
          ) : (
            <div style={{ textAlign: 'center', color: '#3d3b5a', padding: '3rem' }}>載入中…</div>
          )}
        </section>


        {/* ── 今日試讀 ── */}
        {todayPreview && (
          <section style={{ maxWidth: '680px', margin: '0 auto 5rem', padding: '0 1.2rem', animation: 'fadeInUp 0.95s ease 0.18s both' }}>
            <div style={{ textAlign: 'center', marginBottom: '1.2rem' }}>
              <span style={{ color: '#4a4868', fontSize: '0.78rem', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                今日試讀
              </span>
            </div>
            <div style={{
              background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(16px)',
              borderRadius: '22px', padding: '2rem 2.2rem',
              border: `1px solid ${todayPreview.color}35`,
            }}>
              <div style={{ marginBottom: '0.6rem' }}>
                <span style={{
                  background: `${todayPreview.color}18`, border: `1px solid ${todayPreview.color}45`,
                  color: todayPreview.color, borderRadius: '20px', padding: '3px 12px',
                  fontSize: '0.73rem', fontWeight: 700,
                }}>
                  {todayPreview.series}
                </span>
              </div>
              <h3 style={{ color: '#f0eeff', fontSize: '0.98rem', fontWeight: 800, margin: '0 0 1rem', lineHeight: 1.45 }}>
                {todayPreview.title}
              </h3>
              <p style={{
                color: '#c8c4e0', fontSize: '0.92rem', lineHeight: 2, margin: '0 0 1.4rem',
                borderLeft: `3px solid ${todayPreview.color}60`, paddingLeft: '1rem',
              }}>
                {todayPreview.excerpt}
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.6rem' }}>
                <span style={{ color: '#3d3b5a', fontSize: '0.76rem' }}>想繼續讀？</span>
                <Link href="/books" style={{
                  background: `linear-gradient(135deg, ${todayPreview.color}, ${todayPreview.color}aa)`,
                  color: '#fff', borderRadius: '20px', padding: '0.45rem 1.3rem',
                  textDecoration: 'none', fontWeight: 700, fontSize: '0.82rem',
                }}>
                  進書評角落 →
                </Link>
              </div>
            </div>
          </section>
        )}



        {/* ── AI快訊 + 工具遊戲（各一張）── */}
        <section style={{ maxWidth: '680px', margin: '0 auto 5rem', padding: '0 1.2rem', display: 'flex', flexDirection: 'column', gap: '1rem', animation: 'fadeInUp 1s ease 0.35s both' }}>
          {/* AI快訊 1則 */}
          {aiNews[0] ? (
            <div className="news-card" style={{
              background: 'rgba(14,165,233,0.07)', border: '1px solid rgba(14,165,233,0.22)',
              borderRadius: '18px', padding: '1.4rem 1.6rem',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.7rem', color: '#38bdf8', fontWeight: 700 }}>📰 快訊 · {aiNews[0].source}</span>
                <Link href="/ai-news" style={{ color: '#38bdf8', fontSize: '0.72rem', textDecoration: 'none', whiteSpace: 'nowrap', marginLeft: '1rem' }}>
                  看更多 →
                </Link>
              </div>
              <a href={aiNews[0].link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'block' }}>
                <h3 style={{
                  color: '#f0f4f8', fontSize: '0.9rem', fontWeight: 700, margin: '0 0 0.4rem', lineHeight: 1.45,
                  display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' as const, overflow: 'hidden',
                }}>{aiNews[0].title}</h3>
                <p style={{
                  color: '#8a9ab0', fontSize: '0.78rem', lineHeight: 1.6, margin: 0,
                  display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' as const, overflow: 'hidden',
                }}>{aiNews[0].description}</p>
              </a>
            </div>
          ) : (
            <div style={{ background: 'rgba(14,165,233,0.04)', border: '1px solid rgba(14,165,233,0.12)', borderRadius: '18px', padding: '1.4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#2a3a4a', fontSize: '0.8rem' }}>📰 快訊載入中…</span>
              <Link href="/ai-news" style={{ color: '#38bdf8', fontSize: '0.78rem', textDecoration: 'none' }}>看更多 →</Link>
            </div>
          )}

          {/* 工具箱 + 小遊戲 */}
          <div style={{
            background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '18px', padding: '1.3rem 1.6rem',
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem',
          }}>
            <Link href="/tools" style={{
              textDecoration: 'none', textAlign: 'center',
              background: 'rgba(132,204,22,0.08)', border: '1px solid rgba(132,204,22,0.2)',
              borderRadius: '12px', padding: '0.9rem 0.5rem',
            }}>
              <div style={{ fontSize: '1.3rem', marginBottom: '0.3rem' }}>🛠</div>
              <div style={{ color: '#bef264', fontSize: '0.82rem', fontWeight: 700 }}>工具箱</div>
              <div style={{ color: '#4a5a2a', fontSize: '0.72rem' }}>實用小工具</div>
            </Link>
            <Link href="/games" style={{
              textDecoration: 'none', textAlign: 'center',
              background: 'rgba(251,191,36,0.08)', border: '1px solid rgba(251,191,36,0.2)',
              borderRadius: '12px', padding: '0.9rem 0.5rem',
            }}>
              <div style={{ fontSize: '1.3rem', marginBottom: '0.3rem' }}>🎮</div>
              <div style={{ color: '#fde68a', fontSize: '0.82rem', fontWeight: 700 }}>小遊戲</div>
              <div style={{ color: '#5a4a1a', fontSize: '0.72rem' }}>動動腦放鬆一下</div>
            </Link>
          </div>
        </section>

        {/* ── 今日測驗 CTA（每日輪換）── */}
        {(() => {
          const FEATURED = [
            { slug: 'intro', emoji: '🧭', title: '你的心理盲點在哪裡？', desc: '不是線性問卷，是一條會分叉的路——你的答案決定你走哪條路。', color: '#a855f7' },
            { slug: 'attachment', emoji: '🔗', title: '你的依附類型是哪一種？', desc: '不是測你愛不愛人，是測你怎麼在親密裡生存。', color: '#ec4899' },
          ];
          const quiz = FEATURED[getDayOfYear() % FEATURED.length];
          return (
            <section style={{ maxWidth: '540px', margin: '0 auto 5.5rem', padding: '0 1.2rem', textAlign: 'center', animation: 'fadeInUp 1s ease 0.45s both' }}>
              <div style={{
                background: `rgba(124,58,237,0.08)`, border: `1px solid ${quiz.color}44`,
                borderRadius: '22px', padding: '2.4rem 2rem',
              }}>
                <div style={{ fontSize: '2.2rem', marginBottom: '0.7rem', animation: 'float 3s ease-in-out infinite', display: 'inline-block' }}>{quiz.emoji}</div>
                <div style={{ color: '#4a4060', fontSize: '0.72rem', letterSpacing: '0.12em', marginBottom: '0.5rem', textTransform: 'uppercase' }}>今日測驗</div>
                <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#e9d5ff', margin: '0 0 0.6rem', lineHeight: 1.4 }}>
                  {quiz.title}
                </h2>
                <p style={{ color: '#7a788e', fontSize: '0.85rem', marginBottom: '1.5rem', lineHeight: 1.65 }}>
                  {quiz.desc}
                </p>
                <div style={{ display: 'flex', gap: '0.8rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <Link href={`/quiz/${quiz.slug}`} style={{
                    display: 'inline-block',
                    background: `linear-gradient(135deg, #7c3aed, ${quiz.color})`,
                    color: '#fff', borderRadius: '30px', padding: '0.65rem 2rem',
                    textDecoration: 'none', fontWeight: 700, fontSize: '0.9rem',
                  }}>
                    測一測 →
                  </Link>
                  <Link href="/quiz" style={{
                    display: 'inline-block', color: '#6b5a8a',
                    borderRadius: '30px', padding: '0.65rem 1.4rem',
                    textDecoration: 'none', fontSize: '0.85rem',
                    border: '1px solid rgba(107,90,138,0.3)',
                  }}>
                    全部測驗
                  </Link>
                </div>
              </div>
            </section>
          );
        })()}

        {/* ── 底部小連結 ── */}
        <footer style={{ borderTop: '1px solid rgba(255,255,255,0.07)', padding: '2rem 1.2rem 2.5rem', textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '1.2rem 2rem', marginBottom: '1.2rem' }}>
            {[
              { label: '💬 互動牆', href: '/wall' },
              { label: '🛒 小舖', href: 'https://still-time-corner.vercel.app', external: true },
            ].map(l => (
              l.external
                ? <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="footer-link">{l.label}</a>
                : <Link key={l.href} href={l.href} className="footer-link">{l.label}</Link>
            ))}
          </div>
          <p style={{ color: '#2a2840', fontSize: '0.72rem', margin: 0 }}>© 2026 盧林 · 有的沒的小舖</p>
        </footer>

      </div>
    </main>
  );
}
