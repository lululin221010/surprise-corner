// 📄 檔案路徑：src/app/page.tsx
// 功能：首頁 - 顯示今日驚喜 + 分享功能

import { Metadata } from 'next';
import ShareButtons from '@/components/ShareButtons';

export const metadata: Metadata = {
  title: 'Surprise Corner - 每天不一樣的小驚喜',
  description: '每天都有新的驚喜等你發現！獲取靈感、學習新知、療癒心情。',
  keywords: ['每日驚喜', '靈感', '創意', '生活提案', '心靈療癒', '每日一句'],
  authors: [{ name: 'Surprise Corner' }],
  openGraph: {
    title: 'Surprise Corner - 每天不一樣的小驚喜',
    description: '每天都有新的驚喜等你發現！',
    type: 'website',
    locale: 'zh_TW',
    siteName: 'Surprise Corner',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Surprise Corner - 每天不一樣的小驚喜',
    description: '每天都有新的驚喜等你發現！',
  },
};

async function getTodaySurprise() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3001';
    const res = await fetch(`${baseUrl}/api/surprise/today`, {
      cache: 'no-store',
    });
    
    if (!res.ok) {
      return null;
    }
    
    return await res.json();
  } catch (error) {
    console.error('獲取今日驚喜失敗:', error);
    return null;
  }
}

export default async function Home() {
  const surprise = await getTodaySurprise();
  const today = new Date().toLocaleDateString('zh-TW', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 text-white">
      {/* Header */}
      <header className="text-center py-12 px-4">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 animate-fade-in">
          Surprise Corner
        </h1>
        <p className="text-xl md:text-2xl text-purple-200">
          每天不一樣的小驚喜，等你來發現
        </p>
      </header>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-4 pb-16">
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-2xl border border-white/20">
          {surprise ? (
            <>
              {/* 今日驚喜 */}
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  {surprise.title || surprise.type}
                </h2>
                <p className="text-lg md:text-xl leading-relaxed text-purple-100">
                  {surprise.content || surprise.message}
                </p>
                
                {/* 標籤 */}
                {surprise.tags && surprise.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 justify-center mt-6">
                    {surprise.tags.map((tag: string) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-purple-500/30 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* 分享按鈕 */}
              <ShareButtons 
                title={surprise.title || surprise.type}
                content={surprise.content || surprise.message}
              />

              {/* 日期 */}
              <p className="text-center text-sm text-purple-200 mt-6">
                今天日期：{today}
              </p>
            </>
          ) : (
            /* Loading / Error State */
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">準備中...</h2>
              <p className="text-purple-200">
                連載從 2/6 正式開始，今天先看昨天的信吧～
              </p>
              <p className="text-sm text-purple-300 mt-4">
                (今天日期：{today})
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}