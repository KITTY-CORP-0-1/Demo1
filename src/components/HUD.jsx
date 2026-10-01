import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useStore from '../stores/useStore';
import { CHAPTERS } from '../utils/constants';

export default function HUD() {
  const isLoaded = useStore((state) => state.isLoaded);
  const currentChapter = useStore((state) => state.currentChapter);
  const scrollProgress = useStore((state) => state.scrollProgress);
  const isMuted = useStore((state) => state.isMuted);
  const toggleMute = useStore((state) => state.toggleMute);
  const isMobile = useStore((state) => state.isMobile);
  
  const [fps, setFps] = useState(0);

  // Simple FPS counter
  useEffect(() => {
    if (!isLoaded) return;
    
    let frameCount = 0;
    let lastTime = performance.now();
    let rafId;

    const countFrames = (time) => {
      frameCount++;
      if (time - lastTime >= 1000) {
        setFps(frameCount);
        frameCount = 0;
        lastTime = time;
      }
      rafId = requestAnimationFrame(countFrames);
    };

    rafId = requestAnimationFrame(countFrames);
    return () => cancelAnimationFrame(rafId);
  }, [isLoaded]);

  const chapterName = CHAPTERS[currentChapter]?.title || 'SYS.BOOT';

  return (
    <AnimatePresence>
      {isLoaded && (
        <motion.div
          initial={{ opacity: 0, y: isMobile ? 20 : -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className={`fixed z-40 pointer-events-auto flex flex-col gap-2 p-3 bg-black/40 backdrop-blur-sm border border-cyan-500/30 ${
            isMobile ? 'bottom-4 left-4' : 'top-6 right-6'
          }`}
        >
          {/* HUD Brackets */}
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-400"></div>
          <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-cyan-400"></div>
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-cyan-400"></div>
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan-400"></div>

          <div className="flex items-center justify-between gap-4 font-mono text-xs uppercase text-cyan-200">
            <span className="truncate max-w-[120px]">{chapterName}</span>
            <span className="text-white/50">{fps} FPS</span>
          </div>

          <div className="w-full h-px bg-white/10 relative">
            <div 
              className="absolute top-0 left-0 h-full bg-cyan-400"
              style={{ width: `${scrollProgress * 100}%` }}
            />
          </div>

          <div className="flex justify-end pt-1">
            <button 
              onClick={toggleMute}
              className="text-[10px] font-mono text-white/50 hover:text-cyan-400 transition-colors"
            >
              [ {isMuted ? 'UNMUTE' : 'MUTE'} ]
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
