# 驚喜角落（Surprise Corner）- 工具箱專案

## 專案狀態
- 部署在：https://surprise-corner.vercel.app
- 技術：Next.js App Router，TypeScript（`.tsx`）

## 專案別名
- 驚喜 / Surprise = 本專案 `surprise-corner-src`
- 小舖 / Still = `my-bookstore-next-V2`（書店專案，部署於 https://still-time-corner.vercel.app）

## 技術架構
- Next.js App Router
- TypeScript（`.tsx`）
- 部署：Vercel
- 環境變數：`GROQ_API_KEY`（Groq Whisper 語音辨識）

---

## ✅ 已完成功能

### 工具箱（/tools）
- 現有工具入口頁：`src/app/tools/page.tsx`
- **文字工具**（先前已有）
- **媒體工具**：
  - 🎙️ 音訊轉文字：`src/app/tools/audio-to-text/page.tsx` + `src/app/api/tools/audio-to-text/route.ts`
    - 使用 Groq Whisper Large V3 Turbo
    - 支援 mp3、mp4、wav、m4a，最大 25MB
  - 🖼️ 圖片加浮水印：`src/app/tools/watermark/page.tsx`（純前端 Canvas，6 種位置 + 平鋪）
  - 🪪 證件照製作：`src/app/tools/id-photo/page.tsx`（純前端 Canvas，4 種尺寸、4 種背景色）

### 電子書促銷
- `src/components/AIBookPromo.tsx` — 電子書促銷元件
  - 免費預覽連結：`/ebook/ai-ebook-free.html`（新分頁）
  - 購買按鈕：`https://still-time-corner.vercel.app/digital`
- `src/app/ai-news/page.tsx` — 頁面底部引入 `<AIBookPromo />`
- `public/ebook/` — 電子書 HTML 檔案：`ai-ebook-free.html`、`ai-ebook-full.html`、`ai-ebook-epub.html`

### Podcast（/podcast）
- 頁面：`src/app/podcast/page.tsx`
- 集數資料直接寫在 `page.tsx` 的 `EPISODES` 陣列
- 音頻儲存於 **Vercel Blob**（`88lwhikbeo2pkibc.public.blob.vercel-storage.com/podcast/`）
- 嵌入式 `AudioPlayer` 元件：進度條可點擊跳轉、播放/暫停、時間顯示、音波動畫
- **目前已上傳 6 集（~115MB，Hobby 方案 512MB 上限，剩約 400MB）：**
  - ep01-surprise-corner-intro.mp3（AI 驚喜與兔崽子書店）
  - ep02-side-hustle-map.mp3（上班族低風險副業實戰地圖）
  - ep03-taiwan-stock.mp3（台股紅綠燈：戰勝投資心魔）
  - ep04-ai-loneliness.mp3（AI 從打字停頓讀懂你的孤獨）
  - ep05-taipei-ruin.mp3（台北廢墟收到的太空求救）
  - ep06-ai-film.mp3（用 AI 一人拍大片）
- **新增集數流程：**
  1. 用 NotebookLM 生成語音摘要 → 下載 m4a → 用 cloudconvert.com 轉 mp3
  2. 用 `upload-podcasts.mjs`（小舖專案根目錄）或後台上傳到 Vercel Blob
  3. 在 `EPISODES` 陣列新增一筆，填入 `audioUrl`（`${BASE}/ep0X-xxx.mp3`）
- Podcast 開場腳本原則：
  - 只用書籍前 1/3 內容，不爆雷
  - 結尾導流到小舖：`still-time-corner.vercel.app`
  - 已完成五本書腳本（台股紅綠燈、斜槓致富方程式、影音AI工具完全指南、最後的信號、Lulu的日記）

