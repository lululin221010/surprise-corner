const fs = require("fs");
let c = fs.readFileSync("src/components/CommentSection.tsx", "utf8");

// 把 fetch 改成用 novelId 而不是 chapterId
c = c.replace(
  "fetch(`/api/comments?chapterId=${encodeURIComponent(chapterId)}`)",
  "fetch(`/api/comments?chapterId=${encodeURIComponent(novelId)}`)"
);

// 把 POST body 的 chapterId 也改成 novelId
c = c.replace(
  "body: JSON.stringify({ chapterId, novelId, nickname, petName, content }),",
  "body: JSON.stringify({ chapterId: novelId, novelId, nickname, petName, content }),"
);

// 把留言區順序對調：表單在上，留言在下
c = c.replace(
  `      <h3 style={{ color: '#e8c880', fontSize: '1.1rem', marginBottom: '1.5rem', letterSpacing: '0.05em' }}>
        🐾 讀者留言
      </h3>

      {/* 已有留言 */}
      {loading ? (`,
  `      <h3 style={{ color: '#e8c880', fontSize: '1.1rem', marginBottom: '1.5rem', letterSpacing: '0.05em' }}>
        🐾 讀者留言
      </h3>

      {/* 留言表單先顯示 */}
      {submitted ? (
        <div style={{
          background: 'rgba(232,200,128,0.1)',
          borderRadius: 10,
          padding: '1rem 1.2rem',
          border: '1px solid rgba(232,200,128,0.3)',
          color: '#e8c880',
          fontSize: '0.9rem',
          marginBottom: '2rem',
        }}>
          ✅ 留言已送出，待審核後公開顯示！感謝你的分享 🐱
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <div style={{ flex: '1 1 140px' }}>
              <label style={{ color: '#aaa', fontSize: '0.8rem', display: 'block', marginBottom: 4 }}>
                暱稱 <span style={{ color: '#e87070' }}>*</span>
              </label>
              <input type="text" value={nickname} onChange={(e) => setNickname(e.target.value)} placeholder="你的暱稱" maxLength={20} style={{ width: '100%', padding: '0.5rem 0.75rem', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 8, color: '#eee', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }} />
            </div>
            <div style={{ flex: '1 1 140px' }}>
              <label style={{ color: '#aaa', fontSize: '0.8rem', display: 'block', marginBottom: 4 }}>
                毛孩名字 <span style={{ color: '#888', fontWeight: 400 }}>（選填）</span>
              </label>
              <input type="text" value={petName} onChange={(e) => setPetName(e.target.value)} placeholder="你家毛孩的名字" maxLength={20} style={{ width: '100%', padding: '0.5rem 0.75rem', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 8, color: '#eee', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }} />
            </div>
          </div>
          <div>
            <label style={{ color: '#aaa', fontSize: '0.8rem', display: 'block', marginBottom: 4 }}>
              留言 <span style={{ color: '#e87070' }}>*</span>
              <span style={{ color: '#666', marginLeft: 8 }}>（最多 500 字）</span>
            </label>
            <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="分享你的感受，或介紹你家毛孩的故事 🐾" maxLength={500} rows={4} style={{ width: '100%', padding: '0.6rem 0.75rem', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 8, color: '#eee', fontSize: '0.9rem', outline: 'none', resize: 'vertical', lineHeight: 1.6, fontFamily: 'inherit', boxSizing: 'border-box' }} />
            <div style={{ textAlign: 'right', color: '#555', fontSize: '0.75rem', marginTop: 2 }}>{content.length} / 500</div>
          </div>
          {error && <p style={{ color: '#e87070', fontSize: '0.85rem', margin: 0 }}>⚠️ {error}</p>}
          <button type="submit" disabled={submitting} style={{ alignSelf: 'flex-start', padding: '0.55rem 1.4rem', background: submitting ? '#555' : 'linear-gradient(135deg, #b49050, #e8c880)', color: '#1a1208', border: 'none', borderRadius: 8, fontSize: '0.9rem', fontWeight: 600, cursor: submitting ? 'not-allowed' : 'pointer', transition: 'opacity 0.2s' }}>
            {submitting ? '送出中…' : '🐱 送出留言'}
          </button>
          <p style={{ color: '#555', fontSize: '0.75rem', margin: 0 }}>留言將於審核後公開顯示，不需帳號登入。</p>
        </form>
      )}

      {/* 已有留言顯示在下方 */}
      {loading ? (`
);

