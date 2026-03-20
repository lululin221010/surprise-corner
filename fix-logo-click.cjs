const fs = require("fs");
let c = fs.readFileSync("src/components/Navbar.tsx", "utf8");
c = c.replace(
  "        className=\"site-logo\"\r\n        style={{",
  "        className=\"site-logo\"\r\n        onClick={handleLogoClick}\r\n        style={{"
);
fs.writeFileSync("src/components/Navbar.tsx", c, "utf8");
console.log(c.includes("onClick={handleLogoClick}"));
