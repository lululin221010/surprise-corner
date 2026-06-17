// 腳本：把 心理學書院/草稿/*.md 轉成 courses-data.ts
// 執行：node scripts/gen-psych-courses.mjs

import fs from 'fs';
import path from 'path';

const DRAFT_DIR = 'C:/Users/user/Desktop/有的沒的小舖/驚喜樂世界/驚喜學院/心理學書院/草稿';
const OUT_FILE = 'src/app/classroom/psychology/courses-data.ts';

// 學系對應
const SERIES_MAP = {
  '暗黑心理學': { id: 'dark', emoji: '🖤', label: '暗黑心理學系' },
  '認知心理學': { id: 'cognitive', emoji: '🧩', label: '認知心理學系' },
  '成長心理學': { id: 'growth', emoji: '🌱', label: '成長心理學系' },
  '人格心理學': { id: 'personality', emoji: '🪞', label: '人格心理學系' },
  '潛意識心理學': { id: 'unconscious', emoji: '🌊', label: '潛意識心理學系' },
  '關係心理學': { id: 'relationship', emoji: '💞', label: '關係心理學系' },
};

// 解析一個分組MD檔案
function parseMd(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const lines = raw.split('\n');

  const groups = [];
  let currentGroup = null;
  let currentSection = null;
  let inQuiz = false;
  let quizLines = [];

  for (const line of lines) {
    // 新的組 (## 第X組 or ## 第一組...)
    const groupMatch = line.match(/^## 第([一二三四五六七八九十\d]+)組[：:]\s*(.+)/);
    if (groupMatch) {
      if (currentGroup) groups.push(currentGroup);
      currentGroup = {
        groupNum: groups.length + 1,
        title: groupMatch[2].trim(),
        sections: [],
        quizRaw: '',
      };
      currentSection = null;
      inQuiz = false;
      quizLines = [];
      continue;
    }

    if (!currentGroup) continue;

    // 測驗開始
    if (line.startsWith('**測驗**') || line.match(/^\*\*測驗/)) {
      inQuiz = true;
      quizLines = [line];
      continue;
    }

    if (inQuiz) {
      if (line.startsWith('## ')) {
        // 下一組開始，結束測驗（這個分支不會到，因為外層已攔截）
        currentGroup.quizRaw = quizLines.join('\n');
        inQuiz = false;
      } else if (line.startsWith('---')) {
        currentGroup.quizRaw = quizLines.join('\n');
        inQuiz = false;
      } else {
        quizLines.push(line);
      }
      continue;
    }

    // 小節標題 ###
    if (line.startsWith('### ')) {
      currentSection = { title: line.replace(/^###\s*/, '').trim(), lines: [] };
      currentGroup.sections.push(currentSection);
      continue;
    }

    // 其他內容加到當前小節（或開頭段落）
    if (currentSection) {
      currentSection.lines.push(line);
    } else {
      // 還沒有小節，創一個預設的
      if (line.trim()) {
        currentSection = { title: currentGroup.title, lines: [line] };
        currentGroup.sections.push(currentSection);
      }
    }
  }

  if (currentGroup) {
    if (inQuiz) currentGroup.quizRaw = quizLines.join('\n');
    groups.push(currentGroup);
  }

  return groups;
}

// 把 sections 轉成 slides（每個 section = 一張 slide，空白 section 合併）
function sectionsToSlides(sections) {
  const slides = [];
  for (const sec of sections) {
    const body = sec.lines
      .join('\n')
      .replace(/\*\*([^*]+)\*\*/g, '$1')   // 移除粗體標記
      .replace(/^>\s*/gm, '')               // 移除引言 >
      .replace(/\n{3,}/g, '\n\n')           // 壓縮多空行
      .trim();
    if (body.length < 10) continue;        // 跳過太短的
    slides.push({ title: sec.title, body });
  }
  return slides;
}

// 解析測驗文字
function parseQuiz(quizRaw) {
  if (!quizRaw) return null;
  const lines = quizRaw.split('\n').map(l => l.trim()).filter(Boolean);

  // 找題目（**測驗**：題目文字）
  let question = '';
  const options = [];
  let answerIndex = -1;
  let explanation = '';

  for (let i = 0; i < lines.length; i++) {
    const l = lines[i];
    if (l.startsWith('**測驗**') || l.match(/^\*\*測驗/)) {
      question = l.replace(/^\*\*測驗\*\*[：:]\s*/, '').replace(/\*\*/g, '').trim();
      // 題目可能跨多行
      let j = i + 1;
      while (j < lines.length && !lines[j].match(/^[A-D][.．]/)) {
        if (lines[j] && !lines[j].startsWith('✅') && !lines[j].startsWith('解析')) {
          question += (question ? '\n' : '') + lines[j].replace(/\*\*/g, '');
        }
        j++;
      }
    } else if (l.match(/^[A-D][.．]/)) {
      options.push(l.replace(/^([A-D])[.．]\s*/, '$1. '));
    } else if (l.startsWith('✅正解') || l.match(/^✅\s*正解/)) {
      const m = l.match(/[A-D]/);
      if (m) answerIndex = ['A','B','C','D'].indexOf(m[0]);
    } else if (l.startsWith('解析：') || l.startsWith('解析:')) {
      explanation = l.replace(/^解析[：:]\s*/, '');
    }
  }

  if (!question || options.length < 2 || answerIndex < 0) return null;

  return { question: question.trim(), options, answerIndex, explanation };
}

// 書名→解鎖 target 對應（ST 裡的 ssUnlockTarget）
function getUnlockTarget(seriesKey, vol) {
  const sid = SERIES_MAP[seriesKey]?.id || 'psych';
  return `ss-psych-${sid}-v${vol}`;
}

// 主程式
const files = fs.readdirSync(DRAFT_DIR)
  .filter(f => f.includes('_分組') && f.endsWith('.md') && f !== '給C_心理學書院分組指令.md')
  .sort();

const seriesGroups = {};

for (const file of files) {
  // 解析檔名：暗黑心理學_Vol1_操控與控制_分組.md
  const m = file.match(/^(.+心理學)_Vol(\d+)_(.+?)_分組/);
  if (!m) { console.warn('跳過無法解析的檔名:', file); continue; }

  const [, series, vol, bookTitle] = m;
  const seriesInfo = SERIES_MAP[series];
  if (!seriesInfo) { console.warn('未知學系:', series); continue; }

  const groups = parseMd(path.join(DRAFT_DIR, file));
  const lessons = groups.map((g, idx) => {
    const slides = sectionsToSlides(g.sections);
    const quiz = parseQuiz(g.quizRaw);
    return {
      id: `${seriesInfo.id}-v${vol}-g${idx + 1}`,
      title: g.title,
      emoji: idx === 0 ? '🆓' : '🔒',
      groupNum: idx + 1,
      isFree: idx === 0,
      slides: slides.length > 0 ? slides : [{ title: g.title, body: '（內容整理中）' }],
      quizzes: quiz ? [quiz] : [],
    };
  });

  if (!seriesGroups[series]) seriesGroups[series] = [];
  seriesGroups[series].push({
    id: `${seriesInfo.id}-v${vol}`,
    vol: parseInt(vol),
    title: bookTitle.replace(/_/g, ' '),
    series,
    seriesId: seriesInfo.id,
    unlockTarget: getUnlockTarget(series, vol),
    emoji: seriesInfo.emoji,
    lessons,
  });
}

// 生成 TS 檔案
let out = `// ⚠️ 此檔案由 scripts/gen-psych-courses.mjs 自動生成，勿手動修改
// 最後生成：${new Date().toISOString()}

export interface PsychSlide {
  title: string
  body: string
}

export interface PsychQuiz {
  question: string
  options: string[]
  answerIndex: number
  explanation: string
}

export interface PsychLesson {
  id: string
  title: string
  emoji: string
  groupNum: number
  isFree: boolean
  slides: PsychSlide[]
  quizzes: PsychQuiz[]
}

export interface PsychBook {
  id: string
  vol: number
  title: string
  series: string
  seriesId: string
  unlockTarget: string
  emoji: string
  lessons: PsychLesson[]
}

export interface PsychSeries {
  id: string
  label: string
  emoji: string
  books: PsychBook[]
}

export const PSYCH_SERIES: PsychSeries[] = [\n`;

for (const [seriesName, books] of Object.entries(seriesGroups)) {
  const info = SERIES_MAP[seriesName];
  out += `  {\n    id: '${info.id}',\n    label: '${info.label}',\n    emoji: '${info.emoji}',\n    books: [\n`;

  for (const book of books.sort((a, b) => a.vol - b.vol)) {
    out += `      {\n        id: '${book.id}',\n        vol: ${book.vol},\n        title: ${JSON.stringify(book.title)},\n        series: '${book.series}',\n        seriesId: '${book.seriesId}',\n        unlockTarget: '${book.unlockTarget}',\n        emoji: '${book.emoji}',\n        lessons: [\n`;

    for (const lesson of book.lessons) {
      out += `          {\n            id: '${lesson.id}',\n            title: ${JSON.stringify(lesson.title)},\n            emoji: '${lesson.emoji}',\n            groupNum: ${lesson.groupNum},\n            isFree: ${lesson.isFree},\n            slides: ${JSON.stringify(lesson.slides, null, 2).replace(/\n/g, '\n            ')},\n            quizzes: ${JSON.stringify(lesson.quizzes, null, 2).replace(/\n/g, '\n            ')},\n          },\n`;
    }

    out += `        ],\n      },\n`;
  }

  out += `    ],\n  },\n`;
}

out += `];\n\n// 好康書院：每本書第1組（isFree === true）\nexport const FREE_LESSONS = PSYCH_SERIES.flatMap(s => s.books.map(b => ({\n  bookId: b.id,\n  bookTitle: b.title,\n  series: b.series,\n  seriesId: b.seriesId,\n  seriesEmoji: b.emoji,\n  lesson: b.lessons[0],\n})));\n`;

fs.writeFileSync(OUT_FILE, out, 'utf8');
console.log(`✅ 生成完成：${OUT_FILE}`);
console.log(`📚 學系：${Object.keys(seriesGroups).length} 個`);
console.log(`📖 書籍：${Object.values(seriesGroups).flat().length} 本`);
const totalLessons = Object.values(seriesGroups).flat().reduce((sum, b) => sum + b.lessons.length, 0);
console.log(`📝 組別：${totalLessons} 組`);
