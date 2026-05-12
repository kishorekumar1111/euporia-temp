import { motion, useScroll, useTransform, MotionValue, useMotionValue, useSpring } from 'motion/react';
import { useRef, useEffect } from 'react';
import { EuphoriaData } from '../schema';

export function SectionMemoryWaves({ data, scrollProgress }: { data: EuphoriaData, scrollProgress: MotionValue<number> }) {
  const sectionRef = useRef<HTMLElement>(null);
  
  // Create a localized scroll value for this section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const rawMouseX = useMotionValue(0);
  const rawMouseY = useMotionValue(0);
  const mouseX = useSpring(rawMouseX, { stiffness: 40, damping: 20, mass: 0.5 });
  const mouseY = useSpring(rawMouseY, { stiffness: 40, damping: 20, mass: 0.5 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      rawMouseX.set((e.clientX / window.innerWidth) - 0.5);
      rawMouseY.set((e.clientY / window.innerHeight) - 0.5);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Smooth horizontal scroll
  const xTransform = useTransform(scrollYProgress, [0.1, 0.9], ["20%", "-90%"]);
  const opacity = useTransform(scrollYProgress, [0.1, 0.3, 0.7, 0.9], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0.1, 0.5, 0.9], [0.9, 1, 0.9]);

  const imagesX = useTransform(mouseX, v => v * -30);
  const imagesY = useTransform(mouseY, v => v * -30);
  const textX = useTransform(mouseX, v => v * 30);
  const textY = useTransform(mouseY, v => v * 30);

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full h-[400vh]" // Long height to allow rich scrolling
    >
      <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden pt-20">
        
        <motion.div 
          style={{ opacity }}
          className="absolute top-[18%] md:top-[15%] w-full flex justify-center z-20 pointer-events-none"
        >
          <div className="flex flex-col items-center gap-6">
            <span className="w-[1px] h-12 bg-gradient-to-b from-transparent to-softwhite/30" />
            <p className="text-[10px] md:text-xs tracking-[0.6em] uppercase text-softwhite/80 font-light drop-shadow-lg">
              Memory Streams
            </p>
          </div>
        </motion.div>

        <motion.div 
          style={{ x: xTransform, opacity, scale }}
          className="flex items-center gap-12 md:gap-24 px-[10vw] will-change-transform"
        >
          {data.memoryWaves.map((wave, idx) => {
            const isEven = idx % 2 === 0;
            const yOffset = isEven ? "-translate-y-[15%]" : "translate-y-[15%]";

            return (
              <motion.div 
                key={wave.id}
                className={`relative shrink-0 w-[75vw] sm:w-[60vw] md:w-[45vw] lg:w-[35vw] aspect-[16/10] rounded-[2rem] overflow-hidden glass-panel group ${yOffset} transition-all duration-1000 shadow-[0_20px_50px_rgba(0,0,0,0.5)]`}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                {/* Background ambient light for image */}
                <div className="absolute inset-0 bg-gradient-to-br from-pink/20 to-blue/20 mix-blend-overlay z-10 transition-all duration-[3000ms] group-hover:opacity-0" />
                <div className="absolute inset-0 bg-midnight/50 mix-blend-multiply z-10 transition-all duration-[3000ms] group-hover:opacity-10" />
                
                <motion.img 
                  style={{ x: imagesX, y: imagesY }}
                  src={wave.image} 
                  alt={wave.caption} 
                  className="w-[110%] h-[110%] -left-[5%] -top-[5%] absolute object-cover transform scale-110 group-hover:scale-100 transition-transform duration-[3000ms] ease-out filter blur-[3px] group-hover:blur-0 grayscale-[30%] group-hover:grayscale-0 will-change-transform"
                />
                
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-8 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-[1500ms] bg-gradient-to-t from-midnight/80 via-midnight/20 to-transparent pointer-events-none">
                  <motion.h3 
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    style={{ x: textX, y: textY }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="font-serif italic text-4xl sm:text-5xl lg:text-6xl text-softwhite drop-shadow-[0_0_20px_rgba(255,255,255,0.4)] will-change-transform"
                  >
                    {wave.caption}
                  </motion.h3>
                </div>

                <div className="absolute inset-0 border border-softwhite/10 group-hover:border-softwhite/40 rounded-[2rem] z-30 transition-colors duration-1000 pointer-events-none" />
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
