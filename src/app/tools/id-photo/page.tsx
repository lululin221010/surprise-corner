'use client';
// 📄 路徑：src/app/tools/id-photo/page.tsx
// 純前端 Canvas 證件照製作工具

import { useState, useRef, useCallback } from 'react';

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
const labelStyle: React.CSSProperties = {
  color: '#c4b5fd', fontSize: '0.85rem', display: 'block', marginBottom: '0.5rem',
};

// 96 DPI 近似 pixel 尺寸（印刷常用 300dpi，這裡用螢幕 96dpi 輸出）
const SIZES = [
  { key: '1inch', label: '1吋',  desc: '25×35mm', w: 295, h: 413 },
  { key: '2inch', label: '2吋',  desc: '35×45mm', w: 413, h: 531 },
  { key: 'visa',  label: '護照',  desc: '35×45mm', w: 413, h: 531 },
  { key: 'small', label: '小2吋', desc: '33×48mm', w: 390, h: 567 },
];

const BG_COLORS = [
  { key: 'white', label: '白底', color: '#ffffff' },
  { key: 'blue',  label: '藍底', color: '#4a90d9' },
  { key: 'red',   label: '紅底', color: '#d94a4a' },
  { key: 'gray',  label: '灰底', color: '#c8c8c8' },
];

