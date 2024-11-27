import {
  Clone,
  useMatcapTexture,
  Center,
  OrbitControls,
  Text3D,
} from "@react-three/drei";
import { Perf } from "r3f-perf";
import { useState } from "react";

export default function Experience() {
  const [matcapTexture] = useMatcapTexture("7B5254_E9DCC7_B19986_C8AC91", 256);
  //   const tempArray = [...Array(100)];
  const [torusGeometry, setTorusGeometry] = useState();
  //   step 1 for reducing 100 geometries to 1
  const [meshMatcapMaterial, setMeshMatcapMaterial] = useState();

  return (
    <>
      <torusGeometry ref={setTorusGeometry} args={[1, 0.6, 16, 32]} />{" "}
      {/* step 2 for reducing 100 geometries to 1 */}
      <meshMatcapMaterial ref={setMeshMatcapMaterial} matcap={matcapTexture} />;
      <Perf position="top-left" />
      <OrbitControls makeDefault />
      <Center>
        <Text3D
          material={meshMatcapMaterial}
          bevelEnabled
          bevelSegments={4}
          bevelSize={0.02}
          bevelOffset={0}
          font={"/fonts/helvetiker_regular.typeface.json"}
        >
          HELLO R3F
        </Text3D>
      </Center>
      {[...Array(100)].map((e, i) => (
        // step 3 for reducing 100 geometries to 1 below geometry
        <mesh
          geometry={torusGeometry}
          material={meshMatcapMaterial}
          key={i}
          position={[
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
          ]}
          scale={0.2 + Math.random() * 0.2}
          rotation={[
            (Math.random() - 0.5) * Math.PI,
            (Math.random() - 0.5) * Math.PI,
            0,
          ]}
        />
      ))}
    </>
  );
}
