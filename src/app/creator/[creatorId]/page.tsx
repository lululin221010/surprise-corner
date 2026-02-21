// 📁 路徑：src/app/creator/[creatorId]/page.tsx

import clientPromise from "@/lib/mongodb";
import Link from "next/link";

export default async function Page({ params }: any) {
  const client = await clientPromise;
  const db = client.db();

  const posts = await db
    .collection("wall")
    .find({ creatorId: params.creatorId })
    .sort({ createdAt: -1 })
    .toArray();

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>👤 創作者作品集</h1>
      <p style={{ color: "#888", fontSize: "0.85rem" }}>
        共 {posts.length} 件作品
      </p>

      {posts.length === 0 && <p>這位創作者還沒有作品</p>}

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
          <p style={{ margin: "0 0 8px" }}>{p.text}</p>
          <Link
            href={`/wall/${p._id}`}
            style={{ fontSize: "0.85rem", color: "#888" }}
          >
            查看作品頁 →
          </Link>
        </div>
      ))}

      <div style={{ marginTop: "20px" }}>
        <Link href="/wall">← 回作品牆</Link>
      </div>
    </div>
  );
}