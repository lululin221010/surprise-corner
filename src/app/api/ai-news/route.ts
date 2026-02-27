// 📁 路徑：src/app/api/ai-news/route.ts
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 3600;

const FETCH_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (compatible; SurpriseCornerBot/1.0; +https://surprise-corner.vercel.app)',
  'Accept': 'application/rss+xml, application/xml, text/xml, */*',
};

const RSS_FEEDS = [
  { url: 'https://www.theverge.com/rss/ai-artificial-intelligence/index.xml', source: 'The Verge', keywords: [], category: 'AI' },
  { url: 'https://feeds.bbci.co.uk/news/technology/rss.xml', source: 'BBC Tech', keywords: ['AI', 'robot', 'artificial intelligence'], category: 'AI' },
  { url: 'https://www.ithome.com.tw/rss', source: 'iThome', keywords: ['AI', '人工智慧', '機器學習', 'ChatGPT', 'Gemini'], category: 'AI' },
  { url: 'https://technews.tw/feed/', source: '科技新報', keywords: ['AI', '人工智慧', '科技'], category: 'AI' },
  { url: 'https://tw.stock.yahoo.com/rss', source: 'Yahoo 股市', keywords: [], category: '股市' },
  { url: 'https://money.udn.com/rssfeed/news/1001/5591?ch=money', source: '經濟日報股市', keywords: [], category: '股市' },
  { url: 'https://www.cna.com.tw/rss/aife.aspx', source: '中央社財經', keywords: ['股', '投資', '台積電', 'ETF'], category: '股市' },
];

// ✅ 圖片黑名單：這些是 logo/icon/tracker，不是新聞圖，直接排除
const IMAGE_BLACKLIST = [
  'yahoo.com/images',
  'yahoo.com/news/images',
  's.yimg.com/os/mit/media',   // Yahoo 品牌 logo
  's.yimg.com/rz/l',           // Yahoo 追蹤圖
  'l.yimg.com',
  'media.zenfs.com/en/bloomberg', // Bloomberg 小 icon
  '1x1',
  'pixel',
  'track',
  'beacon',
  'spacer',
  'logo',
  '.gif',
  'udn.com/img/nophoto',       // 聯合報無圖預設
];

// ✅ 判斷圖片是否有效（不在黑名單、長寬比合理）
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
        image, // 黑名單已過濾，空字串表示沒圖 → 前端顯示主題漸層
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
    const categories = ['AI', '股市', '美食', '旅遊'];
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

    // ✅ 只對沒有圖片的新聞才去抓 og:image（節省時間）
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