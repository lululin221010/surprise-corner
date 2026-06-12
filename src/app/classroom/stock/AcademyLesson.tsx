'use client';
// 📄 路徑：src/app/classroom/stock/AcademyLesson.tsx

import { useState, useEffect } from 'react';
import type { Lesson, SlideChart } from './courses';
import AcademyQuiz from './AcademyQuiz';
import '../classroom.css';
import {
  getCurrentEmail, awardLessonBonus, useInventory, saveBookmark, getBookmark, getAccount,
  type UserAccount,
} from '../coins';
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
import TrendlineBasic from './charts/TrendlineBasic';
import TrendlineBreakout from './charts/TrendlineBreakout';
import TrendlineChannel from './charts/TrendlineChannel';
import TrendlineMaConfirm from './charts/TrendlineMaConfirm';

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
    case 'trendline-basic':      return <TrendlineBasic />;
    case 'trendline-breakout':   return <TrendlineBreakout />;
    case 'trendline-channel':    return <TrendlineChannel />;
    case 'trendline-ma-confirm': return <TrendlineMaConfirm />;
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
  const [quizIndex, setQuizIndex] = useState(0);
  const [email, setEmailState] = useState('');
  const [account, setAccount] = useState<UserAccount | null>(null);
  const [toastMsg, setToastMsg] = useState('');

  // 初始化：載入 email + 書籤
  useEffect(() => {
    const em = getCurrentEmail();
    setEmailState(em);
    if (em) {
      setAccount(getAccount(em));
      const bk = getBookmark(em, lesson.id);
      if (bk !== null) setSlideIndex(bk);
    }
  }, [lesson.id]);

  const totalSteps = lesson.slides.length + lesson.quizzes.length;
  const currentStep = showQuiz
    ? lesson.slides.length + quizIndex
    : slideIndex;
  const progress = Math.round((currentStep / totalSteps) * 100);

  const slide = lesson.slides[slideIndex];
  const isLastSlide = slideIndex === lesson.slides.length - 1;

  function showToast(msg: string) {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  }

  // 書籤功能
  function handleBookmark() {
    if (!email) {
      showToast('請先在測驗頁輸入 Email 才能使用書籤');
      return;
    }
    const ok = useInventory(email, 'bookmark');
    if (!ok) {
      showToast('📌 書籤不足，前往商店購買');
      return;
    }
    saveBookmark(email, lesson.id, slideIndex);
    setAccount(getAccount(email));
    showToast(`📌 已在第 ${slideIndex + 1} 頁插入書籤！`);
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
      // 全部完成：+2🪙 bonus（每堂課只給一次）
      if (email) {
        const { awarded, totalCoins } = awardLessonBonus(email, lesson.id);
        if (awarded) showToast(`🎉 完課 bonus！+2 🪙 累積 ${totalCoins} 金幣`);
      }
      onComplete();
    }
  }

  const bookmarkCount = account?.inventory?.bookmark ?? 0;

  return (
    <div className="classroom-content">
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>

        {/* Toast */}
        {toastMsg && (
          <div style={{
            position: 'fixed', top: '1.2rem', left: '50%', transform: 'translateX(-50%)',
            background: '#1e1b4b', color: '#fff', borderRadius: '20px',
            padding: '8px 20px', fontSize: '0.82rem', fontWeight: 600,
            zIndex: 9999, boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            whiteSpace: 'nowrap',
          }}>
            {toastMsg}
          </div>
        )}

        {/* 頂部導航 */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <button
            onClick={onBack}
            style={{ background: 'none', border: 'none', color: '#7c3aed', fontSize: '0.85rem', cursor: 'pointer' }}
          >
            ← 返回課程列表
          </button>
          <div style={{ color: '#64748b', fontSize: '0.78rem' }}>
            {lesson.emoji} {lesson.title}
          </div>
        </div>

        {/* 進度條 */}
        <div className="prog-wrap" style={{ marginBottom: '1.5rem' }}>
          <div className="prog-fill" style={{ width: `${progress}%` }} />
        </div>

        {showQuiz ? (
          <>
            {/* 測驗頂部：返回講義 + 題號 */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
              <button
                onClick={() => { setShowQuiz(false); setSlideIndex(lesson.slides.length - 1); }}
                style={{ background: 'none', border: 'none', color: '#7c3aed', fontSize: '0.82rem', cursor: 'pointer' }}
              >
                ← 回上一頁講義
              </button>
              <div style={{ color: '#a78bfa', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.08em' }}>
                隨堂測驗 {quizIndex + 1} / {lesson.quizzes.length}
              </div>
            </div>
            {/* key={quizIndex} 確保換題時 state 完全重置 */}
            <AcademyQuiz
              key={quizIndex}
              quiz={lesson.quizzes[quizIndex]}
              certInfo={{ lessonId: lesson.id, lessonTitle: lesson.title, quizIndex }}
              onPass={handleQuizPass}
              onRetry={handleRetry}
            />
          </>
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

            {/* 翻頁 + 書籤 */}
            <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
              <button
                className="btn-prev"
                onClick={() => setSlideIndex(i => Math.max(0, i - 1))}
                disabled={slideIndex === 0}
                style={{ flex: '0 0 auto' }}
              >
                ← 上一頁
              </button>
              <button
                className="btn-next"
                style={{ flex: 1 }}
                onClick={() => {
                  if (isLastSlide) {
                    setShowQuiz(true);
                    setQuizIndex(0);
                  } else {
                    setSlideIndex(i => i + 1);
                  }
                }}
              >
                {isLastSlide ? `做隨堂測驗（${lesson.quizzes.length}題）→` : '下一頁 →'}
              </button>
              {/* 書籤按鈕 */}
              <button
                onClick={handleBookmark}
                title={`書籤 ×${bookmarkCount}，儲存目前頁面`}
                style={{
                  flex: '0 0 auto',
                  background: bookmarkCount > 0 ? '#fef9c3' : '#f3f4f6',
                  border: `1px solid ${bookmarkCount > 0 ? '#fde68a' : '#e5e7eb'}`,
                  borderRadius: '9px', padding: '9px 12px',
                  fontSize: '1rem', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: '4px',
                }}
              >
                📌
                <span style={{ fontSize: '0.7rem', color: '#92400e' }}>{bookmarkCount}</span>
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
