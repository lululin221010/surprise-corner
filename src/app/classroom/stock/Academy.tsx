'use client';
// 📄 路徑：src/app/classroom/stock/Academy.tsx
// 股市書院主介面 — 課程列表 + 課程進入點

import { useState } from 'react';
import Link from 'next/link';
import { usePreview } from '../PreviewContext';
import courses from './courses';
import type { Course, Lesson } from './courses';
import investigationCourses from './investigation-courses';
import AcademyLesson from './AcademyLesson';
import '../classroom.css';

// 課程id → SS解鎖key；理財調查局系列以後新增案件都掛在同一個key(ss-etf-001)，買一次解鎖全部案件
function getUnlockKey(courseId: string): string {
  if (courseId === 'stock-advanced') return 'ss-stock-advanced';
  if (courseId === 'stock-master') return 'ss-stock-master';
  if (courseId === 'etf-investigation') return 'ss-etf-001';
  return 'ss-stock-intro';
}

// 課程id → ST商品購買連結 + 顯示價格
function getPurchaseInfo(courseId: string): { url: string; price: string } {
  if (courseId === 'stock-master') return { url: 'https://still-time-corner.vercel.app/digital/6a2ff36082d80248e37382fa', price: 'NT$449' };
  if (courseId === 'stock-advanced') return { url: 'https://still-time-corner.vercel.app/digital/6a2ff35f82d80248e37382f9', price: 'NT$349' };
  if (courseId === 'etf-investigation') return { url: 'https://still-time-corner.vercel.app/digital/6a4617648dca70eb5cb46506', price: 'NT$299' };
  return { url: 'https://still-time-corner.vercel.app/digital/6a2965ef6a2fdbc340cab167', price: 'NT$249' };
}

// 理財調查局全五案結案畫面用（不是獨立第六堂課，五案全部完成後顯示一次）
const INVESTIGATION_FRAMEWORKS = [
  { title: '框架一｜看總費用率，不看配息率', body: '配息率是現金流工具，不是報酬率指標。選ETF前先找總費用率，這個數字每天在扣，複利30年差距可達百萬以上。' },
  { title: '框架二｜查成分股重疊，不買重複的籃子', body: '持有多檔ETF前先比對前十大持股。同一檔重複出現在多個籃子裡，你買的不是分散，是集中加上多份管理費。' },
  { title: '框架三｜費用是確定的損失，超額報酬是不確定的期望', body: '每年多付1%的費用，30年差距超過300萬。任何投資決策前，先問：這筆費用換來的，值不值得？' },
  { title: '框架四｜你的時間框架，決定你適合哪條路', body: '三年內要用的錢，保本優先。五年以上不會動的錢，讓複利跑，波動是代價不是損失。' },
  { title: '框架五｜工具賺了多少，和你拿到多少，是兩件事', body: '決定你最終報酬的，不只是你選了什麼，而是你在每個關鍵時刻做了什麼。' },
];

