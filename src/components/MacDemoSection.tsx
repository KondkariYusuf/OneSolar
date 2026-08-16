import React, { useRef } from 'react';
import { useScroll, useTransform } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { Mac } from './ui/mac';
import screenImg1 from '../assets/image1.png';
import screenImg2 from '../assets/image22.png';
import screenImg3 from '../assets/image4.png';
import screenImg4 from '../assets/image3.png';

export const MacDemoSection: React.FC = () => {
  const { isDark } = useTheme();
  const sectionRef = useRef<HTMLDivElement>(null);

  // Track scroll position of the parent track relative to the sticky pin window
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  // Crossfade transition for 4 images:
  // - screenImg1: visible from 0 to 0.15, fades out between 0.15 and 0.35
  // - screenImg2: fades in between 0.15 and 0.35, visible until 0.45, fades out between 0.45 and 0.65
  // - screenImg3: fades in between 0.45 and 0.65, visible until 0.75, fades out between 0.75 and 0.95
  // - screenImg4: fades in between 0.75 and 0.95, visible until 1.00
  const opacity1 = useTransform(scrollYProgress, [0, 0.15, 0.35, 1], [1, 1, 0, 0]);
  const opacity2 = useTransform(scrollYProgress, [0, 0.15, 0.35, 0.45, 0.65, 1], [0, 0, 1, 1, 0, 0]);
  const opacity3 = useTransform(scrollYProgress, [0, 0.45, 0.65, 0.75, 0.95, 1], [0, 0, 1, 1, 0, 0]);
  const opacity4 = useTransform(scrollYProgress, [0, 0.75, 0.95, 1], [0, 0, 1, 1]);

  return (
    <section
      ref={sectionRef}
      className={`relative w-full h-[220vh] md:h-[400vh] ${isDark ? 'bg-black' : 'bg-white'} select-none transition-colors duration-500`}
    >

      {/* Sticky full-screen wrapper to pin the iMac in place while the page scrolls */}
      <div className="sticky top-0 w-full h-screen flex flex-col justify-center items-center overflow-hidden px-2 sm:px-6">
        {/* Mac Presentation Container */}
        <div className="w-full max-w-6xl flex justify-center items-center px-1 sm:px-4">
          <div className="w-full aspect-[6/5] max-w-5xl flex justify-center items-center text-neutral-100">
            <Mac
              src={screenImg1}
              src2={screenImg2}
              src3={screenImg3}
              src4={screenImg4}
              opacity1={opacity1}
              opacity2={opacity2}
              opacity3={opacity3}
              opacity4={opacity4}
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
