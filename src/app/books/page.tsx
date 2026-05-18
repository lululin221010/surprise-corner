'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const ST_BASE = 'https://still-time-corner.vercel.app';

const SERIES = [
  {
    name: '暗黑心理學',
    tags: ['操控', '黑暗人格', '識破'],
    color: '#9333ea',
    emoji: '🌑',
    desc: '操控、謊言與黑暗人格的真相。讀完你才知道，誰一直在對你使手段。',
    vols: [
      { title: '《操控的藝術》', excerpt: '你有沒有想過，為什麼有些人就是特別會讓你感到愧疚？他們不需要大吼大叫，只需要沉默幾秒，或者輕描淡寫地說一句「沒事，我理解你」——然後你就開始道歉了。這種技術有個名字，叫做「情感勒索」。' },
      { title: '《謊言的結構》', excerpt: '謊言不是壞人的專利。研究顯示，一般人平均每天說 1 到 2 個謊，而且大部分人說謊的時候，自己根本沒有意識到。問題是：你能分辨哪些是謊言，哪些是你自己說服自己相信的故事嗎？' },
      { title: '《黑暗三角》', excerpt: '心理學有個詞叫「暗黑三角」：自戀、馬基維利主義、精神病態。它們聽起來像犯罪電影的標籤，但實際上，你認識的某些人，可能就有這些特質。而且你根本不知道。' },
      { title: '《邊界的崩塌》', excerpt: '沒有邊界的善良，不是善良，是一種慢性傷害。當你一次又一次地為別人的情緒負責，你以為你在幫忙，但你只是讓對方學會了：只要施壓，你就會讓步。' },
    ],
  },
  {
    name: '認知心理學',
    tags: ['思考偏誤', '決策', '大腦'],
    color: '#0ea5e9',
    emoji: '🧠',
    desc: '你以為你在思考，其實你沒有。大腦如何欺騙你，以及你能怎麼辦。',
    vols: [
      { title: '《你以為你在思考》', excerpt: '你今天做的第一個決定，大概是在你還沒完全清醒的狀態下完成的。不是早餐吃什麼，而是要不要繼續賴床。你的大腦在那個瞬間啟動了一套它偏愛的預設程序——而你，幾乎沒有參與這個過程。' },
      { title: '《捷思的陷阱》', excerpt: '大腦很懶。這不是侮辱，這是事實。它的預設模式是找捷徑，用「夠用就好」的邏輯快速作出判斷，而不是每次都重新思考。問題是，這些捷思（heuristic）很多時候會讓你做出你以後會後悔的決定。' },
      { title: '《記憶的謊言》', excerpt: '你記得的，不一定是真的。認知心理學裡有個概念叫「記憶重構」——每次你回憶一件事，你的大腦不是在播放錄影帶，而是在重新拼湊。而每次重拼，都可能偷偷加入你現在的情緒和信念。' },
      { title: '《注意力的經濟》', excerpt: '你的注意力是這個時代最值錢的東西。不是你的錢，不是你的時間——是你的注意力本身。每一個 app、每一個推播通知，背後都有一整支工程師團隊在研究怎麼讓你多看三秒。而你，通常都輸了。' },
      { title: '《確認偏誤》', excerpt: '你不是在尋找真相，你在尋找支持你已有觀點的證據。這就是確認偏誤：我們天生偏愛能驗證自己信念的資訊，而自動過濾掉那些讓我們不舒服的反證。換句話說，你的「研究」很可能只是在說服自己。' },
      { title: '《決策的重量》', excerpt: '每一個決定都有代價——不只是你選了什麼，而是你放棄了什麼。認知心理學把這叫做「機會成本」，但它真正影響你的，是選擇完之後那種說不清楚的悔恨感：那是你沒走的路在心裡留下的重量。' },
    ],
  },
  {
    name: '成長心理學',
    tags: ['改變', '習慣', '拖延'],
    color: '#10b981',
    emoji: '🌱',
    desc: '失敗、動機與改變的科學。為什麼努力沒有用，以及真正有用的是什麼。',
    vols: [
      { title: '《為什麼努力沒有用》', excerpt: '「再努力一點就好了。」這句話你聽過多少次？問題不在努力夠不夠，而在努力的方向有沒有根據你真正的動機結構設計。心理學告訴我們，人有兩種截然不同的動機系統——一種越燒越旺，一種越逼越熄火。' },
      { title: '《失敗的使用說明》', excerpt: '失敗不是你的問題，你對失敗的解讀才是。研究顯示，相同程度的失敗，有些人會從中學習然後反彈，有些人會直接放棄。差別不在於能力，而在於他們解讀失敗的方式——這個方式，是可以改變的。' },
      { title: '《拖延的心理學》', excerpt: '你拖延不是因為懶，是因為焦慮。拖延的本質是情緒調節問題，不是時間管理問題。當一件事讓你感到不安、恐懼或無聊，你的大腦會自動找其他事情來做，讓你暫時感覺好一點。問題是，明天它還在那裡。' },
      { title: '《習慣的科學》', excerpt: '你大約有 40% 的行為是習慣，不是選擇。你不是每天決定要刷牙、要看手機、要在某個地方駐足——那些是自動程序，大腦在後台執行，你幾乎不參與。問題是：你知道你有哪些習慣，以及它們在把你帶往哪裡嗎？' },
      { title: '《自我效能》', excerpt: '你不是因為成功而有自信，你是因為相信自己能成功，才真的去做，才有機會成功。心理學把這叫做「自我效能感」，它不是盲目的正能量，而是一套可以被建立的認知基礎。' },
      { title: '《改變的門檻》', excerpt: '改變之所以難，不是因為你意志力不夠，而是因為大腦對改變有天然的抗拒。改變意味著不確定性，而大腦討厭不確定性。真正持久的改變，需要讓新行為變得比舊行為「更安全」——在神經層面上。' },
    ],
  },
  {
    name: '人格心理學',
    tags: ['自我', '人格', '防禦'],
    color: '#f59e0b',
    emoji: '🪞',
    desc: '你是誰？你怎麼變成這樣？人格的形成、類型與改變的可能。',
    vols: [
      { title: '《你為什麼是這樣的人》', excerpt: '人格不是你選的。那是你在一次又一次微小的反應中，被環境、被關係、被你根本記不得的早期經歷，一層一層塑造出來的。但這不代表你沒有辦法。真正的改變，從理解自己的人格結構開始。' },
      { title: '《防禦機制》', excerpt: '你的某些反應，根本不是「你」在反應，而是你的防禦機制在替你擋。否認、投射、合理化——這些不是壞人的工具，是你的大腦在很小的時候，為了保護你而建立的系統。問題是它一直在運作，即使你長大了。' },
      { title: '《內向與外向的邊界》', excerpt: '內向不是社交恐懼，外向也不是沒深度。這兩個詞被過度簡化了。真正的內外向，說的是你如何充電：從獨處中補充能量，還是從互動中獲得活力。而大多數人，其實在兩者之間的某個位置。' },
      { title: '《人格的可塑性》', excerpt: '你的人格不是命。研究顯示，人格在成年後仍然持續變化——通常是往更穩定、更開放、更有責任感的方向。這不是說你可以「變成另一個人」，而是說你比你以為的更有彈性。' },
    ],
  },
  {
    name: '關係心理學',
    tags: ['關係', '依附', '邊界'],
    color: '#ec4899',
    emoji: '💔',
    desc: '愛、傷害與邊界的心理學。最傷你的人，通常不是壞人。',
    vols: [
      { title: '《為什麼愛會傷人》', excerpt: '最傷你的人，通常不是壞人。他們只是帶著自己未被療癒的傷，走進了你的生命。而你也一樣。關係心理學不是教你找到「對的人」，而是幫你看清楚你在關係裡的模式。' },
      { title: '《依附類型》', excerpt: '你在關係裡的行為，有一部分是在重演你人生最早的那段關係——你和照顧者之間的互動。那個模板，叫做「依附類型」。而它在你成年後的每一段關係裡，都悄悄地運作著。' },
      { title: '《溝通的失敗》', excerpt: '大多數關係的問題，不是不愛，是不會說。你說了你覺得你說了，對方聽到的卻是另一件事。溝通的失敗發生在傳遞和接收之間，而那個空隙，充滿了各自的假設、防衛和舊傷。' },
      { title: '《分離的學問》', excerpt: '結束一段關係，不代表失敗。有時候，能夠清醒地離開，是你做過最健康的決定之一。但「離開」從來不只是物理距離的問題——心理的分離，往往需要更長的時間，更多的功課。' },
    ],
  },
  {
    name: '潛意識心理學',
    tags: ['潛意識', '記憶', '身體'],
    color: '#8b5cf6',
    emoji: '🌊',
    desc: '那些你以為忘了的事。潛意識如何驅動你的選擇、情緒與人生。',
    vols: [
      { title: '《那些你以為忘了的事》', excerpt: '記憶不會消失。它只是換了個地方。那些你以為自己已經放下的事，那些你說「沒關係、過去了」的經歷——它們住在你的身體反應裡，住在你莫名其妙的情緒裡，住在你選擇某些人的直覺裡。' },
      { title: '《夢的語言》', excerpt: '夢不是隨機的噪音。它是你的潛意識在整理白天沒有處理完的情緒和記憶。佛洛伊德說夢是通往潛意識的康莊大道——這句話比他的很多理論更經得起時間考驗。你上一個印象深刻的夢，說的是什麼？' },
      { title: '《身體的記憶》', excerpt: '你的身體記得你的大腦已經「忘記」的事。那個莫名的胃緊、說不清楚的胸悶、見到某種人就想逃的反應——這些不是無緣無故的。身體儲存著情緒記憶，而這些記憶，往往比語言更誠實。' },
      { title: '《直覺的真相》', excerpt: '直覺不是玄學，它是你的大腦在你意識不到的情況下，快速處理大量資訊之後給出的結論。問題是，它有時候是智慧，有時候只是偏見。知道什麼時候該信直覺，什麼時候該質疑它，是一門值得學的功課。' },
    ],
  },
];

