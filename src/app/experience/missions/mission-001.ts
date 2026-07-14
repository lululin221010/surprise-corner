import type { Mission } from '../types';

// 正式 Mission 001 內容檔，由內容端（GPT）產出，CC負責補上position/image等工程欄位後wire進來。
// 尚未完整：目前只有第一個場景+一條線索，truth是根據已定案的案件真相寫的草稿，等正式潤飾文字。
function svgDataUri(svg: string): string {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

const atriumImage = svgDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400">
  <rect width="600" height="400" fill="#181026"/>
  <rect x="0" y="320" width="600" height="80" fill="#221a34"/>
  <rect x="30" y="170" width="150" height="100" rx="6" fill="#33264f"/>
  <rect x="410" y="50" width="140" height="170" rx="4" fill="#2c2350"/>
  <ellipse cx="290" cy="345" rx="60" ry="18" fill="#24361f"/>
  <circle cx="300" cy="338" r="6" fill="#f6a8c0"/>
  <rect x="470" y="250" width="70" height="100" rx="4" fill="#2a2145"/>
</svg>
`);

export const mission001: Mission = {
  id: 'mission-001',
  title: '中庭走失事件（草稿標題，待定案）',
  scenes: [
    {
      id: 'atrium',
      name: '中央中庭',
      image: atriumImage,
      hotspots: [
        {
          id: 'stage',
          label: '觀察表演舞台',
          kind: 'observe',
          revealText:
            '舞台已經收拾得差不多，只剩工作人員拆除設備。地上還留著幾張彩帶和散落的宣傳單。從舞台往四周看，中庭可以同時通往四個不同方向，人潮散去後已經恢復平靜。',
          position: { xPct: 18, yPct: 55 },
        },
        {
          id: 'photo-spot',
          label: '查看拍照區',
          kind: 'observe',
          revealText:
            '拍照區旁立著活動背板，不少人剛才在這裡排隊合照。一位工作人員提到，表演結束後大家幾乎同時往出口移動，現場一度非常擁擠。',
          position: { xPct: 80, yPct: 34 },
        },
        {
          id: 'dropped-shoe',
          label: '查看地上的小童鞋',
          kind: 'observe',
          revealText: '一隻粉紅色的小童鞋孤零零躺在花圃旁，看起來像是不小心掉落的。鞋子尺寸大約七、八歲孩子穿的大小。',
          givesClueId: 'pink-shoe',
          position: { xPct: 50, yPct: 84 },
        },
        {
          id: 'floor-map',
          label: '查看中庭導覽圖',
          kind: 'observe',
          revealText: '導覽圖顯示，中庭連接服務台、餐飲區、玩具店與停車場入口。只要離開中庭幾十秒，就可能走向完全不同的方向。',
          position: { xPct: 84, yPct: 75 },
        },
      ],
    },
  ],
  npcs: [],
  clues: [
    {
      id: 'pink-shoe',
      title: '粉紅色童鞋',
      firstInterpretation: '玩家直覺認為這就是失蹤女孩掉落的鞋子，她很可能是在這裡被強行帶走。',
      finalInterpretation:
        '這雙鞋屬於另一位年紀相近的小女孩，只是在散場混亂中遺失，與本案沒有直接關係。真正誤導玩家的，是大家都把「年齡相近」當成了「就是同一個人」。',
    },
  ],
  truth: {
    revealText:
      '（真相草稿，待正式潤飾）表演散場時，父母與孩子都以為彼此就在附近，因此往不同方向離開。孩子沒有被拐走，也沒有故意亂跑，而是在自己認定的「原地」等待。',
  },
};
