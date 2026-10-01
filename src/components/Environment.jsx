import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Environment as DreiEnvironment } from '@react-three/drei';
import * as THREE from 'three';

export default function Environment() {
  const particlesCount = 200;
  const particlesMesh = useRef();
  const lightShafts = useRef();

  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  const particleData = useMemo(() => {
    return new Array(particlesCount).fill().map(() => ({
      x: (Math.random() - 0.5) * 20,
      y: Math.random() * 10,
      z: (Math.random() - 0.5) * 20,
      speed: 0.1 + Math.random() * 0.2,
      offset: Math.random() * Math.PI * 2,
    }));
  }, [particlesCount]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    
    // Animate particles
    if (particlesMesh.current) {
      particleData.forEach((data, i) => {
        dummy.position.set(
          data.x,
          (data.y + t * data.speed) % 10,
          data.z
        );
        dummy.rotation.x = t * 0.2 + data.offset;
        dummy.rotation.y = t * 0.3 + data.offset;
        dummy.updateMatrix();
        particlesMesh.current.setMatrixAt(i, dummy.matrix);
      });
      particlesMesh.current.instanceMatrix.needsUpdate = true;
    }

    // Rotate light shafts
    if (lightShafts.current) {
      lightShafts.current.rotation.y = t * 0.05;
    }
  });

  return (
    <group>
      <DreiEnvironment preset="night" />
      <fog attach="fog" args={['#05070d', 5, 30]} />

      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#05070d" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Grid */}
      <gridHelper args={[100, 100, '#00e5ff', '#1a1e2e']} position={[0, 0.01, 0]} />

      {/* Spotlight pool under robot */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <circleGeometry args={[2, 32]} />
        <meshBasicMaterial color="#00e5ff" transparent opacity={0.1} />
      </mesh>

      {/* Light Shafts */}
      <group ref={lightShafts}>
        {[0, Math.PI * 2 / 3, Math.PI * 4 / 3].map((rot, i) => (
          <mesh key={i} position={[Math.sin(rot) * 5, 5, Math.cos(rot) * 5]}>
            <cylinderGeometry args={[1, 3, 10, 16]} />
            <meshBasicMaterial 
              color="#00e5ff" 
              transparent 
              opacity={0.03} 
              blending={THREE.AdditiveBlending} 
              side={THREE.DoubleSide} 
              depthWrite={false} 
            />
          </mesh>
        ))}
      </group>

      {/* Particles */}
      <instancedMesh ref={particlesMesh} args={[null, null, particlesCount]}>
        <boxGeometry args={[0.05, 0.05, 0.05]} />
        <meshBasicMaterial color="#00e5ff" transparent opacity={0.5} />
      </instancedMesh>
    </group>
  );
}
