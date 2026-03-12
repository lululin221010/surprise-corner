# 驚喜角落（Surprise Corner）- 專案文件

## 專案狀態
- 部署在：https://surprise-corner.vercel.app
- 技術：Next.js App Router，TypeScript（`.tsx`）

## 專案別名
- 驚喜 / Surprise = 本專案 `surprise-corner-src`
- 小舖 / Still = `my-bookstore-next-V2`（部署於 https://still-time-corner.vercel.app）

## 技術架構
- Next.js App Router
- TypeScript（`.tsx`）
- 部署：Vercel
- 環境變數：`GROQ_API_KEY`（Groq Whisper 語音辨識 + 角色聊天）

## ✅ 已完成功能

### 工具箱（/tools）
- 入口頁：`src/app/tools/page.tsx`
- 音訊轉文字：`src/app/tools/audio-to-text/page.tsx` + `src/app/api/tools/audio-to-text/route.ts`
  - 使用 Groq Whisper Large V3 Turbo，支援 mp3/mp4/wav/m4a，最大 25MB
- 圖片加浮水印：`src/app/tools/watermark/page.tsx`（純前端 Canvas）
- 證件照製作：`src/app/tools/id-photo/page.tsx`（純前端 Canvas）

### 電子書促銷
- `src/components/AIBookPromo.tsx` — 促銷元件，引入於 AI 快訊頁底部
- `public/ebook/` — ai-ebook-free.html / ai-ebook-full.html / ai-ebook-epub.html

### Podcast（/podcast）
- 頁面：`src/app/podcast/page.tsx`
- 集數資料寫在 `EPISODES` 陣列（episodes.json 目前未使用）
- 音頻使用 **NotebookLM 分享連結**，不上傳音檔，無 Vercel 容量問題
- 新增集數流程：
  1. NotebookLM 上傳書籍前 1/3 內容
  2. 新增記事寫限制指令（只介紹前幾章，結尾導流小舖）
  3. 生成語音摘要 → 分享 → 複製連結
  4. EPISODES 陣列新增一筆，填入 notebooklmUrl
- 已完成五本書開場腳本（台股紅綠燈、斜槓致富方程式、影音AI工具完全指南、最後的信號、Lulu的日記）
- 腳本原則：只用前 1/3，不爆雷，結尾導流 still-time-corner.vercel.app

### 角色聊天
- API：`src/app/api/chat/route.ts`（Groq llama-3.3-70b-versatile）
- 角色清單（CHARACTERS 物件）：
  - `lulu` 🐱：來自《Lulu的日記》→ `/chat/lulu`
  - `signal` 📡：來自《最後的信號》→ `/chat/signal`
- 入口：首頁探索卡片 + 各小說頁面按鈕
- 新本小說上線 → CHARACTERS 加一筆 + 新建頁面
- 小說正確路徑：`/novels/lulu-diary`、`/novels/the-last-signal`

### 待做（聊天功能）
- [ ] 對話記憶（localStorage，重新整理不忘記）
- [ ] 引流優化（聊幾句後自動出現前往小舖提示）
- [ ] Navbar 加聊天入口

## 小說資料
- `src/data/novels.json` id：`the-last-signal`、`lulu-diary`
- `src/data/chapters.json`：isFree=true 為免費章節

## 工作習慣
- 每次完成任務後自動 commit + push main
- Claude Code session 常當掉，每次新 session 先讀此檔案
- 專案別名：驚喜 / Surprise = `surprise-corner-src`，小舖 / Still = `my-bookstore-next-V2`