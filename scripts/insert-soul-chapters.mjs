import { readFileSync, writeFileSync } from 'fs';

const TXT_PATH = 'C:\\Users\\user\\Desktop\\有的沒的小舖\\電子書\\連載\\chapters-content.txt\\靈魂\\靈魂.txt';
const JSON_PATH = 'C:\\Users\\user\\Desktop\\MyProjects01\\surprise-corner-src\\src\\data\\chapters.json';

// Read source file
const rawLines = readFileSync(TXT_PATH, 'utf-8').split('\n');
// Normalize line endings (remove \r)
const lines = rawLines.map(l => l.replace(/\r$/, ''));

console.log(`Total lines in txt: ${lines.length}`);

// Section definitions: [id, chapterNum, title, startLine (1-based), endLine (1-based inclusive)]
const sections = [
  ['soul-s-03-01',  7, '第三章第一節：有時候在，有時候不在',                         347, 407],
  ['soul-s-03-02',  8, '第三章第二節：生活越吵，越需要安靜',                         409, 486],
  ['soul-s-03-03',  9, '第三章第三節：不是儀式，是狀態',                             488, 563],
  ['soul-s-04-01', 10, '第四章第一節：那個詞',                                       566, 623],
  ['soul-s-04-02', 11, '第四章第二節：你心裡最安心的地方',                           625, 714],
  ['soul-s-04-03', 12, '第四章第三節：那個普通的下午',                               716, 801],
  ['soul-s-05-01', 13, '第五章第一節：沒有昨天，沒有明天',                           804, 888],
  ['soul-s-05-02', 14, '第五章第二節：兩個意念，在沒有距離的地方相遇',               890, 978],
  ['soul-s-05-03', 15, '第五章第三節：那裡沒有等待，只有在',                         980, 1072],
  ['soul-s-06-01', 16, '第六章第一節：接機的人',                                     1077, 1150],
  ['soul-s-06-02', 17, '第六章第二節：靈魂認得的臉',                                 1152, 1246],
  ['soul-s-06-03', 18, '第六章第三節：下一段旅程的起跑線',                           1248, 1351],
  ['soul-s-07-01', 19, '第七章第一節：它去哪裡學習成為守護靈',                       1353, 1463],
  ['soul-s-07-02', 20, '第七章第二節：那個剛好夠的推',                               1465, 1563],
  ['soul-s-07-03', 21, '第七章第三節：用你自己的聲音說給你聽',                       1565, 1692],
  ['soul-s-08-01', 22, '第八章第一節：為什麼偏偏在那個時刻夢見他',                   1694, 1785],
  ['soul-s-08-02', 23, '第八章第二節：氣味是靈魂最常用的通訊方式',                   1787, 1891],
  ['soul-s-08-03', 24, '第八章第三節：直覺是靈魂頻率最直接的傳遞',                   1893, 2018],
  ['soul-s-09-01', 25, '第九章第一節：每段關係都有它的課業',                         2021, 2098],
  ['soul-s-09-02', 26, '第九章第二節：為什麼你會反覆遇到同樣的課題',                 2100, 2204],
  ['soul-s-09-03', 27, '第九章第三節：當課業完成，不是結束，是畢業',                 2207, 2309],
  ['soul-s-10-01', 28, '第十章第一節：知道終點之後，如何重新看待每一個當下',         2325, 2415],
  ['soul-s-10-02', 29, '第十章第二節：死亡不是失去，是換了一種形式的陪伴',           2431, 2515],
  ['soul-s-10-03', 30, '第十章第三節：給還在等待的人——他們在，而且他們很好',       2518, 2647],
];

