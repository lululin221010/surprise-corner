// 用法：node scripts/add-advanced-lesson.mjs 2 [3 4 ...]
// 從 股市學院\草稿\進階版\進階NN_課程.md 抽出 TypeScript 物件，
// 插入 courses.ts 的 __ADVANCED_LESSONS_INSERT__ 標記前，
// 並把新 chart type 補進 __CHART_TYPES_INSERT__ 標記前。
// 同時：去除 slide body 的 **粗體**（前端是純文字渲染）。
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dir = dirname(fileURLToPath(import.meta.url))
const COURSES = join(__dir, '..', 'src', 'app', 'classroom', 'stock', 'courses.ts')
const DRAFTS = 'C:/Users/user/Desktop/有的沒的小舖/驚喜樂世界/驚喜學院/股市學院/草稿/進階版'

const nums = process.argv.slice(2).map(Number).filter(n => n >= 2 && n <= 10)
if (!nums.length) { console.error('請給堂次，例：node scripts/add-advanced-lesson.mjs 2 3'); process.exit(1) }

let courses = readFileSync(COURSES, 'utf8').replace(/^﻿/, '')

const LESSON_MARK = /^.*__ADVANCED_LESSONS_INSERT__.*$/m
const TYPE_MARK = /^.*__CHART_TYPES_INSERT__.*$/m
if (!LESSON_MARK.test(courses) || !TYPE_MARK.test(courses)) {
  console.error('courses.ts 找不到插入標記'); process.exit(1)
}

const existingTypes = new Set([...courses.matchAll(/\|\s*'([a-z0-9-]+)'/g)].map(m => m[1]))

for (const n of nums) {
  const nn = String(n).padStart(2, '0')
  const md = readFileSync(join(DRAFTS, `進階${nn}_課程.md`), 'utf8').replace(/^﻿/, '')

  const fence = md.match(/```typescript\r?\n([\s\S]*?)\r?\n```/)
  if (!fence) { console.error(`進階${nn}：找不到 typescript 區塊`); process.exit(1) }
  let obj = fence[1].trim()
  if (!obj.endsWith(',')) obj += ','

  if (courses.includes(`'advanced-lesson-${n}'`)) { console.log(`進階${nn} 已存在，略過`); continue }

  // 去掉 **粗體**（slide body 是純文字）
  obj = obj.replace(/\*\*/g, '')
  // 縮排對齊 lessons 陣列層級
  obj = obj.split('\n').map(l => '    ' + l).join('\n')

  courses = courses.replace(LESSON_MARK, m => obj + '\n' + m)

  // 收集新 chart type
  const used = [...obj.matchAll(/chart:\s*\{\s*type:\s*'([a-z0-9-]+)'/g)].map(m => m[1])
  const fresh = [...new Set(used)].filter(t => !existingTypes.has(t))
  if (fresh.length) {
    const lines = fresh.map(t => `    | '${t}'`).join('\n')
    courses = courses.replace(TYPE_MARK, m => lines + '\n' + m)
    fresh.forEach(t => existingTypes.add(t))
  }
  console.log(`進階${nn} 插入完成，新 chart types: ${fresh.join(', ') || '（無）'}`)
}

writeFileSync(COURSES, courses, 'utf8')
console.log('courses.ts 已更新')
