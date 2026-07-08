// scripts/insert-s7-s9-images.mjs
// 把S7入門/S7進階/S9入門冊裡的[圖X：描述]文字佔位符，換成真正的markdown圖片語法
// 執行：node scripts/insert-s7-s9-images.mjs

import fs from 'fs';

const EDIR = 'C:/Users/user/Desktop/有的沒的小舖/驚喜樂世界/驚喜學院/AI書院/電子書';

function insertImages(fileName, prefix) {
  const path = `${EDIR}/${fileName}.md`;
  let content = fs.readFileSync(path, 'utf8');
  let seq = 0;

  // 純粹依照[圖X：...]在檔案裡由上到下出現的順序編號，不依賴章節標題偵測（避免中文數字/阿拉伯數字混用導致對不齊）
  content = content.replace(/\\?\[圖[A-Z][：:]([^\]]*)\]/g, (match, desc) => {
    seq += 1;
    const imgName = `${prefix}-fig${String(seq).padStart(2, '0')}`;
    return `![${desc.trim()}](figures/${imgName}.svg)`;
  });

  fs.writeFileSync(path, content, 'utf8');
  console.log(`${fileName}: 完成，共替換 ${seq} 張圖`);
}

insertImages('S7入門冊《免費工具做自己的AI》', 's7intro');
insertImages('S7進階冊《自架本地AI入門》', 's7adv');
insertImages('S9入門冊《機器人是怎麼動的》', 's9intro');
