const fs = require("fs");
let c = fs.readFileSync("src/components/Navbar.tsx", "utf8");
c = c.replace(
  "        🔐 隱私權\r\n      </Link>\r\n      ",
  "        🔐 隱私權\r\n      </Link>\r\n      {pendingCount > 0 && (\r\n        <div\r\n          onClick={() => setActionMsg('此路不通 🚫')}\r\n          style={{ width: 8, height: 8, borderRadius: '50%', background: '#ef4444', cursor: 'pointer', flexShrink: 0, boxShadow: '0 0 6px rgba(239,68,68,0.8)' }}\r\n          title=\"\"\r\n        />\r\n      )}\r\n      "
);
fs.writeFileSync("src/components/Navbar.tsx", c, "utf8");
console.log(c.includes("ef4444"));
