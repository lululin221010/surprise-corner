const fs = require("fs");
const note = `

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
`;
const path = "src/CLAUDE.md";
const existing = fs.existsSync(path) ? fs.readFileSync(path, "utf8") : "";
fs.writeFileSync(path, existing + note, "utf8");
console.log("done");
