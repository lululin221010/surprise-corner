const fs = require('fs');
let content = fs.readFileSync('src/app/api/admin/comments/route.ts', 'utf8');
content = content
  .replace("const { id, approved } = await req.json();", "const { id, approved, reply } = await req.json();")
  .replace(
    "    const db = await dbConnect();\r\n    await db\r\n      .collection('chapter_comments')\r\n      .updateOne({ _id: new ObjectId(id) }, { $set: { approved } });",
    "    const db = await dbConnect();\r\n    const updateFields = { approved };\r\n    if (typeof reply === 'string') {\r\n      updateFields.reply = reply.trim();\r\n      updateFields.repliedAt = new Date();\r\n    }\r\n    await db\r\n      .collection('chapter_comments')\r\n      .updateOne({ _id: new ObjectId(id) }, { $set: updateFields });"
  );
fs.writeFileSync('src/app/api/admin/comments/route.ts',

console.log('done - replaced: ' + content.includes('updateFields'));
