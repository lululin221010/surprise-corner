'use client';
// 📄 路徑：src/app/lab/feeding/page.tsx
// #01《今天該餵多少？》——貓咪每日熱量與份量估算（純前端，無後端、不上傳任何資料）
// 規格與安全邊界：AIOS/05_Knowledge/SS_MiniApp_01_Feeding_Eval_20261014.md
// 公式：RER = 70 × 體重(kg)^0.75；MER = RER × 係數（AAHA 2021 營養與體重管理指引 Box 1）
// 埋點：GA4 事件 feed_*；?internal=1 可在這台裝置排除自己人的資料

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import ShareButtons from '@/components/ShareButtons';

/* ───────────── 埋點（沿用 #07 的內部排除機制） ───────────── */
declare global {
  interface Window { gtag?: (...args: unknown[]) => void; }
}
const INTERNAL_KEY = 'ss_internal';
const SAVE_KEY = 'ss_feeding_last';
function isInternal(): boolean {
  try { return localStorage.getItem(INTERNAL_KEY) === '1'; } catch { return false; }
}
function track(name: string, params: Record<string, string | number | boolean> = {}) {
  if (typeof window === 'undefined') return;
  const payload = { event_category: 'feeding_calc', ...params };
  if (isInternal()) {
    console.debug('[feed:internal]', name, payload);
    return;
  }
  window.gtag?.('event', name, payload);
}

/* ───────────── 計算 ───────────── */
type Status = 'neutered' | 'intact';
type Activity = 'low' | 'normal';

// 係數區間（AAHA 2021）：已結紮 1.2～1.4；未結紮 1.4～1.6；少動或易胖 1.0（本頁取 1.0～1.2）
function factorRange(status: Status, activity: Activity): [number, number] {
  if (activity === 'low') return [1.0, 1.2];
  return status === 'neutered' ? [1.2, 1.4] : [1.4, 1.6];
}
function rer(kg: number): number {
  return 70 * Math.pow(kg, 0.75);
}

const VET_FLAGS: { key: string; label: string }[] = [
  { key: 'kitten', label: '未滿 1 歲的幼貓' },
  { key: 'pregnant', label: '懷孕或哺乳中' },
  { key: 'disease', label: '正在治療或有慢性疾病（腎臟、糖尿病、甲狀腺、泌尿等）' },
  { key: 'change', label: '最近食慾、體重或排便有明顯變化' },
];

type Saved = {
  kg: string; status: Status; activity: Activity; dryKcal: string; wetKcal: string; wetShare: string; treatKcal: string;
};

