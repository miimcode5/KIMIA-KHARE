import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { PartyPopper, Heart, Send } from 'lucide-react';
import { soundFX } from '../utils/sound';

const INITIAL_NOTES = [
  { author: 'شورای عالی کیک بنفش', text: '۲۲ سالگیت مبارک کیمیا جان! فقط اون نگاهِ عکس ۱ رو سرمون نیار مرسی 😂💜' },
  { author: 'تیم عملیات کافه', text: 'امیدواریم همیشه انقدر باکلاس و پایه بمونی، دور بعدی لاته مهمون ما!' },
];

export default function FooterRoast() {
  const [notes, setNotes] = useState(INITIAL_NOTES);
  const [author, setAuthor] = useState('');
  const [text, setText] = useState('');

  const megaBlast = () => {
    soundFX.playFanfare();
    const end = Date.now() + 1800;
    const colors = ['#a855f7', '#facc15', '#ec4899', '#38bdf8', '#ffffff'];

    (function frame() {
      confetti({
        particleCount: 6,
        angle: 60,
        spread: 60,
        origin: { x: 0, y: 0.7 },
        colors,
      });
      confetti({
        particleCount: 6,
        angle: 120,
        spread: 60,
        origin: { x: 1, y: 0.7 },
        colors,
      });
      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    soundFX.playCoin();
    setNotes((prev) => [
      { author: author.trim() || 'یک دوستِ ناشناسِ ترسو 😎', text: text.trim() },
      ...prev,
    ]);
    setAuthor('');
    setText('');
  };

  return (
    <footer className="relative z-10 px-4 pt-12 pb-20 sm:px-6">
      <div className="mx-auto max-w-5xl space-y-10">
        {/* Big Finale Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-[2.5rem] border-4 border-black bg-gradient-to-br from-purple-700 via-fuchsia-700 to-indigo-800 p-8 sm:p-12 text-center shadow-[10px_10px_0_#facc15]"
        >
          <div className="mx-auto max-w-2xl space-y-5">
            <div className="text-5xl sm:text-6xl animate-wiggle inline-block">🎂👑💜</div>
            <h2 className="font-display text-4xl sm:text-6xl text-yellow-300 text-stroke-black">
              تولدت ۲۲ سالگیت مبارک کیمیا باقری!
            </h2>
            <p className="text-base sm:text-lg font-bold leading-relaxed text-white/95">
              همه‌ی این شوخی‌ها بهونه‌ای بود که بگیم چقدر وجودت باحاله و لحظه‌هات قشنگن! ۲۲ سالگیت پر از خنده‌های از ته دل، کافه‌های دونفره، کیک‌های بنفش خوشمزه و موفقیت‌های بزرگ باشه!
            </p>

            <button
              onClick={megaBlast}
              className="inline-flex items-center gap-3 rounded-2xl border-4 border-black bg-yellow-400 px-8 py-4 text-lg font-black text-black shadow-[6px_6px_0_#000] transition hover:-translate-y-1 active:translate-y-0.5 cursor-pointer"
            >
              <PartyPopper className="h-6 w-6" />
              <span>انفجار نهایی اکلیل و شادی! 🎉</span>
            </button>
          </div>
        </motion.div>

        {/* Mini Guestbook / Roast Wall */}
        <div className="rounded-3xl border-4 border-black bg-[#170b33] p-6 sm:p-8 comic-shadow">
          <h3 className="font-yadgar text-2xl sm:text-3xl text-yellow-300 mb-4">
            ✍️ دیوارِ یادگاری و شوخی‌های دوستان
          </h3>
          <form onSubmit={handleAddNote} className="grid gap-3 sm:grid-cols-12 mb-6">
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="اسمت (مثلاً: رفیق کافه)"
              className="sm:col-span-3 rounded-xl border-3 border-black bg-[#0d061c] px-3 py-2.5 text-sm font-bold text-white outline-none focus:border-yellow-400"
            />
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="یه تبریک یا شوخی باحال برای کیمیا بنویس..."
              className="sm:col-span-7 rounded-xl border-3 border-black bg-[#0d061c] px-3 py-2.5 text-sm font-bold text-white outline-none focus:border-yellow-400"
            />
            <button
              type="submit"
              className="sm:col-span-2 flex items-center justify-center gap-1.5 rounded-xl border-3 border-black bg-lime-400 px-4 py-2.5 text-sm font-black text-black shadow-[3px_3px_0_#000] hover:bg-lime-300 cursor-pointer"
            >
              <Send className="h-4 w-4" />
              <span>بفرست</span>
            </button>
          </form>

          <div className="grid gap-3 sm:grid-cols-2">
            {notes.map((n, i) => (
              <div
                key={i}
                className="rounded-2xl border-2 border-black bg-[#24134c] p-4 shadow-[4px_4px_0_#000]"
              >
                <div className="text-xs font-black text-yellow-300 mb-1">✨ {n.author}</div>
                <p className="text-sm font-medium text-purple-100">{n.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center text-xs font-bold text-purple-400 flex items-center justify-center gap-1.5">
          <span>ساخته‌شده با</span>
          <Heart className="h-4 w-4 text-pink-500 fill-pink-500" />
          <span>و کلی شوخی اختصاصی برای کیمیا باقری — نسخه ۲۲ سالگی</span>
        </div>
      </div>
    </footer>
  );
}
