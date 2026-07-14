'use client';

import { useEffect, useState } from 'react';
import type { Mission } from './types';

type SavedState = {
  currentSceneId: string;
  collectedClueIds: string[];
  showConclusion: boolean;
  hypothesisHistory: string[];
};

export function useMissionState(mission: Mission) {
  const storageKey = `experience:${mission.id}`;

  const [currentSceneId, setCurrentSceneId] = useState(mission.scenes[0]?.id ?? '');
  const [collectedClueIds, setCollectedClueIds] = useState<string[]>([]);
  const [showConclusion, setShowConclusion] = useState(false);
  const [hypothesisHistory, setHypothesisHistory] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const raw = window.localStorage.getItem(storageKey);
    if (raw) {
      try {
        const saved: SavedState = JSON.parse(raw);
        setCurrentSceneId(saved.currentSceneId || mission.scenes[0]?.id || '');
        setCollectedClueIds(saved.collectedClueIds || []);
        setShowConclusion(saved.showConclusion || false);
        setHypothesisHistory(saved.hypothesisHistory || []);
      } catch {
        // 忽略壞掉的存檔，用預設值
      }
    }
    setLoaded(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!loaded) return;
    const state: SavedState = { currentSceneId, collectedClueIds, showConclusion, hypothesisHistory };
    window.localStorage.setItem(storageKey, JSON.stringify(state));
  }, [loaded, storageKey, currentSceneId, collectedClueIds, showConclusion, hypothesisHistory]);

  function collectClue(clueId?: string) {
    if (!clueId) return;
    setCollectedClueIds(prev => (prev.includes(clueId) ? prev : [...prev, clueId]));
  }

  function submitHypothesis(hypothesisId: string) {
    setHypothesisHistory(prev => (prev[prev.length - 1] === hypothesisId ? prev : [...prev, hypothesisId]));
  }

  return {
    currentSceneId,
    setCurrentSceneId,
    collectedClueIds,
    collectClue,
    showConclusion,
    setShowConclusion,
    hypothesisHistory,
    currentHypothesisId: hypothesisHistory[hypothesisHistory.length - 1] ?? null,
    submitHypothesis,
  };
}
