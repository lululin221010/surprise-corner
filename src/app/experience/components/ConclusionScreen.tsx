'use client';

import type { Mission } from '../types';

export function ConclusionScreen({
  mission,
  collectedClueIds,
  hypothesisHistory,
  deductionAnswers,
  onBack,
}: {
  mission: Mission;
  collectedClueIds: string[];
  hypothesisHistory: string[];
  deductionAnswers: Record<string, string>;
  onBack: () => void;
}) {
  const collected = mission.clues.filter(c => collectedClueIds.includes(c.id));
  const finalHypothesisId = hypothesisHistory[hypothesisHistory.length - 1] ?? null;
  const finalHypothesis = mission.hypotheses.find(h => h.id === finalHypothesisId) ?? null;
  const deductionCorrectCount = mission.deduction.blanks.filter(
    b => deductionAnswers[b.id] === b.correctOptionId
  ).length;
  const deductionTotal = mission.deduction.blanks.length;

  return (
    <div className="mx-auto max-w-xl text-center">
      <p className="mb-2 text-xs tracking-widest text-slate-500">案件已完成</p>

      <div className="mb-6 rounded-lg border border-white/10 bg-white/5 p-4">
        <p className="mb-1 text-xs tracking-wide text-slate-500">案件重建驗證</p>
        <p className="text-lg font-medium text-amber-300">
          {deductionCorrectCount} / {deductionTotal} 題
        </p>
        <p className="mt-1 text-xs text-slate-500">
          {deductionCorrectCount === deductionTotal
            ? '你完整重建了整起事件，沒有被任何一個第一印象帶偏。'
            : '有些空格你當下的判斷跟後來確認的事實不同，這很正常——這正是這個案子真正想讓你看見的事。'}
        </p>
      </div>

      <div className="mb-6 text-left">
        <p className="mb-2 text-center text-xs tracking-wide text-slate-500">你的推理歷程</p>
        {hypothesisHistory.length === 0 ? (
          <p className="text-center text-sm text-slate-500">這次你沒有提出任何案件假說。</p>
        ) : (
          <div className="flex flex-wrap items-center justify-center gap-2">
            {hypothesisHistory.map((hid, idx) => {
              const h = mission.hypotheses.find(x => x.id === hid);
              if (!h) return null;
              return (
                <span key={`${hid}-${idx}`} className="flex items-center gap-2">
                  <span className="flex items-center gap-1.5 rounded-full border border-white/15 px-2.5 py-1 text-xs text-slate-200">
                    <span className="inline-block h-2 w-2 rounded-sm" style={{ backgroundColor: h.color || '#9ca3af' }} />
                    {h.label}
                  </span>
                  {idx < hypothesisHistory.length - 1 && <span className="text-slate-600">→</span>}
                </span>
              );
            })}
          </div>
        )}
      </div>

      {finalHypothesis && (
        <div className="mb-6 rounded-lg border border-amber-300/30 bg-amber-300/5 p-4 text-left">
          <p className="mb-1 text-xs tracking-wide text-amber-300">最終假說</p>
          <div className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-200">
            <span className="inline-block h-3 w-3 rounded-sm" style={{ backgroundColor: finalHypothesis.color || '#9ca3af' }} />
            {finalHypothesis.label}
          </div>
          <p className="text-sm text-slate-300">{finalHypothesis.reflection}</p>
        </div>
      )}

      <div className="mb-8 text-left">
        <p className="mb-3 text-center text-sm font-medium text-slate-200">{mission.reflectionEssay.title}</p>
        <p className="mb-4 whitespace-pre-line text-sm leading-relaxed text-slate-400">{mission.reflectionEssay.intro}</p>
        <div className="space-y-4">
          {mission.reflectionEssay.sections.map((section, idx) => (
            <div key={idx}>
              <p className="mb-1 text-xs tracking-wide text-amber-300">{section.title}</p>
              {section.content && (
                <p className="whitespace-pre-line text-sm leading-relaxed text-slate-300">{section.content}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      <p className="mb-8 whitespace-pre-line text-left text-base leading-relaxed text-slate-200">{mission.truth.revealText}</p>

      <div className="mb-8 rounded-lg border border-white/10 bg-white/5 p-4 text-left">
        <p className="mb-2 text-xs tracking-widest text-slate-500">{mission.missionEnding.title}</p>
        <p className="whitespace-pre-line text-sm leading-relaxed text-slate-300">{mission.missionEnding.summary}</p>
      </div>

      {collected.length > 0 && (
        <div className="mb-6 space-y-3 text-left">
          <p className="text-center text-xs tracking-wide text-slate-500">重新看一次線索</p>
          {collected.map(c => (
            <div key={c.id} className="rounded-lg border border-white/10 bg-white/5 p-3">
              <p className="mb-1 text-sm font-medium text-amber-300">{c.title}</p>
              <p className="text-xs text-slate-500 line-through decoration-slate-600">{c.firstInterpretation}</p>
              <p className="text-sm text-slate-200">{c.finalInterpretation}</p>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={onBack}
        className="rounded-full border border-white/20 px-6 py-2 text-sm text-slate-300 hover:border-white/40"
      >
        回到探索
      </button>
    </div>
  );
}
