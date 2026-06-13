// 用法：node scripts/add-master-lesson.mjs 1 [2 3 ...]
// 從 股市學院\草稿\高階版\高階NN_課程.md 抽出 TypeScript 物件，
// 插入 courses.ts 的 __MASTER_LESSONS_INSERT__ 標記前，
// 新 chart type 補進 __CHART_TYPES_INSERT__ 標記前。
// 高階特有：slide body 內含 markdown 表格 / ASCII 框，純文字渲染會醜，
//           自動把表格列轉成「· 欄1｜欄2」項目符號，分隔/框線整列移除。
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dir = dirname(fileURLToPath(import.meta.url))
const COURSES = join(__dir, '..', 'src', 'app', 'classroom', 'stock', 'courses.ts')
const DRAFTS = 'C:/Users/user/Desktop/有的沒的小舖/驚喜樂世界/驚喜學院/股市學院/草稿/高階版'

const nums = process.argv.slice(2).map(Number).filter(n => n >= 1 && n <= 9)
if (!nums.length) { console.error('請給堂次，例：node scripts/add-master-lesson.mjs 1 2'); process.exit(1) }

// 把 slide body 裡的 markdown 表格 / ASCII 框清乾淨
function cleanBody(s) {
  return s.split('\n').map(line => {
    const t = line.replace(/\*\*/g, '') // 去粗體
    const trimmed = t.trim()
    // 整列只有分隔/框線符號（無中文或英數）→ 移除
    if (trimmed && /^[\s|│┌┐└┘├┤┬┴┼─=:\-]+$/.test(trimmed)) return null
    // 含直線分隔的表格列 → 取各格文字，以｜串接
    if (/[|│]/.test(t)) {
      const cells = t.split(/[|│]/).map(c => c.trim()).filter(c => c.length)
      if (cells.length >= 2) return '· ' + cells.join('｜')
      if (cells.length === 1) return cells[0]
    }
    return t
  }).filter(l => l !== null).join('\n')
}

let courses = readFileSync(COURSES, 'utf8').replace(/^﻿/, '')

const LESSON_MARK = /^.*__MASTER_LESSONS_INSERT__.*$/m
const TYPE_MARK = /^.*__CHART_TYPES_INSERT__.*$/m
if (!LESSON_MARK.test(courses) || !TYPE_MARK.test(courses)) {
  console.error('courses.ts 找不到插入標記'); process.exit(1)
}

const existingTypes = new Set([...courses.matchAll(/\|\s*'([a-z0-9-]+)'/g)].map(m => m[1]))

for (const n of nums) {
  const nn = String(n).padStart(2, '0')
  const md = readFileSync(join(DRAFTS, `高階${nn}_課程.md`), 'utf8').replace(/^﻿/, '')

  const fence = md.match(/```typescript\r?\n([\s\S]*?)\r?\n```/)
  if (!fence) { console.error(`高階${nn}：找不到 typescript 區塊`); process.exit(1) }
  let obj = fence[1].trim()
  if (!obj.endsWith(',')) obj += ','

  if (courses.includes(`'master-lesson-${n}'`)) { console.log(`高階${nn} 已存在，略過`); continue }

  obj = cleanBody(obj)
  obj = obj.split('\n').map(l => '    ' + l).join('\n')

  courses = courses.replace(LESSON_MARK, m => obj + '\n' + m)

  const used = [...obj.matchAll(/chart:\s*\{\s*type:\s*'([a-z0-9-]+)'/g)].map(m => m[1])
  const fresh = [...new Set(used)].filter(t => !existingTypes.has(t))
  if (fresh.length) {
    const lines = fresh.map(t => `    | '${t}'`).join('\n')
    courses = courses.replace(TYPE_MARK, m => lines + '\n' + m)
    fresh.forEach(t => existingTypes.add(t))
  }
  console.log(`高階${nn} 插入完成，新 chart types: ${fresh.join(', ') || '（無）'}`)
}

writeFileSync(COURSES, courses, 'utf8')
console.log('courses.ts 已更新')
