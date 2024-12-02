import { RigidBody, useRapier } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import { useKeyboardControls } from "@react-three/drei";
import * as THREE from "three";
import { useState, useEffect, useRef } from "react";
import useGame from "./stores/useGame";

export default function Player() {
  const ball = useRef();
  const [subscribeKeys, getKeys] = useKeyboardControls();
  const { rapier, world } = useRapier();

  const [smoothedCameraPosition] = useState(
    () => new THREE.Vector3(10, 10, 10)
  );
  const [smoothedCameraTarget] = useState(() => new THREE.Vector3());

  const start = useGame((state) => state.start);
  const end = useGame((state) => state.end);
  const trapsCount = useGame((state) => state.trapsCount);
  const restart = useGame((state) => state.restart);

  function jump() {
    const origin = ball.current.translation();
    origin.y -= 0.31;
    const direction = { x: 0, y: -1, z: 0 };
    const ray = new rapier.Ray(origin, direction);
    const hit = world.castRay(ray, 10, true);

    if (hit.timeOfImpact < 0.15) {
      ball.current.applyImpulse({ x: 0, y: 0.5, z: 0 });
    }
  }
  function reset() {
    ball.current.setTranslation({ x: 0, y: 1, z: 0 });
    ball.current.setLinvel({ x: 0, y: 0, z: 0 });
    ball.current.setAngvel({ x: 0, y: 0, z: 0 });
  }
  useEffect(() => {
    const unsubscribeReset = useGame.subscribe(
      (state) => state.phase,
      (value) => {
        if (value === "ready") reset();
      }
    );
    const unsubcribeJump = subscribeKeys(
      (state) => state.jump, // this function is called the selector
      (value) => {
        if (value) jump();
      }
    );
    const unsubscribeAny = subscribeKeys(() => {
      start();
    });
    return () => {
      unsubscribeReset();
      unsubcribeJump();
      unsubscribeAny();
    };
  }, []);
  useFrame((state, delta) => {
    // controls
    const { forward, backward, leftward, rightward, jump } = getKeys();
    const impulse = { x: 0, y: 0, z: 0 };
    const torque = { x: 0, y: 0, z: 0 };
    const impulseStrength = 0.6 * delta;
    const torqueStrength = 0.2 * delta;
    if (forward) {
      impulse.z -= impulseStrength;
      torque.x -= torqueStrength;
    }
    if (rightward) {
      impulse.x += impulseStrength;
      torque.z -= torqueStrength;
    }
    if (backward) {
      impulse.z += impulseStrength;
      torque.x += torqueStrength;
    }
    if (leftward) {
      impulse.x -= impulseStrength;
      torque.z += torqueStrength;
    }
    if (jump) {
    }
    ball.current.applyImpulse(impulse);
    ball.current.applyTorqueImpulse(torque);
    // camera
    const ballPosition = ball.current.translation();
    const cameraPosition = new THREE.Vector3();
    cameraPosition.copy(ballPosition);
    cameraPosition.z += 3.25;
    cameraPosition.y += 0.65;

    const cameraTarget = new THREE.Vector3();
    cameraTarget.copy(ballPosition);
    cameraTarget.y += 0.25;

    smoothedCameraPosition.lerp(cameraPosition, 5 * delta);
    smoothedCameraTarget.lerp(cameraTarget, 5 * delta);

    state.camera.position.copy(smoothedCameraPosition);
    state.camera.lookAt(smoothedCameraTarget);
    // phases
    if (ballPosition.z < -(trapsCount * 4 + 2)) end();
    if (ballPosition.y < -4) restart();
  });
  return (
    <>
      <RigidBody
        ref={ball}
        canSleep={false}
        colliders="ball"
        restitution={0.2}
        friction={1}
        position={[0, 1, 0]}
        linearDamping={0.5}
        angularDamping={0.5}
      >
        <mesh castShadow>
          <icosahedronGeometry args={[0.3, 1]} />
          <meshStandardMaterial flatShading color="mediumpurple" />
        </mesh>
      </RigidBody>
    </>
  );
}
