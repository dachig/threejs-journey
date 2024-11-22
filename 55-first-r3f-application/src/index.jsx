import "./style.css";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import Experience from "./experience";
import * as THREE from "three";

const root = ReactDOM.createRoot(document.querySelector("#root"));

root.render(
  <Canvas
    dpr={[1,2]} // min 1 pixel and can't go above 2 // default!!!
    gl={{
      toneMapping: THREE.ACESFilmicToneMapping,
    }}
    camera={{ fov: 60, near: 0.1, far: 200 }}
  >
    <Experience />
  </Canvas>
);
