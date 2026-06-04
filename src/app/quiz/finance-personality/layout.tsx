import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '你是哪種財務人格？| Surprise Corner',
  description: '9 題情境測驗，側寫你的真實投資模式——保險庫型、穩健分析型、積極出擊型、還是情緒驅動型？',
  openGraph: {
    title: '你是哪種財務人格？',
    description: '9 題情境，側寫你的真實投資模式。結果可能讓你意外。',
    url: 'https://surprise-corner.vercel.app/quiz/finance-personality',
    siteName: 'Surprise Corner',
    locale: 'zh_TW',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: '你是哪種財務人格？',
    description: '9 題情境，側寫你的真實投資模式。',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
