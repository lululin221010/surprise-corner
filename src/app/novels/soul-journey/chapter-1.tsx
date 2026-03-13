'use client'
// 靈魂的轉運站 · 第一章：註定的離場時間
// 路徑：src/app/novels/soul-journey/chapter-1.tsx

import Link from 'next/link'

interface Props {
  isLocked?: boolean
}

export default function SoulJourneyChapter1({ isLocked = false }: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f0f1a] via-[#12122a] to-[#0d0d1e] text-white">
      <div className="max-w-2xl mx-auto px-6 py-16">

        {/* ── 章節標題 ── */}
        <header className="mb-14 text-center">
          <p className="text-purple-400 text-xs tracking-[0.3em] uppercase mb-4 font-medium">
            靈魂的轉運站 · 第一章
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-white leading-snug mb-4">
            註定的離場時間
          </h1>
          <div className="w-16 h-0.5 bg-purple-500/40 mx-auto" />
        </header>

        {/* ── 正文 ── */}
        <article className="space-y-8 text-gray-300 leading-[2] text-[15px] md:text-base">

          {/* 第一節：引子 */}
          <p>
            朋友小誠說，他去看了靈媒。
          </p>
          <p>
            那天下午，我們坐在熟悉的咖啡廳，窗外的雨打在玻璃上，像是有人輕輕地在叩門。他把那杯熱可可推到一旁，抬頭看著我說：「靈媒告訴我，我媽現在很好。她說，不用擔心她。」
          </p>
          <p>
            我沒問他信不信。有些話，信或不信，其實不重要。重要的是那一刻，他眼神裡那一點點鬆動——那種像是積壓很久的什麼，終於有了一個出口。
          </p>

          {/* 語錄一 */}
          <blockquote className="border-l-2 border-purple-500/60 pl-6 py-2 my-10">
            <p className="text-purple-200 italic text-base leading-loose">
              「也許我們害怕的，不是死亡本身，<br />
              而是那個再也無法說出口的遺憾。」
            </p>
          </blockquote>

          {/* 第二節：為什麼有人走得那麼早 */}
          <p>
            我一直在想一件事：為什麼有些人走得那麼早？
          </p>
          <p>
            有的人，才剛剛展開人生，就像是才翻開第一章的書，忽然被合上了。有的人，明明還有那麼多事情沒完成，還有那麼多人在等著，卻在某一天清晨，悄悄地離開了這個房間。
          </p>
          <p>
            我不再相信這些是意外。我開始相信，每一個人來到這個世界，都帶著一份無形的時間表。那個離場的時刻，早在我們出生之前，就已經被輕輕地寫好了——不是命運的殘忍，而是某種遠比我們所能理解的更大的安排。
          </p>

          {/* 第三節：靈魂的整理 */}
          <p>
            靈媒阿姨說，每一個靈魂在離開之前，都需要時間。
          </p>
          <p>
            不是因為他們捨不得走。而是因為他們需要把愛，一點一滴地，從這個維度帶到下一個維度去。就像是搬家——你不會一次把所有的東西都帶走，你會一件一件地收拾，看著每一樣東西，回想它曾經陪著你走過的日子。
          </p>
          <p>
            那個離場的過程，就是最後的整理。整理記憶、整理愛、整理所有他們想帶著走的溫暖。
          </p>

          {/* 語錄二 */}
          <blockquote className="border-l-2 border-indigo-400/60 pl-6 py-2 my-10">
            <p className="text-indigo-200 italic text-base leading-loose">
              「離開，不是消失。<br />
              是換了一個地方，繼續愛著你。」
            </p>
          </blockquote>

          {/* 付費鎖定判斷 */}
          {isLocked ? (
            /* ── 鎖定：顯示預覽截斷 + 解鎖提示 ── */
            <>
              <div className="relative">
                <p className="text-gray-400 line-clamp-3 select-none blur-[2px]">
                  「那她是不是還在？」小誠問過靈媒。靈媒說：「她在另一個空間裡，很近。近到你轉頭的時候，幾乎能感覺到她的存在。那種近，不是距離，是一種頻率……」
                </p>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#12122a]/80 to-[#12122a]" />
              </div>

              <div className="text-center py-10 space-y-5">
                <p className="text-2xl">🔐</p>
                <p className="text-purple-300 font-medium text-sm">
                  後半段為付費章節
                </p>
                <p className="text-gray-500 text-xs leading-relaxed">
                  包含：小誠與媽媽之間未說出口的話、<br />
                  靈界守候的方式、以及作者自身的親身故事
                </p>
                <a
                  href="https://still-time-corner.vercel.app/digital"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-purple-600 hover:bg-purple-500 text-white font-bold px-8 py-3 rounded-full text-sm transition-all shadow-lg shadow-purple-900/40 hover:shadow-purple-800/50"
                >
                  ✨ 前往小舖解鎖完整章節
                </a>
              </div>
            </>
          ) : (
            /* ── 解鎖：完整正文 ── */
            <>
              <p>
                「那她是不是還在？」小誠問過靈媒。靈媒說：「她在另一個空間裡，很近。近到你轉頭的時候，幾乎能感覺到她的存在。那種近，不是距離，是一種頻率——你想念她的時候，她就在。」
              </p>
              <p>
                我不知道這是不是真的。但我知道，有一種愛，是不會因為形體的消失而停止的。那種愛，會變成你某天突然想起來的一首歌，會變成你在最低潮的時候忽然冒出的一個念頭：就這樣撐下去，會好的。
              </p>
              <p>
                也許，那就是他們守候的方式。不是出現在你面前，而是變成你心裡那一點點莫名的力氣。
              </p>

              {/* 語錄三 */}
              <blockquote className="border-l-2 border-pink-400/60 pl-6 py-2 my-10">
                <p className="text-pink-200 italic text-base leading-loose">
                  「那些先走的人，<br />
                  不是不見了。<br />
                  他們只是先到了那個站，<br />
                  等著後來的人好好地活。」
                </p>
              </blockquote>

              <p>
                我外婆走的那年，我剛滿十九歲。她走之前，我沒有來得及趕回去。我一直覺得遺憾，覺得對不起她。但有一次，在她走後的某個冬天夜裡，我夢見她坐在老家的廚房，對著我笑，說：「沒事的，我在這裡。」
              </p>
              <p>
                醒來的時候，眼角是濕的。但心裡，有什麼東西輕了下來。
              </p>
              <p>
                也許那就是她說：我不是走了，我只是換了一個地方，繼續愛你。
              </p>

              {/* 結語 */}
              <div className="border border-purple-500/20 rounded-2xl p-8 my-10 bg-purple-900/10 text-center space-y-3">
                <p className="text-gray-300 leading-loose">
                  靈魂的轉運站，不是終點。
                </p>
                <p className="text-gray-300 leading-loose">
                  是一個中間的地方——讓人整理好自己、然後繼續旅程的地方。那些先走一步的人，他們不是消失了，他們只是先到了那個站，看著後來的人，在人間繼續好好活著。
                </p>
                <p className="text-purple-300 leading-loose font-medium">
                  這樣想，那些說不出口的遺憾，是不是也輕了一些？
                </p>
              </div>
            </>
          )}
        </article>

        {/* ── 分隔線 ── */}
        <div className="flex items-center gap-4 my-14">
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-white/20 text-xs">· · ·</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        {/* ── 導流到小舖 ── */}
        <div className="text-center space-y-5">
          <p className="text-gray-500 text-sm">喜歡這篇的你，也許還會喜歡</p>
          <a
            href="https://still-time-corner.vercel.app/digital"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/40 text-white px-8 py-4 rounded-2xl text-sm font-medium transition-all group"
          >
            <span className="text-xl">📖</span>
            <div className="text-left">
              <p className="font-bold group-hover:text-purple-300 transition-colors">有的沒的小舖</p>
              <p className="text-gray-500 text-xs font-normal">療癒文字、連載小說、電子書</p>
            </div>
            <span className="text-gray-600 group-hover:text-purple-400 transition-colors ml-1">→</span>
          </a>

          <div className="pt-4">
            <Link
              href="/novels"
              className="text-gray-600 hover:text-purple-400 text-xs transition-colors"
            >
              ← 返回連載列表
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}
