const STORAGE_KEY = "lulu-apocalypse-village-v1";

const buildings = {
  home: {
    name: "小屋",
    cost: { wood: 8, stone: 4 },
    done: "小屋完成！從今天起，漏雨只有一半機率了。",
  },
  kitchen: {
    name: "廚房",
    cost: { wood: 10, food: 6, stone: 5 },
    done: "廚房完成！本村長宣布，晚餐要多一口魚。",
  },
  greenhouse: {
    name: "溫室",
    cost: { wood: 12, food: 10, stone: 6 },
    done: "溫室完成！末日也要有新鮮葉子，這很合理。",
  },
  garden: {
    name: "花圃",
    cost: { food: 8, stone: 3 },
    done: "花圃完成！廢墟長花了，我們贏一點點。",
  },
  bed: {
    name: "魯魯貓窩",
    cost: { wood: 6, food: 6 },
    done: "貓窩完成！這不是我的，是村莊公共柔軟設施。",
  },
};

const gatherText = {
  wood: ["撿到木頭。這根看起來很適合當門框。", "木頭 +1。魯魯說這是戰略性樹枝。"],
  food: ["找到食物。魯魯假裝沒有流口水。", "食物 +1。末日料理開始有希望了。"],
  stone: ["搬到石頭。很重，但很有安全感。", "石頭 +1。這顆看起來很會當地基。"],
};

const hints = [
  "先幫魯魯蓋個貓窩吧，村長需要柔軟的思考基地。",
  "小屋可以讓村莊看起來真的有人住。",
  "花圃是末日裡最不講理、也最可愛的東西。",
  "廚房做好後，大家就不只是活著，是在過日子。",
  "溫室會讓村莊開始像一個長期計畫。",
];

const state = loadState();

