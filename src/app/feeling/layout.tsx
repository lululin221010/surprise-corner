import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '那個感覺 | Surprise Corner 驚喜角落',
  description: '39 個故事陪你走過情緒的夜晚。靈異・心理・科學，36 冊免費閱讀，加上測驗、運勢、遊戲，全在這裡。',
  openGraph: {
    title: '這裡有「那個感覺」',
    description: '39 個故事 + 測驗 + 塔羅 + 每日驚喜，免費解鎖全部好康',
    url: 'https://surprise-corner.vercel.app/feeling',
    images: [{ url: '/og-default.png', width: 1200, height: 630 }],
  },
}

export default function FeelingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
