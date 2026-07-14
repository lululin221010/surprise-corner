'use client';

import { useState } from 'react';
import { mission001 } from './missions/mission-001';
import { useMissionState } from './useMissionState';
import { SceneList } from './components/SceneList';
import { SceneView } from './components/SceneView';
import { NpcDialogue } from './components/NpcDialogue';
import { ClueInventory } from './components/ClueInventory';
import { HypothesisTool } from './components/HypothesisTool';
import { ConclusionScreen } from './components/ConclusionScreen';
import type { Hotspot } from './types';

export default function ExperiencePage() {
  const mission = mission001;
  const {
    currentSceneId,
    setCurrentSceneId,
    collectedClueIds,
    collectClue,
    showConclusion,
    setShowConclusion,
    hypothesisHistory,
    currentHypothesisId,
    submitHypothesis,
    showFirstClueHintBanner,
    dismissFirstClueHint,
  } = useMissionState(mission);

  const [exploredHotspotIds, setExploredHotspotIds] = useState<string[]>([]);
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);
  const [activeNpcId, setActiveNpcId] = useState<string | null>(null);
  const [hypothesisPicking, setHypothesisPicking] = useState(false);
  const [concludeBlockedMessage, setConcludeBlockedMessage] = useState<string | null>(null);

  const currentScene = mission.scenes.find(s => s.id === currentSceneId) ?? mission.scenes[0];
  const sceneNpcs = mission.npcs.filter(n => n.sceneId === currentScene?.id);
  const activeNpc = sceneNpcs.find(n => n.id === activeNpcId) ?? null;

  const activeReveal = activeHotspot
    ? { label: activeHotspot.label, text: activeHotspot.revealText, gotClue: !!activeHotspot.givesClueId }
    : null;

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

  function handleHypothesisSubmit(id: string) {
    submitHypothesis(id);
    setConcludeBlockedMessage(null);
  }

  function handleConcludeClick() {
    if (!currentHypothesisId) {
      setHypothesisPicking(true);
      setConcludeBlockedMessage('請先提出你的案件假說，才能查看結案結果。');
      return;
    }
    setShowConclusion(true);
  }

  return (
    <main className="min-h-screen bg-[#0d0820] px-6 py-10 text-slate-300">
      <div className="mx-auto max-w-3xl">
        <p className="mb-2 text-xs tracking-[0.25em] text-slate-500">{mission.title}</p>

        {!showConclusion && (
          <div className="mb-4 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5">
            <p className="text-sm leading-relaxed text-slate-200">
              📢「請各位來賓協助留意，一名七歲女童與家人失散。女孩身穿紅色上衣，背著白色兔子背包。如有發現，請通知服務台。」
            </p>
            <p className="mt-1 text-xs text-slate-500">點擊圖片中的圓點探索場景，隨時可在下方提出你的推測。</p>
          </div>
        )}

        {showConclusion ? (
          <ConclusionScreen
            mission={mission}
            collectedClueIds={collectedClueIds}
            hypothesisHistory={hypothesisHistory}
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
                activeReveal={activeReveal}
              />
            )}

            {activeNpc && (
              <div className="mt-3">
                <NpcDialogue npc={activeNpc} onSelectLine={collectClue} />
              </div>
            )}

            <div className="mt-4">
              <HypothesisTool
                hypotheses={mission.hypotheses}
                currentHypothesisId={currentHypothesisId}
                onSubmit={handleHypothesisSubmit}
                picking={hypothesisPicking}
                onPickingChange={setHypothesisPicking}
                promptMessage={concludeBlockedMessage}
              />
            </div>

            {showFirstClueHintBanner && (
              <div className="mt-3 flex items-center justify-between gap-3 rounded-lg border border-amber-300/30 bg-amber-300/10 px-4 py-2 text-xs text-amber-200">
                <span>你已取得第一條證據。你可以隨時在上方「案件假說」提出或修改目前的推測，不必等到有把握。</span>
                <button onClick={dismissFirstClueHint} className="shrink-0 text-amber-300 hover:text-amber-100">
                  知道了
                </button>
              </div>
            )}

            <div className="mt-8">
              <ClueInventory clues={mission.clues} collectedClueIds={collectedClueIds} />
            </div>

            <div className="mt-8 text-center">
              <button
                onClick={handleConcludeClick}
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
