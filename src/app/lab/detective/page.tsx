'use client';
// 📄 路徑：src/app/lab/detective/page.tsx
// 《魯魯偵探社 01：誰偷吃了餅乾？》——3 分鐘推理小遊戲（SS 小 App，不賣東西、不收錢）
// 設計稿：AIOS/07_Projects/Lulu_Detective_Game_Spec_20261022.md
// 三個版本隨機：A 有罪（嘴邊有渣）／B 冤枉（嘴乾淨，老鼠搬餅乾）／C 剔牙彩蛋（約 10%）
// 測試用：?v=A|B|C 指定版本；?internal=1 在這台裝置排除自己人的資料
// 埋點：GA4 事件 det_*

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import ShareButtons from '@/components/ShareButtons';

declare global {
  interface Window { gtag?: (...args: unknown[]) => void; }
}
type Ver = 'A' | 'B' | 'C';
type Step = 'intro' | 'belief' | 'clues' | 'accuse' | 'reveal' | 'discuss' | 'end';

const INTERNAL_KEY = 'ss_internal';
const DEVICE_KEY = 'ss_det_device';
const SEEN_KEY = 'ss_det_seen';

function isInternal(): boolean {
  try { return localStorage.getItem(INTERNAL_KEY) === '1'; } catch { return false; }
}
function track(name: string, params: Record<string, string | number | boolean> = {}) {
  if (typeof window === 'undefined') return;
  const payload = { event_category: 'detective', ...params };
  if (isInternal()) { console.debug('[det:internal]', name, payload); return; }
  window.gtag?.('event', name, payload);
}
function pickVersion(): Ver {
  const r = Math.random();
  return r < 0.45 ? 'A' : r < 0.9 ? 'B' : 'C';
}
function getDeviceId(): string {
  try {
    let id = localStorage.getItem(DEVICE_KEY);
    if (!id) { id = Math.random().toString(36).slice(2) + Date.now().toString(36); localStorage.setItem(DEVICE_KEY, id); }
    return id;
  } catch { return 'nodev' + Math.random().toString(36).slice(2); }
}

// 熱區：x,y,w,h 皆為圖片百分比；cx,cy 為放大中心
const SPOTS = [
  { id: 'plate', label: '盤子', x: 20, y: 72, w: 56, h: 16, cx: 0.5, cy: 0.79 },
  { id: 'milk', label: '牛奶', x: 6, y: 54, w: 40, h: 17, cx: 0.22, cy: 0.64 },
  { id: 'lulu', label: '魯魯', x: 42, y: 30, w: 50, h: 28, cx: 0.7, cy: 0.42 },
] as const;
type SpotId = (typeof SPOTS)[number]['id'];

const CLUES: Record<Ver, Record<SpotId, string>> = {
  A: {
    plate: '盤子裡原本有 3 塊餅乾，現在只剩 2 塊，盤上還散著碎屑。',
    milk: '牛奶杯倒向左邊，灑了一桌。牛奶旁邊有一串小小的腳印，一路通到櫥櫃底下的小縫隙。',
    lulu: '魯魯嘴角和鬍鬚旁沾著餅乾粉屑。他的爪子乾乾淨淨，一滴牛奶都沒沾到。',
  },
  B: {
    plate: '盤子裡原本有 3 塊餅乾，現在只剩 2 塊，盤上留著碎屑。',
    milk: '牛奶杯倒向左邊。桌子底下的地板上，有一串小小的腳印，旁邊還有一路餅乾屑，通到櫥櫃的小縫隙。',
    lulu: '魯魯的嘴邊乾乾淨淨，爪子也沒沾到牛奶。他看起來一臉無辜，卻又有點淡定。',
  },
  C: {
    plate: '盤子裡原本有 3 塊餅乾，現在只剩 2 塊，盤上還散著碎屑。',
    milk: '牛奶杯倒向左邊，灑了一桌。',
    lulu: '魯魯嘴裡叼著一根牙籤，正在剔牙，眼睛故意看向別的地方。',
  },
};

