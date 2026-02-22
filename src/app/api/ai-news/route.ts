// 📁 路徑：src/app/api/ai-news/route.ts
import { NextResponse } from 'next/server';

export const revalidate = 3600;

const RSS_FEEDS = [
  // 原本英文 AI 新聞
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
  // 中文科技新聞
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
  // 股市財經
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

function parseRSS(xml: string, source: string, keywords: string[]) {
  const items: { title: string; link: string; pubDate: string; source: string; description: string; category: string }[] = [];
  const itemMatches = xml.matchAll(/<item>([\s\S]*?)<\/item>/g);

  for (const match of itemMatches) {
    const content = match[1];
    const title = content.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/)?.[1]
      || content.match(/<title>(.*?)<\/title>/)?.[1] || '';
    const link = content.match(/<link>(.*?)<\/link>/)?.[1]
      || content.match(/<link\s[^>]*href="([^"]+)"/)?.[1] || '';
    const pubDate = content.match(/<pubDate>(.*?)<\/pubDate>/)?.[1] || '';
    const description = content.match(/<description><!\[CDATA\[(.*?)\]\]><\/description>/)?.[1]
      || content.match(/<description>(.*?)<\/description>/)?.[1] || '';

    if (keywords.length > 0) {
      const text = (title + description).toLowerCase();
      const hasKeyword = keywords.some(k => text.includes(k.toLowerCase()));
      if (!hasKeyword) continue;
    }

    if (title && link) {
      items.push({
        title: title.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/<[^>]+>/g, ''),
        link,
        pubDate,
        source,
        description: description.replace(/<[^>]+>/g, '').slice(0, 120) + '...',
        category: SOURCE_CATEGORY[source] || 'AI',
      });
    }
    if (items.length >= 6) break;
  }
  return items;
}

export async function GET() {
  try {
    const allNews: { title: string; link: string; pubDate: string; source: string; description: string; category: string }[] = [];

    await Promise.allSettled(
      RSS_FEEDS.map(async (feed) => {
        try {
          const res = await fetch(feed.url, { next: { revalidate: 3600 } });
          const xml = await res.text();
          const items = parseRSS(xml, feed.source, feed.keywords);
          allNews.push(...items);
        } catch {}
      })
    );

    allNews.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
    return NextResponse.json({ news: allNews.slice(0, 20) });
  } catch {
    return NextResponse.json({ news: [] }, { status: 500 });
  }
}