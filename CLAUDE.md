# 驚喜角落（Surprise Corner）- 專案文件

## 專案狀態
- 部署在：https://surprise-corner.vercel.app
- 技術：Next.js App Router，TypeScript（`.tsx`）

## 🔑 代號系統

| 代號 | 說明 |
|------|------|
| SS | 驚喜角落 `surprise-corner-src` → https://surprise-corner.vercel.app |
| ST | 小舖 `my-bookstore-next-V2` → https://still-time-corner.vercel.app |
| CC | Claude Code（終端機 AI 工程師） |
| C | Claude（網頁版 AI 策略顧問） |

## 專案路徑速查

| 專案 | 路徑 |
|------|------|
| 驚喜站 | `C:\Users\user\Desktop\MyProjects01\surprise-corner-src` |
| 小舖 | `C:\Users\user\Desktop\MyProjects01\my-bookstore-next-V2` |

---

## 技術架構
- Next.js App Router
- TypeScript（`.tsx`）
- 部署：Vercel
- 環境變數：`GROQ_API_KEY`（Groq Whisper 語音辨識 + 角色聊天）

## 環境變數
- `GROQ_API_KEY`：Groq API 金鑰（以 `gsk_` 開頭），已設定於 Vercel
- `BLOB_READ_WRITE_TOKEN`：Vercel Blob 讀寫 Token，已設定於 Vercel

---

## ✅ 已完成功能

### 工具箱（/tools）
- 入口頁：`src/app/tools/page.tsx`
- **文字工具**（先前已有）
- **媒體工具**：
  - 🎙️ 音訊轉文字：`src/app/tools/audio-to-text/page.tsx` + `src/app/api/tools/audio-to-text/route.ts`
    - 使用 Groq Whisper Large V3 Turbo
    - 支援 mp3、mp4、wav、m4a，最大 25MB
  - 🖼️ 圖片加浮水印：`src/app/tools/watermark/page.tsx`（純前端 Canvas，6 種位置 + 平鋪）
  - 🪪 證件照製作：`src/app/tools/id-photo/page.tsx`（純前端 Canvas，4 種尺寸、4 種背景色）

### 電子書促銷
- `src/components/AIBookPromo.tsx` — 電子書促銷元件，引入於 AI 快訊頁底部
  - 免費預覽連結：`/ebook/ai-ebook-free.html`（新分頁）
  - 購買按鈕：`https://still-time-corner.vercel.app/digital`
- `src/app/ai-news/page.tsx` — 頁面底部引入 `<AIBookPromo />`
- `public/ebook/` — 電子書 HTML 檔案：`ai-ebook-free.html`、`ai-ebook-full.html`、`ai-ebook-epub.html`

### Podcast（/podcast）
- 頁面：`src/app/podcast/page.tsx`
- 集數資料直接寫在 `page.tsx` 的 `EPISODES` 陣列（episodes.json 目前未使用）
- 音頻儲存於 **Vercel Blob**（`88lwhikbeo2pkibc.public.blob.vercel-storage.com/podcast/`）
- 嵌入式 `AudioPlayer` 元件：進度條可點擊跳轉、播放/暫停、時間顯示、音波動畫
- Ko-fi 贊助連結整合於 Podcast 頁面
- Spotify 上架：用 podcasters.spotify.com，免費，上傳 MP3 即可，SS 音檔已備妥 ✅

**目前已上傳 8 集（~155MB，Hobby 方案 512MB 上限，剩約 357MB）：**
- ep01-surprise-corner-intro.mp3（AI 驚喜與兔崽子書店）
- ep02-side-hustle-map.mp3（上班族低風險副業實戰地圖）
- ep03-taiwan-stock.mp3（台股紅綠燈：戰勝投資心魔）
- ep04-ai-loneliness.mp3（AI 從打字停頓讀懂你的孤獨）
- ep05-taipei-ruin.mp3（台北廢墟收到的太空求救）
- ep06-ai-film.mp3（用 AI 一人拍大片）
- ep07（長照路上的崩潰與解脫）
- ep08（離世是靈魂計畫好的畢業）
- 贊助文字已改為「請魯魯吃罐罐」

**新增集數流程：**
1. NotebookLM 上傳書籍前 1/5 內容，新增記事寫限制指令（只介紹前幾章，結尾導流小舖）
2. 生成語音摘要 → 下載 m4a → cloudconvert.com 轉 mp3
3. 上傳 MP3 到 Vercel Blob → 取得 URL（或用 `upload-podcasts.mjs`，小舖專案根目錄）
4. `EPISODES` 陣列新增一筆，填入 `audioUrl`（`${BASE}/ep0X-xxx.mp3`）

