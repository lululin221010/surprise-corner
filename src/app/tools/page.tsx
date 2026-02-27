'use client';
// 📄 路徑：src/app/tools/page.tsx

import { useState, useEffect, useRef } from 'react';
import TodoNotice from '@/components/TodoNotice';

const QUOTES = [
  '每一天都是嶄新的開始，別讓昨天的遺憾佔據今天的空間。',
  '你比你想像中的更勇敢，比你看起來的更強壯。',
  '不要等待完美的時機，現在就是最好的時候。',
  '小小的進步，每天累積，終將成就驚人的改變。',
  '相信自己，你擁有改變一切的力量。',
  '生命中最美好的事物，往往在意料之外。',
  '放慢腳步，感受當下，這才是真正的富有。',
  '每一個困難，都是讓你更強大的禮物。',
  '勇敢不是不害怕，而是害怕了還繼續前行。',
  '你的故事還沒結束，最精彩的章節正在等著你。',
];

const SIGNS = ['牡羊座','金牛座','雙子座','巨蟹座','獅子座','處女座','天秤座','天蠍座','射手座','摩羯座','水瓶座','雙魚座'];

const RANDOM_PAGES = [
  { href: '/ai-news', label: '🗞 AI快訊' },
  { href: '/creator', label: '✍️ 創作空間' },
  { href: '/novels', label: '📚 連載小說' },
  { href: '/random', label: '🎲 隨機驚喜' },
  { href: '/wall', label: '🔥 作品牆' },
  { href: 'https://still-time-corner.vercel.app/', label: '✨ Still Time Corner' },
];

function getCreatorId() {
  if (typeof window === 'undefined') return '';
  let id = localStorage.getItem('creatorId');
  if (!id) {
    id = 'cr_' + Math.random().toString(36).substring(2, 10);
    localStorage.setItem('creatorId', id);
  }
  return id;
}

async function submitToWall(text: string): Promise<string | null> {
  try {
    const res = await fetch('/api/wall', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, creatorId: getCreatorId() }),
    });
    const data = await res.json();
    return data.id || null;
  } catch { return null; }
}

const cardStyle = {
  background: 'rgba(255,255,255,0.07)',
  border: '1px solid rgba(167,139,250,0.25)',
  borderRadius: '16px', padding: '1.5rem',
  backdropFilter: 'blur(10px)',
};

const btnStyle = (active = false) => ({
  background: active ? 'linear-gradient(135deg, #7c3aed, #ec4899)' : 'rgba(255,255,255,0.08)',
  color: '#fff', border: 'none', borderRadius: '30px',
  padding: '0.5rem 1.2rem', cursor: 'pointer',
  fontWeight: active ? 700 : 400, fontSize: '0.85rem', transition: 'all 0.2s',
});

const inputStyle: React.CSSProperties = {
  width: '100%', background: 'rgba(0,0,0,0.3)',
  border: '1px solid rgba(167,139,250,0.3)', borderRadius: '10px',
  color: '#fff', padding: '0.7rem 1rem', fontSize: '0.95rem',
  outline: 'none', boxSizing: 'border-box',
};

// ✅ 字數計算函式
function calcWordCount(text: string): number {
  if (!text) return 0;
  const chineseChars = (text.match(/[\u4e00-\u9fff\u3400-\u4dbf\uf900-\ufaff]/g) || []).length;
  const englishWords = (text.match(/[a-zA-Z]+/g) || []).length;
  const numbers = (text.match(/[0-9]+/g) || []).length;
  return chineseChars + englishWords + numbers;
}

interface AiPanelProps {
  type: string;
  placeholder: string;
  label: string;
  emoji: string;
  signs?: string[];
}

function AiToolPanel({ type, placeholder, label, emoji, signs }: AiPanelProps) {
  const [randomPage] = useState(() => RANDOM_PAGES[Math.floor(Math.random() * RANDOM_PAGES.length)]);
  const [localInput, setLocalInput] = useState('');
  const [selectedSign, setSelectedSign] = useState(signs?.[0] || '');
  const [aiResult, setAiResult] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [wallMsg, setWallMsg] = useState('');

  async function handleGenerate() {
    const val = type === 'fortune' ? selectedSign : localInput;
    if (!val.trim()) return;
    setAiLoading(true); setAiResult(''); setWallMsg('');
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, input: val }),
      });
      const data = await res.json();
      setAiResult(data.result || '生成失敗，請再試一次');
    } catch { setAiResult('網路錯誤，請再試一次'); }
    setAiLoading(false);
  }

  async function handleSubmitWall() {
    if (!aiResult) return;
    const id = await submitToWall(aiResult);
    if (id) setWallMsg('✅ 已公開到作品牆！');
    else setWallMsg('❌ 送出失敗，請再試');
  }

  return (
    <div style={{ ...cardStyle, textAlign: 'center' }}>
      <h2 style={{ color: '#e9d5ff', margin: '0 0 1.5rem' }}>{emoji} {label}</h2>
      {type === 'fortune' ? (
        <select value={selectedSign} onChange={e => setSelectedSign(e.target.value)}
          style={{ ...inputStyle, marginBottom: '1rem', cursor: 'pointer' }}>
          {signs?.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      ) : (
        <input
          value={localInput}
          onChange={e => setLocalInput(e.target.value)}
          placeholder={placeholder}
          style={{ ...inputStyle, marginBottom: '1rem', textAlign: 'center' }}
          onKeyDown={e => e.key === 'Enter' && handleGenerate()}
        />
      )}
      <button onClick={handleGenerate} disabled={aiLoading}
        style={{ ...btnStyle(true), padding: '0.7rem 2rem', fontSize: '1rem', opacity: aiLoading ? 0.7 : 1 }}>
        {aiLoading ? '生成中...' : '✨ 立即生成'}
      </button>

      {aiResult && (
        <div style={{ marginTop: '1.5rem', background: 'linear-gradient(135deg,rgba(124,58,237,0.3),rgba(236,72,153,0.3))', borderRadius: '12px', padding: '1.5rem' }}>
          <p style={{ color: '#f3f4f6', fontSize: '1.1rem', lineHeight: 1.9, margin: '0 0 1rem', fontStyle: 'italic' }}>
            「{aiResult}」
          </p>
          {!wallMsg ? (
            <button onClick={handleSubmitWall}
              style={{ ...btnStyle(), border: '1px solid rgba(167,139,250,0.4)', padding: '0.5rem 1.2rem' }}>
              🔥 公開到作品牆
            </button>
          ) : (
            <p style={{ color: '#a78bfa', fontSize: '0.9rem', margin: 0 }}>{wallMsg}</p>
          )}
        </div>
      )}
    </div>
  );
}

