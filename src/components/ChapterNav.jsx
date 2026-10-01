import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useStore from '../stores/useStore';
import { CHAPTERS } from '../utils/constants';

export default function ChapterNav() {
  const isLoaded = useStore((state) => state.isLoaded);
  const currentChapter = useStore((state) => state.currentChapter);

  const scrollToChapter = (index) => {
    // Relying on Lenis or standard behavior to scroll to anchor
    const chapterId = CHAPTERS[index].id;
    const element = document.getElementById(chapterId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AnimatePresence>
      {isLoaded && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="fixed right-4 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-3 pointer-events-auto"
        >
          {CHAPTERS.map((chapter, index) => {
            const isActive = currentChapter === index;
            
            return (
              <button
                key={chapter.id}
                onClick={() => scrollToChapter(index)}
                className="group relative flex items-center justify-end w-8 h-4 outline-none"
                aria-label={`Go to ${chapter.shortName}`}
              >
                {/* Tooltip */}
                <span className="absolute right-6 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity font-mono text-[10px] text-cyan-400 uppercase whitespace-nowrap bg-black/60 px-2 py-0.5 rounded border border-cyan-500/30">
                  {chapter.shortName}
                </span>
                
                {/* Dot */}
                <motion.div 
                  className={`rounded-full transition-colors ${isActive ? 'bg-cyan-400' : 'bg-white/20 group-hover:bg-white/50'}`}
                  animate={{
                    width: isActive ? 6 : 4,
                    height: isActive ? 6 : 4,
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                />
              </button>
            );
          })}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
