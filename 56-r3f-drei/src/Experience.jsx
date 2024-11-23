import {
  MeshReflectorMaterial,
  Float,
  OrbitControls,
  TransformControls,
  PivotControls,
  Html,
  Text,
} from "@react-three/drei";
import { useRef } from "react";

export default function Experience() {
  const cubeRef = useRef(); // TransformControls can work with useRef
  const sphereRef = useRef();
  return (
    <>
      <OrbitControls makeDefault />{" "}
      {/* makeDefault differentiates between OrbitControls and TransformControls */}
      <directionalLight position={[1, 2, 3]} intensity={4.5} />
      <ambientLight intensity={1.5} />
      <PivotControls anchor={[0, 0, 0]} depthTest={false}>
        {/* depthTest={false}> anchor to center of object which it incapsulates and set depthTest to false to render it visible */}
        <mesh position-x={-2}>
          <sphereGeometry />
          <meshStandardMaterial color="orange" />
          <Html
            occlude={[cubeRef]}
            distanceFactor={8}
            center
            className="label"
            wrapperClass=""
            position={[0, 1, 0]}
          >
            {/* Html import as a 3d element */}
            This is a sphere
          </Html>{" "}
        </mesh>{" "}
      </PivotControls>
      {/* <TransformControls object={cubeRef} /> */}
      <mesh ref={cubeRef} position-x={2} scale={1.5}>
        <boxGeometry />
        <meshStandardMaterial color="mediumpurple" />
      </mesh>
      <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <MeshReflectorMaterial
          color="salmon"
          resolution={512}
          blur={(0, 1000)}
          mixBlur={1}
          mirror={0.5}
        />
        {/* ^^ MeshReflectorMaterial imported from drei super nice */}
      </mesh>
      <Float speed={10} floatIntensity={5}>
        {" "}
        <Text
          color="salmon"
          position={[3, 2, -4]}
          font="./bangers-v20-latin-regular.woff"
          fontSize={1}
          maxWidth={1}
          textAlign="center"
        >
          I love R3F
        </Text>
      </Float>
    </>
  );
}
