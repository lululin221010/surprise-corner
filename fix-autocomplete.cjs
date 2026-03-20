const fs = require("fs");
let c = fs.readFileSync("src/app/admin/comments/page.tsx", "utf8");
c = c.replace(
  'type="password"',
  'type="password"\n            autoComplete="new-password"'
);
fs.writeFileSync("src/app/admin/comments/page.tsx", c, "utf8");
console.log(c.includes("new-password"));
