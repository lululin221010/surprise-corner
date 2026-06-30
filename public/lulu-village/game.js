const STORAGE_KEY = "lulu-village-v2";

const buildings = {
  bed:        { name: "魯魯貓窩", steps: 15, emoji: "🐱", done: "貓窩完成！這是村莊的公共柔軟設施。" },
  garden:     { name: "花圃",     steps: 20, emoji: "🌸", done: "花圃完成！廢墟長花了，我們贏一點點。" },
  kitchen:    { name: "廚房",     steps: 25, emoji: "🍳", done: "廚房完成！從今天起不只是活著，是在過日子。" },
  greenhouse: { name: "溫室",     steps: 30, emoji: "🌿", done: "溫室完成！末日也要有新鮮葉子，這很合理。" },
  home:       { name: "小屋",     steps: 35, emoji: "🏠", done: "小屋完成！村莊終於有人住的感覺了。" },
};


const hints = [
  "最簡單的先蓋貓窩（15步），給魯魯一個家！",
  "花圃只要20步，末日也要有花。",
  "廚房25步，蓋好就有飯香。",
  "溫室30步，末日農業基地。",
  "小屋35步，最難但最有成就感！",
];

function defaultState() {
  return {
    day: 1,
    built: [],
    progress: { home: 0, kitchen: 0, greenhouse: 0, garden: 0, bed: 0 },
    clicks: 0,
  };
}

// 魯魯幣
const COIN_KEY = "lulu-village-coin";
function getLuluCoin() {
  const c = localStorage.getItem(COIN_KEY);
  if (!c) { localStorage.setItem(COIN_KEY, "100000"); return 100000; }
  return parseInt(c);
}
function renderCoin() {
  const el = document.querySelector("#luluCoin");
  if (el) el.textContent = getLuluCoin().toLocaleString();
}

// 公共基金
const FUND_KEY = "lulu-village-public-fund";
const FUND_MILESTONES = [
  { id: "park",    name: "公園",   amount: 10000,  emoji: "🌳" },
  { id: "library", name: "圖書館", amount: 30000,  emoji: "📚" },
  { id: "school",  name: "學校",   amount: 60000,  emoji: "🏫" },
  { id: "clinic",  name: "診所",   amount: 100000, emoji: "🏥" },
];
function getFund() { return parseInt(localStorage.getItem(FUND_KEY) || "0"); }
function setFund(v) { localStorage.setItem(FUND_KEY, String(v)); }
function renderFund() {
  const fund = getFund();
  document.querySelector("#pfAmount").textContent = fund.toLocaleString();
  const next = FUND_MILESTONES.find(m => fund < m.amount);
  if (next) {
    document.querySelector("#pfNextBuilding").textContent = next.emoji + " " + next.name;
    document.querySelector("#pfLeft").textContent = (next.amount - fund).toLocaleString();
  } else {
    document.querySelector("#pfNextBuilding").textContent = "全部完成！";
    document.querySelector("#pfLeft").textContent = "0";
  }
  FUND_MILESTONES.forEach(m => {
    const el = document.querySelector(`#dm-${m.id}`);
    if (el) el.classList.toggle("unlocked", fund >= m.amount);
  });
}

// 捐款介面
const donateOverlay = document.querySelector("#donateOverlay");
document.querySelector("#donateBtn").addEventListener("click", () => {
  document.querySelector("#donateCurrentCoin").textContent = getLuluCoin().toLocaleString();
  document.querySelector("#donateAmount").value = "";
  document.querySelector("#donateFeedback").textContent = "";
  renderFund();
  donateOverlay.style.display = "flex";
});
document.querySelector("#donateClose").addEventListener("click", () => {
  donateOverlay.style.display = "none";
});
const DONATE_DATE_KEY = "lulu-village-donate-date";
function todayStr() { return new Date().toISOString().slice(0, 10); }
function hasDonatedToday() { return localStorage.getItem(DONATE_DATE_KEY) === todayStr(); }

