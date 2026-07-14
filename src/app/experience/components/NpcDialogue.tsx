'use client';

import { useState } from 'react';
import type { Npc } from '../types';

export function NpcDialogue({
  npc,
  onSelectLine,
}: {
  npc: Npc;
  onSelectLine: (clueId?: string) => void;
}) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <div className="rounded-lg border border-sky-300/30 bg-sky-300/5 p-3">
      <p className="mb-2 text-xs tracking-wide text-sky-300">{npc.name}</p>
      <div className="space-y-2">
        {npc.lines.map((line, idx) => (
          <div key={idx}>
            <button
              onClick={() => {
                setOpenIdx(idx);
                onSelectLine(line.givesClueId);
              }}
              className="w-full rounded-md border border-white/10 px-3 py-2 text-left text-sm text-slate-200 hover:border-white/25"
            >
              {line.label}
            </button>
            {openIdx === idx && (
              <p className="mt-2 pl-4 text-sm leading-relaxed text-slate-400">{line.text}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
