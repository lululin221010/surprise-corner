// scripts/build-ai-thinking-courses.mjs
// 合併系列4三份課程MD -> src/app/classroom/ai-thinking/courses.ts
// 執行：node scripts/build-ai-thinking-courses.mjs

import fs from 'fs';

const CDIR = 'C:/Users/user/Desktop/有的沒的小舖/驚喜樂世界/驚喜學院/AI書院/課程';

function extractFencedBlocks(raw) {
  const blocks = [...raw.matchAll(/```typescript\n([\s\S]*?)```/g)].map(m => m[1].trim());
  return blocks.map(b => new Function('return ' + b)());
}

function extractConstLessons(raw) {
  // 進階冊格式B：const lesson_xxx = { ... };
  const blocks = [...raw.matchAll(/const \w+ = (\{[\s\S]*?\n\});/g)].map(m => m[1]);
  return blocks.map(b => {
    const obj = new Function('return ' + b)();
    return {
      id: obj.id,
      title: obj.title,
      emoji: pickEmoji(obj.title),
      description: obj.subtitle || '',
      duration: typeof obj.duration === 'number' ? `${obj.duration}分鐘` : obj.duration,
      tier: obj.tier,
      slides: obj.slides.map(s => ({ title: s.title, body: s.content })),
      quizzes: (obj.quiz || obj.quizzes).map(q => ({
        question: q.question, options: q.options, answerIndex: q.answerIndex, explanation: q.explanation,
      })),
    };
  });
}

function extractExportArray(raw) {
  // 高階冊（C改寫後）格式：export const xxxLessons = [ ... ];
  let code = raw;
  const fence = raw.match(/```typescript\n([\s\S]*?)```/);
  if (fence) code = fence[1];
  code = code.replace(/^﻿/, '').replace(/^export const \w+(?::\s*\w+\[\])? = /m, '').trim().replace(/;\s*$/, '');
  return new Function('return ' + code)();
}

const EMOJI_POOL = ['🤔','🧩','🔗','📚','🗂️','🎨','💡','🧠','⚡','🔍','🎭','🧭','🌟','🔮','🛠️','📊','🎯','💬','🕰️','🌈'];
function pickEmoji(title) {
  let hash = 0;
  for (const ch of title) hash = (hash * 31 + ch.codePointAt(0)) % EMOJI_POOL.length;
  return EMOJI_POOL[hash];
}

const introRaw = fs.readFileSync(`${CDIR}/s4_入門課程.md`, 'utf8');
const advancedRaw = fs.readFileSync(`${CDIR}/s4_進階課程.md`, 'utf8');
const masterRaw = fs.readFileSync(`${CDIR}/s4_高階課程 (2).md`, 'utf8');

const introLessons = extractFencedBlocks(introRaw);
const advancedLessons = extractConstLessons(advancedRaw);
const masterLessons = extractExportArray(masterRaw);

console.log(`入門 ${introLessons.length} 堂, 進階 ${advancedLessons.length} 堂, 高階 ${masterLessons.length} 堂`);

function lessonToTs(lesson, indent = '      ') {
  const slidesStr = lesson.slides.map(s => {
    const chartStr = s.chart ? `\n${indent}      chart: ${JSON.stringify(s.chart)},` : '';
    return `${indent}    {
${indent}      title: ${JSON.stringify(s.title)},
${indent}      body: ${JSON.stringify(s.body)},${chartStr}
${indent}    },`;
  }).join('\n');

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

const output = `// 📄 路徑：src/app/classroom/ai-thinking/courses.ts
// S4 AI思考力系列課程（AI思考vs人類思考／AI能做到人類做不到／人類才能做AI做不到）

export interface SlideChart {
  type: 'human-vs-ai-thinking'
  config?: Record<string, unknown>
}

export interface Slide {
  title: string
  body: string
  chart?: SlideChart
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

export const thinkingIntroCourse: Course = {
  id: 'thinking-intro',
  title: 'AI思考vs人類思考',
  emoji: '🤔',
  description: '13堂課看懂AI「想」的方式跟人類思考的根本差異——預測 vs 理解、邏輯推理、舉一反三的真相。',
  lessons: [
${introLessons.map(l => lessonToTs(l)).join('\n')}
  ],
};

export const thinkingAdvancedCourse: Course = {
  id: 'thinking-advanced',
  title: 'AI能做到・人類做不到',
  emoji: '⚡',
  description: '10堂課看懂AI在速度、記憶、規模化上的優勢，以及普通人怎麼借用這些優勢。',
  lessons: [
${advancedLessons.map(l => lessonToTs(l)).join('\n')}
  ],
};

export const thinkingMasterCourse: Course = {
  id: 'thinking-master',
  title: '人類才能做・AI做不到',
  emoji: '🎨',
  description: '9堂課看懂創意、同理心、道德判斷、責任承擔——這個時代人類最該保留的能力。',
  lessons: [
${masterLessons.map(l => lessonToTs(l)).join('\n')}
  ],
};

const thinkingCourses: Course[] = [thinkingIntroCourse, thinkingAdvancedCourse, thinkingMasterCourse];
export default thinkingCourses;
`;

fs.mkdirSync('src/app/classroom/ai-thinking', { recursive: true });
fs.writeFileSync('src/app/classroom/ai-thinking/courses.ts', output, 'utf8');
console.log('已寫入 src/app/classroom/ai-thinking/courses.ts');
