'use client';

import { useEffect, useState } from 'react';
import type { Mission } from './types';

type SavedState = {
  currentSceneId: string;
  collectedClueIds: string[];
  showConclusion: boolean;
  hasShownFirstClueHint: boolean;
};

export function useMissionState(mission: Mission) {
  const storageKey = `experience:${mission.id}`;

  const [currentSceneId, setCurrentSceneId] = useState(mission.scenes[0]?.id ?? '');
  const [collectedClueIds, setCollectedClueIds] = useState<string[]>([]);
  const [showConclusion, setShowConclusion] = useState(false);
  const [hasShownFirstClueHint, setHasShownFirstClueHint] = useState(false);
  const [showFirstClueHintBanner, setShowFirstClueHintBanner] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const raw = window.localStorage.getItem(storageKey);
    if (raw) {
      try {
        const saved: SavedState = JSON.parse(raw);
        setCurrentSceneId(saved.currentSceneId || mission.scenes[0]?.id || '');
        setCollectedClueIds(saved.collectedClueIds || []);
        setShowConclusion(saved.showConclusion || false);
        setHasShownFirstClueHint(saved.hasShownFirstClueHint || false);
      } catch {
        // 忽略壞掉的存檔，用預設值
      }
    }
    setLoaded(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!loaded) return;
    const state: SavedState = {
      currentSceneId,
      collectedClueIds,
      showConclusion,
      hasShownFirstClueHint,
    };
    window.localStorage.setItem(storageKey, JSON.stringify(state));
  }, [loaded, storageKey, currentSceneId, collectedClueIds, showConclusion, hasShownFirstClueHint]);

  function collectClue(clueId?: string) {
    if (!clueId) return;
    if (collectedClueIds.length === 0 && !collectedClueIds.includes(clueId) && !hasShownFirstClueHint) {
      setHasShownFirstClueHint(true);
      setShowFirstClueHintBanner(true);
    }
    setCollectedClueIds(prev => (prev.includes(clueId) ? prev : [...prev, clueId]));
  }

  function dismissFirstClueHint() {
    setShowFirstClueHintBanner(false);
  }

  return {
    currentSceneId,
    setCurrentSceneId,
    collectedClueIds,
    collectClue,
    showConclusion,
    setShowConclusion,
    showFirstClueHintBanner,
    dismissFirstClueHint,
  };
}
