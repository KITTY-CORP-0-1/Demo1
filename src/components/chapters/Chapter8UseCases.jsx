import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { USE_CASES } from '../../utils/constants';

const FALLBACK_CASES = [
  { id: 1, title: 'Home Security', icon: '🏠', description: 'Autonomous night patrols and anomaly detection for residential safety.' },
  { id: 2, title: 'Warehouse Ops', icon: '🏭', description: 'Inventory scanning, leak detection, and night-time facility monitoring.' },
  { id: 3, title: 'Elder Care', icon: '👵', description: 'Fall detection and routine wellness checks with emergency alerts.' },
  { id: 4, title: 'Office Patrol', icon: '🏢', description: 'After-hours security, unlocked door detection, and perimeter sweeps.' }
];

const Card = ({ data }) => {
  const cardRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    
    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ rotateX: rotation.x, rotateY: rotation.y }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="min-w-[300px] h-[400px] bg-[#05070d]/90 border border-white/10 relative flex flex-col p-6 group cursor-default hover:border-[#00e5ff]/50 hover:shadow-[0_0_30px_rgba(0,229,255,0.15)] transition-all duration-300 shrink-0 snap-center"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-white/30 group-hover:border-[#00e5ff] transition-colors" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-white/30 group-hover:border-[#00e5ff] transition-colors" />
      
      <div className="text-5xl mb-6 transform translate-z-10 group-hover:scale-110 transition-transform origin-left">
        {data.icon}
      </div>
      
      <h3 className="font-display text-xl text-white mb-4 transform translate-z-10 group-hover:text-[#00e5ff] transition-colors">
        {data.title}
      </h3>
      
      <p className="font-body text-white/60 text-sm leading-relaxed transform translate-z-10">
        {data.description}
      </p>

      <div className="mt-auto pt-6 border-t border-white/10 flex justify-between items-center transform translate-z-10">
        <span className="font-mono text-[10px] text-white/40 group-hover:text-[#00e5ff]/60 tracking-widest">
          SYS.MODULE.{data.id}
        </span>
      </div>
    </motion.div>
  );
};

export default function Chapter8UseCases() {
  const cases = typeof USE_CASES !== 'undefined' ? USE_CASES : FALLBACK_CASES;

  return (
    <div className="relative w-full h-screen flex flex-col justify-center pointer-events-none overflow-hidden">
      <div className="w-full max-w-6xl mx-auto px-4 md:px-8 mb-8 pointer-events-auto">
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="font-display text-2xl md:text-3xl text-white tracking-widest uppercase"
        >
          REAL-WORLD APPLICATIONS
        </motion.h2>
        <motion.div 
          initial={{ opacity: 0, width: 0 }}
          whileInView={{ opacity: 1, width: '100px' }}
          viewport={{ once: true }}
          className="h-1 bg-[#00e5ff] mt-4"
        />
      </div>

      <div className="w-full overflow-x-auto pb-8 pt-4 px-4 md:px-8 snap-x snap-mandatory pointer-events-auto hide-scrollbar" style={{ perspective: '1000px' }}>
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } }
          }}
          className="flex gap-6 md:gap-8 w-max"
        >
          {cases.map((c, i) => (
            <motion.div
              key={c.id || i}
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0 }
              }}
            >
              <Card data={c} />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicators */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-2 pointer-events-none">
        {cases.map((_, i) => (
          <div key={i} className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-[#00e5ff]' : 'bg-white/20'}`} />
        ))}
      </div>
    </div>
  );
}
