import * as THREE from "three";
import { RigidBody, CuboidCollider } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import { useGLTF, Float, Text } from "@react-three/drei";
import { useRef } from "react";
import { Quaternion } from "three";
import { useState } from "react";
import { useMemo } from "react";

// geometry
const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
// materials
const floor1Material = new THREE.MeshStandardMaterial({ color: "limegreen" });
const floor2Material = new THREE.MeshStandardMaterial({ color: "greenyellow" });
const obstacleMaterial = new THREE.MeshStandardMaterial({ color: "orangered" });
const wallMaterial = new THREE.MeshStandardMaterial({ color: "slategrey" });

function BlockStart({ position = [0, 0, 0] }) {
  return (
    <group position={position}>
      <mesh
        geometry={boxGeometry}
        material={floor1Material}
        position={[0, -0.1, 0]}
        scale={[4, 0.2, 4]}
        receiveShadow
      />
      <Float>
        <Text
          maxWidth={1}
          scale={0.33}
          font="/bebas-neue-v9-latin-regular.woff"
          position={[0.75, 0.65, 0]}
          textAlign="right"
          lineHeight={0.75}
          rotation-y={-0.5}
        >
          Marble Race
          <meshBasicMaterial toneMapped={false} />
        </Text>
      </Float>
    </group>
  );
}

export function BlockSpinner({ position = [0, 0, 0] }) {
  const [speed] = useState(
    () => (Math.random() + 0.2) * 3 * (Math.random() < 0.5 ? -1 : 1)
  );
  const obstacle = useRef();
  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;

    const rotation = new THREE.Quaternion();
    rotation.setFromEuler(new THREE.Euler(0, time * speed, 0));
    obstacle.current.setNextKinematicRotation(rotation);
  });

  return (
    <group position={position}>
      <mesh
        geometry={boxGeometry}
        material={floor2Material}
        position={[0, -0.1, 0]}
        scale={[4, 0.2, 4]}
        receiveShadow
      />
      <RigidBody
        ref={obstacle}
        type="kinematicPosition"
        position={[0, 0.3, 0]}
        restitution={0.2}
        friction={0}
      >
        <mesh
          geometry={boxGeometry}
          material={obstacleMaterial}
          scale={[3.5, 0.3, 0.3]}
          receiveShadow
          castShadow
        />
      </RigidBody>
    </group>
  );
}

export function BlockLimbo({ position = [0, 0, 0] }) {
  const [timeOffset] = useState(() => Math.random() * Math.PI * 2);
  const obstacle = useRef();
  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;

    const angle = Math.sin(time + timeOffset) + 1.15;
    obstacle.current.setNextKinematicTranslation({
      x: position[0], // inherits from props position otherwise its absolute
      y: angle,
      z: position[2], // inherits from props position otherwise its absolute
    });
  });

  return (
    <group position={position}>
      <mesh
        geometry={boxGeometry}
        material={floor2Material}
        position={[0, -0.1, 0]}
        scale={[4, 0.2, 4]}
        receiveShadow
      />
      <RigidBody
        ref={obstacle}
        type="kinematicPosition"
        position={[0, 0.3, 0]}
        restitution={0.2}
        friction={0}
      >
        <mesh
          geometry={boxGeometry}
          material={obstacleMaterial}
          scale={[3.5, 0.3, 0.3]}
          receiveShadow
          castShadow
        />
      </RigidBody>
    </group>
  );
}

export function BlockAxe({ position = [0, 0, 0] }) {
  const [timeOffset] = useState(() => Math.random() * Math.PI * 2);
  const obstacle = useRef();
  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;

    const angle = Math.sin(time + timeOffset) * 1.25;
    obstacle.current.setNextKinematicTranslation({
      x: angle, // inherits from props position otherwise its absolute
      y: position[1] + 0.75,
      z: position[2], // inherits from props position otherwise its absolute
    });
  });

  return (
    <group position={position}>
      <mesh
        geometry={boxGeometry}
        material={floor2Material}
        position={[0, -0.1, 0]}
        scale={[4, 0.2, 4]}
        receiveShadow
      />
      <RigidBody
        ref={obstacle}
        type="kinematicPosition"
        position={[0, 0.3, 0]}
        restitution={0.2}
        friction={0}
      >
        <mesh
          geometry={boxGeometry}
          material={obstacleMaterial}
          scale={[1.5, 1.5, 0.3]}
          receiveShadow
          castShadow
        />
      </RigidBody>
    </group>
  );
}

function BlockEnd({ position = [0, 0, 0] }) {
  const { scene } = useGLTF("/hamburger.glb");
  scene.children.forEach((mesh) => {
    mesh.castShadow = true;
  }); // cast shadow on each mesh of the hamburger, because it has 4
  return (
    <group position={position}>
      <mesh
        geometry={boxGeometry}
        material={floor1Material}
        position={[0, 0, 0]} // 0 instead of default -0.1 to indicate end
        scale={[4, 0.2, 4]}
        receiveShadow
      />
      <Text
        scale={1}
        font="/bebas-neue-v9-latin-regular.woff"
        position={[0, 2, 2]}
      >
        Finish
        <meshBasicMaterial toneMapped={false} />
      </Text>
      <RigidBody
        key={position}
        type="fixed"
        colliders="hull"
        position={[0, 0.2, 0]}
        restitution={0.2}
        friction={0}
      >
        <primitive object={scene} scale={0.2} />
      </RigidBody>
    </group>
  );
}

function Bounds({ length = 1 }) {
  return (
    <>
      {/* right wall */}
      <RigidBody key={length} type="fixed" restitution={0.2} friction={0}>
        <mesh
          geometry={boxGeometry}
          material={wallMaterial}
          position={[2.15, 1.5, -(length * 2) + 2]}
          scale={[0.3, 3, 4 * length]}
          castShadow
        />
        {/* left wall */}
        <mesh
          geometry={boxGeometry}
          material={wallMaterial}
          position={[-2.15, 1.5, -(length * 2) + 2]}
          scale={[0.3, 3, 4 * length]}
          receiveShadow
        />
        {/* back wall */}
        <mesh
          geometry={boxGeometry}
          material={wallMaterial}
          position={[0, 1.5, -(length * 4) + 2]}
          scale={[4, 3, 0.3]}
          receiveShadow
        />
        {/* floor cuboid collider goes here to prevent falling through floor */}
        <CuboidCollider
          args={[2, 0.1, 2 * length]}
          position={[0, -0.1, -(length * 2) + 2]}
          restitution={0.2}
          friction={1}
        />
      </RigidBody>
    </>
  );
}

export function Level({
  trapsCount = 5,
  types = [BlockSpinner, BlockLimbo, BlockAxe],
  trapsSeed = 0,
}) {
  const blocks = useMemo(() => {
    const blocks = [];
    for (let i = 0; i < trapsCount; i++) {
      const type = types[Math.floor(Math.random() * types.length)];
      blocks.push(type);
    }
    return blocks;
  }, [trapsCount, types, trapsSeed]);
  return (
    <>
      <BlockStart position={[0, 0, 0]} />
      {blocks.map((Block, index) => (
        <Block key={index} position={[0, 0, -(index + 1) * 4]} />
      ))}
      <BlockEnd position={[0, 0, -((trapsCount + 1) * 4)]} />
      <Bounds length={trapsCount + 2} />
    </>
  );
}
