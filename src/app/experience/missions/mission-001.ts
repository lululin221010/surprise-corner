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

const infoDeskImage = svgDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400">
  <rect width="600" height="400" fill="#171224"/>
  <rect x="0" y="310" width="600" height="90" fill="#211a34"/>
  <rect x="200" y="150" width="220" height="70" rx="6" fill="#3a2d5c"/>
  <rect x="220" y="130" width="180" height="24" rx="4" fill="#4a3d75"/>
  <rect x="460" y="120" width="110" height="140" rx="4" fill="#2c2350"/>
  <circle cx="490" cy="150" r="10" fill="#8a7cc0"/>
  <rect x="510" y="145" width="30" height="20" rx="3" fill="#8a7cc0"/>
  <rect x="40" y="230" width="120" height="10" rx="5" fill="#4b3f75" opacity="0.7"/>
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
    {
      id: 'info-desk',
      name: '服務台',
      image: infoDeskImage,
      hotspots: [
        {
          id: 'broadcast-log',
          label: '查看廣播紀錄',
          kind: 'observe',
          revealText:
            '服務台的值班紀錄顯示，下午3點46分收到家長通報，3點48分第一次廣播尋人，之後每五分鐘重複廣播一次。紀錄旁還有一句手寫備註：「有民眾表示曾看到疑似女孩跟著一名成年男子往玩具店方向。」',
          givesClueId: 'broadcast-note',
          position: { xPct: 52, yPct: 46 },
        },
        {
          id: 'lost-property',
          label: '查看失物招領區',
          kind: 'observe',
          revealText: '失物架上放著水壺、帽子、購物袋和玩偶，但沒有任何物品能確認屬於失蹤女孩。工作人員說，每次大型活動結束後都會收到很多失物。',
          position: { xPct: 86, yPct: 47 },
        },
        {
          id: 'queue-marker',
          label: '觀察服務台前的排隊動線',
          kind: 'observe',
          revealText: '排隊動線很長，站在服務台前的人其實很難同時注意到中庭四個出口。即使一直站在原地，能看到的範圍也很有限。',
          position: { xPct: 17, yPct: 59 },
        },
      ],
    },
  ],
  npcs: [
    {
      id: 'staff-01',
      name: '服務台人員',
      sceneId: 'info-desk',
      position: { xPct: 52, yPct: 34 },
      whyTheyThinkThis: '她整個下午都待在服務台，只能根據民眾回報與廣播紀錄拼湊事件經過。',
      lines: [
        {
          label: '家長是什麼時候來求助的？',
          text: '他們跑過來時非常著急，一直說女兒剛剛還在身後，回頭就不見了，所以我們立刻安排廣播。',
        },
        {
          label: '有人真的看到女孩嗎？',
          text: '有一位民眾說看見一個小女孩跟著一名成年男子往玩具店方向走，但他也承認距離有點遠，沒有看到正臉。',
          givesClueId: 'adult-man',
        },
        {
          label: '後來有人再通報嗎？',
          text: '有很多電話，但內容彼此對不起來。有人說在餐廳看到她，也有人說在停車場看到她，我們沒辦法確認哪些是真的。',
        },
      ],
    },
  ],
  clues: [
    {
      id: 'pink-shoe',
      title: '粉紅色童鞋',
      firstInterpretation: '玩家直覺認為這就是失蹤女孩掉落的鞋子，她很可能是在這裡被強行帶走。',
      finalInterpretation:
        '這雙鞋屬於另一位年紀相近的小女孩，只是在散場混亂中遺失，與本案沒有直接關係。真正誤導玩家的，是大家都把「年齡相近」當成了「就是同一個人」。',
    },
    {
      id: 'broadcast-note',
      title: '第一次廣播時間',
      firstInterpretation: '家長不到兩分鐘就報案，代表女孩一定是在中庭突然消失。',
      finalInterpretation: '廣播時間只能證明家長很快發現孩子不見，無法證明女孩是在中庭失蹤，更不能證明她遭人帶走。',
    },
    {
      id: 'adult-man',
      title: '陌生男子目擊',
      firstInterpretation: '有證人看到女孩跟著陌生男子離開，陌生男子很可能就是關鍵人物。',
      finalInterpretation:
        '證人距離太遠，只看到一高一矮的身影，就自然把旁邊的成年男子與女孩聯想在一起。事後確認，那是一對正在逛街的父女，與本案毫無關係。',
    },
  ],
  truth: {
    revealText:
      '（真相草稿，待正式潤飾）表演散場時，父母與孩子都以為彼此就在附近，因此往不同方向離開。孩子沒有被拐走，也沒有故意亂跑，而是在自己認定的「原地」等待。',
  },
};
