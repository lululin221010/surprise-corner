import type { NextConfig } from "next";

// 測試環境變數是否被載入
const nextConfig: NextConfig = {
  reactCompiler: true,
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
