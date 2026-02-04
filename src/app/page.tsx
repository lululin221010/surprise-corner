import { format, subDays } from 'date-fns';
import episodes from '../../data/episodes.json';   // 從 src/app 往上兩層到根目錄的 data
import SurpriseButton from './SurpriseButton';  // ← 加這一行

interface Episode {
  episode: number;
  date: string;
  title: string;
  content: string;
}

export default function Home() {
  const today = new Date();
  const todayStr = format(today, 'yyyy-MM-dd');
  const yesterday = subDays(today, 1);
  const yesterdayStr = format(yesterday, 'yyyy-MM-dd');

  // 驚喜資料（每天短內容，從 2/6 開始正式驚喜）
  const surprises = {
  '2026-02-04': { 
    type: '開站日', 
    message: '今天是 Surprise Corner 第一次和你見面！' 
  },
  '2026-02-05': { 
    type: '工具日', 
    message: '今天來玩一個超可愛的線上小工具！' 
  },
  '2026-02-06': { 
    type: '故事日', 
    message: '今天分享一篇短篇科幻故事' 
  },
  '2026-02-07': { 
    type: '音樂日', 
    message: '今天來聽 AI 生成的電音片段' 
  },
  // 之後繼續加...
};

  const surprise = surprises[todayStr] || {
    type: '準備中...',
    message: '連載從 2/6 正式開始，今天先看昨天的信吧～'
  };

  // 前一天的連載信
  const yesterdayEpisode = (episodes as Episode[]).find(ep => ep.date === yesterdayStr);

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-pink-950 text-white flex flex-col items-center p-8">
      <h1 className="text-6xl md:text-8xl font-extrabold mb-6 text-center tracking-tight">
        Surprise Corner
      </h1>

      <p className="text-2xl md:text-4xl mb-12 text-center opacity-90">
        每天不一樣的小驚喜，等你來發現
      </p>

      {/* 驚喜卡片 + 按鈕 */}
      <div className="
        bg-white/10 backdrop-blur-md p-10 rounded-3xl 
        border border-white/20 max-w-3xl w-full text-center mb-16
        animate-fade-in duration-1000
      ">
        <div className="
          text-3xl font-bold mb-4 text-purple-300 
          animate-pulse duration-2000
        ">
          {surprise.type}
        </div>

        <p className="text-2xl mb-6">
          {surprise.message}
        </p>

        <p className="text-lg opacity-80 mb-6">
          （今天日期：{todayStr}）
        </p>

        {/* 驚喜互動按鈕 */}
        <SurpriseButton />
      </div>

      {/* 連載信區塊 */}
      <div className="max-w-4xl w-full">
        <h2 className="text-4xl font-bold mb-6 text-center text-purple-300">
          AI 的最後一封信 - 前一天內容
        </h2>

        {yesterdayEpisode ? (
          <div className="bg-white/10 backdrop-blur-md p-10 rounded-3xl border border-white/20 prose prose-invert max-w-none">
            <h3 className="text-3xl font-bold mb-4">
              第 {yesterdayEpisode.episode} 封信 - {yesterdayEpisode.title}
            </h3>
            <div dangerouslySetInnerHTML={{ __html: yesterdayEpisode.content }} />
          </div>
        ) : (
          <p className="text-xl text-center opacity-80">
            連載從 2/6 正式開始，明天再來看第1封信喔！
          </p>
        )}
      </div>

      <p className="mt-16 text-center opacity-70">
        每天固定更新驚喜 + 連載信，錯過就看不到Lulu的下一步了…
      </p>
    </main>
  );
}