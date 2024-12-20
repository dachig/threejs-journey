import {
  Text,
  ContactShadows,
  PresentationControls,
  Float,
  Environment,
  Text3D,
  Center,
} from "@react-three/drei";
import Macbook from "./macbook";
import { useState } from "react";

export default function Experience() {
  const [isClosed, setIsClosed] = useState(true);
  const [loading, setLoading] = useState(false);
  const [audioOpen] = useState(() => {
    return new Audio("/hit.mp3");
  });
  const [audioClose] = useState(() => {
    return new Audio("/close-sound.mp3");
  });
  function playOpenSound() {
    audioOpen.currentTime = 0;
    audioOpen.volume = 0.5;
    audioOpen.play();
  }
  function playCloseSound() {
    audioClose.currentTime = 0;
    audioClose.play();
  }
  return (
    <>
      <Environment preset="city" />
      <color args={["#041526"]} attach="background" />
      <PresentationControls
        global
        rotation={[0.2, 0.1, 0]}
        polar={[-0.4, 0.2]}
        azimuth={[-1, 0.75]}
        config={{ mass: 2, tension: 400 }}
        snap={{ mass: 4, tension: 400 }}
      >
        {/* Only moves the element its wrapped around UNLESS global is used, so orbitControls is not needed anymore */}
        <Float rotationIntensity={0.4}>
          <Macbook isClosed={isClosed} position-y={-1.2} />
          {!loading && (
            <Text
              onClick={() => {
                setLoading(true);
                setIsClosed(!isClosed);
                setTimeout(() => {
                  setLoading(false);
                }, 1500);
                if (isClosed) playOpenSound();
                else {
                  setLoading(true);
                  setTimeout(() => {
                    playCloseSound();
                    setLoading(false);
                  }, 900);
                }
              }}
              rotation-x={-Math.PI / 2}
              position={[0.5, -0.6, 1.4]}
              font="/bangers-v20-latin-regular.woff"
              width={1}
              fontSize={0.25}
              maxWidth={1}
              color="skyblue"
            >
              {isClosed ? "Open" : "Close"}
            </Text>
          )}

          <Text
            rotation-y={-1.6}
            position={[2, 0.4, 0]}
            font="/bangers-v20-latin-regular.woff"
            width={1}
            fontSize={0.5}
            maxWidth={1}
            color="skyblue"
          >
            {`Dachi\nGiorgobiani`}
          </Text>
        </Float>
      </PresentationControls>
      <ContactShadows position-y={-1.4} opacity={0.5} scale={5} blur={2.5} />
    </>
  );
}
