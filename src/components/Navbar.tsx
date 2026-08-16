import { Lightbulb, Download, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const Navbar = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex flex-row items-center justify-between px-4 sm:px-6 md:px-12 py-3 sm:py-5 transition-colors duration-300">
      {/* Left: Brand Logo Image (logoBlack.png for light mode, logoOnesolar.png for dark mode) */}
      <a href="#" className="z-50 flex items-center transition-all duration-300">
        <img
          src={isDark ? '/logoOnesolar.png' : '/logoBlack.png'}
          alt="OneSolar Logo"
          className="h-10 sm:h-20 md:h-24 w-auto object-contain transition-all duration-300"
        />
      </a>

      {/* Right: Idea PDF Download Button & Theme Toggle Button */}
      <div className="flex items-center gap-2 sm:gap-3 z-50 translate-y-[2px] md:translate-y-[3px]">
        <a
          href="/oneSolar_idea.pdf"
          download="oneSolar_idea.pdf"
          className={`px-3.5 sm:px-5 py-1.5 sm:py-2.5 rounded-full font-medium text-xs sm:text-sm tracking-wide transition-all duration-300 flex items-center gap-1.5 sm:gap-2 cursor-pointer font-inter border shadow-xs hover:scale-[1.02] active:scale-[0.98] ${
            isDark
              ? 'bg-neutral-900/90 text-white hover:bg-neutral-800 border-neutral-800 shadow-neutral-950/50'
              : 'bg-neutral-100/90 text-black hover:bg-neutral-200 border-neutral-200'
          }`}
          title="Download oneSolar idea PDF"
        >
          <Lightbulb className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-500 fill-amber-500/20" />
          <span>Idea</span>
          <Download className="w-3 h-3 sm:w-3.5 sm:h-3.5 opacity-60" />
        </a>

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className={`p-2 sm:p-2.5 rounded-full transition-all duration-300 flex items-center justify-center cursor-pointer border shadow-xs hover:scale-[1.05] active:scale-[0.95] ${
            isDark
              ? 'bg-neutral-900/90 text-amber-400 hover:bg-neutral-800 hover:text-amber-300 border-neutral-800'
              : 'bg-neutral-100/90 text-neutral-700 hover:bg-neutral-200 hover:text-neutral-900 border-neutral-200'
          }`}
          aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {isDark ? (
            <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 rotate-0 hover:rotate-45" />
          ) : (
            <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 -rotate-12 hover:rotate-0" />
          )}
        </button>
      </div>
    </header>
  );
};

export default Navbar;

