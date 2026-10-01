import React from 'react';
import { motion } from 'framer-motion';
import { TEAM_MEMBERS, ROADMAP } from '../../utils/constants';

const FALLBACK_TEAM = [
  { name: 'Alice', role: 'Hardware Lead', avatar: '👩‍💻' },
  { name: 'Bob', role: 'AI / Vision', avatar: '👨‍🔬' },
  { name: 'Charlie', role: 'Control Systems', avatar: '🧑‍🔧' },
  { name: 'Diana', role: 'Frontend & UI', avatar: '👩‍🎨' }
];

const FALLBACK_ROADMAP = [
  { phase: 'PHASE 1', title: 'Concept & Simulation', description: 'Initial 3D modeling and physics simulations in ROS2.', status: 'done' },
  { phase: 'PHASE 2', title: 'Prototype Assembly', description: 'Building the physical robot with 3D printed parts.', status: 'current' },
  { phase: 'PHASE 3', title: 'Autonomous Navigation', description: 'Deploying SLAM and pathfinding algorithms.', status: 'next' }
];

export default function Chapter11Team() {
  const team = typeof TEAM_MEMBERS !== 'undefined' ? TEAM_MEMBERS : FALLBACK_TEAM;
  const roadmap = typeof ROADMAP !== 'undefined' ? ROADMAP : FALLBACK_ROADMAP;

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center pointer-events-none p-4 md:p-8 py-20 overflow-y-auto">
      <div className="w-full max-w-4xl pointer-events-auto flex flex-col gap-16">
        
        {/* Team Section */}
        <section>
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="font-display text-2xl md:text-3xl text-white tracking-widest uppercase mb-8"
          >
            THE TEAM
          </motion.h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-[#05070d]/60 border border-white/10 p-6 flex flex-col items-center text-center group hover:-translate-y-2 hover:border-[#00e5ff]/50 transition-all duration-300"
              >
                <div className="w-20 h-20 rounded-full border border-white/20 bg-white/5 flex items-center justify-center text-4xl mb-4 group-hover:shadow-[0_0_20px_rgba(0,229,255,0.3)] transition-all">
                  {member.avatar}
                </div>
                <h3 className="font-display text-lg text-white group-hover:text-[#00e5ff] transition-colors">{member.name}</h3>
                <p className="font-body text-sm text-white/50 mt-1">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Roadmap Section */}
        <section>
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="font-display text-2xl md:text-3xl text-white tracking-widest uppercase mb-8"
          >
            ROADMAP
          </motion.h2>

          <div className="relative pl-8">
            {/* Timeline Line */}
            <div className="absolute left-[15px] top-4 bottom-4 w-px bg-white/10" />

            <div className="flex flex-col gap-8">
              {roadmap.map((item, i) => {
                const isDone = item.status === 'done';
                const isCurrent = item.status === 'current';
                
                return (
                  <motion.div
                    key={item.phase}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 }}
                    className="relative pl-8"
                  >
                    {/* Status Dot */}
                    <div className="absolute -left-[30.5px] top-1.5 flex items-center justify-center">
                      <div className={`w-3 h-3 rounded-full border-2 ${
                        isDone ? 'bg-[#00ff88] border-[#00ff88]' : 
                        isCurrent ? 'bg-[#ffb347] border-[#ffb347] animate-pulse' : 
                        'bg-transparent border-white/30'
                      }`} />
                    </div>

                    <div className="flex items-baseline gap-4 mb-1">
                      <span className="font-display text-sm text-[#00e5ff]">{item.phase}</span>
                      <span className={`font-mono text-[10px] px-2 py-0.5 rounded-sm uppercase tracking-wider ${
                        isDone ? 'bg-[#00ff88]/20 text-[#00ff88]' : 
                        isCurrent ? 'bg-[#ffb347]/20 text-[#ffb347]' : 
                        'bg-white/10 text-white/50'
                      }`}>
                        {isDone ? 'COMPLETE' : isCurrent ? 'IN PROGRESS' : 'UPCOMING'}
                      </span>
                    </div>
                    
                    <h3 className="font-body font-bold text-white text-lg mb-2">{item.title}</h3>
                    <p className="font-body text-white/60 text-sm max-w-xl">{item.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
