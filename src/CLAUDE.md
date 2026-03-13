# 驚喜角落（Surprise Corner）- 專案文件

## 專案狀態
- 部署在：https://surprise-corner.vercel.app
- 技術：Next.js App Router，TypeScript（`.tsx`）

## 代號系統
- **SS** = 驚喜站 `surprise-corner-src`
- **ST** = 小舖 `my-bookstore-next-V2`
- **CC** = Claude Code（終端機 AI 工程師）
- **C** = Claude（網頁版 AI 策略顧問）

## 專案別名
-驚喜 / Surprise = 本專案 `surprise-corner-src`
-小舖 / Still = `my-bookstore-next-V2`（部署於 https://still-time-corner.vercel.app）

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
- 音頻使用 **Vercel Blob 儲存 MP3**，上傳後取得 URL 填入 EPISODES
- Ko-fi 贊助連結整合於 Podcast 頁面
- 新增集數流程：
  1. NotebookLM 上傳書籍前 1/3 內容
  2. 新增記事寫限制指令（只介紹前幾章，結尾導流小舖）
  3. 生成語音摘要 → 下載 m4a → cloudconvert.com 轉 mp3
  4. 上傳 MP3 到 Vercel Blob → 取得 URL
  5. EPISODES 陣列新增一筆，填入 audioUrl
- 已完成六集（台股紅綠燈、斜槓致富方程式、影音AI工具完全指南、最後的信號、Lulu的日記 + 1集）
- 腳本原則：只用前 1/3，不爆雷，結尾導流 still-time-corner.vercel.app

### 角色聊天（2026-03 新增）
- API：`src/app/api/chat/route.ts`（Groq llama-3.3-70b-versatile，max_tokens 200，temperature 0.85）
- 角色清單（route.ts 的 CHARACTERS 物件）：
  - `lulu` 🐱：來自《Lulu的日記》→ `/chat/lulu`，紫色主題，溫柔細膩
  - `signal` 📡：來自《最後的信號》→ `/chat/signal`，藍色主題，廢土滄桑感
- 入口位置：首頁探索卡片 + 各小說頁面按鈕
- 新本小說上線 → CHARACTERS 加一筆 + 新建對應頁面
- 小說正確路徑：`/novels/lulu-diary`、`/novels/the-last-signal`

### 待做（聊天功能）
- [ ] 對話記憶（localStorage，重新整理不忘記）
- [ ] 引流優化（聊幾句後自動出現前往小舖提示）
- [ ] Navbar 加聊天入口

### 關鍵檔案（角色聊天）
- `src/app/api/chat/route.ts` - 聊天 API，含所有角色 system prompt
- `src/app/chat/lulu/page.tsx` - Lulu 聊天頁面
- `src/app/chat/signal/page.tsx` - 林悅聊天頁面

### 二手市集（/secondhand）（2026-03 新增）
- 商業模式：
  - 親友首件免費刊登一個月（促銷開站）
  - 一般刊登收費（NT$100–300，視件數/時間方案）
  - 買賣雙方自行聯絡，平台只提供廣告刊登
  - VIP 會員：刊登時間或件數增加
  - VIP 機器人：協助廣告介紹與推薦
- [ ] 確認按摩器上架是否成功（2026-03-13 待確認）
- 未來規劃：流量足夠後考慮獨立為專屬網站

## 🔲 待完成功能

### SS 場景標籤規劃（待 CC 執行）
讓讀者知道「什麼時候來 SS 找什麼內容」：
- 🌙 **睡前最佳** → 療癒系連載、靈魂探討有聲書
- 🚌 **等車必聽** → 短篇 Podcast、書摘精華
- ☕ **早晨醒腦** → AI 快訊
- 💆 **放空時刻** → 小說連載

### 電子書規劃（待 C 協助寫作架構）
Sena 精選 AI 協作系列：
1. **靈魂探討** — 生命的起點與終點、靈界之旅、與摯愛的連結
2. **人性探討** — 孝道與長照的現代詮釋、照顧者的心聲

## 小說資料
- `src/data/novels.json` id：`the-last-signal`、`lulu-diary`
- `src/data/chapters.json`：isFree=true 為免費章節

## 工作習慣
- 每次完成任務後自動 commit + push main
- Claude Code session 常當掉，每次新 session 先讀此檔案
