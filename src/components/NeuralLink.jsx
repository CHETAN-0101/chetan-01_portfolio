import React, { useRef, useMemo, useState, useEffect, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
    OrbitControls,
    Html,
    Float,
    Line,
    PerspectiveCamera,
    Environment
} from '@react-three/drei';
import * as THREE from 'three';

const technologies = [
    { id: 'js', name: 'JavaScript', icon: '🟨', color: '#f7df1e', parent: null, pos: [0, 0, 0] },
    { id: 'react', name: 'React', icon: '⚛️', color: '#61dafb', parent: 'js', pos: [-4, 3, 2] },
    { id: 'node', name: 'Node.js', icon: '🟢', color: '#339933', parent: 'js', pos: [4, 3, -2] },
    { id: 'flutter', name: 'Flutter', icon: '💙', color: '#02569b', parent: 'js', pos: [4, -3, 2] },
    { id: 'python', name: 'Python', icon: '🐍', color: '#3776ab', parent: 'js', pos: [-4, -3, -2] },
    { id: 'git', name: 'Git', icon: '📜', color: '#f05032', parent: 'js', pos: [0, 5, 0] },
    { id: 'kotlin', name: 'Kotlin', icon: '🎯', color: '#7f52ff', parent: 'js', pos: [0, -5, 0] },
    { id: 'figma', name: 'Figma', icon: '🎨', color: '#f24e1e', parent: 'react', pos: [-7, 5, 3] },
    { id: 'tailwind', name: 'Tailwind', icon: '🌊', color: '#06b6d4', parent: 'react', pos: [-7, 1, 4] },
    { id: 'mongo', name: 'MongoDB', icon: '🍃', color: '#47a248', parent: 'node', pos: [7, 5, -3] },
    { id: 'sql', name: 'SQL', icon: '💾', color: '#4479a1', parent: 'node', pos: [7, 1, -4] },
    { id: 'fb', name: 'Firebase', icon: '🔥', color: '#ffca28', parent: 'flutter', pos: [7, -5, 3] },
    { id: 'tf', name: 'TensorFlow', icon: '🍊', color: '#ff6f00', parent: 'python', pos: [-7, -5, -3] },
    { id: 'android', name: 'Android', icon: '🤖', color: '#3ddc84', parent: 'kotlin', pos: [0, -8.5, 0] },
    { id: 'docker', name: 'Docker', icon: '🐳', color: '#2496ed', parent: 'git', pos: [0, 8.5, 0] },
    { id: 'aws', name: 'AWS', icon: '☁️', color: '#ff9900', parent: 'docker', pos: [2, 11, 1] },
];

// Animated connection with smooth, continuous light-pulse
function Connection({ start, end, color, isHighlighted }) {
    const lineRef = useRef();

    useFrame((state) => {
        if (!lineRef.current) return;
        const mat = lineRef.current.material;
        const t = state.clock.getElapsedTime();
        mat.dashOffset = -(t * 0.3); // slow, continuous pulse
        mat.opacity = isHighlighted ? 0.9 : 0.18 + Math.sin(t * 0.8) * 0.05;
        mat.linewidth = isHighlighted ? 3 : 1.5;
    });

    return (
        <Line
            ref={lineRef}
            points={[start, end]}
            color={color}
            lineWidth={isHighlighted ? 3 : 1.5}
            transparent
            opacity={isHighlighted ? 0.9 : 0.2}
            dashed
            dashScale={12}
            dashSize={0.6}
            dashArray={[0.6, 0.4]}
        />
    );
}

