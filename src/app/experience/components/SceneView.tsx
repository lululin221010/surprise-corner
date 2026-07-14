'use client';

import type { Hotspot, Npc, Scene } from '../types';

export function SceneView({
  scene,
  npcs,
  exploredHotspotIds,
  onHotspotClick,
  activeNpcId,
  onNpcMarkerClick,
  activeReveal,
}: {
  scene: Scene;
  npcs: Npc[];
  exploredHotspotIds: string[];
  onHotspotClick: (h: Hotspot) => void;
  activeNpcId: string | null;
  onNpcMarkerClick: (npcId: string) => void;
  activeReveal: { label: string; text: string; gotClue: boolean } | null;
}) {
  return (
    <div
      className="relative w-full overflow-hidden rounded-xl border border-white/10"
      style={{ aspectRatio: '3 / 2' }}
    >
      <img
        src={scene.image}
        alt={scene.name}
        className="absolute inset-0 h-full w-full object-cover"
        style={{ filter: 'brightness(1.35) contrast(1.05)' }}
      />

      {scene.hotspots.map(h => {
        const explored = exploredHotspotIds.includes(h.id);
        return (
          <div
            key={h.id}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${h.position.xPct}%`, top: `${h.position.yPct}%` }}
          >
            <button
              onClick={() => onHotspotClick(h)}
              aria-label={h.label}
              className={`flex h-7 w-7 items-center justify-center rounded-full border-2 transition-colors ${
                explored
                  ? 'border-white/30 bg-white/10'
                  : 'animate-pulse border-amber-300 bg-amber-300/25'
              }`}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-white" />
            </button>
            <span className="pointer-events-none absolute left-1/2 top-full mt-1.5 -translate-x-1/2 whitespace-nowrap rounded-full border border-amber-300/40 bg-black/90 px-2.5 py-1 text-xs font-medium text-amber-100 shadow-lg shadow-black/50">
              {h.label}
            </span>
          </div>
        );
      })}

      {npcs.map(npc => (
        <div
          key={npc.id}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${npc.position.xPct}%`, top: `${npc.position.yPct}%` }}
        >
          <button
            onClick={() => onNpcMarkerClick(npc.id)}
            aria-label={npc.name}
            className={`flex h-9 w-9 items-center justify-center rounded-full border-2 text-base transition-colors ${
              activeNpcId === npc.id
                ? 'border-sky-300 bg-sky-300/30'
                : 'border-sky-400/60 bg-sky-400/15'
            }`}
          >
            🧍
          </button>
          <span className="pointer-events-none absolute left-1/2 top-full mt-1.5 -translate-x-1/2 whitespace-nowrap rounded-full border border-sky-300/40 bg-black/90 px-2.5 py-1 text-xs font-medium text-sky-100 shadow-lg shadow-black/50">
            {npc.name}
          </span>
        </div>
      ))}

      {activeReveal && (
        <div className="absolute inset-x-0 bottom-0 border-t border-white/10 bg-black/85 px-4 py-3 backdrop-blur-sm">
          {activeReveal.gotClue && (
            <span className="mb-1 inline-block rounded-full border border-emerald-400/40 bg-emerald-400/15 px-2 py-0.5 text-[10px] font-medium text-emerald-300">
              🔍 獲得新線索
            </span>
          )}
          <p className="mb-0.5 text-xs tracking-wide text-amber-300">{activeReveal.label}</p>
          <p className="text-sm leading-relaxed text-slate-100">{activeReveal.text}</p>
        </div>
      )}
    </div>
  );
}
