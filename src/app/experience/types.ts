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
  hotspots: Hotspot[];
};

export type ReflectionSection = {
  title: string;
  content?: string;
};

export type DeductionOption = {
  id: string;
  text: string;
  /** 如果玩家選了這個、而它不是 correctOptionId：結案雙欄比對時，用來標示「這個念頭呼應了哪條線索的第一印象」——不是判定對錯，只是讓玩家看見這個念頭從哪裡來 */
  misledByClueId?: string;
};

export type DeductionBlank = {
  id: string;
  /** 空格前的句子片段 */
  promptBefore: string;
  /** 空格後的句子片段 */
  promptAfter: string;
  /** 後來確認的事實版本用的選項id，結案時放在「後來確認的版本」欄，不做評分用途 */
  correctOptionId: string;
  /** 結案雙欄比對時，「後來確認的版本」那一欄用來補充說明 */
  correctExplanation: string;
  options: DeductionOption[];
};

export type Deduction = {
  title: string;
  intro: string;
  blanks: DeductionBlank[];
};

export type Mission = {
  id: string;
  title: string;
  scenes: Scene[];
  npcs: Npc[];
  clues: Clue[];
  /** 案件公告欄：玩家在探索過程中隨時填寫、修改，寫下自己目前相信的版本，不評分、沒有標準答案的壓力 */
  deduction: Deduction;
  /** 結案前的過渡文字，穿插在雙欄比對跟Truth之間 */
  reflectionEssay: {
    title: string;
    intro: string;
    sections: ReflectionSection[];
  };
  truth: { revealText: string };
  /** 結案後的收尾語，把主題從「案件解開了」拉高到「你調查的其實是自己」 */
  missionEnding: {
    title: string;
    summary: string;
  };
};
