// src/lib/mongodb.ts
import { MongoClient } from 'mongodb';

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

function getMongoClient() {
  const uri = process.env.MONGODB_URI;
  
  if (!uri) {
    console.error('❌ MONGODB_URI 環境變數未設定');
    console.error('process.env.MONGODB_URI:', uri);
    throw new Error('缺少環境變數 MONGODB_URI,請在 .env.local 設定');
  }

  if (process.env.NODE_ENV === 'development') {
    // 開發模式:使用全域變數避免熱重載時重複連線
    if (!global._mongoClientPromise) {
      client = new MongoClient(uri);
      global._mongoClientPromise = client.connect();
    }
    return global._mongoClientPromise;
  } else {
    // 生產模式:每次都建立新連線
    client = new MongoClient(uri);
    return client.connect();
  }
}

// 導出一個 Promise,在實際使用時才建立連線
clientPromise = getMongoClient();

export default clientPromise;