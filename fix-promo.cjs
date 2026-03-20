const fs = require("fs");
let c = fs.readFileSync("src/components/AIBookPromo.tsx", "utf8");
c = c.replace(
  "PDF + EPUB · 永久使用 · PayPal / 銀行轉帳",
  "PDF · 永久使用 · 銀行轉帳"
);
c = c.replace(
  "'完整8章 15,000字',\n            'PDF 精美排版版',\n            'EPUB 電子閱讀器版',\n            '50+ Prompt範例',\n            '下載後永久使用',",
  "'完整8章 15,000字',\n            'PDF 精美排版版',\n            '50+ Prompt範例',\n            '下載後永久使用',"
);
fs.writeFileSync("src/components/AIBookPromo.tsx", c, "utf8");
console.log(c.includes("PayPal"));
