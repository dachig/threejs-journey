import { useGLTF, OrbitControls } from "@react-three/drei";
import { Perf } from "r3f-perf";
import {
  InstancedRigidBodies,
  CylinderCollider,
  CuboidCollider,
  Physics,
  RigidBody,
} from "@react-three/rapier";
import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
// For more complex colliders; CuboidCollider and etc to add multiple colliders to a RigidBody
export default function Experience() {
  const { scene } = useGLTF("/hamburger.glb");
  useEffect(() => {
    for (let i = 0; i < cubesCount; i++) {
      const matrix = new THREE.Matrix4();
      matrix.compose(
        new THREE.Vector3(i * 2, 0, 0),
        new THREE.Quaternion(),
        new THREE.Vector3(1, 1, 1)
      );
      cubes.current.setMatrixAt(i, matrix);
    }
  }, []);
  const cube = useRef();
  const twister = useRef();
  function cubeJump() {
    console.log(cube.current);
    cube.current.applyImpulse({ x: 0, y: 5, z: 0 });
    cube.current.applyTorqueImpulse({ x: 0, y: 1, z: 0 });
  }
  useFrame((state, delta) => {
    const elapsedTime = state.clock.elapsedTime;

    const eulerRotation = new THREE.Euler(0, elapsedTime * 3, 0);
    const quaternionRotation = new THREE.Quaternion();
    quaternionRotation.setFromEuler(eulerRotation);

    twister.current.setNextKinematicRotation(quaternionRotation);

    const angle = elapsedTime * 0.5;
    const x = Math.cos(angle) * 2;
    const z = Math.sin(angle) * 2;
    twister.current.setNextKinematicTranslation({ x, y: -0.8, z });
  });

  const [audio] = useState(() => {
    return new Audio("/hit.mp3");
  });
  function collisionEnter() {
    console.log("collision!");
    audio.currentTime = 0;
    audio.volume = Math.random();
    audio.play();
  }

  const cubesCount = 1000;
  const cubes = useRef();
  const instances = useMemo(() => {
    const instances = [];
    for (let i = 0; i < cubesCount; i++) {
      instances.push({
        key: "instance_" + i,
        position: [
          (Math.random() - 0.5) * 8,
          6 + i * 0.2,
          (Math.random() - 0.5) * 8,
        ],
        rotation: [0, 0, 0],
      });
    }
    return instances;
  }, []);

  console.log(audio);
  return (
    <>
      <Perf position="top-left" />

      <OrbitControls makeDefault />

      <directionalLight castShadow position={[1, 2, 3]} intensity={4.5} />
      <ambientLight intensity={1.5} />

      <Physics debug gravity={[0, -9.08, 0]}>
        {/* default gravity y = - 9.08 */}
        <RigidBody colliders="ball" gravityScale={0.2} position={[-4, 2, 4]}>
          {/* gravity scale for specific RigidBody */}
          <mesh castShadow>
            <sphereGeometry />
            <meshStandardMaterial color="orange" />
          </mesh>
        </RigidBody>

        <RigidBody
          scale={0.25}
          restitution={0.15}
          friction={0.25}
          ref={cube}
          position={[1, 2, 0]}
          colliders={false}
        >
          {/* Set colliders to false when importing custom colliders below */}
          <CuboidCollider args={[0.5, 0.5, 0.5]} mass={1} />
          <mesh onClick={cubeJump} castShadow>
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple" />
          </mesh>{" "}
        </RigidBody>

        {/* avoid trimesh if the obect is not static. Don't use for moving objects */}
        <RigidBody colliders="trimesh" position={[-3.9, -0.5, 4]}>
          <mesh rotation-x={Math.PI / 2}>
            <torusGeometry />
            <meshStandardMaterial color={"green"} />
          </mesh>{" "}
        </RigidBody>

        <RigidBody type="fixed">
          <mesh receiveShadow position-y={-1.25}>
            <boxGeometry args={[10, 0.5, 10]} />
            <meshStandardMaterial color="greenyellow" />
          </mesh>{" "}
        </RigidBody>

        <RigidBody
          ref={twister}
          position-y={-0.8}
          type="kinematicPosition"
          friction={0}
          onCollisionEnter={collisionEnter}
        >
          <mesh castShadow scale={[0.4, 0.4, 3]}>
            <boxGeometry />
            <meshStandardMaterial color="dark-orange" />
          </mesh>
        </RigidBody>

        <RigidBody colliders={false} scale={0.2}>
          <CylinderCollider args={[2, 5.25]} />
          <primitive object={scene} />
        </RigidBody>

        <RigidBody type="fixed">
          <CuboidCollider args={[5, 2, 0.5]} position={[0, 1, 5.5]} />
          <CuboidCollider args={[5, 2, 0.5]} position={[0, 1, -5.5]} />
          <CuboidCollider args={[0.5, 2, 5]} position={[5.5, 1, 0]} />
          <CuboidCollider args={[0.5, 2, 5]} position={[-5.5, 1, 0]} />
        </RigidBody>
        <InstancedRigidBodies instances={instances}>
          <instancedMesh ref={cubes} args={[null, null, cubesCount]}>
            <boxGeometry />
            <meshStandardMaterial color="tomato" />
          </instancedMesh>
        </InstancedRigidBodies>
      </Physics>
    </>
  );
}
