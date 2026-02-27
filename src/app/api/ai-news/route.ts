// 📁 路徑：src/app/api/ai-news/route.ts
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 3600;

const FETCH_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (compatible; SurpriseCornerBot/1.0; +https://surprise-corner.vercel.app)',
  'Accept': 'application/rss+xml, application/xml, text/xml, */*',
};

const RSS_FEEDS = [
  // ── AI 科技 ──────────────────────────────────────────────────────────
  { url: 'https://www.theverge.com/rss/ai-artificial-intelligence/index.xml', source: 'The Verge', keywords: [], category: 'AI' },
  { url: 'https://feeds.bbci.co.uk/news/technology/rss.xml', source: 'BBC Tech', keywords: ['AI', 'robot', 'artificial intelligence'], category: 'AI' },
  { url: 'https://www.ithome.com.tw/rss', source: 'iThome', keywords: ['AI', '人工智慧', '機器學習', 'ChatGPT', 'Gemini'], category: 'AI' },
  { url: 'https://technews.tw/feed/', source: '科技新報', keywords: ['AI', '人工智慧', '科技'], category: 'AI' },

  // ── 財經理財 ─────────────────────────────────────────────────────────
  { url: 'https://tw.stock.yahoo.com/rss', source: 'Yahoo 財經', keywords: [], category: '財經' },
  { url: 'https://money.udn.com/rssfeed/news/1001/5591?ch=money', source: '經濟日報', keywords: [], category: '財經' },
  { url: 'https://www.cna.com.tw/rss/aife.aspx', source: '中央社財經', keywords: ['股', '投資', '台積電', 'ETF', '理財', '經濟'], category: '財經' },
  { url: 'https://www.moneydj.com/rss/news.xml', source: 'MoneyDJ', keywords: [], category: '財經' },

  // ── 娛樂演藝（圖片豐富！）─────────────────────────────────────────
  // ETtoday 娛樂：用主 RSS 加關鍵字過濾，最穩定
  { url: 'https://www.ettoday.net/news/rss2.xml', source: 'ETtoday 娛樂', keywords: ['明星', '藝人', '演員', '歌手', '電影', '韓劇', '綜藝', '偶像', '音樂', '戲劇', '婚', '戀愛', '走紅毯', '頒獎'], category: '娛樂' },
  // 中央社娛樂 RSS，官方提供
  { url: 'https://www.cna.com.tw/rss/amov.aspx', source: '中央社娛樂', keywords: [], category: '娛樂' },
  // 自由時報娛樂
  { url: 'https://ent.ltn.com.tw/rss/news.xml', source: '自由娛樂', keywords: [], category: '娛樂' },
  // 聯合報娛樂（加強關鍵字比對）
  { url: 'https://udn.com/rssfeed/news/2/6638?ch=udn', source: '聯合報娛樂', keywords: ['娛樂', '演藝', '明星', '電影', '音樂', '戲劇', '藝人', '韓劇', '綜藝', '影視'], category: '娛樂' },

  // ── 運動（棒球＋籃球＋世棒賽等）────────────────────────────────────
  // ETtoday 運動：用主 RSS 加關鍵字過濾
  { url: 'https://www.ettoday.net/news/rss2.xml', source: 'ETtoday 運動', keywords: ['棒球', '籃球', '足球', 'MLB', 'NBA', '中職', '世界棒球', 'WBC', '運動', '體育', '賽事', '選手'], category: '運動' },
  { url: 'https://udn.com/rssfeed/news/2/5?ch=udn', source: '聯合報運動', keywords: [], category: '運動' },
  { url: 'https://feeds.bbci.co.uk/sport/rss.xml', source: 'BBC Sport', keywords: ['baseball', 'basketball', 'tennis', 'football', 'sport'], category: '運動' },
  // 自由時報體育
  { url: 'https://sports.ltn.com.tw/rss/news.xml', source: '自由體育', keywords: [], category: '運動' },

  // ── 生活 ─────────────────────────────────────────────────────────────
  { url: 'https://www.cna.com.tw/rss/aipl.aspx', source: '中央社生活', keywords: ['生活', '社會', '消費', '環境', '教育', '民生', '天氣'], category: '生活' },
  // 自由時報生活
  { url: 'https://news.ltn.com.tw/rss/life.xml', source: '自由生活', keywords: [], category: '生活' },
  // ETtoday 主 RSS 過濾生活
  { url: 'https://www.ettoday.net/news/rss2.xml', source: 'ETtoday 生活', keywords: ['生活', '消費', '購物', '美食', '天氣', '奇聞', '趣聞', '社會', '民眾'], category: '生活' },

  // ── 健康 ─────────────────────────────────────────────────────────────
  { url: 'https://health.gvm.com.tw/rss', source: '健康遠見', keywords: [], category: '健康' },
  { url: 'https://www.commonhealth.com.tw/rss/rss.action', source: '康健雜誌', keywords: [], category: '健康' },
  { url: 'https://health.ettoday.net/news/rss.xml', source: 'ETtoday健康', keywords: [], category: '健康' },
];

// ✅ 圖片黑名單：logo/icon/tracker 直接排除
const IMAGE_BLACKLIST = [
  'yahoo.com/images',
  'yahoo.com/news/images',
  's.yimg.com/os/mit/media',
  's.yimg.com/rz/l',
  'l.yimg.com',
  'media.zenfs.com/en/bloomberg',
  '1x1',
  'pixel',
  'track',
  'beacon',
  'spacer',
  'logo',
  '.gif',
  'udn.com/img/nophoto',
];

