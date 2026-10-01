import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { METRICS } from '../../utils/constants';

const FALLBACK_METRICS = [
  { label: 'Object Detection', value: 30, unit: 'fps', color: '#00e5ff' },
  { label: 'Response Time', value: 12, unit: 'ms', color: '#ff2d7b' },
  { label: 'Battery Life', value: 8, unit: 'hrs', color: '#00ff88' },
  { label: 'Weight', value: 2.5, unit: 'kg', color: '#ffb347' }
];

const Counter = ({ value, unit, color }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000;
      const startTime = performance.now();

      const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Ease out quad
        const easeProgress = progress * (2 - progress);
        
        setCount(Math.floor(easeProgress * value));

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setCount(value);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [isInView, value]);

  return (
    <div ref={ref} className="font-display text-4xl md:text-5xl font-bold flex items-baseline gap-1" style={{ color }}>
      {count}
      <span className="font-mono text-sm text-white/50">{unit}</span>
    </div>
  );
};

export default function Chapter10Performance() {
  const metrics = typeof METRICS !== 'undefined' ? METRICS : FALLBACK_METRICS;

  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center pointer-events-none p-4 md:p-8">
      <div className="w-full max-w-5xl pointer-events-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="font-display text-2xl md:text-3xl text-white tracking-widest uppercase mb-2">SYSTEM PERFORMANCE</h2>
          <div className="w-16 h-1 bg-[#ffb347]"></div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12">
          {metrics.map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#05070d]/80 border border-white/10 p-6 flex flex-col justify-center relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-2">
                <div className="w-1 h-1 bg-white/20 rounded-full" />
              </div>
              <p className="font-body text-xs text-white/60 mb-2 uppercase tracking-wider">{metric.label}</p>
              <Counter value={metric.value} unit={metric.unit} color={metric.color} />
              <p className="font-mono text-[9px] text-white/30 mt-4 uppercase">VALIDATED PROTOTYPE</p>
            </motion.div>
          ))}
        </div>

        {/* Demo Video Placeholder */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative w-full aspect-video bg-black/60 border border-white/20 flex flex-col items-center justify-center group cursor-pointer hover:border-[#00e5ff]/50 transition-colors"
        >
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white/40 group-hover:border-[#00e5ff]" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white/40 group-hover:border-[#00e5ff]" />
          
          <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm group-hover:bg-[#00e5ff]/20 group-hover:scale-110 transition-all duration-300">
            <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[16px] border-l-white border-b-[10px] border-b-transparent ml-1" />
          </div>
          <p className="mt-4 font-mono text-sm text-white/70 tracking-widest">VIEW DEMO PROOF</p>
          <p className="mt-2 font-mono text-[10px] text-white/30">[INSERT VIDEO URL OR EMBED]</p>
        </motion.div>
      </div>
    </div>
  );
}
