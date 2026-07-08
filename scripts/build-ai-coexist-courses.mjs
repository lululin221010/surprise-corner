// scripts/build-ai-coexist-courses.mjs
// 合併系列5三份課程MD -> src/app/classroom/ai-coexist/courses.ts
// s5_入門課程.md 是混雜格式（含&#x20;實體字、\[\]跳脫、answer字母制），需要特別清理
// 執行：node scripts/build-ai-coexist-courses.mjs

import fs from 'fs';

const CDIR = 'C:/Users/user/Desktop/有的沒的小舖/驚喜樂世界/驚喜學院/AI書院/課程';

const EMOJI_POOL = ['🤝','💼','⚖️','📜','🎓','👨‍👩‍👧','🧓','🔗','💡','🧭','🌟','🎯','🛡️'];
function pickEmoji(title) {
  let hash = 0;
  for (const ch of title) hash = (hash * 31 + ch.codePointAt(0)) % EMOJI_POOL.length;
  return EMOJI_POOL[hash];
}

function cleanCode(raw) {
  return raw
    .replace(/&#x20;/g, ' ')
    .replace(/```typescript/g, '')
    .replace(/```/g, '')
    .replace(/typescript\s*const lesson/gi, 'const lesson')
    .replace(/\\\[/g, '[')
    .replace(/\\\]/g, ']')
    .replace(/\\_/g, '_');
}

function extractLessonObject(sectionText) {
  const cleaned = cleanCode(sectionText);
  const startIdx = cleaned.indexOf('const lesson = {');
  if (startIdx === -1) throw new Error('找不到 const lesson 起點');
  const afterStart = cleaned.slice(startIdx);
  const endIdx = afterStart.lastIndexOf('};');
  if (endIdx === -1) throw new Error('找不到結尾 };');
  const code = afterStart.slice('const lesson = '.length, endIdx + 1);
  return new Function('return ' + code)();
}

function mapQuiz(q) {
  return {
    question: q.question,
    options: q.options.map(o => o.replace(/^[A-D]\.\s*/, '')),
    answerIndex: 'ABCD'.indexOf(q.answer),
    explanation: q.explanation,
  };
}

function normalizeIntroLesson(obj) {
  const base = {
    id: obj.id,
    title: obj.title,
    emoji: pickEmoji(obj.title),
    description: obj.subtitle || '',
    duration: typeof obj.duration === 'number' ? `${obj.duration}分鐘` : obj.duration,
    tier: obj.tier,
  };

  // formType C（互動測驗型）：沒有一般slides，是 quiz:{intro, questions(自評計分), results(等級說明)} + 頂層quizzes(理解測驗)
  if (obj.formType === 'C' && obj.quiz && obj.quiz.intro) {
    const selfCheckSlides = obj.quiz.questions.map(q => ({
      title: q.question,
      body: q.options.map(o => `${o.id}. ${o.text}`).join('\n'),
    }));
    const resultsSlide = {
      title: '測驗結果對照',
      body: obj.quiz.results.map(r => `**${r.title}**\n${r.description.replace(/\\\*/g, '*')}`).join('\n\n---\n\n'),
    };
    return {
      ...base,
      slides: [
        { title: '測驗說明', body: obj.quiz.intro },
        ...selfCheckSlides,
        resultsSlide,
      ],
      quizzes: obj.quizzes.map(mapQuiz),
    };
  }

  // formType E（時間軸演化圖）：沒有slides，是 timeline:{title, nodes:[...]}
  if (obj.formType === 'E' && obj.timeline) {
    return {
      ...base,
      slides: [
        { title: obj.timeline.title, body: '接下來，我們一段一段看時間軸怎麼走。' },
        ...obj.timeline.nodes.map(n => ({ title: `${n.period}｜${n.label}`, body: n.content })),
      ],
      quizzes: (obj.quiz || obj.quizzes).map(mapQuiz),
    };
  }

  return {
    ...base,
    slides: obj.slides.map(s => ({ title: s.title, body: s.content })),
    quizzes: (obj.quiz || obj.quizzes).map(mapQuiz),
  };
}

// ── 入門冊：13堂，混雜格式 ──────────────────────────────
const introRaw = fs.readFileSync(`${CDIR}/s5_入門課程.md`, 'utf8');
const introSections = introRaw.split(/=====\s*檔案：共存入門\d+\\?_課程\.md\s*=====/).slice(1); // 第0項是檔頭前的空白
// 每個section後面還接著電子書/格子/推廣，只取到下一個 ===== 檔案 為止（split已經只保留到下一個任何=====前，但因為用同一個regex切，這裡切出來的每段其實包含了電子書/格子/推廣，需要再切一次拿最前面課程部分)
const introLessons = introSections.map((sec, i) => {
  // 只取這段裡「第一個 ===== 檔案 」之前的內容（即課程本體，電子書/格子/推廣段落在後面）
  const cutIdx = sec.search(/=====\s*檔案/);
  const courseOnly = cutIdx === -1 ? sec : sec.slice(0, cutIdx);
  try {
    return normalizeIntroLesson(extractLessonObject(courseOnly));
  } catch (e) {
    console.error(`入門第${i + 1}段解析失敗: ${e.message}`);
    return null;
  }
}).filter(Boolean);

console.log(`入門冊解析出 ${introLessons.length} 堂`);

// ── 進階/高階冊：C改寫版，標準TS array格式 ──────────────
function extractExportArray(raw) {
  let code = raw;
  const fence = raw.match(/```typescript\n([\s\S]*?)```/);
  if (fence) code = fence[1];
  code = code.replace(/^﻿/, '').replace(/^export const \w+(?::\s*\w+\[\])? = /m, '').trim().replace(/;\s*$/, '');
  return new Function('return ' + code)();
}

const advancedRaw = fs.readFileSync(`${CDIR}/s5_進階課程 (2).md`, 'utf8');
const masterRaw = fs.readFileSync(`${CDIR}/s5_高階課程 (2).md`, 'utf8');
const advancedLessons = extractExportArray(advancedRaw);
const masterLessons = extractExportArray(masterRaw);
console.log(`進階冊 ${advancedLessons.length} 堂, 高階冊 ${masterLessons.length} 堂`);

function lessonToTs(lesson, indent = '      ') {
  const slidesStr = lesson.slides.map(s => `${indent}    {
${indent}      title: ${JSON.stringify(s.title)},
${indent}      body: ${JSON.stringify(s.body)},
${indent}    },`).join('\n');
  const quizzesStr = lesson.quizzes.map(q => `${indent}    {
${indent}      question: ${JSON.stringify(q.question)},
${indent}      options: ${JSON.stringify(q.options)},
${indent}      answerIndex: ${q.answerIndex},
${indent}      explanation: ${JSON.stringify(q.explanation)},
${indent}    },`).join('\n');
  return `${indent}{
${indent}  id: ${JSON.stringify(lesson.id)},
${indent}  title: ${JSON.stringify(lesson.title)},
${indent}  emoji: ${JSON.stringify(lesson.emoji)},
${indent}  description: ${JSON.stringify(lesson.description)},
${indent}  duration: ${JSON.stringify(lesson.duration)},
${indent}  tier: ${JSON.stringify(lesson.tier)},
${indent}  slides: [
${slidesStr}
${indent}  ],
${indent}  quizzes: [
${quizzesStr}
${indent}  ],
${indent}},`;
}

const output = `// 📄 路徑：src/app/classroom/ai-coexist/courses.ts
// S5 互動共存系列課程（AI怎麼改變工作／AI與人類的信任邊界／AI時代怎麼當一個人）

export interface Slide {
  title: string
  body: string
}

export interface Quiz {
  question: string
  options: string[]
  answerIndex: number
  explanation: string
}

export interface Lesson {
  id: string
  title: string
  emoji: string
  description: string
  duration: string
  tier: 'basic' | 'intermediate' | 'advanced'
  slides: Slide[]
  quizzes: Quiz[]
}

export interface Course {
  id: string
  title: string
  emoji: string
  description: string
  lessons: Lesson[]
}

export const coexistIntroCourse: Course = {
  id: 'coexist-intro',
  title: 'AI怎麼改變工作',
  emoji: '💼',
  description: '13堂課破解AI取代工作的恐慌，看懂哪些工作正在改變、哪些新機會正在誕生。',
  lessons: [
${introLessons.map(l => lessonToTs(l)).join('\n')}
  ],
};

export const coexistAdvancedCourse: Course = {
  id: 'coexist-advanced',
  title: 'AI與人類的信任邊界',
  emoji: '⚖️',
  description: '10堂課看懂責任歸屬、版權爭議、高風險場域的AI信任邊界該畫在哪裡。',
  lessons: [
${advancedLessons.map(l => lessonToTs(l)).join('\n')}
  ],
};

export const coexistMasterCourse: Course = {
  id: 'coexist-master',
  title: 'AI時代怎麼當一個人',
  emoji: '🧭',
  description: '9堂課看懂教育、陪伴、人際連結在AI時代該怎麼安放。',
  lessons: [
${masterLessons.map(l => lessonToTs(l)).join('\n')}
  ],
};

const coexistCourses: Course[] = [coexistIntroCourse, coexistAdvancedCourse, coexistMasterCourse];
export default coexistCourses;
`;

fs.mkdirSync('src/app/classroom/ai-coexist', { recursive: true });
fs.writeFileSync('src/app/classroom/ai-coexist/courses.ts', output, 'utf8');
console.log('已寫入 src/app/classroom/ai-coexist/courses.ts');
