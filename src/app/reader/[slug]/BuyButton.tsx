'use client';

export default function BuyButton({ href, className }: { href: string; className: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={() => (window as any).gtag?.('event', 'click_to_ST', { event_category: 'outbound', source: 'reader' })}
    >
      前往購買 →
    </a>
  );
}
