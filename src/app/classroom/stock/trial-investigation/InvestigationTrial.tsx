'use client';
// 📄 路徑：src/app/classroom/stock/trial-investigation/InvestigationTrial.tsx
// 理財調查局系列試讀本：案號001完整免費開放（特例：第一案完整放，鉤子最強）

import { useState } from 'react';
import Link from 'next/link';
import investigationCourses from '../investigation-courses';
import AcademyLesson from '../AcademyLesson';
import '../../classroom.css';

const CASE_001 = investigationCourses[0].lessons[0];

const STORAGE_KEY = 'sc_investigation_trial_done';

const FUTURE_CASES = [
  '案號002｜存股 vs ETF，誰才是你的錢該去的地方？',
  '案號003｜帳面獲利40%，你按賣出，還是繼續抱？',
  '案號004｜你願意每年多付1%，換一個人幫你選股嗎？',
  '案號005｜2004年的100萬，20年後的五條人生線',
  '結案報告｜調查局的五個最終框架',
];

function CaseDonePage({ onContinue }: { onContinue: () => void }) {
  return (
    <div className="classroom-content">
      <div style={{ maxWidth: 560, margin: '0 auto', padding: '1rem' }}>

        {/* 完整目錄 */}
        <div style={{ marginBottom: '1.4rem' }}>
          <div style={{ color: '#1e1b4b', fontWeight: 700, fontSize: '0.88rem', marginBottom: '0.5rem' }}>
            📖 理財調查局：ETF完全解案 完整目錄
            <span style={{ color: '#9ca3af', fontWeight: 400, fontSize: '0.78rem', marginLeft: '0.5rem' }}>NT$299</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.3rem 0.6rem', borderRadius: '6px', background: 'rgba(124,58,237,0.08)' }}>
              <span style={{ color: '#a78bfa', fontSize: '0.7rem', flexShrink: 0, width: '1.4rem' }}>✅</span>
              <span style={{ color: '#374151', fontSize: '0.8rem' }}>{CASE_001.title}</span>
            </div>
            {FUTURE_CASES.map((t, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.3rem 0.6rem', borderRadius: '6px' }}>
                <span style={{ color: '#d1d5db', fontSize: '0.7rem', flexShrink: 0, width: '1.4rem' }}>{i + 2}.</span>
                <span style={{ color: '#9ca3af', fontSize: '0.8rem' }}>{t}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '0.6rem', padding: '0.5rem 0.8rem', background: 'rgba(124,58,237,0.08)', borderRadius: '8px', borderLeft: '3px solid #7c3aed', color: '#6b7280', fontSize: '0.78rem' }}>
            ✨ 五宗案件＋結案報告，前往小舖解鎖電子書＋完整互動課程
          </div>
        </div>

        {/* 好康體驗證書 */}
        <div style={{ background: 'linear-gradient(135deg, #fef3c7, #fde68a)', border: '2px solid #f59e0b', borderRadius: '16px', padding: '1.2rem', marginBottom: '1.2rem', textAlign: 'center' }}>
          <div style={{ fontSize: '1.8rem', marginBottom: '0.3rem' }}>🎖️</div>
          <div style={{ color: '#92400e', fontWeight: 800, fontSize: '1rem', marginBottom: '0.2rem' }}>好康體驗證書</div>
          <div style={{ color: '#78350f', fontSize: '0.78rem', lineHeight: 1.6 }}>
            第一案結案！可收藏紀念，無折抵功能
          </div>
        </div>

        {/* 購買按鈕 */}
        <a href="https://still-time-corner.vercel.app/digital/6a4617648dca70eb5cb46506" target="_blank" rel="noopener noreferrer"
          style={{ display: 'block', background: 'linear-gradient(135deg, #7c3aed, #2563eb)', color: '#fff', fontWeight: 700, fontSize: '0.95rem', borderRadius: '30px', padding: '0.75rem', textDecoration: 'none', textAlign: 'center', marginBottom: '0.8rem' }}>
          前往小舖購買完整版（NT$299） →
        </a>

        <div style={{ textAlign: 'center' }}>
          <button onClick={onContinue} style={{ background: 'none', border: 'none', color: '#7c3aed', fontSize: '0.85rem', cursor: 'pointer', fontWeight: 600 }}>
            重新閱讀本案 →
          </button>
        </div>
      </div>
    </div>
  );
}

export default function InvestigationTrial() {
  const [reading, setReading] = useState(false);
  const [done, setDone] = useState(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem(STORAGE_KEY) === 'true';
  });

  function handleComplete() {
    localStorage.setItem(STORAGE_KEY, 'true');
    setDone(true);
    setReading(false);
  }

  if (reading) {
    return (
      <AcademyLesson
        lesson={CASE_001}
        onComplete={handleComplete}
        onBack={() => setReading(false)}
        isFree={true}
      />
    );
  }

  if (done) {
    return <CaseDonePage onContinue={() => setReading(true)} />;
  }

  return (
    <div className="classroom-content">
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        {/* 麵包屑 */}
        <div className="classroom-breadcrumb" style={{ marginBottom: '1rem' }}>
          <Link href="/classroom" className="classroom-back" style={{ display: 'inline', fontSize: '12px' }}>小教室</Link>
          <span style={{ margin: '0 0.4rem' }}>›</span>
          <Link href="/classroom/bonus" className="classroom-back" style={{ fontSize: '12px' }}>好康書院</Link>
          <span style={{ margin: '0 0.4rem' }}>›</span>
          <span>理財調查局系列試讀本</span>
        </div>

        <h2 style={{ color: '#1e1b4b', fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.3rem' }}>
          🕵️ 理財調查局：ETF完全解案 試讀本
        </h2>
        <p style={{ color: '#6b7280', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
          第一案完整開放，偵探鉤子最強的一案，免費看到底。
        </p>

        <button onClick={() => setReading(true)} className="course-list-item" style={{ padding: '1.2rem 1.4rem', borderRadius: '14px', width: '100%' }}>
          <span style={{ fontSize: '1.8rem', flexShrink: 0 }}>🕵️</span>
          <div style={{ flex: 1, textAlign: 'left' }}>
            <div style={{ color: '#1e1b4b', fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.25rem' }}>
              {CASE_001.title}
            </div>
            <div style={{ color: '#9ca3af', fontSize: '0.75rem' }}>{CASE_001.slides.length} 頁 + {CASE_001.quizzes.length} 題 · 免費</div>
          </div>
          <div style={{ color: '#a78bfa', fontSize: '0.8rem' }}>→</div>
        </button>

        {/* 底部 CTA */}
        <div style={{ marginTop: '1.5rem', padding: '1.2rem', background: '#faf5ff', border: '1px solid #c4b5fd', borderRadius: '14px', textAlign: 'center' }}>
          <div style={{ color: '#7c3aed', fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.4rem' }}>想看剩下四案怎麼結案？</div>
          <div style={{ color: '#6b7280', fontSize: '0.82rem', marginBottom: '1rem' }}>購買電子書即可解鎖全部五案，NT$299</div>
          <a href="https://still-time-corner.vercel.app/digital/6a4617648dca70eb5cb46506" target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-block', background: 'linear-gradient(135deg, #7c3aed, #2563eb)', color: '#fff', fontWeight: 700, fontSize: '0.9rem', padding: '0.6rem 1.8rem', borderRadius: '30px', textDecoration: 'none' }}>
            前往小舖購買 →
          </a>
        </div>
      </div>
    </div>
  );
}