function defaultState() {
  return {
    day: 1,
    resources: { wood: 4, food: 4, stone: 2 },
    built: [],
    clicks: 0,
  };
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return saved || defaultState();
  } catch {
    return defaultState();
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function canAfford(cost) {
  return Object.entries(cost).every(([key, amount]) => state.resources[key] >= amount);
}

function spend(cost) {
  Object.entries(cost).forEach(([key, amount]) => {
    state.resources[key] -= amount;
  });
}

function setSpeech(text) {
  const speech = document.querySelector("#speech");
  speech.textContent = text;
  speech.animate(
    [{ transform: "translateY(4px)", opacity: 0.7 }, { transform: "translateY(0)", opacity: 1 }],
    { duration: 180, easing: "ease-out" }
  );
}

function render() {
  document.querySelector("#dayCount").textContent = state.day;
  document.querySelector("#woodCount").textContent = state.resources.wood;
  document.querySelector("#foodCount").textContent = state.resources.food;
  document.querySelector("#stoneCount").textContent = state.resources.stone;
  // 地圖上的資源堆顯示數量
  const woodPile = document.querySelector(".wood-pile span");
  const foodPile = document.querySelector(".food-pile span");
  const stonePile = document.querySelector(".stone-pile span");
  if (woodPile) woodPile.textContent = `木${state.resources.wood}`;
  if (foodPile) foodPile.textContent = `食${state.resources.food}`;
  if (stonePile) stonePile.textContent = `石${state.resources.stone}`;
  renderVillageStage();
  Object.keys(buildings).forEach((id) => {
    const built = state.built.includes(id);
    document.querySelectorAll(`[data-building="${id}"]`).forEach((el) => {
      el.classList.toggle("built", built);
      el.classList.toggle("done", built);
      el.disabled = built;
    });
    const card = document.querySelector(`[data-card="${id}"]`);
    if (card) card.classList.toggle("done", built);
  });
}

function renderVillageStage() {
  const builtCount = state.built.length;
  const restorePercent = Math.round((builtCount / Object.keys(buildings).length) * 100);
  const phase = state.day % 3 === 0 ? "night" : state.day % 3 === 2 ? "evening" : "morning";
  const phaseNames = { morning: "晨光期", evening: "黃昏期", night: "星夜期" };
  const village = document.querySelector("#village");
  const wrap = document.querySelector(".village-wrap");
  village.className = `village restore-${builtCount}`;
  wrap.classList.remove("phase-morning", "phase-evening", "phase-night");
  wrap.classList.add(`phase-${phase}`);
  document.querySelector("#phaseName").textContent = `${phaseNames[phase]} · 復興 ${restorePercent}%`;
  document.querySelector("#restorePercent").textContent = `${restorePercent}%`;
  document.querySelector("#restoreFill").style.width = `${restorePercent}%`;
}

function costLabel(cost) {
  const names = { wood: "木頭", food: "食物", stone: "石頭" };
  return Object.entries(cost).map(([key, amount]) => `${names[key]} ${amount}`).join("、");
}

function gather(type, target) {
  state.resources[type] += 1;
  state.clicks += 1;
  if (state.clicks > 0 && state.clicks % 18 === 0) state.day += 1;
  saveState();
  render();
  const texts = gatherText[type];
  setSpeech(texts[Math.floor(Math.random() * texts.length)]);
  floatText("+1", target);
}

function build(id) {
  const item = buildings[id];
  if (state.built.includes(id)) { setSpeech(`${item.name}已經完成了。魯魯正在假裝監工。`); return; }
  if (!canAfford(item.cost)) { setSpeech(`欸，${item.name}還差一點材料。需要：${costLabel(item.cost)}。`); return; }
  spend(item.cost);
  state.built.push(id);
  state.day += 1;
  saveState();
  render();
  setSpeech(item.done);
  document.querySelector("#lulu").animate(
    [
      { transform: "translateX(-50%) rotate(0deg)" },
      { transform: "translateX(-50%) rotate(-8deg)" },
      { transform: "translateX(-50%) rotate(8deg)" },
      { transform: "translateX(-50%) rotate(0deg)" },
    ],
    { duration: 500, easing: "ease-in-out" }
  );
}

function floatText(text, target) {
  const label = document.createElement("span");
  label.className = "float-text";
  label.textContent = text;
  const rect = target.getBoundingClientRect();
  label.style.left = `${rect.left + rect.width / 2}px`;
  label.style.top = `${rect.top}px`;
  document.body.appendChild(label);
  label.animate(
    [{ transform: "translate(-50%,0)", opacity: 1 }, { transform: "translate(-50%,-32px)", opacity: 0 }],
    { duration: 650, easing: "ease-out" }
  ).onfinish = () => label.remove();
}

function showNextHint() {
  const next = Object.keys(buildings).find((id) => !state.built.includes(id));
  if (!next) { setSpeech("村莊第一階段完成！我沒有感動，只是眼睛有點亮亮的。"); return; }
  const index = Math.max(0, Object.keys(buildings).indexOf(next));
  setSpeech(hints[index]);
}

function showShareCard() {
  const count = state.built.length;
  const title = count >= 5 ? "魯魯把廢墟變成家了" : `已完成 ${count}/5 個建築`;
  const quotes = ["好啦，我們來蓋個家。", "末日也要有一個睡午覺的地方。", "今天的村莊，比昨天更像明天。"];
  document.querySelector("#shareDay").textContent = state.day;
  document.querySelector("#shareTitle").textContent = title;
  document.querySelector("#shareQuote").textContent = quotes[count % quotes.length];
  document.querySelector("#shareDialog").showModal();
}

// ===== 答題系統 =====
const QUESTIONS = [
  // 📐 數學
  { s:"📐 數學", q:"23 + 45 = ？", o:["68","58","78","88"], a:0 },
  { s:"📐 數學", q:"72 - 39 = ？", o:["41","33","43","31"], a:1 },
  { s:"📐 數學", q:"6 × 7 = ？", o:["36","48","42","54"], a:2 },
  { s:"📐 數學", q:"56 ÷ 8 = ？", o:["6","9","8","7"], a:3 },
  { s:"📐 數學", q:"100 - 37 = ？", o:["73","53","63","83"], a:2 },
  { s:"📐 數學", q:"9 × 8 = ？", o:["63","81","72","64"], a:2 },
  { s:"📐 數學", q:"一個三角形有幾個角？", o:["2","4","3","5"], a:2 },
  { s:"📐 數學", q:"48 ÷ 6 = ？", o:["6","9","7","8"], a:3 },
  // 📖 語文
  { s:"📖 語文", q:"「高興」的反義詞是？", o:["快樂","開心","難過","興奮"], a:2 },
  { s:"📖 語文", q:"「笑」的反義詞是？", o:["跑","哭","跳","唱"], a:1 },
  { s:"📖 語文", q:"「美麗」的同義詞是？", o:["醜陋","普通","漂亮","平凡"], a:2 },
  { s:"📖 語文", q:"「一石二鳥」是什麼意思？", o:["丟石頭打鳥","一次解決兩件事","石頭比鳥重要","兩隻鳥在石頭上"], a:1 },
  { s:"📖 語文", q:"下面哪個字是「木」字旁？", o:["海","明","桌","說"], a:2 },
  { s:"📖 語文", q:"「太陽」的注音第一個字是？", o:["ㄉ","ㄊ","ㄋ","ㄌ"], a:1 },
  { s:"📖 語文", q:"「勇敢」的反義詞是？", o:["開心","害怕","聰明","活潑"], a:1 },
  { s:"📖 語文", q:"下面哪個詞形容天氣晴朗？", o:["烏雲密布","狂風暴雨","晴空萬里","大雪紛飛"], a:2 },
  // 🌌 天文
  { s:"🌌 天文", q:"太陽系最大的行星是？", o:["土星","火星","木星","天王星"], a:2 },
  { s:"🌌 天文", q:"地球繞太陽一圈要多久？", o:["一個月","一週","一天","一年"], a:3 },
  { s:"🌌 天文", q:"月亮繞地球一圈約要多久？", o:["一年","一天","一個月","一週"], a:2 },
  { s:"🌌 天文", q:"太陽系有幾顆行星？", o:["9","6","10","8"], a:3 },
  { s:"🌌 天文", q:"北極星指向哪個方向？", o:["南","東","西","北"], a:3 },
  { s:"🌌 天文", q:"最靠近太陽的行星是？", o:["金星","地球","火星","水星"], a:3 },
  { s:"🌌 天文", q:"地球是太陽系第幾顆行星？", o:["第一","第二","第四","第三"], a:3 },
  // 🌍 地理
  { s:"🌍 地理", q:"台灣最高的山是？", o:["阿里山","合歡山","玉山","雪山"], a:2 },
  { s:"🌍 地理", q:"台灣的首都是？", o:["台中","高雄","台南","台北"], a:3 },
  { s:"🌍 地理", q:"世界最高的山是？", o:["富士山","聖母峰","阿爾卑斯山","玉山"], a:1 },
  { s:"🌍 地理", q:"日本的首都是？", o:["大阪","京都","北海道","東京"], a:3 },
  { s:"🌍 地理", q:"台灣四面環什麼？", o:["山","沙漠","平原","海洋"], a:3 },
  { s:"🌍 地理", q:"世界上最大的洲是？", o:["歐洲","非洲","美洲","亞洲"], a:3 },
  { s:"🌍 地理", q:"台灣最長的河流是？", o:["淡水河","高屏溪","濁水溪","大甲溪"], a:2 },
  // 🌿 自然
  { s:"🌿 自然", q:"植物進行光合作用需要什麼？", o:["泥土和風","月光和雨水","陽光和水","石頭和空氣"], a:2 },
  { s:"🌿 自然", q:"毛毛蟲長大後會變成？", o:["蜜蜂","蚱蜢","蜘蛛","蝴蝶"], a:3 },
  { s:"🌿 自然", q:"水在幾度C會結冰？", o:["10度","0度","-10度","100度"], a:1 },
  { s:"🌿 自然", q:"蜜蜂採什麼來做蜂蜜？", o:["樹葉","花蜜","果汁","露水"], a:1 },
  { s:"🌿 自然", q:"人體最硬的部位是？", o:["骨頭","指甲","牙齒","頭髮"], a:2 },
  { s:"🌿 自然", q:"下面哪種動物會飛？", o:["企鵝","鴕鳥","蝙蝠","海豚"], a:2 },
  // 🏛️ 社會與節日
  { s:"🏛️ 社會", q:"中秋節吃什麼？", o:["粽子","湯圓","月餅","元宵"], a:2 },
  { s:"🏛️ 社會", q:"端午節吃什麼？", o:["月餅","湯圓","粽子","年糕"], a:2 },
  { s:"🏛️ 社會", q:"元宵節吃什麼？", o:["粽子","湯圓","月餅","年糕"], a:1 },
  { s:"🏛️ 社會", q:"台灣的國花是？", o:["玫瑰","蓮花","梅花","菊花"], a:2 },
  { s:"🏛️ 社會", q:"台灣國慶日是幾月幾日？", o:["1月1日","10月10日","10月1日","9月9日"], a:1 },
  { s:"🏛️ 社會", q:"一週有幾天？", o:["5天","6天","8天","7天"], a:3 },
  // 🧹 實作技能
  { s:"🧹 生活技能", q:"洗手要搓幾秒才夠乾淨？", o:["5秒","10秒","30秒","20秒以上"], a:3 },
  { s:"🧹 生活技能", q:"吃飯前要做什麼？", o:["看電視","玩遊戲","洗手","喝飲料"], a:2 },
  { s:"🧹 生活技能", q:"垃圾應該丟在哪裡？", o:["地上","路邊","水溝","垃圾桶"], a:3 },
  { s:"🧹 生活技能", q:"睡覺前一定要做什麼？", o:["吃零食","刷牙","看手機","喝可樂"], a:1 },
  // 🤝 品德與禮貌
  { s:"🤝 品德", q:"同學跌倒了，你應該？", o:["笑他","走開","扶起來問他還好嗎","假裝沒看到"], a:2 },
  { s:"🤝 品德", q:"長輩說話時，你應該？", o:["插嘴","玩手機","安靜聆聽","去睡覺"], a:2 },
  { s:"🤝 品德", q:"借別人的東西用完後要？", o:["留著用","扔掉","還回去並說謝謝","忘記還"], a:2 },
  { s:"🤝 品德", q:"在公共場所應該？", o:["大聲喧嘩","亂丟垃圾","保持安靜不吵鬧","推擠別人"], a:2 },
];

const quizState = { q: null, attempts: 0, type: null, target: null };
const quizDialog = document.querySelector("#quizDialog");

function showQuiz(type, target) {
  quizState.type = type;
  quizState.target = target;
  quizState.attempts = 0;
  quizState.q = QUESTIONS[Math.floor(Math.random() * QUESTIONS.length)];
  renderQuiz();
  quizDialog.showModal();
}

function renderQuiz() {
  const q = quizState.q;
  document.querySelector("#quizSubject").textContent = q.s;
  document.querySelector("#quizQuestion").textContent = q.q;
  document.querySelector("#quizAttemptsLeft").textContent = 3 - quizState.attempts;
  document.querySelector("#quizFeedback").textContent = "";
  const opts = document.querySelector("#quizOptions");
  opts.innerHTML = "";
  q.o.forEach((text, i) => {
    const btn = document.createElement("button");
    btn.textContent = text;
    btn.onclick = () => handleAnswer(i, btn);
    opts.appendChild(btn);
  });
}

function handleAnswer(i, btn) {
  const q = quizState.q;
  const fb = document.querySelector("#quizFeedback");
  if (i === q.a) {
    btn.classList.add("correct");
    fb.style.color = "#4d7f45";
    fb.textContent = "✅ 答對了！資源 +3";
    document.querySelector("#quizOptions").querySelectorAll("button").forEach(b => b.disabled = true);
    setTimeout(() => {
      quizDialog.close();
      gather(quizState.type, quizState.target);
      gather(quizState.type, quizState.target);
      gather(quizState.type, quizState.target);
    }, 900);
  } else {
    btn.classList.add("wrong");
    quizState.attempts++;
    const left = 3 - quizState.attempts;
    document.querySelector("#quizAttemptsLeft").textContent = left;
    if (left <= 0) {
      fb.style.color = "#c94f35";
      fb.textContent = "💬 沒關係，去問爸媽或老師！";
      document.querySelector("#quizOptions").querySelectorAll("button").forEach(b => b.disabled = true);
      setTimeout(() => quizDialog.close(), 1800);
    } else {
      fb.style.color = "#c94f35";
      fb.textContent = `❌ 再想想，還有 ${left} 次機會`;
    }
  }
}

document.querySelectorAll("[data-gather]").forEach((button) => {
  button.addEventListener("click", () => showQuiz(button.dataset.gather, button));
});
document.querySelectorAll("[data-building]").forEach((button) => {
  button.addEventListener("click", () => build(button.dataset.building));
});

// 手機版按鈕
document.querySelectorAll(".mgather").forEach((button) => {
  button.addEventListener("click", () => showQuiz(button.dataset.gather, button));
});
document.querySelectorAll(".mplot").forEach((button) => {
  button.addEventListener("click", () => build(button.dataset.building));
});
document.querySelector("#nextHint").addEventListener("click", showNextHint);
document.querySelector("#shareCard").addEventListener("click", showShareCard);
document.querySelector("#resetGame").addEventListener("click", () => {
  localStorage.removeItem(STORAGE_KEY);
  Object.assign(state, defaultState());
  saveState();
  render();
  setSpeech("村莊重置好了。魯魯假裝這一切都在計畫內。");
});

render();

// 作弊按鈕（點魯魯5下觸發）
let luluTaps = 0;
document.querySelector("#lulu").addEventListener("click", () => {
  luluTaps++;
  if (luluTaps >= 5) {
    luluTaps = 0;
    state.resources.wood += 50;
    state.resources.food += 50;
    state.resources.stone += 50;
    saveState();
    render();
    setSpeech("⋯魯魯假裝不知道你剛才做了什麼。（資源+50）");
  }
});

const style = document.createElement("style");
style.textContent = `.float-text { position: fixed; z-index: 10; pointer-events: none; color: #263238; font-weight: 900; text-shadow: 0 1px 0 #fffdf7; }`;
document.head.appendChild(style);
