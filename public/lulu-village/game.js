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

// 玩家貓設定
const PLAYER_CAT_KEY = "lulu-village-player-cat";
function getPlayerCat() {
  try { return JSON.parse(localStorage.getItem(PLAYER_CAT_KEY)); } catch { return null; }
}
function savePlayerCat(emoji, name) {
  localStorage.setItem(PLAYER_CAT_KEY, JSON.stringify({ emoji, name }));
}
function renderPlayerVillager() {
  const p = getPlayerCat();
  document.querySelector("#playerVillager")?.remove();
  if (!p) return;
  const el = document.createElement("div");
  el.id = "playerVillager";
  el.className = "player-villager";
  el.setAttribute("data-name", p.name + "（你）");
  el.textContent = p.emoji;
  el.title = p.name;
  document.querySelector("#village").appendChild(el);
}

// 選貓介面
const catSelectOverlay = document.querySelector("#catSelectOverlay");
let selectedCat = "";
document.querySelectorAll(".cat-opt").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".cat-opt").forEach(b => b.classList.remove("selected"));
    btn.classList.add("selected");
    selectedCat = btn.dataset.cat;
    updateCatPreview();
  });
});
document.querySelector("#catNameInput").addEventListener("input", updateCatPreview);
function updateCatPreview() {
  const name = document.querySelector("#catNameInput").value.trim();
  const ok = selectedCat && name;
  document.querySelector("#catSelectConfirm").disabled = !ok;
  document.querySelector("#catPreview").textContent = ok ? `${selectedCat} ${name}` : "選一隻貓再輸入名字 ↑";
}
document.querySelector("#catSelectConfirm").addEventListener("click", () => {
  const name = document.querySelector("#catNameInput").value.trim();
  if (!selectedCat || !name) return;
  savePlayerCat(selectedCat, name);
  catSelectOverlay.style.display = "none";
  renderPlayerVillager();
  setSpeech(`歡迎 ${name} 加入魯魯村！`);
  // 若是第一次，接著顯示教學
  if (!localStorage.getItem(TUTORIAL_KEY)) {
    setTimeout(() => { tutorialOverlay.style.display = "flex"; }, 800);
  }
});

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
    // 新居落成
    if (id === "home") {
      setTimeout(() => {
        document.querySelector("#housewarmingOverlay").style.display = "flex";
      }, 1200);
    }
    // 全村復興
    if (state.built.length === Object.keys(buildings).length) {
      setTimeout(() => {
        const fund = getFund();
        document.querySelector("#celebStats").innerHTML =
          `<span>🏠 5棟完工</span><span>🪙 魯魯幣 ${getLuluCoin().toLocaleString()}</span><span>🏛️ 公共基金 ${fund.toLocaleString()}</span>`;
        document.querySelector("#villageCompleteOverlay").style.display = "flex";
      }, 2500);
    }
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
  // ── 📐 數學 ──
  { s:"📐 數學", q:"23 + 45 = ？", o:["68","58","78","88"], a:0 },
  { s:"📐 數學", q:"72 - 39 = ？", o:["41","33","43","31"], a:1 },
  { s:"📐 數學", q:"6 × 7 = ？", o:["36","48","42","54"], a:2 },
  { s:"📐 數學", q:"56 ÷ 8 = ？", o:["6","9","8","7"], a:3 },
  { s:"📐 數學", q:"100 - 37 = ？", o:["73","53","63","83"], a:2 },
  { s:"📐 數學", q:"9 × 8 = ？", o:["63","81","72","64"], a:2 },
  { s:"📐 數學", q:"一個三角形有幾個角？", o:["2","4","3","5"], a:2 },
  { s:"📐 數學", q:"48 ÷ 6 = ？", o:["6","9","7","8"], a:3 },
  { s:"📐 數學", q:"15 + 28 = ？", o:["33","43","53","41"], a:1 },
  { s:"📐 數學", q:"7 × 9 = ？", o:["56","63","72","54"], a:1 },
  { s:"📐 數學", q:"81 ÷ 9 = ？", o:["7","8","9","10"], a:2 },
  { s:"📐 數學", q:"一個正方形有幾個邊？", o:["3","5","6","4"], a:3 },
  { s:"📐 數學", q:"125 + 75 = ？", o:["190","200","210","195"], a:1 },
  { s:"📐 數學", q:"64 ÷ 8 = ？", o:["6","7","8","9"], a:2 },
  { s:"📐 數學", q:"12 × 12 = ？", o:["132","124","144","148"], a:2 },
  { s:"📐 數學", q:"200 - 86 = ？", o:["104","114","124","134"], a:1 },
  { s:"📐 數學", q:"一打有幾個？", o:["6個","10個","12個","24個"], a:2 },
  { s:"📐 數學", q:"半小時等於幾分鐘？", o:["15分","20分","30分","45分"], a:2 },
  { s:"📐 數學", q:"3 × 3 × 3 = ？", o:["9","18","27","36"], a:2 },
  { s:"📐 數學", q:"999 + 1 = ？", o:["1000","999","1001","9991"], a:0 },
  { s:"📐 數學", q:"一個圓形有幾個角？", o:["1","2","4","0"], a:3 },
  { s:"📐 數學", q:"5 的平方是？", o:["10","20","25","30"], a:2 },
  { s:"📐 數學", q:"4 × 25 = ？", o:["80","90","100","110"], a:2 },
  { s:"📐 數學", q:"36 ÷ 4 = ？", o:["7","8","9","10"], a:2 },
  { s:"📐 數學", q:"1000 - 1 = ？", o:["991","998","999","997"], a:2 },

  // ── 📖 語文 ──
  { s:"📖 語文", q:"「高興」的反義詞是？", o:["快樂","開心","難過","興奮"], a:2 },
  { s:"📖 語文", q:"「笑」的反義詞是？", o:["跑","哭","跳","唱"], a:1 },
  { s:"📖 語文", q:"「美麗」的同義詞是？", o:["醜陋","普通","漂亮","平凡"], a:2 },
  { s:"📖 語文", q:"「一石二鳥」是什麼意思？", o:["丟石頭打鳥","一次解決兩件事","石頭比鳥重要","兩隻鳥在石頭上"], a:1 },
  { s:"📖 語文", q:"下面哪個字是「木」字旁？", o:["海","明","桌","說"], a:2 },
  { s:"📖 語文", q:"「太陽」的注音第一個字是？", o:["ㄉ","ㄊ","ㄋ","ㄌ"], a:1 },
  { s:"📖 語文", q:"「勇敢」的反義詞是？", o:["開心","害怕","聰明","活潑"], a:1 },
  { s:"📖 語文", q:"下面哪個詞形容天氣晴朗？", o:["烏雲密布","狂風暴雨","晴空萬里","大雪紛飛"], a:2 },
  { s:"📖 語文", q:"「半途而廢」的意思是？", o:["做完一半很好","做到一半就放棄","走了一半的路","廢棄東西"], a:1 },
  { s:"📖 語文", q:"「風和日麗」形容什麼？", o:["颱風天","天氣好","下雨天","冷天"], a:1 },
  { s:"📖 語文", q:"「快」字的注音是哪一個？", o:["ㄑㄧㄠ","ㄎㄨㄞ","ㄍㄨㄞ","ㄔㄨㄞ"], a:1, note:"快＝ㄎㄨㄞˋ" },
  { s:"📖 語文", q:"下面哪個字是「水」字旁？", o:["林","花","河","火"], a:2 },
  { s:"📖 語文", q:"「亡羊補牢」的意思是？", o:["羊跑走了","出了問題後補救","牧羊人補圍欄","羊很重要"], a:1 },
  { s:"📖 語文", q:"「安靜」的反義詞是？", o:["開心","熱鬧","吵鬧","平靜"], a:2 },
  { s:"📖 語文", q:"「龜」的注音是？", o:["ㄑㄩㄝ","ㄍㄨㄟ","ㄓㄨ","ㄅㄧ"], a:1 },
  { s:"📖 語文", q:"下面哪個字讀「ㄩ」？", o:["魚","里","土","馬"], a:0 },
  { s:"📖 語文", q:"「虎頭蛇尾」的意思是？", o:["動物故事","開始強勁最後草草了事","虎與蛇打架","非常努力"], a:1 },
  { s:"📖 語文", q:"「衣」字旁的字是？", o:["裡","明","河","林"], a:0 },
  { s:"📖 語文", q:"「認真」的同義詞是？", o:["隨便","努力","懶惰","馬虎"], a:1 },
  { s:"📖 語文", q:"詩句「春眠不覺曉」下一句是？", o:["夏蟲也懂情","處處聞啼鳥","秋風送爽來","冬雪紛紛落"], a:1 },
  { s:"📖 語文", q:"「螳臂當車」是指？", o:["螳螂很有力氣","不自量力","螳螂開車","螳螂擋路"], a:1 },
  { s:"📖 語文", q:"「坐」字共有幾劃？", o:["5","6","7","8"], a:2 },
  { s:"📖 語文", q:"「蘋果」的「蘋」字是什麼部首？", o:["木","艸（草）","果","米"], a:1 },
  { s:"📖 語文", q:"下面哪個詞是形容詞？", o:["跑步","漂亮","唱歌","吃飯"], a:1 },
  { s:"📖 語文", q:"「千里之行始於足下」的意思是？", o:["走很遠","再大的目標都從第一步開始","腳很重要","千里路很長"], a:1 },

  // ── 🌌 天文 ──
  { s:"🌌 天文", q:"太陽系最大的行星是？", o:["土星","火星","木星","天王星"], a:2 },
  { s:"🌌 天文", q:"地球繞太陽一圈要多久？", o:["一個月","一週","一天","一年"], a:3 },
  { s:"🌌 天文", q:"月亮繞地球一圈約要多久？", o:["一年","一天","一個月","一週"], a:2 },
  { s:"🌌 天文", q:"太陽系有幾顆行星？（2006年後的答案）", o:["9","6","10","8"], a:3, note:"爸媽那年代學的是9大行星！2006年冥王星被降為「矮行星」，所以現在是8顆。" },
  { s:"🌌 天文", q:"北極星指向哪個方向？", o:["南","東","西","北"], a:3 },
  { s:"🌌 天文", q:"最靠近太陽的行星是？", o:["金星","地球","火星","水星"], a:3 },
  { s:"🌌 天文", q:"地球是太陽系第幾顆行星？", o:["第一","第二","第四","第三"], a:3 },
  { s:"🌌 天文", q:"月亮本身會發光嗎？", o:["會，自己發光","不會，反射太陽光","只有滿月才發光","晚上才發光"], a:1 },
  { s:"🌌 天文", q:"太陽是什麼？", o:["行星","衛星","恆星","彗星"], a:2 },
  { s:"🌌 天文", q:"日食是什麼？", o:["太陽爆炸","月球擋住太陽","地球擋住月球","太陽消失"], a:1 },
  { s:"🌌 天文", q:"月食是什麼？", o:["月球爆炸","地球擋住太陽光照到月球","月球消失","太陽擋住月球"], a:1 },
  { s:"🌌 天文", q:"土星最有名的特徵是？", o:["紅色大斑點","巨大的光環","有很多衛星","最大的行星"], a:1 },
  { s:"🌌 天文", q:"火星為什麼叫「紅色星球」？", o:["天空是紅色的","表面有大量氧化鐵（鐵鏽）","火山噴發","日落是紅色的"], a:1 },
  { s:"🌌 天文", q:"銀河系的形狀像什麼？", o:["球形","圓形","螺旋形","方形"], a:2 },
  { s:"🌌 天文", q:"人類最先登陸的星球是？", o:["火星","金星","月球","木星"], a:2 },
  { s:"🌌 天文", q:"一天有幾小時？", o:["12小時","20小時","24小時","48小時"], a:2 },
  { s:"🌌 天文", q:"彗星尾巴是什麼方向？", o:["朝向太陽","背對太陽","向左","向右"], a:1 },
  { s:"🌌 天文", q:"太陽系裡有衛星最多的行星是？", o:["木星","土星","天王星","海王星"], a:1, note:"截至2023年，土星有145顆已知衛星，超越木星的95顆！" },
  { s:"🌌 天文", q:"最遠離太陽的行星是？", o:["天王星","冥王星","海王星","土星"], a:2 },
  { s:"🌌 天文", q:"我們的太陽大約再過多少年才會消亡？", o:["5千萬年","5億年","50億年","500億年"], a:2 },

  // ── 🌍 地理 ──
  { s:"🌍 地理", q:"台灣最高的山是？", o:["阿里山","合歡山","玉山","雪山"], a:2 },
  { s:"🌍 地理", q:"台灣的首都是？", o:["台中","高雄","台南","台北"], a:3 },
  { s:"🌍 地理", q:"世界最高的山是？", o:["富士山","聖母峰","阿爾卑斯山","玉山"], a:1 },
  { s:"🌍 地理", q:"日本的首都是？", o:["大阪","京都","北海道","東京"], a:3 },
  { s:"🌍 地理", q:"台灣四面環什麼？", o:["山","沙漠","平原","海洋"], a:3 },
  { s:"🌍 地理", q:"世界上最大的洲是？", o:["歐洲","非洲","美洲","亞洲"], a:3 },
  { s:"🌍 地理", q:"台灣最長的河流是？", o:["淡水河","高屏溪","濁水溪","大甲溪"], a:2 },
  { s:"🌍 地理", q:"法國的首都是？", o:["柏林","巴黎","羅馬","馬德里"], a:1 },
  { s:"🌍 地理", q:"美國的首都是？", o:["紐約","洛杉磯","華盛頓特區","芝加哥"], a:2 },
  { s:"🌍 地理", q:"世界上最長的河流是？", o:["亞馬遜河","尼羅河","長江","密西西比河"], a:1 },
  { s:"🌍 地理", q:"台灣位於哪個洲？", o:["非洲","歐洲","亞洲","美洲"], a:2 },
  { s:"🌍 地理", q:"澳洲的首都是？", o:["雪梨","墨爾本","布里斯本","坎培拉"], a:3 },
  { s:"🌍 地理", q:"世界上面積最大的國家是？", o:["中國","美國","俄羅斯","加拿大"], a:2 },
  { s:"🌍 地理", q:"台灣最大的縣市（面積）是？", o:["台北市","高雄市","花蓮縣","南投縣"], a:2 },
  { s:"🌍 地理", q:"韓國的首都是？", o:["首爾","釜山","仁川","大邱"], a:0 },
  { s:"🌍 地理", q:"英國的首都是？", o:["愛丁堡","曼徹斯特","倫敦","利物浦"], a:2 },
  { s:"🌍 地理", q:"台灣有幾個縣市？", o:["18個","20個","22個","25個"], a:2 },
  { s:"🌍 地理", q:"世界上最小的國家是？", o:["摩納哥","聖馬利諾","梵蒂岡","列支敦斯登"], a:2 },
  { s:"🌍 地理", q:"撒哈拉沙漠在哪個洲？", o:["亞洲","澳洲","非洲","南美洲"], a:2 },
  { s:"🌍 地理", q:"台灣的離島「澎湖」在台灣的哪個方向？", o:["東邊","北邊","西邊","南邊"], a:2 },
  { s:"🌍 地理", q:"世界最大的洋是？", o:["大西洋","印度洋","北冰洋","太平洋"], a:3 },
  { s:"🌍 地理", q:"義大利首都是？", o:["米蘭","威尼斯","羅馬","拿坡里"], a:2 },
  { s:"🌍 地理", q:"台灣的「花東縱谷」夾在哪兩個山脈之間？", o:["中央山脈與玉山山脈","中央山脈與海岸山脈","雪山山脈與阿里山山脈","玉山山脈與阿里山山脈"], a:1 },
  { s:"🌍 地理", q:"尼泊爾位於哪兩個國家之間？", o:["中國與印度","印度與巴基斯坦","中國與不丹","印度與斯里蘭卡"], a:0 },
  { s:"🌍 地理", q:"亞馬遜雨林主要在哪個國家？", o:["秘魯","哥倫比亞","巴西","委內瑞拉"], a:2 },

  // ── 🌿 自然 ──
  { s:"🌿 自然", q:"植物進行光合作用需要什麼？", o:["泥土和風","月光和雨水","陽光和水","石頭和空氣"], a:2 },
  { s:"🌿 自然", q:"毛毛蟲長大後會變成？", o:["蜜蜂","蚱蜢","蜘蛛","蝴蝶"], a:3 },
  { s:"🌿 自然", q:"水在幾度C會結冰？", o:["10度","0度","-10度","100度"], a:1 },
  { s:"🌿 自然", q:"蜜蜂採什麼來做蜂蜜？", o:["樹葉","花蜜","果汁","露水"], a:1 },
  { s:"🌿 自然", q:"人體最硬的部位是？", o:["骨頭","指甲","牙齒","頭髮"], a:2 },
  { s:"🌿 自然", q:"下面哪種動物會飛？", o:["企鵝","鴕鳥","蝙蝠","海豚"], a:2 },
  { s:"🌿 自然", q:"水沸騰的溫度是幾度C？", o:["80度","90度","100度","120度"], a:2 },
  { s:"🌿 自然", q:"人有幾根肋骨？（一側）", o:["10根","11根","12根","13根"], a:2 },
  { s:"🌿 自然", q:"青蛙的幼體叫做？", o:["幼蟲","蝌蚪","蛹","幼魚"], a:1 },
  { s:"🌿 自然", q:"哺乳動物的特徵是？", o:["有翅膀","用鰓呼吸","用肺呼吸且哺乳育幼","卵生且有鱗片"], a:2 },
  { s:"🌿 自然", q:"人體最大的器官是？", o:["心臟","肝臟","肺臟","皮膚"], a:3 },
  { s:"🌿 自然", q:"光合作用產生什麼氣體？", o:["二氧化碳","氮氣","氧氣","水蒸氣"], a:2 },
  { s:"🌿 自然", q:"彩虹有幾種顏色？", o:["5","6","7","8"], a:2 },
  { s:"🌿 自然", q:"蜘蛛有幾隻腳？", o:["4","6","8","10"], a:2 },
  { s:"🌿 自然", q:"魚用什麼呼吸？", o:["肺","皮膚","鰓","鼻子"], a:2 },
  { s:"🌿 自然", q:"植物的根有什麼功能？", o:["進行光合作用","吸收水分和養分","製造種子","呼吸空氣"], a:1 },
  { s:"🌿 自然", q:"地震是什麼原因造成的？", o:["颱風引起","地殼板塊移動","海水暴漲","月球引力"], a:1 },
  { s:"🌿 自然", q:"下列哪種動物是哺乳類？", o:["鱷魚","海豚","鮭魚","烏龜"], a:1 },
  { s:"🌿 自然", q:"空氣中含量最多的氣體是？", o:["氧氣","二氧化碳","氮氣","氫氣"], a:2 },
  { s:"🌿 自然", q:"磁鐵的同極？", o:["相吸","相斥","沒有反應","融合"], a:1 },
  { s:"🌿 自然", q:"蝴蝶一生的成長順序是？", o:["卵→蛹→幼蟲→成蟲","卵→幼蟲→蛹→成蟲","幼蟲→卵→蛹→成蟲","蛹→卵→幼蟲→成蟲"], a:1 },
  { s:"🌿 自然", q:"下雪需要什麼條件？", o:["氣溫高於0度","氣溫低於0度且有水氣","一定要刮大風","必須在高山上"], a:1 },
  { s:"🌿 自然", q:"人體血液中紅血球的功能是？", o:["殺菌","止血","輸送氧氣","產生抗體"], a:2 },
  { s:"🌿 自然", q:"恐龍滅絕的主要假說是？", o:["被人類獵殺","洪水淹沒","隕石撞地球導致環境劇變","太熱了"], a:2 },
  { s:"🌿 自然", q:"聲音在哪裡傳播最快？", o:["真空","空氣","水","固體（金屬）"], a:3 },

  // ── 🏛️ 社會 ──
  { s:"🏛️ 社會", q:"中秋節吃什麼？", o:["粽子","湯圓","月餅","元宵"], a:2 },
  { s:"🏛️ 社會", q:"端午節吃什麼？", o:["月餅","湯圓","粽子","年糕"], a:2 },
  { s:"🏛️ 社會", q:"元宵節吃什麼？", o:["粽子","湯圓","月餅","年糕"], a:1 },
  { s:"🏛️ 社會", q:"台灣的國花是？", o:["玫瑰","蓮花","梅花","菊花"], a:2 },
  { s:"🏛️ 社會", q:"台灣國慶日是幾月幾日？", o:["1月1日","10月10日","10月1日","9月9日"], a:1 },
  { s:"🏛️ 社會", q:"一週有幾天？", o:["5天","6天","8天","7天"], a:3 },
  { s:"🏛️ 社會", q:"農曆新年是哪個節日？", o:["中秋節","清明節","春節","端午節"], a:2 },
  { s:"🏛️ 社會", q:"清明節主要做什麼？", o:["放鞭炮","掃墓祭祖","吃粽子","賞花燈"], a:1 },
  { s:"🏛️ 社會", q:"媽祖是台灣民間哪個神明？", o:["土地公","海神/漁業守護神","雷神","灶神"], a:1 },
  { s:"🏛️ 社會", q:"台灣原住民族共有幾族（官方認定）？", o:["10族","14族","16族","20族"], a:2 },
  { s:"🏛️ 社會", q:"台灣最大的宗教是？", o:["基督教","佛教","伊斯蘭教","道教/民間信仰"], a:3 },
  { s:"🏛️ 社會", q:"台灣1969年開播、改變家庭娛樂的是什麼？", o:["收音機","彩色電視","電腦","手機"], a:1, note:"1969年台灣正式開播彩色電視，改變全家人的娛樂方式。" },
  { s:"🏛️ 社會", q:"台灣的錢幣單位是？", o:["元","圓","角","分"], a:0 },
  { s:"🏛️ 社會", q:"「工業革命」發生在哪個國家？", o:["法國","美國","英國","德國"], a:2 },
  { s:"🏛️ 社會", q:"聯合國成立於哪一年？", o:["1939年","1945年","1950年","1960年"], a:1 },
  { s:"🏛️ 社會", q:"台灣光復節是幾月幾日？", o:["10月10日","10月25日","11月11日","8月15日"], a:1 },
  { s:"🏛️ 社會", q:"一年有幾個月？", o:["10個月","11個月","12個月","13個月"], a:2 },
  { s:"🏛️ 社會", q:"選舉時，投票的意義是？", o:["玩遊戲","選出代表人民的領導者","繳稅","讓長輩高興"], a:1 },
  { s:"🏛️ 社會", q:"台灣的總統府在哪裡？", o:["台中","新北市","台北市","桃園"], a:2 },
  { s:"🏛️ 社會", q:"「父親節」是幾月幾日？", o:["7月7日","8月8日","9月9日","6月6日"], a:1 },
  { s:"🏛️ 社會", q:"市場上商品的「價格」是由什麼決定的？", o:["政府規定","天氣好壞","供給與需求","老闆心情"], a:2 },
  { s:"🏛️ 社會", q:"「母親節」是幾月第幾週的星期日？", o:["4月第1個星期日","5月第2個星期日","6月第1個星期日","3月第3個星期日"], a:1 },
  { s:"🏛️ 社會", q:"錢放在銀行可以得到什麼？", o:["利息","股票","土地","房子"], a:0 },
  { s:"🏛️ 社會", q:"台灣的「身分證」幾歲才能申請？", o:["10歲","12歲","14歲","18歲"], a:2 },
  { s:"🏛️ 社會", q:"台灣教育法規定幾年國民義務教育？", o:["6年","9年","12年","15年"], a:2 },

  // ── 🧹 生活 ──
  { s:"🧹 生活", q:"洗手要搓幾秒才夠乾淨？", o:["5秒","10秒","30秒","20秒以上"], a:3 },
  { s:"🧹 生活", q:"吃飯前要做什麼？", o:["看電視","玩遊戲","洗手","喝飲料"], a:2 },
  { s:"🧹 生活", q:"垃圾應該丟在哪裡？", o:["地上","路邊","水溝","垃圾桶"], a:3 },
  { s:"🧹 生活", q:"睡覺前一定要做什麼？", o:["吃零食","刷牙","看手機","喝可樂"], a:1 },
  { s:"🧹 生活", q:"每天應該喝多少水？", o:["500毫升","1公升","1500~2000毫升","3公升以上"], a:2 },
  { s:"🧹 生活", q:"刷牙一次應該刷多久？", o:["30秒","1分鐘","2分鐘以上","越快越好"], a:2 },
  { s:"🧹 生活", q:"衣服分類要怎麼洗？", o:["全部一起丟洗衣機","深色淺色分開洗","只洗外套","用手洗比較好"], a:1 },
  { s:"🧹 生活", q:"食物放冰箱可以保存多久（一般食物）？", o:["永遠不壞","還是要在期限內食用","放越久越好","只要不臭就沒問題"], a:1 },
  { s:"🧹 生活", q:"發燒時體溫超過幾度要看醫生？", o:["36度","37度","38度","39度以上"], a:2 },
  { s:"🧹 生活", q:"看書時要注意什麼？", o:["越快越好","光線要夠亮、眼睛保持距離","在黑暗中看","趴著看"], a:1 },
  { s:"🧹 生活", q:"火災時應該怎麼逃生？", o:["坐電梯逃跑","打開窗戶跳出去","低姿勢往出口爬並掩口鼻","躲在床底下"], a:2 },
  { s:"🧹 生活", q:"用電時哪個最安全？", o:["濕手插插頭","多個電器共用一個插座","不使用時關掉電器","電線捲成一團"], a:2 },
  { s:"🧹 生活", q:"廚餘應該怎麼處理？", o:["和一般垃圾混放","丟進廚餘桶回收","倒入水溝","埋在土裡"], a:1 },
  { s:"🧹 生活", q:"地震來了在室內要怎麼做？", o:["趕快跑出去","站在窗戶邊","蹲下、掩護、穩住（躲桌下）","跳樓逃生"], a:2 },
  { s:"🧹 生活", q:"哪種食物最健康？", o:["炸雞薯條","蔬菜水果全穀類","糖果餅乾","飲料汽水"], a:1 },
  { s:"🧹 生活", q:"收到陌生人的禮物要？", o:["馬上打開吃","先謝謝但告訴父母","直接拒絕","不理他"], a:1 },
  { s:"🧹 生活", q:"信用卡是什麼？", o:["一種現金","先消費後還款的支付工具","存款卡","折扣卡"], a:1 },
  { s:"🧹 生活", q:"看到陌生人跌倒怎麼辦？", o:["假裝沒看到","先確認安全再協助或叫人幫忙","笑他","推他一把"], a:1 },
  { s:"🧹 生活", q:"電池可以直接丟一般垃圾嗎？", o:["可以","不行，要丟回收桶","可以，只要包好","看電池大小決定"], a:1 },
  { s:"🧹 生活", q:"每天運動多久最好？", o:["5分鐘","10分鐘","30分鐘以上","2小時以上"], a:2 },

  // ── 🤝 品德 ──
  { s:"🤝 品德", q:"同學跌倒了，你應該？", o:["笑他","走開","扶起來問他還好嗎","假裝沒看到"], a:2 },
  { s:"🤝 品德", q:"長輩說話時，你應該？", o:["插嘴","玩手機","安靜聆聽","去睡覺"], a:2 },
  { s:"🤝 品德", q:"借別人的東西用完後要？", o:["留著用","扔掉","還回去並說謝謝","忘記還"], a:2 },
  { s:"🤝 品德", q:"在公共場所應該？", o:["大聲喧嘩","亂丟垃圾","保持安靜不吵鬧","推擠別人"], a:2 },
  { s:"🤝 品德", q:"做錯事了應該？", o:["說謊掩蓋","逃走","誠實道歉並改正","怪別人"], a:2 },
  { s:"🤝 品德", q:"同學分享了不正確的資訊，你應該？", o:["跟著傳出去","不理他","溫和地說出正確資訊","假裝相信"], a:2 },
  { s:"🤝 品德", q:"看到霸凌事件你應該？", o:["加入霸凌","裝沒看到","告訴老師或大人","拍影片上傳"], a:2 },
  { s:"🤝 品德", q:"朋友傷心時，你應該？", o:["笑他","告訴更多人","陪著他、傾聽他","叫他別難過"], a:2 },
  { s:"🤝 品德", q:"排隊時有人插隊，你應該？", o:["馬上打架","默默讓他","禮貌地說明規則或告訴大人","也去插別人的隊"], a:2 },
  { s:"🤝 品德", q:"課堂上想說話應該？", o:["直接大聲說","傳紙條","舉手示意","去廁所說"], a:2 },
  { s:"🤝 品德", q:"用餐後應該怎麼對待桌面？", o:["留著等別人清理","留下一點食物","自己清理乾淨","把食物推到地上"], a:2 },
  { s:"🤝 品德", q:"網路上認識的陌生人要見面，你應該？", o:["馬上去見","不告訴父母偷偷去","告訴父母並在公開場合見面","給他家裡地址"], a:2 },
  { s:"🤝 品德", q:"考試時看到別人的答案你應該？", o:["趕快抄","假裝沒看到，自己作答","告訴老師他的答案","等考完再問"], a:1 },
  { s:"🤝 品德", q:"看到地上有垃圾你應該？", o:["踢開","假裝沒看到","撿起來丟進垃圾桶","叫別人撿"], a:2 },
  { s:"🤝 品德", q:"答應別人的事情如果做不到，應該？", o:["假裝忘記","直接消失","提前告知並道歉","找藉口推托"], a:2 },
  { s:"🤝 品德", q:"分組作業時不努力的人應該？", o:["讓他什麼都不做","幫他做完全部","溝通分工，每人有責任","排擠他"], a:2 },
  { s:"🤝 品德", q:"拿到零錢時應該？", o:["馬上買零食","告訴父母並學習管理","偷偷存起來不讓父母知道","全部捐掉"], a:1 },
  { s:"🤝 品德", q:"對環境的責任是？", o:["別人的事","只有大人要管","每個人都有責任愛護環境","政府負責就好"], a:2 },
  { s:"🤝 品德", q:"同學成績比你好，你應該？", o:["生氣不和他玩","嫉妒他","請他教你並向他學習","說他是靠運氣"], a:2 },
  { s:"🤝 品德", q:"爸媽吵架時你應該？", o:["加入吵架","逃跑哭泣","保持冷靜，不選邊站，適時安慰","告訴同學"], a:2 },

  // ── 💰 理財（新增）──
  { s:"💰 理財", q:"什麼是「存款」？", o:["借別人的錢","把錢存進銀行保管","買股票","花掉的錢"], a:1 },
  { s:"💰 理財", q:"什麼是「利息」？", o:["買東西的費用","稅金","存款或借款產生的額外錢","工資"], a:2 },
  { s:"💰 理財", q:"每個月花剩下的錢叫做？", o:["利息","收入","儲蓄","負債"], a:2 },
  { s:"💰 理財", q:"「信用」在金融上是指？", o:["信任朋友","按時還錢的能力和記錄","存了多少錢","有多少財產"], a:1 },
  { s:"💰 理財", q:"什麼是「通貨膨脹」？", o:["錢變多了","物價下降","物價上升、錢的購買力下降","失業率上升"], a:2 },
  { s:"💰 理財", q:"「股票」是什麼？", o:["公司的債券","公司股份的憑證","銀行存摺","政府公債"], a:1 },
  { s:"💰 理財", q:"先記錄收入和支出的表叫做？", o:["日記","帳本/記帳","購物清單","作業本"], a:1 },
  { s:"💰 理財", q:"什麼叫做「預算」？", o:["計劃要花多少錢","已經花掉的錢","借來的錢","銀行的錢"], a:0 },
  { s:"💰 理財", q:"「收入」減去「支出」等於？", o:["負債","利潤/結餘","稅金","成本"], a:1 },
  { s:"💰 理財", q:"複利的意思是？", o:["利息只計算本金","利息也能再產生利息（利滾利）","複雜的利息計算","高利貸"], a:1 },
  { s:"💰 理財", q:"想買一個100元的東西，你有80元，差多少？", o:["10元","20元","30元","40元"], a:1 },
  { s:"💰 理財", q:"什麼是「保險」？", o:["存錢的方式","出事時得到賠償的保障","買股票","繳稅"], a:1 },
  { s:"💰 理財", q:"「ETF」是一種什麼投資？", o:["單一股票","追蹤多種股票的基金","黃金","房地產"], a:1 },
  { s:"💰 理財", q:"負債的意思是？", o:["很多錢","欠別人的錢","存款很多","獲利"], a:1 },
  { s:"💰 理財", q:"「租金」是？", o:["買房子的錢","借用房子/物品的費用","水電費","稅金"], a:1 },
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
    const note = quizState.q.note ? `　📖 ${quizState.q.note}` : "";
    if (left <= 0) {
      fb.style.color = "#c94f35";
      fb.textContent = "💬 沒關係，去問爸媽或老師！" + note;
      setTimeout(() => { quizOverlay.style.display = "none"; }, 2800);
    } else {
      fb.style.color = "#c94f35";
      fb.textContent = `❌ 再想想，還有 ${left} 次機會` + note;
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
// 第一次進村：先選貓，選完才教學
if (!getPlayerCat()) {
  catSelectOverlay.style.display = "flex";
} else if (!localStorage.getItem(TUTORIAL_KEY)) {
  tutorialOverlay.style.display = "flex";
}
renderPlayerVillager();


document.querySelector("#tutorialClose").addEventListener("click", () => {
  tutorialOverlay.style.display = "none";
  localStorage.setItem(TUTORIAL_KEY, "1");
});
document.querySelector("#helpBtn").addEventListener("click", () => {
  const isOpen = tutorialOverlay.style.display !== "none";
  tutorialOverlay.style.display = isOpen ? "none" : "flex";
});

document.querySelector("#reportBtn").addEventListener("click", () => {
  const q = quizState.q;
  if (!q) return;
  const reports = JSON.parse(localStorage.getItem("lulu-village-reports") || "[]");
  const already = reports.find(r => r.q === q.q);
  if (already) { alert("已經回報過這題了，謝謝！"); return; }
  reports.push({ s: q.s, q: q.q, o: q.o, a: q.a, time: new Date().toISOString() });
  localStorage.setItem("lulu-village-reports", JSON.stringify(reports));
  const btn = document.querySelector("#reportBtn");
  btn.textContent = "✅ 已回報，謝謝！";
  btn.disabled = true;
  setTimeout(() => { btn.textContent = "⚠️ 這題答案怪怪的"; btn.disabled = false; }, 3000);
});

document.querySelector("#housewarmingClose").addEventListener("click", () => {
  document.querySelector("#housewarmingOverlay").style.display = "none";
});
document.querySelector("#villageCompleteClose").addEventListener("click", () => {
  document.querySelector("#villageCompleteOverlay").style.display = "none";
});

render();
updateIdleSpeech();

// 點魯魯：魯魯說話
document.querySelector("#lulu").addEventListener("click", () => {
  updateIdleSpeech();
});

const style = document.createElement("style");
style.textContent = `.float-text { position: fixed; z-index: 10; pointer-events: none; color: #263238; font-weight: 900; text-shadow: 0 1px 0 #fffdf7; font-size:.85rem; }`;
document.head.appendChild(style);
