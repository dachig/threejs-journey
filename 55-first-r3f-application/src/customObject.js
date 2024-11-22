import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

export default function CustomObject() {
  const vertices = 10 * 3;
  const geometryRef = useRef();

  useEffect(() => {
    geometryRef.current.computeVertexNormals(); // has to be done onLoad with useEffect otherwise it's undefined
  }, []);

  const positions = useMemo(() => {
    // useMemo saves the result forever if the components ir rerendered, instead of recaluclating everything
    const positions = new Float32Array(vertices * 3);
    for (let i = 0; i < vertices * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 3;
    }
    return positions;
  }, []);

  return (
    <>
      <mesh>
        <bufferGeometry ref={geometryRef}>
          <bufferAttribute
            attach="attributes-position"
            count={vertices}
            itemSize={3}
            array={positions}
          />
        </bufferGeometry>
        <meshStandardMaterial color="red" side={THREE.DoubleSide} />
      </mesh>
    </>
  );
}
