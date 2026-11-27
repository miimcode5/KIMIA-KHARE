import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, FileText, Sparkles, Maximize2, X } from 'lucide-react';
import { KIMIA_PHOTOS } from '../data/kimiaData';
import { soundFX } from '../utils/sound';

export default function EvidenceGallery() {
  const [activeGimmicks, setActiveGimmicks] = useState({});
  const [fbiView, setFbiView] = useState({});
  const [thoughtIndex, setThoughtIndex] = useState({});
  const [lightboxPhoto, setLightboxPhoto] = useState(null);

  const toggleGimmick = (photo) => {
    if (photo.gimmickType === 'laser') soundFX.playLaser();
    else if (photo.gimmickType === 'crown') soundFX.playFanfare();
    else if (photo.gimmickType === 'thoughts') {
      soundFX.playBoing();
      setThoughtIndex((prev) => ({
        ...prev,
        [photo.id]: ((prev[photo.id] ?? -1) + 1) % photo.thoughts.length,
      }));
      setActiveGimmicks((prev) => ({ ...prev, [photo.id]: true }));
      return;
    } else {
      soundFX.playPop();
    }

    setActiveGimmicks((prev) => ({
      ...prev,
      [photo.id]: !prev[photo.id],
    }));
  };

  const toggleFbi = (id) => {
    soundFX.playTick();
    setFbiView((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section id="gallery" className="relative z-10 px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center space-y-3"
        >
          <span className="inline-block rounded-full border-2 border-black bg-pink-500 px-4 py-1 text-xs font-black text-white shadow-[3px_3px_0_#000]">
            📁 آرشیو فوق‌محرمانه کیمیا باقری
          </span>
          <h2 className="font-display text-4xl sm:text-5xl text-yellow-300 text-stroke-black">
            ۶ پرونده‌ی جنجالی که اینترنت را تکان داد!
          </h2>
          <p className="mx-auto max-w-2xl text-sm sm:text-base text-purple-200 font-medium">
            روی دکمه‌ی جادویی هر عکس کلیک کن تا افکت‌های مخصوص همون لحظه فعال بشه — از لیزر عینک تا رادار ضد ناخنک به کیک!
          </p>
        </motion.div>

        {/* Grid of 6 Photo Cards */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {KIMIA_PHOTOS.map((photo, index) => {
            const isGimmickOn = !!activeGimmicks[photo.id];
            const isFbi = !!fbiView[photo.id];
            const currentThought = photo.thoughts[thoughtIndex[photo.id] ?? 0];

            return (
              <motion.article
                key={photo.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                whileHover={{ y: -6 }}
                className="group flex flex-col overflow-hidden rounded-[2rem] border-4 border-black bg-[#190c36] comic-shadow transition-shadow hover:shadow-[10px_10px_0_#facc15]"
              >
                {/* Top Tape / Case Header */}
                <div className={`flex items-center justify-between border-b-4 border-black bg-gradient-to-l ${photo.color} px-4 py-2.5 text-black`}>
                  <span className="text-xs font-black tracking-tight">{photo.codeName}</span>
                  <span className="rounded-lg border-2 border-black bg-white px-2 py-0.5 text-[11px] font-black">
                    {photo.badge}
                  </span>
                </div>

                {/* Photo Frame with Interactive Gimmick Overlays */}
                <div className="relative aspect-[4/5] w-full overflow-hidden border-b-4 border-black bg-black">
                  <img
                    src={photo.src}
                    alt={photo.title}
                    className={`h-full w-full object-cover transition-all duration-500 ${
                      isGimmickOn && photo.gimmickType === 'nightvision' ? 'night-vision scale-105' : 'group-hover:scale-[1.03]'
                    }`}
                  />

                  {/* Expand / Zoom button */}
                  <button
                    onClick={() => {
                      soundFX.playPop();
                      setLightboxPhoto(photo);
                    }}
                    title="بزرگ‌نمایی عکس"
                    className="absolute top-3 left-3 z-30 rounded-xl border-2 border-black bg-black/70 p-2 text-white backdrop-blur-sm transition hover:bg-yellow-400 hover:text-black cursor-pointer"
                  >
                    <Maximize2 className="h-4 w-4" />
                  </button>

                  {/* Gimmick 1: Laser Eyes & Thug Sunglasses */}
                  <AnimatePresence>
                    {isGimmickOn && photo.gimmickType === 'laser' && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="pointer-events-none absolute inset-0 z-20"
                      >
                        {/* Pixel Thug Glasses */}
                        <motion.div
                          initial={{ y: -120, rotate: -15 }}
                          animate={{ y: 0, rotate: 4 }}
                          transition={{ type: 'spring', stiffness: 220, damping: 14 }}
                          className="absolute top-[25%] left-[44%] w-[24%]"
                        >
                          <svg viewBox="0 0 120 38" className="w-full drop-shadow-[0_4px_0_#000]">
                            <rect x="4" y="6" width="46" height="24" rx="2" fill="#000" />
                            <rect x="68" y="6" width="46" height="24" rx="2" fill="#000" />
                            <rect x="50" y="10" width="18" height="6" fill="#000" />
                            <rect x="12" y="10" width="6" height="6" fill="#fff" />
                            <rect x="18" y="16" width="6" height="6" fill="#fff" />
                            <rect x="76" y="10" width="6" height="6" fill="#fff" />
                            <rect x="82" y="16" width="6" height="6" fill="#fff" />
                          </svg>
                        </motion.div>

                        {/* Laser Beams */}
                        <motion.div
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: [0.8, 1.1, 0.9] }}
                          transition={{ repeat: Infinity, duration: 0.3 }}
                          className="absolute top-[30%] left-[12%] h-2 w-40 -rotate-12 bg-gradient-to-l from-red-500 via-rose-400 to-transparent shadow-[0_0_20px_#ef4444]"
                        />
                        <motion.div
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: [0.8, 1.1, 0.9] }}
                          transition={{ repeat: Infinity, duration: 0.3 }}
                          className="absolute top-[31%] left-[25%] h-2 w-44 -rotate-6 bg-gradient-to-l from-red-500 via-rose-400 to-transparent shadow-[0_0_20px_#ef4444]"
                        />

                        <div className="absolute bottom-4 inset-x-4 rounded-xl border-2 border-red-500 bg-black/85 px-3 py-1.5 text-center font-display text-lg text-red-400">
                          🚨 حالت رییس حراست فعال شد: دروغ ممنوع!
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Gimmick 2: Cafe Speech Bubbles */}
                  <AnimatePresence>
                    {isGimmickOn && photo.gimmickType === 'bubbles' && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="pointer-events-none absolute inset-0 z-20"
                      >
                        <motion.div
                          animate={{ y: [0, -5, 0] }}
                          transition={{ repeat: Infinity, duration: 2 }}
                          className="absolute top-6 left-4 max-w-[48%] rounded-2xl border-3 border-black bg-white p-2.5 text-[11px] font-black text-black shadow-[4px_4px_0_#000]"
                        >
                          «کیمیا یه چیز بگم پشمات بریزه ولی قسم بخور به کسی نگی!» 🤫
                        </motion.div>
                        <motion.div
                          animate={{ y: [0, 5, 0] }}
                          transition={{ repeat: Infinity, duration: 2.3 }}
                          className="absolute bottom-14 right-3 max-w-[52%] rounded-2xl border-3 border-black bg-yellow-300 p-2.5 text-[11px] font-black text-black shadow-[4px_4px_0_#000]"
                        >
                          «من که اصلاً اهل غیبت نیستم، فقط تعریف کن کامل!» ☕😎
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Gimmick 3: Cake Guard Radar */}
                  <AnimatePresence>
                    {isGimmickOn && photo.gimmickType === 'radar' && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="pointer-events-none absolute inset-0 z-20"
                      >
                        <div className="absolute bottom-[20%] left-[12%] h-36 w-36 rounded-full border-4 border-dashed border-lime-400 animate-spin" style={{ animationDuration: '5s' }} />
                        <div className="absolute bottom-[26%] left-[18%] h-24 w-24 rounded-full border-2 border-purple-400 animate-ping" />
                        <div className="absolute top-4 right-4 rounded-xl border-2 border-black bg-lime-400 px-3 py-1.5 text-xs font-black text-black shadow-[3px_3px_0_#000]">
                          🛡️ سپر محافظ کیک ۲۲: فعال! (دست زدن = جریمه)
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Gimmick 4: Night Vision HUD */}
                  <AnimatePresence>
                    {isGimmickOn && photo.gimmickType === 'nightvision' && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="pointer-events-none absolute inset-0 z-20 flex flex-col justify-between p-4 font-mono text-xs font-bold text-lime-300"
                      >
                        <div className="flex items-center justify-between">
                          <span className="rounded bg-black/70 px-2 py-1">● REC 00:22:00</span>
                          <span className="rounded bg-black/70 px-2 py-1">NVG-22 PRO</span>
                        </div>
                        <div className="mx-auto h-28 w-28 rounded-full border-2 border-lime-400/70 flex items-center justify-center">
                          <div className="h-2 w-2 rounded-full bg-red-500 animate-ping" />
                        </div>
                        <div className="rounded bg-black/75 px-2.5 py-1 text-center">
                          عملیات استتار با کیک در شمشادها — وضعیت: موفق ✅
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Gimmick 5: Royal Crown & Sparkles */}
                  <AnimatePresence>
                    {isGimmickOn && photo.gimmickType === 'crown' && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="pointer-events-none absolute inset-0 z-20"
                      >
                        <motion.div
                          initial={{ y: -60, scale: 0.4 }}
                          animate={{ y: 0, scale: 1, rotate: [-5, 5, -5] }}
                          transition={{ type: 'spring', bounce: 0.6 }}
                          className="absolute top-[24%] left-[52%] -translate-x-1/2 text-5xl drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]"
                        >
                          👑
                        </motion.div>
                        <div className="absolute bottom-4 inset-x-4 rounded-xl border-2 border-black bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-400 px-3 py-1.5 text-center text-xs font-black text-black shadow-[4px_4px_0_#000]">
                          ✨ علیاحضرت کیمیا باقری — ملکه خونسردِ ۲۲ سالگی ✨
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Gimmick 6: Philosophical Thought Cloud */}
                  <AnimatePresence>
                    {isGimmickOn && photo.gimmickType === 'thoughts' && (
                      <motion.div
                        key={currentThought}
                        initial={{ opacity: 0, y: 12, scale: 0.85 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.85 }}
                        className="pointer-events-none absolute top-4 inset-x-4 z-20"
                      >
                        <div className="font-yadgar rounded-3xl border-3 border-black bg-white p-3.5 text-center text-sm sm:text-base font-black text-purple-950 shadow-[5px_5px_0_#a855f7]">
                          💭 «{currentThought}»
                        </div>
                        <div className="mx-auto mt-1 h-3 w-3 rounded-full border-2 border-black bg-white" />
                        <div className="mx-auto mt-1 h-2 w-2 rounded-full border-2 border-black bg-white" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Card Body */}
                <div className="flex flex-1 flex-col justify-between p-5 space-y-4">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-display text-2xl text-white">{photo.title}</h3>
                      <button
                        onClick={() => toggleFbi(photo.id)}
                        title="تغییر به گزارش محرمانه"
                        className={`shrink-0 rounded-xl border-2 border-black px-2.5 py-1 text-[11px] font-black transition cursor-pointer ${
                          isFbi ? 'bg-yellow-400 text-black' : 'bg-purple-900 text-purple-200 hover:bg-purple-800'
                        }`}
                      >
                        {isFbi ? <Eye className="inline h-3.5 w-3.5 ml-1" /> : <FileText className="inline h-3.5 w-3.5 ml-1" />}
                        {isFbi ? 'نمای عادی' : 'گزارش FBI'}
                      </button>
                    </div>
                    <p className="font-paytakht mt-1 text-xs font-bold text-purple-300">{photo.subtitle}</p>

                    <AnimatePresence mode="wait">
                      {!isFbi ? (
                        <motion.p
                          key="normal"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="mt-3 text-sm leading-relaxed text-purple-100/90"
                        >
                          {photo.caption}
                        </motion.p>
                      ) : (
                        <motion.ul
                          key="fbi"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="mt-3 space-y-1.5 rounded-2xl border-2 border-purple-500/40 bg-black/40 p-3 text-xs font-bold text-lime-300"
                        >
                          {photo.fbiNotes.map((note, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <span>▸</span>
                              <span>{note}</span>
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Interactive Gimmick Trigger Button */}
                  <button
                    onClick={() => toggleGimmick(photo)}
                    className={`w-full flex items-center justify-center gap-2 rounded-2xl border-3 border-black px-4 py-2.5 text-xs sm:text-sm font-black shadow-[4px_4px_0_#000] transition active:translate-y-0.5 cursor-pointer ${
                      isGimmickOn && photo.gimmickType !== 'thoughts'
                        ? 'bg-rose-500 text-white hover:bg-rose-600'
                        : 'bg-yellow-400 text-black hover:bg-yellow-300'
                    }`}
                  >
                    <Sparkles className="h-4 w-4 shrink-0" />
                    <span>
                      {photo.gimmickType === 'thoughts' && isGimmickOn
                        ? '🧠 فکر بعدی کیمیا چیه؟ کلیک کن!'
                        : isGimmickOn
                        ? 'خاموش کردن افکت ❌'
                        : photo.gimmickLabel}
                    </span>
                  </button>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxPhoto(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-lg w-full overflow-hidden rounded-3xl border-4 border-black bg-[#1b0e38] p-4 shadow-[10px_10px_0_#a855f7]"
            >
              <button
                onClick={() => setLightboxPhoto(null)}
                className="absolute top-6 left-6 z-10 rounded-full border-2 border-black bg-yellow-400 p-2 text-black shadow-[3px_3px_0_#000] cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
              <img
                src={lightboxPhoto.src}
                alt={lightboxPhoto.title}
                className="max-h-[70vh] w-full rounded-2xl border-3 border-black object-contain bg-black"
              />
              <div className="mt-4 text-center space-y-1">
                <h4 className="font-display text-2xl text-yellow-300">{lightboxPhoto.title}</h4>
                <p className="text-sm text-purple-100">{lightboxPhoto.caption}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
