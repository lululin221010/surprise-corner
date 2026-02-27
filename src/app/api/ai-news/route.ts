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
  { url: 'https://www.cna.com.tw/rss/alife.aspx', source: '中央社美食', keywords: ['美食', '餐廳', '料理', '小吃', '飲食', '吃'], category: '美食' },
  { url: 'https://udn.com/rssfeed/news/2/life?ch=news', source: '聯合新聞美食', keywords: ['美食', '餐廳', '料理', '小吃'], category: '美食' },
  { url: 'https://www.cna.com.tw/rss/alife.aspx', source: '中央社旅遊', keywords: ['旅遊', '旅行', '景點', '飯店', '出國', '觀光'], category: '旅遊' },
  { url: 'https://udn.com/rssfeed/news/2/life?ch=news', source: '聯合新聞旅遊', keywords: ['旅遊', '旅行', '景點', '飯店', '出國'], category: '旅遊' },
];

function extractImage(content: string): string {
  const mediaContent = content.match(/<media:content[^>]+url="([^"]+)"/i)?.[1];
  if (mediaContent && mediaContent.match(/\.(jpg|jpeg|png|webp|gif)/i)) return mediaContent;
  const mediaThumbnail = content.match(/<media:thumbnail[^>]+url="([^"]+)"/i)?.[1];
  if (mediaThumbnail) return mediaThumbnail;
  const enclosure = content.match(/<enclosure[^>]+url="([^"]+)"[^>]+type="image/i)?.[1];
  if (enclosure) return enclosure;
  const imgSrc = content.match(/<img[^>]+src="([^"]+)"/i)?.[1];
  if (imgSrc && !imgSrc.includes('pixel') && !imgSrc.includes('1x1')) return imgSrc;
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
    const ogMatch = html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i) || html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i);
    if (ogMatch?.[1]) {
      const img = ogMatch[1];
      if (!img.includes('1x1') && !img.includes('pixel') && !img.includes('track') && img.startsWith('http')) return img;
    }
    const tw = html.match(/<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)["']/i);
    if (tw?.[1]?.startsWith('http')) return tw[1];
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
      const catItems = allNews.filter(i => i.category === cat).sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()).slice(0, 10);
      for (const item of catItems) {
        if (!seen.has(item.link)) { seen.add(item.link); selected.push(item); }
      }
    }
    selected.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
    const noImg = selected.filter(i => !i.image);
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

