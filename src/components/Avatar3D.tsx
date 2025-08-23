import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, OrbitControls } from '@react-three/drei';
import { motion } from 'framer-motion';

// 3D Avatar Component
function AvatarMesh({ isActive = false }: { isActive?: boolean }) {
  const meshRef = useRef<any>();

  useFrame((state) => {
    if (meshRef.current) {
      // Gentle rotation
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
      // Breathing effect
      meshRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 0.8) * 0.02);
    }
  });

  return (
    <Sphere ref={meshRef} args={[1, 64, 64]} position={[0, 0, 0]}>
      <MeshDistortMaterial
        color={isActive ? "#60EFFF" : "#A855F7"}
        attach="material"
        distort={0.4}
        speed={2}
        roughness={0.2}
        metalness={0.8}
        transparent
        opacity={0.8}
      />
    </Sphere>
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
        <AvatarMesh isActive={isActive || isHovered} />
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