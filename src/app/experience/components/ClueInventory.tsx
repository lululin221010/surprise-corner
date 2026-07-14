'use client';

import type { Clue } from '../types';

export function ClueInventory({
  clues,
  collectedClueIds,
}: {
  clues: Clue[];
  collectedClueIds: string[];
}) {
  const collected = clues.filter(c => collectedClueIds.includes(c.id));

  return (
    <div className="rounded-lg border border-white/10 bg-black/20 p-4">
      <p className="mb-3 text-xs tracking-wide text-slate-400">
        線索收集（{collected.length}/{clues.length}）
      </p>
      {collected.length === 0 ? (
        <p className="text-sm text-slate-500">還沒有找到任何線索。</p>
      ) : (
        <ul className="space-y-2">
          {collected.map(c => (
            <li key={c.id} className="text-sm">
              <span className="font-medium text-amber-300">{c.title}</span>
              <p className="text-slate-400">{c.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