document.querySelector("#donateConfirm").addEventListener("click", () => {
  const amt = parseInt(document.querySelector("#donateAmount").value);
  const coin = getLuluCoin();
  const fb = document.querySelector("#donateFeedback");
  if (hasDonatedToday()) {
    fb.style.color = "#c47d10";
    fb.textContent = "感謝您的愛心！期待您明日的捐款 🙏";
    return;
  }
  if (!amt || amt <= 0) { fb.style.color = "#c0392b"; fb.textContent = "請輸入捐款金額！"; return; }
  if (amt > coin) { fb.style.color = "#c0392b"; fb.textContent = "魯魯幣不夠啦！"; return; }
  localStorage.setItem(COIN_KEY, String(coin - amt));
  setFund(getFund() + amt);
  localStorage.setItem(DONATE_DATE_KEY, todayStr());
  renderCoin();
  renderFund();
  document.querySelector("#donateCurrentCoin").textContent = getLuluCoin().toLocaleString();
  document.querySelector("#donateAmount").value = "";
  const unlocked = FUND_MILESTONES.find(m => getFund() >= m.amount && (getFund() - amt) < m.amount);
  if (unlocked) {
    fb.style.color = "#2d6020";
    fb.textContent = `🎉 ${unlocked.emoji} ${unlocked.name}蓋好了！全村共享！`;
    setSpeech(`村莊的${unlocked.name}蓋好了！大家一起來！`);
  } else {
    fb.style.color = "#2d6020";
    fb.textContent = `✅ 捐出 ${amt.toLocaleString()} 魯魯幣，謝謝你！`;
  }
});

const state = loadState();

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved && saved.progress) return saved;
    return defaultState();
  } catch { return defaultState(); }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

const IDLE_SPEECHES = {
  0:  [ "你終於回來了，我才沒有等你喔。", "村莊很荒涼，但魯魯不怕。", "點一棟建築開始答題吧！" ],
  1:  [ "有一點點進展了！魯魯很欣慰。", "繼續！每答對一題建築就長高一點。", "你還不賴嘛，繼續蓋！" ],
  2:  [ "兩棟完成了，村莊開始有點感覺！", "魯魯聞到廚房的香味了嗎？", "你的手好快，繼續蓋！" ],
  3:  [ "三棟了！村莊越來越熱鬧。", "魯魯決定不再叫這裡廢墟了。", "一半了！你比魯魯想像的更努力。" ],
  4:  [ "只差最後一棟！魯魯有點激動。", "加油！村莊快要復興了！", "你快做到了！魯魯在這裡等你。" ],
  5:  [ "村莊復興了！魯魯哭了，但不承認。", "你做到了，這裡是我們的家。", "謝謝你把村莊蓋好，魯魯愛你。" ],
};

