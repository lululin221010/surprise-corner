'use client';

import type { Mission } from '../types';

export function ConclusionScreen({
  mission,
  collectedClueIds,
  deductionAnswers,
  onBack,
}: {
  mission: Mission;
  collectedClueIds: string[];
  deductionAnswers: Record<string, string>;
  onBack: () => void;
}) {
  const collected = mission.clues.filter(c => collectedClueIds.includes(c.id));

  return (
    <div className="mx-auto max-w-xl text-center">
      <p className="mb-2 text-xs tracking-widest text-slate-500">案件已完成</p>

      <div className="mb-8 text-left">
        <p className="mb-1 text-center text-sm font-medium text-slate-200">{mission.reflectionEssay.title}</p>
        <p className="mb-5 whitespace-pre-line text-center text-xs leading-relaxed text-slate-500">
          {mission.reflectionEssay.intro}
        </p>

        <div className="space-y-4">
          {mission.deduction.blanks.map(blank => {
            const selectedOption = blank.options.find(o => o.id === deductionAnswers[blank.id]);
            const correctOption = blank.options.find(o => o.id === blank.correctOptionId);
            const misledClue = selectedOption?.misledByClueId
              ? mission.clues.find(c => c.id === selectedOption.misledByClueId)
              : null;

            return (
              <div key={blank.id} className="rounded-lg border border-white/10 bg-white/5 p-4">
                <div className="mb-3">
                  <p className="mb-1 text-[10px] tracking-wide text-slate-500">你相信的版本</p>
                  <p className="text-sm leading-relaxed text-slate-300">
                    {blank.promptBefore}
                    <span className="font-medium text-amber-300">
                      {selectedOption ? selectedOption.text : '（那時候你還沒想到這裡）'}
                    </span>
                    {blank.promptAfter}
                  </p>
                  {misledClue && (
                    <p className="mt-1 text-xs leading-relaxed text-slate-500">
                      這個念頭，呼應了「{misledClue.title}」帶給你的第一印象。
                    </p>
                  )}
                </div>

                <div className="border-t border-white/10 pt-3">
                  <p className="mb-1 text-[10px] tracking-wide text-slate-500">後來確認的版本</p>
                  <p className="text-sm leading-relaxed text-slate-300">
                    {blank.promptBefore}
                    <span className="font-medium text-emerald-300">{correctOption?.text}</span>
                    {blank.promptAfter}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-slate-500">{blank.correctExplanation}</p>
                </div>
              </div>
            );
          })}
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
