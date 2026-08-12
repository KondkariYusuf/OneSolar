import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type TimeState = 'sunrise' | 'morning' | 'noon' | 'evening' | 'sunset';

interface TimeOption {
  id: TimeState;
  label: string;
  image: string;
}

const TIME_OPTIONS: TimeOption[] = [
  { id: 'sunrise', label: 'Sunrise', image: '/earth_sunrise.png' },
  { id: 'morning', label: 'Morning', image: '/earth_morning.png' },
  { id: 'noon', label: 'Noon', image: '/earth_noon.png' },
  { id: 'evening', label: 'Evening', image: '/earth_evening.png' },
  { id: 'sunset', label: 'Sunset', image: '/earth_sunset.png' },
];

export const InteractiveSun: React.FC = () => {
  const [activeState, setActiveState] = useState<TimeState>('noon');

  const activeIndex = TIME_OPTIONS.findIndex((opt) => opt.id === activeState);
  const progressPercent = (activeIndex / (TIME_OPTIONS.length - 1)) * 100;

  return (
    <div className="w-full flex flex-col items-center bg-transparent mt-8 relative z-20">
      {/* Large Earth Display Area */}
      <div className="relative w-full h-[400px] md:h-[550px] overflow-hidden flex justify-center select-none">
        {/* Glow effect matching the active phase */}
        <div 
          className="absolute bottom-0 w-[600px] md:w-[900px] h-[300px] md:h-[450px] rounded-full blur-[80px] opacity-35 pointer-events-none transition-colors duration-1000"
          style={{
            background: activeState === 'sunrise' ? 'radial-gradient(circle, rgba(255,160,50,1) 0%, rgba(255,255,255,0) 70%)' :
                        activeState === 'morning' ? 'radial-gradient(circle, rgba(255,210,100,1) 0%, rgba(255,255,255,0) 70%)' :
                        activeState === 'noon' ? 'radial-gradient(circle, rgba(255,245,220,1) 0%, rgba(255,255,255,0) 70%)' :
                        activeState === 'evening' ? 'radial-gradient(circle, rgba(255,100,50,1) 0%, rgba(255,255,255,0) 70%)' :
                        'radial-gradient(circle, rgba(255,70,30,1) 0%, rgba(255,255,255,0) 70%)'
          }}
        />

        {/* Photorealistic Earth Images (Faded smoothly on transition) */}
        <div className="absolute bottom-0 w-[500px] sm:w-[700px] md:w-[900px] lg:w-[1100px] aspect-square rounded-full overflow-hidden shadow-[0_-15px_50px_rgba(0,0,0,0.15)] bg-black border border-white/5">
          <AnimatePresence mode="wait">
            <motion.img
              key={activeState}
              src={TIME_OPTIONS[activeIndex].image}
              alt={`Earth during ${activeState}`}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.85, ease: 'easeInOut' }}
              className="w-full h-full object-cover pointer-events-none"
            />
          </AnimatePresence>
        </div>
      </div>

      {/* Selector Panels Grid (Matching the mockup) */}
      <div className="w-full max-w-6xl px-4 mt-6 md:mt-10 select-none">
        <div className="grid grid-cols-5 gap-2 sm:gap-4 md:gap-6">
          {TIME_OPTIONS.map((option) => {
            const isActive = option.id === activeState;
            return (
              <button
                key={option.id}
                onClick={() => setActiveState(option.id)}
                className={`relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer group transition-all duration-300 border-2 ${
                  isActive ? 'border-neutral-800 scale-102 shadow-lg' : 'border-transparent opacity-75 hover:opacity-100 hover:scale-101'
                }`}
              >
                {/* Thumbnail background */}
                <img
                  src={option.image}
                  alt={option.label}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Label Overlay */}
                <div className="absolute inset-0 bg-black/45 flex items-center justify-center p-1 sm:p-2 text-center">
                  <span className="text-[10px] sm:text-xs md:text-sm font-semibold tracking-wide text-white uppercase">
                    {option.label}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Timeline Slider bar indicator */}
        <div className="relative w-full h-[2px] bg-neutral-200 mt-8 rounded-full">
          <motion.div
            className="absolute top-0 h-full bg-neutral-800 rounded-full"
            style={{ left: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          />
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-neutral-800 border-2 border-white rounded-full shadow-md"
            animate={{ left: `calc(${progressPercent}% - 7px)` }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          />
        </div>
      </div>
    </div>
  );
};
