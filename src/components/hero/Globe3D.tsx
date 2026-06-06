"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { latLngToVector3 } from "@/lib/utils";
import { logisticsHubs, tradeRoutes } from "@/data/portfolio";

const GLOBE_RADIUS = 1.6;

function GlobeMesh() {
  const groupRef = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Mesh>(null);

  useFrame((_, dt) => {
    if (groupRef.current) groupRef.current.rotation.y += dt * 0.08;
    if (innerRef.current) {
      const mat = innerRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.04 + 0.02 * Math.sin(performance.now() * 0.001);
    }
  });

  const wireGeo = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(GLOBE_RADIUS, 4);
    return geo;
  }, []);

  const latLines = useMemo(() => {
    const lines: THREE.BufferGeometry[] = [];
    for (let lat = -75; lat <= 75; lat += 15) {
      const points: THREE.Vector3[] = [];
      for (let lng = -180; lng <= 180; lng += 4) {
        const [x, y, z] = latLngToVector3(lat, lng, GLOBE_RADIUS * 1.001);
        points.push(new THREE.Vector3(x, y, z));
      }
      lines.push(new THREE.BufferGeometry().setFromPoints(points));
    }
    return lines;
  }, []);

  const lngLines = useMemo(() => {
    const lines: THREE.BufferGeometry[] = [];
    for (let lng = -180; lng < 180; lng += 20) {
      const points: THREE.Vector3[] = [];
      for (let lat = -90; lat <= 90; lat += 4) {
        const [x, y, z] = latLngToVector3(lat, lng, GLOBE_RADIUS * 1.001);
        points.push(new THREE.Vector3(x, y, z));
      }
      lines.push(new THREE.BufferGeometry().setFromPoints(points));
    }
    return lines;
  }, []);

  return (
    <group ref={groupRef}>
      {/* Inner glow sphere */}
      <mesh ref={innerRef}>
        <sphereGeometry args={[GLOBE_RADIUS * 0.985, 48, 48]} />
        <meshBasicMaterial color="#0b1c3a" transparent opacity={0.6} />
      </mesh>
      {/* Wireframe icosahedron */}
      <lineSegments>
        <wireframeGeometry args={[wireGeo]} />
        <lineBasicMaterial color="#22d3ee" transparent opacity={0.18} />
      </lineSegments>
      {/* Lat / Lng grid */}
      {latLines.map((g, i) => (
        <line key={`lat-${i}`}>
          <primitive object={g} attach="geometry" />
          <lineBasicMaterial color="#60a5fa" transparent opacity={0.12} />
        </line>
      ))}
      {lngLines.map((g, i) => (
        <line key={`lng-${i}`}>
          <primitive object={g} attach="geometry" />
          <lineBasicMaterial color="#60a5fa" transparent opacity={0.12} />
        </line>
      ))}
      <Hubs />
      <Routes />
      <Atmosphere />
    </group>
  );
}

function Hubs() {
  return (
    <group>
      {logisticsHubs.map((hub) => {
        const pos = latLngToVector3(hub.lat, hub.lng, GLOBE_RADIUS * 1.02);
        return <Hub key={hub.name} position={pos} />;
      })}
    </group>
  );
}

function Hub({ position }: { position: [number, number, number] }) {
  const ringRef = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (ringRef.current) {
      const s = 1 + 0.4 * Math.sin(clock.elapsedTime * 1.5 + position[0]);
      ringRef.current.scale.setScalar(s);
      const mat = ringRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.5 - 0.3 * Math.abs(Math.sin(clock.elapsedTime * 1.5 + position[0]));
    }
  });
  return (
    <group position={position}>
      <mesh>
        <sphereGeometry args={[0.025, 16, 16]} />
        <meshBasicMaterial color="#22d3ee" />
      </mesh>
      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.04, 0.06, 32]} />
        <meshBasicMaterial color="#60a5fa" transparent opacity={0.5} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

function Routes() {
  const data = useMemo(() => {
    return tradeRoutes
      .map(([a, b]) => {
        const A = logisticsHubs.find((h) => h.name === a);
        const B = logisticsHubs.find((h) => h.name === b);
        if (!A || !B) return null;
        const start = new THREE.Vector3(...latLngToVector3(A.lat, A.lng, GLOBE_RADIUS * 1.02));
        const end = new THREE.Vector3(...latLngToVector3(B.lat, B.lng, GLOBE_RADIUS * 1.02));
        const mid = start
          .clone()
          .add(end)
          .multiplyScalar(0.5)
          .normalize()
          .multiplyScalar(GLOBE_RADIUS * 1.55);
        const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
        const points = curve.getPoints(64);
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        return { geometry, curve };
      })
      .filter(Boolean) as { geometry: THREE.BufferGeometry; curve: THREE.QuadraticBezierCurve3 }[];
  }, []);

  return (
    <group>
      {data.map((d, i) => (
        <group key={i}>
          <line>
            <primitive object={d.geometry} attach="geometry" />
            <lineBasicMaterial color="#22d3ee" transparent opacity={0.55} />
          </line>
          <Pulse curve={d.curve} speed={0.18 + (i % 3) * 0.08} offset={(i * 0.13) % 1} />
        </group>
      ))}
    </group>
  );
}

function Pulse({
  curve,
  speed,
  offset,
}: {
  curve: THREE.QuadraticBezierCurve3;
  speed: number;
  offset: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    const t = ((clock.elapsedTime * speed + offset) % 1);
    const p = curve.getPoint(t);
    if (ref.current) {
      ref.current.position.copy(p);
    }
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.025, 12, 12]} />
      <meshBasicMaterial color="#a5f3fc" transparent opacity={0.95} />
    </mesh>
  );
}

function Atmosphere() {
  return (
    <mesh>
      <sphereGeometry args={[GLOBE_RADIUS * 1.12, 48, 48]} />
      <meshBasicMaterial
        color="#22d3ee"
        transparent
        opacity={0.06}
        side={THREE.BackSide}
        depthWrite={false}
      />
    </mesh>
  );
}

function Particles() {
  const ref = useRef<THREE.Points>(null);
  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const count = 350;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 3 + Math.random() * 4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return g;
  }, []);
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.04;
  });
  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial size={0.025} color="#60a5fa" transparent opacity={0.7} sizeAttenuation />
    </points>
  );
}

export function Globe3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <color attach="background" args={["#020617"]} />
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={0.6} color="#22d3ee" />
      <pointLight position={[-5, -3, 4]} intensity={0.5} color="#60a5fa" />
      <Stars radius={50} depth={20} count={2000} factor={3} fade speed={0.6} />
      <Particles />
      <GlobeMesh />
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        autoRotate={false}
        rotateSpeed={0.5}
        enableDamping
        dampingFactor={0.08}
      />
    </Canvas>
  );
}
