import { motion } from "framer-motion";

export function AppleHelloEnglishEffect({ className }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center overflow-hidden ${className}`}>
      {/* Cursive Tagline with left-to-right wipe write-in animation */}
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ duration: 3.5, ease: [0.25, 1, 0.5, 1] }}
        className="overflow-hidden whitespace-nowrap flex justify-center w-full"
      >
        <span className="font-apple-hello text-white/30 text-[18px] sm:text-[22px] md:text-[26px] tracking-wide block py-2 select-none leading-none">
          one prompt, one design.
        </span>
      </motion.div>
    </div>
  );
}
