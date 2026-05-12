import { motion, useMotionValue, useSpring } from 'motion/react';
import { useState, useEffect } from 'react';
import { Play, Pause } from 'lucide-react';
import { EuphoriaData } from '../schema';

export function SectionSecretVoice({ data }: { data: EuphoriaData }) {
  const [isPlaying, setIsPlaying] = useState(false);
  
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
  
  const handleToggle = () => {
    setIsPlaying(!isPlaying);
    // In a real implementation we would play an audio file here using a ref
  };

  const orbX = useSpring(rawMouseX, { stiffness: 40, damping: 20, mass: 0.5 });
  const orbY = useSpring(rawMouseY, { stiffness: 40, damping: 20, mass: 0.5 });
  const textX = useSpring(rawMouseX, { stiffness: 40, damping: 20, mass: 0.5 });
  const textY = useSpring(rawMouseY, { stiffness: 40, damping: 20, mass: 0.5 });

  const mappedOrbX = useSpring(orbX, { stiffness: 60, damping: 20 });
  const mappedOrbY = useSpring(orbY, { stiffness: 60, damping: 20 });

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center py-24 select-none pointer-events-none">
      
      <div className="relative flex flex-col items-center pointer-events-auto">
        {/* Glow behind orb */}
        <motion.div
           style={{ x: mouseX, y: mouseY }}
           animate={{
             scale: isPlaying ? [1, 1.3, 1] : 1,
             opacity: isPlaying ? [0.4, 0.8, 0.4] : 0.2
           }}
           transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
           className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-[80px] transition-colors duration-[3000ms] ${isPlaying ? 'bg-peach' : 'bg-lavender'} will-change-transform`}
        />

        {/* The Orb */}
        <motion.button
          onClick={handleToggle}
          whileTap={{ scale: 0.95 }}
          style={{ x: mappedOrbX, y: mappedOrbY }}
          className="relative z-10 w-32 h-32 md:w-40 md:h-40 rounded-full glass-panel flex items-center justify-center flex-col gap-2 group cursor-pointer shadow-[0_0_30px_rgba(255,255,255,0.05)] hover:shadow-[0_0_50px_rgba(184,168,255,0.2)] transition-shadow duration-700 will-change-transform"
        >
          {/* Inner ring */}
          <motion.div 
            animate={{ rotate: isPlaying ? 360 : 0 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute inset-2 rounded-full border border-softwhite/10 border-t-softwhite/40 border-b-softwhite/40 will-change-transform"
          />
          
          {isPlaying ? (
             <Pause className="w-8 h-8 text-softwhite/90 drop-shadow-md" strokeWidth={1} />
          ) : (
             <Play className="w-8 h-8 text-softwhite/90 drop-shadow-md ml-1" strokeWidth={1} />
          )}

        </motion.button>

        {/* Audio Meta */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          style={{ x: textX, y: textY }}
          className="mt-12 text-center will-change-transform pointer-events-none"
        >
          <p className="text-[10px] md:text-sm tracking-[0.3em] uppercase text-softwhite/50 font-light mb-4">
            Secret Voice Note
          </p>
          <div className="flex flex-col items-center">
            <h4 className="font-serif italic text-xl md:text-2xl text-softwhite border-b border-white/10 pb-2 inline-block">
              {data.voiceNote.title}
            </h4>
            <p className="font-mono text-[10px] text-softwhite/40 mt-4 tabular-nums">
              {isPlaying ? "PLAYING..." : data.voiceNote.durationLabel}
            </p>
          </div>
        </motion.div>

        {/* Fake waveform visualizer that reacts when playing */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 md:w-64 md:h-64 pointer-events-none opacity-50 z-20">
          {isPlaying && (
            <svg viewBox="0 0 100 100" className="w-full h-full absolute inset-0 text-softwhite">
              {Array.from({length: 36}).map((_, i) => (
                <motion.line
                  key={i}
                  x1="50" y1="50"
                  x2="50" y2="10"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  strokeLinecap="round"
                  transform={`rotate(${i * 10} 50 50)`}
                  animate={{
                     y2: [10, Math.random() * 20 + 20, 10]
                  }}
                  transition={{
                     duration: Math.random() * 0.5 + 0.5,
                     repeat: Infinity,
                     ease: "easeInOut"
                  }}
                  style={{ originX: '50px', originY: '50px' }}
                />
              ))}
            </svg>
          )}
        </div>
      </div>

    </section>
  );
}