export default function IdPhotoPage() {
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const [sizeKey, setSizeKey] = useState('2inch');
  const [bgKey, setBgKey] = useState('white');
  const [zoom, setZoom] = useState(100);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [isDraggingImg, setIsDraggingImg] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const fileRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const previewRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const selectedSize = SIZES.find(s => s.key === sizeKey)!;
  const selectedBg = BG_COLORS.find(b => b.key === bgKey)!;

  // Preview scale（顯示用）
  const PREV_W = 200;
  const PREV_H = Math.round(PREV_W * selectedSize.h / selectedSize.w);
  const prevScale = PREV_W / selectedSize.w;

  function loadFile(f: File) {
    if (!f.type.startsWith('image/')) return;
    const url = URL.createObjectURL(f);
    const img = new Image();
    img.onload = () => {
      imgRef.current = img;
      setImgSrc(url);
      setZoom(100);
      setOffsetX(0);
      setOffsetY(0);
      setTimeout(drawPreview, 50);
    };
    img.src = url;
  }

  const drawToCanvas = useCallback((canvas: HTMLCanvasElement, scale: number) => {
    const img = imgRef.current;
    if (!img) return;
    const W = Math.round(selectedSize.w * scale);
    const H = Math.round(selectedSize.h * scale);
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext('2d')!;

    // 背景
    ctx.fillStyle = selectedBg.color;
    ctx.fillRect(0, 0, W, H);

    // 計算圖片繪製區域（保持比例，置中）
    const imgAspect = img.naturalWidth / img.naturalHeight;
    const canvasAspect = W / H;
    let drawW: number, drawH: number;
    if (imgAspect > canvasAspect) {
      drawH = H * (zoom / 100);
      drawW = drawH * imgAspect;
    } else {
      drawW = W * (zoom / 100);
      drawH = drawW / imgAspect;
    }
    const dx = (W - drawW) / 2 + offsetX * scale;
    const dy = (H - drawH) / 2 + offsetY * scale;
    ctx.drawImage(img, dx, dy, drawW, drawH);
  }, [selectedSize, selectedBg, zoom, offsetX, offsetY]);

  const drawPreview = useCallback(() => {
    const prev = previewRef.current;
    if (!prev || !imgRef.current) return;
    drawToCanvas(prev, prevScale);
  }, [drawToCanvas, prevScale]);

  // 重繪預覽（每次設定改變）
  function redraw() {
    setTimeout(drawPreview, 0);
  }

  // 拖移照片位置
  function onMouseDown(e: React.MouseEvent) {
    setIsDraggingImg(true);
    setDragStart({ x: e.clientX - offsetX * prevScale, y: e.clientY - offsetY * prevScale });
  }
  function onMouseMove(e: React.MouseEvent) {
    if (!isDraggingImg) return;
    setOffsetX((e.clientX - dragStart.x) / prevScale);
    setOffsetY((e.clientY - dragStart.y) / prevScale);
    requestAnimationFrame(drawPreview);
  }
  function onMouseUp() { setIsDraggingImg(false); }

  // 觸控支援
  function onTouchStart(e: React.TouchEvent) {
    const t = e.touches[0];
    setIsDraggingImg(true);
    setDragStart({ x: t.clientX - offsetX * prevScale, y: t.clientY - offsetY * prevScale });
  }
  function onTouchMove(e: React.TouchEvent) {
    if (!isDraggingImg) return;
    const t = e.touches[0];
    setOffsetX((t.clientX - dragStart.x) / prevScale);
    setOffsetY((t.clientY - dragStart.y) / prevScale);
    requestAnimationFrame(drawPreview);
  }

  function handleDownload() {
    const canvas = canvasRef.current;
    if (!canvas || !imgRef.current) return;
    drawToCanvas(canvas, 1);   // 原始尺寸輸出
    const url = canvas.toDataURL('image/jpeg', 0.95);
    const a = document.createElement('a');
    a.href = url;
    a.download = `id-photo-${sizeKey}.jpg`;
    a.click();
  }

  return (
    <div style={{ minHeight: '100vh', background: bg, padding: '2rem 1rem' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
          <a href="/tools" style={{ color: '#a78bfa', textDecoration: 'none', fontSize: '0.9rem' }}>← 工具箱</a>
        </div>

        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🪪</div>
          <h1 style={{ color: '#fff', fontSize: '1.8rem', fontWeight: 800, margin: 0 }}>證件照製作</h1>
          <p style={{ color: '#a78bfa', marginTop: '0.5rem' }}>選尺寸、換背景色，純前端處理不上傳</p>
        </div>

        {/* 上傳 + 設定 */}
        <div style={cardStyle}>
          {/* 拖放區 */}
          <div
            onDragOver={e => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={e => { e.preventDefault(); setDragging(false); const f = e.dataTransfer.files[0]; if (f) loadFile(f); }}
            onClick={() => fileRef.current?.click()}
            style={{
              border: `2px dashed ${dragging ? '#a78bfa' : 'rgba(167,139,250,0.35)'}`,
              borderRadius: '12px', padding: '2rem', textAlign: 'center',
              cursor: 'pointer', background: dragging ? 'rgba(124,58,237,0.12)' : 'transparent',
              transition: 'all 0.2s', marginBottom: '1.5rem',
            }}
          >
            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>📷</div>
            {imgSrc
              ? <p style={{ color: '#e9d5ff', margin: 0 }}>照片已載入 <span style={{ color: '#a78bfa', fontSize: '0.82rem' }}>（點擊更換）</span></p>
              : <p style={{ color: '#c4b5fd', margin: 0 }}>拖放照片或點擊選擇</p>}
            <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }}
              onChange={e => { const f = e.target.files?.[0]; if (f) loadFile(f); }} />
          </div>

          {/* 設定列 */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
            {/* 尺寸 */}
            <div>
              <label style={labelStyle}>📐 尺寸</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {SIZES.map(s => (
                  <button key={s.key} onClick={() => { setSizeKey(s.key); setZoom(100); setOffsetX(0); setOffsetY(0); setTimeout(drawPreview, 0); }}
                    style={{
                      background: sizeKey === s.key ? 'rgba(124,58,237,0.5)' : 'rgba(255,255,255,0.07)',
                      color: sizeKey === s.key ? '#e9d5ff' : '#9ca3af',
                      border: `1px solid ${sizeKey === s.key ? '#7c3aed' : 'rgba(167,139,250,0.2)'}`,
                      borderRadius: '8px', padding: '0.4rem 0.8rem',
                      cursor: 'pointer', fontSize: '0.85rem', textAlign: 'left',
                    }}
                  >
                    {s.label} <span style={{ color: '#6b7280', fontSize: '0.75rem' }}>{s.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 背景色 */}
            <div>
              <label style={labelStyle}>🎨 背景顏色</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {BG_COLORS.map(b => (
                  <button key={b.key} onClick={() => { setBgKey(b.key); setTimeout(drawPreview, 0); }}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '0.6rem',
                      background: bgKey === b.key ? 'rgba(124,58,237,0.5)' : 'rgba(255,255,255,0.07)',
                      color: bgKey === b.key ? '#e9d5ff' : '#9ca3af',
                      border: `1px solid ${bgKey === b.key ? '#7c3aed' : 'rgba(167,139,250,0.2)'}`,
                      borderRadius: '8px', padding: '0.4rem 0.8rem',
                      cursor: 'pointer', fontSize: '0.85rem', textAlign: 'left',
                    }}
                  >
                    <span style={{ width: '16px', height: '16px', background: b.color, borderRadius: '3px', border: '1px solid rgba(255,255,255,0.2)', flexShrink: 0 }} />
                    {b.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 縮放滑桿 */}
          {imgSrc && (
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={labelStyle}>🔍 縮放　<span style={{ color: '#f3f4f6' }}>{zoom}%</span></label>
              <input type="range" min={50} max={200} value={zoom}
                onChange={e => { setZoom(Number(e.target.value)); redraw(); }}
                style={{ width: '100%', accentColor: '#7c3aed' }} />
              <p style={{ color: '#6b7280', fontSize: '0.75rem', margin: '0.3rem 0 0' }}>
                ↕️ 拖動下方預覽圖可調整位置
              </p>
            </div>
          )}

          {/* 下載按鈕 */}
          <button onClick={handleDownload} disabled={!imgSrc}
            style={{ ...btnPrimary, width: '100%', fontSize: '1rem', padding: '0.8rem', opacity: !imgSrc ? 0.5 : 1 }}>
            ⬇️ 下載證件照（JPG）
          </button>
        </div>

        {/* 預覽 */}
        {imgSrc && (
          <div style={{ ...cardStyle, marginTop: '1.5rem' }}>
            <h2 style={{ color: '#e9d5ff', margin: '0 0 1rem', fontSize: '1rem' }}>
              👁 預覽　<span style={{ color: '#6b7280', fontSize: '0.8rem', fontWeight: 400 }}>（可拖動調整人臉位置）</span>
            </h2>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <canvas
                ref={previewRef}
                width={PREV_W} height={PREV_H}
                style={{
                  border: '2px solid rgba(167,139,250,0.3)', borderRadius: '4px',
                  cursor: isDraggingImg ? 'grabbing' : 'grab',
                  userSelect: 'none', touchAction: 'none',
                }}
                onMouseDown={onMouseDown}
                onMouseMove={onMouseMove}
                onMouseUp={onMouseUp}
                onMouseLeave={onMouseUp}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onMouseUp}
              />
            </div>
            <p style={{ color: '#6b7280', fontSize: '0.75rem', textAlign: 'center', margin: '0.8rem 0 0' }}>
              {selectedSize.label}（{selectedSize.desc}）· {selectedBg.label}
            </p>
          </div>
        )}

        {/* 隱藏的原始尺寸 canvas */}
        <canvas ref={canvasRef} style={{ display: 'none' }} />

        {/* 說明 */}
        <div style={{ ...cardStyle, marginTop: '1.5rem', background: 'rgba(124,58,237,0.1)' }}>
          <h3 style={{ color: '#c4b5fd', margin: '0 0 0.8rem', fontSize: '0.95rem' }}>💡 使用說明</h3>
          <ul style={{ color: '#9ca3af', fontSize: '0.85rem', margin: 0, paddingLeft: '1.2rem', lineHeight: 2 }}>
            <li>上傳照片後選擇尺寸與背景色</li>
            <li>用滑桿調整縮放比例，拖動預覽圖調整臉部位置</li>
            <li>輸出為 JPG 格式，適合列印或上傳</li>
            <li>純前端處理，照片不會上傳到任何伺服器</li>
            <li>建議使用正面清晰照片效果最佳</li>
          </ul>
        </div>

        <div style={{ textAlign: 'center', marginTop: '2rem', paddingBottom: '1rem' }}>
          <a href="/privacy" style={{ color: '#4b5563', fontSize: '0.75rem', textDecoration: 'none' }}>隱私權政策</a>
        </div>
      </div>
    </div>
  );
}
