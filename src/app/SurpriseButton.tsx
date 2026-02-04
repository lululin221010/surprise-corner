// src/app/SurpriseButton.tsx

'use client';   // ← 這行一定要加，表示這是 Client Component

export default function SurpriseButton() {
  return (
    <button
      onClick={() => alert('驚喜還在準備中～明天再來喔！')}
      className="
        mt-6 px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 
        rounded-full font-bold text-white shadow-lg
        hover:from-purple-700 hover:to-pink-700 transform hover:scale-110
        transition-all duration-300
      "
    >
      揭曉更多驚喜
    </button>
  );
}