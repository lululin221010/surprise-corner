# 驚喜角落（Surprise Corner）- 工具箱專案

## 專案狀態
- 部署在：https://surprise-corner.vercel.app（或類似網址）
- 技術：Next.js App Router，TypeScript（`.tsx`）

## 專案別名
- 驚喜 / Surprise = 本專案 `surprise-corner-src`
- 小舖 / Still = `my-bookstore-next-V2`（書店專案，部署於 https://still-time-corner.vercel.app）

## 技術架構
- Next.js App Router
- TypeScript（`.tsx`）
- 部署：Vercel
- 環境變數：`GROQ_API_KEY`（Groq Whisper 語音辨識）

## ✅ 已完成功能

### 工具箱（/tools）
- 現有工具入口頁：`src/app/tools/page.tsx`
- **文字工具**（先前已有）
- **媒體工具**（新增）：
  - 🎙️ 音訊轉文字：`src/app/tools/audio-to-text/page.tsx` + `src/app/api/tools/audio-to-text/route.ts`
    - 使用 Groq Whisper Large V3 Turbo
    - 支援 mp3、mp4、wav、m4a，最大 25MB
  - 🖼️ 圖片加浮水印：`src/app/tools/watermark/page.tsx`
    - 純前端 Canvas，支援 6 種位置 + 平鋪
  - 🪪 證件照製作：`src/app/tools/id-photo/page.tsx`
    - 純前端 Canvas，4 種尺寸、4 種背景色、拖移調整位置

### 電子書促銷
- `src/components/AIBookPromo.tsx` — 電子書促銷元件
  - 免費預覽連結：`/ebook/ai-ebook-free.html`（新分頁）
  - 購買按鈕：`https://still-time-corner.vercel.app/digital`
- `src/app/ai-news/page.tsx` — 頁面底部引入 `<AIBookPromo />`
- `public/ebook/` — 電子書 HTML 檔案
  - `ai-ebook-free.html`（免費預覽）
  - `ai-ebook-full.html`（完整版）
  - `ai-ebook-epub.html`（EPUB 來源）

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

### 連載小說（/novels）
- 小說列表：`src/data/novels.json`
- 章節資料：`src/data/chapters.json`（lulu-diary / the-last-signal）
- 動態路由：`src/app/novels/[novelId]/page.tsx`
- **靈魂的轉運站（soul-journey）** — 新增（2026-03-13）
  - 獨立章節元件：`src/app/novels/soul-journey/chapter-1.tsx`（isLocked 參數控制加鎖）
  - 頁面路由：`src/app/novels/soul-journey/chapter-1/page.tsx`（URL：/novels/soul-journey/chapter-1）
  - 第一章為免費，後續章節可設 `isLocked={true}` 加鎖導流至小舖
  - 已加入 `novels.json`（id: soul-journey）

### Ko-fi 贊助（/podcast 頁底部）
- 連結：https://ko-fi.com/surprisecorner
- **Stripe 台灣收款不支援（已測試無法設定）**
- 目前建議改為 PayPal 模式（Ko-fi Settings → Payments → 改接 PayPal）
- PayPal 目前帳號有限制，待解除後再開通 Ko-fi PayPal 模式

---

## Vercel Blob 儲存
- Podcast MP3 儲存於：`https://88lwhikbeo2pkibc.public.blob.vercel-storage.com/podcast/`
- Token：`BLOB_READ_WRITE_TOKEN`（設定於 Vercel 環境變數）
- 方案：Hobby 512MB 免費，目前已用 ~115MB

---

## 環境變數
- `GROQ_API_KEY`：Groq API 金鑰（以 `gsk_` 開頭），已設定於 Vercel
- `BLOB_READ_WRITE_TOKEN`：Vercel Blob 讀寫 Token，已設定於 Vercel

## 工作習慣
- 每次完成任務後，自動確認是否有未 commit 的變更，若有則 commit 並 push 到 main（無需每次提醒）
- Claude Code session 常當掉，每次新 session 先讀此檔案