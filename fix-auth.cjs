const fs = require("fs");
let c = fs.readFileSync("src/app/admin/comments/page.tsx", "utf8");

// 1. 新增密碼 state
c = c.replace(
  "  const [replying, setReplying] = useState(false);",
  `  const [replying, setReplying] = useState(false);
  const [authed, setAuthed] = useState(false);
  const [pwInput, setPwInput] = useState('');
  const [pwError, setPwError] = useState(false);

  function handleLogin() {
    if (pwInput === 'admin080511') { setAuthed(true); setPwError(false); }
    else { setPwError(true); setPwInput(''); }
  }`
);

// 2. 在 return 前面加密碼牆
c = c.replace(
  "  return (\n    <div style={{ minHeight: '100vh', background: '#0c0b08'",
  `  if (!authed) {
    return (
      <div style={{ minHeight: '100vh', background: '#0c0b08', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 16, padding: '2rem', width: '100%', maxWidth: 340, border: '1px solid rgba(232,200,128,0.2)', textAlign: 'center' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🔐</div>
          <h2 style={{ color: '#e8c880', margin: '0 0 1.5rem', fontSize: '1.1rem' }}>後台入口</h2>
          <input
            type="password"
            value={pwInput}
            onChange={e => { setPwInput(e.target.value); setPwError(false); }}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
            placeholder="密碼..."
            style={{ width: '100%', padding: '0.6rem 1rem', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 8, color: '#eee', fontSize: '0.9rem', outline: 'none', textAlign: 'center', letterSpacing: '0.2em', boxSizing: 'border-box', marginBottom: '0.75rem' }}
          />
          {pwError && <p style={{ color: '#fca5a5', fontSize: '0.82rem', margin: '0 0 0.75rem' }}>密碼錯誤</p>}
          <button onClick={handleLogin} style={{ width: '100%', padding: '0.7rem', background: 'linear-gradient(135deg, #b49050, #e8c880)', color: '#1a1208', border: 'none', borderRadius: 8, fontSize: '0.95rem', fontWeight: 700, cursor: 'pointer' }}>
            進入
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0c0b08'`
);

fs.writeFileSync("src/app/admin/comments/page.tsx", c, "utf8");
console.log(c.includes("handleLogin"));
