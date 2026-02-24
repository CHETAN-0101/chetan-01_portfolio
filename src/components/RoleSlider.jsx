import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ROLES = [
    "App Developer",
    "Cyber Security",
    "UI/UX Designer",
    "ML Engineer",
    "Full-Stack Dev"
];

const RoleSlider = () => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % ROLES.length);
        }, 3000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="h-[40px] md:h-[60px] overflow-hidden flex justify-center items-center">
            <AnimatePresence mode="wait">
                <motion.div
                    key={index}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="text-xl md:text-3xl text-accent-cyan font-display font-medium uppercase tracking-[0.2em]"
                >
                    {ROLES[index]}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default RoleSlider;
