import {
  Text,
  ContactShadows,
  PresentationControls,
  Environment,
} from "@react-three/drei";
import Macbook from "./macbook";
import { useState, useRef, useEffect } from "react";
import gsap from "gsap";

export default function Experience({ onClosedChange }) {
  const [isClosed, setIsClosed] = useState(true);
  const [isActuallyClosed, setIsActuallyClosed] = useState(true);
  const [loading, setLoading] = useState(false);
  const [audioOpen] = useState(() => new Audio("/hit.mp3"));
  const [audioClose] = useState(() => new Audio("/close-sound.mp3"));

  const macRef = useRef();
  useEffect(() => {
    if (!macRef.current) return;
    gsap.killTweensOf(macRef.current.rotation);
    gsap.killTweensOf(macRef.current.position);

    gsap.to(macRef.current.position, {
      x: isClosed ? 0 : 1,
      y: 0.25,
      z: isClosed ? 0 : 0.5,
      duration: 1.25,
      ease: "power2.inOut",
    });
    gsap.to(macRef.current.rotation, {
      x: isClosed ? 0 : Math.PI / -16,
      y: isClosed ? 0 : -Math.PI / 16,
      z: 0,
      duration: 1.25,
      ease: "power2.inOut",
    });
  }, [isClosed]);

  const toggleScreen = () => {
    const nextClosed = !isClosed;
    const play = nextClosed ? () => {} : playOpenSound;
    play();
    setIsClosed(nextClosed);
    onClosedChange(nextClosed);

    const duration = nextClosed ? 750 : 1000;

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setIsActuallyClosed(nextClosed);
      if (nextClosed) playCloseSound();
    }, duration);
  };

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
        enabled={isClosed}
      >
        <group ref={macRef} position-y={-1.2}>
          <Macbook isClosed={isClosed} isActuallyClosed={isActuallyClosed} />
          {!loading && (
            <Text
              onClick={() => {
                toggleScreen();
              }}
              rotation-y={isClosed ? -Math.PI / 2 : -Math.PI / 8}
              position={isClosed ? [1.75, -0.4, 0.5] : [1.75, -0.25, -1]}
              font="/RobotoMono-SemiBold.ttf"
              width={1}
              fontSize={isClosed ? 0.25 : 0.15}
              maxWidth={1}
              color="#ccd6f6"
            >
              {isClosed ? "Open" : "Close"}
            </Text>
          )}
        </group>
      </PresentationControls>
      <ContactShadows position-y={-1.4} opacity={0.5} scale={5} blur={2.5} />
    </>
  );
}
