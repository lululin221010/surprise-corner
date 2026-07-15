'use client';

import { useState } from 'react';
import { mission001 } from './missions/mission-001';
import { useMissionState } from './useMissionState';
import { SceneView } from './components/SceneView';
import { NpcDialogue } from './components/NpcDialogue';
import { ClueInventory } from './components/ClueInventory';
import { ConclusionScreen } from './components/ConclusionScreen';
import { DeductionBoard } from './components/DeductionBoard';
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
    showFirstClueHintBanner,
    dismissFirstClueHint,
  } = useMissionState(mission);

  const [exploredHotspotIds, setExploredHotspotIds] = useState<string[]>([]);
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);
  const [activeNpcId, setActiveNpcId] = useState<string | null>(null);
  const [deductionAnswers, setDeductionAnswers] = useState<Record<string, string>>({});
  const [boardExpanded, setBoardExpanded] = useState(false);

  const currentScene = mission.scenes.find(s => s.id === currentSceneId) ?? mission.scenes[0];
  const sceneNpcs = mission.npcs.filter(n => n.sceneId === currentScene?.id);
  const activeNpc = sceneNpcs.find(n => n.id === activeNpcId) ?? null;
  const deductionFilledCount = mission.deduction.blanks.filter(b => deductionAnswers[b.id]).length;

  function handleHotspotClick(h: Hotspot) {
    setExploredHotspotIds(prev => (prev.includes(h.id) ? prev : [...prev, h.id]));
    setActiveHotspot(prev => (prev?.id === h.id ? null : h));
    collectClue(h.givesClueId);
  }

  function handleSceneChange(id: string) {
    setCurrentSceneId(id);
    setActiveHotspot(null);
    setActiveNpcId(null);
  }

  function handleDeductionSelectOption(blankId: string, optionId: string) {
    setDeductionAnswers(prev => ({ ...prev, [blankId]: optionId }));
  }

  return (
    <main className="min-h-screen bg-[#0d0820] px-6 py-10 text-slate-300">
      <div className="mx-auto max-w-3xl">
        <p className="mb-2 text-xs tracking-[0.25em] text-slate-500">{mission.title}</p>

        {!showConclusion && (
          <div className="mb-4 rounded-lg border border-white/10 bg-white/5 px-4 py-3">
            <p className="text-sm leading-relaxed text-slate-200">
              📢「請各位來賓協助留意，一名七歲女童與家人失散。女孩身穿紅色上衣，背著白色兔子背包。如有發現，請通知服務台。」
            </p>
            <div className="mt-2 space-y-1 border-t border-white/10 pt-2 text-xs leading-relaxed text-slate-400">
              <p>🔍 點圖片裡的圓點探索場景、🧍 是可以問話的人，圖片上方一排小圖示可以切換場景</p>
              <p>📌 想到什麼推理，隨時打開下方「案件公告欄」整理起來，想通了再按「我認為我知道真相了」結案</p>
            </div>
          </div>
        )}

        {showConclusion ? (
          <ConclusionScreen
            mission={mission}
            collectedClueIds={collectedClueIds}
            deductionAnswers={deductionAnswers}
            onBack={() => setShowConclusion(false)}
          />
        ) : (
          <>
            {currentScene && (
              <SceneView
                scene={currentScene}
                scenes={mission.scenes}
                onSceneSelect={handleSceneChange}
                npcs={sceneNpcs}
                exploredHotspotIds={exploredHotspotIds}
                onHotspotClick={handleHotspotClick}
                activeHotspotId={activeHotspot?.id ?? null}
                onCloseReveal={() => setActiveHotspot(null)}
                activeNpcId={activeNpcId}
                onNpcMarkerClick={id => setActiveNpcId(prev => (prev === id ? null : id))}
              />
            )}

            {activeNpc && (
              <div className="mt-3">
                <NpcDialogue npc={activeNpc} onSelectLine={collectClue} />
              </div>
            )}

            {showFirstClueHintBanner && (
              <div className="mt-3 flex items-center justify-between gap-3 rounded-lg border border-amber-300/30 bg-amber-300/10 px-4 py-2 text-xs text-amber-200">
                <span>你已取得第一條證據。可以打開下方「📌 案件公告欄」把目前想到的都填進去，之後想到新的還能再改。</span>
                <button onClick={dismissFirstClueHint} className="shrink-0 text-amber-300 hover:text-amber-100">
                  知道了
                </button>
              </div>
            )}

            <div className="mt-4">
              <ClueInventory clues={mission.clues} collectedClueIds={collectedClueIds} />
            </div>

            <div className="mt-4 rounded-lg border border-white/10 bg-white/5">
              <button
                onClick={() => setBoardExpanded(prev => !prev)}
                className="flex w-full items-center justify-between px-4 py-3 text-left"
              >
                <span className="text-sm font-medium text-slate-200">📌 案件公告欄</span>
                <span className="flex items-center gap-2 text-xs text-slate-500">
                  {deductionFilledCount}/{mission.deduction.blanks.length} 已整理
                  <span className="text-slate-600">{boardExpanded ? '︿' : '﹀'}</span>
                </span>
              </button>
              {boardExpanded && (
                <div className="border-t border-white/10 px-4 py-4">
                  <DeductionBoard
                    deduction={mission.deduction}
                    answers={deductionAnswers}
                    onSelectOption={handleDeductionSelectOption}
                  />
                </div>
              )}
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
