'use client';

import type { Hypothesis } from '../types';

export function HypothesisTool({
  hypotheses,
  currentHypothesisId,
  onSubmit,
  picking,
  onPickingChange,
  promptMessage,
}: {
  hypotheses: Hypothesis[];
  currentHypothesisId: string | null;
  onSubmit: (id: string) => void;
  picking: boolean;
  onPickingChange: (picking: boolean) => void;
  promptMessage?: string | null;
}) {
  const current = hypotheses.find(h => h.id === currentHypothesisId) ?? null;

  return (
    <div className="rounded-lg border border-white/10 bg-white/5 p-3">
      <p className="mb-2 text-xs tracking-wide text-slate-400">📝 我的案件假說</p>
      {promptMessage && <p className="mb-2 text-xs text-amber-300">{promptMessage}</p>}
      {!picking ? (
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm text-slate-200">
            {current ? (
              <>
                <span className="inline-block h-3 w-3 rounded-sm" style={{ backgroundColor: current.color || '#9ca3af' }} />
                {current.label}
              </>
            ) : (
              <span className="text-slate-500">尚未提出假說</span>
            )}
          </div>
          <button
            onClick={() => onPickingChange(true)}
            className="shrink-0 rounded-full border border-white/20 px-3 py-1 text-xs text-slate-300 hover:border-white/40"
          >
            {current ? '更換假說' : '提出假說'}
          </button>
        </div>
      ) : (
        <div className="flex flex-wrap gap-2">
          {hypotheses.map(h => (
            <button
              key={h.id}
              onClick={() => {
                onSubmit(h.id);
                onPickingChange(false);
              }}
              className="flex items-center gap-2 rounded-full border border-white/15 px-3 py-1.5 text-xs text-slate-200 hover:border-white/35"
            >
              <span className="inline-block h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: h.color || '#9ca3af' }} />
              {h.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