Podcast 開場腳本原則：
- 只用書籍前 1/3 內容（或前 1/5），不爆雷
- 結尾導流到小舖：`still-time-corner.vercel.app`
- 已完成五本書腳本（台股紅綠燈、斜槓致富方程式、影音AI工具完全指南、最後的信號、Lulu的日記）

### 角色聊天（2026-03 新增）
- API：`src/app/api/chat/route.ts`（Groq llama-3.3-70b-versatile，max_tokens 200，temperature 0.85）
- **角色清單**（route.ts 的 CHARACTERS 物件）：
  - `lulu` 🐱：來自《Lulu的日記》→ `/chat/lulu`，紫色主題，溫柔細膩
  - `signal` 📡：來自《最後的信號》→ `/chat/signal`，藍色主題，廢土滄桑感
- 入口位置：首頁探索卡片 + 各小說頁面按鈕
- 新本小說上線 → CHARACTERS 加一筆 + 新建對應頁面
- 小說正確路徑：`/novels/lulu-diary`、`/novels/the-last-signal`
- **關鍵檔案**：
  - `src/app/api/chat/route.ts` — 聊天 API，含所有角色 system prompt
  - `src/app/chat/lulu/page.tsx` — Lulu 聊天頁面
  - `src/app/chat/signal/page.tsx` — 林悅聊天頁面

### 二手市集（/secondhand）（2026-03 新增）
- **商業模式**：
  - 親友首件免費刊登一個月（促銷開站）
  - 一般刊登收費（NT$100–300，視件數/時間方案）
  - 買賣雙方自行聯絡，平台只提供廣告刊登
  - VIP 會員：刊登時間或件數增加
  - VIP 機器人：協助廣告介紹與推薦
- 未來規劃：流量足夠後考慮獨立為專屬網站

### 連載小說（/novels）— 2026-03 大幅更新
- 小說列表：`src/data/novels.json`
- 章節資料：`src/data/chapters.json`
- 動態路由：`src/app/novels/[novelId]/page.tsx`（簡介/封面頁）
- **統一電子書閱讀器**：`src/app/novels/[novelId]/ebook/page.tsx`（所有小說共用）
  - 左側 TOC（目錄）
  - 免費章節直接顯示，付費章節顯示鎖定 + 導流至 ST 購買
  - 字體優化（2026-03）：
    - `.chapter-paragraph`：1.12rem，color `#d8cebb`
    - `.chapter-heading`：font-weight 500，color `#f0e4d0`
    - `.toc-row`：0.95rem，color `#a89880`
    - `.cover-desc`：1rem，color `#a89880`

#### 小說列表（novels.json）

| id | 書名 | 狀態 | 免費章節 | shopUrl |
|----|------|------|---------|---------|
| soul-journey | 靈魂的轉運站 | 完結 | 前3節（soul-s-01-01/02/03） | ST /digital |
| the-last-signal | 最後的信號 | 連載中 | 前3節 | ST /digital |
| lulu-diary | Lulu 的日記 | 連載中 | 前3節 | ST /digital |
| slash-rich | 斜槓致富方程式 | 完結 | 前3節 | ST /digital |
| stock-signal | 台股紅綠燈 2026 | 完結 | 前3節 | ST /digital |
| ai-tools-guide | 影音 AI 工具完全指南 | 完結 | 前3節 | ST /digital |

#### chapters.json 章節命名規則
- soul-journey：`soul-s-01-01` ～ `soul-s-10-03`（共 30 節，10 章 × 3 節）
  - 前 3 節（soul-s-01-01/02/03）`isFree: true`，其餘 `isFree: false`
- the-last-signal / lulu-diary：各自獨立命名

#### 章節留言區規範（2026-03-23 更新）
每章頁面底部必須加：
```jsx
<WallPostForm label="魯魯讀者" />
```
- 改用 `WallPostForm`，留言發到 `wall` collection（`approved: false`）
- 後台在 `/admin/comments` 的「互動牆」tab 審核，通過後顯示在 `/wall?tab=魯魯讀者`
- ⚠️ **舊版 CommentSection 已廢棄**，寫入 `chapter_comments` collection，不再使用
- 舊留言（18則）已遷移至 wall collection（`_migrated: true` 標記）

#### novels/page.tsx UX（2026-03 更新）
- 連載小說區：卡片連結直接到 `/novels/${id}/ebook`（不過渡頁）
- 試看區：每本書兩個按鈕
  - 👀 看看喜不喜歡 → `/novels/${id}/ebook`
  - `NT$XXX` 購買完整版 ↗ → ST `/digital`
- 試讀頁（ebook/page.tsx）底部固定 CTA：
  - 喜歡這個故事？→「前往小舖購買完整版 →」+「繼續逛驚喜站 →」
  - PDF 下載按鈕已移除（改由 ST 管理）

