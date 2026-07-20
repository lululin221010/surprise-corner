'use client';
// 📄 路徑：src/app/classroom/ai-robot/AcademyLesson.tsx

import { useState, useEffect } from 'react';
import type { Lesson } from './courses';
import AcademyQuiz from '../ai/AcademyQuiz';
import '../classroom.css';
import { getCurrentEmail, awardLessonBonus } from '../coins';
import { renderAiRobotChart } from './charts/AiRobotCharts';

interface Props {
  lesson: Lesson;
  onComplete: () => void;
  onBack: () => void;
  isFree?: boolean;
}

export default function AcademyLesson({ lesson, onComplete, onBack, isFree = false }: Props) {
  const [slideIndex, setSlideIndex] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizIndex, setQuizIndex] = useState(0);
  const [email, setEmailState] = useState('');
  const [toastMsg, setToastMsg] = useState('');

  useEffect(() => {
    setEmailState(getCurrentEmail());
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

  function handleQuizPass() {
    if (quizIndex < lesson.quizzes.length - 1) {
      setQuizIndex(i => i + 1);
    } else {
      if (email) {
        const { awarded, totalCoins } = awardLessonBonus(email, lesson.id);
        if (awarded) showToast(`🎉 完課 bonus！+2 🪙 累積 ${totalCoins} 金幣`);
      }
      onComplete();
    }
  }

  if (showQuiz) {
    const quiz = lesson.quizzes[quizIndex];
    return (
      <div className="classroom-content">
        <button onClick={onBack} style={{ background: 'none', border: 'none', color: '#0891b2', fontSize: '0.85rem', cursor: 'pointer', marginBottom: '1rem', padding: 0 }}>
          ← 返回課程列表
        </button>
        <div style={{ marginBottom: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.75rem', color: '#9ca3af' }}>
            <span>{lesson.emoji} {lesson.title}</span>
            <span>測驗 {quizIndex + 1} / {lesson.quizzes.length}</span>
          </div>
          <div style={{ height: '4px', borderRadius: '2px', background: '#cffafe', overflow: 'hidden' }}>
            <div style={{ height: '100%', background: '#0891b2', width: `${progress}%`, transition: 'width 0.3s' }} />
          </div>
        </div>
        <AcademyQuiz
          key={quizIndex}
          quiz={quiz}
          certInfo={{ lessonId: lesson.id, lessonTitle: lesson.title, quizIndex }}
          isLast={quizIndex === lesson.quizzes.length - 1}
          isFree={isFree}
          onPass={handleQuizPass}
          onRetry={handleRetry}
        />
        {toastMsg && (
          <div style={{ position: 'fixed', bottom: '80px', left: '50%', transform: 'translateX(-50%)', background: '#164e63', color: '#fff', padding: '8px 18px', borderRadius: '20px', fontSize: '0.82rem', zIndex: 999 }}>
            {toastMsg}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="classroom-content">
      <button onClick={onBack} style={{ background: 'none', border: 'none', color: '#0891b2', fontSize: '0.85rem', cursor: 'pointer', marginBottom: '0.8rem', padding: 0 }}>
        ← 返回課程列表
      </button>
      <div style={{ marginBottom: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.75rem', color: '#9ca3af' }}>
          <span>{lesson.emoji} {lesson.title}</span>
          <span>第 {slideIndex + 1} 頁 / {lesson.slides.length} 頁</span>
        </div>
        <div style={{ height: '4px', borderRadius: '2px', background: '#cffafe', overflow: 'hidden' }}>
          <div style={{ height: '100%', background: '#0891b2', width: `${progress}%`, transition: 'width 0.3s' }} />
        </div>
      </div>

      <div style={{ background: 'white', borderRadius: '16px', padding: '1.4rem 1.2rem', boxShadow: '0 2px 16px rgba(8,145,178,0.08)', marginBottom: '1rem', minHeight: '220px' }}>
        <h2 style={{ color: '#164e63', fontSize: '1.15rem', fontWeight: 800, marginBottom: '1rem', lineHeight: 1.4 }}>
          {slide.title}
        </h2>
        <div style={{ color: '#374151', fontSize: '0.9rem', lineHeight: 1.8, whiteSpace: 'pre-line' }}>
          {slide.body.replace(/\*\*(.+?)\*\*/g, '$1')}
        </div>
        {slide.chart && (
          <div style={{ marginTop: '1.2rem' }}>
            {renderAiRobotChart(slide.chart)}
          </div>
        )}
      </div>

      <div style={{ display: 'flex', gap: '0.6rem' }}>
        {slideIndex > 0 && (
          <button className="btn-prev" style={{ flex: 1 }} onClick={() => setSlideIndex(i => i - 1)}>
            ← 上一頁
          </button>
        )}
        {!isLastSlide ? (
          <button className="btn-next" style={{ flex: 1, background: 'linear-gradient(135deg,#0891b2,#0e7490)' }} onClick={() => setSlideIndex(i => i + 1)}>
            下一頁 →
          </button>
        ) : lesson.quizzes.length > 0 ? (
          <button className="btn-next" style={{ flex: 1, background: 'linear-gradient(135deg,#0891b2,#0e7490)' }} onClick={() => setShowQuiz(true)}>
            開始測驗 →
          </button>
        ) : (
          <button className="btn-next" style={{ flex: 1, background: 'linear-gradient(135deg,#0891b2,#0e7490)' }} onClick={onComplete}>
            完成本堂課 →
          </button>
        )}
      </div>

      {toastMsg && (
        <div style={{ position: 'fixed', bottom: '80px', left: '50%', transform: 'translateX(-50%)', background: '#164e63', color: '#fff', padding: '8px 18px', borderRadius: '20px', fontSize: '0.82rem', zIndex: 999 }}>
          {toastMsg}
        </div>
      )}
    </div>
  );
}
