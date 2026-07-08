// scripts/build-ai-trial6.mjs
// 用真正的課程內容重建 AiTrial6.tsx
import fs from 'fs';

const CDIR = 'C:/Users/user/Desktop/有的沒的小舖/驚喜樂世界/驚喜學院/AI書院/課程';

function extractExportArray(raw) {
  let code = raw;
  const fence = raw.match(/```typescript\n([\s\S]*?)```/);
  if (fence) code = fence[1];
  code = code.replace(/^﻿/, '').replace(/^export const \w+(?::\s*\w+\[\])? = /m, '').trim().replace(/;\s*$/, '');
  return new Function('return ' + code)();
}

const introRaw = fs.readFileSync(`${CDIR}/s6_入門課程.md`, 'utf8');
const introCodeOnly = introRaw.split(/\n---\n/)[0];
const introMatch = introCodeOnly.match(/export const \w+: Course = (\{[\s\S]*\n\});/);
const introCourseObj = new Function('return ' + introMatch[1])();
const introAll = introCourseObj.lessons;

const advancedRaw = fs.readFileSync(`${CDIR}/s6_進階課程 (2).md`, 'utf8');
const masterRaw = fs.readFileSync(`${CDIR}/s6_高階課程 (2).md`, 'utf8');
const advancedAll = extractExportArray(advancedRaw);
const masterAll = extractExportArray(masterRaw);

const introTitles = introAll.map(l => l.title);
const advancedTitles = advancedAll.map(l => l.title);
const masterTitles = masterAll.map(l => l.title);

const trialLessons = [...introAll.slice(0, 3), ...advancedAll.slice(0, 2), masterAll[0]];

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
// 📄 路徑：src/app/classroom/bonus/ai-intro-6/AiTrial6.tsx
// AI書院系列6試讀本：AI心理學 — 入門3堂 + 進階2堂 + 高階1堂
// 2026-07-08 重建：改用真正課程內容+統一NT$249定價

import AiTrialPage from '../AiTrialPage';
import type { AiLesson, AiSeriesMeta } from '../AiTrialPage';

const META: AiSeriesMeta = {
  seriesTitle: 'AI心理學',
  seriesEmoji: '🪞',
  seriesNum: 6,
  storePath: '/digital',
  catalog: {
    basic: {
      label: '心理入門冊',
      price: 'NT$249',
      lessons: [
${catalogLessons(introTitles, 3)}
      ],
    },
    intermediate: {
      label: '心理進階冊',
      price: 'NT$249',
      lessons: [
${catalogLessons(advancedTitles, 2)}
      ],
    },
    advanced: {
      label: '心理高階冊',
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

export default function AiTrial6() {
  return (
    <AiTrialPage
      meta={META}
      lessons={LESSONS}
      storageKey="sc_ai_trial6_done"
      bonusLabel="系列6·AI心理學試讀本"
    />
  );
}
`;

fs.writeFileSync('src/app/classroom/bonus/ai-intro-6/AiTrial6.tsx', output, 'utf8');
console.log('已重建 AiTrial6.tsx，入門' + introTitles.length + '/進階' + advancedTitles.length + '/高階' + masterTitles.length + '，試讀堂數：' + trialLessons.length);
