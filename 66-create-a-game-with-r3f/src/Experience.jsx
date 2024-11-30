import { OrbitControls } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import { Level, BlockSpinner, BlockLimbo, BlockAxe } from "./Level.jsx";
import Lights from "./Lights.jsx";

export default function Experience() {
  return (
    <>
      <OrbitControls makeDefault />
      <Physics debug>
        <Lights />
        <Level />
      </Physics>
    </>
  );
}
