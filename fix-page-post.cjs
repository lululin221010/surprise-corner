const fs = require("fs");
let c = fs.readFileSync("src/app/admin/comments/page.tsx", "utf8");

// 1. 新增 state
c = c.replace(
  "  const [replying, setReplying] = useState(false);",
  `  const [replying, setReplying] = useState(false);

  // 站長發文
  const [showPostForm, setShowPostForm] = useState(false);
  const [postForm, setPostForm] = useState({ chapterId: '', novelId: '', nickname: '站長', content: '' });
  const [posting, setPosting] = useState(false);

  async function submitPost() {
    if (!postForm.chapterId.trim() || !postForm.content.trim()) {
      setActionMsg('⚠️ 請填寫章節ID和內容');
      setTimeout(() => setActionMsg(''), 2000);
      return;
    }
    setPosting(true);
    const res = await fetch('/api/admin/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(postForm),
    });
    const data = await res.json();
    setPosting(false);
    if (data.success) {
      setActionMsg('✅ 站長留言已發出');
      setPostForm({ chapterId: '', novelId: '', nickname: '站長', content: '' });
      setShowPostForm(false);
      setTimeout(() => setActionMsg(''), 2500);
      fetchComments(filter);
    } else {
      setActionMsg('⚠️ 發文失敗');
      setTimeout(() => setActionMsg(''), 2000);
    }
  }`
);

// 2. 在篩選按鈕上方加入發文區塊
c = c.replace(
  `        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>`,
  `        {/* 站長發文區塊 */}
        <div style={{ marginBottom: '1.5rem', border: '1px solid rgba(232,200,128,0.2)', borderRadius: 10, overflow: 'hidden' }}>
          <button onClick={() => setShowPostForm(v => !v)} style={{ width: '100%', padding: '0.7rem 1rem', background: 'rgba(232,200,128,0.06)', border: 'none', color: '#e8c880', fontSize: '0.85rem', cursor: 'pointer', textAlign: 'left' }}>
            ✍️ 站長發文 {showPostForm ? '▲' : '▼'}
          </button>
          {showPostForm && (
            <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <div style={{ flex: '1 1 160px' }}>
                  <label style={{ color: '#aaa', fontSize: '0.78rem', display: 'block', marginBottom: 4 }}>章節ID（如 lulu-s-01-02）</label>
                  <input value={postForm.chapterId} onChange={e => setPostForm(f => ({ ...f, chapterId: e.target.value }))} placeholder="lulu-s-01-02" style={{ width: '100%', padding: '0.45rem 0.75rem', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 6, color: '#eee', fontSize: '0.85rem', outline: 'none', boxSizing: 'border-box' }} />
                </div>
                <div style={{ flex: '1 1 120px' }}>
                  <label style={{ color: '#aaa', fontSize: '0.78rem', display: 'block', marginBottom: 4 }}>小說ID（如 lulu-life）</label>
                  <input value={postForm.novelId} onChange={e => setPostForm(f => ({ ...f, novelId: e.target.value }))} placeholder="lulu-life" style={{ width: '100%', padding: '0.45rem 0.75rem', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 6, color: '#eee', fontSize: '0.85rem', outline: 'none', boxSizing: 'border-box' }} />
                </div>
                <div style={{ flex: '1 1 100px' }}>
                  <label style={{ color: '#aaa', fontSize: '0.78rem', display: 'block', marginBottom: 4 }}>暱稱</label>
                  <input value={postForm.nickname} onChange={e => setPostForm(f => ({ ...f, nickname: e.target.value }))} style={{ width: '100%', padding: '0.45rem 0.75rem', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 6, color: '#eee', fontSize: '0.85rem', outline: 'none', boxSizing: 'border-box' }} />
                </div>
              </div>
              <textarea value={postForm.content} onChange={e => setPostForm(f => ({ ...f, content: e.target.value }))} placeholder="留言內容..." rows={3} style={{ width: '100%', padding: '0.6rem 0.75rem', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 6, color: '#eee', fontSize: '0.85rem', outline: 'none', resize: 'vertical', fontFamily: 'inherit', boxSizing: 'border-box' }} />
              <button onClick={submitPost} disabled={posting} style={{ alignSelf: 'flex-start', padding: '6px 20px', background: posting ? '#444' : 'linear-gradient(135deg, #b49050, #e8c880)', color: '#1a1208', border: 'none', borderRadius: 8, fontSize: '0.85rem', fontWeight: 600, cursor: posting ? 'not-allowed' : 'pointer' }}>
                {posting ? '發出中...' : '📢 發出留言'}
              </button>
            </div>
          )}
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>`
);

fs.writeFileSync("src/app/admin/comments/page.tsx", c, "utf8");
console.log(c.includes("站長發文"));
