import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useSpring, useMotionValue, useVelocity, useTransform } from 'framer-motion'

const CustomCursor = () => {
    const [isHovering, setIsHovering] = useState(false)
    const [hoverType, setHoverType] = useState('')
    const [clickBurst, setClickBurst] = useState(false)
    const [isHidden, setIsHidden] = useState(true)
    const [isIdle, setIsIdle] = useState(false)
    const idleTimer = useRef(null)

    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    // Convert state to motion values for useTransform stability
    const hoverActive = useMotionValue(0)
    const magX = useMotionValue(0)
    const magY = useMotionValue(0)

    const velocityX = useVelocity(mouseX)
    const velocityY = useVelocity(mouseY)

    // Calculate overall speed/velocity for motion dynamics
    const speed = useTransform([velocityX, velocityY], ([vx, vy]) =>
        Math.sqrt(Math.pow(vx, 2) + Math.pow(vy, 2))
    )

    // Dynamic scale/rotation based on velocity (sentient movement)
    const stretch = useTransform(speed, [0, 3000], [1, 1.4])
    const skewX = useTransform(velocityX, [-2000, 2000], [-15, 15])
    const skewY = useTransform(velocityY, [-2000, 2000], [-15, 15])

    const springConfig = { damping: 20, stiffness: 200 }

    // Correctly nested useTransform with motion values
    const targetX = useTransform([mouseX, hoverActive, magX], ([mX, hA, mMagX]) => {
        if (hA > 0.5) return mX + (mMagX - mX) * 0.35
        return mX
    })
    const targetY = useTransform([mouseY, hoverActive, magY], ([mY, hA, mMagY]) => {
        if (hA > 0.5) return mY + (mMagY - mY) * 0.35
        return mY
    })

    const cursorX = useSpring(targetX, springConfig)
    const cursorY = useSpring(targetY, springConfig)

    useEffect(() => {
        hoverActive.set(isHovering ? 1 : 0)
    }, [isHovering])

    useEffect(() => {
        const handleMouseMove = (e) => {
            mouseX.set(e.clientX)
            mouseY.set(e.clientY)
            setIsHidden(false)
            setIsIdle(false)

            if (idleTimer.current) clearTimeout(idleTimer.current)
            idleTimer.current = setTimeout(() => setIsIdle(true), 1500)
        }

        const handleMouseDown = () => {
            setClickBurst(true)
            setTimeout(() => setClickBurst(false), 600)
        }

        window.addEventListener('mousemove', handleMouseMove)
        window.addEventListener('mousedown', handleMouseDown)
        document.addEventListener('mouseleave', () => setIsHidden(true))
        document.addEventListener('mouseenter', () => setIsHidden(false))

        const onEnter = (e) => {
            const target = e.target.closest('a, button, input, textarea, .interactive')
            if (target) {
                setIsHovering(true)
                const rect = target.getBoundingClientRect()
                const centerX = rect.left + rect.width / 2
                const centerY = rect.top + rect.height / 2
                magX.set(centerX)
                magY.set(centerY)

                if (target.tagName === 'A') setHoverType('VIEW')
                else if (target.tagName === 'BUTTON') setHoverType('CLICK')
                else if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') setHoverType('TYPE')
                else setHoverType('OPEN')
            }
        }

        const onLeave = () => {
            setIsHovering(false)
            setHoverType('')
        }

        const addListeners = () => {
            document.querySelectorAll('a, button, [role="button"], .cursor-pointer, input, textarea, .interactive').forEach(el => {
                el.addEventListener('mouseenter', onEnter)
                el.addEventListener('mouseleave', onLeave)
            })
        }

        addListeners()
        const observer = new MutationObserver(addListeners)
        observer.observe(document.body, { childList: true, subtree: true })

        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
            window.removeEventListener('mousedown', handleMouseDown)
            observer.disconnect()
            if (idleTimer.current) clearTimeout(idleTimer.current)
        }
    }, [])

    return (
        <div className={`fixed inset-0 pointer-events-none z-[99999] transition-opacity duration-300 ${isHidden ? 'opacity-0' : 'opacity-100'}`} style={{ mixBlendMode: 'screen' }}>

            {/* 1. Main AI Probe */}
            <motion.div
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: '-50%',
                    translateY: '-50%',
                    skewX: skewX,
                    skewY: skewY,
                    scale: stretch,
                    position: 'fixed',
                    left: 0,
                    top: 0
                }}
                className="flex items-center justify-center"
            >
                {/* 2. Core Energy Dot */}
                <div className="relative">
                    <div className="w-2 h-2 bg-[#00ff9f] rounded-full shadow-[0_0_20px_#00ff9f,0_0_10px_#ffffff]" />
                    <motion.div
                        animate={{ scale: [1, 2, 1], opacity: [0.8, 0, 0.8] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="absolute inset-0 bg-white rounded-full blur-[2px]"
                    />
                </div>

                {/* 3. Adaptive Scanning Ring */}
                <motion.div
                    animate={{
                        width: isHovering ? 70 : 50,
                        height: isHovering ? 70 : 50,
                        borderRadius: isHovering ? '12px' : '50%',
                    }}
                    className="absolute border border-[#00ff9f]/50 flex items-center justify-center"
                >
                    {/* Pulsing Aura */}
                    <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="absolute inset-[-10px] border border-[#00ff9f]/10 rounded-[inherit]"
                    />

                    {/* Radar Sweep with Trailing Blur */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                            repeat: Infinity,
                            duration: isHovering ? 0.5 : isIdle ? 5 : 2.5,
                            ease: "linear"
                        }}
                        className="absolute inset-0 rounded-[inherit] overflow-hidden"
                    >
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-1/2 bg-gradient-to-t from-[#00ff9f] to-transparent shadow-[0_0_15px_#00ff9f]" />
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[15px] h-1/2 bg-[#00ff9f]/5 blur-lg origin-bottom rotate-[-15deg]" />
                    </motion.div>

                    {/* Reticle Notches */}
                    {['top', 'bottom', 'left', 'right'].map(pos => (
                        <div key={pos} className={`absolute bg-[#00ff9f] ${pos === 'top' || pos === 'bottom' ? 'w-[1px] h-2 left-1/2 -translate-x-1/2' : 'h-[1px] w-2 top-1/2 -translate-y-1/2'
                            } ${pos === 'top' ? 'top-0' : pos === 'bottom' ? 'bottom-0' : pos === 'left' ? 'left-0' : 'right-0'}`} />
                    ))}

                    {/* Hover Target Crosshairs */}
                    <AnimatePresence>
                        {isHovering && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-[-20px]">
                                <div className="absolute top-1/2 left-0 w-full h-[0.5px] bg-[#00ff9f]/20" />
                                <div className="absolute left-1/2 top-0 h-full w-[0.5px] bg-[#00ff9f]/20" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* 4. Idle State: Orbiting Particles */}
                <AnimatePresence>
                    {isIdle && [1, 2, 3].map(i => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1, rotate: 360 * (i % 2 ? 1 : -1) }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 4 + i, repeat: Infinity, ease: 'linear' }}
                            className="absolute"
                            style={{ width: 100 + i * 20, height: 100 + i * 20 }}
                        >
                            <div className="w-1 h-1 bg-[#00ff9f]/40 rounded-full absolute top-0 left-1/2" />
                        </motion.div>
                    ))}
                </AnimatePresence>

                {/* 5. Contextual Label */}
                <AnimatePresence>
                    {isHovering && hoverType && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, x: 20 }}
                            animate={{ opacity: 1, scale: 1, x: 45 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="absolute left-0"
                        >
                            <span className="px-2 py-1 bg-[#00ff9f]/10 border border-[#00ff9f]/30 rounded text-[#00ff9f] font-mono text-[9px] font-bold tracking-[0.2em] backdrop-blur-md">
                                ERR_ {hoverType}
                            </span>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* 6. Click Interaction: Glitch Ripple */}
                <AnimatePresence>
                    {clickBurst && (
                        <>
                            <motion.div
                                initial={{ scale: 0.5, opacity: 1 }}
                                animate={{ scale: 4, opacity: 0 }}
                                className="absolute inset-0 border-2 border-[#00ff9f] rounded-full shadow-[0_0_30px_#00ff9f]"
                            />
                            <motion.div
                                animate={{ x: [-10, 10, -10, 0], opacity: [0, 1, 0] }}
                                transition={{ duration: 0.2 }}
                                className="absolute w-[200px] h-[1px] bg-[#00ff9f]/60 blur-[1px]"
                            />
                        </>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Background Heatwave Aura */}
            <motion.div
                style={{ x: cursorX, y: cursorY, translateX: '-50%', translateY: '-50%', position: 'fixed' }}
                animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
                className="w-[200px] h-[200px] bg-gradient-to-r from-[#00ff9f]/5 to-[#00f0ff]/5 rounded-full blur-[60px]"
            />
        </div>
    )
}

export default CustomCursor
