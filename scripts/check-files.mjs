import fs from 'fs';
const DRAFT_DIR = 'C:/Users/user/Desktop/有的沒的小舖/驚喜樂世界/驚喜學院/心理學書院/草稿';
const files = fs.readdirSync(DRAFT_DIR).filter(f => f.endsWith('.md') && f !== '給C_心理學書院分組指令.md');
const counts = {};
files.forEach(f => {
  const m = f.match(/^(.+心理學)_Vol(\d+)/);
  if (!m) { console.log('❌ 無法解析:', f); return; }
  counts[m[1]] = (counts[m[1]] || 0) + 1;
});
console.log('各學系本數:', counts);
console.log('總計:', Object.values(counts).reduce((a,b)=>a+b,0), '本');
