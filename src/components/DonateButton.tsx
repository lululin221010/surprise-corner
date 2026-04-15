'use client';

import { useState } from 'react';

// 銀行帳號公開顯示（個人賣家標準做法，捐款不需要身份驗證）
const BANK = {
  name: '中國信託商業銀行',
  code: '822',
  account: '299540702145',
  holder: '王珍珍',
};

export default function DonateButton() {
  const [step, setStep] = useState<'closed' | 'info' | 'thanks'>('closed');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(BANK.account).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const overlayStyle: React.CSSProperties = {
    position: 'fixed', inset: 0, zIndex: 9999,
    background: 'rgba(0,0,0,0.7)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    padding: '1rem',
    backdropFilter: 'blur(4px)',
  };

  const modalStyle: React.CSSProperties = {
    background: 'linear-gradient(160deg, #1e1433 0%, #0f0a1a 100%)',
    border: '1px solid rgba(167,139,250,0.25)',
    borderRadius: '20px',
    padding: '2rem 1.8rem',
    maxWidth: '380px',
    width: '100%',
    textAlign: 'center',
    boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
    position: 'relative',
  };

  return (
    <>
      {/* 觸發按鈕 */}
      <button
        onClick={() => setStep('info')}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
          background: 'linear-gradient(135deg, #FF5E5B, #ff8c42)',
          color: '#fff', border: 'none', cursor: 'pointer',
          padding: '0.6rem 1.6rem', borderRadius: '30px',
          fontSize: '0.9rem', fontWeight: 700,
          boxShadow: '0 4px 15px rgba(255,94,91,0.35)',
        }}
      >
        🥫 請魯魯吃罐罐
      </button>

      {/* Modal */}
      {step !== 'closed' && (
        <div style={overlayStyle} onClick={() => setStep('closed')}>
          <div style={modalStyle} onClick={e => e.stopPropagation()}>

            {/* 關閉鈕 */}
            <button
              onClick={() => setStep('closed')}
              style={{
                position: 'absolute', top: '1rem', right: '1rem',
                background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)',
                fontSize: '1.2rem', cursor: 'pointer', lineHeight: 1,
              }}
            >✕</button>

            {step === 'info' && (
              <>
                {/* Step 1：顯示帳號 */}
                <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🥫</div>
                <h3 style={{ color: '#fcd34d', fontWeight: 800, fontSize: '1.15rem', margin: '0 0 0.3rem' }}>
                  謝謝你想請魯魯吃罐罐！
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.82rem', margin: '0 0 1.4rem', lineHeight: 1.6 }}>
                  直接轉帳就好，不需要加 LINE、不需要私訊。<br />
                  一罐 NT$50 起，數量不限 🐱
                </p>

                {/* 帳號卡片 */}
                <div style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(167,139,250,0.2)',
                  borderRadius: '12px',
                  padding: '1.2rem 1rem',
                  marginBottom: '1rem',
                  textAlign: 'left',
                }}>
                  <Row label="銀行" value={`${BANK.name}（${BANK.code}）`} />
                  <Row label="戶名" value={BANK.holder} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.6rem' }}>
                    <div>
                      <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.72rem', marginBottom: '2px' }}>帳號</div>
                      <div style={{ color: '#e9d5ff', fontFamily: 'monospace', fontSize: '1.15rem', fontWeight: 700, letterSpacing: '2px' }}>
                        {BANK.account}
                      </div>
                    </div>
                    <button
                      onClick={handleCopy}
                      style={{
                        background: copied ? 'rgba(34,197,94,0.2)' : 'rgba(167,139,250,0.15)',
                        border: `1px solid ${copied ? 'rgba(34,197,94,0.4)' : 'rgba(167,139,250,0.3)'}`,
                        color: copied ? '#86efac' : '#c4b5fd',
                        borderRadius: '8px', padding: '0.35rem 0.75rem',
                        fontSize: '0.78rem', cursor: 'pointer', fontWeight: 600,
                        transition: 'all 0.2s',
                      }}
                    >
                      {copied ? '✓ 已複製' : '複製'}
                    </button>
                  </div>
                </div>

                {/* 金額建議 */}
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', margin: '0 0 1.2rem' }}>
                  建議金額：NT$50・NT$100・NT$200・隨心
                </p>

                {/* Step 2 按鈕 */}
                <button
                  onClick={() => setStep('thanks')}
                  style={{
                    width: '100%',
                    background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
                    color: '#fff', border: 'none', cursor: 'pointer',
                    padding: '0.75rem', borderRadius: '12px',
                    fontSize: '0.95rem', fontWeight: 700,
                    boxShadow: '0 4px 16px rgba(124,58,237,0.4)',
                  }}
                >
                  我轉好了！🐾
                </button>
              </>
            )}

            {step === 'thanks' && (
              <>
                {/* Step 2：感謝 */}
                <div style={{ fontSize: '4rem', marginBottom: '0.5rem' }}>🐈</div>
                <h3 style={{ color: '#fcd34d', fontWeight: 800, fontSize: '1.2rem', margin: '0 0 0.6rem' }}>
                  魯魯感謝你！！
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.88rem', lineHeight: 1.8, margin: '0 0 0.5rem' }}>
                  你的罐罐已收到<br />
                  魯魯會繼續霸佔鍵盤、貢獻靈感
                </p>
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.78rem', margin: '0 0 1.5rem' }}>
                  如需收據或聯絡，請 LINE ：
                  <a href="https://line.me/R/ti/p/@983agawb" target="_blank" rel="noopener noreferrer"
                    style={{ color: '#06c755', textDecoration: 'underline' }}>
                    @983agawb
                  </a>
                </p>
                <button
                  onClick={() => setStep('closed')}
                  style={{
                    background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.6)',
                    border: '1px solid rgba(255,255,255,0.12)', borderRadius: '10px',
                    padding: '0.6rem 1.5rem', cursor: 'pointer', fontSize: '0.85rem',
                  }}
                >
                  關閉
                </button>
              </>
            )}

          </div>
        </div>
      )}
    </>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.83rem' }}>
      <span style={{ color: 'rgba(255,255,255,0.45)' }}>{label}</span>
      <span style={{ color: '#e9d5ff', fontWeight: 500 }}>{value}</span>
    </div>
  );
}
