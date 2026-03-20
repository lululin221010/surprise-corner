const fs=require("fs");
let c=fs.readFileSync("src/app/api/admin/comments/route.ts","utf8");
const old = "    await db\r\n      .collection('chapter_comments')\r\n      .updateOne({ _id: new ObjectId(id) }, { $set: { approved } });";
const newStr = "    const updateFields = { approved };\r\n    if (typeof reply === 'string') {\r\n      updateFields.reply = reply.trim();\r\n      updateFields.repliedAt = new Date();\r\n    }\r\n    await db\r\n      .collection('chapter_comments')\r\n      .updateOne({ _id: new ObjectId(id) }, { $set: updateFields });";
c = c.replace(old, newStr);
fs.writeFileSync("src/app/api/admin/comments/route.ts", c, "utf8");
console.log(c.includes("updateFields"));
