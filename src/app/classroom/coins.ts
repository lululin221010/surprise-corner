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
  bookmarks: Record<string, number>   // lessonId → slideIndex
  discountCodes: string[]             // 已生成的折扣碼
  cardUnlocked: boolean               // 🎨 學院名片
}

// 目前使用中的 email（跨元件共享）
const CURRENT_EMAIL_KEY = 'sc_current_email'

export function getCurrentEmail(): string {
  if (typeof window === 'undefined') return ''
  return localStorage.getItem(CURRENT_EMAIL_KEY) || ''
}

export function setCurrentEmail(email: string) {
  if (typeof window === 'undefined') return
  localStorage.setItem(CURRENT_EMAIL_KEY, email.toLowerCase().trim())
}

// ── 帳號操作 ──

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

// ── 金幣 ──

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
    desc: '答錯測驗時可使用，直接過這一題，每次購買 1 罐',
    price: 2,
    coming: false,
  },
  {
    id: 'bookmark',
    name: '📌 課程書籤',
    desc: '在課程中儲存目前頁面，下次自動跳回來',
    price: 3,
    coming: false,
  },
  {
    id: 'discountCode',
    name: '🎁 小舖折扣碼',
    desc: '生成一組序號，加 LINE 出示可折抵 NT$30',
    price: 5,
    coming: false,
  },
  {
    id: 'card',
    name: '🎨 學院名片',
    desc: '解鎖個人學習歷程圖卡，可截圖分享到社群',
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
