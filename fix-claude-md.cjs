const fs = require("fs");
const note = `
## 連載小說章節規範
每章頁面底部必須加：
<CommentSection chapterId="lulu-s-01-xx" novelId="lulu-life" />
chapterId 跟章節編號走，忘記加 = 那章沒有留言區
目前進度：第一、二集已加，第三集起新增時記得加
`;
const path = "src/CLAUDE.md";
const existing = fs.readFileSync(path, "utf8");
fs.writeFileSync(path, existing + note, "utf8");
console.log("done");
