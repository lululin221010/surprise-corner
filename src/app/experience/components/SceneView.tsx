'use client';

import type { Hotspot, Npc, Scene } from '../types';

export function SceneView({
  scene,
  npcs,
  exploredHotspotIds,
  onHotspotClick,
  activeNpcId,
  onNpcMarkerClick,
}: {
  scene: Scene;
  npcs: Npc[];
  exploredHotspotIds: string[];
  onHotspotClick: (h: Hotspot) => void;
  activeNpcId: string | null;
  onNpcMarkerClick: (npcId: string) => void;
}) {
  return (
    <div
      className="relative w-full overflow-hidden rounded-xl border border-white/10"
      style={{ aspectRatio: '3 / 2' }}
    >
      <img src={scene.image} alt={scene.name} className="absolute inset-0 h-full w-full object-cover" />

      {scene.hotspots.map(h => {
        const explored = exploredHotspotIds.includes(h.id);
        return (
          <button
            key={h.id}
            onClick={() => onHotspotClick(h)}
            title={h.label}
            className={`absolute flex h-7 w-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 transition-colors ${
              explored
                ? 'border-white/30 bg-white/10'
                : 'animate-pulse border-amber-300 bg-amber-300/25'
            }`}
            style={{ left: `${h.position.xPct}%`, top: `${h.position.yPct}%` }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-white" />
          </button>
        );
      })}

      {npcs.map(npc => (
        <button
          key={npc.id}
          onClick={() => onNpcMarkerClick(npc.id)}
          title={npc.name}
          className={`absolute flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 text-base transition-colors ${
            activeNpcId === npc.id
              ? 'border-sky-300 bg-sky-300/30'
              : 'border-sky-400/60 bg-sky-400/15'
          }`}
          style={{ left: `${npc.position.xPct}%`, top: `${npc.position.yPct}%` }}
        >
          🧍
        </button>
      ))}
    </div>
  );
}
