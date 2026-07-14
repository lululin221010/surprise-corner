'use client';

import { useState } from 'react';
import type { Clue } from '../types';

export function ClueInventory({
  clues,
  collectedClueIds,
}: {
  clues: Clue[];
  collectedClueIds: string[];
}) {
  const [expanded, setExpanded] = useState(false);
  const collected = clues.filter(c => collectedClueIds.includes(c.id));

  return (
    <div className="rounded-lg border border-white/10 bg-black/20">
      <button
        onClick={() => setExpanded(prev => !prev)}
        className="flex w-full items-center justify-between px-4 py-3 text-left"
      >
        <span className="text-sm font-medium text-slate-200">🗂 線索收集</span>
        <span className="flex items-center gap-2 text-xs text-slate-500">
          {collected.length}/{clues.length}
          <span className="text-slate-600">{expanded ? '︿' : '﹀'}</span>
        </span>
      </button>
      {expanded && (
        <div className="border-t border-white/10 px-4 py-4">
          {collected.length === 0 ? (
            <p className="text-sm text-slate-500">還沒有找到任何線索。</p>
          ) : (
            <ul className="space-y-2">
              {collected.map(c => (
                <li key={c.id} className="text-sm">
                  <span className="font-medium text-amber-300">{c.title}</span>
                  <p className="text-slate-400">{c.firstInterpretation}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
