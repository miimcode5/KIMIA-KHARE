import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Download, Wand2, Trash2, Sparkles } from 'lucide-react';
import { KIMIA_PHOTOS, MEME_PRESETS } from '../data/kimiaData';
import { soundFX } from '../utils/sound';

const STICKER_PALETTE = ['😎', '👑', '🎂', '⚡', '💜', '🚨', '🔥', '😂', '✨', '💅'];
const MEME_FONTS = [
  { id: 'MyBabyChubby', label: 'مای‌بیبی (توپولی)', className: 'font-mybaby' },
  { id: 'Qafashat', label: 'قفشات (تیتر سنگین)', className: 'font-qafashat' },
  { id: 'Paytakht', label: 'پایتخت (گرافیکی)', className: 'font-paytakht' },
  { id: 'Yadgar', label: 'یادگار (فانتزی)', className: 'font-yadgar' },
];

export default function MemeStudio() {
  const [selectedPhotoId, setSelectedPhotoId] = useState(1);
  const [selectedFont, setSelectedFont] = useState(MEME_FONTS[0]);
  const [topText, setTopText] = useState(MEME_PRESETS[0].top);
  const [bottomText, setBottomText] = useState(MEME_PRESETS[0].bottom);
  const [stickers, setStickers] = useState([
    { id: 1, emoji: '👑', x: 52, y: 12 },
    { id: 2, emoji: '🔥', x: 84, y: 82 },
  ]);
  const [activeStickerEmoji, setActiveStickerEmoji] = useState('😎');
  const previewRef = useRef(null);

  const selectedPhoto = KIMIA_PHOTOS.find((p) => p.id === selectedPhotoId) || KIMIA_PHOTOS[0];

  const applyPreset = (preset) => {
    soundFX.playBoing();
    setSelectedPhotoId(preset.photoId);
    setTopText(preset.top);
    setBottomText(preset.bottom);
  };

  const handleImageClick = (e) => {
    if (!previewRef.current) return;
    const rect = previewRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    soundFX.playPop();
    setStickers((prev) => [...prev, { id: Date.now(), emoji: activeStickerEmoji, x, y }]);
  };

  const removeSticker = (id, e) => {
    e.stopPropagation();
    soundFX.playTick();
    setStickers((prev) => prev.filter((s) => s.id !== id));
  };

  const downloadMeme = () => {
    soundFX.playFanfare();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = selectedPhoto.src;

    img.onload = () => {
      const size = 900;
      const aspect = img.naturalHeight / img.naturalWidth;
      canvas.width = size;
      canvas.height = Math.round(size * aspect);

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Draw stickers
      stickers.forEach((st) => {
        ctx.font = `${Math.round(canvas.width * 0.1)}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(st.emoji, (st.x / 100) * canvas.width, (st.y / 100) * canvas.height);
      });

      // Helper for wrapped stroked text
      const drawMemeText = (text, yPos, isBottom) => {
        if (!text.trim()) return;
        const fontSize = Math.round(canvas.width * 0.062);
        ctx.font = `900 ${fontSize}px '${selectedFont.id}', Vazirmatn, Tahoma, sans-serif`;
        ctx.textAlign = 'center';
        ctx.fillStyle = '#fde047';
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = Math.max(6, Math.round(fontSize * 0.22));
        ctx.lineJoin = 'round';
        ctx.direction = 'rtl';

        // Word wrap
        const words = text.split(' ');
        const lines = [];
        let currentLine = '';
        for (const word of words) {
          const testLine = currentLine ? `${currentLine} ${word}` : word;
          if (ctx.measureText(testLine).width > canvas.width * 0.88 && currentLine) {
            lines.push(currentLine);
            currentLine = word;
          } else {
            currentLine = testLine;
          }
        }
        if (currentLine) lines.push(currentLine);

        const lineHeight = fontSize * 1.25;
        lines.forEach((line, i) => {
          const y = isBottom
            ? yPos - (lines.length - 1 - i) * lineHeight
            : yPos + i * lineHeight;
          ctx.strokeText(line, canvas.width / 2, y);
          ctx.fillText(line, canvas.width / 2, y);
        });
      };

      drawMemeText(topText, 70, false);
      drawMemeText(bottomText, canvas.height - 45, true);

      const link = document.createElement('a');
      link.download = `kimia-meme-${selectedPhotoId}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    };
  };

  return (
    <section id="meme-studio" className="relative z-10 px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-6xl rounded-[2.5rem] border-4 border-black bg-[#170b33] p-6 sm:p-10 comic-shadow-yellow">
        <div className="mb-8 text-center space-y-2">
          <span className="inline-block rounded-full border-2 border-black bg-cyan-400 px-4 py-1 text-xs font-black text-black shadow-[3px_3px_0_#000]">
            🎨 کارگاه میم‌سازی اختصاصی کیمیا
          </span>
          <h2 className="font-display text-3xl sm:text-5xl text-white">
            خودت با عکس‌های کیمیا میم بساز و دانلود کن! 😂
          </h2>
          <p className="text-sm text-purple-200 font-medium">
            عکس رو انتخاب کن، متن خنده‌دار بنویس و روی عکس کلیک کن تا استیکر بچسبونی!
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-12 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-6 space-y-5">
            {/* Presets */}
            <div>
              <label className="mb-2 block text-xs font-black text-yellow-300">
                ⚡ ایده‌های آماده (یک کلیک بزن):
              </label>
              <div className="flex flex-wrap gap-2">
                {MEME_PRESETS.map((preset, i) => (
                  <button
                    key={i}
                    onClick={() => applyPreset(preset)}
                    className="rounded-xl border-2 border-black bg-purple-800 px-3 py-1.5 text-xs font-bold text-white shadow-[3px_3px_0_#000] transition hover:bg-purple-600 cursor-pointer"
                  >
                    <Wand2 className="inline h-3 w-3 ml-1 text-yellow-300" />
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Choose Photo */}
            <div>
              <label className="mb-2 block text-xs font-black text-yellow-300">
                📸 ۱. انتخاب عکس از کلکسیون:
              </label>
              <div className="grid grid-cols-6 gap-2">
                {KIMIA_PHOTOS.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      soundFX.playPop();
                      setSelectedPhotoId(p.id);
                    }}
                    className={`overflow-hidden rounded-xl border-3 transition cursor-pointer ${
                      selectedPhotoId === p.id
                        ? 'border-yellow-400 scale-105 shadow-[0_0_15px_#facc15]'
                        : 'border-black opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={p.src} alt={p.title} className="aspect-square w-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Font Picker */}
            <div>
              <label className="mb-2 block text-xs font-black text-yellow-300">
                🔤 فونت نوشته میم (از پوشه font1):
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {MEME_FONTS.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => {
                      soundFX.playPop();
                      setSelectedFont(f);
                    }}
                    className={`rounded-xl border-2 border-black px-2.5 py-2 text-xs font-bold transition cursor-pointer ${f.className} ${
                      selectedFont.id === f.id
                        ? 'bg-yellow-400 text-black shadow-[3px_3px_0_#000]'
                        : 'bg-purple-900/70 text-purple-100 hover:bg-purple-800'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Text Inputs */}
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs font-black text-purple-200">متن بالای عکس:</label>
                <input
                  type="text"
                  value={topText}
                  onChange={(e) => setTopText(e.target.value)}
                  placeholder="متن بالا..."
                  className="w-full rounded-xl border-3 border-black bg-[#0d061c] px-3 py-2.5 text-sm font-bold text-white outline-none focus:border-yellow-400"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-black text-purple-200">متن پایین عکس:</label>
                <input
                  type="text"
                  value={bottomText}
                  onChange={(e) => setBottomText(e.target.value)}
                  placeholder="متن پایین..."
                  className="w-full rounded-xl border-3 border-black bg-[#0d061c] px-3 py-2.5 text-sm font-bold text-white outline-none focus:border-yellow-400"
                />
              </div>
            </div>

            {/* Stickers Palette */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="text-xs font-black text-yellow-300">
                  ✨ ۲. استیکر انتخاب کن و روی عکس کلیک کن تا بچسبه:
                </label>
                <button
                  onClick={() => {
                    soundFX.playTick();
                    setStickers([]);
                  }}
                  className="flex items-center gap-1 text-xs font-bold text-rose-400 hover:text-rose-300 cursor-pointer"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  پاک کردن استیکرها
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {STICKER_PALETTE.map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => {
                      soundFX.playPop();
                      setActiveStickerEmoji(emoji);
                    }}
                    className={`flex h-10 w-10 items-center justify-center rounded-xl border-2 border-black text-xl transition cursor-pointer ${
                      activeStickerEmoji === emoji
                        ? 'bg-yellow-400 scale-110 shadow-[3px_3px_0_#000]'
                        : 'bg-purple-900/70 hover:bg-purple-800'
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={downloadMeme}
              className="w-full flex items-center justify-center gap-2 rounded-2xl border-4 border-black bg-gradient-to-r from-lime-400 to-emerald-400 py-3.5 text-base font-black text-black shadow-[6px_6px_0_#000] transition hover:-translate-y-0.5 active:translate-y-0.5 cursor-pointer"
            >
              <Download className="h-5 w-5" />
              <span>دانلود میم ساخته شده (PNG) 🖼️</span>
            </button>
          </div>

          {/* Live Meme Preview Column */}
          <div className="lg:col-span-6 flex flex-col items-center">
            <div
              ref={previewRef}
              onClick={handleImageClick}
              title="کلیک کن تا استیکر بچسبه!"
              className="relative w-full max-w-md cursor-crosshair overflow-hidden rounded-3xl border-4 border-black bg-black shadow-[10px_10px_0_#ec4899] select-none"
            >
              <img src={selectedPhoto.src} alt="پیش‌نمایش میم" className="w-full h-auto block pointer-events-none" />

              {/* Top Meme Text */}
              {topText && (
                <div className={`pointer-events-none absolute top-3 inset-x-3 text-center ${selectedFont.className} text-xl sm:text-2xl leading-snug text-yellow-300 text-stroke-black`}>
                  {topText}
                </div>
              )}

              {/* Bottom Meme Text */}
              {bottomText && (
                <div className={`pointer-events-none absolute bottom-3 inset-x-3 text-center ${selectedFont.className} text-xl sm:text-2xl leading-snug text-yellow-300 text-stroke-black`}>
                  {bottomText}
                </div>
              )}

              {/* Placed Stickers */}
              {stickers.map((st) => (
                <motion.button
                  key={st.id}
                  initial={{ scale: 0, rotate: -30 }}
                  animate={{ scale: 1, rotate: 0 }}
                  onClick={(e) => removeSticker(st.id, e)}
                  title="برای حذف کلیک کن"
                  style={{ left: `${st.x}%`, top: `${st.y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 text-4xl drop-shadow-[0_3px_3px_rgba(0,0,0,0.8)] hover:scale-125 transition-transform cursor-pointer"
                >
                  {st.emoji}
                </motion.button>
              ))}
            </div>
            <p className="mt-3 flex items-center gap-1.5 text-xs font-bold text-purple-300">
              <Sparkles className="h-3.5 w-3.5 text-yellow-300" />
              <span>نکته: هر جا روی عکس کلیک کنی، استیکر «{activeStickerEmoji}» می‌چسبه (کلیک روی استیکر = حذف)</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
