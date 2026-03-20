const fs = require("fs");
let c = fs.readFileSync("src/app/layout.tsx", "utf8");

// 1. 按鈕文字
c = c.replace("☕ 請我喝杯咖啡", "🥫 請魯魯吃罐罐");

// 2. 說明文字
c = c.replace(
  "① 點按鈕 &nbsp;→&nbsp; {' '}\n  <a href=\"https://line.me/R/ti/p/@983agawb\" target=\"_blank\" rel=\"noopener noreferrer\"\n    style={{ color: '#06c755', textDecoration: 'underline' }}>\n    加入 LINE 好友\n  </a>\n  &nbsp;→&nbsp; ③ 私訊「請喝咖啡」取得轉帳資訊 感謝打賞支持",
  "① 點按鈕 &nbsp;→&nbsp; {' '}\n  <a href=\"https://line.me/R/ti/p/@983agawb\" target=\"_blank\" rel=\"noopener noreferrer\"\n    style={{ color: '#06c755', textDecoration: 'underline' }}>\n    加入 LINE 好友\n  </a>\n  &nbsp;→&nbsp; ③ 私訊「請魯魯吃罐罐」取得轉帳資訊 魯魯謝您支持 🐱"
);

fs.writeFileSync("src/app/layout.tsx", c, "utf8");
console.log(c.includes("請魯魯吃罐罐"));
