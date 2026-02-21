// 📁 路徑：src/app/wall/page.tsx
import clientPromise from "@/lib/mongodb";
import Link from "next/link";

export default async function WallPage() {
  const client = await clientPromise;
  const db = client.db();
  const posts = await db.collection("wall").find({}).sort({ createdAt: -1 }).limit(50).toArray();
  const serialized = posts.map(p => ({ ...p, _id: p._id.toString() }));

  return (
    <main style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #1a1040 100%)', color: '#fff', padding: '3rem 1rem' }}>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        <h1 style={{ textAlign: 'center', fontSize: '2rem', fontWeight: 900, marginBottom: '0.5rem',
          background: 'linear-gradient(135deg, #fff, #c4b5fd)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          🔥 今日大家的驚喜
        </h1>
        <p style={{ textAlign: 'center', color: '#9ca3af', marginBottom: '2rem' }}>共 {serialized.length} 件作品</p>

        {serialized.map(p => (
          <div key={p._id} style={{
            background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(196,181,253,0.2)',
            borderRadius: '16px', padding: '1.5rem', marginBottom: '1rem',
            backdropFilter: 'blur(10px)',
          }}>
            <p style={{ margin: '0 0 1rem', lineHeight: 1.8, fontSize: '1rem' }}>{p.text}</p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <Link href={`/wall/${p._id}`} style={{ color: '#a78bfa', fontSize: '0.85rem' }}>查看作品 →</Link>
              {p.creatorId && (
                <Link href={`/creator/${p.creatorId}`} style={{ color: '#f472b6', fontSize: '0.85rem' }}>作者頁 →</Link>
              )}
            </div>
          </div>
        ))}

        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <Link href="/random" style={{
            background: 'linear-gradient(135deg, #7c3aed, #ec4899)', color: '#fff',
            padding: '0.8rem 2rem', borderRadius: '30px', textDecoration: 'none', fontWeight: 700
          }}>🎲 看下一個驚喜</Link>
        </div>
      </div>
    </main>
  );
}