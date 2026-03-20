const fs = require("fs");
let c = fs.readFileSync("src/components/CommentSection.tsx", "utf8");
c = c.replace(
  "  reply?: string;\n}",
  "  reply?: string;\n}"
);
c = c.replace(
  "c.content}\r\n              </p>\r\n            </div>\r\n          ))}",
  "c.content}\r\n              </p>\r\n              {c.reply && (\r\n                <div style={{ marginTop: '0.75rem', background: 'rgba(232,200,128,0.07)', borderRadius: 8, padding: '0.6rem 0.9rem', borderLeft: '2px solid rgba(232,200,128,0.5)' }}>\r\n                  <span style={{ color: '#b49050', fontSize: '0.78rem', fontWeight: 600 }}>✍️ 站長：</span>\r\n                  <p style={{ color: '#d8ccb8', fontSize: '0.85rem', margin: '0.3rem 0 0', whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>{c.reply}</p>\r\n                </div>\r\n              )}\r\n            </div>\r\n          ))}"
);
const addReply = c.includes("interface Comment") ? c.replace(
  "  createdAt: string;\n}",
  "  createdAt: string;\n  reply?: string;\n}"
) : c;
fs.writeFileSync("src/components/CommentSection.tsx", addReply, "utf8");
console.log(addReply.includes("✍️ 站長"));
