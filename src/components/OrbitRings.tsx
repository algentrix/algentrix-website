import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const OrbitRings: React.FC = () => {

  const ringRef = useRef<THREE.Mesh>(null!);

  useFrame(() => {
    ringRef.current.rotation.z += 0.002;
  });

  return (
    <mesh ref={ringRef}>
      <torusGeometry args={[4, 0.004, 25, 200]} />
      <meshBasicMaterial color="#4f46e5" transparent opacity={0.25} />
    </mesh>
  );
};

export default OrbitRings;