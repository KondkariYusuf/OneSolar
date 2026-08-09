import React from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';

interface HeroProps {
  isLoaded?: boolean;
  isPlaying?: boolean;
  onToggleSound?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  isLoaded = true,
  isPlaying = true,
  onToggleSound,
}) => {
  return (
    <section className="relative w-full h-screen overflow-hidden bg-[#0a0608] flex flex-col justify-center items-center select-none">
      {/* Background Video */}
      <video
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260613_180732_a54afbf6-b30d-470e-861f-669871f09f67.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/20 z-10 pointer-events-none" />

      {/* Center Content with Entrance Animation on Loader Finish */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="-mt-[120px] pointer-events-auto flex flex-col items-center px-4 max-w-5xl"
        >
          <h1 className="font-instrument text-white text-[36px] md:text-7xl lg:text-[110px] leading-[0.9] tracking-tight text-center text-glow select-none">
            Gentle touch. Radiant presence.
          </h1>
          <p className="text-white/70 text-sm md:text-base text-center mt-5 md:mt-7 max-w-xl font-inter leading-relaxed">
            Expert beauty and holistic wellness, delivered with warmth and intention.
          </p>
          <button className="mt-6 md:mt-9 bg-white text-black px-8 py-3.5 rounded-full font-medium text-sm tracking-wide hover:bg-white/90 transition-all duration-300 button-glow font-inter cursor-pointer">
            Begin your renewal
          </button>
        </motion.div>
      </div>

      {/* Sound Indicator & Toggle Button (Visible on BOTH Mobile & Desktop) */}
      <div className="flex items-center gap-2.5 sm:gap-3 absolute bottom-6 sm:bottom-8 left-6 sm:left-8 z-20">
        <button
          onClick={onToggleSound}
          className="w-10 h-10 rounded-full border border-white/30 bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:border-white/60 transition-all duration-300 cursor-pointer shadow-lg active:scale-95 pointer-events-auto"
          aria-label={isPlaying ? 'Mute background music' : 'Play background music'}
        >
          {isPlaying ? (
            <Volume2 className="w-4 h-4 text-white animate-pulse" />
          ) : (
            <VolumeX className="w-4 h-4 text-white/60" />
          )}
        </button>
        <div className="flex flex-col text-white/80 text-xs font-inter leading-tight select-none">
          <span className="font-medium text-white">{isPlaying ? 'Sound On' : 'Sound Off'}</span>
          <span className="text-[10px] sm:text-xs opacity-75">Rain on my window</span>
        </div>
      </div>
    </section>
  );
};
