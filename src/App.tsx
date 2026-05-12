import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'motion/react';
import { defaultData } from './data';
import { EuphoriaBackground } from './components/EuphoriaBackground';
import { SectionDreamEntry } from './components/SectionDreamEntry';
import { SectionFloatingMemories } from './components/SectionFloatingMemories';
import { SectionMemoryWaves } from './components/SectionMemoryWaves';
import { SectionOurEnergy } from './components/SectionOurEnergy';
import { SectionSecretVoice } from './components/SectionSecretVoice';
import { SectionFinalMessage } from './components/SectionFinalMessage';
import { ThemeControls } from './components/ThemeControls';
import { EditorPanel } from './components/EditorPanel';

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasEntered, setHasEntered] = useState(false);
  const [data, setData] = useState(defaultData);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Smooth scroll progress
  const smoothProgress = useSpring(scrollYProgress, { damping: 25, stiffness: 80, mass: 0.5 });

  useEffect(() => {
    if (hasEntered) {
      window.scrollTo(0, 0);
    }
  }, [hasEntered]);

  return (
    <div 
      ref={containerRef}
      className={`relative w-full bg-midnight text-softwhite antialiased font-sans selection:bg-pink/30 selection:text-white transition-colors duration-[3000ms] ${!hasEntered ? 'h-screen overflow-hidden' : ''}`}
    >
      {/* Fixed global background */}
      <EuphoriaBackground scrollProgress={smoothProgress} hasEntered={hasEntered} />
      
      {/* Theme Control */}
      {hasEntered && <ThemeControls />}
      
      {/* Editor Panel */}
      {hasEntered && <EditorPanel data={data} onChange={setData} />}

      <AnimatePresence mode="wait">
        {!hasEntered ? (
          /* @ts-expect-error key is used by AnimatePresence */
          <SectionDreamEntry key="entry" data={data} onEnter={() => setHasEntered(true)} />
        ) : (
          <motion.main 
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 3, ease: "easeOut" }}
            className="relative z-10 w-full flex flex-col"
          >
            <SectionFloatingMemories data={data} />
            <SectionMemoryWaves data={data} scrollProgress={smoothProgress} />
            <SectionOurEnergy scrollProgress={smoothProgress} />
            <SectionSecretVoice data={data} />
            <SectionFinalMessage data={data} scrollProgress={smoothProgress} />
          </motion.main>
        )}
      </AnimatePresence>

      <div className="noise-overlay" />
    </div>
  );
}
