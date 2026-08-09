import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import RotatingEarth from '@/components/ui/wireframe-dotted-globe';

// Custom typewriter hook
function useTypewriter(text: string, speed = 38, startDelay = 600) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    let index = 0;
    let intervalId: ReturnType<typeof setInterval>;

    const timeoutId = setTimeout(() => {
      intervalId = setInterval(() => {
        if (index < text.length) {
          setDisplayed(text.slice(0, index + 1));
          index++;
        } else {
          setDone(true);
          clearInterval(intervalId);
        }
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [text, speed, startDelay]);

  return { displayed, done };
}

const SERVICE_OPTIONS = ['Brand', 'Digital', 'Campaign', 'Other'];

export const ContactSection = () => {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  // Typewriter hook
  const { displayed: headlineText, done: isTypewriterDone } = useTypewriter(
    "we'd love to\nhear from you!",
    38,
    600
  );

  const toggleService = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]
    );
  };

  return (
    <div className="relative w-full min-h-screen bg-white text-neutral-900 font-sans selection:bg-[#EAECE9] selection:text-[#1C2E1E] antialiased flex flex-col justify-between overflow-hidden">
      {/* Wireframe Dotted Globe (Unclipped canvas rendering with 100% responsive sizing) */}
      <div className="absolute -right-[22%] sm:-right-[14%] -bottom-[2%] sm:-bottom-[4%] lg:right-[-12%] lg:top-1/2 lg:-translate-y-1/2 lg:bottom-auto z-0 w-[500px] sm:w-[680px] lg:w-[860px] aspect-square flex items-center justify-center p-0 m-0 bg-transparent pointer-events-none">
        <RotatingEarth
          width={860}
          height={860}
          className="w-full h-full"
          dotColor="#1C2E1E"
          lineColor="#1C2E1E"
        />
      </div>

      {/* Content Layout Container (100% bg-transparent so globe flows seamlessly without any horizontal cutoff box) */}
      <div className="relative z-10 flex flex-col w-full min-h-screen justify-start lg:justify-center pb-12 pt-12 sm:pt-16 lg:pt-0 bg-transparent">
        <main
          id="spade-hero"
          className="w-full max-w-7xl mx-auto px-6 py-4 sm:py-12 flex-1 flex flex-col justify-start lg:justify-center bg-transparent"
        >
          {/* Typewriter Hook and Headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-6xl lg:text-[76px] font-normal tracking-tight text-black leading-[1.08] mb-4 sm:mb-8 select-none w-full whitespace-pre-wrap">
              {headlineText}
              {!isTypewriterDone && (
                <span className="inline-block w-[2px] h-[1.1em] bg-black align-middle ml-[2px] animate-blink" />
              )}
            </h1>
          </motion.div>

          {/* Secondary Description Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="text-base sm:text-xl text-[#5A635A] leading-relaxed font-normal mb-8 sm:mb-14 max-w-2xl">
              Whether you have questions, feedback, <br className="hidden sm:inline" /> drop us a message and we'll get back to you as soon as possible.
            </p>
          </motion.div>

          {/* Interactive Multi-Select Service Pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-xl sm:text-2xl font-medium tracking-tight mb-1 sm:mb-2 text-black">
              What sort of service?
            </h2>
            <p className="opacity-85 text-xs sm:text-base text-[#738273] mb-4 sm:mb-8">
              Select all that apply
            </p>

            <div className="flex flex-wrap gap-2.5 sm:gap-3 mb-4 sm:mb-6">
              {SERVICE_OPTIONS.map((service) => {
                const isSelected = selectedServices.includes(service);
                return (
                  <motion.button
                    key={service}
                    type="button"
                    onClick={() => toggleService(service)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`px-5 sm:px-6 py-2.5 sm:py-3.5 rounded-full font-medium text-sm sm:text-lg transition-all duration-200 flex items-center gap-2 cursor-pointer select-none ${
                      isSelected
                        ? 'bg-[#1C2E1E] text-white shadow-md shadow-emerald-950/5 transform'
                        : 'bg-white text-[#1C2E1E] border border-[#F1F3F1] hover:bg-[#F1F3F1]/55'
                    }`}
                  >
                    {service}
                    <AnimatePresence>
                      {isSelected && (
                        <motion.span
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        >
                          <Check className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>
                );
              })}
            </div>

            {/* Contingent Feedback Status Banner */}
            <AnimatePresence mode="wait">
              {selectedServices.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.5 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="italic text-xs text-[#5A635A] mt-1 select-none"
                >
                  Please click to select services above.
                </motion.div>
              ) : (
                <motion.div
                  key="active"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  className="overflow-hidden mt-3"
                >
                  <div className="bg-[#FAFBF9] border border-[#E8EBE7] rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 max-w-xl shadow-sm">
                    <div className="text-sm font-medium text-[#1C2E1E]">
                      Ready to inquire about:{' '}
                      <span className="font-semibold text-black">
                        {selectedServices.join(', ')}
                      </span>
                    </div>
                    <button className="flex items-center gap-1.5 text-[#4D6D47] hover:text-[#385233] font-semibold uppercase text-xs tracking-wider transition-colors cursor-pointer self-end sm:self-auto">
                      <span>Let's Go</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </main>
      </div>
    </div>
  );
};
