const { MongoClient } = require("mongodb");
require("dotenv").config({ path: ".env.local" });
async function main() {
  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  const db = client.db();
  const result = await db.collection("wall").deleteMany({});
  console.log("已刪除", result.deletedCount, "筆");
  await client.close();
}
main();
