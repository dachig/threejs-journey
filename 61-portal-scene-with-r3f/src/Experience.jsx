import { OrbitControls } from "@react-three/drei";
import Portal from "./portal";

export default function Experience() {
  return (
    <>
      <color args={["#030202"]} attach="background" />
      <OrbitControls makeDefault />
      <ambientLight intensity={2} />

      <Portal />
    </>
  );
}
