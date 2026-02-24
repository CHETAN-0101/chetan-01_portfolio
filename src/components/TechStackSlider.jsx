import React, { useRef, useEffect, useState } from 'react';
import { motion, useAnimationControls } from 'framer-motion';

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

const TechStackSlider = () => {
    const [trackWidth, setTrackWidth] = useState(0);
    const trackRef = useRef(null);

    // Triple the items to ensure we have enough content to fill the screen and loop
    const duplicatedTechs = [...technologies, ...technologies, ...technologies];

    useEffect(() => {
        if (trackRef.current) {
            // The width of one set of items is the total scrollable distance for the loop
            const singleSetWidth = trackRef.current.scrollWidth / 3;
            setTrackWidth(singleSetWidth);
        }
    }, []);

    return (
        <div className="relative w-full overflow-hidden py-14">
            {/* Vignettes for smooth edge transitions */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#050c05] via-[#050c05]/80 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#050c05] via-[#050c05]/80 to-transparent z-10 pointer-events-none" />

            <motion.div
                ref={trackRef}
                className="flex gap-8 w-max px-4"
                animate={trackWidth > 0 ? {
                    x: [0, -trackWidth],
                } : {}}
                transition={{
                    duration: 35,
                    repeat: Infinity,
                    ease: "linear",
                }}
            >
                {duplicatedTechs.map((tech, idx) => (
                    <div
                        key={idx}
                        className="group relative flex flex-col items-center justify-center min-w-[140px] md:min-w-[180px] h-[140px] md:h-[180px] glass rounded-[2rem] border border-white/5 hover:border-[#00ff88]/40 transition-all duration-500 hover:-translate-y-3"
                    >
                        {/* Ambient Background Glow */}
                        <div
                            className="absolute inset-0 rounded-[2rem] opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-2xl"
                            style={{ backgroundColor: tech.color }}
                        />

                        {/* Inner Glow Polish */}
                        <div className="absolute inset-[1px] rounded-[1.9rem] bg-gradient-to-b from-white/5 to-transparent pointer-none" />

                        {/* Icon Wrapper */}
                        <div className="relative mb-4">
                            <div className="text-5xl md:text-6xl group-hover:scale-110 transition-transform duration-500 grayscale group-hover:grayscale-0 filter drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                                {tech.icon}
                            </div>
                        </div>

                        <span className="text-xs md:text-sm font-display font-medium text-white/50 group-hover:text-white transition-colors tracking-wider uppercase">
                            {tech.name}
                        </span>

                        {/* Tech-Specific Accent Line */}
                        <div
                            className="absolute bottom-4 w-0 group-hover:w-8 h-[2px] rounded-full transition-all duration-500 opacity-0 group-hover:opacity-100"
                            style={{ backgroundColor: tech.color }}
                        />
                    </div>
                ))}
            </motion.div>
        </div>
    );
};

export default TechStackSlider;
