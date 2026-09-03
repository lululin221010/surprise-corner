#!/usr/bin/env bash
# PreToolUse hook on Edit|Write. Reads .claude/protected-files.txt (one
# path-substring per line) and asks for confirmation before touching any
# file whose path contains one of those substrings.
FILE=$(node -e "let d='';process.stdin.on('data',c=>d+=c);process.stdin.on('end',()=>{try{const j=JSON.parse(d);process.stdout.write((j.tool_input&&(j.tool_input.file_path||j.tool_input.path))||'')}catch(e){}})")
[ -z "$FILE" ] && exit 0

LIST=".claude/protected-files.txt"
[ -f "$LIST" ] || exit 0

while IFS= read -r pattern; do
  case "$pattern" in
    ''|'#'*) continue ;;
  esac
  case "$FILE" in
    *"$pattern"*)
      REASON="這個檔案在 .claude/protected-files.txt 被標記為需要額外確認才能修改：$FILE（符合規則：$pattern）。請先跟使用者確認要改什麼、為什麼要改，再繼續。"
      REASON="$REASON" node -e "process.stdout.write(JSON.stringify({hookSpecificOutput:{hookEventName:'PreToolUse',permissionDecision:'ask',permissionDecisionReason:process.env.REASON}}))"
      exit 0
      ;;
  esac
done < "$LIST"
exit 0
