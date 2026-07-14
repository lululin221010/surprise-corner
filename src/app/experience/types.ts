export type Clue = {
  id: string;
  title: string;
  description: string;
};

export type Hotspot = {
  id: string;
  label: string;
  kind: 'observe' | 'search';
  revealText: string;
  givesClueId?: string;
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
  lines: NpcLine[];
};

export type Scene = {
  id: string;
  name: string;
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
