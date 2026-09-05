# 驚喜角落（Surprise Corner）- 專案文件

## 專案狀態
- 部署在：https://surprise-corner.vercel.app
- 技術：Next.js App Router，TypeScript（`.tsx`）

## 代號系統
- **SS** = 驚喜角落 `surprise-corner-src`
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

### ⚠️ 工具箱（已於2026-06-09移除，2026-09-05發現文件未同步更新）
`/tools`及其子頁已在commit `1dd1eec`中全數刪除，程式碼不存在。詳見[[project_ss_stale_docs_after_20260609_refactor_20260905]]。

### 電子書促銷
- `src/components/AIBookPromo.tsx` — 促銷元件，引入於 AI 快訊頁底部
- `public/ebook/` — ai-ebook-free.html / ai-ebook-full.html / ai-ebook-epub.html

### ⚠️ Podcast（已於2026-06-09移除，2026-09-05發現文件未同步更新）
`/podcast` 頁面已在commit `1dd1eec`（整理舊頁面重構）中刪除，程式碼不存在，此段原內容已過時。MP3音檔仍在Vercel Blob，頁面沒了。

### ⚠️ 角色聊天（2026-03新增，2026-06-09重構受影響，2026-09-05修復+重新盤點）
- API：`src/app/api/chat/route.ts` 仍存在且可用
- `/chat/lulu`：正確位置的檔案曾在2026-06-09被刪，但有一份誤放在`src/app/api/chat/lulu/page.tsx`的重複檔案存活下來（Next.js照樣渲染，只是URL變成沒人知道的`/api/chat/lulu`）。2026-09-05已搬回正確路徑`src/app/chat/lulu/page.tsx`，並修正頁內連到不存在`/novels/lulu`的按鈕，改為正確的`/novels/lulu-diary`
- `/chat/signal`：2026-06-09真的刪除，沒有備份，要用需重寫
- **入口仍是缺口**：`src/components/CoffeeCorner.js`是寫好的「和默默聊聊/和林悅說說話」進入按鈕元件，但沒有任何頁面import它，Navbar也一直沒接（見下方待做清單早就列著），所以就算`/chat/lulu`修好了，現在網站上還是沒人點得進去

### 待做（聊天功能）
- [ ] 決定要不要把`CoffeeCorner`重新接回某頁面（例如`/feeling`），或整條功能線判定不值得維護
- [ ] 若要保留，`/chat/signal`需要重寫（原檔已不可考）
- [ ] 對話記憶（localStorage，重新整理不忘記）
- [ ] 引流優化（聊幾句後自動出現前往小舖提示）

### 二手市集（/secondhand）（2026-03 新增）
- 商業模式：
  - 親友首件免費刊登一個月（促銷開站）
  - 一般刊登收費（NT$100–300，視件數/時間方案）
  - 買賣雙方自行聯絡，平台只提供廣告刊登
  - VIP 會員：刊登時間或件數增加
  - VIP 機器人：協助廣告介紹與推薦
- 
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

# 工作協議 — 改動原則

## 🔴 大改前必須提供原始檔

當任何一個改動涉及以下情況時，**Claude 必須先索取原始檔，不可自行推斷**：

- 改動超過 30 行
- 涉及多個檔案同時修改
- 修改 API route（`/api/...`）
- 修改共用元件（`/components/...`）
- 修改資料庫操作邏輯

> ❌ 禁止行為：依據截圖、亂碼輸出、或記憶推斷原始碼內容後直接覆寫

---

## 📋 標準提供方式

請用以下 PowerShell 指令取得原始檔內容後貼給 Claude：

```powershell
Get-Content "完整路徑\檔案名稱" -Encoding UTF8
```

若出現亂碼，改用：

```powershell
[System.IO.File]::ReadAllText("完整路徑\檔案名稱", [System.Text.Encoding]::UTF8)
```

---

## ✅ 改動流程

1. 妹描述需求
2. Claude 列出**需要哪些原始檔**
3. 妹提供原始檔內容
4. Claude 確認後才輸出修改稿
5. 妹貼上執行，本機 `npm run dev` 確認
6. 沒問題再 git push

---

## 📝 改動說明格式

每次改動 Claude 必須說明：

- **改了什麼**（新增 / 修改 / 刪除哪些部分）
- **沒動什麼**（確認哪些功能維持原樣）
- **可能影響範圍**（哪些頁面或功能需要一併確認）

---

## 🗂 專案路徑速查

