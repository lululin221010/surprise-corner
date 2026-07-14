'use client';

import { useState } from 'react';
import type { Clue, Deduction } from '../types';

export function DeductionBoard({
  deduction,
  clues,
  answers,
  onSelectOption,
  hasSubmitted,
  onSubmit,
}: {
  deduction: Deduction;
  clues: Clue[];
  answers: Record<string, string>;
  onSelectOption: (blankId: string, optionId: string) => void;
  hasSubmitted: boolean;
  onSubmit: () => void;
}) {
  const [showResult, setShowResult] = useState(hasSubmitted);

  const allAnswered = deduction.blanks.every(b => answers[b.id]);

  function selectOption(blankId: string, optionId: string) {
    onSelectOption(blankId, optionId);
    if (showResult) setShowResult(false);
  }

  function handleVerify() {
    setShowResult(true);
    onSubmit();
  }

  const correctCount = deduction.blanks.filter(b => answers[b.id] === b.correctOptionId).length;

  return (
    <div>
      <p className="mb-4 text-xs leading-relaxed text-slate-500">{deduction.intro}</p>

      <div className="space-y-6">
        {deduction.blanks.map(blank => {
          const selectedId = answers[blank.id];
          const selectedOption = blank.options.find(o => o.id === selectedId);
          const isCorrect = selectedId === blank.correctOptionId;
          const misledClue =
            showResult && selectedOption?.misledByClueId
              ? clues.find(c => c.id === selectedOption.misledByClueId)
              : null;

          return (
            <div key={blank.id} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <p className="mb-3 text-sm leading-relaxed text-slate-300">
                {blank.promptBefore}
                <span
                  className={`mx-1 inline-block min-w-[3rem] rounded border-b-2 px-1 text-center font-medium ${
                    showResult
                      ? isCorrect
                        ? 'border-emerald-400 text-emerald-300'
                        : 'border-rose-400 text-rose-300'
                      : 'border-amber-300/60 text-amber-200'
                  }`}
                >
                  {selectedOption ? selectedOption.text : '　　　　'}
                </span>
                {blank.promptAfter}
              </p>

              <div className="flex flex-wrap gap-2">
                {blank.options.map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => selectOption(blank.id, opt.id)}
                    className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${
                      selectedId === opt.id
                        ? 'border-amber-300 bg-amber-300/15 text-amber-200'
                        : 'border-white/15 text-slate-300 hover:border-white/35'
                    }`}
                  >
                    {opt.text}
                  </button>
                ))}
              </div>

              {showResult && isCorrect && (
                <p className="mt-3 text-xs leading-relaxed text-emerald-300/80">✓ {blank.correctExplanation}</p>
              )}

              {showResult && !isCorrect && (
                <p className="mt-3 text-xs leading-relaxed text-rose-300/80">
                  {misledClue
                    ? `你可能是被「${misledClue.title}」這條線索的第一印象誤導了：${misledClue.firstInterpretation}`
                    : '這格還沒選對，回頭看看有沒有漏掉的線索。'}
                </p>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-6 text-center">
        {showResult && (
          <p className="mb-3 text-sm text-slate-300">
            這次驗證，你答對了 <span className="font-medium text-amber-300">{correctCount}</span> / {deduction.blanks.length} 題
          </p>
        )}

        {!showResult || correctCount < deduction.blanks.length ? (
          <button
            onClick={handleVerify}
            disabled={!allAnswered}
            className="rounded-full border border-amber-400/50 px-6 py-2 text-sm text-amber-300 hover:border-amber-400 disabled:cursor-not-allowed disabled:opacity-30"
          >
            {allAnswered ? '驗證我的推理' : `還有 ${deduction.blanks.length - Object.keys(answers).length} 格未填`}
          </button>
        ) : (
          <p className="text-xs text-slate-500">全部答對了，可以直接去下方按「我認為我知道真相了」結案。</p>
        )}
      </div>
    </div>
  );
}
