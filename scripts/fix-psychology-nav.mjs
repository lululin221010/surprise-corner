// scripts/fix-psychology-nav.mjs
// 1. "← 返回" javascript:history.back() → 各系列導讀頁（新分頁打開時 history 空白不能用）
// 2. "← 回到驚喜角落" href → / （SS首頁），原本錯連到系列頁（與側欄「系列導讀」重複）

import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '..', 'public');

const seriesMap = {
  'dark-psychology':       '/dark-psychology.html',
  'cognitive-psychology':  '/cognitive-psychology.html',
  'growth-psychology':     '/growth-psychology.html',
  'personality-psychology':'/personality-psychology.html',
  'relationship-psychology':'/relationship-psychology.html',
  'subconscious-psychology':'/subconscious-psychology.html',
};

const files = readdirSync(publicDir).filter(f =>
  f.endsWith('.html') &&
  Object.keys(seriesMap).some(prefix => f.startsWith(prefix) && f.includes('-vol'))
);

let modified = 0;

for (const filename of files) {
  const filepath = join(publicDir, filename);
  let content = readFileSync(filepath, 'utf8');
  const original = content;

  // 找出本檔屬於哪個系列
  let seriesPage = null;
  for (const [prefix, page] of Object.entries(seriesMap)) {
    if (filename.startsWith(prefix)) { seriesPage = page; break; }
  }
  if (!seriesPage) continue;

  // Fix 1：← 返回 改為硬連結
  content = content.replace(
    'href="javascript:history.back()"',
    `href="${seriesPage}"`
  );

  // Fix 2：← 回到驚喜角落 的 href 改為 /（SS首頁）
  // 原 href 是系列頁（如 /dark-psychology.html），與側欄重複，改為首頁
  content = content.replace(
    /href="\/[a-z-]+psychology\.html"([^>]*> &larr; &#22238;&#21040;&#39511;&#21916;&#35282;&#33853;<\/a>)/,
    'href="/"$1'
  );

  if (content !== original) {
    writeFileSync(filepath, content, 'utf8');
    console.log(`✅ ${filename}`);
    modified++;
  } else {
    console.log(`⬜ ${filename}（未變動，請確認格式）`);
  }
}

console.log(`\n完成：${modified} 個檔案已更新`);
