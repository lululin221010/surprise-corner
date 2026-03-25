'use client';
// 📄 路徑：src/app/games/sudoku/page.tsx
// 數獨遊戲 — 純前端，三種難度，手機數字鍵盤 + 桌機鍵盤輸入

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';

// ─── Sudoku 產生器 ───────────────────────────────────────────────────

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function isValid(board: number[][], row: number, col: number, num: number): boolean {
  for (let i = 0; i < 9; i++) {
    if (board[row][i] === num) return false;
    if (board[i][col] === num) return false;
  }
  const br = Math.floor(row / 3) * 3;
  const bc = Math.floor(col / 3) * 3;
  for (let dr = 0; dr < 3; dr++)
    for (let dc = 0; dc < 3; dc++)
      if (board[br + dr][bc + dc] === num) return false;
  return true;
}

function solve(board: number[][]): boolean {
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (board[r][c] === 0) {
        for (const n of shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9])) {
          if (isValid(board, r, c, n)) {
            board[r][c] = n;
            if (solve(board)) return true;
            board[r][c] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
}

function generatePuzzle(difficulty: 'easy' | 'medium' | 'hard') {
  const solution: number[][] = Array.from({ length: 9 }, () => Array(9).fill(0));
  solve(solution);

  const removeCount = difficulty === 'easy' ? 32 : difficulty === 'medium' ? 44 : 54;
  const puzzle = solution.map(row => [...row]);
  const positions = shuffle(Array.from({ length: 81 }, (_, i) => i));
  let removed = 0;
  for (const pos of positions) {
    if (removed >= removeCount) break;
    const r = Math.floor(pos / 9);
    const c = pos % 9;
    puzzle[r][c] = 0;
    removed++;
  }
  return { puzzle, solution };
}

// ─── 元件 ────────────────────────────────────────────────────────────

type Difficulty = 'easy' | 'medium' | 'hard';
const DIFF_LABEL: Record<Difficulty, string> = { easy: '簡單', medium: '中等', hard: '困難' };
const DIFF_COLOR: Record<Difficulty, string> = { easy: '#4ade80', medium: '#fbbf24', hard: '#f87171' };

function formatTime(s: number) {
  const m = Math.floor(s / 60);
  return `${m}:${(s % 60).toString().padStart(2, '0')}`;
}

export default function SudokuPage() {
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [userBoard, setUserBoard] = useState<number[][]>([]);
  const [solution, setSolution] = useState<number[][]>([]);
  const [given, setGiven] = useState<boolean[][]>([]);
  const [selected, setSelected] = useState<[number, number] | null>(null);
  const [errors, setErrors] = useState<Set<string>>(new Set());
  const [won, setWon] = useState(false);
  const [timer, setTimer] = useState(0);
  const [running, setRunning] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const boardRef = useRef<HTMLDivElement>(null);

  const startGame = useCallback((diff: Difficulty) => {
    const { puzzle, solution: sol } = generatePuzzle(diff);
    setSolution(sol);
    setUserBoard(puzzle.map(r => [...r]));
    setGiven(puzzle.map(r => r.map(v => v !== 0)));
    setSelected(null);
    setErrors(new Set());
    setWon(false);
    setTimer(0);
    setRunning(true);
  }, []);

  useEffect(() => { startGame('easy'); }, [startGame]);

  useEffect(() => {
    if (running && !won) {
      timerRef.current = setInterval(() => setTimer(t => t + 1), 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [running, won]);

  function getErrors(board: number[][]): Set<string> {
    const errs = new Set<string>();
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        const v = board[r][c];
        if (!v) continue;
        for (let i = 0; i < 9; i++) {
          if (i !== c && board[r][i] === v) { errs.add(`${r},${c}`); errs.add(`${r},${i}`); }
          if (i !== r && board[i][c] === v) { errs.add(`${r},${c}`); errs.add(`${i},${c}`); }
        }
        const br = Math.floor(r / 3) * 3, bc = Math.floor(c / 3) * 3;
        for (let dr = 0; dr < 3; dr++)
          for (let dc = 0; dc < 3; dc++) {
            const r2 = br + dr, c2 = bc + dc;
            if ((r2 !== r || c2 !== c) && board[r2][c2] === v) {
              errs.add(`${r},${c}`); errs.add(`${r2},${c2}`);
            }
          }
      }
    }
    return errs;
  }

  function handleInput(num: number) {
    if (!selected || won) return;
    const [r, c] = selected;
    if (given[r]?.[c]) return;
    const newBoard = userBoard.map(row => [...row]);
    newBoard[r][c] = num;
    setUserBoard(newBoard);
    const errs = getErrors(newBoard);
    setErrors(errs);
    if (errs.size === 0 && newBoard.every((row, ri) => row.every((v, ci) => v === solution[ri][ci]))) {
      setWon(true);
      setRunning(false);
    }
  }

  function handleKey(e: React.KeyboardEvent) {
    const n = parseInt(e.key);
    if (n >= 1 && n <= 9) { e.preventDefault(); handleInput(n); }
    if (['Backspace', 'Delete', '0'].includes(e.key)) { e.preventDefault(); handleInput(0); }
    if (!selected) return;
    const [r, c] = selected;
    if (e.key === 'ArrowUp'    && r > 0) { e.preventDefault(); setSelected([r - 1, c]); }
    if (e.key === 'ArrowDown'  && r < 8) { e.preventDefault(); setSelected([r + 1, c]); }
    if (e.key === 'ArrowLeft'  && c > 0) { e.preventDefault(); setSelected([r, c - 1]); }
    if (e.key === 'ArrowRight' && c < 8) { e.preventDefault(); setSelected([r, c + 1]); }
  }

  function isHighlighted(r: number, c: number) {
    if (!selected) return false;
    const [sr, sc] = selected;
    return r === sr || c === sc || (Math.floor(r / 3) === Math.floor(sr / 3) && Math.floor(c / 3) === Math.floor(sc / 3));
  }

  function isSameNum(r: number, c: number) {
    if (!selected) return false;
    const [sr, sc] = selected;
    const v = userBoard[sr]?.[sc];
    return !!v && userBoard[r][c] === v && !(r === sr && c === sc);
  }

  const bg = 'linear-gradient(135deg, #0f0a1e 0%, #1a0533 50%, #0a1628 100%)';

  return (
    <div
      style={{ minHeight: '100vh', background: bg, padding: '1.5rem 1rem 6rem', outline: 'none' }}
      onKeyDown={handleKey}
      tabIndex={0}
      ref={boardRef}
    >
      <div style={{ maxWidth: '420px', margin: '0 auto' }}>

        {/* 返回 */}
        <div style={{ marginBottom: '1.2rem' }}>
          <Link href="/games" style={{ color: '#a78bfa', textDecoration: 'none', fontSize: '0.9rem' }}>← 小遊戲</Link>
        </div>

        {/* 標題 */}
        <div style={{ textAlign: 'center', marginBottom: '1.2rem' }}>
          <div style={{ fontSize: '2.2rem', marginBottom: '0.3rem' }}>🔢</div>
          <h1 style={{ color: '#fff', fontSize: '1.7rem', fontWeight: 800, margin: '0 0 0.3rem' }}>數獨</h1>
          <p style={{ color: '#6b7280', margin: 0, fontSize: '0.8rem' }}>每行、每列、每個 3×3 宮格，數字 1–9 各出現一次</p>
        </div>

        {/* 控制列 */}
        <div style={{ display: 'flex', gap: '0.4rem', justifyContent: 'center', marginBottom: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
          {(['easy', 'medium', 'hard'] as Difficulty[]).map(d => (
            <button key={d}
              onClick={() => { setDifficulty(d); startGame(d); }}
              style={{
                padding: '0.35rem 0.9rem', borderRadius: '20px', border: 'none',
                background: difficulty === d ? DIFF_COLOR[d] : 'rgba(255,255,255,0.1)',
                color: difficulty === d ? '#000' : '#9ca3af',
                fontWeight: 700, fontSize: '0.82rem', cursor: 'pointer',
              }}>
              {DIFF_LABEL[d]}
            </button>
          ))}
          <button
            onClick={() => startGame(difficulty)}
            style={{
              padding: '0.35rem 0.9rem', borderRadius: '20px',
              border: '1px solid rgba(167,139,250,0.4)',
              background: 'transparent', color: '#a78bfa',
              fontWeight: 700, fontSize: '0.82rem', cursor: 'pointer',
            }}>
            🔀 新局
          </button>
          <span style={{ color: '#9ca3af', fontSize: '0.88rem', fontVariantNumeric: 'tabular-nums', minWidth: '52px', textAlign: 'center' }}>
            ⏱ {formatTime(timer)}
          </span>
        </div>

        {/* 完成提示 */}
        {won && (
          <div style={{ textAlign: 'center', marginBottom: '1rem', padding: '1rem', background: 'rgba(74,222,128,0.12)', border: '1px solid rgba(74,222,128,0.35)', borderRadius: '14px' }}>
            <div style={{ fontSize: '1.8rem', marginBottom: '0.3rem' }}>🎉</div>
            <div style={{ color: '#4ade80', fontWeight: 800, fontSize: '1.1rem' }}>完成！用時 {formatTime(timer)}</div>
            <button
              onClick={() => startGame(difficulty)}
              style={{ marginTop: '0.7rem', padding: '0.45rem 1.4rem', borderRadius: '20px', border: 'none', background: '#4ade80', color: '#000', fontWeight: 700, cursor: 'pointer', fontSize: '0.88rem' }}>
              再玩一局
            </button>
          </div>
        )}

        {/* 棋盤 */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(9, 1fr)',
          border: '2px solid rgba(167,139,250,0.7)',
          borderRadius: '10px',
          overflow: 'hidden',
          marginBottom: '1rem',
          touchAction: 'manipulation',
        }}>
          {userBoard.map((row, r) =>
            row.map((val, c) => {
              const isSel = selected?.[0] === r && selected?.[1] === c;
              const isGiv = given[r]?.[c];
              const isErr = errors.has(`${r},${c}`);
              const hilight = isHighlighted(r, c);
              const sameN = isSameNum(r, c);

              let cellBg = 'transparent';
              if (isSel) cellBg = 'rgba(124,58,237,0.55)';
              else if (isErr) cellBg = 'rgba(248,113,113,0.22)';
              else if (sameN) cellBg = 'rgba(124,58,237,0.22)';
              else if (hilight) cellBg = 'rgba(255,255,255,0.06)';

              const bRight = c === 2 || c === 5 ? '2px solid rgba(167,139,250,0.6)' : '1px solid rgba(255,255,255,0.07)';
              const bBottom = r === 2 || r === 5 ? '2px solid rgba(167,139,250,0.6)' : '1px solid rgba(255,255,255,0.07)';

              return (
                <div key={`${r}-${c}`}
                  onClick={() => { handleCellClick(r, c); boardRef.current?.focus(); }}
                  style={{
                    aspectRatio: '1',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: cellBg,
                    borderRight: bRight, borderBottom: bBottom,
                    cursor: isGiv ? 'default' : 'pointer',
                    fontSize: 'clamp(13px, 3.8vw, 18px)',
                    fontWeight: isGiv ? 800 : 500,
                    color: isErr ? '#f87171' : isGiv ? '#e9d5ff' : '#a78bfa',
                    userSelect: 'none',
                    transition: 'background 0.1s',
                  }}>
                  {val !== 0 ? val : ''}
                </div>
              );
            })
          )}
        </div>

        {/* 數字鍵盤（手機用） */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.45rem', marginBottom: '1rem' }}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => (
            <button key={n}
              onClick={() => handleInput(n)}
              style={{
                aspectRatio: '1', borderRadius: '10px',
                border: '1px solid rgba(167,139,250,0.3)',
                background: 'rgba(255,255,255,0.07)',
                color: '#e9d5ff', fontSize: '1.15rem', fontWeight: 700, cursor: 'pointer',
              }}>
              {n}
            </button>
          ))}
          <button
            onClick={() => handleInput(0)}
            style={{
              aspectRatio: '1', borderRadius: '10px',
              border: '1px solid rgba(248,113,113,0.35)',
              background: 'rgba(255,255,255,0.07)',
              color: '#f87171', fontSize: '1rem', fontWeight: 700, cursor: 'pointer',
            }}>
            ✕
          </button>
        </div>

        <p style={{ color: '#4b5563', fontSize: '0.73rem', textAlign: 'center', lineHeight: 1.7, margin: '0 0 1.5rem' }}>
          點格子選取 → 點數字填入 · 桌機可直接鍵盤輸入 · 方向鍵移動
        </p>

        {/* 玩法說明 */}
        <div style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(167,139,250,0.2)',
          borderRadius: '14px', padding: '1.2rem 1.4rem',
        }}>
          <div style={{ color: '#a78bfa', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.8rem', letterSpacing: '0.05em' }}>
            📖 玩法規則
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
            {[
              { icon: '🔢', text: '將數字 1–9 填入所有空格' },
              { icon: '➡️', text: '每一「橫列」的 9 格，數字 1–9 各出現恰好一次' },
              { icon: '⬇️', text: '每一「直行」的 9 格，數字 1–9 各出現恰好一次' },
              { icon: '⬛', text: '每個粗框「3×3 宮格」，數字 1–9 各出現恰好一次' },
              { icon: '🔴', text: '數字衝突時格子變紅，找出錯誤並修正' },
              { icon: '✅', text: '所有格子填對即完成！' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                <span style={{ fontSize: '0.85rem', flexShrink: 0, marginTop: '0.05rem' }}>{item.icon}</span>
                <span style={{ color: '#9ca3af', fontSize: '0.82rem', lineHeight: 1.6 }}>{item.text}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '1rem', paddingTop: '0.8rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ color: '#6b7280', fontSize: '0.75rem', marginBottom: '0.4rem' }}>💡 難度說明</div>
            <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
              {[
                { label: '簡單', color: '#4ade80', desc: '提示較多，適合初學' },
                { label: '中等', color: '#fbbf24', desc: '需要基本推理' },
                { label: '困難', color: '#f87171', desc: '需要進階技巧' },
              ].map(d => (
                <div key={d.label} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: d.color, display: 'inline-block', flexShrink: 0 }} />
                  <span style={{ color: d.color, fontSize: '0.78rem', fontWeight: 700 }}>{d.label}</span>
                  <span style={{ color: '#4b5563', fontSize: '0.75rem' }}>{d.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <p style={{ color: '#374151', fontSize: '0.73rem', textAlign: 'center', lineHeight: 1.7, margin: 0 }}>
          點格子選取 → 點數字填入 · 桌機可直接鍵盤輸入 · 方向鍵移動
        </p>
      </div>
    </div>
  );

  function handleCellClick(r: number, c: number) {
    if (won) return;
    setSelected([r, c]);
  }
}
