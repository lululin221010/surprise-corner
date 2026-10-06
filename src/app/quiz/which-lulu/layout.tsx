import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '你今天是哪隻魯魯？',
  description: '魯魯有 6 種今天：曬到光就不動、半夜跑酷、叫名字假裝沒聽到……5 題 30 秒，看你今天是哪一隻。',
  openGraph: {
    title: '你今天是哪隻魯魯？',
    description: '魯魯有 6 種今天，你是哪一種？5 題 30 秒。',
    url: 'https://surprise-corner.vercel.app/quiz/which-lulu',
    siteName: 'Surprise Corner',
    locale: 'zh_TW',
    type: 'website',
    images: [{ url: 'https://surprise-corner.vercel.app/quiz/which-lulu/zoomies.jpg', width: 1080, height: 1080 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '你今天是哪隻魯魯？',
    description: '魯魯有 6 種今天，你是哪一種？5 題 30 秒。',
    images: ['https://surprise-corner.vercel.app/quiz/which-lulu/zoomies.jpg'],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
