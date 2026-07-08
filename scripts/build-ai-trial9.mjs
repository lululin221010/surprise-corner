// scripts/build-ai-trial9.mjs
// 用真正的課程內容重建 AiTrial9.tsx
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
  const startIdx = m.index + m[0].length - 1;
  const afterStart = cleaned.slice(startIdx);
  const endIdx = afterStart.lastIndexOf('};');
  return new Function('return ' + afterStart.slice(0, endIdx + 1))();
}
const EMOJI_POOL = ['🤖','🦾','🦿','🛰️','🔧','⚙️','🧭','🎛️','📡','🚀','🏭','🧩'];
function pickEmoji(title) {
  let hash = 0;
  for (const ch of title) hash = (hash * 31 + ch.codePointAt(0)) % EMOJI_POOL.length;
  return EMOJI_POOL[hash];
}
function normalizeIntro(obj) {
  return {
    id: obj.id, title: obj.title, emoji: pickEmoji(obj.title),
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
}
function normalizeNoSubtitle(obj) {
  return {
    id: obj.id, title: obj.title, emoji: pickEmoji(obj.title),
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

const introRaw = fs.readFileSync(`${CDIR}/s9_入門課程.md`, 'utf8');
const introSections = introRaw.split(/=====\s*檔案：機器入門\d+_課程\.md\s*=====/).slice(1);
const introAll = introSections.map(sec => {
  const cutIdx = sec.search(/=====\s*檔案/);
  const courseOnly = cutIdx === -1 ? sec : sec.slice(0, cutIdx);
  return normalizeIntro(extractLessonObject(courseOnly, /const lesson = /));
});

function extractFencedBlocksRaw(raw) {
  return [...raw.matchAll(/```typescript\n([\s\S]*?)```/g)].map(m => m[1].trim());
}
const advancedRaw = fs.readFileSync(`${CDIR}/s9_進階課程.md`, 'utf8');
const advancedAll = extractFencedBlocksRaw(advancedRaw).map(b => {
  const code = b.replace(/^export const \w+ = /, '').replace(/;\s*$/, '');
  return normalizeNoSubtitle(new Function('return ' + code)());
});

const masterRaw = fs.readFileSync(`${CDIR}/s9_高階課程.md`, 'utf8');
const masterSections = masterRaw.split(/=====\s*檔案：機器高階\d+\\?_課程\.md\s*=====/).slice(1);
const masterAll = masterSections.map(sec => {
  const cutIdx = sec.search(/=====\s*檔案/);
  const courseOnly = cutIdx === -1 ? sec : sec.slice(0, cutIdx);
  return normalizeNoSubtitle(extractLessonObject(courseOnly, /export const \w+ = /));
});

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
// 📄 路徑：src/app/classroom/bonus/ai-intro-9/AiTrial9.tsx
// AI書院系列9試讀本：機器人／具身智能 — 入門3堂 + 進階2堂 + 高階1堂
// 2026-07-08 重建：改用真正課程內容+統一NT$249定價

import AiTrialPage from '../AiTrialPage';
import type { AiLesson, AiSeriesMeta } from '../AiTrialPage';

const META: AiSeriesMeta = {
  seriesTitle: '機器人／具身智能',
  seriesEmoji: '🤖',
  seriesNum: 9,
  storePath: '/digital',
  catalog: {
    basic: {
      label: '機器入門冊',
      price: 'NT$249',
      lessons: [
${catalogLessons(introTitles, 3)}
      ],
    },
    intermediate: {
      label: '機器進階冊',
      price: 'NT$249',
      lessons: [
${catalogLessons(advancedTitles, 2)}
      ],
    },
    advanced: {
      label: '機器高階冊',
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

export default function AiTrial9() {
  return (
    <AiTrialPage
      meta={META}
      lessons={LESSONS}
      storageKey="sc_ai_trial9_done"
      bonusLabel="系列9·機器人書院試讀本"
    />
  );
}
`;

fs.writeFileSync('src/app/classroom/bonus/ai-intro-9/AiTrial9.tsx', output, 'utf8');
console.log('已重建 AiTrial9.tsx，入門' + introTitles.length + '/進階' + advancedTitles.length + '/高階' + masterTitles.length + '，試讀堂數：' + trialLessons.length);