// 移除原本的表單區塊（已移到上方）
c = c.replace(
  `      {/* 留言表單 */}
      {submitted ? (
        <div style={{
          background: 'rgba(232,200,128,0.1)',
          borderRadius: 10,
          padding: '1rem 1.2rem',
          border: '1px solid rgba(232,200,128,0.3)',
          color: '#e8c880',
          fontSize: '0.9rem',
        }}>
          ✅ 留言已送出，待審核後公開顯示！感謝你的分享 🐱
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <div style={{ flex: '1 1 140px' }}>
              <label style={{ color: '#aaa', fontSize: '0.8rem', display: 'block', marginBottom: 4 }}>
                暱稱 <span style={{ color: '#e87070' }}>*</span>
              </label>
              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="你的暱稱"
                maxLength={20}
                style={{
                  width: '100%', padding: '0.5rem 0.75rem',
                  background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: 8, color: '#eee', fontSize: '0.9rem', outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
            </div>
            <div style={{ flex: '1 1 140px' }}>
              <label style={{ color: '#aaa', fontSize: '0.8rem', display: 'block', marginBottom: 4 }}>
                毛孩名字 <span style={{ color: '#888', fontWeight: 400 }}>（選填）</span>
              </label>
              <input
                type="text"
                value={petName}
                onChange={(e) => setPetName(e.target.value)}
                placeholder="你家毛孩的名字"
                maxLength={20}
                style={{
                  width: '100%', padding: '0.5rem 0.75rem',
                  background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: 8, color: '#eee', fontSize: '0.9rem', outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
            </div>
          </div>

          <div>
            <label style={{ color: '#aaa', fontSize: '0.8rem', display: 'block', marginBottom: 4 }}>
              留言 <span style={{ color: '#e87070' }}>*</span>
              <span style={{ color: '#666', marginLeft: 8 }}>（最多 500 字）</span>
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="分享你的感受，或介紹你家毛孩的故事 🐾"
              maxLength={500}
              rows={4}
              style={{
                width: '100%', padding: '0.6rem 0.75rem',
                background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: 8, color: '#eee', fontSize: '0.9rem', outline: 'none',
                resize: 'vertical', lineHeight: 1.6, fontFamily: 'inherit',
                boxSizing: 'border-box',
              }}
            />
            <div style={{ textAlign: 'right', color: '#555', fontSize: '0.75rem', marginTop: 2 }}>
              {content.length} / 500
            </div>
          </div>

          {error && (
            <p style={{ color: '#e87070', fontSize: '0.85rem', margin: 0 }}>⚠️ {error}</p>
          )}

          <button
            type="submit"
            disabled={submitting}
            style={{
              alignSelf: 'flex-start',
              padding: '0.55rem 1.4rem',
              background: submitting ? '#555' : 'linear-gradient(135deg, #b49050, #e8c880)',
              color: '#1a1208',
              border: 'none',
              borderRadius: 8,
              fontSize: '0.9rem',
              fontWeight: 600,
              cursor: submitting ? 'not-allowed' : 'pointer',
              transition: 'opacity 0.2s',
            }}
          >
            {submitting ? '送出中…' : '🐱 送出留言'}
          </button>

          <p style={{ color: '#555', fontSize: '0.75rem', margin: 0 }}>
            留言將於審核後公開顯示，不需帳號登入。
          </p>
        </form>
      )}`,
  ""
);

fs.writeFileSync("src/components/CommentSection.tsx", c, "utf8");
console.log(c.includes("留言表單先顯示"));
