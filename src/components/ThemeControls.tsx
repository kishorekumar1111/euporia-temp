import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

const themes = ['', 'theme-sunset', 'theme-deepspace', 'theme-dawn'];

export function ThemeControls() {
  const [themeIndex, setThemeIndex] = useState(0);

  useEffect(() => {
    // Initial theme based on time of day
    const hour = new Date().getHours();
    let initialIndex = 0; // Default midnight/standard
    
    if (hour >= 5 && hour < 10) initialIndex = 3; // Dawn
    else if (hour >= 17 && hour < 20) initialIndex = 1; // Sunset
    else if (hour >= 20 || hour < 5) initialIndex = 2; // Deep space
    
    setThemeIndex(initialIndex);
  }, []);

  useEffect(() => {
    // Remove all theme classes
    themes.forEach(t => t && document.body.classList.remove(t));
    
    // Add current theme class
    const currentTheme = themes[themeIndex];
    if (currentTheme) {
      document.body.classList.add(currentTheme);
    }
  }, [themeIndex]);

  const cycleTheme = () => {
    setThemeIndex((prev) => (prev + 1) % themes.length);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 5, duration: 2 }}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3"
    >
      <button
        onClick={cycleTheme}
        className="group relative flex items-center justify-center w-10 h-10 rounded-full bg-softwhite/5 border border-softwhite/10 hover:bg-softwhite/10 backdrop-blur-md transition-all duration-500 cursor-pointer overflow-hidden shadow-[0_0_15px_rgba(0,0,0,0.2)]"
        aria-label="Shift Atmosphere"
      >
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 bg-gradient-to-tr from-pink/20 via-transparent to-blue/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
        />
        <Sparkles className="w-4 h-4 text-softwhite/70 group-hover:text-softwhite transition-colors duration-500 relative z-10" />
      </button>
    </motion.div>
  );
}
