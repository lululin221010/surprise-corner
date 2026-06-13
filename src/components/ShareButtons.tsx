// 📄 檔案路徑：src/components/ShareButtons.tsx
// 功能：社群分享按鈕（Facebook, Threads, LINE, 複製連結）

'use client';

import { useState } from 'react';

interface ShareButtonsProps {
  title: string;
  content: string;
}

export default function ShareButtons({ title, content }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareText = `${title}\n\n${content}\n\n來自 Surprise Corner 🎁`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareText + '\n' + shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('複製失敗:', err);
    }
  };
 
  const shareToThreads = () => {
    const url = `https://www.threads.net/intent/post?text=${encodeURIComponent(shareText + '\n' + shareUrl)}`;
    window.open(url, '_blank', 'width=600,height=600');
  };

  const shareToLine = () => {
    const url = `https://line.me/R/msg/text/?${encodeURIComponent(shareText + '\n' + shareUrl)}`;
    window.open(url, '_blank', 'width=600,height=400');
  };

  return (
    <div className="flex flex-wrap gap-3 justify-center mt-6">
      
      {/* Threads */}
      <button
        onClick={shareToThreads}
        className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
        aria-label="分享到 Threads"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 192 192">
          <path d="M141.537 88.988a66.667 66.667 0 0 0-2.518-1.143c-1.482-27.307-16.403-42.94-41.457-43.1h-.34c-14.986 0-27.449 6.396-35.12 18.036l13.779 9.452c5.73-8.695 14.724-10.548 21.348-10.548h.229c8.249.053 14.474 2.452 18.503 7.129 2.932 3.405 4.893 8.111 5.864 14.05-7.314-1.243-15.224-1.626-23.68-1.14-23.82 1.371-39.134 15.264-38.105 34.568.522 9.792 5.4 18.216 13.735 23.719 7.047 4.652 16.124 6.927 25.557 6.412 12.458-.683 22.231-5.436 29.049-14.127 5.178-6.6 8.453-15.153 9.899-25.93 5.937 3.583 10.337 8.298 12.767 13.966 4.132 9.635 4.373 25.468-8.546 38.376-11.319 11.308-24.925 16.2-45.488 16.351-22.809-.169-40.051-7.484-51.235-21.742C35.573 137.004 29.807 116.641 29.605 90c.202-26.641 5.968-47.004 17.142-60.516C57.93 15.226 75.172 7.911 97.981 7.742c22.976.17 40.526 7.52 52.171 21.847 5.71 7.026 10.015 15.86 12.853 26.162l16.147-4.308c-3.44-12.68-8.853-23.606-16.219-32.668C147.036 3.24 125.056-6.004 98.02 5.862c-27.16-.164-49.48 9.13-66.38 27.64C16.236 50.286 8.877 74.09 8.647 90c.23 15.91 7.59 39.714 23.013 56.496 16.9 18.51 39.22 27.804 66.38 27.64 27.036.164 48.68-8.958 65.145-27.072 14.79-16.39 14.425-36.892 9.527-49.533-3.674-9.263-10.549-16.881-20.175-22.543zM96.513 160.268c-10.481.578-21.404-2.597-29.054-8.567-6.184-4.816-9.302-11.17-9.596-16.977-.494-9.343 6.648-19.845 28.087-21.082 2.458-.141 4.863-.209 7.22-.209 5.801 0 11.226.539 16.19 1.584-1.834 22.786-11.919 43.817-12.847 45.251z"/>
        </svg>
        <span className="font-medium">Threads</span>
      </button>

      {/* LINE */}
      <button
        onClick={shareToLine}
        className="flex items-center gap-2 px-4 py-2 bg-[#00B900] text-white rounded-lg hover:bg-[#00A300] transition-colors"
        aria-label="分享到 LINE"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
        </svg>
        <span className="font-medium">LINE</span>
      </button>

      {/* 複製連結 */}
      <button
        onClick={handleCopyLink}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
          copied 
            ? 'bg-green-500 text-white' 
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
        aria-label="複製連結"
      >
        {copied ? (
          <>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="font-medium">已複製！</span>
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <span className="font-medium">複製連結</span>
          </>
        )}
      </button>
    </div>
  );
}