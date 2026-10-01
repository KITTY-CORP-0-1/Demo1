import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useStore from '../../stores/useStore';

// Fallback in case constants are not defined yet
const SENSOR_PARTS = [
  { id: 'lidar', name: 'LIDAR Array', desc: '360° laser scanning for precise mapping.', color: '#00e5ff', icon: '📡' },
  { id: 'camera', name: 'Stereo Vision', desc: 'Dual optical sensors for depth perception.', color: '#ffb347', icon: '📷' },
  { id: 'imu', name: 'IMU Sensor', desc: 'Measures acceleration and rotational velocity.', color: '#ff2d7b', icon: '⚖️' },
  { id: 'processor', name: 'Neural Core', desc: 'Onboard AI processing unit.', color: '#00ff88', icon: '🧠' },
  { id: 'battery', name: 'Power Cell', desc: 'High-density energy storage.', color: '#ffffff', icon: '🔋' }
];

export default function Chapter4Sensors() {
  const hoveredPart = useStore(state => state.hoveredPart);
  const setHoveredPart = useStore(state => state.setHoveredPart);

  const activePart = SENSOR_PARTS.find(p => p.id === hoveredPart);

  return (
    <div className="relative w-full h-[100vh] flex flex-col justify-end md:justify-center items-start p-8 md:p-20 z-10 pointer-events-none">
      <div className="w-full max-w-sm pointer-events-auto">
        <div className="relative bg-[#05070d]/80 border border-gray-800 p-6 backdrop-blur-md min-h-[150px]">
          {/* HUD brackets */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-gray-500 transition-colors" style={{ borderColor: activePart?.color || '#6b7280' }} />
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-gray-500 transition-colors" style={{ borderColor: activePart?.color || '#6b7280' }} />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-gray-500 transition-colors" style={{ borderColor: activePart?.color || '#6b7280' }} />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-gray-500 transition-colors" style={{ borderColor: activePart?.color || '#6b7280' }} />

          <AnimatePresence mode="wait">
            {activePart ? (
              <motion.div
                key={activePart.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col h-full justify-center"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{activePart.icon}</span>
                  <h3 className="font-display text-xl tracking-wider" style={{ color: activePart.color, textShadow: `0 0 10px ${activePart.color}80` }}>
                    {activePart.name}
                  </h3>
                </div>
                <p className="font-body text-gray-400 text-sm">
                  {activePart.desc}
                </p>
                <div className="mt-4 font-mono text-[10px] text-gray-500 border-t border-gray-800 pt-2">
                  STATUS: ONLINE | INTEGRITY: 100%
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="default"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col h-full justify-center items-center text-center opacity-50"
              >
                <span className="text-3xl mb-2">👆</span>
                <p className="font-mono text-sm text-gray-300">Hover over components to explore</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Chips */}
        <div className="flex flex-wrap gap-2 mt-4">
          {SENSOR_PARTS.map(part => (
            <button
              key={part.id}
              onMouseEnter={() => setHoveredPart(part.id)}
              onMouseLeave={() => setHoveredPart(null)}
              className={`font-mono text-[10px] px-3 py-1 border transition-all ${
                hoveredPart === part.id 
                  ? 'bg-white/10' 
                  : 'bg-transparent border-gray-800 text-gray-500 hover:border-gray-600'
              }`}
              style={{ 
                borderColor: hoveredPart === part.id ? part.color : undefined,
                color: hoveredPart === part.id ? part.color : undefined
              }}
            >
              {part.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
