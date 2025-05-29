import { useGLTF, Html } from "@react-three/drei";
import { useSpring, a } from "@react-spring/three"; // 'a' is the animated version of three.js components
const closedConfig = {
  mass: 0.3,
  tension: 100,
  friction: 50,
};
const openConfig = {
  duration: 1000,
  easing: (t) => t * t,
};
export default function Macbook({ isClosed }) {
  const { nodes, materials } = useGLTF("/macbook.gltf");

  const { position, rotation } = useSpring({
    position: isClosed ? [0, -0.2, -10.7] : [0.007, -0.472, -10.412],
    rotation: isClosed ? [Math.PI, 0, 0] : [1.311, 0, 0],
    config: isClosed ? openConfig : closedConfig,
  });

  return (
    <group position-y={-1.2} dispose={null}>
      <group position={[0, 0.519, 0]} scale={0.103}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Circle001.geometry}
          material={materials["Frame.001"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Circle001_1.geometry}
          material={materials["Frame.001"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Circle001_2.geometry}
          material={materials.HeadPhoneHole}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Circle001_3.geometry}
          material={materials.USB_C_INSIDE}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Circle001_4.geometry}
          material={materials["Frame.001"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Circle001_5.geometry}
          material={materials.TouchbarBorder}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Circle001_6.geometry}
          material={materials.Keyboard}
        />
        <group position={[0, -0.509, 0]} scale={5.796}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Circle006.geometry}
            material={materials["Frame.001"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Circle006_1.geometry}
            material={materials.USB_C_INSIDE}
          />
        </group>

        <group position={[-11.786, -0.15, -8.301]} scale={5.796}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Circle.geometry}
            material={materials["Keyboard.001"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Circle_1.geometry}
            material={materials.Key}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Circle_2.geometry}
            material={materials.Touchbar}
          />
        </group>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.KeyboardKeyHole.geometry}
          material={materials["Keyboard.001"]}
          position={[-11.786, -0.152, -8.301]}
          scale={5.796}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.RubberFoot.geometry}
          material={materials.DarkRubber}
          position={[-11.951, -0.751, 7.857]}
          scale={5.796}
        />
        <group position={[0.011, -0.211, -10.559]} scale={5.796}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Circle012.geometry}
            material={materials.HingeBlack}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Circle012_1.geometry}
            material={materials.HingeMetal}
          />
        </group>
        <group position={[-15.026, 0.031, 0.604]} scale={5.796}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Circle009.geometry}
            material={materials["Frame.001"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Circle009_1.geometry}
            material={materials.SpeakerHole}
          />
        </group>
        <group position={[12.204, 0.031, 0.604]} scale={5.796}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Circle003.geometry}
            material={materials["Frame.001"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Circle003_1.geometry}
            material={materials.SpeakerHole}
          />
        </group>

        <a.group position={position} rotation={rotation} scale={5.796}>
          <rectAreaLight
            className={isClosed ? "fade-out" : "fade-in"}
            width={2.5}
            height={1.65}
            intensity={40}
            color="lightblue"
            position={[0, -0.5, -2]}
            rotation={[Math.PI / 2, 0, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Circle002.geometry}
            material={materials["Frame.001"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Circle002_1.geometry}
            material={materials.Screen}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Circle002_2.geometry}
            material={materials.ScreenGlass}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Circle002_3.geometry}
            material={materials.Rubber}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Circle002_4.geometry}
            material={materials.DisplayGlass}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.AppleLogo000.geometry}
            material={materials["AppleLogo.004"]}
            position={[0.005, -0.111, -1.795]}
            rotation={[-Math.PI, 0, -Math.PI]}
            scale={0.579}
          />

          <Html
            transform
            className={isClosed ? "htmlScreen fade-out" : "htmlScreen fade-in"}
            distanceFactor={1.94}
            position={[-0.01, -0.025, -1.86]}
            rotation-x={Math.PI * 1.5}
            occlude
          >
            <iframe
              style={{ borderRadius: 4 }}
              src="https://dev-portfolio-git-main-dachigs-projects.vercel.app/"
            />
          </Html>
        </a.group>
      </group>
    </group>
  );
}

useGLTF.preload("/macbook.gltf");