function InvestigationFinale({ onClose }: { onClose: () => void }) {
  return (
    <div className="classroom-content">
      <div style={{ maxWidth: 560, margin: '0 auto', padding: '1rem' }}>
        <div style={{ background: 'linear-gradient(135deg, #fef3c7, #fde68a)', border: '2px solid #f59e0b', borderRadius: '16px', padding: '1.4rem', marginBottom: '1.4rem', textAlign: 'center' }}>
          <div style={{ fontSize: '2.2rem', marginBottom: '0.4rem' }}>🏅</div>
          <div style={{ color: '#92400e', fontWeight: 800, fontSize: '1.1rem', marginBottom: '0.3rem' }}>理財調查局 全冊結案</div>
          <div style={{ color: '#78350f', fontSize: '0.8rem', lineHeight: 1.6 }}>五宗疑案，五份鑑識報告，全部結案</div>
        </div>

        <div style={{ marginBottom: '1.4rem' }}>
          <div style={{ color: '#1e1b4b', fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.7rem' }}>
            📖 調查局的五個最終框架
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {INVESTIGATION_FRAMEWORKS.map(f => (
              <div key={f.title} style={{ padding: '0.7rem 0.9rem', borderRadius: '10px', background: 'rgba(124,58,237,0.06)', border: '1px solid rgba(124,58,237,0.15)' }}>
                <div style={{ color: '#5b21b6', fontWeight: 700, fontSize: '0.82rem', marginBottom: '0.25rem' }}>{f.title}</div>
                <div style={{ color: '#6b7280', fontSize: '0.78rem', lineHeight: 1.6 }}>{f.body}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: '1.4rem', padding: '1rem 1.1rem', background: 'rgba(124,58,237,0.08)', borderRadius: '12px', borderLeft: '3px solid #7c3aed' }}>
          <div style={{ color: '#5b21b6', fontSize: '0.85rem', lineHeight: 1.7 }}>
            🐱 魯魯最終宣告：「理財調查局，全冊結案。五宗疑案，五份鑑識報告。答案從來在你手裡——調查局只是把證據攤開，剩下的，是你的判決。」
          </div>
        </div>

        <button onClick={onClose}
          style={{ display: 'block', width: '100%', background: 'linear-gradient(135deg, #7c3aed, #2563eb)', color: '#fff', fontWeight: 700, fontSize: '0.95rem', border: 'none', borderRadius: '30px', padding: '0.85rem', cursor: 'pointer' }}>
          返回理財調查局系列 →
        </button>
      </div>
    </div>
  );
}

export default function Academy() {
  const isPreview = usePreview();

  const [activeCourse, setActiveCourse] = useState<Course | null>(null);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [activeSeries, setActiveSeries] = useState<'stock' | 'investigation'>('stock');
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());
  const [showInvestigationFinale, setShowInvestigationFinale] = useState(false);
  const [unlockCode, setUnlockCode] = useState('');
  const [unlockStatus, setUnlockStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [unlockedCourses, setUnlockedCourses] = useState<Set<string>>(() => {
    if (typeof window === 'undefined') return new Set();
    const keys = ['ss-stock-intro', 'ss-stock-advanced', 'ss-stock-master', 'ss-etf-001'];
    return new Set(keys.filter(k => localStorage.getItem(`sc_stock_unlock_${k}`) === 'true'));
  });

  // preview=1 時視同全解鎖
  const effectiveUnlocked = isPreview
    ? new Set(['ss-stock-intro', 'ss-stock-advanced', 'ss-stock-master', 'ss-etf-001'])
    : unlockedCourses;

  async function handleVerifyCode() {
    const code = unlockCode.trim().toUpperCase();
    if (!code) return;
    setUnlockStatus('loading');
    try {
      const res = await fetch(`https://still-time-corner.vercel.app/api/verify-unlock?code=${encodeURIComponent(code)}`);
      const data = await res.json();
      if (data.valid) {
        localStorage.setItem(`sc_stock_unlock_${data.target}`, 'true');
        setUnlockedCourses(prev => new Set(prev).add(data.target));
        setUnlockStatus('success');
        // 成功後 1.5 秒自動消除提示（inline 模式不需關閉 modal）
      } else {
        setUnlockStatus('error');
      }
    } catch {
      setUnlockStatus('error');
    }
  }

  function handleLessonComplete() {
    if (!activeLesson) return;
    setCompletedLessons(prev => new Set(prev).add(activeLesson.id));
    const isInvestigation = activeCourse && investigationCourses.some(c => c.id === activeCourse.id);
    const isFinalCase = activeCourse && activeLesson.id === activeCourse.lessons[activeCourse.lessons.length - 1]?.id;
    if (isInvestigation && isFinalCase) {
      setShowInvestigationFinale(true);
    }
    setActiveLesson(null);
  }

  // 理財調查局五案全部完成 — 顯示結案總結畫面（不是獨立第六堂課）
  if (showInvestigationFinale) {
    return (
      <InvestigationFinale
        onClose={() => { setShowInvestigationFinale(false); setActiveCourse(null); }}
      />
    );
  }

  // 上課中 — 交給 AcademyLesson 自己管背景
  if (activeLesson && activeCourse) {
    const isLastLesson = activeLesson.id === activeCourse.lessons[activeCourse.lessons.length - 1]?.id;
    return (
      <AcademyLesson
        lesson={activeLesson}
        onComplete={handleLessonComplete}
        onBack={() => setActiveLesson(null)}
        isLastLesson={isLastLesson}
      />
    );
  }

  // 課程列表（選了某個課程）
  if (activeCourse) {
    const seriesLabel = investigationCourses.some(c => c.id === activeCourse.id) ? '理財書院 › 理財調查局系列' : '理財書院 › 台股系列';
    const purchaseInfo = getPurchaseInfo(activeCourse.id);
    return (
      <div className="classroom-content">
        {/* 返回 + 麵包屑 */}
        <button onClick={() => setActiveCourse(null)} style={{ background: 'none', border: 'none', color: '#7c3aed', fontSize: '0.85rem', cursor: 'pointer', marginBottom: '0.5rem', padding: 0 }}>
          ← 返回{seriesLabel}
        </button>
        <div className="classroom-breadcrumb" style={{ marginBottom: '1rem' }}>
          <Link href="/classroom" className="classroom-back" style={{ display: 'inline' }}>小教室</Link>
          <span style={{ margin: '0 0.4rem' }}>›</span>
          <button onClick={() => setActiveCourse(null)} className="classroom-back" style={{ fontSize: '12px' }}>{seriesLabel}</button>
          <span style={{ margin: '0 0.4rem' }}>›</span>
          <span>{activeCourse.title}</span>
        </div>

        <h2 style={{ color: '#1e1b4b', fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.3rem' }}>
          {activeCourse.emoji} {activeCourse.title}
        </h2>
        <p style={{ color: '#6b7280', fontSize: '0.85rem', marginBottom: '1.5rem' }}>{activeCourse.description}</p>

        {/* 未解鎖時的 inline 解鎖區塊 */}
        {activeCourse.id !== 'stock-trial' && !effectiveUnlocked.has(getUnlockKey(activeCourse.id)) && (
          <div style={{ background: 'rgba(251,191,36,0.06)', border: '1px solid rgba(251,191,36,0.3)', borderRadius: '12px', padding: '1rem', marginBottom: '1.2rem' }}>
            <div style={{ color: '#b45309', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.5rem' }}>
              🔑 輸入解鎖碼，或購買本書解鎖本課程
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.6rem' }}>
              <input
                type="text"
                value={unlockCode}
                onChange={e => { setUnlockCode(e.target.value.toUpperCase()); setUnlockStatus('idle'); }}
                placeholder="SS-XXXX-XXXX"
                onKeyDown={e => e.key === 'Enter' && handleVerifyCode()}
                style={{ flex: 1, padding: '8px 10px', fontSize: '0.85rem', borderRadius: '8px', border: '1px solid rgba(251,191,36,0.4)', background: 'rgba(255,255,255,0.7)', color: '#1e1b4b', outline: 'none', fontFamily: 'monospace', letterSpacing: '1px' }}
              />
              <button onClick={handleVerifyCode} disabled={unlockStatus === 'loading'}
                style={{ padding: '8px 14px', background: '#f59e0b', color: '#1c1917', border: 'none', borderRadius: '8px', fontSize: '0.82rem', cursor: 'pointer', fontWeight: 700, whiteSpace: 'nowrap' }}>
                {unlockStatus === 'loading' ? '…' : '解鎖'}
              </button>
            </div>
            {unlockStatus === 'error' && <p style={{ color: '#ef4444', fontSize: '0.75rem', margin: '0 0 0.5rem' }}>解鎖碼無效，請確認後再試</p>}
            {unlockStatus === 'success' && <p style={{ color: '#16a34a', fontSize: '0.75rem', margin: '0 0 0.5rem' }}>✅ 解鎖成功！</p>}
            <div style={{ display: 'flex', gap: '0.6rem' }}>
              <a
                href={purchaseInfo.url}
                target="_blank" rel="noopener noreferrer"
                style={{ flex: 1, display: 'block', background: 'linear-gradient(135deg, #7c3aed, #2563eb)', color: '#fff', fontWeight: 700, fontSize: '0.82rem', borderRadius: '20px', padding: '0.5rem', textDecoration: 'none', textAlign: 'center' }}>
                轉帳購買（{purchaseInfo.price}） →
              </a>
            </div>
          </div>
        )}

        {/* 已解鎖提示 */}
        {activeCourse.id !== 'stock-trial' && effectiveUnlocked.has(getUnlockKey(activeCourse.id)) && (
          <div style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.25)', borderRadius: '10px', padding: '0.5rem 0.8rem', marginBottom: '1.2rem', color: '#16a34a', fontSize: '0.8rem' }}>
            ✅ 已解鎖，全部課程開放閱讀
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {activeCourse.lessons.map((lesson, i) => {
            const done = completedLessons.has(lesson.id);
            const isFree = activeCourse.id === 'stock-trial';
            const locked = !isFree && !effectiveUnlocked.has(getUnlockKey(activeCourse.id));
            return (
              <button
                key={lesson.id}
                onClick={() => !locked && setActiveLesson(lesson)}
                className={`course-list-item${done ? ' done' : ''}`}
                style={locked ? { opacity: 0.5, cursor: 'pointer' } : {}}
              >
                <div style={{
                  width: '30px', height: '30px', borderRadius: '50%', flexShrink: 0,
                  background: done ? '#dcfce7' : locked ? '#f3f4f6' : '#ede9fe',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: done ? '#15803d' : locked ? '#9ca3af' : '#7c3aed', fontSize: '0.78rem', fontWeight: 700,
                }}>
                  {done ? '✓' : locked ? '🔒' : i + 1}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ color: locked ? '#9ca3af' : '#1e1b4b', fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.15rem' }}>
                    {lesson.emoji} {lesson.title}
                  </div>
                  <div style={{ color: '#9ca3af', fontSize: '0.75rem' }}>
                    {locked ? '🔒 付費解鎖' : lesson.description}
                  </div>
                </div>
                <div style={{ color: locked ? '#d1d5db' : '#a78bfa', fontSize: '0.8rem' }}>→</div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // 主頁：所有課程總覽
  const unlockedRealCourses = courses.filter(c => effectiveUnlocked.has(getUnlockKey(c.id)));
  const hasAnyUnlock = unlockedRealCourses.length > 0;
  const unlockedInvestigationCourses = investigationCourses.filter(c => effectiveUnlocked.has(getUnlockKey(c.id)));
  const hasAnyInvestigationUnlock = unlockedInvestigationCourses.length > 0;

  return (
    <div className="classroom-content">
      {/* 學院 Header */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div className="classroom-breadcrumb" style={{ marginBottom: '0.6rem' }}>
          <Link href="/classroom" className="classroom-back" style={{ display: 'inline', fontSize: '12px' }}>小教室</Link>
          <span style={{ margin: '0 0.4rem' }}>›</span>
          <span>理財書院</span>
        </div>
        <h1 style={{ color: '#1e1b4b', fontSize: '1.6rem', fontWeight: 800, margin: '0 0 0.3rem' }}>
          💰 理財書院
        </h1>
        <p style={{ color: '#6b7280', fontSize: '0.85rem', margin: 0 }}>
          {activeSeries === 'stock' ? '這裡收錄已購買讀者的完整課程內容' : '一本一案，拆解理財工具背後的真相'}
        </p>
      </div>

      {/* 系列切換 */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
        <button
          onClick={() => setActiveSeries('stock')}
          style={{
            flex: 1, padding: '0.6rem', borderRadius: '10px', fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer',
            border: activeSeries === 'stock' ? '1px solid #7c3aed' : '1px solid #e5e7eb',
            background: activeSeries === 'stock' ? '#faf5ff' : '#fff',
            color: activeSeries === 'stock' ? '#7c3aed' : '#9ca3af',
          }}
        >
          📈 台股系列
        </button>
        <button
          onClick={() => setActiveSeries('investigation')}
          style={{
            flex: 1, padding: '0.6rem', borderRadius: '10px', fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer',
            border: activeSeries === 'investigation' ? '1px solid #7c3aed' : '1px solid #e5e7eb',
            background: activeSeries === 'investigation' ? '#faf5ff' : '#fff',
            color: activeSeries === 'investigation' ? '#7c3aed' : '#9ca3af',
          }}
        >
          🕵️ 理財調查局系列
        </button>
      </div>

      {activeSeries === 'stock' ? (
        <>
          {/* 解鎖碼輸入 */}
          <div style={{ background: 'rgba(251,191,36,0.06)', border: '1px solid rgba(251,191,36,0.3)', borderRadius: '12px', padding: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ color: '#b45309', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.5rem' }}>
              🔑 輸入解鎖碼開通已購買的課程
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.4rem' }}>
              <input
                type="text"
                value={unlockCode}
                onChange={e => { setUnlockCode(e.target.value.toUpperCase()); setUnlockStatus('idle'); }}
                placeholder="SS-XXXX-XXXX"
                onKeyDown={e => e.key === 'Enter' && handleVerifyCode()}
                style={{ flex: 1, padding: '8px 10px', fontSize: '0.85rem', borderRadius: '8px', border: '1px solid rgba(251,191,36,0.4)', background: 'rgba(255,255,255,0.7)', color: '#1e1b4b', outline: 'none', fontFamily: 'monospace', letterSpacing: '1px' }}
              />
              <button onClick={handleVerifyCode} disabled={unlockStatus === 'loading'}
                style={{ padding: '8px 14px', background: '#f59e0b', color: '#1c1917', border: 'none', borderRadius: '8px', fontSize: '0.82rem', cursor: 'pointer', fontWeight: 700, whiteSpace: 'nowrap' }}>
                {unlockStatus === 'loading' ? '…' : '解鎖'}
              </button>
            </div>
            {unlockStatus === 'error' && <p style={{ color: '#ef4444', fontSize: '0.75rem', margin: 0 }}>解鎖碼無效，請確認後再試</p>}
            {unlockStatus === 'success' && <p style={{ color: '#16a34a', fontSize: '0.75rem', margin: 0 }}>✅ 解鎖成功！</p>}
            {!hasAnyUnlock && (
              <p style={{ color: '#6b7280', fontSize: '0.78rem', margin: '0.6rem 0 0' }}>
                還沒讀過試讀？<Link href="/classroom/bonus" style={{ color: '#7c3aed' }}>前往好康書院 →</Link>
              </p>
            )}
          </div>

          {/* 課程卡片 */}
          {hasAnyUnlock && (
            <>
              <p style={{ color: '#a78bfa', fontSize: '0.72rem', letterSpacing: '0.1em', margin: '0 0 0.8rem 0.2rem', fontWeight: 600 }}>
                已解鎖課程
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                {unlockedRealCourses.map(course => (
                  <button
                    key={course.id}
                    onClick={() => setActiveCourse(course)}
                    className="course-list-item"
                    style={{ padding: '1.2rem 1.4rem', borderRadius: '14px', border: '1px solid rgba(34,197,94,0.3)' }}
                  >
                    <span style={{ fontSize: '1.8rem', flexShrink: 0 }}>{course.emoji}</span>
                    <div style={{ flex: 1, textAlign: 'left' }}>
                      <div style={{ color: '#1e1b4b', fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.25rem' }}>
                        {course.title}
                      </div>
                      <div style={{ color: '#6b7280', fontSize: '0.82rem', lineHeight: 1.6 }}>
                        {course.description}
                      </div>
                      <div style={{ color: '#a78bfa', fontSize: '0.72rem', marginTop: '0.4rem' }}>
                        {course.lessons.length} 堂課
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.3rem', flexShrink: 0 }}>
                      <span style={{ background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.3)', color: '#16a34a', fontSize: '0.7rem', padding: '0.15rem 0.5rem', borderRadius: '10px' }}>✅ 已解鎖</span>
                      <span style={{ color: '#7c3aed', fontSize: '0.8rem' }}>→</span>
                    </div>
                  </button>
                ))}
              </div>
            </>
          )}
        </>
      ) : (
        <>
          {/* 解鎖碼輸入 */}
          <div style={{ background: 'rgba(251,191,36,0.06)', border: '1px solid rgba(251,191,36,0.3)', borderRadius: '12px', padding: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ color: '#b45309', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.5rem' }}>
              🔑 輸入解鎖碼開通已購買的案件
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.4rem' }}>
              <input
                type="text"
                value={unlockCode}
                onChange={e => { setUnlockCode(e.target.value.toUpperCase()); setUnlockStatus('idle'); }}
                placeholder="SS-XXXX-XXXX"
                onKeyDown={e => e.key === 'Enter' && handleVerifyCode()}
                style={{ flex: 1, padding: '8px 10px', fontSize: '0.85rem', borderRadius: '8px', border: '1px solid rgba(251,191,36,0.4)', background: 'rgba(255,255,255,0.7)', color: '#1e1b4b', outline: 'none', fontFamily: 'monospace', letterSpacing: '1px' }}
              />
              <button onClick={handleVerifyCode} disabled={unlockStatus === 'loading'}
                style={{ padding: '8px 14px', background: '#f59e0b', color: '#1c1917', border: 'none', borderRadius: '8px', fontSize: '0.82rem', cursor: 'pointer', fontWeight: 700, whiteSpace: 'nowrap' }}>
                {unlockStatus === 'loading' ? '…' : '解鎖'}
              </button>
            </div>
            {unlockStatus === 'error' && <p style={{ color: '#ef4444', fontSize: '0.75rem', margin: 0 }}>解鎖碼無效，請確認後再試</p>}
            {unlockStatus === 'success' && <p style={{ color: '#16a34a', fontSize: '0.75rem', margin: 0 }}>✅ 解鎖成功！</p>}
            {!hasAnyInvestigationUnlock && (
              <p style={{ color: '#6b7280', fontSize: '0.78rem', margin: '0.6rem 0 0' }}>
                還沒讀過試讀？<Link href="/classroom/bonus" style={{ color: '#7c3aed' }}>前往好康書院 →</Link>
              </p>
            )}
          </div>

          {/* 案件卡片 */}
          {hasAnyInvestigationUnlock && (
            <>
              <p style={{ color: '#a78bfa', fontSize: '0.72rem', letterSpacing: '0.1em', margin: '0 0 0.8rem 0.2rem', fontWeight: 600 }}>
                已解鎖案件
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginBottom: '1.5rem' }}>
                {unlockedInvestigationCourses.map(course => (
                  <button
                    key={course.id}
                    onClick={() => setActiveCourse(course)}
                    className="course-list-item"
                    style={{ padding: '1.2rem 1.4rem', borderRadius: '14px', border: '1px solid rgba(34,197,94,0.3)' }}
                  >
                    <span style={{ fontSize: '1.8rem', flexShrink: 0 }}>{course.emoji}</span>
                    <div style={{ flex: 1, textAlign: 'left' }}>
                      <div style={{ color: '#1e1b4b', fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.25rem' }}>
                        {course.title}
                      </div>
                      <div style={{ color: '#6b7280', fontSize: '0.82rem', lineHeight: 1.6 }}>
                        {course.description}
                      </div>
                      <div style={{ color: '#a78bfa', fontSize: '0.72rem', marginTop: '0.4rem' }}>
                        {course.lessons.length} 案
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.3rem', flexShrink: 0 }}>
                      <span style={{ background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.3)', color: '#16a34a', fontSize: '0.7rem', padding: '0.15rem 0.5rem', borderRadius: '10px' }}>✅ 已解鎖</span>
                      <span style={{ color: '#7c3aed', fontSize: '0.8rem' }}>→</span>
                    </div>
                  </button>
                ))}
              </div>
            </>
          )}

          <p style={{ color: '#9ca3af', fontSize: '0.78rem', textAlign: 'center' }}>
            五宗ETF疑案全數結案，外匯、虛擬貨幣等更多主題陸續開案 🕵️
          </p>
        </>
      )}
    </div>
  );
}
