'use client';
import { useState } from 'react';
import Link from 'next/link';
import ShareButtons from '@/components/ShareButtons';

type LuluType = 'sun' | 'can' | 'zoomies' | 'ignore' | 'window' | 'cuddle';
type Option = { text: string; type: LuluType };
type Question = { q: string; options: Option[] };
type ResultData = { name: string; title: string; label: string; body: string[]; say: string };

const QUESTIONS: Question[] = [
  {
    q: '今天一睜眼，你的第一個念頭是？',
    options: [
      { text: '哪裡有光？我要去躺', type: 'sun' },
      { text: '好像聽到罐頭在叫我', type: 'can' },
      { text: '精神超好，先跑一圈再說', type: 'zoomies' },
      { text: '窗外今天有什麼新動靜？', type: 'window' },
    ],
  },
  {
    q: '有人在叫你的名字，你會？',
    options: [
      { text: '耳朵動一下，人沒動', type: 'ignore' },
      { text: '馬上飛奔過去，順便蹭一下', type: 'cuddle' },
      { text: '聽到了，但這塊光太舒服了', type: 'sun' },
      { text: '先確認是不是要開罐頭', type: 'can' },
    ],
  },
  {
    q: '半夜 2 點，你在做什麼？',
    options: [
      { text: '全家都睡了，我剛好精神來了', type: 'zoomies' },
      { text: '縮在被角，貼著誰睡', type: 'cuddle' },
      { text: '趴在窗邊，盯著一個小點看了很久', type: 'window' },
      { text: '睡得很熟，請勿打擾', type: 'sun' },
    ],
  },
  {
    q: '馬上要出門了，你的反應？',
    options: [
      { text: '假裝沒看到，繼續做自己的事', type: 'ignore' },
      { text: '站在門口，用眼神挽留', type: 'cuddle' },
      { text: '先巡一遍窗戶，確認外面安全', type: 'window' },
      { text: '出門前，先加個餐可以嗎', type: 'can' },
    ],
  },
  {
    q: '今天最想收到什麼禮物？',
    options: [
      { text: '一個紙箱，我進去就不出來', type: 'ignore' },
      { text: '一條會一直動的線，我要追', type: 'zoomies' },
      { text: '一個可以窩一整天的軟窩', type: 'sun' },
      { text: '一雙一直摸我的手', type: 'cuddle' },
    ],
  },
];

const RESULTS: Record<LuluType, ResultData> = {
  sun: {
    name: '曬到光就不動魯魯',
    title: '曬到光就不動魯魯',
    label: '今天的任務：把這塊光曬到底',
    body: [
      '你今天的電量很穩，穩到可以原地躺平。這不是懶，是魯魯在做一件很重要的事：把太陽收進毛裡。',
      '別人說要加速，你說：這塊光還沒曬完。今天允許自己慢一點，光走了再動也不遲。',
    ],
    say: '光在哪，家就在哪。',
  },
  can: {
    name: '聽到開罐頭才醒魯魯',
    title: '聽到開罐頭才醒魯魯',
    label: '對的時機，我會非常準時',
    body: [
      '平常看起來沒事，只要出現你在意的那個聲音，立刻精神抖擻。你不是被動，你只是把力氣留給真正想要的事。',
      '今天遇到對的「罐頭聲」，記得第一個衝過去，不用裝矜持。',
    ],
    say: '想要的，就大聲說出來。',
  },
  zoomies: {
    name: '半夜突然跑酷魯魯',
    title: '半夜突然跑酷魯魯',
    label: '平常很安靜，是為了存這一波',
    body: [
      '你的能量不是沒有，是在等一個沒人看的時刻爆開。今天如果突然很想衝，那就衝，沙發會接住你。',
      '跑完記得回到原位，假裝什麼都沒發生。這就是優雅。',
    ],
    say: '剛才那個？不是魯魯。',
  },
  ignore: {
    name: '叫名字假裝沒聽到魯魯',
    title: '叫名字假裝沒聽到魯魯',
    label: '我聽到了，我只是現在不想',
    body: [
      '你不是沒禮貌，你是很清楚自己現在要做什麼。被叫的時候，耳朵動一下，就是回應。',
      '今天可以大方說一句「等我一下」。真正重要的事，你自然會走過去。',
    ],
    say: '我有聽到，真的，等一下。',
  },
  window: {
    name: '盯著窗外一個小點魯魯',
    title: '盯著窗外一個小點魯魯',
    label: '腦袋裡正在開一場很大的會',
    body: [
      '你看起來在發呆，其實在觀察、在想、在把世界慢慢拼起來。那個小點到底是什麼，你今天一定要弄清楚。',
      '想太多不丟臉，那是你的天賦。給腦袋一個出口，說出來、寫下來都好。',
    ],
    say: '嘘，魯魯在想事情。',
  },
  cuddle: {
    name: '一坐下就黏上來魯魯',
    title: '一坐下就黏上來魯魯',
    label: '你的家，是會呼吸的那種',
    body: [
      '把拔、馬麻一坐下，你就知道那個位置是你的。你需要的不多，一個膝蓋、一隻手、一點體溫就夠。你黏人，是因為你知道什麼叫安心。',
      '今天找一個讓你放心的人靠一下吧，不用解釋。',
    ],
    say: '今天，我要坐在這裡。',
  },
};

