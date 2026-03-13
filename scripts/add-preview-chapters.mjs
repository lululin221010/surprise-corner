import { readFileSync, writeFileSync } from 'fs'

const path = 'C:/Users/user/Desktop/MyProjects01/surprise-corner-src/src/data/chapters.json'
const data = JSON.parse(readFileSync(path, 'utf8'))

const newChapters = [

// ── 斜槓致富方程式（slash-rich）30 章，前 6 章免費 ──────────────

{ id:'slash-001', novelId:'slash-rich', chapterNumber:1,
  title:'前言：為什麼現在是斜槓的黃金時代',
  content:`你有沒有想過，你現在的工作不應該是唯一的收入來源？

2024 年，全球超過 42% 的自由工作者表示，副業收入已超過主業。不是因為他們更聰明，而是因為他們掌握了一個關鍵：AI 工具讓一個人能做到以前需要整個團隊才能完成的事。

這本書不是要你辭職。而是要你在不辭職的前提下，用 AI 工具建立一條屬於你的斜槓收入路。

斜槓不是年輕人的專利。無論你是上班族、家庭主婦、還是退休族群，只要你有一個可以輸出的技能或知識，你就有資格斜槓。

問題從來不是「我有沒有能力」，而是「我有沒有走出第一步的勇氣」。

這本書就是那第一步。`,
  wordCount:180, publishedAt:'2026-03-01', isPublished:true, isFree:true,
  price:0, priceFullBook:199, shopUrl:'https://still-time-corner.vercel.app/digital' },

{ id:'slash-002', novelId:'slash-rich', chapterNumber:2,
  title:'第一章：找到你的斜槓定位',
  content:`很多人問：「我能斜槓什麼？」

答案其實就在你的日常裡。你每天做的工作，你學過的技能，你踩過的坑——這些在別人眼中都是有價值的知識。

斜槓定位有三種類型：

【技能型】把你的專業技能出售：設計、寫作、翻譯、程式、會計……

【知識型】把你學到的東西整理成課程或電子書：理財、語言學習、育兒、健康飲食……

【興趣型】把你熱愛的事情變成內容：攝影、旅行、手作、烘焙……

最強的斜槓定位，是三種的交叉點：你擅長、你熱愛、市場願意付費的東西。

本章練習：拿出一張紙，把你會的事情列出來，然後問自己：「如果我要教別人這件事，他們願意付多少錢？」答案可能會讓你驚訝。`,
  wordCount:195, publishedAt:'2026-03-01', isPublished:true, isFree:true,
  price:0, priceFullBook:199, shopUrl:'https://still-time-corner.vercel.app/digital' },

{ id:'slash-003', novelId:'slash-rich', chapterNumber:3,
  title:'第二章：你已經有的，就是起點',
  content:`最大的迷思是：「等我準備好了再開始。」

你永遠不會完全準備好。斜槓成功者的共同特質不是完美準備，而是帶著七分熟就出發。

「但我不夠專業⋯⋯」

其實你不需要是專家，只需要比你的目標客群多懂一點。想幫大學生學 Excel？你不需要是 Excel 認證講師，只要你的 Excel 夠用就行了。

「但我沒有設備、沒有工具⋯⋯」

今天你只需要一支手機、一台電腦，再加上免費或低月費的 AI 工具，就能啟動第一條副業收入。

起點不是等來的，是走出來的。

本章重點：清點你手邊已有的資源，包括技能、人脈、工具，然後問自己：「我今天可以用什麼做出第一個試驗？」`,
  wordCount:205, publishedAt:'2026-03-01', isPublished:true, isFree:true,
  price:0, priceFullBook:199, shopUrl:'https://still-time-corner.vercel.app/digital' },

{ id:'slash-004', novelId:'slash-rich', chapterNumber:4,
  title:'第三章：AI 工具讓你一個人頂一個團隊',
  content:`在沒有 AI 之前，一個人想做內容行銷，需要：文案寫手、設計師、影音剪輯師、SEO 專家⋯⋯

現在，你一個人就可以全包。

以下是最核心的 AI 工具組合：

✦ 文字生成：ChatGPT / Claude → 寫文章、腳本、行銷文案
✦ 圖像生成：Midjourney / Canva AI → 封面設計、社群圖卡
✦ 語音配音：ElevenLabs → 有聲書、Podcast 旁白
✦ 影片生成：Runway / CapCut AI → 短影音、廣告素材
✦ 自動化：Zapier / Make → 串接工具，省去重複操作

月費總計不超過 NT$ 1,500，你就擁有了一個 AI 創作公司。

後面章節會逐一教你如何用這些工具打造副業產品。繼續讀下去。`,
  wordCount:200, publishedAt:'2026-03-01', isPublished:true, isFree:true,
  price:0, priceFullBook:199, shopUrl:'https://still-time-corner.vercel.app/digital' },

{ id:'slash-005', novelId:'slash-rich', chapterNumber:5,
  title:'第四章：數位產品——從零打造你的第一個產品',
  content:`數位產品是斜槓收入最美好的形式：做一次，賣無數次，不需要庫存，不需要出門。

最容易入門的三種數位產品：

【電子書】把你的知識寫成 PDF，用 Canva 排版，上架銷售。費時：1–2 週。門檻：極低。

【Notion 模板】整理一個你常用的工作流程，轉成模板販售。費時：1–3 天。

【線上課程】用 Loom 錄螢幕教學影片，整理成課程包。費時：2–4 週。

第一個產品的唯一目標不是賺錢，而是「驗證有人願意付費」。

定價不必高。NT$ 99 到 NT$ 299 的範圍，容易讓人決定購買，又足以驗證市場需求。

行動：今天就決定你的第一個數位產品主題，寫下來。`,
  wordCount:210, publishedAt:'2026-03-01', isPublished:true, isFree:true,
  price:0, priceFullBook:199, shopUrl:'https://still-time-corner.vercel.app/digital' },

{ id:'slash-006', novelId:'slash-rich', chapterNumber:6,
  title:'第五章：社群媒體——免費流量的入口',
  content:`你不需要花錢打廣告，只要你持續在對的平台輸出正確的內容，免費流量自然來。

台灣最有效的斜槓流量來源：

✦ Instagram / Threads：生活感、個人品牌、感性故事
✦ YouTube Shorts：教學短影音、AI 工具示範
✦ 部落格 / 方格子：SEO 長文，持續帶流量
✦ Facebook 社團：進入目標社群，提供價值

關鍵原則：選一個主平台深耕，其他平台輔助分發。

內容公式：你學到的事情 → 整理成有用資訊 → 發布 → 回應留言 → 建立信任感 → 粉絲成為買家。

很多人犯的錯是同時經營五個平台，結果每個都不夠深入。選一個你最自然使用的平台，連續輸出 90 天。

後續章節將深入定價心理學、電子報、聯盟行銷，以及七個成功案例的真實故事。完整版共 30 章，前往小舖解鎖。`,
  wordCount:220, publishedAt:'2026-03-01', isPublished:true, isFree:true,
  price:0, priceFullBook:199, shopUrl:'https://still-time-corner.vercel.app/digital' },

...['第六章：定價心理學——你的價值不只你以為的',
   '第七章：電子報的威力——最忠實的受眾在哪裡',
   '第八章：Notion 作為你的數位工作室',
   '第九章：接案平台完全指南（Fiverr / 104）',
   '第十章：AI 寫作副業啟動手冊',
   '第十一章：AI 設計副業——從視覺到變現',
   '第十二章：線上課程——把知識變成商品',
   '第十三章：Podcast 副業——用聲音賺錢',
   '第十四章：YouTube 短影音策略',
   '第十五章：聯盟行銷——幫別人賣東西賺佣金',
   '第十六章：Print-on-Demand——零庫存商品',
   '第十七章：電子書出版完整流程',
   '第十八章：數位模板市場怎麼玩',
   '第十九章：建立個人品牌的七個關鍵',
   '第二十章：自動化工作流程——讓系統幫你賺錢',
   '第二十一章：稅務基礎——副業收入怎麼申報',
   '第二十二章：財務目標設定與追蹤',
   '第二十三章：從副業到主業的心理準備',
   '第二十四章：七位斜槓者的真實案例',
   '第二十五章：常見失敗原因與解法',
   '第二十六章：打造你的斜槓生態系',
   '第二十七章：斜槓元年行動 90 天計畫',
   '結語：你的斜槓元年，從今天開始',
].map((title, i) => ({
  id: `slash-${String(i+7).padStart(3,'0')}`, novelId:'slash-rich', chapterNumber:i+7, title,
  content:'', wordCount:0, publishedAt:'2026-08-01', isPublished:true, isFree:false,
  price:0, priceFullBook:199, shopUrl:'https://still-time-corner.vercel.app/digital'
})),

// ── 台股紅綠燈 2026（stock-signal）25 章，前 5 章免費 ────────────

{ id:'stock-001', novelId:'stock-signal', chapterNumber:1,
  title:'前言：為什麼大多數人在台股都虧錢',
  content:`台灣投資人的普遍經歷是：看著別人賺錢，自己追進去，然後虧損。

根據金管會統計，個人散戶中長期的平均報酬率，遠低於定期定額買 ETF。為什麼？

不是因為散戶不努力，而是因為大多數人用「直覺」在操作，而直覺在市場裡往往是錯的。

追高殺低、聽明牌、忽略停損——這三件事造成了 90% 的散戶虧損。

本書的核心是「紅綠燈系統」——把複雜的技術指標簡化成三種信號：

🔴 紅燈：現在不適合進場，保留現金
🟡 黃燈：觀察期，等待訊號明確
🟢 綠燈：可以進場，依策略建倉

這套系統不保證每次都對，但可以幫你大幅減少「不該進場卻進場」的致命錯誤。讓我們開始。`,
  wordCount:200, publishedAt:'2026-02-01', isPublished:true, isFree:true,
  price:0, priceFullBook:249, shopUrl:'https://still-time-corner.vercel.app/digital' },

{ id:'stock-002', novelId:'stock-signal', chapterNumber:2,
  title:'第一章：認識台股的基本結構',
  content:`台灣股市目前有超過 1,700 支上市股票，選擇多到讓人無從下手。

但你只需要理解幾個核心概念：

【加權指數】大盤的溫度計。指數上漲代表整體市場偏多；下跌代表偏空。看大盤方向是一切操作的前提。

【市值分類】大型股（台積電、聯發科）流動性好，適合波段操作；小型股獲利爆發力強，但風險也高。

【產業分類】台股以電子業為主，包含半導體、IC 設計、系統整合。傳產與科技股走勢常常不同步，理解輪動很重要。

【台積電的特殊地位】台積電市值占大盤約 30%，它動，大盤就動。看台積電走勢，幾乎等於看大盤走勢。

理解這些基礎，你才能知道自己在看什麼、在買什麼。`,
  wordCount:195, publishedAt:'2026-02-01', isPublished:true, isFree:true,
  price:0, priceFullBook:249, shopUrl:'https://still-time-corner.vercel.app/digital' },

{ id:'stock-003', novelId:'stock-signal', chapterNumber:3,
  title:'第二章：紅綠燈系統是什麼',
  content:`「紅綠燈系統」的概念很簡單：把所有複雜的技術指標，整合成你每天早上五分鐘就能判斷的信號。

系統由五個指標組成：

1. 大盤均線方向（20 日 / 60 日均線多空排列）
2. 成交量趨勢（量縮 vs. 量增）
3. 台積電走勢（領先指標）
4. 外資動向（連續買超 or 賣超）
5. VIX 恐慌指數（市場情緒溫度）

五項全部偏多 → 綠燈
混合訊號 → 黃燈
全部偏空 → 紅燈

綠燈時，積極進場。紅燈時，保留現金。黃燈時，減少倉位，不加碼。

這個系統最大的優點是：它強迫你在「不確定的時候什麼都不做」。而「什麼都不做」往往是散戶最難做到、卻最重要的事。`,
  wordCount:210, publishedAt:'2026-02-01', isPublished:true, isFree:true,
  price:0, priceFullBook:249, shopUrl:'https://still-time-corner.vercel.app/digital' },

{ id:'stock-004', novelId:'stock-signal', chapterNumber:4,
  title:'第三章：如何看懂大盤方向',
  content:`判斷大盤方向不需要複雜的工具，你只需要看這三件事：

✦ 20 日均線與 60 日均線的排列
如果 20 日線在 60 日線上方、且兩條線都向上彎 → 多頭排列，偏多
如果 20 日線跌破 60 日線、且向下 → 空頭排列，偏空

✦ 成交量
上漲日成交量放大、下跌日縮小 → 多方積極，市場健康
上漲日成交量萎縮、下跌日放大 → 資金在撤退，需警惕

✦ 高低點結構
連續墊高的高點與低點 → 上升趨勢
連續下移的高點與低點 → 下降趨勢

每天早上開盤前花五分鐘確認這三件事，你對當天操作方向就有了基本判斷。`,
  wordCount:200, publishedAt:'2026-02-01', isPublished:true, isFree:true,
  price:0, priceFullBook:249, shopUrl:'https://still-time-corner.vercel.app/digital' },

{ id:'stock-005', novelId:'stock-signal', chapterNumber:5,
  title:'第四章：選股的第一個指標',
  content:`大盤方向確認之後，下一步是選股。

初學者最有效的選股邏輯：「跟著強股走」。

什麼是強股？在大盤下跌時跌得比別人少，在大盤上漲時漲得比別人多的股票。

兩個最容易找到強股的方法：

【方法一：相對強弱】比較個股與大盤的漲跌幅。大盤跌 2%，它只跌 0.5%？這就是相對強股，資金在裡面不肯走。

【方法二：量價配合】股價創近期新高，且成交量同步放大 → 追漲資金進入，動能充足。

初學者最常犯的錯：去買「跌最多的股票」，期待反彈。這是逆勢操作，成功率低且風險高。

記住：市場不同情弱者，要跟著強者走。

後續章節深入介紹 KD、MACD、外資籌碼等進階指標。完整版共 25 章，前往小舖解鎖。`,
  wordCount:215, publishedAt:'2026-02-01', isPublished:true, isFree:true,
  price:0, priceFullBook:249, shopUrl:'https://still-time-corner.vercel.app/digital' },

...['第五章：移動平均線的實戰應用',
   '第六章：量能——最被散戶低估的指標',
   '第七章：支撐與壓力位怎麼找',
   '第八章：KD 指標的正確用法與常見誤區',
   '第九章：MACD 判斷多空轉折的秘訣',
   '第十章：個股基本面速讀法',
   '第十一章：財報裡你只需要看這三個數字',
   '第十二章：何時進場——紅燈轉綠燈的時機',
   '第十三章：何時出場——避免住套房',
   '第十四章：停損的藝術',
   '第十五章：資金管理——一次不要押太多',
   '第十六章：多頭市場操作策略',
   '第十七章：空頭市場生存術',
   '第十八章：台股特有的產業輪動規律',
   '第十九章：外資動向怎麼追、怎麼用',
   '第二十章：融資融券的警訊指標',
   '第二十一章：實戰模擬——一個月操作日記',
   '第二十二章：建立你的操作 SOP',
   '第二十三章：常見虧損陷阱與解法',
   '結語：2026 台股展望與你的位置',
].map((title, i) => ({
  id: `stock-${String(i+6).padStart(3,'0')}`, novelId:'stock-signal', chapterNumber:i+6, title,
  content:'', wordCount:0, publishedAt:'2026-08-01', isPublished:true, isFree:false,
  price:0, priceFullBook:249, shopUrl:'https://still-time-corner.vercel.app/digital'
})),

// ── 影音 AI 工具完全指南（ai-tools-guide）20 章，前 4 章免費 ─────

{ id:'ai-001', novelId:'ai-tools-guide', chapterNumber:1,
  title:'前言：AI 工具讓一個人就是一個製作公司',
  content:`三年前，拍一支品質不錯的短影音需要：攝影師、剪輯師、配音員、設計師⋯⋯至少四個人，加上設備費用，動輒數萬元。

今天，你只需要一台電腦和幾個月費不超過千元的 AI 工具，就能做出同樣的效果。

這不是誇大。這是真實發生在創作圈裡的革命。

本書收錄了 20+ 款 2026 年最值得使用的 AI 影音工具，並用繁體中文、從零基礎的角度，教你怎麼用每一款工具做出實際成果。

你不需要任何技術背景。你只需要有想法，和願意動手的意願。

本書的使用方式：你可以從頭讀到尾，也可以直接跳到你感興趣的工具章節。每章都是獨立的教學單元。

準備好了嗎？讓我們開始。`,
  wordCount:190, publishedAt:'2026-01-01', isPublished:true, isFree:true,
  price:0, priceFullBook:380, shopUrl:'https://still-time-corner.vercel.app/digital' },

{ id:'ai-002', novelId:'ai-tools-guide', chapterNumber:2,
  title:'第一章：Midjourney 圖像生成完全入門',
  content:`Midjourney 是目前世界上最受歡迎的 AI 圖像生成工具，沒有之一。

它運作在 Discord 平台上。你只需要輸入一段文字描述（Prompt），它就會在一分鐘內生成四張高品質圖片。

如何開始：
1. 前往 discord.gg/midjourney，加入官方伺服器
2. 在任意 newbies 頻道輸入 /imagine
3. 輸入你的描述，例如：a cozy coffee shop at night, warm lighting, Japanese style

收費方案：基本方案月費約 $10 美金，可生成約 200 張圖。

Prompt 寫法技巧：
✦ 描述主體：你想要什麼（人物、場景、物品）
✦ 描述風格：watercolor / cinematic / flat design / anime
✦ 描述光線：golden hour / studio lighting / neon lights
✦ 加上參數：--ar 16:9（寬螢幕）--v 6（最新版本）

生成的圖可以用於電子書封面、社群圖卡、商品圖，基本方案以上可商業使用。`,
  wordCount:230, publishedAt:'2026-01-01', isPublished:true, isFree:true,
  price:0, priceFullBook:380, shopUrl:'https://still-time-corner.vercel.app/digital' },

{ id:'ai-003', novelId:'ai-tools-guide', chapterNumber:3,
  title:'第二章：Suno 讓你無需樂器就能作曲',
  content:`你不需要學過音樂理論，也不需要任何樂器，只需要告訴 Suno 你想要什麼風格，它就能在 30 秒內生成一首完整的歌曲——包含旋律、和弦、人聲和歌詞。

前往 suno.ai 免費使用（有每日限制）。

使用方法：
1. 選擇「Song」模式
2. 在 Style 欄位輸入風格：lo-fi hip hop, slow tempo, rainy day, guitar
3. 輸入歌詞或讓 AI 幫你寫
4. 點擊 Create，等待 30 秒

最實用的應用場景：
✦ Podcast 片頭音樂
✦ YouTube 影片背景音樂
✦ 電子書或課程的開場樂
✦ 社群短影音配樂

版權說明：Suno 付費方案生成的音樂可商業使用。免費方案僅限個人非商業用途。

Suno 的限制：人聲品質有時不穩定，生成的歌詞偶爾語意奇怪。建議多生成幾次選最好的。`,
  wordCount:215, publishedAt:'2026-01-01', isPublished:true, isFree:true,
  price:0, priceFullBook:380, shopUrl:'https://still-time-corner.vercel.app/digital' },

{ id:'ai-004', novelId:'ai-tools-guide', chapterNumber:4,
  title:'第三章：ElevenLabs 語音克隆與 AI 配音',
  content:`ElevenLabs 是目前最接近真人聲音的 AI 語音生成工具。你可以：

✦ 輸入任何文字，選擇預設人聲，生成配音
✦ 上傳 1–2 分鐘的音頻樣本，複製任何人的聲音（包括你自己）
✦ 調整語速、情緒、語調

前往 elevenlabs.io，免費方案每月可生成約 10,000 個字元。

最實用的應用場景：
✦ Podcast 腳本的 AI 朗讀
✦ YouTube 影片的旁白配音（不用本人出聲）
✦ 有聲書製作
✦ 產品介紹影片配音

如何克隆你自己的聲音：
1. 錄製一段 1–2 分鐘的清晰錄音（安靜環境、正常說話速度）
2. 上傳到 ElevenLabs 的 Voice Cloning 功能
3. 等待 5 分鐘，你的 AI 分身就完成了
4. 輸入任何文字，它就會用你的聲音說出來

注意：克隆他人聲音需取得明確授權。

後續章節將介紹 Sora、CapCut AI、HeyGen 等影片生成工具。完整版共 20 章，前往小舖解鎖。`,
  wordCount:240, publishedAt:'2026-01-01', isPublished:true, isFree:true,
  price:0, priceFullBook:380, shopUrl:'https://still-time-corner.vercel.app/digital' },

...['第四章：Sora 影片生成——現在能做什麼、不能做什麼',
   '第五章：CapCut AI——剪輯從此不再難',
   '第六章：Runway Gen-3——進階影像生成',
   '第七章：Adobe Firefly——創作者的 AI 神器',
   '第八章：Stable Diffusion——自架 AI 圖像工作室',
   '第九章：ChatGPT 文案寫作全攻略',
   '第十章：Claude 的長文寫作優勢',
   '第十一章：Canva AI——設計小白的救星',
   '第十二章：HeyGen——數位人影片製作',
   '第十三章：D-ID——讓照片說話的技術',
   '第十四章：Pika Labs——短影音 AI 生成',
   '第十五章：Ideogram——文字融入圖像',
   '第十六章：音樂版權與 AI 創作的法律現況',
   '第十七章：AI 工具收費比較——哪些值得訂閱',
   '第十八章：AI 影音工作流整合實戰案例',
   '結語：你的 AI 影音時代已經到來',
].map((title, i) => ({
  id: `ai-${String(i+5).padStart(3,'0')}`, novelId:'ai-tools-guide', chapterNumber:i+5, title,
  content:'', wordCount:0, publishedAt:'2026-08-01', isPublished:true, isFree:false,
  price:0, priceFullBook:380, shopUrl:'https://still-time-corner.vercel.app/digital'
})),

]

const merged = [...data, ...newChapters]
writeFileSync(path, JSON.stringify(merged, null, 2), 'utf8')
console.log('Done! Added', newChapters.length, 'chapters')
console.log('slash-rich:', newChapters.filter(c=>c.novelId==='slash-rich').length)
console.log('stock-signal:', newChapters.filter(c=>c.novelId==='stock-signal').length)
console.log('ai-tools-guide:', newChapters.filter(c=>c.novelId==='ai-tools-guide').length)
