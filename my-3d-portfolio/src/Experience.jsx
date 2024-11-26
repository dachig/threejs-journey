import {
  Text,
  ContactShadows,
  PresentationControls,
  Float,
  Environment,
  Text3D,
  Center,
  useMatcapTexture,
} from "@react-three/drei";
import Macbook from "./macbook";
import { useState } from "react";

export default function Experience() {
  const [isClosed, setIsClosed] = useState(true);
  const [matcapTexture] = useMatcapTexture("416BA7_A5B8D0_0D2549_65ABEB", 256);

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
          <rectAreaLight
            width={2.5}
            height={1.65}
            intensity={65}
            color="gray"
            rotation={[0.1, Math.PI, 0]}
            position={[0, 0.55, -1.15]}
          />
          <Macbook isClosed={isClosed} position-y={-1.2} />
          <Text
            onClick={() => setIsClosed(!isClosed)}
            rotation-x={-Math.PI / 2}
            position={[0.5, -0.6, 1.4]}
            font="/bangers-v20-latin-regular.woff"
            width={1}
            fontSize={0.25}
            maxWidth={1}
          >
            {isClosed ? "Open" : "Close"}
            <meshMatcapMaterial matcap={matcapTexture} />
          </Text>

          <Text3D
            rotation-y={-1.6}
            position={[2, 0.5, -1]}
            bevelEnabled
            bevelSegments={6}
            bevelSize={0.02}
            bevelOffset={0}
            size={0.4}
            height={0.01}
            font={"/Bangers_Regular.json"}
          >
            {`Dachi\nGiorgobiani`}
            <meshMatcapMaterial matcap={matcapTexture} />
          </Text3D>
        </Float>
      </PresentationControls>
      <ContactShadows position-y={-1.4} opacity={0.5} scale={5} blur={2.5} />
    </>
  );
}
