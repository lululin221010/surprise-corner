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

const toyStoreImage = svgDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400">
  <rect width="600" height="400" fill="#1c1330"/>
  <rect x="0" y="320" width="600" height="80" fill="#241c3d"/>
  <rect x="40" y="140" width="160" height="140" rx="6" fill="#3a2d5c"/>
  <rect x="250" y="220" width="120" height="60" rx="4" fill="#2c2350"/>
  <rect x="270" y="205" width="80" height="18" rx="3" fill="#5a4d85"/>
  <rect x="430" y="100" width="130" height="180" rx="6" fill="#33264f"/>
  <circle cx="470" cy="150" r="16" fill="#f0c9dd"/>
  <circle cx="510" cy="160" r="20" fill="#e8b8d0"/>
</svg>
`);

const familyLoungeImage = svgDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400">
  <rect width="600" height="400" fill="#161228"/>
  <rect x="0" y="320" width="600" height="80" fill="#201a34"/>
  <rect x="60" y="220" width="130" height="70" rx="8" fill="#3a2d5c"/>
  <circle cx="100" cy="215" r="10" fill="#f0c9a0"/>
  <circle cx="150" cy="215" r="10" fill="#a0c9f0"/>
  <rect x="240" y="250" width="150" height="30" rx="6" fill="#2c2350"/>
  <rect x="470" y="130" width="90" height="120" rx="4" fill="#2a2145"/>
</svg>
`);

