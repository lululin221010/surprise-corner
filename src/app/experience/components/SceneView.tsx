'use client';

import type { Hotspot, Npc, Scene } from '../types';

const SCENE_ICONS: Record<string, string> = {
  atrium: '🎪',
  'info-desk': '🛎️',
  'toy-store': '🧸',
  'family-lounge': '🛋️',
  'information-corridor': '🚶',
  securityOffice: '🛡️',
  findingRoom: '📢',
  'scene-final-location': '📍',
};

export function SceneView({
  scene,
  scenes,
  onSceneSelect,
  npcs,
  exploredHotspotIds,
  onHotspotClick,
  activeHotspotId,
  onCloseReveal,
  activeNpcId,
  onNpcMarkerClick,
}: {
  scene: Scene;
  scenes: Scene[];
  onSceneSelect: (id: string) => void;
  npcs: Npc[];
  exploredHotspotIds: string[];
  onHotspotClick: (h: Hotspot) => void;
  activeHotspotId: string | null;
  onCloseReveal: () => void;
  activeNpcId: string | null;
  onNpcMarkerClick: (npcId: string) => void;
}) {
  return (
    <div className="relative w-full" style={{ aspectRatio: '3 / 2' }}>
      <img
        src={scene.image}
        alt={scene.name}
        className="absolute inset-0 h-full w-full rounded-xl border border-white/10 object-cover"
        style={{ filter: 'brightness(1.35) contrast(1.05)' }}
      />

      <div className="absolute left-2 right-2 top-2 z-40 flex flex-wrap gap-1.5 rounded-full bg-black/40 p-1.5 backdrop-blur-sm">
        {scenes.map(s => (
          <button
            key={s.id}
            onClick={() => onSceneSelect(s.id)}
            title={s.name}
            aria-label={s.name}
            className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs transition-all ${
              s.id === scene.id
                ? 'scale-110 border-amber-300 bg-amber-300/30'
                : 'border-white/20 bg-black/30 opacity-70 hover:opacity-100'
            }`}
          >
            {SCENE_ICONS[s.id] ?? '📍'}
          </button>
        ))}
      </div>

      {scene.hotspots.map(h => {
        const explored = exploredHotspotIds.includes(h.id);
        const hasClue = !!h.givesClueId;
        const isActive = activeHotspotId === h.id;
        const openUp = h.position.yPct > 55;
        const hAlign = h.position.xPct < 22 ? 'left' : h.position.xPct > 78 ? 'right' : 'center';

        return (
          <div
            key={h.id}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${h.position.xPct}%`, top: `${h.position.yPct}%`, zIndex: isActive ? 30 : 10 }}
          >
            <button
              onClick={() => onHotspotClick(h)}
              aria-label={h.label}
              title={explored ? (hasClue ? `${h.label}（已取得線索）` : `${h.label}（無線索）`) : h.label}
              className={`flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm shadow-md shadow-black/40 transition-colors ${
                isActive
                  ? 'border-amber-300 bg-amber-300/40'
                  : explored
                  ? hasClue
                    ? 'border-emerald-400/50 bg-emerald-400/10'
                    : 'border-white/30 bg-white/10'
                  : 'animate-pulse border-amber-300 bg-amber-300/30'
              }`}
            >
              {explored ? (
                hasClue ? (
                  <span aria-hidden className="text-emerald-300">✓</span>
                ) : (
                  <span className="h-1.5 w-1.5 rounded-full bg-white/50" />
                )
              ) : (
                <span aria-hidden>🔍</span>
              )}
            </button>

            {isActive && (
              <div
                className={`absolute w-56 rounded-lg border border-amber-300/50 bg-black/95 p-3 shadow-xl shadow-black/70 backdrop-blur-sm ${
                  openUp ? 'bottom-full mb-2' : 'top-full mt-2'
                } ${hAlign === 'left' ? 'left-0' : hAlign === 'right' ? 'right-0' : 'left-1/2 -translate-x-1/2'}`}
              >
                <div className="mb-1 flex items-start justify-between gap-2">
                  <p className="text-xs tracking-wide text-amber-300">{h.label}</p>
                  <button
                    onClick={onCloseReveal}
                    aria-label="關閉"
                    className="shrink-0 text-slate-500 hover:text-slate-300"
                  >
                    ✕
                  </button>
                </div>
                {!!h.givesClueId && (
                  <span className="mb-1 inline-block rounded-full border border-emerald-400/40 bg-emerald-400/15 px-2 py-0.5 text-[10px] font-medium text-emerald-300">
                    🔍 獲得新線索
                  </span>
                )}
                <p className="text-sm leading-relaxed text-slate-100">{h.revealText}</p>
              </div>
            )}
          </div>
        );
      })}

      {npcs.map(npc => (
        <div
          key={npc.id}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${npc.position.xPct}%`, top: `${npc.position.yPct}%`, zIndex: activeNpcId === npc.id ? 20 : 10 }}
        >
          <button
            onClick={() => onNpcMarkerClick(npc.id)}
            aria-label={npc.name}
            title={npc.name}
            className={`flex h-9 w-9 items-center justify-center rounded-full border-2 text-base shadow-md shadow-black/40 transition-colors ${
              activeNpcId === npc.id
                ? 'border-sky-300 bg-sky-300/30'
                : 'border-sky-400/60 bg-sky-400/15'
            }`}
          >
            🧍
          </button>
        </div>
      ))}
    </div>
  );
}
