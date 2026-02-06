import clientPromise from '@/lib/mongodb'; // 或 '@/app/lib/mongodb'，看你放哪
import { format, subDays } from 'date-fns';
import episodes from '@/data/episodes.json';
import SurpriseButton from './SurpriseButton';

interface Surprise {
  type: string;
  message: string;
}

export default async function Home() {
  const today = new Date();
  const todayStr = format(today, 'yyyy-MM-dd');
  const yesterday = subDays(today, 1);
  const yesterdayStr = format(yesterday, 'yyyy-MM-dd');

  // 從 MongoDB 讀取今天的驚喜
  let surprise: Surprise = {
    type: '準備中...',
    message: '連載從 2/6 正式開始，今天先看昨天的信吧～'
  };

  try {
    const client = await clientPromise;
    const db = client.db('SurpriseCornerDB');
    const surpriseData = await db
      .collection('surprises')
      .findOne<Surprise>({ date: todayStr });

    if (surpriseData) {
      surprise = surpriseData;
    }
  } catch (error) {
    console.error('讀取驚喜資料失敗:', error);
    // 錯誤時保持預設值，不影響頁面顯示
  }

  // 前一天的連載信
  const yesterdayEpisode = (episodes as any[]).find(ep => ep.date === yesterdayStr);

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-pink-950 text-white flex flex-col items-center p-8">
      <h1 className="text-6xl md:text-8xl font-extrabold mb-6 text-center tracking-tight">
        Surprise Corner
      </h1>

      <p className="text-2xl md:text-4xl mb-12 text-center opacity-90">
        每天不一樣的小驚喜，等你來發現
      </p>

      {/* 驚喜卡片 */}
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
        <SurpriseButton 
          type={surprise.type}
          message={surprise.message}
        />
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