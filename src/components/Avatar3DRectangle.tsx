import React, { useRef, useState } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import { motion } from 'framer-motion';
import { Mesh } from 'three';
import beautifulGirlImage from '@/assets/beautiful-girl.jpg';

function AnimatedRectangleMesh({ isActive = false }: { isActive?: boolean }) {
  const meshRef = useRef<Mesh>(null!);
  const texture = useLoader(TextureLoader, beautifulGirlImage);
  
  // Gentle floating animation
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
      
      if (isActive) {
        meshRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.02);
      }
    }
  });

  return (
    <mesh ref={meshRef} castShadow receiveShadow>
      <boxGeometry args={[2, 2.5, 0.2]} />
      <meshStandardMaterial 
        map={texture} 
        roughness={0.1}
        metalness={0.1}
        emissive={isActive ? '#1a5f1a' : '#000000'}
        emissiveIntensity={isActive ? 0.1 : 0}
      />
      
      {/* Glowing rim when active */}
      {isActive && (
        <mesh>
          <boxGeometry args={[2.1, 2.6, 0.25]} />
          <meshBasicMaterial 
            color="#4ade80" 
            transparent 
            opacity={0.3}
            wireframe
          />
        </mesh>
      )}
    </mesh>
  );
}

interface Avatar3DRectangleProps {
  size?: 'sm' | 'md' | 'lg';
  isActive?: boolean;
  className?: string;
  isUser?: boolean;
  videoStream?: MediaStream | null;
}

export default function Avatar3DRectangle({ 
  size = 'md', 
  isActive = false, 
  className = '',
  isUser = false,
  videoStream = null
}: Avatar3DRectangleProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  const sizes = {
    sm: 'h-32 w-32',
    md: 'h-48 w-40',
    lg: 'h-64 w-52'
  };

  if (isUser && videoStream) {
    return (
      <motion.div
        className={`${sizes[size]} relative ${className}`}
        whileHover={{ scale: 1.05 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="w-full h-full rounded-2xl overflow-hidden bg-zeo-glass shadow-avatar border-4 border-zeo-primary/20 relative">
          <video 
            autoPlay 
            muted 
            playsInline
            className="w-full h-full object-cover"
            ref={(video) => {
              if (video && videoStream) {
                video.srcObject = videoStream;
              }
            }}
          />
          
          {/* Active indicator */}
          {isActive && (
            <motion.div
              className="absolute inset-0 border-4 border-zeo-primary rounded-2xl"
              animate={{ 
                opacity: [0.5, 1, 0.5],
                scale: [1, 1.02, 1]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
          
          {/* Hover glow */}
          {isHovered && (
            <div className="absolute inset-0 bg-zeo-primary/10 rounded-2xl" />
          )}
        </div>
        
        {/* Pulsing rings when active */}
        {isActive && (
          <>
            <motion.div
              className="absolute -inset-4 border-2 border-zeo-primary/30 rounded-3xl"
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute -inset-8 border-2 border-zeo-primary/20 rounded-3xl"
              animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            />
          </>
        )}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={`${sizes[size]} relative ${className}`}
      whileHover={{ scale: 1.05 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="w-full h-full rounded-2xl overflow-hidden bg-black/20 shadow-avatar">
        <Canvas
          camera={{ position: [0, 0, 3], fov: 50 }}
          shadows
        >
          <ambientLight intensity={0.4} />
          <pointLight 
            position={[5, 5, 5]} 
            intensity={1}
            color="#4ade80"
            castShadow 
          />
          <pointLight 
            position={[-5, -5, 5]} 
            intensity={0.5}
            color="#86efac"
          />
          
          <AnimatedRectangleMesh isActive={isActive} />
        </Canvas>
      </div>
      
      {/* Pulsing rings when active */}
      {isActive && (
        <>
          <motion.div
            className="absolute -inset-4 border-2 border-zeo-primary/30 rounded-3xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -inset-8 border-2 border-zeo-primary/20 rounded-3xl"
            animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          />
        </>
      )}
    </motion.div>
  );
}