// A small "photon" travelling along the connection line
function Photon({ start, end, color, speed }) {
    const meshRef = useRef();
    const startVec = new THREE.Vector3(...start);
    const endVec = new THREE.Vector3(...end);

    useFrame((state) => {
        if (!meshRef.current) return;
        const t = (state.clock.getElapsedTime() * speed) % 1;
        meshRef.current.position.lerpVectors(startVec, endVec, t);
    });

    return (
        <mesh ref={meshRef}>
            <sphereGeometry args={[0.15, 8, 8]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={4} />
        </mesh>
    );
}

function Node({ tech, isHovered, isFocused, onHover }) {
    return (
        <group position={tech.pos}>
            <Float speed={1} rotationIntensity={0.1} floatIntensity={0.3}>
                <mesh
                    onPointerOver={(e) => { e.stopPropagation(); onHover(tech.id); }}
                    onPointerOut={() => onHover(null)}
                >
                    <sphereGeometry args={[0.7, 32, 32]} />
                    <meshStandardMaterial
                        color={isHovered || isFocused ? tech.color : '#111'}
                        emissive={tech.color}
                        emissiveIntensity={isHovered || isFocused ? 4 : 1.2}
                        roughness={0.2}
                        metalness={0.8}
                    />

                    <Html
                        distanceFactor={10}
                        position={[0, 1.3, 0]}
                        center
                        style={{ pointerEvents: 'none', userSelect: 'none' }}
                    >
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            transition: 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1), opacity 0.3s',
                            transform: `scale(${isHovered || isFocused ? 1.4 : 1})`,
                            opacity: isHovered || isFocused ? 1 : 0.65,
                        }}>
                            <span style={{ fontSize: 32, lineHeight: 1, marginBottom: 4, filter: 'drop-shadow(0 0 12px rgba(255,255,255,0.5))' }}>
                                {tech.icon}
                            </span>
                            <div style={{
                                background: isHovered || isFocused ? '#00ff88' : 'rgba(0,0,0,0.65)',
                                color: isHovered || isFocused ? '#000' : '#fff',
                                border: `1px solid ${isHovered || isFocused ? 'transparent' : 'rgba(255,255,255,0.15)'}`,
                                borderRadius: 999,
                                padding: '2px 12px',
                                fontSize: 11,
                                fontWeight: 700,
                                fontFamily: 'monospace',
                                letterSpacing: '0.06em',
                                whiteSpace: 'nowrap',
                                transition: 'all 0.3s',
                            }}>
                                {tech.name}
                            </div>
                        </div>
                    </Html>
                </mesh>
            </Float>
        </group>
    );
}

// Whole 3D scene; receives focusedId so it can derive camera target
function Scene({ hoveredNode, setHoveredNode, focusedNode }) {
    const controlsRef = useRef();
    const targetPos = useRef(new THREE.Vector3(0, 0, 0));

    // Smooth camera pan to focused node
    useFrame(() => {
        if (!controlsRef.current) return;
        if (focusedNode) {
            const tech = technologies.find(t => t.id === focusedNode);
            if (tech) targetPos.current.lerp(new THREE.Vector3(...tech.pos), 0.06);
        } else {
            targetPos.current.lerp(new THREE.Vector3(0, 0, 0), 0.04);
        }
        controlsRef.current.target.copy(targetPos.current);
        controlsRef.current.update();
    });

    const connections = useMemo(() => technologies.filter(t => t.parent).map(t => {
        const parent = technologies.find(p => p.id === t.parent);
        return { start: parent.pos, end: t.pos, color: t.color, parent: parent.id, child: t.id, id: `${parent.id}-${t.id}` };
    }), []);

    return (
        <>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1.5} />
            <pointLight position={[-10, -10, -10]} intensity={1} color="#00ff88" />

            {connections.map(conn => (
                <React.Fragment key={conn.id}>
                    <Connection
                        start={conn.start}
                        end={conn.end}
                        color={conn.color}
                        isHighlighted={hoveredNode === conn.parent || hoveredNode === conn.child || focusedNode === conn.parent || focusedNode === conn.child}
                    />
                    {/* A slow-moving photon particle on every link */}
                    <Photon start={conn.start} end={conn.end} color={conn.color} speed={0.12 + Math.random() * 0.08} />
                </React.Fragment>
            ))}

            {technologies.map(tech => (
                <Node
                    key={tech.id}
                    tech={tech}
                    isHovered={hoveredNode === tech.id}
                    isFocused={focusedNode === tech.id}
                    onHover={setHoveredNode}
                />
            ))}

            <Environment preset="night" />
            <OrbitControls
                ref={controlsRef}
                enableZoom
                enablePan
                minDistance={8}
                maxDistance={40}
                autoRotate={!focusedNode && !hoveredNode}
                autoRotateSpeed={0.4}
                enableDamping
                dampingFactor={0.05}
            />
        </>
    );
}

