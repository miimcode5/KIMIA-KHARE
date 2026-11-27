import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, Flame, Wind, ScanFace, ArrowDown } from 'lucide-react';
import { soundFX } from '../utils/sound';

const WISH_ROASTS = [
  'آرزو ثبت شد: یک سال پر از کیکِ بنفش، کافه‌های بی‌حساب و صفر درصد آدمِ رو مخ! 💜',
  'آرزو ثبت شد: هر وقت مثل عکس ۱ نگاه کردی، طرف مقابل خودش بیاد حقیقت رو اعتراف کنه! 😎',
  'آرزو ثبت شد: ۲۲ سالگیت پر از پول، سلامتی و فتوشوت‌های باکلاس حتی وسط بوته‌های خیابون! 🌿',
  'آرزو ثبت شد: همیشه همین‌قدر باکلاس، خوش‌خنده و رفیقِ پایه بمونی کیمیا! 🎉',
];

const IMG_BASE = `${import.meta.env.BASE_URL}images`;

const HERO_CARDS = [
  {
    src: `${IMG_BASE}/kimia-6.jpg`,
    tag: 'فازِ فیلسوفِ ۲۲ ساله 🤔',
    rotate: -3,
  },
  {
    src: `${IMG_BASE}/kimia-1.jpg`,
    tag: 'رییس کل حراست عینکی 🕶️',
    rotate: 3,
  },
  {
    src: `${IMG_BASE}/kimia-5.jpg`,
    tag: 'ملکه خونسردی تولد 👑',
    rotate: -2,
  },
];

