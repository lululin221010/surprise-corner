const fs = require("fs");
const note = `

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
`;
const path = "src/CLAUDE.md";
const existing = fs.readFileSync(path, "utf8");
fs.writeFileSync(path, existing + note, "utf8");
console.log("done");
