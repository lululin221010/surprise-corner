// scripts/fix-ebook-formatting.mjs
// 修正AI書院系列4~9電子書MD的三個問題：
// 1. 「使用形式：X」內部指令殘留未濾除
// 2. 「書籍介紹（上架用）」+「作者簡介」+「通用書目資訊」尾段行銷草稿混進正文
// 3. 章節標題「章」「堂」混用，統一改「堂」；S4進階冊/S7入門冊標題缺編號或完全無標題
// 執行：node scripts/fix-ebook-formatting.mjs

import fs from 'fs';

const EDIR = 'C:/Users/user/Desktop/有的沒的小舖/驚喜樂世界/驚喜學院/AI書院/電子書';

const S7_INTRO_TITLES = [
  '你不用會寫程式也能做AI應用', '第一步：選一個免費AI平台', '做一個自己的客製化聊天角色',
  '讓AI記住你的習慣設定', '做一個簡單的自動回覆機器人', '用AI做一個讀書筆記助手',
  '用AI做一個行程規劃小工具', '免費圖片AI工具實作', '把AI產出串成自動化流程',
  '常見失敗：為什麼你的AI機器人怪怪的', '做一個屬於你品牌的AI小幫手', '成果展示：你做出了什麼',
];

function stripUsageFormatLines(content) {
  return content.replace(/^使用形式[：:].*\n+/gm, '');
}

function stripTrailingBookIntroBlock(content) {
  const idx = content.search(/#{0,3}\s*書籍介紹（上架用）/);
  if (idx === -1) return content;
  return content.slice(0, idx).replace(/\n+$/, '\n');
}

function normalizeChapterLabel(content) {
  // "# 第01章｜..." / "# 第1章　..." / "# 第一章..." -> 章 改 堂
  return content.replace(/^(#\s*第[0-9一二三四五六七八九十]+)章/gm, '$1堂');
}

function fixS4Advanced(content) {
  // 沒有編號的裸標題，依序插入「第NN堂｜」
  let n = 0;
  return content.replace(/^# (.+)$/gm, (m, title) => {
    n += 1;
    return `# 第${String(n).padStart(2, '0')}堂｜${title}`;
  });
}

function fixS7Intro(content) {
  // 完全沒有標題，依 ===== 實作入門NN_電子書 ===== 標記插入標題+移除使用形式行
  let n = 0;
  let out = content.replace(/(===== 實作入門\d+_電子書 =====\s*\n+)使用形式：[A-Z]\s*\n+/g, (m, marker) => {
    const title = S7_INTRO_TITLES[n];
    n += 1;
    return `${marker}\n# 第${String(n).padStart(2, '0')}堂｜${title}\n\n`;
  });
  return out;
}

const files = [
  'S4入門冊《AI思考vs人類思考》', 'S4進階冊《AI能做到・人類做不到》', 'S4高階冊《人類才能做・AI做不到》',
  'S5入門冊《AI怎麼改變工作》', 'S5進階冊《AI與人類的信任邊界》', 'S5高階冊《AI時代怎麼當一個人》',
  'S6入門冊《AI有沒有自我意識》', 'S6進階冊《AI怎麼看人類》', 'S6高階冊《AI的偏見從哪來》',
  'S7入門冊《免費工具做自己的AI》', 'S7進階冊《自架本地AI入門》', 'S7高階冊《訓練一個迷你AI模型》',
  'S8上冊《AI安全與失控邊界》', 'S8下冊《AI世界大戰》',
  'S9入門冊《機器人是怎麼動的》', 'S9進階冊《機器人怎麼思考》', 'S9高階冊《機器人會取代誰》',
];

for (const name of files) {
  const path = `${EDIR}/${name}.md`;
  let content = fs.readFileSync(path, 'utf8');
  const before = content.length;

  content = stripTrailingBookIntroBlock(content);

  // 順序很重要：S7入門冊要靠「使用形式：X」這行當插入標題的錨點，必須在strip之前先跑
  if (name.startsWith('S7入門冊')) content = fixS7Intro(content);

  content = stripUsageFormatLines(content);
  content = normalizeChapterLabel(content);

  if (name.startsWith('S4進階冊')) content = fixS4Advanced(content);

  fs.writeFileSync(path, content, 'utf8');
  const h1Count = (content.match(/^# /gm) || []).length;
  console.log(`${name}: ${before} -> ${content.length} chars, H1 count=${h1Count}`);
}
console.log('全部修正完成');
