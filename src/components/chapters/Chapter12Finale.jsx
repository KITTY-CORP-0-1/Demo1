import React from 'react';
import { motion } from 'framer-motion';

export default function Chapter12Finale() {
  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center pointer-events-none p-4">
      <div className="w-full max-w-4xl flex flex-col items-center text-center pointer-events-auto">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="mb-6"
        >
          <span className="inline-block border border-white/20 bg-white/5 px-4 py-1.5 rounded-full font-mono text-xs text-white/70 uppercase tracking-widest mb-8">
            Hack in Hills '26 — Problem 01: Vision-Based Autonomous Robot
          </span>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-[#00e5ff] tracking-wider drop-shadow-[0_0_30px_rgba(0,229,255,0.3)] mb-4">
            KITTY SENTINEL
          </h1>
          <p className="font-body text-xl md:text-2xl text-white/70 tracking-wide">
            Eyes that think. Paws that decide.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, staggerChildren: 0.1 }}
          className="flex flex-col sm:flex-row gap-4 mt-12"
        >
          <button className="px-8 py-3 bg-[#00e5ff] text-[#05070d] font-display font-bold tracking-wider hover:bg-white hover:scale-105 hover:shadow-[0_0_20px_rgba(0,229,255,0.5)] transition-all duration-300 rounded-sm">
            WATCH DEMO
          </button>
          <button className="px-8 py-3 bg-transparent border border-[#00e5ff] text-[#00e5ff] font-display font-bold tracking-wider hover:bg-[#00e5ff]/10 hover:scale-105 transition-all duration-300 rounded-sm">
            VIEW ON GITHUB
          </button>
          <button className="px-8 py-3 bg-transparent border border-[#ffb347] text-[#ffb347] font-display font-bold tracking-wider hover:bg-[#ffb347]/10 hover:scale-105 transition-all duration-300 rounded-sm">
            MEET THE TEAM
          </button>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <p className="font-mono text-[10px] text-white/40 tracking-widest uppercase">
            © 2026 KITTY SENTINEL Team • Hack in Hills '26
          </p>
          <div className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent mt-2" />
          <span className="font-mono text-[10px] text-white/30 uppercase mt-2 hover:text-white/60 cursor-pointer transition-colors" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            RETURN TO TOP
          </span>
        </motion.div>

      </div>
    </div>
  );
}
