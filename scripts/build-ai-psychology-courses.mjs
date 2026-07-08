// scripts/build-ai-psychology-courses.mjs
// 合併系列6三份課程MD -> src/app/classroom/ai-psychology-hub/courses.ts
// s6_入門課程.md是完整合法TS模組(export const psychologyIntroCourse: Course = {...})，直接取.lessons即可
// 執行：node scripts/build-ai-psychology-courses.mjs

import fs from 'fs';

const CDIR = 'C:/Users/user/Desktop/有的沒的小舖/驚喜樂世界/驚喜學院/AI書院/課程';

function extractExportArray(raw) {
  let code = raw;
  const fence = raw.match(/```typescript\n([\s\S]*?)```/);
  if (fence) code = fence[1];
  code = code.replace(/^﻿/, '').replace(/^export const \w+(?::\s*\w+\[\])? = /m, '').trim().replace(/;\s*$/, '');
  return new Function('return ' + code)();
}

// 入門冊：完整合法TS模組，取export const xxxCourse = {...}.lessons
const introRaw = fs.readFileSync(`${CDIR}/s6_入門課程.md`, 'utf8');
const introCodeOnly = introRaw.split(/\n---\n/)[0]; // 只取程式碼部分，作者簡介在---之後
const introMatch = introCodeOnly.match(/export const \w+: Course = (\{[\s\S]*\n\});/);
if (!introMatch) throw new Error('找不到入門冊 Course 物件');
const introCourseObj = new Function('return ' + introMatch[1])();
const introLessons = introCourseObj.lessons;

const advancedRaw = fs.readFileSync(`${CDIR}/s6_進階課程 (2).md`, 'utf8');
const masterRaw = fs.readFileSync(`${CDIR}/s6_高階課程 (2).md`, 'utf8');
const advancedLessons = extractExportArray(advancedRaw);
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

const output = `// 📄 路徑：src/app/classroom/ai-psychology-hub/courses.ts
// S6 AI心理學系列課程（AI有沒有自我意識／AI怎麼看人類／AI的偏見從哪來）

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

export const psychologyIntroCourse: Course = {
  id: 'ai-psychology-intro',
  title: 'AI有沒有自我意識',
  emoji: '🪞',
  description: '13堂課從哲學、科學與日常對話出發，探索AI是否真的「懂得」自己、是否擁有感受、意識與人格。',
  lessons: [
${introLessons.map(l => lessonToTs(l)).join('\n')}
  ],
};

export const psychologyAdvancedCourse: Course = {
  id: 'ai-psychology-advanced',
  title: 'AI怎麼看人類',
  emoji: '👁️',
  description: '10堂課看懂AI眼中的你——印象怎麼形成、情緒怎麼判斷、隱私怎麼處理。',
  lessons: [
${advancedLessons.map(l => lessonToTs(l)).join('\n')}
  ],
};

export const psychologyMasterCourse: Course = {
  id: 'ai-psychology-master',
  title: 'AI的偏見從哪來',
  emoji: '🧬',
  description: '9堂課拆解幻覺心理學、訓練資料偏見、怎麼當一個有判斷力的AI使用者。',
  lessons: [
${masterLessons.map(l => lessonToTs(l)).join('\n')}
  ],
};

const psychologyHubCourses: Course[] = [psychologyIntroCourse, psychologyAdvancedCourse, psychologyMasterCourse];
export default psychologyHubCourses;
`;

fs.mkdirSync('src/app/classroom/ai-psychology-hub', { recursive: true });
fs.writeFileSync('src/app/classroom/ai-psychology-hub/courses.ts', output, 'utf8');
console.log('已寫入 src/app/classroom/ai-psychology-hub/courses.ts');
