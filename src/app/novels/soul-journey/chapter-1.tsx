'use client'
// 靈魂的轉運站 · 第一章：靈魂有時刻表
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
            靈魂有時刻表
          </h1>
          <div className="w-16 h-0.5 bg-purple-500/40 mx-auto" />
        </header>

        {/* ══════════════════════════════════════
            第一節：那張臉
        ══════════════════════════════════════ */}
        <section className="mb-20">
          <h2 className="text-lg font-bold text-purple-300 mb-8 tracking-wide">
            第一節　那張臉
          </h2>

          <article className="space-y-6 text-gray-300 leading-[2] text-[15px] md:text-base">
            <p>
              小誠回來的那天下午，我們約在老地方——那家開了十幾年、窗邊永遠曬著一束乾燥薰衣草的咖啡館。
            </p>
            <p>
              他比預定時間晚了二十分鐘。我坐在靠窗的位子，看著街上的人來來去去，心裡其實有點擔心。小誠的媽媽走了快四個月了，他這段時間狀態時好時壞，有時候傳來的訊息裡藏著一種我說不上來的空洞感。我不是很確定，讓他去見那位靈媒阿姨，到底是一個好主意還是壞主意。
            </p>
            <p>
              然後我看見他推開玻璃門走進來。
            </p>
            <p>
              我認識小誠快十年了。我見過他哭、見過他喝醉、見過他在 KTV 嚎叫到聲音沙啞、也見過他媽媽走後那段時間，眼睛裡像是有什麼光被抽走的樣子。但那天下午，他走進來的時候，臉上有一種我從來沒見過的表情。
            </p>
            <p>
              不是快樂。也不是悲傷。
            </p>
            <p>
              是一種鬆動。
            </p>
            <p>
              像是某個他原本緊緊抓著的東西，終於，被輕輕放下了。
            </p>
            <p>
              他坐下來，點了一杯熱美式，然後沉默了一會兒。我沒有問。我學會了，有些話需要先讓它從體內升上來，你催不得。
            </p>
            <p>
              「她說，」他開口，聲音很平靜，「我媽媽的離開時間，一開始就決定好了。」
            </p>
            <p>
              我沒有說話。
            </p>
            <p>
              「不是因為生病。不是因為我沒有照顧好她。不是因為任何人的錯。」他環著咖啡杯，眼睛看著桌面，「她說，靈魂來到這個世界之前，就已經知道自己要在什麼時候離開。那個時間是它自己選的。」
            </p>
            <p>
              窗外一輛機車轟隆隆駛過。薰衣草在空調的微風裡輕輕搖了一下。
            </p>
            <p>
              我看著小誠的臉，那個「鬆動」更清晰了。像是一道裂縫，不是破碎的那種，而是光從裡面透出來的那種。
            </p>
            <p>
              「你相信嗎？」我問。
            </p>
            <p>
              他想了很久。
            </p>
            <p>
              「我不知道，」他說，「但我哭了。不是難過的哭。是……好像某個東西被解開了。」
            </p>
            <p>
              我那天晚上回家，躺在床上睡不著。
            </p>
            <p>
              腦子裡一直繞著他說的那句話：靈魂來到這個世界之前，就已經知道自己要在什麼時候離開。
            </p>
            <p>
              我是一個理性的人。或者說，我一直以為自己是。我念的是理工科，相信數據，相信因果，相信凡事都有可以被解釋的邏輯。「靈媒」這兩個字，在我過去的認知框架裡，大概落在「模糊地帶」，不至於嗤之以鼻，但也不會認真當一回事。
            </p>
            <p>
              可是小誠臉上那個表情，我沒辦法用「他只是在自我安慰」來解釋。
            </p>
            <p>
              我見過那種自我安慰的臉。那種臉是用力的、是繃著的，像是一個人站在大風裡拼命抓著帽子。小誠那天的臉不是那樣。那是一種真實的、從內部發生的鬆開。
            </p>
            <p>
              我開始想一件事。
            </p>
            <p>
              如果，靈魂真的有離場時刻表——
            </p>
            <p>
              那我們所有人對死亡的恐懼，是不是有一部分是建立在一個錯誤的前提上的？我們以為死亡是偶然的、是可以被避免的、是一場我們輸掉的戰爭。我們責怪自己沒有更早帶他去看醫生，責怪自己那天沒有接到電話，責怪自己最後說的話不夠溫柔。我們揹著這些罪名，一揹就是好幾年。
            </p>
            <p>
              但如果那個時刻，從一開始就已經被決定了呢？
            </p>
            <p>
              這個念頭讓我一半抗拒，一半著迷。
            </p>
            <p>
              抗拒的部分說：這只是一種讓人感覺好過的說法。這是宗教給失去的人的糖衣。你一個學理工的，怎麼可以這樣輕易動搖？
            </p>
            <p>
              著迷的部分說：但你有沒有想過，也許我們以為「理性」的那套，只是因為我們的測量工具還不夠精細？我們曾經以為地球是宇宙的中心。我們曾經以為某些疾病是鬼神作祟。「不相信」有時候不是清醒，只是還沒有遇見足夠震撼的證據。
            </p>
            <p>
              我在黑暗裡躺了很久。
            </p>
            <p>
              最後，我拿起手機，傳訊息給小誠：「那個靈媒阿姨的聯絡方式，可以給我嗎？」
            </p>
            <p>
              他回得很快。大概也還沒睡。
            </p>
            <p>
              一串電話號碼，後面跟著一句話：「她說話很輕，但你會聽很久。」
            </p>
            <p>
              我把號碼存進手機。猶豫了一下，把備註打上：靈媒阿姨。
            </p>
            <p>
              然後把手機翻面放在床頭，閉上眼睛。
            </p>
            <p>
              我不確定我相信什麼。但我知道，有一個問題開始在我心裡生根——不是「有沒有靈魂」，而是更深的那個：
            </p>
            <p className="text-purple-200">
              如果離開這件事從來就不是意外，那我們這些還留著的人，又究竟是為了什麼而留下來的？
            </p>
            <p>
              那個問題像一顆石子投進水裡，漣漪還在擴散的時候，我睡著了。
            </p>
          </article>

          {/* 節尾鉤子 */}
          <div className="mt-10 p-5 border border-purple-500/20 rounded-2xl bg-purple-900/10 text-sm text-purple-300 italic leading-relaxed">
            那個號碼，我存了三個星期才鼓起勇氣撥出去。而靈媒阿姨接起電話的第一句話，讓我愣了整整五秒鐘。
          </div>
        </section>

        {/* ══════════════════════════════════════
            第二節：那通電話（isLocked 判斷）
        ══════════════════════════════════════ */}
        {isLocked ? (
          <section className="mb-20">
            <h2 className="text-lg font-bold text-purple-300 mb-8 tracking-wide">
              第二節　那通電話
            </h2>
            <div className="relative">
              <p className="text-gray-400 line-clamp-4 select-none blur-[2px]">
                那三個星期，我把那串號碼看了不知道幾次。有時候是睡前，拿起手機想傳訊息給朋友，滑著滑著就滑到聯絡人裡，停在「靈媒阿姨」那四個字上……
              </p>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#12122a]/80 to-[#12122a]" />
            </div>
            <div className="text-center py-10 space-y-5">
              <p className="text-purple-300 font-medium text-sm">繼續閱讀完整章節</p>
              <a
                href="https://still-time-corner.vercel.app/digital"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-purple-600 hover:bg-purple-500 text-white font-bold px-8 py-3 rounded-full text-sm transition-all shadow-lg shadow-purple-900/40"
              >
                ✨ 前往小舖解鎖完整版
              </a>
            </div>
          </section>
        ) : (
          <section className="mb-20">
            <h2 className="text-lg font-bold text-purple-300 mb-8 tracking-wide">
              第二節　那通電話
            </h2>

            <article className="space-y-6 text-gray-300 leading-[2] text-[15px] md:text-base">
              <p>
                那三個星期，我把那串號碼看了不知道幾次。
              </p>
              <p>
                有時候是睡前，拿起手機想傳訊息給朋友，滑著滑著就滑到聯絡人裡，停在「靈媒阿姨」那四個字上。有時候是午休，坐在公司樓下的便利商店，對著咖啡發呆，腦子裡突然浮出小誠那天的臉，然後想起那串號碼還在手機裡等著。
              </p>
              <p>
                我沒有撥。
              </p>
              <p>
                不是因為不想。是因為每次手指移到撥號鍵上，腦子裡就會出現一個聲音：你到底要問什麼？你要問靈魂存不存在嗎？你要問死掉的人去哪裡了嗎？你是一個成年人，你確定你要認真去做這件事？
              </p>
              <p>
                那個聲音很有邏輯。它說的每一句話都站得住腳。
              </p>
              <p>
                但還有另一個聲音，更小、更低、藏在更深的地方，它只是一直輕輕地說：你其實早就有一個問題了，只是一直不敢問出口。
              </p>
              <p>
                我知道那個問題是什麼。
              </p>
              <p>
                我外婆走的那年，我十九歲。她是家裡第一個我真正親眼看著消失的人。不是那種在新聞上的消失，不是電影裡的消失——是早上還在，下午就不在了。我記得那天下午接到電話，站在宿舍走廊，窗外是普通的藍天，普通的風，普通的校園聲音，然後電話裡我爸說「阿嬤走了」，然後世界繼續轉，好像什麼都沒有發生。
              </p>
              <p>
                那個「什麼都沒有發生」讓我很不安。
              </p>
              <p>
                我以為失去一個人，世界應該會有某種明顯的改變。天氣驟變，或者時間停頓，或者至少讓我清楚感覺到「這裡少了一個人」。但什麼都沒有。太陽繼續從東邊升起，食堂繼續在中午開門，同學繼續在走廊聊天。那個人就這樣無聲無息地從世界上消失了，而世界毫不在意。
              </p>
              <p>
                這件事在我心裡留了一根刺。十幾年了，我一直沒有找到一個說法，可以把那根刺取出來。
              </p>
              <p>
                撥出電話的那天，是外婆的忌日。
              </p>
              <p>
                我不是故意選那天的。是到了那天早上，我媽傳來一則訊息，說「今天是阿嬤忌日，有空燒個金紙」，我才想起來。然後我坐在辦公室裡，對著螢幕發呆了將近半個小時，中間什麼事也沒做，就是想著外婆。
              </p>
              <p>
                想著她的手。她的手很小，皮膚很鬆，但握起來很有力量。小時候上市場，她都會把我的手緊緊握著，那種緊是怕我走丟的緊，是一種不需要語言的「我在」。
              </p>
              <p>
                我想著想著，就拿起了手機。
              </p>
              <p>
                電話響了三聲。
              </p>
              <p>
                「喂？」
              </p>
              <p>
                聲音很輕。不是那種刻意壓低的輕，是那種本來就長在那個頻率上的輕，像是有人在安靜的房間裡和你說話。
              </p>
              <p>
                「您好，」我的聲音突然有點不自然，「我是……小誠的朋友，他有給我您的號碼……」
              </p>
              <p>
                「嗯，」她說，「我知道你會來。」
              </p>
              <p>
                我愣了五秒鐘。
              </p>
              <p>
                不是因為她說了什麼玄妙的話——單看那句話，其實可以有很多種解釋，也許只是小誠事先打過招呼，也許只是一種讓對方放鬆的說話方式。我愣住，是因為她說那句話的語氣。
              </p>
              <p>
                是一種描述事實的語氣。安靜的、沒有任何表演成分的，就只是在陳述一件她早就知道的事。
              </p>
              <p>
                「你今天想打這通電話，是有什麼事發生嗎？」她問。
              </p>
              <p>
                「今天是我外婆的忌日，」我說，「我也不知道為什麼，就撥了。」
              </p>
              <p>
                電話那頭沉默了一兩秒。然後她說：
              </p>
              <p className="text-purple-200 italic">
                「不是你選了今天。是今天找到了你。」
              </p>
              <p>
                我不知道那句話是什麼意思，但我心裡某個地方，悄悄動了一下。
              </p>
              <p>
                我們在電話裡只說了不到十分鐘。她問我最近睡得好不好，問我有沒有夢見過外婆，問我心裡有沒有一個一直沒有被回答的問題。
              </p>
              <p>
                我說：有。
              </p>
              <p>
                她說：你願意說嗎？
              </p>
              <p>
                我想了一下，然後說出了那個藏了十幾年的問題：「我一直沒辦法理解，為什麼一個人就這樣消失了，世界卻毫無感覺？她去了哪裡？還是說……什麼都沒有了？」
              </p>
              <p>
                電話那頭，她輕輕地呼了一口氣。不是嘆氣，是一種「我聽到了」的聲音。
              </p>
              <p>
                「這個問題，你願意來當面聊嗎？」她說，「有些東西，電話說不清楚。」
              </p>
              <p>
                我說好。
              </p>
              <p>
                掛掉電話之後，我在椅子上坐了很久。
              </p>
              <p>
                窗外的城市照常運轉，車聲、人聲、辦公室的空調聲。但我心裡有什麼東西，正在非常緩慢地、非常安靜地，開始鬆開。
              </p>
              <p>
                也許是因為那個問題終於被說出口了。也許是因為有人說「我聽到了」。也許是別的什麼——
              </p>
              <p>
                我還不知道。但我知道，那個藏了十幾年的問題，快要有一個去處了。
              </p>
            </article>

            {/* 節尾鉤子 */}
            <div className="mt-10 p-5 border border-purple-500/20 rounded-2xl bg-purple-900/10 text-sm text-purple-300 italic leading-relaxed">
              三天後，我第一次走進她家。她沏了茶，然後拿出一張紙，在上面畫了一架飛機。「你有沒有搭過飛機之前，機票就已經決定好降落時間的經驗？」她問我。我說有。「靈魂也是，」她說，「在登機之前，就已經知道了。」
            </div>
          </section>
        )}

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
