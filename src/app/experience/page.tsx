'use client';

import { sampleMission } from './sampleMission';
import { useMissionState } from './useMissionState';
import { SceneList } from './components/SceneList';
import { InteractionPanel } from './components/InteractionPanel';
import { ClueInventory } from './components/ClueInventory';
import { ConclusionScreen } from './components/ConclusionScreen';

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

  const currentScene = mission.scenes.find(s => s.id === currentSceneId) ?? mission.scenes[0];
  const sceneNpcs = mission.npcs.filter(n => n.sceneId === currentScene?.id);

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
            <div className="mb-6">
              <SceneList
                scenes={mission.scenes}
                currentSceneId={currentScene?.id ?? ''}
                onSelect={setCurrentSceneId}
              />
            </div>

            {currentScene && (
              <InteractionPanel
                hotspots={currentScene.hotspots}
                npcs={sceneNpcs}
                onReveal={collectClue}
              />
            )}

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
