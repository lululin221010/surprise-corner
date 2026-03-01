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

## 環境變數
- `GROQ_API_KEY`：Groq API 金鑰（以 `gsk_` 開頭），已設定於 Vercel

## 工作習慣
- 每次完成任務後，自動確認是否有未 commit 的變更，若有則 commit 並 push 到 main（無需每次提醒）
- Claude Code session 常當掉，每次新 session 先讀此檔案
