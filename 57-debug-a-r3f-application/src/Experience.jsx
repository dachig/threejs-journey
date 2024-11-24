import { OrbitControls } from "@react-three/drei";
import { useControls, button } from "leva";
import { useRef } from "react";
import { Perf } from "r3f-perf";

export default function Experience() {
  const boxRef = useRef();
  const controls = useControls("TWEAKS", {
    position: { value: { x: -2, y: 0 }, step: 0.01, joystick: "invertY" },
    color: "#ff0000",
    visible: true,
    interval: { min: 0, max: 10, value: [4, 5] },
    clickMe: button(() => {
      boxRef.current.rotation.x += Math.PI / 4;
    }),
    choice: { options: ["a", "b", "c"] },
    perfVisible: true,
  });
  console.log(controls);
  return (
    <>
      {controls.perfVisible && <Perf position="top-left" />}
      {/* manually show and hide Perf through the leva control */}
      <OrbitControls makeDefault />

      <directionalLight position={[1, 2, 3]} intensity={4.5} />
      <ambientLight intensity={1.5} />

      <mesh position={[controls.position.x, controls.position.y, 0]}>
        <sphereGeometry />
        <meshStandardMaterial color={controls.color} />
      </mesh>

      <mesh ref={boxRef} visible={controls.visible} position-x={2} scale={1.5}>
        <boxGeometry />
        <meshStandardMaterial color="mediumpurple" />
      </mesh>

      <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshBasicMaterial color="greenyellow" />
      </mesh>
    </>
  );
}
