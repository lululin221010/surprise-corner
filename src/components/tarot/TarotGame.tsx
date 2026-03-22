"use client";
import { useState, useEffect } from "react";
import { drawSpread, getAllSpreadTypes, formatCardReading } from "../../lib/tarot/tarotLogic";

const MAX_FREE_DAILY = 5;
const STORAGE_KEY = "tarot_usage";

function getTodayKey() {
  return new Date().toISOString().slice(0, 10);
}

function getUsage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { date: getTodayKey(), count: 0 };
    const data = JSON.parse(raw);
    if (data.date !== getTodayKey()) return { date: getTodayKey(), count: 0 };
    return data;
  } catch { return { date: getTodayKey(), count: 0 }; }
}

function saveUsage(count: number) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ date: getTodayKey(), count }));
}

export default function TarotGame() {
  const [spreadType, setSpreadType] = useState("single");
  const [question, setQuestion] = useState("");
  const [cards, setCards] = useState<any[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [selectedCard, setSelectedCard] = useState<any>(null);
  const [flipStates, setFlipStates] = useState<boolean[]>([]);
  const [attempts, setAttempts] = useState(0);
  const [usageCount, setUsageCount] = useState(0);
  const spreadTypes = getAllSpreadTypes();

  useEffect(() => {
    const usage = getUsage();
    setUsageCount(usage.count);
  }, []);

  const remainingFree = MAX_FREE_DAILY - usageCount;
  const canDraw = remainingFree > 0;

  const handleDraw = () => {
    if (isDrawing || !canDraw) return;
    setIsDrawing(true);
    setShowResult(false);
    setSelectedCard(null);
    setAttempts((prev) => prev + 1);

    const newCount = usageCount + 1;
    saveUsage(newCount);
    setUsageCount(newCount);

    setTimeout(() => {
      try {
        const drawnCards = drawSpread(spreadType);
        const formattedCards = drawnCards.map((card: any) =>
          formatCardReading(card, card.position)
        );
        setCards(formattedCards);
        setFlipStates(new Array(formattedCards.length).fill(false));
        setShowResult(true);
      } catch (error) {
        console.error("抽牌錯誤:", error);
      } finally {
        setIsDrawing(false);
      }
    }, 1200);
  };

  const handleCardFlip = (index: number) => {
    const newFlipStates = [...flipStates];
    newFlipStates[index] = true;
    setFlipStates(newFlipStates);
    setTimeout(() => { setSelectedCard(cards[index]); }, 300);
  };

  const handleReset = () => {
    setCards([]);
    setShowResult(false);
    setSelectedCard(null);
    setQuestion("");
    setFlipStates([]);
  };

  return (
    <div className="min-h-screen bg-[#0f0c1a] text-white p-4 relative overflow-hidden flex flex-col items-center pt-28">
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-purple-900/30 blur-[120px]"></div>
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-indigo-900/30 blur-[120px]"></div>
      </div>

      <div className="w-full max-w-3xl relative z-10 px-2">
        <div className="flex justify-between items-baseline mb-4 px-2">
          <h1 className="text-2xl font-black bg-gradient-to-r from-yellow-200 via-purple-300 to-pink-300 bg-clip-text text-transparent">
            🔮 LuLu 靈魂塔羅
          </h1>
          <div className="flex items-center gap-3">
            <span className={`text-[10px] font-bold px-3 py-1 rounded-full ${remainingFree > 0 ? "bg-purple-900/50 text-purple-300" : "bg-red-900/50 text-red-300"}`}>
              今日剩餘 {remainingFree}/{MAX_FREE_DAILY} 次
            </span>
            <div className="text-[10px] text-purple-400/60 font-mono tracking-[0.2em]">#{attempts}</div>
          </div>
        </div>

        {/* 次數用盡提示 */}
        {!canDraw && (
          <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 border border-purple-500/30 rounded-2xl p-5 mb-6 text-center">
            <div className="text-3xl mb-2">🌙</div>
            <p className="text-purple-200 font-bold text-sm mb-1">今日占卜已完成</p>
            <p className="text-purple-400 text-xs mb-4">明天又有 {MAX_FREE_DAILY} 次機會，好好沉澱今日的牌意吧 ✨</p>
            <a
              href="https://still-time-corner.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gradient-to-r from-orange-400 to-pink-500 text-white px-6 py-2.5 rounded-xl font-black text-sm hover:opacity-90 transition-all"
            >
              📚 逛逛小舖找書緣
            </a>
          </div>
        )}

        <div className="bg-white/[0.05] backdrop-blur-xl rounded-2xl border border-white/10 p-4 mb-6 shadow-2xl">
          <div className="flex flex-col gap-3">
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="你的靈魂想問什麼？"
              rows={2}
              className="w-full px-4 py-2.5 bg-black/30 border border-white/10 rounded-xl text-sm focus:outline-none focus:border-purple-500/50 transition-all resize-none placeholder:text-purple-400/20"
            />
            <div className="flex gap-3">
              <div className="flex-grow flex bg-black/40 p-1 rounded-xl border border-white/5">
                {spreadTypes.map((spread: any) => (
                  <button
                    key={spread.id}
                    onClick={() => { setSpreadType(spread.id); handleReset(); }}
                    className={`flex-1 py-1.5 text-[11px] font-bold rounded-lg transition-all ${
                      spreadType === spread.id ? "bg-purple-600 text-white shadow-lg" : "text-purple-300/40 hover:text-purple-300"
                    }`}
                  >
                    {spread.name}
                  </button>
                ))}
              </div>
              <button
                onClick={handleDraw}
                disabled={isDrawing || !canDraw}
                className={`px-6 py-2 rounded-xl font-black text-sm tracking-widest transition-all ${
                  isDrawing || !canDraw ? "bg-stone-700 opacity-50 cursor-not-allowed" : "bg-gradient-to-r from-purple-500 to-pink-500 hover:shadow-[0_0_15px_rgba(168,85,247,0.4)] active:scale-95"
                }`}
              >
                {isDrawing ? "🌑 讀取中" : "✨ 抽牌"}
              </button>
            </div>
          </div>
        </div>

        {showResult && (
          <div className="flex flex-col items-center gap-6 animate-fade-in">
            <div className="flex flex-wrap justify-center gap-4">
              {cards.map((reading, index) => (
                <div
                  key={index}
                  onClick={() => !flipStates[index] && handleCardFlip(index)}
                  className="cursor-pointer group"
                  style={{ perspective: "1000px" }}
                >
                  <div
                    className="relative w-[120px] h-[180px] transition-all duration-700"
                    style={{
                      transformStyle: "preserve-3d",
                      transform: flipStates[index] ? "rotateY(180deg)" : "rotateY(0deg)",
                    }}
                  >
                    <div className="absolute inset-0 backface-hidden">
                      <div className="w-full h-full bg-[#1c182b] border-2 border-yellow-500/20 rounded-xl flex flex-col items-center justify-center p-3 relative group-hover:border-yellow-500/40 transition-colors shadow-lg">
                        <div className="text-4xl mb-2 opacity-60 group-hover:opacity-100 group-hover:drop-shadow-[0_0_10px_rgba(168,85,247,1)] transition-all">🎴</div>
                        <div className="text-[8px] text-purple-400/40 font-black uppercase tracking-[0.3em]">{reading.position.name}</div>
                      </div>
                    </div>
                    <div className="absolute inset-0 backface-hidden rotate-y-180">
                      <div className={`w-full h-full bg-gradient-to-b from-[#2a1b4d] to-black border-2 rounded-xl p-3 flex flex-col justify-between items-center ${
                        selectedCard === reading ? "border-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.3)] scale-105" : "border-purple-500/30"
                      } ${reading.card.isReversed ? "rotate-180" : ""}`}>
                        <div className="text-4xl mt-1 drop-shadow-md">{reading.card.emoji}</div>
                        <div className="text-center w-full">
                          <div className="text-[13px] font-black text-yellow-100 truncate">{reading.card.name}</div>
                          <div className="text-[9px] text-purple-400/80 font-bold">📍 {reading.position.name}</div>
                        </div>
                        <div className="w-full h-[1px] bg-white/10"></div>
                        <div className="text-[10px] text-center font-medium leading-tight text-white/90 line-clamp-2 px-1">
                          {reading.meaning}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {selectedCard && (
              <div className="w-full bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-2xl p-5 shadow-2xl animate-slide-up mt-4">
                <div className="flex items-center gap-4 mb-4 pb-3 border-b border-white/5">
                  <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-3xl">
                    {selectedCard.card.emoji}
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-yellow-400 leading-tight">{selectedCard.card.name}</h3>
                    <p className="text-[10px] text-purple-300 font-bold uppercase tracking-widest mt-1 opacity-60">
                      {selectedCard.position.name} · {selectedCard.card.nameEn}
                    </p>
                  </div>
                  <button onClick={() => setSelectedCard(null)} className="ml-auto w-8 h-8 bg-white/5 rounded-full flex items-center justify-center text-purple-300 hover:text-white transition-all hover:bg-white/10">✕</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="bg-black/30 p-3 rounded-xl border border-white/5">
                    <span className="text-[9px] font-black text-purple-400 uppercase tracking-widest block mb-2">✦ 核心意涵</span>
                    <p className="text-xs text-white/90 leading-relaxed font-medium">{selectedCard.meaning}</p>
                  </div>
                  <div className="bg-black/30 p-3 rounded-xl border border-white/5">
                    <span className="text-[9px] font-black text-purple-400 uppercase tracking-widest block mb-2">✦ 神性指引</span>
                    <p className="text-xs text-purple-100/70 leading-relaxed italic">「{selectedCard.description}」</p>
                  </div>
                </div>
              </div>
            )}

            <button onClick={handleReset} className="text-[10px] font-bold text-purple-500 hover:text-purple-300 transition-colors py-4 opacity-40 hover:opacity-100 uppercase tracking-[0.4em]">
              — Clear Table —
            </button>
          </div>
        )}

        {isDrawing && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
            <div className="text-4xl animate-spin mb-2">🔮</div>
            <div className="text-[9px] text-purple-400 animate-pulse tracking-widest">READING FATE...</div>
          </div>
        )}
      </div>

      <style jsx>{`
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
        @keyframes slide-up { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
        .animate-slide-up { animation: slide-up 0.3s ease-out; }
        .animate-fade-in { animation: fadeIn 0.5s ease-out; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
    </div>
  );
}
