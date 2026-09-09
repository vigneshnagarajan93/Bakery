"use client";

import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Particles({ count = 2000 }) {
  const mesh = useRef<THREE.InstancedMesh>(null);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const time = Math.random() * 100;
      const factor = Math.random() * 100;
      const speed = 0.01 + Math.random() / 200;
      const x = Math.random() * 20 - 10;
      const y = Math.random() * 20 - 10;
      const z = Math.random() * 20 - 10;

      temp.push({ time, factor, speed, x, y, z });
    }
    return temp;
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    if (!mesh.current) return;

    // Very subtle mouse interaction
    const mouseX = (state.pointer.x * state.viewport.width) / 10;
    const mouseY = (state.pointer.y * state.viewport.height) / 10;

    particles.forEach((particle, i) => {
      let { time } = particle;
      const { factor, speed, x, y, z } = particle;

      time = particle.time += speed / 2;

      const s = Math.cos(time);

      const px = x + Math.cos((time / 10) * factor) + (Math.sin(time * 1) * factor) / 10 + mouseX * 0.1;
      const py = y + Math.sin((time / 10) * factor) + (Math.cos(time * 2) * factor) / 10 + mouseY * 0.1;
      const pz = z + Math.cos((time / 10) * factor) + (Math.sin(time * 3) * factor) / 10;

      dummy.position.set(px, py, pz);
      dummy.scale.set(s, s, s);
      dummy.updateMatrix();
      mesh.current!.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <dodecahedronGeometry args={[0.02, 0]} />
      {/* Updated to use the new Burgundy semolina hex color */}
      <meshBasicMaterial color="#F2E4E7" transparent opacity={0.6} />
    </instancedMesh>
  );
}

export function FlourCanvas() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-50">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <Suspense fallback={null}>
          <Particles />
        </Suspense>
      </Canvas>
    </div>
  );
}
