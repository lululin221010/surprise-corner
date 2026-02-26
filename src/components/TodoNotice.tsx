'use client';
// 📁 路徑：src/components/TodoNotice.tsx

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function TodoNotice() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem('sc_todo_notice_seen');
    if (!seen) setShow(true);
  }, []);

  // 了解了 → 永久不再顯示
  const handleConfirm = () => {
    localStorage.setItem('sc_todo_notice_seen', '1');
    setShow(false);
  };

  // 下次再說 → 只關閉，下次進來還會出現
  const handleLater = () => {
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed', inset: 0, zIndex: 50,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '1rem',
            background: 'rgba(10,8,30,0.75)', backdropFilter: 'blur(8px)',
          }}
        >
          <motion.div
            initial={{ scale: 0.85, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            style={{
              background: 'linear-gradient(145deg, #1e1b3a, #2d2257)',
              border: '1px solid rgba(196,181,253,0.25)',
              borderRadius: '24px',
              padding: '2.2rem 2rem',
              maxWidth: '420px',
              width: '100%',
              boxShadow: '0 0 60px rgba(124,58,237,0.25), 0 20px 40px rgba(0,0,0,0.5)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div style={{ position:'absolute', top:'-40px', right:'-40px', width:'160px', height:'160px', borderRadius:'50%', background:'radial-gradient(circle, rgba(236,72,153,0.15), transparent 70%)', pointerEvents:'none' }} />
            <div style={{ position:'absolute', bottom:'-30px', left:'-30px', width:'120px', height:'120px', borderRadius:'50%', background:'radial-gradient(circle, rgba(124,58,237,0.2), transparent 70%)', pointerEvents:'none' }} />

            <div style={{ textAlign:'center', marginBottom:'1.5rem' }}>
              <div style={{ fontSize:'2.8rem', marginBottom:'0.6rem' }}>📋</div>
              <h2 style={{ color:'#f3e8ff', fontWeight:800, fontSize:'1.3rem', margin:0 }}>
                使用待辦清單前，請先看這裡 ✨
              </h2>
            </div>

            <div style={{ background:'rgba(255,255,255,0.05)', borderRadius:'14px', padding:'1.2rem 1.4rem', marginBottom:'1.2rem', border:'1px solid rgba(196,181,253,0.1)' }}>
              <p style={{ color:'#a78bfa', fontWeight:700, fontSize:'0.75rem', letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:'0.8rem', marginTop:0 }}>⚠️ 注意事項</p>
              {[
                { icon:'💾', text:'資料僅存在你的瀏覽器，清除快取或換裝置就會消失' },
                { icon:'🔒', text:'清單只有你自己看得到，其他人（包含我們）無法存取' },
                { icon:'📵', text:'請勿儲存重要密碼、帳號或個人敏感資料' },
                { icon:'🔄', text:'本網站不對資料遺失負責，重要事項請自行備份' },
              ].map((item, i, arr) => (
                <div key={i} style={{ display:'flex', gap:'0.6rem', alignItems:'flex-start', marginBottom: i < arr.length-1 ? '0.6rem' : 0 }}>
                  <span style={{ fontSize:'1rem', flexShrink:0, marginTop:'1px' }}>{item.icon}</span>
                  <p style={{ color:'#c4b5fd', fontSize:'0.83rem', lineHeight:1.6, margin:0 }}>{item.text}</p>
                </div>
              ))}
            </div>

            <div style={{ background:'linear-gradient(135deg,rgba(124,58,237,0.2),rgba(236,72,153,0.15))', borderRadius:'14px', padding:'1rem 1.4rem', marginBottom:'1.6rem', border:'1px solid rgba(236,72,153,0.2)', textAlign:'center' }}>
              <p style={{ color:'#f9a8d4', fontSize:'0.9rem', fontWeight:700, margin:'0 0 0.3rem' }}>🎁 每天都有新驚喜等你！</p>
              <p style={{ color:'#9ca3af', fontSize:'0.8rem', margin:0, lineHeight:1.6 }}>
                每日更新驚喜、連載小說、AI 快訊<br />記得常回來逛逛，天天不一樣 💜
              </p>
            </div>

            {/* 主要按鈕：永久不再顯示 */}
            <button
              onClick={handleConfirm}
              style={{ width:'100%', background:'linear-gradient(135deg,#7c3aed,#ec4899)', color:'#fff', border:'none', borderRadius:'30px', padding:'0.9rem', fontSize:'1rem', fontWeight:700, cursor:'pointer', boxShadow:'0 4px 20px rgba(124,58,237,0.4)', marginBottom:'0.7rem' }}
            >
              了解了，開始使用 🚀
            </button>

            {/* 次要按鈕：下次再說 */}
            <button
              onClick={handleLater}
              style={{ width:'100%', background:'transparent', color:'#6b7280', border:'1px solid rgba(107,114,128,0.3)', borderRadius:'30px', padding:'0.6rem', fontSize:'0.88rem', fontWeight:500, cursor:'pointer' }}
            >
              下次再說
            </button>

            <p style={{ textAlign:'center', color:'#4b5563', fontSize:'0.72rem', marginTop:'0.8rem', marginBottom:0 }}>
              「了解了」後此提示不再顯示・<a href="/privacy" style={{ color:'#6b7280', textDecoration:'none' }}>隱私權政策</a>
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}