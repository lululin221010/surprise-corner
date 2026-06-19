'use client';
// src/app/cold-knowledge/page.tsx
// 今日冷知識獨立頁（從首頁冷知識區塊抽出）

import { useEffect, useState } from 'react';
import Link from 'next/link';
import coldDataRaw from '../../data/cold-knowledge.json';

type ColdEntry = {
  id: number;
  category: string;
  text: string;
  lulu?: string;
  seed_comments: { name: string; text: string }[];
};

const coldData = coldDataRaw as ColdEntry[];

const CATEGORY_COLORS: Record<string, string> = {
  '心理學':   '#9333ea',
  '腦科學':   '#0ea5e9',
  '靈異意識': '#8b5cf6',
  '貓咪科學': '#f97316',
  '睡眠科學': '#06b6d4',
  '行為經濟學': '#84cc16',
};

const SLOT_BOUNDARIES = [90, 270, 450, 630, 810, 990, 1170, 1350];

function getDayOfYear(): number {
  const start = new Date(new Date().getFullYear(), 0, 0);
  return Math.floor((Date.now() - start.getTime()) / 86400000);
}

function getCurrentEntry(): ColdEntry {
  const d = new Date();
  const totalMin = d.getHours() * 60 + d.getMinutes();
  const slotIdx = SLOT_BOUNDARIES.filter(b => totalMin >= b).length;
  return coldData[(getDayOfYear() * 8 + slotIdx) % coldData.length];
}

function msToNextEntry(): number {
  const now = new Date();
  const totalMin = now.getHours() * 60 + now.getMinutes();
  const next = SLOT_BOUNDARIES.find(b => b > totalMin) ?? (SLOT_BOUNDARIES[0] + 1440);
  return ((next - totalMin) * 60 - now.getSeconds()) * 1000;
}

export default function ColdKnowledgePage() {
  const [entry, setEntry] = useState<ColdEntry | null>(null);

  useEffect(() => {
    setEntry(getCurrentEntry());
    const timeout = setTimeout(() => setEntry(getCurrentEntry()), msToNextEntry());
    return () => clearTimeout(timeout);
  }, []);

  const catColor = entry ? (CATEGORY_COLORS[entry.category] || '#8b5cf6') : '#8b5cf6';

  return (
    <div style={{
      minHeight: '100vh',
      background: 'radial-gradient(ellipse at 30% 10%, rgba(139,92,246,0.3) 0%, transparent 50%), #0f0823',
      color: '#f0eeff',
      fontFamily: 'sans-serif',
      padding: '2rem 1.2rem',
    }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>

        {/* 返回 */}
        <Link href="/wonderland" style={{ color: '#a78bfa', fontSize: '0.85rem', textDecoration: 'none', display: 'inline-block', marginBottom: '1.5rem' }}>
          ← 返回驚喜樂世界
        </Link>

        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.3rem' }}>🧊</div>
          <h1 style={{ color: '#f0eeff', fontSize: '1.6rem', fontWeight: 800, margin: '0 0 0.4rem' }}>今日冷知識</h1>
          <p style={{ color: '#6b6a8a', fontSize: '0.85rem', margin: 0 }}>每3小時更新一次，99% 的人不知道的事</p>
        </div>

        {entry ? (
          <div style={{
            background: 'rgba(255,255,255,0.055)', backdropFilter: 'blur(20px)',
            borderRadius: '24px', padding: '2.2rem 2.4rem',
            border: `1px solid ${catColor}40`,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem', flexWrap: 'wrap', gap: '8px' }}>
              <span style={{
                background: `${catColor}1a`, border: `1px solid ${catColor}55`,
                color: catColor, borderRadius: '20px', padding: '3px 13px',
                fontSize: '0.76rem', fontWeight: 700, letterSpacing: '0.04em',
              }}>
                🧠 {entry.category}
              </span>
              <span style={{ color: '#3d3b5a', fontSize: '0.74rem', fontFamily: 'monospace' }}>
                冷知識 #{entry.id}
              </span>
            </div>

            <p style={{ fontSize: '0.97rem', lineHeight: 1.95, color: '#ddd8f0', marginBottom: '1.2rem' }}>
              {entry.text}
            </p>

            {entry.lulu && (
              <div style={{
                background: 'rgba(139,92,246,0.09)', border: '1px solid rgba(139,92,246,0.28)',
                borderRadius: '14px', padding: '0.85rem 1.1rem', marginBottom: '1.2rem',
                display: 'flex', gap: '10px', alignItems: 'flex-start',
              }}>
                <span style={{ fontSize: '1.1rem', flexShrink: 0, marginTop: '1px' }}>🐱</span>
                <p style={{ color: '#c4b5fd', fontSize: '0.87rem', fontStyle: 'italic', margin: 0, lineHeight: 1.65 }}>
                  {entry.lulu}
                </p>
              </div>
            )}

            {/* 種子留言 */}
            {entry.seed_comments?.length > 0 && (
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '1rem', marginTop: '0.5rem' }}>
                <p style={{ color: '#4a4868', fontSize: '0.74rem', marginBottom: '0.6rem' }}>💬 讀者反應</p>
                {entry.seed_comments.map((c, i) => (
                  <div key={i} style={{ marginBottom: '0.5rem' }}>
                    <span style={{ color: '#6b6a8a', fontSize: '0.78rem', fontWeight: 700 }}>{c.name}：</span>
                    <span style={{ color: '#9d9cbf', fontSize: '0.78rem' }}>{c.text}</span>
                  </div>
                ))}
              </div>
            )}

            <div style={{ marginTop: '1.2rem' }}>
              <Link href="/wall" style={{ color: '#4a4868', fontSize: '0.78rem', textDecoration: 'none' }}>
                💬 有話想說？去互動牆
              </Link>
            </div>
          </div>
        ) : (
          <div style={{ textAlign: 'center', color: '#3d3b5a', padding: '3rem' }}>載入中…</div>
        )}
      </div>
    </div>
  );
}
