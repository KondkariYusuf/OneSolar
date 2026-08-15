import { useEffect } from 'react';
import Lenis from 'lenis';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ContactSection } from './components/ContactSection';
import { EarlyAccess } from './components/EarlyAccess';
import { MacDemoSection } from './components/MacDemoSection';

function AppContent() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      cancelAnimationFrame(rafId);
    };
  }, []);

  const { isDark } = useTheme();

  return (
    <div className={`${isDark ? 'bg-black text-white' : 'bg-white text-neutral-900'} min-h-screen font-inter transition-colors duration-500`}>
      <Navbar />
      <Hero />
      <ContactSection />
      <MacDemoSection />
      <EarlyAccess />
    </div>
  );
}

export function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;

