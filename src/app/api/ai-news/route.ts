// 📁 路徑：src/app/api/ai-news/route.ts
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 3600;

const FETCH_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (compatible; SurpriseCornerBot/1.0; +https://surprise-corner.vercel.app)',
  'Accept': 'application/rss+xml, application/xml, text/xml, */*',
};

const RSS_FEEDS = [
  // ── AI 科技 ──
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
    keywords: ['AI', '人工智慧', '科技'],
    category: 'AI',
  },
  // ── 股市 ──
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
  // ── 美食 ──
  {
    url: 'https://feeds.feedburner.com/etoday/food',
    source: 'ETtoday 美食',
    keywords: [],
    category: '美食',
  },
  {
    url: 'https://www.agriharvest.tw/feed',
    source: '上下游',
    keywords: ['美食', '餐廳', '小吃', '料理', '食物', '飲食'],
    category: '美食',
  },
  // ── 旅遊 ──
  {
    url: 'https://feeds.feedburner.com/etoday/travel',
    source: 'ETtoday 旅遊',
    keywords: [],
    category: '旅遊',
  },
  {
    url: 'https://www.ttnews.com.tw/rss.xml',
    source: 'TTNews 旅報',
    keywords: [],
    category: '旅遊',
  },
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

  const ogImage = content.match(/image[^>]*>([^<]+)/i)?.[1]?.trim();
  if (ogImage && ogImage.startsWith('http')) return ogImage;

  return '';
}

// ✅ 修正：直接傳入 category，不再透過 SOURCE_CATEGORY 查表（避免股市變 AI 的 bug）
function parseRSS(xml: string, source: string, keywords: string[], category: string) {
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
        category, // ✅ 直接用傳入的 category，100% 正確
        image,
      });
    }
    if (items.length >= 6) break;
  }
  return items;
}

async function fetchOgImage(url: string): Promise<string> {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 5000);

    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; SurpriseCornerBot/1.0)',
        'Accept': 'text/html',
      },
      signal: controller.signal,
    });
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

    const ogMatch = html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i)
      || html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i);
    if (ogMatch?.[1]) {
      const img = ogMatch[1];
      if (!img.includes('1x1') && !img.includes('pixel') && !img.includes('track') && img.startsWith('http')) {
        return img;
      }
    }

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
          // ✅ 傳入 feed.category
          const items = parseRSS(xml, feed.source, feed.keywords, feed.category);
          console.log(`[ai-news] ${feed.source} (${feed.category}) 抓到 ${items.length} 則`);
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

    const top40 = allNews.slice(0, 40); // 來源變多，取 40 則

    const noImageItems = top40.filter(item => !item.image);
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
          }
        })
      );
    }

    return NextResponse.json({ news: top40 });
  } catch (err) {
    console.error('[ai-news] 全域錯誤:', err);
    return NextResponse.json({ news: [] }, { status: 500 });
  }
}