import "./style.css";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience.jsx";
import { Analytics } from "@vercel/analytics/react";
import { Leva } from "leva";

const root = ReactDOM.createRoot(document.querySelector("#root"));

function App() {
  function checkViewportSize() {
    if (window.innerWidth <= 600) {
      return [0, 0, 7];
    } else if (window.innerWidth > 600 && window.innerWidth < 1024) {
      return [0, 0, 3];
    } else {
      return [-2, 1.5, 3.75];
    }
  }

  return (
    <>
      <Leva />
      <Canvas
        className="r3f"
        camera={{
          fov: 45,
          near: 0.1,
          far: 2000,
          position: checkViewportSize(),
        }}
      >
        {window.innerWidth > 1024 ? (
          <Experience />
        ) : (
          window.location.replace(
            "https://dev-portfolio-git-main-dachigs-projects.vercel.app/"
          )
        )}
        <Analytics />
      </Canvas>
    </>
  );
}

root.render(<App />);
