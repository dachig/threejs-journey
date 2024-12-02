import { OrbitControls } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import { Level } from "./Level.jsx";
import Lights from "./Lights.jsx";
import Player from "./Player.jsx";
import useGame from "./stores/useGame.js";

export default function Experience() {
  const trapsCount = useGame((state) => state.trapsCount);
  const trapsSeed = useGame((state) => state.trapsSeed);

  return (
    <>
      <color args={["#bdedfc"]} attach="background" />
      <OrbitControls makeDefault />
      <Physics debug={false}>
        <Lights />
        <Level trapsCount={trapsCount} trapsSeed={trapsSeed} />
        <Player />
      </Physics>
    </>
  );
}
