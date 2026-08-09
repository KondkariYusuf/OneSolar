import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Loader } from './components/Loader';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ContactSection } from './components/ContactSection';

export function App() {
  const [isLoaderFinished, setIsLoaderFinished] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create background audio instance immediately on website mount (during Loader)
    const audio = new Audio('/rain on my window (1).mp3');
    audio.loop = true;
    audio.volume = 0.5;
    audioRef.current = audio;

    // Immediately trigger playback on loader screen mount
    const playAudio = () => {
      if (audioRef.current) {
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {
            // Attach gesture fallback if browser restricts un-prompted autoplay
            const handleFirstGesture = () => {
              if (audioRef.current && audioRef.current.paused) {
                audioRef.current
                  .play()
                  .then(() => {
                    setIsPlaying(true);
                  })
                  .catch(() => {});
              }
              window.removeEventListener('click', handleFirstGesture);
              window.removeEventListener('touchstart', handleFirstGesture);
              window.removeEventListener('keydown', handleFirstGesture);
            };
            window.addEventListener('click', handleFirstGesture);
            window.addEventListener('touchstart', handleFirstGesture);
            window.addEventListener('keydown', handleFirstGesture);
          });
      }
    };

    playAudio();

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleSound = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          setIsPlaying(false);
        });
    }
  };

  return (
    <div className="bg-[#0a0608] min-h-screen text-white font-inter">
      <Loader onComplete={() => setIsLoaderFinished(true)} />
      <Navbar />
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={isLoaderFinished ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.92 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        className="w-full min-h-screen origin-center"
      >
        <Hero
          isLoaded={isLoaderFinished}
          isPlaying={isPlaying}
          onToggleSound={toggleSound}
        />
        <ContactSection />
      </motion.div>
    </div>
  );
}

export default App;
