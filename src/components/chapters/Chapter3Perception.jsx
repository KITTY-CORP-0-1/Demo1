import React, { useState } from 'react';
import { motion } from 'framer-motion';

const BOUNDING_BOXES = [
  { id: 1, label: 'Person 94%', left: '20%', top: '15%', width: '30%', height: '70%', color: '#00e5ff' },
  { id: 2, label: 'Chair 87%', left: '60%', top: '50%', width: '25%', height: '40%', color: '#ffb347' },
  { id: 3, label: 'Box 91%', left: '10%', top: '65%', width: '20%', height: '25%', color: '#ff2d7b' },
  { id: 4, label: 'Doorway 78%', left: '75%', top: '10%', width: '20%', height: '80%', color: '#00ff88' }
];

export default function Chapter3Perception() {
  const [activeToggles, setActiveToggles] = useState({
    objectDetection: true,
    sceneUnderstanding: false,
    depthMap: false
  });

  const toggleSetting = (key) => {
    setActiveToggles(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="relative w-full h-[100vh] flex flex-col items-center justify-center bg-transparent z-10 pointer-events-none px-4">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-4xl bg-[#05070d]/90 border border-[#00e5ff]/50 backdrop-blur-md p-6 pointer-events-auto shadow-[0_0_30px_rgba(0,229,255,0.15)] relative overflow-hidden"
      >
        {/* HUD Corners */}
        <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#00e5ff]" />
        <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#00e5ff]" />
        <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[#00e5ff]" />
        <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#00e5ff]" />

        <div className="flex justify-between items-center mb-4 border-b border-[#00e5ff]/20 pb-2">
          <h2 className="font-display text-xl text-[#00e5ff]">VISION CORE_</h2>
          <div className="font-mono text-xs text-gray-400">
            FPS: 30 | Objects: 4 | Confidence: 87.5%
          </div>
        </div>

        <div className="relative w-full aspect-video bg-[#0a0f18] overflow-hidden mb-6 border border-gray-800">
          {/* Scanlines */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] opacity-50 z-20 pointer-events-none" />
          
          {/* Depth Map overlay */}
          {activeToggles.depthMap && (
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/50 via-cyan-500/50 to-red-500/50 mix-blend-overlay z-10 transition-opacity duration-500" />
          )}

          {/* Bounding Boxes */}
          {activeToggles.objectDetection && BOUNDING_BOXES.map((box) => (
            <motion.div
              key={box.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, yoyo: Infinity, repeatDelay: Math.random() * 2 }}
              className="absolute z-30 flex flex-col"
              style={{
                left: box.left, top: box.top, width: box.width, height: box.height,
                border: `1.5px dashed ${box.color}`
              }}
            >
              <div 
                className="font-mono text-[10px] px-1 py-[2px] whitespace-nowrap self-start -mt-5"
                style={{ backgroundColor: `${box.color}40`, color: box.color, border: `1px solid ${box.color}` }}
              >
                {box.label}
              </div>
              
              {/* Corner markers on box */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2" style={{ borderColor: box.color }} />
              <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2" style={{ borderColor: box.color }} />
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2" style={{ borderColor: box.color }} />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2" style={{ borderColor: box.color }} />
            </motion.div>
          ))}
          
          {/* Mock Video Content (Static pattern) */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,transparent_0%,#000_100%)] z-0" />
        </div>

        {/* Toggles */}
        <div className="flex flex-wrap gap-4 justify-center">
          {Object.entries({
            objectDetection: 'Object Detection',
            sceneUnderstanding: 'Scene Understanding',
            depthMap: 'Depth Map'
          }).map(([key, label]) => (
            <button
              key={key}
              onClick={() => toggleSetting(key)}
              className={`font-mono text-xs px-4 py-2 border transition-all duration-300 ${
                activeToggles[key] 
                  ? 'bg-[#00e5ff]/20 border-[#00e5ff] text-[#00e5ff] shadow-[0_0_10px_rgba(0,229,255,0.3)]' 
                  : 'bg-transparent border-gray-700 text-gray-500 hover:border-gray-500'
              }`}
            >
              <span className="mr-2">{activeToggles[key] ? '■' : '□'}</span>
              {label}
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
