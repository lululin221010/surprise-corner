'use client';
// 📄 路徑：src/app/classroom/ai/AcademyLesson.tsx

import { useState, useEffect } from 'react';
import Image from 'next/image';
import type { Lesson, SlideChart } from './courses';
import AcademyQuiz from './AcademyQuiz';
import '../classroom.css';
import { renderAiChart } from './charts/AiCharts';
import {
  getCurrentEmail, awardLessonBonus, getAccount,
  type UserAccount,
} from '../coins';

const LESSON_CARDS: Record<string, { src: string; alt: string }[]> = {
  'ai-intro-lesson-2':    [{ src: '/images/lulu-cards/魯魯_知識卡_AI在猜字.png',       alt: 'AI在猜字知識卡' }],
  'ai-intro-lesson-3':    [{ src: '/images/lulu-cards/魯魯_知識卡_Token是什麼.png',     alt: 'Token是什麼知識卡' }],
  'ai-intro-lesson-4':    [{ src: '/images/lulu-cards/魯魯_知識卡_AI訓練是什麼.png',   alt: 'AI訓練是什麼知識卡' }],
  'ai-intro-lesson-6':    [{ src: '/images/lulu-cards/魯魯_知識卡_AI為什麼說錯話.png', alt: 'AI為什麼說錯話知識卡' }],
  'ai-advanced-lesson-2': [{ src: '/images/lulu-cards/魯魯_知識卡_上下文視窗.png',     alt: '上下文視窗知識卡' }],
};

function renderChart(chart: SlideChart) {
  return renderAiChart(chart);
}

interface Props {
  lesson: Lesson;
  onComplete: () => void;
  onBack: () => void;
  isFree?: boolean;
  isLastLesson?: boolean;
}

