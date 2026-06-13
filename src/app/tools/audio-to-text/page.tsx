'use client';
// 📄 路徑：src/app/tools/audio-to-text/page.tsx

import { useState, useRef } from 'react';
import Link from 'next/link';
import ShareButtons from '@/components/ShareButtons';

const bg = 'linear-gradient(135deg,#0f0c29,#302b63,#24243e)';
const cardStyle: React.CSSProperties = {
  background: 'rgba(255,255,255,0.07)',
  border: '1px solid rgba(167,139,250,0.25)',
  borderRadius: '16px', padding: '1.5rem',
  backdropFilter: 'blur(10px)',
};
const btnPrimary: React.CSSProperties = {
  background: 'linear-gradient(135deg,#7c3aed,#ec4899)',
  color: '#fff', border: 'none', borderRadius: '30px',
  padding: '0.7rem 2rem', cursor: 'pointer',
  fontWeight: 700, fontSize: '1rem', transition: 'opacity 0.2s',
};

const ALLOWED_EXTS = ['mp3', 'mp4', 'wav', 'm4a'];

export default function AudioToTextPage() {
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFile(f: File) {
    const ext = f.name.split('.').pop()?.toLowerCase() || '';
    if (!ALLOWED_EXTS.includes(ext)) {
      setError('僅支援 mp3、mp4、wav、m4a 格式');
      return;
    }
    if (f.size > 25 * 1024 * 1024) {
      setError('檔案大小不能超過 25MB');
      return;
    }
    setFile(f);
    setError('');
    setResult('');
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault(); setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  }

  async function transcribe() {
    if (!file) return;
    setLoading(true); setError(''); setResult(''); setCopied(false);
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch('/api/tools/audio-to-text', { method: 'POST', body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || '轉換失敗');
      setResult(data.text || '（無結果）');
    } catch (e: any) {
      setError(e.message || '發生錯誤，請稍後再試');
    }
    setLoading(false);
  }

  function copyResult() {
    navigator.clipboard.writeText(result).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function reset() {
    setFile(null); setResult(''); setError(''); setCopied(false);
    if (inputRef.current) inputRef.current.value = '';
  }

  const fileSizeMB = file ? (file.size / 1024 / 1024).toFixed(1) : '';

  return (
    <div style={{ minHeight: '100vh', background: bg, padding: '2rem 1rem' }}>
      <div style={{ maxWidth: '680px', margin: '0 auto' }}>

        {/* 標題 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
          <a href="/tools" style={{ color: '#a78bfa', textDecoration: 'none', fontSize: '0.9rem' }}>← 工具箱</a>
        </div>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🎙️</div>
          <h1 style={{ color: '#fff', fontSize: '1.8rem', fontWeight: 800, margin: 0 }}>音訊轉文字</h1>
          <p style={{ color: '#a78bfa', marginTop: '0.5rem' }}>上傳音訊，Groq Whisper 極速辨識，支援中英日等多語言</p>
        </div>

        {/* 上傳區 */}
        <div style={cardStyle}>
          {/* 拖放區 */}
          <div
            onDragOver={e => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={onDrop}
            onClick={() => inputRef.current?.click()}
            style={{
              border: `2px dashed ${dragging ? '#a78bfa' : 'rgba(167,139,250,0.35)'}`,
              borderRadius: '12px',
              padding: '2.5rem 1rem',
              textAlign: 'center',
              cursor: 'pointer',
              background: dragging ? 'rgba(124,58,237,0.12)' : 'transparent',
              transition: 'all 0.2s',
              marginBottom: '1.2rem',
            }}
          >
            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🎵</div>
            {file ? (
              <>
                <p style={{ color: '#e9d5ff', fontWeight: 700, margin: '0 0 0.3rem' }}>{file.name}</p>
                <p style={{ color: '#9ca3af', fontSize: '0.85rem', margin: 0 }}>{fileSizeMB} MB</p>
              </>
            ) : (
              <>
                <p style={{ color: '#c4b5fd', margin: '0 0 0.3rem' }}>拖放音訊檔案至此，或點擊選擇</p>
                <p style={{ color: '#6b7280', fontSize: '0.82rem', margin: 0 }}>支援 mp3、mp4、wav、m4a，最大 25MB</p>
              </>
            )}
            <input
              ref={inputRef}
              type="file"
              accept=".mp3,.mp4,.wav,.m4a,audio/*"
              style={{ display: 'none' }}
              onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
            />
          </div>

          {error && (
            <div style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.4)', borderRadius: '10px', padding: '0.8rem 1rem', marginBottom: '1rem', color: '#fca5a5', fontSize: '0.9rem' }}>
              ⚠️ {error}
            </div>
          )}

          <div style={{ display: 'flex', gap: '0.8rem' }}>
            <button
              onClick={transcribe}
              disabled={!file || loading}
              style={{ ...btnPrimary, flex: 1, opacity: (!file || loading) ? 0.5 : 1 }}
            >
              {loading ? '⚡ 辨識中...' : '🎙️ 開始轉換'}
            </button>
            {(file || result) && (
              <button
                onClick={reset}
                style={{ background: 'rgba(255,255,255,0.08)', color: '#9ca3af', border: '1px solid rgba(167,139,250,0.2)', borderRadius: '30px', padding: '0.7rem 1.2rem', cursor: 'pointer', fontSize: '0.9rem' }}
              >
                重置
              </button>
            )}
          </div>

          {loading && (
            <div style={{ textAlign: 'center', padding: '1.5rem 0', color: '#a78bfa' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem', animation: 'pulse 1s infinite' }}>⚡</div>
              <p style={{ margin: 0, fontSize: '0.9rem' }}>Groq Whisper 辨識中，通常不到 10 秒…</p>
            </div>
          )}
        </div>

        {/* 結果區 */}
        {result && (
          <div style={{ ...cardStyle, marginTop: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h2 style={{ color: '#e9d5ff', margin: 0, fontSize: '1.1rem' }}>📄 辨識結果</h2>
              <button
                onClick={copyResult}
                style={{ ...btnPrimary, padding: '0.4rem 1.2rem', fontSize: '0.85rem' }}
              >
                {copied ? '✅ 已複製' : '📋 複製全文'}
              </button>
            </div>
            <div style={{
              background: 'rgba(0,0,0,0.3)', borderRadius: '10px',
              padding: '1.2rem', lineHeight: 1.8,
              color: '#f3f4f6', fontSize: '0.95rem',
              maxHeight: '400px', overflowY: 'auto',
              whiteSpace: 'pre-wrap', wordBreak: 'break-word',
            }}>
              {result}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.8rem' }}>
              <span style={{ color: '#6b7280', fontSize: '0.78rem' }}>
                字數：約 {result.replace(/\s/g,'').length} 字
              </span>
              <a
                href={`data:text/plain;charset=utf-8,${encodeURIComponent(result)}`}
                download="transcript.txt"
                style={{ color: '#a78bfa', fontSize: '0.82rem', textDecoration: 'none' }}
              >
                ⬇️ 下載 .txt
              </a>
            </div>
          </div>
        )}

        {/* 說明 */}
        <div style={{ ...cardStyle, marginTop: '1.5rem', background: 'rgba(124,58,237,0.1)' }}>
          <h3 style={{ color: '#c4b5fd', margin: '0 0 0.8rem', fontSize: '0.95rem' }}>💡 使用說明</h3>
          <ul style={{ color: '#9ca3af', fontSize: '0.85rem', margin: 0, paddingLeft: '1.2rem', lineHeight: 2 }}>
            <li>支援 <strong style={{ color: '#c4b5fd' }}>mp3、mp4、wav、m4a</strong> 格式，最大 25MB</li>
            <li>使用 <strong style={{ color: '#c4b5fd' }}>Groq Whisper Large V3 Turbo</strong> 模型，速度極快</li>
            <li>支援繁體中文、英文、日文等多語言自動辨識</li>
            <li>檔案不會儲存於伺服器，處理完即刪除</li>
            <li>長音訊建議先剪輯成片段，提升辨識準確度</li>
          </ul>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <p style={{ color: '#6b7280', fontSize: '0.8rem', textAlign: 'center', marginBottom: '0.5rem' }}>覺得好用？推薦給朋友 👇</p>
          <ShareButtons title="免費語音轉文字工具" content="上傳音檔，AI 幫你轉成文字，支援中文、英文、日文，免費使用！" />
        </div>
        <div style={{ textAlign: 'center', marginTop: '1.5rem', paddingBottom: '1rem', display: 'flex', gap: '1.5rem', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
          <Link href="/tools" style={{ color: '#7c3aed', fontSize: '0.9rem', textDecoration: 'none', fontWeight: 600 }}>← 回小工具</Link>
          <a href="/privacy" style={{ color: '#4b5563', fontSize: '0.75rem', textDecoration: 'none' }}>隱私權政策</a>
        </div>
      </div>
    </div>
  );
}
