'use client';
// 📁 路徑：src/app/wall/[id]/page.tsx
// ✅ 新增：顯示「寫給誰」「寄件人/匿名」「類型標籤」+ 複製連結分享

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

interface Post {
  _id: string;
  text: string;
  to?: string;
  from?: string;
  label?: string;
  creatorId?: string;
}

const LABEL_STYLE: Record<string, { bg: string; color: string; icon: string }> = {
  love:     { bg: 'rgba(236,72,153,0.2)',  color: '#f472b6', icon: '💌' },
  birthday: { bg: 'rgba(245,158,11,0.2)',  color: '#fcd34d', icon: '🎂' },
  healing:  { bg: 'rgba(124,58,237,0.2)',  color: '#c4b5fd', icon: '✍️' },
  fortune:  { bg: 'rgba(14,165,233,0.2)',  color: '#7dd3fc', icon: '🔮' },
  general:  { bg: 'rgba(255,255,255,0.1)', color: '#e9d5ff', icon: '✨' },
};
const LABEL_NAME: Record<string, string> = {
  love: 'AI 告白', birthday: 'AI 生日祝福', healing: 'AI 療癒小語', fortune: '今日運勢', general: '心情分享',
};

export default function WallIdPage() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetch(`/api/wall/${id}`)
      .then(r => { if (!r.ok) throw new Error(); return r.json(); })
      .then(data => setPost({ ...data, _id: data._id?.toString?.() || data._id }))
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [id]);

  function copyLink() {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  }

  const bg = 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #1a1040 100%)';

  if (loading) return (
    <main style={{ minHeight: '100vh', background: bg, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ color: '#a78bfa' }}>載入中...</p>
    </main>
  );

  if (notFound || !post) return (
    <main style={{ minHeight: '100vh', background: bg, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>😢</div>
        <p style={{ color: '#9ca3af' }}>找不到這則作品</p>
        <Link href="/wall" style={{ color: '#a78bfa', marginTop: '1rem', display: 'inline-block' }}>← 回作品牆</Link>
      </div>
    </main>
  );

  const labelKey = post.label || 'general';
  const ls = LABEL_STYLE[labelKey] || LABEL_STYLE.general;
  const fromName = post.from?.trim() || '匿名';
  const toName = post.to?.trim() || '你';

  return (
    <main style={{ minHeight: '100vh', background: bg, color: '#fff', padding: '4rem 1rem' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div style={{
          background: 'rgba(255,255,255,0.07)',
          border: '1px solid rgba(196,181,253,0.25)',
          borderRadius: '24px', padding: '2.5rem',
          textAlign: 'center', backdropFilter: 'blur(20px)',
        }}>

          {/* 類型標籤 */}
          <div style={{ marginBottom: '1rem' }}>
            <span style={{
              background: ls.bg, color: ls.color,
              fontSize: '0.82rem', fontWeight: 700,
              padding: '0.3rem 1rem', borderRadius: '20px',
            }}>
              {ls.icon} {LABEL_NAME[labelKey] || '心情分享'}
            </span>
          </div>

          {/* 寫給誰 */}
          <div style={{ marginBottom: '1.5rem' }}>
            <p style={{ color: '#9ca3af', fontSize: '0.85rem', margin: '0 0 0.3rem' }}>這則訊息寫給</p>
            <p style={{
              color: '#f9fafb', fontSize: '1.6rem', fontWeight: 900, margin: 0,
              textShadow: '0 0 20px rgba(196,181,253,0.6)',
            }}>
              💌 {toName}
            </p>
          </div>

          {/* 內文 */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(124,58,237,0.2), rgba(236,72,153,0.2))',
            borderRadius: '16px', padding: '1.8rem', marginBottom: '1.5rem',
          }}>
            <p style={{ fontSize: '1.15rem', lineHeight: 1.9, color: '#e9d5ff', margin: 0, fontStyle: 'italic' }}>
              「{post.text}」
            </p>
          </div>

          {/* 寄件人 */}
          <p style={{ color: '#6b7280', fontSize: '0.85rem', marginBottom: '1.8rem' }}>
            — 來自 <span style={{ color: '#a78bfa', fontWeight: 600 }}>
              {post.from?.trim() ? post.from : '匿名'}
            </span>
          </p>

          {/* ✅ 分享連結按鈕 */}
          <div style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px dashed rgba(167,139,250,0.4)',
            borderRadius: '14px', padding: '1rem', marginBottom: '1.5rem',
          }}>
            <p style={{ color: '#c4b5fd', fontSize: '0.85rem', fontWeight: 700, margin: '0 0 0.6rem' }}>
              📤 把這則心意傳給 {toName}！
            </p>
            <p style={{ color: '#6b7280', fontSize: '0.78rem', margin: '0 0 0.8rem' }}>
              複製連結，傳給對方，讓他來這裡看你的心意 💜
            </p>
            <button
              onClick={copyLink}
              style={{
                background: copied
                  ? 'rgba(16,185,129,0.3)'
                  : 'linear-gradient(135deg, #7c3aed, #ec4899)',
                color: '#fff', border: 'none', borderRadius: '30px',
                padding: '0.6rem 1.8rem', fontSize: '0.9rem', fontWeight: 700,
                cursor: 'pointer', transition: 'all 0.2s', width: '100%',
              }}
            >
              {copied ? '✅ 連結已複製！快傳給他/她！' : '🔗 複製這頁連結'}
            </button>
          </div>

          {/* 導覽按鈕 */}
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {post.creatorId && (
              <Link href={`/creator/${post.creatorId}`}
                style={{ background: 'rgba(244,114,182,0.2)', color: '#f472b6', padding: '0.5rem 1.2rem', borderRadius: '20px', textDecoration: 'none', fontSize: '0.85rem' }}>
                👤 作者全部作品
              </Link>
            )}
            <Link href="/wall"
              style={{ background: 'rgba(167,139,250,0.2)', color: '#a78bfa', padding: '0.5rem 1.2rem', borderRadius: '20px', textDecoration: 'none', fontSize: '0.85rem' }}>
              ← 回作品牆
            </Link>
            <Link href="/random"
              style={{ background: 'linear-gradient(135deg,#7c3aed,#ec4899)', color: '#fff', padding: '0.5rem 1.2rem', borderRadius: '20px', textDecoration: 'none', fontSize: '0.85rem' }}>
              🎲 下一個驚喜
            </Link>
          </div>

        </div>
      </div>
    </main>
  );
}