// 📁 路徑：src/app/wall/[id]/page.tsx

import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import Link from "next/link";

export default async function Page({ params }: any) {
  const client = await clientPromise;
  const db = client.db();

  let post = null;
  try {
    post = await db.collection("wall").findOne({
      _id: new ObjectId(params.id),
    });
  } catch {
    return <div style={{ padding: "20px" }}>找不到作品</div>;
  }

  if (!post) {
    return <div style={{ padding: "20px" }}>找不到作品</div>;
  }

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h2>✨ 今日驚喜</h2>

      <div
        style={{
          border: "1px solid #ddd",
          padding: "20px",
          borderRadius: "12px",
          fontSize: "1.1rem",
          lineHeight: "1.8",
          margin: "20px 0",
        }}
      >
        {post.text}
      </div>

      <div style={{ display: "flex", gap: "16px", marginTop: "20px" }}>
        {post.creatorId && (
          <Link href={`/creator/${post.creatorId}`}>👤 看作者全部作品 →</Link>
        )}
        <Link href="/wall">← 回作品牆</Link>
        <Link href="/random">🎲 下一個驚喜</Link>
      </div>
    </div>
  );
}