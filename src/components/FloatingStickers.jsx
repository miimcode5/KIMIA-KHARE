import React from 'react';

const STICKERS = [
  { text: '۲۲', top: '8%', right: '5%', delay: '0s', size: 'text-4xl font-display text-purple-400/25' },
  { text: '🎂', top: '20%', left: '6%', delay: '1.2s', size: 'text-3xl opacity-25' },
  { text: '🕶️', top: '42%', right: '3%', delay: '0.7s', size: 'text-3xl opacity-20' },
  { text: '✨', top: '58%', left: '4%', delay: '2.1s', size: 'text-3xl opacity-25' },
  { text: '👑', top: '75%', right: '6%', delay: '1.5s', size: 'text-4xl opacity-20' },
  { text: '💜', top: '88%', left: '8%', delay: '0.4s', size: 'text-3xl opacity-25' },
  { text: '☕', top: '32%', left: '12%', delay: '1.9s', size: 'text-2xl opacity-20' },
  { text: '۲۲', top: '65%', right: '11%', delay: '2.5s', size: 'text-5xl font-display text-pink-400/20' },
];

export default function FloatingStickers() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none">
      {/* Ambient neon blobs */}
      <div className="absolute -top-40 -right-32 h-96 w-96 rounded-full bg-purple-600/20 blur-[120px]" />
      <div className="absolute top-1/3 -left-32 h-96 w-96 rounded-full bg-fuchsia-600/15 blur-[130px]" />
      <div className="absolute bottom-0 right-1/4 h-80 w-80 rounded-full bg-amber-400/10 blur-[120px]" />

      {STICKERS.map((s, idx) => (
        <div
          key={idx}
          style={{ top: s.top, right: s.right, left: s.left, animationDelay: s.delay }}
          className={`absolute ${s.size} ${idx % 2 === 0 ? 'animate-float-slow' : 'animate-float-reverse'}`}
        >
          {s.text}
        </div>
      ))}
    </div>
  );
}
