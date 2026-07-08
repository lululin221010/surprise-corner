// scripts/build-ai-trial5.mjs
// 用真正的課程內容重建 AiTrial5.tsx
import fs from 'fs';

const CDIR = 'C:/Users/user/Desktop/有的沒的小舖/驚喜樂世界/驚喜學院/AI書院/課程';

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
  const afterStart = cleaned.slice(startIdx);
  const endIdx = afterStart.lastIndexOf('};');
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
const EMOJI_POOL = ['🤝','💼','⚖️','📜','🎓','👨‍👩‍👧','🧓','🔗','💡','🧭','🌟','🎯','🛡️'];
function pickEmoji(title) {
  let hash = 0;
  for (const ch of title) hash = (hash * 31 + ch.codePointAt(0)) % EMOJI_POOL.length;
  return EMOJI_POOL[hash];
}
function normalizeIntroLesson(obj) {
  return {
    id: obj.id, title: obj.title, emoji: pickEmoji(obj.title),
    description: obj.subtitle || '',
    duration: typeof obj.duration === 'number' ? `${obj.duration}分鐘` : obj.duration,
    tier: obj.tier,
    slides: obj.slides.map(s => ({ title: s.title, body: s.content })),
    quizzes: (obj.quiz || obj.quizzes).map(mapQuiz),
  };
}

const introRaw = fs.readFileSync(`${CDIR}/s5_入門課程.md`, 'utf8');
const introSections = introRaw.split(/=====\s*檔案：共存入門\d+\\?_課程\.md\s*=====/).slice(1);
const introRawObjs = introSections.map(sec => {
  const cutIdx = sec.search(/=====\s*檔案/);
  const courseOnly = cutIdx === -1 ? sec : sec.slice(0, cutIdx);
  return extractLessonObject(courseOnly);
});
// 試讀只需要前3堂完整內容，其餘只取標題做catalog；第10/12堂是特殊格式(互動測驗/時間軸)不在試讀範圍內不需要normalize
const introAll = introRawObjs.map((obj, i) => (i < 3 ? normalizeIntroLesson(obj) : { title: obj.title }));

const advancedRaw = fs.readFileSync(`${CDIR}/s5_進階課程 (2).md`, 'utf8');
const masterRaw = fs.readFileSync(`${CDIR}/s5_高階課程 (2).md`, 'utf8');
function extractExportArray(raw) {
  let code = raw;
  const fence = raw.match(/```typescript\n([\s\S]*?)```/);
  if (fence) code = fence[1];
  code = code.replace(/^﻿/, '').replace(/^export const \w+(?::\s*\w+\[\])? = /m, '').trim().replace(/;\s*$/, '');
  return new Function('return ' + code)();
}
const advancedAll = extractExportArray(advancedRaw);
const masterAll = extractExportArray(masterRaw);

const introTitles = introAll.map(l => l.title);
const advancedTitles = advancedAll.map(l => l.title);
const masterTitles = masterAll.map(l => l.title);

const trialLessons = [
  ...introAll.slice(0, 3),
  ...advancedAll.slice(0, 2).map(l => ({ ...l, emoji: pickEmoji(l.title) })),
  { ...masterAll[0], emoji: pickEmoji(masterAll[0].title) },
];

function lessonToTs(lesson) {
  const slidesStr = lesson.slides.map(s => `      {
        title: ${JSON.stringify(s.title)},
        body: ${JSON.stringify(s.body)},
      },`).join('\n');
  const quizzesStr = lesson.quizzes.map(q => `      {
        question: ${JSON.stringify(q.question)},
        options: ${JSON.stringify(q.options)},
        answerIndex: ${q.answerIndex},
        explanation: ${JSON.stringify(q.explanation)},
      },`).join('\n');
  return `  {
    id: ${JSON.stringify(lesson.id)},
    title: ${JSON.stringify(lesson.title)},
    emoji: ${JSON.stringify(lesson.emoji)},
    description: ${JSON.stringify(lesson.description)},
    duration: ${JSON.stringify(lesson.duration)},
    tier: ${JSON.stringify(lesson.tier)},
    slides: [
${slidesStr}
    ],
    quizzes: [
${quizzesStr}
    ],
  },`;
}
function catalogLessons(titles, trialCount) {
  return titles.map((t, i) => `        { title: ${JSON.stringify(t)}, isTrial: ${i < trialCount} },`).join('\n');
}

const output = `'use client';
// 📄 路徑：src/app/classroom/bonus/ai-intro-5/AiTrial5.tsx
// AI書院系列5試讀本：互動共存 — 入門3堂 + 進階2堂 + 高階1堂
// 2026-07-08 重建：改用真正課程內容+統一NT$249定價

import AiTrialPage from '../AiTrialPage';
import type { AiLesson, AiSeriesMeta } from '../AiTrialPage';

const META: AiSeriesMeta = {
  seriesTitle: '互動共存',
  seriesEmoji: '🤝',
  seriesNum: 5,
  storePath: '/digital',
  catalog: {
    basic: {
      label: '共存入門冊',
      price: 'NT$249',
      lessons: [
${catalogLessons(introTitles, 3)}
      ],
    },
    intermediate: {
      label: '共存進階冊',
      price: 'NT$249',
      lessons: [
${catalogLessons(advancedTitles, 2)}
      ],
    },
    advanced: {
      label: '共存高階冊',
      price: 'NT$249',
      lessons: [
${catalogLessons(masterTitles, 1)}
      ],
    },
  },
};

const LESSONS: AiLesson[] = [
${trialLessons.map(lessonToTs).join('\n')}
];

export default function AiTrial5() {
  return (
    <AiTrialPage
      meta={META}
      lessons={LESSONS}
      storageKey="sc_ai_trial5_done"
      bonusLabel="系列5·互動共存試讀本"
    />
  );
}
`;

fs.writeFileSync('src/app/classroom/bonus/ai-intro-5/AiTrial5.tsx', output, 'utf8');
console.log('已重建 AiTrial5.tsx，入門' + introTitles.length + '/進階' + advancedTitles.length + '/高階' + masterTitles.length + '，試讀堂數：' + trialLessons.length);
