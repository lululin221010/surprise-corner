// 📄 檔案路徑：src/app/api/ai-news/route.ts
// 功能：抓取 AI 科技 RSS 新聞

import { NextResponse } from 'next/server';

export const revalidate = 3600; // 每小時更新一次

const RSS_FEEDS = [
  {
    url: 'https://feeds.feedburner.com/TechCrunch/',
    source: 'TechCrunch',
    keywords: ['AI', 'artificial intelligence', 'robot', 'machine learning', 'ChatGPT', 'OpenAI', 'Anthropic', 'Gemini'],
  },
  {
    url: 'https://www.theverge.com/rss/ai-artificial-intelligence/index.xml',
    source: 'The Verge',
    keywords: [],
  },
  {
    url: 'https://feeds.bbci.co.uk/news/technology/rss.xml',
    source: 'BBC Tech',
    keywords: ['AI', 'robot', 'artificial intelligence'],
  },
];

function parseRSS(xml: string, source: string, keywords: string[]) {
  const items: { title: string; link: string; pubDate: string; source: string; description: string }[] = [];
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

    // 如果有關鍵字過濾，只要標題或描述包含關鍵字
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
      });
    }

    if (items.length >= 5) break;
  }

  return items;
}

export async function GET() {
  try {
    const allNews: { title: string; link: string; pubDate: string; source: string; description: string }[] = [];

    await Promise.allSettled(
      RSS_FEEDS.map(async (feed) => {
        try {
          const res = await fetch(feed.url, { next: { revalidate: 3600 } });
          const xml = await res.text();
          const items = parseRSS(xml, feed.source, feed.keywords);
          allNews.push(...items);
        } catch {
          // 單一來源失敗不影響其他
        }
      })
    );

    // 依時間排序
    allNews.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());

    return NextResponse.json({ news: allNews.slice(0, 15) });
  } catch {
    return NextResponse.json({ news: [] }, { status: 500 });
  }
}