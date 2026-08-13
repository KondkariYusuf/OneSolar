import { useState } from 'react';

const NAV_LINKS = [
  { name: 'About', href: '#spade-hero' },
  { name: 'Services', href: '#services' },
  { name: 'Journal', href: '#journal' },
  { name: 'Contact', href: '#contact' },
];

export const Navbar = () => {
  const isScrolledToLight = true;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex flex-row items-center justify-between px-6 md:px-12 py-5 transition-colors duration-300">
        {/* Left: Brand Logo Image (Slightly larger size) */}
        <a href="#" className="z-50 flex items-center transition-all duration-300">
          <img
            src={isScrolledToLight ? '/logoBlack.png' : '/logoOnesolar.png'}
            alt="OneSolar Logo"
            className="h-10 sm:h-12 md:h-14 w-auto object-contain transition-opacity duration-300"
          />
        </a>

        {/* Center: Navigation Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-12">
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`text-sm tracking-wide transition-colors duration-300 font-inter ${
                isScrolledToLight
                  ? 'text-black/80 hover:text-black'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right: CTA Button (Desktop) */}
        <div className="hidden md:block">
          <button
            className={`px-8 py-3.5 rounded-full font-medium text-sm tracking-wide transition-all duration-300 button-glow cursor-pointer font-inter ${
              isScrolledToLight
                ? 'bg-black text-white hover:bg-black/90'
                : 'bg-white text-black hover:bg-white/90'
            }`}
          >
            Book a consultation
          </button>
        </div>

        {/* Right: Animated Hamburger Icon (Mobile) */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden z-50 relative w-6 h-5 flex flex-col justify-between items-center focus:outline-none cursor-pointer"
          aria-label="Toggle menu"
        >
          <span
            className={`w-full h-[2px] rounded transform transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              isScrolledToLight ? 'bg-black' : 'bg-white'
            } ${isMenuOpen ? 'rotate-45 translate-y-[9px]' : ''}`}
          />
          <span
            className={`w-full h-[2px] rounded transform transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              isScrolledToLight ? 'bg-black' : 'bg-white'
            } ${isMenuOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}`}
          />
          <span
            className={`w-full h-[2px] rounded transform transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              isScrolledToLight ? 'bg-black' : 'bg-white'
            } ${isMenuOpen ? '-rotate-45 -translate-y-[9px]' : ''}`}
          />
        </button>
      </header>

      {/* Mobile Menu Panel */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-40 w-[85%] max-w-[340px] backdrop-blur-xl p-8 pt-28 flex flex-col justify-between transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isScrolledToLight
            ? 'bg-white/95 border-l border-black/10 text-black'
            : 'bg-[#0a0608]/95 border-l border-white/10 text-white'
        } ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex flex-col gap-6">
          {NAV_LINKS.map((link, index) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              style={{
                transitionDelay: `${150 + index * 75}ms`,
              }}
              className={`text-xl tracking-wide font-inter transition-all duration-500 ${
                isScrolledToLight ? 'text-black' : 'text-white'
              } ${isMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}
            >
              {link.name}
            </a>
          ))}
        </div>

        <div
          style={{ transitionDelay: '450ms' }}
          className={`transition-all duration-500 ${
            isMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
          }`}
        >
          <button
            className={`w-full py-3.5 rounded-full font-medium text-sm tracking-wide transition-all duration-300 button-glow font-inter cursor-pointer ${
              isScrolledToLight
                ? 'bg-black text-white hover:bg-black/90'
                : 'bg-white text-black hover:bg-white/90'
            }`}
          >
            Book a consultation
          </button>
        </div>
      </div>
    </>
  );
};
