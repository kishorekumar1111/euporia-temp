import { motion, AnimatePresence } from 'motion/react';
import { EuphoriaData } from '../schema';
import { useEffect, useState } from 'react';

export function SectionDreamEntry({ data, onEnter }: { data: EuphoriaData, onEnter: () => void }) {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.section 
      exit={{ opacity: 0, filter: "blur(20px)", scale: 1.05 }}
      transition={{ duration: 2.5, ease: "easeIn" }}
      className="absolute inset-0 z-50 w-full h-full flex flex-col items-center justify-center overflow-hidden"
    >
      <motion.div 
        initial={{ opacity: 0, y: 15, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 4, ease: "easeOut", delay: 1 }}
        className="text-center px-6 max-w-4xl"
      >
        <h1 className="font-serif italic text-3xl sm:text-4xl md:text-5xl lg:text-[4rem] text-softwhite/95 leading-tight drop-shadow-[0_0_20px_rgba(255,255,255,0.2)] font-light tracking-wide">
          "{data.introText}"
        </h1>
      </motion.div>

      <AnimatePresence>
        {showButton && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 3, ease: "easeOut" }}
            onClick={onEnter}
            className="absolute bottom-24 flex flex-col items-center justify-center gap-6 group cursor-pointer"
          >
            {/* Glowing Orb Button */}
            <div className="relative w-16 h-16 rounded-full flex items-center justify-center">
              <motion.div 
                className="absolute inset-0 rounded-full border border-softwhite/20 group-hover:border-softwhite/60 transition-colors duration-1000"
                animate={{ scale: [1, 1.15, 1], rotate: [0, 90, 180] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />
              <motion.div 
                className="absolute inset-2 rounded-full border border-dashed border-softwhite/10 group-hover:border-softwhite/40 transition-colors duration-1000"
                animate={{ rotate: [360, 180, 0] }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              />
              <div className="w-2 h-2 rounded-full bg-softwhite/60 group-hover:bg-softwhite group-hover:shadow-[0_0_15px_#FAF7FF] transition-all duration-700" />
            </div>
            
            <span className="text-[10px] tracking-[0.4em] uppercase font-light text-softwhite/50 group-hover:text-softwhite/90 transition-colors duration-700 drop-shadow-md">
              Enter Euphoria
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
