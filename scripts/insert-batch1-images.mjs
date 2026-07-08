// scripts/insert-batch1-images.mjs
// 批次1：把C標記好的[圖X：描述]換成真正的markdown圖片語法，來源在「新增資料夾」，輸出覆蓋回電子書正式檔
// 執行：node scripts/insert-batch1-images.mjs

import fs from 'fs';

const EDIR = 'C:/Users/user/Desktop/有的沒的小舖/驚喜樂世界/驚喜學院/AI書院/電子書';
const SRC = `${EDIR}/新增資料夾`;

function insertImages(srcFileName, destFileName, prefix) {
  const srcPath = `${SRC}/${srcFileName}`;
  const destPath = `${EDIR}/${destFileName}.md`;

  // 備份現有無圖版本
  if (fs.existsSync(destPath)) {
    fs.copyFileSync(destPath, `${EDIR}/${destFileName}_noimg_backup_20260708.md`);
  }

  let content = fs.readFileSync(srcPath, 'utf8');
  let seq = 0;

  content = content.replace(/\\?\[圖[A-Z][：:]([^\]]*)\]/g, (match, desc) => {
    seq += 1;
    const imgName = `${prefix}-fig${String(seq).padStart(2, '0')}`;
    return `![${desc.trim()}](figures/${imgName}.svg)`;
  });

  fs.writeFileSync(destPath, content, 'utf8');
  console.log(`${destFileName}: 完成，共替換 ${seq} 張圖`);
}

insertImages('S2進階冊《AI怎麼被養大・產生篇》_補圖版_lulu_20260708.md', 'S2進階冊《AI怎麼被養大・產生篇》', 's2adv');
insertImages('S4高階冊《人類才能做・AI做不到》.md', 'S4高階冊《人類才能做・AI做不到》', 's4mst');
insertImages('S5進階冊《AI與人類的信任邊界》.md', 'S5進階冊《AI與人類的信任邊界》', 's5adv');
insertImages('S5高階冊_AI時代怎麼當一個人__didi_20260708.md', 'S5高階冊《AI時代怎麼當一個人》', 's5mst');
insertImages('S6入門冊_AI有沒有自我意識__didi_20260708.md', 'S6入門冊《AI有沒有自我意識》', 's6intro');
insertImages('S6進階冊_AI怎麼看人類__didi_20260708.md', 'S6進階冊《AI怎麼看人類》', 's6adv');
