import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import contactImg from '../assets/image2.png';

export const ContactSection = () => {
  const { isDark } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);

  // Track the window width dynamically to ensure offscreen elements translate relative to actual viewport pixels
  const [windowWidth, setWindowWidth] = useState(1400);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const updateDimensions = () => {
        setWindowWidth(window.innerWidth);
        setIsMobile(window.innerWidth < 768);
      };
      updateDimensions();
      window.addEventListener('resize', updateDimensions);
      return () => window.removeEventListener('resize', updateDimensions);
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
      className={`relative w-full min-h-screen ${isDark ? 'bg-black' : 'bg-white'} overflow-hidden select-none transition-colors duration-500 flex flex-col justify-between items-center md:block pt-28 md:pt-0 pb-0 md:pb-0`}
    >
      {/* Top: Huge Scroll-Driven Heading - sized to never cut off on narrow screens */}
      <div className="relative md:absolute top-0 md:top-12 left-0 right-0 w-full overflow-hidden whitespace-nowrap z-10 pointer-events-none py-2 flex justify-center px-2">
        <motion.h1
          style={{ x: textX, y: isMobile ? 0 : textY }}
          className={`font-sans ${isDark ? 'text-white' : 'text-neutral-900'} text-[19px] xs:text-[23px] sm:text-6xl md:text-[100px] lg:text-[120px] font-medium md:font-normal uppercase tracking-tight md:tracking-tighter text-center transition-colors duration-500`}
        >
          Describe, Design, Deliver.
        </motion.h1>
      </div>

      {/* Middle: Description text centered in the vertical space between header and satellite */}
      <motion.div
        style={{ x: isMobile ? 0 : textLeftX }}
        className="relative md:absolute left-0 md:left-16 lg:left-24 bottom-auto md:bottom-16 z-10 max-w-xl text-center md:text-left pointer-events-auto px-6 md:px-0 my-auto md:my-0 py-4 md:py-0"
      >
        <motion.div
          initial={{ opacity: 0, y: isMobile ? 15 : 0, x: isMobile ? 0 : -50 }}
          whileInView={{ opacity: 1, y: 0, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <h2 className={`font-sans ${isDark ? 'text-neutral-200 md:text-neutral-400' : 'text-neutral-800 md:text-neutral-600'} text-sm xs:text-base sm:text-lg md:text-[22px] font-medium md:font-normal leading-relaxed tracking-tight max-w-[440px] mx-auto md:mx-0 transition-colors duration-500`}>
            Describe it. OneSolar designs it.
            <br />
            From rooftop sketch to bankable engineering
            <br />
            — one conversation, zero fighting with software.
          </h2>
        </motion.div>
      </motion.div>

      {/* Bottom: Satellite Image anchored towards bottom */}
      <motion.div
        initial={{ opacity: 0, x: isMobile ? 0 : -180, y: isMobile ? 20 : 0 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        style={{ x: isMobile ? 0 : imageRightX, y: isMobile ? 0 : y }}
        className="relative md:absolute bottom-0 right-0 w-full max-w-md md:max-w-4xl mt-auto md:mt-0 px-2 sm:px-4 md:px-0 flex justify-center md:block"
      >
        <img
          src={contactImg}
          alt="Wellness Showcase Graphic"
          className="w-full max-h-[46vh] md:max-h-none object-contain block"
        />
      </motion.div>
    </div>
  );
};
