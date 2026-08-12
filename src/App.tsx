import { useEffect } from 'react';
import Lenis from 'lenis';
import { Hero } from './components/Hero';
import { ContactSection } from './components/ContactSection';
import { EarlyAccess } from './components/EarlyAccess';
import { MacDemoSection } from './components/MacDemoSection';

export function App() {
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

  return (
    <div className="bg-white min-h-screen text-neutral-900 font-inter">
      <Hero />
      <ContactSection />
      <MacDemoSection />
      <EarlyAccess />
    </div>
  );
}

export default App;
