import React, { useEffect, useRef } from 'react';
import useStore from '../stores/useStore';

export default function Cursor() {
  const isMobile = useStore((state) => state.isMobile);
  const cursorPos = useStore((state) => state.cursorPos);
  const cursorOnTarget = useStore((state) => state.cursorOnTarget);
  
  const outerRef = useRef(null);
  const innerRef = useRef(null);
  const trailRef1 = useRef(null);
  const trailRef2 = useRef(null);
  const trailRef3 = useRef(null);

  // Use refs for animation to avoid React re-renders on mouse move
  const mouse = useRef({ x: 0, y: 0 });
  const trail1 = useRef({ x: 0, y: 0 });
  const trail2 = useRef({ x: 0, y: 0 });
  const trail3 = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (isMobile) return;

    // Use current store value for initialization, but update in raf
    mouse.current.x = cursorPos.x;
    mouse.current.y = cursorPos.y;
    trail1.current.x = cursorPos.x;
    trail1.current.y = cursorPos.y;
    trail2.current.x = cursorPos.x;
    trail2.current.y = cursorPos.y;
    trail3.current.x = cursorPos.x;
    trail3.current.y = cursorPos.y;

    let rafId;

    const animate = () => {
      // Direct DOM updates for performance
      mouse.current.x = useStore.getState().cursorPos.x;
      mouse.current.y = useStore.getState().cursorPos.y;

      // Lerp calculations
      trail1.current.x += (mouse.current.x - trail1.current.x) * 0.3;
      trail1.current.y += (mouse.current.y - trail1.current.y) * 0.3;
      
      trail2.current.x += (trail1.current.x - trail2.current.x) * 0.3;
      trail2.current.y += (trail1.current.y - trail2.current.y) * 0.3;
      
      trail3.current.x += (trail2.current.x - trail3.current.x) * 0.3;
      trail3.current.y += (trail2.current.y - trail3.current.y) * 0.3;

      if (outerRef.current) {
        outerRef.current.style.transform = `translate3d(${mouse.current.x}px, ${mouse.current.y}px, 0)`;
      }
      if (innerRef.current) {
        innerRef.current.style.transform = `translate3d(${mouse.current.x}px, ${mouse.current.y}px, 0)`;
      }
      if (trailRef1.current) {
        trailRef1.current.style.transform = `translate3d(${trail1.current.x}px, ${trail1.current.y}px, 0)`;
      }
      if (trailRef2.current) {
        trailRef2.current.style.transform = `translate3d(${trail2.current.x}px, ${trail2.current.y}px, 0)`;
      }
      if (trailRef3.current) {
        trailRef3.current.style.transform = `translate3d(${trail3.current.x}px, ${trail3.current.y}px, 0)`;
      }

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {/* Outer Ring & Crosshair */}
      <div 
        ref={outerRef}
        className={`absolute top-0 left-0 -ml-3 -mt-3 w-6 h-6 rounded-full border border-opacity-50 transition-colors duration-200 ease-out ${
          cursorOnTarget ? 'border-amber-400 scale-125' : 'border-cyan-400 scale-100'
        }`}
        style={{ willChange: 'transform' }}
      >
        <div className={`absolute left-1/2 top-[-4px] w-px h-2 -ml-[0.5px] ${cursorOnTarget ? 'bg-amber-400' : 'bg-cyan-400'}`}></div>
        <div className={`absolute left-1/2 bottom-[-4px] w-px h-2 -ml-[0.5px] ${cursorOnTarget ? 'bg-amber-400' : 'bg-cyan-400'}`}></div>
        <div className={`absolute top-1/2 left-[-4px] h-px w-2 -mt-[0.5px] ${cursorOnTarget ? 'bg-amber-400' : 'bg-cyan-400'}`}></div>
        <div className={`absolute top-1/2 right-[-4px] h-px w-2 -mt-[0.5px] ${cursorOnTarget ? 'bg-amber-400' : 'bg-cyan-400'}`}></div>
      </div>

      {/* Inner Dot */}
      <div 
        ref={innerRef}
        className={`absolute top-0 left-0 -ml-0.5 -mt-0.5 w-1 h-1 rounded-full transition-colors duration-200 ${
          cursorOnTarget ? 'bg-amber-400' : 'bg-cyan-400'
        }`}
        style={{ willChange: 'transform' }}
      ></div>

      {/* Trails */}
      <div 
        ref={trailRef1}
        className={`absolute top-0 left-0 -ml-0.5 -mt-0.5 w-1 h-1 rounded-full opacity-60 ${cursorOnTarget ? 'bg-amber-400' : 'bg-cyan-400'}`}
        style={{ willChange: 'transform' }}
      ></div>
      <div 
        ref={trailRef2}
        className={`absolute top-0 left-0 -ml-0.5 -mt-0.5 w-1 h-1 rounded-full opacity-40 ${cursorOnTarget ? 'bg-amber-400' : 'bg-cyan-400'}`}
        style={{ willChange: 'transform' }}
      ></div>
      <div 
        ref={trailRef3}
        className={`absolute top-0 left-0 -ml-0.5 -mt-0.5 w-1 h-1 rounded-full opacity-20 ${cursorOnTarget ? 'bg-amber-400' : 'bg-cyan-400'}`}
        style={{ willChange: 'transform' }}
      ></div>
    </div>
  );
}
