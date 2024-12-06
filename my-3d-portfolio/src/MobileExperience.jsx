import { Float, Sparkles, Text } from "@react-three/drei";

export default function MobileExperience() {
  return (
    <>
      <color args={["#000000"]} attach="background" />
      <Sparkles speed={0.5} size={3} scale={[7, 7, 5]} count={150} />
      <Float floatIntensity={0.5} rotationIntensity={0.25}>
        <Text position-y={0.4} color="skyblue" scale={0.2}>
          Welcome to my 3D portfolio
        </Text>
        <Text textAlign="center" color="skyblue" maxWidth={25} scale={0.1}>
          This experience is not well-supported for smaller devices. Therefore,
          I would like to invite you to check me out on a desktop!
        </Text>
      </Float>
    </>
  );
}
