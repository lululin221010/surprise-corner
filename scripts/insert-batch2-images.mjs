// scripts/insert-batch2-images.mjs
// 批次2：把C標記好的[圖X：描述]換成真正的markdown圖片語法
// S6高階/S7高階/S8上/S8下 來源在「新增資料夾」；S9進階/S9高階已經先套用過先修提醒修正，直接以「新增資料夾」內已修正版本為來源
import fs from 'fs';

const EDIR = 'C:/Users/user/Desktop/有的沒的小舖/驚喜樂世界/驚喜學院/AI書院/電子書';
const SRC = `${EDIR}/新增資料夾`;

function insertImages(srcFileName, destFileName, prefix) {
  const srcPath = `${SRC}/${srcFileName}`;
  const destPath = `${EDIR}/${destFileName}.md`;

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

insertImages('S6高階冊《AI的偏見從哪來》.md', 'S6高階冊《AI的偏見從哪來》', 's6mst');
insertImages('S7高階冊_訓練一個迷你AI模型__didi_20260708.md', 'S7高階冊《訓練一個迷你AI模型》', 's7mst');
insertImages('S8上冊_AI安全與失控邊界__didi_20260708.md', 'S8上冊《AI安全與失控邊界》', 's8up');
insertImages('S8下冊_AI世界大戰__didi_20260708.md', 'S8下冊《AI世界大戰》', 's8down');
insertImages('S9進階冊_機器人怎麼思考__didi_20260708 (1).md', 'S9進階冊《機器人怎麼思考》', 's9think');
insertImages('S9高階冊《機器人會取代誰》.md', 'S9高階冊《機器人會取代誰》', 's9mst');