// ============================================================
// 🔐 密碼產生器
// ============================================================
function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [useUpper, setUseUpper] = useState(true);
  const [useLower, setUseLower] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [password, setPassword] = useState('');
  const [copied, setCopied] = useState(false);

  function generate() {
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lower = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    let chars = '';
    if (useUpper) chars += upper;
    if (useLower) chars += lower;
    if (useNumbers) chars += numbers;
    if (useSymbols) chars += symbols;
    if (!chars) { setPassword('請至少選一種字元類型'); return; }
    let pwd = '';
    for (let i = 0; i < length; i++) {
      pwd += chars[Math.floor(Math.random() * chars.length)];
    }
    setPassword(pwd);
    setCopied(false);
  }

  function copy() {
    if (!password) return;
    navigator.clipboard.writeText(password).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
  }

  const strength = () => {
    let s = 0;
    if (useUpper) s++; if (useLower) s++; if (useNumbers) s++; if (useSymbols) s++;
    if (length >= 16) s++; if (length >= 20) s++;
    if (s <= 2) return { label: '弱', color: '#ef4444' };
    if (s <= 4) return { label: '中', color: '#f59e0b' };
    return { label: '強', color: '#10b981' };
  };

  const st = strength();

  return (
    <div style={cardStyle}>
      <h2 style={{ color: '#e9d5ff', margin: '0 0 1.5rem', textAlign: 'center' }}>🔐 密碼產生器</h2>

      <div style={{ marginBottom: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#c4b5fd', fontSize: '0.85rem', marginBottom: '0.4rem' }}>
          <span>密碼長度</span><span>{length} 位</span>
        </div>
        <input type="range" min={6} max={32} value={length} onChange={e => setLength(Number(e.target.value))}
          style={{ width: '100%', accentColor: '#7c3aed' }} />
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.2rem' }}>
        {[
          { label: '大寫 A-Z', val: useUpper, set: setUseUpper },
          { label: '小寫 a-z', val: useLower, set: setUseLower },
          { label: '數字 0-9', val: useNumbers, set: setUseNumbers },
          { label: '符號 !@#', val: useSymbols, set: setUseSymbols },
        ].map(opt => (
          <button key={opt.label} onClick={() => opt.set(!opt.val)}
            style={{ ...btnStyle(opt.val), fontSize: '0.8rem', padding: '0.4rem 0.9rem' }}>
            {opt.label}
          </button>
        ))}
      </div>

      <button onClick={generate} style={{ ...btnStyle(true), width: '100%', padding: '0.8rem', fontSize: '1rem', marginBottom: '1rem' }}>
        🎲 產生密碼
      </button>

      {password && (
        <div style={{ background: 'rgba(0,0,0,0.4)', borderRadius: '10px', padding: '1rem', position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ color: st.color, fontSize: '0.8rem', fontWeight: 700 }}>強度：{st.label}</span>
            <button onClick={copy} style={{ ...btnStyle(copied), fontSize: '0.8rem', padding: '0.3rem 0.8rem' }}>
              {copied ? '✅ 已複製' : '📋 複製'}
            </button>
          </div>
          <p style={{ color: '#f3f4f6', fontFamily: 'monospace', fontSize: '1rem', margin: 0, wordBreak: 'break-all', letterSpacing: '0.05em' }}>
            {password}
          </p>
        </div>
      )}
    </div>
  );
}

// ============================================================
// 📅 年齡／日期計算器
// ============================================================
function DateCalculator() {
  const [mode, setMode] = useState<'age'|'diff'>('age');
  const [birthDate, setBirthDate] = useState('');
  const [dateA, setDateA] = useState('');
  const [dateB, setDateB] = useState('');
  const [result, setResult] = useState('');

  function calcAge() {
    if (!birthDate) return;
    const birth = new Date(birthDate);
    const now = new Date();
    let years = now.getFullYear() - birth.getFullYear();
    let months = now.getMonth() - birth.getMonth();
    let days = now.getDate() - birth.getDate();
    if (days < 0) { months--; days += new Date(now.getFullYear(), now.getMonth(), 0).getDate(); }
    if (months < 0) { years--; months += 12; }
    const totalDays = Math.floor((now.getTime() - birth.getTime()) / 86400000);
    setResult(`🎂 你已經 ${years} 歲 ${months} 個月 ${days} 天\n📆 共活了 ${totalDays.toLocaleString()} 天`);
  }

  function calcDiff() {
    if (!dateA || !dateB) return;
    const a = new Date(dateA), b = new Date(dateB);
    const diff = Math.abs(b.getTime() - a.getTime());
    const days = Math.floor(diff / 86400000);
    const weeks = Math.floor(days / 7);
    const months = Math.abs((b.getFullYear() - a.getFullYear()) * 12 + b.getMonth() - a.getMonth());
    setResult(`📅 相差 ${days.toLocaleString()} 天\n📅 約 ${weeks.toLocaleString()} 週\n📅 約 ${months} 個月`);
  }

  return (
    <div style={cardStyle}>
      <h2 style={{ color: '#e9d5ff', margin: '0 0 1.2rem', textAlign: 'center' }}>📅 年齡／日期計算器</h2>
      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginBottom: '1.2rem' }}>
        <button onClick={() => { setMode('age'); setResult(''); }} style={btnStyle(mode === 'age')}>🎂 年齡計算</button>
        <button onClick={() => { setMode('diff'); setResult(''); }} style={btnStyle(mode === 'diff')}>📆 日期差距</button>
      </div>

      {mode === 'age' ? (
        <>
          <label style={{ color: '#c4b5fd', fontSize: '0.85rem' }}>出生日期</label>
          <input type="date" value={birthDate} onChange={e => setBirthDate(e.target.value)}
            style={{ ...inputStyle, marginTop: '0.4rem', marginBottom: '1rem', colorScheme: 'dark' }} />
          <button onClick={calcAge} style={{ ...btnStyle(true), width: '100%', padding: '0.8rem' }}>計算年齡</button>
        </>
      ) : (
        <>
          <label style={{ color: '#c4b5fd', fontSize: '0.85rem' }}>開始日期</label>
          <input type="date" value={dateA} onChange={e => setDateA(e.target.value)}
            style={{ ...inputStyle, marginTop: '0.4rem', marginBottom: '0.8rem', colorScheme: 'dark' }} />
          <label style={{ color: '#c4b5fd', fontSize: '0.85rem' }}>結束日期</label>
          <input type="date" value={dateB} onChange={e => setDateB(e.target.value)}
            style={{ ...inputStyle, marginTop: '0.4rem', marginBottom: '1rem', colorScheme: 'dark' }} />
          <button onClick={calcDiff} style={{ ...btnStyle(true), width: '100%', padding: '0.8rem' }}>計算差距</button>
        </>
      )}

      {result && (
        <div style={{ marginTop: '1rem', background: 'rgba(124,58,237,0.2)', borderRadius: '10px', padding: '1rem' }}>
          {result.split('\n').map((line, i) => (
            <p key={i} style={{ color: '#f3f4f6', margin: i === 0 ? 0 : '0.3rem 0 0', fontSize: '1rem' }}>{line}</p>
          ))}
        </div>
      )}
    </div>
  );
}

