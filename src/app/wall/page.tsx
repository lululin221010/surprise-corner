// 📁 路徑：src/app/wall/page.tsx

import clientPromise from "@/lib/mongodb";
import Link from "next/link";

export default async function WallPage() {
  const client = await clientPromise;
  const db = client.db();

  const posts = await db
    .collection("wall")
    .find({})
    .sort({ createdAt: -1 })
    .limit(50)
    .toArray();

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>🔥 今日大家的驚喜</h1>

      {posts.length === 0 && (
        <p style={{ color: "#888" }}>還沒有作品，快去生成第一個！</p>
      )}

      {posts.map((p: any) => (
        <div
          key={p._id.toString()}
          style={{
            border: "1px solid #ddd",
            margin: "10px 0",
            padding: "15px",
            borderRadius: "8px",
          }}
        >
          <p style={{ margin: "0 0 10px" }}>{p.text}</p>
          <div style={{ display: "flex", gap: "12px", fontSize: "0.85rem" }}>
            <Link href={`/wall/${p._id.toString()}`}>查看作品 →</Link>
            {p.creatorId && (
              <Link href={`/creator/${p.creatorId}`}>作者頁 →</Link>
            )}
          </div>
        </div>
      ))}

      <div style={{ marginTop: "30px", textAlign: "center" }}>
        <Link href="/random">🎲 看下一個驚喜</Link>
      </div>
    </div>
  );
}