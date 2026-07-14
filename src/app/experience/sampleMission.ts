import type { Mission } from './types';

// 引擎測試用假資料，非正式 Mission 001 內容，正式內容之後由獨立資料檔取代。
export const sampleMission: Mission = {
  id: 'sample',
  title: '測試案件（引擎測試用，非正式內容）',
  scenes: [
    {
      id: 'scene-a',
      name: '地點A',
      hotspots: [
        {
          id: 'h1',
          label: '觀察桌上的紙條',
          kind: 'observe',
          revealText: '紙條上寫著一串模糊的字跡。',
          givesClueId: 'clue-1',
        },
        {
          id: 'h2',
          label: '搜索抽屜',
          kind: 'search',
          revealText: '抽屜裡是空的，什麼也沒有。',
        },
      ],
    },
    {
      id: 'scene-b',
      name: '地點B',
      hotspots: [
        {
          id: 'h3',
          label: '觀察地上的腳印',
          kind: 'observe',
          revealText: '腳印朝向出口延伸。',
          givesClueId: 'clue-2',
        },
      ],
    },
  ],
  npcs: [
    {
      id: 'npc-1',
      name: '目擊者',
      sceneId: 'scene-a',
      lines: [
        {
          label: '詢問當時發生什麼事',
          text: '我只記得聽到一聲巨響，然後就什麼都不知道了。',
          givesClueId: 'clue-3',
        },
      ],
    },
  ],
  clues: [
    { id: 'clue-1', title: '模糊的紙條', description: '字跡難以辨認，但看得出是某種地址。' },
    { id: 'clue-2', title: '腳印', description: '指向出口方向的新鮮腳印。' },
    { id: 'clue-3', title: '目擊者證詞', description: '目擊者提到一聲巨響。' },
  ],
  truth: {
    revealText: '（這裡會顯示真相文字——測試用假資料，正式內容由 Mission 001 資料檔取代。）',
  },
};
