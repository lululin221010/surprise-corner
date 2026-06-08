import { notFound } from 'next/navigation';
import Link from 'next/link';
import trialsData from '../../../data/trials/psychology-trials.json';

type Trial = {
  slug: string;
  series: string;
  vol: number;
  title: string;
  prefaceHtml: string;
  shopUrl?: string;
};

const trials = trialsData as Trial[];

export async function generateStaticParams() {
  return trials.map(t => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const trial = trials.find(t => t.slug === slug);
  if (!trial) return {};
  return {
    title: `${trial.title}｜前言試閱｜驚喜角落`,
    description: `免費試閱《${trial.title}》前言，有的沒的小舖出品`,
  };
}

export default async function ReaderPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const trial = trials.find(t => t.slug === slug);
  if (!trial) notFound();

  const seriesSlugMap: Record<string, string> = {
    '人格心理學': 'personality-psychology',
    '成長心理學': 'growth-psychology',
    '暗黑心理學': 'dark-psychology',
    '認知心理學': 'cognitive-psychology',
    '潛意識心理學': 'unconscious-psychology',
    '關係心理學': 'relationship-psychology',
  };
  const seriesSlug = seriesSlugMap[trial.series] ?? '';

  return (
    <>
      <style>{`
        :root {
          --bg: #0e0e14;
          --text: #dcdcf0;
          --text-muted: #a8a8cc;
          --accent: #7a4a9e;
          --accent-light: rgba(122,74,158,0.15);
          --accent-dim: rgba(122,74,158,0.4);
          --card-border: rgba(122,74,158,0.2);
          --label: #9090b8;
        }
        .reader-body {
          background: var(--bg);
          color: var(--text);
          font-family: 'Noto Serif TC', 'Georgia', serif;
          font-size: 17px;
          line-height: 2;
          min-height: 100vh;
        }
        .reader-container {
          max-width: 720px;
          margin: 0 auto;
          padding: 0 40px 100px;
        }
        .reader-header {
          padding: 56px 0 48px;
          border-bottom: 1px solid var(--card-border);
          margin-bottom: 52px;
        }
        .reader-meta {
          font-family: 'Noto Sans TC', sans-serif;
          font-size: 11px;
          letter-spacing: 4px;
          color: var(--label);
          margin-bottom: 16px;
          text-transform: uppercase;
        }
        .reader-title {
          font-size: clamp(1.6rem, 4vw, 2.2rem);
          font-weight: 500;
          letter-spacing: 3px;
          color: #e8e8f8;
          line-height: 1.4;
          margin-bottom: 12px;
        }
        .reader-author {
          font-family: 'Noto Sans TC', sans-serif;
          font-size: 13px;
          color: var(--text-muted);
          letter-spacing: 3px;
          margin-bottom: 20px;
        }
        .trial-badge {
          display: inline-block;
          font-family: 'Noto Sans TC', sans-serif;
          font-size: 11px;
          letter-spacing: 3px;
          padding: 5px 14px;
          border: 1px solid var(--accent-dim);
          color: var(--text-muted);
          border-radius: 2px;
        }
        .reader-content h2 {
          font-size: 1.3rem;
          font-weight: 500;
          letter-spacing: 3px;
          color: #e0e0f0;
          margin: 48px 0 24px;
          line-height: 1.6;
        }
        .reader-content h3 {
          font-size: 1.05rem;
          font-weight: 500;
          letter-spacing: 2px;
          color: #dcdcf0;
          margin: 32px 0 14px;
        }
        .reader-content p {
          margin-bottom: 22px;
          text-align: justify;
          color: var(--text);
        }
        .reader-content blockquote {
          border-left: 2px solid var(--accent-dim);
          margin: 28px 0;
          padding: 14px 22px;
          background: var(--accent-light);
          color: #c8c8e4;
          font-size: 15px;
          line-height: 1.9;
        }
        .reader-content hr {
          border: none;
          border-top: 1px solid rgba(122,74,158,0.15);
          margin: 36px 0;
        }
        .fade-out {
          position: relative;
          margin-top: -100px;
          height: 180px;
          background: linear-gradient(to bottom, transparent, var(--bg) 80%);
          pointer-events: none;
        }
        .trial-end {
          text-align: center;
          padding: 48px 0;
          border-top: 1px solid var(--card-border);
        }
        .trial-end-label {
          font-family: 'Noto Sans TC', sans-serif;
          font-size: 11px;
          letter-spacing: 4px;
          color: var(--label);
          margin-bottom: 16px;
        }
        .trial-end-text {
          font-size: 15px;
          color: var(--text-muted);
          margin-bottom: 32px;
          line-height: 2;
        }
        .btn-buy {
          display: inline-block;
          font-family: 'Noto Sans TC', sans-serif;
          font-size: 13px;
          letter-spacing: 3px;
          padding: 12px 32px;
          background: var(--accent);
          color: #f0f0f8;
          border-radius: 2px;
          text-decoration: none;
          margin-right: 24px;
          transition: background 0.2s;
        }
        .btn-buy:hover { background: #8d5ab5; }
        .link-back {
          font-family: 'Noto Sans TC', sans-serif;
          font-size: 13px;
          color: var(--text-muted);
          text-decoration: none;
          letter-spacing: 1px;
        }
        .link-back:hover { color: var(--text); }
        .fixed-bar {
          position: fixed;
          bottom: 0; left: 0; right: 0;
          background: rgba(14,14,20,0.96);
          border-top: 1px solid rgba(122,74,158,0.25);
          backdrop-filter: blur(8px);
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 24px;
          padding: 14px 24px;
          z-index: 100;
          flex-wrap: wrap;
        }
        @media (max-width: 600px) {
          .reader-container { padding: 0 24px 80px; }
          .reader-title { font-size: 1.6rem; }
          .fixed-bar { gap: 16px; padding: 12px 16px; }
        }
      `}</style>

      <div className="reader-body">
        <div className="reader-container">

          <div style={{ paddingTop: '28px', marginBottom: '8px' }}>
            <Link href={`/${seriesSlug}.html`} className="link-back">← 返回系列頁</Link>
          </div>

          <header className="reader-header">
            <div className="reader-meta">{trial.series}．Vol.{trial.vol}｜前言試閱</div>
            <h1 className="reader-title">{trial.title}</h1>
            <div className="reader-author">盧林著／有的沒的小舖出品</div>
            <span className="trial-badge">前言免費試閱</span>
          </header>

          <div
            className="reader-content"
            dangerouslySetInnerHTML={{ __html: trial.prefaceHtml }}
          />

          <div className="fade-out" />

          <div className="trial-end">
            <div className="trial-end-label">試閱結束</div>
            <p className="trial-end-text">
              完整版包含前言與全部章節。<br />
              購買後可在小舖自助取件，永久下載。
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
              <a
                href={trial.shopUrl ?? 'https://still-time-corner.vercel.app/digital'}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-buy"
                onClick={() => (window as any).gtag?.('event', 'click_to_ST', { event_category: 'outbound', source: 'reader_inline' })}
              >
                前往購買 →
              </a>
              <Link href={`/${seriesSlug}.html`} className="link-back">← 回到系列頁</Link>
            </div>
          </div>

        </div>
      </div>

      <div className="fixed-bar">
        <a
          href={trial.shopUrl ?? 'https://still-time-corner.vercel.app/digital'}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-buy"
          onClick={() => (window as any).gtag?.('event', 'click_to_ST', { event_category: 'outbound', source: 'reader_fixed_bar' })}
        >
          前往購買 →
        </a>
        <Link href={`/${seriesSlug}.html`} className="link-back">← 回到系列頁</Link>
      </div>
    </>
  );
}
