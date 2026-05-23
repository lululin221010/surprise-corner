// scripts/remove-paywall-cta.mjs
// 移除 SS public/ HTML 中的購買 CTA，保留純體驗
// 心理學系列：移除整個 paywall-fade + paywall-box 區塊
// 那個感覺 trial：移除 btn-full 購買按鈕（保留 back-ss 返回連結）

import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '..', 'public');

// 移除心理學 paywall-fade + paywall-box 區塊（處理巢狀 div）
function removePaywallBox(html) {
  const fadeStr = '<div class="paywall-fade"></div>';
  const fadeIdx = html.indexOf(fadeStr);
  if (fadeIdx === -1) return html;

  const boxStr = '<div class="paywall-box">';
  const boxIdx = html.indexOf(boxStr, fadeIdx);
  if (boxIdx === -1) return html;

  let depth = 0;
  let pos = boxIdx;
  while (pos < html.length) {
    if (html.startsWith('<div', pos)) {
      depth++;
      pos += 4;
    } else if (html.startsWith('</div>', pos)) {
      depth--;
      if (depth === 0) {
        const end = pos + 6;
        return html.slice(0, fadeIdx) + html.slice(end);
      }
      pos += 6;
    } else {
      pos++;
    }
  }
  return html;
}

// 移除購買按鈕（那個感覺 trial 用，有 btn-full 或 paywall-btn 兩種 class）
function removeBtnFull(html) {
  html = html.replace(/<a[^>]*class="btn-full"[^>]*>前往購買[^<]*<\/a>/g, '');
  html = html.replace(/<a[^>]*class="paywall-btn"[^>]*>前往購買[^<]*<\/a>/g, '');
  return html;
}

const files = readdirSync(publicDir).filter(f => f.endsWith('.html'));
let modified = 0;

for (const filename of files) {
  const filepath = join(publicDir, filename);
  let content = readFileSync(filepath, 'utf8');
  const original = content;

  const isThatFeelingTrial = filename.startsWith('that-feeling') && filename.includes('-trial');
  const isPsychVol = !filename.includes('-trial') && (
    filename.startsWith('dark-psychology-vol') ||
    filename.startsWith('cognitive-psychology-vol') ||
    filename.startsWith('growth-psychology-vol') ||
    filename.startsWith('personality-psychology-vol') ||
    filename.startsWith('relationship-psychology-vol') ||
    filename.startsWith('subconscious-psychology-vol')
  );

  if (isPsychVol) {
    content = removePaywallBox(content);
  } else if (isThatFeelingTrial) {
    content = removeBtnFull(content);
  }

  if (content !== original) {
    writeFileSync(filepath, content, 'utf8');
    console.log(`✅ ${filename}`);
    modified++;
  }
}

console.log(`\n完成：${modified} 個檔案已更新`);
