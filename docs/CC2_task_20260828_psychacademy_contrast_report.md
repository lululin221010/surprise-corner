# CC2 任務完成報告｜修正 PsychAcademy.tsx 低對比配色問題

> 完成日期：2026-08-28　執行者：CC2
> 目標檔案：`src/app/classroom/psychology/PsychAcademy.tsx`
> 分支：`claude/psychacademy-contrast-fix-pvmk18`

## 顏色改動統計

| 找到的顏色 | 出現次數 | 改成 | 實際改動處數 |
|---|---|---|---|
| `#e2e8f0` | 9 | `#1e1b4b` | 9（全改） |
| `#94a3b8` | 5 | `#6b7280` | 5（全改） |
| `#64748b` | 11 | `#6b7280` | 11（全改） |
| `#475569` | 7 | `#6b7280` | 7（全改） |
| `#a78bfa` | 8 | `#5b21b6` | 8（全改） |
| `#c4b5fd` | 1 | `#5b21b6` | 1（全改） |
| `#fff` | 9 | 視情況 | 3 改、6 保留 |

以上 6 種「一律是文字顏色」的顏色，實際出現次數與 task 文件參考值完全一致，全部依規則改色，未跳過任何一處。

## `#fff` 逐一判斷（9 處全部列出）

| 行號 | 情境 | 判斷 | 結果 |
|---|---|---|---|
| 70 | `CertPage` LINE 按鈕，`background: '#00B900'`（純綠色實色按鈕） | 彩色按鈕上的白字 | **保留 `#fff`** |
| 160 | `FreeDonePage` 解鎖按鈕，`background: '#7c3aed'`（純紫色實色按鈕） | 彩色按鈕上的白字 | **保留 `#fff`** |
| 172 | `FreeDonePage` 轉帳購買按鈕，`background: 'linear-gradient(135deg, #7c3aed, #2563eb)'`（紫藍漸層） | 彩色按鈕上的白字 | **保留 `#fff`** |
| 439 | 組別列表頁 `<h2>{book.title}</h2>` 標題，該 `style={{}}` 物件內沒有設定 `background` | 標題文字、旁邊沒有彩色背景，是真正的低對比 bug | **改成 `#1e1b4b`** |
| 541 | 書本列表頁 `<h2>{series.label}</h2>` 標題，該 `style={{}}` 物件內沒有設定 `background` | 同上，標題文字無彩色背景 | **改成 `#1e1b4b`** |
| 576 | 書本列表頁解鎖按鈕，`background: '#7c3aed'`（純紫色實色按鈕） | 彩色按鈕上的白字 | **保留 `#fff`** |
| 583 | 書本列表頁轉帳購買按鈕，`background: 'linear-gradient(135deg, #7c3aed, #2563eb)'`（紫藍漸層） | 彩色按鈕上的白字 | **保留 `#fff`** |
| 642 | 學系列表首頁 `<h1>心理學書院</h1>` 標題，該 `style={{}}` 物件內沒有設定 `background` | 標題文字、旁邊沒有彩色背景，是真正的低對比 bug | **改成 `#1e1b4b`** |
| 697 | 學系列表首頁底部 CTA 轉帳購買按鈕，`background: 'linear-gradient(135deg, #7c3aed, #2563eb)'`（紫藍漸層） | 彩色按鈕上的白字 | **保留 `#fff`** |

結論：9 處 `#fff` 中，3 處（439、541、642）是三個層級頁面的主標題 `<h2>`/`<h1>`，本身沒有彩色背景（外層是透明/`rgba(255,255,255,0.04)` 卡片背景或無背景），確實是低對比 bug，已改成 `#1e1b4b`；其餘 6 處都是彩色實色或漸層按鈕上的白字，本來對比度就足夠，予以保留。**沒有遇到判斷不了、需要跳過的情況。**

## npm run build 結果

執行 `npm install` 後跑 `npm run build`：
- Turbopack 編譯：`✓ Compiled successfully in 24.6s`
- TypeScript 檢查：通過（無型別錯誤）
- 到「Collecting page data」階段時失敗，錯誤訊息為：
  ```
  ❌ MONGODB_URI 環境變數未設定
  Error: 缺少環境變數 MONGODB_URI，請在 .env.local 設定
  Error: Failed to collect page data for /api/chat
  ```

**已驗證這是既有問題、與本次改動無關**：用 `git stash` 暫存本次改動後，在乾淨的程式碼上重跑 `npm run build`，出現完全相同的錯誤（同一支 `/api/chat` route 因缺少 `MONGODB_URI` 環境變數而在 build 階段收集頁面資料失敗）。這個 sandbox 環境沒有設定 `.env.local`，是環境變數缺失問題，不是本次顏色改動造成的新錯誤。編譯（Compile）與 TypeScript 檢查兩個階段都成功，證明本次改動沒有語法或型別錯誤。

（另外，`npm install` 過程中 `package-lock.json` 產生了無關的微小變動，已用 `git checkout -- package-lock.json` 還原，未納入本次 commit。）

## 分支

`claude/psychacademy-contrast-fix-pvmk18`

## 跳過 / 不確定的地方

無。本次所有顏色（含 9 處 `#fff`）皆已依規則明確判斷處理完畢，沒有遺漏或不確定需要人工複查的項目。
