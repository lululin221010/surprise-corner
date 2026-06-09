// 📄 路徑：src/app/classroom/coins.ts
// 金幣系統工具函數 — localStorage based

export interface UserAccount {
  email: string
  coins: number
  inventory: {
    energyDrink: number   // ☕
    bookmark: number      // 📌
  }
  equippedTitle: string | null
  earnedTitles: string[]
  bookmarks: Record<string, number>       // lessonId → slideIndex
  discountCodes: string[]
  cardUnlocked: boolean
  // 防重複刷幣
  completedQuizzes: Record<string, number[]>  // lessonId → [quizIndex, ...]
  completedLessons: string[]                  // lessonId[]（完課 bonus 只給一次）
}

const CURRENT_EMAIL_KEY = 'sc_current_email'

export function getCurrentEmail(): string {
  if (typeof window === 'undefined') return ''
  return localStorage.getItem(CURRENT_EMAIL_KEY) || ''
}

export function setCurrentEmail(email: string) {
  if (typeof window === 'undefined') return
  localStorage.setItem(CURRENT_EMAIL_KEY, email.toLowerCase().trim())
}

function storageKey(email: string) {
  return `sc_academy_${email.toLowerCase().trim()}`
}

function defaultAccount(email: string): UserAccount {
  return {
    email,
    coins: 0,
    inventory: { energyDrink: 0, bookmark: 0 },
    equippedTitle: null,
    earnedTitles: [],
    bookmarks: {},
    discountCodes: [],
    cardUnlocked: false,
    completedQuizzes: {},
    completedLessons: [],
  }
}

export function getAccount(email: string): UserAccount {
  if (typeof window === 'undefined' || !email) return defaultAccount(email)
  const raw = localStorage.getItem(storageKey(email))
  if (!raw) return defaultAccount(email)
  try { return { ...defaultAccount(email), ...JSON.parse(raw) } }
  catch { return defaultAccount(email) }
}

export function saveAccount(acc: UserAccount) {
  if (typeof window === 'undefined' || !acc.email) return
  localStorage.setItem(storageKey(acc.email), JSON.stringify(acc))
}

// ── 金幣（原始，不檢查重複）──
export function addCoins(email: string, amount: number): number {
  if (!email) return 0
  const acc = getAccount(email)
  acc.coins += amount
  saveAccount(acc)
  return acc.coins
}

export function spendCoins(email: string, amount: number): boolean {
  if (!email) return false
  const acc = getAccount(email)
  if (acc.coins < amount) return false
  acc.coins -= amount
  saveAccount(acc)
  return true
}

// ── 答對測驗 +1🪙（僅首次，同一題不重複）──
// 回傳 { awarded: boolean, totalCoins: number }
export function awardQuizCoin(email: string, lessonId: string, quizIndex: number) {
  if (!email) return { awarded: false, totalCoins: 0 }
  const acc = getAccount(email)
  const done = acc.completedQuizzes[lessonId] || []
  if (done.includes(quizIndex)) {
    return { awarded: false, totalCoins: acc.coins }
  }
  acc.completedQuizzes[lessonId] = [...done, quizIndex]
  acc.coins += 1
  saveAccount(acc)
  return { awarded: true, totalCoins: acc.coins }
}

export function isQuizCompleted(email: string, lessonId: string, quizIndex: number): boolean {
  if (!email) return false
  const acc = getAccount(email)
  return (acc.completedQuizzes[lessonId] || []).includes(quizIndex)
}

// ── 完課 bonus +2🪙（每堂課只給一次）──
export function awardLessonBonus(email: string, lessonId: string) {
  if (!email) return { awarded: false, totalCoins: 0 }
  const acc = getAccount(email)
  if (acc.completedLessons.includes(lessonId)) {
    return { awarded: false, totalCoins: acc.coins }
  }
  acc.completedLessons = [...acc.completedLessons, lessonId]
  acc.coins += 2
  saveAccount(acc)
  return { awarded: true, totalCoins: acc.coins }
}

export function isLessonCompleted(email: string, lessonId: string): boolean {
  if (!email) return false
  const acc = getAccount(email)
  return acc.completedLessons.includes(lessonId)
}

