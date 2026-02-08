// 📄 檔案路徑：src/app/robots.ts
// 功能：自動生成 robots.txt for SEO

import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://surprise-corner.vercel.app';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: '/admin/',
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}