// scripts/build-ai-trial8.mjs
// 用真正的課程內容重建 AiTrial8.tsx
// 系列8只有上下2冊(不是3階)，試讀分組：上冊→basic、下冊→intermediate，高階(advanced)留空
import fs from 'fs';

const CDIR = 'C:/Users/user/Desktop/有的沒的小舖/驚喜樂世界/驚喜學院/AI書院/課程';

function extractFencedBlocks(raw) {
  const blocks = [...raw.matchAll(/```typescript\n([\s\S]*?)```/g)].map(m => m[1].trim());
  return blocks.map(b => new Function('return ' + b)());
}

const upperRaw = fs.readFileSync(`${CDIR}/s8_上冊課程.md`, 'utf8');
const lowerRaw = fs.readFileSync(`${CDIR}/s8_下冊課程.md`, 'utf8');
const upperAll = extractFencedBlocks(upperRaw);
const lowerAll = extractFencedBlocks(lowerRaw);

const upperTitles = upperAll.map(l => l.title);
const lowerTitles = lowerAll.map(l => l.title);

// 試讀改成上冊3堂+下冊3堂（共6堂），tier改標成basic/intermediate方便試讀頁分組
const trialLessons = [
  ...upperAll.slice(0, 3).map(l => ({ ...l, tier: 'basic' })),
  ...lowerAll.slice(0, 3).map(l => ({ ...l, tier: 'intermediate' })),
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
// 📄 路徑：src/app/classroom/bonus/ai-intro-8/AiTrial8.tsx
// AI書院系列8試讀本：AI世界局勢 — 只有上/下2冊，不是3階；上冊3堂+下冊3堂試讀
// 2026-07-08 重建：改用真正課程內容+統一NT$249定價

import AiTrialPage from '../AiTrialPage';
import type { AiLesson, AiSeriesMeta } from '../AiTrialPage';

const META: AiSeriesMeta = {
  seriesTitle: 'AI世界局勢',
  seriesEmoji: '🛡️',
  seriesNum: 8,
  storePath: '/digital',
  catalog: {
    basic: {
      label: '上冊《AI安全與失控邊界》',
      price: 'NT$249',
      lessons: [
${catalogLessons(upperTitles, 3)}
      ],
    },
    intermediate: {
      label: '下冊《AI世界大戰》',
      price: 'NT$249',
      lessons: [
${catalogLessons(lowerTitles, 3)}
      ],
    },
    advanced: {
      label: '',
      price: '',
      lessons: [],
    },
  },
};

const LESSONS: AiLesson[] = [
${trialLessons.map(lessonToTs).join('\n')}
];

export default function AiTrial8() {
  return (
    <AiTrialPage
      meta={META}
      lessons={LESSONS}
      storageKey="sc_ai_trial8_done"
      bonusLabel="系列8·AI世界局勢試讀本"
    />
  );
}
`;

fs.writeFileSync('src/app/classroom/bonus/ai-intro-8/AiTrial8.tsx', output, 'utf8');
console.log('已重建 AiTrial8.tsx，上冊' + upperTitles.length + '/下冊' + lowerTitles.length + '，試讀堂數：' + trialLessons.length);
