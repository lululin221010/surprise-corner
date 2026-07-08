// scripts/build-ai-robot-courses.mjs
// 合併系列9三份課程MD -> src/app/classroom/ai-robot/courses.ts
// s9入門(12堂,letter answer)/進階(10堂,ready fenced,number answer)/高階(9堂,只有第1堂fenced其餘&#x20;混雜,number answer)
// 執行：node scripts/build-ai-robot-courses.mjs

import fs from 'fs';

const CDIR = 'C:/Users/user/Desktop/有的沒的小舖/驚喜樂世界/驚喜學院/AI書院/課程';

function cleanCode(raw) {
  return raw
    .replace(/&#x20;/g, ' ')
    .replace(/```typescript/g, '')
    .replace(/```/g, '')
    .replace(/^typescript\s*$/m, '')
    .replace(/\\\[/g, '[')
    .replace(/\\\]/g, ']')
    .replace(/\\_/g, '_');
}

function extractLessonObject(sectionText, varPattern) {
  const cleaned = cleanCode(sectionText);
  const m = cleaned.match(varPattern);
  if (!m) throw new Error('找不到起點: ' + varPattern);
  const startIdx = m.index + m[0].length - 1; // 指到 '{' 開頭
  const afterStart = cleaned.slice(startIdx);
  const endIdx = afterStart.lastIndexOf('};');
  if (endIdx === -1) throw new Error('找不到結尾 };');
  return new Function('return ' + afterStart.slice(0, endIdx + 1))();
}

const EMOJI_POOL = ['🤖','🦾','🦿','🛰️','🔧','⚙️','🧭','🎛️','📡','🚀','🏭','🧩'];
function pickEmoji(title) {
  let hash = 0;
  for (const ch of title) hash = (hash * 31 + ch.codePointAt(0)) % EMOJI_POOL.length;
  return EMOJI_POOL[hash];
}

// ── 入門冊：12堂，letter answer + "A. "前綴 ──────────────
const introRaw = fs.readFileSync(`${CDIR}/s9_入門課程.md`, 'utf8');
const introSections = introRaw.split(/=====\s*檔案：機器入門\d+_課程\.md\s*=====/).slice(1);
const introLessons = introSections.map((sec, i) => {
  const cutIdx = sec.search(/=====\s*檔案/);
  const courseOnly = cutIdx === -1 ? sec : sec.slice(0, cutIdx);
  const obj = extractLessonObject(courseOnly, /const lesson = /);
  return {
    id: obj.id,
    title: obj.title,
    emoji: pickEmoji(obj.title),
    description: obj.subtitle || '',
    duration: typeof obj.duration === 'number' ? `${obj.duration}分鐘` : obj.duration,
    tier: obj.tier,
    slides: obj.slides.map(s => ({ title: s.title, body: s.content })),
    quizzes: obj.quizzes.map(q => ({
      question: q.question,
      options: q.options.map(o => o.replace(/^[A-D]\.\s*/, '')),
      answerIndex: typeof q.answer === 'number' ? q.answer : 'ABCD'.indexOf(q.answer),
      explanation: q.explanation,
    })),
  };
});

function normalizeNoSubtitleLesson(obj) {
  return {
    id: obj.id,
    title: obj.title,
    emoji: pickEmoji(obj.title),
    description: obj.slides[0]?.title || '',
    duration: typeof obj.duration === 'number' ? `${obj.duration}分鐘` : obj.duration,
    tier: obj.tier,
    slides: obj.slides.map(s => ({ title: s.title, body: s.content })),
    quizzes: obj.quizzes.map(q => ({
      question: q.question,
      options: q.options.map(o => o.replace(/^[A-D]\.\s*/, '')),
      answerIndex: typeof q.answer === 'number' ? q.answer : 'ABCD'.indexOf(q.answer),
      explanation: q.explanation,
    })),
  };
}

// ── 進階冊：10堂，全部fenced ──────────────────────────────
function extractFencedBlocksRaw(raw) {
  return [...raw.matchAll(/```typescript\n([\s\S]*?)```/g)].map(m => m[1].trim());
}
const advancedRaw = fs.readFileSync(`${CDIR}/s9_進階課程.md`, 'utf8');
const advancedBlocks = extractFencedBlocksRaw(advancedRaw);
const advancedLessons = advancedBlocks.map(b => {
  const code = b.replace(/^export const \w+ = /, '').replace(/;\s*$/, '');
  const obj = new Function('return ' + code)();
  return normalizeNoSubtitleLesson(obj);
});

// ── 高階冊：9堂，只有第1堂fenced，其餘&#x20;混雜 ─────────────
const masterRaw = fs.readFileSync(`${CDIR}/s9_高階課程.md`, 'utf8');
const masterSections = masterRaw.split(/=====\s*檔案：機器高階\d+\\?_課程\.md\s*=====/).slice(1);
const masterLessons = masterSections.map(sec => {
  const cutIdx = sec.search(/=====\s*檔案/);
  const courseOnly = cutIdx === -1 ? sec : sec.slice(0, cutIdx);
  const obj = extractLessonObject(courseOnly, /export const \w+ = /);
  return normalizeNoSubtitleLesson(obj);
});

console.log(`入門 ${introLessons.length} 堂, 進階 ${advancedLessons.length} 堂, 高階 ${masterLessons.length} 堂`);

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

const output = `// 📄 路徑：src/app/classroom/ai-robot/courses.ts
// S9 機器人／具身智能系列課程（機器人是怎麼動的／機器人怎麼思考／機器人會取代誰）

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

export const robotIntroCourse: Course = {
  id: 'robot-intro',
  title: '機器人是怎麼動的',
  emoji: '🤖',
  description: '12堂課看懂機器人跟AI的邊界，感測器、執行器、控制系統怎麼合作讓機器人動起來。',
  lessons: [
${introLessons.map(l => lessonToTs(l)).join('\n')}
  ],
};

export const robotAdvancedCourse: Course = {
  id: 'robot-advanced',
  title: '機器人怎麼思考',
  emoji: '🦾',
  description: '10堂課看懂機器人的決策邏輯跟聊天AI差在哪，為什麼物理世界的判斷比對話難得多。',
  lessons: [
${advancedLessons.map(l => lessonToTs(l)).join('\n')}
  ],
};

export const robotMasterCourse: Course = {
  id: 'robot-master',
  title: '機器人會取代誰',
  emoji: '🏭',
  description: '9堂課看懂工業機器人已經取代了哪些工作，以及技術可行性之外還有哪些變數決定取代速度。',
  lessons: [
${masterLessons.map(l => lessonToTs(l)).join('\n')}
  ],
};

const robotCourses: Course[] = [robotIntroCourse, robotAdvancedCourse, robotMasterCourse];
export default robotCourses;
`;

fs.mkdirSync('src/app/classroom/ai-robot', { recursive: true });
fs.writeFileSync('src/app/classroom/ai-robot/courses.ts', output, 'utf8');
console.log('已寫入 src/app/classroom/ai-robot/courses.ts');
