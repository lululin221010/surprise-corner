const fs = require("fs");
let c = fs.readFileSync("src/components/Navbar.tsx", "utf8");

c = c.replace(
  `          style={{ width: 8, height: 8, borderRadius: '50%', background: '#ef4444', flexShrink: 0, boxShadow: '0 0 6px rgba(239,68,68,0.8)' }}`,
  `          onClick={() => setActionMsg('此路不通 🚫')}
          style={{ width: 8, height: 8, borderRadius: '50%', background: '#ef4444', cursor: 'pointer', flexShrink: 0, boxShadow: '0 0 6px rgba(239,68,68,0.8)' }}`
);

// 新增 actionMsg state
c = c.replace(
  "  const [clickCount, setClickCount] = useState(0);",
  `  const [clickCount, setClickCount] = useState(0);
  const [actionMsg, setActionMsg] = useState('');`
);

// 在 nav 裡加提示文字
c = c.replace(
  "    </nav>",
  `      {actionMsg && (
        <div style={{ position: 'fixed', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', background: 'rgba(30,20,10,0.95)', border: '1px solid rgba(232,200,128,0.3)', borderRadius: 10, padding: '0.5rem 1.2rem', color: '#e8c880', fontSize: '0.85rem', zIndex: 9999 }}
          onClick={() => setActionMsg('')}>
          {actionMsg}
        </div>
      )}
    </nav>`
);

fs.writeFileSync("src/components/Navbar.tsx", c, "utf8");
console.log(c.includes("此路不通"));
