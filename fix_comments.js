const { MongoClient } = require('mongodb');
const uri = require('fs').readFileSync('.env.local','utf8').match(/MONGODB_URI=(.+)/)[1].trim();
MongoClient.connect(uri).then(client => {
  const db = client.db('SurpriseCornerDB');
  return db.collection('chapter_comments').updateMany(
    { chapterId: { $regex: '^lulu-s-' } },
    { $set: { chapterId: 'lulu-life' } }
  ).then(r => {
    console.log('更新筆數：', r.modifiedCount);
    client.close();
  });
}).catch(console.error);
