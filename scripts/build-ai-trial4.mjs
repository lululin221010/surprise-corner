// scripts/build-ai-trial4.mjs
// 用真正的課程內容重建 AiTrial4.tsx（原本的catalog/pricing是舊草稿，跟官方課程對不上）
import fs from 'fs';

const CDIR = 'C:/Users/user/Desktop/有的沒的小舖/驚喜樂世界/驚喜學院/AI書院/課程';

function extractFencedBlocks(raw) {
  return [...raw.matchAll(/```typescript\n([\s\S]*?)```/g)].map(m => new Function('return ' + m[1].trim())());
}
function extractConstLessons(raw) {
  return [...raw.matchAll(/const \w+ = (\{[\s\S]*?\n\});/g)].map(m => {
    const obj = new Function('return ' + m[1])();
    return {
      id: obj.id, title: obj.title, description: obj.subtitle || '',
      duration: typeof obj.duration === 'number' ? `${obj.duration}分鐘` : obj.duration,
      tier: obj.tier,
      slides: obj.slides.map(s => ({ title: s.title, body: s.content })),
      quizzes: (obj.quiz || obj.quizzes).map(q => ({ question: q.question, options: q.options, answerIndex: q.answerIndex, explanation: q.explanation })),
    };
  });
}
const EMOJI_POOL = ['🤔','🧩','🔗','📚','🗂️','🎨','💡','🧠','⚡','🔍','🎭','🧭','🌟'];
function pickEmoji(title) {
  let hash = 0;
  for (const ch of title) hash = (hash * 31 + ch.codePointAt(0)) % EMOJI_POOL.length;
  return EMOJI_POOL[hash];
}

const introRaw = fs.readFileSync(`${CDIR}/s4_入門課程.md`, 'utf8');
const advancedRaw = fs.readFileSync(`${CDIR}/s4_進階課程.md`, 'utf8');

const introAll = extractFencedBlocks(introRaw);       // 13
const advancedAll = extractConstLessons(advancedRaw); // 10

// 官方章節標題（供catalog使用，全部13+10+9）
const introTitles = introAll.map(l => l.title);
const advancedTitles = advancedAll.map(l => l.title);
const masterTitles = [
  '真正的創意從哪裡來','人類的痛苦經驗無法被AI複製','道德判斷：AI能模仿，但不能「決定」',
  '真正的同理心 vs AI的模擬同理心','人類會為了「沒道理」的事堅持','AI沒有真正的目標，人類有',
  '人類能承擔責任，AI不能','人類的關係連結，AI模擬不來','這個時代，人類最該保留什麼能力',
];

const trialLessons = [
  ...introAll.slice(0, 3).map(l => ({ ...l, emoji: l.emoji || pickEmoji(l.title) })),
  ...advancedAll.slice(0, 2).map(l => ({ ...l, emoji: pickEmoji(l.title) })),
];
// 高階第1堂需從C改寫版取
const masterRaw = fs.readFileSync(`${CDIR}/s4_高階課程 (2).md`, 'utf8');
function extractExportArray(raw) {
  let code = raw;
  const fence = raw.match(/```typescript\n([\s\S]*?)```/);
  if (fence) code = fence[1];
  code = code.replace(/^﻿/, '').replace(/^export const \w+(?::\s*\w+\[\])? = /m, '').trim().replace(/;\s*$/, '');
  return new Function('return ' + code)();
}
const masterAll = extractExportArray(masterRaw);
trialLessons.push(masterAll[0]);

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
// 📄 路徑：src/app/classroom/bonus/ai-intro-4/AiTrial4.tsx
// AI書院系列4試讀本：AI思考力 — 入門3堂 + 進階2堂 + 高階1堂
// 2026-07-08 重建：原本catalog標題/定價是早期草稿，跟官方課程規劃(AI書院_完整章節規劃)對不上，已改用真正課程內容+統一NT$249定價

import AiTrialPage from '../AiTrialPage';
import type { AiLesson, AiSeriesMeta } from '../AiTrialPage';

const META: AiSeriesMeta = {
  seriesTitle: 'AI思考力',
  seriesEmoji: '🤔',
  seriesNum: 4,
  storePath: '/digital',
  catalog: {
    basic: {
      label: '思考入門冊',
      price: 'NT$249',
      lessons: [
${catalogLessons(introTitles, 3)}
      ],
    },
    intermediate: {
      label: '思考進階冊',
      price: 'NT$249',
      lessons: [
${catalogLessons(advancedTitles, 2)}
      ],
    },
    advanced: {
      label: '思考高階冊',
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

export default function AiTrial4() {
  return (
    <AiTrialPage
      meta={META}
      lessons={LESSONS}
      storageKey="sc_ai_trial4_done"
      bonusLabel="系列4·AI思考力試讀本"
    />
  );
}
`;

fs.writeFileSync('src/app/classroom/bonus/ai-intro-4/AiTrial4.tsx', output, 'utf8');
console.log('已重建 AiTrial4.tsx，入門' + introTitles.length + '/進階' + advancedTitles.length + '/高階' + masterTitles.length + '，試讀堂數：' + trialLessons.length);
