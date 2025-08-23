import { useRef, useState } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import avatarGirl from '../assets/avatar-girl.jpg';

// 3D Beautiful Girl Avatar Component
function BeautifulGirlMesh({ isActive = false }: { isActive?: boolean }) {
  const meshRef = useRef<THREE.Mesh>();
  const texture = useLoader(THREE.TextureLoader, avatarGirl);

  useFrame((state) => {
    if (meshRef.current) {
      // Gentle floating animation
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.1;
      
      // Subtle scale breathing effect
      const scale = 1 + Math.sin(state.clock.elapsedTime * 1.2) * 0.02;
      meshRef.current.scale.setScalar(scale);
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <circleGeometry args={[1.2, 64]} />
      <meshPhongMaterial 
        map={texture}
        transparent
        opacity={0.95}
        side={THREE.DoubleSide}
      />
      
      {/* Glowing rim effect */}
      <mesh position={[0, 0, -0.01]}>
        <ringGeometry args={[1.15, 1.25, 64]} />
        <meshBasicMaterial 
          color={isActive ? "#60EFFF" : "#A855F7"}
          transparent
          opacity={0.6}
        />
      </mesh>
    </mesh>
  );
}

interface Avatar3DProps {
  size?: 'sm' | 'md' | 'lg';
  isActive?: boolean;
  className?: string;
}

export default function Avatar3D({ size = 'md', isActive = false, className = '' }: Avatar3DProps) {
  const [isHovered, setIsHovered] = useState(false);

  const sizeClasses = {
    sm: 'w-24 h-24',
    md: 'w-48 h-48',
    lg: 'w-96 h-96'
  };

  return (
    <motion.div
      className={`${sizeClasses[size]} ${className} relative`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={{
        scale: isHovered ? 1.05 : 1,
      }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {/* Glow effect */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-zeo-primary to-zeo-secondary opacity-20 blur-xl animate-pulse" />
      
      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 0, 3], fov: 45 }}
        className="rounded-full"
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#A855F7" />
        <BeautifulGirlMesh isActive={isActive || isHovered} />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>

      {/* Pulse rings */}
      {isActive && (
        <div className="absolute inset-0 rounded-full">
          <div className="absolute inset-0 rounded-full border-2 border-zeo-primary animate-ping opacity-75" />
          <div className="absolute inset-4 rounded-full border border-zeo-secondary animate-ping opacity-50" style={{ animationDelay: '0.5s' }} />
        </div>
      )}
    </motion.div>
  );
}