export default function AcademyLesson({ lesson, onComplete, onBack, isFree = false, isLastLesson = false }: Props) {
  const [slideIndex, setSlideIndex] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizIndex, setQuizIndex] = useState(0);
  const [email, setEmailState] = useState('');
  const [toastMsg, setToastMsg] = useState('');

  useEffect(() => {
    const em = getCurrentEmail();
    setEmailState(em);
  }, [lesson.id]);

  const totalSteps = lesson.slides.length + lesson.quizzes.length;
  const currentStep = showQuiz ? lesson.slides.length + quizIndex : slideIndex;
  const progress = Math.round((currentStep / totalSteps) * 100);

  const slide = lesson.slides[slideIndex];
  const isLastSlide = slideIndex === lesson.slides.length - 1;

  function showToast(msg: string) {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  }

  function handleRetry() {
    setSlideIndex(0);
    setShowQuiz(false);
    setQuizIndex(0);
  }

  const [lessonDone, setLessonDone] = useState(false);

  function handleQuizPass() {
    if (quizIndex < lesson.quizzes.length - 1) {
      setQuizIndex(i => i + 1);
    } else {
      if (email) {
        const { awarded, totalCoins } = awardLessonBonus(email, lesson.id);
        if (awarded) showToast(`🎉 完課 bonus！+2 🪙 累積 ${totalCoins} 金幣`);
      }
      setLessonDone(true);
    }
  }

  // 本堂完成畫面（有知識卡先秀卡）
  if (lessonDone) {
    const cards = LESSON_CARDS[lesson.id] ?? [];
    return (
      <div className="classroom-content">
        <div style={{ maxWidth: 560, margin: '0 auto', textAlign: 'center', paddingTop: '2rem' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🎉</div>
          <h2 style={{ color: '#1e1b4b', fontSize: '1.3rem', fontWeight: 800, marginBottom: '0.25rem' }}>
            {lesson.emoji} {lesson.title} 完課！
          </h2>
          {cards.length > 0 && (
            <>
              <p style={{ color: '#6b7280', fontSize: '0.85rem', marginBottom: '1.2rem' }}>
                手機長按 / 電腦右鍵，儲存知識卡帶走
              </p>
              {cards.map(card => (
                <div key={card.src} style={{ marginBottom: '1rem', borderRadius: '12px', overflow: 'hidden', border: '1px solid #e5e7eb' }}>
                  <Image src={card.src} alt={card.alt} width={560} height={560} style={{ width: '100%', height: 'auto', display: 'block' }} />
                </div>
              ))}
            </>
          )}
          <button
            onClick={onComplete}
            style={{ display: 'block', width: '100%', background: 'linear-gradient(135deg,#7c3aed,#2563eb)', color: '#fff', fontWeight: 700, fontSize: '0.95rem', border: 'none', borderRadius: '30px', padding: '0.85rem', cursor: 'pointer', marginBottom: '0.8rem', marginTop: '1rem' }}
          >
            繼續下一堂 →
          </button>
          <button
            onClick={onBack}
            style={{ background: 'none', border: 'none', color: '#7c3aed', fontSize: '0.88rem', cursor: 'pointer' }}
          >
            ← 回課程列表
          </button>
        </div>
      </div>
    );
  }

  // 測驗中
  if (showQuiz) {
    const quiz = lesson.quizzes[quizIndex];
    return (
      <div className="classroom-content">
        <button onClick={onBack} style={{ background: 'none', border: 'none', color: '#7c3aed', fontSize: '0.85rem', cursor: 'pointer', marginBottom: '1rem', padding: 0 }}>
          ← 返回課程列表
        </button>
        <div style={{ marginBottom: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.75rem', color: '#9ca3af' }}>
            <span>{lesson.emoji} {lesson.title}</span>
            <span>測驗 {quizIndex + 1} / {lesson.quizzes.length}</span>
          </div>
          <div style={{ height: '4px', borderRadius: '2px', background: '#ede9fe', overflow: 'hidden' }}>
            <div style={{ height: '100%', background: '#7c3aed', width: `${progress}%`, transition: 'width 0.3s' }} />
          </div>
        </div>
        <AcademyQuiz
          key={quizIndex}
          quiz={quiz}
          certInfo={{ lessonId: lesson.id, lessonTitle: lesson.title, quizIndex }}
          isLast={quizIndex === lesson.quizzes.length - 1 && isLastLesson}
          isFree={isFree}
          onPass={handleQuizPass}
          onRetry={handleRetry}
        />
        {toastMsg && (
          <div style={{ position: 'fixed', bottom: '80px', left: '50%', transform: 'translateX(-50%)', background: '#1e1b4b', color: '#fff', padding: '8px 18px', borderRadius: '20px', fontSize: '0.82rem', zIndex: 999 }}>
            {toastMsg}
          </div>
        )}
      </div>
    );
  }

  // 投影片中
  return (
    <div className="classroom-content">
      <button onClick={onBack} style={{ background: 'none', border: 'none', color: '#7c3aed', fontSize: '0.85rem', cursor: 'pointer', marginBottom: '0.8rem', padding: 0 }}>
        ← 返回課程列表
      </button>

      {/* 進度條 */}
      <div style={{ marginBottom: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.75rem', color: '#9ca3af' }}>
          <span>{lesson.emoji} {lesson.title}</span>
          <span>第 {slideIndex + 1} 頁 / {lesson.slides.length} 頁</span>
        </div>
        <div style={{ height: '4px', borderRadius: '2px', background: '#ede9fe', overflow: 'hidden' }}>
          <div style={{ height: '100%', background: '#7c3aed', width: `${progress}%`, transition: 'width 0.3s' }} />
        </div>
      </div>

      {/* 投影片卡 */}
      <div style={{ background: 'white', borderRadius: '16px', padding: '1.4rem 1.2rem', boxShadow: '0 2px 16px rgba(124,58,237,0.08)', marginBottom: '1rem', minHeight: '220px' }}>
        <h2 style={{ color: '#1e1b4b', fontSize: '1.15rem', fontWeight: 800, marginBottom: '1rem', lineHeight: 1.4 }}>
          {slide.title}
        </h2>
        <div style={{ color: '#374151', fontSize: '0.9rem', lineHeight: 1.8, whiteSpace: 'pre-line' }}>
          {slide.body.replace(/\*\*(.+?)\*\*/g, '$1')}
        </div>
        {slide.chart && (
          <div style={{ marginTop: '1.2rem' }}>
            {renderChart(slide.chart)}
          </div>
        )}
      </div>

      {/* 前進按鈕 */}
      <div style={{ display: 'flex', gap: '0.6rem' }}>
        {slideIndex > 0 && (
          <button className="btn-prev" style={{ flex: 1 }} onClick={() => setSlideIndex(i => i - 1)}>
            ← 上一頁
          </button>
        )}
        {!isLastSlide ? (
          <button className="btn-next" style={{ flex: 1 }} onClick={() => setSlideIndex(i => i + 1)}>
            下一頁 →
          </button>
        ) : lesson.quizzes.length > 0 ? (
          <button className="btn-next" style={{ flex: 1 }} onClick={() => setShowQuiz(true)}>
            開始測驗 →
          </button>
        ) : (
          <button className="btn-next" style={{ flex: 1 }} onClick={onComplete}>
            完成本堂課 →
          </button>
        )}
      </div>

      {toastMsg && (
        <div style={{ position: 'fixed', bottom: '80px', left: '50%', transform: 'translateX(-50%)', background: '#1e1b4b', color: '#fff', padding: '8px 18px', borderRadius: '20px', fontSize: '0.82rem', zIndex: 999 }}>
          {toastMsg}
        </div>
      )}
    </div>
  );
}
