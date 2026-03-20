const fs = require("fs");
let c = fs.readFileSync("src/components/Navbar.tsx", "utf8");
c = c.replace(
  "onClick={() => setActionMsg('此路不通 🚫')}",
  "onClick={() => { setActionMsg('此路不通 🚫'); setTimeout(() => setActionMsg(''), 2000); }}"
);
fs.writeFileSync("src/components/Navbar.tsx", c, "utf8");
console.log(c.includes("setTimeout"));
