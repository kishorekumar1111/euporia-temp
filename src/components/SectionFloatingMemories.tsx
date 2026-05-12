import { motion, useScroll, useTransform, useMotionValue, useSpring, MotionValue } from 'motion/react';
import { useRef, useEffect } from 'react';
import { EuphoriaData } from '../schema';

export function SectionFloatingMemories({ data }: { data: EuphoriaData }) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const rawMouseX = useMotionValue(0);
  const rawMouseY = useMotionValue(0);
  const mouseX = useSpring(rawMouseX, { stiffness: 40, damping: 20, mass: 0.5 });
  const mouseY = useSpring(rawMouseY, { stiffness: 40, damping: 20, mass: 0.5 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const sectionY = useTransform(scrollYProgress, [0, 1], [150, -150]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      rawMouseX.set((e.clientX / window.innerWidth) - 0.5);
      rawMouseY.set((e.clientY / window.innerHeight) - 0.5);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.section 
      ref={containerRef}
      style={{ y: sectionY, opacity }}
      className="relative w-full min-h-[140svh] py-40 overflow-hidden flex flex-col justify-center will-change-transform"
    >
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 right-0 w-[80vw] h-[80vw] max-w-[600px] border border-softwhite/5 rounded-full border-dashed opacity-50 will-change-transform"
        />
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 200, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-0 left-0 w-[60vw] h-[60vw] max-w-[400px] border border-softwhite/5 rounded-full border-dashed opacity-50 will-change-transform"
        />
      </div>

      <div className="relative z-10 w-full max-w-[90rem] mx-auto px-4 h-full flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-12">
        
        {data.floatingMemories.map((mem, i) => (
          <FloatingMemoryItem 
            key={mem.id}
            mem={mem}
            i={i}
            mouseX={mouseX}
            mouseY={mouseY}
            scrollYProgress={scrollYProgress}
          />
        ))}

      </div>
    </motion.section>
  );
}

function FloatingMemoryItem({ mem, i, mouseX, mouseY, scrollYProgress }: { key?: string, mem: any, i: number, mouseX: MotionValue<number>, mouseY: MotionValue<number>, scrollYProgress: MotionValue<number> }) {
  const zDepth = (i % 2 === 0 ? 1 : -1) * (i + 1) * 2;
  
  const parallaxX = useTransform(mouseX, v => v * 80 * zDepth);
  const rotateX = useTransform(mouseY, v => v * -25);
  const rotateY = useTransform(mouseX, v => v * 25);
  
  const reactiveScale = useTransform(mouseX, x => (mem.scale || 1) + Math.abs(x) * 0.05); // Simplified reactive scale to avoid useTransform array type issues
  const reactiveRotate = useTransform(mouseX, x => (i % 2 === 0 ? 2 : -3) + (x * 10));
  
  const bgX = useTransform(mouseX, v => v * -10);
  const bgY = useTransform(mouseY, v => v * -10);
  
  const captionX = useTransform(mouseX, v => v * 20);
  const captionY = useTransform(mouseY, v => v * 20);
  
  // staggered entry based on scroll
  const itemY = useTransform(scrollYProgress, [0, 0.4 + i * 0.1, 1], [200, 0, -200 + i * -50]);

  return (
    <motion.div
      className="relative w-full max-w-[300px] sm:max-w-[360px] aspect-[4/5] rounded-[2rem] overflow-hidden glass-panel group shadow-2xl xl:mx-8 will-change-transform"
      style={{
        y: itemY,
        zIndex: 10 - i,
        x: parallaxX,
        rotateX,
        rotateY,
        scale: reactiveScale,
        rotate: reactiveRotate,
      }}
      whileHover={{
        scale: (mem.scale || 1) * 1.05,
        rotate: i % 2 === 0 ? 4 : -5,
        zIndex: 50,
      }}
      transition={{ type: "spring", stiffness: 30, damping: 20 }}
    >
      {/* Image */}
      <div className="absolute inset-0 w-full h-full p-2 pb-24 pointer-events-none">
        <div className="relative w-full h-full rounded-[1.5rem] overflow-hidden bg-black/40">
          <motion.img 
            src={mem.image} 
            alt={mem.caption}
            style={{ x: bgX, y: bgY }}
            className="w-[110%] h-[110%] -left-[5%] -top-[5%] absolute object-cover opacity-75 group-hover:opacity-100 mix-blend-luminosity hover:mix-blend-normal transition-opacity duration-[1000ms] ease-out group-hover:scale-105 will-change-transform"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-midnight via-transparent to-transparent opacity-80" />
        </div>
      </div>
      
      {/* Caption */}
      <motion.div 
        style={{ x: captionX, y: captionY }}
        className="absolute bottom-0 left-0 w-full p-8 pt-0 flex flex-col items-center text-center pointer-events-none"
      >
        <p className="font-serif italic text-xl sm:text-2xl text-softwhite/95 drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)] tracking-wide">
          "{mem.caption}"
        </p>
        <div className="mt-4 w-6 h-[1px] bg-softwhite/30 group-hover:w-16 transition-all duration-[1000ms] ease-out" />
      </motion.div>

      {/* Hover Glow Edge Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none ring-1 ring-inset ring-softwhite/30 rounded-[2rem] shadow-[inset_0_0_60px_rgba(255,184,217,0.2)]" />
    </motion.div>
  );
}
