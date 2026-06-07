"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { latLngToVector3 } from "@/lib/utils";
import { logisticsHubs, tradeRoutes } from "@/data/portfolio";
import { useIsMobile } from "@/lib/useIsMobile";

const GLOBE_RADIUS = 1.6;

function GlobeMesh({ mobile }: { mobile: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Mesh>(null);

  useFrame((_, dt) => {
    if (groupRef.current) groupRef.current.rotation.y += dt * 0.08;
    if (innerRef.current) {
      const mat = innerRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.04 + 0.02 * Math.sin(performance.now() * 0.001);
    }
  });

  const detail = mobile ? 2 : 4;
  const sphereSegs = mobile ? 32 : 48;
  const latStep = mobile ? 8 : 4;
  const lngStep = mobile ? 8 : 4;
  const latRange = mobile ? 30 : 15;
  const lngRange = mobile ? 30 : 20;

  const wireGeo = useMemo(
    () => new THREE.IcosahedronGeometry(GLOBE_RADIUS, detail),
    [detail],
  );

  const latLines = useMemo(() => {
    const lines: THREE.BufferGeometry[] = [];
    for (let lat = -75; lat <= 75; lat += latRange) {
      const points: THREE.Vector3[] = [];
      for (let lng = -180; lng <= 180; lng += latStep) {
        const [x, y, z] = latLngToVector3(lat, lng, GLOBE_RADIUS * 1.001);
        points.push(new THREE.Vector3(x, y, z));
      }
      lines.push(new THREE.BufferGeometry().setFromPoints(points));
    }
    return lines;
  }, [latRange, latStep]);

  const lngLines = useMemo(() => {
    const lines: THREE.BufferGeometry[] = [];
    for (let lng = -180; lng < 180; lng += lngRange) {
      const points: THREE.Vector3[] = [];
      for (let lat = -90; lat <= 90; lat += lngStep) {
        const [x, y, z] = latLngToVector3(lat, lng, GLOBE_RADIUS * 1.001);
        points.push(new THREE.Vector3(x, y, z));
      }
      lines.push(new THREE.BufferGeometry().setFromPoints(points));
    }
    return lines;
  }, [lngRange, lngStep]);

  return (
    <group ref={groupRef}>
      <mesh ref={innerRef}>
        <sphereGeometry args={[GLOBE_RADIUS * 0.985, sphereSegs, sphereSegs]} />
        <meshBasicMaterial color="#0b1c3a" transparent opacity={0.6} />
      </mesh>
      <lineSegments>
        <wireframeGeometry args={[wireGeo]} />
        <lineBasicMaterial color="#22d3ee" transparent opacity={0.18} />
      </lineSegments>
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
      <Routes mobile={mobile} />
      <Atmosphere segs={sphereSegs} />
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
        <sphereGeometry args={[0.025, 12, 12]} />
        <meshBasicMaterial color="#22d3ee" />
      </mesh>
      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.04, 0.06, 24]} />
        <meshBasicMaterial color="#60a5fa" transparent opacity={0.5} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

function Routes({ mobile }: { mobile: boolean }) {
  const curveSegs = mobile ? 32 : 64;
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
        const points = curve.getPoints(curveSegs);
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        return { geometry, curve };
      })
      .filter(Boolean) as { geometry: THREE.BufferGeometry; curve: THREE.QuadraticBezierCurve3 }[];
  }, [curveSegs]);

  const limited = mobile ? data.slice(0, 5) : data;

  return (
    <group>
      {limited.map((d, i) => (
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
      <sphereGeometry args={[0.025, 8, 8]} />
      <meshBasicMaterial color="#a5f3fc" transparent opacity={0.95} />
    </mesh>
  );
}

function Atmosphere({ segs }: { segs: number }) {
  return (
    <mesh>
      <sphereGeometry args={[GLOBE_RADIUS * 1.12, segs, segs]} />
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

function Particles({ count }: { count: number }) {
  const ref = useRef<THREE.Points>(null);
  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
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
  }, [count]);
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
  const mobile = useIsMobile();
  const particleCount = mobile ? 80 : 350;
  const dpr: [number, number] = mobile ? [1, 1.25] : [1, 2];

  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      dpr={dpr}
      gl={{ antialias: !mobile, alpha: true, powerPreference: "high-performance" }}
      performance={{ min: 0.5 }}
    >
      <color attach="background" args={["#020617"]} />
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={0.6} color="#22d3ee" />
      <pointLight position={[-5, -3, 4]} intensity={0.5} color="#60a5fa" />
      {!mobile && (
        <Stars radius={50} depth={20} count={1500} factor={3} fade speed={0.6} />
      )}
      <Particles count={particleCount} />
      <GlobeMesh mobile={mobile} />
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
