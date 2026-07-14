'use client';

import type { Scene } from '../types';

export function SceneList({
  scenes,
  currentSceneId,
  onSelect,
}: {
  scenes: Scene[];
  currentSceneId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {scenes.map(scene => (
        <button
          key={scene.id}
          onClick={() => onSelect(scene.id)}
          className={`rounded-full border px-4 py-2 text-sm transition-colors ${
            scene.id === currentSceneId
              ? 'border-amber-400 bg-amber-400/10 text-amber-300'
              : 'border-white/15 text-slate-300 hover:border-white/30'
          }`}
        >
          {scene.name}
        </button>
      ))}
    </div>
  );
}
