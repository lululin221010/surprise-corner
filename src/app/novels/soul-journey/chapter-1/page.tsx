// 路由：/novels/soul-journey/chapter-1
// 第一章為免費章節（isLocked = false）
// 若未來要鎖定，改成 isLocked={true} 即可

import type { Metadata } from 'next'
import SoulJourneyChapter1 from '../chapter-1'

export const metadata: Metadata = {
  title: '靈魂的轉運站 · 第一章：註定的離場時間',
  description: '靈魂不是消失了，它只是換了一個地方，繼續守候著你。',
}

export default function Page() {
  return <SoulJourneyChapter1 isLocked={false} />
}
