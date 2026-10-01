import React from 'react';
import { motion } from 'framer-motion';
import { TECH_LAYERS } from '../../utils/constants';

const FALLBACK_LAYERS = [
  { name: 'CONTROL', color: '#ff2d7b', items: ['Motor Drivers', 'PID Loop', 'Inverse Kinematics'] },
  { name: 'PLANNING', color: '#00ff88', items: ['Pathfinding', 'Obstacle Avoidance', 'State Machine'] },
  { name: 'PERCEPTION', color: '#00e5ff', items: ['Computer Vision', 'Object Detection', 'SLAM'] },
  { name: 'HARDWARE', color: '#ffb347', items: ['Sensors', 'Actuators', 'MCU', 'Power System'] }
];

export default function Chapter9TechStack() {
  const layers = typeof TECH_LAYERS !== 'undefined' ? TECH_LAYERS : FALLBACK_LAYERS;

  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center pointer-events-none p-4">
      <div className="max-w-4xl w-full pointer-events-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-2xl md:text-3xl text-white tracking-widest uppercase mb-2">SYSTEM ARCHITECTURE</h2>
          <p className="font-mono text-sm text-[#00e5ff]">Built with Python • OpenCV • PyTorch • ROS2 • Arduino</p>
        </motion.div>

        <div className="flex flex-col gap-4 relative">
          {layers.map((layer, index) => (
            <motion.div
              key={layer.name}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, type: 'spring' }}
              className="relative group cursor-default"
            >
              {/* Connector lines between layers (except last one) */}
              {index < layers.length - 1 && (
                <div className="absolute left-1/2 -bottom-4 w-px h-4 bg-white/20">
                  <motion.div 
                    animate={{ y: [0, 16, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: index * 0.3 }}
                    className="w-1 h-1 bg-white absolute -left-[1.5px]" 
                  />
                </div>
              )}

              <div 
                className="bg-[#05070d]/80 backdrop-blur-sm border border-white/10 p-4 flex flex-col md:flex-row items-center gap-6 hover:border-white/30 transition-all duration-300 relative overflow-hidden"
                style={{ '--layer-color': layer.color }}
              >
                {/* Glow effect on hover */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                  style={{ backgroundColor: layer.color }}
                />

                <div className="w-full md:w-40 flex items-center justify-center md:justify-start shrink-0">
                  <h3 
                    className="font-display text-lg tracking-widest font-bold"
                    style={{ color: layer.color }}
                  >
                    {layer.name}
                  </h3>
                </div>

                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 w-full">
                  {layer.items.map((item) => (
                    <span 
                      key={item} 
                      className="font-mono text-xs px-3 py-1 bg-white/5 border border-white/10 rounded-full text-white/80 group-hover:border-white/20 transition-colors"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
