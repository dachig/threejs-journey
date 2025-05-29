import "./style.css";
import ReactDOM from "react-dom/client";
import { Canvas, useThree } from "@react-three/fiber";
import Experience from "./Experience.jsx";
import { Analytics } from "@vercel/analytics/react";
import { Leva } from "leva";
import { useEffect, useState } from "react";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import gsap from "gsap";

const root = ReactDOM.createRoot(document.querySelector("#root"));

function App() {
  const [isChildClosed, setIsChildClosed] = useState(true);

  const closedPos = [-2, 1, 4];
  const openPos = [0.95, 1.25, 0.65];
  const closedTgt = [1, -1, -2];
  const openTgt = [0, 0.5, -2];
  const to = isChildClosed ? closedPos : openPos;
  const lookAt = isChildClosed ? closedTgt : openTgt;

  function TweenCamera({ to, lookAt }) {
    const { camera } = useThree();

    useEffect(() => {
      gsap.killTweensOf(camera.position);
      gsap.to(camera.position, {
        x: to[0],
        y: to[1],
        z: to[2],
        duration: 1.25,
        ease: "power2.inOut",
        onUpdate: () => {
          camera.updateProjectionMatrix();
        },
      });
    }, [to, lookAt, camera]);

    return null;
  }

  return (
    <>
      <h1 className="sr-only">Welcome to my 3D portfolio</h1>
      <h2 className="sr-only">Custom website development</h2>
      <Leva />
      <Canvas className="r3f">
        <TweenCamera to={to} lookAt={lookAt} />
        <OrbitControls
          enableRotate={false}
          target={[1.25, 0, -2]}
          enableZoom={false}
        />
        {window.innerWidth > 1024 ? (
          <Experience onClosedChange={setIsChildClosed} />
        ) : (
          window.location.replace("https://dachig-dachigs-projects.vercel.app/")
        )}
        <Analytics />
      </Canvas>
    </>
  );
}

root.render(<App />);
