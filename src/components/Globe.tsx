import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const Globe: React.FC = () => {

    const meshRef = useRef<THREE.Mesh>(null!);

    useFrame(() => {
        meshRef.current.rotation.y += 0.003;
    });

    return (
        <mesh ref={meshRef}>
            <icosahedronGeometry args={[3, 2]} />
            <meshStandardMaterial
                wireframe
                color="#f2c94c"
                emissive="#f2c94c"
                emissiveIntensity={0.1}
            />
        </mesh>
    );
};

export default Globe;