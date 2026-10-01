import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useStore from '../stores/useStore';

const LOADING_MESSAGES = [
  'Establishing secure connection...',
  'Booting neural engine...',
  'Initializing sensory arrays...',
  'Calibrating servo motors...',
  'Loading behavioral heuristics...',
  'Synchronizing environmental map...',
  'System online. Awaiting directive.'
];

export default function Loader() {
  const isLoaded = useStore((state) => state.isLoaded);
  const loadProgress = useStore((state) => state.loadProgress);
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    if (isLoaded) return;
    
    // Cycle messages based on progress
    const idx = Math.floor((loadProgress / 100) * (LOADING_MESSAGES.length - 1));
    setMessageIndex(Math.min(idx, LOADING_MESSAGES.length - 1));
  }, [loadProgress, isLoaded]);

  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.div
          key="loader"
          initial={{ y: 0 }}
          exit={{ 
            y: '-100%', 
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
          }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#05070d] text-white"
        >
          <div className="w-full max-w-md px-8 text-center flex flex-col items-center">
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-display text-2xl md:text-4xl text-cyan-400 tracking-widest uppercase mb-12"
            >
              KITTY SENTINEL
            </motion.h1>
            
            <div className="w-full h-px bg-white/10 mb-2 relative overflow-hidden">
              <motion.div 
                className="absolute top-0 left-0 h-full bg-cyan-400"
                style={{ width: `${loadProgress}%` }}
              />
            </div>
            
            <div className="w-full flex justify-between text-xs font-mono text-cyan-400/70 uppercase">
              <span>System Boot</span>
              <span>{Math.round(loadProgress)}%</span>
            </div>
            
            <div className="mt-8 h-4 overflow-hidden relative w-full text-center">
              <AnimatePresence mode="wait">
                <motion.p
                  key={messageIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-xs font-mono text-white/50 absolute w-full"
                >
                  {LOADING_MESSAGES[messageIndex]}
                </motion.p>
              </AnimatePresence>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
