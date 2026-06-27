// 📄 路徑：src/app/classroom/brain-universe/autonomic/courses.ts

export interface AutonomicSlide {
  id: string;
  type: 'hook' | 'concept' | 'deepdive' | 'summary';
  title: string;
  content: string;
  visual: string;
}

export interface AutonomicQuiz {
  id: string;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

export interface AutonomicCta {
  text: string;
  url: string;
  seriesNote: string;
}

export interface AutonomicLesson {
  id: string;
  vol: string;
  title: string;
  subtitle: string;
  duration: number;
  slides: AutonomicSlide[];
  quizzes: AutonomicQuiz[];
  cta: AutonomicCta;
}

const ST_BASE = 'https://still-time-corner.vercel.app/digital';
const VOL_IDS: Record<string, string> = {
  '01': '6a3fd2f28dfebf4148dea24e',
  '02': '6a3fd2f28dfebf4148dea24f',
  '03': '6a3fd2f28dfebf4148dea250',
  '04': '6a3fd2f28dfebf4148dea251',
  '05': '6a3fd2f28dfebf4148dea252',
  '06': '6a3fd2f28dfebf4148dea253',
  '07': '6a3fd2f28dfebf4148dea254',
};

export const autonomicLessons: AutonomicLesson[] = [
  {
    id: 'autonomic-preview-lesson-1',
    vol: '01',
    title: '你去看醫生，他說你沒事（但你真的不舒服）',
    subtitle: 'Vol.01 試讀・自律神經失調的第一個問題',
    duration: 15,
    slides: [
      {
        id: 'slide-1', type: 'hook', title: '你有過這種經驗嗎？',
        content: `阿明三十四歲，在科技公司當專案經理。過去半年，他幾乎每隔幾週就要去一次診所——有時候是心跳莫名加速，有時候是頭痛，有時候只是一種說不清楚的「整個人很不對勁」的感覺。

他做了心電圖、抽了血、照了胃鏡。醫生把報告推過來：「一切正常。」

阿明不知道該高興還是沮喪。正常是好事，但他明明就是不舒服。

如果你也有過這種經驗，這堂課是寫給你的。`,
        visual: `<svg viewBox="0 0 600 300" xmlns="http://www.w3.org/2000/svg"><rect width="600" height="300" fill="#0f172a" rx="12"/><g transform="translate(60,80)"><rect x="0" y="0" width="100" height="44" rx="8" fill="#1e293b" stroke="#6366f1" stroke-width="1.5"/><text x="50" y="27" text-anchor="middle" fill="#c7d2fe" font-size="13" font-family="sans-serif">感覺不舒服</text></g><text x="175" y="107" fill="#475569" font-size="20" font-family="sans-serif">→</text><g transform="translate(190,80)"><rect x="0" y="0" width="80" height="44" rx="8" fill="#1e293b" stroke="#6366f1" stroke-width="1.5"/><text x="40" y="27" text-anchor="middle" fill="#c7d2fe" font-size="13" font-family="sans-serif">去看醫生</text></g><text x="285" y="107" fill="#475569" font-size="20" font-family="sans-serif">→</text><g transform="translate(300,80)"><rect x="0" y="0" width="100" height="44" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/><text x="50" y="20" text-anchor="middle" fill="#6ee7b7" font-size="12" font-family="sans-serif">檢查報告</text><text x="50" y="36" text-anchor="middle" fill="#6ee7b7" font-size="12" font-family="sans-serif">一切正常</text></g><text x="415" y="107" fill="#475569" font-size="20" font-family="sans-serif">→</text><g transform="translate(430,80)"><rect x="0" y="0" width="80" height="44" rx="8" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/><text x="40" y="27" text-anchor="middle" fill="#fcd34d" font-size="13" font-family="sans-serif">？ 困惑</text></g><text x="300" y="200" text-anchor="middle" fill="#94a3b8" font-size="13" font-family="sans-serif">這不是心理作用。你的身體沒有在說謊。</text></svg>`,
      },
      {
        id: 'slide-2', type: 'concept', title: '「正常」不等於「沒事」',
        content: `現代醫學非常擅長找到「結構性問題」——腫瘤、發炎、細胞異常、器官損傷。這些東西可以被影像、血液、切片捕捉到。

但有另一類問題，是「系統的運作方式出了問題」，而不是「某個零件壞掉了」。

就像一台電腦，有時候不是硬碟壞了，是系統在背景跑了太多程式，整台機器開始當機——但你打開機殼看，每個零件都完好。

自律神經失調，大多數時候就是這種情況。不是器官壞了，是調控器官的「神經系統」失去了平衡。`,
        visual: `<svg viewBox="0 0 600 280" xmlns="http://www.w3.org/2000/svg"><rect width="600" height="280" fill="#0f172a" rx="12"/><rect x="40" y="40" width="240" height="180" rx="10" fill="#1e293b" stroke="#ef4444" stroke-width="1.5"/><text x="160" y="70" text-anchor="middle" fill="#fca5a5" font-size="14" font-weight="bold" font-family="sans-serif">結構問題</text><text x="160" y="95" text-anchor="middle" fill="#94a3b8" font-size="12" font-family="sans-serif">器官損傷 / 腫瘤 / 發炎</text><text x="160" y="130" text-anchor="middle" fill="#6ee7b7" font-size="13" font-family="sans-serif">✅ 儀器可以測到</text><text x="160" y="155" text-anchor="middle" fill="#6ee7b7" font-size="13" font-family="sans-serif">✅ 血液 / 影像捕捉</text><rect x="320" y="40" width="240" height="180" rx="10" fill="#1e293b" stroke="#6366f1" stroke-width="1.5"/><text x="440" y="70" text-anchor="middle" fill="#c7d2fe" font-size="14" font-weight="bold" font-family="sans-serif">調節問題</text><text x="440" y="95" text-anchor="middle" fill="#94a3b8" font-size="12" font-family="sans-serif">神經系統失去平衡</text><text x="440" y="130" text-anchor="middle" fill="#f87171" font-size="13" font-family="sans-serif">⚠️ 儀器難以捕捉</text><text x="440" y="155" text-anchor="middle" fill="#f87171" font-size="13" font-family="sans-serif">⚠️ 報告看起來正常</text><text x="440" y="200" text-anchor="middle" fill="#64748b" font-size="11" font-family="sans-serif">自律神經失調屬於這類</text></svg>`,
      },
      {
        id: 'slide-3', type: 'deepdive', title: '症狀是真實的，即使來源不容易看見',
        content: `很多人在被告知「檢查正常」之後，開始懷疑自己：是不是想太多？是不是身體太弱？

讓我們說清楚：

心悸，是真實的心跳加速，不是想像出來的。頭痛，是真實的神經緊繃，不是誇張。腸胃不舒服，是真實的腸道痙攣，不是無病呻吟。

這些症狀有生理根源，只是那個根源在神經系統的調節層面，而不在器官的結構層面。

理解這件事，是這本書最重要的起點。`,
        visual: `<svg viewBox="0 0 600 260" xmlns="http://www.w3.org/2000/svg"><rect width="600" height="260" fill="#0f172a" rx="12"/><text x="300" y="45" text-anchor="middle" fill="#e2e8f0" font-size="15" font-weight="bold" font-family="sans-serif">症狀確認清單</text><g transform="translate(80,70)"><rect x="0" y="0" width="440" height="48" rx="8" fill="#1e293b"/><text x="20" y="30" fill="#6ee7b7" font-size="18" font-family="sans-serif">✓</text><text x="50" y="22" fill="#e2e8f0" font-size="13" font-family="sans-serif">心悸</text><text x="50" y="39" fill="#94a3b8" font-size="11" font-family="sans-serif">真實的心跳加速，有神經科學根據</text></g><g transform="translate(80,128)"><rect x="0" y="0" width="440" height="48" rx="8" fill="#1e293b"/><text x="20" y="30" fill="#6ee7b7" font-size="18" font-family="sans-serif">✓</text><text x="50" y="22" fill="#e2e8f0" font-size="13" font-family="sans-serif">頭痛 / 腸胃不適 / 慢性疲勞</text><text x="50" y="39" fill="#94a3b8" font-size="11" font-family="sans-serif">真實的神經緊繃，不是無病呻吟</text></g><g transform="translate(80,186)"><rect x="0" y="0" width="440" height="44" rx="8" fill="#312e81"/><text x="20" y="28" fill="#a5b4fc" font-size="13" font-family="sans-serif">🐱 魯魯：儀器找不到，不代表你在說謊。你的身體沒有在騙你。</text></g></svg>`,
      },
      {
        id: 'slide-4', type: 'summary', title: '本堂重點',
        content: `📝 三件事，帶走就夠了：

① 「正常」有範圍限制
標準檢查擅長找結構損傷，自律神經的失衡屬於「調節層面」，所以「沒有異常」不等於「解釋了你的不舒服」。

② 症狀是真實的生理反應
心悸、頭痛、疲勞有具體的神經科學根據，不是心理作用，更不是「想太多」。

③ 找到根源才能真正應對
一旦理解了機制，才能做出有意義的改變。`,
        visual: `<svg viewBox="0 0 600 280" xmlns="http://www.w3.org/2000/svg"><rect width="600" height="280" fill="#0f172a" rx="12"/><text x="300" y="42" text-anchor="middle" fill="#e2e8f0" font-size="16" font-weight="bold" font-family="sans-serif">你現在知道的事</text><g transform="translate(60,60)"><rect x="0" y="0" width="480" height="54" rx="8" fill="#1e293b" stroke="#6366f1" stroke-width="1"/><text x="20" y="22" fill="#6366f1" font-size="18" font-family="sans-serif">①</text><text x="50" y="22" fill="#e2e8f0" font-size="13" font-weight="bold" font-family="sans-serif">「正常」不等於「沒事」</text><text x="50" y="40" fill="#94a3b8" font-size="11" font-family="sans-serif">自律神經失衡在調節層面，標準檢查難捕捉</text></g><g transform="translate(60,124)"><rect x="0" y="0" width="480" height="54" rx="8" fill="#1e293b" stroke="#6366f1" stroke-width="1"/><text x="20" y="22" fill="#6366f1" font-size="18" font-family="sans-serif">②</text><text x="50" y="22" fill="#e2e8f0" font-size="13" font-weight="bold" font-family="sans-serif">症狀是真實的生理反應</text><text x="50" y="40" fill="#94a3b8" font-size="11" font-family="sans-serif">不是心理作用，有具體神經科學根據</text></g><g transform="translate(60,188)"><rect x="0" y="0" width="480" height="54" rx="8" fill="#1e293b" stroke="#6366f1" stroke-width="1"/><text x="20" y="22" fill="#6366f1" font-size="18" font-family="sans-serif">③</text><text x="50" y="22" fill="#e2e8f0" font-size="13" font-weight="bold" font-family="sans-serif">找到根源才能真正應對</text><text x="50" y="40" fill="#94a3b8" font-size="11" font-family="sans-serif">理解機制，才能做出有意義的改變</text></g></svg>`,
      },
    ],
    quizzes: [
      {
        id: 'q1',
        question: '阿明做了心電圖、血液、胃鏡，報告顯示一切正常。這代表什麼？',
        options: [
          '他的症狀是心理作用，沒有生理問題',
          '排除了結構性疾病，但不代表解釋了他的不舒服',
          '醫生判斷有誤，應該繼續做更多檢查',
          '他的自律神經一定沒有問題',
        ],
        answer: 1,
        explanation: '「檢查正常」是個好消息，代表排除了許多嚴重的結構性疾病。但自律神經失衡屬於「調節層面」的問題，標準儀器不容易捕捉，所以正常報告不等於解釋了所有症狀。',
      },
      {
        id: 'q2',
        question: '心悸、頭痛、慢性疲勞這些症狀，在自律神經失調的情況下，屬於？',
        options: [
          '純粹的心理想像，沒有生理根據',
          '誇大的表現，其實沒那麼嚴重',
          '真實的生理反應，有神經科學根據',
          '必須再做更多檢查才能確定',
        ],
        answer: 2,
        explanation: '這些症狀是真實的，有具體的神經科學根據。它們源自神經系統的調節失衡，不是心理作用，也不是「想太多」。理解這一點，是後續所有學習的基礎。',
      },
    ],
    cta: { text: '繼續讀 Vol.01 完整版（共10堂）', url: `${ST_BASE}/${VOL_IDS['01']}`, seriesNote: '自律神經學系 7冊・從了解到改變' },
  },
  {
    id: 'autonomic-preview-lesson-2',
    vol: '02',
    title: '壓力不只是心理的事',
    subtitle: 'Vol.02 試讀・壓力的生理機制',
    duration: 15,
    slides: [
      {
        id: 'slide-1', type: 'hook', title: '「想開點」為什麼沒有用？',
        content: `阿明最近工作出了問題，截止日期一個接一個。他跟自己說「想開點就好」，但身體不這麼認為。

每天早上起床，肩膀就像昨晚沒睡過一樣緊。吃飯的時候沒什麼食慾，但下午三點會突然很想吃甜的。晚上躺在床上，腦袋卻一直轉，怎麼都關不掉。

他不知道的是：這些不是「想太多」，是壓力在他身體裡跑了完整的一套程序。`,
        visual: `<svg viewBox="0 0 600 280" xmlns="http://www.w3.org/2000/svg"><rect width="600" height="280" fill="#0f172a" rx="12"/><text x="300" y="40" text-anchor="middle" fill="#e2e8f0" font-size="15" font-weight="bold" font-family="sans-serif">壓力啟動時，身體在同時做這些事</text><g transform="translate(40,60)"><rect x="0" y="0" width="155" height="54" rx="8" fill="#1e293b" stroke="#ef4444" stroke-width="1"/><text x="77" y="22" text-anchor="middle" fill="#fca5a5" font-size="12" font-family="sans-serif">❤️ 心跳加速</text><text x="77" y="40" text-anchor="middle" fill="#94a3b8" font-size="11" font-family="sans-serif">血液快速送到肌肉</text></g><g transform="translate(215,60)"><rect x="0" y="0" width="155" height="54" rx="8" fill="#1e293b" stroke="#f59e0b" stroke-width="1"/><text x="77" y="22" text-anchor="middle" fill="#fcd34d" font-size="12" font-family="sans-serif">🫁 呼吸變淺變快</text><text x="77" y="40" text-anchor="middle" fill="#94a3b8" font-size="11" font-family="sans-serif">攝入更多氧氣</text></g><g transform="translate(390,60)"><rect x="0" y="0" width="170" height="54" rx="8" fill="#1e293b" stroke="#6366f1" stroke-width="1"/><text x="85" y="22" text-anchor="middle" fill="#c7d2fe" font-size="12" font-family="sans-serif">🧠 大腦高度警覺</text><text x="85" y="40" text-anchor="middle" fill="#94a3b8" font-size="11" font-family="sans-serif">注意力收窄到威脅</text></g><g transform="translate(40,130)"><rect x="0" y="0" width="155" height="54" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="1"/><text x="77" y="22" text-anchor="middle" fill="#6ee7b7" font-size="12" font-family="sans-serif">🍬 肝臟釋放血糖</text><text x="77" y="40" text-anchor="middle" fill="#94a3b8" font-size="11" font-family="sans-serif">提供即時能量</text></g><g transform="translate(215,130)"><rect x="0" y="0" width="155" height="54" rx="8" fill="#1e293b" stroke="#8b5cf6" stroke-width="1"/><text x="77" y="22" text-anchor="middle" fill="#c4b5fd" font-size="12" font-family="sans-serif">🫃 消化系統暫停</text><text x="77" y="40" text-anchor="middle" fill="#94a3b8" font-size="11" font-family="sans-serif">資源留給應急用途</text></g><g transform="translate(390,130)"><rect x="0" y="0" width="170" height="54" rx="8" fill="#1e293b" stroke="#06b6d4" stroke-width="1"/><text x="85" y="22" text-anchor="middle" fill="#67e8f9" font-size="12" font-family="sans-serif">🛡️ 免疫系統上調</text><text x="85" y="40" text-anchor="middle" fill="#94a3b8" font-size="11" font-family="sans-serif">準備應對受傷</text></g><text x="300" y="225" text-anchor="middle" fill="#f59e0b" font-size="13" font-family="sans-serif">短期：聰明的生存機制　　長期：每個環節都出問題</text></svg>`,
      },
      {
        id: 'slide-2', type: 'concept', title: '壓力是演化給你的生存工具',
        content: `人類的祖先生活在危險的環境裡，隨時可能遇到掠食者。為了活下去，身體演化出「戰或逃反應」——當危險出現，大腦在幾秒內啟動全身，讓你要嘛跑、要嘛打。

問題是，現代人的威脅不是老虎，是 email、是老闆、是貸款、是下週的報告。

這些威脅不會在三分鐘內結束，可能持續幾個月甚至幾年。而你的身體，還在用對付老虎的那套程序應對這些事。

🐱 魯魯：我每次看到鄰居的狗都全身緊繃。大姐說我是在用對付老虎的程序應對一隻柴犬。但我控制不了——因為這是我的神經在運作，不是我的「想法」。`,
        visual: `<svg viewBox="0 0 600 260" xmlns="http://www.w3.org/2000/svg"><rect width="600" height="260" fill="#0f172a" rx="12"/><rect x="40" y="40" width="230" height="150" rx="10" fill="#1e293b" stroke="#6366f1" stroke-width="1.5"/><text x="155" y="68" text-anchor="middle" fill="#a5b4fc" font-size="13" font-weight="bold" font-family="sans-serif">原始威脅</text><text x="155" y="95" text-anchor="middle" fill="#e2e8f0" font-size="22" font-family="sans-serif">🐯 老虎</text><text x="155" y="125" text-anchor="middle" fill="#94a3b8" font-size="12" font-family="sans-serif">明確、即時、短暫</text><text x="155" y="148" text-anchor="middle" fill="#6ee7b7" font-size="12" font-family="sans-serif">✅ 跑掉就解除</text><rect x="330" y="40" width="230" height="150" rx="10" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/><text x="445" y="68" text-anchor="middle" fill="#fcd34d" font-size="13" font-weight="bold" font-family="sans-serif">現代威脅</text><text x="445" y="92" text-anchor="middle" fill="#e2e8f0" font-size="13" font-family="sans-serif">📧 Email / 老闆 / 貸款</text><text x="445" y="115" text-anchor="middle" fill="#94a3b8" font-size="12" font-family="sans-serif">模糊、持續、難結束</text><text x="445" y="138" text-anchor="middle" fill="#f87171" font-size="12" font-family="sans-serif">⚠️ 幾個月都不解除</text><text x="295" y="115" text-anchor="middle" fill="#475569" font-size="20" font-family="sans-serif">→</text><text x="300" y="215" text-anchor="middle" fill="#94a3b8" font-size="12" font-family="sans-serif">身體用同一套程序應對，但現代威脅沒有終點</text></svg>`,
      },
      {
        id: 'slide-3', type: 'deepdive', title: '壓力不會只停在感覺層面',
        content: `很多人把壓力當成「情緒問題」，覺得只要「心態好」就能解決。

但壓力是生理事件。它有明確的激素、神經傳導物質、器官反應。

你感覺到「焦慮」「緊繃」「睡不好」，是這些生理反應的結果，不是原因。

理解這一點很重要——要真正解決壓力的問題，光靠「想開點」是不夠的。你需要理解身體在做什麼，才能知道要從哪裡介入。`,
        visual: `<svg viewBox="0 0 600 240" xmlns="http://www.w3.org/2000/svg"><rect width="600" height="240" fill="#0f172a" rx="12"/><text x="300" y="38" text-anchor="middle" fill="#e2e8f0" font-size="14" font-weight="bold" font-family="sans-serif">壓力的本質：不只是心情</text><rect x="60" y="55" width="480" height="50" rx="8" fill="#1e293b" stroke="#ef4444" stroke-width="1"/><text x="300" y="76" text-anchor="middle" fill="#fca5a5" font-size="13" font-family="sans-serif">❌ 舊觀念：壓力 = 心情不好，想開點就好</text><text x="300" y="95" text-anchor="middle" fill="#64748b" font-size="11" font-family="sans-serif">→ 努力調整心態，但身體的反應依然繼續</text><rect x="60" y="120" width="480" height="50" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="1"/><text x="300" y="141" text-anchor="middle" fill="#6ee7b7" font-size="13" font-family="sans-serif">✅ 新認識：壓力 = 生理事件，有激素、有器官反應</text><text x="300" y="160" text-anchor="middle" fill="#94a3b8" font-size="11" font-family="sans-serif">→ 理解機制，才能找到真正有效的介入點</text><rect x="60" y="185" width="480" height="35" rx="8" fill="#312e81"/><text x="300" y="207" text-anchor="middle" fill="#a5b4fc" font-size="12" font-family="sans-serif">🐱 魯魯：你不能「想」掉皮質醇，但你可以理解它、然後讓它慢下來</text></svg>`,
      },
      {
        id: 'slide-4', type: 'summary', title: '本堂重點',
        content: `📝 三件事，帶走就夠了：

① 壓力是生理反應，不只是心理狀態
理解這一點，才能停止用「想開點」來解決一個身體問題。

② 戰或逃反應是短期工具
它應對老虎非常有效，但應對現代慢性壓力會讓身體持續處於備戰狀態，造成系統性損傷。

③ 壓力啟動時，全身系統都在參與
心跳、呼吸、消化、免疫全都受影響，身體的「不舒服」不是你想像出來的。`,
        visual: `<svg viewBox="0 0 600 200" xmlns="http://www.w3.org/2000/svg"><rect width="600" height="200" fill="#0f172a" rx="12"/><text x="300" y="35" text-anchor="middle" fill="#e2e8f0" font-size="15" font-weight="bold" font-family="sans-serif">壓力的科學：三個核心認識</text><g transform="translate(50,55)"><rect x="0" y="0" width="500" height="38" rx="6" fill="#1e293b" stroke="#6366f1" stroke-width="1"/><text x="18" y="24" fill="#6366f1" font-size="16" font-family="sans-serif">①</text><text x="45" y="24" fill="#e2e8f0" font-size="13" font-family="sans-serif">壓力是生理事件，不只是情緒</text></g><g transform="translate(50,103)"><rect x="0" y="0" width="500" height="38" rx="6" fill="#1e293b" stroke="#6366f1" stroke-width="1"/><text x="18" y="24" fill="#6366f1" font-size="16" font-family="sans-serif">②</text><text x="45" y="24" fill="#e2e8f0" font-size="13" font-family="sans-serif">演化工具遇上慢性壓力，身體付出代價</text></g><g transform="translate(50,151)"><rect x="0" y="0" width="500" height="38" rx="6" fill="#1e293b" stroke="#6366f1" stroke-width="1"/><text x="18" y="24" fill="#6366f1" font-size="16" font-family="sans-serif">③</text><text x="45" y="24" fill="#e2e8f0" font-size="13" font-family="sans-serif">全身系統都受影響——不只是「累」</text></g></svg>`,
      },
    ],
    quizzes: [
      {
        id: 'q1',
        question: '現代人的壓力跟原始人遇到老虎的壓力，最大的差異是什麼？',
        options: ['現代壓力比較小，不需要那麼緊張', '現代壓力沒有明確的結束點，神經系統難以解除', '現代人的神經系統已經進化，不會有壓力反應', '老虎的壓力是心理的，現代壓力才是生理的'],
        answer: 1,
        explanation: '身體的壓力系統設計給「應付完就解除」的短暫威脅。但 email、工作、財務壓力很少有明確終點，身體因此長期停在備戰狀態——這才是慢性壓力傷身的核心原因。',
      },
      {
        id: 'q2',
        question: '你感覺焦慮、緊繃、睡不好，這些感受在壓力的生理過程中是什麼？',
        options: ['壓力的原因，是心態出了問題', '只是想像，沒有實際的生理基礎', '生理反應的結果，有激素和神經活動作為根源', '跟生理機制無關，純粹是性格問題'],
        answer: 2,
        explanation: '焦慮、緊繃、失眠是壓力的生理反應造成的結果，不是原因。皮質醇升高、交感神經活化、消化系統抑制——這些都是真實的生理事件，不是「想太多」。',
      },
    ],
    cta: { text: '繼續讀 Vol.02 完整版（共10堂）', url: `${ST_BASE}/${VOL_IDS['02']}`, seriesNote: '自律神經學系 7冊・從了解到改變' },
  },
  {
    id: 'autonomic-preview-lesson-3',
    vol: '03',
    title: '睡了八小時為什麼還是累？',
    subtitle: 'Vol.03 試讀・睡眠品質的真相',
    duration: 15,
    slides: [
      {
        id: 'slide-1', type: 'hook', title: '你是這樣的人嗎？',
        content: `阿明每天準時十一點躺下、早上七點起床。算起來足足八小時，但每天早上醒來的第一個念頭都是：「我還是好累。」

他試過早睡、睡前喝熱牛奶、把手機放到另一個房間，但就是沒用。

他不知道的是：問題從來不是睡了幾小時，而是他的身體在那八小時裡到底做了什麼。`,
        visual: `<svg viewBox="0 0 600 260" xmlns="http://www.w3.org/2000/svg"><rect width="600" height="260" fill="#0f172a" rx="12"/><text x="300" y="38" text-anchor="middle" fill="#e2e8f0" font-size="14" font-weight="bold" font-family="sans-serif">睡眠中，大腦其實非常忙碌</text><g transform="translate(50,55)"><rect x="0" y="0" width="230" height="50" rx="8" fill="#1e293b" stroke="#6366f1" stroke-width="1"/><text x="115" y="22" text-anchor="middle" fill="#c7d2fe" font-size="13" font-family="sans-serif">🧠 整理記憶</text><text x="115" y="40" text-anchor="middle" fill="#64748b" font-size="11" font-family="sans-serif">把短期記憶轉為長期儲存</text></g><g transform="translate(320,55)"><rect x="0" y="0" width="230" height="50" rx="8" fill="#1e293b" stroke="#8b5cf6" stroke-width="1"/><text x="115" y="22" text-anchor="middle" fill="#c4b5fd" font-size="13" font-family="sans-serif">🔧 修復神經迴路</text><text x="115" y="40" text-anchor="middle" fill="#64748b" font-size="11" font-family="sans-serif">清除受損神經元</text></g><g transform="translate(50,120)"><rect x="0" y="0" width="230" height="50" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="1"/><text x="115" y="22" text-anchor="middle" fill="#6ee7b7" font-size="13" font-family="sans-serif">🧹 清除代謝廢物</text><text x="115" y="40" text-anchor="middle" fill="#64748b" font-size="11" font-family="sans-serif">大腦的清潔系統啟動</text></g><g transform="translate(320,120)"><rect x="0" y="0" width="230" height="50" rx="8" fill="#1e293b" stroke="#f59e0b" stroke-width="1"/><text x="115" y="22" text-anchor="middle" fill="#fcd34d" font-size="13" font-family="sans-serif">⚖️ 調節荷爾蒙</text><text x="115" y="40" text-anchor="middle" fill="#64748b" font-size="11" font-family="sans-serif">生長激素、皮質醇重設</text></g><text x="300" y="205" text-anchor="middle" fill="#94a3b8" font-size="13" font-family="sans-serif">睡眠不是「關機」，是切換到「維護模式」</text></svg>`,
      },
      {
        id: 'slide-2', type: 'concept', title: '為什麼八小時睡完還是累？三個原因',
        content: `原因一：睡眠結構破碎
健康睡眠由幾個完整周期組成。如果睡眠被反覆打斷，深眠比例嚴重不足。你睡了八小時，但可能只得到一兩個完整修復周期。

原因二：自律神經沒有切換
從清醒進入睡眠，必須從交感神經切換到副交感神經。如果長期處於壓力狀態，身體還是在備戰模式，無法真正進入深度修復。

原因三：皮質醇節律失調
正常皮質醇在清晨達到高峰，夜間降到最低。但長期壓力者夜間皮質醇異常偏高，會直接壓制深眠的發生。`,
        visual: `<svg viewBox="0 0 600 260" xmlns="http://www.w3.org/2000/svg"><rect width="600" height="260" fill="#0f172a" rx="12"/><text x="300" y="35" text-anchor="middle" fill="#e2e8f0" font-size="14" font-weight="bold" font-family="sans-serif">睡了但沒修復——三種常見原因</text><g transform="translate(40,55)"><rect x="0" y="0" width="160" height="155" rx="8" fill="#1e293b" stroke="#ef4444" stroke-width="1.5"/><text x="80" y="28" text-anchor="middle" fill="#fca5a5" font-size="12" font-weight="bold" font-family="sans-serif">① 睡眠結構破碎</text><text x="80" y="80" text-anchor="middle" fill="#94a3b8" font-size="11" font-family="sans-serif">深眠周期被打斷</text><text x="80" y="100" text-anchor="middle" fill="#94a3b8" font-size="11" font-family="sans-serif">修復工作無法完成</text><text x="80" y="130" text-anchor="middle" fill="#f87171" font-size="11" font-family="sans-serif">→ 隔天疲憊</text></g><g transform="translate(220,55)"><rect x="0" y="0" width="160" height="155" rx="8" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/><text x="80" y="28" text-anchor="middle" fill="#fcd34d" font-size="12" font-weight="bold" font-family="sans-serif">② 自律神經未切換</text><text x="80" y="80" text-anchor="middle" fill="#94a3b8" font-size="11" font-family="sans-serif">交感神經持續亢奮</text><text x="80" y="100" text-anchor="middle" fill="#94a3b8" font-size="11" font-family="sans-serif">身體仍在備戰模式</text><text x="80" y="130" text-anchor="middle" fill="#fbbf24" font-size="11" font-family="sans-serif">→ 淺眠多夢</text></g><g transform="translate(400,55)"><rect x="0" y="0" width="160" height="155" rx="8" fill="#1e293b" stroke="#8b5cf6" stroke-width="1.5"/><text x="80" y="28" text-anchor="middle" fill="#c4b5fd" font-size="12" font-weight="bold" font-family="sans-serif">③ 皮質醇節律失調</text><text x="80" y="80" text-anchor="middle" fill="#94a3b8" font-size="11" font-family="sans-serif">夜間皮質醇偏高</text><text x="80" y="100" text-anchor="middle" fill="#94a3b8" font-size="11" font-family="sans-serif">直接壓制深眠發生</text><text x="80" y="130" text-anchor="middle" fill="#a78bfa" font-size="11" font-family="sans-serif">→ 睡不沉</text></g></svg>`,
      },
      {
        id: 'slide-3', type: 'deepdive', title: '不是不夠努力睡，是身體不知道怎麼進入修復',
        content: `如果你每天早上起來感覺沒睡飽，最重要的事不是繼續拉長睡眠時間，而是搞清楚你的睡眠結構出了什麼問題。

睡眠量 ≠ 睡眠品質

八小時的數字只是必要條件，不是充分條件。睡眠結構才是決定你醒來是否有精神的關鍵。

🐱 魯魯：睡了等於沒睡？聽起來很慘，但這不是你的錯——是你的神經系統需要重新學會「放鬆模式」。`,
        visual: `<svg viewBox="0 0 600 220" xmlns="http://www.w3.org/2000/svg"><rect width="600" height="220" fill="#0f172a" rx="12"/><text x="300" y="35" text-anchor="middle" fill="#e2e8f0" font-size="14" font-weight="bold" font-family="sans-serif">睡眠品質比較</text><rect x="40" y="55" width="230" height="110" rx="8" fill="#1e293b" stroke="#ef4444" stroke-width="1.5"/><text x="155" y="78" text-anchor="middle" fill="#fca5a5" font-size="13" font-family="sans-serif">😴 睡了8小時</text><text x="155" y="98" text-anchor="middle" fill="#94a3b8" font-size="11" font-family="sans-serif">但睡眠結構破碎</text><text x="155" y="118" text-anchor="middle" fill="#94a3b8" font-size="11" font-family="sans-serif">交感神經未切換</text><text x="155" y="145" text-anchor="middle" fill="#f87171" font-size="13" font-family="sans-serif">→ 醒來還是很累</text><rect x="330" y="55" width="230" height="110" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/><text x="445" y="78" text-anchor="middle" fill="#6ee7b7" font-size="13" font-family="sans-serif">😌 睡了6小時</text><text x="445" y="98" text-anchor="middle" fill="#94a3b8" font-size="11" font-family="sans-serif">但睡眠結構完整</text><text x="445" y="118" text-anchor="middle" fill="#94a3b8" font-size="11" font-family="sans-serif">深眠比例足夠</text><text x="445" y="145" text-anchor="middle" fill="#6ee7b7" font-size="13" font-family="sans-serif">→ 醒來精神較好</text></svg>`,
      },
      {
        id: 'slide-4', type: 'summary', title: '本堂重點',
        content: `📝 三件事，帶走就夠了：

① 睡眠量 ≠ 睡眠品質
八小時只是必要條件，睡眠結構才是決定你醒來是否有精神的關鍵。

② 睡眠結構破碎
深眠不足、周期被打斷，身體的修復工作就無法完成，隔天的疲憊感是真實信號，不是意志力問題。

③ 自律神經切換失敗
長期壓力讓交感神經難以下線，這是「睡了還是累」最常見但最被忽略的根本原因。`,
        visual: `<svg viewBox="0 0 600 190" xmlns="http://www.w3.org/2000/svg"><rect width="600" height="190" fill="#0f172a" rx="12"/><text x="300" y="32" text-anchor="middle" fill="#e2e8f0" font-size="15" font-weight="bold" font-family="sans-serif">睡眠的科學：三個核心認識</text><g transform="translate(50,50)"><rect x="0" y="0" width="500" height="36" rx="6" fill="#1e293b" stroke="#6366f1" stroke-width="1"/><text x="18" y="23" fill="#6366f1" font-size="16" font-family="sans-serif">①</text><text x="45" y="23" fill="#e2e8f0" font-size="13" font-family="sans-serif">睡眠量不等於睡眠品質——結構才是關鍵</text></g><g transform="translate(50,96)"><rect x="0" y="0" width="500" height="36" rx="6" fill="#1e293b" stroke="#6366f1" stroke-width="1"/><text x="18" y="23" fill="#6366f1" font-size="16" font-family="sans-serif">②</text><text x="45" y="23" fill="#e2e8f0" font-size="13" font-family="sans-serif">結構破碎→深眠不足→隔天疲憊</text></g><g transform="translate(50,142)"><rect x="0" y="0" width="500" height="36" rx="6" fill="#1e293b" stroke="#6366f1" stroke-width="1"/><text x="18" y="23" fill="#6366f1" font-size="16" font-family="sans-serif">③</text><text x="45" y="23" fill="#e2e8f0" font-size="13" font-family="sans-serif">自律神經未切換是「睡了還是累」的根本原因</text></g></svg>`,
      },
    ],
    quizzes: [
      {
        id: 'q1',
        question: '「睡了八小時還是很累」最可能的原因是什麼？',
        options: ['睡眠時間不夠，應該睡到九到十小時', '睡眠結構破碎或自律神經未切換，深眠不足', '身體天生就是容易累，跟睡眠無關', '白天活動量不夠，睡眠品質才會差'],
        answer: 1,
        explanation: '決定睡醒後是否有精神的關鍵是睡眠結構，而不只是時間長度。深眠不足、自律神經沒有從交感切換到副交感、或皮質醇節律失調，都可能讓你睡了八小時卻感覺沒睡。',
      },
      {
        id: 'q2',
        question: '長期壓力大的人睡覺時，為什麼常常夢多、淺眠、容易驚醒？',
        options: ['因為他們的大腦在睡覺時工作量特別大', '因為壓力讓交感神經難以切換，身體仍處於備戰模式', '因為壓力讓人對噪音特別敏感', '這只是個人習慣，跟壓力沒有直接關係'],
        answer: 1,
        explanation: '從清醒進入睡眠，需要從交感神經主導切換到副交感神經主導。長期壓力讓交感神經持續亢奮，即使人躺下了，身體還在備戰模式，所以容易淺眠、多夢、驚醒。',
      },
    ],
    cta: { text: '繼續讀 Vol.03 完整版（共10堂）', url: `${ST_BASE}/${VOL_IDS['03']}`, seriesNote: '自律神經學系 7冊・從了解到改變' },
  },
  {
    id: 'autonomic-preview-lesson-4',
    vol: '04',
    title: '症狀是信號，不是敵人',
    subtitle: 'Vol.04 試讀・解讀身體的語言',
    duration: 15,
    slides: [
      {
        id: 'slide-1', type: 'hook', title: '你有沒有這樣查過 Google？',
        content: `阿明每次身體不舒服都先查 Google。心跳快？搜尋「心臟病症狀」。頭痛？搜尋「腦瘤早期跡象」。

他的搜尋紀錄像一本病名詞典，但每次去醫院做完檢查，醫生都說「沒問題」。

「沒問題」這三個字讓他更焦慮，因為他明明感覺到什麼，但被告知那個什麼不存在。

你有沒有過這樣的感覺——身體有症狀，檢查結果一切正常，那種「正常」反而讓人更不安？`,
        visual: `<svg viewBox="0 0 600 260" xmlns="http://www.w3.org/2000/svg"><rect width="600" height="260" fill="#0f172a" rx="12"/><text x="300" y="38" text-anchor="middle" fill="#e2e8f0" font-size="14" font-weight="bold" font-family="sans-serif">自律神經失調常見症狀地圖</text><ellipse cx="300" cy="95" rx="30" ry="35" fill="none" stroke="#475569" stroke-width="1.5"/><line x1="300" y1="130" x2="300" y2="210" stroke="#475569" stroke-width="1.5"/><line x1="300" y1="150" x2="250" y2="185" stroke="#475569" stroke-width="1.5"/><line x1="300" y1="150" x2="350" y2="185" stroke="#475569" stroke-width="1.5"/><line x1="300" y1="210" x2="275" y2="250" stroke="#475569" stroke-width="1.5"/><line x1="300" y1="210" x2="325" y2="250" stroke="#475569" stroke-width="1.5"/><text x="80" y="85" fill="#fca5a5" font-size="12" font-family="sans-serif">頭痛 / 頭暈</text><line x1="155" y1="82" x2="272" y2="82" stroke="#ef4444" stroke-width="1" stroke-dasharray="3,3"/><text x="370" y="85" fill="#fcd34d" font-size="12" font-family="sans-serif">心悸 / 胸悶</text><text x="60" y="155" fill="#6ee7b7" font-size="12" font-family="sans-serif">手抖 / 肌肉緊</text><line x1="165" y1="152" x2="252" y2="155" stroke="#10b981" stroke-width="1" stroke-dasharray="3,3"/><text x="370" y="165" fill="#c4b5fd" font-size="12" font-family="sans-serif">腸躁 / 消化差</text><text x="90" y="215" fill="#67e8f9" font-size="12" font-family="sans-serif">慢性疲勞</text></svg>`,
      },
      {
        id: 'slide-2', type: 'concept', title: '症狀的本質：身體的語言',
        content: `你家裡有煙霧偵測器，它偵測到煙就會嗚嗚大叫。這個聲音很煩，但它的工作不是「製造噪音」，它的工作是告訴你「有什麼東西在燒」。

身體的症狀就是這個道理：

心悸不是心臟壞掉，它是心臟在說「現在交感神經活化了，我在配合它加速」。頭痛不一定是腦部病變，它可能是血管緊張、肌肉緊繃。慢性疲勞不是懶，是系統過載之後的耗盡狀態。

症狀是信號，不是疾病本身。把症狀當敵人，就像把煙霧偵測器的聲音當成火災——你把電池拔掉，火還在燒。`,
        visual: `<svg viewBox="0 0 600 220" xmlns="http://www.w3.org/2000/svg"><rect width="600" height="220" fill="#0f172a" rx="12"/><text x="300" y="35" text-anchor="middle" fill="#e2e8f0" font-size="14" font-weight="bold" font-family="sans-serif">症狀理解流程</text><g transform="translate(30,55)"><rect x="0" y="0" width="90" height="50" rx="8" fill="#1e293b" stroke="#ef4444" stroke-width="1.5"/><text x="45" y="30" text-anchor="middle" fill="#fca5a5" font-size="12" font-family="sans-serif">症狀出現</text></g><text x="135" y="85" fill="#475569" font-size="16" font-family="sans-serif">→</text><g transform="translate(150,55)"><rect x="0" y="0" width="90" height="50" rx="8" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/><text x="45" y="30" text-anchor="middle" fill="#fcd34d" font-size="12" font-family="sans-serif">評估就醫</text></g><text x="255" y="85" fill="#475569" font-size="16" font-family="sans-serif">→</text><g transform="translate(270,55)"><rect x="0" y="0" width="90" height="50" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/><text x="45" y="30" text-anchor="middle" fill="#6ee7b7" font-size="12" font-family="sans-serif">排除結構</text></g><text x="375" y="85" fill="#475569" font-size="16" font-family="sans-serif">→</text><g transform="translate(390,55)"><rect x="0" y="0" width="90" height="50" rx="8" fill="#1e293b" stroke="#6366f1" stroke-width="1.5"/><text x="45" y="30" text-anchor="middle" fill="#c7d2fe" font-size="12" font-family="sans-serif">理解根源</text></g><text x="495" y="85" fill="#475569" font-size="16" font-family="sans-serif">→</text><g transform="translate(508,55)"><rect x="0" y="0" width="62" height="50" rx="8" fill="#1e293b" stroke="#8b5cf6" stroke-width="1.5"/><text x="31" y="22" text-anchor="middle" fill="#c4b5fd" font-size="12" font-family="sans-serif">建立</text><text x="31" y="40" text-anchor="middle" fill="#c4b5fd" font-size="12" font-family="sans-serif">策略</text></g><rect x="30" y="135" width="540" height="50" rx="8" fill="#312e81"/><text x="300" y="157" text-anchor="middle" fill="#a5b4fc" font-size="12" font-family="sans-serif">🐱 魯魯：醫生說「你沒問題」，不代表你真的沒問題。</text><text x="300" y="175" text-anchor="middle" fill="#818cf8" font-size="11" font-family="sans-serif">代表的是「在我能看到的範圍裡，沒有我能找到的問題」。</text></svg>`,
      },
      {
        id: 'slide-3', type: 'deepdive', title: '為什麼要學會解讀這些症狀',
        content: `自律神經失調的症狀是功能性的——身體沒有壞掉，但運作方式出了問題，就像電腦硬碟沒壞，但系統卡頓、程式一直崩潰。

傳統的血液檢查、X光、心電圖，往往看不到這個層次的問題。

這不是醫生失職，也不是你在誇大。這是因為自律神經失調影響的是「調節機制」，而不是「器官本身」。

Vol.04 要做的事是：幫你建立一套「解讀身體語言」的基礎框架，讓你在下次身體發出訊號時，不是第一反應就是驚慌，而是能夠帶著理解去面對。`,
        visual: `<svg viewBox="0 0 600 220" xmlns="http://www.w3.org/2000/svg"><rect width="600" height="220" fill="#0f172a" rx="12"/><text x="300" y="35" text-anchor="middle" fill="#e2e8f0" font-size="14" font-weight="bold" font-family="sans-serif">兩種問題，兩種理解方式</text><rect x="40" y="55" width="230" height="130" rx="8" fill="#1e293b" stroke="#ef4444" stroke-width="1.5"/><text x="155" y="80" text-anchor="middle" fill="#fca5a5" font-size="13" font-weight="bold" font-family="sans-serif">結構性問題</text><text x="155" y="102" text-anchor="middle" fill="#94a3b8" font-size="12" font-family="sans-serif">器官損傷 / 腫瘤</text><text x="155" y="122" text-anchor="middle" fill="#6ee7b7" font-size="12" font-family="sans-serif">✅ 血液/影像可以看到</text><rect x="330" y="55" width="230" height="130" rx="8" fill="#1e293b" stroke="#6366f1" stroke-width="1.5"/><text x="445" y="80" text-anchor="middle" fill="#c7d2fe" font-size="13" font-weight="bold" font-family="sans-serif">功能性問題</text><text x="445" y="102" text-anchor="middle" fill="#94a3b8" font-size="12" font-family="sans-serif">調節機制失衡</text><text x="445" y="122" text-anchor="middle" fill="#f87171" font-size="12" font-family="sans-serif">⚠️ 報告通常正常</text><text x="445" y="158" text-anchor="middle" fill="#94a3b8" font-size="11" font-family="sans-serif">自律神經失調屬於這類</text></svg>`,
      },
      {
        id: 'slide-4', type: 'summary', title: '本堂重點',
        content: `📝 三件事，帶走就夠了：

① 症狀是信號
身體出現症狀不代表器官壞了，而是神經系統在告訴你「現在有什麼事正在發生」，理解訊號比對抗訊號更重要。

② 功能性問題與結構性問題不同
傳統檢查擅長找結構性問題，但自律神經失調是功能性的，這就是為什麼你的報告正常，但感覺不正常。

③ 不恐慌是學習的第一步
把症狀當敵人會讓焦慮更嚴重，而焦慮本身又會製造更多症狀；理解之後，才能打破這個循環。`,
        visual: `<svg viewBox="0 0 600 190" xmlns="http://www.w3.org/2000/svg"><rect width="600" height="190" fill="#0f172a" rx="12"/><text x="300" y="32" text-anchor="middle" fill="#e2e8f0" font-size="15" font-weight="bold" font-family="sans-serif">身體在說什麼：三個核心認識</text><g transform="translate(50,50)"><rect x="0" y="0" width="500" height="36" rx="6" fill="#1e293b" stroke="#6366f1" stroke-width="1"/><text x="18" y="23" fill="#6366f1" font-size="16" font-family="sans-serif">①</text><text x="45" y="23" fill="#e2e8f0" font-size="13" font-family="sans-serif">症狀是信號——理解比對抗更重要</text></g><g transform="translate(50,96)"><rect x="0" y="0" width="500" height="36" rx="6" fill="#1e293b" stroke="#6366f1" stroke-width="1"/><text x="18" y="23" fill="#6366f1" font-size="16" font-family="sans-serif">②</text><text x="45" y="23" fill="#e2e8f0" font-size="13" font-family="sans-serif">功能性≠結構性——報告正常≠身體沒問題</text></g><g transform="translate(50,142)"><rect x="0" y="0" width="500" height="36" rx="6" fill="#1e293b" stroke="#6366f1" stroke-width="1"/><text x="18" y="23" fill="#6366f1" font-size="16" font-family="sans-serif">③</text><text x="45" y="23" fill="#e2e8f0" font-size="13" font-family="sans-serif">不恐慌是學習第一步——焦慮會製造更多症狀</text></g></svg>`,
      },
    ],
    quizzes: [
      {
        id: 'q1',
        question: '身體出現心悸、頭痛等症狀，但醫院檢查一切正常，這最可能代表什麼？',
        options: ['你在裝病，或是過度敏感', '醫生漏看了，應該換一家醫院再查', '可能是功能性問題，調節機制出了狀況，而非器官損傷', '這些症狀會自己好，不需要理會'],
        answer: 2,
        explanation: '自律神經失調屬於功能性問題，影響的是神經系統的調節機制，而不是器官本身的結構。傳統的血液和影像檢查設計來找結構性問題，所以報告正常是正常的——但這不代表你的症狀是假的。',
      },
      {
        id: 'q2',
        question: '把身體症狀當成「敵人」來對抗（例如靠止痛藥壓制頭痛），主要的問題是什麼？',
        options: ['止痛藥傷身體，長期服用有副作用', '壓制症狀不等於解決根源，問題仍然持續', '止痛藥效果不夠強，根本沒用', '症狀會習慣止痛藥，之後需要更大劑量'],
        answer: 1,
        explanation: '症狀是身體發出的信號，就像煙霧偵測器的聲音。把電池拔掉（壓制症狀）並不能滅火（解決根源）。理解症狀的來源、找到真正的調節問題，才能真正改善。',
      },
    ],
    cta: { text: '繼續讀 Vol.04 完整版（共10堂）', url: `${ST_BASE}/${VOL_IDS['04']}`, seriesNote: '自律神經學系 7冊・從了解到改變' },
  },
  {
    id: 'autonomic-preview-lesson-5',
    vol: '05',
    title: '失調不處理，會怎樣？',
    subtitle: 'Vol.05 試讀・長期失調的身體帳單',
    duration: 15,
    slides: [
      {
        id: 'slide-1', type: 'hook', title: '每年健檢多一個紅字……',
        content: `阿明四十二歲，業務主管，連續五年沒有真正放過假。他的身體也配合地沒有崩潰，只是每年健檢報告上多一個紅字：先是血壓略高，後來是血脂，再後來是空腹血糖偏高，最後是「建議追蹤」的心電圖異常。

每一個單獨拿出來，醫生都說「還好，注意一下」。

但沒有人告訴阿明：這些紅字之間有關係，而那條線索叫做「長期自律神經失調」。`,
        visual: `<svg viewBox="0 0 600 260" xmlns="http://www.w3.org/2000/svg"><rect width="600" height="260" fill="#0f172a" rx="12"/><text x="300" y="35" text-anchor="middle" fill="#e2e8f0" font-size="14" font-weight="bold" font-family="sans-serif">失調演進時間軸</text><line x1="50" y1="130" x2="550" y2="130" stroke="#334155" stroke-width="2"/><circle cx="130" cy="130" r="8" fill="#10b981"/><text x="130" y="110" text-anchor="middle" fill="#6ee7b7" font-size="11" font-family="sans-serif">初期失調</text><text x="130" y="155" text-anchor="middle" fill="#94a3b8" font-size="10" font-family="sans-serif">心悸/失眠/腸躁</text><circle cx="300" cy="130" r="8" fill="#f59e0b"/><text x="300" y="110" text-anchor="middle" fill="#fcd34d" font-size="11" font-family="sans-serif">中期積累</text><text x="300" y="155" text-anchor="middle" fill="#94a3b8" font-size="10" font-family="sans-serif">免疫下降/代謝異常</text><circle cx="470" cy="130" r="8" fill="#ef4444"/><text x="470" y="110" text-anchor="middle" fill="#fca5a5" font-size="11" font-family="sans-serif">長期代價</text><text x="470" y="155" text-anchor="middle" fill="#94a3b8" font-size="10" font-family="sans-serif">器官損傷/慢性病</text><text x="215" y="127" fill="#475569" font-size="16" font-family="sans-serif">→</text><text x="385" y="127" fill="#475569" font-size="16" font-family="sans-serif">→</text><rect x="50" y="180" width="500" height="40" rx="8" fill="#1e293b"/><text x="300" y="198" text-anchor="middle" fill="#fcd34d" font-size="12" font-family="sans-serif">⚠️ 這個過程是安靜的——你感覺「還好」的時候，帳單已經在累積</text></svg>`,
      },
      {
        id: 'slide-2', type: 'concept', title: '失調是累積的，不是突然的',
        content: `自律神經系統像是身體的電力公司，負責分配能量、調節器官。

短暫失衡沒關係——就像跑百米後心跳加速，跑完就恢復。

問題在於「長期」——當你的神經系統持續處在備戰狀態，那個「恢復」的動作越來越短、越來越淺，最後幾乎消失。

身體不是電腦，沒辦法一直跑高負載而不付出代價。每個持續激活的系統都在消耗資源：荷爾蒙、免疫細胞、血管彈性、神經元連結。這些消耗在你感覺「還好」的時候就已經在進行了。

🐱 魯魯：身體就像信用卡帳單，你以為沒感覺就是沒欠款，但利息一直在滾。`,
        visual: `<svg viewBox="0 0 600 240" xmlns="http://www.w3.org/2000/svg"><rect width="600" height="240" fill="#0f172a" rx="12"/><text x="300" y="35" text-anchor="middle" fill="#e2e8f0" font-size="14" font-weight="bold" font-family="sans-serif">恢復能力的衰退</text><line x1="80" y1="50" x2="80" y2="190" stroke="#334155" stroke-width="1.5"/><line x1="80" y1="190" x2="560" y2="190" stroke="#334155" stroke-width="1.5"/><path d="M 100,80 Q 180,80 200,130 Q 220,180 300,80 Q 380,80 400,130 Q 420,180 500,80" fill="none" stroke="#10b981" stroke-width="2" stroke-dasharray="5,3"/><text x="420" y="68" fill="#6ee7b7" font-size="11" font-family="sans-serif">正常恢復</text><path d="M 100,100 Q 180,120 250,140 Q 320,160 400,170 Q 460,175 530,178" fill="none" stroke="#ef4444" stroke-width="2"/><text x="430" y="168" fill="#fca5a5" font-size="11" font-family="sans-serif">長期失調</text></svg>`,
      },
      {
        id: 'slide-3', type: 'deepdive', title: '為什麼身體不早點警告你？',
        content: `這是人體設計的一個悲哀：很多損傷在初期沒有明顯症狀。

血管壁在增厚，海馬迴在縮小，免疫系統在失調——這些過程是安靜的。等到症狀出現，往往代表已經累積了好幾年。

這不是要嚇你。這是要讓你理解：

現在你感覺到的那些小症狀——睡不好、容易緊張、消化不順——不是「沒事」。它們是身體在說：「我需要幫忙。」

而「等以後再說」這個選項，其實比你以為的代價高很多。`,
        visual: `<svg viewBox="0 0 600 230" xmlns="http://www.w3.org/2000/svg"><rect width="600" height="230" fill="#0f172a" rx="12"/><text x="300" y="35" text-anchor="middle" fill="#e2e8f0" font-size="14" font-weight="bold" font-family="sans-serif">長期失調影響的系統</text><g transform="translate(40,55)"><rect x="0" y="0" width="115" height="60" rx="8" fill="#1e293b" stroke="#ef4444" stroke-width="1"/><text x="57" y="24" text-anchor="middle" fill="#fca5a5" font-size="12" font-family="sans-serif">❤️ 心血管</text><text x="57" y="44" text-anchor="middle" fill="#94a3b8" font-size="10" font-family="sans-serif">血壓↑ 動脈硬化</text></g><g transform="translate(170,55)"><rect x="0" y="0" width="115" height="60" rx="8" fill="#1e293b" stroke="#f59e0b" stroke-width="1"/><text x="57" y="24" text-anchor="middle" fill="#fcd34d" font-size="12" font-family="sans-serif">🛡️ 免疫系統</text><text x="57" y="44" text-anchor="middle" fill="#94a3b8" font-size="10" font-family="sans-serif">防禦力↓ 易生病</text></g><g transform="translate(300,55)"><rect x="0" y="0" width="115" height="60" rx="8" fill="#1e293b" stroke="#6366f1" stroke-width="1"/><text x="57" y="24" text-anchor="middle" fill="#c7d2fe" font-size="12" font-family="sans-serif">🧠 大腦</text><text x="57" y="44" text-anchor="middle" fill="#94a3b8" font-size="10" font-family="sans-serif">海馬迴↓ 記憶差</text></g><g transform="translate(430,55)"><rect x="0" y="0" width="115" height="60" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="1"/><text x="57" y="24" text-anchor="middle" fill="#6ee7b7" font-size="12" font-family="sans-serif">⚖️ 代謝</text><text x="57" y="44" text-anchor="middle" fill="#94a3b8" font-size="10" font-family="sans-serif">血糖↑ 體重↑</text></g><rect x="40" y="140" width="520" height="50" rx="8" fill="#1e293b" stroke="#6366f1" stroke-width="1"/><text x="300" y="162" text-anchor="middle" fill="#e2e8f0" font-size="13" font-family="sans-serif">好消息：損傷有邏輯，也有可能逆轉</text><text x="300" y="180" text-anchor="middle" fill="#94a3b8" font-size="11" font-family="sans-serif">了解機制不是為了焦慮，而是為了找到真正有效的介入點</text></svg>`,
      },
      {
        id: 'slide-4', type: 'summary', title: '本堂重點',
        content: `📝 三件事，帶走就夠了：

① 失調是累積的過程
身體不是突然崩潰，而是長期在安靜地付出代價，「等以後再說」不是安全的選擇。

② 早期症狀是真實的信號
心悸、失眠、腸躁不是「壓力大的副產品」，而是神經系統在發出警告，值得被認真對待。

③ 損傷有邏輯，也有可能逆轉
了解機制不是為了焦慮，而是為了找到真正有效的介入點。`,
        visual: `<svg viewBox="0 0 600 190" xmlns="http://www.w3.org/2000/svg"><rect width="600" height="190" fill="#0f172a" rx="12"/><text x="300" y="32" text-anchor="middle" fill="#e2e8f0" font-size="15" font-weight="bold" font-family="sans-serif">長期失調的慢性病代價：三個核心</text><g transform="translate(50,50)"><rect x="0" y="0" width="500" height="36" rx="6" fill="#1e293b" stroke="#6366f1" stroke-width="1"/><text x="18" y="23" fill="#6366f1" font-size="16" font-family="sans-serif">①</text><text x="45" y="23" fill="#e2e8f0" font-size="13" font-family="sans-serif">失調是累積過程——「等以後」有代價</text></g><g transform="translate(50,96)"><rect x="0" y="0" width="500" height="36" rx="6" fill="#1e293b" stroke="#6366f1" stroke-width="1"/><text x="18" y="23" fill="#6366f1" font-size="16" font-family="sans-serif">②</text><text x="45" y="23" fill="#e2e8f0" font-size="13" font-family="sans-serif">早期小症狀是真實警告，不是「沒事」</text></g><g transform="translate(50,142)"><rect x="0" y="0" width="500" height="36" rx="6" fill="#1e293b" stroke="#6366f1" stroke-width="1"/><text x="18" y="23" fill="#6366f1" font-size="16" font-family="sans-serif">③</text><text x="45" y="23" fill="#e2e8f0" font-size="13" font-family="sans-serif">損傷有邏輯可介入——這不是命，是生理學</text></g></svg>`,
      },
    ],
    quizzes: [
      {
        id: 'q1',
        question: '阿明連續幾年健檢都有新的紅字，但每個醫生都說「還好」。這最可能說明什麼？',
        options: ['這些指標之間沒有關係，只是巧合', '阿明的遺傳基因不好，這是命', '這些紅字可能都跟長期自律神經失調有關，是系統性的累積', '醫生的標準太嚴格，其實都在正常範圍'],
        answer: 2,
        explanation: '長期自律神經失調會系統性地影響心血管、代謝、免疫等多個系統。單看每個指標都「還好」，但把它們放在一起，可以看到長期備戰狀態對全身造成的慢性損傷。',
      },
      {
        id: 'q2',
        question: '「很多損傷在初期沒有明顯症狀」這件事，對我們的行動最重要的啟示是什麼？',
        options: ['既然感覺不到，就不需要擔心', '等症狀嚴重了再處理也不遲', '現在感覺到的小症狀值得認真對待，不能一直等「以後再說」', '定期做更多精密檢查，就能早期發現所有問題'],
        answer: 2,
        explanation: '很多損傷在初期是安靜進行的，等到症狀出現時往往已累積多年。現在的睡不好、容易緊張、消化問題，是身體在說「我需要幫忙」——這些信號值得認真對待。',
      },
    ],
    cta: { text: '繼續讀 Vol.05 完整版（共10堂）', url: `${ST_BASE}/${VOL_IDS['05']}`, seriesNote: '自律神經學系 7冊・從了解到改變' },
  },
  {
    id: 'autonomic-preview-lesson-6',
    vol: '06',
    title: '壓力不只來自大事',
    subtitle: 'Vol.06 試讀・微壓力如何耗損你的神經系統',
    duration: 15,
    slides: [
      {
        id: 'slide-1', type: 'hook', title: '你有沒有這樣的一天？',
        content: `小玲每天的生活看起來很普通。早上趕公車差一分鐘沒搭上，到公司發現信箱裡躺著十幾封「等等要回」的信，午休被同事拉去聊她不想聊的話題，下班前主管又丟來一句「這個明天早上要」。

沒有一件事大到值得跟人訴苦，可是她回家後常常覺得整個人是空的，連坐下來都覺得累。

她去做了健康檢查，報告一切正常。醫生說「妳可能太累了，多休息」。

小玲心想：我也不知道自己在累什麼，明明沒發生什麼大事。`,
        visual: `<svg viewBox="0 0 600 260" xmlns="http://www.w3.org/2000/svg"><rect width="600" height="260" fill="#0f172a" rx="12"/><text x="300" y="35" text-anchor="middle" fill="#e2e8f0" font-size="14" font-weight="bold" font-family="sans-serif">一天當中的微壓力時間軸</text><line x1="50" y1="140" x2="550" y2="140" stroke="#334155" stroke-width="2"/><text x="50" y="160" fill="#64748b" font-size="10" font-family="sans-serif">7:00</text><text x="155" y="160" fill="#64748b" font-size="10" font-family="sans-serif">9:00</text><text x="255" y="160" fill="#64748b" font-size="10" font-family="sans-serif">12:00</text><text x="355" y="160" fill="#64748b" font-size="10" font-family="sans-serif">15:00</text><text x="455" y="160" fill="#64748b" font-size="10" font-family="sans-serif">18:00</text><line x1="80" y1="140" x2="80" y2="95" stroke="#f59e0b" stroke-width="2"/><circle cx="80" cy="92" r="4" fill="#f59e0b"/><text x="80" y="82" text-anchor="middle" fill="#fcd34d" font-size="9" font-family="sans-serif">趕公車</text><line x1="140" y1="140" x2="140" y2="100" stroke="#ef4444" stroke-width="2"/><circle cx="140" cy="97" r="4" fill="#ef4444"/><text x="140" y="87" text-anchor="middle" fill="#fca5a5" font-size="9" font-family="sans-serif">信箱爆炸</text><line x1="210" y1="140" x2="210" y2="108" stroke="#f59e0b" stroke-width="2"/><circle cx="210" cy="105" r="4" fill="#f59e0b"/><text x="210" y="95" text-anchor="middle" fill="#fcd34d" font-size="9" font-family="sans-serif">被打斷</text><line x1="280" y1="140" x2="280" y2="95" stroke="#8b5cf6" stroke-width="2"/><circle cx="280" cy="92" r="4" fill="#8b5cf6"/><text x="280" y="82" text-anchor="middle" fill="#c4b5fd" font-size="9" font-family="sans-serif">尷尬對話</text><line x1="350" y1="140" x2="350" y2="105" stroke="#ef4444" stroke-width="2"/><circle cx="350" cy="102" r="4" fill="#ef4444"/><text x="350" y="92" text-anchor="middle" fill="#fca5a5" font-size="9" font-family="sans-serif">急件插入</text><line x1="420" y1="140" x2="420" y2="98" stroke="#f59e0b" stroke-width="2"/><circle cx="420" cy="95" r="4" fill="#f59e0b"/><text x="420" y="85" text-anchor="middle" fill="#fcd34d" font-size="9" font-family="sans-serif">塞車</text><line x1="490" y1="140" x2="490" y2="102" stroke="#8b5cf6" stroke-width="2"/><circle cx="490" cy="99" r="4" fill="#8b5cf6"/><text x="490" y="89" text-anchor="middle" fill="#c4b5fd" font-size="9" font-family="sans-serif">群組訊息</text><text x="300" y="200" text-anchor="middle" fill="#94a3b8" font-size="12" font-family="sans-serif">每次都是「小事」，但神經系統一整天沒有真正放鬆過</text></svg>`,
      },
      {
        id: 'slide-2', type: 'concept', title: '「微壓力」是什麼？',
        content: `自律神經系統不會分辨「這件事很小」還是「這件事很大」，它只認得一件事：身體現在是不是處在「需要應付」的狀態。

一封需要小心回覆的信、一段尷尬的對話、一次被打斷的專注——這些單獨看都不算什麼，但每一個都會讓交感神經輕輕踩一下油門。

問題是，這種油門一天會被踩上幾十次，而你的身體幾乎沒有機會把油門放掉。

🐱 魯魯：你可以把神經系統想成一杯水，大壓力是整桶水倒下去，小壓力是水龍頭沒關緊一直滴。滴久了，水一樣會滿出來，而且你常常不知道是哪一滴讓它滿出來的。`,
        visual: `<svg viewBox="0 0 600 240" xmlns="http://www.w3.org/2000/svg"><rect width="600" height="240" fill="#0f172a" rx="12"/><text x="300" y="35" text-anchor="middle" fill="#e2e8f0" font-size="14" font-weight="bold" font-family="sans-serif">急性壓力 vs 慢性微壓力</text><rect x="40" y="55" width="230" height="130" rx="8" fill="#1e293b" stroke="#ef4444" stroke-width="1.5"/><text x="155" y="80" text-anchor="middle" fill="#fca5a5" font-size="13" font-weight="bold" font-family="sans-serif">急性壓力</text><text x="155" y="103" text-anchor="middle" fill="#94a3b8" font-size="11" font-family="sans-serif">強度：高　頻率：少</text><text x="155" y="128" text-anchor="middle" fill="#6ee7b7" font-size="11" font-family="sans-serif">✅ 結束後身體會恢復</text><text x="155" y="170" text-anchor="middle" fill="#64748b" font-size="10" font-family="sans-serif">例：重大事故、考試</text><rect x="330" y="55" width="230" height="130" rx="8" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/><text x="445" y="80" text-anchor="middle" fill="#fcd34d" font-size="13" font-weight="bold" font-family="sans-serif">慢性微壓力</text><text x="445" y="103" text-anchor="middle" fill="#94a3b8" font-size="11" font-family="sans-serif">強度：低　頻率：高</text><text x="445" y="128" text-anchor="middle" fill="#f87171" font-size="11" font-family="sans-serif">⚠️ 神經系統難以解除</text><text x="445" y="170" text-anchor="middle" fill="#64748b" font-size="10" font-family="sans-serif">例：信箱、被打斷、催稿</text><text x="300" y="215" text-anchor="middle" fill="#94a3b8" font-size="12" font-family="sans-serif">觸發次數比強度更能預測長期疲憊感</text></svg>`,
      },
      {
        id: 'slide-3', type: 'deepdive', title: '為什麼累積比強度更傷神經',
        content: `身體的壓力反應系統設計給「應付完就解除」的情境——躲開一隻野獸，跑完之後身體會自己降下來。

但現代生活的微壓力有一個特性：它幾乎不會給你一個明確的「結束點」。

回完這封信，下一封信已經在等。應付完這段對話，下一個通知又跳出來。神經系統一直停在「準備應付」的狀態，沒有機會真正放鬆下來。

研究指出：一天當中壓力反應被觸發的次數，比單次反應的強度，更能預測一個人長期的疲憊感與健康風險。

重點不是你遇到多大的事，而是你的神經系統有沒有機會「真正下班」。`,
        visual: `<svg viewBox="0 0 600 230" xmlns="http://www.w3.org/2000/svg"><rect width="600" height="230" fill="#0f172a" rx="12"/><text x="300" y="32" text-anchor="middle" fill="#e2e8f0" font-size="14" font-weight="bold" font-family="sans-serif">壓力後的恢復曲線比較</text><line x1="60" y1="40" x2="60" y2="190" stroke="#334155" stroke-width="1.5"/><line x1="60" y1="190" x2="560" y2="190" stroke="#334155" stroke-width="1.5"/><path d="M 80,180 L 120,80 Q 180,80 220,180 L 560,180" fill="none" stroke="#10b981" stroke-width="2" stroke-dasharray="6,3"/><text x="240" y="168" fill="#6ee7b7" font-size="11" font-family="sans-serif">急性壓力：回到基線 ✅</text><path d="M 80,180 L 110,130 Q 130,125 160,135 L 180,100 Q 200,95 230,110 L 250,80 Q 270,75 300,90 L 320,65 Q 340,60 370,75 L 390,55 Q 420,50 450,62 L 480,45 Q 510,42 540,50" fill="none" stroke="#ef4444" stroke-width="2"/><text x="350" y="38" fill="#fca5a5" font-size="11" font-family="sans-serif">微壓力疊加→基線墊高 ⚠️</text></svg>`,
      },
      {
        id: 'slide-4', type: 'summary', title: '本堂重點',
        content: `📝 三件事，帶走就夠了：

① 微壓力累積
單次強度不高的事件，重複出現會疊加成持續的神經負荷，這是多數慢性疲憊的真正起點。

② 沒有解除點是關鍵
現代生活的壓力源很少給身體一個明確的「結束訊號」，神經系統因此很難真正放鬆。

③ 壓力來源可以被拆解
疲憊不是一個模糊的整體感覺，把來源拆開來看，才知道哪裡可以調整。`,
        visual: `<svg viewBox="0 0 600 190" xmlns="http://www.w3.org/2000/svg"><rect width="600" height="190" fill="#0f172a" rx="12"/><text x="300" y="32" text-anchor="middle" fill="#e2e8f0" font-size="15" font-weight="bold" font-family="sans-serif">什麼在製造你的壓力：三個核心</text><g transform="translate(50,50)"><rect x="0" y="0" width="500" height="36" rx="6" fill="#1e293b" stroke="#6366f1" stroke-width="1"/><text x="18" y="23" fill="#6366f1" font-size="16" font-family="sans-serif">①</text><text x="45" y="23" fill="#e2e8f0" font-size="13" font-family="sans-serif">微壓力累積比大壓力更難恢復</text></g><g transform="translate(50,96)"><rect x="0" y="0" width="500" height="36" rx="6" fill="#1e293b" stroke="#6366f1" stroke-width="1"/><text x="18" y="23" fill="#6366f1" font-size="16" font-family="sans-serif">②</text><text x="45" y="23" fill="#e2e8f0" font-size="13" font-family="sans-serif">沒有結束點——神經系統無法真正下班</text></g><g transform="translate(50,142)"><rect x="0" y="0" width="500" height="36" rx="6" fill="#1e293b" stroke="#6366f1" stroke-width="1"/><text x="18" y="23" fill="#6366f1" font-size="16" font-family="sans-serif">③</text><text x="45" y="23" fill="#e2e8f0" font-size="13" font-family="sans-serif">疲憊有來源可以拆解，不是沒辦法改變</text></g></svg>`,
      },
    ],
    quizzes: [
      {
        id: 'q1',
        question: '為什麼「什麼大事都沒發生，但還是很累」這種感覺是真實的？',
        options: ['這只是心理暗示，自我說服一下就好', '因為自律神經無法區分大事小事，微壓力反覆觸發也會耗損神經系統', '這是體力不好的問題，應該多運動', '因為工作效率不夠高，才會覺得累'],
        answer: 1,
        explanation: '自律神經系統不分辨事情的「大小」，只認得「需不需要應付」。一天當中幾十次小壓力事件，每次都讓交感神經輕輕踩油門，加上沒有明確的結束點，神經系統就一直停在備戰狀態——這才是「什麼都沒做但好累」的真正原因。',
      },
      {
        id: 'q2',
        question: '研究發現，哪個因素更能預測長期疲憊感與健康風險？',
        options: ['單次壓力事件的強度（有沒有遇到非常大的事）', '一天中壓力反應被觸發的次數（有沒有機會真正放鬆）', '每天工作的總時數', '睡眠時間的長短'],
        answer: 1,
        explanation: '研究指出，一天當中壓力反應被觸發的次數，比單次強度更能預測長期疲憊感與健康風險。重點不是你有沒有遇到大事，而是你的神經系統有沒有機會「真正下班」。',
      },
    ],
    cta: { text: '繼續讀 Vol.06 完整版（共10堂）', url: `${ST_BASE}/${VOL_IDS['06']}`, seriesNote: '自律神經學系 7冊・從了解到改變' },
  },
  {
    id: 'autonomic-preview-lesson-7',
    vol: '07',
    title: '人是最複雜的壓力源',
    subtitle: 'Vol.07 試讀・人際壓力的神經科學',
    duration: 15,
    slides: [
      {
        id: 'slide-1', type: 'hook', title: '工作輕鬆了，但還是很累？',
        content: `小玲最近換了一份輕鬆很多的工作，下班早、沒加班、薪水也還行。

按道理來說，她應該變得比較放鬆。

但她發現，一想到隔天要去公司，她的胸口就會開始悶。

不是因為工作量，是因為她的主管。那個人說話方式讓她很不舒服，但她說不清楚哪裡不對——又沒有罵她，就是讓她覺得，很累。

這種「說不清楚的累」，其實有非常清楚的神經科學解釋。`,
        visual: `<svg viewBox="0 0 600 260" xmlns="http://www.w3.org/2000/svg"><rect width="600" height="260" fill="#0f172a" rx="12"/><text x="300" y="35" text-anchor="middle" fill="#e2e8f0" font-size="14" font-weight="bold" font-family="sans-serif">人際壓力觸發神經系統的路徑</text><g transform="translate(30,65)"><rect x="0" y="0" width="110" height="60" rx="8" fill="#1e293b" stroke="#6366f1" stroke-width="1.5"/><text x="55" y="24" text-anchor="middle" fill="#c7d2fe" font-size="12" font-family="sans-serif">感知社交威脅</text><text x="55" y="44" text-anchor="middle" fill="#64748b" font-size="10" font-family="sans-serif">說話方式 / 眼神</text></g><text x="153" y="100" fill="#475569" font-size="20" font-family="sans-serif">→</text><g transform="translate(168,65)"><rect x="0" y="0" width="110" height="60" rx="8" fill="#1e293b" stroke="#ef4444" stroke-width="1.5"/><text x="55" y="24" text-anchor="middle" fill="#fca5a5" font-size="12" font-family="sans-serif">杏仁核活化</text><text x="55" y="44" text-anchor="middle" fill="#64748b" font-size="10" font-family="sans-serif">大腦警報中心</text></g><text x="291" y="100" fill="#475569" font-size="20" font-family="sans-serif">→</text><g transform="translate(306,65)"><rect x="0" y="0" width="110" height="60" rx="8" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/><text x="55" y="24" text-anchor="middle" fill="#fcd34d" font-size="12" font-family="sans-serif">交感神經啟動</text><text x="55" y="44" text-anchor="middle" fill="#64748b" font-size="10" font-family="sans-serif">備戰模式</text></g><text x="429" y="100" fill="#475569" font-size="20" font-family="sans-serif">→</text><g transform="translate(444,65)"><rect x="0" y="0" width="120" height="60" rx="8" fill="#1e293b" stroke="#8b5cf6" stroke-width="1.5"/><text x="60" y="24" text-anchor="middle" fill="#c4b5fd" font-size="12" font-family="sans-serif">身體症狀</text><text x="60" y="44" text-anchor="middle" fill="#64748b" font-size="10" font-family="sans-serif">胸悶/頭痛/睡不著</text></g><rect x="30" y="155" width="540" height="65" rx="8" fill="#1e293b"/><text x="300" y="178" text-anchor="middle" fill="#94a3b8" font-size="12" font-family="sans-serif">其他壓力源（工作/財務）通常有結束點</text><text x="300" y="198" text-anchor="middle" fill="#fca5a5" font-size="12" font-family="sans-serif">人際壓力沒有——你可以關掉電腦，但關不掉對某個人的想法</text></svg>`,
      },
      {
        id: 'slide-2', type: 'concept', title: '人際壓力為什麼特別耗能',
        content: `人是社會性動物，這不是比喻，是生物學事實。

你的神經系統從幾萬年前就被設計成要持續評估「周圍的人對我是安全還是危險的」。這個任務從來沒有停過——即使你現在坐在家裡什麼都不做，你的大腦還是在處理今天那段對話、那個表情。

其他的壓力源——工作、財務、噪音——通常有一個固定的「結束點」。

但人際壓力沒有。你可以關掉電腦，但你關不掉對某個人的想法。你的神經系統還在跟那個人「互動」，反覆重播，反覆評估。

這就是為什麼人際衝突之後，很多人會有身體症狀：頭痛、胃不舒服、心跳加速、睡不著。不是誇張，是神經系統還在戰鬥或逃跑模式裡。`,
        visual: `<svg viewBox="0 0 600 240" xmlns="http://www.w3.org/2000/svg"><rect width="600" height="240" fill="#0f172a" rx="12"/><text x="300" y="35" text-anchor="middle" fill="#e2e8f0" font-size="14" font-weight="bold" font-family="sans-serif">杏仁核：大腦的保全系統</text><ellipse cx="300" cy="120" rx="60" ry="50" fill="#1e293b" stroke="#ef4444" stroke-width="2"/><text x="300" y="115" text-anchor="middle" fill="#fca5a5" font-size="13" font-weight="bold" font-family="sans-serif">杏仁核</text><text x="300" y="133" text-anchor="middle" fill="#94a3b8" font-size="11" font-family="sans-serif">威脅偵測中心</text><text x="70" y="75" fill="#6ee7b7" font-size="11" font-family="sans-serif">🐯 老虎來了</text><line x1="145" y1="78" x2="242" y2="105" stroke="#475569" stroke-width="1.5"/><text x="50" y="155" fill="#fcd34d" font-size="11" font-family="sans-serif">😤 主管的眼神</text><line x1="155" y1="150" x2="242" y2="135" stroke="#475569" stroke-width="1.5"/><text x="380" y="85" fill="#f87171" font-size="11" font-family="sans-serif">→ 心跳加速</text><text x="380" y="120" fill="#f87171" font-size="11" font-family="sans-serif">→ 肌肉緊繃</text><text x="380" y="155" fill="#f87171" font-size="11" font-family="sans-serif">→ 思維窄化</text><rect x="40" y="205" width="520" height="25" rx="6" fill="#312e81"/><text x="300" y="221" text-anchor="middle" fill="#a5b4fc" font-size="11" font-family="sans-serif">🐱 魯魯：杏仁核就是你大腦裡那個不分青紅皂白的保全——老虎還是讓你不安的訊息，一律拉警報</text></svg>`,
      },
      {
        id: 'slide-3', type: 'deepdive', title: '為什麼「別理他」這麼難做到',
        content: `有一個研究發現，人在社交排除（感覺被排擠或忽視）時，大腦活化的區域跟身體疼痛的區域高度重疊。

也就是說，被人拒絕、被忽視，在神經科學的層次上，真的「很痛」——不是心理上的比喻。

這也解釋了一件事：為什麼別人跟你說「算了，別理他」這麼難做到。

你不是做不到，是你的神經系統正在處理一個它認為需要認真對待的傷害。

社交威脅和身體威脅用同一套警報系統，杏仁核無法區分「老虎要吃我」跟「我的主管用那種語氣看著我」——兩種情況都可能觸發類似的反應。

這不是你太敏感，這是你的神經系統在正常運作。`,
        visual: `<svg viewBox="0 0 600 230" xmlns="http://www.w3.org/2000/svg"><rect width="600" height="230" fill="#0f172a" rx="12"/><text x="300" y="35" text-anchor="middle" fill="#e2e8f0" font-size="14" font-weight="bold" font-family="sans-serif">社交痛苦 = 身體疼痛（大腦層次）</text><rect x="40" y="55" width="230" height="120" rx="8" fill="#1e293b" stroke="#ef4444" stroke-width="1.5"/><text x="155" y="80" text-anchor="middle" fill="#fca5a5" font-size="13" font-weight="bold" font-family="sans-serif">身體疼痛</text><text x="155" y="105" text-anchor="middle" fill="#94a3b8" font-size="12" font-family="sans-serif">被打、受傷</text><text x="155" y="150" text-anchor="middle" fill="#6366f1" font-size="12" font-family="sans-serif">前扣帶迴皮質・前腦島</text><rect x="330" y="55" width="230" height="120" rx="8" fill="#1e293b" stroke="#8b5cf6" stroke-width="1.5"/><text x="445" y="80" text-anchor="middle" fill="#c4b5fd" font-size="13" font-weight="bold" font-family="sans-serif">社交排除</text><text x="445" y="105" text-anchor="middle" fill="#94a3b8" font-size="12" font-family="sans-serif">被忽視、被拒絕</text><text x="445" y="150" text-anchor="middle" fill="#6366f1" font-size="12" font-family="sans-serif">前扣帶迴皮質・前腦島</text><text x="300" y="100" text-anchor="middle" fill="#475569" font-size="22" font-family="sans-serif">≈</text><rect x="40" y="190" width="520" height="30" rx="6" fill="#1e293b" stroke="#6366f1" stroke-width="1"/><text x="300" y="209" text-anchor="middle" fill="#94a3b8" font-size="12" font-family="sans-serif">兩者活化相同大腦區域——社交痛苦在神經層次是真實的痛</text></svg>`,
      },
      {
        id: 'slide-4', type: 'summary', title: '本堂重點',
        content: `📝 三件事，帶走就夠了：

① 人際壓力是神經系統最難關機的壓力
因為大腦被設計成要持續監控社交環境，對人的評估 24 小時沒有停過。

② 社交威脅和身體威脅用同一套警報系統
杏仁核無法區分老虎和讓你不舒服的主管，兩者都可能引發交感神經反應。

③ 社交痛苦在神經層次是真實的痛
被排除、被忽視的感覺跟身體疼痛共用大腦迴路，這解釋了為什麼「想開一點」沒有那麼容易。`,
        visual: `<svg viewBox="0 0 600 190" xmlns="http://www.w3.org/2000/svg"><rect width="600" height="190" fill="#0f172a" rx="12"/><text x="300" y="32" text-anchor="middle" fill="#e2e8f0" font-size="15" font-weight="bold" font-family="sans-serif">人際關係壓力：三個核心認識</text><g transform="translate(50,50)"><rect x="0" y="0" width="500" height="36" rx="6" fill="#1e293b" stroke="#6366f1" stroke-width="1"/><text x="18" y="23" fill="#6366f1" font-size="16" font-family="sans-serif">①</text><text x="45" y="23" fill="#e2e8f0" font-size="13" font-family="sans-serif">人際壓力沒有結束點——大腦24小時在處理</text></g><g transform="translate(50,96)"><rect x="0" y="0" width="500" height="36" rx="6" fill="#1e293b" stroke="#6366f1" stroke-width="1"/><text x="18" y="23" fill="#6366f1" font-size="16" font-family="sans-serif">②</text><text x="45" y="23" fill="#e2e8f0" font-size="13" font-family="sans-serif">杏仁核不分老虎和主管——同一套警報</text></g><g transform="translate(50,142)"><rect x="0" y="0" width="500" height="36" rx="6" fill="#1e293b" stroke="#6366f1" stroke-width="1"/><text x="18" y="23" fill="#6366f1" font-size="16" font-family="sans-serif">③</text><text x="45" y="23" fill="#e2e8f0" font-size="13" font-family="sans-serif">被忽視的痛在神經層次是真實的——不是太敏感</text></g></svg>`,
      },
    ],
    quizzes: [
      {
        id: 'q1',
        question: '為什麼小玲換了輕鬆的工作，卻還是因為一個主管而胸悶、疲憊？',
        options: ['她的個性太敏感，需要調整心態', '工作環境太差，應該再換工作', '人際壓力觸發杏仁核警報，神經系統持續在備戰狀態，身體反應是真實的', '這只是適應新環境的短暫過渡期'],
        answer: 2,
        explanation: '當你感知到社交威脅，杏仁核會活化，啟動交感神經反應。主管的說話方式讓小玲感覺不安全，這個社交威脅訊號觸發了跟「老虎來了」類似的神經反應——胸悶、疲憊是真實的生理結果，不是心理脆弱。',
      },
      {
        id: 'q2',
        question: '研究發現，社交排除（被忽視、被拒絕）在大腦中活化的區域，跟什麼最接近？',
        options: ['恐懼和焦慮的大腦區域', '身體疼痛的大腦區域', '悲傷和失落的大腦區域', '憤怒和攻擊的大腦區域'],
        answer: 1,
        explanation: '研究顯示，社交排除（感覺被排擠或忽視）活化的大腦區域，跟身體疼痛高度重疊（前扣帶迴皮質、前腦島）。這代表社交痛苦在神經科學層次是真實的痛，不是誇張，也不是「太敏感」。',
      },
    ],
    cta: { text: '繼續讀 Vol.07 完整版（共10堂）', url: `${ST_BASE}/${VOL_IDS['07']}`, seriesNote: '自律神經學系 7冊・從了解到改變' },
  },
];

export default autonomicLessons;
