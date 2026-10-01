import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Chapter7Sentinel() {
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setAlert(true);
      setTimeout(() => setAlert(false), 2000);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-screen flex items-center justify-center pointer-events-none p-4 sm:p-8">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={`pointer-events-auto max-w-3xl w-full border border-opacity-30 bg-[#05070d]/80 backdrop-blur-md p-6 rounded-sm transition-colors duration-300 relative ${alert ? 'border-[#ffb347] shadow-[0_0_20px_rgba(255,179,71,0.2)]' : 'border-[#00e5ff] shadow-[0_0_20px_rgba(0,229,255,0.1)]'}`}
      >
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#00e5ff] opacity-50" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#00e5ff] opacity-50" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#00e5ff] opacity-50" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#00e5ff] opacity-50" />

        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            <h2 className="font-display text-2xl text-[#00e5ff] mb-2 tracking-wider">SENTINEL MODE</h2>
            <p className="font-mono text-xs text-white/70 mb-6 tracking-widest uppercase">
              STATUS: {alert ? <span className="text-[#ffb347]">INTRUDER DETECTED</span> : <span className="text-[#00ff88]">ALL CLEAR</span>}
            </p>

            <div className="font-body text-white/80 space-y-4 mb-6 text-sm">
              <p>
                In Sentinel Mode, Kitty Sentinel autonomously patrols designated sectors, utilizing thermal imaging and motion sensors to detect anomalies.
              </p>
              <div className="bg-black/50 border border-white/10 p-3 rounded-sm font-mono text-xs">
                <div className="flex justify-between mb-1">
                  <span className="text-white/50">MODE:</span>
                  <span className="text-white">SENTINEL</span>
                </div>
                <div className="flex justify-between mb-1">
                  <span className="text-white/50">PATROL:</span>
                  <span className="text-[#00e5ff]">ACTIVE</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/50">THREATS:</span>
                  <span className={alert ? 'text-[#ffb347]' : 'text-white'}>{alert ? '1' : '0'}</span>
                </div>
              </div>
            </div>

            {alert && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-[#ffb347]/20 border border-[#ffb347] p-3 text-[#ffb347] font-mono text-xs text-center uppercase tracking-widest"
              >
                ⚠ ALERT: Motion Detected — Sector 3
              </motion.div>
            )}
          </div>

          <div className="flex-1 relative aspect-square bg-black/40 border border-white/10 overflow-hidden flex items-center justify-center">
             <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
             
             {/* Patrol Path Map */}
             <svg viewBox="0 0 100 100" className="w-[80%] h-[80%] overflow-visible opacity-50 relative z-10">
                <path d="M 10 10 L 90 10 L 90 90 L 10 90 Z" fill="none" stroke="#00e5ff" strokeWidth="0.5" strokeDasharray="2 2" />
                <path d="M 50 10 L 50 90" fill="none" stroke="#00e5ff" strokeWidth="0.5" strokeDasharray="2 2" />
             </svg>
             
             {/* Robot Blip */}
             <motion.div 
               animate={{
                 x: [-120, 120, 120, 0, 0, -120, -120],
                 y: [-120, -120, 120, 120, -120, -120, -120]
               }}
               transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
               className={`absolute w-3 h-3 rounded-full flex items-center justify-center z-20 ${alert ? 'bg-[#ff2d7b]' : 'bg-[#00ff88]'}`}
             >
               <div className={`absolute w-12 h-12 rounded-full opacity-30 ${alert ? 'bg-[#ff2d7b]' : 'bg-[#00ff88]'} animate-ping`} />
               {/* Sweep cone */}
               <motion.div 
                 animate={{ rotate: 360 }}
                 transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                 className="absolute top-1/2 left-1/2 w-24 h-24 origin-top-left opacity-20 pointer-events-none"
                 style={{
                   background: 'conic-gradient(from 0deg, transparent 0deg, currentColor 60deg, transparent 60deg)',
                   color: alert ? '#ff2d7b' : '#00e5ff'
                 }}
               />
             </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
