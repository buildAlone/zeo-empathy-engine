import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Cylinder, Box, OrbitControls } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

// 3D Woman Avatar Component
function WomanAvatarMesh({ isActive = false }: { isActive?: boolean }) {
  const groupRef = useRef<THREE.Group>();
  const headRef = useRef<THREE.Mesh>();
  const bodyRef = useRef<THREE.Mesh>();

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle rotation of the whole figure
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
      
      // Subtle breathing animation
      if (bodyRef.current) {
        bodyRef.current.scale.y = 1 + Math.sin(state.clock.elapsedTime * 1.2) * 0.02;
      }
      
      // Subtle head movement
      if (headRef.current) {
        headRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.05;
        headRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.6) * 0.03;
      }
    }
  });

  const skinColor = "#FDBCB4";
  const hairColor = "#8B4513";
  const clothColor = isActive ? "#60EFFF" : "#A855F7";

  return (
    <group ref={groupRef} position={[0, -0.5, 0]}>
      {/* Head */}
      <Sphere ref={headRef} args={[0.35, 32, 32]} position={[0, 1.2, 0]}>
        <meshPhongMaterial 
          color={skinColor}
          shininess={30}
          transparent
          opacity={0.95}
        />
      </Sphere>
      
      {/* Hair */}
      <Sphere args={[0.38, 32, 32]} position={[0, 1.35, -0.05]}>
        <meshPhongMaterial 
          color={hairColor}
          shininess={100}
        />
      </Sphere>
      
      {/* Neck */}
      <Cylinder args={[0.12, 0.12, 0.25]} position={[0, 0.9, 0]}>
        <meshPhongMaterial color={skinColor} shininess={30} />
      </Cylinder>
      
      {/* Body/Torso */}
      <Box ref={bodyRef} args={[0.5, 0.8, 0.3]} position={[0, 0.3, 0]}>
        <meshPhongMaterial 
          color={clothColor}
          shininess={50}
          transparent
          opacity={0.9}
        />
      </Box>
      
      {/* Arms */}
      <Cylinder args={[0.08, 0.08, 0.6]} position={[-0.35, 0.4, 0]} rotation={[0, 0, 0.3]}>
        <meshPhongMaterial color={skinColor} shininess={30} />
      </Cylinder>
      <Cylinder args={[0.08, 0.08, 0.6]} position={[0.35, 0.4, 0]} rotation={[0, 0, -0.3]}>
        <meshPhongMaterial color={skinColor} shininess={30} />
      </Cylinder>
      
      {/* Hands */}
      <Sphere args={[0.1, 16, 16]} position={[-0.55, 0.1, 0]}>
        <meshPhongMaterial color={skinColor} shininess={30} />
      </Sphere>
      <Sphere args={[0.1, 16, 16]} position={[0.55, 0.1, 0]}>
        <meshPhongMaterial color={skinColor} shininess={30} />
      </Sphere>
      
      {/* Eyes */}
      <Sphere args={[0.04, 16, 16]} position={[-0.1, 1.25, 0.32]}>
        <meshPhongMaterial color="#000000" />
      </Sphere>
      <Sphere args={[0.04, 16, 16]} position={[0.1, 1.25, 0.32]}>
        <meshPhongMaterial color="#000000" />
      </Sphere>
      
      {/* Lips */}
      <Sphere args={[0.06, 16, 8]} position={[0, 1.15, 0.33]} scale={[1, 0.3, 0.5]}>
        <meshPhongMaterial color="#FF69B4" shininess={100} />
      </Sphere>
    </group>
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
        <WomanAvatarMesh isActive={isActive || isHovered} />
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