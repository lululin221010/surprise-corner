'use client';
// 📄 路徑：src/app/classroom/psychology/PsychAcademy.tsx
// 心理學書院主元件
// 解鎖機制：學系一組碼 → SHA-256 hash 比對（前端內建），不需要後端 API
// 架構：有效碼 OR 積分足夠（積分側日後補上，現在只做碼驗證）

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { usePreview } from '../PreviewContext';
import { PSYCH_SERIES } from './courses-data';
import type { PsychSeries, PsychBook, PsychLesson } from './courses-data';
import PsychGroupLesson from './PsychGroupLesson';
import '../classroom.css';

// ── 解鎖碼 SHA-256 哈希（勿公開碼本身，只存 hash）──────────
// 碼：PSYCH-PERSON-2026 / PSYCH-GROWTH-2026 / PSYCH-DARK-2026
//      PSYCH-UNCON-2026 / PSYCH-COGNI-2026 / PSYCH-RELAT-2026
const SERIES_HASHES: Record<string, string> = {
  personality:  '43ea063aedb584e46c807e8a6d53edb009b10bfac397b3e8107ddab9e7ae4e37',
  growth:       '25ff4c7571429ba3578233bbfaa8226a2110bbfa6473c496a5b2c3b365a7923f',
  dark:         '29b4bf9e67e8ff3e0c85aa4bf6c78adee2b9943b07306ec79d8036b56c10687b',
  unconscious:  'd7cd755bfcbbf2572bbb5818dd1c1584fac80231d6ad8478c63a35974779996f',
  cognitive:    '8d1dad0a2217aa4645eb4c284dfbb9f380f8730d904b8a395c1296c8c79c0c93',
  relationship: 'c600c6c91f91e8a7c874030151e526775f0cfdd031bb982e0fd443e8d83390be',
};

const UNLOCK_KEY = 'sc_psych_unlocked';
const DONE_KEY   = 'sc_psych_done';

// ── 工具函式 ──────────────────────────────────────────────
async function sha256hex(str: string): Promise<string> {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str.trim().toUpperCase()));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
}

function loadSet(key: string): Set<string> {
  if (typeof window === 'undefined') return new Set();
  try { return new Set(JSON.parse(localStorage.getItem(key) || '[]')); }
  catch { return new Set(); }
}

function saveSet(key: string, set: Set<string>) {
  localStorage.setItem(key, JSON.stringify([...set]));
}

// ── 榮譽證書頁（完成一本書的所有組別）────────────────────
function CertPage({ bookTitle, onBack }: { bookTitle: string; onBack: () => void }) {
  return (
    <div className="classroom-content">
      <div style={{ maxWidth: 560, margin: '0 auto', padding: '2rem 1rem', textAlign: 'center' }}>
        <div style={{ fontSize: '3rem', marginBottom: '0.6rem' }}>🏅</div>
        <div style={{
          background: 'linear-gradient(135deg, #eef2ff, #f0fdf4)',
          border: '2px solid #c7d2fe', borderRadius: '20px',
          padding: '1.8rem', marginBottom: '1.6rem',
        }}>
          <div style={{ color: '#4338ca', fontWeight: 800, fontSize: '1.2rem', marginBottom: '0.4rem' }}>
            驚喜榮譽證書
          </div>
          <div style={{ color: '#374151', fontSize: '0.88rem', lineHeight: 1.7 }}>
            恭喜完成《{bookTitle}》全部組別！<br />
            <span style={{ color: '#6366f1', fontSize: '0.8rem' }}>
              憑此證書至有的沒的小舖兌換專屬福利
            </span>
          </div>
        </div>
        <a
          href="https://line.me/R/ti/p/@983agawb"
          target="_blank" rel="noopener noreferrer"
          style={{ display: 'block', background: '#00B900', color: '#fff', fontWeight: 700, fontSize: '0.9rem', borderRadius: '30px', padding: '0.7rem', textDecoration: 'none', marginBottom: '0.8rem' }}
        >
          加 LINE 兌換福利 →
        </a>
        <button onClick={onBack}
          style={{ background: 'none', border: 'none', color: '#7c3aed', fontSize: '0.85rem', cursor: 'pointer', fontWeight: 600 }}>
          ← 返回書本
        </button>
      </div>
    </div>
  );
}

