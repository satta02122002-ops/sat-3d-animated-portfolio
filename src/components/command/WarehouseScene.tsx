"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function Floor() {
  const grid = useMemo(() => {
    const gh = new THREE.GridHelper(20, 20, "#22d3ee", "#1f4079");
    (gh.material as THREE.LineBasicMaterial).transparent = true;
    (gh.material as THREE.LineBasicMaterial).opacity = 0.35;
    return gh;
  }, []);
  return <primitive object={grid} position={[0, -1.2, 0]} />;
}

function Rack({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {[0, 1, 2].map((y) => (
        <group key={y} position={[0, y * 0.55, 0]}>
          <mesh>
            <boxGeometry args={[1.6, 0.05, 0.7]} />
            <meshStandardMaterial color="#0b1c3a" emissive="#22d3ee" emissiveIntensity={0.05} />
          </mesh>
          {[-0.5, 0, 0.5].map((x, i) => (
            <mesh key={i} position={[x, 0.18, 0]}>
              <boxGeometry args={[0.4, 0.3, 0.5]} />
              <meshStandardMaterial
                color={i % 2 === 0 ? "#60a5fa" : "#22d3ee"}
                emissive={i % 2 === 0 ? "#60a5fa" : "#22d3ee"}
                emissiveIntensity={0.35}
                metalness={0.4}
                roughness={0.4}
              />
            </mesh>
          ))}
        </group>
      ))}
      {/* Frame uprights */}
      {[
        [-0.78, 0, -0.32],
        [0.78, 0, -0.32],
        [-0.78, 0, 0.32],
        [0.78, 0, 0.32],
      ].map((p, i) => (
        <mesh key={i} position={[p[0], 0.55, p[2]]}>
          <boxGeometry args={[0.05, 1.8, 0.05]} />
          <meshStandardMaterial color="#0f2347" emissive="#22d3ee" emissiveIntensity={0.1} />
        </mesh>
      ))}
    </group>
  );
}

function Forklift() {
  const ref = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime * 0.4;
    ref.current.position.x = Math.sin(t) * 3.2;
    ref.current.position.z = Math.cos(t * 0.6) * 1.6;
    ref.current.rotation.y = -t;
  });
  return (
    <group ref={ref} position={[0, -0.9, 0]}>
      <mesh position={[0, 0.2, 0]}>
        <boxGeometry args={[0.55, 0.35, 0.9]} />
        <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={0.45} />
      </mesh>
      <mesh position={[0, 0.45, 0.3]}>
        <boxGeometry args={[0.45, 0.18, 0.35]} />
        <meshStandardMaterial color="#0f2347" />
      </mesh>
      <mesh position={[0, 0.1, -0.6]}>
        <boxGeometry args={[0.5, 0.45, 0.05]} />
        <meshStandardMaterial color="#60a5fa" emissive="#60a5fa" emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
}

function Container({ x, z, hue }: { x: number; z: number; hue: string }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.position.y = -0.6 + 0.08 * Math.sin(clock.elapsedTime * 1.2 + x);
  });
  return (
    <Float floatIntensity={0.4} rotationIntensity={0.2}>
      <mesh ref={ref} position={[x, -0.6, z]}>
        <boxGeometry args={[0.9, 0.55, 0.55]} />
        <meshStandardMaterial
          color={hue}
          emissive={hue}
          emissiveIntensity={0.3}
          metalness={0.4}
          roughness={0.4}
        />
      </mesh>
    </Float>
  );
}

export function WarehouseScene() {
  return (
    <Canvas
      camera={{ position: [4.5, 3, 5.5], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
    >
      <color attach="background" args={["#020617"]} />
      <ambientLight intensity={0.45} />
      <pointLight position={[4, 6, 4]} intensity={0.8} color="#22d3ee" />
      <pointLight position={[-4, 4, -2]} intensity={0.6} color="#60a5fa" />
      <spotLight position={[0, 6, 0]} angle={0.6} intensity={1.2} color="#a5f3fc" />

      <Floor />
      <Rack position={[-2.5, -1.1, -1.2]} />
      <Rack position={[0, -1.1, -1.2]} />
      <Rack position={[2.5, -1.1, -1.2]} />

      <Container x={-1.6} z={1.6} hue="#22d3ee" />
      <Container x={0} z={1.4} hue="#60a5fa" />
      <Container x={1.6} z={1.7} hue="#a78bfa" />

      <Forklift />
    </Canvas>
  );
}
