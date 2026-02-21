// 📁 路徑：src/app/random/page.tsx

import { redirect } from "next/navigation";

export default function Random() {
  const pages = ["/tools", "/ai-news", "/novels", "/wall"];
  const random = pages[Math.floor(Math.random() * pages.length)];
  redirect(random);
}