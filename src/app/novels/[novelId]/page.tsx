'use client';
// 📄 路徑：src/app/novels/[novelId]/[chapterId]/page.tsx

import { useState, useEffect } from 'react';
import Link from 'next/link';
import chaptersData from '@/data/chapters.json';
import novelsData from '@/data/novels.json';

// ✅ 免費開放章節數（第1~10章免費）
const FREE_CHAPTERS = 10;

// ✅ 計算下一個更新日（每週一、三、五）
function getNextUpdateDay(): string {
  const today = new Date();
  const day = today.getDay(); // 0=日,1=一,2=二,3=三,4=四,5=五,6=六
  const updateDays = [1, 3, 5]; // 一三五
  
  for (let i = 1; i <= 7; i++) {
    const next = (day + i) % 7;
    if (updateDays.includes(next)) {
      const nextDate = new Date(today);
      nextDate.setDate(today.getDate() + i);
      return nextDate.toLocaleDateString('zh-TW', { month: 'long', day: 'numeric', weekday: 'short' });
    }
  }
  return '下週';
}

// ✅ 鎖章提示卡
function LockedChapterCard({ chapterNumber, novelId }: { chapterNumber: number; novelId: string }) {
  const nextUpdate = getNextUpdateDay();
  
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #1a1040 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '2rem 1rem',
    }}>
      <div style={{
        maxWidth: '520px', width: '100%', textAlign: 'center',
        background: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(20px)',
        borderRadius: '24px', padding: '3rem 2rem',
        border: '1px solid rgba(196,181,253,0.2)',
      }}>
        {/* 鎖頭圖示 */}
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔒</div>

        <h2 style={{
          color: '#e9d5ff', fontSize: '1.6rem', fontWeight: 800,
          margin: '0 0 0.8rem',
        }}>
          第 {chapterNumber} 章尚未解鎖
        </h2>

        <p style={{ color: '#9ca3af', lineHeight: 1.8, marginBottom: '0.5rem' }}>
          免費章節已閱讀完畢（第 1～{FREE_CHAPTERS} 章）
        </p>

        {/* 更新時程提示 */}
        <div style={{
          background: 'rgba(124,58,237,0.2)', borderRadius: '12px',
          padding: '1rem', margin: '1.5rem 0',
          border: '1px solid rgba(167,139,250,0.3)',
        }}>
          <p style={{ color: '#c4b5fd', fontWeight: 700, margin: '0 0 0.3rem', fontSize: '0.95rem' }}>
            📅 每週一、三、五 更新一章
          </p>
          <p style={{ color: '#7c7a9e', fontSize: '0.85rem', margin: 0 }}>
            下次更新：{nextUpdate}
          </p>
        </div>

        <p style={{ color: '#9ca3af', fontSize: '0.9rem', marginBottom: '2rem' }}>
          意猶未盡？去小舖逛逛，說不定有驚喜等著你 💜
        </p>

        {/* 按鈕群 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          {/* 去小舖 */}
          <a
            href="https://still-time-corner.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'block',
              background: 'linear-gradient(135deg, #f59e0b, #ec4899)',
              color: '#fff', padding: '0.9rem 2rem', borderRadius: '30px',
              textDecoration: 'none', fontWeight: 700, fontSize: '1rem',
              transition: 'all 0.2s',
            }}
          >
            ✨ 去 Still Time Corner 小舖逛逛
          </a>

          {/* 回小說目錄 */}
          <Link
            href={`/novels/${novelId}`}
            style={{
              display: 'block',
              background: 'rgba(255,255,255,0.08)',
              color: '#c4b5fd', padding: '0.8rem 2rem', borderRadius: '30px',
              textDecoration: 'none', fontWeight: 600, fontSize: '0.95rem',
              border: '1px solid rgba(167,139,250,0.3)',
            }}
          >
            📚 回到章節目錄
          </Link>

          {/* 回首頁 */}
          <Link
            href="/"
            style={{
              color: '#6b7280', fontSize: '0.85rem', textDecoration: 'none',
              display: 'block', marginTop: '0.3rem',
            }}
          >
            ← 回首頁
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ChapterPage({
  params,
}: {
  params: { novelId: string; chapterId: string };
}) {
  const { novelId, chapterId } = params;

  // 找到對應章節
  const chapter = (chaptersData as any[]).find(
    (c) => c.id === chapterId && c.novelId === novelId
  );
  const novel = (novelsData as any[]).find((n) => n.id === novelId);

  // 同一本書的所有章節（排序）
  const allChapters = (chaptersData as any[])
    .filter((c) => c.novelId === novelId && c.isPublished)
    .sort((a, b) => a.chapterNumber - b.chapterNumber);

  const currentIndex = allChapters.findIndex((c) => c.id === chapterId);
  const prevChapter = currentIndex > 0 ? allChapters[currentIndex - 1] : null;
  const nextChapter = currentIndex < allChapters.length - 1 ? allChapters[currentIndex + 1] : null;

  // ✅ 章節不存在
  if (!chapter || !novel) {
    return (
      <div style={{
        minHeight: '100vh', background: '#0f0c29',
        display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff',
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>😶</div>
          <p>找不到這個章節</p>
          <Link href={`/novels/${novelId}`} style={{ color: '#a78bfa' }}>← 回到目錄</Link>
        </div>
      </div>
    );
  }

  // ✅ 超過免費章節 → 顯示鎖章畫面
  if (chapter.chapterNumber > FREE_CHAPTERS) {
    return <LockedChapterCard chapterNumber={chapter.chapterNumber} novelId={novelId} />;
  }

  // ✅ 正常顯示章節內容
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #1a1040 100%)',
      color: '#fff', padding: '2rem 1rem',
    }}>
      <div style={{ maxWidth: '680px', margin: '0 auto' }}>

        {/* 麵包屑 */}
        <div style={{ marginBottom: '1.5rem', fontSize: '0.85rem', color: '#7c7a9e' }}>
          <Link href="/novels" style={{ color: '#a78bfa', textDecoration: 'none' }}>連載小說</Link>
          {' / '}
          <Link href={`/novels/${novelId}`} style={{ color: '#a78bfa', textDecoration: 'none' }}>{novel.title}</Link>
          {' / '}
          <span style={{ color: '#6b7280' }}>{chapter.title}</span>
        </div>

        {/* 章節標題 */}
        <div style={{
          background: 'rgba(255,255,255,0.06)', borderRadius: '16px',
          padding: '1.5rem 2rem', marginBottom: '1.5rem',
          border: '1px solid rgba(167,139,250,0.2)',
        }}>
          <p style={{ color: '#a78bfa', fontSize: '0.85rem', margin: '0 0 0.5rem' }}>
            {novel.title} · 第 {chapter.chapterNumber} 章
          </p>
          <h1 style={{ color: '#e9d5ff', fontSize: '1.6rem', fontWeight: 800, margin: 0 }}>
            {chapter.title}
          </h1>
          <p style={{ color: '#4b5563', fontSize: '0.8rem', marginTop: '0.5rem' }}>
            {chapter.publishedAt} · 約 {chapter.wordCount} 字
          </p>
        </div>

        {/* 章節內容 */}
        <div style={{
          background: 'rgba(255,255,255,0.04)', borderRadius: '16px',
          padding: '2rem', marginBottom: '2rem',
          border: '1px solid rgba(167,139,250,0.1)',
          lineHeight: 2.2, fontSize: '1.05rem', color: '#e5e7eb',
          whiteSpace: 'pre-wrap',
        }}>
          {chapter.content}
        </div>

        {/* 免費章節進度提示 */}
        {chapter.chapterNumber === FREE_CHAPTERS && (
          <div style={{
            background: 'linear-gradient(135deg,rgba(245,158,11,0.15),rgba(236,72,153,0.15))',
            border: '1px solid rgba(245,158,11,0.3)',
            borderRadius: '16px', padding: '1.5rem', marginBottom: '1.5rem',
            textAlign: 'center',
          }}>
            <p style={{ color: '#fcd34d', fontWeight: 700, margin: '0 0 0.5rem', fontSize: '1rem' }}>
              🎉 你已讀完所有免費章節！
            </p>
            <p style={{ color: '#9ca3af', fontSize: '0.9rem', margin: '0 0 1rem' }}>
              每週一、三、五 更新一章，記得常回來看 💜
            </p>
            <a
              href="https://still-time-corner.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                background: 'linear-gradient(135deg, #f59e0b, #ec4899)',
                color: '#fff', padding: '0.7rem 1.8rem', borderRadius: '30px',
                textDecoration: 'none', fontWeight: 700, fontSize: '0.9rem',
              }}
            >
              ✨ 等更新期間去小舖逛逛 →
            </a>
          </div>
        )}

        {/* 上下章導航 */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'space-between' }}>
          {prevChapter ? (
            <Link href={`/novels/${novelId}/${prevChapter.id}`} style={{
              flex: 1, display: 'block', textAlign: 'center',
              background: 'rgba(255,255,255,0.07)', borderRadius: '12px',
              padding: '0.9rem', textDecoration: 'none', color: '#c4b5fd',
              border: '1px solid rgba(167,139,250,0.2)', fontSize: '0.9rem',
            }}>
              ← 上一章
              <div style={{ color: '#6b7280', fontSize: '0.78rem', marginTop: '0.2rem' }}>{prevChapter.title}</div>
            </Link>
          ) : <div style={{ flex: 1 }} />}

          {nextChapter ? (
            <Link href={`/novels/${novelId}/${nextChapter.id}`} style={{
              flex: 1, display: 'block', textAlign: 'center',
              background: nextChapter.chapterNumber > FREE_CHAPTERS
                ? 'rgba(100,100,100,0.15)'
                : 'rgba(255,255,255,0.07)',
              borderRadius: '12px', padding: '0.9rem',
              textDecoration: 'none',
              color: nextChapter.chapterNumber > FREE_CHAPTERS ? '#4b5563' : '#c4b5fd',
              border: `1px solid ${nextChapter.chapterNumber > FREE_CHAPTERS ? 'rgba(100,100,100,0.2)' : 'rgba(167,139,250,0.2)'}`,
              fontSize: '0.9rem',
            }}>
              {nextChapter.chapterNumber > FREE_CHAPTERS ? '🔒 ' : ''}下一章 →
              <div style={{ color: '#6b7280', fontSize: '0.78rem', marginTop: '0.2rem' }}>
                {nextChapter.title}
                {nextChapter.chapterNumber > FREE_CHAPTERS && ' (鎖定)'}
              </div>
            </Link>
          ) : (
            <div style={{
              flex: 1, textAlign: 'center',
              background: 'rgba(255,255,255,0.04)', borderRadius: '12px',
              padding: '0.9rem', color: '#4b5563',
              border: '1px solid rgba(100,100,100,0.2)', fontSize: '0.9rem',
            }}>
              已是最新章節 ✨
              <div style={{ fontSize: '0.78rem', marginTop: '0.2rem' }}>每週一三五更新</div>
            </div>
          )}
        </div>

        {/* 頁腳 */}
        <div style={{ textAlign: 'center', marginTop: '2rem', paddingBottom: '2rem' }}>
          <Link href={`/novels/${novelId}`} style={{ color: '#4b5563', fontSize: '0.85rem', textDecoration: 'none' }}>
            ← 回到章節目錄
          </Link>
        </div>
      </div>
    </div>
  );
}