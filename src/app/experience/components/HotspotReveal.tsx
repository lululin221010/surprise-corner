'use client';

import type { Hotspot } from '../types';

export function HotspotReveal({ hotspot }: { hotspot: Hotspot }) {
  return (
    <div className="rounded-lg border border-amber-300/30 bg-amber-300/5 px-4 py-3">
      <p className="mb-1 text-xs tracking-wide text-amber-300">{hotspot.label}</p>
      <p className="text-sm leading-relaxed text-slate-300">{hotspot.revealText}</p>
    </div>
  );
}