const ORDER: LuluType[] = ['sun', 'can', 'zoomies', 'ignore', 'window', 'cuddle'];
const IMG = (t: LuluType) => `/quiz/which-lulu/${t}.jpg`;

const BG = 'linear-gradient(160deg, #fff8ee 0%, #ffeede 55%, #ffe3d1 100%)';
const INK = '#4a3428';
const SOFT = '#9a7b66';
const ACCENT = '#f08a5d';

function pickWinner(answers: LuluType[]): LuluType {
  const counts: Record<string, number> = {};
  for (const a of answers) counts[a] = (counts[a] || 0) + 1;
  const max = Math.max(...Object.values(counts));
  for (let i = answers.length - 1; i >= 0; i--) {
    if (counts[answers[i]] === max) return answers[i];
  }
  return answers[answers.length - 1];
}

export default function WhichLuluPage() {
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<LuluType[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [result, setResult] = useState<LuluType | null>(null);

  function handleSelect(type: LuluType, idx: number) {
    if (selected !== null) return;
    setSelected(idx);
    setTimeout(() => {
      const next = [...answers, type];
      setAnswers(next);
      if (current + 1 >= QUESTIONS.length) {
        setResult(pickWinner(next));
        (window as any).gtag?.('event', 'complete_quiz', { event_category: 'quiz', quiz_slug: 'which-lulu' });
      } else {
        setCurrent(current + 1);
        setSelected(null);
      }
    }, 380);
  }

  function restart() {
    setStarted(false);
    setCurrent(0);
    setAnswers([]);
    setSelected(null);
    setResult(null);
  }

  // ── 結果頁 ──
  if (result) {
    const r = RESULTS[result];
    return (
      <main style={{ minHeight: '100vh', background: BG, color: INK, padding: '0 0 5rem' }}>
        <div style={{ maxWidth: '560px', margin: '0 auto', padding: '2rem 1.2rem 0' }}>
          <div style={{
            background: '#fff', borderRadius: '24px', overflow: 'hidden',
            boxShadow: '0 12px 40px rgba(240,138,93,0.22)', marginBottom: '1.6rem',
          }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={IMG(result)} alt={r.name} style={{ width: '100%', display: 'block', aspectRatio: '1 / 1', objectFit: 'cover' }} />
            <div style={{ padding: '1.4rem 1.5rem 1.6rem', textAlign: 'center' }}>
              <div style={{ color: SOFT, fontSize: '0.78rem', letterSpacing: '0.12em', marginBottom: '0.4rem' }}>
                你今天是
              </div>
              <h1 style={{ fontSize: 'clamp(1.5rem, 6vw, 2rem)', fontWeight: 900, margin: '0 0 0.5rem', color: ACCENT, lineHeight: 1.25 }}>
                {r.title}
              </h1>
              <p style={{ color: INK, fontSize: '1rem', fontWeight: 700, margin: '0 0 1rem' }}>{r.label}</p>
              <div style={{
                display: 'inline-block', background: '#fff1e6', color: SOFT,
                borderRadius: '30px', padding: '0.25rem 0.9rem', fontSize: '0.72rem',
              }}>
                surprise-corner.vercel.app/quiz/which-lulu
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.4rem' }}>
            {r.body.map((para, i) => (
              <div key={i} style={{
                background: 'rgba(255,255,255,0.75)', borderRadius: '16px',
                padding: '1.1rem 1.3rem', borderLeft: `4px solid ${ACCENT}`,
              }}>
                <p style={{ margin: 0, lineHeight: 1.85, fontSize: '0.95rem' }}>{para}</p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', margin: '1.6rem 0 2rem' }}>
            <div style={{ color: SOFT, fontSize: '0.78rem', marginBottom: '0.3rem' }}>魯魯今天想說</div>
            <div style={{ fontSize: '1.15rem', fontWeight: 800 }}>「{r.say}」</div>
          </div>

          <div style={{
            background: 'rgba(255,255,255,0.65)', borderRadius: '18px', padding: '1.2rem 1rem 1rem',
            marginBottom: '2rem', textAlign: 'center',
          }}>
            <div style={{ fontSize: '0.88rem', fontWeight: 700, marginBottom: '0.8rem' }}>
              魯魯一共有 6 種今天，你的朋友是哪一種？
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.6rem' }}>
              {ORDER.map(t => (
                <div key={t} style={{ opacity: t === result ? 1 : 0.85 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={IMG(t)} alt={RESULTS[t].name} style={{
                    width: '100%', aspectRatio: '1 / 1', objectFit: 'cover', borderRadius: '12px',
                    border: t === result ? `3px solid ${ACCENT}` : '3px solid transparent',
                  }} />
                  <div style={{ fontSize: '0.68rem', color: SOFT, marginTop: '0.25rem', lineHeight: 1.3 }}>{RESULTS[t].name.replace('魯魯', '')}</div>
                </div>
              ))}
            </div>
          </div>

          <ShareButtons
            title={`我今天是「${r.title}」`}
            content={`${r.label}。你今天是哪隻魯魯？`}
          />

          <div style={{ display: 'flex', gap: '0.9rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '1rem' }}>
            <button onClick={restart} style={{
              background: '#fff', border: `1px solid ${ACCENT}`, color: ACCENT,
              borderRadius: '30px', padding: '0.65rem 1.7rem', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 700,
            }}>
              再測一次
            </button>
            <Link href="/quiz" style={{
              background: ACCENT, color: '#fff', borderRadius: '30px',
              padding: '0.65rem 1.7rem', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 700,
            }}>
              看其他測驗 →
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // ── 開始頁 ──
  if (!started) {
    return (
      <main style={{ minHeight: '100vh', background: BG, color: INK, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem 1.2rem' }}>
        <div style={{ maxWidth: '480px', width: '100%', textAlign: 'center' }}>
          <div style={{
            borderRadius: '24px', overflow: 'hidden', boxShadow: '0 12px 40px rgba(240,138,93,0.25)',
            marginBottom: '1.6rem', background: '#fff',
          }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={IMG('zoomies')} alt="魯魯" style={{ width: '100%', display: 'block', aspectRatio: '1 / 1', objectFit: 'cover' }} />
          </div>
          <h1 style={{ fontSize: 'clamp(1.7rem, 7vw, 2.3rem)', fontWeight: 900, margin: '0 0 0.7rem', color: ACCENT }}>
            你今天是哪隻魯魯？
          </h1>
          <p style={{ color: INK, lineHeight: 1.8, fontSize: '1rem', margin: '0 0 0.4rem' }}>
            魯魯有 6 種今天：<br />曬到光就不動、半夜跑酷、叫名字假裝沒聽到……
          </p>
          <p style={{ color: SOFT, fontSize: '0.85rem', margin: '0 0 1.8rem' }}>
            5 題，30 秒。測完看看，你今天是哪一隻。
          </p>
          <button onClick={() => setStarted(true)} style={{
            background: ACCENT, color: '#fff', border: 'none', borderRadius: '30px',
            padding: '0.85rem 3rem', fontSize: '1.05rem', fontWeight: 800, cursor: 'pointer',
            boxShadow: '0 6px 18px rgba(240,138,93,0.4)',
          }}>
            開始測驗
          </button>
          <div style={{ marginTop: '1.4rem' }}>
            <Link href="/quiz" style={{ color: SOFT, fontSize: '0.82rem', textDecoration: 'none' }}>← 回測驗列表</Link>
          </div>
        </div>
      </main>
    );
  }

  // ── 作答頁 ──
  const q = QUESTIONS[current];
  const progress = (current / QUESTIONS.length) * 100;

  return (
    <main style={{ minHeight: '100vh', background: BG, color: INK, padding: '0 0 4rem' }}>
      <div style={{ maxWidth: '560px', margin: '0 auto', padding: '2rem 1.2rem 0' }}>
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ color: SOFT, fontSize: '0.78rem' }}>你今天是哪隻魯魯？</span>
            <span style={{ color: SOFT, fontSize: '0.78rem' }}>{current + 1} / {QUESTIONS.length}</span>
          </div>
          <div style={{ height: '6px', background: 'rgba(240,138,93,0.18)', borderRadius: '3px' }}>
            <div style={{ height: '100%', borderRadius: '3px', background: ACCENT, width: `${progress}%`, transition: 'width 0.4s ease' }} />
          </div>
        </div>

        <p style={{ fontSize: 'clamp(1.15rem, 4.5vw, 1.4rem)', fontWeight: 800, lineHeight: 1.6, margin: '0 0 1.6rem' }}>
          {q.q}
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          {q.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleSelect(opt.type, i)}
              style={{
                textAlign: 'left', padding: '1rem 1.2rem', borderRadius: '16px',
                cursor: selected !== null ? 'default' : 'pointer',
                fontSize: '1rem', lineHeight: 1.55, fontWeight: 600,
                border: selected === i ? `2px solid ${ACCENT}` : '2px solid transparent',
                background: selected === i ? '#ffe3d1' : '#fff',
                color: INK,
                boxShadow: '0 3px 10px rgba(154,123,102,0.12)',
                transition: 'all 0.2s ease',
                opacity: selected !== null && selected !== i ? 0.45 : 1,
              }}
            >
              {opt.text}
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}
