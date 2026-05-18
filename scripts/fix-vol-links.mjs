// fix-vol-links.mjs — 修復心理學系列各冊底部 next-books 的導航連結
import fs from 'fs';

const PUBLIC = 'C:/Users/user/Desktop/MyProjects01/surprise-corner-src/public';

const psySeries = [
  {
    prefix: 'dark-psychology',
    vols: [
      { n:1, title:'操控與控制：看清那條你看不見的線' },
      { n:2, title:'說服與影響力：為什麼你總是被說動' },
      { n:3, title:'黑暗人格：識別你身邊的危險之人' },
      { n:4, title:'謊言與欺騙：真相沒有你以為的穩固' },
    ]
  },
  {
    prefix: 'cognitive-psychology',
    vols: [
      { n:1, title:'你以為你在思考' },
      { n:2, title:'決策陷阱' },
      { n:3, title:'記憶的謊言' },
      { n:4, title:'注意力劫持' },
      { n:5, title:'語言的陷阱' },
      { n:6, title:'社會壓力下的你' },
    ]
  },
  {
    prefix: 'growth-psychology',
    vols: [
      { n:1, title:'你以為你在成長但你只是在變老' },
      { n:2, title:'失敗學' },
      { n:3, title:'習慣的解剖' },
      { n:4, title:'動機的真相' },
      { n:5, title:'自我認識的邊界' },
      { n:6, title:'你與時間的關係' },
    ]
  },
  {
    prefix: 'personality-psychology',
    vols: [
      { n:1, title:'你以為的你' },
      { n:2, title:'你的暗面' },
      { n:3, title:'你怎麼變成這樣' },
      { n:4, title:'你可以不一樣' },
    ]
  },
  {
    prefix: 'relationship-psychology',
    vols: [
      { n:1, title:'你為什麼需要他' },
      { n:2, title:'為什麼總是你受傷' },
      { n:3, title:'你愛的不是他是感覺' },
      { n:4, title:'邊界' },
    ]
  },
  {
    prefix: 'subconscious-psychology',
    vols: [
      { n:1, title:'你不知道你在做什麼' },
      { n:2, title:'那些你以為忘了的事' },
      { n:3, title:'你的陰影' },
      { n:4, title:'夢在說什麼' },
    ]
  },
];

let fixed = 0;

for (const series of psySeries) {
  for (const vol of series.vols) {
    const file = `${PUBLIC}/${series.prefix}-vol${vol.n}.html`;
    if (!fs.existsSync(file)) { console.log(`❌ 找不到 ${file}`); continue; }

    let html = fs.readFileSync(file, 'utf8');

    // 建立新的 next-books 區塊
    const items = series.vols.map(v => {
      if (v.n === vol.n) {
        return `    <div class="next-book current">
      <span class="next-book-num">Vol.${v.n}</span>
      <span class="next-book-title">${v.title}</span>
    </div>`;
      } else {
        return `    <div class="next-book">
      <span class="next-book-num">Vol.${v.n}</span>
      <a href="/${series.prefix}-vol${v.n}.html" style="color:var(--text);text-decoration:none;" class="next-book-title">${v.title}</a>
    </div>`;
      }
    }).join('\n');

    const newBlock = `<div class="next-books">\n${items}\n</div>`;

    // 用正則替換整個 next-books 區塊
    const newHtml = html.replace(/<div class="next-books">[\s\S]*?<\/div>(?=\s*\n\s*(<\/div>|<a\s+href="https:\/\/still-time|<a\s+href="https:\/\/www))/, newBlock);

    if (newHtml !== html) {
      fs.writeFileSync(file, newHtml);
      console.log(`✓ ${series.prefix}-vol${vol.n}.html`);
      fixed++;
    } else {
      // fallback：整段替換（結尾不同格式）
      const newHtml2 = html.replace(/<div class="next-books">[\s\S]*?<\/div>/, newBlock);
      if (newHtml2 !== html) {
        fs.writeFileSync(file, newHtml2);
        console.log(`✓ (fallback) ${series.prefix}-vol${vol.n}.html`);
        fixed++;
      } else {
        console.log(`⚠️ 無法匹配 ${series.prefix}-vol${vol.n}.html`);
      }
    }
  }
}

console.log(`\n✅ 共修復 ${fixed} 個檔案`);
