export type Position = { xPct: number; yPct: number };

export type Clue = {
  id: string;
  title: string;
  /** 玩家收集當下、探索中看到的解讀（可能是誤導性的第一印象） */
  firstInterpretation: string;
  /** 結案時的真實解讀，跟 firstInterpretation 不同才會產生「原來如此」的翻轉感 */
  finalInterpretation: string;
};

export type Hotspot = {
  id: string;
  label: string;
  kind: 'observe' | 'search';
  revealText: string;
  givesClueId?: string;
  position: Position;
};

export type NpcLine = {
  label: string;
  text: string;
  givesClueId?: string;
};

export type Npc = {
  id: string;
  name: string;
  sceneId: string;
  position: Position;
  /** 這個角色為什麼會這樣認為/這樣說，顯示給玩家看，強化「可信但不完整」 */
  whyTheyThinkThis?: string;
  lines: NpcLine[];
};

export type Scene = {
  id: string;
  name: string;
  image: string;
  /** 作者用，不顯示給玩家：這一幕要改變玩家對案件的什麼認知 */
  sceneGoal?: string;
  hotspots: Hotspot[];
};

export type Mission = {
  id: string;
  title: string;
  scenes: Scene[];
  npcs: Npc[];
  clues: Clue[];
  truth: { revealText: string };
};
