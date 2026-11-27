import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Play, Trophy, Timer } from 'lucide-react';
import { soundFX } from '../utils/sound';

const ITEMS = [
  { type: 'cake', emoji: '🎂', label: '+10', points: 10, bg: 'from-purple-500 to-fuchsia-500' },
  { type: 'crown', emoji: '👑', label: '+25', points: 25, bg: 'from-yellow-400 to-amber-500' },
  { type: 'glasses', emoji: '🕶️', label: '+15', points: 15, bg: 'from-cyan-400 to-blue-500' },
  { type: 'broccoli', emoji: '🥦', label: '-10', points: -10, bg: 'from-rose-500 to-red-600' },
];

export default function CakeCatchGame() {
  const [playing, setPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const [slots, setSlots] = useState(Array(9).fill(null));
  const [feedback, setFeedback] = useState({});
  const [finished, setFinished] = useState(false);
  const spawnInterval = useRef(null);
  const timerInterval = useRef(null);

  const stopGame = (finalScore) => {
    clearInterval(spawnInterval.current);
    clearInterval(timerInterval.current);
    setPlaying(false);
    setFinished(true);
    setSlots(Array(9).fill(null));
    setHighScore((prev) => Math.max(prev, finalScore));
    if (finalScore >= 80) {
      soundFX.playFanfare();
      confetti({ particleCount: 90, spread: 80, origin: { y: 0.7 } });
    } else {
      soundFX.playBoing();
    }
  };

  const startGame = () => {
    soundFX.playFanfare();
    setScore(0);
    setTimeLeft(20);
    setFinished(false);
    setPlaying(true);
    setSlots(Array(9).fill(null));
  };

  useEffect(() => {
    if (!playing) return;

    timerInterval.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    spawnInterval.current = setInterval(() => {
      setSlots((prev) => {
        const next = [...prev];
        // Clear some random slots
        for (let i = 0; i < 9; i++) {
          if (next[i] && Math.random() < 0.55) next[i] = null;
        }
        // Spawn 1-2 new items
        const count = Math.random() < 0.4 ? 2 : 1;
        for (let c = 0; c < count; c++) {
          const idx = Math.floor(Math.random() * 9);
          const r = Math.random();
          let item = ITEMS[0];
          if (r > 0.84) item = ITEMS[1];
          else if (r > 0.65) item = ITEMS[2];
          else if (r > 0.48) item = ITEMS[3];
          next[idx] = { ...item, uid: Math.random() };
        }
        return next;
      });
    }, 620);

    return () => {
      clearInterval(spawnInterval.current);
      clearInterval(timerInterval.current);
    };
  }, [playing]);

  useEffect(() => {
    if (playing && timeLeft === 0) {
      stopGame(score);
    }
  }, [timeLeft, playing, score]);

  const whack = (index) => {
    if (!playing) return;
    const item = slots[index];
    if (!item) return;

    if (item.points > 0) soundFX.playCoin();
    else soundFX.playBuzz();

    setScore((prev) => Math.max(0, prev + item.points));
    setFeedback((prev) => ({ ...prev, [index]: item.label }));
    setTimeout(() => {
      setFeedback((prev) => {
        const copy = { ...prev };
        delete copy[index];
        return copy;
      });
    }, 450);

    setSlots((prev) => {
      const next = [...prev];
      next[index] = null;
      return next;
    });
  };

  const getRank = (s) => {
    if (s >= 150) return '👑 اسطوره‌ی کیک‌قاپون و محافظ شماره یک کیک ۲۲!';
    if (s >= 90) return '🎂 قهرمان حرفه‌ایِ تولد و دزدِ کیکِ بنفش!';
    if (s >= 40) return '☕ بد نبود! ولی هنوز رفیقِ عکس ۳ کیکو زودتر می‌خوره!';
    return '🥦 داداش همه رو ول کردی چسبیدی به کلم بروکلی؟!';
  };

  return (
    <section id="game" className="relative z-10 px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-4xl rounded-[2.5rem] border-4 border-black bg-[#190c36] p-6 sm:p-10 comic-shadow">
        <div className="mb-6 text-center space-y-2">
          <span className="inline-block rounded-full border-2 border-black bg-purple-500 px-4 py-1 text-xs font-black text-white shadow-[3px_3px_0_#000]">
            🎮 مینی‌گیم ۲۰ ثانیه‌ای
          </span>
          <h2 className="font-display text-4xl sm:text-5xl text-yellow-300 text-stroke-black">
            کیک‌قاپون ۲۲! نذار کیک بنفش بره!
          </h2>
          <p className="text-sm text-purple-200 font-bold">
            روی 🎂 (+۱۰)، 🕶️ (+۱۵) و 👑 (+۲۵) کلیک کن — مواظب 🥦 رژیم (-۱۰) باش!
          </p>
        </div>

        {/* HUD Bar */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border-3 border-black bg-black/50 px-5 py-3">
          <div className="flex items-center gap-2 text-lg font-black text-yellow-300">
            <span>امتیاز:</span>
            <span className="rounded-xl border-2 border-black bg-purple-700 px-3 py-0.5 text-white">{score}</span>
          </div>
          <div className="flex items-center gap-2 text-lg font-black text-cyan-300">
            <Timer className="h-5 w-5" />
            <span>{timeLeft} ثانیه</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm font-black text-amber-300">
            <Trophy className="h-4 w-4" />
            <span>رکورد: {highScore}</span>
          </div>
        </div>

        {/* 3x3 Arcade Board */}
        <div className="relative mx-auto max-w-md">
          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            {slots.map((item, idx) => (
              <button
                key={idx}
                onClick={() => whack(idx)}
                className="relative flex aspect-square items-center justify-center overflow-hidden rounded-3xl border-4 border-black bg-[#0d061c] shadow-[inset_0_6px_0_rgba(0,0,0,0.6)] transition active:scale-95 cursor-pointer"
              >
                <AnimatePresence>
                  {item && (
                    <motion.div
                      key={item.uid}
                      initial={{ scale: 0, y: 30 }}
                      animate={{ scale: 1, y: 0 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                      className={`flex h-4/5 w-4/5 items-center justify-center rounded-2xl border-3 border-black bg-gradient-to-br ${item.bg} text-4xl sm:text-5xl shadow-[4px_4px_0_#000]`}
                    >
                      {item.emoji}
                    </motion.div>
                  )}
                </AnimatePresence>

                <AnimatePresence>
                  {feedback[idx] && (
                    <motion.span
                      initial={{ opacity: 1, y: 0, scale: 0.9 }}
                      animate={{ opacity: 0, y: -30, scale: 1.3 }}
                      exit={{ opacity: 0 }}
                      className={`pointer-events-none absolute z-20 font-display text-2xl text-stroke-sm ${
                        feedback[idx].startsWith('+') ? 'text-lime-300' : 'text-rose-400'
                      }`}
                    >
                      {feedback[idx]}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            ))}
          </div>

          {/* Start / Game Over Overlay */}
          {!playing && (
            <div className="mt-6 text-center space-y-4">
              {finished && (
                <motion.div
                  initial={{ scale: 0.85, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="rounded-2xl border-3 border-black bg-purple-900/90 p-4 text-center space-y-1"
                >
                  <div className="font-display text-2xl text-yellow-300">امتیاز نهایی: {score}</div>
                  <div className="text-sm font-bold text-white">{getRank(score)}</div>
                </motion.div>
              )}

              <button
                onClick={startGame}
                className="inline-flex items-center gap-2 rounded-2xl border-4 border-black bg-gradient-to-r from-lime-400 to-emerald-400 px-8 py-3.5 text-lg font-black text-black shadow-[6px_6px_0_#000] transition hover:-translate-y-0.5 active:translate-y-0.5 cursor-pointer"
              >
                <Play className="h-5 w-5 fill-current" />
                <span>{finished ? 'دوباره بازی کن! 🔥' : 'شروع شکار کیک! 🎂'}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
