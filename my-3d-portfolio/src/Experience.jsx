import {
  Text,
  Html,
  ContactShadows,
  PresentationControls,
  Float,
  Environment,
  useGLTF,
} from "@react-three/drei";

export default function Experience() {
  const computer = useGLTF(
    "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf"
  );
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
          <primitive position-y={-1.2} object={computer.scene}>
            <Html
              transform
              className="htmlScreen"
              distanceFactor={1.17}
              position={[0, 1.56, -1.4]}
              rotation-x={-0.256}
            >
              {/* transform rotates and makes it move with the laptop when its dragged around */}
              <iframe src="https://www.dachig.com/" frameborder="0"></iframe>
            </Html>
          </primitive>

          <Text
            rotation-y={-1.6}
            position={[2, 0.5, 0]}
            font="/bangers-v20-latin-regular.woff"
            width={1}
            fontSize={0.5}
            maxWidth={1}
            color="lightblue"
          >
            Dachi Giorgobiani
          </Text>
        </Float>
      </PresentationControls>
      <ContactShadows position-y={-1.4} opacity={0.5} scale={5} blur={2.5} />
    </>
  );
}
