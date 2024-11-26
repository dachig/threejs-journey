import { OrbitControls } from "@react-three/drei";
import { Perf } from "r3f-perf";
import { Suspense } from "react";
import Placeholder from "./placeholder";
import Hamburger from "./hamburger";
import Fox from "./fox";

export default function Experience() {
  return (
    <>
      <Perf position="top-left" />

      <OrbitControls makeDefault />

      <directionalLight castShadow position={[1, 2, 3]} intensity={4.5} shadow-normalBias={0.04} /> {/* shadow-normalBias gets rid of self-casting shadow */}
      <ambientLight intensity={1.5} />
      <Suspense fallback={<Placeholder position-y={0.5} scale={[2, 3, 2]} />}>
        <Hamburger scale={0.35} position-y={-1} />
      </Suspense>
      <Suspense>
        <Fox scale={0.02} position={[-3,-1,2]}/>
      </Suspense>
      <mesh
        receiveShadow
        position-y={-1}
        rotation-x={-Math.PI * 0.5}
        scale={10}
      >
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" />
      </mesh>
    </>
  );
}
