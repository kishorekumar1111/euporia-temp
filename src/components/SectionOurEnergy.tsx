import { motion, MotionValue, useTransform, useMotionValue, useSpring } from 'motion/react';
import { useEffect } from 'react';

export function SectionOurEnergy({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
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

  // Translate scroll into stunning rotation and scale for an abstract "energy core" visual
  const rotate1 = useTransform(scrollProgress, [0.5, 1], [0, 260]);
  const rotate2 = useTransform(scrollProgress, [0.5, 1], [0, -180]);
  const scale = useTransform(scrollProgress, [0.65, 0.8, 0.95], [0.6, 1.3, 0.8]);
  const opacity = useTransform(scrollProgress, [0.6, 0.75, 0.85, 0.95], [0, 1, 1, 0]);
  const scrollTextY = useTransform(scrollProgress, [0.65, 0.8], [50, 0]);

  const coreX = useTransform(mouseX, v => v * 80);
  const coreY = useTransform(mouseY, v => v * 80);
  
  const textX = useTransform(mouseX, v => v * -40);
  const textY = useTransform(mouseY, v => scrollTextY.get() + v * -40);

  return (
    <section className="relative w-full h-[200vh] flex justify-center items-center pointer-events-none">
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
         
         <motion.div
           style={{ opacity, x: textX, y: textY }}
           className="text-center z-30 mb-0 absolute top-[25%] will-change-transform"
         >
            <div className="flex flex-col items-center gap-6">
              <span className="w-[1px] h-8 bg-gradient-to-b from-transparent to-softwhite/50" />
              <p className="text-[10px] md:text-xs tracking-[0.5em] uppercase text-softwhite/80 font-light drop-shadow-md">
                The Heartspace
              </p>
            </div>
         </motion.div>

         {/* Abstract Core */}
         <motion.div 
           style={{ scale, opacity, x: coreX, y: coreY }}
           className="relative w-80 h-80 md:w-[500px] md:h-[500px] flex items-center justify-center z-10 will-change-transform"
         >
            {/* Layers of interlocking rings and shapes */}
            
            {/* Outer Aura */}
            <div className="absolute inset-[-20%] rounded-full bg-pink/10 mix-blend-screen blur-[60px] transition-colors duration-[3000ms]" />
            <div className="absolute inset-[-10%] rounded-full bg-lavender/20 mix-blend-screen blur-[40px] transition-colors duration-[3000ms]" />

            <motion.div 
              style={{ rotate: rotate1 }}
              className="absolute inset-[0%] border-[0.5px] border-pink/40 rounded-full mix-blend-screen will-change-transform shadow-[0_0_50px_rgba(255,184,217,0.2)] transition-colors duration-[3000ms]"
            />
            
            <motion.div 
              style={{ rotate: rotate2 }}
              className="absolute inset-[15%] border-[1.5px] border-lavender/50 rounded-full border-dashed mix-blend-screen will-change-transform shadow-[0_0_30px_rgba(167,139,250,0.3)] transition-colors duration-[3000ms]"
            />
            
            <motion.div 
              style={{ rotate: rotate1 }}
              className="absolute inset-[30%] border-[2px] border-peach/60 rounded-full border-dotted mix-blend-screen will-change-transform transition-colors duration-[3000ms]"
            />
            
            {/* Inner dynamic pulsing rings */}
            <motion.div 
              animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.7, 0.3] }} 
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-[40%] border-[1px] border-blue/80 rounded-full mix-blend-screen transition-colors duration-[3000ms]"
            />

            {/* Center node / Soul */}
            <motion.div 
               animate={{ scale: [1, 1.3, 1], filter: ["blur(8px)", "blur(20px)", "blur(8px)"] }}
               transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
               className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-softwhite mix-blend-screen shadow-[0_0_100px_#FAF7FF]"
            />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white blur-[2px]" />
         </motion.div>

      </div>
    </section>
  );
}