// Metadata line patterns to filter out
function isMetadataLine(line) {
  const trimmed = line.trim();

  // Empty line check – keep empty lines (they separate paragraphs)
  if (trimmed === '') return false;

  // Section/chapter preview lines
  if (/第[一二三四五六七八九十]+[節章]預告：/.test(trimmed)) return true;

  // Date markers like "3月13日" or "3-13"
  if (/^\d+月\d+日/.test(trimmed)) return true;
  if (/^3-1/.test(trimmed)) return true;  // "3-13" style

  // Pure numeric section markers like "9-3", "3-1" etc.
  if (/^\d{1,2}-\d{1,2}$/.test(trimmed)) return true;

  // Short user prompts / reactions
  const shortPrompts = ['go', '繼續吧', '加油', '好的', '當然繼續', '哇', '好平', '快完成了',
                        '繼續', '繼續！', '繼續。', '好！', '繼續撰寫', '繼續吧！',
                        '寫吧', '請繼續', '繼續寫', '好，繼續', '好，請繼續'];
  if (shortPrompts.includes(trimmed)) return true;

  // Short lines that are just user reactions (1-4 chars, Chinese only)
  if (/^[\u4e00-\u9fff！？。，]{1,4}$/.test(trimmed) &&
      ['好平', '哇', '加油', '繼續', '寫吧'].some(p => trimmed.includes(p))) return true;

  // AI metadata patterns
  if (/^Thought for \d/.test(trimmed)) return true;
  if (/識別|規劃|準備撰寫|評估|決定/.test(trimmed) && trimmed.length < 40) return true;
  if (/^Identified /.test(trimmed)) return true;
  if (/^Planned /.test(trimmed)) return true;
  if (/^Recognized /.test(trimmed)) return true;

  // Chapter/section header lines that are JUST the header (first 1-2 lines of each section range)
  // e.g. "第三章：靈魂的頻率與雜訊" or "第一節：有時候在，有時候不在"
  if (/^第[一二三四五六七八九十]+章：/.test(trimmed) && trimmed.length < 30) return true;
  if (/^第[一二三四五六七八九十]+節：/.test(trimmed) && trimmed.length < 30) return true;

  return false;
}

// Extract content for a section
function extractSection(startLine, endLine) {
  // Convert 1-based line numbers to 0-based indices
  const start = startLine - 1;
  const end = endLine - 1;

  const sectionLines = lines.slice(start, end + 1);

  // Filter metadata
  const filtered = sectionLines.filter(line => !isMetadataLine(line));

  // Join lines, preserving blank lines as paragraph separators
  let content = filtered.join('\n');

  // Clean up: collapse 3+ consecutive newlines to 2
  content = content.replace(/\n{3,}/g, '\n\n');

  // Trim leading/trailing whitespace
  content = content.trim();

  return content;
}

// Build new entries
const newEntries = sections.map(([id, chapterNum, title, startLine, endLine]) => {
  const content = extractSection(startLine, endLine);
  const wordCount = content.replace(/\s/g, '').length;

  console.log(`  ${id}: lines ${startLine}-${endLine}, wordCount=${wordCount}, content length=${content.length}`);

  return {
    id,
    novelId: 'soul-journey',
    chapterNumber: chapterNum,
    title,
    content,
    wordCount,
    publishedAt: '2026-03-15',
    isPublished: true,
    isFree: false,
    price: 0,
    priceFullBook: 299,
    shopUrl: 'https://still-time-corner.vercel.app/digital'
  };
});

console.log(`\nBuilt ${newEntries.length} new entries`);

// Read and parse existing chapters.json
const chaptersJson = readFileSync(JSON_PATH, 'utf-8');
const chapters = JSON.parse(chaptersJson);

console.log(`Existing chapters count: ${chapters.length}`);

// Find insertion point: after soul-s-02-03, before slash-001
const insertAfterIdx = chapters.findIndex(c => c.id === 'soul-s-02-03');
const insertBeforeIdx = chapters.findIndex(c => c.id === 'slash-001');

console.log(`Insert after index (soul-s-02-03): ${insertAfterIdx}`);
console.log(`Insert before index (slash-001): ${insertBeforeIdx}`);

if (insertAfterIdx === -1) {
  throw new Error('Could not find soul-s-02-03 in chapters.json');
}
if (insertBeforeIdx === -1) {
  throw new Error('Could not find slash-001 in chapters.json');
}

// Insert new entries after soul-s-02-03
const insertAt = insertAfterIdx + 1;
chapters.splice(insertAt, 0, ...newEntries);

console.log(`New chapters count: ${chapters.length}`);

// Write back
const output = JSON.stringify(chapters, null, 2);
writeFileSync(JSON_PATH, output, 'utf-8');

console.log('\nDone! chapters.json updated successfully.');

// Verify
const verify = JSON.parse(readFileSync(JSON_PATH, 'utf-8'));
const ids = verify.map(c => c.id);
const firstNew = ids.indexOf('soul-s-03-01');
const lastNew = ids.indexOf('soul-s-10-03');
console.log(`Verification: soul-s-03-01 at index ${firstNew}, soul-s-10-03 at index ${lastNew}`);
console.log(`Total entries in chapters.json: ${verify.length}`);
