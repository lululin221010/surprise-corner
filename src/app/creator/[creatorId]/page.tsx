'use client';
// 📁 路徑：src/app/creator/[creatorId]/page.tsx
// ✅ 創作者頁面已移除，自動導向作品牆

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CreatorPage() {
  const router = useRouter();
  useEffect(() => { router.replace('/wall'); }, [router]);
  return null;
}