'use client';

const NOVELS = [
  {
    id: 'lulu-diary',
    title: '默默的日記',
    emoji: '/images/lulu.jpg',
    isImage: true,
    desc: '一隻貓咪的日常，溫柔地記錄著每個平凡的瞬間。',
    tag: '連載中',
    href: 'https://surprise-corner.vercel.app/novels/lulu-diary/ebook',
    chatHref: 'https://surprise-corner.vercel.app/chat/lulu',
    chatLabel: '和默默聊聊',
  },
  {
    id: 'the-last-signal',
    title: '最後的信號',
    emoji: '📡',
    desc: '廢土紀元的信號監聽員，收到了來自九萬公里外的訊號…',
    tag: '連載中',
    href: 'https://surprise-corner.vercel.app/novels/the-last-signal/ebook',
    chatHref: 'https://surprise-corner.vercel.app/chat/signal',
    chatLabel: '和林悅說說話',
  },
];

const STATIC_WHISPERS = [
  { id: 1, content: "這裡很有溫度，謝謝小舖存在著。", author: "阿彥" },
  { id: 2, content: "慢慢逛，很舒服。", author: "小魚" },
];

export default function CoffeeCorner() {
  return (
    <div className="w-full">

      {/* Sena 登場區 */}
      <div className="text-center mb-10">
        <div className="mb-4 inline-block w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg">
          <img
            src="/images/sena.jpg"
            alt="Sena"
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="text-xl font-black text-stone-800 mb-1">靈魂休閒區</h3>
        <p className="text-stone-400 text-sm font-light tracking-[0.15em]">
          —— 放鬆心情，享受書香時光 ——
        </p>
      </div>

      {/* 連載小說推薦區 */}
      <div className="max-w-4xl mx-auto px-4 mb-12">
        <p className="text-center text-stone-500 text-sm mb-6 tracking-wide">
          ✨ 驚喜角落連載中，陪你度過每個空白時刻
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {NOVELS.map(novel => (
            <div key={novel.id} className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-[2rem] border border-purple-100 p-7 flex flex-col gap-4 shadow-sm">
              <div className="flex items-center gap-3">
                {novel.isImage ? (
                  <img
                    src={novel.emoji}
                    alt={novel.title}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <span className="text-4xl">{novel.emoji}</span>
                )}
                <div>
                  <span className="text-[10px] font-black text-purple-400 tracking-widest uppercase">{novel.tag}</span>
                  <h4 className="text-base font-black text-stone-800 leading-tight">{novel.title}</h4>
                </div>
              </div>
              <p className="text-stone-500 text-sm leading-relaxed flex-1">{novel.desc}</p>
              <div className="flex flex-col gap-2">
                <a
                  href={novel.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center bg-purple-600 text-white rounded-xl py-2.5 font-black text-sm hover:bg-purple-700 transition-colors"
                >
                  📖 去看看
                </a>
                <a
                  href={novel.chatHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center text-purple-500 text-xs font-bold hover:text-purple-700 transition-colors py-1"
                >
                  💬 {novel.chatLabel}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 靜態留言卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto px-4">
        {STATIC_WHISPERS.map(w => (
          <div key={w.id} className="relative p-8 bg-white rounded-[2.5rem] border border-stone-100 shadow-sm hover:shadow-md transition-shadow group">
            <span className="absolute top-4 left-6 text-3xl text-orange-100 font-serif">"</span>
            <p className="text-stone-700 text-base leading-relaxed mb-6 font-medium relative z-10">
              {w.content}
            </p>
            <div className="flex flex-col items-end gap-1">
              <span className="text-[12px] text-stone-500 font-bold tracking-tighter">— {w.author}</span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