// ============================================================
// 💱 匯率換算器
// 📄 路徑：src/app/tools/page.tsx 中的 CurrencyConverter function
// ✅ 修復：改用 open.er-api.com（免費、穩定、無需 API key）
// ============================================================
function CurrencyConverter() {
  const CURRENCIES = ['TWD','USD','JPY','EUR','GBP','KRW','CNY','HKD','AUD','CAD','SGD','THB'];
  const [amount, setAmount] = useState('1000');
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('TWD');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [updateTime, setUpdateTime] = useState('');

  async function convert() {
    if (!amount || isNaN(Number(amount))) return;
    setLoading(true); setResult(''); setUpdateTime('');
    try {
      // ✅ 改用 open.er-api.com，免費、不需要 API key
      const res = await fetch(`https://open.er-api.com/v6/latest/${from}`);
      if (!res.ok) throw new Error('API 錯誤');
      const data = await res.json();
      if (data.result !== 'success') throw new Error('查詢失敗');
      const rate = data.rates[to];
      if (!rate) throw new Error('找不到匯率');
      const converted = (Number(amount) * rate).toFixed(2);
      setResult(`${Number(amount).toLocaleString()} ${from} = ${Number(converted).toLocaleString()} ${to}`);
      // 顯示更新時間
      const updateDate = new Date(data.time_last_update_utc);
      setUpdateTime(`匯率更新時間：${updateDate.toLocaleDateString('zh-TW')}`);
    } catch (e) {
      // ✅ 備用：改用 exchangerate.host
      try {
        const res2 = await fetch(`https://api.exchangerate.host/convert?from=${from}&to=${to}&amount=${amount}`);
        const data2 = await res2.json();
        if (data2.success && data2.result) {
          setResult(`${Number(amount).toLocaleString()} ${from} = ${Number(data2.result.toFixed(2)).toLocaleString()} ${to}`);
          setUpdateTime(`匯率更新時間：${new Date().toLocaleDateString('zh-TW')}`);
        } else {
          throw new Error('備用 API 也失敗');
        }
      } catch {
        setResult('❌ 無法取得匯率，請稍後再試');
      }
    }
    setLoading(false);
  }

  const selectStyle: React.CSSProperties = {
    ...inputStyle, cursor: 'pointer', width: 'auto', flex: 1,
  };

  return (
    <div style={cardStyle}>
      <h2 style={{ color: '#e9d5ff', margin: '0 0 1.5rem', textAlign: 'center' }}>💱 匯率換算器</h2>

      <label style={{ color: '#c4b5fd', fontSize: '0.85rem' }}>金額</label>
      <input type="number" value={amount} onChange={e => setAmount(e.target.value)}
        style={{ ...inputStyle, marginTop: '0.4rem', marginBottom: '1rem' }}
        onKeyDown={e => e.key === 'Enter' && convert()} />

      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', alignItems: 'center' }}>
        <select value={from} onChange={e => setFrom(e.target.value)} style={selectStyle}>
          {CURRENCIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <button
          onClick={() => { const tmp = from; setFrom(to); setTo(tmp); setResult(''); setUpdateTime(''); }}
          style={{ ...btnStyle(), padding: '0.7rem', fontSize: '1.1rem', flexShrink: 0 }}>
          ⇄
        </button>
        <select value={to} onChange={e => setTo(e.target.value)} style={selectStyle}>
          {CURRENCIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <button onClick={convert} disabled={loading}
        style={{ ...btnStyle(true), width: '100%', padding: '0.8rem', opacity: loading ? 0.7 : 1 }}>
        {loading ? '查詢中...' : '💱 立即換算'}
      </button>

      {result && (
        <div style={{ marginTop: '1rem', background: 'rgba(124,58,237,0.2)', borderRadius: '10px', padding: '1rem', textAlign: 'center' }}>
          <p style={{ color: result.startsWith('❌') ? '#fca5a5' : '#f3f4f6', fontSize: '1.2rem', fontWeight: 700, margin: '0 0 0.3rem' }}>
            {result}
          </p>
          {updateTime && <p style={{ color: '#9ca3af', fontSize: '0.75rem', margin: 0 }}>{updateTime}</p>}
        </div>
      )}
    </div>
  );
}

// ============================================================
// 🎨 顏色代碼轉換器（RGB 滑桿版）
// ============================================================
function ColorConverter() {
  const [r, setR] = useState(124);
  const [g, setG] = useState(58);
  const [b, setB] = useState(237);
  const [hexInput, setHexInput] = useState('#7c3aed');
  const [copied, setCopied] = useState('');

  function toHex(n: number) { return n.toString(16).padStart(2,'0'); }
  const hex = `#${toHex(r)}${toHex(g)}${toHex(b)}`;

  function rgbToHsl(r: number, g: number, b: number) {
    const rr = r/255, gg = g/255, bb = b/255;
    const max = Math.max(rr,gg,bb), min = Math.min(rr,gg,bb);
    let h = 0, s = 0; const l = (max+min)/2;
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d/(2-max-min) : d/(max+min);
      switch(max) {
        case rr: h = ((gg-bb)/d + (gg<bb?6:0))/6; break;
        case gg: h = ((bb-rr)/d + 2)/6; break;
        case bb: h = ((rr-gg)/d + 4)/6; break;
      }
    }
    return { h: Math.round(h*360), s: Math.round(s*100), l: Math.round(l*100) };
  }

  function handleHexInput(val: string) {
    setHexInput(val);
    if (/^#[0-9A-Fa-f]{6}$/.test(val)) {
      setR(parseInt(val.slice(1,3),16));
      setG(parseInt(val.slice(3,5),16));
      setB(parseInt(val.slice(5,7),16));
    }
  }

  function handleSlider(channel: 'r'|'g'|'b', val: number) {
    if (channel === 'r') setR(val);
    if (channel === 'g') setG(val);
    if (channel === 'b') setB(val);
    setHexInput(`#${toHex(channel==='r'?val:r)}${toHex(channel==='g'?val:g)}${toHex(channel==='b'?val:b)}`);
  }

  function copyText(text: string, key: string) {
    navigator.clipboard.writeText(text).then(() => { setCopied(key); setTimeout(() => setCopied(''), 2000); });
  }

  const { h, s, l } = rgbToHsl(r, g, b);
  const codes = [
    { label: 'HEX', value: hex.toUpperCase(), key: 'hex' },
    { label: 'RGB', value: `rgb(${r}, ${g}, ${b})`, key: 'rgb' },
    { label: 'HSL', value: `hsl(${h}, ${s}%, ${l}%)`, key: 'hsl' },
  ];

  const sliders = [
    { label: '🔴 紅色 R', channel: 'r' as const, val: r, color: '#ef4444', track: `linear-gradient(to right, #000, #ff0000)` },
    { label: '🟢 綠色 G', channel: 'g' as const, val: g, color: '#10b981', track: `linear-gradient(to right, #000, #00ff00)` },
    { label: '🔵 藍色 B', channel: 'b' as const, val: b, color: '#60a5fa', track: `linear-gradient(to right, #000, #0000ff)` },
  ];

  return (
    <div style={cardStyle}>
      <h2 style={{ color: '#e9d5ff', margin: '0 0 1.5rem', textAlign: 'center' }}>🎨 顏色代碼轉換器</h2>

      {/* 顏色預覽大區塊 */}
      <div style={{ width: '100%', height: '100px', borderRadius: '12px', background: hex, border: '2px solid rgba(167,139,250,0.3)', marginBottom: '1.2rem', transition: 'background 0.1s' }} />

      {/* RGB 滑桿 */}
      {sliders.map(sl => (
        <div key={sl.channel} style={{ marginBottom: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
            <span style={{ color: '#c4b5fd', fontSize: '0.85rem' }}>{sl.label}</span>
            <span style={{ color: '#f3f4f6', fontFamily: 'monospace', fontSize: '0.85rem', minWidth: '30px', textAlign: 'right' }}>{sl.val}</span>
          </div>
          <input type="range" min={0} max={255} value={sl.val}
            onChange={e => handleSlider(sl.channel, Number(e.target.value))}
            style={{ width: '100%', accentColor: sl.color, height: '6px' }} />
        </div>
      ))}

      {/* HEX 直接輸入 */}
      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '1.2rem' }}>
        <span style={{ color: '#9ca3af', fontSize: '0.85rem', flexShrink: 0 }}>或直接輸入 HEX：</span>
        <input value={hexInput} onChange={e => handleHexInput(e.target.value)}
          placeholder="#7c3aed"
          style={{ ...inputStyle, fontFamily: 'monospace', flex: 1 }} />
        <input type="color" value={hex} onChange={e => handleHexInput(e.target.value)}
          title="點擊開啟拾色器"
          style={{ width: '42px', height: '42px', border: 'none', background: 'none', cursor: 'pointer', borderRadius: '8px', flexShrink: 0 }} />
      </div>

      {/* 複製區 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {codes.map(code => (
          <div key={code.key} style={{ display: 'flex', alignItems: 'center', background: 'rgba(0,0,0,0.3)', borderRadius: '8px', padding: '0.7rem 1rem', gap: '0.8rem' }}>
            <span style={{ color: '#9ca3af', fontSize: '0.8rem', width: '35px', flexShrink: 0 }}>{code.label}</span>
            <span style={{ color: '#f3f4f6', fontFamily: 'monospace', flex: 1 }}>{code.value}</span>
            <button onClick={() => copyText(code.value, code.key)}
              style={{ ...btnStyle(copied === code.key), fontSize: '0.75rem', padding: '0.3rem 0.7rem', flexShrink: 0 }}>
              {copied === code.key ? '✅ 已複製' : '複製'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// 🎲 隨機決策器（支援自訂情境）
// 📄 貼回路徑：src/app/tools/page.tsx 中的 RandomDecider function
// ============================================================

// ① 把頁面頂部的 DECIDE_PRESETS 常數改成這樣（加上 id 欄位）：
const DECIDE_PRESETS = [
  { id: 'eat',     label: '🍜 今天吃什麼', options: ['火鍋', '便當', '拉麵', '自己煮', '叫外送'] },
  { id: 'watch',   label: '🎬 今晚看什麼', options: ['Netflix 劇', '電影', 'YouTube', '直播', '早點睡'] },
  { id: 'drink',   label: '☕ 下午喝什麼', options: ['珍奶', '美式咖啡', '綠茶', '可樂', '白開水'] },
  { id: 'weekend', label: '🏖 週末去哪',   options: ['待在家', '逛街', '爬山', '看展', '找朋友'] },
];

// ② 把整個 RandomDecider function 換成這個：
function RandomDecider() {
  // 自訂情境（從 localStorage 讀取）
  const [customPresets, setCustomPresets] = useState<{ id: string; label: string; options: string[] }[]>([]);
  const [presetsLoaded, setPresetsLoaded] = useState(false);

  // 建立新情境的狀態
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newScenarioLabel, setNewScenarioLabel] = useState('');
  const [newScenarioOptions, setNewScenarioOptions] = useState<string[]>([]);
  const [newOptionInput, setNewOptionInput] = useState('');

  // 決策器主體狀態
  const [activePresetId, setActivePresetId] = useState<string | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [inputVal, setInputVal] = useState('');
  const [result, setResult] = useState('');
  const [spinning, setSpinning] = useState(false);

  // 讀取 localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('sc_decide_presets');
      if (saved) setCustomPresets(JSON.parse(saved));
    } catch {}
    setPresetsLoaded(true);
  }, []);

  // 儲存 localStorage
  useEffect(() => {
    if (!presetsLoaded) return;
    try { localStorage.setItem('sc_decide_presets', JSON.stringify(customPresets)); } catch {}
  }, [customPresets, presetsLoaded]);

  // 載入某個情境
  function loadPreset(preset: { id: string; label: string; options: string[] }) {
    setActivePresetId(preset.id);
    setOptions([...preset.options]);
    setResult('');
  }

  // 新增選項到決策器
  function addOption() {
    if (!inputVal.trim()) return;
    setOptions(prev => [...prev, inputVal.trim()]);
    setInputVal('');
    setActivePresetId(null); // 手動加了就不算預設情境
  }

  // 新增選項到新情境表單
  function addNewScenarioOption() {
    if (!newOptionInput.trim()) return;
    setNewScenarioOptions(prev => [...prev, newOptionInput.trim()]);
    setNewOptionInput('');
  }

  // 儲存新情境
  function saveNewScenario() {
    if (!newScenarioLabel.trim() || newScenarioOptions.length < 2) return;
    const newPreset = {
      id: 'custom_' + Date.now(),
      label: newScenarioLabel.trim(),
      options: [...newScenarioOptions],
    };
    setCustomPresets(prev => [...prev, newPreset]);
    // 存完後自動載入這個情境
    loadPreset(newPreset);
    // 重置表單
    setNewScenarioLabel('');
    setNewScenarioOptions([]);
    setNewOptionInput('');
    setShowCreateForm(false);
  }

  // 刪除自訂情境
  function deleteCustomPreset(id: string) {
    setCustomPresets(prev => prev.filter(p => p.id !== id));
    if (activePresetId === id) { setOptions([]); setResult(''); setActivePresetId(null); }
  }

  // 抽籤動畫
  function decide() {
    if (options.length < 2) return;
    setSpinning(true);
    setResult('');
    let count = 0;
    const interval = setInterval(() => {
      setResult(options[Math.floor(Math.random() * options.length)]);
      count++;
      if (count > 15) {
        clearInterval(interval);
        setResult(options[Math.floor(Math.random() * options.length)]);
        setSpinning(false);
      }
    }, 80);
  }

  const allPresets = [...DECIDE_PRESETS, ...customPresets];

  return (
    <div style={cardStyle}>
      <h2 style={{ color: '#e9d5ff', margin: '0 0 0.5rem', textAlign: 'center' }}>🎲 隨機決策器</h2>
      <p style={{ color: '#9ca3af', fontSize: '0.85rem', textAlign: 'center', margin: '0 0 1.2rem' }}>選不了嗎？讓命運決定！</p>

      {/* 情境按鈕列 */}
      <p style={{ color: '#c4b5fd', fontSize: '0.8rem', margin: '0 0 0.5rem' }}>👇 點一個情境快速開始：</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '0.8rem' }}>
        {allPresets.map(preset => (
          <div key={preset.id} style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
            <button
              onClick={() => loadPreset(preset)}
              style={{ ...btnStyle(activePresetId === preset.id), fontSize: '0.8rem', padding: '0.4rem 0.9rem',
                borderRadius: customPresets.find(p => p.id === preset.id) ? '20px 0 0 20px' : '20px' }}>
              {preset.label}
            </button>
            {/* 自訂情境才顯示刪除按鈕 */}
            {customPresets.find(p => p.id === preset.id) && (
              <button
                onClick={() => deleteCustomPreset(preset.id)}
                title="刪除此情境"
                style={{ background: 'rgba(239,68,68,0.2)', border: 'none', borderRadius: '0 20px 20px 0',
                  color: '#f87171', cursor: 'pointer', padding: '0.4rem 0.5rem', fontSize: '0.75rem',
                  lineHeight: 1, height: '100%' }}>
                ✕
              </button>
            )}
          </div>
        ))}

        {/* ➕ 新增情境按鈕 */}
        <button
          onClick={() => { setShowCreateForm(!showCreateForm); setNewScenarioLabel(''); setNewScenarioOptions([]); setNewOptionInput(''); }}
          style={{ ...btnStyle(showCreateForm), fontSize: '0.8rem', padding: '0.4rem 0.9rem',
            border: '1px dashed rgba(167,139,250,0.5)', background: showCreateForm ? 'rgba(124,58,237,0.3)' : 'transparent' }}>
          ➕ 建立新情境
        </button>
      </div>

      {/* 建立新情境表單 */}
      {showCreateForm && (
        <div style={{ background: 'rgba(0,0,0,0.25)', borderRadius: '12px', padding: '1rem', marginBottom: '1rem',
          border: '1px solid rgba(167,139,250,0.2)' }}>
          <p style={{ color: '#a78bfa', fontSize: '0.85rem', fontWeight: 700, margin: '0 0 0.8rem' }}>✏️ 建立新情境</p>

          {/* 情境名稱 */}
          <input
            value={newScenarioLabel}
            onChange={e => setNewScenarioLabel(e.target.value)}
            placeholder="情境名稱，例：🏋️ 今天練什麼"
            style={{ ...inputStyle, marginBottom: '0.6rem' }}
          />

          {/* 新增選項 */}
          <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '0.6rem' }}>
            <input
              value={newOptionInput}
              onChange={e => setNewOptionInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addNewScenarioOption()}
              placeholder="輸入一個選項，按 Enter"
              style={{ ...inputStyle, flex: 1 }}
            />
            <button onClick={addNewScenarioOption} style={{ ...btnStyle(true), flexShrink: 0 }}>+ 新增</button>
          </div>

          {/* 已輸入的選項 */}
          {newScenarioOptions.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '0.8rem' }}>
              {newScenarioOptions.map((opt, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem',
                  background: 'rgba(124,58,237,0.25)', borderRadius: '20px', padding: '0.3rem 0.8rem',
                  fontSize: '0.82rem', color: '#e9d5ff' }}>
                  {opt}
                  <button onClick={() => setNewScenarioOptions(prev => prev.filter((_, j) => j !== i))}
                    style={{ background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer', fontSize: '0.9rem', padding: 0 }}>✕</button>
                </div>
              ))}
            </div>
          )}

          {newScenarioOptions.length < 2 && (
            <p style={{ color: '#6b7280', fontSize: '0.75rem', margin: '0 0 0.6rem' }}>請至少輸入 2 個選項</p>
          )}

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={saveNewScenario}
              disabled={!newScenarioLabel.trim() || newScenarioOptions.length < 2}
              style={{ ...btnStyle(true), flex: 1, opacity: (!newScenarioLabel.trim() || newScenarioOptions.length < 2) ? 0.4 : 1 }}>
              💾 儲存情境
            </button>
            <button onClick={() => setShowCreateForm(false)} style={{ ...btnStyle(), flexShrink: 0 }}>取消</button>
          </div>
        </div>
      )}

      {/* 手動輸入選項區 */}
      <p style={{ color: '#c4b5fd', fontSize: '0.8rem', margin: '0 0 0.5rem' }}>✏️ 或自己輸入選項：</p>
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.8rem' }}>
        <input value={inputVal} onChange={e => setInputVal(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addOption()}
          placeholder="輸入一個選項，按 Enter 新增" style={{ ...inputStyle, flex: 1 }} />
        <button onClick={addOption} style={{ ...btnStyle(true), flexShrink: 0 }}>+ 新增</button>
      </div>

      {/* 目前選項 */}
      {options.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.2rem' }}>
          {options.map((opt, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem',
              background: 'rgba(124,58,237,0.25)', borderRadius: '20px', padding: '0.3rem 0.8rem',
              fontSize: '0.85rem', color: '#e9d5ff' }}>
              {opt}
              <button onClick={() => { setOptions(options.filter((_, j) => j !== i)); setResult(''); setActivePresetId(null); }}
                style={{ background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer', fontSize: '0.9rem', padding: '0', lineHeight: 1 }}>✕</button>
            </div>
          ))}
          <button onClick={() => { setOptions([]); setResult(''); setActivePresetId(null); }}
            style={{ ...btnStyle(), fontSize: '0.75rem', padding: '0.3rem 0.7rem' }}>清除全部</button>
        </div>
      )}

      {options.length < 2 && (
        <p style={{ color: '#6b7280', fontSize: '0.8rem', textAlign: 'center', margin: '0 0 1rem' }}>
          請先點選情境，或輸入至少 2 個選項
        </p>
      )}

      <button onClick={decide} disabled={spinning || options.length < 2}
        style={{ ...btnStyle(true), width: '100%', padding: '0.8rem', fontSize: '1rem',
          opacity: (spinning || options.length < 2) ? 0.5 : 1 }}>
        {spinning ? '🎰 決定中...' : '🎲 幫我決定！'}
      </button>

      {spinning && result && (
        <div style={{ marginTop: '1.2rem', background: 'rgba(0,0,0,0.3)', borderRadius: '12px', padding: '1.5rem', textAlign: 'center' }}>
          <p style={{ color: '#a78bfa', fontSize: '1.3rem', fontWeight: 700, margin: 0 }}>{result}</p>
        </div>
      )}
      {result && !spinning && (
        <div style={{ marginTop: '1.2rem', background: 'linear-gradient(135deg,rgba(124,58,237,0.3),rgba(236,72,153,0.3))',
          borderRadius: '12px', padding: '1.5rem', textAlign: 'center' }}>
          <p style={{ color: '#9ca3af', fontSize: '0.85rem', margin: '0 0 0.5rem' }}>命運選擇了</p>
          <p style={{ color: '#f3f4f6', fontSize: '1.5rem', fontWeight: 800, margin: '0 0 0.8rem' }}>✨ {result}</p>
          <button onClick={decide} style={{ ...btnStyle(), fontSize: '0.85rem' }}>🔄 再抽一次</button>
        </div>
      )}
    </div>
  );
}