function isValidImage(url: string): boolean {
  if (!url || !url.startsWith('http')) return false;
  const lower = url.toLowerCase();
  return !IMAGE_BLACKLIST.some(bad => lower.includes(bad));
}

function extractImage(content: string): string {
  const mediaContent = content.match(/<media:content[^>]+url="([^"]+)"/i)?.[1];
  if (mediaContent && isValidImage(mediaContent) && mediaContent.match(/\.(jpg|jpeg|png|webp)/i)) return mediaContent;

  const mediaThumbnail = content.match(/<media:thumbnail[^>]+url="([^"]+)"/i)?.[1];
  if (mediaThumbnail && isValidImage(mediaThumbnail)) return mediaThumbnail;

  const enclosure = content.match(/<enclosure[^>]+url="([^"]+)"[^>]+type="image/i)?.[1];
  if (enclosure && isValidImage(enclosure)) return enclosure;

  const imgSrc = content.match(/<img[^>]+src="([^"]+)"/i)?.[1];
  if (imgSrc && isValidImage(imgSrc)) return imgSrc;

  return '';
}

function parseRSS(xml: string, source: string, keywords: string[], category: string) {
  const items: { title: string; link: string; pubDate: string; source: string; description: string; category: string; image: string; }[] = [];
  const itemMatches = xml.matchAll(/<item>([\s\S]*?)<\/item>/g);
  for (const match of itemMatches) {
    const content = match[1];
    const title = content.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/)?.[1] || content.match(/<title>(.*?)<\/title>/)?.[1] || '';
    const link = content.match(/<link>(.*?)<\/link>/)?.[1] || content.match(/<link\s[^>]*href="([^"]+)"/)?.[1] || '';
    const pubDate = content.match(/<pubDate>(.*?)<\/pubDate>/)?.[1] || '';
    const description = content.match(/<description><!\[CDATA\[([\s\S]*?)\]\]><\/description>/)?.[1] || content.match(/<description>([\s\S]*?)<\/description>/)?.[1] || '';
    const image = extractImage(content + description);
    if (keywords.length > 0) {
      const text = (title + description).toLowerCase();
      if (!keywords.some(k => text.includes(k.toLowerCase()))) continue;
    }
    if (title && link) {
      items.push({
        title: title.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/<[^>]+>/g, '').trim(),
        link, pubDate, source,
        description: description.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ').trim().slice(0, 150) + '...',
        category,
        image,
      });
    }
    if (items.length >= 8) break;
  }
  return items;
}

async function fetchOgImage(url: string): Promise<string> {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 5000);
    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0', 'Accept': 'text/html' }, signal: controller.signal });
    clearTimeout(timer);
    if (!res.ok) return '';
    const reader = res.body?.getReader();
    if (!reader) return '';
    let html = '';
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      html += new TextDecoder().decode(value);
      if (html.length > 10000) { reader.cancel(); break; }
    }
    const ogMatch =
      html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i) ||
      html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i);
    if (ogMatch?.[1] && isValidImage(ogMatch[1])) return ogMatch[1];

    const tw = html.match(/<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)["']/i);
    if (tw?.[1] && isValidImage(tw[1])) return tw[1];

    return '';
  } catch { return ''; }
}

export async function GET() {
  try {
    const allNews: { title: string; link: string; pubDate: string; source: string; description: string; category: string; image: string; }[] = [];
    await Promise.allSettled(
      RSS_FEEDS.map(async (feed) => {
        try {
          const controller = new AbortController();
          const timer = setTimeout(() => controller.abort(), 8000);
          const res = await fetch(feed.url, { headers: FETCH_HEADERS, signal: controller.signal, next: { revalidate: 3600 } });
          clearTimeout(timer);
          if (!res.ok) { console.warn('[ai-news] ' + feed.source + ' ' + res.status); return; }
          const xml = await res.text();
          const items = parseRSS(xml, feed.source, feed.keywords, feed.category);
          console.log('[ai-news] ' + feed.source + ' (' + feed.category + ') => ' + items.length + ' 則');
          allNews.push(...items);
        } catch (err) {
          console.warn('[ai-news] ' + feed.source + ' 失敗:', err instanceof Error ? err.message : err);
        }
      })
    );
    if (allNews.length === 0) return NextResponse.json({ news: [], error: '所有來源皆無法取得' });

    // 每分類最多取 10 則，避免某分類獨占版面
    const categories = ['AI', '財經', '娛樂', '運動', '生活', '健康'];
    const selected: typeof allNews = [];
    const seen = new Set<string>();
    for (const cat of categories) {
      const catItems = allNews.filter(i => i.category === cat)
        .sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime())
        .slice(0, 10);
      for (const item of catItems) {
        if (!seen.has(item.link)) { seen.add(item.link); selected.push(item); }
      }
    }
    selected.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());

    // 只對沒有圖片的新聞才去抓 og:image（節省時間）
    const noImg = selected.filter(i => !i.image);
    console.log('[ai-news] 需要補圖：' + noImg.length + ' 則');
    for (let i = 0; i < noImg.length; i += 10) {
      await Promise.allSettled(noImg.slice(i, i + 10).map(async item => {
        const img = await fetchOgImage(item.link);
        if (img) item.image = img;
      }));
    }

    return NextResponse.json({ news: selected });
  } catch (err) {
    console.error('[ai-news] 全域錯誤:', err);
    return NextResponse.json({ news: [] }, { status: 500 });
  }
}