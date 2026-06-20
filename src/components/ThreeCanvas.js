"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function lerpVal(start, end, progress) {
  return start + (end - start) * progress;
}

function GlobeSphere({ progress }) {
  const meshRef = useRef();

  // Load the texture from the public folder
  const texture = useMemo(() => {
    const loader = new THREE.TextureLoader();
    const tex = loader.load("/sphere.png");
    tex.wrapS = THREE.ClampToEdgeWrapping;
    tex.wrapT = THREE.ClampToEdgeWrapping;
    return tex;
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      // Position the sphere at the bottom center to form a semicircle
      meshRef.current.position.set(0, -1.7, 0);
      meshRef.current.scale.setScalar(1.25);

      // Slow, steady axial rotation (Y-axis)
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.08;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1.5, 64, 64]} />
      <meshBasicMaterial map={texture} transparent={true} depthWrite={true} />
    </mesh>
  );
}

export function HeroInteractiveCanvas({ scrollProgressRef }) {
  const fallbackRef = useRef(0);
  const progressRef = scrollProgressRef || fallbackRef;

  return (
    <div className="hero-3d-wrapper" style={{ opacity: 0.95, position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 1 }}>
      <Canvas camera={{ position: [0, 0, 3.2], fov: 60 }} dpr={[1, 2]}>
        <ambientLight intensity={1.5} />
        <GlobeSphere progress={progressRef} />
      </Canvas>
    </div>
  );
}

// 1. Roadmap3D Component for the Investor Page
function RoadmapScene({ activeIndex }) {
  const groupRef = useRef();
  const node1Ref = useRef();
  const node2Ref = useRef();
  const node3Ref = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    
    // Slow drift of the entire scene
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.15) * 0.1;
      groupRef.current.rotation.x = Math.cos(t * 0.1) * 0.05;
    }

    // Node 1 (Phase 1: Neuroscience - Teal Accent)
    if (node1Ref.current) {
      const active = activeIndex === 0;
      const targetScale = active ? 1.4 : 0.9;
      node1Ref.current.scale.setScalar(
        THREE.MathUtils.lerp(node1Ref.current.scale.x, targetScale, 0.1)
      );
      node1Ref.current.rotation.y += 0.01;
      node1Ref.current.material.emissiveIntensity = active ? 0.8 + Math.sin(t * 5) * 0.2 : 0.1;
    }

    // Node 2 (Phase 2: AI - Purple Accent)
    if (node2Ref.current) {
      const active = activeIndex === 1;
      const targetScale = active ? 1.4 : 0.9;
      node2Ref.current.scale.setScalar(
        THREE.MathUtils.lerp(node2Ref.current.scale.x, targetScale, 0.1)
      );
      node2Ref.current.rotation.y += 0.01;
      node2Ref.current.material.emissiveIntensity = active ? 0.8 + Math.sin(t * 5) * 0.2 : 0.1;
    }

    // Node 3 (Phase 3: Semiconductors - Pink/Magenta Accent)
    if (node3Ref.current) {
      const active = activeIndex === 2;
      const targetScale = active ? 1.4 : 0.9;
      node3Ref.current.scale.setScalar(
        THREE.MathUtils.lerp(node3Ref.current.scale.x, targetScale, 0.1)
      );
      node3Ref.current.rotation.y += 0.01;
      node3Ref.current.material.emissiveIntensity = active ? 0.8 + Math.sin(t * 5) * 0.2 : 0.1;
    }
  });

  // Connection line vertices
  const linePoints = useMemo(() => {
    return [
      new THREE.Vector3(-1.8, 0, 0),
      new THREE.Vector3(0, 0.6, 0),
      new THREE.Vector3(0, 0.6, 0),
      new THREE.Vector3(1.8, 0, 0)
    ];
  }, []);

  const lineGeometry = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints(linePoints);
  }, [linePoints]);

  return (
    <group ref={groupRef}>
      {/* Connection Lines */}
      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial color="#ffffff" opacity={0.15} transparent />
      </lineSegments>

      {/* Phase 1 Node (Teal) */}
      <mesh ref={node1Ref} position={[-1.8, 0, 0]}>
        <sphereGeometry args={[0.35, 32, 32]} />
        <meshStandardMaterial 
          color="#00f5d4" 
          emissive="#00f5d4" 
          emissiveIntensity={0.2} 
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>

      {/* Phase 2 Node (Purple) */}
      <mesh ref={node2Ref} position={[0, 0.6, 0]}>
        <sphereGeometry args={[0.35, 32, 32]} />
        <meshStandardMaterial 
          color="#9b5de5" 
          emissive="#9b5de5" 
          emissiveIntensity={0.2} 
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>

      {/* Phase 3 Node (Pink) */}
      <mesh ref={node3Ref} position={[1.8, 0, 0]}>
        <sphereGeometry args={[0.35, 32, 32]} />
        <meshStandardMaterial 
          color="#f15bb5" 
          emissive="#f15bb5" 
          emissiveIntensity={0.2} 
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>
    </group>
  );
}

export function Roadmap3D({ activeIndex }) {
  return (
    <div style={{ width: "100%", height: "100%", minHeight: "400px", position: "relative" }}>
      <Canvas camera={{ position: [0, 0, 3.5], fov: 50 }} dpr={[1, 2]}>
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        <RoadmapScene activeIndex={activeIndex} />
      </Canvas>
    </div>
  );
}

// 2. SynapticNetwork3D Component for the Research Page
function SynapticScene() {
  const pointsRef = useRef();
  const linesRef = useRef();

  // Create random particles and connections
  const count = 40;
  const { positions, linePositions } = useMemo(() => {
    const pos = [];
    for (let i = 0; i < count; i++) {
      pos.push(
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 3,
        (Math.random() - 0.5) * 2
      );
    }

    const lines = [];
    // Connect nearest points
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dx = pos[i*3] - pos[j*3];
        const dy = pos[i*3+1] - pos[j*3+1];
        const dz = pos[i*3+2] - pos[j*3+2];
        const dist = Math.sqrt(dx*dx + dy*dy + dz*dz);
        if (dist < 1.2) {
          lines.push(pos[i*3], pos[i*3+1], pos[i*3+2]);
          lines.push(pos[j*3], pos[j*3+1], pos[j*3+2]);
        }
      }
    }

    return {
      positions: new Float32Array(pos),
      linePositions: new Float32Array(lines)
    };
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (pointsRef.current) {
      pointsRef.current.rotation.y = t * 0.05;
      pointsRef.current.rotation.x = Math.sin(t * 0.02) * 0.1;
    }
    if (linesRef.current) {
      linesRef.current.rotation.y = t * 0.05;
      linesRef.current.rotation.x = Math.sin(t * 0.02) * 0.1;
    }
  });

  return (
    <group>
      {/* Connection Lines */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color="var(--accent-teal)" opacity={0.25} transparent />
      </lineSegments>

      {/* Nodes */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial 
          color="var(--accent-teal)" 
          size={0.06} 
          sizeAttenuation 
          transparent 
          opacity={0.8}
        />
      </points>
    </group>
  );
}

export function SynapticNetwork3D() {
  return (
    <div style={{ width: "100%", height: "100%", position: "absolute", top: 0, left: 0 }}>
      <Canvas camera={{ position: [0, 0, 3], fov: 60 }} dpr={[1, 2]}>
        <ambientLight intensity={1.2} />
        <SynapticScene />
      </Canvas>
    </div>
  );
}
