// 📄 路徑：src/app/lab/illusion/page.tsx
// 《眼見不為憑》入口：入門版（3 關）／進階版（5 關）。遊戲本體是 public/lab/illusion/play.html（靜態，GA4 事件 ill_*）
import Link from 'next/link';

export default function IllusionPage() {
  return (
    <main style={{ maxWidth: 480, margin: '0 auto', padding: '40px 20px', textAlign: 'center' }}>
      <h1 style={{ fontSize: 28, margin: '0 0 8px' }}>眼見不為憑</h1>
      <p style={{ margin: '0 0 28px', lineHeight: 1.6 }}>
        憑眼睛調一調，看你被錯覺騙了多少。
        <br />
        免登入、免費。
      </p>
      <p style={{ margin: '0 0 12px' }}>
        <a
          href="/lab/illusion/play.html?ed=basic"
          style={{ display: 'block', padding: '16px', borderRadius: 14, background: '#e07a3f', color: '#fff', fontWeight: 700, textDecoration: 'none' }}
        >
          入門版・3 個小測驗（約 1 分鐘）
        </a>
      </p>
      <p style={{ margin: '0 0 32px' }}>
        <a
          href="/lab/illusion/play.html?ed=pro"
          style={{ display: 'block', padding: '16px', borderRadius: 14, background: '#3d5a80', color: '#fff', fontWeight: 700, textDecoration: 'none' }}
        >
          進階版・5 個小測驗（約 2～3 分鐘）
        </a>
      </p>
      <Link href="/" style={{ color: '#6d6a78' }}>回驚喜角落首頁</Link>
    </main>
  );
}
