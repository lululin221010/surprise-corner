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
  renderVillageStage();
  Object.keys(buildings).forEach((id) => {
    const built = state.built.includes(id);
    const plot = document.querySelector(`[data-building="${id}"]`);
    const card = document.querySelector(`[data-card="${id}"]`);
    plot.classList.toggle("built", built);
    card.classList.toggle("done", built);
    plot.disabled = built;
    plot.title = built ? `${buildings[id].name}已完成` : costLabel(buildings[id].cost);
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

document.querySelectorAll("[data-gather]").forEach((button) => {
  button.addEventListener("click", () => gather(button.dataset.gather, button));
});
document.querySelectorAll("[data-building]").forEach((button) => {
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