### 連載小說（/novels）— 2026-03 大幅更新
- 小說列表：`src/data/novels.json`
- 章節資料：`src/data/chapters.json`
- 動態路由：`src/app/novels/[novelId]/page.tsx`（簡介/封面頁）
- **統一電子書閱讀器**：`src/app/novels/[novelId]/ebook/page.tsx`（所有小說共用）
  - 左側 TOC（目錄）
  - 免費章節直接顯示，付費章節顯示鎖定 + 導流至 ST 購買
  - 字體優化（2026-03）：
    - `.chapter-paragraph`：1.12rem，color #d8cebb
    - `.chapter-heading`：font-weight 500，color #f0e4d0
    - `.toc-row`：0.95rem，color #a89880
    - `.cover-desc`：1rem，color #a89880

#### 小說列表（novels.json）
| id | 書名 | 狀態 | previewChapters | shopUrl |
|----|------|------|-----------------|---------|
| soul-journey | 靈魂的轉運站 | 完結 | 3 | ST /digital |
| the-last-signal | 最後的信號 | 連載中 | 3 | ST /digital |
| lulu-diary | Lulu 的日記 | 連載中 | 3 | ST /digital |
| slash-rich | 斜槓致富方程式 | 已完結 | 3 | ST /digital |
| stock-signal | 台股紅綠燈 2026 | 已完結 | 3 | ST /digital |
| ai-tools-guide | 影音 AI 工具完全指南 | 已完結 | 3 | ST /digital |

#### chapters.json 章節命名規則
- soul-journey：`soul-s-01-01` ～ `soul-s-10-03`（共 30 節，10 章 × 3 節）
  - 前 3 節（soul-s-01-01/02/03）`isFree: true`，其餘 `isFree: false`
- the-last-signal / lulu-diary：各自獨立命名

#### novels/page.tsx UX（2026-03 更新）
- 連載小說區：卡片連結直接到 `/novels/${id}/ebook`（不過渡頁）
- 試看區：每本書兩個按鈕
  - 👀 看看喜不喜歡 → `/novels/${id}/ebook`
  - NT$XXX 購買完整版 ↗ → ST `/digital`
- 試讀頁（ebook/page.tsx）底部固定 CTA：
  - 喜歡這個故事？→「前往小舖購買完整版 →」+「繼續逛驚喜站 →」
  - PDF 下載按鈕已移除（改由 ST 管理）

### 資料修復（2026-03）
- `chapters.json`：移除 10 筆空白重複章節條目（soul-journey 舊版 chapter-1 ~ soul-ch10）
- `chapters.json`：soul-s-02-01/02/03 的 `isFree: true` → `false`（只有第一章前 3 節免費）
- `novels.json`：soul-journey `status` 連載中 → 完結，移除 `scheduleNote`，`previewChapters` → 3

---

## Vercel Blob 儲存
- Podcast MP3 儲存於：`https://88lwhikbeo2pkibc.public.blob.vercel-storage.com/podcast/`
- Token：`BLOB_READ_WRITE_TOKEN`（設定於 Vercel 環境變數）
- 方案：Hobby 512MB 免費，目前已用 ~115MB

---

## 環境變數
- `GROQ_API_KEY`：Groq API 金鑰（以 `gsk_` 開頭），已設定於 Vercel
- `BLOB_READ_WRITE_TOKEN`：Vercel Blob 讀寫 Token，已設定於 Vercel

---

## 💳 金流決策（2026-03-15 確認）

### 最終方案：LINE 私訊 + 銀行轉帳（零手續費）
- 不串接任何第三方金流
- 買家點按鈕 → 加 LINE → 私訊給銀行帳號 → 轉帳

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

### 驚喜站 Footer
- ☕ 咖啡按鈕已從 Ko-fi 改為 LINE 官方帳號
- LINE：https://line.me/R/ti/p/@983agawb
- 說明文字：點擊按鈕 → 加入 LINE → 私訊取得轉帳資訊

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

## 工作習慣
- 每次完成任務後，自動確認是否有未 commit 的變更，若有則 commit 並 push 到 main（無需每次提醒）
- Claude Code session 常當掉，每次新 session 先讀此檔案