export default function FeedingPage() {
  const [kg, setKg] = useState('');
  const [status, setStatus] = useState<Status>('neutered');
  const [activity, setActivity] = useState<Activity>('normal');
  const [dryKcal, setDryKcal] = useState('');   // 乾糧：每 100 g 約幾 kcal（看包裝）
  const [wetKcal, setWetKcal] = useState('');   // 罐頭：每 100 g 約幾 kcal（看包裝，可不填）
  const [wetShare, setWetShare] = useState('0'); // 罐頭佔每日熱量的百分比
  const [treatKcal, setTreatKcal] = useState(''); // 零食與其他每天約幾 kcal
  const [flags, setFlags] = useState<Record<string, boolean>>({});
  const [calculated, setCalculated] = useState(false);
  const [saved, setSaved] = useState(false);
  const [started, setStarted] = useState(false);

  // 排除自己人 + 讀取上次存的條件
  useEffect(() => {
    try {
      const q = new URLSearchParams(window.location.search).get('internal');
      if (q === '1') localStorage.setItem(INTERNAL_KEY, '1');
      if (q === '0') localStorage.removeItem(INTERNAL_KEY);
      const raw = localStorage.getItem(SAVE_KEY);
      if (raw) {
        const s = JSON.parse(raw) as Saved;
        setKg(s.kg ?? ''); setStatus(s.status ?? 'neutered'); setActivity(s.activity ?? 'normal');
        setDryKcal(s.dryKcal ?? ''); setWetKcal(s.wetKcal ?? ''); setWetShare(s.wetShare ?? '0'); setTreatKcal(s.treatKcal ?? '');
      }
    } catch { /* 無痕模式等情況略過 */ }
  }, []);

  const touch = () => {
    if (!started) { setStarted(true); track('feed_start'); }
    setCalculated(false);
    setSaved(false);
  };

  const kgNum = parseFloat(kg);
  const kgValid = Number.isFinite(kgNum) && kgNum >= 1.5 && kgNum <= 12;
  const needVet = VET_FLAGS.some(f => flags[f.key]);

  const result = useMemo(() => {
    if (!kgValid) return null;
    const base = rer(kgNum);
    const [fLo, fHi] = factorRange(status, activity);
    const lo = base * fLo;
    const hi = base * fHi;
    const mid = (lo + hi) / 2;
    const treat = Math.max(0, parseFloat(treatKcal) || 0);
    const foodMid = Math.max(0, mid - treat);
    const dry = parseFloat(dryKcal);
    const wet = parseFloat(wetKcal);
    const share = Math.min(100, Math.max(0, parseFloat(wetShare) || 0)) / 100;
    const wetKcalDay = wet > 0 ? foodMid * share : 0;
    const dryKcalDay = foodMid - wetKcalDay;
    return {
      rer: base, lo, hi, mid, treat, foodMid,
      dryG: dry > 0 ? (dryKcalDay / dry) * 100 : null,
      wetG: wet > 0 && share > 0 ? (wetKcalDay / wet) * 100 : null,
      overTreat: treat > 0 && treat > mid * 0.2,
    };
  }, [kgValid, kgNum, status, activity, treatKcal, dryKcal, wetKcal, wetShare]);

  const onCalc = () => {
    if (needVet) {
      track('feed_blocked_vet', { flags: VET_FLAGS.filter(f => flags[f.key]).map(f => f.key).join(',') });
      setCalculated(true);
      return;
    }
    if (!result) return;
    setCalculated(true);
    track('feed_calc', {
      status, activity,
      has_dry: !!(parseFloat(dryKcal) > 0), has_wet: !!(parseFloat(wetKcal) > 0), has_treat: result.treat > 0,
    });
  };

  const onSave = () => {
    try {
      const s: Saved = { kg, status, activity, dryKcal, wetKcal, wetShare, treatKcal };
      localStorage.setItem(SAVE_KEY, JSON.stringify(s));
      setSaved(true);
      track('feed_save');
    } catch { /* 略過 */ }
  };

  const onExample = () => {
    setKg('5'); setStatus('neutered'); setActivity('normal');
    setDryKcal(''); setWetKcal(''); setWetShare('0'); setTreatKcal('');
    setFlags({}); setCalculated(false); setSaved(false);
    if (!started) { setStarted(true); track('feed_start'); }
    track('feed_example');
  };

  const r0 = (n: number) => Math.round(n);

  return (
    <main className="min-h-screen px-4 py-6" style={{ background: 'linear-gradient(180deg,#0f1224 0%,#1a1740 100%)' }}>
      <div className="mx-auto flex flex-col gap-4" style={{ maxWidth: 440 }}>
        <div className="flex items-center justify-between text-sm text-white/60">
          <Link href="/tools" className="hover:text-white">← 工具</Link>
          <span>貓咪餵食量估算</span>
        </div>

        <header className="text-white">
          <h1 className="text-2xl font-bold">今天該餵多少？</h1>
          <p className="mt-1 text-sm text-white/70">輸入體重與生活條件，估算一天大約需要多少熱量與克數。免登入，資料只存在你的手機。</p>
        </header>

        <button
          type="button"
          onClick={onExample}
          className="rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-left text-sm text-white/90 hover:bg-white/10"
        >
          🐱 不知道怎麼填？用魯魯的條件試算（5 kg、已結紮）
        </button>

        <section className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-4 text-white">
          <label className="block text-sm">
            <span className="mb-1 block text-white/80">目前體重（公斤）</span>
            <input
              inputMode="decimal"
              value={kg}
              onChange={e => { setKg(e.target.value); touch(); }}
              placeholder="例如 4.8"
              className="w-full rounded-lg border border-white/15 bg-black/30 px-3 py-2 text-white outline-none focus:border-amber-300"
            />
            {kg !== '' && !kgValid && (
              <span className="mt-1 block text-xs text-amber-300">這個工具只估算 1.5～12 公斤的成貓，請確認體重。</span>
            )}
          </label>

          <div className="text-sm">
            <span className="mb-1 block text-white/80">是否結紮</span>
            <div className="grid grid-cols-2 gap-2">
              {([['neutered', '已結紮'], ['intact', '未結紮']] as [Status, string][]).map(([v, t]) => (
                <button key={v} type="button" onClick={() => { setStatus(v); touch(); }}
                  className={`rounded-lg border px-3 py-2 ${status === v ? 'border-amber-300 bg-amber-300/15' : 'border-white/15 bg-black/20'}`}>{t}</button>
              ))}
            </div>
          </div>

          <div className="text-sm">
            <span className="mb-1 block text-white/80">活動量與體態</span>
            <div className="grid grid-cols-2 gap-2">
              {([['normal', '一般'], ['low', '少動或容易胖']] as [Activity, string][]).map(([v, t]) => (
                <button key={v} type="button" onClick={() => { setActivity(v); touch(); }}
                  className={`rounded-lg border px-3 py-2 ${activity === v ? 'border-amber-300 bg-amber-300/15' : 'border-white/15 bg-black/20'}`}>{t}</button>
              ))}
            </div>
          </div>

          <details className="rounded-lg border border-white/10 bg-black/20 p-3 text-sm">
            <summary className="cursor-pointer text-white/80">想換算成克數？（選填，看包裝上的熱量）</summary>
            <div className="mt-3 space-y-3">
              <label className="block">
                <span className="mb-1 block text-white/70">乾糧：每 100 g 約幾 kcal</span>
                <input inputMode="decimal" value={dryKcal} onChange={e => { setDryKcal(e.target.value); touch(); }}
                  placeholder="包裝通常寫 ME 或 kcal/100g，例如 380"
                  className="w-full rounded-lg border border-white/15 bg-black/30 px-3 py-2 text-white outline-none focus:border-amber-300" />
              </label>
              <label className="block">
                <span className="mb-1 block text-white/70">罐頭：每 100 g 約幾 kcal（沒吃可不填）</span>
                <input inputMode="decimal" value={wetKcal} onChange={e => { setWetKcal(e.target.value); touch(); }}
                  placeholder="例如 90"
                  className="w-full rounded-lg border border-white/15 bg-black/30 px-3 py-2 text-white outline-none focus:border-amber-300" />
              </label>
              {parseFloat(wetKcal) > 0 && (
                <label className="block">
                  <span className="mb-1 block text-white/70">罐頭佔每天熱量的幾成（%）</span>
                  <input inputMode="numeric" value={wetShare} onChange={e => { setWetShare(e.target.value); touch(); }}
                    placeholder="例如 30"
                    className="w-full rounded-lg border border-white/15 bg-black/30 px-3 py-2 text-white outline-none focus:border-amber-300" />
                </label>
              )}
              <label className="block">
                <span className="mb-1 block text-white/70">零食與其他：一天大約幾 kcal（會從總量扣掉）</span>
                <input inputMode="decimal" value={treatKcal} onChange={e => { setTreatKcal(e.target.value); touch(); }}
                  placeholder="沒有可不填"
                  className="w-full rounded-lg border border-white/15 bg-black/30 px-3 py-2 text-white outline-none focus:border-amber-300" />
              </label>
            </div>
          </details>

          <div className="text-sm">
            <span className="mb-1 block text-white/80">牠目前有沒有以下情況？（勾選就不給份量，建議先問獸醫）</span>
            <div className="space-y-2">
              {VET_FLAGS.map(f => (
                <label key={f.key} className="flex items-start gap-2 text-white/80">
                  <input type="checkbox" checked={!!flags[f.key]} onChange={e => { setFlags(p => ({ ...p, [f.key]: e.target.checked })); touch(); }} className="mt-1" />
                  <span>{f.label}</span>
                </label>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={onCalc}
            disabled={!kgValid && !needVet}
            className="w-full rounded-xl bg-amber-300 px-4 py-3 font-semibold text-black disabled:opacity-40"
          >
            估算一天份量
          </button>
        </section>

        {calculated && needVet && (
          <section className="rounded-2xl border border-amber-300/40 bg-amber-300/10 p-4 text-white">
            <h2 className="font-semibold">建議先問獸醫</h2>
            <p className="mt-2 text-sm text-white/85">
              幼貓、懷孕哺乳、有疾病，或最近食慾體重排便有變化時，需要的熱量與餵法會跟一般成貓不同，這個工具不給份量。
              請帶著現在的體重與吃的東西，直接跟獸醫討論。
            </p>
          </section>
        )}

        {calculated && !needVet && result && (
          <section className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-white">
            <h2 className="font-semibold">依你輸入的條件，大約範圍</h2>
            <div className="rounded-xl bg-black/30 p-4 text-center">
              <div className="text-3xl font-bold text-amber-300">{r0(result.lo)}～{r0(result.hi)} <span className="text-base font-normal text-white/70">kcal／天</span></div>
              <div className="mt-1 text-xs text-white/60">先從中間約 {r0(result.mid)} kcal 開始</div>
            </div>

            {(result.dryG !== null || result.wetG !== null) && (
              <div className="rounded-xl bg-black/20 p-3 text-sm">
                <div className="mb-1 text-white/70">以中間值換算{result.treat > 0 ? `（已扣掉零食 ${r0(result.treat)} kcal）` : ''}：</div>
                {result.dryG !== null && <div>乾糧約 <b>{r0(result.dryG)}</b> g／天</div>}
                {result.wetG !== null && <div>罐頭約 <b>{r0(result.wetG)}</b> g／天</div>}
              </div>
            )}
            {result.overTreat && (
              <p className="text-xs text-amber-300">零食與其他的熱量看起來占了不少比例，可以留意是否擠掉了正餐。</p>
            )}

            <ul className="list-disc space-y-1 pl-5 text-sm text-white/80">
              <li>這是估算起點：同體重的貓需求會差很多。</li>
              <li>請每 2～4 週量一次體重、摸摸肋骨與腰線，再微調。</li>
              <li>少動、室內貓可能需要更少，偏瘦的貓則可能要多一點。</li>
              <li>罐頭、零食、營養品也算進總量。</li>
            </ul>

            <div className="flex gap-2">
              <button type="button" onClick={onSave}
                className="flex-1 rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-sm hover:bg-white/10">
                {saved ? '✓ 已存在這支手機' : '存下這次的條件'}
              </button>
            </div>

            <div onClick={() => track('feed_share_click')}>
              <ShareButtons title="今天該餵多少？" content="輸入體重，30 秒估出貓咪一天大約要吃多少。免登入、免費。" />
            </div>
          </section>
        )}

        <footer className="space-y-2 text-xs text-white/50">
          <p>
            這是估算，不是診斷或治療建議，也不能取代獸醫。需求會因個體、體態與健康狀況不同，請依牠的體重與體態變化調整，並以獸醫建議為準。
          </p>
          <p>估算方式參考美國動物醫院協會（AAHA）2021 營養與體重管理指引：靜止能量 = 70 ×（體重 kg）^0.75，再乘以依結紮與活動量決定的係數。</p>
        </footer>
      </div>
    </main>
  );
}
