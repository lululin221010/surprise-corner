// 📄 路徑：src/app/classroom/stock/courses.ts
// 課程資料 — 內容由妹另外提供後填入

export interface SlideChart {
  type:
    | 'kline-anatomy'
    | 'kline-redblack'
    | 'kline-shadow'
    | 'kline-patterns'
    | 'kline-combo'
    | 'volume-bar'
    | 'volume-breakout'
    | 'ma-lines'
    | 'ma-cross-gold'
    | 'ma-cross-dead'
    | 'support-resistance'
    | 'kd-oscillator'
    | 'rsi-line'
  config?: Record<string, unknown>
}

export interface Slide {
  title: string;
  body: string;
  chart?: SlideChart;
}

export interface QuizOption {
  label: string;
  correct: boolean;
  explanation: string;
}

export interface Quiz {
  question: string;
  options: QuizOption[];
}

export interface Lesson {
  id: string;
  title: string;
  emoji: string;
  duration: string; // e.g. '5分鐘'
  slides: Slide[];
  quiz: Quiz;
}

export interface Course {
  id: string;
  title: string;
  emoji: string;
  desc: string;
  lessons: Lesson[];
}

// 佔位資料，等妹提供內容後替換
const courses: Course[] = [
  {
    id: 'intro',
    title: '股市基礎入門',
    emoji: '📚',
    desc: '什麼是股票？為什麼要投資？從最基本的觀念開始。',
    lessons: [
      {
        id: 'intro-1',
        title: '股票是什麼？',
        emoji: '🏢',
        duration: '5分鐘',
        slides: [
          {
            title: '股票是一張所有權憑證',
            body: '課程內容整備中……',
            chart: { type: 'kline-anatomy' },
          },
        ],
        quiz: {
          question: '佔位測驗題目',
          options: [
            { label: '選項 A', correct: true, explanation: '正確！說明文字。' },
            { label: '選項 B', correct: false, explanation: '不對，說明文字。' },
          ],
        },
      },
    ],
  },
];

export default courses;
