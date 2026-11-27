import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { RefreshCcw, Award } from 'lucide-react';
import { QUIZ_QUESTIONS, KIMIA_PHOTOS } from '../data/kimiaData';
import { soundFX } from '../utils/sound';

export default function KimiaQuiz() {
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState({});
  const [resultPhoto, setResultPhoto] = useState(null);

  const handleAnswer = (photoId) => {
    soundFX.playPop();
    const nextScores = { ...scores, [photoId]: (scores[photoId] || 0) + 1 };
    setScores(nextScores);

    if (step + 1 < QUIZ_QUESTIONS.length) {
      setStep(step + 1);
    } else {
      // Find winning photoId
      let bestId = photoId;
      let maxCount = 0;
      Object.entries(nextScores).forEach(([id, count]) => {
        if (count > maxCount) {
          maxCount = count;
          bestId = Number(id);
        }
      });
      const matched = KIMIA_PHOTOS.find((p) => p.id === bestId) || KIMIA_PHOTOS[0];
      setResultPhoto(matched);
      soundFX.playFanfare();
      confetti({
        particleCount: 80,
        spread: 75,
        origin: { y: 0.65 },
      });
    }
  };

  const resetQuiz = () => {
    soundFX.playBoing();
    setStep(0);
    setScores({});
    setResultPhoto(null);
  };

  return (
    <section id="quiz" className="relative z-10 px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 text-center space-y-2">
          <span className="inline-block rounded-full border-2 border-black bg-lime-400 px-4 py-1 text-xs font-black text-black shadow-[3px_3px_0_#000]">
            🧠 تست روانشناسی فوق‌معتبر
          </span>
          <h2 className="font-display text-4xl sm:text-5xl text-white">
            امروز کدوم ورژنِ کیمیا باقری هستی؟
          </h2>
        </div>

        <div className="rounded-[2.5rem] border-4 border-black bg-[#170b33] p-6 sm:p-10 comic-shadow-purple">
          <AnimatePresence mode="wait">
            {!resultPhoto ? (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                className="space-y-6"
              >
                {/* Progress bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-black text-purple-300">
                    <span>سوال {step + 1} از {QUIZ_QUESTIONS.length}</span>
                    <span>{Math.round(((step + 1) / QUIZ_QUESTIONS.length) * 100)}٪</span>
                  </div>
                  <div className="h-4 w-full overflow-hidden rounded-full border-2 border-black bg-black/50">
                    <div
                      className="h-full bg-gradient-to-l from-yellow-400 to-pink-500 transition-all duration-300"
                      style={{ width: `${((step + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
                    />
                  </div>
                </div>

                <h3 className="font-display text-2xl sm:text-3xl text-yellow-300">
                  {QUIZ_QUESTIONS[step].question}
                </h3>

                <div className="grid gap-3 sm:grid-cols-2">
                  {QUIZ_QUESTIONS[step].options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAnswer(opt.photoId)}
                      className="rounded-2xl border-3 border-black bg-[#25134f] p-4 text-right text-sm sm:text-base font-bold text-white shadow-[4px_4px_0_#000] transition hover:-translate-y-0.5 hover:bg-purple-700 hover:text-yellow-300 active:translate-y-0.5 cursor-pointer"
                    >
                      <span className="ml-2 inline-flex h-6 w-6 items-center justify-center rounded-lg border border-black bg-yellow-400 text-xs font-black text-black">
                        {idx + 1}
                      </span>
                      {opt.text}
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="grid gap-8 md:grid-cols-12 items-center"
              >
                <div className="md:col-span-5">
                  <div className="overflow-hidden rounded-3xl border-4 border-black bg-white p-2 shadow-[8px_8px_0_#facc15]">
                    <img
                      src={resultPhoto.src}
                      alt={resultPhoto.title}
                      className="aspect-[3/4] w-full rounded-2xl border-2 border-black object-cover"
                    />
                  </div>
                </div>
                <div className="md:col-span-7 space-y-4 text-center md:text-right">
                  <div className="inline-flex items-center gap-1.5 rounded-full border-2 border-black bg-yellow-400 px-3 py-1 text-xs font-black text-black">
                    <Award className="h-4 w-4" />
                    <span>نتیجه تشخیص آزمایشگاه کیمیا:</span>
                  </div>
                  <h3 className="font-display text-3xl sm:text-4xl text-white">
                    شما دقیقاً «{resultPhoto.title}» هستید!
                  </h3>
                  <p className="text-sm font-bold text-pink-300">{resultPhoto.subtitle}</p>
                  <p className="rounded-2xl border-2 border-purple-500/40 bg-black/30 p-4 text-sm leading-relaxed text-purple-100">
                    {resultPhoto.caption}
                  </p>
                  <button
                    onClick={resetQuiz}
                    className="inline-flex items-center gap-2 rounded-2xl border-3 border-black bg-cyan-400 px-6 py-3 text-sm font-black text-black shadow-[4px_4px_0_#000] transition hover:-translate-y-0.5 cursor-pointer"
                  >
                    <RefreshCcw className="h-4 w-4" />
                    <span>یه بار دیگه امتحان کن!</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