// ============================================================
// 📊 BMI 計算器
// ============================================================
function BmiCalculator() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [result, setResult] = useState<{bmi:number;label:string;color:string;tip:string}|null>(null);

  function calc() {
    const h = Number(height) / 100;
    const w = Number(weight);
    if (!h || !w || h <= 0 || w <= 0) return;
    const bmi = w / (h * h);
    let label = '', color = '', tip = '';
    if (bmi < 18.5) { label = '體重過輕'; color = '#60a5fa'; tip = '建議適當增加營養攝取與肌力訓練 💪'; }
    else if (bmi < 24) { label = '正常體重'; color = '#10b981'; tip = '繼續保持健康的生活方式，你做得很好！🌟'; }
    else if (bmi < 27) { label = '體重過重'; color = '#f59e0b'; tip = '建議增加有氧運動，注意飲食均衡 🏃'; }
    else if (bmi < 30) { label = '輕度肥胖'; color = '#f97316'; tip = '建議諮詢醫師或營養師，制定健康計畫 🩺'; }
    else { label = '中重度肥胖'; color = '#ef4444'; tip = '強烈建議就醫評估，制定個人健康計畫 🏥'; }
    setResult({ bmi: Math.round(bmi * 10) / 10, label, color, tip });
  }

  return (
    <div style={cardStyle}>
      <h2 style={{ color: '#e9d5ff', margin: '0 0 1.5rem', textAlign: 'center' }}>📊 BMI 計算器</h2>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <div style={{ flex: 1 }}>
          <label style={{ color: '#c4b5fd', fontSize: '0.85rem' }}>身高（公分）</label>
          <input type="number" value={height} onChange={e => setHeight(e.target.value)}
            placeholder="例：170" style={{ ...inputStyle, marginTop: '0.4rem' }} />
        </div>
        <div style={{ flex: 1 }}>
          <label style={{ color: '#c4b5fd', fontSize: '0.85rem' }}>體重（公斤）</label>
          <input type="number" value={weight} onChange={e => setWeight(e.target.value)}
            placeholder="例：65" style={{ ...inputStyle, marginTop: '0.4rem' }} />
        </div>
      </div>

      <button onClick={calc} style={{ ...btnStyle(true), width: '100%', padding: '0.8rem', marginBottom: result ? '1rem' : 0 }}>
        📊 計算 BMI
      </button>

      {result && (
        <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '12px', padding: '1.2rem', textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', fontWeight: 800, color: result.color, lineHeight: 1 }}>{result.bmi}</div>
          <div style={{ color: result.color, fontWeight: 700, fontSize: '1.1rem', margin: '0.3rem 0' }}>{result.label}</div>
          <p style={{ color: '#9ca3af', fontSize: '0.85rem', margin: '0.5rem 0 0' }}>{result.tip}</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap' }}>
            {[{range:'< 18.5',label:'過輕',c:'#60a5fa'},{range:'18.5-24',label:'正常',c:'#10b981'},{range:'24-27',label:'過重',c:'#f59e0b'},{range:'27+',label:'肥胖',c:'#ef4444'}].map(s => (
              <div key={s.label} style={{ textAlign: 'center' }}>
                <div style={{ color: s.c, fontSize: '0.7rem', fontWeight: 700 }}>{s.label}</div>
                <div style={{ color: '#6b7280', fontSize: '0.65rem' }}>{s.range}</div>
              </div>
            ))}
          </div>
        </div>
      )}
      <p style={{ color: '#4b5563', fontSize: '0.7rem', textAlign: 'center', margin: '0.8rem 0 0' }}>
        ⚠️ BMI 僅供參考，實際健康狀況請諮詢醫師
      </p>
    </div>
  );
}

