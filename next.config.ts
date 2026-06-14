import type { NextConfig } from "next";

// 測試環境變數是否被載入
console.log('========================================');
console.log('Next.js Config 載入時的環境變數測試:');
console.log('MONGODB_URI 存在?', !!process.env.MONGODB_URI);
console.log('MONGODB_URI 前20字:', process.env.MONGODB_URI?.substring(0, 20));
console.log('所有環境變數 keys:', Object.keys(process.env).slice(0, 10));
console.log('========================================');

const nextConfig: NextConfig = {
  reactCompiler: true,
};

export default nextConfig;