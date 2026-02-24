import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
    Float,
    OrbitControls,
    Environment,
    PerspectiveCamera,
    PresentationControls,
    Html
} from '@react-three/drei';
import * as THREE from 'three';

const technologies = [
    { name: 'JavaScript', icon: '🟨', color: '#f7df1e' },
    { name: 'React', icon: '⚛️', color: '#61dafb' },
    { name: 'Node.js', icon: '🟢', color: '#339933' },
    { name: 'Python', icon: '🐍', color: '#3776ab' },
    { name: 'Kotlin', icon: '🎯', color: '#7f52ff' },
    { name: 'Flutter', icon: '💙', color: '#02569b' },
    { name: 'TensorFlow', icon: '🍊', color: '#ff6f00' },
    { name: 'MongoDB', icon: '🍃', color: '#47a248' },
    { name: 'Docker', icon: '🐳', color: '#2496ed' },
    { name: 'Git', icon: '📜', color: '#f05032' },
    { name: 'Tailwind CSS', icon: '🌊', color: '#06b6d4' },
    { name: 'Figma', icon: '🎨', color: '#f24e1e' },
    { name: 'AWS', icon: '☁️', color: '#ff9900' },
    { name: 'Firebase', icon: '🔥', color: '#ffca28' },
    { name: 'Android', icon: '🤖', color: '#3ddc84' },
    { name: 'SQL', icon: '💾', color: '#4479a1' },
];

function TechBlock({ tech, position }) {
    const meshRef = useRef();
    const offset = useMemo(() => Math.random() * 10, []);

    useFrame((state) => {
        if (meshRef.current) {
            const time = state.clock.getElapsedTime();
            meshRef.current.rotation.x = Math.sin(time + offset) * 0.05;
            meshRef.current.rotation.y = Math.cos(time + offset) * 0.05;
        }
    });

    return (
        <group position={position}>
            <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
                <mesh ref={meshRef} castShadow receiveShadow>
                    <boxGeometry args={[1.2, 1.2, 1.2]} />
                    <meshStandardMaterial
                        color="#111"
                        roughness={0.2}
                        metalness={0.9}
                        emissive={tech.color}
                        emissiveIntensity={0.5}
                    />

                    {/* Reliable Icon Rendering with Html */}
                    <Html
                        position={[0, 0, 0.61]}
                        transform
                        occlude
                        distanceFactor={1.5}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '100px',
                            height: '100px',
                            pointerEvents: 'none',
                            userSelect: 'none',
                        }}
                    >
                        <div className="flex flex-col items-center justify-center p-2 rounded-xl">
                            <span className="text-4xl mb-1 filter drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                                {tech.icon}
                            </span>
                            <span className="text-[10px] font-bold text-white/90 whitespace-nowrap bg-black/40 px-2 py-0.5 rounded shadow-sm">
                                {tech.name.toUpperCase()}
                            </span>
                        </div>
                    </Html>
                </mesh>
            </Float>
        </group>
    );
}

function TechGrid() {
    const groupRef = useRef();

    const gridPositions = useMemo(() => {
        const positions = [];
        const spacing = 2.4;
        const count = technologies.length;

        let idx = 0;
        for (let x = -1; x <= 1; x++) {
            for (let y = -1; y <= 1; y++) {
                for (let z = -1; z <= 1; z++) {
                    if (x === 0 && y === 0 && z === 0) continue;
                    if (idx < count) {
                        positions.push([x * spacing, y * spacing, z * spacing]);
                        idx++;
                    }
                }
            }
        }
        return positions;
    }, []);

    useFrame((state, delta) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += delta * 0.2;
            groupRef.current.rotation.x += delta * 0.1;
        }
    });

    return (
        <group ref={groupRef}>
            {technologies.map((tech, idx) => (
                <TechBlock
                    key={idx}
                    tech={tech}
                    position={gridPositions[idx] || [0, 0, 0]}
                />
            ))}
        </group>
    );
}

const TechCube = () => {
    return (
        <div className="w-full h-[500px] md:h-[700px] relative mt-[-20px] md:mt-[-50px]">
            <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#050c05] to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#050c05] to-transparent z-10 pointer-events-none" />

            <Canvas shadows dpr={[1, 2]}>
                <PerspectiveCamera makeDefault position={[0, 0, 14]} fov={45} />

                <ambientLight intensity={0.8} />
                <pointLight position={[10, 10, 10]} intensity={1.5} castShadow />
                <pointLight position={[-10, -10, -10]} intensity={1} color="#00ff88" />
                <spotLight position={[0, 10, 0]} intensity={2} angle={0.5} penumbra={1} castShadow />

                <PresentationControls
                    global
                    config={{ mass: 2, tension: 500 }}
                    snap={{ mass: 4, tension: 1500 }}
                    rotation={[0, 0.3, 0]}
                    polar={[-Math.PI / 3, Math.PI / 3]}
                    azimuth={[-Math.PI / 1.4, Math.PI / 1.4]}
                >
                    <React.Suspense fallback={null}>
                        <TechGrid />
                        <Environment preset="night" />
                    </React.Suspense>
                </PresentationControls>

                <OrbitControls enableZoom={false} enablePan={false} />
            </Canvas>
        </div>
    );
};

export default TechCube;
