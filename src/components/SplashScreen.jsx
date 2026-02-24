import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BOOT_SEQUENCE = [
    "Initializing System...",
    "Authenticating User: admin",
    "Loading Portfolio Core...",
    "Synthesizing Neural Assets...",
    "Booting CHETAN.exe",
    "ACCESS GRANTED"
];

const SplashScreen = ({ finishLoading }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [glitchActive, setGlitchActive] = useState(false);
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        if (currentStep < BOOT_SEQUENCE.length - 1) {
            const timer = setTimeout(() => {
                setCurrentStep((prev) => prev + 1);
            }, currentStep === 0 ? 800 : 600);
            return () => clearTimeout(timer);
        } else {
            // Logic for ACCESS GRANTED and Exit
            const glitchTimer = setTimeout(() => setGlitchActive(true), 100);
            const exitTimer = setTimeout(() => {
                setIsExiting(true);
                setTimeout(finishLoading, 1000);
            }, 1500);
            return () => {
                clearTimeout(glitchTimer);
                clearTimeout(exitTimer);
            };
        }
    }, [currentStep, finishLoading]);

    const containerVariants = {
        initial: { opacity: 1 },
        exit: {
            y: "-100%",
            transition: {
                duration: 0.8,
                ease: [0.76, 0, 0.24, 1],
            },
        },
    };

    const messageVariants = {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, transition: { duration: 0.2 } }
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="initial"
            exit="exit"
            animate={isExiting ? "exit" : "initial"}
            className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-[#050c05] overflow-hidden cyber-grid"
        >
            {/* Background Radial Glow */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,136,0.1),transparent_70%)]" />

            {/* Screen Flicker Effect */}
            <motion.div
                animate={{ opacity: [1, 0.98, 1] }}
                transition={{ duration: 0.1, repeat: Infinity, repeatType: "mirror" }}
                className="absolute inset-0 pointer-events-none bg-black/5"
            />

            {/* Horizontal Scan Beam */}
            <motion.div
                animate={{ top: ["0%", "100%"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="scan-line"
            />

            <div className="relative z-10 flex flex-col items-center gap-6">
                <div className="flex flex-col items-start gap-2 font-mono text-xs md:text-sm tracking-widest text-[#00ff88]/70">
                    <AnimatePresence mode="popLayout">
                        {BOOT_SEQUENCE.slice(0, currentStep).map((msg, i) => (
                            <motion.div
                                key={i}
                                variants={messageVariants}
                                initial="initial"
                                animate="animate"
                                className="opacity-40"
                            >
                                {`> ${msg}`}
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Main Name / EXE Title */}
                <div className="relative mt-4">
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{
                            opacity: currentStep >= 4 ? 1 : 0,
                            scale: currentStep >= 4 ? 1 : 0.9,
                        }}
                        className={`text-4xl md:text-6xl font-display font-bold text-white tracking-tighter ${glitchActive && currentStep === 4 ? "animate-glitch" : ""
                            } ${currentStep === 5 ? "text-[#00ff88] drop-shadow-[0_0_20px_rgba(0,255,136,0.5)]" : ""}`}
                    >
                        {currentStep === 5 ? "ACCESS GRANTED" : "CHETAN.exe"}
                    </motion.h1>

                    {/* Neon Pulse underline */}
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: currentStep >= 4 ? "100%" : 0 }}
                        className="h-[2px] bg-[#00ff88] mt-2 shadow-[0_0_10px_#00ff88]"
                    />
                </div>
            </div>

            {/* Progress Info */}
            <div className="absolute bottom-12 font-mono text-[10px] uppercase tracking-[0.3em] text-[#00ff88]/30">
                System Status: {currentStep === 5 ? "ONLINE" : "BOOTING"}
            </div>
        </motion.div>
    );
};

export default SplashScreen;
