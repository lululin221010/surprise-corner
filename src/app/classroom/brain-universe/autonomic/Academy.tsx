'use client';
// 📄 路徑：src/app/classroom/brain-universe/autonomic/Academy.tsx

import { useState } from 'react';
import Link from 'next/link';
import autonomicLessons from './courses';
import type { AutonomicLesson } from './courses';
import AutonomicLessonViewer from './AutonomicLesson';
import '../../classroom.css';

const VOL_EMOJIS: Record<string, string> = {
  '01': '🩺', '02': '🧪', '03': '😴', '04': '📡', '05': '⏳', '06': '🌊', '07': '👥',
};

export default function AutonomicAcademy() {
  const [activeLesson, setActiveLesson] = useState<AutonomicLesson | null>(null);

  if (activeLesson) {
    return <AutonomicLessonViewer lesson={activeLesson} onBack={() => setActiveLesson(null)} />;
  }

  return (
    <div className="classroom-content">
      <div style={{ maxWidth: 680, margin: '0 auto' }}>

        {/* 麵包屑 */}
        <div style={{ marginBottom: '0.5rem', display: 'flex', gap: '0.4rem', fontSize: '0.78rem', color: '#7c3aed' }}>
          <Link href="/classroom" style={{ color: '#7c3aed', textDecoration: 'none' }}>驚喜學院</Link>
          <span style={{ color: '#c4b5fd' }}>›</span>
          <span style={{ color: '#6b7280' }}>腦中宇宙書院</span>
          <span style={{ color: '#c4b5fd' }}>›</span>
          <span style={{ color: '#1e1b4b', fontWeight: 600 }}>自律神經學系</span>
        </div>

        {/* 標題 */}
        <div style={{ marginBottom: '1.8rem' }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.3rem' }}>🧬</div>
          <h1 style={{ color: '#1e1b4b', fontSize: '1.6rem', fontWeight: 800, margin: 0 }}>自律神經學系</h1>
          <p style={{ color: '#4b5563', fontSize: '0.92rem', marginTop: '0.5rem', lineHeight: 1.6 }}>
            7冊完整系列・從了解症狀到找回平衡<br />
            每冊第一堂免費試讀，買電子書解鎖完整10堂
          </p>
        </div>

        {/* 說明卡 */}
        <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: '12px', padding: '1rem 1.2rem', marginBottom: '1.5rem', fontSize: '0.85rem', color: '#0369a1' }}>
          <strong>🔓 免費試讀說明</strong><br />
          每冊各1堂試讀（4頁 + 2題測驗），完全免費。<br />
          購買電子書（NT$249/冊）後，可在小舖取得解鎖碼，解鎖完整10堂課程。
        </div>

        {/* 7冊列表 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem', marginBottom: '2rem' }}>
          {autonomicLessons.map(lesson => (
            <div
              key={lesson.vol}
              onClick={() => setActiveLesson(lesson)}
              style={{
                background: '#faf5ff', border: '1px solid #c4b5fd',
                borderRadius: '12px', padding: '1rem 1.2rem',
                display: 'flex', alignItems: 'center', gap: '0.9rem',
                cursor: 'pointer',
              }}
            >
              <div style={{ fontSize: '1.5rem', flexShrink: 0 }}>{VOL_EMOJIS[lesson.vol]}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ color: '#4c1d95', fontSize: '0.7rem', fontWeight: 600, marginBottom: '0.2rem' }}>
                  Vol.{lesson.vol}
                </div>
                <div style={{ color: '#1e1b4b', fontWeight: 700, fontSize: '0.92rem' }}>{lesson.title}</div>
                <div style={{ color: '#6b7280', fontSize: '0.8rem', marginTop: '0.1rem' }}>
                  {lesson.slides.length} 頁 · {lesson.quizzes.length} 題 · 免費試讀
                </div>
              </div>
              <div style={{ color: '#7c3aed', fontSize: '0.85rem', fontWeight: 700, flexShrink: 0 }}>開始 →</div>
            </div>
          ))}
        </div>

        {/* 購買 CTA */}
        <div style={{ background: '#faf5ff', border: '1px solid #c4b5fd', borderRadius: '14px', padding: '1.2rem', marginBottom: '1.5rem', textAlign: 'center' }}>
          <div style={{ color: '#5b21b6', fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.3rem' }}>📚 想讀完整版？</div>
          <div style={{ color: '#6b7280', fontSize: '0.85rem', marginBottom: '0.9rem' }}>
            每冊 NT$249・7冊含完整10堂課程
          </div>
          <a
            href="https://still-time-corner.vercel.app/digital"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
              color: '#fff', fontWeight: 700, fontSize: '0.9rem',
              borderRadius: '30px', padding: '0.6rem 1.8rem',
              textDecoration: 'none',
            }}
          >
            前往小舖購買 →
          </a>
        </div>

        {/* 返回 */}
        <div style={{ textAlign: 'center' }}>
          <Link href="/classroom" style={{ color: '#7c3aed', fontSize: '0.85rem', textDecoration: 'none' }}>
            ← 回驚喜學院
          </Link>
        </div>

      </div>
    </div>
  );
}
