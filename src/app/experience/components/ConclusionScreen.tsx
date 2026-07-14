'use client';

import type { Mission } from '../types';

export function ConclusionScreen({
  mission,
  collectedClueIds,
  onBack,
}: {
  mission: Mission;
  collectedClueIds: string[];
  onBack: () => void;
}) {
  const collected = mission.clues.filter(c => collectedClueIds.includes(c.id));

  return (
    <div className="mx-auto max-w-xl text-center">
      <p className="mb-2 text-xs tracking-widest text-slate-500">案件已完成</p>
      <p className="mb-6 text-base leading-relaxed text-slate-200">{mission.truth.revealText}</p>
      <p className="mb-6 text-sm text-slate-500">你總共找到了 {collected.length} 條線索。</p>
      <button
        onClick={onBack}
        className="rounded-full border border-white/20 px-6 py-2 text-sm text-slate-300 hover:border-white/40"
      >
        回到探索
      </button>
    </div>
  );
}
