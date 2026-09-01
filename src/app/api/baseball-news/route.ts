// 📁 路徑：src/app/api/baseball-news/route.ts
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 7200; // 2小時更新一次

const FETCH_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (compatible; SurpriseCornerBot/1.0; +https://surprise-corner.vercel.app)',
  'Accept': 'application/rss+xml, application/xml, text/xml, */*',
};

const RSS_FEEDS = [
  {
    url: 'https://www.tsna.com.tw/rss.xml',
    source: 'TSNA',
    keywords: [],
  },
  {
    url: 'https://sports.yahoo.com/mlb/rss.xml',
    source: 'Yahoo MLB',
    keywords: [],
  },
  {
    url: 'https://www.mlb.com/feeds/news/rss.xml',
    source: 'MLB官網',
    keywords: [],
  },
  {
    url: 'https://technews.tw/feed/',
    source: '科技新報',
    keywords: ['棒球', 'WBC', 'MLB', '中職', '世界棒球'],
  },
  {
    url: 'https://feeds.bbci.co.uk/sport/baseball/rss.xml',
    source: 'BBC Sport',
    keywords: [],
  },
  {
    url: 'https://www.udn.com/rssfeed/news/2/SPORT?ch=news',
    source: '聯合新聞網',
    keywords: ['棒球', 'WBC', 'MLB', '中職', '台灣隊'],
  },
];

// 防SSRF：只允許http/https，排除內網/雲端metadata常見位址範圍
function isSafeUrl(urlStr: string): boolean {
  try {
    const url = new URL(urlStr);
    if (url.protocol !== 'http:' && url.protocol !== 'https:') return false;
    const host = url.hostname.toLowerCase();
    if (host === 'localhost' || host === '0.0.0.0' || host === '::1') return false;
    if (
      /^127\./.test(host) ||
      /^10\./.test(host) ||
      /^192\.168\./.test(host) ||
      /^172\.(1[6-9]|2\d|3[01])\./.test(host) ||
      /^169\.254\./.test(host) ||
      host.startsWith('fc') || host.startsWith('fd')
    ) {
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

async function fetchOgImage(url: string): Promise<string> {
  if (!isSafeUrl(url)) return '';
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 5000);
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0', 'Accept': 'text/html' },
      signal: controller.signal,
    });
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
    const ogMatch = html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i)
      || html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i);
    if (ogMatch?.[1]) {
      const img = ogMatch[1];
      if (!img.includes('1x1') && !img.includes('pixel') && !img.includes('track') && img.startsWith('http')) return img;
    }
    const twitterMatch = html.match(/<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)["']/i);
    if (twitterMatch?.[1]?.startsWith('http')) return twitterMatch[1];
    return '';
  } catch {
    return '';
  } finally {
    clearTimeout(timer);
  }
}

function parseRSS(xml: string, source: string, keywords: string[]) {
  const items: {
    title: string; link: string; pubDate: string;
    source: string; description: string; image: string;
  }[] = [];

  const itemMatches = xml.matchAll(/<item>([\s\S]*?)<\/item>/g);
  for (const match of itemMatches) {
    const content = match[1];
    const title = content.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/)?.[1]
      || content.match(/<title>(.*?)<\/title>/)?.[1] || '';
    const link = content.match(/<link>(.*?)<\/link>/)?.[1]
      || content.match(/<link\s[^>]*href="([^"]+)"/)?.[1] || '';
    const pubDate = content.match(/<pubDate>(.*?)<\/pubDate>/)?.[1] || '';
    const description = content.match(/<description><!\[CDATA\[([\s\S]*?)\]\]><\/description>/)?.[1]
      || content.match(/<description>([\s\S]*?)<\/description>/)?.[1] || '';

    // 圖片
    const mediaContent = content.match(/<media:content[^>]+url="([^"]+)"/i)?.[1];
    const mediaThumbnail = content.match(/<media:thumbnail[^>]+url="([^"]+)"/i)?.[1];
    const imgSrc = (content + description).match(/<img[^>]+src="([^"]+)"/i)?.[1];
    const image = (mediaContent || mediaThumbnail || imgSrc || '')
      .replace(/&amp;/g, '&');

    if (keywords.length > 0) {
      const text = (title + description).toLowerCase();
      if (!keywords.some(k => text.includes(k.toLowerCase()))) continue;
    }

    if (title && link) {
      items.push({
        title: title.replace(/&amp;/g, '&').replace(/<[^>]+>/g, '').trim(),
        link,
        pubDate,
        source,
        description: description.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ').trim().slice(0, 150) + '...',
        image,
      });
    }
    if (items.length >= 8) break;
  }
  return items;
}

export async function GET() {
  try {
    const allNews: { title: string; link: string; pubDate: string; source: string; description: string; image: string; }[] = [];

    await Promise.allSettled(
      RSS_FEEDS.map(async (feed) => {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), 8000);
        try {
          const res = await fetch(feed.url, { headers: FETCH_HEADERS, signal: controller.signal });
          if (!res.ok) return;
          let xml = await res.text();
          if (xml.length > 5_000_000) xml = xml.slice(0, 5_000_000); // 異常巨大回應防呆
          const items = parseRSS(xml, feed.source, feed.keywords);
          allNews.push(...items);
        } catch (err) {
          console.warn(`[baseball] ${feed.source} 失敗:`, err instanceof Error ? err.message : err);
        } finally {
          clearTimeout(timer);
        }
      })
    );

    allNews.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());

    const top30 = allNews.slice(0, 30);

    // 補抓 og:image
    const noImg = top30.filter(i => !i.image);
    for (let i = 0; i < noImg.length; i += 10) {
      await Promise.allSettled(
        noImg.slice(i, i + 10).map(async item => {
          const img = await fetchOgImage(item.link);
          if (img) item.image = img;
        })
      );
    }

    if (top30.length === 0) return NextResponse.json({ news: [], error: '無法取得棒球新聞' });
    return NextResponse.json({ news: top30 });
  } catch (err) {
    console.error('[baseball] 錯誤:', err);
    return NextResponse.json({ news: [] }, { status: 500 });
  }
}