// 真相：cookie＝餅乾是誰吃的；milk＝牛奶是誰打翻的（'lulu' | 'other'）
const TRUTH: Record<Ver, { cookie: 'lulu' | 'other'; milk: 'lulu' | 'other' }> = {
  A: { cookie: 'lulu', milk: 'other' },
  B: { cookie: 'other', milk: 'other' },
  C: { cookie: 'lulu', milk: 'other' },
};
const REVEAL_IMG: Record<Ver, string> = { A: 'reveal_A', B: 'reveal_B', C: 'reveal_A' };
const REVEAL_LINE: Record<Ver, string> = {
  A: '餅乾，真的是魯魯吃的。但牛奶不是他打翻的——是住在櫥櫃裡的小老鼠，趁他吃餅乾的時候撞倒了杯子。魯魯說「不是我」，只說對了一半。',
  B: '魯魯從頭到尾都是冤枉的。餅乾和牛奶都是小老鼠做的——牠抱著餅乾，正要躲回縫隙。魯魯早就知道，只是懶得拆穿。',
  C: '餅乾，是魯魯吃的（他還叼著牙籤）。牛奶是櫥櫃裡的小老鼠打翻的。魯魯：「……我只是剔個牙。」',
};
const DISCUSS: Record<Ver, { q: string; a: string; b: string }> = {
  A: { q: '魯魯說「不是我」，算說謊嗎？', a: '算，他吃了餅乾', b: '不算，牛奶真的不是他' },
  B: { q: '你剛剛有沒有冤枉魯魯？', a: '有，對不起魯魯', b: '沒有，線索本來就很可疑' },
  C: { q: '他叼著牙籤說「不是我」，他到底把我們當什麼？', a: '當笨蛋', b: '只是想逗我們' },
};

