const fs = require("fs");
let c = fs.readFileSync("src/app/admin/comments/page.tsx", "utf8");
c = c.replace(
  `  function handleLogin() {\n    if (pwInput === 'admin080511') { setAuthed(true); setPwError(false); }\n    else { setPwError(true); setPwInput(''); }\n  }`,
  `  async function handleLogin() {\n    const res = await fetch('/api/admin/auth', {\n      method: 'POST',\n      headers: { 'Content-Type': 'application/json' },\n      body: JSON.stringify({ password: pwInput }),\n    });\n    const data = await res.json();\n    if (data.success) { setAuthed(true); setPwError(false); }\n    else { setPwError(true); setPwInput(''); }\n  }`
);
fs.writeFileSync("src/app/admin/comments/page.tsx", c, "utf8");
console.log(c.includes("api/admin/auth"));