#### 資料修復（2026-03）
- `chapters.json`：移除 10 筆空白重複章節條目（soul-journey 舊版 chapter-1 ~ soul-ch10）
- `chapters.json`：soul-s-02-01/02/03 的 `isFree: true` → `false`（只有第一章前 3 節免費）
- `novels.json`：soul-journey `status` 連載中 → 完結，移除 `scheduleNote`，`previewChapters` → 3

---

## Vercel Blob 儲存
- Podcast MP3 儲存於：`https://88lwhikbeo2pkibc.public.blob.vercel-storage.com/podcast/`
- Token：`BLOB_READ_WRITE_TOKEN`（設定於 Vercel 環境變數）
- 方案：Hobby 512MB 免費，目前已用 ~115MB

---

## 💳 金流決策（2026-03-15 確認）

### 最終方案：LINE 私訊 + 銀行轉帳（零手續費）
- 不串接任何第三方金流
- 買家點按鈕 → 加 LINE → 私訊給銀行帳號 → 轉帳
- LINE：https://line.me/R/ti/p/@983agawb
- Footer ☕ 咖啡按鈕已從 Ko-fi 改為 LINE 官方帳號
- 說明文字：點擊按鈕 → 加入 LINE → 私訊取得轉帳資訊

### 各平台嘗試結果
- 藍新／智付通 → ❌ 永久拒絕（同一家）
- 綠界 ECPay → ❌ 被拒
- PayUni → ❌ 接不上
- 街口支付 → ❌ 財務危險勿用
- LINE Pay → ❌ 需公司行號
- 歐付寶個人帳號 → ⚠️ 需裝 App，個人無行號無法成為特店
- Pi 拍錢包 → ⚠️ 買家需裝 App，暫不採用
- Ko-fi → ❌ Stripe 台灣不支援，PayPal 限制未解除
- PayPal → ❌ 台灣帳戶不支援境內交易，境外收款審核複雜

---

## SS 連載時間表
- 奇數日：最後的信號
- 偶數日：Lulu 的日記
- 未來加入：靈魂的轉運站（完結，全量釋出）、魯魯日常

## 連載庫存管理原則
- 永遠保持「已寫好但還沒發」的存稿，目標至少 2 週緩衝
- 庫存跌到 5 節 → 立即補寫
- 用戶提供素材，CC 寫成文章

---

## 社群（確認於 2026-03）
- ✅ Threads 帳號確認公開
- ✅ IG/Threads 第二則文案準備好
- ✅ MongoDB 舊留言批次更新
- Threads 的 Podcast 欄位只接受 Spotify、Apple Podcast、iHeart 的連結，自架網站不行
  - **選擇一（推薦）**：回到編輯個人檔案 → 點「連結」→ 貼上 `https://surprise-corner.vercel.app`
  - **選擇二**：把 Podcast 上架到 Spotify（能多一個曝光管道 🎙️）

---

## 🔴 待辦清單（2026-03-23 更新）

### SS 驚喜站
- [ ] **/chat/lulu 和林悅說話頁「看小說」按鈕**：章節全上鎖，需與連載解鎖機制結合
- [ ] **試看文章底部**：免費章節廣告改為卡片設計「連載更新了喔來看看」or「去小舖找找驚喜？」
- [ ] **[[VIDEO]] 佔位符渲染**：chapter component 加影片 embed 邏輯
- [ ] 純文字發文測試 Threads
- [ ] Threads 連結欄位填 SS 首頁
- [ ] Spotify Podcast 上架（EP07、EP08 已上傳 Blob，待 Spotify）

### 魯魯來了連載進度
- 目前：第十三集（帶魯魯回家）已上線，publishedAt: 2026-04-11
- 下一集：第十四集「名字的由來」
- 預告鏈：10→牠們都很好/11→那雙不一樣的眼睛/12→遇見那天/13→帶魯魯回家/14→名字的由來

### SS 聊天功能
- [ ] 對話記憶（localStorage，重新整理不忘記）
- [ ] 引流優化（聊幾句後自動出現前往小舖提示）
- [ ] Navbar 加聊天入口

### SS 後台安全升級

| 優先度 | 項目 |
|--------|------|
| 中 | 建立 `/admin/login` 獨立頁面 |
| 中 | 修改 middleware 正確攔截 `/admin/*` |
| 低 | 加入 session 過期機制（目前無登出） |
| 低 | 考慮將 SS GitHub 改為 Private |

### SS 場景標籤規劃（待 CC 執行）
讓讀者知道「什麼時候來 SS 找什麼內容」：
- 🌙 睡前最佳 → 療癒系連載、靈魂探討有聲書
- 🚌 等車必聽 → 短篇 Podcast、書摘精華
- ☕ 早晨醒腦 → AI 快訊
- 💆 放空時刻 → 小說連載

