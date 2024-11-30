import * as THREE from "three";
import { RigidBody } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { useRef } from "react";
import { Quaternion } from "three";
import { useState } from "react";

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
      <RigidBody
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

export function Level({
  trapsCount = 5,
  types = [BlockSpinner, BlockLimbo, BlockAxe],
}) {
  return (
    <>
      <BlockStart position={[0, 0, 0]} />
      {/* <BlockSpinner position={[0, 0, 12]} />
      <BlockLimbo position={[0, 0, 8]} />
      <BlockAxe position={[0, 0, 4]} />
      <BlockEnd position={[0, 0, 0]} /> */}
    </>
  );
}
