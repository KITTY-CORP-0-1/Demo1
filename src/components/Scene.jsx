import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom, Vignette, ChromaticAberration, Noise } from '@react-three/postprocessing';
import { Stars } from '@react-three/drei';
import { BlendFunction } from 'postprocessing';
import Robot from './Robot';
import Environment from './Environment';
import CameraRig from './CameraRig';
import useStore from '../stores/useStore';

export default function Scene() {
  const isMobile = useStore(state => state.isMobile);

  return (
    <div className="canvas-container absolute inset-0 z-0">
      <Canvas
        gl={{ antialias: true, toneMappingExposure: 1 }}
        camera={{ position: [0, 2, 10], fov: 50 }}
        dpr={[1, 2]}
      >
        <color attach="background" args={['#05070d']} />
        
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.2} />
          <directionalLight position={[5, 10, 5]} intensity={1.5} castShadow />
          <pointLight position={[-5, 2, -5]} intensity={2} color="#00e5ff" />
          <pointLight position={[5, 2, -5]} intensity={2} color="#ffb347" />

          {/* Core scene components */}
          <Robot />
          <Environment />
          <CameraRig />
          
          {/* Distant background */}
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

          {/* Post-processing (disabled on mobile for performance) */}
          {!isMobile && (
            <EffectComposer>
              <Bloom 
                intensity={0.5} 
                luminanceThreshold={0.8} 
                luminanceSmoothing={0.9} 
                blendFunction={BlendFunction.ADD}
              />
              <Vignette offset={0.3} darkness={0.7} />
              <ChromaticAberration offset={[0.002, 0.002]} />
              <Noise opacity={0.04} />
            </EffectComposer>
          )}
        </Suspense>
      </Canvas>
    </div>
  );
}
