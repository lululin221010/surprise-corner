// scripts/build-ai-safety-courses.mjs
// 合併系列8兩份課程MD -> src/app/classroom/ai-safety/courses.ts（只有上下2冊，不是3冊）
// 執行：node scripts/build-ai-safety-courses.mjs

import fs from 'fs';

const CDIR = 'C:/Users/user/Desktop/有的沒的小舖/驚喜樂世界/驚喜學院/AI書院/課程';

function extractFencedBlocks(raw) {
  const blocks = [...raw.matchAll(/```typescript\n([\s\S]*?)```/g)].map(m => m[1].trim());
  return blocks.map(b => new Function('return ' + b)());
}

const upperRaw = fs.readFileSync(`${CDIR}/s8_上冊課程.md`, 'utf8');
const lowerRaw = fs.readFileSync(`${CDIR}/s8_下冊課程.md`, 'utf8');

const upperLessons = extractFencedBlocks(upperRaw);
const lowerLessons = extractFencedBlocks(lowerRaw);

console.log(`上冊 ${upperLessons.length} 堂, 下冊 ${lowerLessons.length} 堂`);

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

const output = `// 📄 路徑：src/app/classroom/ai-safety/courses.ts
// S8 AI世界局勢系列課程（只有上下2冊，不是3冊）：AI安全與失控邊界／AI世界大戰

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

export const safetyUpperCourse: Course = {
  id: 'safety-upper',
  title: 'AI安全與失控邊界',
  emoji: '🛡️',
  description: '9堂課從科幻恐慌到真實風險，搞懂AI安全討論的到底是什麼。',
  lessons: [
${upperLessons.map(l => lessonToTs(l)).join('\n')}
  ],
};

export const safetyLowerCourse: Course = {
  id: 'safety-lower',
  title: 'AI世界大戰',
  emoji: '🌍',
  description: '9堂課看懂AI怎麼從技術問題變成國力問題，地緣政治競爭全貌。',
  lessons: [
${lowerLessons.map(l => lessonToTs(l)).join('\n')}
  ],
};

const safetyCourses: Course[] = [safetyUpperCourse, safetyLowerCourse];
export default safetyCourses;
`;

fs.mkdirSync('src/app/classroom/ai-safety', { recursive: true });
fs.writeFileSync('src/app/classroom/ai-safety/courses.ts', output, 'utf8');
console.log('已寫入 src/app/classroom/ai-safety/courses.ts');
