'use client';
// 📄 路徑：src/app/tools/watermark/page.tsx
// 純前端 Canvas 浮水印工具

import { useState, useRef, useEffect, useCallback } from 'react';

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
  padding: '0.7rem 1.8rem', cursor: 'pointer',
  fontWeight: 700, fontSize: '0.95rem', transition: 'opacity 0.2s',
};
const inputStyle: React.CSSProperties = {
  width: '100%', background: 'rgba(0,0,0,0.3)',
  border: '1px solid rgba(167,139,250,0.3)', borderRadius: '10px',
  color: '#fff', padding: '0.7rem 1rem', fontSize: '0.95rem',
  outline: 'none', boxSizing: 'border-box',
};
const labelStyle: React.CSSProperties = {
  color: '#c4b5fd', fontSize: '0.85rem', display: 'block', marginBottom: '0.4rem',
};

const POSITIONS = [
  { key: 'top-left',      label: '左上' },
  { key: 'top-right',     label: '右上' },
  { key: 'bottom-left',   label: '左下' },
  { key: 'bottom-right',  label: '右下' },
  { key: 'center',        label: '置中' },
  { key: 'tile',          label: '平鋪' },
];

export default function WatermarkPage() {
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const [text, setText] = useState('© 我的作品');
  const [position, setPosition] = useState('bottom-right');
  const [opacity, setOpacity] = useState(60);
  const [fontSize, setFontSize] = useState(32);
  const [color, setColor] = useState('#ffd700');
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [imgInfo, setImgInfo] = useState('');
  const [inputKey, setInputKey] = useState(0);
  const [loadMsg, setLoadMsg] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  function loadFile(f: File) {
    if (!f.type.startsWith('image/')) return;
    const url = URL.createObjectURL(f);
    const img = new Image();
    img.onload = () => {
      imgRef.current = img;
      setImgSrc(url);
      setImgInfo(`${img.naturalWidth} × ${img.naturalHeight} px`);
      setResultUrl(null);
      setInputKey(k => k + 1);
      setLoadMsg(`✅ 已載入：${f.name}`);
      setTimeout(() => setLoadMsg(''), 3000);
    };
    img.src = url;
  }

  const drawWatermark = useCallback(() => {
    const img = imgRef.current;
    const canvas = canvasRef.current;
    if (!img || !canvas) return;

    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext('2d')!;
    ctx.drawImage(img, 0, 0);

    ctx.globalAlpha = opacity / 100;
    ctx.fillStyle = color;
    ctx.font = `bold ${fontSize}px "Noto Sans TC", sans-serif`;
    ctx.textBaseline = 'middle';

    const pad = Math.max(fontSize, 20);
    const tw = ctx.measureText(text).width;
    const W = canvas.width;
    const H = canvas.height;

    if (position === 'tile') {
      const stepX = tw + fontSize * 4;
      const stepY = fontSize * 3;
      ctx.save();
      ctx.rotate(-Math.PI / 6);
      for (let y = -H; y < H * 2; y += stepY) {
        for (let x = -W; x < W * 2; x += stepX) {
          ctx.fillText(text, x, y);
        }
      }
      ctx.restore();
    } else {
      let x = 0, y = 0;
      if (position === 'top-left')     { x = pad; y = pad + fontSize / 2; }
      else if (position === 'top-right')    { x = W - tw - pad; y = pad + fontSize / 2; ctx.textAlign = 'left'; }
      else if (position === 'bottom-left')  { x = pad; y = H - pad - fontSize / 2; }
      else if (position === 'bottom-right') { x = W - tw - pad; y = H - pad - fontSize / 2; }
      else if (position === 'center')       { x = (W - tw) / 2; y = H / 2; }
      ctx.fillText(text, x, y);
    }
    ctx.globalAlpha = 1;

    // 預覽（縮小版）
    const prev = previewCanvasRef.current;
    if (prev) {
      const maxW = 600, maxH = 360;
      const scale = Math.min(maxW / canvas.width, maxH / canvas.height, 1);
      prev.width = canvas.width * scale;
      prev.height = canvas.height * scale;
      const pCtx = prev.getContext('2d')!;
      pCtx.drawImage(canvas, 0, 0, prev.width, prev.height);
    }
  }, [text, position, opacity, fontSize, color]);

  useEffect(() => {
    if (imgRef.current) drawWatermark();
  }, [drawWatermark, imgSrc]);

  function handleDownload() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const url = canvas.toDataURL('image/png');
    setResultUrl(url);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'watermarked.png';
    a.click();
  }

  return (
    <div style={{ minHeight: '100vh', background: bg, padding: '2rem 1rem' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
          <a href="/tools" style={{ color: '#a78bfa', textDecoration: 'none', fontSize: '0.9rem' }}>← 工具箱</a>
        </div>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🖼️</div>
          <h1 style={{ color: '#fff', fontSize: '1.8rem', fontWeight: 800, margin: 0 }}>圖片加浮水印</h1>
          <p style={{ color: '#a78bfa', marginTop: '0.5rem' }}>純前端處理，圖片不上傳伺服器</p>
        </div>

        {/* 上傳區 */}
        <div style={cardStyle}>
          <div
            onDragOver={e => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={e => { e.preventDefault(); setDragging(false); const f = e.dataTransfer.files[0]; if (f) loadFile(f); }}
            onClick={() => fileRef.current?.click()}
            style={{
              border: `2px dashed ${dragging ? '#a78bfa' : 'rgba(167,139,250,0.35)'}`,
              borderRadius: '12px', padding: '2rem', textAlign: 'center',
              cursor: 'pointer', background: dragging ? 'rgba(124,58,237,0.12)' : 'transparent',
              transition: 'all 0.2s', marginBottom: '1.2rem',
            }}
          >
            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🖼️</div>
            {imgSrc ? (
              <p style={{ color: '#e9d5ff', margin: 0 }}>已載入 {imgInfo}　<span style={{ color: '#a78bfa', fontSize: '0.82rem' }}>（點擊更換）</span></p>
            ) : (
              <p style={{ color: '#c4b5fd', margin: 0 }}>拖放圖片或點擊選擇（jpg / png / webp）</p>
            )}
            <input key={inputKey} ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }}
              onChange={e => { const f = e.target.files?.[0]; if (f) loadFile(f); }} />
          </div>

          {loadMsg && (
            <div style={{ marginBottom: '1rem', padding: '0.6rem 1rem', background: 'rgba(74,222,128,0.15)', border: '1px solid rgba(74,222,128,0.4)', borderRadius: '10px', color: '#4ade80', fontSize: '0.9rem' }}>
              {loadMsg}
            </div>
          )}

          {/* 浮水印設定 */}
          {imgSrc && (
            <>
              <label style={labelStyle}>浮水印文字</label>
              <input value={text} onChange={e => setText(e.target.value)}
                placeholder="輸入浮水印文字..." style={{ ...inputStyle, marginBottom: '1rem' }} />

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                {/* 位置 */}
                <div>
                  <label style={labelStyle}>位置</label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                    {POSITIONS.map(p => (
                      <button key={p.key} onClick={() => setPosition(p.key)}
                        style={{
                          background: position === p.key ? 'rgba(124,58,237,0.5)' : 'rgba(255,255,255,0.07)',
                          color: position === p.key ? '#e9d5ff' : '#9ca3af',
                          border: `1px solid ${position === p.key ? '#7c3aed' : 'rgba(167,139,250,0.2)'}`,
                          borderRadius: '8px', padding: '0.3rem 0.7rem',
                          cursor: 'pointer', fontSize: '0.82rem',
                        }}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 顏色 */}
                <div>
                  <label style={labelStyle}>文字顏色</label>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <input type="color" value={color} onChange={e => setColor(e.target.value)}
                      style={{ width: '44px', height: '44px', border: 'none', background: 'none', cursor: 'pointer', borderRadius: '8px' }} />
                    {['#ffffff','#000000','#ffd700','#ff4444'].map(c => (
                      <button key={c} onClick={() => setColor(c)}
                        style={{ width: '28px', height: '28px', background: c, border: color === c ? '2px solid #a78bfa' : '2px solid transparent', borderRadius: '50%', cursor: 'pointer' }} />
                    ))}
                  </div>
                </div>
              </div>

              {/* 透明度 */}
              <div style={{ marginBottom: '1rem' }}>
                <label style={labelStyle}>透明度　<span style={{ color: '#f3f4f6' }}>{opacity}%</span></label>
                <input type="range" min={10} max={100} value={opacity} onChange={e => setOpacity(Number(e.target.value))}
                  style={{ width: '100%', accentColor: '#7c3aed' }} />
              </div>

              {/* 字體大小 */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={labelStyle}>字體大小　<span style={{ color: '#f3f4f6' }}>{fontSize}px</span></label>
                <input type="range" min={12} max={120} value={fontSize} onChange={e => setFontSize(Number(e.target.value))}
                  style={{ width: '100%', accentColor: '#7c3aed' }} />
              </div>

              <button onClick={handleDownload} disabled={!text.trim()}
                style={{ ...btnPrimary, width: '100%', fontSize: '1rem', padding: '0.8rem', opacity: !text.trim() ? 0.5 : 1 }}>
                ⬇️ 下載結果圖片
              </button>
            </>
          )}
        </div>

        {/* 預覽 */}
        {imgSrc && (
          <div style={{ ...cardStyle, marginTop: '1.5rem' }}>
            <h2 style={{ color: '#e9d5ff', margin: '0 0 1rem', fontSize: '1rem' }}>👁 即時預覽</h2>
            <canvas ref={previewCanvasRef}
              style={{ width: '100%', borderRadius: '10px', display: 'block', border: '1px solid rgba(167,139,250,0.2)' }} />
          </div>
        )}

        {/* 隱藏的完整尺寸 canvas（用於下載） */}
        <canvas ref={canvasRef} style={{ display: 'none' }} />

        <div style={{ textAlign: 'center', marginTop: '2rem', paddingBottom: '1rem' }}>
          <a href="/privacy" style={{ color: '#4b5563', fontSize: '0.75rem', textDecoration: 'none' }}>隱私權政策</a>
        </div>
      </div>
    </div>
  );
}
