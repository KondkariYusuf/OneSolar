import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoaderProps {
  onComplete: () => void;
}

export const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
  const [isFinished, setIsFinished] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoEnded = () => {
    setIsFinished(true);
  };

  // Mobile view video handling & fallback fix
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.playbackRate = 1.4;

      // Mobile browser autoplay invocation & power-saver fallback
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Fallback if mobile OS restricts video autoplay
          setTimeout(handleVideoEnded, 2500);
        });
      }
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isFinished) {
        handleVideoEnded();
      }
    }, 15000);
    return () => clearTimeout(timer);
  }, [isFinished]);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {!isFinished && (
        <motion.div
          key="loader-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden pointer-events-none select-none"
        >
          {/* Mobile view object-contain with matching black video background */}
          <video
            ref={videoRef}
            src="/Animate_logo_for_website_loader_202608091550.mp4"
            autoPlay
            muted
            playsInline
            preload="auto"
            onPlay={(e) => {
              e.currentTarget.playbackRate = 1.4;
            }}
            onEnded={handleVideoEnded}
            className="w-full h-full object-contain sm:object-cover bg-black pointer-events-none"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
