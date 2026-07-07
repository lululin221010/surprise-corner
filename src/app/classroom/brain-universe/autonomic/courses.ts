// 📄 路徑：src/app/classroom/brain-universe/autonomic/courses.ts
// 自律神經學系：7冊，每冊10堂（第1堂免費試讀，2~10堂購買解鎖）

export interface AutonomicSlide {
  id: string;
  type: 'hook' | 'concept' | 'deepdive' | 'summary';
  title: string;
  content: string;
  visual: string;
  lulu?: string;
}

export interface AutonomicQuiz {
  id: string;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

export interface AutonomicLesson {
  id: string;
  title: string;
  duration: number;
  isFree: boolean;
  slides: AutonomicSlide[];
  quizzes: AutonomicQuiz[];
}

export interface AutonomicCta {
  text: string;
  url: string;
  seriesNote: string;
}

export interface AutonomicVolume {
  vol: string;
  title: string;
  subtitle: string;
  emoji: string;
  cta: AutonomicCta;
  lessons: AutonomicLesson[];
}

const ST_BASE = 'https://still-time-corner.vercel.app/digital';

export const autonomicVolumes: AutonomicVolume[] = [
  {
    vol: "01",
    title: "自律神經Vol.01：你到底怎麼了",
    subtitle: "自律神經失調：從混亂到理解的第一步",
    emoji: "🩺",
    cta: { text: "前往小舖購買 Vol.01 完整版（共10堂）", url: ST_BASE + '/6a3fd2f28dfebf4148dea24e', seriesNote: "自律神經學系 7冊・從了解到改變" },
    lessons: [
      {
      id: "autonomic-preview-lesson-1",
      title: "你去看醫生，他說你沒事（但你真的不舒服）",
      duration: 15,
      isFree: true,
      slides: [
      { id: "slide-1", type: "hook", title: "你有過這種經驗嗎？", content: `阿明三十四歲，在科技公司當專案經理。過去半年，他幾乎每隔幾週就要去一次診所——有時候是心跳莫名加速，有時候是頭痛，有時候只是一種說不清楚的「整個人很不對勁」的感覺。

他做了心電圖、抽了血、照了胃鏡。醫生把報告推過來：「一切正常。」

阿明不知道該高興還是沮喪。正常是好事，但他明明就是不舒服。

如果你也有過這種經驗，這堂課是寫給你的。`, visual: `<svg viewBox="0 0 600 300" xmlns="http://www.w3.org/2000/svg"><rect width="600" height="300" fill="#0f172a" rx="12"/><g transform="translate(60,80)"><rect x="0" y="0" width="100" height="44" rx="8" fill="#1e293b" stroke="#6366f1" stroke-width="1.5"/><text x="50" y="27" text-anchor="middle" fill="#c7d2fe" font-size="13" font-family="sans-serif">感覺不舒服</text></g><text x="175" y="107" fill="#475569" font-size="20" font-family="sans-serif">→</text><g transform="translate(190,80)"><rect x="0" y="0" width="80" height="44" rx="8" fill="#1e293b" stroke="#6366f1" stroke-width="1.5"/><text x="40" y="27" text-anchor="middle" fill="#c7d2fe" font-size="13" font-family="sans-serif">去看醫生</text></g><text x="285" y="107" fill="#475569" font-size="20" font-family="sans-serif">→</text><g transform="translate(300,80)"><rect x="0" y="0" width="100" height="44" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/><text x="50" y="20" text-anchor="middle" fill="#6ee7b7" font-size="12" font-family="sans-serif">檢查報告</text><text x="50" y="36" text-anchor="middle" fill="#6ee7b7" font-size="12" font-family="sans-serif">一切正常</text></g><text x="415" y="107" fill="#475569" font-size="20" font-family="sans-serif">→</text><g transform="translate(430,80)"><rect x="0" y="0" width="80" height="44" rx="8" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/><text x="40" y="27" text-anchor="middle" fill="#fcd34d" font-size="13" font-family="sans-serif">？ 困惑</text></g><text x="300" y="200" text-anchor="middle" fill="#94a3b8" font-size="13" font-family="sans-serif">這不是心理作用。你的身體沒有在說謊。</text></svg>` },
      { id: "slide-2", type: "concept", title: "「正常」不等於「沒事」", content: `現代醫學非常擅長找到「結構性問題」——腫瘤、發炎、細胞異常、器官損傷。這些東西可以被影像、血液、切片捕捉到。

但有另一類問題，是「系統的運作方式出了問題」，而不是「某個零件壞掉了」。

就像一台電腦，有時候不是硬碟壞了，是系統在背景跑了太多程式，整台機器開始當機——但你打開機殼看，每個零件都完好。

自律神經失調，大多數時候就是這種情況。不是器官壞了，是調控器官的「神經系統」失去了平衡。`, visual: `<svg viewBox="0 0 600 280" xmlns="http://www.w3.org/2000/svg"><rect width="600" height="280" fill="#0f172a" rx="12"/><rect x="40" y="40" width="240" height="180" rx="10" fill="#1e293b" stroke="#ef4444" stroke-width="1.5"/><text x="160" y="70" text-anchor="middle" fill="#fca5a5" font-size="14" font-weight="bold" font-family="sans-serif">結構問題</text><text x="160" y="95" text-anchor="middle" fill="#94a3b8" font-size="12" font-family="sans-serif">器官損傷 / 腫瘤 / 發炎</text><text x="160" y="130" text-anchor="middle" fill="#6ee7b7" font-size="13" font-family="sans-serif">✅ 儀器可以測到</text><text x="160" y="155" text-anchor="middle" fill="#6ee7b7" font-size="13" font-family="sans-serif">✅ 血液 / 影像捕捉</text><rect x="320" y="40" width="240" height="180" rx="10" fill="#1e293b" stroke="#6366f1" stroke-width="1.5"/><text x="440" y="70" text-anchor="middle" fill="#c7d2fe" font-size="14" font-weight="bold" font-family="sans-serif">調節問題</text><text x="440" y="95" text-anchor="middle" fill="#94a3b8" font-size="12" font-family="sans-serif">神經系統失去平衡</text><text x="440" y="130" text-anchor="middle" fill="#f87171" font-size="13" font-family="sans-serif">⚠️ 儀器難以捕捉</text><text x="440" y="155" text-anchor="middle" fill="#f87171" font-size="13" font-family="sans-serif">⚠️ 報告看起來正常</text><text x="440" y="200" text-anchor="middle" fill="#64748b" font-size="11" font-family="sans-serif">自律神經失調屬於這類</text></svg>` },
      { id: "slide-3", type: "deepdive", title: "症狀是真實的，即使來源不容易看見", content: `很多人在被告知「檢查正常」之後，開始懷疑自己：是不是想太多？是不是身體太弱？

讓我們說清楚：

心悸，是真實的心跳加速，不是想像出來的。頭痛，是真實的神經緊繃，不是誇張。腸胃不舒服，是真實的腸道痙攣，不是無病呻吟。

這些症狀有生理根源，只是那個根源在神經系統的調節層面，而不在器官的結構層面。

理解這件事，是這本書最重要的起點。`, visual: `<svg viewBox="0 0 600 260" xmlns="http://www.w3.org/2000/svg"><rect width="600" height="260" fill="#0f172a" rx="12"/><text x="300" y="45" text-anchor="middle" fill="#e2e8f0" font-size="15" font-weight="bold" font-family="sans-serif">症狀確認清單</text><g transform="translate(80,70)"><rect x="0" y="0" width="440" height="48" rx="8" fill="#1e293b"/><text x="20" y="30" fill="#6ee7b7" font-size="18" font-family="sans-serif">✓</text><text x="50" y="22" fill="#e2e8f0" font-size="13" font-family="sans-serif">心悸</text><text x="50" y="39" fill="#94a3b8" font-size="11" font-family="sans-serif">真實的心跳加速，有神經科學根據</text></g><g transform="translate(80,128)"><rect x="0" y="0" width="440" height="48" rx="8" fill="#1e293b"/><text x="20" y="30" fill="#6ee7b7" font-size="18" font-family="sans-serif">✓</text><text x="50" y="22" fill="#e2e8f0" font-size="13" font-family="sans-serif">頭痛 / 腸胃不適 / 慢性疲勞</text><text x="50" y="39" fill="#94a3b8" font-size="11" font-family="sans-serif">真實的神經緊繃，不是無病呻吟</text></g><g transform="translate(80,186)"><rect x="0" y="0" width="440" height="44" rx="8" fill="#312e81"/><text x="20" y="28" fill="#a5b4fc" font-size="13" font-family="sans-serif">🐱 魯魯：儀器找不到，不代表你在說謊。你的身體沒有在騙你。</text></g></svg>` },
      { id: "slide-4", type: "summary", title: "本堂重點", content: `📝 三件事，帶走就夠了：

① 「正常」有範圍限制
標準檢查擅長找結構損傷，自律神經的失衡屬於「調節層面」，所以「沒有異常」不等於「解釋了你的不舒服」。

② 症狀是真實的生理反應
心悸、頭痛、疲勞有具體的神經科學根據，不是心理作用，更不是「想太多」。

③ 找到根源才能真正應對
一旦理解了機制，才能做出有意義的改變。`, visual: `<svg viewBox="0 0 600 280" xmlns="http://www.w3.org/2000/svg"><rect width="600" height="280" fill="#0f172a" rx="12"/><text x="300" y="42" text-anchor="middle" fill="#e2e8f0" font-size="16" font-weight="bold" font-family="sans-serif">你現在知道的事</text><g transform="translate(60,60)"><rect x="0" y="0" width="480" height="54" rx="8" fill="#1e293b" stroke="#6366f1" stroke-width="1"/><text x="20" y="22" fill="#6366f1" font-size="18" font-family="sans-serif">①</text><text x="50" y="22" fill="#e2e8f0" font-size="13" font-weight="bold" font-family="sans-serif">「正常」不等於「沒事」</text><text x="50" y="40" fill="#94a3b8" font-size="11" font-family="sans-serif">自律神經失衡在調節層面，標準檢查難捕捉</text></g><g transform="translate(60,124)"><rect x="0" y="0" width="480" height="54" rx="8" fill="#1e293b" stroke="#6366f1" stroke-width="1"/><text x="20" y="22" fill="#6366f1" font-size="18" font-family="sans-serif">②</text><text x="50" y="22" fill="#e2e8f0" font-size="13" font-weight="bold" font-family="sans-serif">症狀是真實的生理反應</text><text x="50" y="40" fill="#94a3b8" font-size="11" font-family="sans-serif">不是心理作用，有具體神經科學根據</text></g><g transform="translate(60,188)"><rect x="0" y="0" width="480" height="54" rx="8" fill="#1e293b" stroke="#6366f1" stroke-width="1"/><text x="20" y="22" fill="#6366f1" font-size="18" font-family="sans-serif">③</text><text x="50" y="22" fill="#e2e8f0" font-size="13" font-weight="bold" font-family="sans-serif">找到根源才能真正應對</text><text x="50" y="40" fill="#94a3b8" font-size="11" font-family="sans-serif">理解機制，才能做出有意義的改變</text></g></svg>` }
      ],
      quizzes: [
      { id: "q1", question: "阿明做了心電圖、血液、胃鏡，報告顯示一切正常。這代表什麼？", options: ["他的症狀是心理作用，沒有生理問題","排除了結構性疾病，但不代表解釋了他的不舒服","醫生判斷有誤，應該繼續做更多檢查","他的自律神經一定沒有問題"], answer: 1, explanation: "「檢查正常」是個好消息，代表排除了許多嚴重的結構性疾病。但自律神經失衡屬於「調節層面」的問題，標準儀器不容易捕捉，所以正常報告不等於解釋了所有症狀。" },
      { id: "q2", question: "心悸、頭痛、慢性疲勞這些症狀，在自律神經失調的情況下，屬於？", options: ["純粹的心理想像，沒有生理根據","誇大的表現，其實沒那麼嚴重","真實的生理反應，有神經科學根據","必須再做更多檢查才能確定"], answer: 2, explanation: "這些症狀是真實的，有具體的神經科學根據。它們源自神經系統的調節失衡，不是心理作用，也不是「想太多」。理解這一點，是後續所有學習的基礎。" }
      ],
    },
    {
      id: "auto-vol1-lesson-2",
      title: "「自律神經失調」是診斷還是標籤？",
      duration: 10,
      isFree: false,
      slides: [
      { id: "slide-1", type: "hook", title: "開場情境", content: `小雯第三次因心悸就診後，醫生在病歷上寫下「自律神經失調」，開了一些放鬆藥物。她拿著藥走出診間，心裡想：終於有個名字了，但……然後呢？有名字，卻沒有地圖。`, visual: '' },
      { id: "slide-2", type: "deepdive", title: "核心概念一：描述不是解釋", content: `「自律神經失調」描述的是一種狀態，不是具體的病因。就像「發燒」說的是體溫升高了，但沒說為什麼升高。這個詞說的是調節功能出現了偏差，但沒直接告訴你是什麼讓它偏差的。`, visual: '' },
      { id: "slide-3", type: "concept", title: "核心概念二：它是一把傘", content: `自律神經失調底下涵蓋很多不同情況：交感神經過度活躍、副交感神經反應不足、兩者切換出問題、特定器官的自律調節失衡。這也解釋了為什麼同樣被告知失調的人，症狀可以差很多。`, visual: '' },
      { id: "slide-4", type: "deepdive", title: "常見誤解", content: `很多人以為被告知「自律神經失調」就代表找到了病因，可以就此結案。但其實這個詞更像是一個方向指標，真正的理解才剛要開始往下走。`, visual: '' },
      { id: "slide-5", type: "summary", title: "本堂重點", content: `① 標籤是起點不是終點——確認問題方向，但解釋還需要往更深一層找
② 同樣的診斷可能有不同面貌——症狀因人而異是正常的
③ 知道方向，焦慮才能減少——有了框架，至少知道該往哪裡找答案
下一堂預告：自律神經到底是什麼，它在身體裡負責什麼工作？`, visual: '' }
      ],
      quizzes: [
      { id: "q1", question: "根據本堂，「自律神經失調」這個詞最準確的定位是什麼？", options: ["一個描述狀態的詞，而非具體病因的解釋","一個明確指出病因的診斷","一種完全沒有醫學意義的說法","代表病情已經很嚴重的警告"], answer: 0, explanation: "本堂明確用「發燒」做類比：發燒描述體溫升高，但不解釋為什麼升高，「自律神經失調」也是這樣的描述性詞彙。選項D誤把這個詞的存在等同於嚴重程度，與內文不符。" },
      { id: "q2", question: "小雯拿到「自律神經失調」這個診斷後，心裡那種「有名字，但沒有地圖」的感覺，本堂如何解讀？", options: ["代表醫生診斷錯誤","代表她的病情無法被治療","這種感覺很常見，因為標籤只是起點，理解需要往更深一層找","代表她應該立刻換醫院"], answer: 2, explanation: "本堂指出這種感覺很常見，因為拿到標籤其實才是理解的起點而不是終點，後面才需要去探索是什麼讓神經系統失衡。選項A、B、D都把問題歸咎在錯誤的方向上。" },
      { id: "q3", question: "為什麼同樣被診斷「自律神經失調」的兩個人，可能一個主要心悸、一個主要腸胃症狀？", options: ["因為其中一個人診斷錯誤","因為失調是傘狀詞，底下涵蓋多種不同的神經調節偏差類型","因為兩人的醫生用了不同的檢查方式","因為症狀完全是隨機發生，沒有任何邏輯"], answer: 1, explanation: "本堂用「傘狀詞」比喻，說明失調底下有交感過度活躍、副交感不足、切換失靈、器官失調等不同類型，所以症狀表現可以差很多。選項D忽略了背後具體的神經機制差異。" },
      { id: "q4", question: "如果一個人拿到「自律神經失調」的診斷後，開始反覆懷疑「是不是還有別的重病沒被診斷出來」，本堂會怎麼回應這種焦慮？", options: ["這種懷疑很合理，應該持續做更多檢查","完全不需要理會這個診斷","應該立刻停止服用任何藥物","可以把焦慮轉向更有意義的問題，例如是什麼讓神經系統一直處在緊繃狀態"], answer: 3, explanation: "本堂指出，知道症狀來自自律神經調節問題後，可以不需要繼續在「是不是心臟病」這類方向上無止境焦慮，而是去問更有意義的問題，例如壓力、睡眠等來源。選項A與本堂想引導讀者脫離的焦慮循環方向相反。" },
      { id: "q5", question: "本堂結尾提到「知道方向，焦慮才能減少」，這跟下一堂要講的「自律神經到底是什麼」有什麼連結？", options: ["兩者完全沒有關聯","理解自律神經系統具體管什麼，正是把模糊標籤填上實際內容的第一步","下一堂會推翻本堂的所有結論","下一堂只是重複本堂內容"], answer: 1, explanation: "本堂建立了「標籤只是起點」的概念，下一堂深入說明自律神經系統具體是什麼、管理什麼範圍，正是把這個起點往下展開的第一步，幫助讀者建立完整的理解地圖。" }
      ],
    },
    {
      id: "auto-vol1-lesson-3",
      title: "自律神經到底是什麼（不是什麼玄學）",
      duration: 10,
      isFree: false,
      slides: [
      { id: "slide-1", type: "hook", title: "開場情境", content: `你現在在看這段文字，同時心臟在跳、肺在呼吸、消化系統在處理上一餐、體溫被精準維持在37度左右。你完全沒在想這些事，但它們全都在發生——背後的操盤手就是自律神經系統。`, visual: '' },
      { id: "slide-2", type: "deepdive", title: "核心概念一：神經系統的兩條線", content: `人體神經系統分兩部分：體神經系統管你能主動控制的動作，像抬手走路；自律神經系統管你不需要主動控制的功能，像心跳、呼吸、消化、體溫。「自律」就是「自動調節」的意思，不是神秘力量。`, visual: '' },
      { id: "slide-3", type: "concept", title: "核心概念二：指揮總部在下視丘", content: `自律神經的最高指揮中心在下視丘，它接收體溫、血糖、壓力荷爾蒙、甚至情緒狀態的訊號，決定身體要調整到什麼運作模式。情緒會影響下視丘，這就是心理狀態能直接影響身體症狀的真正原因——不是玄學，是共用了一部分大腦迴路。`, visual: '' },
      { id: "slide-4", type: "deepdive", title: "常見誤解", content: `很多人以為自律神經是一種抽象的「能量」或「氣」，很難理解。但其實它是一套非常具體的神經線路，從大腦延伸到全身器官，負責管理大部分自動功能。`, visual: '' },
      { id: "slide-5", type: "summary", title: "本堂重點", content: `① 自律神經是具體的神經線路——不是抽象概念，而是實體神經網絡
② 指揮中心和情緒共用空間——下視丘同時處理身體調節與情緒訊號
③ 管理範圍廣，所以症狀才會這麼雜——心跳、消化、睡眠都在同一系統下
下一堂預告：自律神經裡最重要的兩個角色——交感神經和副交感神經，它們分別做什麼？`, visual: '' }
      ],
      quizzes: [
      { id: "q1", question: "「自律」這兩個字在自律神經系統中的真正意思是什麼？", options: ["一種神秘的精神力量","完全不受大腦控制的獨立系統","自動調節，不需要主動控制","只在睡覺時才會運作的系統"], answer: 2, explanation: "本堂明確指出「自律」就是「自動調節」的意思，不是什麼玄學或神秘力量，且這套系統24小時運作，不論清醒或睡著。選項B忽略了下視丘作為指揮中心的角色。" },
      { id: "q2", question: "體神經系統與自律神經系統最主要的差別是什麼？", options: ["體神經系統管不需要主動控制的功能","兩者其實是同一套系統","自律神經系統只在白天運作","體神經系統管你能主動控制的動作，自律神經系統管不需要主動控制的自動功能"], answer: 3, explanation: "體神經系統負責抬手、走路等主動動作，自律神經系統負責心跳、消化等自動功能，這是兩者最核心的差別。選項A把兩者的功能描述對調了。" },
      { id: "q3", question: "為什麼情緒狀態能直接影響身體症狀，例如緊張時心跳加速？", options: ["這完全是心理作用，跟神經系統無關","因為情緒訊號和自律神經訊號共用了下視丘的一部分大腦迴路","因為情緒會直接改變心臟的結構","這是無法被科學解釋的現象"], answer: 1, explanation: "下視丘同時接收情緒訊號和身體調節訊號，兩者共用一部分迴路，這是情緒能直接影響身體反應的真正機制。選項A與D都否定了背後具體的神經科學根據，與本堂強調的重點相反。" },
      { id: "q4", question: "自律神經失調時，為什麼症狀可以同時出現在心跳、腸胃、出汗等看似不相關的地方？", options: ["因為自律神經管理範圍極廣，涵蓋心跳、消化、出汗等多項自動功能，失衡時可能反映在清單上任何一處","因為這些器官各自獨立發生病變","因為患者同時得了好幾種不同的病","這些症狀其實互不相關，只是巧合"], answer: 0, explanation: "本堂列出自律神經管理的清單幾乎涵蓋所有不需要思考的維生功能，失衡時症狀可能出現在清單上任何地方，這正是症狀多樣化的原因。選項C與D都忽略了同一套系統管理多個器官的事實。" },
      { id: "q5", question: "理解「自律神經是具體神經線路而非抽象概念」，對接下來理解交感與副交感神經有什麼幫助？", options: ["完全沒有幫助，是獨立的概念","建立了自律神經有實體結構與明確管理範圍的基礎，幫助理解接下來交感、副交感各自負責的具體功能","會讓人誤以為交感神經是假的","證明交感神經和副交感神經其實是同一個東西"], answer: 1, explanation: "本堂建立的「具體神經線路」概念，是理解下一堂交感神經（油門）與副交感神經（剎車）這兩個具體分支如何運作的基礎。選項C、D都誤解了交感與副交感是自律神經底下兩個不同且真實存在的分支。" }
      ],
    },
    {
      id: "auto-vol1-lesson-4",
      title: "你的身體有兩個開關：油門與剎車",
      duration: 10,
      isFree: false,
      slides: [
      { id: "slide-1", type: "hook", title: "開場情境", content: `過馬路時一輛車突然衝出來，你的瞳孔放大、心跳加速、肌肉充血——身體切換到了戰或逃模式。危險過去後，心跳慢慢恢復，肌肉放鬆，肚子隱隱叫了一聲。前後兩階段分別是交感與副交感神經主導。`, visual: '' },
      { id: "slide-2", type: "deepdive", title: "核心概念一：交感神經是油門", content: `交感神經的任務是動員資源、備戰應對：心跳加速、血壓升高、呼吸加深、瞳孔放大、消化減緩、腎上腺素與皮質醇增加。這個模式的設計目標，是讓你在短時間內表現到極限。`, visual: '' },
      { id: "slide-3", type: "concept", title: "核心概念二：副交感神經是剎車", content: `副交感神經的任務是讓身體休息、消化、修復：心跳減慢、呼吸放緩、消化重新活躍、肌肉放鬆。其中迷走神經特別重要，從腦幹延伸到腸道，連接幾乎所有主要器官，活性越高代表恢復能力越強。`, visual: '' },
      { id: "slide-4", type: "deepdive", title: "常見誤解", content: `很多人以為交感神經「壞的」、副交感神經「好的」，應該讓副交感神經多一點。但其實兩個系統都是必要的，問題不在哪個多，而在兩個是否能靈活切換。`, visual: '' },
      { id: "slide-5", type: "summary", title: "本堂重點", content: `① 兩個系統都是必要的——缺一不可，目標不是消滅交感而是讓兩者都正常運作
② 靈活切換比哪個多更重要——失調核心常是油門踩死或切換不流暢
③ 迷走神經是副交感的重要代表——它的狀態反映身體的恢復能力
下一堂預告：失調不是突然發生的，是怎麼一步一步累積出來的？`, visual: '' }
      ],
      quizzes: [
      { id: "q1", question: "交感神經被啟動時，身體會出現哪種典型反應？", options: ["消化系統重新活躍，肌肉放鬆","瞳孔縮小，呼吸放緩","心跳加速、血壓升高、消化系統減緩","免疫系統相對活躍，能量轉向儲存"], answer: 2, explanation: "交感神經啟動是為了動員資源備戰，會讓心跳加速、血壓升高、消化系統減緩以把資源移走。選項A、B、D描述的都是副交感神經主導時的反應，方向恰好相反。" },
      { id: "q2", question: "迷走神經在自律神經系統中扮演什麼角色？", options: ["它是交感神經最主要的分支","它只負責控制瞳孔大小","它跟身體恢復能力完全無關","它是副交感神經中重要的神經，連接腦幹與幾乎所有主要器官"], answer: 3, explanation: "本堂明確指出迷走神經是副交感神經裡非常重要的神經，從腦幹延伸到腸道，連接大腦和幾乎所有主要器官，其活性反映恢復能力。選項C與本堂強調的「活性越高恢復能力越強」直接矛盾。" },
      { id: "q3", question: "一個人過馬路躲開突然衝出的車子之後，心跳逐漸恢復、肚子開始咕咕叫，這個階段主要是哪個神經系統在主導？", options: ["交感神經持續主導","副交感神經開始接管","兩個系統同時完全停止運作","只有體神經系統在運作"], answer: 1, explanation: "危險過去後心跳恢復、消化系統重新啟動，這正是副交感神經（剎車）接管、讓身體進入修復狀態的典型表現。選項A忽略了情境中危險已經過去這個關鍵轉折點。" },
      { id: "q4", question: "如果一個人長期處在「交感神經一直踩著放不開」的狀態，本堂用什麼比喻來描述這種情況的後果？", options: ["像一台引擎持續高轉速運作，零件磨損更快、耗能更大、修復時間不夠","像一輛完全沒有引擎的車","完全沒有任何後果，身體會自動調節","像一台從來沒啟動過的機器"], answer: 0, explanation: "本堂用「引擎持續高轉速運作」比喻長期交感神經過度活躍的狀態，強調零件磨損、耗能增加、修復時間不足，這正是很多失調症狀的根本來源。選項C忽略了長期高轉速對系統的實際損耗。" },
      { id: "q5", question: "本堂強調「問題不在哪個多，在切換是否靈活」，這跟很多人以為「副交感神經越多越好」的想法有什麼差異？", options: ["兩種說法完全一致，沒有差異","本堂強調的是動態靈活切換的能力,而不是單純追求某一方數值上的提升","副交感神經確實應該無限增加才是健康","交感神經應該被完全消除"], answer: 1, explanation: "本堂明確指出健康的自律神經像熟練的司機，能在需要時靈活切換油門與剎車，而不是單純追求其中一方「越多越好」。選項C、D都誤解了本堂「兩個系統都必要、缺一不可」的核心觀點。" }
      ],
    },
    {
      id: "auto-vol1-lesson-5",
      title: "失調不是一夕之間發生的",
      duration: 10,
      isFree: false,
      slides: [
      { id: "slide-1", type: "hook", title: "開場情境", content: `建宏說不出自己是從什麼時候開始不舒服的。三年前開始睡不好，兩年前開始心悸，一年前腸胃出問題。每次都去看相關科，一切正常。直到最近他才把這些點連起來——這不是突然發生的，是一根一根累積上去的稻草。`, visual: '' },
      { id: "slide-2", type: "deepdive", title: "核心概念一：神經系統的適應性", content: `神經系統會根據環境調整自己的預設模式。長期處在需要高度警覺的環境裡，它會把「警覺」設定為預設值。問題是當環境改變、壓力源消失，神經系統不會自動調回來，高警覺狀態就變成了「新正常」。`, visual: '' },
      { id: "slide-3", type: "concept", title: "核心概念二：三個累積的階段", content: `適應期：偶爾失衡，能自行恢復。代償期：壓力持續，身體開始支出儲備，感覺是「累但還撐得住」。失代償期：儲備耗盡，症狀明顯到無法忽略。很多人在代償期待了很多年，沒意識到問題在累積。`, visual: '' },
      { id: "slide-4", type: "deepdive", title: "常見誤解", content: `很多人以為失調是某件大事之後突然出現的。但其實大多數人的失調是長期、緩慢、一點一點累積出來的，沒有單一一根「壓垮駱駝的稻草」。`, visual: '' },
      { id: "slide-5", type: "summary", title: "本堂重點", content: `① 失調是累積的不是突發的——神經系統在幾個月到幾年間慢慢偏移
② 神經系統的預設值會漂移——長期高壓讓警覺成為新的正常
③ 日常小事疊加是常見來源——睡眠不足、久坐、咖啡因依賴等看似不起眼的因素
下一堂預告：為什麼心悸、頭痛、腸躁這些看起來不相關的症狀，會同時出現在同一個人身上？`, visual: '' }
      ],
      quizzes: [
      { id: "q1", question: "本堂提到的「神經系統適應性」，指的是什麼現象？", options: ["神經系統會根據環境調整自己的預設運作模式","神經系統永遠保持固定不變","神經系統只會在睡覺時改變","適應性只發生在童年時期"], answer: 0, explanation: "神經系統會根據長期所處的環境調整預設模式，例如長期處在高警覺環境會把警覺設為預設值。選項C、D都把適應性侷限在不正確的時間範圍。" },
      { id: "q2", question: "建宏的失調過程最符合本堂提到的哪種模式？", options: ["單一重大事件造成的突發性失調","長期、緩慢、一點一點累積出來的失調","完全沒有徵兆突然出現的疾病","只持續了一週就自然痊癒的短暫失衡"], answer: 1, explanation: "建宏的症狀是三年內陸續出現，從睡眠不好到心悸到腸胃問題，正是本堂強調的長期累積模式，沒有單一的「最後一根稻草」。選項A與情境描述的漸進過程不符。" },
      { id: "q3", question: "「代償期」這個階段最典型的感受是什麼？", options: ["完全沒有任何不適感覺","症狀已經嚴重到完全無法忽略","身體已經完全恢復健康狀態","累但還撐得住，睡不太好但還是可以工作"], answer: 3, explanation: "代償期是身體開始支出儲備但表面仍能維持運作的階段，典型感受是「累但還撐得住」，很多人在這個階段待了很多年而未察覺。選項B描述的是失代償期的特徵。" },
      { id: "q4", question: "如果一個人長期處在高壓環境後，環境壓力源已經消失，但神經系統仍持續處於警覺狀態，本堂如何解釋這個現象？", options: ["這代表他的身體完全沒有受到影響","神經系統的預設值已經漂移，高警覺已成為新的「正常」，不會自動調回原本的平衡點","這只是單純的性格問題","這代表他在說謊，刻意誇大症狀"], answer: 1, explanation: "本堂明確指出神經系統不會在壓力源消失後自動把預設值調回來,特別是高警覺狀態已持續很長時間,會固定下來變成新的預設,這是適應機制在錯誤方向上運作的結果。選項C忽略了背後具體的神經科學機制。" },
      { id: "q5", question: "本堂列出的日常累積來源中，下列哪一項符合本堂的描述？", options: ["只有重大創傷事件才會造成累積效應","只要不喝咖啡，就完全不會有失調風險","即使每天只少睡一個小時，長期累積下來也可能是讓基準線偏移的材料","久坐和數位刺激對神經系統完全沒有影響"], answer: 2, explanation: "本堂明確列出睡眠不足（即使只是每天少一個小時）等日常小事，強調這些事情單獨看不算什麼，但年復一年疊加起來就是讓基準線偏移的材料。選項B、D都與本堂列出的具體累積來源清單矛盾。" }
      ],
    },
    {
      id: "auto-vol1-lesson-6",
      title: "為什麼心悸、頭痛、腸躁會同時出現？",
      duration: 10,
      isFree: false,
      slides: [
      { id: "slide-1", type: "hook", title: "開場情境", content: `美如看了心臟科、神經科、腸胃科，三個科的醫生都說相關器官沒問題。她的問題不在這三個科各自的問題，而在管理所有這些器官的自律神經系統——這是一個問題的三個出口，不是三個獨立的問題。`, visual: '' },
      { id: "slide-2", type: "deepdive", title: "核心概念一：一個系統，多個出口", content: `自律神經管的範圍非常廣，當這套系統的調節出問題，不是只有一個器官會感受到，而是所有連接在這套系統上的器官都可能出現反應，只是每個人的「最弱連結」不一樣，症狀最明顯的地方就不同。`, visual: '' },
      { id: "slide-3", type: "concept", title: "核心概念二：症狀為什麼會串聯出現", content: `心悸發作時人容易焦慮，焦慮讓交感神經更活躍，交感神經更活躍讓腸道更痙攣，同時頭部血管張力上升，頭痛跟著來。這不是巧合，是因為它們都在同一個調節系統底下，一個環節緊繃，整個系統都會連動。`, visual: '' },
      { id: "slide-4", type: "deepdive", title: "常見誤解", content: `很多人以為同時出現多種症狀，代表身體多個地方都出了問題。但其實這些看似不相關的症狀，往往只是同一套系統失衡在不同器官上的表現。`, visual: '' },
      { id: "slide-5", type: "summary", title: "本堂重點", content: `① 多種症狀同一個根源——不代表多個器官生病，而是共同管理者失衡的訊號
② 症狀會連動是因為系統連動——一個症狀加重時其他跟著來
③ 功能性症狀是真實的生理反應——問題在調節層面，不是假的或心理作用
下一堂預告：你的神經系統是怎麼被「訓練」成容易失調的狀態的？`, visual: '' }
      ],
      quizzes: [
      { id: "q1", question: "美如同時有心悸、頭痛、腸躁，但各科檢查都正常，本堂如何解釋這個現象？", options: ["她同時得了三種互不相關的疾病","三個科的醫生都誤診了","這些症狀全部都是心理作用，沒有生理根源","這是同一個自律神經失衡問題的三個不同出口，不是三個獨立的問題"], answer: 3, explanation: "本堂明確用「一個問題的三個出口」來描述這種情況，因為自律神經管理範圍廣，失衡時會在不同器官的「最弱連結」上表現出症狀。選項C與本堂強調「功能性症狀是真實生理反應」的立場矛盾。" },
      { id: "q2", question: "什麼決定了一個人的自律神經失衡會主要表現在哪個器官上？", options: ["完全隨機，沒有任何規律","每個人的「最弱連結」不一樣，症狀最明顯的地方因人而異","一定都是先從心臟開始","取決於看診的醫生是哪一科"], answer: 1, explanation: "本堂指出每個人的最弱連結不同，例如美如的心臟對交感神經活躍特別敏感所以心悸明顯，這是個人化的差異。選項C、D都不是決定症狀表現位置的真正因素。" },
      { id: "q3", question: "為什麼「每次一緊張，所有症狀都一起來」這種現象並非巧合？", options: ["因為這只是心理上的錯覺","因為緊張直接啟動交感神經，而交感神經一啟動，底下所有連接的器官都收到相同指令","因為每個器官各自獨立對緊張做出反應，互不相關","因為這種現象其實非常罕見"], answer: 1, explanation: "本堂解釋這是因為自律神經系統是整體運作的，緊張啟動交感神經後，所有連接的器官會同時收到相同的活化訊號，所以症狀會連動出現。選項C忽略了系統整體連動的核心機制。" },
      { id: "q4", question: "「功能性症狀」這個醫學名詞的正確理解是什麼？", options: ["代表症狀是假的，只是心理作用","代表器官結構正常，但功能的調節出了問題，是真實的生理反應","代表這個人完全沒有任何症狀","代表這種症狀無法用任何方式緩解"], answer: 1, explanation: "本堂特別澄清「功能性」常被誤解為「假的」或「心理的」委婉說法，但其實它指的是問題在調節層面而非結構層面，腸道痙攣、心率變化都是真實的生理反應。選項A正是本堂要糾正的常見誤解。" },
      { id: "q5", question: "理解「多種症狀同一個根源」這個概念，對一個同時有心悸、頭痛、腸躁症狀的人有什麼實際幫助？", options: ["讓他知道自己一定要看更多不同的專科醫生","讓他理解自己面對的不是三種獨立疾病，而是一套系統失衡的不同表現，有助於從根源而非單一症狀來理解問題","讓他覺得症狀無法被理解，只能放棄治療","讓他確定自己的症狀完全是裝出來的"], answer: 1, explanation: "本堂強調理解這個邏輯可以讓讀者不再對「為什麼什麼都一起來」感到困惑，並能從自律神經這個共同根源的角度去理解與應對，而不是分散地處理每個獨立症狀。選項A與本堂想引導讀者建立整體理解框架的方向相反。" }
      ],
    },
    {
      id: "auto-vol1-lesson-7",
      title: "你的神經被訓練成這樣了",
      duration: 10,
      isFree: false,
      slides: [
      { id: "slide-1", type: "hook", title: "開場情境", content: `怡君從小在氣氛緊繃的家庭長大，學會了隨時注意氣氛、保持警覺。長大後環境改變了，但那套「隨時警覺」的神經模式沒有跟著改變，連在家安靜看書時都維持著輕微待命狀態。這不是性格，是神經系統被訓練出來的模式。`, visual: '' },
      { id: "slide-2", type: "deepdive", title: "核心概念一：神經可塑性", content: `「一起放電的神經，會連在一起」——重複做某件事、重複某種感受，相關神經迴路會越來越強化，就像一條小路走的人多了會變成大道。這個特性讓我們能學習適應，但同一個機制也會把長期壓力反應模式固定下來。`, visual: '' },
      { id: "slide-3", type: "concept", title: "核心概念二：三種常見的訓練來源", content: `長期慢性壓力會讓交感神經的啟動門檻越來越低；童年或早期高壓經歷影響特別深刻，因為那是神經系統發育的關鍵期；未被充分消化的壓力事件，會在類似情境下被反覆觸發。`, visual: '' },
      { id: "slide-4", type: "deepdive", title: "常見誤解", content: `很多人以為神經系統是固定的，生下來是什麼樣就是什麼樣。但其實神經系統具有高度的可塑性，會根據長期的生活模式重新調整自己的連線方式。`, visual: '' },
      { id: "slide-5", type: "summary", title: "本堂重點", content: `① 神經系統會被訓練——長期重複的壓力反應讓高警覺成為預設模式
② 早期經歷影響特別深——童年是神經系統發育的關鍵期
③ 被訓練出來的，可以被重新訓練——神經可塑性是雙向的，失調不是終點
下一堂預告：現代生活在結構上，為什麼天生就容易製造自律神經失調？`, visual: '' }
      ],
      quizzes: [
      { id: "q1", question: "「神經可塑性」這個概念主要指的是什麼？", options: ["神經系統完全無法改變","神經系統可以根據重複的刺激和經驗，改變自己的連線結構","只有童年時期神經系統才具有可塑性","神經可塑性只會帶來負面的改變"], answer: 1, explanation: "本堂明確定義神經可塑性是神經系統根據重複經驗改變連線結構的能力，這個機制是雙向的，既能形成失調模式也能往平衡方向調整。選項D只強調負面，忽略了本堂強調的雙向特性。" },
      { id: "q2", question: "怡君長大後在安靜環境裡仍維持輕微警覺狀態，最符合本堂哪個解釋？", options: ["她天生性格就是容易緊張","她童年高壓環境訓練出的警覺神經模式，沒有隨環境改變而自動調整","這完全是她故意裝出來的反應","跟她的成長環境完全沒有關係"], answer: 1, explanation: "本堂明確指出這不是性格，是神經系統被訓練出來的模式，童年的高壓環境讓警覺模式被固定下來，即使後來環境改變，這套模式也不會自動跟著調整。選項A把神經科學現象誤歸為天生性格。" },
      { id: "q3", question: "為什麼童年或早期的高壓經歷對神經系統的影響特別深刻？", options: ["因為童年時期完全不會感受到壓力","因為那是神經系統發育的關鍵期，早期形成的高警覺模式會成為之後的底層預設","因為童年經歷會在十八歲後自動消失","童年經歷其實對神經系統沒有任何特殊影響"], answer: 1, explanation: "本堂指出童年是神經系統發育的關鍵期，這個階段形成的高警覺模式會成為之後神經系統的底層預設，影響特別深刻。選項C與「底層預設」會持續存在的描述矛盾。" },
      { id: "q4", question: "「未被充分消化的壓力事件」這個訓練來源，具體指的是什麼情況？", options: ["壓力事件發生後立刻被完全遺忘，沒有任何後續影響","壓力事件後身體和神經系統沒有機會真正修復重整，事件的神經印記留下來，在類似情境下被反覆觸發","只有非常重大的事件才算數，日常小事完全不會有這種效應","這種情況只會發生在成年人身上"], answer: 1, explanation: "本堂明確說明這指的是壓力事件後缺乏真正修復重整的機會，導致神經印記留下並在類似情境中被反覆觸發。選項A與這個概念強調「印記留下來」的核心意涵相反。" },
      { id: "q5", question: "本堂強調「被訓練出來的，可以被重新訓練」，這對理解失調的可逆性有什麼重要意義？", options: ["代表失調完全無法被治療或改善","代表既然神經可塑性是雙向的,失調模式也有機會透過理解機制、有意識地介入而往平衡方向調整","代表只需要正向思考就能立刻解決所有問題","代表早期經歷造成的影響永遠無法被改變"], answer: 1, explanation: "本堂明確指出神經可塑性是雙向的,可以往失調方向走也可以往平衡方向走,理解這件事意味著失調不是終點,後面幾冊就是在探討具體可以介入的方向。選項C把這個過程過度簡化為單純的正向思考,與本堂強調「有具體方向可以介入」的說法不符。" }
      ],
    },
    {
      id: "auto-vol1-lesson-8",
      title: "現代生活天生製造失調",
      duration: 10,
      isFree: false,
      slides: [
      { id: "slide-1", type: "hook", title: "開場情境", content: `你的神經系統是幾百萬年演化的產物，設計來應對偶爾出現的威脅，以及大量的休息恢復時間。現代生活給你的是持續的低等級威脅，加上幾乎沒有真正的關機時間。這不是你的問題，是一個錯誤配對。`, visual: '' },
      { id: "slide-2", type: "deepdive", title: "核心概念一：五個現代生活的神經系統壓力源", content: `全天候資訊轟炸讓杏仁核無法分辨真實危險與新聞危險；人工光源延遲副交感神經啟動；久坐讓動員起來的應激能量無處消耗；社交比較啟動類似生存威脅的反應；永遠在線的工作文化讓副交感神經永遠沒機會完全接管。`, visual: '' },
      { id: "slide-3", type: "concept", title: "核心概念二：演化設計與現代環境的不匹配", content: `人類神經系統設計來應對間歇性威脅與大量恢復時間。現代生活提供的是持續性威脅與極少真正關機的時間。這個結構性的錯誤配對，是失調的基礎，不是個人不夠堅強造成的。`, visual: '' },
      { id: "slide-4", type: "deepdive", title: "常見誤解", content: `很多人以為失調是個人問題，是自己不夠強壯或不夠努力管理壓力。但其實現代生活的很多結構性設計，幾乎是專門針對自律神經的弱點設計的。`, visual: '' },
      { id: "slide-5", type: "summary", title: "本堂重點", content: `① 現代生活的結構性問題——資訊轟炸、人工光源、久坐、社交比較、永遠在線都是持續壓力源
② 神經系統設計與現代環境的錯誤配對——這個不匹配是失調的結構性基礎
③ 理解讓你停止自責，也才能開始有效應對——知道壓力源結構才能做有意識的選擇
下一堂預告：失調和「生病」的邊界在哪裡，什麼時候應該認真對待，什麼時候不需要恐慌？`, visual: '' }
      ],
      quizzes: [
      { id: "q1", question: "本堂用什麼詞來描述神經系統設計與現代生活環境之間的關係？", options: ["完美匹配（perfect match）","錯誤配對（mismatch）","完全無關（unrelated）","雙向適應（mutual adaptation）"], answer: 1, explanation: "本堂明確使用「mismatch」這個詞，說明人類神經系統演化設計的環境與現代生活實際提供的環境之間存在結構性的不匹配。選項A與本堂的核心論點完全相反。" },
      { id: "q2", question: "為什麼社群媒體上的比較會啟動類似生存威脅的神經反應？", options: ["因為社群媒體會直接影響視力","因為人類是社會性動物，社會地位的威脅會啟動和生存威脅類似的壓力反應","因為社群媒體完全不會被大腦處理","因為這只發生在特定年齡層身上"], answer: 1, explanation: "本堂指出人類是社會性動物，社會地位威脅會啟動類似生存威脅的神經反應，這也是社群媒體比較容易讓人產生身份焦慮的原因。選項C忽略了大腦會真實處理社交比較這類訊號的事實。" },
      { id: "q3", question: "人工光源（特別是手機與電腦藍光）對自律神經系統的影響是什麼？", options: ["完全沒有任何影響","模擬白天光線訊號，讓神經系統誤以為還需要保持清醒警覺，延遲副交感神經啟動","會直接讓副交感神經立刻啟動","只會影響視力，跟神經系統節律無關"], answer: 1, explanation: "本堂指出人工光源模擬白天光線，干擾自律神經配合日夜光線切換備戰與修復模式的節律功能，延遲副交感神經啟動。選項C與「延遲」這個方向相反。" },
      { id: "q4", question: "「永遠在線」的工作文化如何持續影響副交感神經的運作？", options: ["它會讓副交感神經提早啟動","界線模糊的工作時間讓神經系統永遠無法確認「現在安全可以放鬆」，導致副交感神經沒有機會完全接管","它對副交感神經完全沒有任何影響","它只會影響交感神經，跟副交感神經無關"], answer: 1, explanation: "本堂強調關機放鬆需要一個明確訊號：任務結束、下一個挑戰還沒來。當這個訊號永遠不出現，副交感神經就永遠沒有機會完全接管，這正是永遠在線文化的核心問題。選項A方向相反。" },
      { id: "q5", question: "理解現代生活的結構性壓力源，對一個長期自責「我是不是不夠堅強」的人有什麼幫助？", options: ["會讓他更加自責，覺得自己連適應現代生活都做不到","可以讓他停止把失調全部怪到自己身上，理解自己是在一個對神經系統不友善的環境裡長期努力維持運作","會讓他覺得應該完全放棄現代生活方式","對心理狀態完全沒有任何幫助"], answer: 1, explanation: "本堂明確指出，理解這些結構性壓力源的存在，能讓人停止把失調全部怪到自己身上，並在這個理解基礎上做有意識的選擇。選項C與本堂「不是要你放棄現代生活」的明確說法相反。" }
      ],
    },
    {
      id: "auto-vol1-lesson-9",
      title: "失調不等於生病，但也不能忽視",
      duration: 10,
      isFree: false,
      slides: [
      { id: "slide-1", type: "hook", title: "開場情境", content: `志遠查了自律神經失調資料後陷入焦慮，越看越慌，睡眠反而變得更差。他太太說：「你知道嗎，焦慮自己的自律神經，本身就在讓你的自律神經更失調。」她說得很對。`, visual: '' },
      { id: "slide-2", type: "deepdive", title: "核心概念一：失調是連續的光譜", content: `自律神經狀態不是「正常/失調」的二選一,而是光譜。一端是偶爾、輕微、可自行恢復的失衡；另一端是長期、嚴重、已開始影響器官功能的失衡。大多數人處在光譜中間,且狀態是會移動的。`, visual: '' },
      { id: "slide-3", type: "concept", title: "核心概念二：恐慌是助燃劑", content: `把失調等同嚴重疾病，讓自己劇烈恐慌，這個恐慌本身是失調最強力的觸發器之一。心悸時擔心心臟病，擔心讓交感神經更活躍，心跳更快讓人更確定一定有問題——這是常見的惡性循環。理解機制是打破循環的第一步。`, visual: '' },
      { id: "slide-4", type: "deepdive", title: "常見誤解", content: `很多人聽到「失調」，要麼覺得那就是沒事，要麼開始過度擔心會不會變成大病。但其實正確的態度是認真對待、不需恐慌，這取決於持續時間和身體的累積狀態。`, visual: '' },
      { id: "slide-5", type: "summary", title: "本堂重點", content: `① 失調是光譜不是開關——持續三個月以上、影響生活的情況值得認真對待
② 恐慌是失調的助燃劑——對症狀的恐慌會啟動交感神經讓症狀更嚴重
③ 「理解」是療癒的一部分——把無法控制的恐怖轉化成可以理解的信號
下一堂預告：這套書的地圖——接下來你會學到什麼，怎麼用這些知識真正幫到自己。`, visual: '' }
      ],
      quizzes: [
      { id: "q1", question: "本堂如何描述自律神經的狀態結構？", options: ["只有「正常」和「失調」兩種固定狀態，沒有中間地帶","一個連續的光譜，狀態會隨情況在輕重之間移動","一旦失調就永遠無法恢復到輕微狀態","只有醫生才能判斷一個人在光譜上的哪個位置"], answer: 1, explanation: "本堂明確指出自律神經狀態是連續光譜，不是二選一，狀態會移動——好的時候往輕的方向移，累積太多時往重的方向移。選項C忽略了狀態的雙向移動性。" },
      { id: "q2", question: "志遠在查資料後越來越焦慮，睡眠反而變差，這個過程最符合本堂提到的哪個機制？", options: ["查資料完全不會影響身體狀態","恐慌本身會啟動交感神經，成為失調的助燃劑，形成惡性循環","這證明他的失調已經發展成嚴重疾病","這跟自律神經系統完全無關，純粹是運氣不好"], answer: 1, explanation: "志遠的太太一語道破：焦慮自己的自律神經，本身就在讓自律神經更失調，這正是本堂強調的恐慌-加重惡性循環的真實案例。選項C過度推論了單一焦慮反應的嚴重程度。" },
      { id: "q3", question: "根據本堂，下列哪一種情況「建議不要只是觀望」，應該認真對待？", options: ["加班幾天後偶爾一兩天睡不好，過幾天就恢復","症狀已持續超過三個月，且影響到正常工作、睡眠、日常生活的能力","考試前一天腸胃稍微不適","生病後暫時心跳加快一兩天"], answer: 1, explanation: "本堂明確列出「症狀持續超過三個月沒有明顯改善」「影響到正常生活能力」等情況屬於值得認真對待的範圍。選項A、C、D描述的都是本堂歸類為正常、可自行恢復的暫時性失衡。" },
      { id: "q4", question: "「心悸時擔心心臟病，導致心跳更快」這個惡性循環，本堂指出打破它的第一步是什麼？", options: ["完全忽略心悸症狀，假裝沒有發生","理解症狀的機制，知道心悸是自律神經調節問題、心臟結構是好的，從而降低恐慌程度","立刻服用大量藥物來壓制症狀","避免去任何可能引發心悸的場合"], answer: 1, explanation: "本堂明確指出理解症狀機制是打破這個循環的第一步，當知道心臟結構沒問題，恐慌程度會下降，而恐慌程度下降本身就讓症狀更容易平息。選項A與本堂「正確態度是認真對待不是忽視」的立場矛盾。" },
      { id: "q5", question: "本堂結尾提到「理解本身就是一種療癒」，這跟「恐慌是助燃劑」這兩個概念之間有什麼邏輯關係？", options: ["兩者完全沒有關聯，是獨立的兩個論點","理解機制能降低恐慌，而降低恐慌本身會讓交感神經活化程度下降，這正是理解產生療癒效果的具體路徑","理解只是一種安慰劑效應，沒有實際的神經科學基礎","恐慌反而是理解的必要前提"], answer: 1, explanation: "本堂建立的邏輯鏈是：理解機制→降低恐慌→降低交感神經活化→症狀更容易平息，這正是「理解是療癒的一部分」這句話背後具體的神經科學路徑。選項C忽略了本堂強調這是「真實的神經機制」而非單純安慰劑效應。" }
      ],
    },
    {
      id: "auto-vol1-lesson-10",
      title: "讀懂自己的身體：這套書的地圖",
      duration: 10,
      isFree: false,
      slides: [
      { id: "slide-1", type: "hook", title: "開場情境", content: `走完入口冊最重要的部分，你已經知道「檢查正常」不等於「沒有問題」、自律神經是什麼、交感與副交感怎麼運作、失調怎麼累積、症狀為何同時出現、神經系統是被訓練也能被改變。這些不是獨立知識點，是一張地圖的不同部分。`, visual: '' },
      { id: "slide-2", type: "deepdive", title: "核心概念一：七冊架構地圖", content: `Vol.01是入口，給整體框架。Vol.02、03是機制（壓力科學、睡眠科學）。Vol.04是症狀解碼。Vol.05是後果說明。Vol.06、07是來源分析（外部環境、人際關係）。每一冊負責地圖上的一個區域，組合起來才是完整理解。`, visual: '' },
      { id: "slide-3", type: "concept", title: "核心概念二：知識的用法不是焦慮的燃料", content: `這套書有很多關於「壞事」的描述，是為了讓你理解，不是為了讓你更焦慮。如果越看越緊張，建議放慢節奏，一次一冊。理解是要讓你對自己的身體更有掌握感，不是要你對每個症狀都戒慎恐懼。`, visual: '' },
      { id: "slide-4", type: "deepdive", title: "常見誤解", content: `很多人看了很多健康資訊，但沒有一個連貫的架構，資訊在腦袋裡是散的，不知道怎麼用。但其實理解自律神經需要的不是更多資訊，而是一張把這些資訊連起來的地圖。`, visual: '' },
      { id: "slide-5", type: "summary", title: "本堂重點", content: `① 七冊是一張完整的地圖——入口→機制→症狀→後果→來源，組合起來才是完整理解
② 知識要用來理解不要用來焦慮——閱讀目的是建立掌握感不是增加恐慌
③ 理解本身就是療癒的一部分——感到理解和安全會降低杏仁核與交感神經的活化程度
下一堂預告：Vol.02《壓力的科學》會深入解釋皮質醇與HPA軸，帶你看懂壓力在身體裡的生理路徑。`, visual: '' }
      ],
      quizzes: [
      { id: "q1", question: "在七冊架構地圖中，Vol.01本冊負責的角色是什麼？", options: ["症狀解碼","入口——給整體框架，讓讀者先看懂大局","後果說明","人際來源分析"], answer: 1, explanation: "本堂明確指出Vol.01是入口冊，目的是給讀者一個整體框架。選項A是Vol.04的角色，選項C是Vol.05的角色，選項D是Vol.07的角色。" },
      { id: "q2", question: "Vol.02和Vol.03在七冊架構中被歸類為什麼角色？", options: ["症狀解碼","機制——分別解釋壓力與睡眠在身體裡的生理路徑","外部來源分析","人際來源分析"], answer: 1, explanation: "本堂明確指出Vol.02《壓力的科學》和Vol.03《睡眠的科學》是「機制之一」與「機制之二」，分別深入解釋壓力與睡眠的生理路徑。選項C是Vol.06的角色，選項D是Vol.07的角色。" },
      { id: "q3", question: "本堂提到「如果閱讀過程中越看越緊張」，建議的做法是什麼？", options: ["立刻停止閱讀，永遠不再接觸這個主題","放慢節奏，一次一冊，不需要在一週內看完全套","加快閱讀速度盡快看完全部內容","完全忽略自己的緊張感繼續硬看下去"], answer: 1, explanation: "本堂明確建議放慢節奏、一次一冊，因為閱讀目的是建立掌握感而非增加焦慮。選項C與本堂強調的「不是要讓你更焦慮」的立場相反。" },
      { id: "q4", question: "本堂提到「感到理解和安全，在神經科學上會降低杏仁核和交感神經的活化程度」，這句話的意義是什麼？", options: ["這只是一種比喻，沒有實際科學根據","這是真實的神經機制，理解和安全感本身就會對身體的生理狀態產生直接影響，不只是知識上的收穫","杏仁核和交感神經其實毫無關聯","只有透過藥物才能降低杏仁核活化"], answer: 1, explanation: "本堂特別強調「這不是積極思考，這是神經機制」，理解和安全感的轉變是真實的神經科學現象，會直接影響杏仁核與交感神經的活化程度。選項A否定了本堂明確強調的科學根據。" },
      { id: "q5", question: "整合前九堂的內容，本堂提出的核心訊息「理解是療癒的一部分」具體如何運作？", options: ["只要閱讀這套書就能立刻治癒所有身體症狀","知識能改變你和症狀的關係，從恐懼不知所措，轉變為理解、可以辨認、知道方向在哪裡，這個關係轉變本身具有真實的神經科學效應","理解完全不會帶來任何實質改變，只是安慰自己","只有專業醫療人員的理解才有療癒效果，讀者自己的理解沒有用"], answer: 1, explanation: "本堂明確指出知識本身不會改變神經系統狀態，但知識可以改變你和症狀的關係，這個關係轉變是真實的神經科學，會降低杏仁核活化和交感神經底線。選項A過度誇大了單純閱讀的效果，與本堂強調的機制路徑不符。" }
      ],
    }
    ],
  },
  {
    vol: "02",
    title: "自律神經Vol.02：壓力的身體科學",
    subtitle: "皮質醇、HPA軸與你身體裡的慢性戰爭",
    emoji: "🧪",
    cta: { text: "前往小舖購買 Vol.02 完整版（共10堂）", url: ST_BASE + '/6a3fd2f28dfebf4148dea24f', seriesNote: "自律神經學系 7冊・從了解到改變" },
    lessons: [
      {
      id: "autonomic-preview-lesson-2",
      title: "壓力不只是心理的事",
      duration: 15,
      isFree: true,
      slides: [
      { id: "slide-1", type: "hook", title: "「想開點」為什麼沒有用？", content: `阿明最近工作出了問題，截止日期一個接一個。他跟自己說「想開點就好」，但身體不這麼認為。

每天早上起床，肩膀就像昨晚沒睡過一樣緊。吃飯的時候沒什麼食慾，但下午三點會突然很想吃甜的。晚上躺在床上，腦袋卻一直轉，怎麼都關不掉。

他不知道的是：這些不是「想太多」，是壓力在他身體裡跑了完整的一套程序。`, visual: `<svg viewBox="0 0 600 280" xmlns="http://www.w3.org/2000/svg"><rect width="600" height="280" fill="#0f172a" rx="12"/><text x="300" y="40" text-anchor="middle" fill="#e2e8f0" font-size="15" font-weight="bold" font-family="sans-serif">壓力啟動時，身體在同時做這些事</text><g transform="translate(40,60)"><rect x="0" y="0" width="155" height="54" rx="8" fill="#1e293b" stroke="#ef4444" stroke-width="1"/><text x="77" y="22" text-anchor="middle" fill="#fca5a5" font-size="12" font-family="sans-serif">❤️ 心跳加速</text><text x="77" y="40" text-anchor="middle" fill="#94a3b8" font-size="11" font-family="sans-serif">血液快速送到肌肉</text></g><g transform="translate(215,60)"><rect x="0" y="0" width="155" height="54" rx="8" fill="#1e293b" stroke="#f59e0b" stroke-width="1"/><text x="77" y="22" text-anchor="middle" fill="#fcd34d" font-size="12" font-family="sans-serif">🫁 呼吸變淺變快</text><text x="77" y="40" text-anchor="middle" fill="#94a3b8" font-size="11" font-family="sans-serif">攝入更多氧氣</text></g><g transform="translate(390,60)"><rect x="0" y="0" width="170" height="54" rx="8" fill="#1e293b" stroke="#6366f1" stroke-width="1"/><text x="85" y="22" text-anchor="middle" fill="#c7d2fe" font-size="12" font-family="sans-serif">🧠 大腦高度警覺</text><text x="85" y="40" text-anchor="middle" fill="#94a3b8" font-size="11" font-family="sans-serif">注意力收窄到威脅</text></g><g transform="translate(40,130)"><rect x="0" y="0" width="155" height="54" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="1"/><text x="77" y="22" text-anchor="middle" fill="#6ee7b7" font-size="12" font-family="sans-serif">🍬 肝臟釋放血糖</text><text x="77" y="40" text-anchor="middle" fill="#94a3b8" font-size="11" font-family="sans-serif">提供即時能量</text></g><g transform="translate(215,130)"><rect x="0" y="0" width="155" height="54" rx="8" fill="#1e293b" stroke="#8b5cf6" stroke-width="1"/><text x="77" y="22" text-anchor="middle" fill="#c4b5fd" font-size="12" font-family="sans-serif">🫃 消化系統暫停</text><text x="77" y="40" text-anchor="middle" fill="#94a3b8" font-size="11" font-family="sans-serif">資源留給應急用途</text></g><g transform="translate(390,130)"><rect x="0" y="0" width="170" height="54" rx="8" fill="#1e293b" stroke="#06b6d4" stroke-width="1"/><text x="85" y="22" text-anchor="middle" fill="#67e8f9" font-size="12" font-family="sans-serif">🛡️ 免疫系統上調</text><text x="85" y="40" text-anchor="middle" fill="#94a3b8" font-size="11" font-family="sans-serif">準備應對受傷</text></g><text x="300" y="225" text-anchor="middle" fill="#f59e0b" font-size="13" font-family="sans-serif">短期：聰明的生存機制　　長期：每個環節都出問題</text></svg>` },
      { id: "slide-2", type: "concept", title: "壓力是演化給你的生存工具", content: `人類的祖先生活在危險的環境裡，隨時可能遇到掠食者。為了活下去，身體演化出「戰或逃反應」——當危險出現，大腦在幾秒內啟動全身，讓你要嘛跑、要嘛打。

問題是，現代人的威脅不是老虎，是 email、是老闆、是貸款、是下週的報告。

這些威脅不會在三分鐘內結束，可能持續幾個月甚至幾年。而你的身體，還在用對付老虎的那套程序應對這些事。

🐱 魯魯：我每次看到鄰居的狗都全身緊繃。大姐說我是在用對付老虎的程序應對一隻柴犬。但我控制不了——因為這是我的神經在運作，不是我的「想法」。`, visual: `<svg viewBox="0 0 600 260" xmlns="http://www.w3.org/2000/svg"><rect width="600" height="260" fill="#0f172a" rx="12"/><rect x="40" y="40" width="230" height="150" rx="10" fill="#1e293b" stroke="#6366f1" stroke-width="1.5"/><text x="155" y="68" text-anchor="middle" fill="#a5b4fc" font-size="13" font-weight="bold" font-family="sans-serif">原始威脅</text><text x="155" y="95" text-anchor="middle" fill="#e2e8f0" font-size="22" font-family="sans-serif">🐯 老虎</text><text x="155" y="125" text-anchor="middle" fill="#94a3b8" font-size="12" font-family="sans-serif">明確、即時、短暫</text><text x="155" y="148" text-anchor="middle" fill="#6ee7b7" font-size="12" font-family="sans-serif">✅ 跑掉就解除</text><rect x="330" y="40" width="230" height="150" rx="10" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/><text x="445" y="68" text-anchor="middle" fill="#fcd34d" font-size="13" font-weight="bold" font-family="sans-serif">現代威脅</text><text x="445" y="92" text-anchor="middle" fill="#e2e8f0" font-size="13" font-family="sans-serif">📧 Email / 老闆 / 貸款</text><text x="445" y="115" text-anchor="middle" fill="#94a3b8" font-size="12" font-family="sans-serif">模糊、持續、難結束</text><text x="445" y="138" text-anchor="middle" fill="#f87171" font-size="12" font-family="sans-serif">⚠️ 幾個月都不解除</text><text x="295" y="115" text-anchor="middle" fill="#475569" font-size="20" font-family="sans-serif">→</text><text x="300" y="215" text-anchor="middle" fill="#94a3b8" font-size="12" font-family="sans-serif">身體用同一套程序應對，但現代威脅沒有終點</text></svg>` },
      { id: "slide-3", type: "deepdive", title: "壓力不會只停在感覺層面", content: `很多人把壓力當成「情緒問題」，覺得只要「心態好」就能解決。

但壓力是生理事件。它有明確的激素、神經傳導物質、器官反應。

你感覺到「焦慮」「緊繃」「睡不好」，是這些生理反應的結果，不是原因。

理解這一點很重要——要真正解決壓力的問題，光靠「想開點」是不夠的。你需要理解身體在做什麼，才能知道要從哪裡介入。`, visual: `<svg viewBox="0 0 600 240" xmlns="http://www.w3.org/2000/svg"><rect width="600" height="240" fill="#0f172a" rx="12"/><text x="300" y="38" text-anchor="middle" fill="#e2e8f0" font-size="14" font-weight="bold" font-family="sans-serif">壓力的本質：不只是心情</text><rect x="60" y="55" width="480" height="50" rx="8" fill="#1e293b" stroke="#ef4444" stroke-width="1"/><text x="300" y="76" text-anchor="middle" fill="#fca5a5" font-size="13" font-family="sans-serif">❌ 舊觀念：壓力 = 心情不好，想開點就好</text><text x="300" y="95" text-anchor="middle" fill="#64748b" font-size="11" font-family="sans-serif">→ 努力調整心態，但身體的反應依然繼續</text><rect x="60" y="120" width="480" height="50" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="1"/><text x="300" y="141" text-anchor="middle" fill="#6ee7b7" font-size="13" font-family="sans-serif">✅ 新認識：壓力 = 生理事件，有激素、有器官反應</text><text x="300" y="160" text-anchor="middle" fill="#94a3b8" font-size="11" font-family="sans-serif">→ 理解機制，才能找到真正有效的介入點</text><rect x="60" y="185" width="480" height="35" rx="8" fill="#312e81"/><text x="300" y="207" text-anchor="middle" fill="#a5b4fc" font-size="12" font-family="sans-serif">🐱 魯魯：你不能「想」掉皮質醇，但你可以理解它、然後讓它慢下來</text></svg>` },
      { id: "slide-4", type: "summary", title: "本堂重點", content: `📝 三件事，帶走就夠了：

① 壓力是生理反應，不只是心理狀態
理解這一點，才能停止用「想開點」來解決一個身體問題。

② 戰或逃反應是短期工具
它應對老虎非常有效，但應對現代慢性壓力會讓身體持續處於備戰狀態，造成系統性損傷。

③ 壓力啟動時，全身系統都在參與
心跳、呼吸、消化、免疫全都受影響，身體的「不舒服」不是你想像出來的。`, visual: `<svg viewBox="0 0 600 200" xmlns="http://www.w3.org/2000/svg"><rect width="600" height="200" fill="#0f172a" rx="12"/><text x="300" y="35" text-anchor="middle" fill="#e2e8f0" font-size="15" font-weight="bold" font-family="sans-serif">壓力的科學：三個核心認識</text><g transform="translate(50,55)"><rect x="0" y="0" width="500" height="38" rx="6" fill="#1e293b" stroke="#6366f1" stroke-width="1"/><text x="18" y="24" fill="#6366f1" font-size="16" font-family="sans-serif">①</text><text x="45" y="24" fill="#e2e8f0" font-size="13" font-family="sans-serif">壓力是生理事件，不只是情緒</text></g><g transform="translate(50,103)"><rect x="0" y="0" width="500" height="38" rx="6" fill="#1e293b" stroke="#6366f1" stroke-width="1"/><text x="18" y="24" fill="#6366f1" font-size="16" font-family="sans-serif">②</text><text x="45" y="24" fill="#e2e8f0" font-size="13" font-family="sans-serif">演化工具遇上慢性壓力，身體付出代價</text></g><g transform="translate(50,151)"><rect x="0" y="0" width="500" height="38" rx="6" fill="#1e293b" stroke="#6366f1" stroke-width="1"/><text x="18" y="24" fill="#6366f1" font-size="16" font-family="sans-serif">③</text><text x="45" y="24" fill="#e2e8f0" font-size="13" font-family="sans-serif">全身系統都受影響——不只是「累」</text></g></svg>` }
      ],
      quizzes: [
      { id: "q1", question: "現代人的壓力跟原始人遇到老虎的壓力，最大的差異是什麼？", options: ["現代壓力比較小，不需要那麼緊張","現代壓力沒有明確的結束點，神經系統難以解除","現代人的神經系統已經進化，不會有壓力反應","老虎的壓力是心理的，現代壓力才是生理的"], answer: 1, explanation: "身體的壓力系統設計給「應付完就解除」的短暫威脅。但 email、工作、財務壓力很少有明確終點，身體因此長期停在備戰狀態——這才是慢性壓力傷身的核心原因。" },
      { id: "q2", question: "你感覺焦慮、緊繃、睡不好，這些感受在壓力的生理過程中是什麼？", options: ["壓力的原因，是心態出了問題","只是想像，沒有實際的生理基礎","生理反應的結果，有激素和神經活動作為根源","跟生理機制無關，純粹是性格問題"], answer: 2, explanation: "焦慮、緊繃、失眠是壓力的生理反應造成的結果，不是原因。皮質醇升高、交感神經活化、消化系統抑制——這些都是真實的生理事件，不是「想太多」。" }
      ],
    },
    {
      id: "auto-vol2-lesson-2",
      title: "皮質醇：你身體裡的警報激素",
      duration: 12,
      isFree: false,
      slides: [
      { id: "slide-1", type: "hook", title: "為什麼她六點就醒來、晚上睡不著", content: `小美每天早上六點自動醒來，醒來就焦慮；下午四點反而效率最好；晚上十點卻精神亢奮，完全沒有睡意。她以為是睡眠問題，其實是皮質醇的節律出了問題。你的睡眠節律，和這個激素的關係比你想像的深。`, visual: '' },
      { id: "slide-2", type: "deepdive", title: "皮質醇的正常工作", content: `皮質醇是腎上腺分泌的類固醇激素，正常情況下有自己的日夜節律：早上醒來後30-45分鐘達到峰值，讓你有動力起床、有精神面對一天；接著逐漸下降，晚上達到最低點讓你能放鬆入睡。這個節律叫做「皮質醇覺醒反應」（CAR），是你身體自然的啟動儀式。`, visual: '' },
      { id: "slide-3", type: "concept", title: "壓力狀態下皮質醇怎麼失調", content: `慢性壓力下，皮質醇的分泌不再遵循正常的日夜節律，可能出現：早上峰值過高（一起床就焦慮心跳加速）、全天持續偏高（一直緊繃沒有放鬆時刻）、節律顛倒（早上低晚上高，睡前反而亢奮），或者長期高壓後崩潰（皮質醇反而異常偏低，什麼動力都沒有）。小美的狀況，就是節律顛倒。`, visual: '' },
      { id: "slide-4", type: "deepdive", title: "常見誤解：皮質醇越低越好", content: `很多人在網路上看到「降低皮質醇」的方法，以為皮質醇越低越好。這是錯的。皮質醇太低也有問題：慢性疲勞、低血壓、對壓力的應對能力大幅下降。真正的目標不是「降低皮質醇」，而是「讓皮質醇回到正確的節律」：早上高、晚上低，遇到壓力時適時升起、壓力解除後確實下降。`, visual: '' },
      { id: "slide-5", type: "summary", title: "本堂重點", content: `① 皮質醇有正常的日夜節律——早高晚低，是身體的自然啟動機制；理解這個節律才能判斷自己的狀態是否正常。
② 慢性壓力打亂皮質醇節律——不一定是「一直高」，可能是時間錯位或節律顛倒，這是睡眠問題和長期疲勞的核心原因之一。
③ 目標是節律，不是數字——恢復正常的起伏規律才是身體真正需要的。
下一堂，我們要認識指揮皮質醇的大腦系統：HPA 軸。`, visual: '' }
      ],
      quizzes: [
      { id: "q1", question: "正常情況下，皮質醇在一天中什麼時候達到最高峰？", options: ["深夜十二點","下午三點","早上醒來後30-45分鐘","用餐後一小時"], answer: 2, explanation: "正常的皮質醇節律是「早高晚低」：早上醒來後30-45分鐘達到峰值（稱為皮質醇覺醒反應，CAR），讓人有精神和動力開始一天，然後逐漸下降，到晚上達到最低點幫助入睡。深夜或下午都不是正常的峰值時間。" },
      { id: "q2", question: "皮質醇在壓力當下的短期作用包括哪些？", options: ["提升血糖、強化記憶編碼、調動免疫準備","降低心跳、促進消化、放鬆肌肉","抑制血糖、加速生長、降低警覺","減少腎上腺素、讓身體進入休眠模式"], answer: 0, explanation: "短期壓力下，皮質醇負責提升血糖供應能量、抑制非必要功能（如消化和生長）讓資源集中應急、以及強化大腦對危險事件的記憶編碼。降低心跳、放鬆肌肉是副交感神經（剎車）的功能，和壓力反應相反。" },
      { id: "q3", question: "阿偉最近工作壓力大，睡前精神亢奮，早上卻感覺沒有動力起床。這最可能是皮質醇的哪種失調模式？", options: ["皮質醇全天持續偏低","皮質醇節律顛倒，早低晚高","皮質醇整體偏高但節律正常","腎上腺已完全停止分泌皮質醇"], answer: 1, explanation: "「早上低沒動力、晚上亢奮睡不著」是皮質醇節律顛倒的典型表現——原本應該早上高、晚上低的節律，被反過來了。這是慢性壓力下常見的失調模式之一，不是腎上腺停止分泌（那會導致嚴重疾病），也不是全天偏高（全天偏高通常是一直緊繃）。" },
      { id: "q4", question: "長期皮質醇偏高對身體的影響，下列哪一項描述正確？", options: ["促進睡眠，讓修復更完整","增加免疫系統整體活性，不容易生病","影響海馬迴健康，可能導致記性變差","讓腹部脂肪減少，代謝加快"], answer: 2, explanation: "長期高皮質醇會影響海馬迴（記憶和情緒調節的大腦區域）的細胞健康，這是慢性壓力導致記性變差和情緒不穩定的生理根源之一。長期高皮質醇反而會干擾睡眠、長期抑制免疫、增加腹部脂肪堆積，和這些選項描述的相反。" },
      { id: "q5", question: "「恢復皮質醇節律」和「降低皮質醇」的差別，最關鍵的理解是什麼？", options: ["兩者沒有差別，皮質醇都是越低越好","皮質醇太低也有問題，目標是讓它在對的時間出現和消失","皮質醇只要穩定在一個數值，高低不重要","只有早上的峰值重要，其他時間的皮質醇無關緊要"], answer: 1, explanation: "皮質醇太低會導致慢性疲勞、低血壓和應對壓力的能力大幅下降。身體需要的是「節律」——早高晚低，壓力來時升起、壓力解除後確實下降。這個節律的恢復，正是 HPA 軸這個指揮系統的工作，也是下一堂要深入的主題。" }
      ],
    },
    {
      id: "auto-vol2-lesson-3",
      title: "HPA軸：大腦如何命令身體進入備戰狀態",
      duration: 12,
      isFree: false,
      slides: [
      { id: "slide-1", type: "hook", title: "火警警報怎麼運作的？", content: `想像一棟大樓的火災警報系統：煙霧偵測器偵測到煙，送信號到控制室，控制室再下令啟動灑水系統。你身體裡的壓力反應也是這樣層層指揮的。這條指揮鏈，叫做 HPA 軸。皮質醇不是憑空出現的，在它出現之前，大腦已經走完了一條三層的命令鏈。`, visual: '' },
      { id: "slide-2", type: "deepdive", title: "HPA 軸的三層指揮", content: `HPA 軸三個字母分別代表：H（下視丘）是大腦的「控制室」，偵測壓力信號後分泌 CRH；P（腦垂體）接收 CRH 後，分泌 ACTH 進入血液循環；A（腎上腺）收到 ACTH，最終分泌皮質醇。在這之前，杏仁核（情緒警報中心）先接收威脅信號，再傳給下視丘。整條鏈反應在幾秒到幾分鐘內完成。`, visual: '' },
      { id: "slide-3", type: "concept", title: "HPA 軸有自己的煞車：負回饋機制", content: `聰明的地方在於：皮質醇升高之後，會回頭告訴下視丘和腦垂體「夠了，可以停了」。下視丘收到信號後減少 CRH，皮質醇的分泌就跟著下降，身體恢復平靜。這是設計精良的自我調節系統——前提是壓力會真正解除。慢性壓力下，壓力源持續存在，這個煞車就永遠沒有機會啟動。`, visual: '' },
      { id: "slide-4", type: "deepdive", title: "常見誤解：「真的有危險」才算壓力", content: `很多人以為只有真實的危險才會啟動 HPA 軸。但 HPA 軸不需要等到「真的有危險」——只要你的大腦「認為有危險」，杏仁核就會發出信號，整條 HPA 軸就開始運作。想到明天要開會就開始焦慮，皮質醇已經在升起來了。每一次反覆擔憂，都算一次 HPA 軸啟動。`, visual: '' },
      { id: "slide-5", type: "summary", title: "本堂重點", content: `① HPA 軸是大腦指揮皮質醇的三層鏈——下視丘→腦垂體→腎上腺，這條鏈的健康決定壓力反應是否能正常調節。
② 負回饋機制是 HPA 軸的煞車——慢性壓力讓這個煞車失靈，皮質醇就無法正常下降。
③ 大腦「認為危險」就等於真實危險——焦慮思考、反覆擔憂，每一次都是一次 HPA 軸啟動。
下一堂，我們來看同一套 HPA 軸在短期和長期壓力下，如何走向完全不同的結果。`, visual: '' }
      ],
      quizzes: [
      { id: "q1", question: "HPA 軸中，「H」代表哪個大腦結構，負責偵測壓力信號並發出第一個指令？", options: ["海馬迴（Hippocampus）","下視丘（Hypothalamus）","杏仁核（Amygdala）","腦垂體（Pituitary）"], answer: 1, explanation: "H 代表下視丘（Hypothalamus），是大腦的「控制室」，接收杏仁核傳來的威脅信號後，分泌 CRH 給腦垂體。杏仁核雖然是威脅偵測的起點，但不是 HPA 軸的 H；海馬迴是記憶區域；腦垂體是 HPA 軸的 P。" },
      { id: "q2", question: "腦垂體在 HPA 軸中扮演什麼角色？", options: ["直接分泌皮質醇","分泌 CRH 傳達給腎上腺","接收 CRH 後分泌 ACTH，進入血液循環","偵測威脅後傳信號給下視丘"], answer: 2, explanation: "腦垂體（Pituitary）接收下視丘分泌的 CRH 後，分泌 ACTH（促腎上腺皮質素）進入血液循環，ACTH 抵達腎上腺才觸發皮質醇分泌。直接分泌皮質醇的是腎上腺；CRH 是下視丘分泌的；偵測威脅是杏仁核的工作。" },
      { id: "q3", question: "阿志在大型提案前三天就開始反覆擔憂，即使還沒發生任何事。這個狀況說明 HPA 軸的什麼特性？", options: ["HPA 軸只有在真實危險出現時才啟動","大腦「認為危險」就足以啟動 HPA 軸，不需要真實威脅","HPA 軸在睡眠中不會啟動","反覆擔憂可以訓練 HPA 軸更敏銳"], answer: 1, explanation: "杏仁核對威脅的判斷不區分「真實」還是「想像」，只要大腦認為有危險，整條 HPA 軸就啟動。阿志在事情發生前的反覆擔憂，每一次都是一次真實的 HPA 軸啟動和皮質醇上升，這也是焦慮思考是慢性壓力重要來源的原因。" },
      { id: "q4", question: "HPA 軸的「負回饋機制」如何運作？", options: ["皮質醇升高後，通知腎上腺繼續分泌更多皮質醇","皮質醇升高後，回頭告訴下視丘和腦垂體「夠了，停止指令」","皮質醇升高後，自動觸發更多 CRH 分泌","皮質醇升高後，腸道開始分泌煞車激素"], answer: 1, explanation: "負回饋機制是 HPA 軸的自我調節設計：皮質醇升高後，回頭告訴下視丘減少 CRH、腦垂體減少 ACTH，皮質醇分泌就跟著下降。這個煞車系統讓身體在壓力解除後能回到平靜。慢性壓力的問題是讓這個煞車無法正常啟動。" },
      { id: "q5", question: "長期慢性壓力下，HPA 軸可能發生「皮質醇阻抗」。這代表什麼？", options: ["腎上腺停止分泌皮質醇","大腦對皮質醇的回饋信號變得不敏感，煞車失靈","皮質醇節律恢復正常，壓力反應消失","皮質醇被肝臟快速分解，濃度無法維持"], answer: 1, explanation: "皮質醇阻抗是指大腦對皮質醇的回饋信號變得不敏感——就像被噪音轟炸太久後，開始對噪音沒有感覺。結果是皮質醇升高了，大腦卻不知道要踩煞車，繼續下令分泌更多。這是 HPA 軸在慢性壓力下失調的核心機制，也預告了下一堂要討論的短期vs長期壓力的本質差異。" }
      ],
    },
    {
      id: "auto-vol2-lesson-4",
      title: "短期壓力 vs 長期壓力",
      duration: 12,
      isFree: false,
      slides: [
      { id: "slide-1", type: "hook", title: "為什麼他放鬆了，她卻垮了", content: `阿強做完大型簡報，三天緊張睡不好，但結束那晚睡了一個深沉的好覺，隔天神清氣爽。小玲的壓力不是某件大事，是每天持續的低度焦慮，六個月下來記性變差、容易生氣、動不動就生病。同樣是「壓力」，為什麼結果差這麼多？關鍵不在強度，在持續時間。`, visual: '' },
      { id: "slide-2", type: "deepdive", title: "短期壓力：讓你更強的那種", content: `適度的短期壓力對身體有益，這是有生理依據的。短期壓力下 HPA 軸啟動，皮質醇升起，身體進入高效能狀態。壓力解除後，皮質醇下降，身體進入「修復模式」：睡眠加深、免疫上調、細胞修復。這個「壓力→修復」的循環，就像運動讓肌肉撕裂再修復，是讓身體變得更強健的機制。`, visual: '' },
      { id: "slide-3", type: "concept", title: "長期壓力：修復窗口消失的問題", content: `長期壓力的問題不是壓力「太大」，而是「修復窗口消失了」。身體從來沒有機會進入修復模式，皮質醇始終在較高水位，始終處於備戰狀態。就像一間工廠生產線從不停機、設備永遠不維護，遲早每一個零件都開始出問題。問題出現的順序通常是：睡眠→記憶專注→免疫→情緒調節→各種說不清楚的症狀。`, visual: '' },
      { id: "slide-4", type: "deepdive", title: "常見誤解：「習慣了」就沒事了", content: `很多人長期在壓力下生活，告訴自己「我已經習慣了」。你的大腦對壓力感的適應能力確實很強，你可能漸漸不那麼焦慮。但身體不會說謊。皮質醇節律的紊亂、免疫功能的下降、炎症標記物的升高，在你「習慣了」之後仍然繼續。這就是很多人後來突然「垮掉」的原因——不是某件大事壓倒他們，而是身體長期低度損耗到了臨界點。`, visual: '' },
      { id: "slide-5", type: "summary", title: "本堂重點", content: `① 短期壓力有修復期，長期壓力修復期消失——關鍵不是壓力大小，而是有沒有完整走完壓力→恢復的循環。
② 習慣了壓力不等於身體沒受傷——大腦的感知適應很快，但皮質醇失調和器官損傷不會因為「習慣」而停止。
③ 低強度持續壓力的累積傷害，可能比高強度短暫壓力更大——這就是「沒什麼大事，就是很累」的身體來源。
下一堂，來看慢性壓力如何一步步磨損你的神經系統。`, visual: '' }
      ],
      quizzes: [
      { id: "q1", question: "短期壓力和長期壓力最關鍵的差別是什麼？", options: ["壓力的強度大小","壓力是否有明確的結束點，修復期是否存在","壓力是否來自工作環境","壓力是否影響睡眠"], answer: 1, explanation: "短期壓力和長期壓力的根本差別不在強度，而在「修復窗口有沒有出現」。短期壓力有明確的結束點，身體可以完整修復；長期壓力讓修復窗口消失，累積損傷是問題的核心。" },
      { id: "q2", question: "短期壓力對身體可以有哪些正面效果？", options: ["讓皮質醇永久升高，維持高效能狀態","壓力期間注意力集中，壓力解除後修復期免疫上調","讓消化系統效率更好","讓杏仁核永久縮小，減少威脅反應"], answer: 1, explanation: "適度短期壓力的生理循環是：壓力啟動→皮質醇升高→高效能狀態→壓力解除→皮質醇下降→修復期（睡眠加深、免疫上調、細胞修復）。這個完整的循環才讓身體更強健；如果皮質醇永久升高、修復期消失，就變成了長期壓力的危害。" },
      { id: "q3", question: "林律師連續六個月工作繁忙，他告訴自己「已經習慣這種壓力了，沒那麼焦慮了」。根據本堂內容，以下哪個描述最準確？", options: ["他適應了壓力，身體也跟著恢復正常了","他的大腦感知適應了，但皮質醇失調和器官損傷可能仍在繼續","習慣壓力代表他的 HPA 軸已經重新校正完成","他的副交感神經已取回主導，壓力反應平衡了"], answer: 1, explanation: "大腦對壓力「感受」的適應很快，但這只是感知層面的適應，不代表生理損傷停止。皮質醇節律的紊亂、免疫功能的下降，在「習慣了」之後仍在繼續。這正是很多人突然「垮掉」的原因。" },
      { id: "q4", question: "壓力「真正解除」的關鍵條件是什麼？", options: ["那件讓你壓力的事結束了，就算解除","大腦需要確認威脅真的過去，HPA 軸才能啟動煞車","睡了一覺就算解除","皮質醇只要回到正常數值就算解除"], answer: 1, explanation: "壓力真正解除，需要大腦確認威脅真的過去，HPA 軸才有機會啟動煞車。如果「那件事結束了，但你開始擔心下一件事」，HPA 軸永遠沒有煞車的機會。真正的修復需要一段大腦不在擔憂任何事的時間，讓神經系統確認「現在是安全的」。" },
      { id: "q5", question: "研究顯示，以下哪種壓力型態，對身體的累積傷害往往最大？", options: ["一次性的高強度短暫壓力（如一場大考）","低強度但持續幾個月的壓力","偶發性的中等壓力","有確定結束日期的高強度壓力"], answer: 1, explanation: "低強度但持續的壓力，累積傷害往往比高強度短暫的壓力更大。原因是高強度短暫壓力通常有明確結束點，身體可以完整修復；而低強度持續壓力讓修復機制一直被占用，累積效應遠超直觀感受。這也預告了下一堂：慢性壓力對神經系統的逐步磨損。" }
      ],
    },
    {
      id: "auto-vol2-lesson-5",
      title: "當警報一直響：慢性壓力對神經的磨損",
      duration: 15,
      isFree: false,
      slides: [
      { id: "slide-1", type: "hook", title: "神經可塑性是雙向的", content: `你可能聽過「神經可塑性」——神經系統能根據經驗改變自己，這通常被當成正面的事情。但可塑性是雙向的。長期在慢性壓力下，神經系統也會根據這個環境改變自己，只是改變的方向，對你不利。幾十年的神經科學研究已確認，這些改變是可以測量的。`, visual: '' },
      { id: "slide-2", type: "deepdive", title: "慢性壓力對大腦的結構改變", content: `影響最顯著的是兩個縮小的區域：海馬迴（主管記憶形成和情緒調節）在長期高皮質醇下神經新生受抑制，體積縮小，這就是為什麼記性會變差、容易情緒失控；前額葉皮質（主管理性判斷和衝動控制）的神經連結變弱，讓你更難做出冷靜決策。同時，杏仁核（情緒警報中心）的活躍度上升，越來越容易拉警報。`, visual: '' },
      { id: "slide-3", type: "concept", title: "心率變異度：神經健康的指標", content: `長期慢性壓力下，交感神經長期占主導，副交感神經被壓制，導致心率變異度（HRV）下降。HRV 是指心跳間隔時間的變化程度——健康的心臟在每次跳動間隔有細微變化，反映自律神經的靈活調節能力。HRV 越高，神經越有彈性；慢性壓力讓 HRV 下降，就像一根越來越硬的彈簧，失去了韌性。`, visual: '' },
      { id: "slide-4", type: "deepdive", title: "常見誤解：記性差、情緒失控是「性格問題」", content: `很多人在慢性壓力後，記性變差、容易衝動發怒，然後對自己說「我天生就是這樣」或「我意志力不夠強」。這是錯的。海馬迴萎縮和前額葉弱化是可測量的生理改變，不是性格缺陷。理解這一點，不是為你找藉口，而是讓你知道問題的真正來源，才能對症下藥。`, visual: '' },
      { id: "slide-5", type: "summary", title: "本堂重點", content: `① 慢性壓力造成可測量的大腦結構改變——海馬迴萎縮、前額葉弱化、杏仁核過敏，是記性差、決策差、情緒失控的生理根源，不是性格問題。
② 自律神經彈性（HRV）是神經健康的指標——HRV 下降代表神經調節能力在退化。
③ 大部分神經磨損是可逆的，但前提是真正減壓——知道這一點，是為了更早採取行動。
下一堂，我們來看為什麼放假了身體還是緊繃放鬆不下來。`, visual: '' }
      ],
      quizzes: [
      { id: "q1", question: "慢性壓力下，海馬迴受到的主要影響是什麼？", options: ["海馬迴體積增大，記憶力增強","海馬迴神經新生受抑制，體積可能縮小","海馬迴的活躍度升高，情緒更穩定","海馬迴完全停止運作"], answer: 1, explanation: "長期高皮質醇會抑制海馬迴的神經新生（神經元的更新和生長），使海馬迴體積縮小。這是記性變差和情緒調節困難的生理根源。海馬迴不會增大或停止運作，活躍度升高的是杏仁核，不是海馬迴。" },
      { id: "q2", question: "心率變異度（HRV）越高，代表什麼？", options: ["心臟跳動越快，應急能力越強","自律神經越有彈性，應對壓力後恢復越快","交感神經完全占主導，效率最高","皮質醇節律最紊亂"], answer: 1, explanation: "HRV 反映的是自律神經的靈活調節能力。HRV 越高，自律神經越有彈性，能快速切換模式，壓力後恢復也快。慢性壓力讓 HRV 下降，代表神經調節能力退化，像一根失去韌性的彈簧。心跳速度和 HRV 是不同的指標。" },
      { id: "q3", question: "陳醫師在長期高工作壓力後，發現自己做決定越來越容易衝動、理性分析能力下降。根據本堂內容，這最可能是因為什麼？", options: ["他睡眠不足，但和壓力無關","前額葉皮質的神經連結在慢性壓力下變弱","他的海馬迴過度活躍，干擾了決策","杏仁核在壓力下體積縮小，反應變遲鈍"], answer: 1, explanation: "前額葉皮質主管理性判斷、衝動控制和情緒調節，慢性壓力會讓前額葉的神經連結變弱，讓人更難做出冷靜的決策、更容易衝動。杏仁核在壓力下是活躍度上升（更敏感），不是縮小。海馬迴主管記憶，不是決策。" },
      { id: "q4", question: "慢性壓力造成的「神經磨損」（如海馬迴萎縮）是否可以恢復？", options: ["完全不可逆，受損後永久改變","大部分情況下是可逆的，但前提是壓力源需要改變","只要吃對營養補充品就能完全修復","一週的假期就能完全恢復"], answer: 1, explanation: "根據神經科學研究，大部分慢性壓力造成的神經磨損是可逆的——大腦有修復能力，海馬迴在壓力解除後可以恢復神經新生。但這有一個前提：壓力源需要真正改變，神經系統需要有修復機會。只是「撐著」繼續高壓，損傷就會持續累積。" },
      { id: "q5", question: "下列哪個症狀，根據本堂內容，是慢性壓力的生理結果而非性格問題？", options: ["對工作沒有興趣，覺得無聊","容易情緒失控、衝動，同時記性越來越差","喜歡獨處，不喜歡社交","對食物有特別的偏好"], answer: 1, explanation: "情緒失控（杏仁核過敏、前額葉弱化的結果）和記性變差（海馬迴萎縮的結果）都是慢性壓力造成的可測量生理改變，不是性格缺陷或意志力不足。了解這一點才能找到真正的介入方向，也預告了下一堂：為什麼身體在壓力解除後不能立刻放鬆。" }
      ],
    },
    {
      id: "auto-vol2-lesson-6",
      title: "身體記憶壓力：為什麼放假了還是緊繃",
      duration: 12,
      isFree: false,
      slides: [
      { id: "slide-1", type: "hook", title: "海邊放假，肩膀還是緊的", content: `阿強請了一週假去花東旅遊，第一天坐在海邊，陽光很好，風景很美，但腦袋一直在想上週的客訴，肩膀就是放鬆不了。一直到第三天才稍微好一點，第五天才真的「進入狀態」。這不是他不會放鬆，是他的神經系統需要時間「重新校正」。`, visual: '' },
      { id: "slide-2", type: "deepdive", title: "神經系統學會了「備戰」", content: `長期在壓力環境中，神經系統會進行適應——但這個適應不是發生在你的意識層面，而是發生在神經迴路的連結強度和自律神經的基準設定上。你的神經系統的「靜息狀態」（resting state）被重新設定了，設定在一個比正常更高的警覺水位。放鬆對它來說，反而變成了一個陌生的狀態。`, visual: '' },
      { id: "slide-3", type: "concept", title: "壓力記憶儲存在肌肉、呼吸和腸道", content: `壓力不只儲存在大腦的記憶裡，也儲存在身體的組織和反應模式中：頸部、肩膀、下背的肌群習慣性保持緊繃，成為「預設姿態」；呼吸模式變成淺、快、以胸口為主，這種呼吸又反過來維持交感神經的啟動；腸道也記住了壓力下的運作模式。壓力減少後，這些身體模式不一定立刻改變。`, visual: '' },
      { id: "slide-4", type: "deepdive", title: "常見誤解：放假就能立刻恢復", content: `很多人以為放假、環境改變，身體就能立刻放鬆。但神經系統重新校正需要時間：如果壓力持續了幾個月，神經系統需要幾週到幾個月才能真正下降到較低的基線。一週的假期，充其量只是開始。長假第一天反而生病，是「鬆綁反應」——皮質醇快速下降後，被壓制的症狀集中爆發，這是修復開始的訊號，不是壞事。`, visual: '' },
      { id: "slide-5", type: "summary", title: "本堂重點", content: `① 神經系統會把「壓力模式」設為新的正常基線——放假放鬆不下來，不是你不會放鬆，是靜息水位已被重新設定。
② 壓力記憶儲存在肌肉、呼吸、腸道等身體組織中——這解釋了為什麼壓力減少後，身體症狀不會立刻消失。
③ 鬆綁反應是神經系統切換模式的過渡期——長假生病、週末頭痛是修復開始的初期訊號。
下一堂，我們來看壓力如何把免疫系統也拖下水。`, visual: '' }
      ],
      quizzes: [
      { id: "q1", question: "「神經系統靜息狀態被重新設定」是什麼意思？", options: ["神經系統的基準警覺水位上升，放鬆成為陌生狀態","神經系統完全重置，所有壓力記憶消失","神經系統進入休眠，不再對刺激有反應","神經系統的傳導速度變慢"], answer: 0, explanation: "長期在壓力下，神經系統把「高警覺的備戰狀態」設定為新的正常基準。這不是發生在意識層面，而是神經迴路連結強度和自律神經基準設定的改變。結果是：放鬆對神經系統來說變成陌生的狀態，才會出現「放假放鬆不了」的現象。" },
      { id: "q2", question: "「鬆綁反應」（let-down effect）是指什麼？", options: ["壓力解除後，神經系統立刻完全放鬆","壓力解除後，皮質醇快速下降，原本被壓制的症狀短暫爆發","假期結束後焦慮再次升起的感覺","長假中對工作的思念感"], answer: 1, explanation: "鬆綁反應是指：壓力期間皮質醇有抗炎效果，壓制了部分症狀；壓力解除、皮質醇快速下降後，那些被壓制的症狀（頭痛、疲勞、輕微焦慮）集中爆發。長假第一天生病、週末頭痛，是這個機制，是修復開始的過渡期，不是壞事。" },
      { id: "q3", question: "慢性壓力的「身體記憶」儲存在哪些地方？", options: ["只儲存在大腦的海馬迴中","儲存在肌肉（緊繃模式）、呼吸（淺快模式）和腸道（蠕動模式）中","主要儲存在心臟的跳動節律中","儲存在血液中的皮質醇濃度裡"], answer: 1, explanation: "壓力記憶不只在大腦，也儲存在身體組織的反應模式中：肌肉習慣性緊繃（特別是頸肩下背）、呼吸模式變淺變快且以胸口為主、腸道記住了壓力下的蠕動節律。這些身體模式在壓力減少後不一定立刻改變，需要多管齊下地引導身體重新學會放鬆。" },
      { id: "q4", question: "小玲壓力持續了八個月，終於辭職休息了。她的神經系統大約需要多久才能真正重新校正到較低的基線？", options: ["三天到一週的充分睡眠就夠了","幾週到幾個月，取決於壓力強度和持續時間","壓力來源消失後立刻恢復","重新校正需要數年，而且不可逆"], answer: 1, explanation: "神經系統重新校正的時間取決於壓力持續了多久、強度有多高。如果壓力持續了幾個月，神經系統需要幾週到幾個月才能真正下降到較低的基線。這不是悲觀，而是讓你不要因為「休息了還是很累」就否定自己——那是正常的過渡期。" },
      { id: "q5", question: "為什麼壓力期間淺、快的胸口呼吸，在壓力解除後仍然很難改變？", options: ["這是肺部的永久性損傷","這種呼吸模式本身會反過來維持交感神經的啟動狀態，形成循環","大腦在壓力期後會命令這種呼吸持續","這是副交感神經的自然反應"], answer: 1, explanation: "淺快的胸口呼吸是慢性壓力下形成的身體記憶，但它的問題不只是一個結果：這種呼吸模式本身會持續刺激交感神經，讓身體維持在輕度備戰狀態。這是壓力→呼吸改變→維持壓力反應的惡性循環，也是為什麼調整呼吸（腹式呼吸）在壓力管理中很有效——它能主動打斷這個循環，進而影響免疫系統（下一堂的主題）。" }
      ],
    },
    {
      id: "auto-vol2-lesson-7",
      title: "壓力與發炎：免疫系統被拖下水",
      duration: 12,
      isFree: false,
      slides: [
      { id: "slide-1", type: "hook", title: "為什麼忙完才生病？", content: `小玲大型報告交完、連假開始的第一天就感冒了。她納悶：最忙的時候沒事，一放鬆反而病倒？這不是倒楣，這是壓力對免疫影響的雙相機制。忙的時候，皮質醇在短期內抑制了部分炎症和症狀，讓你「撐過去」；忙完皮質醇快速下降，免疫的空窗期出現，原本被壓制的反應全部起來了。`, visual: '' },
      { id: "slide-2", type: "deepdive", title: "短期壓力啟動免疫，長期壓力抑制免疫", content: `壓力對免疫的影響是雙相的：短期壓力下，皮質醇和腎上腺素讓免疫系統短暫上調，準備應對受傷或感染，這是有用的；但當皮質醇長期偏高，它的抗炎效果開始壓制免疫系統整體活性，自然殺手細胞活性下降、T 細胞和 B 細胞增殖受抑制，讓你更容易反覆感冒、傷口癒合慢、打疫苗效果打折。`, visual: '' },
      { id: "slide-3", type: "concept", title: "慢性壓力誘發低度系統性發炎", content: `免疫故事的另一面：慢性壓力會誘發低度系統性發炎。這聽起來矛盾——剛說皮質醇會抑制免疫，怎麼又說會發炎？其實兩者不矛盾：皮質醇長期偏高後，身體對它的抗炎信號產生阻抗，皮質醇的免疫抑制效果失效，但壓力對組織的刺激（腸道滲漏、神經炎症等）讓炎症信號分子（IL-6、TNF-α、CRP）持續分泌——這種低度發炎在常規血液檢查中通常看不到。`, visual: '' },
      { id: "slide-4", type: "deepdive", title: "常見誤解：血液檢查正常就沒發炎", content: `很多人去做常規抽血，一切正常，所以相信自己沒有問題。但常規血液檢查並不包含 IL-6、TNF-α 等發炎指標，CRP 也要達到一定濃度才會出現在報告中。低度慢性發炎可以在常規檢查全部正常的情況下持續發生，這是壓力導致的症狀常常「找不到原因」的根本原因之一。`, visual: '' },
      { id: "slide-5", type: "summary", title: "本堂重點", content: `① 壓力對免疫的影響是雙相的——短期啟動、長期抑制；慢性壓力的人更容易反覆生病不是體質差，是免疫長期被壓制的結果。
② 慢性壓力誘發低度系統性發炎——常規血液檢查看不到，但它是心血管、代謝、神經退化等問題的共同上游風險因素。
③ 忙完才生病是有生理原因的——皮質醇在壓力期壓制症狀，解除後的過渡期是免疫空窗；了解這個規律，才能在對的時間加強照顧自己。
下一堂，我們要走進壓力對腸道的影響。`, visual: '' }
      ],
      quizzes: [
      { id: "q1", question: "短期壓力對免疫系統的即時影響是什麼？", options: ["立即抑制所有免疫功能","短暫上調免疫，準備應對受傷或感染","讓免疫系統停止運作，節省能量","讓 T 細胞和 B 細胞數量永久增加"], answer: 1, explanation: "短期壓力下，皮質醇和腎上腺素讓免疫系統短暫上調，這是有用的適應機制，讓身體準備應對受傷或感染。長期抑制是慢性壓力才會出現的問題。免疫系統在壓力下不會完全停止運作，T 細胞和 B 細胞數量不會永久增加。" },
      { id: "q2", question: "慢性壓力下，免疫功能長期被壓制，最可能出現哪些具體影響？", options: ["傷口癒合加快、不容易感冒","反覆感冒、傷口癒合慢、疫苗效果打折","自體免疫疾病自動消失","過敏症狀完全消退"], answer: 1, explanation: "慢性壓力讓皮質醇長期偏高，抑制自然殺手細胞活性、T 細胞和 B 細胞增殖，結果是更容易反覆感冒、傷口癒合變慢、對疫苗的反應也變弱。這不是體質差，是免疫被長期壓制的生理結果。" },
      { id: "q3", question: "「皮質醇會抑制免疫」和「慢性壓力誘發發炎」看起來矛盾，實際上這兩者如何同時存在？", options: ["這兩件事不可能同時發生，必有一個說法是錯的","皮質醇阻抗讓抗炎效果失效，但壓力對組織的刺激仍讓炎症分子持續分泌","皮質醇在短期抑制免疫，長期後自動轉換為促炎激素","免疫系統在慢性壓力下完全崩潰，兩種機制都不再運作"], answer: 1, explanation: "皮質醇長期偏高後，身體對其抗炎信號產生阻抗（就像負回饋失靈），皮質醇的免疫抑制效果失效；但壓力本身對身體組織的刺激（腸道滲漏等）讓炎症信號分子（IL-6、TNF-α）持續分泌。免疫抑制和低度發炎並不矛盾，兩者可以同時存在。" },
      { id: "q4", question: "為什麼很多人在「血液檢查一切正常」的情況下，仍然持續感到疲憊和不舒服？", options: ["因為他們在誇大自己的症狀","常規血液檢查不包含低度慢性發炎的指標，問題真實存在但不被看見","因為他們需要更多休息，和生理無關","因為常規抽血已經能偵測所有身體問題"], answer: 1, explanation: "常規血液檢查並不包含 IL-6、TNF-α 等細胞因子指標，CRP 也要達到一定濃度才會出現在報告中。低度慢性發炎可以在常規檢查全部正常的情況下持續發生。這是為什麼壓力造成的症狀常常「找不到原因」，也是本堂最核心的實用結論。" },
      { id: "q5", question: "了解「鬆綁效應」和「免疫空窗期」後，你應該在什麼時候特別加強照顧自己？", options: ["壓力最高峰的時候，那時免疫最需要幫助","大壓力之後開始放鬆的那段過渡期","每天均等地照顧，時間點沒有差別","只要睡眠充足，任何時間都不需要特別注意"], answer: 1, explanation: "忙的時候皮質醇短期壓制症狀，讓你撐過去；忙完後皮質醇快速下降，免疫的空窗期出現，原本被壓制的炎症反應起來，這是最容易生病的時機。了解這個規律，才能在大壓力之後的放鬆過渡期主動加強照顧——這也連結到下一堂腸道與壓力的主題。" }
      ],
    },
    {
      id: "auto-vol2-lesson-8",
      title: "壓力與腸道：第二個大腦怎麼了",
      duration: 15,
      isFree: false,
      slides: [
      { id: "slide-1", type: "hook", title: "壓力下肚子為什麼痛", content: `阿明工作壓力大的時候，腸胃一定出問題：要嘛便秘好幾天，要嘛突然腹瀉；有時候肚子痛，有時候脹氣反酸。胃鏡和大腸鏡都沒有器質性問題，醫生說是「功能性腸胃障礙」。阿明納悶：腸胃和壓力有什麼關係？關係非常大。考試前肚子痛、談判前想上廁所，不是心理作用，是交感神經直接命令腸道改變工作節律。`, visual: '' },
      { id: "slide-2", type: "deepdive", title: "腸道有自己的神經系統", content: `腸道擁有獨立的「腸道神經系統」（ENS），包含約五億個神經元，幾乎可以在不接受大腦指令的情況下，自主調節腸道的蠕動、分泌和血流。腸道透過迷走神經和大腦保持雙向溝通，這條路徑叫做「腸腦軸」（gut-brain axis）。重要的細節：迷走神經傳遞的信號，約 80-90% 是從腸道往大腦方向走，不是反過來——腸道的狀態大幅影響大腦的狀態。`, visual: '' },
      { id: "slide-3", type: "concept", title: "慢性壓力與腸漏", content: `長期壓力對腸道有一個更深層的問題：腸道屏障功能受損，俗稱「腸漏」。正常腸道黏膜是緊密的屏障，只讓消化後的小分子通過，把細菌、毒素擋在外面。慢性壓力下，皮質醇和持續的交感神經活化會削弱腸道黏膜細胞之間的緊密連結，讓細菌毒素（LPS）和未完全消化的蛋白質有機會進入血液，引發全身性低度發炎。`, visual: '' },
      { id: "slide-4", type: "deepdive", title: "常見誤解：腸躁是「想像出來的」", content: `腸躁症（IBS）、功能性消化不良、慢性腹脹，這些被醫生說「沒有器質性問題」的診斷，不代表你在無理取鬧。它們是腸道神經系統和大腦之間的溝通問題，是腸道屏障、菌群、過敏性的真實改變，只是這些變化在傳統腸鏡或超音波上看不到。改善腸道的方向，包括處理壓力，不只是換飲食或吃益生菌。`, visual: '' },
      { id: "slide-5", type: "summary", title: "本堂重點", content: `① 腸道有自己的神經系統，與大腦雙向溝通——80-90% 的信號從腸道往大腦走，腸道狀態直接影響情緒和大腦功能。
② 慢性壓力損傷腸道屏障，造成全身性低度發炎——「腸漏」是壓力從腸道連結到多系統症狀的重要橋梁。
③ 腸道菌群失衡與壓力、情緒形成惡性循環——光換飲食或光減壓，效果都有限，需要同時處理多個環節。
下一堂，我們來看壓力如何讓你在壓力下做出更差的決定。`, visual: '' }
      ],
      quizzes: [
      { id: "q1", question: "「腸腦軸」中，迷走神經傳遞的信號大約有多少比例是從腸道往大腦方向走？", options: ["10-20%","50%","80-90%","100%"], answer: 2, explanation: "迷走神經傳遞的信號，約 80-90% 是從腸道往大腦方向走，而不是大腦往腸道。這代表腸道的狀態（菌群、屏障、蠕動）大幅影響大腦的狀態，不只是大腦影響腸道。這就是為什麼腸道被稱為「第二個大腦」，也說明改善腸道健康可以影響情緒和認知。" },
      { id: "q2", question: "壓力啟動、交感神經主導時，腸道最可能出現哪些即時變化？", options: ["腸道蠕動加速且規律，消化更有效率","腸道蠕動節律改變（腹瀉或便秘）、腸道對疼痛的敏感度上升","腸道黏液分泌增加，保護黏膜","消化酵素分泌大量增加"], answer: 1, explanation: "壓力啟動時，交感神經主導，腸道蠕動節律改變（加速→腹瀉，或減慢→便祕）、腸道黏膜血流減少、消化酵素分泌減少，以及腸道對疼痛的敏感度上升。消化功能在壓力下是「被暫停的」，不會更有效率。" },
      { id: "q3", question: "「腸漏」（leaky gut）是什麼，和慢性壓力有什麼關係？", options: ["腸道出現可見的潰瘍或出血，是器質性的損傷","腸道黏膜緊密連結被削弱，讓毒素進入血液引發全身低度發炎","腸道液體大量流失，造成脫水","腸道神經完全失去功能，停止蠕動"], answer: 1, explanation: "腸漏是指腸道黏膜細胞之間的緊密連結被削弱，讓原本應留在腸道的細菌毒素（如脂多醣 LPS）和未完全消化的蛋白質，有機會進入血液循環，引發全身性的免疫反應和低度發炎。慢性壓力下，皮質醇和持續的交感神經活化是造成這個損傷的主要機制。" },
      { id: "q4", question: "腸道菌群（microbiome）如何參與壓力與情緒的惡性循環？", options: ["腸道菌群只影響消化，和情緒完全無關","慢性壓力改變菌群組成，失衡的菌群透過腸腦軸影響神經傳導，增加焦慮傾向","腸道菌群的改變可以完全抵銷慢性壓力的影響","益生菌可以完全取代壓力管理"], answer: 1, explanation: "腸道菌群影響血清素前驅物合成（體內約90%血清素在腸道產生）和 GABA 前驅物合成。慢性壓力改變菌群組成（有益菌減少），失衡的菌群又透過腸腦軸影響大腦神經傳導，增加焦慮和情緒低落，反過來又讓壓力更難調節。這就是為什麼光換飲食或光減壓效果都有限。" },
      { id: "q5", question: "醫生說阿明的腸胃「沒有器質性問題」，這代表他的腸躁症狀是假的嗎？", options: ["是的，腸鏡正常就代表腸道完全沒有問題","不是。腸道屏障、菌群和神經溝通的改變是真實的，只是傳統檢查看不到","是的，他需要心理治療而非任何生理介入","不是，但他的症狀完全來自大腦而非腸道"], answer: 1, explanation: "「沒有器質性問題」不代表症狀是假的。腸躁症（IBS）等功能性腸胃問題，是腸道神經系統與大腦的溝通失調、腸道屏障和菌群的真實改變，只是這些變化在腸鏡或超音波上看不到。改善方向包括壓力管理、調整菌群環境、以及腸道神經系統的支持，而不只是換飲食——這也連結到下一堂：壓力如何影響大腦決策。" }
      ],
    },
    {
      id: "auto-vol2-lesson-9",
      title: "你的大腦在壓力下如何做決定",
      duration: 12,
      isFree: false,
      slides: [
      { id: "slide-1", type: "hook", title: "為什麼壓力下的「集中精神」是假象", content: `有個老闆說，他最好的決策都是壓力下做出來的，壓力讓他清醒專注。這個感受是真實的，但有效期很短。短暫壓力確實能提升注意力集中程度，讓你在有限時間快速處理眼前的事。但當壓力持續超過幾個小時甚至幾天，大腦的決策架構開始往一個固定方向偏移——幾乎不例外，而且都是讓你做出更差決定的方向。`, visual: '' },
      { id: "slide-2", type: "deepdive", title: "壓力讓大腦從系統二切換到系統一", content: `大腦有兩套決策系統：系統一（快思）是直覺、快速、自動化、依賴習慣，不太消耗能量；系統二（慢想）是理性、慢速、需要意識參與、消耗大量認知資源。正常情況下兩者協作，遇到複雜問題系統二介入。壓力下發生的事：系統二的運作被壓制，系統一被放大。大腦在感知威脅時傾向快速自動化反應，這在面對獅子時有用，在慢性壓力下卻讓你依賴本能和習慣做複雜決策。`, visual: '' },
      { id: "slide-3", type: "concept", title: "壓力下四個可預測的認知偏誤", content: `壓力讓大腦出現可預測的偏誤：風險認知偏移（高估威脅、低估資源，可以解決的問題看起來比實際嚴峻）；時間視野縮短（關注眼前威脅，忽略長期後果，容易做出「解決眼前但長期代價高」的決定）；認知彈性下降（更難從不同角度看問題，「我只能這樣」往往不是事實）；衝動控制減弱（前額葉功能減弱，容易說出後悔的話、做出衝動的消費或決定）。`, visual: '' },
      { id: "slide-4", type: "deepdive", title: "常見誤解：壓力讓我更清醒", content: `「壓力讓我清醒」這個感受來自系統一的高速運作——你確實在快速處理信息，感覺很「在狀態」。但這種清醒是窄化的、防禦性的清醒，不是全面理性的清醒。你的注意力集中在威脅上，忽略了其他重要的因素，而且壓力下形成的記憶有負向偏誤，負面信息更容易被記住，你的世界觀會越來越悲觀。`, visual: '' },
      { id: "slide-5", type: "summary", title: "本堂重點", content: `① 壓力讓大腦從系統二切換到系統一——直覺、快速、依賴習慣，而非理性分析；在慢性壓力下讓決策品質系統性下降。
② 壓力下出現可預測的認知偏誤——高估威脅、縮短時間視野、衝動增加；了解這些偏誤，才能在壓力中建立「暫停點」。
③ 高壓狀態下，盡可能延後重大決策——不是逃避，是承認自己的決策工具暫時不在最佳狀態。
下一堂，我們要把這整冊的內容收攏，談理解壓力機制本身能帶來什麼改變。`, visual: '' }
      ],
      quizzes: [
      { id: "q1", question: "壓力下大腦的「系統一」和「系統二」如何切換？", options: ["系統一被壓制，系統二被放大，讓你思考更深入","系統二被壓制，系統一被放大，決策更依賴直覺和習慣","兩個系統都被壓制，大腦進入休眠保護模式","系統一和系統二同時增強，效率加倍"], answer: 1, explanation: "壓力下，大腦傾向快速自動化的反應模式，系統二（理性分析）的運作被壓制，系統一（直覺、習慣、快速）被放大。這在短暫危機中有演化上的優勢，但在慢性壓力下讓複雜決策品質系統性下降。" },
      { id: "q2", question: "「時間視野縮短」在壓力下的具體影響是什麼？", options: ["對未來更有計劃性，能更好地安排長期目標","傾向關注眼前威脅，容易做出「解決眼前但長期代價高」的決定","對過去的記憶更清晰，有助於從錯誤中學習","讓人更能享受當下，減少焦慮"], answer: 1, explanation: "時間視野縮短（temporal discounting 增加）是壓力下的認知偏誤之一。大腦在威脅感知下優先處理眼前問題，忽略較長期的後果，導致更容易選擇「現在方便但代價高」的選項。這就是為什麼壓力大時容易衝動消費、做出事後後悔的決定。" },
      { id: "q3", question: "阿志在激烈爭吵後說了很多後悔的話。從本堂的神經科學角度，最主要的原因是什麼？", options: ["他的語言能力在壓力下特別強","前額葉功能在壓力下減弱，衝動控制能力下降","他的記憶系統在壓力下完全停止","杏仁核在高壓時縮小，不再過濾情緒"], answer: 1, explanation: "前額葉皮質是衝動控制和情緒調節的中樞，在壓力下（杏仁核主導、前額葉受抑制的狀態）功能減弱。說出後悔的話、做出衝動的決定，是前額葉控制力暫時下降的結果，不是性格問題，是可預測的生理反應。" },
      { id: "q4", question: "壓力下形成的記憶有什麼特性？", options: ["正面和負面信息被同等記憶，非常客觀","負面信息更容易被記住（負向偏誤加強），讓你對世界評估越來越悲觀","記憶能力完全喪失，什麼都記不住","只記住和壓力直接相關的事，其他記憶更清晰"], answer: 1, explanation: "高壓力狀態下形成的記憶有選擇性：負面信息被更牢固地記住（演化上記住危險比記住安全更重要），正面信息被低估或遺忘。長期下來，記憶庫充斥失敗和危險的記憶，對自己和環境的評估越來越悲觀，形成「壓力→負向記憶偏誤→更多壓力」的惡性循環。" },
      { id: "q5", question: "了解「壓力讓決策品質系統性下降」後，在實踐上最合理的應對是什麼？", options: ["在壓力最高峰時做所有重大決定，因為最清醒","高壓狀態下盡可能延後重大決策，或問自己「這裡有多少是杏仁核在反應威脅」","完全信任系統一的直覺，壓力下的本能反應是最準確的","讓別人替自己做所有決定"], answer: 1, explanation: "在知道自己處於高壓狀態時，最直接的應用是盡可能延後重大決策——不是因為不夠聰明，而是決策工具暫時不在最佳狀態。如果無法延後，問自己「這裡有多少是在評估現實，有多少是杏仁核在反應威脅」，能讓系統二稍微介入。這也預告了下一堂：「命名」自己的狀態如何從神經層面介入壓力反應。" }
      ],
    },
    {
      id: "auto-vol2-lesson-10",
      title: "理解壓力機制，才能真的應對壓力",
      duration: 12,
      isFree: false,
      slides: [
      { id: "slide-1", type: "hook", title: "「道理都懂，就是做不到」——但懂本身就有用", content: `讀完前九堂，你對壓力的理解已經徹底不同了：你知道它是 HPA 軸啟動、皮質醇升起、交感神經主導、海馬迴受壓、腸道蠕動改變、免疫失衡的完整生理過程。你知道短期和長期壓力的根本差別在修復窗口，你知道放假放鬆不了是神經系統需要重新校正，你知道壓力下的決定系統性地偏向風險高估。這些知識不是考試用的，它有一個具體用途。`, visual: '' },
      { id: "slide-2", type: "deepdive", title: "命名是神經層面的干預", content: `神經科學研究發現，當你能夠用語言命名自己的情緒和生理狀態，杏仁核的活躍度會顯著下降，前額葉的參與度會上升。這個效應叫做「情感標記」（affect labeling）。當你知道「我現在焦慮，是因為我的 HPA 軸在啟動、皮質醇在升，這是正常的生理反應，不代表有真實威脅」——這句話本身就能讓杏仁核降溫、前額葉重新介入。用理解給神經系統一個更精確的信號：這個狀況是可以理解的。`, visual: '' },
      { id: "slide-3", type: "concept", title: "理解機制讓你停止對自己生氣", content: `很多在慢性壓力中的人，除了壓力本身，還對自己很生氣：「為什麼我這麼脆弱？別人都可以，為什麼我不行？」當你知道海馬迴受壓、HPA 軸失調、決策偏誤是真實的生理狀態，你就能明白：你的「做不到」不是意志力問題，是生理狀態問題。這個理解不是藉口，而是準確的診斷。準確的診斷，才有對應的解法。`, visual: '' },
      { id: "slide-4", type: "deepdive", title: "常見誤解：學機制不如學技巧", content: `很多人覺得「道理都懂，不如直接教我減壓方法」。但在學技巧之前，你需要先理解機制。你需要知道「為什麼」呼吸練習能降皮質醇（它刺激副交感神經，透過迷走神經啟動 HPA 軸煞車）；知道「為什麼」運動對壓力有效（它模擬了「壓力→身體行動→完結」的生理循環）。沒有機制知識做底，這些方法遇到阻力很容易放棄；有了機制知識，你能在身體裡「看見」它們在做什麼。`, visual: '' },
      { id: "slide-5", type: "summary", title: "本堂重點", content: `① 命名自己的生理狀態，是有神經科學依據的干預——知道「我現在的 HPA 軸在啟動」，在神經層面就已經和「我不知道為什麼這麼焦慮」不同。
② 理解機制讓你停止對自己生氣——慢性壓力下的「做不到」是生理問題不是意志力問題，準確診斷才有準確解法。
③ 機制知識讓介入更有效——知道呼吸和運動在生理上做什麼，才能真正有意識地運用，而不只是「聽說對身體好」。
下一冊 Vol.03《睡眠的科學》，我們要深入理解睡眠為什麼是身體修復的核心視窗。`, visual: '' }
      ],
      quizzes: [
      { id: "q1", question: "「情感標記」（affect labeling）在神經科學上的效果是什麼？", options: ["讓杏仁核活躍度上升，情緒反應更強烈","讓杏仁核活躍度下降，前額葉參與度上升","讓海馬迴停止記憶情緒事件","讓皮質醇立刻大幅下降"], answer: 1, explanation: "研究發現，用語言命名自己的情緒和生理狀態（如「我現在焦慮」），能讓杏仁核的活躍度顯著下降，同時前額葉的參與度上升。這是心理治療中被廣泛應用的技術，也是「懂得自己在發生什麼」在神經層面有真實效果的原因。" },
      { id: "q2", question: "知道壓力是生理事件（HPA 軸啟動、皮質醇升起）而非意志力不足，最主要的實用價值是什麼？", options: ["讓你可以完全忽略壓力的影響","讓你停止對自己生氣，找到準確的診斷方向和對應的解法","讓壓力立刻消失","讓你對所有壓力感到麻木"], answer: 1, explanation: "理解壓力的生理本質，讓你能夠把「為什麼我這麼脆弱」重新框架為「我的 HPA 軸和皮質醇節律出了問題」。準確的診斷才有對應的解法：意志力問題的解法，和生理失調問題的解法完全不同，這個區分讓你能找到真正有效的介入方向。" },
      { id: "q3", question: "為什麼在學減壓技巧之前，需要先理解壓力機制？", options: ["因為機制知識可以取代所有技巧，不需要額外練習","因為了解「為什麼」有效，才能在遇到阻力時有足夠的動力堅持，而不只是模糊地「聽說對身體好」","因為減壓技巧在沒有機制知識時完全無效","因為機制知識可以讓你一次解決所有壓力問題"], answer: 1, explanation: "沒有機制知識，減壓方法只是「你模糊知道對身體好的習慣」，一旦遇到阻力很容易放棄。有了機制知識，你能在身體裡「看見」這些方法在做什麼——比如呼吸練習如何刺激迷走神經啟動 HPA 軸煞車——動力和堅持度都不同。" },
      { id: "q4", question: "讀完 Vol.02 後，你對壓力的理解框架應該包含哪些核心知識？", options: ["只需要記住皮質醇和 HPA 軸的名稱就夠了","皮質醇節律、HPA 軸機制、短期vs長期壓力差別、神經磨損、身體記憶、免疫發炎、腸腦軸、決策偏誤","只需要知道減壓方法，不需要理解機制","只需要了解壓力是心理問題，調整心態就夠了"], answer: 1, explanation: "Vol.02 建立的理解框架包含完整的壓力生理機制：皮質醇的節律和失調、HPA 軸的三層指揮和煞車機制、短期vs長期壓力的關鍵差異（修復窗口）、神經系統的磨損和可塑性、身體壓力記憶、免疫雙相影響和慢性發炎、腸腦軸的雙向溝通、以及決策偏誤。這個完整框架是接下來所有介入的地基。" },
      { id: "q5", question: "下列哪個描述，最準確地說明 Vol.02 這整冊的核心立場？", options: ["壓力是壞的，應該完全避免","壓力是可以被完美消除的，只要學對方法","理解壓力的機制是有效應對壓力的前提，壓力本身是生命的一部分，目標是讓它在正確的地方出現和消失","壓力是純粹的心理問題，不影響生理"], answer: 2, explanation: "Vol.02 的核心立場是：壓力是生命的一部分，它的設計初衷就是讓你應對困難、讓你成長。這套書不是「完美應對壓力指南」，而是讓你理解壓力機制，讓它在應有的地方出現和消失，而不是變成永遠關不掉的背景雜音。理解是第一步，也是最重要的一步。" }
      ],
    }
    ],
  },
  {
    vol: "03",
    title: "自律神經Vol.03：睡了還是累",
    subtitle: "為什麼睡了還是累：修復視窗與大腦清潔工",
    emoji: "😴",
    cta: { text: "前往小舖購買 Vol.03 完整版（共10堂）", url: ST_BASE + '/6a3fd2f28dfebf4148dea250', seriesNote: "自律神經學系 7冊・從了解到改變" },
    lessons: [
      {
      id: "autonomic-preview-lesson-3",
      title: "睡了八小時為什麼還是累？",
      duration: 15,
      isFree: true,
      slides: [
      { id: "slide-1", type: "hook", title: "你是這樣的人嗎？", content: `阿明每天準時十一點躺下、早上七點起床。算起來足足八小時，但每天早上醒來的第一個念頭都是：「我還是好累。」

他試過早睡、睡前喝熱牛奶、把手機放到另一個房間，但就是沒用。

他不知道的是：問題從來不是睡了幾小時，而是他的身體在那八小時裡到底做了什麼。`, visual: `<svg viewBox="0 0 600 260" xmlns="http://www.w3.org/2000/svg"><rect width="600" height="260" fill="#0f172a" rx="12"/><text x="300" y="38" text-anchor="middle" fill="#e2e8f0" font-size="14" font-weight="bold" font-family="sans-serif">睡眠中，大腦其實非常忙碌</text><g transform="translate(50,55)"><rect x="0" y="0" width="230" height="50" rx="8" fill="#1e293b" stroke="#6366f1" stroke-width="1"/><text x="115" y="22" text-anchor="middle" fill="#c7d2fe" font-size="13" font-family="sans-serif">🧠 整理記憶</text><text x="115" y="40" text-anchor="middle" fill="#64748b" font-size="11" font-family="sans-serif">把短期記憶轉為長期儲存</text></g><g transform="translate(320,55)"><rect x="0" y="0" width="230" height="50" rx="8" fill="#1e293b" stroke="#8b5cf6" stroke-width="1"/><text x="115" y="22" text-anchor="middle" fill="#c4b5fd" font-size="13" font-family="sans-serif">🔧 修復神經迴路</text><text x="115" y="40" text-anchor="middle" fill="#64748b" font-size="11" font-family="sans-serif">清除受損神經元</text></g><g transform="translate(50,120)"><rect x="0" y="0" width="230" height="50" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="1"/><text x="115" y="22" text-anchor="middle" fill="#6ee7b7" font-size="13" font-family="sans-serif">🧹 清除代謝廢物</text><text x="115" y="40" text-anchor="middle" fill="#64748b" font-size="11" font-family="sans-serif">大腦的清潔系統啟動</text></g><g transform="translate(320,120)"><rect x="0" y="0" width="230" height="50" rx="8" fill="#1e293b" stroke="#f59e0b" stroke-width="1"/><text x="115" y="22" text-anchor="middle" fill="#fcd34d" font-size="13" font-family="sans-serif">⚖️ 調節荷爾蒙</text><text x="115" y="40" text-anchor="middle" fill="#64748b" font-size="11" font-family="sans-serif">生長激素、皮質醇重設</text></g><text x="300" y="205" text-anchor="middle" fill="#94a3b8" font-size="13" font-family="sans-serif">睡眠不是「關機」，是切換到「維護模式」</text></svg>` },
      { id: "slide-2", type: "concept", title: "為什麼八小時睡完還是累？三個原因", content: `原因一：睡眠結構破碎
健康睡眠由幾個完整周期組成。如果睡眠被反覆打斷，深眠比例嚴重不足。你睡了八小時，但可能只得到一兩個完整修復周期。

原因二：自律神經沒有切換
從清醒進入睡眠，必須從交感神經切換到副交感神經。如果長期處於壓力狀態，身體還是在備戰模式，無法真正進入深度修復。

原因三：皮質醇節律失調
正常皮質醇在清晨達到高峰，夜間降到最低。但長期壓力者夜間皮質醇異常偏高，會直接壓制深眠的發生。`, visual: `<svg viewBox="0 0 600 260" xmlns="http://www.w3.org/2000/svg"><rect width="600" height="260" fill="#0f172a" rx="12"/><text x="300" y="35" text-anchor="middle" fill="#e2e8f0" font-size="14" font-weight="bold" font-family="sans-serif">睡了但沒修復——三種常見原因</text><g transform="translate(40,55)"><rect x="0" y="0" width="160" height="155" rx="8" fill="#1e293b" stroke="#ef4444" stroke-width="1.5"/><text x="80" y="28" text-anchor="middle" fill="#fca5a5" font-size="12" font-weight="bold" font-family="sans-serif">① 睡眠結構破碎</text><text x="80" y="80" text-anchor="middle" fill="#94a3b8" font-size="11" font-family="sans-serif">深眠周期被打斷</text><text x="80" y="100" text-anchor="middle" fill="#94a3b8" font-size="11" font-family="sans-serif">修復工作無法完成</text><text x="80" y="130" text-anchor="middle" fill="#f87171" font-size="11" font-family="sans-serif">→ 隔天疲憊</text></g><g transform="translate(220,55)"><rect x="0" y="0" width="160" height="155" rx="8" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/><text x="80" y="28" text-anchor="middle" fill="#fcd34d" font-size="12" font-weight="bold" font-family="sans-serif">② 自律神經未切換</text><text x="80" y="80" text-anchor="middle" fill="#94a3b8" font-size="11" font-family="sans-serif">交感神經持續亢奮</text><text x="80" y="100" text-anchor="middle" fill="#94a3b8" font-size="11" font-family="sans-serif">身體仍在備戰模式</text><text x="80" y="130" text-anchor="middle" fill="#fbbf24" font-size="11" font-family="sans-serif">→ 淺眠多夢</text></g><g transform="translate(400,55)"><rect x="0" y="0" width="160" height="155" rx="8" fill="#1e293b" stroke="#8b5cf6" stroke-width="1.5"/><text x="80" y="28" text-anchor="middle" fill="#c4b5fd" font-size="12" font-weight="bold" font-family="sans-serif">③ 皮質醇節律失調</text><text x="80" y="80" text-anchor="middle" fill="#94a3b8" font-size="11" font-family="sans-serif">夜間皮質醇偏高</text><text x="80" y="100" text-anchor="middle" fill="#94a3b8" font-size="11" font-family="sans-serif">直接壓制深眠發生</text><text x="80" y="130" text-anchor="middle" fill="#a78bfa" font-size="11" font-family="sans-serif">→ 睡不沉</text></g></svg>` },
      { id: "slide-3", type: "deepdive", title: "不是不夠努力睡，是身體不知道怎麼進入修復", content: `如果你每天早上起來感覺沒睡飽，最重要的事不是繼續拉長睡眠時間，而是搞清楚你的睡眠結構出了什麼問題。

睡眠量 ≠ 睡眠品質

八小時的數字只是必要條件，不是充分條件。睡眠結構才是決定你醒來是否有精神的關鍵。

🐱 魯魯：睡了等於沒睡？聽起來很慘，但這不是你的錯——是你的神經系統需要重新學會「放鬆模式」。`, visual: `<svg viewBox="0 0 600 220" xmlns="http://www.w3.org/2000/svg"><rect width="600" height="220" fill="#0f172a" rx="12"/><text x="300" y="35" text-anchor="middle" fill="#e2e8f0" font-size="14" font-weight="bold" font-family="sans-serif">睡眠品質比較</text><rect x="40" y="55" width="230" height="110" rx="8" fill="#1e293b" stroke="#ef4444" stroke-width="1.5"/><text x="155" y="78" text-anchor="middle" fill="#fca5a5" font-size="13" font-family="sans-serif">😴 睡了8小時</text><text x="155" y="98" text-anchor="middle" fill="#94a3b8" font-size="11" font-family="sans-serif">但睡眠結構破碎</text><text x="155" y="118" text-anchor="middle" fill="#94a3b8" font-size="11" font-family="sans-serif">交感神經未切換</text><text x="155" y="145" text-anchor="middle" fill="#f87171" font-size="13" font-family="sans-serif">→ 醒來還是很累</text><rect x="330" y="55" width="230" height="110" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/><text x="445" y="78" text-anchor="middle" fill="#6ee7b7" font-size="13" font-family="sans-serif">😌 睡了6小時</text><text x="445" y="98" text-anchor="middle" fill="#94a3b8" font-size="11" font-family="sans-serif">但睡眠結構完整</text><text x="445" y="118" text-anchor="middle" fill="#94a3b8" font-size="11" font-family="sans-serif">深眠比例足夠</text><text x="445" y="145" text-anchor="middle" fill="#6ee7b7" font-size="13" font-family="sans-serif">→ 醒來精神較好</text></svg>` },
      { id: "slide-4", type: "summary", title: "本堂重點", content: `📝 三件事，帶走就夠了：

① 睡眠量 ≠ 睡眠品質
八小時只是必要條件，睡眠結構才是決定你醒來是否有精神的關鍵。

② 睡眠結構破碎
深眠不足、周期被打斷，身體的修復工作就無法完成，隔天的疲憊感是真實信號，不是意志力問題。

③ 自律神經切換失敗
長期壓力讓交感神經難以下線，這是「睡了還是累」最常見但最被忽略的根本原因。`, visual: `<svg viewBox="0 0 600 190" xmlns="http://www.w3.org/2000/svg"><rect width="600" height="190" fill="#0f172a" rx="12"/><text x="300" y="32" text-anchor="middle" fill="#e2e8f0" font-size="15" font-weight="bold" font-family="sans-serif">睡眠的科學：三個核心認識</text><g transform="translate(50,50)"><rect x="0" y="0" width="500" height="36" rx="6" fill="#1e293b" stroke="#6366f1" stroke-width="1"/><text x="18" y="23" fill="#6366f1" font-size="16" font-family="sans-serif">①</text><text x="45" y="23" fill="#e2e8f0" font-size="13" font-family="sans-serif">睡眠量不等於睡眠品質——結構才是關鍵</text></g><g transform="translate(50,96)"><rect x="0" y="0" width="500" height="36" rx="6" fill="#1e293b" stroke="#6366f1" stroke-width="1"/><text x="18" y="23" fill="#6366f1" font-size="16" font-family="sans-serif">②</text><text x="45" y="23" fill="#e2e8f0" font-size="13" font-family="sans-serif">結構破碎→深眠不足→隔天疲憊</text></g><g transform="translate(50,142)"><rect x="0" y="0" width="500" height="36" rx="6" fill="#1e293b" stroke="#6366f1" stroke-width="1"/><text x="18" y="23" fill="#6366f1" font-size="16" font-family="sans-serif">③</text><text x="45" y="23" fill="#e2e8f0" font-size="13" font-family="sans-serif">自律神經未切換是「睡了還是累」的根本原因</text></g></svg>` }
      ],
      quizzes: [
      { id: "q1", question: "「睡了八小時還是很累」最可能的原因是什麼？", options: ["睡眠時間不夠，應該睡到九到十小時","睡眠結構破碎或自律神經未切換，深眠不足","身體天生就是容易累，跟睡眠無關","白天活動量不夠，睡眠品質才會差"], answer: 1, explanation: "決定睡醒後是否有精神的關鍵是睡眠結構，而不只是時間長度。深眠不足、自律神經沒有從交感切換到副交感、或皮質醇節律失調，都可能讓你睡了八小時卻感覺沒睡。" },
      { id: "q2", question: "長期壓力大的人睡覺時，為什麼常常夢多、淺眠、容易驚醒？", options: ["因為他們的大腦在睡覺時工作量特別大","因為壓力讓交感神經難以切換，身體仍處於備戰模式","因為壓力讓人對噪音特別敏感","這只是個人習慣，跟壓力沒有直接關係"], answer: 1, explanation: "從清醒進入睡眠，需要從交感神經主導切換到副交感神經主導。長期壓力讓交感神經持續亢奮，即使人躺下了，身體還在備戰模式，所以容易淺眠、多夢、驚醒。" }
      ],
    },
    {
      id: "auto-vol3-lesson-2",
      title: "睡眠的四個階段：你的大腦在幹嘛",
      duration: 15,
      isFree: false,
      slides: [
      { id: "slide-1", type: "hook", title: "你知道你睡覺時大腦在做什麼嗎？", content: `你有沒有去醫院做過睡眠檢查，或者用手環看過自己的睡眠報告？上面有N1、N2、N3、REM這幾個神秘縮寫。它們不只是標籤——每個階段，你的大腦在做完全不同的工作。`, visual: '' },
      { id: "slide-2", type: "deepdive", title: "N1和N2：入口與主體", content: `N1是清醒到睡眠的過渡，只有5–10分鐘，非常淺，容易被叫醒——那個躺下後身體突然抖一下的「入睡抽動」就發生在這裡。N2是整晚佔比最大的階段（約45–55%），出現特殊的睡眠紡錘波和K複合波，分別負責鞏固記憶和過濾外界干擾，幫你平穩進入深眠。`, visual: '' },
      { id: "slide-3", type: "concept", title: "N3：身體的真正維修時間", content: `N3是深眠，腦波非常緩慢（δ波），最難被叫醒。這裡是生長激素分泌的高峰、免疫系統整頓的時間、類淋巴清潔系統的主要運作窗口。N3主要集中在睡眠的前半段，熬夜或入睡太晚就會直接壓縮它，就算後來補到八小時，深眠比例還是不夠。`, visual: '' },
      { id: "slide-4", type: "deepdive", title: "REM：情緒的消化器", content: `快速動眼期（REM）：腦波接近清醒，眼球快速移動，肌肉卻近乎癱瘓。這裡是大多數夢境發生的地方，但更重要的是——REM幫助大腦重新處理情緒記憶，把情緒強度「調低」但保留事件記憶。REM主要集中在睡眠的後半段，被鬧鐘硬切掉的往往就是這個。`, visual: '' },
      { id: "slide-5", type: "concept", title: "常見誤解：深眠越多越好，REM不重要", content: `很多人以為只要睡得很沉就是好睡眠。但N3和REM各有不可替代的功能：N3負責身體修復和免疫，REM負責情緒處理和認知整合。缺少REM的人，情緒調節能力下降，感覺容易「很理性但壓抑」。四個階段缺一不可。`, visual: '' },
      { id: "slide-6", type: "summary", title: "本堂重點", content: `① 四個階段各司其職——N1是入口、N2是主體、N3是修復核心、REM是情緒消化，缺一個就少一份功能。
② N3集中在前半夜——熬夜等於主動犧牲深眠，後來補眠也很難完全彌補。
③ REM集中在後半夜——鬧鐘硬切通常截掉的就是REM，這是熬夜後情緒特別不穩的原因之一。
下一堂預告：大腦的類淋巴系統——只有睡著才會開啟的清潔機制。`, visual: '' }
      ],
      quizzes: [
      { id: "q1", question: "「入睡抽動」（躺下後身體突然抖一下）發生在哪個睡眠階段？", options: ["N3深眠期間","REM快速動眼期","N1（清醒到睡眠的過渡）","N2輕度睡眠"], answer: 2, explanation: "正確答案是③。入睡抽動發生在N1，是大腦開始放鬆肌肉控制時的神經活動，完全正常。N3是最深的睡眠階段，不容易被輕微刺激打擾；REM則是肌肉幾乎癱瘓的做夢階段，兩者都不是入睡抽動的發生時間。" },
      { id: "q2", question: "睡眠紡錘波（sleep spindles）主要在哪個階段出現，其功能是什麼？", options: ["N1階段，幫助大腦從清醒快速過渡到睡眠","N2階段，與記憶鞏固和過濾外界干擾有關","N3階段，觸發生長激素的大量分泌","REM階段，協助情緒記憶的重新處理"], answer: 1, explanation: "正確答案是②。睡眠紡錘波出現在N2，研究顯示它與記憶鞏固有關，幫助把白天學到的內容轉入長期記憶。N3的特徵是δ慢波，不是紡錘波；REM的腦波接近清醒，也不是紡錘波的出現時間。" },
      { id: "q3", question: "如果一個人每天都熬夜到凌晨兩點才睡，即使睡了八小時，最可能缺乏哪個睡眠階段？", options: ["N1，因為入睡過渡期被壓縮","N2，因為輕眠期比例下降","N3深眠，因為它主要集中在睡眠前半段","REM，因為做夢需要在前半夜完成"], answer: 2, explanation: "正確答案是③。N3深眠主要集中在睡眠的前半段（通常是入睡後的前三到四小時）。熬夜晚睡雖然可能睡滿八小時，但這段窗口整體後移，身體在凌晨兩點後的深眠效率遠不如晚上十一點入睡的深眠品質。④是常見誤解，REM其實集中在後半夜，也就是清晨接近起床的時段。" },
      { id: "q4", question: "REM睡眠在情緒調節上扮演什麼角色？", options: ["REM讓你完全忘記痛苦的記憶，保護心理健康","REM幫助大腦重新處理情緒記憶，降低情緒強度但保留事件記憶","REM分泌大量皮質醇，讓你在壓力後快速恢復","REM期間記憶系統完全關閉，讓情緒得到充分休息"], answer: 1, explanation: "正確答案是②。REM被稱為「情緒消化器」，神經科學研究（包括馬修・沃克的研究）指出REM幫助大腦重新處理情緒事件，把強烈情緒的「刺」拔掉，但事件本身的記憶得以保留。①不正確——REM不是讓你遺忘，而是調節情緒的強度。③皮質醇機制與REM無直接關聯。" },
      { id: "q5", question: "以下哪個說法正確描述了四個睡眠階段在一整晚中的分布？", options: ["N3深眠和REM均勻分散在整個睡眠過程中，沒有前後差異","N3深眠主要在後半夜，REM主要在前半夜","N3深眠主要在前半夜，REM主要在後半夜（清晨）","前半夜主要是REM做夢，後半夜才進入深眠修復"], answer: 2, explanation: "正確答案是③。N3深眠集中在睡眠的前三到四小時（前半夜），這是身體修復的主要窗口；REM則在後半夜（靠近清晨）的比例越來越高，最後幾個周期幾乎都以REM為主。理解這個分布很重要——熬夜犧牲的主要是N3，被鬧鐘截掉的主要是REM。" }
      ],
    },
    {
      id: "auto-vol3-lesson-3",
      title: "類淋巴系統：只有睡著才開啟的大腦清潔工",
      duration: 12,
      isFree: false,
      slides: [
      { id: "slide-1", type: "hook", title: "大腦有一個你不知道的清潔系統", content: `你知道身體有淋巴系統負責清除廢物，但大腦不一樣。大腦有一道血腦屏障保護，普通淋巴管進不去。那麼大腦的廢物要怎麼清除？科學家2012年才找到答案——那個機制叫做「類淋巴系統」，而且它只有在你睡著的時候才會開啟。`, visual: '' },
      { id: "slide-2", type: "deepdive", title: "類淋巴系統是怎麼運作的", content: `類淋巴系統利用大腦中的星狀膠質細胞所形成的管道，讓腦脊髓液（CSF）從動脈周圍流入腦組織，像是沖水馬桶一樣把代謝廢物沖走，再從靜脈周圍排出。它的名字來自「膠質細胞（glia）＋淋巴（lymphatic）」——功能類似淋巴，但由大腦自己的膠質細胞驅動。`, visual: '' },
      { id: "slide-3", type: "concept", title: "睡著時效率高出60倍以上", content: `最關鍵的發現：睡眠期間，腦細胞的體積會縮小約60%，讓細胞間隙變大，腦脊髓液可以大幅提升流通效率。清醒時大腦太忙，細胞保持高活躍度，類淋巴系統根本沒辦法好好工作——就像你很難在辦公室營業時間打掃，得等下班後才能徹底清潔。`, visual: '' },
      { id: "slide-4", type: "deepdive", title: "清除的廢物和失智症有什麼關係", content: `類淋巴系統負責清除的廢物包括β類澱粉蛋白（amyloid-β）和tau蛋白——這兩種蛋白質的異常堆積，正是阿茲海默症早期最重要的病理特徵。2019年《科學》期刊的研究顯示，即使只是一個晚上睡眠不足，大腦中的β類澱粉蛋白堆積量就有可量測的增加。每個睡不好的夜晚，清潔任務都沒有完成。`, visual: '' },
      { id: "slide-5", type: "concept", title: "常見誤解：大腦廢物清除是隨時在進行的", content: `很多人以為新陳代謝廢物的清除是持續進行的自動過程，不需要特別睡眠。但類淋巴系統打破了這個預設——大腦廢物的清除高度依賴睡眠，特別是N3深眠期間效率最高。清醒時的類淋巴活動只有睡眠時的一小部分。沒有充足的深眠，大腦就在慢慢「積垢」。`, visual: '' },
      { id: "slide-6", type: "summary", title: "本堂重點", content: `① 類淋巴系統是大腦的專屬清潔機制——由膠質細胞驅動，腦脊髓液沖洗代謝廢物，2012年才被科學發現。
② 睡著時效率遠高於清醒時——腦細胞縮小讓間隙變大，這是只有睡眠才能達到的清潔條件。
③ 清除的廢物直接關聯神經退化疾病——β類澱粉蛋白堆積和阿茲海默症高度相關，每個不好的睡眠都讓清潔任務更重。
下一堂預告：深眠N3期間，身體同時在進行哪些修復工程。`, visual: '' }
      ],
      quizzes: [
      { id: "q1", question: "類淋巴系統（glymphatic system）的名稱來源是什麼？", options: ["因為它由淋巴細胞驅動，主要功能是免疫防禦","因為它結合了膠質細胞（glia）和淋巴（lymphatic）兩個概念，功能類似淋巴但在大腦中運作","因為它是淋巴系統在大腦中的延伸，直接連接到頸部淋巴結","因為它由神經膠質母細胞分泌的特殊液體驅動"], answer: 1, explanation: "正確答案是②。類淋巴（glymphatic）這個詞組合自glia（膠質細胞）和lymphatic（淋巴），由神經科學家麥肯・尼得嘉特命名，因為這個系統的功能類似全身的淋巴清潔系統，但由大腦中的星狀膠質細胞驅動，並非傳統淋巴系統的延伸。" },
      { id: "q2", question: "類淋巴系統在睡眠時效率大幅提升的主要原因是什麼？", options: ["睡眠時大腦溫度升高，加速了腦脊髓液的流速","睡眠期間膠質細胞分泌更多驅動液體的酵素","睡眠期間腦細胞體積縮小約60%，讓細胞間隙變大，腦脊髓液流通更有效率","睡眠時血腦屏障暫時開放，讓淋巴系統可以直接進入大腦"], answer: 2, explanation: "正確答案是③。研究發現，睡眠期間腦細胞的體積會縮小大約60%，這讓細胞之間的間隙顯著變大，腦脊髓液的流通效率因此大幅提升。這是類淋巴系統在睡眠中效率遠高於清醒時的主要機制。④是錯誤的——血腦屏障並不會在睡眠時開放。" },
      { id: "q3", question: "根據2019年《科學》期刊的研究，一個晚上的睡眠不足會造成什麼影響？", options: ["大腦的θ波活動減少，記憶鞏固效率下降","皮質醇分泌量立即增加三倍，引發急性壓力反應","大腦中的β類澱粉蛋白堆積量有可量測的增加","類淋巴系統完全停止運作，需要三天才能恢復"], answer: 2, explanation: "正確答案是③。2019年發表於《科學》期刊的研究顯示，即使健康受試者只是一個晚上睡眠不足，大腦中的β類澱粉蛋白堆積量就已有可量測的增加。這不是極端案例——它說明類淋巴清潔工作的效率在每個不好的睡眠夜晚都會下降。④說「完全停止」是誇大的，清醒時仍有部分運作，只是效率大幅降低。" },
      { id: "q4", question: "類淋巴系統主要清除哪些與神經退化疾病相關的物質？", options: ["多巴胺和血清素（與情緒調節有關的神經傳導物質）","β類澱粉蛋白和tau蛋白（與阿茲海默症相關的代謝廢物）","皮質醇和腎上腺素（與壓力反應相關的荷爾蒙）","膽固醇結晶（與腦血管疾病相關的沉積物）"], answer: 1, explanation: "正確答案是②。類淋巴系統清除的廢物包括β類澱粉蛋白（amyloid-β）和tau蛋白，這兩種蛋白質的異常堆積是阿茲海默症早期最重要的病理標誌。這也是為什麼睡眠研究者認為長期睡眠不足可能增加神經退化疾病的風險。其他選項的物質有各自的代謝管道，不是類淋巴系統的主要目標。" },
      { id: "q5", question: "以下哪個描述最準確說明了類淋巴系統與睡眠階段的關係？", options: ["類淋巴系統在REM快速動眼期效率最高，因為這時大腦最活躍","類淋巴系統在N1入眠期就已全速運作，因為這時肌肉最放鬆","類淋巴系統在所有睡眠階段效率完全相同，只要睡著就好","類淋巴清潔在N3深眠階段效率最高，這是大腦廢物清除的主要窗口"], answer: 3, explanation: "正確答案是④。類淋巴系統雖然在整個睡眠期間都比清醒時活躍，但在N3深眠階段效率最高。這也再次強調了深眠的不可替代性——不只有身體修復，連大腦的長期健康維護都依賴深眠的充足。①的REM期間腦波接近清醒，不是類淋巴效率最高的時間。" }
      ],
    },
    {
      id: "auto-vol3-lesson-4",
      title: "深睡眠與修復：身體的維修窗口",
      duration: 12,
      isFree: false,
      slides: [
      { id: "slide-1", type: "hook", title: "深眠期間你的身體在忙什麼？", content: `你有過運動後睡一覺感覺肌肉恢復了嗎？或者生病時多睡幾小時好像好得比較快？這不是心理作用。N3深眠是身體的維修時間，多個修復系統同時在這個窗口開工——而且你根本感覺不到，因為你睡得太沉了。`, visual: '' },
      { id: "slide-2", type: "deepdive", title: "生長激素：修復和再生的主要材料", content: `人體最大比例的生長激素（GH）在N3深眠剛開始後的幾十分鐘內分泌。在成人，生長激素負責修復運動後受損的肌肉、促進脂肪分解、加速細胞再生、維持骨密度。深眠不足→生長激素大幅減少→肌肉修復慢、脂肪代謝下降、細胞再生不足。這也是為什麼認真健身但忽略睡眠的人，增肌效果總是不如預期。`, visual: '' },
      { id: "slide-3", type: "concept", title: "免疫系統的夜間整頓", content: `深眠期間，細胞激素（cytokines）分泌增加，T細胞活性達到高峰。這些免疫細胞在這個時候「整頓部隊」、強化免疫記憶。研究顯示，睡眠不足的人接種疫苗後抗體反應顯著較低——代表你的免疫系統在睡眠不足時，連「學習新威脅」的能力都在下降。感冒多睡不只是感覺比較好，是T細胞在真的工作。`, visual: '' },
      { id: "slide-4", type: "deepdive", title: "心血管休息與夜間血壓下降", content: `健康的深眠期間，血壓會自然下降——醫學上叫做「夜間血壓下降（nocturnal dipping）」。這是心臟難得的真正休息時間。長期研究顯示，夜間血壓無法正常下降的人（non-dippers），心血管疾病風險顯著偏高。深眠不足→夜間血壓無法正常降低→心臟整晚承受更高壓力→長期心血管風險上升。`, visual: '' },
      { id: "slide-5", type: "concept", title: "常見誤解：只要感覺睡得沉就代表深眠夠了", content: `很多人以為「感覺睡很沉、早上很難被叫醒」就等於深眠充足。但睡眠感受和實際深眠比例不完全對應。長期壓力者、皮質醇節律失調者可能感覺「睡很沉」，但多導睡眠圖會顯示他們的N3比例其實很低。感受是參考，不是確定的指標。`, visual: '' },
      { id: "slide-6", type: "summary", title: "本堂重點", content: `① 生長激素在深眠爆發——肌肉修復、脂肪代謝、細胞再生都依賴這個窗口，運動後的恢復品質直接被睡眠品質決定。
② 免疫整頓在深眠進行——T細胞活性和抗體記憶能力在深眠時最強，睡不好就是主動削弱自己的免疫系統。
③ 深眠是心臟的休息時間——夜間血壓下降是健康睡眠的重要生理事件，長期無法達到是慢性心血管風險的無聲訊號。
下一堂預告：皮質醇和睡眠的拉鋸關係，以及為什麼壓力大的人特別難進入深眠。`, visual: '' }
      ],
      quizzes: [
      { id: "q1", question: "人體生長激素（GH）的分泌在一天中何時達到最高峰？", options: ["早晨起床後的30到45分鐘，對應皮質醇清醒反應的時間","N3深眠剛開始後的幾十分鐘內","下午三到四點，對應人體自然的精力低谷期","REM快速動眼期，因為大腦最活躍"], answer: 1, explanation: "正確答案是②。生長激素的最大單次分泌脈衝發生在N3深眠開始後的幾十分鐘內。這也是為什麼深眠不足的人即使睡了足夠時數，生長激素的分泌量也會大幅減少，影響肌肉修復和細胞再生。①的清晨高峰是皮質醇，不是生長激素。" },
      { id: "q2", question: "關於睡眠不足對免疫系統的影響，以下哪項是正確的？", options: ["睡眠不足讓免疫系統過度活化，增加自體免疫疾病風險","睡眠不足主要影響消化系統，對免疫功能影響有限","研究顯示睡眠不足者接種疫苗後，抗體反應顯著較低","睡眠不足只在連續超過72小時不睡後才會影響免疫功能"], answer: 2, explanation: "正確答案是③。研究確實顯示，睡眠不足的受試者在接種疫苗後，產生的抗體量顯著低於睡眠充足的人。這說明深眠不只是讓你感覺恢復，而是真正影響免疫系統的學習和記憶能力。①雖然慢性炎症與睡眠不足有關，但主要是免疫功能下降，不是「過度活化」。" },
      { id: "q3", question: "「夜間血壓下降（nocturnal dipping）」的意義是什麼？", options: ["這是病理現象，代表心臟在睡眠中輸出能力不足，需要治療","這是健康的生理現象，是深眠期間心血管系統得到休息的表現","這是所有人睡眠期間必然發生的現象，跟睡眠品質無關","這只發生在兒童和青少年，成人睡眠期間血壓不會有明顯變化"], answer: 1, explanation: "正確答案是②。夜間血壓下降是健康睡眠的正常生理事件，代表心臟在深眠期間得到真正的放鬆。無法出現夜間血壓下降（non-dipping）的人，心血管疾病風險顯著偏高。這不是病理，而是一個健康指標——夜間血壓「應該」下降。" },
      { id: "q4", question: "一個認真健身但深眠嚴重不足的人，最可能出現什麼狀況？", options: ["肌肉增長速度加快，因為運動後身體會分配更多資源給肌肉修復","體重快速下降，因為睡眠不足會加速新陳代謝","增肌效果不理想，肌肉恢復慢，因為生長激素分泌大幅減少","心肺功能快速提升，因為睡眠不足讓心臟持續處於訓練狀態"], answer: 2, explanation: "正確答案是③。深眠不足會導致生長激素分泌大幅下降，而生長激素正是肌肉修復和再生的主要材料。就算訓練強度足夠，沒有生長激素的峰值分泌，肌肉損傷的修復就會緩慢而不完整，增肌效果因此打折。④反而說反了——睡眠不足讓心臟持續承壓，是風險因子，不是訓練效果。" },
      { id: "q5", question: "以下哪個行為最能保護深眠的充足比例？", options: ["每天睡前做激烈運動，讓身體夠累才能進入深眠","服用強效安眠藥讓自己維持深度睡眠狀態","盡量在一致的時間入睡，避免熬夜讓深眠集中的前半夜被推遲","白天多睡午覺，讓深眠分散在24小時中進行"], answer: 2, explanation: "正確答案是③。N3深眠集中在睡眠的前三到四小時，因此入睡時間直接決定了你是否能在最有效的時間窗口得到深眠。保持一致且不太晚的入睡時間，是維護深眠比例最直接有效的方式。①睡前激烈運動反而會提高核心體溫和交感神經活性，延遲入睡。②一些安眠藥實際上會改變睡眠結構，不一定增加真正的N3深眠。" }
      ],
    },
    {
      id: "auto-vol3-lesson-5",
      title: "皮質醇與睡眠的拉鋸戰",
      duration: 12,
      isFree: false,
      slides: [
      { id: "slide-1", type: "hook", title: "你有沒有這樣的經驗？", content: `明明累了一整天、身體也很沉，但一躺下腦子就開始轉。或者凌晨兩三點突然醒來，腦袋清醒得不像話，再也睡不著。這不是失眠的個性，也不是太閒。很可能是你的皮質醇在夜間沒有乖乖下班。`, visual: '' },
      { id: "slide-2", type: "deepdive", title: "皮質醇的正常24小時曲線", content: `健康的皮質醇節律像一條山丘曲線：清晨起床後30–45分鐘急速升到全天最高點（皮質醇清醒反應），給你啟動能量；白天緩慢下降；傍晚到夜間持續走低，半夜前後降到最低。這個夜間低谷非常重要——皮質醇是喚醒荷爾蒙，它偏高的時候，深眠根本無法啟動。`, visual: '' },
      { id: "slide-3", type: "concept", title: "壓力大時皮質醇怎麼失調", content: `長期壓力讓HPA軸過度活化，皮質醇節律被破壞。最常見兩種模式：①夜間皮質醇偏高——本該下降的皮質醇維持在高位，讓你難以入睡、容易在凌晨兩三點驚醒。②清晨皮質醇反應遲鈍——HPA軸過度活化後疲勞，清晨反應減弱，起床後沒有啟動感，整個早上像在夢遊，依賴咖啡因。`, visual: '' },
      { id: "slide-4", type: "deepdive", title: "皮質醇與睡眠的惡性循環", content: `這個循環很殘忍：壓力升高→夜間皮質醇偏高→深眠減少→睡眠品質低落→睡眠不足本身就是壓力源→皮質醇進一步升高。你不是「睡不好的體質」，你是陷入了一個荷爾蒙層面的自我強化迴圈。打破它的起點不是更努力睡覺，而是從減少皮質醇的觸發來源開始。`, visual: '' },
      { id: "slide-5", type: "concept", title: "常見誤解：努力放空腦袋就能解決睡眠問題", content: `很多人睡不好會告訴自己「不要想那麼多」、「睡前放鬆就好了」。但如果問題根源在皮質醇節律失調，意志力式的「放空」效果非常有限。這是一個荷爾蒙問題，需要的是減少白天的壓力累積、建立讓神經系統感知安全的習慣，而不只是睡前那幾分鐘的努力。`, visual: '' },
      { id: "slide-6", type: "summary", title: "本堂重點", content: `① 夜間皮質醇低是深眠的前提——皮質醇這個喚醒荷爾蒙偏高，深眠就無法啟動，是壓力者睡眠差的核心機制。
② 長期壓力造成兩種節律失調——夜間皮質醇偏高（難以入睡/半夜驚醒）或清晨皮質醇反應遲鈍（起床困難/依賴咖啡因），兩種模式代表不同的HPA軸失衡狀態。
③ 睡眠不足會讓皮質醇繼續升高——這個惡性循環是自我強化的，打破它需要從壓力根源著手，而不只是改善睡前習慣。
下一堂預告：自律神經失調的人為什麼特別難入睡或維持睡眠。`, visual: '' }
      ],
      quizzes: [
      { id: "q1", question: "正常的「皮質醇清醒反應（cortisol awakening response）」發生在什麼時間，有什麼作用？", options: ["睡前一小時，讓皮質醇達到高峰後再下降，幫助入睡","清醒後30–45分鐘，皮質醇急速升到全天最高點，提供啟動能量","深眠N3後，皮質醇短暫升高讓身體切換到修復模式","午睡後，皮質醇回升幫助下午的清醒與專注"], answer: 1, explanation: "正確答案是②。皮質醇清醒反應是指起床後30–45分鐘內皮質醇急速升到全天最高點的生理現象，它的功能是幫助身體從睡眠模式切換到清醒模式，提供早晨的啟動能量。這個反應如果消失（HPA軸疲勞的表現），人會起床後長時間無法清醒，特別依賴外部刺激（如咖啡因）才能運作。" },
      { id: "q2", question: "長期壓力者在凌晨兩三點容易突然清醒的最可能神經/荷爾蒙原因是什麼？", options: ["褪黑激素分泌在凌晨達到高峰，讓睡眠變淺","腎上腺素的夜間分泌波動，觸發短暫的驚醒","夜間皮質醇出現異常小高峰，足以打斷睡眠連續性","腺苷在凌晨被完全清除，睡眠壓力消失導致清醒"], answer: 2, explanation: "正確答案是③。長期壓力者的皮質醇節律失調，夜間皮質醇無法正常下降，有時反而在凌晨兩三點出現異常小高峰。皮質醇作為喚醒荷爾蒙，這個小高峰足以讓人從睡眠中被喚醒，且醒後大腦可能異常清醒、難以再入睡。這是壓力性失眠的典型表現之一。" },
      { id: "q3", question: "皮質醇和睡眠之間的惡性循環，哪個描述最正確？", options: ["睡眠太多會抑制皮質醇分泌，形成越睡越累的循環","壓力→皮質醇升高→睡眠變差→睡眠不足成為新的壓力源→皮質醇繼續升高","皮質醇升高讓人入睡更快，但深眠品質下降，形成「睡得多但沒休息到」的循環","壓力讓皮質醇消耗加速，長期壓力後皮質醇耗盡，導致睡眠過多"], answer: 1, explanation: "正確答案是②。這個惡性循環的關鍵在於睡眠不足本身就是一種生理壓力源，會刺激皮質醇的進一步分泌，而皮質醇升高又會壓制深眠，讓睡眠品質繼續惡化。這個自我強化的迴圈是長期失眠者難以自行走出的核心原因之一。③雖然有一定道理，但「睡得更快」並不是壓力下的典型表現。" },
      { id: "q4", question: "一個人起床後需要一個多小時才能進入狀態，特別依賴咖啡因才能清醒，最可能對應哪種皮質醇失調模式？", options: ["夜間皮質醇偏高，讓深眠無法啟動","清晨皮質醇清醒反應遲鈍，缺乏啟動身體的荷爾蒙訊號","皮質醇24小時均勻偏高，導致睡眠和清醒的節律均被干擾","皮質醇在下午達到異常高峰，讓清晨分泌不足"], answer: 1, explanation: "正確答案是②。清晨皮質醇清醒反應減弱是HPA軸長期過度活化後的另一種失調模式——軸系「疲勞」後，清晨應有的皮質醇高峰消失或大幅減弱，身體缺少了自然的啟動訊號，因此需要很長時間或外部刺激才能清醒。這和夜間皮質醇偏高是同一個節律失調問題的不同表現。" },
      { id: "q5", question: "如果一個人的睡眠問題根源是皮質醇節律失調，以下哪種做法最有效？", options: ["睡前努力「放空腦袋」，用意志力壓制思緒","增加睡前儀式（如泡澡、喝茶），直接提升褪黑激素","從減少白天的壓力累積和幫助神經系統感知安全著手，而不只依賴睡前的放鬆技巧","提前兩小時入睡，讓深眠時間更充裕"], answer: 2, explanation: "正確答案是③。皮質醇節律失調是一個荷爾蒙問題，其根源在於白天的慢性壓力累積和神經系統長期無法感知安全。僅靠睡前的放鬆技巧效果有限，因為節律的問題需要整天的調整，不只是睡前那幾分鐘。①只是意志力策略，對荷爾蒙問題無法從根本改變；②有一定效果但不是根本解決。" }
      ],
    },
    {
      id: "auto-vol3-lesson-6",
      title: "為什麼失調的人很難入睡或維持睡眠",
      duration: 12,
      isFree: false,
      slides: [
      { id: "slide-1", type: "hook", title: "你怕過「我今晚一定又睡不著」嗎？", content: `有些人一到睡前就心跳加速、頭皮發麻、腦子開始轉。有些人可以入睡，但凌晨三點突然醒來就再也睡不著。他們去看醫生，被說「是焦慮型失眠」——但沒有人告訴他們這跟自律神經系統的具體運作有什麼關係。`, visual: '' },
      { id: "slide-2", type: "deepdive", title: "入睡需要兩個條件同時成立", content: `從神經科學的角度，入睡需要：①腺苷壓力夠高（清醒期間累積的「想睡感」）。②自律神經成功從交感模式切換到副交感模式。這兩個條件缺一不可。問題是：長期壓力讓交感神經持續亢奮，就算腺苷夠了、燈也關了，切換還是無法發生。你的身體還在備戰模式。`, visual: '' },
      { id: "slide-3", type: "concept", title: "睡前過度激醒：生理與認知兩個面向", content: `「睡前過度激醒」是交感神經無法安靜的結果。它有兩個面向：①生理激醒——心跳加速、肌肉緊繃、體溫偏高、皮質醇偏高。②認知激醒——腦袋轉不停、反覆回想或預期擔憂。最殘忍的是：對「失眠本身的恐懼」會形成預期焦慮，預期焦慮又讓交感神經提前上線，讓失眠自我實現。`, visual: '' },
      { id: "slide-4", type: "deepdive", title: "為什麼半夜突然清醒？", content: `維持睡眠的問題有幾個常見機制：①夜間皮質醇異常小高峰（凌晨兩三點）直接喚醒；②睡眠結構過淺，整晚在N2和REM之間徘徊，稍微有刺激就醒；③身體慢性不適（肌肉緊繃、胃食道逆流、磨牙）干擾睡眠連續性。這些都是自律神經調節失衡在睡眠中的具體表現。`, visual: '' },
      { id: "slide-5", type: "concept", title: "常見誤解：失眠是因為睡覺「沒有努力」", content: `最傷人的誤解是：失眠是意志力問題、是你不夠努力放鬆。但從神經科學的角度，失眠是「神經系統過度激醒」的狀態問題，不是個性問題。你越努力「強迫自己睡覺」，反而越強化了床與焦慮的連結。有效的解法是幫助神經系統感知安全，讓切換自然發生，而不是更用力。`, visual: '' },
      { id: "slide-6", type: "summary", title: "本堂重點", content: `① 入睡需要神經系統切換成功——腺苷夠了不夠，自律神經還要真的切換；長期交感亢奮是最常見的入睡障礙根源。
② 睡前過度激醒有兩個面向——生理的（心跳、體溫、皮質醇）和認知的（思緒、預期焦慮），兩者可以互相強化。
③ 半夜驚醒也是神經調節問題——皮質醇夜間高峰、睡眠過淺、身體慢性不適都是機制，不是「身體沒問題」。
下一堂預告：手機、藍光和螢幕怎麼從生理層面干擾你的睡眠機制。`, visual: '' }
      ],
      quizzes: [
      { id: "q1", question: "從神經科學角度看，「入睡」需要哪兩個核心條件同時成立？", options: ["體溫下降到攝氏36度以下，以及室內完全黑暗","腺苷壓力夠高（睡眠驅力充足），以及自律神經從交感切換到副交感模式","皮質醇降到基準線，以及褪黑激素達到分泌高峰","身體靜止不動超過20分鐘，以及腦波進入θ波狀態"], answer: 1, explanation: "正確答案是②。入睡需要腺苷壓力（清醒期間累積的睡眠驅力）夠高，以及自律神經從交感主導成功切換到副交感主導。①和③雖然都與睡眠有關，但不是最核心的必要條件描述；而且③的褪黑激素達到高峰通常是切換的結果，不是前提條件。" },
      { id: "q2", question: "「睡前過度激醒（pre-sleep hyperarousal）」最準確的描述是什麼？", options: ["睡前喝太多水或吃太多導致身體過度活躍","交感神經無法在應該安靜的時候安靜，同時出現生理激醒和認知激醒的狀態","褪黑激素在睡前過度分泌，反而讓大腦進入警戒模式","睡前劇烈運動後腎上腺素殘留，短暫維持高度清醒狀態"], answer: 1, explanation: "正確答案是②。睡前過度激醒是指交感神經系統在本該降速的睡前時間無法切換的狀態，同時包含生理面向（心跳、體溫、皮質醇）和認知面向（思緒轉個不停、預期擔憂）。這是長期壓力者失眠最常見的直接機制。" },
      { id: "q3", question: "「預期焦慮（anticipatory anxiety）」在失眠中如何形成惡性循環？", options: ["預期白天的工作壓力讓大腦提前分泌皮質醇，直接干擾入睡","對「今晚又要睡不著」的恐懼，讓交感神經在躺下前就提前上線，使失眠自我實現","對床的舒適度不滿意，讓大腦持續保持對環境的警覺","預期鬧鐘時間太早，讓身體自動縮減睡眠以提前清醒"], answer: 1, explanation: "正確答案是②。預期焦慮是失眠惡化的關鍵機制：當一個人多次經歷失眠後，開始恐懼「今晚又睡不著了」，這份恐懼本身就讓交感神經在躺下前就已激活，讓本來可能入睡的人更難入睡——失眠因此自我實現。這在臨床上叫做「睡眠相關過度激醒（sleep-related hyperarousal）」。" },
      { id: "q4", question: "長期自律神經失調的人半夜在凌晨兩三點突然清醒，最可能的直接原因是什麼？", options: ["這個時間是REM睡眠比例最高的時段，做夢讓人自然清醒","凌晨兩三點是深眠和淺眠之間的周期交界，所有人都會在這時醒來","夜間皮質醇出現異常小高峰，作為喚醒荷爾蒙讓睡眠中斷","褪黑激素在凌晨三點後開始下降，睡眠自然減輕"], answer: 2, explanation: "正確答案是③。長期壓力者的皮質醇節律失調，夜間皮質醇有時在凌晨兩三點出現異常小高峰。皮質醇是喚醒荷爾蒙，這個夜間高峰足以打斷睡眠連續性，讓人突然清醒且腦袋清醒、難以再入睡。①雖然REM後半夜比例確實增加，但並非所有人都因此清醒。" },
      { id: "q5", question: "從神經科學的角度，處理「入睡困難」最有效的核心策略是什麼？", options: ["強迫自己待在床上直到入睡，訓練身體的睡眠意志力","每晚在相同時間服用安眠藥，讓大腦建立睡前的條件反射","幫助神經系統感知安全，讓交感到副交感的切換自然發生，而非強迫入睡","減少白天的所有活動，保留能量給夜間睡眠使用"], answer: 2, explanation: "正確答案是③。入睡困難的核心是交感神經無法切換，有效策略是幫助神經系統感知安全（降低威脅評估、讓副交感神經主導自然啟動），而不是更用力「強迫」入睡——強迫反而會增加焦慮，強化過度激醒狀態。①甚至可能加重對床的負面聯想，②有一定效果但有依賴性問題。" }
      ],
    },
    {
      id: "auto-vol3-lesson-7",
      title: "手機、藍光、螢幕：現代睡眠的敵人",
      duration: 10,
      isFree: false,
      slides: [
      { id: "slide-1", type: "hook", title: "你睡前會看手機嗎？", content: `「睡前滑一下手機讓自己放鬆」是很多人的習慣。問題不是你太沉迷，而是那個螢幕的光線，正在透過你的眼睛、沿著一條你不知道的神經路徑，直接告訴你的大腦「現在才中午兩點」。`, visual: '' },
      { id: "slide-2", type: "deepdive", title: "從眼睛到生理時鐘的直達路線", content: `眼睛裡有一種特殊的感光細胞叫「黑視素細胞（ipRGCs）」，對460–480奈米的藍光特別敏感。它們有一條直達下視丘「視交叉上核（SCN）」的神經路徑——SCN是調控生理時鐘的主控中心。藍光→黑視素細胞→SCN→「現在是白天」→抑制松果體分泌褪黑激素。這不是你的大腦不夠聰明，是演化設計。`, visual: '' },
      { id: "slide-3", type: "concept", title: "晚上看兩小時手機等於撥慢了生理時鐘", content: `研究顯示，晚上使用手機兩小時可以讓褪黑激素的分泌時間延遲約90分鐘——相當於你的生理時鐘被往後撥了一個半小時。如果你每天都這樣，你的睡意會越來越晚才出現，入睡時間自然後移，即使你知道要早點睡，你的身體不接受。`, visual: '' },
      { id: "slide-4", type: "deepdive", title: "不只是藍光：螢幕內容也是問題", content: `就算你開了護眼模式把藍光大幅濾除，螢幕還有另一個問題：內容帶來的認知和情緒刺激。短影音讓大腦維持高度注意力、社群媒體觸發情緒反應、新聞讓大腦持續處理資訊——這些都是交感神經的刺激劑，讓你在本該降速的時間繼續亢奮。放下手機後，大腦的「轉速」還需要時間才能降下來。`, visual: '' },
      { id: "slide-5", type: "concept", title: "常見誤解：護眼模式已經解決了藍光問題", content: `護眼模式（Night Shift / 夜間模式）確實減少了部分藍光，對褪黑激素抑制有一定緩解效果。但它沒有辦法解決內容帶來的認知激醒，也不能完全消除光線對生理時鐘的影響。護眼模式是「比不開好一點」，不等於「跟不看手機一樣」。`, visual: '' },
      { id: "slide-6", type: "summary", title: "本堂重點", content: `① 藍光透過黑視素細胞直達生理時鐘——這是演化設計的神經路徑，不是你的意志力能夠覆蓋的。
② 兩小時的手機可以延遲褪黑激素分泌90分鐘——長期如此，你的睡意越來越晚，生理時鐘被固定在「夜貓子模式」。
③ 護眼模式擋不住認知激醒——內容帶來的交感神經刺激是獨立的問題，是睡前螢幕使用的另一半問題。
下一堂預告：睡前焦慮——大腦為什麼在最需要關機的時候偏偏選擇開機。`, visual: '' }
      ],
      quizzes: [
      { id: "q1", question: "眼睛中的「黑視素細胞（ipRGCs）」對哪種光線最敏感？", options: ["紅光（波長620–750奈米），因為紅光能量最高","綠光（波長520–560奈米），因為人眼對綠光感知最強","藍光（波長460–480奈米），因為這是調控生理時鐘最主要的光訊號","紫外線（波長400奈米以下），因為它能穿透眼球最深"], answer: 2, explanation: "正確答案是③。黑視素細胞（ipRGCs）對波長460–480奈米的藍光特別敏感，這正是手機、平板、電腦、LED燈具大量發出的光線頻段。它們透過直達下視丘視交叉上核的神經路徑，傳遞「現在是白天」的訊號，抑制褪黑激素分泌。" },
      { id: "q2", question: "晚上使用手機兩小時，大約會讓褪黑激素的分泌時間延遲多久？", options: ["約15–20分鐘，影響很小可以忽略","約30–45分鐘，相當於輕度時差","約90分鐘，相當於生理時鐘被往後撥一個半小時","約4小時，足以讓人完全無法感到睡意"], answer: 2, explanation: "正確答案是③。研究顯示，晚上使用手機兩小時可以讓褪黑激素的分泌時間延遲約90分鐘。這意味著你的身體會更晚才感到睡意——如果長期如此，就形成了系統性的入睡時間後移，也就是「社交夜貓子模式」的其中一個成因。" },
      { id: "q3", question: "「護眼模式（Night Shift）」對睡眠的影響，哪個描述最準確？", options: ["護眼模式完全消除藍光，開啟後和不看手機效果一樣","護眼模式對睡眠沒有任何幫助，純粹是安慰劑效果","護眼模式能部分減少藍光，但無法解決螢幕內容帶來的認知激醒問題","護眼模式會把藍光轉換成對生理時鐘有益的紅光，主動促進褪黑激素分泌"], answer: 2, explanation: "正確答案是③。護眼模式（Night Shift或夜間模式）確實減少了部分藍光輸出，對褪黑激素抑制有一定緩解，但有兩個問題：①它不能完全消除藍光影響；②它完全無法解決螢幕內容（短影音、社群媒體、新聞）帶來的認知和情緒激醒。因此「開了護眼模式等於沒問題」是過度樂觀的誤解。" },
      { id: "q4", question: "長期每天晚上使用手機到很晚，最可能對生理時鐘造成什麼影響？", options: ["生理時鐘逐漸向前移，讓人越來越早感到睡意","生理時鐘逐漸向後移，越來越晚才感到睡意，入睡時間系統性後移","生理時鐘被固定，讓人每天在完全相同的時間感到睡意","生理時鐘的敏感度增加，讓人對光線的刺激反應更強烈"], answer: 1, explanation: "正確答案是②。長期夜晚接觸藍光，生理時鐘會逐漸被重新設定——越來越晚才接收到「天黑了」的訊號，褪黑激素分泌時間後移，睡意越來越晚才出現，形成「夜貓子模式」。這是一個可以真正改變生理時鐘設定點的過程，不是短期習慣，需要時間調整。" },
      { id: "q5", question: "除了藍光之外，睡前使用螢幕的另一個問題是什麼？", options: ["螢幕發出的微弱電磁波干擾腦波，讓N3深眠無法啟動","長時間盯著螢幕讓眼睛疲勞，這種疲勞反而讓大腦更難放鬆","螢幕內容（短影音、社群媒體、新聞）帶來的認知和情緒激醒，讓交感神經繼續亢奮","螢幕的散熱讓床鋪環境溫度升高，破壞入睡所需的核心體溫下降"], answer: 2, explanation: "正確答案是③。獨立於藍光之外，螢幕內容本身帶來的認知和情緒刺激是睡前使用螢幕的另一個核心問題。短影音設計讓大腦持續保持高注意力狀態，社群媒體觸發各種情緒反應，這些都是交感神經的刺激劑，讓神經系統在本該降速時繼續亢奮。就算護眼模式把藍光擋掉，這個問題仍然存在。" }
      ],
    },
    {
      id: "auto-vol3-lesson-8",
      title: "睡前焦慮：大腦不肯關機的原因",
      duration: 10,
      isFree: false,
      slides: [
      { id: "slide-1", type: "hook", title: "為什麼偏偏躺下去才開始胡思亂想？", content: `白天很忙、很正常，但一躺下來，腦子就開始回放：今天說錯的話、明天的報告、那封還沒回的信。你越告訴自己「不要想了」，那些念頭越清晰。你躺在黑暗裡一個小時，心還是跳，腦還是轉。這不是你的問題——這是大腦的一個叫做預設模式網絡的系統，在你最需要它閉嘴的時候，拿回了主導權。`, visual: '' },
      { id: "slide-2", type: "deepdive", title: "預設模式網絡：任務消失後的自動播放", content: `大腦有一個「預設模式網絡（Default Mode Network，DMN）」，在你不專注於外在任務時自動啟動，主要功能是回顧過去和預測未來。白天你的任務讓「任務正向網絡」保持活躍，壓制了DMN。夜晚，任務消失，DMN拿回主導權，開始自動播放——而且它特別擅長聚焦在未解決問題和潛在威脅上。`, visual: '' },
      { id: "slide-3", type: "concept", title: "杏仁核的夜間值班", content: `焦慮的核心來自杏仁核——大腦的威脅偵測器。前額葉皮質在清醒專注時能夠壓制杏仁核（理性蓋過情緒）。但前額葉在疲憊和準備入睡時功能下降，對杏仁核的抑制減弱，杏仁核趁機放大白天被壓下去的不安感。對長期壓力者，杏仁核本就過度敏感，夜間值班格外賣力。`, visual: '' },
      { id: "slide-4", type: "deepdive", title: "「越努力不想越想」的神經機制", content: `「不要想那個念頭」這個指令在心理學上有著名的反效果（白熊效應）：壓制一個念頭需要一部分心理資源來「監控」它是否消失，這個監控過程讓那個念頭持續在工作記憶中保持活躍。更有效的方式是「接觸而不評判」——允許念頭存在，不跟它辯論，讓它自然流過。`, visual: '' },
      { id: "slide-5", type: "concept", title: "常見誤解：睡前胡思亂想是壞習慣，努力改掉就好了", content: `這不是習慣問題，是神經結構的運作方式。預設模式網絡在你不給它任務的時候就會啟動，這是正常的大腦功能，不是你管不住自己的心。對付它的方式不是壓制，而是給它「溫和的佔據」——比如輕柔的身體掃描、關注呼吸，給DMN一個低威脅的「任務」，避免它去跑高威脅的預測和回顧。`, visual: '' },
      { id: "slide-6", type: "summary", title: "本堂重點", content: `① 預設模式網絡是睡前思緒的主要來源——外部任務消失後自動啟動，聚焦在問題和威脅上，這是正常的神經運作，不是你的意志力問題。
② 杏仁核在前額葉抑制減弱時放大焦慮——長期壓力讓杏仁核過度敏感，夜晚前額葉功能下降讓它更難被控制。
③ 接觸而不評判比強行壓制更有效——監控「不要想」本身就讓念頭更活躍；給大腦溫和的佔據是更有神經科學根據的策略。
下一堂預告：補眠到底有沒有用？週末多睡能還清睡眠債嗎？`, visual: '' }
      ],
      quizzes: [
      { id: "q1", question: "「預設模式網絡（Default Mode Network，DMN）」在什麼狀況下最活躍？", options: ["當你正在專注執行一個困難的工作任務時","當你不專注於外在任務、處於放空或休息狀態時","當你在快速動眼期（REM）做夢的時候","當你剛喝完咖啡、大腦高度清醒時"], answer: 1, explanation: "正確答案是②。預設模式網絡（DMN）在你沒有專注於外在任務時自動啟動，這也是它的名字來源——「預設」代表不做事時的大腦預設狀態。它主要的功能包括回顧過去、預測未來、自我反思——這也解釋了為什麼躺下來後腦子才開始轉：外在任務消失，DMN拿回了主導權。" },
      { id: "q2", question: "關於「杏仁核」在睡前焦慮中的角色，哪個描述最正確？", options: ["杏仁核在睡眠時完全關閉，不影響入睡","杏仁核只在清醒時偵測威脅，入睡後停止運作","前額葉在疲憊時抑制杏仁核的能力下降，讓杏仁核在夜晚放大焦慮","杏仁核在REM期間最活躍，是做惡夢的主要原因"], answer: 2, explanation: "正確答案是③。前額葉皮質在清醒專注時能夠抑制杏仁核的衝動反應（這就是「理性壓制情緒」的神經基礎）。但前額葉在疲憊和準備進入睡眠時功能下降，對杏仁核的抑制作用減弱，讓杏仁核在夜晚更容易放大未解決的焦慮和不安。這對長期壓力者（杏仁核本就過度敏感）尤其明顯。" },
      { id: "q3", question: "「白熊效應」在睡前焦慮管理中說明了什麼？", options: ["睡前看可愛動物圖片可以讓大腦放鬆，加速入睡","極地居民因為沒有接觸到白熊的壓力，普遍睡眠品質更好","越努力壓制一個念頭，那個念頭反而越清晰，因為壓制本身需要持續監控它","把焦慮念頭想像成北極熊可以讓它變得可愛無害，消解焦慮"], answer: 2, explanation: "正確答案是③。「白熊效應」（ironic process theory）是心理學家Daniel Wegner的研究發現：當你試圖壓制一個念頭（比如「不要想白熊」），你的大腦需要一部分資源來監控「有沒有在想」，這個監控過程讓那個念頭反而更活躍。這解釋了為什麼睡前「不要想那個念頭」的指令反而讓念頭更清晰。" },
      { id: "q4", question: "「接觸而不評判（non-judgmental awareness）」作為睡前焦慮管理策略，其神經科學依據是什麼？", options: ["讓念頭流過而不追逐，可以避免啟動監控迴路，讓杏仁核自然降溫","評判念頭會產生多巴胺，讓大腦過度活躍；不評判可以抑制多巴胺","強迫自己接受所有念頭可以讓前額葉停止活動，快速入睡","不評判念頭可以讓預設模式網絡完全關閉，停止睡前的胡思亂想"], answer: 0, explanation: "正確答案是①。「接觸而不評判」的神經科學依據在於：允許念頭存在而不追逐或壓制，可以避免啟動那個會讓念頭更活躍的「監控迴路」。同時，不帶評判的觀察有助於降低杏仁核對那個念頭的威脅評估，讓焦慮情緒自然降溫，而非被對抗和強化。④不正確——DMN不會被「關閉」，只能被引導到低威脅的佔據。" },
      { id: "q5", question: "以下哪種睡前方式最符合神經科學對抗預設模式網絡（DMN）的建議？", options: ["把所有待辦事項在腦中仔細回顧一遍，確認已安排好，讓大腦放心後入睡","進行輕柔的身體掃描或關注呼吸，給DMN一個低威脅的「溫和佔據」","強迫自己想像只有白色空白，完全清空大腦","反覆在腦中對每個焦慮念頭進行邏輯反駁，直到不再有焦慮"], answer: 1, explanation: "正確答案是②。身體掃描或專注呼吸給大腦一個「任務」，但這個任務的威脅性非常低，既佔據了DMN（防止它跑去做高威脅的回顧和預測），又不會觸發交感神經。①雖然有人覺得有效，但回顧待辦事項本身是高威脅認知活動，往往讓DMN更活躍。③的「完全清空」幾乎不可能且反而造成壓力。" }
      ],
    },
    {
      id: "auto-vol3-lesson-9",
      title: "補眠有用嗎？週末多睡能還債嗎？",
      duration: 10,
      isFree: false,
      slides: [
      { id: "slide-1", type: "hook", title: "「週末補回來就好了」是真的嗎？", content: `很多人平日睡不夠，用這句話安慰自己：「週末補回來就好了。」週六睡到中午，確實感覺好很多。但週一早上，那個昏沉又回來了，好像補眠撐不了多久。你有沒有想過，補眠到底補到了什麼，又沒有補到什麼？`, visual: '' },
      { id: "slide-2", type: "deepdive", title: "睡眠債是真的，但「還清」沒那麼簡單", content: `睡眠科學確實使用「睡眠債」這個概念——連續睡眠不足會累積虧欠，反映在越來越強的睡意和越來越差的認知表現。研究顯示，連續五天每晚睡六小時後補眠兩天，注意力測試分數確實回升——但兩週後追蹤，認知基線仍低於睡眠充足的對照組。補眠有效，但效果是部分的、暫時的。`, visual: '' },
      { id: "slide-3", type: "concept", title: "補眠補不到的兩個面向", content: `①腺苷壓力可以清除，但神經損傷不是。睡眠不足期間大腦已承受結構性壓力，微型睡眠增加、工作記憶受損——這些不會因為多睡兩天立刻復原。②補眠的睡眠結構不對。你最需要的N3深眠主要在前半段，補眠時你已經睡了足夠的深眠，額外的時間多半是N2淺眠和REM，不是你最欠缺的部分。`, visual: '' },
      { id: "slide-4", type: "deepdive", title: "社交時差：補眠的隱藏代價", content: `週末睡到很晚，週一需要早起——這個節律落差叫做「社交時差（social jetlag）」。研究顯示，社交時差超過一小時就開始影響代謝健康、情緒穩定和認知表現。你補了一點睡眠債，但也欠了一筆生理時鐘的帳。週一特別難受，不只是「週末玩太嗨」，是生理時鐘的真實節律衝擊。`, visual: '' },
      { id: "slide-5", type: "concept", title: "常見誤解：補眠沒有任何效果，完全浪費時間", content: `走到另一個極端也不對。補眠在短期急性睡眠不足後效果相對顯著，腺苷清除、睡意消退、部分認知功能回升。對長期睡眠不足者，補眠是緩解，不是根治。關鍵是補眠不偏離平日作息太多（建議不超過一小時），以減少社交時差；同時把精力放在找出長期睡不好的根本原因。`, visual: '' },
      { id: "slide-6", type: "summary", title: "本堂重點", content: `① 補眠有效但效果有限——腺苷可以清除，但神經損傷的修復需要更長時間；連續五天睡六小時的代價，不是兩天補眠就能完全抹除。
② 補眠的睡眠結構不等於平日睡眠——額外的睡眠時間多半是淺眠和REM，不是最欠缺的N3深眠，修復效果打折扣。
③ 社交時差是補眠的隱藏代價——週末晚睡晚起打亂生理時鐘，週一的痛苦不只是心理，是真實的節律衝擊。
下一堂預告：你怎麼評估自己的睡眠品質？有什麼具體指標和工具？`, visual: '' }
      ],
      quizzes: [
      { id: "q1", question: "關於「補眠」的效果，以下哪個描述最符合目前的睡眠研究？", options: ["補眠完全無效，睡眠債一旦欠下就永遠無法還清","補眠效果完整，一天的補眠可以完全消除前一週的睡眠不足影響","補眠能部分緩解睡眠不足的影響，但效果有限，不能完全修復神經層面的損傷","補眠只對青少年有效，成人的神經系統已固定，補眠後認知功能不會提升"], answer: 2, explanation: "正確答案是③。研究（如賓州大學Dinges團隊的研究）顯示，補眠確實能讓部分指標（如注意力測試分數）回升，但長期追蹤後，補眠組的基準認知表現仍低於睡眠充足的對照組。這說明補眠的效果是真實的，但是部分的、暫時的——睡眠不足期間的神經損傷不會因為短期補眠完全消除。" },
      { id: "q2", question: "「社交時差（social jetlag）」是什麼？", options: ["出國旅行跨時區後，身體需要幾天才能適應新時區的睡眠節律","平日睡眠時間與週末睡眠時間的落差，形成類似時差的生理節律衝擊","使用社群媒體到深夜導致的睡眠延遲，讓隔天上班時疲憊不堪","工作時差輪班讓生理時鐘混亂，對社交生活和工作表現都造成影響"], answer: 1, explanation: "正確答案是②。社交時差是指平日（受工作時間限制）的睡眠作息與週末（自由選擇）的睡眠作息之間的節律落差。週末晚睡晚起，週一早起，這個落差對身體造成類似跨時區時差的衝擊，影響代謝、情緒和認知表現。即使只有一小時的差距也開始有可量測的影響。" },
      { id: "q3", question: "為什麼補眠時睡到很久，對「N3深眠」的補充效果有限？", options: ["因為補眠期間皮質醇特別高，會壓制N3深眠的發生","因為N3深眠需要在特定的床舖環境才能發生，補眠環境通常不達標","因為N3深眠主要集中在睡眠的前半段，補眠時已完成了正常的深眠配額，額外時間多為淺眠和REM","因為補眠時大腦知道是補眠狀態，刻意減少深眠以維持整體節律"], answer: 2, explanation: "正確答案是③。N3深眠主要集中在睡眠的前三到四小時。當你補眠時，你的身體在那段時間已經完成了正常的深眠配額（甚至比平日更多，因為深眠驅力高）；多出來的睡眠時間主要以N2淺眠和REM形式出現，這些不是你最欠缺的修復類型，補眠的生理修復效果因此有限。" },
      { id: "q4", question: "研究顯示「社交時差」超過多少時間開始對健康有可量測的影響？", options: ["超過30分鐘","超過1小時","超過3小時","超過5小時"], answer: 1, explanation: "正確答案是②。研究顯示，社交時差（平日vs週末睡眠時間差距）超過一小時，就開始出現可量測的影響，包括代謝健康（血糖調節）、情緒穩定度和認知表現。這個數字比大多數人預期的要小——很多人週末多睡兩三小時，社交時差的代價其實相當顯著。" },
      { id: "q5", question: "關於補眠，以下哪個做法最能減少社交時差的負面影響？", options: ["週末完全不補眠，嚴格維持平日的睡眠時間","週末補眠時間不超過平日起床時間一小時，盡量縮小節律落差","週末大量補眠（如睡到下午），然後週一強制早起適應節律","週五晚上提早入睡，讓週六可以在正常時間起床同時補到更多睡眠"], answer: 1, explanation: "正確答案是②。最能平衡「補到一些睡眠」和「減少社交時差」的策略，是讓週末的起床時間不偏離平日起床時間太多——建議不超過一小時。這樣既能讓身體多得到一些睡眠，又不會讓生理時鐘嚴重偏移，減少週一的節律衝擊。④雖然有一定道理，但控制入睡時間對大多數人來說比控制起床時間更難。" }
      ],
    },
    {
      id: "auto-vol3-lesson-10",
      title: "睡眠品質的指標：你的睡眠健康嗎？",
      duration: 10,
      isFree: false,
      slides: [
      { id: "slide-1", type: "hook", title: "你能說清楚自己的睡眠品質嗎？", content: `「睡眠品質怎麼樣？」「不太好……但說不上來哪裡不好，就是感覺不夠。」這是很多人面對這個問題時的回答。我們對自己睡眠的了解，往往只停留在「感覺好不好」。但評估睡眠健康有更具體的指標，不需要儀器，從今天開始就可以觀察。`, visual: '' },
      { id: "slide-2", type: "deepdive", title: "你的身體每天在給你的五個報告", content: `①起床感受：醒來感覺恢復了嗎？②白天精力弧線：有沒有嚴重的午後崩潰、高度依賴咖啡因？③入睡時間：5–20分鐘是正常範圍，超過30分鐘是入睡困難的警訊。④半夜驚醒頻率：一週三次以上醒超過20分鐘是維持睡眠問題。⑤早上清醒速度：超過一小時才進入狀態可能是深眠不足或皮質醇清醒反應遲鈍。這五個指標不需要任何工具，你每天都可以觀察。`, visual: '' },
      { id: "slide-3", type: "concept", title: "客觀工具：從日記到多導睡眠圖", content: `如果你想要更具體的資訊：①睡眠日記（最便宜最實用）：每天記錄入睡時間、起床時間、醒來次數、早上感受，一週的日記能呈現你感覺捕捉不到的模式。②穿戴裝置（Apple Watch、Oura Ring等）：可以追蹤HRV趨勢和估計睡眠階段，數字供參考，趨勢更有意義。③多導睡眠圖（PSG）：最精準，但需在睡眠中心進行，懷疑有睡眠呼吸中止或嚴重失眠時使用。`, visual: '' },
      { id: "slide-4", type: "deepdive", title: "SATED：五個維度的睡眠健康框架", content: `S（Satisfaction）滿意度：你對睡眠整體滿意嗎？A（Alertness）清醒度：白天的清醒程度是否充足？T（Timing）時機：你的睡眠時間與生理時鐘一致嗎？E（Efficiency）效率：躺著的時間vs睡著的時間，健康通常超過85%。D（Duration）時數：總睡眠時間是否充足？這五個維度都健康，才算真正的睡眠健康。`, visual: '' },
      { id: "slide-5", type: "concept", title: "常見誤解：數字最重要，感受是主觀的不算", content: `有些人重視數字（手環顯示的深眠幾分鐘），卻忽略主觀感受。有些人只靠感受，不觀察任何指標。兩者都有盲點。最好的方式是兩者結合：主觀感受告訴你「現在怎樣」，客觀記錄幫你發現「一直以來的模式」。數字不能替代感受，感受也不能替代觀察。`, visual: '' },
      { id: "slide-6", type: "summary", title: "本堂重點", content: `① 五個主觀指標是最直接的睡眠報告——起床感受、白天精力、入睡時間、驚醒頻率、清醒速度，每天都能觀察，不需要任何工具。
② 睡眠日記是低成本高價值的工具——一週記錄能幫你和醫生更快找到問題的模式，是臨床上廣泛使用的起點。
③ SATED框架提醒你睡眠健康是多維度的——滿意度、清醒度、時機、效率、時數缺一不可，光靠時數判斷睡眠健康是不完整的。
系列完成：下一冊《身體在說什麼》，我們走進各種身體症狀的神經科學機制。`, visual: '' }
      ],
      quizzes: [
      { id: "q1", question: "根據睡眠醫學，從躺下到入睡的「正常」時間範圍大約是多少？", options: ["1–5分鐘，立刻入睡才代表睡眠健康","5–20分鐘，這是健康的入睡潛伏期範圍","30–60分鐘，因為大腦需要充分時間準備進入睡眠","超過60分鐘，因為越難入睡代表大腦越清醒、越健康"], answer: 1, explanation: "正確答案是②。正常的入睡潛伏期（sleep latency）大約是5到20分鐘。少於5分鐘可能代表你嚴重睡眠不足（睡意壓力太強）；超過30分鐘持續發生則是入睡困難的警訊，可能需要進一步評估。①的「立刻入睡」反而是負面指標，代表身體已經高度睡眠剝奪。" },
      { id: "q2", question: "SATED框架中的「E（Efficiency）睡眠效率」是指什麼？", options: ["每個睡眠周期的完整度，包含N1到REM的完整循環比例","躺在床上的時間相對於實際睡著的時間的比值，健康通常超過85%","深眠（N3）在總睡眠時間中的比例，健康應超過20%","你從感到睡意到真正入睡的速度，越快效率越高"], answer: 1, explanation: "正確答案是②。睡眠效率的計算是：實際睡著的時間 ÷ 躺在床上的總時間 × 100%。健康的睡眠效率通常超過85%。睡眠效率偏低可能代表你在床上清醒的時間過多（入睡困難、頻繁驚醒、很早就醒但繼續躺），這是臨床評估失眠的重要指標之一。" },
      { id: "q3", question: "關於「睡眠日記」作為評估工具，以下哪個描述最正確？", options: ["睡眠日記只適合嚴重失眠患者使用，一般人沒有記錄的必要","睡眠日記必須搭配穿戴裝置才有意義，單獨使用不夠準確","睡眠日記是臨床廣泛使用的評估工具，一週的記錄可以幫助發現感覺捕捉不到的睡眠模式","睡眠日記的主要功能是記錄夢境內容，幫助心理分析"], answer: 2, explanation: "正確答案是③。睡眠日記是臨床上廣泛使用的評估工具，不只限於嚴重失眠患者。一週的記錄（入睡時間、起床時間、醒來次數、早上感受等）可以幫助你和醫生發現靠感覺難以捕捉的模式——比如某幾天特別難入睡、特別容易在某個時間醒來。它是最便宜、最易執行的睡眠健康起點工具。" },
      { id: "q4", question: "以下哪個「起床感受」是較為健康的睡眠信號？", options: ["每天早上起床第一個感覺是「好累，還想繼續睡」","早上無法在沒有鬧鐘的情況下清醒，必須靠多個鬧鐘才能起床","起床時感覺雖然不是精力充沛，但有「恢復了一些」的感受，頭腦相對清醒","起床後需要一兩杯咖啡才能進入狀態，否則整個上午都很昏沉"], answer: 2, explanation: "正確答案是③。健康的睡眠不一定讓你「精力充沛到想衝出門」，但起床時應該有一定程度的「恢復感」，頭腦在合理的時間內開始清醒。①和④都是可能的問題訊號（深眠不足、皮質醇清醒反應遲鈍）。②的鬧鐘依賴也可能反映睡眠驅力未充分釋放或睡眠剝奪。" },
      { id: "q5", question: "SATED框架中，「T（Timing）時機」評估的是什麼？", options: ["你每次入睡所需要的時間長短","你的睡眠時間是否與自己的生理時鐘節律一致","你一天中安排午睡的時機是否適當","你的睡眠開始時間是否符合醫學建議的最佳入睡時段（晚上十點到十一點）"], answer: 1, explanation: "正確答案是②。SATED中的「T（Timing）時機」評估的是你的睡眠時間與個人生理時鐘節律的一致性。每個人的生理時鐘節律（晝夜節律型）不完全相同，「夜貓子」和「早鳥」有不同的自然睡眠時間點。Timing的核心不是睡「幾點」，而是你睡的時間有沒有配合你自己的生理節律，這影響深眠比例和整體睡眠品質。" }
      ],
    }
    ],
  },
  {
    vol: "04",
    title: "自律神經Vol.04：身體在說什麼",
    subtitle: "心悸、頭痛、腸躁、疲勞的神經科學解碼",
    emoji: "📡",
    cta: { text: "前往小舖購買 Vol.04 完整版（共10堂）", url: ST_BASE + '/6a3fd2f28dfebf4148dea251', seriesNote: "自律神經學系 7冊・從了解到改變" },
    lessons: [
      {
      id: "autonomic-preview-lesson-4",
      title: "症狀是信號，不是敵人",
      duration: 15,
      isFree: true,
      slides: [
      { id: "slide-1", type: "hook", title: "你有沒有這樣查過 Google？", content: `阿明每次身體不舒服都先查 Google。心跳快？搜尋「心臟病症狀」。頭痛？搜尋「腦瘤早期跡象」。

他的搜尋紀錄像一本病名詞典，但每次去醫院做完檢查，醫生都說「沒問題」。

「沒問題」這三個字讓他更焦慮，因為他明明感覺到什麼，但被告知那個什麼不存在。

你有沒有過這樣的感覺——身體有症狀，檢查結果一切正常，那種「正常」反而讓人更不安？`, visual: `<svg viewBox="0 0 600 260" xmlns="http://www.w3.org/2000/svg"><rect width="600" height="260" fill="#0f172a" rx="12"/><text x="300" y="38" text-anchor="middle" fill="#e2e8f0" font-size="14" font-weight="bold" font-family="sans-serif">自律神經失調常見症狀地圖</text><ellipse cx="300" cy="95" rx="30" ry="35" fill="none" stroke="#475569" stroke-width="1.5"/><line x1="300" y1="130" x2="300" y2="210" stroke="#475569" stroke-width="1.5"/><line x1="300" y1="150" x2="250" y2="185" stroke="#475569" stroke-width="1.5"/><line x1="300" y1="150" x2="350" y2="185" stroke="#475569" stroke-width="1.5"/><line x1="300" y1="210" x2="275" y2="250" stroke="#475569" stroke-width="1.5"/><line x1="300" y1="210" x2="325" y2="250" stroke="#475569" stroke-width="1.5"/><text x="80" y="85" fill="#fca5a5" font-size="12" font-family="sans-serif">頭痛 / 頭暈</text><line x1="155" y1="82" x2="272" y2="82" stroke="#ef4444" stroke-width="1" stroke-dasharray="3,3"/><text x="370" y="85" fill="#fcd34d" font-size="12" font-family="sans-serif">心悸 / 胸悶</text><text x="60" y="155" fill="#6ee7b7" font-size="12" font-family="sans-serif">手抖 / 肌肉緊</text><line x1="165" y1="152" x2="252" y2="155" stroke="#10b981" stroke-width="1" stroke-dasharray="3,3"/><text x="370" y="165" fill="#c4b5fd" font-size="12" font-family="sans-serif">腸躁 / 消化差</text><text x="90" y="215" fill="#67e8f9" font-size="12" font-family="sans-serif">慢性疲勞</text></svg>` },
      { id: "slide-2", type: "concept", title: "症狀的本質：身體的語言", content: `你家裡有煙霧偵測器，它偵測到煙就會嗚嗚大叫。這個聲音很煩，但它的工作不是「製造噪音」，它的工作是告訴你「有什麼東西在燒」。

身體的症狀就是這個道理：

心悸不是心臟壞掉，它是心臟在說「現在交感神經活化了，我在配合它加速」。頭痛不一定是腦部病變，它可能是血管緊張、肌肉緊繃。慢性疲勞不是懶，是系統過載之後的耗盡狀態。

症狀是信號，不是疾病本身。把症狀當敵人，就像把煙霧偵測器的聲音當成火災——你把電池拔掉，火還在燒。`, visual: `<svg viewBox="0 0 600 220" xmlns="http://www.w3.org/2000/svg"><rect width="600" height="220" fill="#0f172a" rx="12"/><text x="300" y="35" text-anchor="middle" fill="#e2e8f0" font-size="14" font-weight="bold" font-family="sans-serif">症狀理解流程</text><g transform="translate(30,55)"><rect x="0" y="0" width="90" height="50" rx="8" fill="#1e293b" stroke="#ef4444" stroke-width="1.5"/><text x="45" y="30" text-anchor="middle" fill="#fca5a5" font-size="12" font-family="sans-serif">症狀出現</text></g><text x="135" y="85" fill="#475569" font-size="16" font-family="sans-serif">→</text><g transform="translate(150,55)"><rect x="0" y="0" width="90" height="50" rx="8" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/><text x="45" y="30" text-anchor="middle" fill="#fcd34d" font-size="12" font-family="sans-serif">評估就醫</text></g><text x="255" y="85" fill="#475569" font-size="16" font-family="sans-serif">→</text><g transform="translate(270,55)"><rect x="0" y="0" width="90" height="50" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/><text x="45" y="30" text-anchor="middle" fill="#6ee7b7" font-size="12" font-family="sans-serif">排除結構</text></g><text x="375" y="85" fill="#475569" font-size="16" font-family="sans-serif">→</text><g transform="translate(390,55)"><rect x="0" y="0" width="90" height="50" rx="8" fill="#1e293b" stroke="#6366f1" stroke-width="1.5"/><text x="45" y="30" text-anchor="middle" fill="#c7d2fe" font-size="12" font-family="sans-serif">理解根源</text></g><text x="495" y="85" fill="#475569" font-size="16" font-family="sans-serif">→</text><g transform="translate(508,55)"><rect x="0" y="0" width="62" height="50" rx="8" fill="#1e293b" stroke="#8b5cf6" stroke-width="1.5"/><text x="31" y="22" text-anchor="middle" fill="#c4b5fd" font-size="12" font-family="sans-serif">建立</text><text x="31" y="40" text-anchor="middle" fill="#c4b5fd" font-size="12" font-family="sans-serif">策略</text></g><rect x="30" y="135" width="540" height="50" rx="8" fill="#312e81"/><text x="300" y="157" text-anchor="middle" fill="#a5b4fc" font-size="12" font-family="sans-serif">🐱 魯魯：醫生說「你沒問題」，不代表你真的沒問題。</text><text x="300" y="175" text-anchor="middle" fill="#818cf8" font-size="11" font-family="sans-serif">代表的是「在我能看到的範圍裡，沒有我能找到的問題」。</text></svg>` },
      { id: "slide-3", type: "deepdive", title: "為什麼要學會解讀這些症狀", content: `自律神經失調的症狀是功能性的——身體沒有壞掉，但運作方式出了問題，就像電腦硬碟沒壞，但系統卡頓、程式一直崩潰。

傳統的血液檢查、X光、心電圖，往往看不到這個層次的問題。

這不是醫生失職，也不是你在誇大。這是因為自律神經失調影響的是「調節機制」，而不是「器官本身」。

Vol.04 要做的事是：幫你建立一套「解讀身體語言」的基礎框架，讓你在下次身體發出訊號時，不是第一反應就是驚慌，而是能夠帶著理解去面對。`, visual: `<svg viewBox="0 0 600 220" xmlns="http://www.w3.org/2000/svg"><rect width="600" height="220" fill="#0f172a" rx="12"/><text x="300" y="35" text-anchor="middle" fill="#e2e8f0" font-size="14" font-weight="bold" font-family="sans-serif">兩種問題，兩種理解方式</text><rect x="40" y="55" width="230" height="130" rx="8" fill="#1e293b" stroke="#ef4444" stroke-width="1.5"/><text x="155" y="80" text-anchor="middle" fill="#fca5a5" font-size="13" font-weight="bold" font-family="sans-serif">結構性問題</text><text x="155" y="102" text-anchor="middle" fill="#94a3b8" font-size="12" font-family="sans-serif">器官損傷 / 腫瘤</text><text x="155" y="122" text-anchor="middle" fill="#6ee7b7" font-size="12" font-family="sans-serif">✅ 血液/影像可以看到</text><rect x="330" y="55" width="230" height="130" rx="8" fill="#1e293b" stroke="#6366f1" stroke-width="1.5"/><text x="445" y="80" text-anchor="middle" fill="#c7d2fe" font-size="13" font-weight="bold" font-family="sans-serif">功能性問題</text><text x="445" y="102" text-anchor="middle" fill="#94a3b8" font-size="12" font-family="sans-serif">調節機制失衡</text><text x="445" y="122" text-anchor="middle" fill="#f87171" font-size="12" font-family="sans-serif">⚠️ 報告通常正常</text><text x="445" y="158" text-anchor="middle" fill="#94a3b8" font-size="11" font-family="sans-serif">自律神經失調屬於這類</text></svg>` },
      { id: "slide-4", type: "summary", title: "本堂重點", content: `📝 三件事，帶走就夠了：

① 症狀是信號
身體出現症狀不代表器官壞了，而是神經系統在告訴你「現在有什麼事正在發生」，理解訊號比對抗訊號更重要。

② 功能性問題與結構性問題不同
傳統檢查擅長找結構性問題，但自律神經失調是功能性的，這就是為什麼你的報告正常，但感覺不正常。

③ 不恐慌是學習的第一步
把症狀當敵人會讓焦慮更嚴重，而焦慮本身又會製造更多症狀；理解之後，才能打破這個循環。`, visual: `<svg viewBox="0 0 600 190" xmlns="http://www.w3.org/2000/svg"><rect width="600" height="190" fill="#0f172a" rx="12"/><text x="300" y="32" text-anchor="middle" fill="#e2e8f0" font-size="15" font-weight="bold" font-family="sans-serif">身體在說什麼：三個核心認識</text><g transform="translate(50,50)"><rect x="0" y="0" width="500" height="36" rx="6" fill="#1e293b" stroke="#6366f1" stroke-width="1"/><text x="18" y="23" fill="#6366f1" font-size="16" font-family="sans-serif">①</text><text x="45" y="23" fill="#e2e8f0" font-size="13" font-family="sans-serif">症狀是信號——理解比對抗更重要</text></g><g transform="translate(50,96)"><rect x="0" y="0" width="500" height="36" rx="6" fill="#1e293b" stroke="#6366f1" stroke-width="1"/><text x="18" y="23" fill="#6366f1" font-size="16" font-family="sans-serif">②</text><text x="45" y="23" fill="#e2e8f0" font-size="13" font-family="sans-serif">功能性≠結構性——報告正常≠身體沒問題</text></g><g transform="translate(50,142)"><rect x="0" y="0" width="500" height="36" rx="6" fill="#1e293b" stroke="#6366f1" stroke-width="1"/><text x="18" y="23" fill="#6366f1" font-size="16" font-family="sans-serif">③</text><text x="45" y="23" fill="#e2e8f0" font-size="13" font-family="sans-serif">不恐慌是學習第一步——焦慮會製造更多症狀</text></g></svg>` }
      ],
      quizzes: [
      { id: "q1", question: "身體出現心悸、頭痛等症狀，但醫院檢查一切正常，這最可能代表什麼？", options: ["你在裝病，或是過度敏感","醫生漏看了，應該換一家醫院再查","可能是功能性問題，調節機制出了狀況，而非器官損傷","這些症狀會自己好，不需要理會"], answer: 2, explanation: "自律神經失調屬於功能性問題，影響的是神經系統的調節機制，而不是器官本身的結構。傳統的血液和影像檢查設計來找結構性問題，所以報告正常是正常的——但這不代表你的症狀是假的。" },
      { id: "q2", question: "把身體症狀當成「敵人」來對抗（例如靠止痛藥壓制頭痛），主要的問題是什麼？", options: ["止痛藥傷身體，長期服用有副作用","壓制症狀不等於解決根源，問題仍然持續","止痛藥效果不夠強，根本沒用","症狀會習慣止痛藥，之後需要更大劑量"], answer: 1, explanation: "症狀是身體發出的信號，就像煙霧偵測器的聲音。把電池拔掉（壓制症狀）並不能滅火（解決根源）。理解症狀的來源、找到真正的調節問題，才能真正改善。" }
      ],
    },
    {
      id: "auto-vol4-lesson-2",
      title: "心悸：心臟沒問題，但為什麼一直跳",
      duration: 12,
      isFree: false,
      slides: [
      { id: "slide-1", type: "hook", title: "開場情境", content: `坐在辦公室，突然心跳「噗通」像漏拍了一下，然後開始快速跳動。你立刻把手放在胸口，感覺心臟在用力跳。你的第一個念頭：我是不是心臟病發？去急診，心電圖正常，醫生說「可能是緊張」——但「緊張」為什麼讓心臟這樣跳，沒有人解釋。`, visual: '' },
      { id: "slide-2", type: "deepdive", title: "心悸的神經機制", content: `心臟的跳動節律由竇房結控制，竇房結接受自律神經調節。交感神經活化時，它讓心跳加速、心縮力量變強；副交感神經活化時，心跳減慢恢復平穩。當自律神經失衡，心跳節律就會出現波動，你會感覺到：突然加速、好像漏跳、或感覺心跳特別用力。這三種感受都可以是功能性的——心臟結構正常，是神經訊號的傳遞在起伏。`, visual: '' },
      { id: "slide-3", type: "concept", title: "哪種心悸需要就醫", content: `不是所有心悸都要去急診，但有幾個組合一定要認真對待：心悸合併胸痛或呼吸困難、心悸合併暈厥或快要昏倒、心悸在運動時發生（而非休息時）、持續超過三十分鐘不緩解、或有心臟病家族史。沒有這些合併症狀的短暫心悸，大多是功能性的，追蹤觸發點比反覆做心電圖更有價值。`, visual: '' },
      { id: "slide-4", type: "deepdive", title: "常見誤解", content: `很多人以為「心跳快就是心臟出問題」，於是每次心悸就去急診，每次都說正常，然後更焦慮——而焦慮本身又會製造更多心悸。這個循環讓很多心悸患者陷入「因為擔心心悸而心悸」的困境。了解心悸的神經機制，能有效打斷這個焦慮循環。`, visual: '' },
      { id: "slide-5", type: "summary", title: "本堂重點", content: `① 竇房結受自律神經調節——交感神經過度活化是功能性心悸的主要機制，不代表心臟壞了。
② 觸發點比心電圖更有診斷價值——記錄心悸前發生了什麼，找出觸發模式。
③ 辨識警訊很重要——合併胸痛、暈厥、運動時發生，這幾種情況要就醫確認。
下一堂預告：頭痛與頭暈，神經緊繃的頭部表現。`, visual: '' }
      ],
      quizzes: [
      { id: "q1", question: "心臟跳動的節律主要由哪個結構控制，並受到自律神經調節？", options: ["心室","竇房結","房室結","主動脈"], answer: 1, explanation: "竇房結是心臟的自然節律起搏點，接受交感神經和副交感神經（迷走神經）的雙向調節。交感神經加速心跳，副交感神經減慢心跳，兩者的平衡決定了心率的穩定性。" },
      { id: "q2", question: "以下哪種心悸情境最需要立即就醫評估？", options: ["看到喜歡的人時心跳加速","做完劇烈運動後心跳還沒有完全恢復","靜止休息時心悸合併胸痛和冒冷汗","喝完兩杯咖啡之後心跳有點快"], answer: 2, explanation: "靜止時出現心悸合併胸痛和冒冷汗，是心臟急症的警訊組合，需要立即就醫。選項A和B都是正常的生理反應，選項D是咖啡因的已知效應，都不需要緊急處置。" },
      { id: "q3", question: "為什麼焦慮患者常常陷入「因為擔心心悸而心悸」的循環？", options: ["因為焦慮患者的心臟結構比較脆弱","因為焦慮本身就是交感神經的高度活化狀態，會直接觸發心悸","因為焦慮患者不願意就醫導致症狀加重","因為心悸是焦慮症的唯一症狀"], answer: 1, explanation: "焦慮是交感神經活化的情緒表現，而交感神經活化本身就是心悸的神經機制。所以「擔心心悸」這個擔心本身，就透過交感神經激活製造了更多心悸——形成了自我強化的循環。" },
      { id: "q4", question: "期前收縮（早搏）的感覺最接近以下哪種描述？", options: ["心跳持續加速超過一個小時","胸部有壓榨感和放射性疼痛","心跳感覺多跳了一下或少跳了一下，像漏拍","心跳完全停止超過五秒"], answer: 2, explanation: "期前收縮（早搏）是心臟在正常節律之外額外收縮，患者通常感覺像是「多跳了一下」或「漏拍」，之後可能跟著一個較強的心跳。它在功能上大多是良性的，但感覺很明顯，容易引發焦慮。" },
      { id: "q5", question: "追蹤心悸觸發點時，哪種記錄方式最有幫助？", options: ["每次心悸都去做一次心電圖，累積檢查報告","把每次心悸的時間、前後發生的事、嚴重程度一起記錄","只記錄心悸持續了幾分鐘","讓家人幫忙量脈搏，記錄每分鐘心跳數"], answer: 1, explanation: "找出觸發點需要「情境信息」：心悸發生在什麼情況前後，不只是心跳數字。睡眠狀態、咖啡因、壓力事件、情緒狀態這些「前置條件」，才能幫助找出模式，比單純記錄心跳快慢更有診斷價值。" }
      ],
    },
    {
      id: "auto-vol4-lesson-3",
      title: "頭痛與頭暈：神經緊繃的頭部表現",
      duration: 12,
      isFree: false,
      slides: [
      { id: "slide-1", type: "hook", title: "開場情境", content: `悶悶的頭痛已經三個禮拜了，不是劇烈的那種，像是整個頭被一條橡皮筋緊緊套住。做了腦部 CT，正常。量血壓，正常。神經科醫生說「緊張性頭痛，減輕壓力就好」——但你就是因為頭痛才有壓力，這個建議好像是一個無限迴圈。`, visual: '' },
      { id: "slide-2", type: "deepdive", title: "三種頭痛與自律神經", content: `緊張性頭痛是最常見的——頭被束帶緊箍的悶痛，源自頭頸部肌肉長期緊繃缺氧，交感神經活化讓肌肉張力提高是主要推手。偏頭痛是一側搏動性疼痛，三叉神經血管系統過度活化所致，自律神經失衡會降低偏頭痛的發作門檻。叢發性頭痛較少見，是眼眶附近劇痛，自律神經也參與其中。超過九成的頭痛是這三種「原發性頭痛」，不是腦部病變。`, visual: '' },
      { id: "slide-3", type: "concept", title: "頭暈的種類", content: `站起來突然頭暈、眼前發黑，通常是直立性低血壓——站立時血液因重力往腿部流，正常狀況交感神經會立刻補償，但自律神經反應遲鈍時，大腦短暫缺血，就是那一瞬間的暈。飄浮感或「棉花感」則多與過度換氣或解離有關，是神經系統過載的自我保護反應，在長期焦慮的人中很常見。`, visual: '' },
      { id: "slide-4", type: "deepdive", title: "常見誤解", content: `「頻繁頭痛一定有腦部問題」是最常見的誤解，讓很多人做了好幾次 MRI，結果每次都正常，反而增加焦慮。真正需要立即就醫的頭痛有明確特徵：「這輩子最嚴重的頭痛」突然發作、合併發燒頸部僵硬、或合併肢體無力說話困難——這幾種情況不能用「可能是壓力」帶過。`, visual: '' },
      { id: "slide-5", type: "summary", title: "本堂重點", content: `① 九成頭痛不是腦部病變——緊張性頭痛和偏頭痛是最常見的類型，根源在肌肉和血管調節，不是腫瘤。
② 頭暈要先分種類——站起來頭暈和飄浮感的機制不同，對應的調節方式也不同。
③ 記住警訊：突發劇烈頭痛、合併神經症狀——這些情況必須就醫，不能等。
下一堂預告：腸躁症，為什麼腸道是壓力的第一個受害者。`, visual: '' }
      ],
      quizzes: [
      { id: "q1", question: "緊張性頭痛的主要神經機制是什麼？", options: ["腦部血管突然破裂出血","三叉神經血管系統過度活化造成搏動性疼痛","頭頸部肌肉長期緊繃缺氧，交感神經活化使肌肉張力升高","腦壓升高導致頭骨受壓"], answer: 2, explanation: "緊張性頭痛的核心機制是肌肉性的：頭頸部肌肉長期高張力、局部血流不足、代謝廢物累積引發疼痛。交感神經活化讓肌肉維持高張力，是自律神經失調容易引發緊張性頭痛的原因。選項B描述的是偏頭痛的機制。" },
      { id: "q2", question: "「直立性低血壓」造成的頭暈，最典型的發生時機是什麼？", options: ["平躺靜止時突然發生劇烈頭暈","從坐著或躺著快速站立時，瞬間眼前發黑或頭輕腳重","低頭看書超過一小時之後","在悶熱的房間裡待超過三十分鐘"], answer: 1, explanation: "直立性低血壓是姿勢改變誘發的頭暈：從坐/躺轉成站立時，血液因重力瞬間往下肢移動，自律神經補償不及，大腦短暫缺血，造成站立瞬間的暈眩或眼前發黑。這是自律神經調節速度不足的典型表現。" },
      { id: "q3", question: "以下哪種頭痛情境最需要立即去急診？", options: ["下午工作壓力大之後，頭有點悶悶的，休息後慢慢緩解","每次月經來前兩天都有輕微偏頭痛，跟上個月一樣","突然出現從沒有過的劇烈頭痛，感覺像被雷劈到","長途開車三小時後，頸部和頭部都有點緊繃痠痛"], answer: 2, explanation: "「這輩子最嚴重的頭痛」突然發作是蜘蛛膜下腔出血的典型警訊，需要立即就醫。選項A和D是情境性的肌肉緊張頭痛，選項B是規律的週期性偏頭痛，都是原發性頭痛的表現，不需要緊急處理。" },
      { id: "q4", question: "偏頭痛和緊張性頭痛最主要的感受差異是什麼？", options: ["偏頭痛持續時間較短，緊張性頭痛持續較長","偏頭痛通常是一側搏動性疼痛，緊張性頭痛是雙側束帶感","偏頭痛只有女性會有，緊張性頭痛男女都有","偏頭痛在早上發作，緊張性頭痛在晚上發作"], answer: 1, explanation: "偏頭痛的典型特徵是單側搏動性疼痛，常合併噁心、怕光、怕聲音；緊張性頭痛是雙側的壓迫感或束帶感，較少有伴隨症狀。這個差異有助於判斷頭痛類型和調整應對策略。" },
      { id: "q5", question: "長期焦慮的人出現「飄浮感」，最可能的神經機制是什麼？", options: ["內耳前庭器官積水，平衡功能受損","過度換氣導致二氧化碳濃度下降，腦血管收縮引發的知覺改變","小腦退化，運動協調能力下降","頸椎壓迫神經影響平衡感"], answer: 1, explanation: "焦慮常伴隨呼吸加速（過度換氣），導致血中二氧化碳濃度下降，腦部血管收縮，可能引發頭暈、飄浮感、手腳麻木等感覺。這是自律神經和呼吸調節失衡的連鎖反應，不代表腦部或耳部有結構問題。" }
      ],
    },
    {
      id: "auto-vol4-lesson-4",
      title: "腸躁症：腸道是壓力的第一個受害者",
      duration: 14,
      isFree: false,
      slides: [
      { id: "slide-1", type: "hook", title: "開場情境", content: `每次出門前、重要會議前、或者家裡有事的時候，腸子就開始絞痛、腹脹，然後急著跑廁所——或者偏偏又幾天不動靜。試過低FODMAP飲食、益生菌、中藥，都有點效果，但只要生活一有壓力，症狀又回來了。換了很多飲食，但從來沒有人告訴你：問題可能不在腸子，在神經。`, visual: '' },
      { id: "slide-2", type: "deepdive", title: "腸道有自己的神經系統", content: `腸道神經系統有超過五億個神經元，幾乎和脊髓一樣多，稱為「第二個大腦」。它不需要大腦指揮就能獨立控制腸道蠕動、分泌和血流。但它和大腦之間有一條高速公路——迷走神經——雙向溝通。大腦的情緒狀態透過迷走神經影響腸道蠕動節律；腸道的狀態也反過來影響情緒和焦慮程度。這就是「腸腦軸」。`, visual: '' },
      { id: "slide-3", type: "concept", title: "壓力如何打亂腸道", content: `壓力啟動交感神經，迷走神經（副交感）張力下降，腸道蠕動節律就亂了。有的人蠕動加速（壓力一來就拉肚子），有的人蠕動停滯（便祕型），有的人兩種交替。長期壓力還會讓腸道感覺神經變得過度敏感——正常人感覺不到的蠕動或氣體，腸躁症患者感受為疼痛。這叫「內臟過敏化」，一旦建立，即使壓力消失，腸道仍然持續過度反應。`, visual: '' },
      { id: "slide-4", type: "deepdive", title: "常見誤解", content: `很多人以為「只要找到不能吃的食物，腸躁症就能好」，結果飲食越來越嚴格、生活越來越受限，但症狀還是反覆出現。食物確實是腸躁症的觸發點，但根源是神經系統的調節失衡和內臟過敏化。就像對曬傷的皮膚，任何輕微的碰觸都會痛——問題不是碰觸的東西，是皮膚的敏感狀態。`, visual: '' },
      { id: "slide-5", type: "summary", title: "本堂重點", content: `① 腸腦軸是雙向的——壓力透過迷走神經影響腸道，腸道也反過來影響情緒；治療腸躁症需要同時看兩端。
② 內臟過敏化讓症狀持續——神經系統敏感化之後，即使壓力消失症狀還在；這不是飲食問題。
③ 腸躁症有身心循環——症狀加重焦慮，焦慮加重症狀；識別這個循環是介入的第一步。
下一堂預告：慢性疲勞，睡了還累的真正原因。`, visual: '' }
      ],
      quizzes: [
      { id: "q1", question: "腸道神經系統為什麼被稱為「第二個大腦」？", options: ["因為腸道會思考和做決策，功能和大腦一樣","因為腸道擁有超過五億個神經元，能獨立控制腸道功能而不需要大腦指揮","因為腸道是情緒產生的主要器官","因為腸道病變會直接導致腦部損傷"], answer: 1, explanation: "腸道神經系統（ENS）擁有龐大的神經網絡，可以獨立調控腸道蠕動、消化液分泌和腸道血流，不需要等待大腦的指令。這個自主性讓它獲得「第二個大腦」的稱號，但它的功能仍然與大腦透過迷走神經緊密連接。" },
      { id: "q2", question: "「內臟過敏化」在腸躁症中指的是什麼？", options: ["腸道對特定食物產生過敏反應，出現免疫反應","腸道感覺神經因長期激活而敏感化，正常的蠕動或氣體被感受為疼痛","腸道益菌被壞菌取代，導致消化功能下降","腸道壁通透性增加，細菌進入血液循環"], answer: 1, explanation: "內臟過敏化是腸道感覺神經長期處於高度敏感狀態的結果，讓原本正常的腸道信號（蠕動、氣體移動）被解讀為疼痛或不適。這類似被曬傷的皮膚，輕輕碰觸也會痛。這就是為什麼腸躁症的疼痛感覺與腸道實際活動程度不成比例。" },
      { id: "q3", question: "腸腦軸的溝通方向是？", options: ["只有大腦影響腸道，腸道不能反過來影響大腦","只有腸道影響大腦，因為腸道神經元數量更多","大腦和腸道透過迷走神經雙向溝通，互相影響","兩者透過血液循環交換訊息，沒有直接神經連接"], answer: 2, explanation: "腸腦軸是雙向的：大腦（情緒、壓力）透過迷走神經影響腸道蠕動和菌相；腸道狀態也反向透過迷走神經影響大腦，調節情緒和焦慮程度。這個雙向性解釋了為什麼焦慮引起腸道問題，而腸道不適又加重焦慮。" },
      { id: "q4", question: "在壓力高的情況下，交感神經如何影響腸道蠕動？", options: ["交感神經強化腸道蠕動，幫助快速消化食物以提供能量","交感神經活化後，迷走神經張力下降，腸道蠕動節律出現紊亂","交感神經對腸道沒有直接影響，腸道完全由腸道神經系統自主控制","交感神經讓腸道完全停止蠕動，進入休眠狀態"], answer: 1, explanation: "戰鬥或逃跑反應中，交感神經活化、副交感神經（迷走神經）張力下降。迷走神經是腸道蠕動調節的重要控制線，它的張力下降讓腸道節律紊亂——有的人加速（腹瀉型），有的人停滯（便祕型）。這不是腸道自己的問題，是神經調節的問題。" },
      { id: "q5", question: "為什麼單純靠飲食調整很難根治腸躁症？", options: ["因為腸躁症患者的腸道無法消化任何食物","因為飲食調整只減少觸發因素，但沒有解決神經系統的敏感化和調節失衡","因為低FODMAP飲食在科學上被證明無效","因為腸躁症的根源是腸道細菌，飲食改變不了菌相"], answer: 1, explanation: "飲食調整（如低FODMAP）能減少觸發腸道反應的特定物質，在短期內有效。但腸躁症的根本問題是神經系統的內臟過敏化和腸腦軸調節失衡——這些問題飲食改變無法重設。所以飲食管理只是減少「誘因」，不能修復「系統本身的敏感性」。" }
      ],
    },
    {
      id: "auto-vol4-lesson-5",
      title: "慢性疲勞：不是懶，是系統超載",
      duration: 14,
      isFree: false,
      slides: [
      { id: "slide-1", type: "hook", title: "開場情境", content: `連假睡了十二個小時，醒來還是累。不是那種運動後的疲勞，是一種「空了」的感覺——有想做的事，有需要完成的任務，但就是提不起勁。你開始懷疑自己是不是太懶、是不是心理問題。但你明明每天都在上班、在工作，你不是懶。`, visual: '' },
      { id: "slide-2", type: "deepdive", title: "慢性疲勞的神經內分泌機制", content: `HPA軸（下視丘-腦垂體-腎上腺軸）在長期壓力下持續過度運作，皮質醇分泌節律開始崩解。健康狀態下皮質醇早上高、晚上低；慢性疲勞時，整體皮質醇水平偏低——不是腎上腺壞了，是整個調節系統已經沒有足夠資源維持正常分泌。同時，粒線體在長期氧化壓力下效率下降。不是沒有電，是發電廠壞了。`, visual: '' },
      { id: "slide-3", type: "concept", title: "為什麼睡了還累", content: `慢性疲勞狀態下的睡眠，深睡眠比例往往偏低——即使睡了很多小時，真正進行細胞修復的深度睡眠時間仍然不足。更重要的是，長期高度激活的神經系統在睡眠中也難以完全放鬆，交感神經活性仍然偏高，身體沒有進入真正的恢復模式。所以不是「睡不夠多」，而是「睡了但沒有修復到」。`, visual: '' },
      { id: "slide-4", type: "deepdive", title: "常見誤解", content: `「我只是需要休假一週」——很多慢性疲勞的人以為短暫的休息就能恢復，結果假期結束後還是一樣累，甚至更沮喪。HPA軸的調節能力耗盡不是一週就能重建的，就像一直透支的銀行帳戶，不是存一筆錢就能立刻有信用額度。真正的恢復需要的是持續降低輸出負擔，而不只是短暫的輸入。`, visual: '' },
      { id: "slide-5", type: "summary", title: "本堂重點", content: `① 慢性疲勞是系統耗盡——HPA軸調節能力耗盡和粒線體效率下降是生理機制，不是意志力問題。
② 睡了不等於修復了——深睡眠比例低、神經系統在睡眠中仍高度激活，是疲勞持續的原因。
③ 短暫休假不夠——系統性的疲勞需要持續降低負擔，而不只是偶爾補眠或放假。
下一堂預告：手抖、冷汗、臉紅，交感神經激活的物理表現。`, visual: '' }
      ],
      quizzes: [
      { id: "q1", question: "慢性疲勞與一般運動後疲勞最主要的差別是什麼？", options: ["一般疲勞睡一覺可以恢復，慢性疲勞是HPA軸調節能力耗盡，難以透過睡眠快速恢復","慢性疲勞是肌肉問題，一般疲勞是神經問題","慢性疲勞只影響情緒，一般疲勞只影響身體","兩者本質上是相同的，只是嚴重程度不同"], answer: 0, explanation: "一般疲勞（如運動後）是能量消耗引起的可逆狀態，睡眠和休息可以完全恢復。慢性疲勞是神經內分泌系統長期超載造成的調節能力耗盡，HPA軸節律崩解，即使增加睡眠時間，深度修復也無法正常進行。" },
      { id: "q2", question: "在慢性疲勞狀態下，皮質醇分泌的典型模式是？", options: ["全天皮質醇持續極高，讓人高度緊繃無法放鬆","皮質醇正常早高晚低的節律完全反轉，變成早低晚高","整體皮質醇水平偏低，日週期節律崩解","皮質醇每小時大幅波動，完全沒有規律"], answer: 2, explanation: "慢性疲勞時，HPA軸長期超載後系統資源耗盡，皮質醇的整體分泌量往往偏低，正常的日週期節律（早上高峰、晚上低谷）也開始崩解。這不是腎上腺本身的結構問題，而是調節系統失去了維持正常節律的能力。" },
      { id: "q3", question: "為什麼慢性疲勞患者睡了長時間還是感覺沒有恢復？", options: ["因為慢性疲勞患者的睡眠品質極佳，大腦不需要多睡","因為慢性疲勞讓人睡眠很少，睡眠不足是主要問題","因為深睡眠比例低且神經系統在睡眠中仍高度活化，真正的修復時間不足","因為長時間睡眠反而讓身體懶惰，減少了自我修復動力"], answer: 2, explanation: "慢性疲勞狀態下，即使睡眠時間足夠，深睡眠（NREM3期，是細胞修復的主要時段）的比例往往偏低。加上神經系統在睡眠中交感神經活性仍偏高，身體無法進入完全的恢復模式，所以睡眠的「修復效率」大幅下降，而不只是睡眠時間不夠。" },
      { id: "q4", question: "以下哪種描述最接近慢性疲勞的主觀感受（有別於憂鬱症）？", options: ["對所有事情失去興趣，什麼都不想做","情緒持續低落，感覺生活沒有意義","想做事、有意願，但身體沒有力氣去執行，能量感覺空了","睡眠增加、食慾下降，體重明顯減少"], answer: 2, explanation: "慢性疲勞的核心是「能量耗盡」——患者通常還有動機和意願，但身體或認知資源無法配合。這與憂鬱症的核心（失去興趣、情緒低落、失去動機）有所區別。兩者可以共存，但它們是不同的問題，應對方式也有差異。" },
      { id: "q5", question: "對慢性疲勞患者而言，「一週長假」的效果為什麼有限？", options: ["因為假期本身製造了更多活動，消耗了更多能量","因為HPA軸的調節能力耗盡需要持續降低負擔來重建，短暫休息不足以重設系統","因為慢性疲勞患者在假期中無法真正放鬆，會一直擔心工作","因為身體已經習慣疲勞狀態，突然休息會讓症狀加重"], answer: 1, explanation: "慢性疲勞的根源是神經內分泌系統長期超載後的調節能力耗盡，類似長期透支的帳戶。短暫一週假期能提供有限的喘息，但無法重建HPA軸的節律調節能力——那需要持續且系統性地降低壓力負擔，而不是偶爾的短暫中斷。" }
      ],
    },
    {
      id: "auto-vol4-lesson-6",
      title: "手抖、冒冷汗、臉紅：自律神經在調節什麼",
      duration: 12,
      isFree: false,
      slides: [
      { id: "slide-1", type: "hook", title: "開場情境", content: `站在台上要做報告，內容準備了兩個星期，非常熟悉。但手拿著麥克風開始抖，臉燒起來，背後一片冷汗。台下的人什麼都還沒說，你的身體已經自顧自地進入了「準備打仗」的模式——因為你的神經系統不知道這只是一個十分鐘的報告。`, visual: '' },
      { id: "slide-2", type: "deepdive", title: "三個症狀的神經路徑", content: `手抖是腎上腺素讓肌肉進入高張力、快速微振動的「生理性震顫」，準備隨時爆發力量。冒冷汗是交感神經啟動汗腺散熱（是的，汗腺是交感神經控制，不是副交感），冷是因為蒸發帶走體表熱量、皮膚血流減少。臉紅是焦慮下臉部血管矛盾性擴張，與其他部位血管收縮的方向相反。三個都是交感神經激活的物理副產品。`, visual: '' },
      { id: "slide-3", type: "concept", title: "門檻降低：為什麼小事也觸發大反應", content: `健康的自律神經系統能辨別「真正的威脅」和「不需要動員全身的情況」，給出相應程度的反應。但當神經系統長期處於高度警戒，這個門檻會降低——一場報告、一通主管電話、甚至一個突然的聲音，都可能觸發完整的戰鬥反應。這不是你太脆弱，是系統的設定值跑掉了。`, visual: '' },
      { id: "slide-4", type: "deepdive", title: "常見誤解", content: `「手抖是帕金森氏症的早期症狀」是讓很多焦慮患者更焦慮的誤解。帕金森的手抖是靜止時最明顯、緩慢、單側、從手指延伸到手腕；焦慮的手抖在活動中、雙側對稱、壓力消失後快速減退。兩者的特徵幾乎相反，能夠區分。`, visual: '' },
      { id: "slide-5", type: "summary", title: "本堂重點", content: `① 手抖冷汗臉紅是交感神經的物理副產品——不是器官病變，是身體準備戰鬥或逃跑時的正常生理反應，壓力消失後會減退。
② 長期失調降低觸發門檻——系統設定值改變後，小刺激也能觸發大反應，不是你脆弱。
③ 靜止單側緩慢才需要特別警覺——與焦慮性手抖特徵相反，可以明確區分。
下一堂預告：胸悶和呼吸急促，不是心臟病的胸口問題。`, visual: '' }
      ],
      quizzes: [
      { id: "q1", question: "控制汗腺分泌的神經是哪一種？", options: ["副交感神經（迷走神經）","交感神經","體感覺神經","運動神經"], answer: 1, explanation: "雖然大多數汗腺功能（如溫度調節）直覺上感覺像「休息放鬆」的反應，但汗腺實際上是由交感神經控制的。壓力和焦慮啟動交感神經，同時激活汗腺，這就是為什麼緊張時會冒汗。" },
      { id: "q2", question: "焦慮引起的手抖（生理性震顫）和帕金森氏症的手抖，最主要的鑑別特徵是？", options: ["焦慮手抖只在夜間出現，帕金森手抖在白天","焦慮手抖是靜止時最明顯、單側、緩慢；帕金森手抖在活動中、雙側、壓力下消退","焦慮手抖在活動中明顯、雙側對稱、壓力消失後減退；帕金森手抖靜止時最明顯、單側、緩慢","兩種手抖完全無法區分，必須靠神經科檢查"], answer: 2, explanation: "焦慮性手抖的特徵是：活動時比靜止時明顯、雙側對稱、壓力消失後快速減退。帕金森氏症的靜止性震顫特徵相反：靜止時最明顯（活動時反而減少）、通常從單側開始、進行性加重。這些差異足以在臨床上初步區分兩者。" },
      { id: "q3", question: "臉紅在焦慮情境下，臉部血管的反應方向是？", options: ["和全身其他部位一樣收縮，減少血流","完全不受自律神經影響，只受溫度調節","矛盾性擴張，與其他部位血管收縮的方向相反","先收縮後擴張，形成週期性的紅白交替"], answer: 2, explanation: "社交焦慮引起的臉紅是一個矛盾現象：在交感神經活化、全身血管傾向收縮的狀態下，臉部血管卻反而擴張，血流增加，皮膚發熱變紅。這個矛盾性反應的確切機制仍在研究中，但它是自律神經調節在不同部位有不同表現的一個典型例子。" },
      { id: "q4", question: "「觸發門檻降低」在自律神經失調中指的是什麼現象？", options: ["身體需要更強烈的刺激才能感覺到症狀","神經系統長期高警戒後，原本不需要動員全身資源的小刺激也觸發完整的戰鬥反應","身體逐漸習慣壓力，不再有任何反應","焦慮減少了，但身體症狀增加了"], answer: 1, explanation: "長期高度激活的神經系統，就像一個超級敏感的警報器——被調低了門檻後，連輕微的觸動也會啟動全系統警報。這解釋了為什麼自律神經失調的人，對原本不那麼困擾的刺激（開會、電話、噪音）也會出現強烈的生理反應。" },
      { id: "q5", question: "以下哪種冒汗的情況最需要認真就醫評估？", options: ["做完高強度運動後大量流汗","在炎熱環境中活動時全身出汗","睡眠中大量盜汗，或不對稱的局部多汗持續出現","報告前五分鐘手心和腋下出汗"], answer: 2, explanation: "睡眠中的大量盜汗（排除環境過熱）可能涉及感染、淋巴瘤或荷爾蒙問題；不對稱的局部多汗可能是神經壓迫的表現。這兩種情況需要醫療評估。選項A、B是正常的體溫調節反應，選項D是典型的焦慮性交感神經激活，通常是功能性的。" }
      ],
    },
    {
      id: "auto-vol4-lesson-7",
      title: "呼吸急促與胸悶：不是心臟病的胸口問題",
      duration: 12,
      isFree: false,
      slides: [
      { id: "slide-1", type: "hook", title: "開場情境", content: `搭捷運，車廂很擠，突然胸口一緊，感覺空氣不夠用，呼吸變短。下一站趕緊下車，在月台上深呼吸，慢慢好了。後來去掛心臟科，心電圖和超音波都正常，醫生說「恐慌發作」。你不知道恐慌發作是什麼，只覺得這個名詞讓你更害怕，因為感覺上好像隨時都可能再發生。`, visual: '' },
      { id: "slide-2", type: "deepdive", title: "過度換氣的連鎖反應", content: `焦慮讓呼吸加速，但如果沒有體力活動消耗氧氣，快速呼吸反而讓血液中二氧化碳濃度過低。二氧化碳不只是廢氣——它維持血液pH值，也讓腦部血管保持擴張。二氧化碳降低後：腦血管收縮（頭暈飄浮）、神經肌肉興奮性提高（手麻腳麻、心悸）、胸肌緊張（胸悶）。這整套感覺完全像心臟病發，但根源在呼吸模式，不在心臟。`, visual: '' },
      { id: "slide-3", type: "concept", title: "肌肉緊繃引起的胸悶", content: `長期壓力讓胸壁肌肉（大胸肌、肋間肌）和上背部肌肉長期高張力。持續緊繃產生悶重感，位置在胸骨前方或兩側。辨別方式：按壓胸壁可以重現相同的痛（心臟痛按壓不能重現）、深吸氣或改變姿勢症狀改變、情緒緊張時加重、不是突發壓榨感。肌肉來源的胸悶，按摩和拉伸有效；心臟引起的胸痛，不會。`, visual: '' },
      { id: "slide-4", type: "deepdive", title: "常見誤解", content: `「胸悶就是心臟的問題」是讓人反覆跑急診的誤解。功能性胸悶其實更常見——問題在過度換氣和肌肉緊繃，跟心臟結構沒有關係。當然，真正需要警覺的胸痛有清楚的警訊：壓榨感、向左手臂或下頷放射、合併冒冷汗和噁心、休息後不緩解——這個組合要立刻就醫，不能等。`, visual: '' },
      { id: "slide-5", type: "summary", title: "本堂重點", content: `① 過度換氣能製造心臟病感覺——CO₂降低引發的連鎖反應包括頭暈、心悸、胸悶、手麻，根源在呼吸模式。
② 肌肉緊繃胸悶可以按壓重現——這是鑑別肌肉來源和心臟來源最簡單的方式。
③ 壓榨感+放射痛+冷汗=立刻就醫——這個組合不能用「壓力大」解釋，是心臟急症的警訊。
下一堂預告：情緒症狀，焦慮感和莫名想哭的神經科學解釋。`, visual: '' }
      ],
      quizzes: [
      { id: "q1", question: "過度換氣為什麼反而讓人感覺更不舒服，甚至引發類似心臟病的症狀？", options: ["因為快速呼吸讓氧氣太多，氧氣中毒引發症狀","因為呼吸加速讓血液中二氧化碳濃度過低，引發腦血管收縮和神經肌肉過度興奮","因為過度換氣讓肺部過度擴張，壓迫到心臟","因為快速呼吸消耗太多能量，導致低血糖"], answer: 1, explanation: "過度換氣排出過多二氧化碳，血液中CO₂濃度下降，pH值升高。二氧化碳是腦血管的重要擴張訊號，它降低後腦血管收縮（頭暈）；同時，血液pH改變影響鈣離子活性，神經和肌肉興奮性升高（心悸、手麻、胸悶）。這整套感覺像心臟問題，但根源在呼吸。" },
      { id: "q2", question: "以下哪種方式最能鑑別「肌肉緊繃引起的胸悶」和「心臟引起的胸痛」？", options: ["肌肉胸悶通常在左胸，心臟胸痛在右胸","按壓胸壁能重現相同的疼痛，通常代表肌肉來源；心臟引起的胸痛按壓不能重現","肌肉胸悶持續超過一小時，心臟胸痛很短暫","做一百下深蹲，胸痛加重代表是心臟問題"], answer: 1, explanation: "肌肉來源的胸悶（肋間肌、大胸肌緊繃）在按壓胸壁時可以複製出相同位置和性質的痛感——這是它的重要特徵。心臟引起的疼痛是內臟性的，不能透過按壓體表重現。這個簡單的鑑別方式可以在就醫前提供初步判斷。" },
      { id: "q3", question: "以下哪種胸痛組合最需要立即就醫？", options: ["姿勢改變時胸口有點緊，深呼吸後緩解","下午情緒緊張時感覺胸悶，離開辦公室後好多了","突發的胸部壓榨感，合併左手臂疼痛、冒冷汗、休息後不緩解","跑步後胸口有點不適，停下來五分鐘後完全消失"], answer: 2, explanation: "壓榨性胸痛合併放射性疼痛（手臂、下頷）、冒冷汗、噁心、且休息後不緩解，是急性心肌梗塞的典型警訊組合。這種情況必須立即就醫，不能等待觀察。其他選項描述的都是情境性或姿勢性的功能性胸悶。" },
      { id: "q4", question: "在擁擠的空間出現胸悶和呼吸困難，最可能的機制是什麼（假設心臟檢查正常）？", options: ["人多導致空氣中氧氣濃度降低，身體缺氧","擁擠觸發焦慮，交感神經活化後呼吸加速，過度換氣引發一連串症狀","人群中的病菌讓免疫系統啟動，引發發炎反應","擁擠的空間讓血壓突然升高，壓迫胸腔"], answer: 1, explanation: "擁擠、密閉空間對有社交焦慮或恐慌傾向的人是常見觸發情境。焦慮啟動交感神經，呼吸加速，在沒有體力消耗的情況下造成過度換氣，CO₂降低引發頭暈、胸悶、心悸等症狀——形成一個恐慌循環。正常的氧氣濃度和這個機制無關。" },
      { id: "q5", question: "如果一個人在深吸氣或改變姿勢時，胸悶症狀明顯改變，這最可能代表什麼？", options: ["心臟在改變壓力下有結構性問題","肺部積水，隨姿勢改變而移動","胸壁肌肉或肋間肌的緊繃引起的功能性胸悶","胸主動脈瘤，需要緊急手術"], answer: 2, explanation: "肌肉和肋骨來源的胸悶，其位置和強度會隨姿勢和呼吸深度而變化，因為這些動作直接改變了肌肉和骨骼的相對位置和張力。心臟或血管引起的疼痛通常不會隨這類機械性動作而明顯改變。這是重要的鑑別線索。" }
      ],
    },
    {
      id: "auto-vol4-lesson-8",
      title: "情緒症狀：焦慮感、莫名想哭從哪來",
      duration: 12,
      isFree: false,
      slides: [
      { id: "slide-1", type: "hook", title: "開場情境", content: `沒有發生什麼特別的事，就是突然眼眶一熱，想哭。或是一種說不清楚的不安感，像有什麼事情要發生，但不知道是什麼——明明客觀上沒有危險，但身體就是緊繃著。你開始懷疑自己是不是個性太脆弱，或是荷爾蒙出了問題。但其實，這些感覺有明確的神經路徑解釋。`, visual: '' },
      { id: "slide-2", type: "deepdive", title: "情緒的神經架構", content: `杏仁核是情緒的火警偵測器——偵測到威脅就啟動恐懼和焦慮反應。前額葉皮質是情緒的冷靜劑——它能告訴杏仁核「這個不是真的危險，不用這麼緊張」。長期壓力和睡眠不足會削弱前額葉的功能，讓它沒辦法有效壓制杏仁核。結果：一點點刺激，杏仁核的警報就已經在叫了，而前額葉的安撫聲音很小。`, visual: '' },
      { id: "slide-3", type: "concept", title: "莫名想哭是什麼機制", content: `哭泣不只是情緒的表達，也是神經系統的生理調節動作。眼淚中含有皮質醇和其他壓力激素，哭泣時副交感神經活化，讓高度緊繃的交感神經狀態暫時釋放。所以「莫名想哭」是神經系統壓力積累到臨界點後的洩壓嘗試——不代表你脆弱，代表你的系統調節資源已經到了邊緣。`, visual: '' },
      { id: "slide-4", type: "deepdive", title: "常見誤解", content: `「情緒症狀是心理問題，跟身體無關」讓很多人不敢認真對待自己的情緒狀態，或者覺得「靠意志力撐過去就好」。但情緒症狀和心悸、頭痛一樣，都是神經系統失衡的表現，有明確的生理基礎。忽略情緒症狀，就像忽略心悸——根源繼續在，症狀只會累積。`, visual: '' },
      { id: "slide-5", type: "summary", title: "本堂重點", content: `① 杏仁核與前額葉的拉鋸決定情緒穩定性——壓力削弱前額葉，讓杏仁核過度反應，這是焦慮的神經機制，不是個性問題。
② 莫名想哭是洩壓訊號——不是脆弱，是調節資源到了臨界點的信號，值得認真對待。
③ 情緒症狀與身體症狀同一根源——這一冊所有症狀共享同一套失衡的神經系統，情緒的部分同樣需要重視。
下一堂預告：症狀為什麼會來了又走？好好壞壞背後的邏輯。`, visual: '' }
      ],
      quizzes: [
      { id: "q1", question: "杏仁核在情緒調節中主要負責什麼功能？", options: ["產生愉悅感和幸福感","控制語言和表達能力","偵測威脅並觸發恐懼和焦慮反應","調節睡眠和清醒週期"], answer: 2, explanation: "杏仁核是邊緣系統的核心結構，功能是快速偵測環境中的潛在威脅並啟動情緒反應（尤其是恐懼和焦慮）。它的反應速度非常快，往往比意識察覺還早——這就是為什麼人有時候「還沒想清楚就已經緊張了」。" },
      { id: "q2", question: "長期壓力如何影響前額葉皮質的功能？", options: ["讓前額葉更活躍，產生更多的焦慮性思考","削弱前額葉的調節能力，讓它無法有效抑制杏仁核的過度反應","讓前額葉完全停止運作，讓人無法做任何決策","前額葉不受壓力影響，只有杏仁核會改變"], answer: 1, explanation: "長期壓力（尤其是慢性皮質醇升高和睡眠不足）會削弱前額葉皮質的功能連結，讓它對杏仁核的「抑制性調節」能力下降。結果是杏仁核更容易被觸發、反應更強烈，而前額葉的「冷靜判斷」聲音相對變小，情緒波動和焦慮增加。" },
      { id: "q3", question: "「莫名想哭」在神經科學的角度代表什麼？", options: ["大腦液體分泌異常，需要就醫","神經系統壓力積累到臨界點，哭泣是副交感神經啟動的洩壓嘗試","血清素嚴重不足，是憂鬱症的確定診斷","眼睛乾燥，需要補充水分"], answer: 1, explanation: "哭泣有生理層面的功能：眼淚中含有壓力激素，哭泣時副交感神經活化，讓緊繃的交感神經狀態暫時釋放。「莫名想哭」往往代表神經系統的調節資源已滿載，在試圖透過哭泣這個生理機制進行釋放。這不是情緒問題，是調節需求的信號。" },
      { id: "q4", question: "情緒症狀與心悸、頭痛這類身體症狀，兩者的根源關係是？", options: ["它們是完全獨立的問題，情緒症狀是心理的，身體症狀是生理的","身體症狀會導致情緒症狀，但情緒症狀不會影響身體","它們共享同一套失衡的自律神經系統，是同一個根源的不同表現出口","情緒症狀比身體症狀更嚴重，應該優先處理"], answer: 2, explanation: "這一冊的所有症狀——心悸（自律神經→心臟）、頭痛（自律神經→肌肉/血管）、情緒不穩（自律神經→邊緣系統）——都是同一套失調的神經系統在不同器官和系統的不同表現形式。理解這個共同根源，比一個症狀一個症狀地追更有系統性。" },
      { id: "q5", question: "以下哪種做法最能幫助前額葉的情緒調節能力恢復？", options: ["強迫自己不要感覺情緒，用意志力壓制","在情緒爆發時喝大量咖啡提神","改善睡眠品質、降低長期壓力負擔，讓前額葉神經元有機會恢復功能連結","頻繁在社群媒體上分享情緒，讓朋友幫忙分擔"], answer: 2, explanation: "前額葉皮質的功能連結因慢性壓力和睡眠不足而削弱，但這個過程是可逆的。改善睡眠（增加深睡眠比例）、降低慢性壓力負擔、透過冥想或正念練習可以幫助前額葉重建對杏仁核的調節能力。意志力壓制和咖啡因都不能解決底層的神經調節問題。" }
      ],
    },
    {
      id: "auto-vol4-lesson-9",
      title: "為什麼症狀會來了又走？",
      duration: 12,
      isFree: false,
      slides: [
      { id: "slide-1", type: "hook", title: "開場情境", content: `有時候幾天狀況很好，不心悸、不頭痛、能睡，你以為好了。然後一個忙碌的週，症狀全部回來，而且感覺比之前更嚴重。你很沮喪——難道永遠無法真正好轉？這個「好好壞壞」的循環讓你精疲力竭，甚至不敢在狀況好的時候真的放鬆，因為你知道壞的遲早回來。`, visual: '' },
      { id: "slide-2", type: "deepdive", title: "調節餘裕的水槽概念", content: `把自律神經的調節能力想像成一個水槽。日常的各種壓力是流進來的水。水槽夠大的時候，水進來也不會滿出來，不出現症狀。但當水槽因為長期負載而「縮小」了——同樣量的水就會溢出來，症狀就出現。症狀消失的好日子，是那天輸入的水量剛好在槽能處理的範圍內，不是病好了，是剛好今天沒有滿出來。`, visual: '' },
      { id: "slide-3", type: "concept", title: "閾值+觸發點的交互作用", content: `同一個壓力情境，在不同狀態下產生不同強度的症狀。睡眠充足、近期壓力少的日子，一場會議可能只讓你稍微緊張。連續熬夜、剛有家庭衝突的日子，同樣一場會議可能觸發明顯的心悸和頭痛。不是你越來越脆弱，是當下的閾值被多重因素疊加壓縮了。症狀的「好壞交替」，其實是多個因素交乘的結果，有規律，只是規律不是單一因素能解釋的。`, visual: '' },
      { id: "slide-4", type: "deepdive", title: "常見誤解", content: `「症狀回來代表病情惡化」是讓人陷入焦慮循環的誤解。症狀回來最常見的原因不是「越來越嚴重」，而是當時有多個因素同時壓縮了調節餘裕——睡眠少了一些、同時有家事、工作壓力也大。理解波動的邏輯，能讓你在壞的時候不恐慌，在好的時候好好累積資源。`, visual: '' },
      { id: "slide-5", type: "summary", title: "本堂重點", content: `① 症狀波動反映調節餘裕的動態起伏——好日子不是病好了，壞日子也不是病更嚴重，是當天的壓力輸入量與系統容量的比例。
② 閾值是多因素決定的——睡眠、情緒、身體狀況同時影響閾值，解釋了為什麼症狀發作看起來「沒有規律」。
③ 症狀波動是有用的信息——每次出現都在說某些因素正在壓縮系統；追蹤模式比焦慮「又來了」更有幫助。
下一堂預告：最後一堂，症狀日記的實際用法。`, visual: '' }
      ],
      quizzes: [
      { id: "q1", question: "「調節餘裕」這個概念，在自律神經失調中最準確的解釋是什麼？", options: ["身體能承受的最大疼痛量","自律神經系統吸收日常壓力波動而不出現明顯症狀的能力容量","一個人的情緒忍耐程度","藥物在體內的有效濃度範圍"], answer: 1, explanation: "調節餘裕描述的是自律神經系統在日常壓力輸入下仍能維持平衡、不產生明顯症狀的緩衝能力。這個容量受到長期壓力、睡眠、身體狀況等因素影響而增減，當壓力輸入超過這個容量時，症狀就會「溢出來」出現。" },
      { id: "q2", question: "同一個觸發點（如一場重要會議），在不同日子造成不同強度的症狀，最主要的原因是？", options: ["會議本身的重要性每次都不同","當天的大氣壓力影響了神經系統的敏感度","症狀閾值受到睡眠、情緒、壓力累積等多重因素影響，不同日子的閾值不同","這代表疾病在隨機進展，沒有辦法預測或解釋"], answer: 2, explanation: "症狀的嚴重程度是「觸發點強度」和「當下閾值」的共同結果。睡眠品質、近期情緒事件、身體狀況、累積的壓力量，都會影響當下的閾值。所以同樣的觸發點，在不同日子造成不同反應——不是疾病在隨機進展，是閾值在變動。" },
      { id: "q3", question: "症狀的「好好壞壞」最可能代表什麼？", options: ["病情在不規律地惡化中，需要更積極的醫療介入","自律神經系統在試圖自我修復，好的時候代表修復成功","神經系統調節餘裕的動態起伏，好壞反映當下壓力輸入與系統容量的比例","症狀是心理暗示造成的，想到就有，不想就沒有"], answer: 2, explanation: "症狀的波動性是自律神經動態調節的自然結果。好的日子是當天的壓力輸入在系統容量內；壞的日子是多重因素疊加讓壓力超過容量。這不是病情惡化，而是系統在不同條件下的不同表現狀態。" },
      { id: "q4", question: "在症狀較輕的「好日子」，最應該做的事是什麼？", options: ["趕快在狀況好的時候完成所有積欠的工作，以備不時之需","好好休息、累積調節資源、觀察是什麼因素讓今天狀況比較好","去做所有之前因為症狀而迴避的事情","什麼都不做，確保下次不會太快就壞"], answer: 1, explanation: "好日子是調節餘裕相對充裕的時候，最應該利用這段時間好好休息、累積資源，同時觀察是哪些因素讓今天的閾值比較高（睡眠好？壓力少？有特定活動？）。這些觀察是找出保護因素的寶貴信息，不是用來趕工積欠任務的機會。" },
      { id: "q5", question: "理解症狀波動的邏輯，對自律神經失調患者最主要的好處是什麼？", options: ["讓他們知道不需要就醫，症狀自己會好","減少症狀出現時的恐慌，能夠以「信息收集」的角度面對症狀，而不是「又惡化了」的恐慌","幫助他們找到特效藥","讓他們知道可以無視症狀，繼續正常生活"], answer: 1, explanation: "了解症狀波動是多因素交互作用的結果（不是疾病隨機惡化），最大的好處是減少「症狀出現=又更嚴重了」的恐慌反應。恐慌本身就是交感神經激活，會加重症狀。能夠以觀察者的角度面對症狀，問「這次出現前發生了什麼」，才能找到有用的信息而不是陷入焦慮循環。" }
      ],
    },
    {
      id: "auto-vol4-lesson-10",
      title: "聽懂身體的語言：症狀日記的用法",
      duration: 12,
      isFree: false,
      slides: [
      { id: "slide-1", type: "hook", title: "開場情境", content: `去看診，醫生問「什麼時候最嚴重？」你想了半天說「好像一直都有」。醫生再問「有沒有什麼事情之後會變嚴重？」你說「我不確定，好像睡不好之後？還是吃了什麼？」醫生於是說「回家記症狀日記，下次帶來」。你回家記了兩週，帶去看診，醫生一眼就發現你每次月經前三天症狀都明顯升高——而你自己完全沒有意識到這個規律。`, visual: '' },
      { id: "slide-2", type: "deepdive", title: "症狀日記記什麼", content: `有用的症狀日記不需要複雜，每天三到五分鐘，記四個面向：症狀（是什麼症狀、嚴重度1–5、幾點發生）、影響因素（睡眠時數和品質、咖啡因攝入、特別壓力事件、飲食有沒有不同）、情緒狀態（整體情緒、有沒有情緒事件）、整體能量（1–5分）。重點是同時記「症狀」和「可能影響的因素」——只記症狀，就只是流水帳。`, visual: '' },
      { id: "slide-3", type: "concept", title: "從日記找出模式", content: `記了兩到四週之後，問自己三個問題。第一：有沒有週期性規律——每週某天特別差，或每月某個時間點症狀升高？第二：每次嚴重的前一兩天有沒有共同事件——睡眠不足、特定壓力情境？第三：症狀輕或不出現的日子，有什麼共同特徵——充足睡眠、特定活動或休閒方式？找到保護因素和觸發因素，就有了調節的方向。`, visual: '' },
      { id: "slide-4", type: "deepdive", title: "常見誤解", content: `「記了一週沒有發現規律，所以日記沒有用」——一週太短，很多規律需要四到八週才能看出來。另一個誤解是「我記了日記，但症狀還在」——日記不是治療工具，是觀察工具。它的價值在於幫你和醫生找到你個人的觸發模式和保護因素，而不是記了就會好。`, visual: '' },
      { id: "slide-5", type: "summary", title: "本堂重點", content: `① 記因不只記果——同時記症狀和影響因素，才能找出規律，而不是流水帳。
② 問三個模式問題——週期性、共同前置事件、保護因素，這三個問題從記錄提煉出行動方向。
③ 症狀日記是認識自己的工具——目標不是記多不舒服，而是找出你的神經系統在什麼條件下最穩定；這是這整冊的結尾，也是認識自己的開始。`, visual: '' }
      ],
      quizzes: [
      { id: "q1", question: "一份有效的症狀日記和「把不舒服的感覺都寫下來」的流水帳，最主要的差別是什麼？", options: ["有效的症狀日記需要使用專業醫學術語","有效的日記同時記錄症狀和可能的影響因素，目的是找出模式而不只是記錄不適","流水帳字數比較少，有效日記需要每天寫超過五百字","有效的症狀日記需要每小時記錄一次"], answer: 1, explanation: "症狀日記的核心價值在於「因果配對」——同時記錄症狀（果）和當天或前一天的睡眠、壓力、飲食、情緒（因），才能在累積足夠數據後找出個人的觸發模式和保護因素。只記症狀的流水帳無法提供這些信息。" },
      { id: "q2", question: "記症狀日記時，「情緒狀態」為什麼需要被記錄？", options: ["情緒和身體症狀完全無關，記情緒是浪費時間","因為情緒事件（衝突、重大消息、焦慮事件）是自律神經系統的重要觸發點，可能在數小時到數天後影響症狀","只有情緒病患者才需要記情緒狀態","情緒記錄是給心理師看的，不是給自己用的"], answer: 1, explanation: "情緒事件（與人衝突、重大決定、持續焦慮）是自律神經系統的重要輸入，可能在發生後數小時到數天影響症狀的嚴重程度。記錄情緒狀態幫助找出「情緒事件→症狀加重」這類規律，是理解個人觸發模式的重要一環。" },
      { id: "q3", question: "從症狀日記找模式時，「保護因素」指的是什麼？", options: ["避免所有可能觸發症狀的活動和情境","症狀輕或不出現的日子所共有的條件，如充足睡眠、特定活動","每天服用的保健食品和藥物","讓身體不受外界影響的隔離措施"], answer: 1, explanation: "保護因素是在症狀較輕或不出現的「好日子」中反覆出現的共同條件。識別保護因素就是找到「什麼讓你的神經系統比較穩定」——可能是充足睡眠、特定的休閒方式、較少的特定壓力來源。這些信息比「避免所有觸發點」更有建設性，不會讓生活範圍越縮越小。" },
      { id: "q4", question: "症狀日記帶去就醫時，最主要的價值是什麼？", options: ["讓醫生看到你有多認真對待自己的健康，從而得到更好的治療","幫助醫生快速識別個人的規律和觸發模式，比口頭描述更有診斷參考價值","作為申請長期病假的證明文件","幫助保險公司核定給付項目"], answer: 1, explanation: "患者在問診時通常難以準確回憶過去一個月的症狀模式，而症狀日記提供的是有時間序列的具體數據。醫生能從中看到週期性規律、與特定事件的關聯、以及症狀嚴重度的變化趨勢，這些信息有助於更準確地判斷觸發因素和調整治療方向。" },
      { id: "q5", question: "記了一週症狀日記，沒有發現任何規律，應該怎麼辦？", options: ["代表症狀是隨機的，日記對這個人沒有用，可以停止記錄","繼續記錄四到八週，很多個人規律需要更長的觀察期才能顯現","立即換一種日記格式，一定是記錄方式不對","停止記錄，改用智慧手錶的自動偵測代替手動日記"], answer: 1, explanation: "一週的數據量太少，很多重要規律（如週期性荷爾蒙影響、工作週期、季節因素）需要四到八週的觀察才能顯現。沒有發現規律不代表日記無效，代表觀察期還不夠長。建議至少持續記錄一個月，再做模式分析。" }
      ],
    }
    ],
  },
  {
    vol: "05",
    title: "自律神經Vol.05：長期失調的慢性病代價",
    subtitle: "從心血管到大腦退化：失調不處理的身體帳單",
    emoji: "⏳",
    cta: { text: "前往小舖購買 Vol.05 完整版（共10堂）", url: ST_BASE + '/6a3fd2f28dfebf4148dea252', seriesNote: "自律神經學系 7冊・從了解到改變" },
    lessons: [
      {
      id: "autonomic-preview-lesson-5",
      title: "失調不處理，會怎樣？",
      duration: 15,
      isFree: true,
      slides: [
      { id: "slide-1", type: "hook", title: "每年健檢多一個紅字……", content: `阿明四十二歲，業務主管，連續五年沒有真正放過假。他的身體也配合地沒有崩潰，只是每年健檢報告上多一個紅字：先是血壓略高，後來是血脂，再後來是空腹血糖偏高，最後是「建議追蹤」的心電圖異常。

每一個單獨拿出來，醫生都說「還好，注意一下」。

但沒有人告訴阿明：這些紅字之間有關係，而那條線索叫做「長期自律神經失調」。`, visual: `<svg viewBox="0 0 600 260" xmlns="http://www.w3.org/2000/svg"><rect width="600" height="260" fill="#0f172a" rx="12"/><text x="300" y="35" text-anchor="middle" fill="#e2e8f0" font-size="14" font-weight="bold" font-family="sans-serif">失調演進時間軸</text><line x1="50" y1="130" x2="550" y2="130" stroke="#334155" stroke-width="2"/><circle cx="130" cy="130" r="8" fill="#10b981"/><text x="130" y="110" text-anchor="middle" fill="#6ee7b7" font-size="11" font-family="sans-serif">初期失調</text><text x="130" y="155" text-anchor="middle" fill="#94a3b8" font-size="10" font-family="sans-serif">心悸/失眠/腸躁</text><circle cx="300" cy="130" r="8" fill="#f59e0b"/><text x="300" y="110" text-anchor="middle" fill="#fcd34d" font-size="11" font-family="sans-serif">中期積累</text><text x="300" y="155" text-anchor="middle" fill="#94a3b8" font-size="10" font-family="sans-serif">免疫下降/代謝異常</text><circle cx="470" cy="130" r="8" fill="#ef4444"/><text x="470" y="110" text-anchor="middle" fill="#fca5a5" font-size="11" font-family="sans-serif">長期代價</text><text x="470" y="155" text-anchor="middle" fill="#94a3b8" font-size="10" font-family="sans-serif">器官損傷/慢性病</text><text x="215" y="127" fill="#475569" font-size="16" font-family="sans-serif">→</text><text x="385" y="127" fill="#475569" font-size="16" font-family="sans-serif">→</text><rect x="50" y="180" width="500" height="40" rx="8" fill="#1e293b"/><text x="300" y="198" text-anchor="middle" fill="#fcd34d" font-size="12" font-family="sans-serif">⚠️ 這個過程是安靜的——你感覺「還好」的時候，帳單已經在累積</text></svg>` },
      { id: "slide-2", type: "concept", title: "失調是累積的，不是突然的", content: `自律神經系統像是身體的電力公司，負責分配能量、調節器官。

短暫失衡沒關係——就像跑百米後心跳加速，跑完就恢復。

問題在於「長期」——當你的神經系統持續處在備戰狀態，那個「恢復」的動作越來越短、越來越淺，最後幾乎消失。

身體不是電腦，沒辦法一直跑高負載而不付出代價。每個持續激活的系統都在消耗資源：荷爾蒙、免疫細胞、血管彈性、神經元連結。這些消耗在你感覺「還好」的時候就已經在進行了。

🐱 魯魯：身體就像信用卡帳單，你以為沒感覺就是沒欠款，但利息一直在滾。`, visual: `<svg viewBox="0 0 600 240" xmlns="http://www.w3.org/2000/svg"><rect width="600" height="240" fill="#0f172a" rx="12"/><text x="300" y="35" text-anchor="middle" fill="#e2e8f0" font-size="14" font-weight="bold" font-family="sans-serif">恢復能力的衰退</text><line x1="80" y1="50" x2="80" y2="190" stroke="#334155" stroke-width="1.5"/><line x1="80" y1="190" x2="560" y2="190" stroke="#334155" stroke-width="1.5"/><path d="M 100,80 Q 180,80 200,130 Q 220,180 300,80 Q 380,80 400,130 Q 420,180 500,80" fill="none" stroke="#10b981" stroke-width="2" stroke-dasharray="5,3"/><text x="420" y="68" fill="#6ee7b7" font-size="11" font-family="sans-serif">正常恢復</text><path d="M 100,100 Q 180,120 250,140 Q 320,160 400,170 Q 460,175 530,178" fill="none" stroke="#ef4444" stroke-width="2"/><text x="430" y="168" fill="#fca5a5" font-size="11" font-family="sans-serif">長期失調</text></svg>` },
      { id: "slide-3", type: "deepdive", title: "為什麼身體不早點警告你？", content: `這是人體設計的一個悲哀：很多損傷在初期沒有明顯症狀。

血管壁在增厚，海馬迴在縮小，免疫系統在失調——這些過程是安靜的。等到症狀出現，往往代表已經累積了好幾年。

這不是要嚇你。這是要讓你理解：

現在你感覺到的那些小症狀——睡不好、容易緊張、消化不順——不是「沒事」。它們是身體在說：「我需要幫忙。」

而「等以後再說」這個選項，其實比你以為的代價高很多。`, visual: `<svg viewBox="0 0 600 230" xmlns="http://www.w3.org/2000/svg"><rect width="600" height="230" fill="#0f172a" rx="12"/><text x="300" y="35" text-anchor="middle" fill="#e2e8f0" font-size="14" font-weight="bold" font-family="sans-serif">長期失調影響的系統</text><g transform="translate(40,55)"><rect x="0" y="0" width="115" height="60" rx="8" fill="#1e293b" stroke="#ef4444" stroke-width="1"/><text x="57" y="24" text-anchor="middle" fill="#fca5a5" font-size="12" font-family="sans-serif">❤️ 心血管</text><text x="57" y="44" text-anchor="middle" fill="#94a3b8" font-size="10" font-family="sans-serif">血壓↑ 動脈硬化</text></g><g transform="translate(170,55)"><rect x="0" y="0" width="115" height="60" rx="8" fill="#1e293b" stroke="#f59e0b" stroke-width="1"/><text x="57" y="24" text-anchor="middle" fill="#fcd34d" font-size="12" font-family="sans-serif">🛡️ 免疫系統</text><text x="57" y="44" text-anchor="middle" fill="#94a3b8" font-size="10" font-family="sans-serif">防禦力↓ 易生病</text></g><g transform="translate(300,55)"><rect x="0" y="0" width="115" height="60" rx="8" fill="#1e293b" stroke="#6366f1" stroke-width="1"/><text x="57" y="24" text-anchor="middle" fill="#c7d2fe" font-size="12" font-family="sans-serif">🧠 大腦</text><text x="57" y="44" text-anchor="middle" fill="#94a3b8" font-size="10" font-family="sans-serif">海馬迴↓ 記憶差</text></g><g transform="translate(430,55)"><rect x="0" y="0" width="115" height="60" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="1"/><text x="57" y="24" text-anchor="middle" fill="#6ee7b7" font-size="12" font-family="sans-serif">⚖️ 代謝</text><text x="57" y="44" text-anchor="middle" fill="#94a3b8" font-size="10" font-family="sans-serif">血糖↑ 體重↑</text></g><rect x="40" y="140" width="520" height="50" rx="8" fill="#1e293b" stroke="#6366f1" stroke-width="1"/><text x="300" y="162" text-anchor="middle" fill="#e2e8f0" font-size="13" font-family="sans-serif">好消息：損傷有邏輯，也有可能逆轉</text><text x="300" y="180" text-anchor="middle" fill="#94a3b8" font-size="11" font-family="sans-serif">了解機制不是為了焦慮，而是為了找到真正有效的介入點</text></svg>` },
      { id: "slide-4", type: "summary", title: "本堂重點", content: `📝 三件事，帶走就夠了：

① 失調是累積的過程
身體不是突然崩潰，而是長期在安靜地付出代價，「等以後再說」不是安全的選擇。

② 早期症狀是真實的信號
心悸、失眠、腸躁不是「壓力大的副產品」，而是神經系統在發出警告，值得被認真對待。

③ 損傷有邏輯，也有可能逆轉
了解機制不是為了焦慮，而是為了找到真正有效的介入點。`, visual: `<svg viewBox="0 0 600 190" xmlns="http://www.w3.org/2000/svg"><rect width="600" height="190" fill="#0f172a" rx="12"/><text x="300" y="32" text-anchor="middle" fill="#e2e8f0" font-size="15" font-weight="bold" font-family="sans-serif">長期失調的慢性病代價：三個核心</text><g transform="translate(50,50)"><rect x="0" y="0" width="500" height="36" rx="6" fill="#1e293b" stroke="#6366f1" stroke-width="1"/><text x="18" y="23" fill="#6366f1" font-size="16" font-family="sans-serif">①</text><text x="45" y="23" fill="#e2e8f0" font-size="13" font-family="sans-serif">失調是累積過程——「等以後」有代價</text></g><g transform="translate(50,96)"><rect x="0" y="0" width="500" height="36" rx="6" fill="#1e293b" stroke="#6366f1" stroke-width="1"/><text x="18" y="23" fill="#6366f1" font-size="16" font-family="sans-serif">②</text><text x="45" y="23" fill="#e2e8f0" font-size="13" font-family="sans-serif">早期小症狀是真實警告，不是「沒事」</text></g><g transform="translate(50,142)"><rect x="0" y="0" width="500" height="36" rx="6" fill="#1e293b" stroke="#6366f1" stroke-width="1"/><text x="18" y="23" fill="#6366f1" font-size="16" font-family="sans-serif">③</text><text x="45" y="23" fill="#e2e8f0" font-size="13" font-family="sans-serif">損傷有邏輯可介入——這不是命，是生理學</text></g></svg>` }
      ],
      quizzes: [
      { id: "q1", question: "阿明連續幾年健檢都有新的紅字，但每個醫生都說「還好」。這最可能說明什麼？", options: ["這些指標之間沒有關係，只是巧合","阿明的遺傳基因不好，這是命","這些紅字可能都跟長期自律神經失調有關，是系統性的累積","醫生的標準太嚴格，其實都在正常範圍"], answer: 2, explanation: "長期自律神經失調會系統性地影響心血管、代謝、免疫等多個系統。單看每個指標都「還好」，但把它們放在一起，可以看到長期備戰狀態對全身造成的慢性損傷。" },
      { id: "q2", question: "「很多損傷在初期沒有明顯症狀」這件事，對我們的行動最重要的啟示是什麼？", options: ["既然感覺不到，就不需要擔心","等症狀嚴重了再處理也不遲","現在感覺到的小症狀值得認真對待，不能一直等「以後再說」","定期做更多精密檢查，就能早期發現所有問題"], answer: 2, explanation: "很多損傷在初期是安靜進行的，等到症狀出現時往往已累積多年。現在的睡不好、容易緊張、消化問題，是身體在說「我需要幫忙」——這些信號值得認真對待。" }
      ],
    },
    {
      id: "auto-vol5-lesson-2",
      title: "心血管代價：壓力如何傷心臟",
      duration: 12,
      isFree: false,
      slides: [
      { id: "slide-1", type: "hook", title: "開場情境", content: `小玲，護理師，三十八歲，不抽菸、不喝酒、體重正常。但最近常常胸悶、偶爾頭痛，血壓開始「有點高但還好」。她不知道自己輪班加備班的生活型態，正在對心血管做什麼。`, visual: '' },
      { id: "slide-2", type: "deepdive", title: "交感神經的血壓效應", content: `交感神經持續激活會讓血管收縮、心跳加快。短期沒問題，但如果維持數月到數年，血管壁持續承受高壓，內皮細胞會受損。受損的血管內皮是動脈粥狀硬化的起點，整個過程完全沒有痛感。`, visual: '' },
      { id: "slide-3", type: "concept", title: "皮質醇：心臟的多重威脅", content: `長期高皮質醇同時從三個方向增加心臟負擔：讓血糖升高、促進內臟脂肪堆積、讓血液更容易凝結。更重要的是，它會降低心率變異性（HRV）——這個指標反映你的心臟從壓力中恢復的能力，HRV 越低，心臟越脆弱。`, visual: '' },
      { id: "slide-4", type: "deepdive", title: "常見誤解", content: `很多人以為「心臟病是遺傳或老年問題，跟我的壓力關係不大」。但動脈粥狀硬化可以從三十幾歲就開始悄悄發展；長期壓力造成的心血管損傷有非常清楚的生理路徑，跟你的年齡和基因同等重要。`, visual: '' },
      { id: "slide-5", type: "summary", title: "本堂重點", content: `① 血管損傷是無聲的——動脈硬化在多年前就開始，等到有感覺往往已是後期
② 皮質醇是多重威脅——從血糖、血脂、凝血三個方向同時施壓
③ HRV 是可觀測指標——心率變異性反映副交感神經保護力，可以透過適當介入改善
下一堂預告：壓力為什麼讓你同時容易生病又免疫過激？`, visual: '' }
      ],
      quizzes: [
      { id: "q1", question: "長期交感神經持續激活，最先在心血管系統造成的結構性傷害是什麼？", options: ["直接造成心肌細胞死亡","血管內皮細胞受損，成為動脈粥狀硬化的起點","立即導致心臟瓣膜功能異常","造成心包膜發炎"], answer: 1, explanation: "持續高血壓狀態下，血管最內層的內皮細胞承受壓力受損，這是動脈粥狀硬化的第一步。選項A的心肌細胞死亡通常是後期嚴重事件；選項C和D描述的是其他類型的心臟問題，不是慢性壓力的主要路徑。" },
      { id: "q2", question: "心率變異性（HRV）降低代表什麼？", options: ["心臟跳動的速度變慢","心臟節律太不規則，可能有心律不整","副交感神經對心臟的保護力下降，心臟從壓力中恢復的能力減弱","血壓過低，心臟輸出不足"], answer: 2, explanation: "HRV 反映的是心跳間隔的「靈活變化能力」——健康的心臟不是固定速率跳動，而是能靈活應對各種狀況。HRV 降低代表迷走神經（副交感）保護功能下降，心臟對壓力的緩衝能力變差。選項A混淆了HRV和心率；選項B是心律不整；選項D是低血壓。" },
      { id: "q3", question: "皮質醇影響心血管健康的三個主要路徑是哪些？", options: ["讓血糖升高、促進內臟脂肪堆積、讓血液更容易凝結","讓心跳加快、血管擴張、增加心臟輸出量","降低血壓、稀薄血液、增加血管彈性","抑制血糖、減少脂肪堆積、放鬆血管"], answer: 0, explanation: "皮質醇對心血管的三重影響：升高血糖（增加斑塊形成風險）、促進內臟脂肪（進一步的代謝風險）、增加血液凝結傾向（增加心肌梗塞風險）。選項B描述的是交感神經激活的效果；選項C和D完全相反。" },
      { id: "q4", question: "以下哪種行為長期下來對 HRV 的傷害最大？", options: ["每天進行30分鐘有氧運動","保持規律的睡眠時間","長期維持高強度工作、睡眠不足、缺乏休息","每天冥想10分鐘"], answer: 2, explanation: "長期高強度工作、睡眠不足和持續壓力會讓交感神經持續激活，副交感神經（迷走神經）的活性下降，直接壓低HRV。選項A、B、D都是提升HRV的有效方式，效果與選項C相反。" },
      { id: "q5", question: "為什麼慢性壓力下的人有時在「沒特別發生大事」的情況下發生心血管事件？", options: ["因為情緒不穩定導致瞬間血壓飆升","因為一個突然的巨大壓力觸發","因為長期保護機制（副交感神經、HRV）已耗盡，心臟對任何輕微刺激的緩衝能力很差","因為基因遺傳決定了發病時機"], answer: 2, explanation: "慢性壓力最危險的地方不是單一的大壓力，而是長期耗盡保護機制——HRV 持續下降、副交感神經保護力不足，讓心臟在面對平日的小刺激時也缺乏緩衝能力。這解釋了為什麼心血管事件常在「沒有明顯觸發因素」的情況下發生。" }
      ],
    },
    {
      id: "auto-vol5-lesson-3",
      title: "免疫系統失調：為什麼壓力大容易生病",
      duration: 12,
      isFree: false,
      slides: [
      { id: "slide-1", type: "hook", title: "開場情境", content: `同樣壓力很大的兩個同事：一個反覆感冒，每次都拖很久；另一個濕疹反覆發作，醫生說是「免疫過激」。他們面對同樣的壓力，卻出現看起來完全相反的問題——這背後的原因，就是壓力對免疫系統的雙向影響。`, visual: '' },
      { id: "slide-2", type: "deepdive", title: "短期壓力：短暫增強，長期破壞", content: `違反直覺的事實：短期急性壓力實際上會短暫提升某些免疫功能，因為身體在備戰狀態下要預防傷口感染。但這個提升有代價——長期壓力之後，免疫系統開始出現兩種方向的失調，而且可能同時發生在同一個人身上。`, visual: '' },
      { id: "slide-3", type: "concept", title: "長期壓力的免疫雙向破壞", content: `第一個方向：長期高皮質醇抑制細胞免疫功能，讓你對病毒的防禦下降，容易反覆感冒、舊的帶狀皰疹病毒復發。第二個方向：壓力破壞調節細胞功能，讓免疫系統失去精準度，開始在不應發炎的地方發炎——這就是自體免疫和過敏加重的根源。`, visual: '' },
      { id: "slide-4", type: "deepdive", title: "常見誤解", content: `很多人以為「壓力讓免疫力下降」是單向的，只會讓你「容易生病」。但其實壓力同時可能讓免疫系統「亂攻擊」——反覆感冒和濕疹反覆發作，都是免疫失調，只是方向不同。處理方式也因此不同。`, visual: '' },
      { id: "slide-5", type: "summary", title: "本堂重點", content: `① 壓力對免疫的影響是雙向的——可以同時讓你容易生病又讓免疫系統亂攻擊
② 長期壓力與自體免疫的連結是真實的——壓力是非常常見的誘發和惡化因子
③ 反覆感冒或皮膚反覆發作可能是警訊——免疫系統已不在穩定狀態
下一堂預告：長期壓力怎麼真實改變你的大腦結構。`, visual: '' }
      ],
      quizzes: [
      { id: "q1", question: "長期高皮質醇對免疫系統最主要的影響方向是？", options: ["只增強所有免疫功能，讓你更不容易生病","只抑制所有免疫功能，讓你更容易得各種感染","同時抑制特定免疫功能，又破壞免疫調節，可能造成雙向失調","對免疫系統沒有直接影響，只影響情緒"], answer: 2, explanation: "長期皮質醇的影響是雙向且複雜的：一方面抑制對病毒的細胞免疫（讓你容易感冒），另一方面破壞調節細胞功能（讓免疫失去精準度，過度發炎）。這不是矛盾，而是同一個失調系統的不同面向。" },
      { id: "q2", question: "以下哪個症狀可能是免疫「過激」方向的失調，而非免疫「抑制」？", options: ["流感後需要更長時間才能痊癒","帶狀皰疹病毒在壓力後復發","過敏症狀在壓力大時明顯加重","傷口癒合速度比以前慢"], answer: 2, explanation: "過敏症狀加重是免疫過激（免疫調節失常）的表現。選項A、B、D都屬於免疫抑制的方向：恢復慢、病毒復發、癒合緩慢，都是免疫防禦功能下降的結果。" },
      { id: "q3", question: "壓力與自體免疫疾病的關係，以下哪個描述最準確？", options: ["壓力直接「造成」所有自體免疫疾病","壓力和自體免疫疾病完全無關","壓力是自體免疫疾病的常見誘發和惡化因子，打破免疫系統維持的精密平衡","只有在已有遺傳傾向的人身上，壓力才會影響免疫"], answer: 2, explanation: "壓力是自體免疫疾病的重要誘發和惡化因子，臨床上大壓力事件後自體免疫病發作或惡化非常常見。但這不代表壓力「直接造成」自體免疫病——遺傳、環境等因素也有作用。選項A過度簡化；選項B否認了真實的連結；選項D不完整，壓力對免疫的影響不只限於有遺傳傾向的人。" },
      { id: "q4", question: "為什麼有些人壓力大時「反覆感冒」，有些人卻是「過敏或皮膚炎加重」？", options: ["純粹是個人體質的基因決定，與壓力無關","反覆感冒的人壓力大，皮膚炎加重的人壓力小","兩者都是免疫失調，但各人免疫失調的主要方向不同，可能同時發生在同一人身上","反覆感冒是細菌感染，皮膚炎是過敏，兩者機制完全不同且互相排斥"], answer: 2, explanation: "這兩種表現都是壓力下免疫失調的結果，只是失調的方向不同——有人以免疫抑制為主，有人以免疫調節失常為主，而且同一個人可能同時有兩個方向的問題。選項A忽略了壓力的真實影響；選項B錯誤地把壓力大小和症狀類型掛鉤；選項D把這兩種情況當成完全分離的問題。" },
      { id: "q5", question: "一個長期壓力大的人，以下哪個情況最需要認真對待，不應只歸因於「最近比較累」？", options: ["偶爾運動後肌肉痠痛","吃了不乾淨食物後腸胃不適","反覆感冒，每次都比以前拖更久才好","換季時鼻子稍微過敏一兩天"], answer: 2, explanation: "反覆感冒且癒合時間拉長，是免疫功能下降的典型信號，在長期壓力背景下尤其值得注意，可能提示細胞免疫功能受到皮質醇長期抑制。選項A、B、D都有更合理的解釋，且通常屬於一次性的正常反應。" }
      ],
    },
    {
      id: "auto-vol5-lesson-4",
      title: "大腦退化：長期壓力真的會縮小海馬迴",
      duration: 12,
      isFree: false,
      slides: [
      { id: "slide-1", type: "hook", title: "開場情境", content: `小玲的媽媽六十歲，退休後記憶力越來越差，常常忘東忘西，以為是老化。但她同時有多年睡眠問題和長期焦慮史。記憶下滑真的只是歲月問題嗎？還是有另一個原因？`, visual: '' },
      { id: "slide-2", type: "deepdive", title: "海馬迴：壓力最先打擊的腦區", content: `海馬迴負責形成新記憶、空間導航和壓力調節，同時也是全身皮質醇受體密度最高的腦區之一。長期高皮質醇會抑制海馬迴的神經新生、縮短樹突、並在極端情況下加速神經元死亡。這些改變累積後，海馬迴體積真的會縮小——這不是比喻，而是可以在腦部影像上測量的真實變化。`, visual: '' },
      { id: "slide-3", type: "concept", title: "記憶與情緒調節同時受損", content: `海馬迴功能下降帶來兩個主要問題：記憶上，短期記憶轉化長期記憶的效率變差，學新東西越來越慢；情緒上，海馬迴參與抑制杏仁核（情緒中心）——海馬迴弱化後，杏仁核更容易過度反應，讓你對壓力的情緒反應更強、更難平復。這兩件事有共同的神經根源。`, visual: '' },
      { id: "slide-4", type: "deepdive", title: "常見誤解", content: `很多人以為「記性變差和情緒不穩定是兩個獨立問題」。但在慢性壓力的語境下，它們往往有同一個根源：海馬迴功能受損和前額葉皮質突觸連結稀疏。把它們分開各自處理，就錯過了共同的根源。`, visual: '' },
      { id: "slide-5", type: "summary", title: "本堂重點", content: `① 海馬迴縮小是可測量的真實變化——不是比喻，是影像可見的結構改變，與長期高皮質醇直接相關
② 記憶力下降和情緒過激往往同步——理解共同根源才能有效處理
③ 這些變化部分可逆——神經新生在壓力減輕後可以恢復，第9堂會深入說明
下一堂預告：皮質醇和血糖的惡性循環，以及代謝問題的神經根源。`, visual: '' }
      ],
      quizzes: [
      { id: "q1", question: "為什麼海馬迴在長期壓力下特別容易受到損傷？", options: ["因為它是大腦中最大的結構，接受最多血流","因為它是全身皮質醇受體密度最高的腦區之一，對皮質醇變化特別敏感","因為它直接控制腎上腺素的分泌","因為它是唯一沒有血腦屏障保護的腦區"], answer: 1, explanation: "海馬迴擁有極高密度的皮質醇受體，這讓它對皮質醇的變化特別敏感——長期高皮質醇直接作用在這些受體上，抑制神經新生、損傷樹突結構。這不是大小或血流的問題，而是受體密度決定的敏感性。" },
      { id: "q2", question: "長期高皮質醇對海馬迴的神經新生有什麼影響？", options: ["大幅促進神經新生，讓記憶力暫時提升","對神經新生沒有影響，只影響現有神經元的功能","抑制神經新生，讓海馬迴新神經元的生成減少","先促進後抑制，有明顯的時間相依性"], answer: 2, explanation: "長期高皮質醇持續抑制海馬迴的神經新生（在齒狀回的新神經元產生），這是海馬迴功能下降和體積縮小的重要機制之一。短期急性壓力有不同效果，但長期慢性壓力的方向是抑制。" },
      { id: "q3", question: "「記憶力變差」和「情緒容易過激」在慢性壓力中同時出現，最直接的共同神經根源是什麼？", options: ["睡眠不足導致大腦整體疲勞","海馬迴功能受損，同時影響記憶形成和對杏仁核的調節抑制","皮質醇直接影響血清素的分泌","前額葉皮質血流不足"], answer: 1, explanation: "海馬迴是這兩件事的共同關鍵：它負責記憶形成，同時也參與抑制杏仁核的過度反應。當海馬迴受損，兩個功能同時下降，這就是為什麼長期壓力的人常常「記性變差」和「情緒越來越難控制」同時出現。" },
      { id: "q4", question: "前額葉皮質在長期壓力下的主要變化是什麼？", options: ["突觸連結增多，判斷力提升","突觸連結稀疏，判斷力下降、容易衝動","體積縮小但功能不受影響","血流增加，處理能力暫時提升"], answer: 1, explanation: "長期皮質醇讓前額葉皮質的突觸連結變稀疏，表現為決策困難、容易衝動、難以做長遠思考。同時杏仁核的活性相對增強，讓人「明知道不合理，卻忍不住焦慮」。這是慢性壓力對大腦結構的真實影響。" },
      { id: "q5", question: "一個長期工作壓力大的人說：「最近記憶力下降，同時情緒也越來越不穩定，覺得自己老了。」以下哪個解釋最可能是真實情況？", options: ["這兩件事確實是老化造成的，與工作壓力無關","記憶力下降是老化，情緒不穩是性格問題，要分開處理","這兩件事可能都與長期壓力對海馬迴和前額葉的影響有關，有共同的神經根源","情緒不穩一定是憂鬱症，需要立即藥物治療"], answer: 2, explanation: "在長期高壓背景下，記憶力下降和情緒不穩同時出現，最可能有共同的神經根源——海馬迴受損（影響記憶）和前額葉/杏仁核失衡（影響情緒調節）。把它們當「老化」或分開的問題處理，就錯過了可以共同處理的機會。" }
      ],
    },
    {
      id: "auto-vol5-lesson-5",
      title: "代謝問題：皮質醇與血糖的惡性循環",
      duration: 12,
      isFree: false,
      slides: [
      { id: "slide-1", type: "hook", title: "開場情境", content: `阿明的空腹血糖四十歲開始偏高。他戒掉了甜食，但血糖就是降不到正常值。醫生說注意飲食，他不明白——我都沒在吃糖了，為什麼血糖還是高？答案在他的工作模式裡，不在他的餐盤裡。`, visual: '' },
      { id: "slide-2", type: "deepdive", title: "皮質醇是天然升糖激素", content: `這是很多人不知道的事：皮質醇本身就會讓血糖升高——它的功能之一就是在壓力狀態下讓肝臟釋放儲存的肝醣，給大腦和肌肉提供快速能量。短期合理，但如果皮質醇長期偏高，血糖就會持續在略高水平，胰臟要分泌更多胰島素來應對，久而久之細胞對胰島素的敏感度下降，這就是胰島素阻抗——第二型糖尿病的前身。`, visual: '' },
      { id: "slide-3", type: "concept", title: "內臟脂肪：壓力肥肚的真相", content: `皮質醇特別促進「內臟脂肪」堆積——圍繞器官的脂肪，不是皮下脂肪。內臟脂肪代謝活性高，會分泌促發炎物質，與心血管風險和代謝症候群強力相關。這解釋了為什麼有些人整體不重，但腰圍偏大、健檢各項數值都在邊緣——不是吃太多，是壓力太久。`, visual: '' },
      { id: "slide-4", type: "deepdive", title: "常見誤解", content: `很多人以為「控制飲食就能控血糖」，但在壓力未解決的情況下，皮質醇持續升糖的效果讓飲食控制的效率大打折扣。血糖問題往往需要同時處理壓力和睡眠，才能真正看到改善。`, visual: '' },
      { id: "slide-5", type: "summary", title: "本堂重點", content: `① 皮質醇本身就是升糖激素——這讓「控制飲食卻血糖不降」有了生理學解釋
② 內臟脂肪是壓力的直接產物——腰圍增加不只是熱量問題，皮質醇的脂肪分配效應是主因
③ 代謝症候群是多系統失調的結果——壓力管理和睡眠質量是和飲食運動同等重要的變量
下一堂預告：慢性發炎，身體裡看不見的火。`, visual: '' }
      ],
      quizzes: [
      { id: "q1", question: "皮質醇在壓力狀態下對血糖的直接作用是什麼？", options: ["讓胰臟分泌更多胰島素，降低血糖","讓肝臟釋放儲存的肝醣，升高血糖","直接讓細胞吸收更多葡萄糖","抑制血糖生成，讓能量重新分配"], answer: 1, explanation: "皮質醇是天然升糖激素，它會刺激肝臟進行糖質新生（gluconeogenesis）並釋放儲存的肝醣，讓血糖升高。這在短期壓力下是為了提供快速能量，但長期高皮質醇就會持續讓血糖偏高。" },
      { id: "q2", question: "什麼是胰島素阻抗，它和長期壓力的關係是什麼？", options: ["胰島素分泌不足，與壓力完全無關","細胞對胰島素的反應變差，長期高皮質醇是重要促成因素","胰島素分泌過多，導致血糖過低","身體停止分泌胰島素，是第一型糖尿病的前身"], answer: 1, explanation: "胰島素阻抗是指細胞對胰島素的敏感度下降，需要更多胰島素才能把血糖帶入細胞。長期高皮質醇持續升高血糖，逼迫胰臟持續分泌大量胰島素，久而久之細胞失去敏感性，形成阻抗。這是第二型糖尿病的前身，而非第一型。" },
      { id: "q3", question: "為什麼有些人整體體重不重，腰圍卻偏大，而且各項代謝指標都在邊緣？", options: ["這純粹是遺傳體型的差異，無法改變","可能是因為長期皮質醇偏高，促進內臟脂肪（圍繞器官的脂肪）優先堆積","他們一定有隱性的暴飲暴食習慣","這是年齡增長的必然現象"], answer: 1, explanation: "皮質醇有特別促進內臟脂肪堆積的作用，內臟脂肪不同於皮下脂肪，它圍繞器官、代謝活性高、促發炎效果強。這解釋了為什麼長期高壓的人可能整體體重正常但腰圍大、代謝指標偏差——這是壓力荷爾蒙的脂肪分配效應。" },
      { id: "q4", question: "阿明控制飲食但血糖仍持續偏高，最可能被忽略的原因是什麼？", options: ["他的飲食控制方式錯誤，需要更嚴格限制熱量","他可能有遺傳性糖尿病","長期工作壓力讓皮質醇持續偏高，直接讓血糖維持在略高水平","他的運動量不足，需要增加有氧運動"], answer: 2, explanation: "在壓力未解決的情況下，皮質醇持續升糖的效果讓單純飲食控制的效率大打折扣。阿明的情況最可能的解釋是：壓力荷爾蒙直接干擾血糖調節，不是飲食問題，需要同時處理壓力源。" },
      { id: "q5", question: "代謝症候群通常包含哪些同時出現的異常？", options: ["高血壓、低血糖、低血脂、體重過輕","高血壓、高血糖、高血脂、腹部肥胖","低血壓、高血糖、高血脂、全身性肥胖","高血壓、低血糖、高血脂、四肢水腫"], answer: 1, explanation: "代謝症候群的診斷通常包括：高血壓、高血糖（或胰島素阻抗）、高血脂（高三酸甘油酯/低HDL）、腹部肥胖（腰圍過大）同時出現。這幾個問題在長期壓力和皮質醇偏高的情況下有共同的神經內分泌根源。" }
      ],
    },
    {
      id: "auto-vol5-lesson-6",
      title: "慢性發炎：身體的隱形火災",
      duration: 12,
      isFree: false,
      slides: [
      { id: "slide-1", type: "hook", title: "開場情境", content: `小玲的媽媽做了hs-CRP檢查，發炎指數輕微偏高，但醫生說「沒有特別的感染或發炎」，只建議注意飲食。她不明白：我哪裡在發炎？我又不痛。這就是慢性低度發炎的特點——完全沒有你認識的那種「發炎感覺」。`, visual: '' },
      { id: "slide-2", type: "deepdive", title: "急性 vs 慢性：完全不同的發炎", content: `急性發炎：扭傷腳踝、紅腫熱痛，幾天後消退，這是修復過程。慢性低度發炎：沒有感染源、沒有痛感，但免疫細胞持續釋放微量促發炎物質（細胞激素）。這個過程如果持續數年，會損傷血管內皮、加速動脈硬化、干擾胰島素信號，並讓免疫系統持續消耗資源。`, visual: '' },
      { id: "slide-3", type: "concept", title: "發炎與憂鬱的雙向連結", content: `這是近年神經科學的重要發現：慢性發炎和憂鬱症之間有雙向關係。發炎細胞激素（IL-6、IL-1β）可以穿越血腦屏障，干擾血清素和多巴胺的代謝，讓大腦進入「生病行為」模式——疲倦、提不起勁、對什麼都沒興趣。這不完全是「心理問題」，有一部分是免疫系統在影響大腦化學環境。`, visual: '' },
      { id: "slide-4", type: "deepdive", title: "常見誤解", content: `很多人以為「發炎就是感覺到痛或腫，沒感覺就代表沒發炎」。但慢性低度發炎完全沒有明顯症狀，hs-CRP 輕微偏高是值得認真對待的信號，不只是「注意飲食」那麼簡單——因為來源往往在壓力和睡眠，不只是食物。`, visual: '' },
      { id: "slide-5", type: "summary", title: "本堂重點", content: `① 慢性發炎是沉默的——沒有紅腫熱痛不代表沒有發炎，發炎指標輕微偏高值得認真看待
② 壓力直接製造發炎——交感神經和皮質醇系統都從不同方向促進發炎狀態
③ 情緒低落可能有免疫根源——發炎細胞激素影響腦部神經傳導物質是真實的生理路徑
下一堂預告：為什麼壓力軸會搶走你的性荷爾蒙和甲狀腺功能。`, visual: '' }
      ],
      quizzes: [
      { id: "q1", question: "慢性低度發炎與急性發炎最主要的區別是什麼？", options: ["慢性發炎的發炎反應更劇烈，急性發炎較溫和","急性發炎有明確觸發源、短期且可感知；慢性發炎持續、低度、無明顯症狀","慢性發炎只影響皮膚，急性發炎影響內臟","急性發炎有害，慢性發炎對身體是保護性的"], answer: 1, explanation: "急性發炎是有明確感染源或傷害的短期修復反應，有紅腫熱痛等症狀；慢性低度發炎則是持續性的低水平免疫激活，沒有明顯症狀但長期損傷組織。兩者機制不同，管理方式也不同。" },
      { id: "q2", question: "壓力透過哪兩條主要路徑製造慢性發炎？", options: ["增加白血球數量、直接殺死免疫細胞","交感神經激活刺激促發炎細胞激素釋放、長期皮質醇讓免疫系統失去對皮質醇的敏感度（抗發炎煞車失效）","讓腎臟分泌更多發炎物質、直接破壞淋巴系統","讓血液pH值改變、讓血管通透性增加"], answer: 1, explanation: "壓力製造慢性發炎的兩條路徑：第一，交感神經激活讓免疫細胞（單核球、巨噬細胞）釋放促發炎細胞激素；第二，長期高皮質醇使組織對皮質醇的敏感度下降，原本皮質醇的抗發炎功能失效，失去煞車作用。" },
      { id: "q3", question: "以下哪個情況最說明「情緒低落可能有免疫根源」這個概念？", options: ["高興的時候免疫力比較好","慢性發炎患者的血液中常見高濃度促發炎細胞激素，而這些物質可以影響大腦的神經傳導物質代謝","憂鬱的人更容易感染病毒","接種疫苗後有些人會短暫情緒低落"], answer: 1, explanation: "發炎細胞激素（如IL-6、IL-1β）可以穿越血腦屏障，干擾血清素和多巴胺的合成與代謝，這是「慢性發炎→情緒低落」的直接生理機制。選項C方向相反（情緒影響免疫，而非免疫影響情緒）；選項D是短期急性反應，不是慢性機制。" },
      { id: "q4", question: "hs-CRP（高敏感性C反應蛋白）輕微偏高，但沒有感染或明顯發炎症狀，最可能代表什麼？", options: ["可能是慢性低度發炎的指標，值得進一步評估壓力、睡眠和生活型態","數值輕微偏高通常是誤差，不需要任何關注","一定有隱藏的感染，需要立即使用抗生素","這是正常的免疫活動，每個人都有這個數值"], answer: 0, explanation: "hs-CRP 是慢性低度發炎的敏感指標，輕微偏高但無感染源，最可能反映慢性發炎狀態，值得評估生活型態——包括長期壓力、睡眠質量和飲食模式。選項B低估了信號的意義；選項C過度反應且方向錯誤；選項D不正確，正常值應在正常範圍內。" },
      { id: "q5", question: "為什麼長期壓力後，皮質醇量不一定異常，發炎指標卻常常偏高？", options: ["因為皮質醇測值反映瞬間水平，不能代表長期狀態","因為長期暴露後，組織對皮質醇的敏感度下降，皮質醇的抗發炎功能大幅減弱","因為發炎指標偏高是壓力測量方法不夠準確","因為皮質醇實際上本來就是促發炎物質"], answer: 1, explanation: "這是一個重要的臨床觀察：長期壓力的人皮質醇血中濃度不一定異常，但組織對皮質醇受體的敏感度下降——本來皮質醇是抗發炎的，但受體不響應時，這個煞車功能失效，促發炎的狀態就無法被抑制。" }
      ],
    },
    {
      id: "auto-vol5-lesson-7",
      title: "荷爾蒙失調：壓力軸搶走了性荷爾蒙",
      duration: 12,
      isFree: false,
      slides: [
      { id: "slide-1", type: "hook", title: "開場情境", content: `阿明的太太三十五歲，月經開始不規律，有時兩個月才來一次。婦科說一切正常，建議觀察。同一時間她工作壓力很大、睡眠品質很差。這兩件事真的沒有關係嗎？`, visual: '' },
      { id: "slide-2", type: "deepdive", title: "皮質醇偷竊：共用原料的競爭", content: `皮質醇和性荷爾蒙（睪固酮、雌激素、黃體素）都來自同一種原料——膽固醇，以及衍生物DHEA。長期壓力下，身體的優先序是「生存先於繁殖」，製造更多皮質醇時，原本可以轉化為性荷爾蒙的資源被重新導向皮質醇合成路徑。結果就是性荷爾蒙減少。`, visual: '' },
      { id: "slide-3", type: "concept", title: "對女性和男性的不同影響", content: `女性：黃體素最容易被壓力影響，導致月經週期不規律、經前症候群加重、甚至功能性閉經。甲狀腺功能也受影響——皮質醇抑制TSH分泌和T4轉T3，帶來疲勞、怕冷、代謝變慢。男性：睪固酮在長期高皮質醇下會降低，表現為性慾下降、肌肉量流失、情緒低落——這些常被誤歸因於「老了」。`, visual: '' },
      { id: "slide-4", type: "deepdive", title: "常見誤解", content: `很多人以為「荷爾蒙問題是婦科或男科的問題，跟壓力和神經系統是不同的事」。但HPA軸（壓力軸）、HPG軸（性腺軸）、HPT軸（甲狀腺軸）三者共用上游調控，長期壓力對這三個系統有直接的跨軸影響。`, visual: '' },
      { id: "slide-5", type: "summary", title: "本堂重點", content: `① 壓力軸和性腺軸共用資源——這是生化事實，月經不規律和性慾下降有時是壓力的直接荷爾蒙後果
② 黃體素是女性最容易被壓力影響的性荷爾蒙——月經週期混亂的神經內分泌根源之一
③ 甲狀腺功能也在壓力軸影響範圍內——疲勞和代謝下降不一定只是甲狀腺本身的問題
下一堂預告：把所有損傷串起來，看一張從失調到慢性病的真實時間軸。`, visual: '' }
      ],
      quizzes: [
      { id: "q1", question: "皮質醇和性荷爾蒙之間的「資源競爭」，其生化基礎是什麼？", options: ["皮質醇直接破壞性荷爾蒙分子結構","兩者都來自膽固醇/DHEA，長期壓力下資源被優先分配給皮質醇合成","皮質醇阻斷性腺對LH/FSH的反應","兩者在血液中互相競爭相同的受體"], answer: 1, explanation: "皮質醇和性荷爾蒙（包括睪固酮、雌激素、黃體素）的合成路徑有共同的上游原料——膽固醇→DHEA→分叉至皮質醇或性荷爾蒙。長期壓力下，身體優先把資源導向皮質醇合成（生存優先），讓性荷爾蒙原料不足。" },
      { id: "q2", question: "在女性中，最容易受到長期壓力影響而下降的性荷爾蒙是哪一種？", options: ["雌激素（雌二醇）","黃體素（孕酮）","濾泡刺激素（FSH）","催乳素（Prolactin）"], answer: 1, explanation: "黃體素（孕酮）是女性最容易被慢性壓力影響的性荷爾蒙。黃體素不足導致月經週期不規律、黃體期縮短、經前症候群加重，甚至功能性閉經。雌激素受直接影響相對較少，但黃體素不足可造成「相對雌激素優勢」。" },
      { id: "q3", question: "長期壓力對甲狀腺功能的影響主要是透過哪個機制？", options: ["直接破壞甲狀腺組織","讓身體產生甲狀腺抗體","皮質醇抑制TSH分泌並阻礙T4轉換為活性T3","增加甲狀腺過氧化酶的活性"], answer: 2, explanation: "長期高皮質醇抑制下視丘-腦垂體釋放TSH，同時阻礙T4（非活性）轉換為T3（活性甲狀腺素）的過程。結果是功能性甲狀腺低下——即使甲狀腺本身沒有器質性問題，功能仍然偏低，帶來疲勞、怕冷、代謝下降。" },
      { id: "q4", question: "以下哪個情況最可能需要同時評估壓力狀態，而非只做荷爾蒙補充？", options: ["更年期後雌激素自然下降","長期高強度工作的三十五歲女性出現月經不規律","甲狀腺切除後需要補充甲狀腺素","手術後睪固酮分泌不足"], answer: 1, explanation: "長期高壓工作的中年女性出現月經不規律，最可能的原因之一是壓力荷爾蒙對HPG軸的影響，需要評估壓力狀態。單純補充荷爾蒙而不處理壓力源，難以持續改善。選項A、C、D都有更直接的生理原因，壓力的作用不是首要考量。" },
      { id: "q5", question: "男性在長期高壓狀態下睪固酮降低，常見的表現是哪些？", options: ["肌肉量增加、體重下降、情緒亢奮","性慾下降、肌肉量流失、情緒低落、容易疲勞","血壓升高、心跳加快、睡眠增加","食慾增加、體重增加、情緒波動"], answer: 1, explanation: "睪固酮低下的典型表現包括：性慾下降、肌肉量流失（睪固酮是合成代謝激素）、情緒低落（睪固酮影響多巴胺系統）和容易疲勞。這些症狀在中年男性中常被歸因於「老化」，但在高壓背景下，壓力荷爾蒙的影響是重要因素。" }
      ],
    },
    {
      id: "auto-vol5-lesson-8",
      title: "從失調到慢性病：時間軸是什麼樣的",
      duration: 12,
      isFree: false,
      slides: [
      { id: "slide-1", type: "hook", title: "開場情境", content: `如果把阿明的故事放在時間軸上：三十五歲出現偶發失眠和腸胃不適，三十八歲開始血壓略高，四十歲血糖偏高，四十二歲心電圖異常。這些不是隨機的，而是有順序的——從「功能性失調」走向「器官損傷」的清楚軌跡。`, visual: '' },
      { id: "slide-2", type: "deepdive", title: "第一階段：功能性失調（1–3年）", content: `這個階段器官本身沒有損傷，但調節功能出問題。症狀：偶發疲勞、間歇失眠、腸胃不適、心悸，但所有檢查都正常。這是最容易被忽略的階段，也是介入效果最好、損傷最完整可逆的時機。「醫生說沒事」不代表「真的沒事」。`, visual: '' },
      { id: "slide-3", type: "concept", title: "第二階段（3–7年）與第三階段（7年以上）", content: `第二階段出現可測量的生化和結構改變：血壓偏高、血糖邊緣、HRV下降、免疫功能開始異常——症狀更持續，但大部分仍可逆。第三階段：實質器官損傷或確診慢性病（高血壓、糖尿病、動脈粥狀硬化、認知下降）。有些可逆、有些不完全可逆，但幾乎都可以「停止惡化」。`, visual: '' },
      { id: "slide-4", type: "deepdive", title: "常見誤解", content: `很多人以為慢性病是「某天突然發生的」，所以在症狀出現之前覺得不需要特別關注。但這個時間軸告訴你：在確診的十年前，身體就已經給出信號了——只是這些信號沒有被認識和重視。`, visual: '' },
      { id: "slide-5", type: "summary", title: "本堂重點", content: `① 失調到慢性病有時間軸——這個過程通常歷時多年，有清楚的階段和介入機會
② 第一階段是最好的介入時機——即使所有檢查正常，功能性症狀已經在說話
③ 時間軸有個體差異——進展速度因基因、睡眠、支持系統而異，但幾乎每個人都有可介入的窗口
下一堂預告：神經系統的損傷可以逆轉嗎？修復能力比你想像的強。`, visual: '' }
      ],
      quizzes: [
      { id: "q1", question: "自律神經失調的第一階段（功能性失調）最典型的特徵是什麼？", options: ["有明顯的器官損傷，健檢數值嚴重異常","完全沒有任何主觀症狀","有主觀症狀（疲勞、失眠、腸躁、心悸）但各項檢查結果正常","只有情緒症狀，沒有身體症狀"], answer: 2, explanation: "功能性失調階段的核心特徵是「症狀存在，但檢查正常」——這也是最容易被忽略的原因。器官功能調節出問題，但還沒有到測量得到損傷的程度。這個階段恰恰是介入效果最好、損傷最完整可逆的時機。" },
      { id: "q2", question: "從第一階段到第三階段，以下哪個描述最符合損傷可逆性的變化趨勢？", options: ["三個階段的損傷都完全不可逆","越到後期，損傷越難逆轉，但通常仍可阻止惡化","第三階段的損傷比第一階段更容易逆轉","三個階段的損傷都可以完全逆轉"], answer: 1, explanation: "可逆性隨階段進展而降低：第一階段功能性改變幾乎完全可逆；第二階段結構和生化改變多數可逆；第三階段器質性損傷有些可逆、有些不完全可逆，但通常可以阻止繼續惡化。越早介入，復原幅度越大。" },
      { id: "q3", question: "以下哪個情況最適合描述「第二階段（適應性異常）」的狀態？", options: ["健檢完全正常，但主觀上感覺容易疲勞","血壓確診高血壓，需要長期服藥控制","血壓開始偏高、血糖邊緣、HRV下降，症狀更持續但尚未確診慢性病","出現動脈斑塊，需要心導管手術評估"], answer: 2, explanation: "第二階段的特徵是「開始出現可測量的生化和結構改變」但尚未達到確診慢性病的標準——血壓偏高（但未確診）、血糖邊緣、HRV下降。選項A是第一階段；選項B和D是第三階段。" },
      { id: "q4", question: "為什麼說「醫生說沒事」不代表「真的沒事」，在這個時間軸的框架下？", options: ["因為醫生通常看診時間太短，會漏診","因為第一階段的功能性失調在常規檢查中測不到，但調節功能已出問題","因為醫生只關心症狀，不關心預防","因為所有的自律神經問題都被主流醫學忽視"], answer: 1, explanation: "第一階段的功能性失調——器官調節功能出問題，但器官本身沒有損傷——在常規的抽血、心電圖、超音波等檢查中無法偵測到。這不是醫生的疏失，而是常規醫療系統設計的局限：它看器官，不看調節功能。" },
      { id: "q5", question: "若有個人在三十五歲出現偶發失眠和心悸，健檢正常，那麼根據這個時間軸，最好的下一步是什麼？", options: ["等到確診慢性病後再介入，因為目前沒有醫療需求","認真對待這些早期信號，在第一階段就開始評估和處理壓力和睡眠","立即進行所有可能的侵入性檢查，找出隱藏疾病","忽略症狀，等症狀加重後再看醫生"], answer: 1, explanation: "這正是第一階段——症狀存在、檢查正常——最好的介入時機。在功能性階段處理，損傷最容易逆轉，花費最少，效果最好。等到確診慢性病（選項A）或等症狀加重（選項D）都錯過了最佳時機；選項C過度醫療化。" }
      ],
    },
    {
      id: "auto-vol5-lesson-9",
      title: "可逆還是不可逆？神經系統的修復能力",
      duration: 12,
      isFree: false,
      slides: [
      { id: "slide-1", type: "hook", title: "開場情境", content: `讀完前八堂，你可能有點沮喪：心血管損傷、海馬迴縮小、免疫失調、荷爾蒙紊亂——聽起來很嚴重。但在繼續之前，我需要先告訴你一件事：人體的修復能力，遠比我們以為的強大。「成人大腦不能再生」是個過時的觀念。`, visual: '' },
      { id: "slide-2", type: "deepdive", title: "神經可塑性：大腦一直在改變", content: `「神經可塑性」已是確立的神經科學共識：大腦在整個生命週期中持續形成新的突觸連結、修剪舊的連結，海馬迴的齒狀回甚至持續產生新神經元。這個過程的關鍵促進因子叫BDNF（腦源性神經滋養因子）——運動、睡眠、社交、冥想都能提升它，而長期壓力會壓制它。`, visual: '' },
      { id: "slide-3", type: "concept", title: "哪些損傷比較容易逆轉？", content: `功能性改變（荷爾蒙水平、HRV、血壓、免疫指標）恢復最快，壓力減輕後幾週到幾個月可見改善。結構性改變（海馬迴體積、動脈彈性、胰島素敏感度）需要幾個月到幾年，但確實可逆——研究顯示規律運動和睡眠改善後海馬迴體積可以增加。器質性損傷（動脈斑塊、確診自體免疫病）難以完全逆轉，但可以停止惡化，甚至部分改善。`, visual: '' },
      { id: "slide-4", type: "deepdive", title: "常見誤解", content: `很多人以為「神經系統一旦損傷就是永久的，沒救了」。但神經可塑性的研究清楚顯示，大腦的結構改變在適當條件下是可以逆轉的。修復的關鍵不是被動等待，而是主動創造條件：移除壓力源、改善睡眠、有氧運動、社交連結。`, visual: '' },
      { id: "slide-5", type: "summary", title: "本堂重點", content: `① 神經可塑性是真實的生理機制——大腦的適應力比你以為的強，很多壓力下的改變是可以逆轉的
② BDNF 是修復的關鍵媒介——運動、睡眠、社交是提升它的實際手段
③ 越早介入，復原幅度越大——功能性改變最容易逆轉，現在就開始永遠是正確答案
下一堂預告：「預防比治療重要」這句話的真正意義，以及你現在可以做的事。`, visual: '' }
      ],
      quizzes: [
      { id: "q1", question: "神經可塑性（neuroplasticity）的核心含義是什麼？", options: ["大腦只在兒童期可以改變，成人後結構固定","大腦在整個生命週期中持續形成新突觸連結、修剪舊連結，並在特定腦區產生新神經元","大腦可以改變，但只有在藥物介入的情況下才有可能","大腦的重量和體積在成年後不再改變"], answer: 1, explanation: "神經可塑性是已確立的神經科學共識：大腦終生持續重塑，包括突觸連結的增加和修剪，以及在特定腦區（如海馬迴齒狀回）的新神經元生成（神經新生）。「成人大腦不能再生」是過時觀念。" },
      { id: "q2", question: "BDNF（腦源性神經滋養因子）在大腦修復中的主要角色是什麼？", options: ["直接清除大腦中的毒素和代謝廢物","促進神經新生、維持突觸連結的健康，是大腦修復和可塑性的重要媒介","控制大腦的睡眠-清醒週期","是神經細胞的主要能量來源"], answer: 1, explanation: "BDNF被稱為「大腦的肥料」——它促進神經元存活、新突觸形成、以及海馬迴的神經新生，是大腦適應和修復的關鍵蛋白質。長期壓力和皮質醇會抑制BDNF，而運動、睡眠、社交、冥想都能提升它。" },
      { id: "q3", question: "以下哪些活動能有效提升 BDNF，促進神經修復？", options: ["長期久坐、睡眠不足、社交孤立","有氧運動、充足睡眠、社交連結、冥想","高強度的認知任務、咖啡因、補充維生素","減少飲食、斷食、降低體溫"], answer: 1, explanation: "有氧運動是最有力的BDNF提升劑，充足睡眠（類淋巴系統在睡眠中清除廢物）、社交連結（迷走神經刺激、催產素分泌）和冥想都有提升BDNF的證據。選項A的生活方式反而抑制BDNF。" },
      { id: "q4", question: "在不同損傷類型中，哪一類的修復速度最快？", options: ["器質性損傷（如動脈斑塊、纖維化組織）","結構性改變（如海馬迴體積縮小）","功能性改變（如HRV下降、荷爾蒙水平異常）","三者修復速度相同"], answer: 2, explanation: "功能性改變（荷爾蒙水平、HRV、免疫指標等）在壓力減輕後恢復最快，通常幾週到幾個月。結構性改變需要幾個月到幾年但可逆。器質性損傷最難逆轉，但可以阻止惡化。這個順序正是「越早介入，效果越好」的原因。" },
      { id: "q5", question: "為什麼說「大腦不能再生」是一個過時的觀念？", options: ["因為現代藥物可以讓大腦完全再生所有受損的神經元","因為神經可塑性研究確認大腦持續改變，且海馬迴等腦區終生持續產生新神經元","因為幹細胞療法已經可以完全修復所有大腦損傷","因為大腦的大小會隨年齡持續增加"], answer: 1, explanation: "過去認為神經元一旦死亡就不能再生，但數十年的神經科學研究已確認：大腦具有持續的可塑性，海馬迴的齒狀回終生持續產生新神經元（成人神經新生），且突觸連結可以持續重塑。這讓「壓力造成的大腦改變」不再是永久判決。" }
      ],
    },
    {
      id: "auto-vol5-lesson-10",
      title: "預防比治療重要：及早理解的價值",
      duration: 12,
      isFree: false,
      slides: [
      { id: "slide-1", type: "hook", title: "開場情境", content: `如果阿明在三十五歲第一次出現失眠和心跳加速時，有人告訴他：「這些不是沒事，這是自律神經系統在說我已經在透支了」——他後來的那一欄欄健檢紅字，有多少是可以避開的？這個問題，是Vol.05整冊想讓你帶走的問題。`, visual: '' },
      { id: "slide-2", type: "deepdive", title: "預防的真正意義：在第一階段就介入", content: `在自律神經失調的框架裡，「預防」不是「生病前做的養生」，而是在功能性失調（第一階段）就介入，不讓它走到結構性損傷或器官損傷。這是系統性的早期介入，依據是神經生理學，工具包括睡眠管理、壓力源識別、身體信號閱讀，以及人際關係健康管理。`, visual: '' },
      { id: "slide-3", type: "concept", title: "理解本身就是介入", content: `你現在已經知道：心悸、失眠、腸躁是神經系統的信號，不是「沒事」；壓力對心血管、大腦、免疫、代謝、荷爾蒙有清楚的生理路徑；損傷是有時間軸的，越早介入效果越好；而神經系統的修復能力比你以為的強大。這些知識本身，就改變了你對身體信號的回應方式。`, visual: '' },
      { id: "slide-4", type: "deepdive", title: "常見誤解", content: `很多人以為「預防是以後的事，現在不舒服是壓力大正常的」。但這正是讓功能性失調悄悄走入第二階段的心理機制。理解了時間軸和損傷邏輯之後，「等一下再說」就不再是一個中性的選擇——它是有生理成本的選擇。`, visual: '' },
      { id: "slide-5", type: "summary", title: "本堂重點", content: `① 預防的窗口在症狀出現時就已打開——功能性失調是最有效的介入時機，不需要等到確診
② 理解本身就有療癒效果——知道症狀背後的神經機制，你才能做出真正有效的回應
③ 這不是終點，是起點——Vol.06識別壓力來源，Vol.07處理人際壓力；帶著Vol.05的理解繼續，知道「為什麼」才能有效做「怎麼做」
感謝你讀完這一冊。你的神經系統正在等你。`, visual: '' }
      ],
      quizzes: [
      { id: "q1", question: "在自律神經失調的框架中，「預防」最精確的定義是什麼？", options: ["在任何症狀出現之前做的健康養生習慣","確診慢性病後立即開始藥物治療","在功能性失調（第一階段）就介入，避免走到結構性或器官層級損傷","完全避免所有壓力事件"], answer: 2, explanation: "在這個框架中，預防的有效定義是「階段性的早期介入」——在第一階段（症狀存在但檢查正常）就認真對待並採取行動，讓損傷在功能性層級就被阻止，而非等到結構性或器官損傷後才開始。" },
      { id: "q2", question: "為什麼「理解機制本身就是一種介入」？", options: ["因為思考神經科學知識可以直接降低皮質醇","因為理解讓你把模糊的「感覺不對」對應到具體信號，能夠做出更早、更有效的回應","因為看完這本書等同於完成了壓力管理課程","因為知識可以取代運動和睡眠等實際介入"], answer: 1, explanation: "理解的最大價值是「把模糊變清晰」——當你知道心悸、失眠、腸躁背後的神經機制，你不再把它們當成「沒事」，而是認識到它們是可辨識的信號，可以採取有針對性的行動。這本身就改變了你的回應方式。" },
      { id: "q3", question: "「等這段忙完再說」這個常見的心理機制，在自律神經時間軸的框架下，真正的問題是什麼？", options: ["只是心理上的藉口，不影響生理狀態","讓功能性失調繼續積累，可能悄悄進入第二階段，錯過最佳介入窗口","這是合理的選擇，因為短暫延誤介入通常沒有影響","只有在已確診慢性病的情況下才有問題"], answer: 1, explanation: "「等一下再說」在功能性失調階段不是中性選擇——這個時期是損傷最可逆、介入成本最低的窗口。持續延誤讓損傷進入第二階段（結構性改變），逆轉難度和所需時間都大幅增加。理解時間軸讓「現在」變得有具體意義。" },
      { id: "q4", question: "本冊介紹的心血管、免疫、大腦、代謝、荷爾蒙五個系統，它們之間最重要的共同點是什麼？", options: ["它們都可以透過單一藥物同時解決","它們都受到長期自律神經失調和皮質醇系統的影響，有共同的神經內分泌根源","它們是完全獨立的系統，需要分別治療","它們只在老年人身上才會同時出現問題"], answer: 1, explanation: "本冊的核心主題正是：這五個系統的慢性損傷有共同的神經內分泌根源——長期自律神經失調和HPA軸的持續激活。理解這個共同根源，讓你看清為什麼單獨處理其中一個系統（如只控飲食、只治失眠）效果有限。" },
      { id: "q5", question: "讀完 Vol.05 後，最適合的下一步是什麼？", options: ["立即就醫要求進行所有慢性病篩檢","進入 Vol.06 識別自己的主要壓力來源，並進入 Vol.07 理解人際關係壓力","因為已了解後果，可以暫時不用繼續學習","只需要開始運動，其他知識不重要"], answer: 1, explanation: "知道「後果是什麼」（Vol.05）只是一半——另一半是知道「原因是什麼」。Vol.06 幫你識別外部壓力來源，Vol.07 處理最複雜的人際壓力。帶著對後果的理解，對壓力來源的識別才有真正的動機和清晰度。" }
      ],
    }
    ],
  },
  {
    vol: "06",
    title: "自律神經Vol.06：什麼在製造你的壓力",
    subtitle: "工作、數位生活、認知模式：壓力源完整解析",
    emoji: "🌊",
    cta: { text: "前往小舖購買 Vol.06 完整版（共10堂）", url: ST_BASE + '/6a3fd2f28dfebf4148dea253', seriesNote: "自律神經學系 7冊・從了解到改變" },
    lessons: [
      {
      id: "autonomic-preview-lesson-6",
      title: "壓力不只來自大事",
      duration: 15,
      isFree: true,
      slides: [
      { id: "slide-1", type: "hook", title: "你有沒有這樣的一天？", content: `小玲每天的生活看起來很普通。早上趕公車差一分鐘沒搭上，到公司發現信箱裡躺著十幾封「等等要回」的信，午休被同事拉去聊她不想聊的話題，下班前主管又丟來一句「這個明天早上要」。

沒有一件事大到值得跟人訴苦，可是她回家後常常覺得整個人是空的，連坐下來都覺得累。

她去做了健康檢查，報告一切正常。醫生說「妳可能太累了，多休息」。

小玲心想：我也不知道自己在累什麼，明明沒發生什麼大事。`, visual: `<svg viewBox="0 0 600 260" xmlns="http://www.w3.org/2000/svg"><rect width="600" height="260" fill="#0f172a" rx="12"/><text x="300" y="35" text-anchor="middle" fill="#e2e8f0" font-size="14" font-weight="bold" font-family="sans-serif">一天當中的微壓力時間軸</text><line x1="50" y1="140" x2="550" y2="140" stroke="#334155" stroke-width="2"/><text x="50" y="160" fill="#64748b" font-size="10" font-family="sans-serif">7:00</text><text x="155" y="160" fill="#64748b" font-size="10" font-family="sans-serif">9:00</text><text x="255" y="160" fill="#64748b" font-size="10" font-family="sans-serif">12:00</text><text x="355" y="160" fill="#64748b" font-size="10" font-family="sans-serif">15:00</text><text x="455" y="160" fill="#64748b" font-size="10" font-family="sans-serif">18:00</text><line x1="80" y1="140" x2="80" y2="95" stroke="#f59e0b" stroke-width="2"/><circle cx="80" cy="92" r="4" fill="#f59e0b"/><text x="80" y="82" text-anchor="middle" fill="#fcd34d" font-size="9" font-family="sans-serif">趕公車</text><line x1="140" y1="140" x2="140" y2="100" stroke="#ef4444" stroke-width="2"/><circle cx="140" cy="97" r="4" fill="#ef4444"/><text x="140" y="87" text-anchor="middle" fill="#fca5a5" font-size="9" font-family="sans-serif">信箱爆炸</text><line x1="210" y1="140" x2="210" y2="108" stroke="#f59e0b" stroke-width="2"/><circle cx="210" cy="105" r="4" fill="#f59e0b"/><text x="210" y="95" text-anchor="middle" fill="#fcd34d" font-size="9" font-family="sans-serif">被打斷</text><line x1="280" y1="140" x2="280" y2="95" stroke="#8b5cf6" stroke-width="2"/><circle cx="280" cy="92" r="4" fill="#8b5cf6"/><text x="280" y="82" text-anchor="middle" fill="#c4b5fd" font-size="9" font-family="sans-serif">尷尬對話</text><line x1="350" y1="140" x2="350" y2="105" stroke="#ef4444" stroke-width="2"/><circle cx="350" cy="102" r="4" fill="#ef4444"/><text x="350" y="92" text-anchor="middle" fill="#fca5a5" font-size="9" font-family="sans-serif">急件插入</text><line x1="420" y1="140" x2="420" y2="98" stroke="#f59e0b" stroke-width="2"/><circle cx="420" cy="95" r="4" fill="#f59e0b"/><text x="420" y="85" text-anchor="middle" fill="#fcd34d" font-size="9" font-family="sans-serif">塞車</text><line x1="490" y1="140" x2="490" y2="102" stroke="#8b5cf6" stroke-width="2"/><circle cx="490" cy="99" r="4" fill="#8b5cf6"/><text x="490" y="89" text-anchor="middle" fill="#c4b5fd" font-size="9" font-family="sans-serif">群組訊息</text><text x="300" y="200" text-anchor="middle" fill="#94a3b8" font-size="12" font-family="sans-serif">每次都是「小事」，但神經系統一整天沒有真正放鬆過</text></svg>` },
      { id: "slide-2", type: "concept", title: "「微壓力」是什麼？", content: `自律神經系統不會分辨「這件事很小」還是「這件事很大」，它只認得一件事：身體現在是不是處在「需要應付」的狀態。

一封需要小心回覆的信、一段尷尬的對話、一次被打斷的專注——這些單獨看都不算什麼，但每一個都會讓交感神經輕輕踩一下油門。

問題是，這種油門一天會被踩上幾十次，而你的身體幾乎沒有機會把油門放掉。

🐱 魯魯：你可以把神經系統想成一杯水，大壓力是整桶水倒下去，小壓力是水龍頭沒關緊一直滴。滴久了，水一樣會滿出來，而且你常常不知道是哪一滴讓它滿出來的。`, visual: `<svg viewBox="0 0 600 240" xmlns="http://www.w3.org/2000/svg"><rect width="600" height="240" fill="#0f172a" rx="12"/><text x="300" y="35" text-anchor="middle" fill="#e2e8f0" font-size="14" font-weight="bold" font-family="sans-serif">急性壓力 vs 慢性微壓力</text><rect x="40" y="55" width="230" height="130" rx="8" fill="#1e293b" stroke="#ef4444" stroke-width="1.5"/><text x="155" y="80" text-anchor="middle" fill="#fca5a5" font-size="13" font-weight="bold" font-family="sans-serif">急性壓力</text><text x="155" y="103" text-anchor="middle" fill="#94a3b8" font-size="11" font-family="sans-serif">強度：高　頻率：少</text><text x="155" y="128" text-anchor="middle" fill="#6ee7b7" font-size="11" font-family="sans-serif">✅ 結束後身體會恢復</text><text x="155" y="170" text-anchor="middle" fill="#64748b" font-size="10" font-family="sans-serif">例：重大事故、考試</text><rect x="330" y="55" width="230" height="130" rx="8" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/><text x="445" y="80" text-anchor="middle" fill="#fcd34d" font-size="13" font-weight="bold" font-family="sans-serif">慢性微壓力</text><text x="445" y="103" text-anchor="middle" fill="#94a3b8" font-size="11" font-family="sans-serif">強度：低　頻率：高</text><text x="445" y="128" text-anchor="middle" fill="#f87171" font-size="11" font-family="sans-serif">⚠️ 神經系統難以解除</text><text x="445" y="170" text-anchor="middle" fill="#64748b" font-size="10" font-family="sans-serif">例：信箱、被打斷、催稿</text><text x="300" y="215" text-anchor="middle" fill="#94a3b8" font-size="12" font-family="sans-serif">觸發次數比強度更能預測長期疲憊感</text></svg>` },
      { id: "slide-3", type: "deepdive", title: "為什麼累積比強度更傷神經", content: `身體的壓力反應系統設計給「應付完就解除」的情境——躲開一隻野獸，跑完之後身體會自己降下來。

但現代生活的微壓力有一個特性：它幾乎不會給你一個明確的「結束點」。

回完這封信，下一封信已經在等。應付完這段對話，下一個通知又跳出來。神經系統一直停在「準備應付」的狀態，沒有機會真正放鬆下來。

研究指出：一天當中壓力反應被觸發的次數，比單次反應的強度，更能預測一個人長期的疲憊感與健康風險。

重點不是你遇到多大的事，而是你的神經系統有沒有機會「真正下班」。`, visual: `<svg viewBox="0 0 600 230" xmlns="http://www.w3.org/2000/svg"><rect width="600" height="230" fill="#0f172a" rx="12"/><text x="300" y="32" text-anchor="middle" fill="#e2e8f0" font-size="14" font-weight="bold" font-family="sans-serif">壓力後的恢復曲線比較</text><line x1="60" y1="40" x2="60" y2="190" stroke="#334155" stroke-width="1.5"/><line x1="60" y1="190" x2="560" y2="190" stroke="#334155" stroke-width="1.5"/><path d="M 80,180 L 120,80 Q 180,80 220,180 L 560,180" fill="none" stroke="#10b981" stroke-width="2" stroke-dasharray="6,3"/><text x="240" y="168" fill="#6ee7b7" font-size="11" font-family="sans-serif">急性壓力：回到基線 ✅</text><path d="M 80,180 L 110,130 Q 130,125 160,135 L 180,100 Q 200,95 230,110 L 250,80 Q 270,75 300,90 L 320,65 Q 340,60 370,75 L 390,55 Q 420,50 450,62 L 480,45 Q 510,42 540,50" fill="none" stroke="#ef4444" stroke-width="2"/><text x="350" y="38" fill="#fca5a5" font-size="11" font-family="sans-serif">微壓力疊加→基線墊高 ⚠️</text></svg>` },
      { id: "slide-4", type: "summary", title: "本堂重點", content: `📝 三件事，帶走就夠了：

① 微壓力累積
單次強度不高的事件，重複出現會疊加成持續的神經負荷，這是多數慢性疲憊的真正起點。

② 沒有解除點是關鍵
現代生活的壓力源很少給身體一個明確的「結束訊號」，神經系統因此很難真正放鬆。

③ 壓力來源可以被拆解
疲憊不是一個模糊的整體感覺，把來源拆開來看，才知道哪裡可以調整。`, visual: `<svg viewBox="0 0 600 190" xmlns="http://www.w3.org/2000/svg"><rect width="600" height="190" fill="#0f172a" rx="12"/><text x="300" y="32" text-anchor="middle" fill="#e2e8f0" font-size="15" font-weight="bold" font-family="sans-serif">什麼在製造你的壓力：三個核心</text><g transform="translate(50,50)"><rect x="0" y="0" width="500" height="36" rx="6" fill="#1e293b" stroke="#6366f1" stroke-width="1"/><text x="18" y="23" fill="#6366f1" font-size="16" font-family="sans-serif">①</text><text x="45" y="23" fill="#e2e8f0" font-size="13" font-family="sans-serif">微壓力累積比大壓力更難恢復</text></g><g transform="translate(50,96)"><rect x="0" y="0" width="500" height="36" rx="6" fill="#1e293b" stroke="#6366f1" stroke-width="1"/><text x="18" y="23" fill="#6366f1" font-size="16" font-family="sans-serif">②</text><text x="45" y="23" fill="#e2e8f0" font-size="13" font-family="sans-serif">沒有結束點——神經系統無法真正下班</text></g><g transform="translate(50,142)"><rect x="0" y="0" width="500" height="36" rx="6" fill="#1e293b" stroke="#6366f1" stroke-width="1"/><text x="18" y="23" fill="#6366f1" font-size="16" font-family="sans-serif">③</text><text x="45" y="23" fill="#e2e8f0" font-size="13" font-family="sans-serif">疲憊有來源可以拆解，不是沒辦法改變</text></g></svg>` }
      ],
      quizzes: [
      { id: "q1", question: "為什麼「什麼大事都沒發生，但還是很累」這種感覺是真實的？", options: ["這只是心理暗示，自我說服一下就好","因為自律神經無法區分大事小事，微壓力反覆觸發也會耗損神經系統","這是體力不好的問題，應該多運動","因為工作效率不夠高，才會覺得累"], answer: 1, explanation: "自律神經系統不分辨事情的「大小」，只認得「需不需要應付」。一天當中幾十次小壓力事件，每次都讓交感神經輕輕踩油門，加上沒有明確的結束點，神經系統就一直停在備戰狀態——這才是「什麼都沒做但好累」的真正原因。" },
      { id: "q2", question: "研究發現，哪個因素更能預測長期疲憊感與健康風險？", options: ["單次壓力事件的強度（有沒有遇到非常大的事）","一天中壓力反應被觸發的次數（有沒有機會真正放鬆）","每天工作的總時數","睡眠時間的長短"], answer: 1, explanation: "研究指出，一天當中壓力反應被觸發的次數，比單次強度更能預測長期疲憊感與健康風險。重點不是你有沒有遇到大事，而是你的神經系統有沒有機會「真正下班」。" }
      ],
    },
    {
      id: "auto-vol6-lesson-2",
      title: "工作壓力的真面目：不只是累，是失控感",
      duration: 10,
      isFree: false,
      slides: [
      { id: "slide-1", type: "hook", title: "開場情境", content: `阿明工作量不算誇張，但主管臨時改需求卻不解釋原因的日子，比事情最多的日子更讓他崩潰。同樣是加班，自己排的完全不累，被迫配合的卻睡不好。`, visual: '' },
      { id: "slide-2", type: "deepdive", title: "核心概念一：工作要求—控制模型", content: `工作壓力不只看事情多不多，更要看你對怎麼做、何時做有沒有發言權。高要求＋低控制是對神經系統負荷最重的組合，比單純的高工作量更傷人。`, visual: '' },
      { id: "slide-3", type: "concept", title: "核心概念二：失控感如何作用於身體", content: `當人覺得自己無能為力，大腦會把情境標記成更高等級的威脅，即使客觀難度沒變。這讓交感神經更容易被觸發，也更難關掉，因為大腦判斷「威脅還沒解除」。`, visual: '' },
      { id: "slide-4", type: "deepdive", title: "常見誤解", content: `很多人以為自己「不夠耐磨」才會在工作中特別容易累垮，但其實關鍵常常不是耐磨度，而是這份工作有沒有給你足夠的控制感與話語權。`, visual: '' },
      { id: "slide-5", type: "summary", title: "本堂重點", content: `① 要求高低不是唯一變數——控制感往往比事情多寡更關鍵
② 失控感會升高威脅評估——讓交感神經更難關掉
③ 小小的控制感也有用——爭取一點自主性能實際降低負荷
下一堂預告：永遠在線的手機，怎麼讓神經系統一整天都無法真正下班。`, visual: '' }
      ],
      quizzes: [
      { id: "q1", question: "根據工作要求—控制模型，對神經系統負荷最重的組合是什麼？", options: ["低要求、高控制","高要求、高控制","高要求、低控制","低要求、低控制"], answer: 2, explanation: "高要求又低控制是最危險的組合，因為忙碌但完全沒有自主決定權。高要求高控制雖然壓力大，但通常能轉化成成就感，負荷較低。" },
      { id: "q2", question: "阿明發現自己加班最累的時候，通常是哪種情況？", options: ["自己主動排的加班","事情量最多的那幾天","被迫配合臨時改需求且沒被告知原因","提早完成工作的日子"], answer: 2, explanation: "阿明最累的是被迫配合、缺乏控制感的加班，而不是單純事情多。這正好對應「高要求低控制」最傷神經系統的情境。選項B把疲憊單純歸因於工作量，忽略了控制感變數。" },
      { id: "q3", question: "一個人長期處在低控制感的工作環境中，可能出現什麼傾向？", options: ["對工作越來越投入提出更多意見","逐漸不再嘗試提出意見，因為認為說了也沒用","神經系統反應變得完全不受影響","工作效率會自動大幅提升"], answer: 1, explanation: "長期低控制感會讓人出現習得性無助，逐漸退縮不再提出意見，這是神經系統的自我保護反應，不是「擺爛」。選項A與本堂強調的退縮傾向相反。" },
      { id: "q4", question: "如果一個人想降低工作壓力，但無法改變整體工作結構，本堂建議從哪裡入手？", options: ["只能忍耐沒有其他辦法","爭取即使很小的控制感，例如排序權或確認流程","辭職換一個完全不忙的工作","完全不理會主管的需求"], answer: 1, explanation: "研究顯示即使很小的控制感也能顯著降低壓力反應強度，例如自己決定處理順序或建立確認流程。選項A與本堂提出的具體可行方向相反。" },
      { id: "q5", question: "同樣工作量很大，為什麼有些人能維持還算穩定的狀態，有些人卻容易長期緊繃？", options: ["完全取決於體質好壞，無法解釋","差別常在於對流程、節奏、決策有多少話語權","工作量大的人一定會更緊繃，沒有例外","跟控制感完全沒有關係"], answer: 1, explanation: "本堂強調差別常常不在事情多寡，而在控制感的高低。選項C過度簡化，忽略了控制感這個關鍵變數的作用。" }
      ],
    },
    {
      id: "auto-vol6-lesson-3",
      title: "永遠在線：數位生活製造的慢性壓力",
      duration: 10,
      isFree: false,
      slides: [
      { id: "slide-1", type: "hook", title: "開場情境", content: `小美下班後習慣躺著刷手機，覺得是在放鬆。但她常常刷完反而更煩躁，腦袋停不下來，明明身體沒動，卻覺得比上班還耗神。`, visual: '' },
      { id: "slide-2", type: "deepdive", title: "核心概念一：永遠在線是什麼意思", content: `過去下班後訊息要等明天才看到，現在訊息隨時跳出來。神經系統因此沒有一個明確的「現在安全、可以放鬆」的訊號，持續待命、被通知打斷、社群比較三件事疊加，讓「休息時間」偷偷維持低強度警覺。`, visual: '' },
      { id: "slide-3", type: "concept", title: "核心概念二：睡前刷手機特別傷", content: `睡前是神經系統準備從警覺切換到修復模式的關鍵時段。持續接收需要處理或帶情緒張力的資訊，等於在切換的當下又把油門踩下去，這也是刷手機刷到很晚卻完全不覺得放鬆的原因。`, visual: '' },
      { id: "slide-4", type: "deepdive", title: "常見誤解", content: `很多人以為刷手機就是休息，是工作之餘的放鬆時間。但其實多數的手機使用方式對神經系統來說根本不是休息，而是另一種形式的待命。`, visual: '' },
      { id: "slide-5", type: "summary", title: "本堂重點", content: `① 手機讓下班變得不完整——持續待命讓神經系統難得到放鬆訊號
② 看起來休息不代表生理在休息——刷手機常維持低強度警覺
③ 判斷標準是感受不是時長——更平靜還是更煩躁，比花了多少分鐘更準確
下一堂預告：噪音、光線、空間，這些你可能從沒注意過的東西，也在悄悄影響神經系統。`, visual: '' }
      ],
      quizzes: [
      { id: "q1", question: "本堂提到的「永遠在線」主要指什麼狀態？", options: ["手機電量永遠充滿","神經系統持續處在可能被通知打斷的待命狀態","一定要每天使用社群媒體","工作量永遠不會減少"], answer: 1, explanation: "永遠在線指的是神經系統因隨時可能跳出的通知，而持續保留注意力在監看狀態，得不到真正的解除訊號。選項C混淆了使用習慣與生理機制。" },
      { id: "q2", question: "小美刷完手機反而覺得更煩躁，最可能的原因是什麼？", options: ["她刷的時間其實不夠長","這段時間其實維持著低強度警覺，並非真正的恢復狀態","她的手機型號有問題","她其實沒有真的在刷手機"], answer: 1, explanation: "刷手機常因通知中斷與比較心理觸發隱性壓力輸入，看起來是休息但生理上仍在警覺，因此無法達到真正恢復的效果。選項A把問題歸因於時間長短，與本堂強調的重點不符。" },
      { id: "q3", question: "為什麼睡前刷手機特別容易影響睡眠品質？", options: ["因為手機螢幕太亮會弄傷眼睛","因為這段時間正是神經系統準備切換到修復模式的關鍵時段","因為睡前不應該做任何活動","因為手機會發出超音波干擾大腦"], answer: 1, explanation: "睡前是警覺切換到修復的關鍵時段，持續接收需要處理的資訊會打斷這個切換過程。選項A與D並非本堂討論的神經機制。" },
      { id: "q4", question: "如果想判斷一段刷手機的時間是不是真正的休息，本堂建議用什麼方式判斷？", options: ["看刷了多久，越短越算休息","看用了多少流量","問自己刷完之後是更平靜還是更煩躁","看手機電量消耗多少"], answer: 2, explanation: "本堂強調判斷標準是主觀感受而非時長，刷完後感覺更平靜或更煩躁，更能反映這段時間是否真正讓神經系統恢復。" },
      { id: "q5", question: "本堂的建議方向是什麼？", options: ["完全戒掉手機才能恢復神經系統","分辨哪些使用方式在維持警覺，哪些才是真正讓神經系統降下來的活動","只要減少使用時間就一定有效","手機對神經系統完全沒有影響，不需要調整"], answer: 1, explanation: "本堂並未主張完全戒手機，而是強調辨識使用方式的差異。選項A不符合本堂「不是要你戒手機」的明確說明。" }
      ],
    },
    {
      id: "auto-vol6-lesson-4",
      title: "環境壓力：噪音、光線、空間怎麼影響神經",
      duration: 10,
      isFree: false,
      slides: [
      { id: "slide-1", type: "hook", title: "開場情境", content: `小玲搬到靠馬路的公寓後變得容易煩躁、肩頸緊繃，睡眠與專注力一起往下掉。她從沒把這件事跟「住在吵的地方」連在一起想過。`, visual: '' },
      { id: "slide-2", type: "deepdive", title: "核心概念一：噪音的可預測性", content: `大腦對突然、持續、不規律的聲音會自動觸發警覺反應，不需要你意識到自己在緊張。不規律噪音的威脅評估比持續性噪音更高，因為大腦無法預測下一次會不會出現。`, visual: '' },
      { id: "slide-3", type: "concept", title: "核心概念二：光線是生理時鐘的對時訊號", content: `光線是調節生理時鐘最主要的外部訊號。白天光線不足、晚上光線過多，會讓身體對清醒與休息的判斷變得模糊，這不只影響睡眠，也影響白天的警覺度與情緒穩定度。`, visual: '' },
      { id: "slide-4", type: "deepdive", title: "常見誤解", content: `很多人以為只要心情調適好，環境再吵再亂都沒關係，畢竟壓力是心理問題。但其實環境刺激會直接觸發神經系統反應，跟心情調適得再好沒有直接關係。`, visual: '' },
      { id: "slide-5", type: "summary", title: "本堂重點", content: `① 噪音的可預測性比音量更關鍵——無法預期的聲音更容易觸發警覺
② 光線是對時訊號——白天不足晚上過多會讓身體判斷混亂
③ 環境壓力可以調整——小改動就能降低持續性背景負荷
下一堂預告：對自己的高標準與自我批評，原來也是一種自己製造的壓力。`, visual: '' }
      ],
      quizzes: [
      { id: "q1", question: "本堂指出，哪種噪音對神經系統的威脅評估通常更高？", options: ["持續穩定的機械噪音","不規律、無法預測的聲音","完全靜音的環境","輕柔的背景音樂"], answer: 1, explanation: "不規律噪音因為大腦無法預測下一次出現的時間，威脅評估會比持續但穩定的噪音更高。選項A雖然也會造成低度警覺，但程度通常較輕。" },
      { id: "q2", question: "小玲搬到靠馬路的公寓後出現的變化，最可能跟什麼有關？", options: ["純粹是工作壓力增加造成的","持續性噪音讓神經系統長期維持低度警覺，影響睡眠與專注力","跟搬家完全沒有關係","只是季節變化造成的偶然現象"], answer: 1, explanation: "持續性噪音如車流聲，不一定讓人覺得很吵，卻會讓神經系統長期維持低度警覺，進而影響睡眠品質與白天表現。選項A忽略了環境因素的直接作用。" },
      { id: "q3", question: "光線對人體最主要的作用是什麼？", options: ["只影響視力清晰度","調節生理時鐘，幫助身體判斷清醒或休息時段","完全不影響睡眠品質","只在夜間才有作用"], answer: 1, explanation: "光線是生理時鐘最主要的外部對時訊號，白天充足光線與夜間減少強光都有助於身體準確判斷時段。選項C與本堂內容直接矛盾。" },
      { id: "q4", question: "長期待在光線昏暗的室內、晚上又被螢幕持續刺激，最可能造成什麼結果？", options: ["完全不會影響生理時鐘","生理時鐘訊號變模糊，影響睡眠與白天的警覺度、情緒穩定度","只會影響皮膚狀況","會讓人變得更有精神"], answer: 1, explanation: "白天光線不足加上夜間人工照明過多，會讓身體對時訊號變得模糊，進而影響睡眠和情緒穩定度。選項D與本堂描述的影響方向相反。" },
      { id: "q5", question: "本堂建議改善環境壓力，最實際的做法是什麼？", options: ["一定要搬家或裝修才能改善","針對噪音、光線、視覺雜亂做小幅調整","完全忽略環境因素只調整心態","只能等天氣變化才能改善"], answer: 1, explanation: "本堂明確指出不需要搬家裝修，調暗睡前光線、處理不規律噪音、整理視覺乾淨角落等小調整就有實際幫助。選項C忽略了環境對神經系統的直接影響。" }
      ],
    },
    {
      id: "auto-vol6-lesson-5",
      title: "完美主義與自我批評：自己製造的壓力",
      duration: 10,
      isFree: false,
      slides: [
      { id: "slide-1", type: "hook", title: "開場情境", content: `小美做完專案，主管說做得不錯，她卻整晚反覆想著某個小細節是不是能更好，越想越焦慮，明明事情已經結束，身體卻完全沒有放鬆。`, visual: '' },
      { id: "slide-2", type: "deepdive", title: "核心概念一：完美主義缺乏結束機制", content: `外部壓力事件通常有開始也有結束，但自我批評沒有明確結束點，因為標準由自己設定，且常不斷往上調。神經系統收到的訊號是威脅還在,不能放鬆，即使外部事件早就結束。`, visual: '' },
      { id: "slide-3", type: "concept", title: "核心概念二：惡性循環的形成", content: `自我批評不需要外部事件觸發，可以在任何時刻啟動。長期下來，大腦對「自己」這個對象的威脅評估會逐漸升高，越批評越覺得不夠好，越覺得不夠好就越容易啟動下一輪批評。`, visual: '' },
      { id: "slide-4", type: "deepdive", title: "常見誤解", content: `很多人以為對自己要求高是自律，是成功的必要條件，越嚴格越好。但長期不分情境的自我批評，會讓神經系統把自己當成持續存在的威脅來源。`, visual: '' },
      { id: "slide-5", type: "summary", title: "本堂重點", content: `① 自我批評沒有明確結束點——標準不斷上調讓神經系統難以放鬆
② 隨身攜帶的壓力源最難關掉——不需外部事件就能啟動
③ 建立結束機制是關鍵——練習給自己一個可以放下的訊號
下一堂預告：大腦另一個更隱密的放大器——認知扭曲，那些你以為是事實、其實只是思考習慣的東西。`, visual: '' }
      ],
      quizzes: [
      { id: "q1", question: "本堂指出，自我批評與外部壓力源最大的差別是什麼？", options: ["自我批評強度一定比較低","自我批評沒有明確的結束點，可以不斷往上調標準","外部壓力源完全不會觸發神經系統","兩者其實完全一樣，沒有差別"], answer: 1, explanation: "外部壓力事件通常有明確結束，自我批評卻沒有，因為標準由自己設定且不斷上調。選項C忽略了外部壓力源確實會觸發神經系統反應。" },
      { id: "q2", question: "小美在專案結束、主管已肯定的情況下仍焦慮整晚，最可能的原因是什麼？", options: ["她其實對這個專案完全不在乎","她的自我批評缺乏結束機制，持續維持威脅評估","主管的稱讚讓她感到壓力","這跟自我批評沒有關係，純粹是巧合"], answer: 1, explanation: "小美的標準由自己設定且持續上調，導致神經系統收到「威脅還在」的訊號，即使外部事件已經結束。選項C誤解了稱讚的作用方向。" },
      { id: "q3", question: "完美主義型與反思型最大的差別是什麼？", options: ["完美主義型標準較低","反思型會在合理時間點做出結論並放下，完美主義型則持續找缺點","兩者完全相同沒有差別","反思型完全不會檢討自己"], answer: 1, explanation: "本堂明確指出兩者最大差別不是標準高低，而是有沒有「結束機制」。反思型會做結論後放下，完美主義型則持續尋找不足之處。" },
      { id: "q4", question: "長期處在自我批評循環中的人，可能會出現什麼狀態？", options: ["表現監控持續升高，更容易啟動下一輪批評","完全不受任何情緒影響","自我評價會自動越來越客觀","神經系統會逐漸對批評免疫"], answer: 0, explanation: "本堂描述的惡性循環是批評→焦慮→表現監控升高→更容易啟動下一輪批評，形成持續循環。選項C與D都與本堂描述的機制相反。" },
      { id: "q5", question: "本堂建議調整自我批評的關鍵方向是什麼？", options: ["完全放下所有標準，不再檢討任何事","練習在合理時間點給自己一個明確的結束訊號","盡量避免反思任何已完成的事情","標準越高越好，不需要調整"], answer: 1, explanation: "本堂強調的調整方向不是放下標準，而是建立結束機制，讓神經系統知道威脅評估可以降回來了。選項A與本堂「完全放下高標準不現實也不必要」的說法不符。" }
      ],
    },
    {
      id: "auto-vol6-lesson-6",
      title: "認知扭曲：大腦的壓力放大器",
      duration: 10,
      isFree: false,
      slides: [
      { id: "slide-1", type: "hook", title: "開場情境", content: `阿明寄信沒收到回覆，腦中立刻冒出「他是不是不滿意我」的念頭，整個下午心跳偏快坐不住。後來才知道主管只是在開會。`, visual: '' },
      { id: "slide-2", type: "deepdive", title: "核心概念一：認知扭曲是自動化捷徑", content: `認知扭曲是固定、自動化的思考模式，會系統性地讓人對事件做出比實際更負面的解讀。常見類型包括災難化（小問題推論成最糟結局）、讀心（認定知道別人在想什麼）、全有全無（只用兩個極端評價事情）。`, visual: '' },
      { id: "slide-3", type: "concept", title: "核心概念二：念頭本身就足以觸發反應", content: `認知扭曲發生得太快，幾乎不會被意識到「這是推論」,而是直接以結論形式出現。神經系統會把這個結論當成真實威脅，啟動心跳加快、肌肉緊繃等全套生理反應，即使事件根本沒發生。`, visual: '' },
      { id: "slide-4", type: "deepdive", title: "常見誤解", content: `很多人以為自己想得很清楚，腦中浮現的念頭就是事實，不需要懷疑。但其實大腦的自動化思考捷徑，會在沒有察覺的情況下把中性事件放大成威脅。`, visual: '' },
      { id: "slide-5", type: "summary", title: "本堂重點", content: `① 認知扭曲是自動化思考捷徑——系統性把事件解讀得更負面更危險
② 念頭本身就能觸發生理反應——身體不分辨念頭是否真實發生
③ 辨認是鬆動扭曲的第一步——區分事實與推論能讓前額葉重新介入
下一堂預告：時間永遠不夠用的感覺，其實有它自己的神經科學解釋。`, visual: '' }
      ],
      quizzes: [
      { id: "q1", question: "什麼是「災難化」這種認知扭曲？", options: ["完全不去想任何負面的可能性","把一個小問題自動推論成最糟糕的結局","客觀冷靜地評估各種可能性","只關注事情的正面結果"], answer: 1, explanation: "災難化是把小問題自動推論到最糟結局的思考捷徑，例如阿明從「沒回信」一路推論到「我可能要被換掉」。選項C描述的是客觀評估，與災難化的自動化、負面化特性相反。" },
      { id: "q2", question: "阿明因為主管沒回信而整個下午緊繃,最關鍵的原因是什麼？", options: ["主管真的對他很生氣","他的推論被大腦當成真實威脅，啟動了全套生理反應","他的工作表現確實有問題","純粹是天氣影響了他的情緒"], answer: 1, explanation: "客觀上主管只是在開會,但阿明的推論「他生氣了」被神經系統當成真實威脅,啟動了完整的壓力反應。選項A與後來證實的事實不符。" },
      { id: "q3", question: "為什麼認知扭曲特別容易被當成「事實」？", options: ["因為它們發生得很慢,有充分時間驗證","因為它們發生速度太快，直接以結論形式出現，不會被意識到是推論","因為大腦會先告知這是一個假設","因為這些念頭通常都是正確的"], answer: 1, explanation: "認知扭曲發生速度快，直接以結論形式出現在腦中,不會被意識到「這是一個推論」,這正是它們特別棘手的原因。選項A與本堂描述的「速度太快」相反。" },
      { id: "q4", question: "「讀心」這種認知扭曲指的是什麼？", options: ["準確判讀他人情緒的能力","在沒有證據的情況下認定自己知道別人在想什麼,通常是負面版本","透過詢問了解對方真實想法","完全不去猜測他人的想法"], answer: 1, explanation: "讀心是在缺乏證據時擅自認定他人想法,且通常偏向負面解讀,這正是認知扭曲的特徵之一。選項C描述的是健康的溝通方式，與讀心扭曲相反。" },
      { id: "q5", question: "本堂建議鬆動認知扭曲的第一步是什麼？", options: ["立刻說服自己這個想法是錯的","練習辨認這個念頭是事實還是推論","完全停止任何思考活動","忽略所有負面念頭不去處理"], answer: 1, explanation: "本堂強調第一步不是急著糾正想法，而是先辨認「這是推論還是事實」，這個辨認動作本身就能讓前額葉重新介入降低反應。選項A跳過了辨認這個關鍵步驟。" }
      ],
    },
    {
      id: "auto-vol6-lesson-7",
      title: "時間壓力：永遠不夠用的感覺從哪來",
      duration: 10,
      isFree: false,
      slides: [
      { id: "slide-1", type: "hook", title: "開場情境", content: `小玲的行事曆排得密密麻麻、效率看起來很高，但她做A的時候想著B還沒開始,做B時又想C快遲到了。即使每件事都準時完成,她仍永遠覺得在追趕。`, visual: '' },
      { id: "slide-2", type: "deepdive", title: "核心概念一：時間壓力是評估問題", content: `大腦對時間的感知不是客觀計時器,而是會被情緒和不確定感影響的評估系統。客觀時間不足是實際資源問題,但主觀時間威脅是行程其實能完成、大腦卻持續評估快來不及了,反應一樣強烈。`, visual: '' },
      { id: "slide-3", type: "concept", title: "核心概念二：多工切換的隱形成本", content: `大腦並非真的能同時處理多件事,而是在任務間快速切換。每次切換都消耗認知資源,也持續觸發還沒完成、還要繼續的警覺訊號,即使行程表上其實每件事都準時完成。`, visual: '' },
      { id: "slide-4", type: "deepdive", title: "常見誤解", content: `很多人以為只要把行程排得更滿、效率練得更高,時間不夠用的感覺就會消失。但其實這種喘不過氣的感覺,排得再滿也不會消失,因為問題出在評估系統,不是行程表。`, visual: '' },
      { id: "slide-5", type: "summary", title: "本堂重點", content: `① 時間壓力是評估問題不只是資源問題——威脅評估系統把訊號放太大
② 多工切換本身會消耗資源——同時惦記多項任務會持續觸發警覺
③ 外部化待辦清單能降低負荷——寫下來能讓大腦停止持續記住它
下一堂預告：錢的問題為什麼總是特別耗神，財務壓力背後真正的關鍵變數。`, visual: '' }
      ],
      quizzes: [
      { id: "q1", question: "本堂指出，多數人經歷的「時間不夠用」感覺主要是哪一種？", options: ["客觀時間真的不足，行事曆超出能力範圍","主觀時間威脅，行程其實能完成但大腦持續評估快來不及了","完全不存在的虛假感覺","只發生在睡眠不足的人身上"], answer: 1, explanation: "本堂強調多數人經歷的是主觀時間威脅,行事曆其實可以完成,但大腦持續評估「快來不及了」,觸發跟真的不夠用一樣強烈的反應。選項A描述的是另一種較少見的客觀資源問題。" },
      { id: "q2", question: "為什麼小玲即使每件事都準時完成,仍然覺得自己一直在追趕？", options: ["因為她效率太差","因為多工切換讓神經系統持續收到「有多項任務待解決」的警覺訊號","因為她其實沒有真正完成任何事","因為她睡眠不足"], answer: 1, explanation: "小玲同時惦記著多件未完成的事,即使手上只做一件,神經系統仍持續收到多任務待解決的訊號,維持偏高警覺。選項A與她實際準時完成工作的事實不符。" },
      { id: "q3", question: "本堂提到的「多工切換成本」指的是什麼？", options: ["切換工作地點所需的交通時間","在不同任務間切換注意力時,重新調整所消耗的認知資源","完成任務後獲得的成就感","排行程所需花費的時間"], answer: 1, explanation: "多工切換成本指每次在任務間切換注意力時,大腦需要重新調整所消耗的認知資源,這個過程本身會持續觸發警覺訊號。選項C與切換成本的負向消耗性質相反。" },
      { id: "q4", question: "為什麼把待辦清單寫下來,對神經系統有實際幫助？", options: ["因為寫下來的事情會自動消失","因為任務被外部化記錄後,大腦不需要持續耗費資源去記住它","因為寫字本身是一種運動","因為這樣可以讓事情變得更多"], answer: 1, explanation: "任務外部化後,大腦不必持續耗費資源去「記得它還沒做」,警覺訊號因此能降低,這也是為什麼寫出待辦事項後心情會先鬆一點。選項A與實際機制無關。" },
      { id: "q5", question: "如果一個人把行程排得更滿,想藉此消除時間不夠用的焦慮感,根據本堂內容,結果最可能是什麼？", options: ["焦慮感會立刻完全消失","焦慮感很可能不會消失,因為問題出在評估系統而不是行程本身","時間壓力會自動轉換成動力","排得越滿,神經系統負荷越低"], answer: 1, explanation: "本堂開頭即指出排得再滿,喘不過氣的感覺也不會消失,因為核心問題是大腦對剩餘時間的評估系統,不是客觀行程量。選項D與本堂強調的機制方向相反。" }
      ],
    },
    {
      id: "auto-vol6-lesson-8",
      title: "財務壓力的神經科學：為什麼錢的問題特別耗神",
      duration: 10,
      isFree: false,
      slides: [
      { id: "slide-1", type: "hook", title: "開場情境", content: `阿明的薪水其實夠付帳單,但每個月看到信用卡帳單那一刻,還是會心跳加快、手心冒汗。理性上他知道付得起,身體反應卻完全不受理性控制。`, visual: '' },
      { id: "slide-2", type: "deepdive", title: "核心概念一：不確定感比金額更耗神", content: `金錢連結著住、吃、看病、教育、養老等生存相關需求,讓大腦容易把財務不確定感連到最原始的生存威脅系統。神經系統對不確定與失控的反應,常比對已知困難更強烈,因為已知困難至少有應對策略。`, visual: '' },
      { id: "slide-3", type: "concept", title: "核心概念二：反覆檢查會延長壓力反應", content: `財務壓力高的人常反覆查看帳戶餘額。這個動作表面像在掌控狀況,但每次查看都等於重新啟動一次威脅評估,反而讓神經系統沒機會真正降下來,即使結果沒有變得更糟。`, visual: '' },
      { id: "slide-4", type: "deepdive", title: "常見誤解", content: `很多人以為財務壓力就是錢不夠,只要收入增加壓力就會自動消失。但其實財務壓力對神經系統的影響,跟金額大小的關係,常常小於跟不確定感與失控感的關係。`, visual: '' },
      { id: "slide-5", type: "summary", title: "本堂重點", content: `① 不確定感比金額大小更耗神——核心常是無法預測與無法掌控
② 反覆檢查會重新觸發警覺——而不是真正在解決問題
③ 把不確定變已知能降低負荷——具體計畫比模糊不確定更友善
下一堂預告：你同時扮演了幾個角色，每個角色都在向神經系統提款。`, visual: '' }
      ],
      quizzes: [
      { id: "q1", question: "本堂指出財務壓力的核心常常是什麼？", options: ["金額大小本身","不確定感與失控感","完全與心理因素無關","只跟個人消費習慣有關"], answer: 1, explanation: "本堂明確指出財務壓力對神經系統的影響,跟不確定感與失控感的關係常常大於金額大小本身。選項C忽略了本堂強調的心理機制。" },
      { id: "q2", question: "阿明明明付得起帳單,卻仍出現心跳加快、手心冒汗的反應,最可能的原因是什麼？", options: ["他的身體機能出了問題","理性上知道沒問題,但生理層面的威脅評估系統仍被不確定感觸發","他其實付不起帳單","純粹是巧合,跟財務無關"], answer: 1, explanation: "阿明的反應顯示理性認知與生理反應可以是分開的兩條線,即使理性上沒問題,財務相關的不確定感仍能觸發生理層面的威脅反應。選項C與情境設定的事實不符。" },
      { id: "q3", question: "為什麼金錢容易連結到大腦最原始的生存威脅評估系統？", options: ["因為金錢本身是一種具體物質","因為金錢跟住、吃、看病、教育、養老等基本生存需求緊密相關","因為金錢只跟娛樂消費有關","純粹是文化偏見造成的"], answer: 1, explanation: "金錢在現代生活中幾乎連結每一項基本生存需求,讓大腦容易把財務不確定感直接連結到最原始的生存威脅系統。選項C過度簡化了金錢的功能範圍。" },
      { id: "q4", question: "反覆查看銀行帳戶餘額這個行為,對神經系統實際的效果是什麼？", options: ["能徹底解決財務上的不確定感","每次查看都重新啟動一次威脅評估,讓神經系統難以真正放鬆","完全不會影響神經系統","會自動降低未來的支出"], answer: 1, explanation: "反覆檢查表面上像在掌控狀況,但每次查看都等於重新啟動威脅評估,延長壓力反應的時間,而不是真正解決問題。選項A誤解了反覆檢查的實際效果。" },
      { id: "q5", question: "本堂建議緩解財務壓力的有效方向是什麼？", options: ["完全不要去想任何財務問題","把模糊的不確定轉換成具體、已知的計畫","單純靠正向思考說服自己不要焦慮","增加收入是唯一有效的辦法"], answer: 1, explanation: "本堂強調把不確定感轉換成具體已知的計畫,即使數字不理想,「已知」本身就能降低神經系統的警覺程度。選項D忽略了本堂強調「跟金額大小的關係較小」這個核心觀點。" }
      ],
    },
    {
      id: "auto-vol6-lesson-9",
      title: "身份與角色壓力：你扮演了幾個人？",
      duration: 10,
      isFree: false,
      slides: [
      { id: "slide-1", type: "hook", title: "開場情境", content: `小美早上是員工,中午是體貼的另一半,下午是耐心的下屬,晚上是有耐心的家長。每個角色都做得不差,卻有一種說不出的疲憊感,好像從來沒有真正卸下來過。`, visual: '' },
      { id: "slide-2", type: "deepdive", title: "核心概念一：角色切換是認知工作", content: `每個社會角色都帶著對應的期待與行為規範。從一個角色切換到另一個,大腦需要重新校準該用哪套規則應對,這個過程跟多工切換類似,會消耗認知資源,角色數量越多,校準切換次數越多。`, visual: '' },
      { id: "slide-3", type: "concept", title: "核心概念二：角色衝突比角色多更傷神經", content: `當兩個角色期待互相矛盾,例如全力衝刺工作vs全心陪伴家人,神經系統找不到能讓兩邊都滿意的反應,這種找不到明確解除點的拉扯狀態,常比單一角色的工作量本身更傷神經。`, visual: '' },
      { id: "slide-4", type: "deepdive", title: "常見誤解", content: `很多人以為角色越多代表能力越強,能同時當好員工、好伴侶、好父母,是值得驕傲的事。但其實每個角色都帶著各自的標準與期待,疊加起來的負荷不會因為你很厲害就變少。`, visual: '' },
      { id: "slide-5", type: "summary", title: "本堂重點", content: `① 角色切換本身會消耗資源——重新校準規則跟多工切換一樣耗損
② 角色衝突比角色多更傷神經——找不到明確解除方案讓威脅評估持續啟動
③ 具體辨認角色能拆解疲憊感——把模糊感覺拆成具體調整點
下一堂預告：本冊收尾,整理出一張屬於你自己的個人壓力地圖。`, visual: '' }
      ],
      quizzes: [
      { id: "q1", question: "本堂指出,角色切換為什麼會消耗認知資源？", options: ["因為每個角色都需要換衣服","因為大腦需要重新校準該用哪套規則應對當下情境","因為角色切換完全不需要思考","因為這跟認知資源完全無關"], answer: 1, explanation: "從一個角色切換到另一個,大腦需要重新校準規則、語氣、行為規範,這個校準過程會消耗認知資源,類似多工切換的成本。選項C與本堂明確指出的機制相反。" },
      { id: "q2", question: "小美雖然每個角色都做得不差,卻仍感覺疲憊,最可能的原因是什麼？", options: ["她其實表現得不好","頻繁的角色切換本身持續消耗認知資源,造成整體疲憊感","她睡眠時間不夠","這跟角色切換完全沒有關係"], answer: 1, explanation: "即使每個角色都表現良好,頻繁切換角色所需的認知校準成本仍會持續累積,造成說不出原因的整體疲憊感。選項A與情境中她表現良好的描述矛盾。" },
      { id: "q3", question: "本堂提到的「角色衝突」指的是什麼情況？", options: ["同時扮演的角色完全沒有任何期待","不同角色的期待互相矛盾,例如全力衝刺工作與全心陪伴家人同時被要求","只扮演一個角色的狀態","角色之間完全沒有互動"], answer: 1, explanation: "角色衝突指不同角色帶來互相矛盾的期待,神經系統因找不到讓兩邊都滿意的反應,而持續處在拉扯狀態。選項C與「衝突」這個前提矛盾,因為單一角色不會產生衝突。" },
      { id: "q4", question: "為什麼角色衝突常比單一角色的高工作量更傷神經系統？", options: ["因為角色衝突完全不會被察覺","因為角色衝突沒有明確的解決步驟,只能持續在兩者之間權衡妥協","因為角色衝突的強度一定比工作量低","因為角色衝突只發生在特定季節"], answer: 1, explanation: "角色衝突缺乏明確可以解除的方案,只能持續權衡與妥協,這種沒有結束點的狀態,比單一角色的高工作量更容易持續耗損神經系統。選項C與本堂強調的機制方向相反。" },
      { id: "q5", question: "本堂建議減少角色相關耗損的第一步是什麼？", options: ["完全放棄其中幾個角色","具體列出自己扮演的角色,辨認哪些角色之間存在衝突或期待模糊","假裝自己沒有承擔任何角色","不去理會角色帶來的任何感受"], answer: 1, explanation: "本堂建議把角色具體列出來,辨認衝突點與模糊之處,才能把模糊的疲憊感拆解成具體可以調整的部分。選項A過於極端,不符合本堂提出的漸進式調整方向。" }
      ],
    },
    {
      id: "auto-vol6-lesson-10",
      title: "找出你的主要壓力源：個人壓力地圖",
      duration: 10,
      isFree: false,
      slides: [
      { id: "slide-1", type: "hook", title: "開場情境", content: `阿明讀完前面九堂,第一次意識到他原本以為的「工作壓力太大」,拆開來看其實是失控感、永遠在線、自我嚴格、角色衝突疊加而成的,從來沒有分開看過。`, visual: '' },
      { id: "slide-2", type: "deepdive", title: "核心概念一：拆解來源能降低無力感", content: `前九堂依序看過微壓力累積、工作失控感、數位待命、環境刺激、自我批評、認知扭曲、時間評估、財務不確定、角色衝突。多數疲憊是好幾種來源疊加的結果,拆開來看是降低無力感的第一步。`, visual: '' },
      { id: "slide-3", type: "concept", title: "核心概念二：畫地圖的三個步驟", content: `回想最近兩週特別緊繃疲憊的時刻,對照前九堂分類找出最接近的來源,標出出現頻率最高的二到三種,這通常就是目前最需要關注的部分。具體命名比模糊感覺更能降低神經系統的負荷感。`, visual: '' },
      { id: "slide-4", type: "deepdive", title: "常見誤解", content: `很多人以為壓力很大是一種整體模糊的感覺,沒辦法具體說清楚。但其實壓力幾乎都有具體來源,只是平常很少有人停下來把它們一一拆解出來看清楚。`, visual: '' },
      { id: "slide-5", type: "summary", title: "本堂重點", content: `① 疲憊感幾乎都能拆解成具體來源——多種壓力源疊加才是常態
② 具體命名能降低負荷感——把模糊威脅變成具體資訊
③ 地圖是起點不是檢討——挑一個容易調整的小動作開始
下一堂預告：如果壓力地圖裡人際關係佔了一大塊,Vol.07會帶你深入看懂。`, visual: '' }
      ],
      quizzes: [
      { id: "q1", question: "本堂指出,多數人的疲憊感通常是什麼樣的結構？", options: ["完全由單一原因造成,跟其他因素無關","好幾種具體壓力源同時疊加的結果","純粹是個人意志力不足造成的","完全無法被拆解或理解"], answer: 1, explanation: "本堂明確指出,這些來源很少單獨出現,多數人的疲憊感是好幾種來源同時疊加的結果。選項D與本堂「壓力幾乎都有具體來源」的核心主張相反。" },
      { id: "q2", question: "阿明讀完前九堂後,對自己的工作壓力有什麼新的理解？", options: ["他發現自己根本沒有任何壓力","原本以為的單一工作壓力,其實是失控感、數位待命、自我嚴格、角色衝突疊加而成","他發現工作壓力跟其他來源完全無關","他決定完全不再思考這個問題"], answer: 1, explanation: "阿明意識到他原本籠統認為的工作壓力,其實是多個具體來源疊加的結果,這正是本堂強調的拆解效果。選項C忽略了多種來源相互疊加的本質。" },
      { id: "q3", question: "畫個人壓力地圖的第一個步驟是什麼？", options: ["直接列出所有可能的壓力來源理論","回想最近兩週,什麼時候特別覺得緊繃、煩躁或疲憊","立刻找專業人士諮詢","完全略過回顧,直接開始調整生活"], answer: 1, explanation: "本堂提出的步驟一是回想最近兩週特別緊繃疲憊的具體時刻,作為對照分類的起點。選項C雖然是合理選項,但不是本堂提出的步驟。" },
      { id: "q4", question: "為什麼「具體命名」疲憊的來源,本身就能降低神經系統的負荷感？", options: ["因為命名會讓問題自動消失","因為這代表前額葉重新介入,把模糊的威脅感變成具體可處理的資訊","因為命名跟神經系統完全無關","因為這樣可以避免面對真正的問題"], answer: 1, explanation: "本堂指出具體說出「我累的是這個」而非籠統地說「就是很累」,代表前額葉重新介入,把模糊威脅感轉換成具體資訊,從而降低負荷感。選項D與「看清楚自己」這個本堂明確的目的相反。" },
      { id: "q5", question: "如果一個人畫完壓力地圖後,發現人際關係相關的部分反覆出現,本堂建議怎麼處理？", options: ["這部分完全無法處理,只能放棄","可以參考Vol.07《人際關係壓力》深入了解,因為人際壓力機制有其獨特之處","人際關係不算是真正的壓力來源","應該立刻斷絕所有人際關係"], answer: 1, explanation: "本堂明確指出,如果人際關係相關部分反覆出現,Vol.07會深入展開,因為人際壓力的機制有它自己獨特的地方。選項C與本堂將人際關係列為重要壓力來源的立場矛盾。" }
      ],
    }
    ],
  },
  {
    vol: "07",
    title: "自律神經Vol.07：人是最複雜的壓力源",
    subtitle: "有毒關係、社交焦慮、邊界：最難說清楚的壓力源",
    emoji: "👥",
    cta: { text: "前往小舖購買 Vol.07 完整版（共10堂）", url: ST_BASE + '/6a3fd2f28dfebf4148dea254', seriesNote: "自律神經學系 7冊・從了解到改變" },
    lessons: [
      {
      id: "autonomic-preview-lesson-7",
      title: "人是最複雜的壓力源",
      duration: 15,
      isFree: true,
      slides: [
      { id: "slide-1", type: "hook", title: "工作輕鬆了，但還是很累？", content: `小玲最近換了一份輕鬆很多的工作，下班早、沒加班、薪水也還行。

按道理來說，她應該變得比較放鬆。

但她發現，一想到隔天要去公司，她的胸口就會開始悶。

不是因為工作量，是因為她的主管。那個人說話方式讓她很不舒服，但她說不清楚哪裡不對——又沒有罵她，就是讓她覺得，很累。

這種「說不清楚的累」，其實有非常清楚的神經科學解釋。`, visual: `<svg viewBox="0 0 600 260" xmlns="http://www.w3.org/2000/svg"><rect width="600" height="260" fill="#0f172a" rx="12"/><text x="300" y="35" text-anchor="middle" fill="#e2e8f0" font-size="14" font-weight="bold" font-family="sans-serif">人際壓力觸發神經系統的路徑</text><g transform="translate(30,65)"><rect x="0" y="0" width="110" height="60" rx="8" fill="#1e293b" stroke="#6366f1" stroke-width="1.5"/><text x="55" y="24" text-anchor="middle" fill="#c7d2fe" font-size="12" font-family="sans-serif">感知社交威脅</text><text x="55" y="44" text-anchor="middle" fill="#64748b" font-size="10" font-family="sans-serif">說話方式 / 眼神</text></g><text x="153" y="100" fill="#475569" font-size="20" font-family="sans-serif">→</text><g transform="translate(168,65)"><rect x="0" y="0" width="110" height="60" rx="8" fill="#1e293b" stroke="#ef4444" stroke-width="1.5"/><text x="55" y="24" text-anchor="middle" fill="#fca5a5" font-size="12" font-family="sans-serif">杏仁核活化</text><text x="55" y="44" text-anchor="middle" fill="#64748b" font-size="10" font-family="sans-serif">大腦警報中心</text></g><text x="291" y="100" fill="#475569" font-size="20" font-family="sans-serif">→</text><g transform="translate(306,65)"><rect x="0" y="0" width="110" height="60" rx="8" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/><text x="55" y="24" text-anchor="middle" fill="#fcd34d" font-size="12" font-family="sans-serif">交感神經啟動</text><text x="55" y="44" text-anchor="middle" fill="#64748b" font-size="10" font-family="sans-serif">備戰模式</text></g><text x="429" y="100" fill="#475569" font-size="20" font-family="sans-serif">→</text><g transform="translate(444,65)"><rect x="0" y="0" width="120" height="60" rx="8" fill="#1e293b" stroke="#8b5cf6" stroke-width="1.5"/><text x="60" y="24" text-anchor="middle" fill="#c4b5fd" font-size="12" font-family="sans-serif">身體症狀</text><text x="60" y="44" text-anchor="middle" fill="#64748b" font-size="10" font-family="sans-serif">胸悶/頭痛/睡不著</text></g><rect x="30" y="155" width="540" height="65" rx="8" fill="#1e293b"/><text x="300" y="178" text-anchor="middle" fill="#94a3b8" font-size="12" font-family="sans-serif">其他壓力源（工作/財務）通常有結束點</text><text x="300" y="198" text-anchor="middle" fill="#fca5a5" font-size="12" font-family="sans-serif">人際壓力沒有——你可以關掉電腦，但關不掉對某個人的想法</text></svg>` },
      { id: "slide-2", type: "concept", title: "人際壓力為什麼特別耗能", content: `人是社會性動物，這不是比喻，是生物學事實。

你的神經系統從幾萬年前就被設計成要持續評估「周圍的人對我是安全還是危險的」。這個任務從來沒有停過——即使你現在坐在家裡什麼都不做，你的大腦還是在處理今天那段對話、那個表情。

其他的壓力源——工作、財務、噪音——通常有一個固定的「結束點」。

但人際壓力沒有。你可以關掉電腦，但你關不掉對某個人的想法。你的神經系統還在跟那個人「互動」，反覆重播，反覆評估。

這就是為什麼人際衝突之後，很多人會有身體症狀：頭痛、胃不舒服、心跳加速、睡不著。不是誇張，是神經系統還在戰鬥或逃跑模式裡。`, visual: `<svg viewBox="0 0 600 240" xmlns="http://www.w3.org/2000/svg"><rect width="600" height="240" fill="#0f172a" rx="12"/><text x="300" y="35" text-anchor="middle" fill="#e2e8f0" font-size="14" font-weight="bold" font-family="sans-serif">杏仁核：大腦的保全系統</text><ellipse cx="300" cy="120" rx="60" ry="50" fill="#1e293b" stroke="#ef4444" stroke-width="2"/><text x="300" y="115" text-anchor="middle" fill="#fca5a5" font-size="13" font-weight="bold" font-family="sans-serif">杏仁核</text><text x="300" y="133" text-anchor="middle" fill="#94a3b8" font-size="11" font-family="sans-serif">威脅偵測中心</text><text x="70" y="75" fill="#6ee7b7" font-size="11" font-family="sans-serif">🐯 老虎來了</text><line x1="145" y1="78" x2="242" y2="105" stroke="#475569" stroke-width="1.5"/><text x="50" y="155" fill="#fcd34d" font-size="11" font-family="sans-serif">😤 主管的眼神</text><line x1="155" y1="150" x2="242" y2="135" stroke="#475569" stroke-width="1.5"/><text x="380" y="85" fill="#f87171" font-size="11" font-family="sans-serif">→ 心跳加速</text><text x="380" y="120" fill="#f87171" font-size="11" font-family="sans-serif">→ 肌肉緊繃</text><text x="380" y="155" fill="#f87171" font-size="11" font-family="sans-serif">→ 思維窄化</text><rect x="40" y="205" width="520" height="25" rx="6" fill="#312e81"/><text x="300" y="221" text-anchor="middle" fill="#a5b4fc" font-size="11" font-family="sans-serif">🐱 魯魯：杏仁核就是你大腦裡那個不分青紅皂白的保全——老虎還是讓你不安的訊息，一律拉警報</text></svg>` },
      { id: "slide-3", type: "deepdive", title: "為什麼「別理他」這麼難做到", content: `有一個研究發現，人在社交排除（感覺被排擠或忽視）時，大腦活化的區域跟身體疼痛的區域高度重疊。

也就是說，被人拒絕、被忽視，在神經科學的層次上，真的「很痛」——不是心理上的比喻。

這也解釋了一件事：為什麼別人跟你說「算了，別理他」這麼難做到。

你不是做不到，是你的神經系統正在處理一個它認為需要認真對待的傷害。

社交威脅和身體威脅用同一套警報系統，杏仁核無法區分「老虎要吃我」跟「我的主管用那種語氣看著我」——兩種情況都可能觸發類似的反應。

這不是你太敏感，這是你的神經系統在正常運作。`, visual: `<svg viewBox="0 0 600 230" xmlns="http://www.w3.org/2000/svg"><rect width="600" height="230" fill="#0f172a" rx="12"/><text x="300" y="35" text-anchor="middle" fill="#e2e8f0" font-size="14" font-weight="bold" font-family="sans-serif">社交痛苦 = 身體疼痛（大腦層次）</text><rect x="40" y="55" width="230" height="120" rx="8" fill="#1e293b" stroke="#ef4444" stroke-width="1.5"/><text x="155" y="80" text-anchor="middle" fill="#fca5a5" font-size="13" font-weight="bold" font-family="sans-serif">身體疼痛</text><text x="155" y="105" text-anchor="middle" fill="#94a3b8" font-size="12" font-family="sans-serif">被打、受傷</text><text x="155" y="150" text-anchor="middle" fill="#6366f1" font-size="12" font-family="sans-serif">前扣帶迴皮質・前腦島</text><rect x="330" y="55" width="230" height="120" rx="8" fill="#1e293b" stroke="#8b5cf6" stroke-width="1.5"/><text x="445" y="80" text-anchor="middle" fill="#c4b5fd" font-size="13" font-weight="bold" font-family="sans-serif">社交排除</text><text x="445" y="105" text-anchor="middle" fill="#94a3b8" font-size="12" font-family="sans-serif">被忽視、被拒絕</text><text x="445" y="150" text-anchor="middle" fill="#6366f1" font-size="12" font-family="sans-serif">前扣帶迴皮質・前腦島</text><text x="300" y="100" text-anchor="middle" fill="#475569" font-size="22" font-family="sans-serif">≈</text><rect x="40" y="190" width="520" height="30" rx="6" fill="#1e293b" stroke="#6366f1" stroke-width="1"/><text x="300" y="209" text-anchor="middle" fill="#94a3b8" font-size="12" font-family="sans-serif">兩者活化相同大腦區域——社交痛苦在神經層次是真實的痛</text></svg>` },
      { id: "slide-4", type: "summary", title: "本堂重點", content: `📝 三件事，帶走就夠了：

① 人際壓力是神經系統最難關機的壓力
因為大腦被設計成要持續監控社交環境，對人的評估 24 小時沒有停過。

② 社交威脅和身體威脅用同一套警報系統
杏仁核無法區分老虎和讓你不舒服的主管，兩者都可能引發交感神經反應。

③ 社交痛苦在神經層次是真實的痛
被排除、被忽視的感覺跟身體疼痛共用大腦迴路，這解釋了為什麼「想開一點」沒有那麼容易。`, visual: `<svg viewBox="0 0 600 190" xmlns="http://www.w3.org/2000/svg"><rect width="600" height="190" fill="#0f172a" rx="12"/><text x="300" y="32" text-anchor="middle" fill="#e2e8f0" font-size="15" font-weight="bold" font-family="sans-serif">人際關係壓力：三個核心認識</text><g transform="translate(50,50)"><rect x="0" y="0" width="500" height="36" rx="6" fill="#1e293b" stroke="#6366f1" stroke-width="1"/><text x="18" y="23" fill="#6366f1" font-size="16" font-family="sans-serif">①</text><text x="45" y="23" fill="#e2e8f0" font-size="13" font-family="sans-serif">人際壓力沒有結束點——大腦24小時在處理</text></g><g transform="translate(50,96)"><rect x="0" y="0" width="500" height="36" rx="6" fill="#1e293b" stroke="#6366f1" stroke-width="1"/><text x="18" y="23" fill="#6366f1" font-size="16" font-family="sans-serif">②</text><text x="45" y="23" fill="#e2e8f0" font-size="13" font-family="sans-serif">杏仁核不分老虎和主管——同一套警報</text></g><g transform="translate(50,142)"><rect x="0" y="0" width="500" height="36" rx="6" fill="#1e293b" stroke="#6366f1" stroke-width="1"/><text x="18" y="23" fill="#6366f1" font-size="16" font-family="sans-serif">③</text><text x="45" y="23" fill="#e2e8f0" font-size="13" font-family="sans-serif">被忽視的痛在神經層次是真實的——不是太敏感</text></g></svg>` }
      ],
      quizzes: [
      { id: "q1", question: "為什麼小玲換了輕鬆的工作，卻還是因為一個主管而胸悶、疲憊？", options: ["她的個性太敏感，需要調整心態","工作環境太差，應該再換工作","人際壓力觸發杏仁核警報，神經系統持續在備戰狀態，身體反應是真實的","這只是適應新環境的短暫過渡期"], answer: 2, explanation: "當你感知到社交威脅，杏仁核會活化，啟動交感神經反應。主管的說話方式讓小玲感覺不安全，這個社交威脅訊號觸發了跟「老虎來了」類似的神經反應——胸悶、疲憊是真實的生理結果，不是心理脆弱。" },
      { id: "q2", question: "研究發現，社交排除（被忽視、被拒絕）在大腦中活化的區域，跟什麼最接近？", options: ["恐懼和焦慮的大腦區域","身體疼痛的大腦區域","悲傷和失落的大腦區域","憤怒和攻擊的大腦區域"], answer: 1, explanation: "研究顯示，社交排除（感覺被排擠或忽視）活化的大腦區域，跟身體疼痛高度重疊（前扣帶迴皮質、前腦島）。這代表社交痛苦在神經科學層次是真實的痛，不是誇張，也不是「太敏感」。" }
      ],
    },
    {
      id: "auto-vol7-lesson-2",
      title: "有毒關係的神經科學：為什麼某些人讓你身體不舒服",
      duration: 13,
      isFree: false,
      slides: [
      { id: "slide-1", type: "hook", title: "開場情境", content: `你有沒有一個認識很久的朋友，見面前你告訴自己「習慣了」，但每次結束後都覺得被掏空，需要好幾天才能恢復？你試著說服自己沒事，但你的身體一直給不同的答案。那個答案，往往比你的頭腦更準確。`, visual: '' },
      { id: "slide-2", type: "deepdive", title: "神經覺：你的身體在你想清楚之前就已經知道了", content: `多元迷走神經理論描述了一個叫「神經覺」的功能——你的自律神經系統在你意識介入之前，就已經在掃描周圍的人是否安全。它讀取對方的聲音頻率、臉部肌肉、語調，在幾毫秒內給你身體一個信號：放鬆，或保持警覺。`, visual: '' },
      { id: "slide-3", type: "concept", title: "有毒關係在神經系統裡累積什麼", content: `長期在讓你保持警覺的關係裡，你的交感神經系統會把「警覺」當成預設狀態——心跳略快、肌肉略緊、消化受抑制、睡眠品質下降。更嚴重的是，這個防禦模式會蔓延到你跟其他人的關係，因為你的神經系統已經很難輕易切換到「安全」了。`, visual: '' },
      { id: "slide-4", type: "deepdive", title: "間歇性強化：為什麼你離不開", content: `當一段關係偶爾給你溫暖，但大部分時候讓你不安，你的大腦反而對這段關係更黏——不確定的獎勵對多巴胺系統的刺激，比穩定的獎勵更強。這就是為什麼很多人明知道一段關係對自己不好，但就是很難真正放手。這不是意志力的問題。`, visual: '' },
      { id: "slide-5", type: "summary", title: "本堂重點", content: `① 身體的不舒服是神經覺給的警訊，不是你太敏感——它在你意識判斷前就已經在評估
② 長期警覺狀態會改變你的神經系統預設值——防禦模式會蔓延到其他關係
③ 間歇性強化讓你難以離開——這是神經機制，不是你的錯
下一堂預告：社交焦慮不是個性內向，是神經在預測危險。`, visual: '' }
      ],
      quizzes: [
      { id: "q1", question: "「神經覺」（neuroception）是什麼？", options: ["你有意識地判斷一個人是否值得信任的能力","自律神經系統在意識介入前自動掃描環境安全性的功能","大腦記憶人臉和名字的機制","你對別人情緒的同理感知能力"], answer: 1, explanation: "正確答案是B。神經覺是自律神經系統的自動掃描功能，它在你「想清楚」之前就已經完成了安全評估。A是有意識的判斷，和神經覺的「前意識」特性相反。C和D都不是神經覺的定義。" },
      { id: "q2", question: "長期在讓你保持警覺的關係裡，神經系統最可能出現的長期影響是？", options: ["前額葉皮質功能增強，更能理性分析人際關係","杏仁核萎縮，對威脅越來越不敏感","交感神經系統把「警覺」當成預設狀態，影響蔓延到其他關係","副交感神經系統增強，作為補償性保護機制"], answer: 2, explanation: "正確答案是C。長期維持交感警覺狀態會改變神經系統的基準線，讓你對所有互動都更難放鬆，這個影響會蔓延到本來沒有問題的關係。A、B、D都不是本堂描述的機制。" },
      { id: "q3", question: "「間歇性強化」如何讓人很難離開對自己不好的關係？", options: ["讓人習慣壞的對待，失去對正常關係的判斷力","偶發的正向回饋對多巴胺系統的刺激比穩定獎勵更強","讓人擔心離開後找不到更好的關係","製造強烈的分離焦慮，讓人害怕獨處"], answer: 1, explanation: "正確答案是B。間歇性強化的核心機制是：不確定的獎勵（偶爾的溫暖）對多巴胺系統的刺激遠比穩定的獎勵更強，這讓大腦對這段關係的黏著度更高。A、C、D雖然都可能發生，但不是間歇性強化的神經科學機制。" },
      { id: "q4", question: "阿明見到老朋友後總是覺得空和累，需要幾天恢復。從神經科學角度，這最可能代表什麼？", options: ["阿明有社交焦慮，需要更多單獨練習","那段友誼已經結束，阿明應該直接斷交","他的神經系統對這個人有持續的警覺反應，互動本身在消耗神經能量","阿明有慢性疲勞症候群，跟人際關係無關"], answer: 2, explanation: "正確答案是C。「需要幾天恢復」是神經系統警覺狀態消耗後的回復期，這是神經覺偵測到威脅信號後的結果。A混淆了社交焦慮的定義；B是直接的行動建議，不是神經科學解釋；D把症狀歸因轉移了。" },
      { id: "q5", question: "根據多元迷走神經理論，下列哪種體驗最能說明「神經覺」在運作？", options: ["在讀了對方的履歷之後，你決定信任他","某人還沒開口，你就已經覺得莫名緊繃或放鬆","你仔細分析了對方的行為後，得出他不可靠的結論","透過長期相處，你逐漸了解一個人的個性"], answer: 1, explanation: "正確答案是B。神經覺的關鍵特徵是「前意識」——在你刻意思考之前，身體就已經給了一個反應。A、C、D都涉及有意識的評估或時間積累，不符合神經覺的「自動且先於意識」特性。" }
      ],
    },
    {
      id: "auto-vol7-lesson-3",
      title: "社交焦慮：不是個性內向，是神經在預測危險",
      duration: 13,
      isFree: false,
      slides: [
      { id: "slide-1", type: "hook", title: "開場情境", content: `想像一個從國中就開始這樣的人：只要要在班上說話，心臟就快到好像要跳出來。私下跟朋友完全沒問題，但只要是「正式場合」，身體就先投降。老師說「多練習就好了」——她練習了十幾年，還是一樣。因為問題不在練習，在神經系統的反應模式。`, visual: '' },
      { id: "slide-2", type: "deepdive", title: "社交焦慮的神經迴路", content: `有社交焦慮的人，杏仁核對「社交評價相關刺激」的反應特別強烈，而前額葉皮質對杏仁核的調節抑制效果相對較弱。結果是：警報太容易響，關掉警報的機制又不夠有力。這讓社交焦慮者陷入一個消耗極大的惡性循環。`, visual: '' },
      { id: "slide-3", type: "concept", title: "預期焦慮比當下更消耗神經", content: `社交焦慮消耗最多能量的，不是在被評判的當下，而是在那之前漫長的預期。一個15分鐘的簡報，你的神經系統可能在前三天就開始啟動壓力反應，把那個情境想了幾百遍。真正上台的時候，你其實已經耗盡了。這也解釋了為什麼事後常常說「其實還好」。`, visual: '' },
      { id: "slide-4", type: "deepdive", title: "迴避是短期解藥、長期毒藥", content: `迴避讓你立刻從威脅中解脫——神經系統當下放鬆了。但它同時在告訴大腦：「對，那個情況確實很危險，所以我們才逃了。」這強化了「社交場合=危險」的連結，讓下一次的焦慮更強。社交焦慮不處理，通常越來越嚴重，不是隨年齡消失。`, visual: '' },
      { id: "slide-5", type: "summary", title: "本堂重點", content: `① 社交焦慮是神經系統的反應模式，不是個性問題——杏仁核過度反應加前額葉調節不足，是可以理解的機制
② 預期焦慮比當下更耗神——三天的想像消耗遠超過15分鐘的現實
③ 迴避強化焦慮的神經連結——每次迴避都在告訴大腦那個情境很危險
下一堂預告：說不出「不」的身體代價。`, visual: '' }
      ],
      quizzes: [
      { id: "q1", question: "社交焦慮的核心神經機制是？", options: ["海馬迴儲存了太多社交失敗的記憶","杏仁核過度反應加上前額葉皮質調節不足","多巴胺系統對社交獎勵不夠敏感","腹側迷走神經功能異常"], answer: 1, explanation: "正確答案是B。社交焦慮的兩個核心神經特徵：杏仁核對社交評價刺激反應過強，以及前額葉皮質無法有效抑制杏仁核的反應。A雖然記憶有影響，但不是本堂強調的核心機制。C和D在本堂沒有提及。" },
      { id: "q2", question: "為什麼社交焦慮的人常常在事後說「其實沒那麼糟」？", options: ["記憶偏差讓人遺忘了痛苦的部分","預期焦慮已經消耗了大量神經能量，當下反而沒有更多焦慮資源","事後大腦進行了理性化，讓人覺得沒那麼嚴重","在場時的注意力分散讓人沒有注意到焦慮"], answer: 1, explanation: "正確答案是B。因為預期焦慮在事前就把大量壓力反應「提前啟動」了，當下的神經系統反而已經耗盡，加上現實情境幾乎永遠不如大腦預測的糟糕。A的記憶偏差說法相反（通常是對痛苦的記憶更清晰）。C和D不是本堂的解釋角度。" },
      { id: "q3", question: "迴避行為在長期如何影響社交焦慮？", options: ["給神經系統足夠的恢復時間，讓焦慮自然消退","強化了「社交場合=危險」的神經連結，讓焦慮越來越強","讓人有機會發展其他更有效的人際策略","短期和長期效果相同，都能降低焦慮"], answer: 1, explanation: "正確答案是B。每次迴避都在對神經系統確認「那個情境確實危險值得逃跑」，這強化了恐懼連結，讓下次的焦慮門檻更低。A描述的是短期效果，不是長期。C和D不符合本堂的說明。" },
      { id: "q4", question: "小美在重要簡報的三天前就開始心跳加速、睡不好。這個現象的最佳解釋是？", options: ["她對自己準備不夠充分有真實的擔憂","她的社交焦慮使她預期性地啟動壓力反應，在事件前就開始大量消耗神經能量","她的睡眠習慣本來就不好，跟簡報無直接關係","她需要更多練習才能建立信心"], answer: 1, explanation: "正確答案是B。預期焦慮是社交焦慮的核心特徵之一——神經系統提前啟動壓力反應，反覆模擬威脅情境，導致事件前就已耗竭。A可能是部分原因但不是本堂強調的神經機制。C和D偏離了本堂的分析框架。" },
      { id: "q5", question: "下列哪個描述最準確區分了「社交焦慮」和「個性內向」？", options: ["社交焦慮的人不喜歡人群，內向的人喜歡人群","社交焦慮是神經系統的威脅反應機制，內向是對社交刺激的能量偏好","內向的人可以學會喜歡社交，社交焦慮的人永遠無法適應","兩者沒有明確區別，只是程度的差異"], answer: 1, explanation: "正確答案是B。本堂強調社交焦慮的核心是神經系統對社交情境的威脅反應（杏仁核警報系統），這跟內向是對社交刺激感到消耗而傾向安靜（能量偏好）是不同的機制。A的描述是錯誤的（兩者都可能在某些情況喜歡或不喜歡人群）。C過於絕對。D忽略了機制上的本質差異。" }
      ],
    },
    {
      id: "auto-vol7-lesson-4",
      title: "邊界缺失：說不出「不」的身體代價",
      duration: 12,
      isFree: false,
      slides: [
      { id: "slide-1", type: "hook", title: "開場情境", content: `你有沒有過這種感覺：明明不想答應，但到了那個關鍵時刻，嘴巴就是打結，最後說了「好」。說完之後有一口氣鬆了，但同時胸口又有一種悶悶的委屈。這口鬆了的氣，不是真正的放鬆——那只是你的神經系統暫時躲開了一個衝突。`, visual: '' },
      { id: "slide-2", type: "deepdive", title: "為什麼說「不」這麼難", content: `拒絕別人會觸發兩種神經系統的拉鋸：一邊是對社交拒絕的恐懼（社交痛苦在神經層次是真實的痛），另一邊是承接超額任務的長期耗竭。當你預測「說不會讓關係緊張」，杏仁核會傾向選擇眼前可避免的痛——說「好」。短期有效，但代價累積在你的神經系統裡。`, visual: '' },
      { id: "slide-3", type: "concept", title: "長期無邊界的神經後果", content: `你的自律神經系統每天能處理的壓力有上限。當你持續承接超過預算的任務和情緒，副交感神經沒有足夠的恢復時間，慢性壓力開始累積。你開始對很小的請求也感到沉重，對那些「讓你說不出不」的人產生莫名煩躁——那不是你的人品問題，是神經系統在說：我的油快沒了。`, visual: '' },
      { id: "slide-4", type: "deepdive", title: "邊界是為了讓關係可以持續", content: `設定邊界不是拒絕關係，是讓你的神經系統有足夠空間維持那段關係。長期不設邊界的神經系統只有兩個出路：崩潰（爆發、生病、完全退縮），或切斷（對那段關係在情緒上越來越麻木）。說「不」不是結束，是讓你還能說「好」的條件。`, visual: '' },
      { id: "slide-5", type: "summary", title: "本堂重點", content: `① 說不出「不」是神經機制，不是個性軟弱——杏仁核在社交拒絕恐懼和長期耗竭之間選擇了眼前可避免的那個
② 長期無邊界讓副交感神經無法恢復——對人莫名煩躁是神經系統在說「我快沒油了」
③ 邊界是關係的護航機制——讓你有空間，才能讓你真正在場
下一堂預告：家庭壓力為什麼往往是最深的壓力？`, visual: '' }
      ],
      quizzes: [
      { id: "q1", question: "從神經科學角度，「說不出不」的主要原因是？", options: ["自我價值感低，覺得不配拒絕別人","對社交拒絕的恐懼在當下比長期耗竭的代價更有感，杏仁核傾向選擇說好","從小的教養讓他們習慣順從","他們真的很想幫助別人，這是善良的表現"], answer: 1, explanation: "正確答案是B。本堂的神經科學解釋是：社交拒絕的恐懼（當下的、立即的神經信號）比慢性超載的代價（長期的、未來的）更強烈，所以杏仁核的防禦機制傾向選擇說「好」來避免立即的社交痛苦。A和C可能是成因之一，但不是本堂的核心神經機制說明。D雖然也可能同時為真，但不是「說不出不」的解釋。" },
      { id: "q2", question: "長期無邊界最終可能讓你對「讓你說不出不」的人感到莫名煩躁，這代表什麼？", options: ["你開始看清楚那個人的真實個性，不再受到矇蔽","你的人際關係技巧在進步，開始懂得保護自己","神經系統慢性超載後在傳遞「我的能量快耗盡了」的訊號","你對那段關係的感情正在消退，應該考慮結束關係"], answer: 2, explanation: "正確答案是C。莫名煩躁不是因為對方做了什麼特別的事，而是你的神經系統長期超載後的表現——它用煩躁來傳達一個早就該被說出來的邊界信號。A、B、D雖然可能在某些情況下成立，但都不是本堂描述的神經超載機制。" },
      { id: "q3", question: "長期不設邊界的神經系統最終會走向哪兩個可能的結果？", options: ["完全適應和學會無限付出","免疫力增強或心理素質提升","崩潰（爆發/退縮/生病）或切斷（情緒麻木）","對邊界的需求逐漸消失，達到平衡"], answer: 2, explanation: "正確答案是C。當神經系統長期無法恢復，它只有兩個出路：以爆發、生病或完全退縮的形式崩潰，或是以對關係逐漸情感疏離和麻木的形式切斷。A和D描述的是不可能的「習慣化」，B不符合本堂的說明。" },
      { id: "q4", question: "阿明說完「好」之後，感覺「鬆了一口氣，但又有悶悶的委屈」。這兩種感覺各代表什麼？", options: ["鬆了一口氣=對自己的慷慨感到滿足；委屈=擔心對方不夠感謝","鬆了一口氣=神經系統暫時躲開了社交衝突；委屈=神經系統感知到自我需求再次被忽略","鬆了一口氣=任務順利交接；委屈=擔心自己能不能完成","兩種感覺都來自對結果的不確定性"], answer: 1, explanation: "正確答案是B。說「好」讓杏仁核的社交衝突警報暫時解除（鬆了一口氣），但同時神經系統感知到一個需求邊界再次沒有被維護（委屈）。這兩種同時存在的感覺正是邊界缺失的典型神經體驗。" },
      { id: "q5", question: "下列哪句話最準確地總結了「邊界」的神經科學角色？", options: ["邊界是保護自己不被別人利用的防線","邊界是讓神經系統有足夠恢復空間、從而能持續維持關係的機制","邊界是告訴別人你不喜歡他們的方式","邊界只有在關係很糟糕的時候才需要設定"], answer: 1, explanation: "正確答案是B。本堂的核心論點是：邊界的功能不是排斥，而是讓你的神經系統有足夠的恢復空間，從而讓你能夠持續地、真實地維持那段關係。A、C的說法把邊界定義為對抗性的工具。D的說法錯誤地把邊界限縮在「只有出問題才需要」的場景。" }
      ],
    },
    {
      id: "auto-vol7-lesson-5",
      title: "家庭壓力：最深的壓力往往來自最近的人",
      duration: 13,
      isFree: false,
      slides: [
      { id: "slide-1", type: "hook", title: "開場情境", content: `有一種壓力，是在電話還沒接起來之前就已經感覺到的。你看到媽媽的名字出現在螢幕上，胸口就先緊了一下。不是她做了什麼壞事，就是那種「我要進入狀態了」的感覺。掛完電話之後，你需要一段時間才能把那個感覺消化掉。這不是你不孝，是你的神經系統在回應一個很深的歷史記憶。`, visual: '' },
      { id: "slide-2", type: "deepdive", title: "為什麼家庭壓力特別深", content: `你最早關於「世界是否安全」的學習，來自你的主要照顧者。這叫早期依附——你的神經系統在童年透過與家人的互動，建立了關於「人與我的關係」的基本模型。這個模型深刻刻印在神經系統裡，所以家人的一句話，往往比陌生人的十句話更有穿透力。`, visual: '' },
      { id: "slide-3", type: "concept", title: "只是看到名字就開始緊張", content: `長期在家庭關係中感受到壓力的人，很多人會有「見到某個家人之前就開始緊張」的現象——甚至只是看到名字出現在手機螢幕上。這是神經系統的預期性保護機制，它對一個被它標記為「不確定安全」的對象提前發出警告。這是正常的神經反應，不是你小題大作。`, visual: '' },
      { id: "slide-4", type: "deepdive", title: "家庭情境觸發的舊程式", content: `一回到家，你可能會發現自己用了一個「很不像成年人」的方式在反應——沉默、爆發、或表面順從但內心委屈。這不是你沒有長大，是家庭情境觸發了你的神經系統調用「最熟悉的舊程式」。理解這件事，才有機會在那個自動反應裡退一步，做出不同的選擇。`, visual: '' },
      { id: "slide-5", type: "summary", title: "本堂重點", content: `① 家庭壓力連著早期依附，所以特別深——神經系統在回應「所有過去的記憶總和」，不只是今天這句話
② 見到家人前就緊張是神經預警，不是反應過度——它在提醒你這個對象的歷史記錄
③ 家庭情境觸發舊的神經程式——看清楚這個模式，是做出不同選擇的第一步
下一堂預告：職場關係壓力為什麼格外難消化。`, visual: '' }
      ],
      quizzes: [
      { id: "q1", question: "「早期依附」在神經科學上影響了什麼？", options: ["你的記憶力和學習速度","你的神經系統對「人與我的關係是否安全」的基本模型","你選擇朋友和伴侶的意識偏好","你的情緒表達能力和語言發展"], answer: 1, explanation: "正確答案是B。早期依附在神經科學上建立的是一個關於「人際關係基本安全性」的神經模型，這個模型在嬰幼兒期與主要照顧者的互動中形成，並深刻影響成年後的神經反應模式。A、C、D雖然也有相關性，但不是本堂描述早期依附的核心功能。" },
      { id: "q2", question: "為什麼家人的一句批評比陌生人的十句批評更有殺傷力？", options: ["家人更了解你的弱點，所以說的更準確","你更在乎家人的看法，所以反應更強烈","家庭互動的神經記憶更深，家人的話在神經網絡裡有更多連結被觸發","批評來自家人代表關係出了問題，讓人更焦慮"], answer: 2, explanation: "正確答案是C。本堂的神經科學解釋是：家庭情境觸發的不只是「這一句話」，而是所有相關神經記憶的網絡，所以影響特別深。A和B可能都有部分道理，但不是本堂強調的早期依附神經機制。D是行為層面的解釋，不是神經機制。" },
      { id: "q3", question: "「只是看到媽媽的名字出現在螢幕上，胸口就先緊了一下」，這最可能是什麼神經現象？", options: ["焦慮症的症狀，需要就醫","神經系統對帶有歷史壓力記憶的對象做出預期性保護反應","手機使用習慣讓人對通知過度敏感","表示這段關係已經無法修復"], answer: 1, explanation: "正確答案是B。看到名字就緊張是神經系統的預期性保護機制——它已經把這個對象標記為「需要警覺」，所以在互動發生前就提前啟動保護反應。這是神經系統的正常學習結果，不一定代表焦慮症（A），也不是手機問題（C），更不代表關係無法修復（D）。" },
      { id: "q4", question: "一回到家就用「不像成年人的方式反應」（如沉默爆發），本堂給的解釋是？", options: ["你在家裡可以放下偽裝，這是你真實的個性","家庭關係長期累積的壓力在安全環境中釋放","家庭情境觸發神經系統調用最熟悉的舊程式，這是自動反應，不代表你沒長大","你對家人沒有邊界，所以情緒控制失效"], answer: 2, explanation: "正確答案是C。本堂的核心說明是：家庭情境的環境線索會觸發早年建立的神經反應模式，這是神經系統的自動調用，不是「沒長大」或「真實個性」。理解這個機制才能退一步觀察，而不是對自己的反應感到羞愧。A和B不是本堂的神經科學角度。D混入了第4堂的邊界概念，但不是本堂的核心解釋。" },
      { id: "q5", question: "根據本堂內容，家庭壓力最獨特的地方是？", options: ["家人之間的衝突沒有辦法透過溝通解決","家庭壓力連結早期依附，觸發的是所有記憶的累積，而不只是當下這次互動","家人對你的影響比所有其他關係加起來還大","家庭壓力是無法改變的，因為它來自基因和童年"], answer: 1, explanation: "正確答案是B。本堂強調家庭壓力的獨特性在於：它連著早期依附建立的神經模型，所以每次家庭互動觸發的不只是當下的情境，而是整個相關神經記憶的網絡。A過於絕對。C雖然可能但本堂沒有這樣論述。D把「深根性」誤解成「不可改變」，本堂強調的是理解模式後可以有不同選擇。" }
      ],
    },
    {
      id: "auto-vol7-lesson-6",
      title: "職場關係壓力：同事、主管、被忽視、被針對",
      duration: 12,
      isFree: false,
      slides: [
      { id: "slide-1", type: "hook", title: "開場情境", content: `想像一份工作：任務本身不難，你也做得來。但有一個主管，從不直接批評你，就是常常在有外人在的時候，用一種說不清楚哪裡不對的語氣跟你說話，或是把你的想法說成別人的。每天早上去上班，胃就在拉警報。你試著說「不要在意」，但你的身體就是沒辦法配合。`, visual: '' },
      { id: "slide-2", type: "deepdive", title: "職場壓力的雙重威脅", content: `職場人際壓力之所以特別難消化，因為它同時觸發兩種原始威脅：地位威脅（被貶低、功勞被拿走、感受不公平對待——研究顯示地位威脅觸發的壓力反應跟生存威脅高度重疊）；加上無法逃離（你必須每天面對，而且這影響你的收入和職涯）。「有威脅但無法逃跑」是讓神經系統慢性超載最快的情境。`, visual: '' },
      { id: "slide-3", type: "concept", title: "被忽視的傷害不比被針對小", content: `「被針對」讓杏仁核持續警戒，讓你一直在掃描「下一個攻擊什麼時候來」。「被忽視」看起來溫和，但研究顯示職場骨子裡的排斥——被忽略、名字從討論裡消失——觸發的大腦反應跟被公開攻擊相似。有毒主管不一定會罵你，讓你覺得不存在有時候更耗神。`, visual: '' },
      { id: "slide-4", type: "deepdive", title: "在無法立刻改變的情況下降低神經負荷", content: `不是每個人都能說離職就離職。可以做的是：為下班後創造物理邊界（換環境、走路，讓身體知道處境暫時結束）；找到職場裡至少一段讓你感覺安全的關係（研究顯示一段被理解的連結就能顯著緩衝高壓職場的影響）；對感受命名（「我感覺被忽視，這觸發了我的地位威脅」，讓前額葉皮質介入降溫）。`, visual: '' },
      { id: "slide-5", type: "summary", title: "本堂重點", content: `① 職場人際壓力結合地位威脅和無法逃離，是最難消化的壓力組合之一
② 被忽視的神經影響不比被針對小——職場排斥觸發的大腦反應跟公開攻擊高度重疊
③ 下班邊界、安全連結、情緒命名可以降低神經負荷——不能根治但可以讓神經系統有更多恢復空間
下一堂預告：社群媒體與比較壓力的神經科學。`, visual: '' }
      ],
      quizzes: [
      { id: "q1", question: "職場人際壓力比工作量本身更耗神的核心原因是？", options: ["職場關係比工作任務更複雜，需要更多認知資源","它同時觸發地位威脅和無法逃離兩種原始神經負擔","工作任務可以靠能力解決，人際問題無法靠能力解決","職場關係會影響薪水，讓人產生財務焦慮"], answer: 1, explanation: "正確答案是B。本堂的核心論點是職場人際壓力的特殊消耗性，來自「地位威脅」（觸發跟生存威脅相近的神經反應）加上「無法逃離」（有威脅但無法用逃跑解除），這個組合對神經系統的持續耗損最大。A和C有部分道理但不是本堂強調的神經機制。D是財務壓力的概念，不是核心。" },
      { id: "q2", question: "研究顯示，「地位威脅」觸發的壓力反應跟什麼威脅高度重疊？", options: ["財務損失威脅","生存威脅","健康威脅","親密關係威脅"], answer: 1, explanation: "正確答案是B。本堂說明，地位威脅（被貶低、不公平對待、功勞被拿走）在神經科學研究中觸發的壓力反應，跟直接的生存威脅高度重疊。這解釋了為什麼職場裡的「面子問題」會讓人的身體有這麼強烈的反應。" },
      { id: "q3", question: "為什麼「被忽視」在職場中的神經影響有時候不比「被針對」小？", options: ["被忽視讓人不知道問題在哪，更難找到解決方法","職場骨子裡的排斥觸發的大腦反應跟被公開攻擊相似","被忽視代表沒有晉升機會，引發更大的財務焦慮","被忽視的人更容易被邊緣化，最終失去工作"], answer: 1, explanation: "正確答案是B。本堂說明，被忽視（被排除、名字從討論消失）觸發的大腦排斥反應（ostracism）在神經科學研究中跟被公開攻擊的反應高度相似——因為人的神經系統對「不被看見」的威脅非常敏感。A有道理但不是神經科學解釋。C和D偏向後果描述。" },
      { id: "q4", question: "「對感受命名」（如說出「我感覺被忽視，這觸發了我的地位威脅」）對神經系統有什麼作用？", options: ["讓別人知道你的感受，有助於改善職場關係","強化記憶，幫助你之後向主管或HR說明情況","讓前額葉皮質介入，幫助調節杏仁核的過度反應","透過語言表達釋放被壓抑的情緒能量"], answer: 2, explanation: "正確答案是C。把感受說出來或在心裡命名，可以激活前額葉皮質（負責理性調節情緒的區域），幫助它介入並調節杏仁核的反應強度。A是人際效果，B是策略用途，D雖有部分道理但不是本堂強調的神經機制。" },
      { id: "q5", question: "阿明的主管說話方式讓他「胃在拉警報」但說不清楚哪裡不對。這個現象在神經科學上最可能的解釋是？", options: ["阿明的腸胃本來就有問題，職場壓力只是引發了舊病","阿明對衝突非常敏感，需要加強情緒管理能力","神經覺在意識判斷前已偵測到地位威脅信號，啟動了身體的壓力反應","那個主管的行為已構成職場霸凌，阿明應該舉報"], answer: 2, explanation: "正確答案是C。「說不清楚哪裡不對但身體先有反應」是神經覺（neuroception）的典型表現——自律神經系統在意識判斷完成之前，已經透過掃描對方的語調、行為模式偵測到地位威脅信號，並啟動身體的壓力反應。A和B轉移了神經科學焦點。D雖可能成立但不是本堂的核心解釋。" }
      ],
    },
    {
      id: "auto-vol7-lesson-7",
      title: "社群媒體與比較壓力",
      duration: 12,
      isFree: false,
      slides: [
      { id: "slide-1", type: "hook", title: "開場情境", content: `你下班後刷一個小時的Instagram，說是放鬆。但刷完之後，你有一種說不清楚的煩躁和不滿足感，比刷之前更空。你沒有真的很羨慕誰，就是感覺哪裡不太對。放下手機之後，那個感覺還在。這個體驗非常普遍——而且有清楚的神經科學解釋。`, visual: '' },
      { id: "slide-2", type: "deepdive", title: "社會比較是大腦的預設功能", content: `社會比較不是「不知足」，是人類神經系統的基本功能之一。在演化上，了解自己在群體裡的位置對生存很重要。問題是：這個系統設計用來處理小型真實社群（幾十個人，你認識他們，你對他們有真實了解）。社群媒體讓你每天接觸幾百人的精心呈現版本——你的比較系統在完全不對等的條件下超時運作。`, visual: '' },
      { id: "slide-3", type: "concept", title: "無限滾動如何操縱你的神經系統", content: `社群媒體的三個神經利用點：可變獎勵（不知道下一則是什麼——這種不確定性跟賭博機制一樣讓多巴胺難以停止）；社交確認需求（按讚和留言觸發多巴胺，沒有回應觸發輕微社交威脅反應）；重置循環（每次拿起手機都在期待新的刺激，讓注意力持續碎片化）。`, visual: '' },
      { id: "slide-4", type: "deepdive", title: "「刷完更累」的神經科學", content: `刷社群媒體不是休息：一、大量視覺和社交信息處理是消耗，不是補充。二、比較機制持續被觸發，讓神經系統一直在評估自己的位置。三、被動消費長期取代真實社交互動，而真實連結才是你的神經系統真正需要的。不是你沒有意志力，是你在對抗幾十位專門研究神經系統弱點的工程師設計的系統。`, visual: '' },
      { id: "slide-5", type: "summary", title: "本堂重點", content: `① 社會比較是大腦本能，不是你不知足——問題是這個系統設計用來處理真實小型社群，不是每天幾百個精華版生活
② 社群媒體的設計直接對應神經系統的弱點——可變獎勵、社交確認需求、重置循環
③ 「刷完更空」是神經科學事實——大量信息處理加持續比較加被動消費，是消耗不是補充
下一堂預告：孤獨為什麼是真實的身體壓力。`, visual: '' }
      ],
      quizzes: [
      { id: "q1", question: "為什麼用「自己的全貌」跟「別人的精華版」比較，會讓神經系統持續感到不足？", options: ["你的生活確實比別人差，所以感到沮喪是正確的反應","社會比較系統無法自動辨識信息的真實性或完整性，會把精華版當作完整現實處理","你需要更積極地展示自己，讓對比基準更公平","這是社群媒體演算法故意製造的嫉妒心理以增加使用時間"], answer: 1, explanation: "正確答案是B。社會比較系統是自動運作的，它不會在比較前先確認那個信息是「精華版」還是「全貌」，所以你的神經系統就拿「你的真實全貌」跟「對方的精心呈現」做了一次不對等的比較，而且完全不知情。A不正確。C是行為建議不是神經科學解釋。D把責任歸咎演算法，部分成立但不是本堂的核心神經機制。" },
      { id: "q2", question: "「可變獎勵」如何讓你繼續刷社群媒體停不下來？", options: ["每次都能找到有趣的內容，讓你覺得值得繼續","你不知道下一則是什麼，不確定性對多巴胺的刺激跟賭博相似，讓人難以停止","社群媒體的推薦算法越來越了解你的喜好，內容越來越吸引你","你對親友的責任感讓你不得不持續關注他們的動態"], answer: 1, explanation: "正確答案是B。可變獎勵的神經機制是：不確定的獎勵（也許下一則很有趣，也許不是）對多巴胺系統的刺激比確定獎勵更強，這讓你的大腦持續處在「再看一則」的期待狀態。A和C描述的是算法準確性，不是可變獎勵機制。D是社交責任，不是神經機制。" },
      { id: "q3", question: "「刷完社群媒體之後感到空洞和疲憊」，本堂給的主要神經科學解釋是？", options: ["手機的藍光對大腦產生了疲勞效果","大量信息處理消耗神經能量，持續比較觸發壓力反應，被動消費取代真實連結需求","社群媒體上的內容品質越來越低，讓人感到智識上的不滿足","長時間保持同一姿勢瀏覽讓身體不適，影響心情"], answer: 1, explanation: "正確答案是B。本堂說明刷完更空的三個神經原因：大量視覺社交信息的處理本身是消耗（不是休息）；比較機制的持續觸發是壓力；被動消費長期取代了真實連結（神經系統真正需要的）。A、C、D都可能有部分影響，但不是本堂的核心解釋。" },
      { id: "q4", question: "以下哪種社群媒體行為的影響最直接對應神經系統對「社交確認」的需求？", options: ["看到喜歡的品牌推廣新產品","閱讀朋友分享的新聞文章","發了一則貼文等待別人按讚，或發現貼文沒有得到回應","看YouTube影片學習新技能"], answer: 2, explanation: "正確答案是C。「等待別人按讚」和「發現沒有回應」直接觸發神經系統對社交確認的需求——有回應時有多巴胺小高峰，沒有回應時則可能啟動輕微社交威脅反應。A、B、D是其他類型的使用行為，跟社交確認需求的關聯沒有C那麼直接。" },
      { id: "q5", question: "本堂說「不是你沒有意志力」，這是在說明什麼？", options: ["社群媒體的使用完全由平台負責，個人沒有任何控制能力","你對抗的是專門研究神經系統弱點的工程師設計的系統，這讓「停下來」本來就很難","意志力訓練無效，只有刪除APP才是解決方法","社群媒體成癮是醫療問題，應該尋求專業治療"], answer: 1, explanation: "正確答案是B。本堂這句話的目的是減少自責：你在對抗的不是一般的「誘惑」，而是由行為科學家和工程師針對神經系統弱點精心設計的系統。理解這件事讓你可以少一點苛責自己，多一點策略性地應對。A過於極端。C和D也過於絕對，本堂沒有給這樣的結論。" }
      ],
    },
    {
      id: "auto-vol7-lesson-8",
      title: "孤獨的壓力：缺乏連結也是身體的威脅",
      duration: 12,
      isFree: false,
      slides: [
      { id: "slide-1", type: "hook", title: "開場情境", content: `有一種狀態很難說清楚：生活穩定、沒有大問題、朋友也有，但有一個說不清楚的空一直在那裡。睡眠越來越差，對什麼事都提不起勁，好像有一個低低的底色。不是憂鬱，就是…空。這個「空」不只是心情，它在神經系統裡有非常具體的生理影響。`, visual: '' },
      { id: "slide-2", type: "deepdive", title: "孤獨的神經生物學", content: `孤獨有具體可測量的生理影響：皮質醇水平升高（神經系統把孤獨辨識為威脅狀態，觸發壓力反應）；睡眠碎片化（演化上沒有同伴保護時，保持輕度警覺對生存有利）；慢性發炎指標上升（影響免疫系統調節）。這些不是「心情不好」的比喻，是孤獨對身體的真實影響。`, visual: '' },
      { id: "slide-3", type: "concept", title: "品質比數量更重要", content: `孤獨感的核心不是「人數不夠多」，而是感覺自己的內在世界跟周圍的人是斷開的。有些人社交圈很大，但仍然深深孤獨；有些人只有幾段深度連結，神經系統卻很穩定。你的神經系統需要的不是「有人在旁邊」，是「被真正看見和理解的體驗」。`, visual: '' },
      { id: "slide-4", type: "deepdive", title: "數位連結 vs 真實連結", content: `現代孤獨的特殊處境：你從來都不是一個人（手機裡永遠有人），但你仍然孤獨。因為數位連結和真實連結對神經系統的影響不同——面對面、聲音、肢體語言、共同在場，可以啟動腹側迷走神經，讓你進入真正安全和放鬆的狀態。數位連結可以部分替代，但無法完全複製這個生理效果。`, visual: '' },
      { id: "slide-5", type: "summary", title: "本堂重點", content: `① 孤獨對神經系統的影響是生理性的——皮質醇升高、睡眠碎片化、慢性發炎都有研究支持
② 孤獨感的核心是缺乏被理解的體驗，不是缺乏人數——一百個泛泛之交填不了一段真實連結的需求
③ 數位連結無法完全替代真實連結——面對面的在場能啟動腹側迷走神經，數位做不到
下一堂預告：衝突後的身體——為什麼吵架之後睡不著。`, visual: '' }
      ],
      quizzes: [
      { id: "q1", question: "孤獨為什麼會導致睡眠碎片化？本堂給的神經科學解釋是？", options: ["孤獨的人通常習慣晚睡，打亂了生理時鐘","孤獨讓人過度思考，大腦無法在睡前平靜","演化上沒有同伴保護時保持輕度警覺有生存優勢，神經系統維持輕度戒備狀態","孤獨的人通常居住在噪音較多的地方，影響睡眠"], answer: 2, explanation: "正確答案是C。本堂說明孤獨導致睡眠碎片化有演化根源：在沒有同伴保護的情況下，神經系統保持一定的警覺度是生存機制。這個古老的神經設計讓現代人在孤獨時更容易有淺眠和夜醒的現象。A是習慣問題，B部分可能但不是本堂的演化解釋，D不相關。" },
      { id: "q2", question: "為什麼有很多朋友的人可能仍然深深感到孤獨？", options: ["社交面具讓人疲憊，越多朋友越感覺孤獨","朋友數量多意味著每段關係的深度都不夠","孤獨感的核心是缺乏被真正看見和理解的體驗，不是人數的多寡","現代友誼普遍缺乏真誠，所以無論數量多少都無法填補孤獨"], answer: 2, explanation: "正確答案是C。本堂說明孤獨感的核心是「感覺自己的內在世界和周圍的人是斷開的」，這跟人數無關。即使有很多朋友，如果沒有被真正理解的體驗，神經系統的孤獨需求仍然未被滿足。A和D有過度概括的問題。B說「數量多則深度不夠」是主觀假設，不是本堂的論點。" },
      { id: "q3", question: "數位連結和真實連結對神經系統最主要的差異是？", options: ["數位連結傳遞的信息更豐富，但真實連結更方便","真實的面對面在場可以啟動腹側迷走神經，讓人進入真正安全和放鬆的狀態","數位連結容易被誤解，真實連結更能建立信任","真實連結需要更多時間，在現代生活中難以維持"], answer: 1, explanation: "正確答案是B。本堂說明，真實連結（面對面、聲音、肢體語言、共同在場）能啟動腹側迷走神經，帶來真正的安全感和放鬆；數位連結可以部分補充，但無法完全複製這個神經生理效果。A描述的特性是相反的。C和D是關係和時間的考量，不是本堂強調的神經科學差異。" },
      { id: "q4", question: "長期孤獨與以下哪個生理指標的上升有研究相關？", options: ["血清素水平","腎上腺素基準值","慢性發炎指標","生長激素分泌量"], answer: 2, explanation: "正確答案是C。本堂明確說明，長期孤獨與慢性發炎指標的上升有研究相關，這影響了免疫系統的調節功能。這讓孤獨的影響從「心情問題」變成可測量的生理數據。A、B、D在本堂中沒有被提及為孤獨的相關生理指標。" },
      { id: "q5", question: "小美獨居、生活穩定、有朋友，但有一個說不清楚的「空」和低落底色，睡眠也越來越差。這最可能是什麼？", options: ["憂鬱症初期，應該尋求心理諮商","工作壓力在身體上的累積，需要休假","孤獨的神經生物學影響——缺乏被真正理解的連結，觸發皮質醇升高和睡眠碎片化","維生素D或睡眠激素缺乏，屬於生理問題"], answer: 2, explanation: "正確答案是C。本堂描述的孤獨生理影響——皮質醇升高、睡眠碎片化、低落底色——正好對應小美的描述。而「有朋友但仍然空」則說明這是品質層面的連結缺乏，而非數量問題。A不能僅憑這些症狀確認，本堂也沒有這樣的結論。B和D可能也是原因，但本堂的核心解釋是孤獨的神經生物學影響。" }
      ],
    },
    {
      id: "auto-vol7-lesson-9",
      title: "衝突後的身體：為什麼吵架之後睡不著",
      duration: 12,
      isFree: false,
      slides: [
      { id: "slide-1", type: "hook", title: "開場情境", content: `你跟親近的人吵了一架，不是什麼大事，最後也和好了，兩個人都說「沒事了」。但那天晚上你就是睡不著——不是還在生氣，心臟就是跳得比平常快一點，腦子裡還是偶爾回放剛才那段對話。事情不是解決了嗎？是的，事情解決了——但你的神經系統還沒解決。`, visual: '' },
      { id: "slide-2", type: "deepdive", title: "衝突對自律神經的急性影響", content: `人際衝突同時觸發多個神經警報：杏仁核的社交威脅反應、HPA軸的皮質醇釋放、交感神經的戰逃啟動。在衝突當下，你的心跳加速、血壓上升、肌肉緊繃、思維窄化（只專注眼前威脅）。這些反應的「收尾」需要時間，而這個時間遠比「對話結束的時間」長。`, visual: '' },
      { id: "slide-3", type: "concept", title: "皮質醇為什麼讓你這麼慢才能平靜", content: `皮質醇被觸發後，在你血液裡的半衰期大約是60到90分鐘。意思是：即使衝突早就結束，皮質醇還在系統裡循環，繼續維持輕度警覺和活化。這就是為什麼你「講和了但還是睡不著」——不是因為你還在生氣，是你的神經化學還在衝突後的餘震裡。`, visual: '' },
      { id: "slide-4", type: "deepdive", title: "如何幫助神經系統收尾", content: `三個有神經科學根據的方法：身體動一動（散步、伸展，讓交感神經能量有出口，幫助皮質醇代謝）；換物理環境（去另一個房間或外面走走，環境線索對神經狀態有強烈影響，換個地方幫大腦「歸檔」這個事件）；延遲所有大決定（衝突後前額葉功能受影響，不是做「這段關係該不該繼續」的時機）。`, visual: '' },
      { id: "slide-5", type: "summary", title: "本堂重點", content: `① 衝突的神經影響遠比對話持續更久——皮質醇60到90分鐘的半衰期讓你「和好後還是睡不著」
② 大腦的「反覆回放」是處理重要社交事件的自動機制，不是你刻意選擇的
③ 散步、換環境、延遲大決定可以幫助神經系統收尾——這些對應具體的神經恢復機制
下一堂預告：關係品質就是健康品質，也是這本書的最後一堂。`, visual: '' }
      ],
      quizzes: [
      { id: "q1", question: "衝突後皮質醇的半衰期大約是多久？", options: ["5到10分鐘","20到30分鐘","60到90分鐘","4到6小時"], answer: 2, explanation: "正確答案是C。本堂說明皮質醇在血液中的半衰期大約是60到90分鐘，這解釋了為什麼衝突結束後、甚至和好之後，你的神經系統還需要相當長的時間才能真正平靜下來。" },
      { id: "q2", question: "為什麼衝突後大腦會反覆回放剛才的對話？", options: ["你還沒有原諒對方，所以大腦在強化負面記憶","大腦在自動處理這個重要的社交事件，尋找模式和意義，這是自動機制不是刻意選擇","你需要整理論點，為下一次可能的爭論做準備","皮質醇讓記憶固化，讓衝突情境更難忘記"], answer: 1, explanation: "正確答案是B。本堂說明衝突後的反覆回放是大腦在「處理」這個被它標記為重要的社交事件——尋找模式、評估結果、理解意義。這是自動機制，不是你刻意選擇的，也不代表你還在生氣或沒有原諒對方。A和C是常見誤解。D描述皮質醇的部分功能但不是反覆回放的核心解釋。" },
      { id: "q3", question: "「換物理環境」為什麼可以幫助神經系統從衝突中恢復？", options: ["新環境的視覺刺激轉移了你對衝突的注意力","環境線索對神經系統的狀態有強烈影響，換個地方幫助大腦把衝突事件歸檔","戶外空氣的氧氣含量比室內高，有助於皮質醇代謝","走動本身讓你冷靜，遠離讓你生氣的人也讓緊張感下降"], answer: 1, explanation: "正確答案是B。本堂說明環境線索對神經系統的狀態有很強的影響力，改變物理環境可以幫助大腦把剛才的衝突事件「歸檔」成「已發生但已結束的事件」，而不是持續在當前環境裡被觸發。A是部分原因但不是本堂的神經科學解釋。C關於氧氣的說法是錯誤的。D提到的兩點有部分道理，但不是換環境的核心神經機制。" },
      { id: "q4", question: "為什麼衝突後不適合做「這段關係該不該繼續」等重要決定？", options: ["你在情緒激動時說的話可能讓對方更受傷","衝突後前額葉皮質的功能受壓力影響，不是做重要決定的最佳狀態","你還沒有聽到對方的完整說明，信息不完整","重要的決定應該讓雙方平靜後共同討論，不應單方面決定"], answer: 1, explanation: "正確答案是B。本堂說明衝突後前額葉皮質的功能受壓力荷爾蒙影響，在這個狀態下做出的判斷可能不夠全面和理性。等到神經系統真正平靜後，前額葉功能才能較好地運作。A、C、D雖然都有道理，但不是本堂強調的神經科學原因。" },
      { id: "q5", question: "阿明和太太「和好了、都說沒事了」，但他當晚仍然睡不著。這最直接的神經科學解釋是？", options: ["他內心其實沒有真正原諒，嘴上說沒事是假的","睡前的衝突打亂了他的睡前例行公事，破壞了睡眠習慣","皮質醇的半衰期讓神經系統在衝突結束後還繼續維持活化狀態","他對這段關係有更深層的不滿，需要找機會說清楚"], answer: 2, explanation: "正確答案是C。「和好了但睡不著」是皮質醇的半衰期效應——即使主觀上已經和解，客觀上皮質醇還在血液中循環維持輕度活化，讓神經系統無法快速切換回休息狀態。A是心理推測，不是神經科學解釋。B忽略了神經化學的主要作用。D超出本堂說明的範圍。" }
      ],
    },
    {
      id: "auto-vol7-lesson-10",
      title: "關係品質就是健康品質",
      duration: 13,
      isFree: false,
      slides: [
      { id: "slide-1", type: "hook", title: "開場情境", content: `小玲花了幾個月認真照顧自己：調整飲食、規律運動、睡眠也進步了。身體確實好一點了。但她發現，每次跟那個讓她不舒服的主管互動之後，不管前一天把自己照顧得多好，隔天都被清空。她慢慢明白了：那些照顧身體的努力很重要，但如果關係的問題沒有面對，那個洞是填不滿的。`, visual: '' },
      { id: "slide-2", type: "deepdive", title: "關係是神經系統最重要的調節器", content: `感覺社會連結良好的人：壓力反應恢復更快、炎症標記更低、免疫功能更好、壽命統計上更長。相反地，長期在低品質或高衝突的關係環境中，這些指標都往另一個方向走。這不是「先有好關係才能有健康」的因果主張，而是：關係品質是影響神經系統能否長期維持調節良好狀態的重要變數。`, visual: '' },
      { id: "slide-3", type: "concept", title: "讓神經系統感覺安全的關係三個特徵", content: `研究者歸納出讓神經系統感覺安全的關係條件：可預測性（你知道對方大概會怎麼回應你，不需要每次猜測，神經系統可以放鬆警戒）；接納感（不需要表演特定版本才能被接受，可以真實存在）；修復能力（衝突之後可以修復，神經系統學到「這個關係是安全的，出了問題也可以回來」）。`, visual: '' },
      { id: "slide-4", type: "deepdive", title: "整合：這本書在說什麼", content: `人是最複雜的壓力源，但也是最強大的緩衝器。這本書帶你看到人際壓力的神經科學根源，不是為了讓你更焦慮，而是為了：讓你的身體語言被你自己聽見；理解那些反應模式的來源，對自己多一點善意；在可以的情況下，有意識地調整你的關係環境。照顧你的關係，就是照顧你的神經系統。`, visual: '' },
      { id: "slide-5", type: "summary", title: "本堂重點", content: `① 關係品質是神經系統長期狀態最重要的環境因素——光靠飲食運動睡眠管理不夠，關係的洞填不滿
② 讓神經系統安全的關係有三個特徵：可預測性、接納感、修復能力——不需完美，但長期缺乏這三項就是慢性壓力源
③ 理解人際壓力的神經機制，是照顧自己的開始——看清反應來源，才能對自己少一點苛責
這是本系列的最後一堂，感謝你陪神經系統走完這段旅程。`, visual: '' }
      ],
      quizzes: [
      { id: "q1", question: "本堂提出，感覺社會連結良好的人有哪些健康指標的優勢？", options: ["血壓更低、肺活量更大、消化系統更健康","壓力反應恢復更快、炎症標記更低、免疫功能更好、壽命統計上更長","睡眠更深、記憶力更好、認知功能更強","荷爾蒙更平衡、新陳代謝更快、骨密度更高"], answer: 1, explanation: "正確答案是B。本堂明確說明感覺社會連結良好的人在這四個方面有優勢：壓力反應恢復更快、炎症標記更低、免疫功能更好、壽命統計上更長。其他選項雖然也可能有相關，但不是本堂說明的研究發現。" },
      { id: "q2", question: "讓神經系統感覺安全的關係「可預測性」指的是什麼？", options: ["對方的個性很穩定，從不情緒化","你知道對方大概會怎麼回應你，不需要每次互動都在猜測對方的狀態","這段關係的未來可以預見，不會突然結束","對方的行為符合社會規範，讓人感覺安心"], answer: 1, explanation: "正確答案是B。本堂說明「可預測性」的神經意義是：你的神經系統可以放鬆警戒，因為它不需要持續猜測「對方這次會怎樣」。這不要求對方沒有情緒（A），也不是關係的穩定性（C），或是對方的道德形象（D）。" },
      { id: "q3", question: "為什麼「修復能力」是讓神經系統感覺安全的重要關係特徵？", options: ["它說明這段關係沒有嚴重問題，值得繼續投入","每次修復都讓關係更深，建立更強的情感連結","它讓神經系統學到「這個關係出了問題也可以回來」，從而感到安全","避免衝突累積成無法解決的問題，讓關係更長久"], answer: 2, explanation: "正確答案是C。「修復能力」的神經意義是讓你的神經系統建立一個學習：即使這段關係發生衝突，也可以修復回來。這讓神經系統對這段關係保持安全感，而不是把每次衝突都當成可能的關係終結信號。A、B、D雖然也有道理，但不是本堂強調的神經安全感機制。" },
      { id: "q4", question: "小玲認真照顧飲食運動睡眠後，身體有進步，但跟讓她不舒服的主管互動後仍被清空。這說明什麼？", options: ["她的健康管理方向是錯的，應該改變方法","她的身體問題比她以為的嚴重，需要就醫","個人健康管理無法填補關係環境持續製造的神經負擔，關係品質是獨立的重要變數","工作環境的影響比個人生活習慣的影響大，她應該考慮換工作"], answer: 2, explanation: "正確答案是C。本堂的核心論點正是用小玲的例子說明：飲食、運動、睡眠管理對健康很重要，但關係品質是影響神經系統的獨立且重要的變數——光靠個人習慣管理，無法填補關係環境持續造成的神經耗竭。A、B、D雖然可能是某些情況的答案，但都不是本堂想傳達的核心。" },
      { id: "q5", question: "本堂說「照顧你的關係，就是照顧你的神經系統」，這個陳述的意思是？", options: ["你應該把所有時間和精力放在維持關係上，而不是個人健康管理","只有在良好的關係環境中，個人健康管理的努力才有效","關係品質是神經系統長期狀態的重要環境因素，它和飲食運動睡眠同樣值得被重視","有好的關係自然就會有好的健康習慣，因此關係比習慣更根本"], answer: 2, explanation: "正確答案是C。這句話的意思不是要你放棄個人健康管理（A是誤解），也不是說個人管理因關係而失效（B是誤解），而是說關係品質是一個和飲食運動睡眠同樣重要、但常被忽略的健康變數，值得被認真看待。D的因果關係在本堂沒有被這樣描述。" }
      ],
    }
    ],
  }
];

export default autonomicVolumes;