// ── 庫存 ──
export function addInventory(email: string, item: keyof UserAccount['inventory'], qty = 1) {
  if (!email) return
  const acc = getAccount(email)
  acc.inventory[item] = (acc.inventory[item] || 0) + qty
  saveAccount(acc)
}

export function useInventory(email: string, item: keyof UserAccount['inventory']): boolean {
  if (!email) return false
  const acc = getAccount(email)
  if ((acc.inventory[item] || 0) <= 0) return false
  acc.inventory[item] -= 1
  saveAccount(acc)
  return true
}

// ── 書籤 ──
export function saveBookmark(email: string, lessonId: string, slideIndex: number) {
  if (!email) return
  const acc = getAccount(email)
  acc.bookmarks[lessonId] = slideIndex
  saveAccount(acc)
}

export function getBookmark(email: string, lessonId: string): number | null {
  if (!email) return null
  const acc = getAccount(email)
  return typeof acc.bookmarks[lessonId] === 'number' ? acc.bookmarks[lessonId] : null
}

// ── 折扣碼 ──
export function generateDiscountCode(email: string): string {
  const acc = getAccount(email)
  const rand = Math.random().toString(36).toUpperCase().slice(2, 8)
  const code = `SHOP-${rand}`
  acc.discountCodes = [...(acc.discountCodes || []), code]
  saveAccount(acc)
  return code
}

// ── 稱號 ──
export const AVAILABLE_TITLES = [
  'K線偵探', '量能大師', '均線達人',
  '支撐壓力王', '偵探學員', '驚喜學院認證',
]

export function addTitle(email: string, title: string) {
  if (!email) return
  const acc = getAccount(email)
  if (!acc.earnedTitles.includes(title)) {
    acc.earnedTitles.push(title)
    if (!acc.equippedTitle) acc.equippedTitle = title
    saveAccount(acc)
  }
}

export function equipTitle(email: string, title: string): boolean {
  if (!email) return false
  const acc = getAccount(email)
  if (!acc.earnedTitles.includes(title)) return false
  acc.equippedTitle = title
  saveAccount(acc)
  return true
}

// ── 學院名片 ──
export function unlockCard(email: string) {
  if (!email) return
  const acc = getAccount(email)
  acc.cardUnlocked = true
  saveAccount(acc)
}

// ── 三階證書門檻定義 ──
export interface TierDef {
  key: 'basic' | 'intermediate' | 'advanced'
  label: string
  emoji: string
  color: string
  required: number   // 需完成幾堂課
  description: string
}

export const CERT_TIERS: TierDef[] = [
  {
    key: 'basic',
    label: '初階認證',
    emoji: '🥉',
    color: '#b45309',
    required: 3,
    description: '完成任意 3 堂課，掌握基礎讀圖能力',
  },
  {
    key: 'intermediate',
    label: '中階認證',
    emoji: '🥈',
    color: '#6b7280',
    required: 6,
    description: '再完成 3 堂課，能獨立分析技術訊號',
  },
  {
    key: 'advanced',
    label: '高階認證',
    emoji: '🥇',
    color: '#d97706',
    required: 14,
    description: '完成全部 14 堂課，具備完整投資判讀能力',
  },
]

// ── 商店商品定義 ──
export interface ShopItem {
  id: string
  name: string
  desc: string
  price: number
  coming: boolean
}

export const SHOP_ITEMS: ShopItem[] = [
  {
    id: 'energyDrink',
    name: '☕ 能量飲料',
    desc: '答錯測驗時使用，直接跳過此題（庫存消耗 1 罐）',
    price: 2,
    coming: false,
  },
  {
    id: 'bookmark',
    name: '📌 課程書籤',
    desc: '儲存目前頁面，下次進入自動跳回（每次用掉 1 枚）',
    price: 3,
    coming: false,
  },
  {
    id: 'discountCode',
    name: '🎁 小舖折扣碼',
    desc: '生成序號，加 LINE 截圖出示可折抵 NT$30',
    price: 5,
    coming: false,
  },
  {
    id: 'card',
    name: '🎨 學院名片',
    desc: '解鎖學習歷程圖卡，可截圖分享社群',
    price: 20,
    coming: false,
  },
  {
    id: 'title',
    name: '🏷️ 限定稱號',
    desc: '解鎖「K線偵探」等職稱，顯示在學院名片與證書上',
    price: 30,
    coming: false,
  },
]
