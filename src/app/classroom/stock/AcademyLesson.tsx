'use client';
// 📄 路徑：src/app/classroom/stock/AcademyLesson.tsx
// 上課翻頁元件 — 接收 lesson，管理 slide 翻頁 + 測驗

import { useState } from 'react';
import type { Lesson, SlideChart } from './courses';
import AcademyQuiz from './AcademyQuiz';
import '../classroom.css';
import KlineAnatomy from './charts/KlineAnatomy';
import KlineRedBlack from './charts/KlineRedBlack';
import KlineShadow from './charts/KlineShadow';
import KlinePatterns from './charts/KlinePatterns';
import KlineCombo from './charts/KlineCombo';
import VolumeBar from './charts/VolumeBar';
import VolumeBreakout from './charts/VolumeBreakout';
import MaLines from './charts/MaLines';
import MaCrossGold from './charts/MaCrossGold';
import MaCrossDead from './charts/MaCrossDead';
import SupportResistance from './charts/SupportResistance';
import KdOscillator from './charts/KdOscillator';
import RsiLine from './charts/RsiLine';

function renderChart(chart: SlideChart) {
  switch (chart.type) {
    case 'kline-anatomy':      return <KlineAnatomy />;
    case 'kline-redblack':     return <KlineRedBlack />;
    case 'kline-shadow':       return <KlineShadow />;
    case 'kline-patterns':     return <KlinePatterns />;
    case 'kline-combo':        return <KlineCombo />;
    case 'volume-bar':         return <VolumeBar />;
    case 'volume-breakout':    return <VolumeBreakout />;
    case 'ma-lines':           return <MaLines />;
    case 'ma-cross-gold':      return <MaCrossGold />;
    case 'ma-cross-dead':      return <MaCrossDead />;
    case 'support-resistance': return <SupportResistance />;
    case 'kd-oscillator':      return <KdOscillator />;
    case 'rsi-line':           return <RsiLine />;
    default:                   return null;
  }
}

interface Props {
  lesson: Lesson;
  onComplete: () => void;
  onBack: () => void;
}

export default function AcademyLesson({ lesson, onComplete, onBack }: Props) {
  const [slideIndex, setSlideIndex] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);

  const slide = lesson.slides[slideIndex];
  const isLast = slideIndex === lesson.slides.length - 1;

  return (
    <div className="classroom-content">
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>

        {/* 頂部導航 */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
          <button
            onClick={onBack}
            style={{ background: 'none', border: 'none', color: '#6366f1', fontSize: '0.85rem', cursor: 'pointer' }}
          >
            ← 返回課程列表
          </button>
          <div style={{ color: '#64748b', fontSize: '0.8rem' }}>
            {lesson.emoji} {lesson.title}
          </div>
        </div>

        {/* 進度條 */}
        <div className="prog-wrap" style={{ marginBottom: '1.5rem' }}>
          <div
            className="prog-fill"
            style={{ width: `${((slideIndex + (showQuiz ? 1 : 0)) / (lesson.slides.length + 1)) * 100}%` }}
          />
        </div>

        {showQuiz ? (
          <AcademyQuiz quiz={lesson.quiz} onComplete={onComplete} />
        ) : (
          <div>
            {/* 講義卡片 */}
            <div className="slide-card" style={{ marginBottom: '1.2rem' }}>
              <h2 className="slide-title">{slide.title}</h2>
              <p className="slide-body">{slide.body}</p>
              {slide.chart && (
                <div className="slide-chart-wrap">
                  {renderChart(slide.chart)}
                </div>
              )}
            </div>

            {/* 翻頁按鈕 */}
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                className="btn-prev"
                onClick={() => setSlideIndex(i => Math.max(0, i - 1))}
                disabled={slideIndex === 0}
              >
                ← 上一頁
              </button>
              <button
                className="btn-next"
                onClick={() => isLast ? setShowQuiz(true) : setSlideIndex(i => i + 1)}
              >
                {isLast ? '做隨堂測驗 →' : '下一頁 →'}
              </button>
            </div>

            {/* 頁碼 */}
            <div style={{ textAlign: 'center', marginTop: '0.8rem', color: '#94a3b8', fontSize: '0.78rem' }}>
              {slideIndex + 1} / {lesson.slides.length}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
