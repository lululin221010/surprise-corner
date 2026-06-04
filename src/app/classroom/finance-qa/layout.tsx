import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '理財調查局 同學問答 | Surprise Corner',
  description: '看看跟你同類型的同學在問什麼，LuLu 給的不是答案，是判斷框架。',
  openGraph: {
    title: '理財調查局 同學問答',
    description: '看看跟你同類型的同學在問什麼，LuLu 給的不是答案，是判斷框架。',
    url: 'https://surprise-corner.vercel.app/classroom/finance-qa',
    siteName: 'Surprise Corner',
    locale: 'zh_TW',
    type: 'website',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
