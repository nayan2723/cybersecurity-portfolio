import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function AnimatedPoints() {
  const ref = useRef<THREE.Points>(null);
  
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(2000 * 3);
    
    for (let i = 0; i < 2000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    
    return positions;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
      ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.05) * 0.1;
      ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.05) * 0.05;
    }
  });

  return (
    <Points ref={ref} positions={particlesPosition} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#00ff41"
        size={0.002}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </Points>
  );
}

function CyberGrid() {
  const ref = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.05;
    }
  });

  return (
    <group ref={ref}>
      <gridHelper args={[20, 20, '#00ff41', '#00ff41']} position={[0, -5, 0]} />
      <gridHelper args={[40, 40, '#00ff41', '#00ff41']} position={[0, -5, 0]} rotation={[Math.PI / 2, 0, 0]} />
    </group>
  );
}

function FloatingCubes() {
  const meshRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      meshRef.current.children.forEach((child, index) => {
        if (child instanceof THREE.Mesh) {
          child.position.y = Math.sin(state.clock.elapsedTime + index) * 0.5;
          child.rotation.x = state.clock.elapsedTime * 0.5;
          child.rotation.z = state.clock.elapsedTime * 0.3;
        }
      });
    }
  });

  return (
    <group ref={meshRef}>
      {Array.from({ length: 5 }).map((_, i) => (
        <mesh
          key={i}
          position={[
            Math.cos((i / 5) * Math.PI * 2) * 3,
            0,
            Math.sin((i / 5) * Math.PI * 2) * 3
          ]}
        >
          <boxGeometry args={[0.2, 0.2, 0.2]} />
          <meshStandardMaterial
            color="#00bfff"
            emissive="#00bfff"
            emissiveIntensity={0.2}
            transparent
            opacity={0.7}
          />
        </mesh>
      ))}
    </group>
  );
}

const ThreeBackground = () => {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.1} />
        <pointLight position={[10, 10, 10]} intensity={0.5} color="#00ff41" />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#00bfff" />
        
        <AnimatedPoints />
        <CyberGrid />
        <FloatingCubes />
      </Canvas>
    </div>
  );
};

export default ThreeBackground;