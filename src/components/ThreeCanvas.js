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
