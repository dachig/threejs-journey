import { useFrame, extend, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import CustomObject from "./customObject";

extend({ OrbitControls });

export default function Experience() {
  const cubeRef = useRef();
  const groupRef = useRef();
  const { gl, camera } = useThree();

  useFrame((state, delta) => {
    // delta is universal for everyone to ensure correct animation speed
    const clock = state.clock; // state has a built-in clock to extract elapsed time
    cubeRef.current.rotation.x += delta;
    // state.camera.position.x = Math.sin(clock.elapsedTime) * 5;
    // state.camera.position.z = Math.cos(clock.elapsedTime) * 5;
    // state.camera.lookAt(0,0,0)
  });
  return (
    <>
      <orbitControls args={[camera, gl.domElement]} />
      <directionalLight intensity={5} position={[0, 1, 1]} />
      <ambientLight intensity={2} />

      <CustomObject />

      <group ref={groupRef}>
        <mesh position-x={-2}>
          <sphereGeometry />
          <meshStandardMaterial color="orange" />
        </mesh>
        <mesh ref={cubeRef} position-x={2} scale={1.5}>
          <boxGeometry />
          <meshStandardMaterial color="purple" />
        </mesh>
      </group>
      <mesh rotation-x={-Math.PI * 0.5} position-y={-1} scale={10}>
        <planeGeometry />
        <meshStandardMaterial color="green" />
      </mesh>
    </>
  );
}
