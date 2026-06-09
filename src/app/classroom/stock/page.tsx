'use client';
// 📄 路徑：src/app/classroom/stock/page.tsx
// 股市學院 — 空殼，academy-root 供後續嵌入課程元件

import Link from 'next/link';
import ShareButtons from '@/components/ShareButtons';

export default function StockClassroomPage() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a1628 0%, #0f1e0f 50%, #0a1628 100%)',
      padding: '2rem 1rem 6rem',
    }}>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>

        {/* 返回 */}
        <div style={{ marginBottom: '1.5rem' }}>
          <Link href="/classroom" style={{
            color: '#6b7280', fontSize: '0.85rem', textDecoration: 'none',
          }}>
            ← 所有學院
          </Link>
        </div>

        {/* 標題 */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{ fontSize: '3.5rem', marginBottom: '0.8rem' }}>📈</div>
          <h1 style={{
            color: '#fff', fontSize: '2rem', fontWeight: 900,
            margin: '0 0 0.5rem',
            background: 'linear-gradient(135deg, #fff 0%, #6ee7b7 60%, #34d399 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>
            股市學院
          </h1>
          <p style={{ color: '#9ca3af', fontSize: '0.95rem', lineHeight: 1.7, margin: 0 }}>
            每篇5分鐘，看懂一個股市概念。<br />
            K線、法人籌碼、均線……說人話，不廢話。
          </p>
        </div>

        {/* ===== 課程內容掛載點 ===== */}
        <div id="academy-root">
          {/* 課程元件將嵌入這裡 */}
          <div style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px dashed rgba(52,211,153,0.2)',
            borderRadius: '16px', padding: '3rem',
            textAlign: 'center', color: '#4b5563',
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.8rem' }}>🔨</div>
            <div style={{ fontSize: '0.9rem' }}>課程內容整備中，敬請期待</div>
          </div>
        </div>

        {/* 分享 */}
        <div style={{ marginTop: '3rem' }}>
          <p style={{ color: '#6b7280', fontSize: '0.8rem', textAlign: 'center', marginBottom: '0.8rem' }}>
            先分享給朋友，一起等開課 👇
          </p>
          <ShareButtons title="股市學院 | 驚喜角落" content="5分鐘看懂一個股市概念，說人話的股市小教室！" />
        </div>

      </div>
    </div>
  );
}
