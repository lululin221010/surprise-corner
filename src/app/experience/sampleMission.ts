import type { Mission } from './types';

// 引擎測試用假資料，非正式 Mission 001 內容，正式內容之後由獨立資料檔取代。
// 場景圖是手刻 SVG 佔位插畫（不是正式美術），只是為了讓 Hotspot 能「畫在圖上」而非純文字清單。
function svgDataUri(svg: string): string {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

const sceneAImage = svgDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400">
  <rect width="600" height="400" fill="#1a1330"/>
  <rect x="0" y="300" width="600" height="100" fill="#241c3d"/>
  <rect x="220" y="200" width="160" height="90" rx="6" fill="#3a2d5c"/>
  <rect x="240" y="180" width="60" height="24" rx="3" fill="#e8dcff" opacity="0.85"/>
  <rect x="400" y="230" width="70" height="60" rx="4" fill="#2c2350"/>
  <circle cx="510" cy="220" r="26" fill="#4a3d75"/>
</svg>
`);

const sceneBImage = svgDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400">
  <rect width="600" height="400" fill="#160f28"/>
  <rect x="0" y="320" width="600" height="80" fill="#201a38"/>
  <ellipse cx="300" cy="340" rx="14" ry="8" fill="#4b3f75" opacity="0.8"/>
  <ellipse cx="340" cy="330" rx="14" ry="8" fill="#4b3f75" opacity="0.8"/>
  <ellipse cx="380" cy="320" rx="14" ry="8" fill="#4b3f75" opacity="0.8"/>
</svg>
`);

export const sampleMission: Mission = {
  id: 'sample',
  title: '測試案件（引擎測試用，非正式內容）',
  scenes: [
    {
      id: 'scene-a',
      name: '地點A',
      image: sceneAImage,
      hotspots: [
        {
          id: 'h1',
          label: '觀察桌上的紙條',
          kind: 'observe',
          revealText: '紙條上寫著一串模糊的字跡。',
          givesClueId: 'clue-1',
          position: { xPct: 46, yPct: 47 },
        },
        {
          id: 'h2',
          label: '搜索抽屜',
          kind: 'search',
          revealText: '抽屜裡是空的，什麼也沒有。',
          position: { xPct: 73, yPct: 63 },
        },
      ],
    },
    {
      id: 'scene-b',
      name: '地點B',
      image: sceneBImage,
      hotspots: [
        {
          id: 'h3',
          label: '觀察地上的腳印',
          kind: 'observe',
          revealText: '腳印朝向出口延伸。',
          givesClueId: 'clue-2',
          position: { xPct: 57, yPct: 83 },
        },
      ],
    },
  ],
  npcs: [
    {
      id: 'npc-1',
      name: '目擊者',
      sceneId: 'scene-a',
      position: { xPct: 85, yPct: 55 },
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
