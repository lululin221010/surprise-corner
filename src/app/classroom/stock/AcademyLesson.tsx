'use client';
// 📄 路徑：src/app/classroom/stock/AcademyLesson.tsx

import { useState, useEffect } from 'react';
import Image from 'next/image';

const LESSON_CARDS: Record<string, { src: string; alt: string }[]> = {
  'kline':     [{ src: '/images/lulu-cards/魯魯_知識卡_K線是什麼.png', alt: 'K線是什麼知識卡' }],
  'lesson-8':  [{ src: '/images/lulu-cards/魯魯_知識卡_三大法人.png', alt: '三大法人知識卡' }],
  'lesson-13': [{ src: '/images/lulu-cards/魯魯_知識卡_停損觀念.png', alt: '停損觀念知識卡' }],
  'lesson-14': [
    { src: '/images/lulu-cards/魯魯_知識卡_損失規避.png', alt: '損失規避知識卡' },
    { src: '/images/lulu-cards/魯魯_知識卡_確認偏誤.png', alt: '確認偏誤知識卡' },
  ],
};
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
import AdvancedChart from './charts/AdvancedCharts';

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
    // 進階課新圖殼統一走 AdvancedCharts registry
    default:                   return <AdvancedChart type={chart.type} />;
  }
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
  const [showLessonCard, setShowLessonCard] = useState(false);
  const [lessonDone, setLessonDone] = useState(false);
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
      if (LESSON_CARDS[lesson.id]) {
        setShowLessonCard(true);
      } else {
        setLessonDone(true);
      }
    }
  }

  const bookmarkCount = account?.inventory?.bookmark ?? 0;

  if (lessonDone) {
    return (
      <div className="classroom-content">
        <div style={{ maxWidth: 560, margin: '0 auto', textAlign: 'center', paddingTop: '3rem' }}>
          <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>✅</div>
          <h2 style={{ color: '#1e1b4b', fontSize: '1.3rem', fontWeight: 800, marginBottom: '0.5rem' }}>
            {lesson.emoji} {lesson.title}
          </h2>
          <p style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '2rem' }}>本堂完成！</p>
          <button
            onClick={onComplete}
            style={{ display: 'block', width: '100%', background: 'linear-gradient(135deg,#7c3aed,#2563eb)', color: '#fff', fontWeight: 700, fontSize: '0.95rem', border: 'none', borderRadius: '30px', padding: '0.85rem', cursor: 'pointer', marginBottom: '0.8rem' }}
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

  if (showLessonCard) {
    const cards = LESSON_CARDS[lesson.id] ?? [];
    return (
      <div className="classroom-content">
        <div style={{ maxWidth: 560, margin: '0 auto', padding: '2rem 1rem', textAlign: 'center' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🎉</div>
          <h2 style={{ color: '#fff', fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.25rem' }}>
            {lesson.title} 完課！
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
            手機長按 / 電腦右鍵，儲存知識卡帶走
          </p>
          {cards.map((card) => (
            <div key={card.src} style={{ marginBottom: '1rem', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
              <Image src={card.src} alt={card.alt} width={560} height={420} style={{ width: '100%', height: 'auto', display: 'block' }} />
            </div>
          ))}
          <button
            onClick={onComplete}
            style={{
              marginTop: '1rem', width: '100%',
              background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
              color: '#fff', fontWeight: 700, fontSize: '1rem',
              border: 'none', borderRadius: '30px', padding: '0.75rem 2rem',
              cursor: 'pointer',
            }}
          >
            回課程列表 →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="classroom-content theme-finance">
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
        <div className="slide-topbar">
          <button className="slide-topbar-back" onClick={onBack}>
            ← 返回課程列表
          </button>
          <span className="slide-topbar-title">{lesson.emoji} {lesson.title}</span>
        </div>

        {/* 進度條 */}
        <div className="prog-wrap">
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
              isLast={quizIndex === lesson.quizzes.length - 1 && isLastLesson}
              isFree={isFree}
              onPass={handleQuizPass}
              onRetry={handleRetry}
            />
          </>
        ) : (
          <div>
            {/* 講義卡片 */}
            <div className="slide-shell">
              <div className="slide-card">
                <div className="slide-eyebrow">
                  <span className="slide-num-badge">SLIDE {String(slideIndex + 1).padStart(2, '0')}</span>
                </div>
                <h2 className="slide-title">{slide.title}</h2>
                <p className="slide-body">{slide.body}</p>
                {slide.chart && (
                  <div className="slide-chart-wrap">
                    {renderChart(slide.chart)}
                  </div>
                )}
              </div>
              {slide.lulu && (
                <div className="lulu-strip">
                  <span style={{ fontSize: '20px', flexShrink: 0 }}>🐱</span>
                  <span className="lulu-strip-text">魯魯說：{slide.lulu}</span>
                </div>
              )}
            </div>

            {/* 翻頁 + 書籤 */}
            <div className="slide-nav-wrap" style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
              <button
                className="btn-prev"
                onClick={() => setSlideIndex(i => Math.max(0, i - 1))}
                disabled={slideIndex === 0}
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

            {/* 圓點頁碼 */}
            <div className="slide-dots">
              {lesson.slides.map((_, i) => (
                <span
                  key={i}
                  className={`slide-dot${i === slideIndex ? ' active' : ''}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
