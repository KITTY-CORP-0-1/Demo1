import React from 'react';
import { motion } from 'framer-motion';

const CARDS = [
  {
    title: 'PERCEIVE',
    text: 'Robots must see and understand their environment in real-time',
    icon: '👁️'
  },
  {
    title: 'DECIDE',
    text: 'They must make intelligent navigation decisions autonomously',
    icon: '🧠'
  },
  {
    title: 'NAVIGATE',
    text: 'They must move safely through unpredictable physical spaces',
    icon: '🧭'
  }
];

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.2 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export default function Chapter2Problem() {
  return (
    <div className="relative w-full h-[100vh] flex flex-col items-center justify-center bg-transparent z-10 pointer-events-none px-4">
      {/* Scanning line animation */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-[#00e5ff] opacity-30 shadow-[0_0_10px_#00e5ff] animate-[scan_3s_linear_infinite]" />
      
      <motion.h2 
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="font-display text-4xl md:text-5xl text-[#00e5ff] drop-shadow-[0_0_10px_rgba(0,229,255,0.8)] mb-12 text-center"
      >
        THE PROBLEM
      </motion.h2>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="flex flex-col md:flex-row gap-6 md:gap-8 max-w-6xl w-full justify-center"
      >
        {CARDS.map((card, i) => (
          <motion.div 
            key={i}
            variants={cardVariants}
            className="relative flex-1 bg-[#05070d]/80 border border-[#00e5ff]/30 p-6 backdrop-blur-sm shadow-[0_0_15px_rgba(0,229,255,0.1)] pointer-events-auto"
          >
            {/* HUD brackets */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#00e5ff]" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#00e5ff]" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#00e5ff]" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#00e5ff]" />

            <div className="text-4xl mb-4">{card.icon}</div>
            <h3 className="font-display text-xl text-white mb-2 tracking-wide">{card.title}</h3>
            <p className="font-body text-gray-400 text-sm md:text-base leading-relaxed">
              {card.text}
            </p>
          </motion.div>
        ))}
      </motion.div>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 0.5; }
          90% { opacity: 0.5; }
          100% { top: 100%; opacity: 0; }
        }
      `}} />
    </div>
  );
}