export default function DetectivePage() {
  const [ver, setVer] = useState<Ver>('A');
  const [step, setStep] = useState<Step>('intro');
  const [belief, setBelief] = useState<'trust' | 'doubt' | null>(null);
  const [opened, setOpened] = useState<SpotId[]>([]);
  const [zoom, setZoom] = useState<SpotId | null>(null);
  const [cookie, setCookie] = useState<'lulu' | 'other' | null>(null);
  const [milk, setMilk] = useState<'lulu' | 'other' | null>(null);
  const [stats, setStats] = useState<{ total: number; show: boolean; trust?: number; discussA?: number; discussB?: number } | null>(null);
  const [voted, setVoted] = useState<'a' | 'b' | null>(null);

  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    if (q.get('internal') === '1') { try { localStorage.setItem(INTERNAL_KEY, '1'); } catch {} }
    const forced = (q.get('v') || '').toUpperCase();
    setVer(forced === 'A' || forced === 'B' || forced === 'C' ? (forced as Ver) : pickVersion());
  }, []);

  const truth = TRUTH[ver];
  const allClues = opened.length >= SPOTS.length;
  const correct = useMemo(
    () => (cookie === truth.cookie ? 1 : 0) + (milk === truth.milk ? 1 : 0),
    [cookie, milk, truth],
  );
  const img = `/lab/detective/after_${ver}.jpg`;

  function start() { setStep('belief'); track('det_start', { version: ver }); }
  function choose(b: 'trust' | 'doubt') { setBelief(b); setStep('clues'); track('det_belief', { version: ver, belief: b }); }
  function openSpot(id: SpotId) {
    setZoom(id);
    setOpened((o) => (o.includes(id) ? o : [...o, id]));
    track('det_clue', { version: ver, spot: id });
  }
  function accuse() {
    if (!cookie || !milk) return;
    setStep('reveal');
    track('det_accuse', { version: ver, cookie, milk, correct });
  }
  async function submitDiscuss(d: 'a' | 'b') {
    setVoted(d);
    track('det_discuss', { version: ver, discuss: d });
    if (!isInternal() && belief && cookie && milk) {
      try {
        await fetch('/api/lab/detective', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ version: ver, belief, discuss: d, cookie, milk, deviceId: getDeviceId() }),
        });
      } catch {}
    }
    try {
      const r = await fetch(`/api/lab/detective?version=${ver}`);
      setStats(await r.json());
    } catch { setStats({ total: 0, show: false }); }
    setStep('end');
    track('det_finish', { version: ver, correct });
    try { localStorage.setItem(SEEN_KEY, ver + (localStorage.getItem(SEEN_KEY) || '')); } catch {}
  }
  function replayOther() {
    const others = (['A', 'B', 'C'] as Ver[]).filter((v) => v !== ver);
    const next = others[Math.floor(Math.random() * others.length)];
    track('det_replay', { from: ver, to: next });
    setVer(next); setStep('intro'); setBelief(null); setOpened([]); setZoom(null);
    setCookie(null); setMilk(null); setStats(null); setVoted(null);
    window.scrollTo({ top: 0 });
  }

  const wrap: React.CSSProperties = { maxWidth: 480, margin: '0 auto', padding: '16px 16px 48px', color: '#4a3b2a', fontFamily: 'system-ui, sans-serif' };
  const card: React.CSSProperties = { background: '#fffaf0', border: '1px solid #ecd9b8', borderRadius: 16, padding: 16, margin: '12px 0' };
  const btn: React.CSSProperties = { display: 'block', width: '100%', padding: '14px 16px', margin: '8px 0', borderRadius: 14, border: '2px solid #e0a95a', background: '#fff3d9', color: '#4a3b2a', fontSize: 17, fontWeight: 600, cursor: 'pointer' };
  const btnOn: React.CSSProperties = { ...btn, background: '#e0a95a', color: '#fff' };
  const main: React.CSSProperties = { ...btn, background: '#d9822b', border: '2px solid #d9822b', color: '#fff' };

  return (
    <main style={{ background: '#fff7e8', minHeight: '100vh' }}>
      <div style={wrap}>
        <p style={{ fontSize: 13, color: '#a98a5a', margin: 0 }}>魯魯偵探社 · 案件 01</p>
        <h1 style={{ fontSize: 24, margin: '4px 0 8px' }}>誰偷吃了餅乾？</h1>

        {/* 主畫面（含熱區） */}
        {step !== 'reveal' && step !== 'discuss' && step !== 'end' && (
          <div style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', border: '1px solid #ecd9b8' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={step === 'intro' ? '/lab/detective/before.jpg' : img}
              alt={step === 'intro' ? '廚房桌上：三塊餅乾、一杯牛奶，魯魯乖乖坐在桌邊' : '廚房桌上：倒掉的牛奶、少了一塊的餅乾，和坐在桌邊的魯魯'}
              style={{ display: 'block', width: '100%' }}
            />
            {step === 'clues' && SPOTS.map((s) => (
              <button
                key={s.id}
                onClick={() => openSpot(s.id)}
                aria-label={`查看線索：${s.label}`}
                style={{
                  position: 'absolute', left: `${s.x}%`, top: `${s.y}%`, width: `${s.w}%`, height: `${s.h}%`,
                  background: opened.includes(s.id) ? 'rgba(255,255,255,0.0)' : 'rgba(255,230,150,0.28)',
                  border: opened.includes(s.id) ? '2px solid rgba(80,160,90,0.8)' : '2px dashed #fff',
                  borderRadius: 14, cursor: 'pointer',
                }}
              />
            ))}
            {step === 'intro' && (
              <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, background: 'linear-gradient(transparent, rgba(40,25,10,0.85))', color: '#fff', padding: '40px 16px 16px' }}>
                <div style={{ fontSize: 22, fontWeight: 700 }}>你只離開了一下下……</div>
              </div>
            )}
            {step === 'belief' && (
              <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, background: 'linear-gradient(transparent, rgba(40,25,10,0.85))', color: '#fff', padding: '40px 16px 16px' }}>
                <div style={{ fontSize: 22, fontWeight: 700 }}>魯魯說：「不是我。」</div>
              </div>
            )}
          </div>
        )}

        {step === 'intro' && (
          <div>
            <div style={card}>桌上有 3 塊餅乾和一杯牛奶，魯魯乖乖坐在桌邊。你轉身去倒個水，回頭一看——</div>
            <button style={main} onClick={start}>回頭一看</button>
          </div>
        )}

        {step === 'belief' && (
          <div>
            <div style={card}>餅乾少了一塊，牛奶倒了。魯魯一臉淡定。<br /><b>先憑直覺：你信魯魯嗎？</b></div>
            <button style={btn} onClick={() => choose('trust')}>🐱 我信他</button>
            <button style={btn} onClick={() => choose('doubt')}>🔍 我不信</button>
          </div>
        )}

        {step === 'clues' && (
          <div>
            <div style={card}>點畫面上的虛線框找線索（{opened.length}/{SPOTS.length}）。三個都看過才能指控。</div>
            <button style={allClues ? main : { ...btn, opacity: 0.4, cursor: 'not-allowed' }} disabled={!allClues} onClick={() => setStep('accuse')}>
              我要指控
            </button>
          </div>
        )}

        {step === 'accuse' && (
          <div>
            <div style={card}>
              <b>餅乾是誰吃的？</b>
              <button style={cookie === 'lulu' ? btnOn : btn} onClick={() => setCookie('lulu')}>魯魯</button>
              <button style={cookie === 'other' ? btnOn : btn} onClick={() => setCookie('other')}>不是魯魯，是別人</button>
            </div>
            <div style={card}>
              <b>牛奶是誰打翻的？</b>
              <button style={milk === 'lulu' ? btnOn : btn} onClick={() => setMilk('lulu')}>魯魯</button>
              <button style={milk === 'other' ? btnOn : btn} onClick={() => setMilk('other')}>不是魯魯，是別人</button>
            </div>
            <button style={cookie && milk ? main : { ...btn, opacity: 0.4 }} disabled={!cookie || !milk} onClick={accuse}>送出指控</button>
          </div>
        )}

        {(step === 'reveal' || step === 'discuss') && (
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/lab/detective/${REVEAL_IMG[ver]}.jpg`} alt="真相：櫥櫃縫隙裡躲著一隻小老鼠" style={{ display: 'block', width: '100%', borderRadius: 16, border: '1px solid #ecd9b8' }} />
            <div style={card}>
              <b>{correct === 2 ? '🎉 兩題都對，破案！' : correct === 1 ? '🤔 對了一半。' : '😅 這次被魯魯騙過去了。'}</b>
              <p style={{ margin: '8px 0 0', lineHeight: 1.7 }}>{REVEAL_LINE[ver]}</p>
              {belief === 'trust' && ver !== 'B' && <p style={{ margin: '8px 0 0', color: '#a98a5a' }}>（你一開始選了「我信他」。）</p>}
              {belief === 'doubt' && ver === 'B' && <p style={{ margin: '8px 0 0', color: '#a98a5a' }}>（你一開始選了「我不信」……）</p>}
            </div>
            {step === 'reveal' && <button style={main} onClick={() => { setStep('discuss'); }}>下一步</button>}
            {step === 'discuss' && (
              <div style={card}>
                <b>{DISCUSS[ver].q}</b>
                <button style={btn} onClick={() => submitDiscuss('a')}>{DISCUSS[ver].a}</button>
                <button style={btn} onClick={() => submitDiscuss('b')}>{DISCUSS[ver].b}</button>
              </div>
            )}
          </div>
        )}

        {step === 'end' && (
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/lab/detective/${REVEAL_IMG[ver]}.jpg`} alt="真相畫面" style={{ display: 'block', width: '100%', borderRadius: 16, border: '1px solid #ecd9b8' }} />
            <div style={card}>
              <b>{correct === 2 ? '🎉 破案！' : correct === 1 ? '🤔 對了一半' : '😅 被騙過去了'}</b>
              <p style={{ margin: '8px 0 0', lineHeight: 1.7 }}>{REVEAL_LINE[ver]}</p>
            </div>
            <div style={card}>
              <b>你的看法：{voted === 'a' ? DISCUSS[ver].a : DISCUSS[ver].b}</b>
              <p style={{ margin: '8px 0 0', color: '#6b5a44' }}>
                {stats?.show
                  ? `玩到這個版本的 ${stats.total} 位玩家裡：${Math.round(((stats.discussA || 0) / stats.total) * 100)}% 選「${DISCUSS[ver].a}」，${Math.round(((stats.discussB || 0) / stats.total) * 100)}% 選「${DISCUSS[ver].b}」。`
                  : `你是第 ${Math.max(stats?.total || 0, 1)} 位玩到這個版本的玩家。人數夠多之後，這裡會顯示大家怎麼選。`}
              </p>
            </div>
            <div style={card}>
              <b>🔎 這個案件有另一個版本。</b>
              <p style={{ margin: '6px 0 0' }}>你玩到的是 {ver === 'C' ? '彩蛋版（魯魯叼著牙籤）' : `版本 ${ver}`}。朋友可能拿到完全不同的證據，去比一比？</p>
              <button style={main} onClick={replayOther}>看另一個版本</button>
            </div>
            <ShareButtons title="魯魯偵探社：誰偷吃了餅乾？" content={`我玩到的是${ver === 'C' ? '彩蛋版（魯魯叼著牙籤）' : `版本 ${ver}`}。你的魯魯是怎麼回事？`} />
            <div style={card}>
              <b>案件 02：誰偷走了生日蛋糕？</b>
              <p style={{ margin: '6px 0 0', color: '#6b5a44' }}>魯魯偵探社還會再開張，敬請期待。</p>
              <p style={{ margin: '8px 0 0' }}><Link href="/" style={{ color: '#d9822b' }}>回驚喜角落</Link></p>
            </div>
          </div>
        )}
      </div>

      {/* 線索放大 */}
      {zoom && (
        <div onClick={() => setZoom(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(30,20,10,0.75)', zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: '#fffaf0', borderRadius: 18, padding: 14, maxWidth: 420, width: '100%' }}>
            {(() => {
              const s = SPOTS.find((x) => x.id === zoom)!;
              const S = 2.6; const H = S * 1.5;
              const px = Math.min(100, Math.max(0, ((S * s.cx - 0.5) / (S - 1)) * 100));
              const py = Math.min(100, Math.max(0, ((H * s.cy - 0.5) / (H - 1)) * 100));
              return (
                <div style={{ width: '100%', aspectRatio: '1 / 1', borderRadius: 12, backgroundImage: `url(${img})`, backgroundSize: `${S * 100}% auto`, backgroundPosition: `${px}% ${py}%`, backgroundRepeat: 'no-repeat', border: '1px solid #ecd9b8' }} />
              );
            })()}
            <p style={{ margin: '12px 0', lineHeight: 1.7 }}>{CLUES[ver][zoom]}</p>
            <button style={main} onClick={() => setZoom(null)}>知道了</button>
          </div>
        </div>
      )}
    </main>
  );
}