| 專案 | 路徑 |
|------|------|
| 驚喜角落 | `C:\Users\user\Desktop\MyProjects01\surprise-corner-src` |
| 小舖 | `C:\Users\user\Desktop\MyProjects01\my-bookstore-next-V2` |

## 連載小說章節規範
每章頁面底部必須加：
<CommentSection chapterId="lulu-s-01-xx" novelId="lulu-life" />
chapterId 跟章節編號走，忘記加 = 那章沒有留言區
目前進度：第一、二集已加，第三集起新增時記得加


## SS 後台安全升級 — 待辦
| 優先度 | 項目 |
|--------|------|
| 中 | 建立 /admin/login 獨立頁面 |
| 中 | 修改 middleware 正確攔截 /admin/* |
| 低 | 加入 session 過期機制（目前無登出） |
| 低 | 考慮將 SS GitHub 改為 Private |


## 電子書購買後使用規則 — 待確認統一定論

### 目前狀況
- 購買後顯示「連結 2 小時後過期」
- 但實測昨天下的單今天仍可開啟（需確認）

### 待辦（重要）
| 優先度 | 項目 |
|--------|------|
| 高 | 確認下載連結過期機制：2小時是什麼意思？過期後還能重新取得嗎？ |
| 高 | 統一全站規則：永久可下載 or 次數限制 or 時間限制 |
| 高 | 購買紀錄頁顯示6本但只買1本，確認是否測試資料還是真實資料 |
| 中 | 下載次數限制設定（防止分享連結） |
| 中 | 過期後重新取得連結的流程是否順暢 |
| 低 | 全站電子書購買流程 end-to-end 測試 |


## 魯魯賽車角色設定
- 主角：魯魯（白色英國短毛貓，藍眼睛）
- 夥伴：Sena（魯魯的主人）
- 互動：Sena 幫魯魯買罐罐加速，魯魯偶爾撞牆（呼應連載故事）
- 與連載小說串聯，增加粉絲黏著度


## 魯魯環島賽車遊戲計畫

### 概念
魯魯開賽車環島台灣，邊跑邊看風景，遇到角色互動

### 地圖
- 台北、台中、台南、墾丁、花蓮、九份等
- 免費解鎖台北段
- 其他地點積點或付費解鎖

### 道具系統（在小舖購買）
- 🥫 罐罐 → 跑更快（消耗品 NT$30-50）
- 🏠 貓抓板 → 裝飾賽車（NT$99-199）
- 👒 魯魯造型帽子（NT$99-199）
- 🌈 車身包膜（NT$199-299）

### 人物互動
- 路上遇到其他貓咪角色
- 互相贈送罐罐
- 打招呼解鎖對話和故事

### 商業模式
- 免費玩基本段
- 道具連結小舖付款
- 積點可兌換電子書或道具

### 技術需求
- 網頁版簡單賽車遊戲
- 虛擬道具系統
- 連結小舖付款
- 需要 cc 評估開發可行性

### 優先度
- 低（長期目標）
- 先把 SS 輪盤/塔羅做起來增加流量
- 再討論賽車遊戲


## 作品牆升級計畫 — 改為社群留言牆

### 分類設計
- 📖 魯魯讀者：魯魯連載讀者留言
- 📚 連載讀者：其他連載小說讀者
- 🏎️ 賽車玩家：未來魯魯賽車遊戲玩家（預留）
- 🎵 Podcast 聽眾：每集感想
- 🛠️ 工具許願牆：功能建議、新工具需求

### 許願牆特色
- 讀者許願功能建議
- 做出來後通知許願的人
- 建立忠實粉絲互動感

### 技術需求
- /wall 頁面加分類 tab
- 每個分類有獨立留言區
- 首頁作品牆卡片更新說明文字
- 需要 cc 評估開發

### 優先度：中

Spotify 上架 Podcast 用 Spotify for Podcasters：
podcasters.spotify.com
免費，上傳 MP3 就好，SS 的音檔都已經有了 ✅

今天完成事項：

✅ CommentSection 改用 novelId 統一留言區
✅ MongoDB 舊留言批次更新
✅ Threads 帳號確認公開
✅ IG/Threads 第二則文案準備好

待完成：

 純文字發文測試 Threads
 Threads 連結欄位填 SS 首頁
 Spotify Podcast 上架
 git push（CommentSection 修改還沒 push！）

記得先 push！
powershellgit add .
git commit -m "fix: CommentSection 改用 novelId 統一留言區"
git push
下次開新對話先讀 CLAUDE.md 🐱
