// 📁 路徑：src/app/random/page.tsx

'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Random() {
  const router = useRouter();
  useEffect(() => {
    const pages = ['/tools', '/ai-news', '/novels', '/wall'];
    const random = pages[Math.floor(Math.random() * pages.length)];
    router.replace(random);
  }, [router]);
  return null;
}