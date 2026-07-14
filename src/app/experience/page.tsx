'use client';

import { useState } from 'react';
import { sampleMission } from './sampleMission';
import { useMissionState } from './useMissionState';
import { SceneList } from './components/SceneList';
import { SceneView } from './components/SceneView';
import { HotspotReveal } from './components/HotspotReveal';
import { NpcDialogue } from './components/NpcDialogue';
import { ClueInventory } from './components/ClueInventory';
import { ConclusionScreen } from './components/ConclusionScreen';
import type { Hotspot } from './types';

export default function ExperiencePage() {
  const mission = sampleMission;
  const {
    currentSceneId,
    setCurrentSceneId,
    collectedClueIds,
    collectClue,
    showConclusion,
    setShowConclusion,
  } = useMissionState(mission);

  const [exploredHotspotIds, setExploredHotspotIds] = useState<string[]>([]);
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);
  const [activeNpcId, setActiveNpcId] = useState<string | null>(null);

  const currentScene = mission.scenes.find(s => s.id === currentSceneId) ?? mission.scenes[0];
  const sceneNpcs = mission.npcs.filter(n => n.sceneId === currentScene?.id);
  const activeNpc = sceneNpcs.find(n => n.id === activeNpcId) ?? null;

  function handleHotspotClick(h: Hotspot) {
    setExploredHotspotIds(prev => (prev.includes(h.id) ? prev : [...prev, h.id]));
    setActiveHotspot(h);
    collectClue(h.givesClueId);
  }

  function handleSceneChange(id: string) {
    setCurrentSceneId(id);
    setActiveHotspot(null);
    setActiveNpcId(null);
  }

  return (
    <main className="min-h-screen bg-[#0d0820] px-6 py-10 text-slate-300">
      <div className="mx-auto max-w-3xl">
        <p className="mb-6 text-xs tracking-[0.25em] text-slate-500">{mission.title}</p>

        {showConclusion ? (
          <ConclusionScreen
            mission={mission}
            collectedClueIds={collectedClueIds}
            onBack={() => setShowConclusion(false)}
          />
        ) : (
          <>
            <div className="mb-4">
              <SceneList
                scenes={mission.scenes}
                currentSceneId={currentScene?.id ?? ''}
                onSelect={handleSceneChange}
              />
            </div>

            {currentScene && (
              <SceneView
                scene={currentScene}
                npcs={sceneNpcs}
                exploredHotspotIds={exploredHotspotIds}
                onHotspotClick={handleHotspotClick}
                activeNpcId={activeNpcId}
                onNpcMarkerClick={id => setActiveNpcId(prev => (prev === id ? null : id))}
              />
            )}

            <div className="mt-4 space-y-3">
              {activeHotspot && <HotspotReveal hotspot={activeHotspot} />}
              {activeNpc && <NpcDialogue npc={activeNpc} onSelectLine={collectClue} />}
            </div>

            <div className="mt-8">
              <ClueInventory clues={mission.clues} collectedClueIds={collectedClueIds} />
            </div>

            <div className="mt-8 text-center">
              <button
                onClick={() => setShowConclusion(true)}
                className="rounded-full border border-amber-400/50 px-6 py-2 text-sm text-amber-300 hover:border-amber-400"
              >
                我認為我知道真相了
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