export default function HeroSection() {
  const [candlesLit, setCandlesLit] = useState(true);
  const [wishIdx, setWishIdx] = useState(0);
  const [scanning, setScanning] = useState(false);
  const [scanDone, setScanDone] = useState(false);
  const [activeCard, setActiveCard] = useState(0);

  const handleBlowCandles = () => {
    if (candlesLit) {
      soundFX.playBlow();
      setTimeout(() => soundFX.playFanfare(), 250);
      setCandlesLit(false);
      setWishIdx((prev) => (prev + 1) % WISH_ROASTS.length);
      confetti({
        particleCount: 110,
        spread: 95,
        origin: { y: 0.55 },
        colors: ['#c084fc', '#f472b6', '#facc15', '#ffffff'],
      });
    } else {
      soundFX.playPop();
      setCandlesLit(true);
    }
  };

  const handleScan = () => {
    soundFX.playLaser();
    setScanning(true);
    setScanDone(false);
    setActiveCard(1); // Switch to Kimia-1 serious face for scan
    setTimeout(() => {
      setScanning(false);
      setScanDone(true);
      soundFX.playCoin();
    }, 1800);
  };

  const cycleCard = () => {
    soundFX.playBoing();
    setActiveCard((prev) => (prev + 1) % HERO_CARDS.length);
    setScanDone(false);
  };

  return (
    <section id="top" className="relative z-10 overflow-hidden px-4 pt-8 pb-16 sm:px-6 lg:pt-14 lg:pb-20">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-12">
        {/* Text & Interactive Cake Column */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7 space-y-6 text-center lg:text-right"
        >
          <div className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-2 rounded-full border-2 border-black bg-purple-600 px-4 py-1.5 text-xs sm:text-sm font-extrabold text-yellow-300 shadow-[4px_4px_0_#000]">
            <Sparkles className="h-4 w-4 animate-spin" style={{ animationDuration: '4s' }} />
            <span>سایت رسمی شوخی، تجلیل و اسناد محرمانه ۲۲ سالگی</span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl leading-[1.15] tracking-tight text-white drop-shadow-[0_4px_0_#000]">
            پروژه فوق‌سریِ{' '}
            <span className="inline-block -rotate-2 rounded-2xl border-4 border-black bg-gradient-to-l from-fuchsia-500 via-purple-500 to-indigo-500 px-4 py-1 text-yellow-300 shadow-[6px_6px_0_#000]">
              کیمیا باقری
            </span>
            <br />
            <span className="text-3xl sm:text-5xl text-purple-200">
              ۲۲ سالِ تمام با نگاهِ «حوصله ندارم!» 😎🎂
            </span>
          </h1>

          <p className="mx-auto lg:mx-0 max-w-2xl text-base sm:text-lg leading-relaxed text-purple-100/90 font-medium">
            خوش اومدی به موزه‌ی دیجیتال ۶ عکسِ تاریخی کیمیا باقری! از ژستِ{' '}
            <span className="text-yellow-300 font-bold">«رییس حراست با تیشرت راه‌راه»</span> تا{' '}
            <span className="text-pink-300 font-bold">«تأمل فیلسوفانه روی کیکِ بنفشِ ۲۲»</span> — این پایین پر از بازی، میم‌ساز، گردونه‌ی شانس و شوخی‌های باحاله!
          </p>

          {/* Interactive SVG Purple Cake Box */}
          <div className="mx-auto lg:mx-0 max-w-xl rounded-3xl border-4 border-black bg-[#1d0f3d] p-5 comic-shadow-purple">
            <div className="flex flex-col sm:flex-row items-center gap-5">
              {/* Custom SVG Animated Purple 22 Cake */}
              <div className="relative flex-shrink-0">
                <svg viewBox="0 0 180 155" className="h-36 w-40 drop-shadow-[0_6px_0_rgba(0,0,0,0.6)]">
                  {/* Plate */}
                  <ellipse cx="90" cy="140" rx="76" ry="11" fill="#f8fafc" stroke="#000" strokeWidth="3" />
                  {/* Cake Body */}
                  <path d="M30 82 L30 132 Q90 146 150 132 L150 82 Z" fill="#c4b5fd" stroke="#000" strokeWidth="3" />
                  {/* Frosting Swags */}
                  <path
                    d="M30 92 Q50 112 70 92 Q90 112 110 92 Q130 112 150 92"
                    fill="none"
                    stroke="#fdf4ff"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                  {/* Cake Top */}
                  <ellipse cx="90" cy="82" rx="60" ry="14" fill="#ddd6fe" stroke="#000" strokeWidth="3" />
                  {/* Piping dots */}
                  {[42, 60, 78, 96, 114, 132].map((cx, i) => (
                    <circle key={i} cx={cx} cy={133} r="5" fill="#fff" stroke="#000" strokeWidth="1.5" />
                  ))}
                  {/* Purple flower */}
                  <circle cx="132" cy="79" r="7" fill="#9333ea" stroke="#000" strokeWidth="2" />
                  <circle cx="137" cy="83" r="5" fill="#c084fc" stroke="#000" strokeWidth="1.5" />

                  {/* Candles "2" and "2" */}
                  <g transform="translate(58, 36)">
                    <rect x="0" y="16" width="18" height="28" rx="4" fill="#fbbf24" stroke="#000" strokeWidth="2.5" />
                    <text x="9" y="37" textAnchor="middle" fontSize="22" fontWeight="900" fill="#1e1b4b">
                      2
                    </text>
                    {candlesLit ? (
                      <g className="animate-flicker" style={{ transformOrigin: '9px 14px' }}>
                        <path d="M9 0 C14 7 14 14 9 16 C4 14 4 7 9 0 Z" fill="#f97316" />
                        <path d="M9 5 C12 9 12 14 9 15 C6 14 6 9 9 5 Z" fill="#fde047" />
                      </g>
                    ) : (
                      <motion.path
                        initial={{ opacity: 0.9, y: 0 }}
                        animate={{ opacity: 0, y: -16 }}
                        transition={{ duration: 1.2, repeat: Infinity }}
                        d="M9 12 Q4 5 11 0"
                        stroke="#cbd5e1"
                        strokeWidth="2.5"
                        fill="none"
                      />
                    )}
                  </g>

                  <g transform="translate(96, 36)">
                    <rect x="0" y="16" width="18" height="28" rx="4" fill="#38bdf8" stroke="#000" strokeWidth="2.5" />
                    <text x="9" y="37" textAnchor="middle" fontSize="22" fontWeight="900" fill="#1e1b4b">
                      2
                    </text>
                    {candlesLit ? (
                      <g className="animate-flicker" style={{ transformOrigin: '9px 14px', animationDelay: '0.2s' }}>
                        <path d="M9 0 C14 7 14 14 9 16 C4 14 4 7 9 0 Z" fill="#f97316" />
                        <path d="M9 5 C12 9 12 14 9 15 C6 14 6 9 9 5 Z" fill="#fde047" />
                      </g>
                    ) : (
                      <motion.path
                        initial={{ opacity: 0.9, y: 0 }}
                        animate={{ opacity: 0, y: -16 }}
                        transition={{ duration: 1.4, repeat: Infinity }}
                        d="M9 12 Q14 5 7 0"
                        stroke="#cbd5e1"
                        strokeWidth="2.5"
                        fill="none"
                      />
                    )}
                  </g>
                </svg>
              </div>

              {/* Cake Interactive Text */}
              <div className="flex-1 space-y-3 text-center sm:text-right">
                <div className="text-sm font-black text-purple-300">
                  {candlesLit ? '🔥 شمع‌های ۲۲ هنوز روشنن! یه آرزو کن:' : '💨 ایول! شمع‌های ۲۲ فوت شد:'}
                </div>

                <AnimatePresence mode="wait">
                  <motion.p
                    key={candlesLit ? 'lit' : wishIdx}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="min-h-[48px] text-sm font-bold leading-relaxed text-yellow-200"
                  >
                    {candlesLit
                      ? 'کیکِ بنفشِ معروفِ کیمیا آماده‌ست! دکمه زیر رو بزن تا با هم شمع ۲۲ سالگی رو فوت کنیم!'
                      : WISH_ROASTS[wishIdx]}
                  </motion.p>
                </AnimatePresence>

                <div className="flex flex-wrap justify-center sm:justify-start gap-2.5">
                  <button
                    onClick={handleBlowCandles}
                    className={`flex items-center gap-2 rounded-xl border-2 border-black px-4 py-2 text-sm font-black shadow-[4px_4px_0_#000] transition hover:-translate-y-0.5 active:translate-y-0.5 cursor-pointer ${
                      candlesLit
                        ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white'
                        : 'bg-yellow-400 text-black'
                    }`}
                  >
                    {candlesLit ? (
                      <>
                        <Wind className="h-4 w-4" />
                        <span>فوت کن! 🎂💨</span>
                      </>
                    ) : (
                      <>
                        <Flame className="h-4 w-4" />
                        <span>دوباره روشن کن 🔥</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleScan}
                    className="flex items-center gap-2 rounded-xl border-2 border-black bg-cyan-400 px-4 py-2 text-sm font-black text-black shadow-[4px_4px_0_#000] transition hover:-translate-y-0.5 active:translate-y-0.5 cursor-pointer"
                  >
                    <ScanFace className="h-4 w-4" />
                    <span>اسکن شخصیت کیمیا ⚡</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
            <a
              href="#gallery"
              onClick={() => soundFX.playPop()}
              className="inline-flex items-center gap-2 rounded-2xl border-4 border-black bg-lime-400 px-6 py-3 text-base font-black text-black shadow-[6px_6px_0_#000] transition hover:-translate-y-1 hover:bg-lime-300"
            >
              <span>مشاهده ۶ پرونده جنجالی</span>
              <ArrowDown className="h-5 w-5 animate-bounce" />
            </a>
            <a
              href="#meme-studio"
              onClick={() => soundFX.playPop()}
              className="inline-flex items-center gap-2 rounded-2xl border-4 border-black bg-white px-6 py-3 text-base font-black text-black shadow-[6px_6px_0_#a855f7] transition hover:-translate-y-1"
            >
              <span>🎨 بساز یه میم خفن!</span>
            </a>
          </div>
        </motion.div>

        {/* Interactive Stacked Photo Showcase */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="lg:col-span-5 flex flex-col items-center"
        >
          <div className="relative w-full max-w-sm">
            {/* Decorative floating stickers around photo */}
            <motion.div
              animate={{ rotate: [0, 8, -8, 0], y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="absolute -top-5 -right-5 z-30 rounded-2xl border-3 border-black bg-yellow-400 px-3.5 py-1.5 font-display text-xl text-black shadow-[4px_4px_0_#000]"
            >
              تولدت مبارک ۲۲! 🥳
            </motion.div>

            <motion.div
              animate={{ rotate: [-6, 4, -6] }}
              transition={{ repeat: Infinity, duration: 5 }}
              className="absolute -bottom-4 -left-4 z-30 rounded-2xl border-3 border-black bg-pink-500 px-3.5 py-1.5 text-xs font-black text-white shadow-[4px_4px_0_#000]"
            >
              🖱️ کلیک کن ورق بخوره!
            </motion.div>

            {/* Main clickable Polaroid */}
            <motion.div
              key={activeCard}
              onClick={cycleCard}
              whileHover={{ scale: 1.02, rotate: 0 }}
              whileTap={{ scale: 0.97 }}
              initial={{ rotate: HERO_CARDS[activeCard].rotate, scale: 0.94, opacity: 0.6 }}
              animate={{ rotate: HERO_CARDS[activeCard].rotate, scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              className="relative cursor-pointer overflow-hidden rounded-[2rem] border-4 border-black bg-white p-3 pb-5 shadow-[12px_12px_0_#a855f7]"
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl border-3 border-black bg-black">
                <img
                  src={HERO_CARDS[activeCard].src}
                  alt="کیمیا باقری"
                  className="h-full w-full object-cover object-center"
                />

                {/* Laser Scanner Overlay */}
                {scanning && (
                  <div className="absolute inset-0 z-20 bg-cyan-500/20 backdrop-blur-[1px]">
                    <div className="animate-scan absolute left-0 right-0 h-2 bg-cyan-300 shadow-[0_0_25px_#22d3ee,0_0_10px_#fff]" />
                    <div className="absolute inset-x-4 top-4 rounded-xl border-2 border-cyan-300 bg-black/80 px-3 py-2 text-center font-mono text-xs font-bold text-cyan-300">
                      در حال اسکن سطح کاریزما و جدیت... 🛰️
                    </div>
                  </div>
                )}

                {/* Scan Result Overlay */}
                {scanDone && activeCard === 1 && !scanning && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute inset-x-3 bottom-3 z-20 rounded-2xl border-2 border-lime-400 bg-black/90 p-3 text-xs text-white shadow-xl"
                  >
                    <div className="mb-1.5 flex items-center justify-between font-black text-lime-400">
                      <span>✅ آنالیز کامل شد!</span>
                      <span>کد: KIMIA-22</span>
                    </div>
                    <div className="space-y-1 text-[11px] font-bold">
                      <div className="flex justify-between">
                        <span>سطح نگاه عاقل‌اندَر‌سفیه:</span>
                        <span className="text-yellow-300">۹۹.۹٪ 🔥</span>
                      </div>
                      <div className="flex justify-between">
                        <span>تمایل به کیک بنفش:</span>
                        <span className="text-purple-300">۲۰۰٪ 🎂</span>
                      </div>
                      <div className="flex justify-between">
                        <span>تحمل چرت‌وپرت بقیه:</span>
                        <span className="text-rose-400">۰.۰۰۱٪ 💀</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              <div className="mt-3 flex items-center justify-between px-1 text-black">
                <span className="font-display text-xl">{HERO_CARDS[activeCard].tag}</span>
                <span className="rounded-lg bg-purple-100 px-2 py-0.5 text-xs font-black text-purple-800">
                  {activeCard + 1} / {HERO_CARDS.length}
                </span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