// ── 免費組完成頁（第一組讀完，學系尚未解鎖）────────────────
function FreeDonePage({
  bookTitle, allGroupTitles, seriesLabel, seriesId,
  onUnlock, onBack,
}: {
  bookTitle: string;
  allGroupTitles: string[];
  seriesLabel: string;
  seriesId: string;
  onUnlock: (code: string) => Promise<boolean>;
  onBack: () => void;
}) {
  const [codeInput, setCodeInput] = useState('');
  const [error, setError] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [pointsMsg, setPointsMsg] = useState(false);

  async function handleUnlock() {
    if (!codeInput.trim()) { setError('請輸入解鎖碼'); return; }
    setVerifying(true);
    setError('');
    const ok = await onUnlock(codeInput);
    setVerifying(false);
    if (!ok) setError('解鎖碼不正確，請確認後再試');
  }

  return (
    <div className="classroom-content">
      <div style={{ maxWidth: 560, margin: '0 auto', padding: '1rem' }}>

        {/* 好康體驗證書 */}
        <div style={{ background: 'linear-gradient(135deg, #fef3c7, #fde68a)', border: '2px solid #f59e0b', borderRadius: '16px', padding: '1.2rem', marginBottom: '1.4rem', textAlign: 'center' }}>
          <div style={{ fontSize: '1.8rem', marginBottom: '0.3rem' }}>🎖️</div>
          <div style={{ color: '#92400e', fontWeight: 800, fontSize: '1rem', marginBottom: '0.2rem' }}>好康體驗證書</div>
          <div style={{ color: '#78350f', fontSize: '0.8rem', lineHeight: 1.6 }}>
            已完成《{bookTitle}》第一組體驗<br />
            <span style={{ color: '#a16207', fontSize: '0.72rem' }}>可收藏紀念，無折抵功能</span>
          </div>
        </div>

        {/* 完整目錄 */}
        <div style={{ marginBottom: '1.4rem' }}>
          <div style={{ color: '#e2e8f0', fontWeight: 700, fontSize: '0.88rem', marginBottom: '0.6rem' }}>
            📖 《{bookTitle}》完整目錄
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
            {allGroupTitles.map((title, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.45rem 0.7rem', borderRadius: '8px', background: i === 0 ? 'rgba(124,58,237,0.15)' : 'rgba(255,255,255,0.03)', border: i === 0 ? '1px solid rgba(124,58,237,0.3)' : '1px solid transparent' }}>
                <span style={{ color: i === 0 ? '#a78bfa' : '#475569', fontSize: '0.72rem', fontWeight: 700, flexShrink: 0 }}>
                  {i === 0 ? '✅' : `第${i + 1}組`}
                </span>
                <span style={{ color: i === 0 ? '#c4b5fd' : '#64748b', fontSize: '0.82rem' }}>{title}</span>
              </div>
            ))}
          </div>
          {allGroupTitles.length > 1 && (
            <div style={{ marginTop: '0.8rem', padding: '0.6rem 0.8rem', background: 'rgba(124,58,237,0.08)', borderRadius: '8px', borderLeft: '3px solid #7c3aed', color: '#94a3b8', fontSize: '0.78rem' }}>
              ✨ 以上精彩內容，解鎖{seriesLabel}即可繼續
            </div>
          )}
        </div>

        {/* 解鎖碼輸入 */}
        <div style={{ background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.25)', borderRadius: '14px', padding: '1rem', marginBottom: '0.8rem' }}>
          <div style={{ color: '#a78bfa', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.6rem' }}>
            🔑 已有解鎖碼？直接輸入
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <input
              type="text"
              value={codeInput}
              onChange={e => { setCodeInput(e.target.value); setError(''); }}
              placeholder="PSYCH-XXXX-XXXX"
              style={{ flex: 1, padding: '8px 12px', fontSize: '0.85rem', borderRadius: '8px', border: error ? '1px solid #ef4444' : '1px solid rgba(124,58,237,0.4)', background: 'rgba(255,255,255,0.05)', color: '#e2e8f0', outline: 'none' }}
              onKeyDown={e => e.key === 'Enter' && handleUnlock()}
            />
            <button onClick={handleUnlock} disabled={verifying}
              style={{ padding: '8px 14px', background: '#7c3aed', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '0.82rem', cursor: verifying ? 'default' : 'pointer', fontWeight: 600, whiteSpace: 'nowrap' }}>
              {verifying ? '驗證中…' : '解鎖'}
            </button>
          </div>
          {error && <p style={{ color: '#f87171', fontSize: '0.75rem', marginTop: '4px', marginBottom: 0 }}>{error}</p>}
        </div>

        {/* 雙CTA */}
        <div style={{ display: 'flex', gap: '0.6rem', marginBottom: '0.8rem' }}>
          <a
            href="https://still-time-corner.vercel.app/digital"
            target="_blank" rel="noopener noreferrer"
            style={{ flex: 1, display: 'block', background: 'linear-gradient(135deg, #7c3aed, #2563eb)', color: '#fff', fontWeight: 700, fontSize: '0.88rem', borderRadius: '30px', padding: '0.65rem', textDecoration: 'none', textAlign: 'center' }}>
            轉帳購買 →
          </a>
          <button
            onClick={() => setPointsMsg(true)}
            style={{ flex: 1, background: 'rgba(251,191,36,0.12)', border: '1px solid rgba(251,191,36,0.4)', color: '#fbbf24', fontWeight: 700, fontSize: '0.88rem', borderRadius: '30px', padding: '0.65rem', cursor: 'pointer' }}>
            🪙 魯魯積分兌換
          </button>
        </div>
        {pointsMsg && (
          <div style={{ background: 'rgba(251,191,36,0.08)', border: '1px solid rgba(251,191,36,0.25)', borderRadius: '10px', padding: '0.6rem 0.8rem', color: '#fbbf24', fontSize: '0.78rem', marginBottom: '0.8rem', textAlign: 'center' }}>
            積分兌換即將整合，敬請期待。可先至小舖確認目前積分餘額。
          </div>
        )}

        <div style={{ textAlign: 'center' }}>
          <button onClick={onBack} style={{ background: 'none', border: 'none', color: '#64748b', fontSize: '0.85rem', cursor: 'pointer' }}>
            ← 回心理學書院繼續逛
          </button>
        </div>
      </div>
    </div>
  );
}

// ── 主元件 ───────────────────────────────────────────────
type ViewState =
  | { t: 'series-list' }
  | { t: 'book-list'; series: PsychSeries }
  | { t: 'group-list'; series: PsychSeries; book: PsychBook }
  | { t: 'lesson'; series: PsychSeries; book: PsychBook; lesson: PsychLesson }
  | { t: 'free-done'; series: PsychSeries; book: PsychBook }
  | { t: 'cert'; bookTitle: string; backSeries: PsychSeries; backBook: PsychBook };

export default function PsychAcademy() {
  const isPreview = usePreview();

  const [view, setView] = useState<ViewState>({ t: 'series-list' });
  const [unlocked, setUnlocked] = useState<Set<string>>(() => loadSet(UNLOCK_KEY));
  const [done, setDone] = useState<Set<string>>(() => loadSet(DONE_KEY));
  const [filter, setFilter] = useState<string>('all');

  // 展開解鎖碼輸入的學系
  const [expandUnlock, setExpandUnlock] = useState<string | null>(null);
  const [codeInput, setCodeInput] = useState('');
  const [codeError, setCodeError] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [pointsToast, setPointsToast] = useState(false);

  // preview=1 時視同全解鎖
  const isUnlocked = useCallback((seriesId: string) => isPreview || unlocked.has(seriesId), [unlocked, isPreview]);
  const isDone = useCallback((lessonId: string) => done.has(lessonId), [done]);

  // 驗證並解鎖學系
  async function handleUnlock(seriesId: string, code: string): Promise<boolean> {
    if (!SERIES_HASHES[seriesId]) return false;
    const hash = await sha256hex(code);
    if (hash !== SERIES_HASHES[seriesId]) return false;
    const next = new Set(unlocked).add(seriesId);
    setUnlocked(next);
    saveSet(UNLOCK_KEY, next);
    setExpandUnlock(null);
    setCodeInput('');
    return true;
  }

  // 課程完成
  function markDone(lessonId: string) {
    const next = new Set(done).add(lessonId);
    setDone(next);
    saveSet(DONE_KEY, next);
  }

  // ── 渲染各層頁面 ────────────────────────────────────────

  // 課程閱讀器
  if (view.t === 'lesson') {
    const { series, book, lesson } = view;
    const allLessons = book.lessons;
    const isLast = lesson.groupNum === allLessons.length;
    const isFree = lesson.isFree;

    function onLessonComplete() {
      markDone(lesson.id);
      if (isLast) {
        setView({ t: 'cert', bookTitle: book.title, backSeries: series, backBook: book });
      } else if (isFree && !isUnlocked(series.id)) {
        setView({ t: 'free-done', series, book });
      } else {
        setView({ t: 'group-list', series, book });
      }
    }

    return (
      <PsychGroupLesson
        lesson={lesson}
        onComplete={onLessonComplete}
        onBack={() => setView({ t: 'group-list', series, book })}
      />
    );
  }

  // 免費組完成頁
  if (view.t === 'free-done') {
    const { series, book } = view;
    const allGroupTitles = book.lessons.map(l => l.title);
    return (
      <FreeDonePage
        bookTitle={book.title}
        allGroupTitles={allGroupTitles}
        seriesLabel={series.label}
        seriesId={series.id}
        onUnlock={async (code) => {
          const ok = await handleUnlock(series.id, code);
          if (ok) setView({ t: 'group-list', series, book });
          return ok;
        }}
        onBack={() => setView({ t: 'series-list' })}
      />
    );
  }

  // 榮譽證書頁
  if (view.t === 'cert') {
    const { bookTitle, backSeries, backBook } = view;
    return (
      <CertPage
        bookTitle={bookTitle}
        onBack={() => setView({ t: 'group-list', series: backSeries, book: backBook })}
      />
    );
  }

  // 組別列表（一本書的所有組）
  if (view.t === 'group-list') {
    const { series, book } = view;
    const seriesUnlocked = isUnlocked(series.id);
    const allDoneInBook = book.lessons.every(l => isDone(l.id));

    return (
      <div className="classroom-content">
        <div style={{ maxWidth: 640, margin: '0 auto' }}>

          {/* 麵包屑 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '1.2rem', flexWrap: 'wrap' }}>
            <Link href="/classroom" style={{ color: '#7c3aed', fontSize: '0.8rem', textDecoration: 'none' }}>驚喜學院</Link>
            <span style={{ color: '#475569', fontSize: '0.75rem' }}>›</span>
            <button onClick={() => setView({ t: 'series-list' })} style={{ background: 'none', border: 'none', color: '#7c3aed', fontSize: '0.8rem', cursor: 'pointer', padding: 0 }}>心理學書院</button>
            <span style={{ color: '#475569', fontSize: '0.75rem' }}>›</span>
            <button onClick={() => setView({ t: 'book-list', series })} style={{ background: 'none', border: 'none', color: '#7c3aed', fontSize: '0.8rem', cursor: 'pointer', padding: 0 }}>{series.emoji} {series.label}</button>
            <span style={{ color: '#475569', fontSize: '0.75rem' }}>›</span>
            <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>{book.title}</span>
          </div>

          <div style={{ marginBottom: '1.4rem' }}>
            <div style={{ fontSize: '1.6rem', marginBottom: '0.3rem' }}>{book.emoji}</div>
            <h2 style={{ color: '#fff', fontSize: '1.2rem', fontWeight: 800, margin: '0 0 0.2rem' }}>{book.title}</h2>
            {allDoneInBook && (
              <div style={{ display: 'inline-block', background: 'rgba(99,102,241,0.15)', border: '1px solid #6366f1', color: '#a5b4fc', fontSize: '0.75rem', padding: '0.2rem 0.7rem', borderRadius: '20px' }}>
                🏅 已完課
              </div>
            )}
          </div>

          {/* 未解鎖時的解鎖區塊 */}
          {!seriesUnlocked && (
            <div style={{ background: 'rgba(251,191,36,0.06)', border: '1px solid rgba(251,191,36,0.25)', borderRadius: '12px', padding: '0.9rem 1rem', marginBottom: '1.2rem' }}>
              <div style={{ color: '#fbbf24', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.4rem' }}>
                🔑 輸入解鎖碼解鎖 {series.label} 全部內容
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input type="text" placeholder="PSYCH-XXXX-XXXX"
                  style={{ flex: 1, padding: '7px 10px', fontSize: '0.82rem', borderRadius: '8px', border: '1px solid rgba(251,191,36,0.4)', background: 'rgba(255,255,255,0.04)', color: '#e2e8f0', outline: 'none' }}
                  value={expandUnlock === series.id ? codeInput : ''}
                  onChange={e => { setExpandUnlock(series.id); setCodeInput(e.target.value); setCodeError(''); }}
                  onKeyDown={async e => {
                    if (e.key === 'Enter') {
                      setVerifying(true);
                      const ok = await handleUnlock(series.id, codeInput);
                      setVerifying(false);
                      if (!ok) setCodeError('解鎖碼不正確');
                    }
                  }}
                />
                <button disabled={verifying}
                  onClick={async () => {
                    setVerifying(true);
                    const ok = await handleUnlock(series.id, codeInput);
                    setVerifying(false);
                    if (!ok) setCodeError('解鎖碼不正確');
                  }}
                  style={{ padding: '7px 14px', background: '#f59e0b', color: '#1c1917', border: 'none', borderRadius: '8px', fontSize: '0.82rem', cursor: 'pointer', fontWeight: 700, whiteSpace: 'nowrap' }}>
                  {verifying ? '…' : '解鎖'}
                </button>
              </div>
              {codeError && <p style={{ color: '#f87171', fontSize: '0.72rem', margin: '4px 0 0' }}>{codeError}</p>}
            </div>
          )}

          {seriesUnlocked && (
            <div style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.25)', borderRadius: '10px', padding: '0.5rem 0.8rem', marginBottom: '1.2rem', color: '#86efac', fontSize: '0.8rem' }}>
              ✅ {series.label} 已解鎖，所有組別開放閱讀
            </div>
          )}

          {/* 組別列表 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
            {book.lessons.map((lesson, idx) => {
              const accessible = lesson.isFree || seriesUnlocked;
              const completed = isDone(lesson.id);
              return (
                <div key={lesson.id}
                  onClick={() => accessible && setView({ t: 'lesson', series, book, lesson })}
                  style={{ background: completed ? 'rgba(34,197,94,0.06)' : 'rgba(255,255,255,0.04)', border: `1px solid ${completed ? 'rgba(34,197,94,0.2)' : accessible ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.04)'}`, borderRadius: '12px', padding: '0.8rem 1rem', display: 'flex', alignItems: 'center', gap: '0.8rem', cursor: accessible ? 'pointer' : 'default', opacity: accessible ? 1 : 0.5 }}>
                  <div style={{ fontSize: '1.3rem', flexShrink: 0 }}>
                    {completed ? '✅' : lesson.isFree ? '🆓' : seriesUnlocked ? lesson.emoji : '🔒'}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ color: '#e2e8f0', fontWeight: 600, fontSize: '0.9rem' }}>
                      第{idx + 1}組：{lesson.title}
                    </div>
                    <div style={{ color: '#64748b', fontSize: '0.75rem', marginTop: '0.1rem' }}>
                      {lesson.slides.length} 頁 · {lesson.isFree ? '免費體驗' : seriesUnlocked ? '已解鎖' : '需解鎖'}
                    </div>
                  </div>
                  {accessible && <div style={{ color: '#7c3aed', fontSize: '0.8rem' }}>→</div>}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // 書本列表（一個學系的書）
  if (view.t === 'book-list') {
    const { series } = view;
    const seriesUnlocked = isUnlocked(series.id);

    return (
      <div className="classroom-content">
        <div style={{ maxWidth: 640, margin: '0 auto' }}>

          {/* 麵包屑 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '1.2rem', flexWrap: 'wrap' }}>
            <Link href="/classroom" style={{ color: '#7c3aed', fontSize: '0.8rem', textDecoration: 'none' }}>驚喜學院</Link>
            <span style={{ color: '#475569', fontSize: '0.75rem' }}>›</span>
            <button onClick={() => setView({ t: 'series-list' })} style={{ background: 'none', border: 'none', color: '#7c3aed', fontSize: '0.8rem', cursor: 'pointer', padding: 0 }}>心理學書院</button>
            <span style={{ color: '#475569', fontSize: '0.75rem' }}>›</span>
            <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>{series.emoji} {series.label}</span>
          </div>

          <div style={{ marginBottom: '1.4rem' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.3rem' }}>{series.emoji}</div>
            <h2 style={{ color: '#fff', fontSize: '1.4rem', fontWeight: 800, margin: '0 0 0.4rem' }}>{series.label}</h2>
            {seriesUnlocked ? (
              <div style={{ display: 'inline-block', background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.3)', color: '#86efac', fontSize: '0.78rem', padding: '0.2rem 0.7rem', borderRadius: '20px' }}>
                ✅ 已解鎖全系
              </div>
            ) : (
              <div style={{ display: 'inline-block', background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.3)', color: '#fbbf24', fontSize: '0.78rem', padding: '0.2rem 0.7rem', borderRadius: '20px' }}>
                🆓 每本第一組免費體驗
              </div>
            )}
          </div>

          {/* 未解鎖時的解鎖區塊 */}
          {!seriesUnlocked && (
            <div style={{ background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.25)', borderRadius: '12px', padding: '0.9rem 1rem', marginBottom: '1.2rem' }}>
              <div style={{ color: '#a78bfa', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                🔑 輸入解鎖碼 · 解鎖本學系全部 {series.books.length} 本完整內容
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.6rem' }}>
                <input type="text" placeholder="PSYCH-XXXX-XXXX"
                  value={expandUnlock === series.id ? codeInput : ''}
                  onChange={e => { setExpandUnlock(series.id); setCodeInput(e.target.value); setCodeError(''); }}
                  onKeyDown={async e => {
                    if (e.key === 'Enter') {
                      setVerifying(true);
                      const ok = await handleUnlock(series.id, codeInput);
                      setVerifying(false);
                      if (!ok) setCodeError('解鎖碼不正確');
                    }
                  }}
                  style={{ flex: 1, padding: '8px 10px', fontSize: '0.82rem', borderRadius: '8px', border: '1px solid rgba(124,58,237,0.4)', background: 'rgba(255,255,255,0.04)', color: '#e2e8f0', outline: 'none' }}
                />
                <button disabled={verifying}
                  onClick={async () => {
                    setVerifying(true);
                    const ok = await handleUnlock(series.id, codeInput);
                    setVerifying(false);
                    if (!ok) setCodeError('解鎖碼不正確');
                  }}
                  style={{ padding: '8px 14px', background: '#7c3aed', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '0.82rem', cursor: 'pointer', fontWeight: 700, whiteSpace: 'nowrap' }}>
                  {verifying ? '…' : '解鎖'}
                </button>
              </div>
              {codeError && <p style={{ color: '#f87171', fontSize: '0.72rem', margin: '0 0 0.4rem' }}>{codeError}</p>}
              <div style={{ display: 'flex', gap: '0.6rem' }}>
                <a href="https://still-time-corner.vercel.app/digital" target="_blank" rel="noopener noreferrer"
                  style={{ flex: 1, display: 'block', background: 'linear-gradient(135deg, #7c3aed, #2563eb)', color: '#fff', fontWeight: 700, fontSize: '0.82rem', borderRadius: '20px', padding: '0.5rem', textDecoration: 'none', textAlign: 'center' }}>
                  轉帳購買 →
                </a>
                <button onClick={() => setPointsToast(true)}
                  style={{ flex: 1, background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.35)', color: '#fbbf24', fontWeight: 700, fontSize: '0.82rem', borderRadius: '20px', padding: '0.5rem', cursor: 'pointer' }}>
                  🪙 積分兌換
                </button>
              </div>
              {pointsToast && (
                <div style={{ marginTop: '0.5rem', color: '#fbbf24', fontSize: '0.75rem', textAlign: 'center' }}>
                  積分兌換即將上線，敬請期待
                </div>
              )}
            </div>
          )}

          {/* 書本列表 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {series.books.map(book => {
              const completedCount = book.lessons.filter(l => isDone(l.id)).length;
              const totalGroups = book.lessons.length;
              return (
                <div key={book.id}
                  onClick={() => setView({ t: 'group-list', series, book })}
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', padding: '0.9rem 1.1rem', display: 'flex', alignItems: 'center', gap: '0.9rem', cursor: 'pointer' }}>
                  <div style={{ fontSize: '1.5rem', flexShrink: 0 }}>{book.emoji}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ color: '#e2e8f0', fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.2rem' }}>{book.title}</div>
                    <div style={{ color: '#64748b', fontSize: '0.78rem' }}>
                      {completedCount > 0 ? `${completedCount}/${totalGroups} 組已完成` : `${totalGroups} 組 · 第一組免費`}
                    </div>
                  </div>
                  <div style={{ color: completedCount === totalGroups ? '#86efac' : '#7c3aed', fontSize: '0.8rem' }}>
                    {completedCount === totalGroups ? '✅' : '→'}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // ── 學系列表（首頁）────────────────────────────────────
  const seriesForFilter = PSYCH_SERIES.map(s => ({ id: s.id, label: s.label.replace('心理學系','').replace('心理學',''), emoji: s.emoji }));

  const displaySeries = filter === 'all' ? PSYCH_SERIES : PSYCH_SERIES.filter(s => s.id === filter);

  return (
    <div className="classroom-content">
      <div style={{ maxWidth: 700, margin: '0 auto' }}>

        {/* 標題 */}
        <div style={{ marginBottom: '1.4rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.8rem' }}>
            <Link href="/classroom" style={{ color: '#7c3aed', fontSize: '0.8rem', textDecoration: 'none' }}>← 驚喜學院</Link>
          </div>
          <div style={{ fontSize: '2rem', marginBottom: '0.3rem' }}>🧠</div>
          <h1 style={{ color: '#fff', fontSize: '1.6rem', fontWeight: 800, margin: '0 0 0.4rem' }}>心理學書院</h1>
          <p style={{ color: '#94a3b8', fontSize: '0.88rem', margin: 0 }}>
            6大學系 · 28本 · 每本第一組永久免費體驗。購買電子書取得解鎖碼，解鎖整個學系的完整課程。
          </p>
        </div>

        {/* 學系篩選 */}
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
          <button onClick={() => setFilter('all')}
            style={{ padding: '0.3rem 0.8rem', borderRadius: '20px', fontSize: '0.75rem', cursor: 'pointer', background: filter === 'all' ? 'rgba(124,58,237,0.25)' : 'rgba(255,255,255,0.04)', border: filter === 'all' ? '1px solid #7c3aed' : '1px solid rgba(255,255,255,0.08)', color: filter === 'all' ? '#a78bfa' : '#64748b' }}>
            全部 {PSYCH_SERIES.length}
          </button>
          {seriesForFilter.map(s => (
            <button key={s.id} onClick={() => setFilter(s.id)}
              style={{ padding: '0.3rem 0.8rem', borderRadius: '20px', fontSize: '0.75rem', cursor: 'pointer', background: filter === s.id ? 'rgba(124,58,237,0.25)' : 'rgba(255,255,255,0.04)', border: filter === s.id ? '1px solid #7c3aed' : '1px solid rgba(255,255,255,0.08)', color: filter === s.id ? '#a78bfa' : '#64748b' }}>
              {s.emoji} {s.label}
            </button>
          ))}
        </div>

        {/* 學系卡片 */}
        {displaySeries.map(series => {
          const seriesUnlocked = isUnlocked(series.id);
          const totalBooks = series.books.length;
          const completedBooks = series.books.filter(b => b.lessons.every(l => isDone(l.id))).length;

          return (
            <div key={series.id} style={{ marginBottom: '0.6rem' }}>
              <div
                onClick={() => setView({ t: 'book-list', series })}
                style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${seriesUnlocked ? 'rgba(34,197,94,0.3)' : 'rgba(255,255,255,0.08)'}`, borderRadius: '14px', padding: '1rem 1.2rem', display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer' }}>
                <div style={{ fontSize: '1.8rem', flexShrink: 0 }}>{series.emoji}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ color: '#e2e8f0', fontWeight: 700, fontSize: '0.98rem', marginBottom: '0.2rem' }}>{series.label}</div>
                  <div style={{ color: '#64748b', fontSize: '0.78rem' }}>
                    {totalBooks} 本 · {seriesUnlocked ? `${completedBooks}/${totalBooks} 本已完課` : '每本第一組免費'}
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.3rem', flexShrink: 0 }}>
                  {seriesUnlocked ? (
                    <span style={{ background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.3)', color: '#86efac', fontSize: '0.7rem', padding: '0.15rem 0.5rem', borderRadius: '10px' }}>已解鎖</span>
                  ) : (
                    <span style={{ background: 'rgba(124,58,237,0.12)', border: '1px solid rgba(124,58,237,0.3)', color: '#a78bfa', fontSize: '0.7rem', padding: '0.15rem 0.5rem', borderRadius: '10px' }}>🆓 試讀</span>
                  )}
                  <span style={{ color: '#7c3aed', fontSize: '0.8rem' }}>→</span>
                </div>
              </div>
            </div>
          );
        })}

        {/* 底部 CTA */}
        <div style={{ marginTop: '1.5rem', background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.2)', borderRadius: '14px', padding: '1.2rem', textAlign: 'center' }}>
          <div style={{ color: '#a78bfa', fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.3rem' }}>想解鎖完整內容？</div>
          <div style={{ color: '#64748b', fontSize: '0.82rem', marginBottom: '1rem' }}>購買電子書取得學系解鎖碼，也可用魯魯積分兌換</div>
          <div style={{ display: 'flex', gap: '0.6rem', justifyContent: 'center' }}>
            <a href="https://still-time-corner.vercel.app/digital" target="_blank" rel="noopener noreferrer"
              style={{ flex: 1, maxWidth: 200, display: 'block', background: 'linear-gradient(135deg, #7c3aed, #2563eb)', color: '#fff', fontWeight: 700, fontSize: '0.88rem', borderRadius: '30px', padding: '0.65rem', textDecoration: 'none', textAlign: 'center' }}>
              轉帳購買 →
            </a>
            <button onClick={() => setPointsToast(v => !v)}
              style={{ flex: 1, maxWidth: 200, background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.35)', color: '#fbbf24', fontWeight: 700, fontSize: '0.88rem', borderRadius: '30px', padding: '0.65rem', cursor: 'pointer' }}>
              🪙 魯魯積分兌換
            </button>
          </div>
          {pointsToast && (
            <div style={{ marginTop: '0.6rem', color: '#fbbf24', fontSize: '0.78rem' }}>
              積分兌換即將整合，敬請期待～目前可至小舖查看積分餘額
            </div>
          )}
        </div>

        {/* 返回 */}
        <div style={{ textAlign: 'center', marginTop: '1.2rem' }}>
          <Link href="/classroom" style={{ color: '#475569', fontSize: '0.85rem', textDecoration: 'none' }}>
            ← 回驚喜學院
          </Link>
        </div>
      </div>
    </div>
  );
}
