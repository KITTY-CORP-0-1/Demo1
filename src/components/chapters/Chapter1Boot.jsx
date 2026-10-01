import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const BOOT_TEXT = [
  "> INITIALIZING KITTY SENTINEL v2.6...",
  "> LOADING VISION CORE............ OK",
  "> CALIBRATING SENSORS............ OK",
  "> NEURAL ENGINE ONLINE........... OK",
  "> MOTOR SYSTEMS READY............ OK",
  "> ALL SYSTEMS NOMINAL",
  "> SENTINEL ACTIVE"
];

export default function Chapter1Boot() {
  const [lines, setLines] = useState([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [bootComplete, setBootComplete] = useState(false);

  useEffect(() => {
    if (currentLine >= BOOT_TEXT.length) {
      setTimeout(() => setBootComplete(true), 1000);
      return;
    }

    const text = BOOT_TEXT[currentLine];
    if (currentChar < text.length) {
      const timeout = setTimeout(() => {
        setLines(prev => {
          const newLines = [...prev];
          if (!newLines[currentLine]) newLines[currentLine] = '';
          newLines[currentLine] = text.slice(0, currentChar + 1);
          return newLines;
        });
        setCurrentChar(prev => prev + 1);
      }, Math.random() * 20 + 10);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setCurrentLine(prev => prev + 1);
        setCurrentChar(0);
      }, 200);
      return () => clearTimeout(timeout);
    }
  }, [currentLine, currentChar]);

  return (
    <div className="relative w-full h-[100vh] flex flex-col items-center justify-center bg-[#05070d] overflow-hidden pointer-events-none">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: bootComplete ? 0 : 1, opacity: bootComplete ? 0 : 1 }}
        transition={{ duration: 1 }}
        className="absolute w-4 h-4 bg-[#ffb347] rounded-full shadow-[0_0_20px_#ffb347]"
      />

      <div className="absolute top-[20%] left-[10%] md:left-[20%] font-mono text-[#00e5ff] text-sm md:text-base whitespace-pre z-10">
        {lines.map((line, i) => (
          <div key={i}>{line}</div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: bootComplete ? 1 : 0, y: bootComplete ? 0 : 50 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="z-20 flex flex-col items-center text-center mt-20"
      >
        <h1 className="font-display text-5xl md:text-7xl text-[#00e5ff] drop-shadow-[0_0_15px_rgba(0,229,255,0.8)]">
          KITTY SENTINEL
        </h1>
        <p className="font-body text-gray-400 mt-4 text-lg md:text-xl uppercase tracking-widest">
          Eyes that think. Paws that decide.
        </p>
      </motion.div>

      {/* HUD Borders */}
      <div className="absolute top-4 left-4 w-16 h-16 border-t-2 border-l-2 border-[#00e5ff] opacity-50" />
      <div className="absolute top-4 right-4 w-16 h-16 border-t-2 border-r-2 border-[#00e5ff] opacity-50" />
      <div className="absolute bottom-4 left-4 w-16 h-16 border-b-2 border-l-2 border-[#00e5ff] opacity-50" />
      <div className="absolute bottom-4 right-4 w-16 h-16 border-b-2 border-r-2 border-[#00e5ff] opacity-50" />

      {/* Badge */}
      <div className="absolute bottom-6 right-6 font-mono text-xs text-[#ffb347] opacity-70 border border-[#ffb347]/30 px-3 py-1 bg-[#ffb347]/10 z-20">
        Hack in Hills '26 — Problem 01
      </div>
    </div>
  );
}
