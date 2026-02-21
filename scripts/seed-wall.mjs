// 📁 路徑：scripts/seed-wall.mjs
// 執行方式：node scripts/seed-wall.mjs

import { MongoClient } from "mongodb";
import * as dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: resolve(__dirname, "../.env.local") });

const samples = [
  "謝謝你陪我走過低潮，有你真好。",
  "生日快樂，希望每天都有光照進來。",
  "未來的自己，請繼續加油，你比自己想像的更強。",
  "給小花：今天也想你，希望你在那裡很好。",
  "告白：謝謝你出現在我的生命，讓一切都不一樣了。",
  "給媽媽：您的辛苦我都看在眼裡，謝謝您。",
];

const client = new MongoClient(process.env.MONGODB_URI);

await client.connect();
const db = client.db();

for (const text of samples) {
  await db.collection("wall").insertOne({
    text,
    creatorId: null,
    ip: "seed",
    createdAt: new Date(),
  });
  console.log("✅ 新增:", text.substring(0, 20) + "...");
}

console.log("\n🎉 完成！作品牆已有初始內容");
await client.close();
process.exit();