const corridorImage = svgDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400">
  <rect width="600" height="400" fill="#191228"/>
  <rect x="0" y="330" width="600" height="70" fill="#221a34"/>
  <rect x="60" y="120" width="90" height="140" rx="4" fill="#3a2d5c"/>
  <rect x="230" y="90" width="200" height="130" rx="4" fill="#2c2350"/>
  <rect x="250" y="110" width="60" height="45" rx="2" fill="#5a4d85"/>
  <rect x="320" y="110" width="60" height="45" rx="2" fill="#5a4d85"/>
  <rect x="250" y="165" width="60" height="45" rx="2" fill="#5a4d85"/>
  <polygon points="480,340 510,320 540,340 525,340 525,360 495,360 495,340" fill="#4b3f75" opacity="0.8"/>
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
    {
      id: 'toy-store',
      name: '玩具店',
      image: toyStoreImage,
      hotspots: [
        {
          id: 'toy-demo',
          label: '查看玩具展示區',
          kind: 'observe',
          revealText: '展示區聚集不少親子試玩。幾名孩子在不同貨架間來回奔跑，大人則站在外圍等待。有時孩子離開視線十幾秒，大人也沒有立刻追上。',
          position: { xPct: 20, yPct: 53 },
        },
        {
          id: 'checkout-camera-sign',
          label: '查看收銀台公告',
          kind: 'observe',
          revealText: '公告寫著：「本店監視設備僅供安全管理使用，不提供現場調閱。」旁邊還貼著活動期間人潮眾多的提醒。',
          position: { xPct: 52, yPct: 63 },
        },
        {
          id: 'plush-display',
          label: '查看大型玩偶展示架',
          kind: 'observe',
          revealText: '展示架後方形成一小塊視線死角。站在不同位置的人，很容易誤以為另一個人已經往不同方向離開。',
          givesClueId: 'blind-angle',
          position: { xPct: 83, yPct: 47 },
        },
      ],
    },
    {
      id: 'family-lounge',
      name: '親子休息區',
      image: familyLoungeImage,
      hotspots: [
        {
          id: 'kids-table',
          label: '查看兒童閱讀桌',
          kind: 'observe',
          revealText: '閱讀桌上散落著幾本童書和彩色鉛筆。附近家長提醒孩子：「如果跟爸爸媽媽走散，就留在原地，不要亂跑。」另一位孩子立刻回答：「老師也是這樣教我們。」',
          position: { xPct: 21, yPct: 64 },
        },
        {
          id: 'rest-bench',
          label: '查看休息長椅',
          kind: 'observe',
          revealText: '長椅正對著中庭入口。坐在這裡的人可以一直看著入口，但看不到通往餐飲區和玩具店的走道。',
          givesClueId: 'limited-view',
          position: { xPct: 53, yPct: 66 },
        },
        {
          id: 'direction-sign',
          label: '查看指示牌',
          kind: 'observe',
          revealText: '指示牌寫著：「服務台 ←」「中庭 ↑」「親子休息區 →」。從不同方向過來的人，很可能認為自己回到了同一個地方，但其實彼此隔著一整個轉角。',
          position: { xPct: 86, yPct: 48 },
        },
      ],
    },
    {
      id: 'information-corridor',
      name: '中庭連接走廊',
      image: corridorImage,
      hotspots: [
        {
          id: 'event-sign',
          label: '查看活動動線指示牌',
          kind: 'observe',
          revealText: '活動期間增設的臨時指示牌將人流分成左右兩側。表演散場時，左側引導前往停車場，右側引導前往餐飲區，兩股人流幾乎不會再交會。',
          givesClueId: 'split-flow',
          position: { xPct: 18, yPct: 48 },
        },
        {
          id: 'family-photo-wall',
          label: '查看活動照片展示牆',
          kind: 'observe',
          revealText: '展示牆上的活動照片裡，許多家長都回頭確認孩子是否跟上。有些孩子則停下腳步，看著前面的父母逐漸走遠。只要人群一擋住視線，彼此很快就會失去蹤影。',
          position: { xPct: 55, yPct: 39 },
        },
        {
          id: 'floor-arrows',
          label: '觀察地面的導引箭頭',
          kind: 'observe',
          revealText: '不同顏色的箭頭通往不同出口。第一次來的遊客，很容易把「出口」和「剛才集合的地方」混為一談。',
          position: { xPct: 85, yPct: 86 },
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
    {
      id: 'npc-toy-clerk',
      name: '玩具店店員',
      sceneId: 'toy-store',
      position: { xPct: 30, yPct: 68 },
      whyTheyThinkThis: '她當時正在門口整理商品，只看到人群經過的十幾秒。',
      lines: [
        {
          label: '你有看到那個女孩嗎？',
          text: '我看到一個差不多年紀的小女孩站在門口往後看，好像在找人。我低頭整理商品，再抬頭時她就不見了。',
        },
        {
          label: '有人陪著她嗎？',
          text: '我第一眼以為旁邊那位先生是她爸爸，但現在回想，其實我沒有看到他們交談，也沒有牽手，只是剛好走在附近而已。',
          givesClueId: 'assumed-father',
        },
        {
          label: '她看起來害怕嗎？',
          text: '沒有。她沒有哭，也沒有大喊，只是不停看向後方，好像在等誰。',
        },
      ],
    },
    {
      id: 'npc-cleaner',
      name: '清潔人員',
      sceneId: 'family-lounge',
      position: { xPct: 65, yPct: 70 },
      whyTheyThinkThis: '她負責親子休息區與中庭之間的清潔，只會不斷來回巡視，沒有看見完整經過。',
      lines: [
        {
          label: '你有注意到那個女孩嗎？',
          text: '有個小女孩在入口附近站了一陣子，一直往中庭方向看。我以為她是在等家人，所以沒有特別在意。',
        },
        {
          label: '她有哭嗎？',
          text: '沒有。她看起來很安靜，只是偶爾踮腳看看人群，好像怕錯過什麼。',
        },
        {
          label: '後來她去哪裡了？',
          text: '我推著清潔車去另一邊，再回來時她已經不在了。我不知道她是等到家人，還是自己離開。',
          givesClueId: 'waiting-girl',
        },
      ],
    },
    {
      id: 'npc-event-staff',
      name: '活動工作人員',
      sceneId: 'information-corridor',
      position: { xPct: 66, yPct: 70 },
      whyTheyThinkThis: '他負責散場動線，只看見人潮離開的過程，沒有參與後續尋人。',
      lines: [
        {
          label: '散場時現場發生了什麼？',
          text: '表演一結束，人群同時往四周散開。我一直提醒大家慢慢走，但只要有人停下來，後面的人就會自動繞過去。',
        },
        {
          label: '你有看到那個女孩嗎？',
          text: '我記得有個小女孩停在原地，一直往人群裡看。我當時以為她是在等家人，所以沒有過去詢問。',
          givesClueId: 'stayed-behind',
        },
        {
          label: '她看起來像迷路嗎？',
          text: '老實說，不像。真正迷路的小朋友通常會邊走邊哭，她比較像是在等一個她相信一定會回來的人。',
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
    {
      id: 'blind-angle',
      title: '展示架視線死角',
      firstInterpretation: '女孩可能利用展示架後方離開，因此沒有人知道她去了哪裡。',
      finalInterpretation: '真正造成混亂的不是女孩消失，而是不同位置的人看到的方向完全不同，每個人都以為自己看見了完整經過。',
    },
    {
      id: 'assumed-father',
      title: '被誤認的父親',
      firstInterpretation: '女孩曾經跟著一位成年男子行動，那人很可能就是帶走她的人。',
      finalInterpretation: '店員事後才意識到，自己只是把一位剛好經過的男子，自然而然認成女孩的父親。她從來沒有真正確認兩人有任何關係。',
    },
    {
      id: 'limited-view',
      title: '休息區視角',
      firstInterpretation: '如果女孩一直待在這裡，家長應該很容易找到她。',
      finalInterpretation: '這裡只能看到中庭入口，看不到其他出口；而家長很可能一直在其他方向尋找，雙方其實彼此都不在對方的視線內。',
    },
    {
      id: 'waiting-girl',
      title: '等待中的女孩',
      firstInterpretation: '女孩可能停留片刻後，又繼續往別處移動。',
      finalInterpretation:
        '女孩沒有驚慌，也沒有急著到處找人。她一直遵守「留在原地等待」的觀念，只是她認定的「原地」，和父母認定的「原地」並不是同一個地方。',
    },
    {
      id: 'split-flow',
      title: '分流動線',
      firstInterpretation: '女孩可能是在分流時，被人帶往另一個出口。',
      finalInterpretation: '真正分開的不是女孩與陌生人，而是女孩與父母。三個人都順著不同的人流前進，並各自相信很快就會再見面。',
    },
    {
      id: 'stayed-behind',
      title: '停在原地的小女孩',
      firstInterpretation: '女孩停下來，是因為她不知道該往哪裡走。',
      finalInterpretation:
        '女孩其實知道自己該做什麼——她一直遵守「留在原地等爸爸媽媽」。只是她認定的原地，是她最後看見父母的位置；而父母認定的原地，則是表演開始前約好的集合點。',
    },
  ],
  hypotheses: [
    {
      id: 'abduction',
      label: '被陌生人帶走',
      color: '#ef4444',
      reflection: '人看到「鞋子」「陌生男子」「協尋」時，很容易把它們串成一個完整故事，即使三件事之間沒有證據證明彼此有關。',
    },
    {
      id: 'ranAway',
      label: '自己亂跑',
      color: '#eab308',
      reflection: '孩子突然離開父母視線時，我們很容易認為是孩子亂跑，而忽略了父母也可能同時改變了位置。',
    },
    {
      id: 'missedParents',
      label: '她和父母在人群中錯過了',
      color: '#3b82f6',
      reflection:
        '這個假說最接近事件的方向，但你可能仍然把「錯過」想成某一方看漏、走太快，或沒有注意另一方。當人群突然移動時，大腦很容易用平常的經驗補齊看不見的部分：父母以為孩子仍跟在身邊，孩子也以為父母很快會回到剛才的位置。雙方都沒有真正確認，卻都把自己的預期當成了現場事實。',
    },
    {
      id: 'unclear',
      label: '目前還無法判斷',
      color: '#9ca3af',
      reflection:
        '選擇暫時不下結論，代表你注意到現有證據仍可能支持不只一種說法。這不是逃避判斷，而是在抵抗大腦急著把零散資訊拼成完整故事的衝動。不過，即使選擇保留，你在探索途中仍可能曾經偏向某個答案；真正值得回看的，是哪些畫面、話語或既有經驗，曾悄悄把你的注意力推向那個方向。',
    },
  ],
  truth: {
    revealText:
      '表演散場後，人群同時往不同方向移動。父母以為女孩仍跟在身旁，便沿著走廊往服務台方向尋找；女孩則以為父母會回到剛才觀看表演的位置，所以走到她記得的「原地」等待。她沒有被陌生人帶走，也沒有任性亂跑。父母和孩子都在做自己認為最合理的事，只是他們心中的「原地」並不是同一個地方。這起事件真正造成失聯的，不是誰看見了錯誤的畫面，而是每個人都把自己沒有確認的部分，當成了已經親眼看見的事實。',
  },
};
