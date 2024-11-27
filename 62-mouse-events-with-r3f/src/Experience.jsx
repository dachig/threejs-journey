import { useFrame } from "@react-three/fiber";
import { OrbitControls, meshBounds, useGLTF } from "@react-three/drei";
import { useRef } from "react";
// raycast={meshBounds} to create an invisible extension of the mesh that's clickable
// very good for performance

export default function Experience() {
  const cube = useRef();
  const sphere = useRef();
  const { scene } = useGLTF("/hamburger.glb");

  useFrame((state, delta) => {
    cube.current.rotation.y += delta * 0.2;
  });

  const cubeHandler = () => {
    cube.current.material.color.set(`hsl(${Math.random() * 360}, 100%, 75%)`);
  };
  const sphereHandler = () => {
    sphere.current.material.color.set(`hsl(${Math.random() * 360}, 100%, 75%)`);
  };
  return (
    <>
      <OrbitControls makeDefault />

      <directionalLight position={[1, 2, 3]} intensity={4.5} />
      <ambientLight intensity={1.5} />
      <primitive
        onClick={(e) => {
          console.log(e.object.name);
          e.stopPropagation(); // Stops the click going through the rest of the objcets, so u get the exact one that u clicked
        }}
        object={scene}
        scale={0.35}
        position={[3, -1, 3]}
      />
      <mesh
        ref={sphere}
        position-x={-2}
        onClick={(e) => {
          e.stopPropagation();
          sphereHandler();
        }}
      >
        <sphereGeometry />
        <meshStandardMaterial color="orange" />
      </mesh>

      <mesh
        ref={cube}
        raycast={meshBounds}
        position-x={2}
        scale={1.5}
        onClick={cubeHandler}
      >
        <boxGeometry />
        <meshStandardMaterial color="mediumpurple" />
      </mesh>

      <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" />
      </mesh>
    </>
  );
}