// ============================================================
// 主頁面
// ============================================================
export default function ToolsPage() {
  const [activeTab, setActiveTab] = useState<
    'wordcount'|'quote'|'todo'|'timer'|'love'|'birthday'|'fortune'|'healing'|
    'password'|'date'|'currency'|'color'|'decide'|'bmi'
  >('wordcount');
  const [text, setText] = useState('');
  const [quote, setQuote] = useState(QUOTES[0]);

  const [todos, setTodos] = useState<{text:string;done:boolean}[]>([]);
  const [todoInput, setTodoInput] = useState('');
  const [todosLoaded, setTodosLoaded] = useState(false);

  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerInput, setTimerInput] = useState('25');
  const [timerRunning, setTimerRunning] = useState(false);
  const [randomPage] = useState(() => RANDOM_PAGES[Math.floor(Math.random() * RANDOM_PAGES.length)]);
  const timerRef = useRef<ReturnType<typeof setInterval>|null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('sc_todos');
      if (saved) setTodos(JSON.parse(saved));
    } catch {}
    setTodosLoaded(true);
  }, []);

  useEffect(() => {
    if (!todosLoaded) return;
    try { localStorage.setItem('sc_todos', JSON.stringify(todos)); } catch {}
  }, [todos, todosLoaded]);

  useEffect(() => {
    if (timerRunning && timerSeconds > 0) {
      timerRef.current = setInterval(() => setTimerSeconds(s => s - 1), 1000);
    } else if (timerSeconds === 0 && timerRunning) {
      setTimerRunning(false); alert('⏰ 時間到！');
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [timerRunning, timerSeconds]);

  const wordCount = calcWordCount(text);
  const charCount = text.replace(/\s/g, '').length;
  const lineCount = text ? text.split('\n').length : 0;

  // 分組顯示 Tab
  const tabGroups = [
    {
      label: '寫作工具',
      tabs: [
        { key: 'wordcount', label: '📝 字數計算' },
        { key: 'quote',     label: '✨ 名言產生' },
        { key: 'todo',      label: '📋 待辦清單' },
        { key: 'timer',     label: '⏱ 倒數計時' },
      ],
    },
    {
      label: 'AI 工具',
      tabs: [
        { key: 'love',      label: '💌 AI告白' },
        { key: 'birthday',  label: '🎂 AI生日祝福' },
        { key: 'fortune',   label: '🔮 今日運勢' },
        { key: 'healing',   label: '✍️ AI療癒小語' },
      ],
    },
    {
      label: '實用工具',
      tabs: [
        { key: 'password',  label: '🔐 密碼產生' },
        { key: 'date',      label: '📅 日期計算' },
        { key: 'currency',  label: '💱 匯率換算' },
        { key: 'color',     label: '🎨 顏色代碼' },
        { key: 'decide',    label: '🎲 隨機決策' },
        { key: 'bmi',       label: '📊 BMI計算' },
      ],
    },
  ] as const;

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg,#0f0c29,#302b63,#24243e)', padding: '2rem 1rem' }}>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ color: '#fff', fontSize: '2rem', fontWeight: 800, margin: 0 }}>🛠 實用工具箱</h1>
          <p style={{ color: '#a78bfa', marginTop: '0.5rem' }}>寫作、靈感、計劃、專注，一站搞定</p>
        </div>

        {/* Tab 分組 */}
        {tabGroups.map(group => (
          <div key={group.label} style={{ marginBottom: '0.8rem' }}>
            <p style={{ color: '#6b7280', fontSize: '0.75rem', margin: '0 0 0.4rem 0.2rem', letterSpacing: '0.05em' }}>
              {group.label}
            </p>
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
              {group.tabs.map(tab => (
                <button key={tab.key} style={btnStyle(activeTab === tab.key)} onClick={() => setActiveTab(tab.key as any)}>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        ))}

        <div style={{ marginTop: '1.5rem' }}>
          {/* 原有功能 */}
          {activeTab === 'wordcount' && (
            <div style={cardStyle}>
              <h2 style={{ color: '#e9d5ff', margin: '0 0 1rem' }}>📝 字數計算器</h2>
              <textarea value={text} onChange={e => setText(e.target.value)}
                placeholder="在這裡貼上或輸入你的文字..."
                style={{ width: '100%', height: '200px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(167,139,250,0.3)', borderRadius: '10px', color: '#fff', padding: '0.8rem', fontSize: '0.95rem', resize: 'vertical', boxSizing: 'border-box', outline: 'none' }}
              />
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap' }}>
                {[
                  { label: '字數（中文字／英文詞／數字）', value: wordCount },
                  { label: '總字元數（含符號，不含空白）', value: charCount },
                  { label: '行數', value: lineCount },
                ].map(stat => (
                  <div key={stat.label} style={{ flex: 1, background: 'rgba(124,58,237,0.2)', borderRadius: '10px', padding: '0.8rem', textAlign: 'center' }}>
                    <div style={{ color: '#c4b5fd', fontSize: '0.8rem' }}>{stat.label}</div>
                    <div style={{ color: '#fff', fontSize: '1.8rem', fontWeight: 800 }}>{stat.value}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'quote' && (
            <div style={{ ...cardStyle, textAlign: 'center' }}>
              <h2 style={{ color: '#e9d5ff', margin: '0 0 1.5rem' }}>✨ 今日名言</h2>
              <div style={{ background: 'linear-gradient(135deg,rgba(124,58,237,0.3),rgba(236,72,153,0.3))', borderRadius: '12px', padding: '2rem', marginBottom: '1.5rem' }}>
                <p style={{ color: '#f3f4f6', fontSize: '1.2rem', lineHeight: 1.8, margin: 0, fontStyle: 'italic' }}>「{quote}」</p>
              </div>
              <button onClick={() => setQuote(QUOTES[Math.floor(Math.random()*QUOTES.length)])} style={{ ...btnStyle(true), padding: '0.7rem 2rem', fontSize: '1rem' }}>🎲 換一句</button>
            </div>
          )}

          {activeTab === 'todo' && (
            <div style={cardStyle}>
              <TodoNotice />
              <h2 style={{ color: '#e9d5ff', margin: '0 0 0.4rem' }}>📋 待辦清單</h2>
              <p style={{ color: '#6b7280', fontSize: '0.75rem', margin: '0 0 1rem' }}>
                💾 資料儲存於你的瀏覽器，僅自己可見｜
                <a href="/privacy" style={{ color: '#a78bfa', textDecoration: 'none' }}>隱私權政策</a>
              </p>
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                <input value={todoInput} onChange={e => setTodoInput(e.target.value)}
                  onKeyDown={e => { if (e.key==='Enter'&&todoInput.trim()) { setTodos([...todos,{text:todoInput.trim(),done:false}]); setTodoInput(''); }}}
                  placeholder="輸入待辦事項，按 Enter 新增"
                  style={{ flex:1, background:'rgba(0,0,0,0.3)', border:'1px solid rgba(167,139,250,0.3)', borderRadius:'10px', color:'#fff', padding:'0.6rem 1rem', fontSize:'0.9rem', outline:'none' }}
                />
                <button onClick={() => { if (todoInput.trim()) { setTodos([...todos,{text:todoInput.trim(),done:false}]); setTodoInput(''); }}} style={btnStyle(true)}>+ 新增</button>
              </div>
              {todos.length === 0 ? (
                <p style={{ color: '#6b7280', textAlign: 'center', padding: '1rem' }}>還沒有待辦事項，加一個吧！</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {todos.map((todo, i) => (
                    <div key={i} style={{ display:'flex', alignItems:'center', gap:'0.8rem', background:'rgba(0,0,0,0.2)', borderRadius:'8px', padding:'0.7rem 1rem' }}>
                      <input type="checkbox" checked={todo.done} onChange={() => setTodos(todos.map((t,j) => j===i?{...t,done:!t.done}:t))} style={{ cursor:'pointer', width:'18px', height:'18px' }} />
                      <span style={{ flex:1, color:todo.done?'#6b7280':'#f3f4f6', textDecoration:todo.done?'line-through':'none' }}>{todo.text}</span>
                      <button onClick={() => setTodos(todos.filter((_,j) => j!==i))} style={{ background:'none', border:'none', color:'#ef4444', cursor:'pointer', fontSize:'1.1rem' }}>✕</button>
                    </div>
                  ))}
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:'0.3rem' }}>
                    <span style={{ color:'#9ca3af', fontSize:'0.8rem' }}>完成 {todos.filter(t=>t.done).length} / {todos.length}</span>
                    <button onClick={() => { if (confirm('確定清除所有已完成項目？')) setTodos(todos.filter(t => !t.done)); }}
                      style={{ background:'none', border:'none', color:'#6b7280', cursor:'pointer', fontSize:'0.75rem' }}>
                      清除已完成
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'timer' && (
            <div style={{ ...cardStyle, textAlign: 'center' }}>
              <h2 style={{ color: '#e9d5ff', margin: '0 0 1rem' }}>⏱ 番茄倒數計時</h2>
              <div style={{ fontSize:'5rem', fontWeight:800, color:timerRunning?'#a78bfa':'#fff', letterSpacing:'0.05em', margin:'1rem 0' }}>
                {String(Math.floor(timerSeconds/60)).padStart(2,'0')}:{String(timerSeconds%60).padStart(2,'0')}
              </div>
              <div style={{ display:'flex', gap:'0.5rem', justifyContent:'center', marginBottom:'1rem', flexWrap:'wrap' }}>
                {[5,10,25,45].map(min => (
                  <button key={min} style={btnStyle()} onClick={() => { setTimerSeconds(min*60); setTimerRunning(false); }}>{min} 分鐘</button>
                ))}
              </div>
              <div style={{ display:'flex', gap:'0.5rem', justifyContent:'center', marginBottom:'1.5rem' }}>
                <input value={timerInput} onChange={e => setTimerInput(e.target.value)} type="number" min="1" max="180"
                  style={{ width:'80px', background:'rgba(0,0,0,0.3)', border:'1px solid rgba(167,139,250,0.3)', borderRadius:'10px', color:'#fff', padding:'0.5rem', textAlign:'center', outline:'none' }} />
                <button style={btnStyle()} onClick={() => { setTimerSeconds(Number(timerInput)*60); setTimerRunning(false); }}>自訂分鐘</button>
              </div>
              <div style={{ display:'flex', gap:'1rem', justifyContent:'center' }}>
                <button style={{ ...btnStyle(true), padding:'0.7rem 2rem', fontSize:'1rem' }} onClick={() => setTimerRunning(!timerRunning)}>{timerRunning?'⏸ 暫停':'▶ 開始'}</button>
                <button style={{ ...btnStyle(), padding:'0.7rem 1.5rem', fontSize:'1rem' }} onClick={() => { setTimerSeconds(Number(timerInput)*60); setTimerRunning(false); }}>🔄 重置</button>
              </div>
            </div>
          )}

          {activeTab === 'love'     && <AiToolPanel key="love"     type="love"     emoji="💌" label="AI 告白生成器" placeholder="輸入對方的名字或暱稱..." />}
          {activeTab === 'birthday' && <AiToolPanel key="birthday" type="birthday" emoji="🎂" label="AI 生日祝福"   placeholder="輸入對方的名字或暱稱..." />}
          {activeTab === 'fortune'  && <AiToolPanel key="fortune"  type="fortune"  emoji="🔮" label="今日運勢"       placeholder="" signs={SIGNS} />}
          {activeTab === 'healing'  && <AiToolPanel key="healing"  type="healing"  emoji="✍️" label="AI 療癒小語"   placeholder="輸入你現在的心情..." />}

          {/* 新增 6 個工具 */}
          {activeTab === 'password' && <PasswordGenerator />}
          {activeTab === 'date'     && <DateCalculator />}
          {activeTab === 'currency' && <CurrencyConverter />}
          {activeTab === 'color'    && <ColorConverter />}
          {activeTab === 'decide'   && <RandomDecider />}
          {activeTab === 'bmi'      && <BmiCalculator />}
        </div>

        <div style={{ marginTop:'2rem', background:'linear-gradient(135deg,rgba(245,158,11,0.15),rgba(236,72,153,0.15))', border:'1px solid rgba(245,158,11,0.3)', borderRadius:'16px', padding:'1.2rem', textAlign:'center' }}>
          <p style={{ color:'#fcd34d', fontWeight:700, margin:'0 0 0.3rem' }}>✨ 工具用完了，去逛逛其他地方？</p>
          <a href={randomPage.href} target={randomPage.href.startsWith('http') ? '_blank' : '_self'} rel="noopener noreferrer"
            style={{ display:'inline-block', background:'linear-gradient(135deg,#f59e0b,#ec4899)', color:'#fff', padding:'0.5rem 1.5rem', borderRadius:'30px', textDecoration:'none', fontWeight:700, marginTop:'0.5rem', fontSize:'0.9rem' }}>
            前往 {randomPage.label} →
          </a>
        </div>

        <div style={{ textAlign:'center', marginTop:'2rem', paddingBottom:'1rem' }}>
          <a href="/privacy" style={{ color:'#4b5563', fontSize:'0.75rem', textDecoration:'none' }}>隱私權政策</a>
        </div>
      </div>
    </div>
  );
}