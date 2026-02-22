// 📁 路徑：src/app/tools/page.tsx
'use client';

import { useState, useEffect, useRef } from 'react';

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

function getCreatorId() {
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

// ✅ AiToolPanel 移到外面，不在 ToolsPage 裡面
interface AiPanelProps {
  type: string;
  placeholder: string;
  label: string;
  emoji: string;
  signs?: string[];
}

function AiToolPanel({ type, placeholder, label, emoji, signs }: AiPanelProps) {
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

export default function ToolsPage() {
  const [activeTab, setActiveTab] = useState<'wordcount'|'quote'|'todo'|'timer'|'love'|'birthday'|'fortune'|'healing'>('wordcount');
  const [text, setText] = useState('');
  const [quote, setQuote] = useState(QUOTES[0]);
  const [todos, setTodos] = useState<{text:string;done:boolean}[]>([]);
  const [todoInput, setTodoInput] = useState('');
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerInput, setTimerInput] = useState('25');
  const [timerRunning, setTimerRunning] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval>|null>(null);

  useEffect(() => {
    if (timerRunning && timerSeconds > 0) {
      timerRef.current = setInterval(() => setTimerSeconds(s => s - 1), 1000);
    } else if (timerSeconds === 0 && timerRunning) {
      setTimerRunning(false); alert('⏰ 時間到！');
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [timerRunning, timerSeconds]);

  const wordCount = text.replace(/\s/g, '').length;
  const lineCount = text ? text.split('\n').length : 0;

  const tabs = [
    { key: 'wordcount', label: '📝 字數計算' },
    { key: 'quote',     label: '✨ 名言產生' },
    { key: 'todo',      label: '📋 待辦清單' },
    { key: 'timer',     label: '⏱ 倒數計時' },
    { key: 'love',      label: '💌 AI告白' },
    { key: 'birthday',  label: '🎂 AI生日祝福' },
    { key: 'fortune',   label: '🔮 今日運勢' },
    { key: 'healing',   label: '✍️ AI療癒小語' },
  ] as const;

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg,#0f0c29,#302b63,#24243e)', padding: '2rem 1rem' }}>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ color: '#fff', fontSize: '2rem', fontWeight: 800, margin: 0 }}>🛠 實用工具箱</h1>
          <p style={{ color: '#a78bfa', marginTop: '0.5rem' }}>寫作、靈感、計劃、專注，一站搞定</p>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '1.5rem' }}>
          {tabs.map(tab => (
            <button key={tab.key} style={btnStyle(activeTab === tab.key)} onClick={() => setActiveTab(tab.key as any)}>
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'wordcount' && (
          <div style={cardStyle}>
            <h2 style={{ color: '#e9d5ff', margin: '0 0 1rem' }}>📝 字數計算器</h2>
            <textarea value={text} onChange={e => setText(e.target.value)}
              placeholder="在這裡貼上或輸入你的文字..."
              style={{ width: '100%', height: '200px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(167,139,250,0.3)', borderRadius: '10px', color: '#fff', padding: '0.8rem', fontSize: '0.95rem', resize: 'vertical', boxSizing: 'border-box', outline: 'none' }}
            />
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap' }}>
              {[{label:'字數（不含空白）',value:wordCount},{label:'總字元數',value:text.length},{label:'行數',value:lineCount}].map(stat => (
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
            <h2 style={{ color: '#e9d5ff', margin: '0 0 1rem' }}>📋 今日待辦</h2>
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
                <div style={{ color:'#9ca3af', fontSize:'0.8rem', textAlign:'right', marginTop:'0.3rem' }}>完成 {todos.filter(t=>t.done).length} / {todos.length}</div>
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

        <div style={{ marginTop:'2rem', background:'linear-gradient(135deg,rgba(245,158,11,0.15),rgba(236,72,153,0.15))', border:'1px solid rgba(245,158,11,0.3)', borderRadius:'16px', padding:'1.2rem', textAlign:'center' }}>
          <p style={{ color:'#fcd34d', fontWeight:700, margin:'0 0 0.3rem' }}>✨ 工具用完了，去找今日驚喜？</p>
          <a href="https://still-time-corner.vercel.app/" target="_blank" rel="noopener noreferrer"
            style={{ display:'inline-block', background:'linear-gradient(135deg,#f59e0b,#ec4899)', color:'#fff', padding:'0.5rem 1.5rem', borderRadius:'30px', textDecoration:'none', fontWeight:700, marginTop:'0.5rem', fontSize:'0.9rem' }}>
            前往 Still Time Corner →
          </a>
        </div>
      </div>
    </div>
  );
}