### ST 小舖
- [ ] **數位商品下架邏輯**：下架前檢查最後購買日，未滿1年不可下架；超過1年可下架並清除 UserPurchase 紀錄與 Blob 檔案
- [ ] **文案修改**：「永久閱讀」→「購買後可隨時以購買 email 回溫內容，商品持續上架期間均有效」

---

## 電子書購買後使用規則 — 待確認統一定論

### 目前狀況
- 購買後顯示「連結 2 小時後過期」
- 但實測昨天下的單今天仍可開啟（需確認）

### 待辦

| 優先度 | 項目 |
|--------|------|
| 高 | 確認下載連結過期機制：2小時是什麼意思？過期後還能重新取得嗎？ |
| 高 | 統一全站規則：永久可下載 or 次數限制 or 時間限制 |
| 高 | 購買紀錄頁顯示6本但只買1本，確認是否測試資料還是真實資料 |
| 中 | 下載次數限制設定（防止分享連結） |
| 中 | 過期後重新取得連結的流程是否順暢 |
| 低 | 全站電子書購買流程 end-to-end 測試 |

---

## 電子書規劃（待 C 協助寫作架構）

**Sena 精選 AI 協作系列：**
1. 靈魂探討 — 生命的起點與終點、靈界之旅、與摯愛的連結
2. 人性探討 — 孝道與長照的現代詮釋、照顧者的心聲

---

## 🔮 長期規劃

### 魯魯環島賽車遊戲
- **概念**：魯魯開賽車環島台灣，邊跑邊看風景，遇到角色互動
- **地圖**：台北、台中、台南、墾丁、花蓮、九份等，免費解鎖台北段
- **道具系統**（在小舖購買）：
  - 🥫 罐罐 → 跑更快（消耗品 NT$30-50）
  - 🏠 貓抓板 → 裝飾賽車（NT$99-199）
  - 👒 魯魯造型帽子（NT$99-199）
  - 🌈 車身包膜（NT$199-299）
- **人物互動**：路上遇到其他貓咪角色，互相贈送罐罐，打招呼解鎖對話和故事
- **商業模式**：免費玩基本段，道具連結小舖付款，積點可兌換電子書或道具
- **優先度**：低（先把 SS 輪盤/塔羅做起來增加流量，再討論賽車遊戲）
- **魯魯角色設定**：白色英國短毛貓，藍眼睛，Sena 幫魯魯買罐罐加速，魯魯偶爾撞牆

### 作品牆升級 — 改為社群留言牆

**分類設計：**
- 📖 魯魯讀者：魯魯連載讀者留言
- 📚 連載讀者：其他連載小說讀者
- 🏎️ 賽車玩家：未來魯魯賽車遊戲玩家（預留）
- 🎵 Podcast 聽眾：每集感想
- 🛠️ 工具許願牆：功能建議、新工具需求

**許願牆特色：**
- 讀者許願功能建議，做出來後通知許願的人，建立忠實粉絲互動感

**技術需求：**
- `/wall` 頁面加分類 tab
- 每個分類有獨立留言區
- 首頁作品牆卡片更新說明文字
- 需要 CC 評估開發

**優先度：中**

---

## ⚠️ 工作協議 — 改動原則

### 🔴 大改前必須提供原始檔
當任何一個改動涉及以下情況時，**Claude 必須先索取原始檔，不可自行推斷**：

- 改動超過 30 行
- 涉及多個檔案同時修改
- 修改 API route（`/api/...`）
- 修改共用元件（`/components/...`）
- 修改資料庫操作邏輯

> ❌ 禁止行為：依據截圖、亂碼輸出、或記憶推斷原始碼內容後直接覆寫

### 📋 標準提供方式

```powershell
Get-Content "完整路徑\檔案名稱" -Encoding UTF8
```

若出現亂碼，改用：

```powershell
[System.IO.File]::ReadAllText("完整路徑\檔案名稱", [System.Text.Encoding]::UTF8)
```

### ✅ 改動流程
1. 妹描述需求
2. Claude 列出**需要哪些原始檔**
3. 妹提供原始檔內容
4. Claude 確認後才輸出修改稿
5. 妹貼上執行，本機 `npm run dev` 確認
6. 沒問題再 git push

### 📝 改動說明格式
每次改動 Claude 必須說明：
- **改了什麼**（新增 / 修改 / 刪除哪些部分）
- **沒動什麼**（確認哪些功能維持原樣）
- **可能影響範圍**（哪些頁面或功能需要一併確認）

---

## 工作習慣
- 每次完成任務後，自動確認是否有未 commit 的變更，若有則 commit 並 push 到 main（無需每次提醒）
- Claude Code session 常當掉，每次新 session 先讀此檔案
- 下次開新對話先讀 CLAUDE.md 🐱
