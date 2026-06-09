'use client';
// 📄 路徑：src/app/classroom/stock/AcademyQuiz.tsx

import { useState, useEffect } from 'react';
import type { Quiz } from './courses';
import '../classroom.css';
import {
  getCurrentEmail, addCoins, useInventory, getAccount,
  type UserAccount,
} from '../coins';

interface CertInfo {
  lessonId: string;
  lessonTitle: string;
  quizIndex: number;
}

interface Props {
  quiz: Quiz;
  certInfo: CertInfo;
  onPass: () => void;
  onRetry: () => void;
}

function saveCert(email: string, info: CertInfo) {
  const key = 'sc_academy_certs';
  const all: Record<string, { lessonId: string; lessonTitle: string; quizIndex: number; earnedAt: string }[]> =
    JSON.parse(localStorage.getItem(key) || '{}');
  if (!all[email]) all[email] = [];
  const dup = all[email].some(c => c.lessonId === info.lessonId && c.quizIndex === info.quizIndex);
  if (!dup) {
    all[email].push({ ...info, earnedAt: new Date().toISOString() });
    localStorage.setItem(key, JSON.stringify(all));
  }
}

export default function AcademyQuiz({ quiz, certInfo, onPass, onRetry }: Props) {
  const [selected, setSelected] = useState<number | null>(null);
  const [email, setEmail] = useState('');
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [account, setAccount] = useState<UserAccount | null>(null);
  const [coinMsg, setCoinMsg] = useState('');
  const [skipped, setSkipped] = useState(false);   // 能量飲料用過

  useEffect(() => {
    const em = getCurrentEmail();
    setEmail(em);
    if (em) setAccount(getAccount(em));
  }, []);

  const answered = selected !== null || skipped;
  const isCorrect = skipped || (answered && selected === quiz.answerIndex);

  function handleSelect(i: number) {
    if (answered) return;
    setSelected(i);
    // 答對：+1 金幣
    const correct = i === quiz.answerIndex;
    if (correct && email) {
      const total = addCoins(email, 1);
      setAccount(getAccount(email));
      setCoinMsg(`+1 🪙 累積 ${total} 金幣`);
      setTimeout(() => setCoinMsg(''), 3000);
    }
  }

  function handleRetryQuiz() {
    setSelected(null);
    setSkipped(false);
  }

  function handleEnergyDrink() {
    if (!email) return;
    const ok = useInventory(email, 'energyDrink');
    if (!ok) {
      setCoinMsg('☕ 庫存不足，前往商店購買');
      setTimeout(() => setCoinMsg(''), 3000);
      return;
    }
    setSkipped(true);
    setAccount(getAccount(email));
    setCoinMsg('☕ 能量飲料使用！跳過此題');
    setTimeout(() => setCoinMsg(''), 3000);
  }

  function handleSave() {
    const trimmed = email.trim();
    if (!trimmed || !trimmed.includes('@')) {
      setSaveError('請輸入有效的 Email');
      return;
    }
    saveCert(trimmed, certInfo);
    setSaved(true);
    setSaveError('');
  }

  const drinkCount = account?.inventory?.energyDrink ?? 0;

  return (
    <div className="quiz-card">
      <p className="quiz-question">{quiz.question}</p>

      {/* 金幣/飲料訊息 */}
      {coinMsg && (
        <div style={{
          background: '#fef9c3', border: '1px solid #fde68a',
          borderRadius: '8px', padding: '6px 12px',
          fontSize: '0.78rem', color: '#92400e',
          marginBottom: '0.6rem', textAlign: 'center',
        }}>
          {coinMsg}
        </div>
      )}

      <div style={{ marginBottom: '0.8rem' }}>
        {quiz.options.map((opt, i) => {
          let extraClass = '';
          if (answered && !skipped) {
            if (i === quiz.answerIndex) extraClass = ' correct';
            else if (i === selected) extraClass = ' wrong';
          }
          if (answered && skipped && i === quiz.answerIndex) extraClass = ' correct';
          return (
            <button
              key={i}
              className={`quiz-option${extraClass}`}
              onClick={() => handleSelect(i)}
              style={{ cursor: answered ? 'default' : 'pointer' }}
            >
              {opt}
            </button>
          );
        })}
      </div>

      {/* 解說 */}
      {answered && (
        <div className={isCorrect ? 'quiz-result-ok' : 'quiz-result-no'} style={{ marginBottom: '1rem' }}>
          <div style={{ fontWeight: 700, marginBottom: '4px' }}>
            {skipped ? '☕ 使用能量飲料跳過此題' : isCorrect ? '✅ 答對了！' : '❌ 答錯了'}
          </div>
          {!skipped && quiz.explanation}
        </div>
      )}

      {/* 答對：榮譽證書 + Email 儲存 + 繼續 */}
      {answered && isCorrect && (
        <>
          <div style={{
            background: 'linear-gradient(135deg, #eef2ff, #f0fdf4)',
            border: '1px solid #c7d2fe',
            borderRadius: '12px', padding: '1.2rem', marginBottom: '0.8rem', textAlign: 'center',
          }}>
            <div style={{ fontSize: '1.8rem', marginBottom: '0.3rem' }}>🏅</div>
            <div style={{ color: '#4338ca', fontWeight: 800, fontSize: '1rem', marginBottom: '0.2rem' }}>
              驚喜榮譽證書
            </div>
            <div style={{ color: '#374151', fontSize: '0.78rem', lineHeight: 1.6, marginBottom: '0.8rem' }}>
              恭喜答對！<br />
              <span style={{ color: '#6366f1' }}>憑此證書至有的沒的小舖兌換專屬福利</span>
            </div>

            {/* Email 儲存區塊 */}
            {!saved ? (
              <div style={{ borderTop: '1px solid #e8e4ff', paddingTop: '0.8rem' }}>
                <p style={{ color: '#64748b', fontSize: '0.72rem', marginBottom: '0.5rem' }}>
                  輸入 Email 可儲存證書與金幣（不輸入也可繼續）
                </p>
                <div style={{ display: 'flex', gap: '0.4rem' }}>
                  <input
                    type="email"
                    value={email}
                    onChange={e => { setEmail(e.target.value); setSaveError(''); }}
                    placeholder="your@email.com"
                    style={{
                      flex: 1, padding: '8px 10px', fontSize: '0.82rem',
                      border: saveError ? '1px solid #ef4444' : '1px solid #c7d2fe',
                      borderRadius: '8px', outline: 'none', color: '#1e1b4b',
                    }}
                  />
                  <button
                    onClick={handleSave}
                    style={{
                      padding: '8px 14px', background: '#7c3aed', color: '#fff',
                      border: 'none', borderRadius: '8px', fontSize: '0.82rem',
                      cursor: 'pointer', whiteSpace: 'nowrap', fontWeight: 600,
                    }}
                  >
                    儲存
                  </button>
                </div>
                {saveError && (
                  <p style={{ color: '#ef4444', fontSize: '0.72rem', marginTop: '4px', textAlign: 'left' }}>
                    {saveError}
                  </p>
                )}
              </div>
            ) : (
              <div style={{ borderTop: '1px solid #e8e4ff', paddingTop: '0.8rem' }}>
                <p style={{ color: '#15803d', fontSize: '0.78rem', fontWeight: 600 }}>
                  ✅ 已儲存到 {email}
                </p>
                <a
                  href="/classroom/my-certs"
                  target="_blank"
                  style={{ color: '#6366f1', fontSize: '0.72rem', textDecoration: 'underline' }}
                >
                  查看我的證書 →
                </a>
              </div>
            )}
          </div>

          <button className="btn-next" onClick={onPass} style={{ width: '100%' }}>
            繼續下一題 →
          </button>
        </>
      )}

      {/* 答錯：重新測驗 + 重新上課 + 能量飲料 */}
      {answered && !isCorrect && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div style={{ display: 'flex', gap: '0.6rem' }}>
            <button onClick={handleRetryQuiz} className="btn-next" style={{ flex: 1 }}>
              重新測驗
            </button>
            <button onClick={onRetry} className="btn-prev" style={{ flex: 1 }}>
              ← 重新上課
            </button>
          </div>

          {/* 能量飲料按鈕 */}
          <button
            onClick={handleEnergyDrink}
            style={{
              width: '100%', padding: '9px',
              background: drinkCount > 0 ? '#fef3c7' : '#f3f4f6',
              border: `1px solid ${drinkCount > 0 ? '#fde68a' : '#e5e7eb'}`,
              color: drinkCount > 0 ? '#92400e' : '#9ca3af',
              borderRadius: '9px', fontSize: '0.82rem',
              cursor: drinkCount > 0 ? 'pointer' : 'default',
              fontWeight: 600,
            }}
          >
            ☕ 使用能量飲料跳過此題（庫存 ×{drinkCount}）
            {drinkCount === 0 && (
              <span style={{ marginLeft: '0.4rem', fontSize: '0.72rem' }}>
                — <a href="/classroom/shop" style={{ color: '#7c3aed' }}>前往商店購買</a>
              </span>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
