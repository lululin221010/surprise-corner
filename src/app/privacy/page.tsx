// 📁 路徑：src/app/privacy/page.tsx

import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '隱私權政策',
  description: 'Surprise Corner 隱私權政策',
};

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section style={{ marginBottom: '2.2rem' }}>
    <h2 style={{ color: '#e9d5ff', fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.8rem', paddingBottom: '0.5rem', borderBottom: '1px solid rgba(167,139,250,0.2)' }}>
      {title}
    </h2>
    {children}
  </section>
);

const P = ({ children }: { children: React.ReactNode }) => (
  <p style={{ color: '#c4b5fd', fontSize: '0.9rem', lineHeight: 1.9, margin: '0 0 0.7rem' }}>{children}</p>
);

const Item = ({ children }: { children: React.ReactNode }) => (
  <li style={{ color: '#c4b5fd', fontSize: '0.9rem', lineHeight: 1.9, marginBottom: '0.4rem' }}>{children}</li>
);

export default function PrivacyPage() {
  const updated = '2026 年 2 月 26 日';

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg,#0f0c29,#302b63,#24243e)', padding: '2rem 1rem 4rem' }}>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>

        {/* 返回 */}
        <Link href="/" style={{ display:'inline-flex', alignItems:'center', gap:'0.4rem', color:'#a78bfa', fontSize:'0.85rem', textDecoration:'none', marginBottom:'2rem' }}>
          ← 回首頁
        </Link>

        {/* 標題 */}
        <div style={{ textAlign:'center', marginBottom:'2.5rem' }}>
          <div style={{ fontSize:'3rem', marginBottom:'0.6rem' }}>🔐</div>
          <h1 style={{ color:'#fff', fontSize:'2rem', fontWeight:900, margin:'0 0 0.5rem' }}>隱私權政策</h1>
          <p style={{ color:'#6b7280', fontSize:'0.82rem', margin:0 }}>最後更新：{updated}</p>
        </div>

        {/* 內容卡片 */}
        <div style={{ background:'rgba(255,255,255,0.06)', border:'1px solid rgba(167,139,250,0.2)', borderRadius:'20px', padding:'2rem 2rem', backdropFilter:'blur(10px)' }}>

          <Section title="一、關於本網站">
            <P>Surprise Corner（以下簡稱「本站」）由 Surprise Corner 團隊經營，致力於提供每日驚喜、連載小說、AI 工具等免費服務。</P>
            <P>使用本站即表示你同意本隱私權政策。若有疑問，請透過 LINE 官方帳號聯繫我們：<strong style={{ color:'#e9d5ff' }}>@983agawb</strong>（有的沒的小舖）。</P>
          </Section>

          <Section title="二、我們收集哪些資料？">
            <P>本站依功能收集以下資料：</P>
            <ul style={{ paddingLeft:'1.4rem', margin:0 }}>
              <Item><strong style={{ color:'#e9d5ff' }}>留言牆內容</strong>：你主動提交的文字，儲存於 MongoDB 雲端資料庫，公開顯示於作品牆。</Item>
              <Item><strong style={{ color:'#e9d5ff' }}>創作者 ID</strong>：系統自動產生的匿名識別碼，儲存於你的瀏覽器 LocalStorage，用於識別你的留言。</Item>
              <Item><strong style={{ color:'#e9d5ff' }}>待辦清單</strong>：儲存於你的瀏覽器 LocalStorage，完全不會上傳至伺服器，本站無法存取。</Item>
              <Item><strong style={{ color:'#e9d5ff' }}>AI 生成輸入內容</strong>：你輸入的關鍵字或心情文字，僅用於當次 AI 生成，不會被記錄或儲存。</Item>
            </ul>
          </Section>

          <Section title="三、第三方連結">
            <P>本站包含連往 Still Time Corner（<a href="https://still-time-corner.vercel.app/" target="_blank" rel="noopener noreferrer" style={{ color:'#a78bfa' }}>still-time-corner.vercel.app</a>）等外部網站的連結。點擊後適用該網站自身的隱私權政策，本站不負相關責任。</P>
          </Section>

          <Section title="四、瀏覽器儲存（LocalStorage）">
            <P>本站使用瀏覽器 LocalStorage 儲存以下資料：</P>
            <ul style={{ paddingLeft:'1.4rem', margin:'0 0 0.7rem' }}>
              <Item>待辦清單（<code style={{ color:'#f9a8d4', background:'rgba(0,0,0,0.3)', padding:'0 4px', borderRadius:'4px' }}>sc_todos</code>）</Item>
              <Item>使用提示已讀紀錄（<code style={{ color:'#f9a8d4', background:'rgba(0,0,0,0.3)', padding:'0 4px', borderRadius:'4px' }}>sc_todo_notice_seen</code>）</Item>
              <Item>匿名創作者 ID（<code style={{ color:'#f9a8d4', background:'rgba(0,0,0,0.3)', padding:'0 4px', borderRadius:'4px' }}>creatorId</code>）</Item>
            </ul>
            <P>以上資料僅存於你的裝置，本站伺服器無法讀取。清除瀏覽器快取後資料將永久消失，請自行備份重要內容。</P>
          </Section>

          <Section title="五、AI 生成內容">
            <P>本站使用 AI 服務產生告白、祝福、運勢、療癒小語等內容。AI 生成結果為參考娛樂用途，不構成任何專業建議。</P>
            <P>若你選擇將 AI 生成內容公開至作品牆，即表示同意該內容以匿名方式公開展示。</P>
          </Section>

          <Section title="六、資料安全">
            <P>本站採取合理措施保護伺服器端資料，但網路傳輸無法保證 100% 安全。請勿在本站輸入任何敏感個人資訊（如密碼、身分證字號、金融資訊等）。</P>
          </Section>

          <Section title="七、未成年人">
            <P>本站適合一般大眾使用，未特別針對未成年人設計。若未成年人使用本站，請由監護人陪同或督導。</P>
          </Section>

          <Section title="八、政策變更">
            <P>本站保留隨時修改本政策的權利。重大變更將於本頁面更新日期，建議定期查閱。</P>
          </Section>

          <Section title="九、聯絡我們">
            <P>如有任何關於隱私權的問題，歡迎透過以下方式聯繫：</P>
            <div style={{ background:'rgba(124,58,237,0.15)', borderRadius:'12px', padding:'1rem 1.2rem', border:'1px solid rgba(167,139,250,0.2)', display:'flex', alignItems:'center', gap:'0.8rem' }}>
              <span style={{ fontSize:'1.5rem' }}>💬</span>
              <div>
                <p style={{ color:'#e9d5ff', fontWeight:700, margin:'0 0 0.2rem', fontSize:'0.9rem' }}>LINE 官方帳號</p>
                <p style={{ color:'#a78bfa', margin:0, fontSize:'0.85rem' }}>有的沒的小舖：<strong>@983agawb</strong></p>
              </div>
            </div>
          </Section>

        </div>

        {/* 底部 */}
        <p style={{ textAlign:'center', color:'#374151', fontSize:'0.75rem', marginTop:'2rem' }}>
          © 2026 Surprise Corner・All Rights Reserved
        </p>
      </div>
    </div>
  );
}