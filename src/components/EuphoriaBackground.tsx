import { motion, MotionValue, useTransform, useMotionValue, useSpring } from 'motion/react';
import { useEffect, useState } from 'react';

export function EuphoriaBackground({ scrollProgress, hasEntered }: { scrollProgress: MotionValue<number>, hasEntered: boolean }) {
  // Parallax the gradients slightly based on scroll
  const y1 = useTransform(scrollProgress, [0, 1], ["0%", "40%"]);
  const y2 = useTransform(scrollProgress, [0, 1], ["0%", "-40%"]);
  
  // Shift colors as we scroll deep into the experience
  const opacityPink = useTransform(scrollProgress, [0, 0.4, 0.8], [0.5, 0.1, 0.6]);
  const opacityLavender = useTransform(scrollProgress, [0, 0.5, 1], [0.2, 0.6, 0.3]);
  const opacityBlue = useTransform(scrollProgress, [0.3, 0.7, 1], [0, 0.5, 0.7]);
  const opacityPeach = useTransform(scrollProgress, [0, 0.4, 1], [0, 0.2, 0.8]);

  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; s: number; duration: number }>>([]);
  
  // High performance mouse tracking values
  const rawMouseX = useMotionValue(0);
  const rawMouseY = useMotionValue(0);
  const rawClick = useMotionValue(0);
  
  const mouseX = useSpring(rawMouseX, { stiffness: 40, damping: 20, mass: 0.5 });
  const mouseY = useSpring(rawMouseY, { stiffness: 40, damping: 20, mass: 0.5 });
  const clickSpring = useSpring(rawClick, { stiffness: 100, damping: 15 });

  useEffect(() => {
    // Generate fewer particles for better performance
    const newParticles = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      s: Math.random() * 2 + 1,
      duration: Math.random() * 30 + 20,
    }));
    setParticles(newParticles);
  }, []);

  useEffect(() => {
    // We bind directly to window to avoid React synthetic events on high-frequency events
    const handleMouseMove = (e: MouseEvent) => {
      rawMouseX.set((e.clientX / window.innerWidth) - 0.5);
      rawMouseY.set((e.clientY / window.innerHeight) - 0.5);
    };

    const handleMouseDown = () => rawClick.set(1);
    const handleMouseUp = () => rawClick.set(0);
    const handleTouchStart = () => rawClick.set(1);
    const handleTouchEnd = () => rawClick.set(0);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  // Compute transformations outside render for 60fps
  const orb1X = useTransform(mouseX, v => v * -250);
  const orb1Y = useTransform(mouseY, v => v * -250);
  const orb1Scale = useTransform(clickSpring, [0, 1], [1, 1.25]);
  const orb1Brightness = useTransform(clickSpring, [0, 1], [1, 1.4]);
  const orb1Filter = useTransform(orb1Brightness, v => `brightness(${v})`);

  const orb2X = useTransform(mouseX, v => v * 300);
  const orb2Y = useTransform(mouseY, v => v * 200);
  const orb2Scale = useTransform(clickSpring, [0, 1], [1, 1.3]);
  const orb2Brightness = useTransform(clickSpring, [0, 1], [1, 1.5]);
  const orb2Filter = useTransform(orb2Brightness, v => `brightness(${v})`);

  const orb3X = useTransform(mouseX, v => v * -150);
  const orb3Y = useTransform(mouseY, v => v * 350);
  const orb3Scale = useTransform(clickSpring, [0, 1], [1, 1.2]);
  const orb3Brightness = useTransform(clickSpring, [0, 1], [1, 1.6]);
  const orb3Filter = useTransform(orb3Brightness, v => `brightness(${v})`);

  const orb4X = useTransform(mouseX, v => v * 250);
  const orb4Y = useTransform(mouseY, v => v * -250);
  const orb4Scale = useTransform(clickSpring, [0, 1], [1, 1.35]);
  const orb4Brightness = useTransform(clickSpring, [0, 1], [1, 1.3]);
  const orb4Filter = useTransform(orb4Brightness, v => `brightness(${v})`);

  const groupOpacity = useTransform(clickSpring, [0, 1], [hasEntered ? 0.6 : 0.2, hasEntered ? 0.8 : 0.4]);
  const groupScale = useTransform(clickSpring, [0, 1], [1, 1.05]);
  const groupX = useTransform(mouseX, v => v * -40);
  const groupY = useTransform(mouseY, v => v * -40);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-midnight transition-colors duration-[3000ms]">
      {/* High-Performance Radial Gradients (No Blur Filter) */}
      <motion.div 
        style={{ x: orb1X, y: orb1Y, scale: orb1Scale, filter: orb1Filter }}
        className="absolute inset-0 will-change-transform"
      >
        <motion.div 
          style={{ y: y1, opacity: hasEntered ? opacityPink : 0.4 }}
          className="absolute -top-[20%] -left-[10%] w-[90vw] h-[90vw] max-w-[1200px] max-h-[1200px] mix-blend-screen will-change-transform transition-colors duration-[3000ms]"
          style={{ background: 'radial-gradient(circle, var(--color-pink) 0%, transparent 60%)' }}
          animate={{ scale: [1, 1.15, 1], x: [0, 50, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
      
      <motion.div 
        style={{ x: orb2X, y: orb2Y, scale: orb2Scale, filter: orb2Filter }}
        className="absolute inset-0 will-change-transform"
      >
        <motion.div 
          style={{ y: y2, opacity: hasEntered ? opacityLavender : 0.2 }}
          className="absolute top-[20%] -right-[20%] w-[80vw] h-[80vw] max-w-[1000px] max-h-[1000px] mix-blend-screen will-change-transform transition-colors duration-[3000ms]"
          style={{ background: 'radial-gradient(circle, var(--color-lavender) 0%, transparent 60%)' }}
          animate={{ scale: [1, 1.25, 1], x: [0, -60, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      <motion.div 
        style={{ x: orb3X, y: orb3Y, scale: orb3Scale, filter: orb3Filter }}
        className="absolute inset-0 will-change-transform"
      >
        <motion.div 
          style={{ y: y1, opacity: hasEntered ? opacityBlue : 0 }}
          className="absolute bottom-[-10%] left-[10%] w-[70vw] h-[70vw] max-w-[900px] max-h-[900px] mix-blend-screen will-change-transform transition-colors duration-[3000ms]"
          style={{ background: 'radial-gradient(circle, var(--color-blue) 0%, transparent 60%)' }}
          animate={{ scale: [1, 1.15, 1], y: [0, -50, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      <motion.div 
        style={{ x: orb4X, y: orb4Y, scale: orb4Scale, filter: orb4Filter }}
        className="absolute inset-0 will-change-transform"
      >
        <motion.div 
          style={{ y: y2, opacity: hasEntered ? opacityPeach : 0 }}
          className="absolute top-[40%] right-[10%] w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] mix-blend-screen will-change-transform transition-colors duration-[3000ms]"
          style={{ background: 'radial-gradient(circle, var(--color-peach) 0%, transparent 60%)' }}
          animate={{ scale: [1, 1.2, 1], x: [0, 30, 0] }}
          transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Floating Particles */}
      <motion.div 
        className="absolute inset-0 z-10 will-change-transform"
        initial={{ opacity: 0 }}
        style={{ 
           opacity: groupOpacity,
           scale: groupScale,
           x: groupX,
           y: groupY
        }}
        animate={{ opacity: hasEntered ? 1 : 0 }}
        transition={{ duration: 2 }}
      >
        {particles.map(p => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-softwhite mix-blend-screen"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.s,
              height: p.s,
            }}
            animate={{
              y: [0, -150, 0],
              x: [0, Math.sin(p.id) * 30, 0],
              opacity: [0, p.s > 1.5 ? 0.9 : 0.5, 0],
              scale: [1, 1.5, 1],
              boxShadow: [
                "0 0 0px rgba(250, 247, 255, 0)",
                p.s > 1.5 ? "0 0 12px 2px rgba(250, 247, 255, 0.8)" : "0 0 6px 1px rgba(250, 247, 255, 0.4)",
                "0 0 0px rgba(250, 247, 255, 0)"
              ]
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: "linear",
              delay: p.duration * Math.random() // staggered start
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}
