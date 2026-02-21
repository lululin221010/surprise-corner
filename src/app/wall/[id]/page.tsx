// 📁 路徑：src/app/wall/[id]/page.tsx
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import Link from "next/link";

export default async function Page({ params }: any) {
  const client = await clientPromise;
  const db = client.db();
  let post = null;
  try {
    post = await db.collection("wall").findOne({ _id: new ObjectId(params.id) });
  } catch {
    return <div style={{ padding: '20px', color: 'white' }}>ID 格式錯誤</div>;
  }
  if (!post) return <div style={{ padding: '20px', color: 'white' }}>找不到作品</div>;

  return (
    <main style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #1a1040 100%)', color: '#fff', padding: '4rem 1rem' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div style={{
          background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(196,181,253,0.2)',
          borderRadius: '24px', padding: '2.5rem', textAlign: 'center', backdropFilter: 'blur(20px)'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✨</div>
          <p style={{ fontSize: '1.2rem', lineHeight: 1.9, color: '#e9d5ff', marginBottom: '2rem' }}>{post.text}</p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {post.creatorId && (
              <Link href={`/creator/${post.creatorId}`} style={{
                background: 'rgba(244,114,182,0.2)', color: '#f472b6',
                padding: '0.5rem 1.2rem', borderRadius: '20px', textDecoration: 'none', fontSize: '0.9rem'
              }}>👤 作者全部作品</Link>
            )}
            <Link href="/wall" style={{
              background: 'rgba(167,139,250,0.2)', color: '#a78bfa',
              padding: '0.5rem 1.2rem', borderRadius: '20px', textDecoration: 'none', fontSize: '0.9rem'
            }}>← 回作品牆</Link>
            <Link href="/random" style={{
              background: 'linear-gradient(135deg, #7c3aed, #ec4899)', color: '#fff',
              padding: '0.5rem 1.2rem', borderRadius: '20px', textDecoration: 'none', fontSize: '0.9rem'
            }}>🎲 下一個驚喜</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