const NeuralLink = () => {
    const [hoveredNode, setHoveredNode] = useState(null);
    const [focusedNode, setFocusedNode] = useState('js');
    const autoRef = useRef(null);
    const indexRef = useRef(0);

    // Auto-cycle through techs
    const cycle = useCallback(() => {
        indexRef.current = (indexRef.current + 1) % technologies.length;
        setFocusedNode(technologies[indexRef.current].id);
    }, []);

    useEffect(() => {
        autoRef.current = setInterval(cycle, 2500); // every 2.5 s
        return () => clearInterval(autoRef.current);
    }, [cycle]);

    // Manual click pauses auto for 8 s then resumes
    const handleManualClick = (id) => {
        clearInterval(autoRef.current);
        indexRef.current = technologies.findIndex(t => t.id === id);
        setFocusedNode(id);
        setTimeout(() => {
            autoRef.current = setInterval(cycle, 2500);
        }, 8000);
    };

    return (
        <div className="w-full flex flex-col md:flex-row gap-4" style={{ height: 700 }}>

            {/* ── Sidebar ── */}
            <div className="w-full md:w-56 flex flex-col gap-3 z-20 order-2 md:order-1 px-4 md:px-0">
                <div className="glass rounded-2xl border border-white/5 p-4 flex flex-col gap-2 h-full overflow-hidden">
                    <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] mono text-[#00ff88] uppercase tracking-widest">Neural Index</span>
                        <div className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse" />
                    </div>

                    <div className="flex-1 overflow-y-auto space-y-1 pr-1" style={{ scrollbarWidth: 'thin', scrollbarColor: '#00ff8833 transparent' }}>
                        {technologies.map(tech => {
                            const active = focusedNode === tech.id;
                            return (
                                <button
                                    key={tech.id}
                                    onClick={() => handleManualClick(tech.id)}
                                    onMouseEnter={() => setHoveredNode(tech.id)}
                                    onMouseLeave={() => setHoveredNode(null)}
                                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 border text-left
                                        ${active
                                            ? 'bg-[#00ff88]/15 border-[#00ff88]/40 text-white'
                                            : 'bg-white/5 border-transparent text-white/50 hover:bg-white/10 hover:text-white'}`}
                                >
                                    <span className="text-base leading-none">{tech.icon}</span>
                                    <span className="text-[11px] font-medium tracking-wide flex-1">{tech.name}</span>
                                    {active && (
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-pulse flex-shrink-0" />
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    <div className="border-t border-white/5 pt-3 mt-1">
                        <p className="text-[9px] mono text-white/25 uppercase tracking-wider leading-relaxed">
                            Auto-cycles every 2.5s<br />Click to lock focus
                        </p>
                    </div>
                </div>
            </div>

            {/* ── 3D Canvas ── */}
            <div className="flex-1 relative order-1 md:order-2" style={{ minHeight: 420 }}>
                {/* Vignette */}
                <div className="absolute inset-0 z-10 pointer-events-none"
                    style={{ background: 'radial-gradient(circle at 50% 50%, transparent 35%, #050c05 100%)' }} />

                <Canvas shadows dpr={[1, 2]} style={{ width: '100%', height: '100%' }}>
                    <PerspectiveCamera makeDefault position={[0, 0, 22]} fov={45} />
                    <React.Suspense fallback={null}>
                        <Scene
                            hoveredNode={hoveredNode}
                            setHoveredNode={setHoveredNode}
                            focusedNode={focusedNode}
                        />
                    </React.Suspense>
                </Canvas>
            </div>
        </div>
    );
};

export default NeuralLink;
