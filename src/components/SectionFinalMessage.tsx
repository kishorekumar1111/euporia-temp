import { motion, MotionValue, useTransform } from 'motion/react';
import { EuphoriaData } from '../schema';

export function SectionFinalMessage({ data, scrollProgress }: { data: EuphoriaData, scrollProgress: MotionValue<number> }) {
  const opacity = useTransform(scrollProgress, [0.85, 0.95], [0, 1]);
  const y = useTransform(scrollProgress, [0.85, 1], [50, 0]);
  const blur = useTransform(scrollProgress, [0.85, 0.95], ["blur(20px)", "blur(0px)"]);

  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center pt-32 pb-24">
       <motion.div 
         style={{ opacity, y, filter: blur }}
         className="flex flex-col items-center text-center max-w-4xl px-6"
       >
          <h2 className="font-serif italic text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-softwhite drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] font-light leading-tight">
            "{data.finalMessage}"
          </h2>

          <div className="mt-20 md:mt-32 w-10 h-[1px] bg-white/20" />
          <p className="mt-8 text-[8px] sm:text-[10px] tracking-[0.4em] uppercase font-mono text-softwhite/30">
            Euphoria — {data.coupleName}
          </p>
       </motion.div>
    </section>
  )
}
