'use client';

import dynamic from 'next/dynamic';

const TarotGame = dynamic(
  () => import('../../components/tarot/TarotGame'),
  { ssr: false }
);

export default function TarotPage() {
  return <TarotGame />;
}
