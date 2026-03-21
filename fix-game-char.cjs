const fs = require("fs");
const note = `

## 魯魯賽車角色設定
- 主角：魯魯（白色英國短毛貓，藍眼睛）
- 夥伴：Sena（魯魯的主人）
- 互動：Sena 幫魯魯買罐罐加速，魯魯偶爾撞牆（呼應連載故事）
- 與連載小說串聯，增加粉絲黏著度
`;
const path = "src/CLAUDE.md";
const existing = fs.readFileSync(path, "utf8");
fs.writeFileSync(path, existing + note, "utf8");
console.log("done");
