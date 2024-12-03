import { OrbitControls, Sparkles } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import { Level } from "./Level.jsx";
import Lights from "./Lights.jsx";
import Player from "./Player.jsx";
import useGame from "./stores/useGame.js";
import { Perf } from "r3f-perf";

export default function Experience() {
  const trapsCount = useGame((state) => state.trapsCount);
  const trapsSeed = useGame((state) => state.trapsSeed);

  return (
    <>
      {/* <Perf /> */}
      <color args={["#000000"]} attach="background" />
      <OrbitControls makeDefault />
      <Sparkles
        size={3}
        scale={[4, 4, 8 * trapsCount]}
        position-y={2}
        speed={0.2}
        count={40 * trapsCount}
      />
      <Physics debug={false}>
        <Lights />
        <Level trapsCount={trapsCount} trapsSeed={trapsSeed} />
        <Player />
      </Physics>
    </>
  );
}
