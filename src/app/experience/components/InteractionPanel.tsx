'use client';

import { useState } from 'react';
import type { Hotspot, Npc } from '../types';

export function InteractionPanel({
  hotspots,
  npcs,
  onReveal,
}: {
  hotspots: Hotspot[];
  npcs: Npc[];
  onReveal: (clueId?: string) => void;
}) {
  const [openHotspotIds, setOpenHotspotIds] = useState<string[]>([]);
  const [openLineKeys, setOpenLineKeys] = useState<string[]>([]);

  function openHotspot(h: Hotspot) {
    setOpenHotspotIds(prev => (prev.includes(h.id) ? prev : [...prev, h.id]));
    onReveal(h.givesClueId);
  }

  function openLine(npcId: string, lineIdx: number, givesClueId?: string) {
    const key = `${npcId}-${lineIdx}`;
    setOpenLineKeys(prev => (prev.includes(key) ? prev : [...prev, key]));
    onReveal(givesClueId);
  }

  return (
    <div className="space-y-3">
      {hotspots.map(h => (
        <div key={h.id}>
          <button
            onClick={() => openHotspot(h)}
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-left text-sm text-slate-200 hover:border-white/25"
          >
            {h.label}
          </button>
          {openHotspotIds.includes(h.id) && (
            <p className="mt-2 pl-4 text-sm leading-relaxed text-slate-400">{h.revealText}</p>
          )}
        </div>
      ))}

      {npcs.map(npc => (
        <div key={npc.id} className="rounded-lg border border-white/10 bg-white/5 p-3">
          <p className="mb-2 text-xs tracking-wide text-slate-400">{npc.name}</p>
          <div className="space-y-2">
            {npc.lines.map((line, idx) => {
              const key = `${npc.id}-${idx}`;
              const open = openLineKeys.includes(key);
              return (
                <div key={key}>
                  <button
                    onClick={() => openLine(npc.id, idx, line.givesClueId)}
                    className="w-full rounded-md border border-white/10 px-3 py-2 text-left text-sm text-slate-200 hover:border-white/25"
                  >
                    {line.label}
                  </button>
                  {open && (
                    <p className="mt-2 pl-4 text-sm leading-relaxed text-slate-400">{line.text}</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
