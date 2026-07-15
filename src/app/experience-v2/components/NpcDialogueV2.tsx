'use client';

import { useState } from 'react';
import type { NpcV2 } from '../types';

export function NpcDialogueV2({
  npc,
  branchChoiceIndex,
  onSelectLine,
  onChooseBranch,
}: {
  npc: NpcV2;
  branchChoiceIndex: number | null;
  onSelectLine: (clueId?: string) => void;
  onChooseBranch: (optionIndex: number, trustDelta: number, clueId?: string) => void;
}) {
  const [openingRevealed, setOpeningRevealed] = useState(false);
  const [closingRevealed, setClosingRevealed] = useState(false);
  const chosenOption = branchChoiceIndex !== null ? npc.branch[branchChoiceIndex] : null;

  return (
    <div className="rounded-lg border border-sky-300/30 bg-sky-300/5 p-3">
      <p className="text-xs tracking-wide text-sky-300">{npc.name}</p>
      {npc.whyTheyThinkThis && <p className="mb-2 text-xs italic text-slate-500">（{npc.whyTheyThinkThis}）</p>}

      <div className="mt-2 space-y-2">
        <div>
          <button
            onClick={() => {
              setOpeningRevealed(true);
              onSelectLine(npc.openingLine.givesClueId);
            }}
            className="w-full rounded-md border border-white/10 px-3 py-2 text-left text-sm text-slate-200 hover:border-white/25"
          >
            {npc.openingLine.label}
          </button>
          {openingRevealed && <p className="mt-2 pl-4 text-sm leading-relaxed text-slate-400">{npc.openingLine.text}</p>}
        </div>

        <div>
          {chosenOption === null ? (
            <div className="space-y-1.5">
              {npc.branch.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => onChooseBranch(idx, opt.trustDelta, opt.givesClueId)}
                  className="w-full rounded-md border border-white/10 px-3 py-2 text-left text-sm text-slate-200 hover:border-white/25"
                >
                  {opt.label}
                </button>
              ))}
            </div>
          ) : (
            <div>
              <p className="w-full rounded-md border border-sky-300/30 bg-sky-300/10 px-3 py-2 text-left text-sm text-slate-200">
                {npc.branch[branchChoiceIndex!].label}
              </p>
              <p className="mt-2 pl-4 text-sm leading-relaxed text-slate-400">{chosenOption.text}</p>
            </div>
          )}
        </div>

        <div>
          <button
            onClick={() => {
              setClosingRevealed(true);
              onSelectLine(npc.closingLine.givesClueId);
            }}
            className="w-full rounded-md border border-white/10 px-3 py-2 text-left text-sm text-slate-200 hover:border-white/25"
          >
            {npc.closingLine.label}
          </button>
          {closingRevealed && <p className="mt-2 pl-4 text-sm leading-relaxed text-slate-400">{npc.closingLine.text}</p>}
        </div>
      </div>
    </div>
  );
}