function updateIdleSpeech() {
  const builtCount = state.built.length;
  const lines = IDLE_SPEECHES[builtCount] || IDLE_SPEECHES[0];
  setSpeech(lines[Math.floor(Math.random() * lines.length)]);
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
  renderCoin();
  renderFund();
  renderVillageStage();

  Object.keys(buildings).forEach((id) => {
    const b = buildings[id];
    const prog = state.progress[id] || 0;
    const done = state.built.includes(id);

    // 地圖上的建築
    document.querySelectorAll(`.plot[data-building="${id}"]`).forEach((el) => {
      el.classList.toggle("built", done);
      el.classList.toggle("in-progress", !done && prog > 0);
      el.disabled = done;

      const img = el.querySelector(".building-icon img");
      if (img) {
        if (done) {
          img.style.clipPath = "inset(0 0 0 0)";
          img.style.display = "block";
        } else if (prog > 0) {
          const hideTop = Math.round((1 - prog / b.steps) * 100);
          img.style.clipPath = `inset(${hideTop}% 0 0 0)`;
          img.style.display = "block";
        } else {
          img.style.display = "none";
        }
      }

      const label = el.querySelector(".plot-label");
      if (label) {
        if (done) label.textContent = `✅ ${b.name}`;
        else if (prog > 0) label.textContent = `🔨 ${prog}/${b.steps}`;
        else label.textContent = `${b.emoji} ${b.name}`;
      }
    });

    // 手機版按鈕
    document.querySelectorAll(`.mplot[data-building="${id}"]`).forEach((el) => {
      el.classList.toggle("done", done);
      el.disabled = done;
      const small = el.querySelector("small");
      if (small) small.textContent = done ? "✅ 完成" : `${prog}／${b.steps} 步`;
    });

    // 建築卡片
    const card = document.querySelector(`[data-card="${id}"]`);
    if (card) {
      card.classList.toggle("done", done);
      const span = document.querySelector(`#card-prog-${id}`);
      if (span) span.textContent = prog;
      const p = card.querySelector("p");
      if (p && done) p.textContent = "✅ 完成！";
    }
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


function startBuild(id) {
  if (state.built.includes(id)) {
    setSpeech(`${buildings[id].name}已經完成了。魯魯正在假裝監工。`);
    return;
  }
  quizState.mode = "build";
  quizState.buildId = id;
  showQuiz();
}

function completeBuildStep(id) {
  state.progress[id] = (state.progress[id] || 0) + 1;
  const b = buildings[id];
  const prog = state.progress[id];
  if (prog >= b.steps) {
    state.built.push(id);
    state.day += 1;
    saveState();
    render();
    setSpeech(b.done);
    setTimeout(updateIdleSpeech, 3000);
    document.querySelector("#lulu").animate(
      [{ transform: "translateX(-50%) rotate(0deg)" },
       { transform: "translateX(-50%) rotate(-8deg)" },
       { transform: "translateX(-50%) rotate(8deg)" },
       { transform: "translateX(-50%) rotate(0deg)" }],
      { duration: 500, easing: "ease-in-out" }
    );
  } else {
    saveState();
    render();
    const left = b.steps - prog;
    setSpeech(`${b.name} 進度 ${prog}/${b.steps}！還差 ${left} 步就完成了。`);
  }
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
  if (!next) { setSpeech("村莊第一階段完成！魯魯的眼睛有點亮亮的。"); return; }
  const b = buildings[next];
  const prog = state.progress[next] || 0;
  if (prog > 0) setSpeech(`繼續蓋${b.name}！已完成 ${prog}/${b.steps} 步，點它繼續答題。`);
  else setSpeech(hints[Object.keys(buildings).indexOf(next)] || `下一個目標：${b.name}`);
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
  { s:"📐 數學", q:"23 + 45 = ？", o:["68","58","78","88"], a:0 },
  { s:"📐 數學", q:"72 - 39 = ？", o:["41","33","43","31"], a:1 },
  { s:"📐 數學", q:"6 × 7 = ？", o:["36","48","42","54"], a:2 },
  { s:"📐 數學", q:"56 ÷ 8 = ？", o:["6","9","8","7"], a:3 },
  { s:"📐 數學", q:"100 - 37 = ？", o:["73","53","63","83"], a:2 },
  { s:"📐 數學", q:"9 × 8 = ？", o:["63","81","72","64"], a:2 },
  { s:"📐 數學", q:"一個三角形有幾個角？", o:["2","4","3","5"], a:2 },
  { s:"📐 數學", q:"48 ÷ 6 = ？", o:["6","9","7","8"], a:3 },
  { s:"📖 語文", q:"「高興」的反義詞是？", o:["快樂","開心","難過","興奮"], a:2 },
  { s:"📖 語文", q:"「笑」的反義詞是？", o:["跑","哭","跳","唱"], a:1 },
  { s:"📖 語文", q:"「美麗」的同義詞是？", o:["醜陋","普通","漂亮","平凡"], a:2 },
  { s:"📖 語文", q:"「一石二鳥」是什麼意思？", o:["丟石頭打鳥","一次解決兩件事","石頭比鳥重要","兩隻鳥在石頭上"], a:1 },
  { s:"📖 語文", q:"下面哪個字是「木」字旁？", o:["海","明","桌","說"], a:2 },
  { s:"📖 語文", q:"「太陽」的注音第一個字是？", o:["ㄉ","ㄊ","ㄋ","ㄌ"], a:1 },
  { s:"📖 語文", q:"「勇敢」的反義詞是？", o:["開心","害怕","聰明","活潑"], a:1 },
  { s:"📖 語文", q:"下面哪個詞形容天氣晴朗？", o:["烏雲密布","狂風暴雨","晴空萬里","大雪紛飛"], a:2 },
  { s:"🌌 天文", q:"太陽系最大的行星是？", o:["土星","火星","木星","天王星"], a:2 },
  { s:"🌌 天文", q:"地球繞太陽一圈要多久？", o:["一個月","一週","一天","一年"], a:3 },
  { s:"🌌 天文", q:"月亮繞地球一圈約要多久？", o:["一年","一天","一個月","一週"], a:2 },
  { s:"🌌 天文", q:"太陽系有幾顆行星？", o:["9","6","10","8"], a:3 },
  { s:"🌌 天文", q:"北極星指向哪個方向？", o:["南","東","西","北"], a:3 },
  { s:"🌌 天文", q:"最靠近太陽的行星是？", o:["金星","地球","火星","水星"], a:3 },
  { s:"🌌 天文", q:"地球是太陽系第幾顆行星？", o:["第一","第二","第四","第三"], a:3 },
  { s:"🌍 地理", q:"台灣最高的山是？", o:["阿里山","合歡山","玉山","雪山"], a:2 },
  { s:"🌍 地理", q:"台灣的首都是？", o:["台中","高雄","台南","台北"], a:3 },
  { s:"🌍 地理", q:"世界最高的山是？", o:["富士山","聖母峰","阿爾卑斯山","玉山"], a:1 },
  { s:"🌍 地理", q:"日本的首都是？", o:["大阪","京都","北海道","東京"], a:3 },
  { s:"🌍 地理", q:"台灣四面環什麼？", o:["山","沙漠","平原","海洋"], a:3 },
  { s:"🌍 地理", q:"世界上最大的洲是？", o:["歐洲","非洲","美洲","亞洲"], a:3 },
  { s:"🌍 地理", q:"台灣最長的河流是？", o:["淡水河","高屏溪","濁水溪","大甲溪"], a:2 },
  { s:"🌿 自然", q:"植物進行光合作用需要什麼？", o:["泥土和風","月光和雨水","陽光和水","石頭和空氣"], a:2 },
  { s:"🌿 自然", q:"毛毛蟲長大後會變成？", o:["蜜蜂","蚱蜢","蜘蛛","蝴蝶"], a:3 },
  { s:"🌿 自然", q:"水在幾度C會結冰？", o:["10度","0度","-10度","100度"], a:1 },
  { s:"🌿 自然", q:"蜜蜂採什麼來做蜂蜜？", o:["樹葉","花蜜","果汁","露水"], a:1 },
  { s:"🌿 自然", q:"人體最硬的部位是？", o:["骨頭","指甲","牙齒","頭髮"], a:2 },
  { s:"🌿 自然", q:"下面哪種動物會飛？", o:["企鵝","鴕鳥","蝙蝠","海豚"], a:2 },
  { s:"🏛️ 社會", q:"中秋節吃什麼？", o:["粽子","湯圓","月餅","元宵"], a:2 },
  { s:"🏛️ 社會", q:"端午節吃什麼？", o:["月餅","湯圓","粽子","年糕"], a:2 },
  { s:"🏛️ 社會", q:"元宵節吃什麼？", o:["粽子","湯圓","月餅","年糕"], a:1 },
  { s:"🏛️ 社會", q:"台灣的國花是？", o:["玫瑰","蓮花","梅花","菊花"], a:2 },
  { s:"🏛️ 社會", q:"台灣國慶日是幾月幾日？", o:["1月1日","10月10日","10月1日","9月9日"], a:1 },
  { s:"🏛️ 社會", q:"一週有幾天？", o:["5天","6天","8天","7天"], a:3 },
  { s:"🧹 生活", q:"洗手要搓幾秒才夠乾淨？", o:["5秒","10秒","30秒","20秒以上"], a:3 },
  { s:"🧹 生活", q:"吃飯前要做什麼？", o:["看電視","玩遊戲","洗手","喝飲料"], a:2 },
  { s:"🧹 生活", q:"垃圾應該丟在哪裡？", o:["地上","路邊","水溝","垃圾桶"], a:3 },
  { s:"🧹 生活", q:"睡覺前一定要做什麼？", o:["吃零食","刷牙","看手機","喝可樂"], a:1 },
  { s:"🤝 品德", q:"同學跌倒了，你應該？", o:["笑他","走開","扶起來問他還好嗎","假裝沒看到"], a:2 },
  { s:"🤝 品德", q:"長輩說話時，你應該？", o:["插嘴","玩手機","安靜聆聽","去睡覺"], a:2 },
  { s:"🤝 品德", q:"借別人的東西用完後要？", o:["留著用","扔掉","還回去並說謝謝","忘記還"], a:2 },
  { s:"🤝 品德", q:"在公共場所應該？", o:["大聲喧嘩","亂丟垃圾","保持安靜不吵鬧","推擠別人"], a:2 },
];

const quizState = { q: null, attempts: 0, mode: "build", buildId: null };
const quizOverlay = document.querySelector("#quizOverlay");

function showQuiz() {
  quizState.attempts = 0;
  quizState.q = QUESTIONS[Math.floor(Math.random() * QUESTIONS.length)];
  renderQuiz();
  quizOverlay.style.display = "flex";
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
  // 顯示建築進度提示
  if (quizState.mode === "build" && quizState.buildId) {
    const id = quizState.buildId;
    const b = buildings[id];
    const prog = state.progress[id] || 0;
    const left = b.steps - prog;
    document.querySelector("#quizBuildHint").textContent =
      `🔨 ${b.name}：已完成 ${prog} 步，還差 ${left} 步蓋好！`;
  }
}

function handleAnswer(i, btn) {
  const q = quizState.q;
  const fb = document.querySelector("#quizFeedback");
  document.querySelector("#quizOptions").querySelectorAll("button").forEach(b => b.disabled = true);

  if (i === q.a) {
    btn.classList.add("correct");
    fb.style.color = "#4d7f45";
    fb.textContent = "✅ 答對了！建築進步一步！";
    setTimeout(() => {
      quizOverlay.style.display = "none";
      completeBuildStep(quizState.buildId);
    }, 900);
  } else {
    btn.classList.add("wrong");
    quizState.attempts++;
    const left = 3 - quizState.attempts;
    document.querySelector("#quizAttemptsLeft").textContent = left;
    if (left <= 0) {
      fb.style.color = "#c94f35";
      fb.textContent = "💬 沒關係，去問爸媽或老師！";
      setTimeout(() => { quizOverlay.style.display = "none"; }, 1800);
    } else {
      fb.style.color = "#c94f35";
      fb.textContent = `❌ 再想想，還有 ${left} 次機會`;
      document.querySelector("#quizOptions").querySelectorAll("button").forEach(b => b.disabled = false);
      btn.disabled = true;
    }
  }
}

function skipQuestion() {
  const total = state.resources.wood + state.resources.food + state.resources.stone;
  if (total <= 0) return;
  if (state.resources.wood > 0) state.resources.wood--;
  else if (state.resources.food > 0) state.resources.food--;
  else state.resources.stone--;
  saveState();
  quizOverlay.style.display = "none";
  completeBuildStep(quizState.buildId);
  setSpeech("用資源跳過了一題，建築繼續！");
}

// 事件綁定
document.querySelectorAll(".plot[data-building]").forEach((button) => {
  button.addEventListener("click", () => startBuild(button.dataset.building));
});
document.querySelectorAll(".mplot").forEach((button) => {
  button.addEventListener("click", () => startBuild(button.dataset.building));
});

document.querySelector("#nextHint").addEventListener("click", showNextHint);
document.querySelector("#shareCard").addEventListener("click", showShareCard);
document.querySelector("#resetGame").addEventListener("click", () => {
  if (!confirm("確定要破產重建嗎？建築進度歸零，但魯魯幣不變。")) return;
  const coin = localStorage.getItem(COIN_KEY); // 保留魯魯幣
  localStorage.removeItem(STORAGE_KEY);
  Object.assign(state, defaultState());
  saveState();
  if (coin) localStorage.setItem(COIN_KEY, coin); // 還原魯魯幣
  render();
  setSpeech("破產了也沒關係，魯魯幣還在，重新蓋過！");
});
// 教學說明
const tutorialOverlay = document.querySelector("#tutorialOverlay");
const TUTORIAL_KEY = "lulu-village-tutorial-seen";
if (!localStorage.getItem(TUTORIAL_KEY)) {
  tutorialOverlay.style.display = "flex";
}
document.querySelector("#tutorialClose").addEventListener("click", () => {
  tutorialOverlay.style.display = "none";
  localStorage.setItem(TUTORIAL_KEY, "1");
});
document.querySelector("#helpBtn").addEventListener("click", () => {
  const isOpen = tutorialOverlay.style.display !== "none";
  tutorialOverlay.style.display = isOpen ? "none" : "flex";
});

render();
updateIdleSpeech();

// 作弊：點魯魯5下
let luluTaps = 0;
document.querySelector("#lulu").addEventListener("click", () => {
  luluTaps++;
  if (luluTaps >= 5) {
    luluTaps = 0;
    state.resources.wood += 10;
    state.resources.food += 10;
    state.resources.stone += 10;
    saveState();
    render();
    setSpeech("⋯魯魯假裝不知道你剛才做了什麼。（跳過券+30）");
  }
});

const style = document.createElement("style");
style.textContent = `.float-text { position: fixed; z-index: 10; pointer-events: none; color: #263238; font-weight: 900; text-shadow: 0 1px 0 #fffdf7; font-size:.85rem; }`;
document.head.appendChild(style);
