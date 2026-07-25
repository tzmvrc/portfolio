import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Icosahedron } from "@react-three/drei";
import { useRef } from "react";
import type { Mesh } from "three";

function Blob() {
  const ref = useRef<Mesh>(null);
  useFrame(({ mouse, clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.x = mouse.y * 0.4 + t * 0.1;
    ref.current.rotation.y = mouse.x * 0.5 + t * 0.15;
  });
  return (
    <Float speed={1.4} rotationIntensity={0.6} floatIntensity={1.2}>
      <Icosahedron ref={ref} args={[1.4, 4]}>
        <MeshDistortMaterial
          color="#8b5cf6"
          emissive="#7c3aed"
          emissiveIntensity={0.5}
          roughness={0.15}
          metalness={0.6}
          distort={0.45}
          speed={1.8}
        />
      </Icosahedron>
      <Icosahedron args={[1.85, 1]}>
        <meshBasicMaterial color="#a78bfa" wireframe transparent opacity={0.18} />
      </Icosahedron>
    </Float>
  );
}

export function HeroCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4.5], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[3, 3, 3]} intensity={1.2} color="#c4b5fd" />
      <pointLight position={[-3, -2, -2]} intensity={2} color="#a855f7" />
      <Blob />
    </Canvas>
  );
}
