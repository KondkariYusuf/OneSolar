import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
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
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 450], [0, -120]);
  const opacity = useTransform(scrollY, [0, 350], [1, 0]);

  // Typewriter effect
  const { displayed: taglineText, done: isTypewriterDone } = useTypewriter("One prompt, one design.");

  // Scroll transformations for clouds parallax rising to cover the Earth
  // Mapped over a larger scroll distance (1000px) so they cover the Earth slowly and gradually
  const cloudY = useTransform(scrollY, [0, 1000], [450, 20]);
  const cloudOpacity = useTransform(scrollY, [0, 200, 800], [0, 0.6, 1]);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-white flex flex-col justify-start items-center select-none">
      {/* Background Image (Full screen & full width with smooth bottom transparency fade) */}
      <img
        src={heroImg}
        alt="Cosmic Wellness Journey Background"
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
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
          className="font-sans text-neutral-900 text-[26px] xs:text-[34px] sm:text-5xl md:text-7xl lg:text-8xl xl:text-[110px] font-normal leading-[1.02] tracking-tight text-center select-none whitespace-nowrap"
        >
          {taglineText}
          {!isTypewriterDone && (
            <span className="inline-block w-[4px] h-[0.9em] bg-neutral-900 align-middle ml-[4px] animate-blink" />
          )}
        </motion.h1>
      </div>

      {/* Volumetric Puffy Cloud Deck (Fades in and rises up on scroll to cover Earth seamlessly) */}
      <div className="absolute inset-x-0 bottom-0 h-[450px] z-20 pointer-events-none overflow-hidden">
        <motion.div
          style={{ y: cloudY, opacity: cloudOpacity }}
          className="absolute inset-0 flex items-end justify-center w-full"
        >
          {/* Volumetric cloud puffs of different sizes with custom filters and soft overlapping */}
          <div className="absolute bottom-[-10px] left-[-15%] w-[45%] aspect-[16/10] bg-white rounded-full filter blur-[40px] opacity-95" />
          <div className="absolute bottom-[-40px] left-[15%] w-[40%] aspect-[16/10] bg-white rounded-full filter blur-[50px] opacity-98" />
          <div className="absolute bottom-[-30px] left-[35%] w-[48%] aspect-[16/10] bg-white rounded-full filter blur-[55px] opacity-98" />
          <div className="absolute bottom-[-40px] right-[15%] w-[40%] aspect-[16/10] bg-white rounded-full filter blur-[50px] opacity-98" />
          <div className="absolute bottom-[-10px] right-[-15%] w-[45%] aspect-[16/10] bg-white rounded-full filter blur-[40px] opacity-95" />
        </motion.div>
      </div>
    </section>
  );
};
