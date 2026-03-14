import { readFileSync } from 'fs'

const transcriptPath = 'C:/Users/user/.claude/projects/C--Users-user-Desktop-MyProjects01-my-bookstore-next-V2--claude-worktrees-hungry-lichterman/c8e4fc48-2ce2-4717-8f07-edde1be7288b.jsonl'
const raw = readFileSync(transcriptPath, 'utf8')
const lines = raw.split('\n').filter(l => l.trim())

// Check lines 3132-3140 (between the assistant message and session summary)
for (let i = 3132; i <= 3142; i++) {
  if (i >= lines.length) break
  try {
    const obj = JSON.parse(lines[i])
    const role = obj.message?.role || obj.type
    const c = obj.message?.content
    let text = ''
    if (Array.isArray(c)) {
      for (const item of c) { if (item.type === 'text') text += item.text }
    } else if (typeof c === 'string') { text = c }
    console.log(`Line ${i} [${role}]: length=${text.length}`)
    if (text.length > 0 && text.length < 500) console.log('  Content:', text)
    else if (text.length >= 500) console.log('  Preview:', text.slice(0, 200))
  } catch(e) {
    console.log(`Line ${i}: parse error`)
  }
}
