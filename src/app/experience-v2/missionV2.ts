import { mission001 } from '../experience/missions/mission-001';
import type { EndingVariant, NpcV2 } from './types';

// 跟v1共用場景/線索/填空/reflectionEssay/truth內容(不重寫)，只換NPC對話與結局；
// id換掉是為了localStorage不跟v1(/experience)互相污染，方便兩版分開比較。
export const missionV2Base = { ...mission001, id: 'mission-001-v2' };

// 每個NPC結構：固定開場問題 → 分岔提問(同理/追問，玩家選一個，選了就定住) → 固定收尾問題
// 分岔的兩個選項揭露的事實線索完全一樣，只是NPC的語氣與回應內容不同，
// 差異在於「多說了什麼」而不是「說了不同的真相」。
export const npcsV2: NpcV2[] = [
  {
    id: 'staff-01',
    name: '服務台人員',
    sceneId: 'info-desk',
    position: { xPct: 52, yPct: 34 },
    whyTheyThinkThis: '她整個下午都待在服務台，只能根據民眾回報與廣播紀錄拼湊事件經過。',
    openingLine: {
      label: '家長是什麼時候來求助的？',
      text: '他們跑過來時非常著急，一直說女兒剛剛還在身後，回頭就不見了，所以我們立刻安排廣播。',
    },
    branch: [
      {
        label: '我知道妳現在應該也很緊張，方便說說妳聽到的內容嗎？',
        text: '（她抬頭看了你一眼，聲音緩和了一些）……有一位民眾說看見一個小女孩跟著一名成年男子往玩具店方向走，但他也承認距離有點遠，沒有看到正臉。我後來一直在想，如果我早點確認就好了。',
        trustDelta: 1,
        givesClueId: 'adult-man',
      },
      {
        label: '所以你們知道她跟男人走了，怎麼沒馬上通報？',
        text: '（她皺眉，語氣變得防備）……我們是照SOP處理的。有一位民眾說看見一個小女孩跟著一名成年男子往玩具店方向走，但他距離有點遠，沒看清楚。我們不可能每個模糊的目擊都當真吧？',
        trustDelta: -1,
        givesClueId: 'adult-man',
      },
    ],
    closingLine: {
      label: '後來有人再通報嗎？',
      text: '有很多電話，但內容彼此對不起來。有人說在餐廳看到她，也有人說在停車場看到她，我們沒辦法確認哪些是真的。',
    },
  },
  {
    id: 'npc-toy-clerk',
    name: '玩具店店員',
    sceneId: 'toy-store',
    position: { xPct: 30, yPct: 68 },
    whyTheyThinkThis: '她當時正在門口整理商品，只看到人群經過的十幾秒。',
    openingLine: {
      label: '你有看到那個女孩嗎？',
      text: '我看到一個差不多年紀的小女孩站在門口往後看，好像在找人。我低頭整理商品，再抬頭時她就不見了。',
    },
    branch: [
      {
        label: '你當下應該也很自責吧？',
        text: '（她低下頭）……對，我第一眼以為旁邊那位先生是她爸爸，現在回想，其實我沒有看到他們交談，也沒有牽手，只是剛好走在附近而已。要是我當時多看一眼就好了。',
        trustDelta: 1,
        givesClueId: 'assumed-father',
      },
      {
        label: '妳不是應該要看清楚客人的嗎？',
        text: '（她語氣變得有點委屈又強硬）……我又不是保全，店裡客人這麼多。我第一眼以為旁邊那位先生是她爸爸，現在回想確實沒看到他們交談，但這不是我的責任範圍吧？',
        trustDelta: -1,
        givesClueId: 'assumed-father',
      },
    ],
    closingLine: {
      label: '她看起來害怕嗎？',
      text: '沒有。她沒有哭，也沒有大喊，只是不停看向後方，好像在等誰。',
    },
  },
  {
    id: 'npc-cleaner',
    name: '清潔人員',
    sceneId: 'family-lounge',
    position: { xPct: 65, yPct: 70 },
    whyTheyThinkThis: '她負責親子休息區與中庭之間的清潔，只會不斷來回巡視，沒有看見完整經過。',
    openingLine: {
      label: '你有注意到那個女孩嗎？',
      text: '有個小女孩在入口附近站了一陣子，一直往中庭方向看。我以為她是在等家人，所以沒有特別在意。',
    },
    branch: [
      {
        label: '妳一定也很擔心她現在的安危吧？',
        text: '（她聲音有點哽咽）……我推著清潔車去另一邊，再回來時她已經不在了。我不知道她是等到家人，還是自己離開，我這幾天都在想這件事。',
        trustDelta: 1,
        givesClueId: 'waiting-girl',
      },
      {
        label: '妳工作的時候都沒多注意一下嗎？',
        text: '（她語氣防衛）……我推著清潔車去另一邊，再回來時她已經不在了。我一個人要顧這麼大一區，真的沒辦法盯著每個小孩。',
        trustDelta: -1,
        givesClueId: 'waiting-girl',
      },
    ],
    closingLine: {
      label: '她有哭嗎？',
      text: '沒有。她看起來很安靜，只是偶爾踮腳看看人群，好像怕錯過什麼。',
    },
  },
  {
    id: 'npc-event-staff',
    name: '活動工作人員',
    sceneId: 'information-corridor',
    position: { xPct: 66, yPct: 70 },
    whyTheyThinkThis: '他負責散場動線，只看見人潮離開的過程，沒有參與後續尋人。',
    openingLine: {
      label: '散場時現場發生了什麼？',
      text: '表演一結束，人群同時往四周散開。我一直提醒大家慢慢走，但只要有人停下來，後面的人就會自動繞過去。',
    },
    branch: [
      {
        label: '散場那麼混亂，你一定也很難兼顧吧？',
        text: '（他鬆了口氣）……對，真的很難。我記得有個小女孩停在原地，一直往人群裡看。我當時以為她是在等家人，所以沒有過去詢問。現在想想，也許我該多問一句。',
        trustDelta: 1,
        givesClueId: 'stayed-behind',
      },
      {
        label: '你看到小孩落單怎麼沒有去確認？',
        text: '（他語氣有點不耐）……我記得有個小女孩停在原地，一直往人群裡看，但現場幾百個人散場，我一個人真的顧不過來，總不能每個看起來在等人的小孩我都去問吧？',
        trustDelta: -1,
        givesClueId: 'stayed-behind',
      },
    ],
    closingLine: {
      label: '她看起來像迷路嗎？',
      text: '老實說，不像。真正迷路的小朋友通常會邊走邊哭，她比較像是在等一個她相信一定會回來的人。',
    },
  },
  {
    id: 'securityChief',
    name: '值班保全',
    sceneId: 'securityOffice',
    position: { xPct: 48, yPct: 72.5 },
    whyTheyThinkThis: '他負責整合所有回報，習慣依時間排序，而不是依照誰說得比較有把握。',
    openingLine: {
      label: '目前找到什麼？',
      text: '目前沒有任何證據顯示有人強行帶走女孩。每個人的說法都是真的，只是發生在不同時間。',
    },
    branch: [
      {
        label: '這種時候要整合這麼多說法，你們一定也很辛苦。',
        text: '（他態度緩和）……到目前為止，我還沒有發現任何人故意說謊。大家都很願意配合，只是每個人手上的片段真的不一樣。',
        trustDelta: 1,
      },
      {
        label: '會不會其實有人隱瞞了什麼？',
        text: '（他語氣變得謹慎）……到目前為止，我還沒有證據顯示有人說謊。但你這樣問，我也會開始重新檢查每個人的說法。',
        trustDelta: -1,
      },
    ],
    closingLine: {
      label: '為什麼一直找不到？',
      text: '有時候不是找錯地方，而是大家找的「原地」根本不是同一個地方。',
    },
  },
  {
    id: 'broadcastStaff',
    name: '廣播人員',
    sceneId: 'findingRoom',
    position: { xPct: 25.8, yPct: 62.5 },
    whyTheyThinkThis: '她每天協助尋人，知道很多人聽見廣播後，並不一定會前往服務台。',
    openingLine: {
      label: '女孩有沒有聽見廣播？',
      text: '不能確定。商場很吵，而且不是每個孩子都知道服務台在哪裡。',
    },
    branch: [
      {
        label: '妳每天處理這種事，一定也累積了不少經驗吧？',
        text: '（她笑了一下，語氣輕鬆了些）……如果家長和孩子對「集合地點」有共識，通常很快就能找到彼此。做這行久了，我發現最常見的問題不是孩子不聽話，是雙方對「這裡」的理解不一樣。',
        trustDelta: 1,
      },
      {
        label: '那你們的廣播系統是不是有問題？',
        text: '（她語氣有點僵）……系統沒有問題。如果家長和孩子對「集合地點」有共識，通常很快就能找到彼此。廣播只能傳遞訊息，沒辦法確保每個人理解的地點都一樣。',
        trustDelta: -1,
      },
    ],
    closingLine: {
      label: '尋人廣播通常有效嗎？',
      text: '如果家長和孩子對「集合地點」有共識，通常很快就能找到彼此。',
    },
  },
  {
    id: 'elderlyWitness',
    name: '坐在長椅的老先生',
    sceneId: 'scene-final-location',
    position: { xPct: 31.6, yPct: 66.25 },
    whyTheyThinkThis: '他從頭到尾都坐在同一張長椅，只看見自己眼前發生的事情。',
    openingLine: {
      label: '你有看到女孩嗎？',
      text: '有，她一直都在附近。她沒有哭，也沒有亂跑，只是一直東張西望。',
    },
    branch: [
      {
        label: '您這樣一直坐著留意，也辛苦您了。',
        text: '（他笑了笑）……我不知道，但她一直看著剛才表演的方向，好像認定有人會回來。你這麼一問，我倒想起來，她那個眼神很像在等一個她很信任的人。',
        trustDelta: 1,
      },
      {
        label: '您確定沒看錯方向嗎？',
        text: '（他有點不高興）……我在這裡坐一整天了，眼睛還很好。她一直看著剛才表演的方向，好像認定有人會回來，我看得很清楚。',
        trustDelta: -1,
      },
    ],
    closingLine: {
      label: '有人跟她說話嗎？',
      text: '沒有。我看見幾個人經過，但沒有人停下來。',
    },
  },
];

export const missionEndingVariants: { warm: EndingVariant; neutral: EndingVariant } = {
  warm: {
    title: 'Mission Complete',
    summary:
      '這一路上，你問的問題常常是「你還好嗎」多過「發生了什麼事」。\n\n這種問法沒有讓你更快拼出真相——時間軸還是同一條，線索還是那16條。\n\n但它讓每個目擊者，多說了一點點原本不會說的話。\n\n案件的真相或許從來不只一種拼法：有一種是「查出發生了什麼」，還有一種是「理解每個人當下的處境」。\n\n你選的是後者。',
  },
  neutral: {
    title: 'Mission Complete',
    summary:
      '這一路上，你問的問題大多是「到底發生了什麼」「你確定嗎」。\n\n這是一種很認真的追查方式——你拼出的時間軸，跟事實一樣準確。\n\n只是有幾位目擊者，在你追問的時候，話說得比較短了一點。\n\n下次調查時，也許可以留一點空間問問：「你還好嗎？」\n\n有時候，人願意說出口的，取決於你先問的是哪一句。',
  },
};
