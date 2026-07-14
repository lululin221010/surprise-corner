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
  /** 答錯時顯示：這個選項對應到哪條線索的第一印象，讓玩家看見自己剛剛是被什麼誤導 */
  misledByClueId?: string;
};

export type DeductionBlank = {
  id: string;
  /** 空格前的句子片段 */
  promptBefore: string;
  /** 空格後的句子片段 */
  promptAfter: string;
  correctOptionId: string;
  /** 答對時顯示：為什麼這是對的，不只是打勾而已 */
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
  /** 結案前的填空驗證關卡，把「拼湊真相」變成真的要動腦組合，而不是選一個大方向的假說就結束 */
  deduction: Deduction;
  /** 通用反思短文，所有玩家看到的內容一樣，不因假說不同而變，穿插在個人化reflection跟Truth之間 */
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
