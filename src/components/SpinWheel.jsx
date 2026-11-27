import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { RotateCw } from 'lucide-react';
import { WHEEL_OUTCOMES } from '../data/kimiaData';
import { soundFX } from '../utils/sound';

export default function SpinWheel() {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [winner, setWinner] = useState(null);
  const tickTimer = useRef(null);

  const sliceCount = WHEEL_OUTCOMES.length;
  const sliceAngle = 360 / sliceCount;

  const spin = () => {
    if (spinning) return;
    setSpinning(true);
    setWinner(null);

    const chosenIndex = Math.floor(Math.random() * sliceCount);
    // Pointer is at top (0 deg in CSS rotation space if slice 0 starts at -90 - sliceAngle/2)
    // Let's compute exact target rotation:
    // Slice i center is at i * sliceAngle + sliceAngle / 2 clockwise from top (if slice 0 starts at top 0deg).
    // Rotating the wheel clockwise by R moves slice i center to (i * sliceAngle + sliceAngle / 2 + R) mod 360.
    // We want that to equal 0 (top pointer): R mod 360 = (360 - (i * sliceAngle + sliceAngle / 2)) mod 360.
    const centerOfChosen = chosenIndex * sliceAngle + sliceAngle / 2;
    const targetMod = (360 - centerOfChosen + 360) % 360;
    const currentMod = ((rotation % 360) + 360) % 360;
    const deltaMod = (targetMod - currentMod + 360) % 360;
    const extraSpins = 5 * 360;
    const newRotation = rotation + extraSpins + deltaMod;

    setRotation(newRotation);

    // Play ticking sounds during spin
    let ticks = 0;
    clearInterval(tickTimer.current);
    tickTimer.current = setInterval(() => {
      ticks += 1;
      if (ticks < 24) {
        soundFX.playTick();
      } else {
        clearInterval(tickTimer.current);
      }
    }, 150);

    setTimeout(() => {
      clearInterval(tickTimer.current);
      setSpinning(false);
      setWinner(WHEEL_OUTCOMES[chosenIndex]);
      soundFX.playFanfare();
      confetti({
        particleCount: 75,
        spread: 70,
        origin: { y: 0.6 },
      });
    }, 4100);
  };

  // Helper to make SVG pie slice starting at 0 deg = 12 o'clock, going clockwise
  const polarToCartesian = (cx, cy, r, angleDeg) => {
    const rad = ((angleDeg - 90) * Math.PI) / 180;
    return {
      x: cx + r * Math.cos(rad),
      y: cy + r * Math.sin(rad),
    };
  };

  const describeSlice = (cx, cy, r, startAngle, endAngle) => {
    const start = polarToCartesian(cx, cy, r, endAngle);
    const end = polarToCartesian(cx, cy, r, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
    return ['M', cx, cy, 'L', start.x, start.y, 'A', r, r, 0, largeArcFlag, 0, end.x, end.y, 'Z'].join(' ');
  };

  return (
    <section id="wheel" className="relative z-10 px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center space-y-2">
          <span className="inline-block rounded-full border-2 border-black bg-amber-400 px-4 py-1 text-xs font-black text-black shadow-[3px_3px_0_#000]">
            🎡 گردونه‌ی سرنوشت ۲۲ سالگی
          </span>
          <h2 className="font-display text-4xl sm:text-5xl text-white">
            بچرخون ببین امروز چه حکمی برات صادر می‌شه!
          </h2>
        </div>

        <div className="grid gap-10 lg:grid-cols-12 items-center rounded-[2.5rem] border-4 border-black bg-[#190c36] p-6 sm:p-10 comic-shadow-pink">
          {/* Wheel SVG */}
          <div className="lg:col-span-6 flex flex-col items-center">
            <div className="relative w-72 h-72 sm:w-96 sm:h-96">
              {/* Top Pointer */}
              <div className="absolute -top-4 left-1/2 z-30 -translate-x-1/2">
                <div className="h-0 w-0 border-l-[16px] border-r-[16px] border-t-[28px] border-l-transparent border-r-transparent border-t-yellow-400 drop-shadow-[0_4px_0_#000]" />
              </div>

              {/* Rotating Wheel */}
              <motion.div
                animate={{ rotate: rotation }}
                transition={{ duration: 4, ease: [0.16, 1, 0.3, 1] }}
                className="h-full w-full rounded-full border-4 border-black shadow-[0_0_40px_rgba(168,85,247,0.45)]"
              >
                <svg viewBox="0 0 300 300" className="h-full w-full">
                  {WHEEL_OUTCOMES.map((item, i) => {
                    const start = i * sliceAngle;
                    const end = start + sliceAngle;
                    const mid = start + sliceAngle / 2;
                    const textPos = polarToCartesian(150, 150, 96, mid);

                    return (
                      <g key={i}>
                        <path
                          d={describeSlice(150, 150, 146, start, end)}
                          fill={item.color}
                          stroke="#000"
                          strokeWidth="2.5"
                        />
                        <text
                          x={textPos.x}
                          y={textPos.y}
                          fill="#fff"
                          stroke="#000"
                          strokeWidth="3"
                          paintOrder="stroke"
                          fontSize="11"
                          fontWeight="900"
                          textAnchor="middle"
                          dominantBaseline="middle"
                          transform={`rotate(${mid}, ${textPos.x}, ${textPos.y})`}
                        >
                          {item.short}
                        </text>
                      </g>
                    );
                  })}
                  <circle cx="150" cy="150" r="24" fill="#facc15" stroke="#000" strokeWidth="4" />
                  <text x="150" y="156" textAnchor="middle" fontSize="18" fontWeight="900" fill="#000">
                    ۲۲
                  </text>
                </svg>
              </motion.div>
            </div>

            <button
              onClick={spin}
              disabled={spinning}
              className="mt-8 flex items-center gap-2 rounded-2xl border-4 border-black bg-gradient-to-r from-yellow-400 to-amber-400 px-8 py-3.5 text-lg font-black text-black shadow-[6px_6px_0_#000] transition hover:-translate-y-0.5 active:translate-y-0.5 disabled:opacity-60 cursor-pointer"
            >
              <RotateCw className={`h-5 w-5 ${spinning ? 'animate-spin' : ''}`} />
              <span>{spinning ? 'در حال چرخش سرنوشت...' : 'بچرخون گردونه رو! 🎯'}</span>
            </button>
          </div>

          {/* Outcome Card */}
          <div className="lg:col-span-6">
            <AnimatePresence mode="wait">
              {winner ? (
                <motion.div
                  key={winner.label}
                  initial={{ scale: 0.85, opacity: 0, rotate: -2 }}
                  animate={{ scale: 1, opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0 }}
                  className="rounded-3xl border-4 border-black bg-gradient-to-br from-purple-700 to-fuchsia-700 p-7 text-center shadow-[8px_8px_0_#000] space-y-4"
                >
                  <div className="text-6xl animate-bounce">{winner.emoji}</div>
                  <div className="inline-block rounded-xl border-2 border-black bg-yellow-400 px-3 py-1 text-xs font-black text-black">
                    حکم رسمی صادر شد!
                  </div>
                  <h3 className="font-display text-3xl text-white">{winner.resultTitle}</h3>
                  <p className="text-base leading-relaxed font-bold text-purple-100">{winner.resultText}</p>
                </motion.div>
              ) : (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="rounded-3xl border-4 border-dashed border-purple-400/50 bg-black/25 p-8 text-center space-y-3"
                >
                  <div className="text-5xl">🔮</div>
                  <h3 className="font-display text-2xl text-purple-200">
                    {spinning ? 'صبر کن ببینیم شانس کیمیا چی درمیاد...' : 'گردونه منتظر اشاره توئه!'}
                  </h3>
                  <p className="text-sm text-purple-300">
                    ۸ تا چالش و فالِ خنده‌دارِ ۲۲ سالگی این تو قایم شدن — از نگاهِ حراست عکس ۱ تا کیک‌خوری آزاد!
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
