import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '驚喜樂世界 | SURPRISE CORNER',
  description: '六大神秘區域：靈異鬼屋、玩樂區、心理學館、快訊站、收租AI、小教室。每天都有新發現 💖',
  openGraph: {
    title: '驚喜樂世界 | SURPRISE CORNER',
    description: '六大神秘區域，每天都有新發現 💖',
    url: 'https://surprise-corner.vercel.app/wonderland',
    images: [
      {
        url: 'https://surprise-corner.vercel.app/og-default.png',
        width: 1200,
        height: 630,
        alt: '驚喜樂世界 SURPRISE CORNER',
      },
    ],
  },
}

export default function WonderlandLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
