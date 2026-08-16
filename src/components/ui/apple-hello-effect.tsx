import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";

export function AppleHelloEnglishEffect({ className }: { className?: string }) {
  const { isDark } = useTheme();

  return (
    <div className={`relative flex items-center justify-center overflow-hidden ${className}`}>
      {/* Cursive Tagline with left-to-right wipe write-in animation */}
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ duration: 3.5, ease: [0.25, 1, 0.5, 1] }}
        className="overflow-hidden whitespace-nowrap flex justify-center w-full"
      >
        <span className={`font-apple-hello ${isDark ? 'text-black/40' : 'text-white/30'} text-[14px] xs:text-[18px] sm:text-[22px] md:text-[26px] tracking-wide block py-2 select-none leading-none transition-colors duration-500`}>
          one prompt, one design.
        </span>
      </motion.div>
    </div>
  );
}

