'use client';

import type { Mission } from '../types';

export function ConclusionScreen({
  mission,
  collectedClueIds,
  hypothesisHistory,
  onBack,
}: {
  mission: Mission;
  collectedClueIds: string[];
  hypothesisHistory: string[];
  onBack: () => void;
}) {
  const collected = mission.clues.filter(c => collectedClueIds.includes(c.id));

  return (
    <div className="mx-auto max-w-xl text-center">
      <p className="mb-2 text-xs tracking-widest text-slate-500">案件已完成</p>
      <p className="mb-6 text-base leading-relaxed text-slate-200">{mission.truth.revealText}</p>

      <div className="mb-6 space-y-3 text-left">
        <p className="text-center text-xs tracking-wide text-slate-500">你的推理歷程</p>
        {hypothesisHistory.length === 0 ? (
          <p className="text-center text-sm text-slate-500">這次你沒有提出任何案件假說。</p>
        ) : (
          hypothesisHistory.map((hid, idx) => {
            const h = mission.hypotheses.find(x => x.id === hid);
            if (!h) return null;
            return (
              <div key={`${hid}-${idx}`} className="rounded-lg border border-white/10 bg-white/5 p-3">
                <div className="mb-1 flex items-center gap-2 text-sm font-medium text-amber-300">
                  <span className="inline-block h-3 w-3 rounded-sm" style={{ backgroundColor: h.color || '#9ca3af' }} />
                  {h.label}
                </div>
                <p className="text-sm text-slate-300">{h.reflection}</p>
              </div>
            );
          })
        )}
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
