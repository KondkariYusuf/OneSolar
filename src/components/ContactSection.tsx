import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import contactImg from '../assets/image2.png';

export const ContactSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track the window width dynamically to ensure offscreen elements translate relative to actual viewport pixels
  const [windowWidth, setWindowWidth] = useState(1400);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth);
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  // Track global page scroll position to ensure smooth movement regardless of section page-bottom limits
  const { scrollY } = useScroll();

  // Make the satellite image shift upwards as the user scrolls down
  const y = useTransform(scrollY, [400, 1200], [80, -80]);

  // Translate the header as a single line from right-shift (windowWidth) to centered resting position (0px)
  // This reveals "Describe," first at the right edge, then "Design,", and finally "Deliver." sequentially as it slides left
  const textX = useTransform(scrollY, [300, 850], [windowWidth, 0]);

  // Translate the entire header upwards as you scroll past down to the early access section
  const textY = useTransform(scrollY, [1000, 1350], [0, -140]);

  // Exit split animations: text moves left, image moves right as you scroll down
  const textLeftX = useTransform(scrollY, [950, 1400], [0, -windowWidth * 0.6]);
  const imageRightX = useTransform(scrollY, [950, 1400], [0, windowWidth * 0.7]);

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-screen bg-white overflow-hidden select-none"
    >
      {/* Top: Huge Scroll-Driven Heading - reveals words one-by-one as it pushes leftwards, landing centered */}
      <div className="absolute top-12 left-0 right-0 w-full overflow-hidden whitespace-nowrap z-10 pointer-events-none py-2 flex justify-center">
        <motion.h1 
          style={{ x: textX, y: textY }}
          className="font-sans text-neutral-900 text-5xl sm:text-7xl md:text-[100px] lg:text-[120px] font-normal uppercase tracking-tighter text-center"
        >
          Describe, Design, Deliver.
        </motion.h1>
      </div>

      {/* Bottom-Left Description text (Non-bold, sized to not overlap the satellite image) */}
      <motion.div 
        style={{ x: textLeftX }}
        className="absolute left-6 md:left-16 lg:left-24 bottom-16 z-10 max-w-xl text-left pointer-events-auto"
      >
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <h2 className="font-sans text-neutral-600 text-base sm:text-lg md:text-[22px] font-normal leading-[1.35] tracking-tight max-w-[420px]">
            Describe it. OneSolar designs it.
            <br />
            From rooftop sketch to bankable engineering
            <br />
            — one conversation, zero fighting with software.
          </h2>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -180 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        style={{ x: imageRightX, y }}
        className="absolute bottom-0 right-0 w-full max-w-4xl"
      >
        <img
          src={contactImg}
          alt="Wellness Showcase Graphic"
          className="w-full h-auto object-contain block"
        />
      </motion.div>
    </div>
  );
};
