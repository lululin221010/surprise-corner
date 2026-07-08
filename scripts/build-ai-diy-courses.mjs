// scripts/build-ai-diy-courses.mjs
// 合併系列7三份課程MD -> src/app/classroom/ai-diy/courses.ts
// 執行：node scripts/build-ai-diy-courses.mjs

import fs from 'fs';

const CDIR = 'C:/Users/user/Desktop/有的沒的小舖/驚喜樂世界/驚喜學院/AI書院/課程';

function extractFencedBlocks(raw) {
  const blocks = [...raw.matchAll(/```typescript\n([\s\S]*?)```/g)].map(m => m[1].trim());
  return blocks.map(b => new Function('return ' + b)());
}
function extractExportArray(raw) {
  let code = raw;
  const fence = raw.match(/```typescript\n([\s\S]*?)```/);
  if (fence) code = fence[1];
  code = code.replace(/^﻿/, '').replace(/^export const \w+(?::\s*\w+\[\])? = /m, '').trim().replace(/;\s*$/, '');
  return new Function('return ' + code)();
}

const introRaw = fs.readFileSync(`${CDIR}/s7_入門課程.md`, 'utf8');
const advancedRaw = fs.readFileSync(`${CDIR}/s7_進階課程.md`, 'utf8');
const masterRaw = fs.readFileSync(`${CDIR}/s7_高階課程 (2).md`, 'utf8');

const introLessons = extractFencedBlocks(introRaw);
const advancedLessons = extractFencedBlocks(advancedRaw);
const masterLessons = extractExportArray(masterRaw);

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

const output = `// 📄 路徑：src/app/classroom/ai-diy/courses.ts
// S7 DIY AI實作系列課程（免費工具做自己的AI／自架本地AI入門／訓練一個迷你AI模型）

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

export const diyIntroCourse: Course = {
  id: 'diy-intro',
  title: '免費工具做自己的AI',
  emoji: '🛠️',
  description: '12堂課用免費工具動手做出屬於自己的AI應用，不用會寫程式。',
  lessons: [
${introLessons.map(l => lessonToTs(l)).join('\n')}
  ],
};

export const diyAdvancedCourse: Course = {
  id: 'diy-advanced',
  title: '自架本地AI入門',
  emoji: '🖥️',
  description: '10堂課看懂為什麼要自架本地AI、怎麼安裝、怎麼餵資料，親手跑一個屬於自己的模型。',
  lessons: [
${advancedLessons.map(l => lessonToTs(l)).join('\n')}
  ],
};

export const diyMasterCourse: Course = {
  id: 'diy-master',
  title: '訓練一個迷你AI模型',
  emoji: '🎒',
  description: '8堂課從資料整理、微調實戰到看懂訓練曲線，親手訓練一個屬於自己的迷你模型。',
  lessons: [
${masterLessons.map(l => lessonToTs(l)).join('\n')}
  ],
};

const diyCourses: Course[] = [diyIntroCourse, diyAdvancedCourse, diyMasterCourse];
export default diyCourses;
`;

fs.mkdirSync('src/app/classroom/ai-diy', { recursive: true });
fs.writeFileSync('src/app/classroom/ai-diy/courses.ts', output, 'utf8');
console.log('已寫入 src/app/classroom/ai-diy/courses.ts');