function getDayOfYear(): number {
  const start = new Date(new Date().getFullYear(), 0, 0);
  return Math.floor((Date.now() - start.getTime()) / 86400000);
}

export default function BooksPage() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [featuredIdx, setFeaturedIdx] = useState(0);

  useEffect(() => {
    const slot = getDayOfYear() * 2 + (new Date().getHours() >= 12 ? 1 : 0);
    setFeaturedIdx(slot % SERIES.length);
  }, []);

  const featured = SERIES[featuredIdx];

  return (
    <main style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #1a1040 100%)',
      color: '#fff', padding: '0 0 4rem',
    }}>

      {/* 頂部標題 */}
      <div style={{ textAlign: 'center', padding: '3rem 1rem 2rem' }}>
        <div style={{ fontSize: '0.72rem', letterSpacing: '0.22em', color: '#5a5878', marginBottom: '0.6rem', textTransform: 'uppercase' }}>
          盧林 · 有的沒的小舖
        </div>
        <h1 style={{
          fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 900, margin: '0 0 0.6rem',
          background: 'linear-gradient(135deg, #fff 0%, #c4b5fd 55%, #f0abfc 100%)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        }}>
          書評角落
        </h1>
        <p style={{ color: '#7c7a9e', fontSize: '0.93rem', maxWidth: '480px', margin: '0 auto' }}>
          每一本書都是一個切入口。讀懂自己，從這裡開始。
        </p>
      </div>

      {/* 今日試讀 */}
      {featured && (
        <section style={{ maxWidth: '720px', margin: '0 auto 3rem', padding: '0 1.2rem' }}>
          <div style={{ fontSize: '0.75rem', color: '#6b7280', letterSpacing: '0.1em', marginBottom: '0.8rem' }}>
            ✦ 今日試讀
          </div>
          <div style={{
            background: 'rgba(255,255,255,0.04)',
            border: `1px solid ${featured.color}55`,
            borderLeft: `4px solid ${featured.color}`,
            borderRadius: '12px', padding: '1.6rem',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.8rem', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '1.4rem' }}>{featured.emoji}</span>
              {featured.tags.map(tag => (
                <span key={tag} style={{
                  background: `${featured.color}20`, border: `1px solid ${featured.color}55`,
                  color: featured.color, fontSize: '0.72rem', padding: '0.1rem 0.55rem',
                  borderRadius: '20px', fontWeight: 700,
                }}>{tag}</span>
              ))}
            </div>
            <div style={{ marginBottom: '0.5rem' }}>
              <span style={{ color: '#9ca3af', fontSize: '0.78rem' }}>{featured.name}</span>
              <span style={{ color: '#6b7280', fontSize: '0.78rem', margin: '0 0.4rem' }}>·</span>
              <span style={{ color: '#c4b5fd', fontSize: '0.88rem', fontWeight: 700 }}>{featured.vols[0].title}</span>
            </div>
            <div style={{ color: '#e5e7eb', fontSize: '0.92rem', lineHeight: 1.85, marginBottom: '1.2rem' }}>
              {featured.vols[0].excerpt}⋯⋯
            </div>
            <a
              href={`${ST_BASE}/digital`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                background: `linear-gradient(135deg, ${featured.color}, ${featured.color}99)`,
                color: '#fff', textDecoration: 'none',
                padding: '0.55rem 1.4rem', borderRadius: '20px',
                fontSize: '0.85rem', fontWeight: 700,
              }}
            >
              購買完整版 →
            </a>
          </div>
        </section>
      )}

      {/* 各系列 */}
      <div style={{ maxWidth: '820px', margin: '0 auto', padding: '0 1.2rem' }}>
        {SERIES.map((s) => (
          <section key={s.name} style={{ marginBottom: '2.5rem' }}>
            {/* 系列標題列 */}
            <button
              onClick={() => setExpanded(expanded === s.name ? null : s.name)}
              style={{
                width: '100%', textAlign: 'left', border: 'none',
                cursor: 'pointer', padding: '0.8rem 1rem',
                borderRadius: '10px',
                borderLeft: `4px solid ${s.color}`,
                background: 'rgba(255,255,255,0.03)',
                marginBottom: '0.3rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
                  <span style={{ fontSize: '1.4rem' }}>{s.emoji}</span>
                  <div>
                    <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', marginBottom: '0.3rem' }}>
                      {s.tags.map(tag => (
                        <span key={tag} style={{
                          background: `${s.color}20`, border: `1px solid ${s.color}55`,
                          color: s.color, fontSize: '0.72rem', padding: '0.1rem 0.55rem',
                          borderRadius: '20px', fontWeight: 700,
                        }}>{tag}</span>
                      ))}
                    </div>
                    <div style={{ color: '#6b7280', fontSize: '0.8rem' }}>{s.desc}</div>
                  </div>
                </div>
                <span style={{ color: '#6b7280', fontSize: '0.8rem', flexShrink: 0, marginLeft: '0.5rem' }}>
                  {s.vols.length} 冊　{expanded === s.name ? '▲' : '▼'}
                </span>
              </div>
            </button>

            {/* 展開內容 */}
            {expanded === s.name && (
              <div style={{ paddingLeft: '0.5rem' }}>
                {s.vols.map((v, i) => (
                  <div key={i} style={{
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: '10px', padding: '1.2rem 1.4rem',
                    marginBottom: '0.8rem',
                  }}>
                    <div style={{ fontWeight: 700, color: '#e5e7eb', marginBottom: '0.6rem', fontSize: '0.93rem' }}>
                      Vol.{i + 1}　{v.title}
                    </div>
                    <div
                      style={{
                        fontSize: '0.88rem', color: '#c4b5d4', lineHeight: 1.8,
                        borderLeft: `2px solid ${s.color}66`, paddingLeft: '1rem',
                        marginBottom: '1rem',
                      }}
                      dangerouslySetInnerHTML={{ __html: v.excerpt + '⋯⋯' }}
                    />
                    <
                      href={`${ST_BASE}/digital`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: s.color, textDecoration: 'none', fontSize: '0.82rem', fontWeight: 600,
                      }}
                    >
                      購買完整版 →
                    </a>
                  </div>
                ))}
              </div>
            )}
          </section>
        ))}
      </div>

      {/* 底部導覽 */}
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <Link href="/" style={{ color: '#6b7280', fontSize: '0.85rem', textDecoration: 'none' }}>
          ← 回首頁
        </Link>
      </div>
    </main>
  );
}
