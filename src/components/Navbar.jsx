import React from 'react';
import { Volume2, VolumeX, Sparkles, PartyPopper, Type } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundFX } from '../utils/sound';

export default function Navbar({ soundEnabled, onToggleSound, fontLabel, onCycleFont }) {
  const triggerParty = () => {
    soundFX.playFanfare();
    confetti({
      particleCount: 90,
      spread: 80,
      origin: { y: 0.2 },
      colors: ['#a855f7', '#ec4899', '#facc15', '#38bdf8', '#ffffff'],
    });
  };

  return (
    <header className="sticky top-0 z-50 border-b-4 border-black bg-[#170b33]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <a
          href="#top"
          onClick={() => soundFX.playPop()}
          className="flex items-center gap-2.5 group"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl border-2 border-black bg-gradient-to-br from-purple-500 to-pink-500 text-xl shadow-[3px_3px_0_#000] transition-transform group-hover:rotate-12">
            🎂
          </span>
          <div>
            <span className="font-display text-2xl tracking-wide text-yellow-300 text-stroke-sm">
              کیمیاگرام ۲۲
            </span>
            <span className="font-paytakht hidden sm:block text-[11px] font-bold text-purple-300">
              آژانس رسمی شوخی و تولد کیمیا باقری
            </span>
          </div>
        </a>

        <nav className="hidden lg:flex items-center gap-2 text-sm font-bold">
          {[
            { href: '#gallery', label: '📁 پرونده‌ها' },
            { href: '#meme-studio', label: '🎨 میم‌ساز' },
            { href: '#wheel', label: '🎡 گردونه شانس' },
            { href: '#quiz', label: '🧠 تست شخصیت' },
            { href: '#game', label: '🎮 کیک‌قاپون' },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => soundFX.playPop()}
              className="rounded-xl border-2 border-transparent px-3 py-1.5 text-purple-100 transition hover:border-black hover:bg-purple-600/40 hover:text-yellow-300"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={onCycleFont}
            title="تغییر فونت تیترهای سایت (font1)"
            className="flex items-center gap-1.5 rounded-xl border-2 border-black bg-fuchsia-700/90 px-3 py-2 text-xs font-bold text-yellow-200 shadow-[3px_3px_0_#000] transition active:translate-y-0.5 hover:bg-fuchsia-600 cursor-pointer"
          >
            <Type className="h-4 w-4 text-yellow-300" />
            <span className="hidden sm:inline">فونت: {fontLabel}</span>
          </button>

          <button
            onClick={onToggleSound}
            title={soundEnabled ? 'قطع صدا' : 'روشن کردن صدا'}
            className="flex items-center gap-1.5 rounded-xl border-2 border-black bg-purple-900/80 px-3 py-2 text-xs font-bold text-purple-100 shadow-[3px_3px_0_#000] transition active:translate-y-0.5 hover:bg-purple-800 cursor-pointer"
          >
            {soundEnabled ? <Volume2 className="h-4 w-4 text-emerald-400" /> : <VolumeX className="h-4 w-4 text-rose-400" />}
            <span className="hidden sm:inline">{soundEnabled ? 'صدا فعاله' : 'بی‌صدا'}</span>
          </button>

          <button
            onClick={triggerParty}
            className="flex items-center gap-1.5 rounded-xl border-2 border-black bg-gradient-to-r from-yellow-400 to-amber-400 px-3.5 py-2 text-xs sm:text-sm font-black text-black shadow-[3px_3px_0_#000] transition hover:-translate-y-0.5 active:translate-y-0.5 cursor-pointer"
          >
            <PartyPopper className="h-4 w-4" />
            <span>بترکون!</span>
            <Sparkles className="h-3.5 w-3.5 hidden sm:inline" />
          </button>
        </div>
      </div>
    </header>
  );
}
