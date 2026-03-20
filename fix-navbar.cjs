const fs = require("fs");
let c = fs.readFileSync("src/components/Navbar.tsx", "utf8");

// 1. 新增 useState, useEffect
c = c.replace(
  "import { usePathname } from 'next/navigation';",
  "import { usePathname } from 'next/navigation';\nimport { useState, useEffect } from 'react';"
);

// 2. 在 const isHome 後面加 state
c = c.replace(
  "  const isHome = pathname === '/';",
  `  const isHome = pathname === '/';
  const [clickCount, setClickCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    fetch('/api/admin/comments?approved=false')
      .then(r => r.json())
      .then(data => setPendingCount((data.comments || []).length))
      .catch(() => {});
  }, [pathname]);

  function handleLogoClick() {
    setClickCount(n => {
      const next = n + 1;
      if (next >= 5) {
        window.location.href = '/admin/comments';
        return 0;
      }
      return next;
    });
  }`
);

// 3. 在隱私權連結後面加小紅點
c = c.replace(
  "      >\n        🔐 隱私權\n      </Link>",
  `      >
        🔐 隱私權
      </Link>
      {pendingCount > 0 && (
        <div
          onClick={() => window.location.href = '/admin/comments'}
          style={{ width: 8, height: 8, borderRadius: '50%', background: '#ef4444', cursor: 'pointer', flexShrink: 0, boxShadow: '0 0 6px rgba(239,68,68,0.8)' }}
          title=""
        />
      )}`
);

fs.writeFileSync("src/components/Navbar.tsx", c, "utf8");
console.log(c.includes("pendingCount"));
