import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import heroImg from '../assets/hero copy.png';

// Typewriter hook for tagline (loops infinitely)
function useTypewriter(text: string, speed = 80, delayBetweenLoops = 2500) {
  const [displayed, setDisplayed] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    const handleType = () => {
      const isComplete = !isDeleting && displayed === text;
      const isCleared = isDeleting && displayed === '';

      if (isComplete) {
        timer = setTimeout(() => setIsDeleting(true), delayBetweenLoops);
      } else if (isCleared) {
        setIsDeleting(false);
      } else {
        const nextText = isDeleting
          ? text.slice(0, displayed.length - 1)
          : text.slice(0, displayed.length + 1);

        setDisplayed(nextText);
        timer = setTimeout(handleType, isDeleting ? speed / 2 : speed);
      }
    };

    timer = setTimeout(handleType, speed);

    return () => clearTimeout(timer);
  }, [displayed, isDeleting, text, speed, delayBetweenLoops]);

  return { displayed, done: !isDeleting && displayed === text };
}

export const Hero: React.FC = () => {
  const { isDark } = useTheme();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 450], [0, -120]);
  const opacity = useTransform(scrollY, [0, 350], [1, 0]);

  // Typewriter effect
  const { displayed: taglineText, done: isTypewriterDone } = useTypewriter("Site brief to ready proposal.");

  // Scroll transformations for clouds parallax rising to cover the Earth
  // Mapped over a larger scroll distance (1000px) so they cover the Earth slowly and gradually
  const cloudY = useTransform(scrollY, [0, 1000], [450, 20]);
  const cloudOpacity = useTransform(scrollY, [0, 200, 800], [0, 0.6, 1]);

  return (
    <section className={`relative w-full h-screen overflow-hidden ${isDark ? 'bg-black' : 'bg-white'} flex flex-col justify-start items-center select-none transition-colors duration-500`}>
      {/* Background Image (Full screen & full width with smooth bottom transparency fade) */}
      <img
        src={isDark ? '/heroDark.png' : heroImg}
        alt="Cosmic Wellness Journey Background"
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none transition-all duration-500"
        style={{
          maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 68%, rgba(0,0,0,0) 95%)',
          WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 68%, rgba(0,0,0,0) 95%)',
        }}
      />

      {/* Overlay tagline */}
      <div className="w-full max-w-7xl z-10 flex flex-col items-center text-center mt-36 px-4">
        <motion.h1
          style={{ y, opacity }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className={`font-sans ${isDark ? 'text-white' : 'text-neutral-900'} text-[26px] xs:text-[34px] sm:text-5xl md:text-7xl lg:text-8xl xl:text-[110px] font-normal leading-[1.02] tracking-tight text-center select-none whitespace-nowrap min-h-[1.5em] flex items-center justify-center transition-colors duration-500`}
        >
          <span>{taglineText}</span>
          <span className={`inline-block w-[4px] h-[0.85em] ${isDark ? 'bg-white' : 'bg-neutral-900'} align-middle ml-[4px] animate-blink transition-opacity duration-150 ${isTypewriterDone ? 'opacity-0' : 'opacity-100'}`} />
        </motion.h1>

        <motion.p
          style={{ y, opacity }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className={`mt-3 sm:mt-4 font-sans ${isDark ? 'text-neutral-400' : 'text-neutral-600'} text-[10px] xs:text-xs sm:text-base md:text-xl lg:text-2xl xl:text-3xl font-light leading-snug tracking-tight text-center select-none whitespace-nowrap transition-colors duration-500`}
        >
          An AI design agent built for solar installers, EPCs, and engineers.
        </motion.p>

      </div>

      {/* Animated Scroll Indicator at Bottom Center */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1.5 cursor-pointer pointer-events-auto group"
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        aria-label="Scroll to next section"
      >
        <div className={`w-5 h-8.5 rounded-full border-[1.5px] ${isDark ? 'border-neutral-700 bg-neutral-900/60 group-hover:border-white' : 'border-neutral-400/80 bg-white/30 group-hover:border-neutral-900'} flex items-start justify-center p-1.5 backdrop-blur-xs shadow-xs transition-colors duration-300`}>
          <motion.div
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className={`w-1 h-2 ${isDark ? 'bg-neutral-300 group-hover:bg-white' : 'bg-neutral-600 group-hover:bg-neutral-900'} rounded-full transition-colors duration-300`}
          />
        </div>
        <ChevronDown className={`w-3.5 h-3.5 ${isDark ? 'text-neutral-400 group-hover:text-white' : 'text-neutral-500 group-hover:text-neutral-900'} transition-colors duration-300`} />
      </motion.div>

      {/* Volumetric Puffy Cloud Deck (Fades in and rises up on scroll to cover Earth seamlessly) */}
      <div className="absolute inset-x-0 bottom-0 h-[450px] z-20 pointer-events-none overflow-hidden">
        <motion.div
          style={{ y: cloudY, opacity: cloudOpacity }}
          className="absolute inset-0 flex items-end justify-center w-full"
        >
          {/* Volumetric cloud puffs of different sizes with custom filters and soft overlapping */}
          <div className={`absolute bottom-[-10px] left-[-15%] w-[45%] aspect-[16/10] ${isDark ? 'bg-black' : 'bg-white'} rounded-full filter blur-[40px] opacity-95 transition-colors duration-500`} />
          <div className={`absolute bottom-[-40px] left-[15%] w-[40%] aspect-[16/10] ${isDark ? 'bg-black' : 'bg-white'} rounded-full filter blur-[50px] opacity-98 transition-colors duration-500`} />
          <div className={`absolute bottom-[-30px] left-[35%] w-[48%] aspect-[16/10] ${isDark ? 'bg-black' : 'bg-white'} rounded-full filter blur-[55px] opacity-98 transition-colors duration-500`} />
          <div className={`absolute bottom-[-40px] right-[15%] w-[40%] aspect-[16/10] ${isDark ? 'bg-black' : 'bg-white'} rounded-full filter blur-[50px] opacity-98 transition-colors duration-500`} />
          <div className={`absolute bottom-[-10px] right-[-15%] w-[45%] aspect-[16/10] ${isDark ? 'bg-black' : 'bg-white'} rounded-full filter blur-[40px] opacity-95 transition-colors duration-500`} />
        </motion.div>
      </div>
    </section>
  );
};

