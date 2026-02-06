'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SurpriseButtonProps {
  type?: string;
  message?: string;
}

export default function SurpriseButton({ type, message }: SurpriseButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [result, setResult] = useState<any>(null);

  // 3 題簡單心情測驗
  const questions = [
    "今天最想被誰抱抱？",
    "現在最需要什麼？",
    "給自己一句鼓勵的話！"
  ];

  const options = [
    ["毛小孩", "朋友", "戀人", "自己抱自己"],
    ["甜點", "睡覺", "大抱抱", "滑手機"],
    ["我超棒！", "慢慢來就好", "今天也要加油", "救命我好累"]
  ];

  // 4 種結果（可擴充）
  const results = [
    {
      title: "今天的小精靈：療癒柴柴",
      text: "柴柴說：你今天超棒！來給你一個大大的柴柴抱～🐶",
      image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&auto=format&fit=crop"
    },
    {
      title: "今天的小精靈：懶洋洋貓貓",
      text: "貓貓說：沒關係，今天可以偷懶一下～一起躺平吧喵～😽",
      image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&auto=format&fit=crop"
    },
    {
      title: "今天的小精靈：元氣兔兔",
      text: "兔兔說：跳起來！今天也要元氣滿滿衝衝衝～🐰✨",
      image: "https://images.unsplash.com/photo-1583511655826-05700d52f4d9?w=800&auto=format&fit=crop"
    },
    {
      title: "今天的小精靈：溫柔小熊",
      text: "小熊說：抱抱你～不管今天怎樣，你都值得被好好愛喔～🧸❤️",
      image: "https://images.unsplash.com/photo-1581593443255-db4646e739b4?w=800&auto=format&fit=crop"
    }
  ];

  const startDrawing = () => {
    setIsDrawing(true);
    // 播放叮叮音效（免費音效連結）
    const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-magic-sparkle-whoosh-2343.mp3');
    audio.volume = 0.3;
    audio.play().catch(() => {});

    setTimeout(() => {
      // 隨機抽一張結果
      const randomResult = results[Math.floor(Math.random() * results.length)];
      setResult(randomResult);
      setIsDrawing(false);
    }, 2500);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="mt-6 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold text-xl rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
      >
        揭曉今天的驚喜！
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white/95 backdrop-blur-xl p-8 rounded-3xl max-w-lg w-full m-4 shadow-2xl border border-purple-200 overflow-hidden relative"
              onClick={e => e.stopPropagation()}
            >
              {/* 背景小星星動畫 */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute text-yellow-300 text-2xl"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0, 1.5, 0],
                      y: [0, -100, -200]
                    }}
                    transition={{
                      duration: 3,
                      delay: i * 0.4,
                      repeat: Infinity,
                      repeatDelay: 2
                    }}
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`
                    }}
                  >
                    ✨
                  </motion.div>
                ))}
              </div>

              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center text-purple-700 relative z-10">
                {type} 驚喜來囉～✨
              </h2>

              <p className="text-lg md:text-xl mb-8 text-center text-gray-700 relative z-10">
                {message}
              </p>

              {isDrawing ? (
                <div className="text-center py-12 relative z-10">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="text-7xl mx-auto mb-6"
                  >
                    🎴
                  </motion.div>
                  <p className="text-2xl font-bold text-purple-600">抽卡中... 好緊張！</p>
                </div>
              ) : result ? (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-center space-y-6 relative z-10"
                >
                  <motion.img
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    src={result.image}
                    alt="療癒圖片"
                    className="w-full max-h-64 object-cover rounded-2xl shadow-xl mx-auto"
                  />

                  <h3 className="text-2xl md:text-3xl font-bold text-pink-600">
                    {result.level}
                  </h3>

                  <p className="text-xl md:text-2xl text-gray-800 leading-relaxed">
                    {result.text}
                  </p>

                  <button
                    onClick={() => setIsOpen(false)}
                    className="mt-4 px-10 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold text-lg rounded-full hover:brightness-110 transition-all shadow-lg"
                  >
                    好開心！關閉
                  </button>
                </motion.div>
              ) : (
                <div className="text-center relative z-10">
                  <button
                    onClick={startDrawing}
                    className="px-10 py-5 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold text-xl rounded-full hover:brightness-110 transition-all shadow-lg"
                  >
                    開始抽卡！
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}