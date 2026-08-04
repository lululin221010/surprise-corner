# Project Notes for Agents

## 新聊天室/新Agent必讀（2026-08-04補上）

每次開始處理本專案前，請先閱讀同資料夾的 `CLAUDE.md`（專案背景、規劃文件更新流程）。

跨專案SOP（電子書出版/繪本/影片/社群/內容品質/AI Agent安全/收費制度/課程製作SOP/驚喜學院制度）另外查：

`C:\Users\user\Desktop\MyProjects01\AIOS\06_Operations\README.md`

以下Buffer/FB憑證資訊是這個檔案原本就有的內容，保留不動：

## Project Paths

There are two independent projects:

- ST (有的沒的小舖): `C:\Users\user\Desktop\MyProjects01\my-bookstore-next-V2`
- SS (驚喜角落): `C:\Users\user\Desktop\MyProjects01\surprise-corner-src`

## Social Analytics and API Credentials

Buffer and Facebook-related credentials are stored in the SS project only, not in ST.

Use this file for related environment variables:

`C:\Users\user\Desktop\MyProjects01\surprise-corner-src\.env.local`

That file contains these fields:

- `BUFFER_API_KEY`
- `FB_PAGE_ID`
- `FB_PAGE_ACCESS_TOKEN`
- `FB_USER_TOKEN`
- `FB_APP_ID`
- `FB_APP_SECRET`

For any task involving Buffer analysis, social post metrics, Facebook Graph API, Facebook analytics, or related data pulls, run commands from the SS project directory:

`C:\Users\user\Desktop\MyProjects01\surprise-corner-src`

Do not look for these credentials in unrelated folders such as `Documents` projects or the ST project; those locations are not expected to contain the relevant settings.

## Existing Weekly Buffer Analysis Automation (2026-08-04 discovered)

Before writing any new Buffer analysis script, check first: a working weekly analysis already exists as a Codex scheduled automation, not a repo script.

- Location: `C:\Users\user\.codex\automations\buffer-2\automation.toml` (kind = cron, runs every Monday 9am)
- It uses **Buffer's GraphQL API** to pull Facebook/Instagram/Threads published posts — **not** the legacy REST API (`api.bufferapp.com/1/...`). The `BUFFER_API_KEY` in `.env.local` is a "Public API token" that the legacy REST API rejects with 401; only the GraphQL endpoint works with it.
- It writes/refreshes these files directly in this repo's root: `buffer_link_analysis_report.md`, `buffer_posts_raw.csv`, `buffer_link_group_summary.csv`, `buffer_keyword_posts.csv`
- Its own run log is `C:\Users\user\.codex\automations\buffer-2\memory.md`
- **Known gap**: this automation runs silently — it does not push any notification when done, so nobody knows it ran unless someone manually checks the report files. A CC session doing the periodic `content-batch-restock-reminder` task should check these files for updates as part of that routine.
- A related but separate automation, `C:\Users\user\.codex\automations\buffer\automation.toml` (heartbeat, weekly Monday 9:30), checks Buffer queue levels and drafts new posts when low — this overlaps somewhat with ST-side `content-batch-restock-reminder` scheduled task; worth discussing consolidation with 妹 at some point.
