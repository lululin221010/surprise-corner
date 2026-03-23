// 📁 路徑：scripts/migrate-comments-to-wall.mjs
// 功能：把 chapter_comments 裡已核准的舊留言，搬到 wall 集合顯示在作品牆
// 執行：node scripts/migrate-comments-to-wall.mjs

import { MongoClient } from "mongodb";
import * as dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: resolve(__dirname, "../.env.local") });

const client = new MongoClient(process.env.MONGODB_URI);
await client.connect();
const db = client.db();

// 1. 讀出所有已核准的舊留言
const oldComments = await db.collection("chapter_comments")
  .find({ approved: true })
  .sort({ createdAt: 1 })
  .toArray();

console.log(`找到 ${oldComments.length} 則已核准的舊留言`);

if (oldComments.length === 0) {
  console.log("沒有需要搬移的留言，結束。");
  await client.close();
  process.exit();
}

// 2. 檢查作品牆裡有沒有標記為 migrated 的舊留言（避免重複搬）
const existingMigrated = await db.collection("wall")
  .countDocuments({ _migrated: true });

if (existingMigrated > 0) {
  console.log(`⚠️  作品牆已有 ${existingMigrated} 筆遷移過的留言，不重複執行。`);
  console.log("如需重新遷移，請先刪除 wall 裡 { _migrated: true } 的文件。");
  await client.close();
  process.exit();
}

// 3. 章節 ID → 顯示名稱對應表（方便讀者知道是哪集的留言）
const chapterNames = {
  "lulu-s-01-01": "第一集",
  "lulu-s-01-02": "第二集",
  "lulu-s-01-03": "第三集",
  "lulu-s-01-04": "第四集",
  "lulu-s-01-05": "第五集",
  "lulu-s-01-06": "第六集",
  "lulu-s-01-07": "第七集",
  "lulu-s-01-08": "第八集",
  "lulu-s-01-09": "第九集",
  "lulu-s-01-10": "第十集",
  "lulu-s-01-11": "第十一集",
  "lulu-s-01-12": "第十二集",
};

// 4. 把舊留言轉成作品牆格式
let successCount = 0;

for (const c of oldComments) {
  const chapterLabel = chapterNames[c.chapterId] || c.chapterId;
  const fromName = c.petName ? `${c.nickname}（${c.petName}）` : c.nickname;

  await db.collection("wall").insertOne({
    text: c.content,
    to: "魯魯",                   // 這些留言都是給魯魯的
    from: fromName,               // 讀者暱稱 + 寵物名
    label: "魯魯讀者",                   // 對應作品牆 tab key
    approved: true,               // 原本已核准，直接顯示
    reply: c.reply || "",         // 如果有站長回覆也帶過去
    ip: "migrated",
    _migrated: true,              // 標記這是遷移過來的
    _originalId: c._id,           // 保留原始 ID 供查對
    _chapterId: c.chapterId,      // 保留章節 ID
    createdAt: c.createdAt,       // 保留原始時間
  });

  console.log(`✅ ${fromName} → ${chapterLabel}：${c.content.substring(0, 30)}...`);
  successCount++;
}

console.log(`\n🎉 完成！共遷移 ${successCount} 則魯魯讀者留言到作品牆`);
console.log("📌 這些留言標記了 { _migrated: true }，可在 MongoDB 裡查閱");
await client.close();
process.exit();
