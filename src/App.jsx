import React, { useState, useEffect } from 'react';
import FloatingStickers from './components/FloatingStickers';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import NewsTicker from './components/NewsTicker';
import EvidenceGallery from './components/EvidenceGallery';
import MemeStudio from './components/MemeStudio';
import SpinWheel from './components/SpinWheel';
import KimiaQuiz from './components/KimiaQuiz';
import CakeCatchGame from './components/CakeCatchGame';
import FooterRoast from './components/FooterRoast';
import { soundFX } from './utils/sound';

const FONT_OPTIONS = [
  { family: 'MyBabyChubby', label: 'مای‌بیبی' },
  { family: 'Qafashat', label: 'قفشات' },
  { family: 'Paytakht', label: 'پایتخت' },
  { family: 'Yadgar', label: 'یادگار' },
];

export default function App() {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [fontIndex, setFontIndex] = useState(0);

  const currentFont = FONT_OPTIONS[fontIndex];

  useEffect(() => {
    document.documentElement.style.setProperty('--site-display-font', `'${currentFont.family}'`);
  }, [currentFont]);

  const handleToggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    soundFX.setEnabled(next);
    if (next) soundFX.playPop();
  };

  const handleCycleFont = () => {
    soundFX.playBoing();
    setFontIndex((prev) => (prev + 1) % FONT_OPTIONS.length);
  };

  return (
    <div dir="rtl" className="relative min-h-screen bg-[#0d061c] bg-comic-dots text-white selection:bg-yellow-400 selection:text-black">
      <FloatingStickers />
      <Navbar
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        fontLabel={currentFont.label}
        onCycleFont={handleCycleFont}
      />
      <main>
        <HeroSection />
        <NewsTicker />
        <EvidenceGallery />
        <MemeStudio />
        <SpinWheel />
        <KimiaQuiz />
        <CakeCatchGame />
      </main>
      <FooterRoast />
    </div>
  );
}
