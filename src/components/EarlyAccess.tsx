import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { AppleHelloEnglishEffect } from './ui/apple-hello-effect';

export const EarlyAccess: React.FC = () => {
  const { isDark } = useTheme();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitted(true);
  };

  return (
    <section className={`relative w-full h-screen ${isDark ? 'bg-black' : 'bg-white'} flex flex-col justify-between items-center pt-24 select-none transition-colors duration-500`}>
      <div className="w-full max-w-2xl text-center flex flex-col items-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className={`font-inter ${isDark ? 'text-white' : 'text-neutral-900'} text-3xl sm:text-5xl font-normal leading-[1.1] tracking-tight mb-6 transition-colors duration-500`}>
            Secure early access.
          </h2>
          <p className={`font-inter ${isDark ? 'text-neutral-400' : 'text-neutral-500'} text-sm sm:text-base font-normal max-w-md mb-10 leading-relaxed transition-colors duration-500`}>
            Join the waitlist to build complete, construction-ready designs from simple conversation. Zero learning curve.
          </p>
        </motion.div>

        {/* Restore form to middle section */}
        <div className="w-full z-10">
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form
                key="early-access-form"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5 }}
                onSubmit={handleSubmit}
                className="w-full max-w-md flex flex-col sm:flex-row gap-3 items-stretch justify-center mx-auto"
              >
                <input
                  type="email"
                  required
                  placeholder="Enter your Gmail address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`flex-1 ${
                    isDark
                      ? 'bg-neutral-900 border-neutral-800 text-white placeholder-neutral-500 focus:bg-neutral-950 focus:border-white'
                      : 'bg-neutral-50 border-neutral-200 text-neutral-900 placeholder-neutral-400 focus:border-neutral-900 focus:bg-white'
                  } border rounded-full px-6 py-3.5 text-sm font-inter focus:outline-none transition-all`}
                />
                <button
                  type="submit"
                  className={`${
                    isDark
                      ? 'bg-white hover:bg-neutral-200 text-black'
                      : 'bg-black hover:bg-neutral-800 text-white'
                  } transition-colors duration-300 rounded-full px-8 py-3.5 text-sm font-inter font-medium flex items-center justify-center gap-2 cursor-pointer shadow-md active:scale-[0.98]`}
                >
                  <span>Request Invite</span>
                  <Send className={`w-4 h-4 ${isDark ? 'text-black' : 'text-white'}`} />
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="early-access-success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className={`flex flex-col items-center justify-center p-6 ${
                  isDark
                    ? 'bg-neutral-900 border-neutral-800 text-white'
                    : 'bg-neutral-50 border-neutral-100'
                } border rounded-2xl w-full max-w-md mx-auto`}
              >
                <CheckCircle className={`w-8 h-8 ${isDark ? 'text-white' : 'text-neutral-900'} mb-3 stroke-[1.5]`} />
                <p className={`text-sm font-inter font-medium ${isDark ? 'text-white' : 'text-neutral-950'}`}>
                  You're on the list!
                </p>
                <p className={`text-xs font-inter ${isDark ? 'text-neutral-400' : 'text-neutral-500'} mt-1 text-center`}>
                  We'll contact you at {email} as soon as space opens up.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Footer: Jet Black in light mode, Clean White with black text in dark mode */}
      <footer className={`w-full ${isDark ? 'bg-white' : 'bg-black'} pt-14 pb-8 flex flex-col items-center justify-center overflow-hidden transition-colors duration-500`}>
        {/* Huge Brand Text */}
        <div className="w-full text-center px-4 overflow-hidden leading-none select-none mb-4 flex flex-col items-center">
          <h2 className={`font-inter font-normal ${isDark ? 'text-black' : 'text-white'} text-[15vw] leading-none tracking-tighter whitespace-nowrap transition-colors duration-500`}>
            OneSolar
          </h2>
          <div className="w-full max-w-[450px] mx-auto flex justify-center mt-2 h-14">
            <AppleHelloEnglishEffect className="w-full h-full" />
          </div>
        </div>

        {/* Small spacing / copyright text below */}
        <div className="mt-8 text-center">
        </div>
      </footer>
    </section>
  );
};

export default EarlyAccess;

