import { useFrame, useThree } from "@react-three/fiber";
import {
  OrbitControls,
  useHelper,
  BakeShadows,
  SoftShadows,
  AccumulativeShadows,
  RandomizedLight,
  ContactShadows,
  Sky,
  Environment,
  Lightformer,
  Stage,
} from "@react-three/drei";
import { useEffect, useRef } from "react";
import { Perf } from "r3f-perf";
import * as THREE from "three";
import { useControls } from "leva";

export default function Experience() {
  const directionalLigt = useRef();
  useHelper(directionalLigt, THREE.DirectionalLightHelper, 1);
  const cube = useRef();

  useFrame((state, delta) => {
    // const time = state.clock.elapsedTime;
    // cube.current.position.x = 2 + Math.sin(time);
    // cube.current.rotation.y += delta * 0.2;
  });

  const { color, blur, opacity } = useControls("contact shadows", {
    color: "#000000",
    blur: { value: 1, min: 0, max: 10 },
    opacity: { value: 0.5, min: 0, max: 1 },
  });
  const { sunPosition } = useControls("sky", {
    sunPosition: { value: [1, 2, 3] },
  });

  const { envMapIntensity, envMapHeight, envMapRadius, envMapScale } =
    useControls("environment map", {
      envMapIntensity: { value: 1, min: 0, max: 12 },
      envMapHeight: { value: 7, min: 0, max: 100 },
      envMapRadius: { value: 28, min: 10, max: 1000 },
      envMapScale: { value: 100, min: 10, max: 1000 },
    });
  //   How to update the envMapIntensity check below and above
  const scene = useThree((state) => state.scene);
  useEffect(() => {
    scene.environmentIntensity = envMapIntensity;
  }, [envMapIntensity]);
  return (
    <>
      {/* <BakeShadows /> */}
      {/* <SoftShadows size={25} samples={10} focus={0} /> */}
      {/* <AccumulativeShadows position={[0, -0.99, 0]} frames={100} temporal>
         The more frames the better the shadow looks, cna combine with temporal to spread the first frame render so it doesnt take too long to load 
        <RandomizedLight
          amount={8}
          radius={1}
          ambient={0.5}
          intensity={3}
          position={[1, 2, 3]}
          bias={0.001}
        />
      </AccumulativeShadows> */}
      {/* <ContactShadows
        // Great shadow but physically inaccurate as it always comes for the upper y axis
        position={[0, 0, 0]}
        far={5}
        color={color}
        opacity={opacity}
        blur={blur}
        frames={1}
      /> */}
      {/* <Sky sunPosition={sunPosition} /> */}
      {/* <Environment
        preset="sunset"
        ground={{
          height: envMapHeight,
          radius: envMapRadius,
          scale: envMapScale,
        }}

        // files={
        //   "./environmentMaps/the_sky_is_on_fire_2k.hdr"
        //   // [
        //   //   "./environmentMaps/2/px.jpg",
        //   //   "./environmentMaps/2/nx.jpg",
        //   //   "./environmentMaps/2/py.jpg",
        //   //   "./environmentMaps/2/ny.jpg",
        //   //   "./environmentMaps/2/pz.jpg",
        //   //   "./environmentMaps/2/nz.jpg",
        //   // ]
        // }
      >
        {/* <mesh scale={10} position-z={-5}>
          <planeGeometry />
          <meshBasicMaterial color={[10, 0, 0]} />
          {/* color setting as an array (rgb) to crank up the intensity of a certain color *
        But it's a bit redundant this way, because of the Lightformer helper from drei
        </mesh> */}
      {/* <Lightformer
          scale={10}
          position-z={-5}
          intensity={5}
          color="cyan"
          form="ring"
        /> */}
      {/* <color args={["black"]} attach="background" /> *
      </Environment> */}
      {/* <color attach="background" args={["ivory"]} /> */}

      <Perf position="top-left" />

      <OrbitControls makeDefault />

      {/* <directionalLight
        ref={directionalLigt}
        position={sunPosition}
        castShadow
        intensity={4.5}
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={1}
        shadow-camera-far={10}
        shadow-camera-top={5}
        shadow-camera-right={5}
        shadow-camera-bottom={-5}
        shadow-camera-left={-5}
      />
      <ambientLight intensity={1.5} /> */}
      {/* 
      <mesh castShadow position-y={1} position-x={-2}>
        <sphereGeometry />
        <meshStandardMaterial color="orange" />
      </mesh>

      <mesh
        castShadow
        position-y={1}
        ref={cube}
        position={[2, 0, 0]}
        scale={1.5}
      >
        <boxGeometry />
        <meshStandardMaterial color="mediumpurple" />
      </mesh> */}

      {/* <mesh position-y={0} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" />
      </mesh> */}
      <Stage
        shadows={{
          type: "contact",
          opacity: 0.5,
          blur: 3,
        }}
        environment="sunset"
      >
        <mesh castShadow position-y={1} position-x={-2}>
          <sphereGeometry />
          <meshStandardMaterial color="orange" />
        </mesh>

        <mesh
          castShadow
          position-y={1}
          ref={cube}
          position={[2, 0, 0]}
          scale={1.5}
        >
          <boxGeometry />
          <meshStandardMaterial color="mediumpurple" />
        </mesh>
      </Stage>
    </>
  );
}
