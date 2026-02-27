// 📁 路徑：src/app/api/ai-news/route.ts
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'; // ✅ 每次都重新抓，不快取失敗結果
export const revalidate = 3600;

// ✅ 加上瀏覽器 User-Agent，避免被 RSS 來源封鎖
const FETCH_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (compatible; SurpriseCornerBot/1.0; +https://surprise-corner.vercel.app)',
  'Accept': 'application/rss+xml, application/xml, text/xml, */*',
};

const RSS_FEEDS = [
  {
    url: 'https://www.theverge.com/rss/ai-artificial-intelligence/index.xml',
    source: 'The Verge',
    keywords: [],
    category: 'AI',
  },
  {
    url: 'https://feeds.bbci.co.uk/news/technology/rss.xml',
    source: 'BBC Tech',
    keywords: ['AI', 'robot', 'artificial intelligence'],
    category: 'AI',
  },
  {
    url: 'https://www.ithome.com.tw/rss',
    source: 'iThome',
    keywords: ['AI', '人工智慧', '機器學習', 'ChatGPT', 'Gemini'],
    category: 'AI',
  },
  {
    url: 'https://technews.tw/feed/',
    source: '科技新報',
    keywords: ['AI', '人工智慧', '科技', '投資'],
    category: 'AI',
  },
  {
    url: 'https://news.cnyes.com/rss/cat/tw_stock',
    source: '鉅亨網',
    keywords: [],
    category: '股市',
  },
  {
    url: 'https://feeds.feedburner.com/moneydjrss',
    source: 'MoneyDJ',
    keywords: [],
    category: '股市',
  },
];

const SOURCE_CATEGORY: Record<string, string> = {
  'The Verge': 'AI',
  'BBC Tech': 'AI',
  'iThome': 'AI',
  '科技新報': 'AI',
  '鉅亨網': '股市',
  'MoneyDJ': '股市',
};

function extractImage(content: string): string {
  const mediaContent = content.match(/<media:content[^>]+url="([^"]+)"/i)?.[1];
  if (mediaContent && mediaContent.match(/\.(jpg|jpeg|png|webp|gif)/i)) return mediaContent;

  const mediaThumbnail = content.match(/<media:thumbnail[^>]+url="([^"]+)"/i)?.[1];
  if (mediaThumbnail) return mediaThumbnail;

  const enclosure = content.match(/<enclosure[^>]+url="([^"]+)"[^>]+type="image/i)?.[1];
  if (enclosure) return enclosure;

  const imgSrc = content.match(/<img[^>]+src="([^"]+)"/i)?.[1];
  if (imgSrc && !imgSrc.includes('pixel') && !imgSrc.includes('1x1')) return imgSrc;

  const ogImage = content.match(/image[^>]*>([^<]+)/i)?.[1]?.trim();
  if (ogImage && ogImage.startsWith('http')) return ogImage;

  return '';
}

function parseRSS(xml: string, source: string, keywords: string[]) {
  const items: {
    title: string;
    link: string;
    pubDate: string;
    source: string;
    description: string;
    category: string;
    image: string;
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

    const image = extractImage(content + description);

    if (keywords.length > 0) {
      const text = (title + description).toLowerCase();
      const hasKeyword = keywords.some(k => text.includes(k.toLowerCase()));
      if (!hasKeyword) continue;
    }

    if (title && link) {
      items.push({
        title: title.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/<[^>]+>/g, '').trim(),
        link,
        pubDate,
        source,
        description: description.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ').trim().slice(0, 150) + '...',
        category: SOURCE_CATEGORY[source] || 'AI',
        image,
      });
    }
    if (items.length >= 6) break;
  }
  return items;
}

// ✅ 從文章頁面抓 og:image（排除廣告追蹤圖、1x1像素）
async function fetchOgImage(url: string): Promise<string> {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 5000); // 最多等 5 秒

    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; SurpriseCornerBot/1.0)',
        'Accept': 'text/html',
      },
      signal: controller.signal,
    });
    clearTimeout(timer);

    if (!res.ok) return '';

    // 只讀前 10KB，og:image 一定在 <head> 裡，不需要整頁
    const reader = res.body?.getReader();
    if (!reader) return '';
    let html = '';
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      html += new TextDecoder().decode(value);
      if (html.length > 10000) { reader.cancel(); break; }
    }

    // 抓 og:image
    const ogMatch = html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i)
      || html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i);
    if (ogMatch?.[1]) {
      const img = ogMatch[1];
      // 過濾廣告像素圖、太小的圖、追蹤用圖
      if (!img.includes('1x1') && !img.includes('pixel') && !img.includes('track') && img.startsWith('http')) {
        return img;
      }
    }

    // 備援：twitter:image
    const twitterMatch = html.match(/<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)["']/i);
    if (twitterMatch?.[1]?.startsWith('http')) return twitterMatch[1];

    return '';
  } catch {
    return '';
  }
}

export async function GET() {
  try {
    const allNews: {
      title: string;
      link: string;
      pubDate: string;
      source: string;
      description: string;
      category: string;
      image: string;
    }[] = [];

    await Promise.allSettled(
      RSS_FEEDS.map(async (feed) => {
        try {
          const controller = new AbortController();
          const timer = setTimeout(() => controller.abort(), 8000);

          const res = await fetch(feed.url, {
            headers: FETCH_HEADERS,
            signal: controller.signal,
            next: { revalidate: 3600 },
          });
          clearTimeout(timer);

          if (!res.ok) {
            console.warn(`[ai-news] ${feed.source} 回應 ${res.status}`);
            return;
          }

          const xml = await res.text();
          const items = parseRSS(xml, feed.source, feed.keywords);
          console.log(`[ai-news] ${feed.source} 抓到 ${items.length} 則`);
          allNews.push(...items);
        } catch (err) {
          console.warn(`[ai-news] ${feed.source} 失敗:`, err instanceof Error ? err.message : err);
        }
      })
    );

    allNews.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());

    if (allNews.length === 0) {
      return NextResponse.json({ news: [], error: '所有來源皆無法取得' }, { status: 200 });
    }

    const top30 = allNews.slice(0, 30);

    // ✅ 對沒有圖片的文章，並行去抓 og:image（最多同時 10 篇，避免超時）
    const noImageItems = top30.filter(item => !item.image);
    const chunks = [];
    for (let i = 0; i < noImageItems.length; i += 10) {
      chunks.push(noImageItems.slice(i, i + 10));
    }
    for (const chunk of chunks) {
      await Promise.allSettled(
        chunk.map(async (item) => {
          const img = await fetchOgImage(item.link);
          if (img) {
            item.image = img;
            console.log(`[ai-news] og:image 補抓成功: ${item.source} - ${img.slice(0, 60)}`);
          }
        })
      );
    }

    return NextResponse.json({ news: top30 });
  } catch (err) {
    console.error('[ai-news] 全域錯誤:', err);
    return NextResponse.json({ news: [] }, { status: 500 });
  }
}