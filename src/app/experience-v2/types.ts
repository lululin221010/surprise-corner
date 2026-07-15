import type { Position } from '../experience/types';

export type NpcLineV2 = {
  label: string;
  text: string;
  givesClueId?: string;
};

/**
 * 分岔選項：玩家在同一個提問時機，選擇用同理或追問的方式開口，
 * NPC 給的回應語氣不同，但揭露的事實線索一致（不影響案件公告欄的填空內容）。
 * trustDelta 只在背景累計，畫面上不顯示數字，避免又變成一種「分數」。
 */
export type NpcBranchOption = {
  label: string;
  text: string;
  trustDelta: number;
  givesClueId?: string;
};

export type NpcV2 = {
  id: string;
  name: string;
  sceneId: string;
  position: Position;
  whyTheyThinkThis?: string;
  openingLine: NpcLineV2;
  branch: NpcBranchOption[];
  closingLine: NpcLineV2;
};

export type EndingVariant = {
  title: string;
  summary: string;
};
