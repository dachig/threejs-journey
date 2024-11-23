import "./style.css";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience.jsx";
import { Analytics } from "@vercel/analytics/react";

const root = ReactDOM.createRoot(document.querySelector("#root"));

root.render(
  <Canvas
    className="r3f"
    camera={{
      fov: 45,
      near: 0.1,
      far: 2000,
      position: [-2, 1.5, 4],
    }}
  >
    <Experience />
    <Analytics />
  </Canvas>
);
