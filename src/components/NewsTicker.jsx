import React from 'react';
import { motion } from 'framer-motion';
import { BREAKING_NEWS } from '../data/kimiaData';

export default function NewsTicker() {
  const combined = [...BREAKING_NEWS, ...BREAKING_NEWS];

  return (
    <div className="relative z-20 overflow-hidden border-y-4 border-black bg-yellow-400 py-2.5 text-black shadow-lg">
      <div className="flex items-center">
        <div className="z-10 shrink-0 border-l-4 border-black bg-rose-600 px-3 sm:px-4 py-1 font-qafashat text-xs sm:text-sm font-black text-white shadow-md">
          🔴 خبر فوری
        </div>
        <div className="relative flex-1 overflow-hidden" dir="ltr">
          <motion.div
            className="flex w-max whitespace-nowrap"
            animate={{ x: ['0%', '-50%'] }}
            transition={{ repeat: Infinity, ease: 'linear', duration: 95 }}
          >
            {combined.map((item, index) => (
              <span
                key={index}
                dir="rtl"
                className="font-qafashat inline-flex items-center gap-4 pl-10 text-base sm:text-lg tracking-tight"
              >
                <span>{item}</span>
                <span className="text-rose-700 font-black">★</span>
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
