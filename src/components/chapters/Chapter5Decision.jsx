import React from 'react';
import { motion } from 'framer-motion';

const PIPELINE_NODES = [
  { id: 'cam', label: 'CAMERA', desc: 'Raw RGB-D input', icon: '📹' },
  { id: 'det', label: 'DETECTION', desc: 'Identify entities', icon: '🎯' },
  { id: 'scene', label: 'SCENE REASONING', desc: 'Context analysis', icon: '🧠' },
  { id: 'path', label: 'PATH PLANNER', desc: 'Compute trajectory', icon: '🗺️' },
  { id: 'motor', label: 'MOTOR CONTROL', desc: 'Actuator signals', icon: '⚙️' }
];

export default function Chapter5Decision() {
  return (
    <div className="relative w-full h-[100vh] flex flex-col items-center justify-center bg-transparent z-10 pointer-events-none px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-5xl bg-[#05070d]/80 border border-[#00e5ff]/30 p-8 backdrop-blur-md shadow-[0_0_20px_rgba(0,229,255,0.1)] rounded-lg pointer-events-auto"
      >
        <h2 className="font-display text-2xl text-[#00e5ff] mb-12 text-center tracking-widest">
          DECISION ENGINE PIPELINE
        </h2>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-2">
          {PIPELINE_NODES.map((node, i) => (
            <React.Fragment key={node.id}>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 0.5 }}
                className="relative flex flex-col items-center p-4 bg-black/50 border border-gray-700 rounded-lg w-full md:w-40 z-10"
              >
                {/* Pulsing effect behind node */}
                <div className="absolute inset-0 bg-[#00e5ff]/5 rounded-lg animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
                
                <span className="text-3xl mb-3">{node.icon}</span>
                <h3 className="font-display text-xs text-[#00e5ff] text-center mb-1">{node.label}</h3>
                <p className="font-body text-[10px] text-gray-400 text-center">{node.desc}</p>
              </motion.div>

              {/* Connecting line */}
              {i < PIPELINE_NODES.length - 1 && (
                <div className="hidden md:flex relative flex-1 h-[2px] bg-gray-800 mx-2 items-center">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00e5ff]/50 to-transparent" />
                  {/* Flow particle */}
                  <div className="w-2 h-2 bg-[#00e5ff] rounded-full shadow-[0_0_8px_#00e5ff] absolute left-0 animate-[moveRight_2s_linear_infinite]" style={{ animationDelay: `${i * 0.2}s` }} />
                </div>
              )}
              {/* Mobile arrow */}
              {i < PIPELINE_NODES.length - 1 && (
                <div className="md:hidden text-[#00e5ff] text-xl animate-bounce">
                  ↓
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="mt-12 text-center">
          <span className="inline-block font-mono text-xs text-gray-300 border border-gray-700 bg-gray-900/50 px-4 py-2 rounded-full">
            Powered by YOLOv8 + MiDaS + ROS2 Nav2
          </span>
        </div>
      </motion.div>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes moveRight {
          0% { left: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { left: 100%; opacity: 0; }
        }
      `}} />
    </div>
  );
}
