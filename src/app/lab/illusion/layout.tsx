import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '眼見不為憑｜你的眼睛會被騙多少？',
  description: '用眼睛調整兩條線、兩個圓，看看你被錯覺騙了多少。免登入、免費，約 1～3 分鐘。',
  keywords: ['視覺錯覺', '錯覺測驗', '眼見不為憑', '穆勒萊爾錯覺', '免費小實驗'],
  openGraph: {
    title: '眼見不為憑｜你的眼睛會被騙多少？',
    description: '憑眼睛調一調，看你被騙多少。免費、約 1～3 分鐘。',
  },
};

export default function IllusionLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
