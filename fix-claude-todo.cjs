const fs = require("fs");
const note = `

## SS 後台安全升級 — 待辦
| 優先度 | 項目 |
|--------|------|
| 中 | 建立 /admin/login 獨立頁面 |
| 中 | 修改 middleware 正確攔截 /admin/* |
| 低 | 加入 session 過期機制（目前無登出） |
| 低 | 考慮將 SS GitHub 改為 Private |
`;
const path = "src/CLAUDE.md";
const existing = fs.readFileSync(path, "utf8");
fs.writeFileSync(path, existing + note, "utf8");
console.log("done");
