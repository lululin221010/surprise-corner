// 📄 路徑：src/app/classroom/brain-universe/autonomic/layout.tsx
export const metadata = {
  title: '自律神經學系 | 腦中宇宙書院 | 驚喜學院',
  description: '3冊系列・從失調症狀到找回平衡。購買電子書解鎖完整課程，試讀請先到好康書院。',
  openGraph: {
    title: '自律神經學系 | 驚喜學院',
    description: '你去看醫生，他說你沒事。但你真的不舒服——這堂課是寫給你的。',
    siteName: '驚喜角落',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
