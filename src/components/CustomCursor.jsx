import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useSpring, useMotionValue } from 'framer-motion'

const CustomCursor = () => {
    const mainCursor = useRef(null)
    const secondaryCursor = useRef(null)
    const [isHovering, setIsHovering] = useState(false)
    const [isPointer, setIsPointer] = useState(false)
    const [isHidden, setIsHidden] = useState(true)

    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    // Smooth spring physics for the trailing ring
    const ringX = useSpring(mouseX, { damping: 20, stiffness: 200 })
    const ringY = useSpring(mouseY, { damping: 20, stiffness: 200 })

    useEffect(() => {
        const handleMouseMove = (e) => {
            mouseX.set(e.clientX)
            mouseY.set(e.clientY)
            if (isHidden) setIsHidden(false)
        }

        const handleMouseLeave = () => setIsHidden(true)
        const handleMouseEnter = () => setIsHidden(false)

        window.addEventListener('mousemove', handleMouseMove)
        document.addEventListener('mouseleave', handleMouseLeave)
        document.addEventListener('mouseenter', handleMouseEnter)

        const onEnter = (e) => {
            setIsPointer(true)
            if (e.target.closest('.btn-primary, .btn-secondary, button')) {
                setIsHovering(true)
            }
        }
        const onLeave = () => {
            setIsPointer(false)
            setIsHovering(false)
        }

        const addListeners = () => {
            document.querySelectorAll('a, button, [role="button"], .cursor-pointer, .interactive').forEach(el => {
                el.addEventListener('mouseenter', onEnter)
                el.addEventListener('mouseleave', onLeave)
            })
        }

        addListeners()
        const observer = new MutationObserver(addListeners)
        observer.observe(document.body, { childList: true, subtree: true })

        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
            document.removeEventListener('mouseleave', handleMouseLeave)
            document.removeEventListener('mouseenter', handleMouseEnter)
            observer.disconnect()
        }
    }, [isHidden])

    return (
        <div className={`fixed inset-0 pointer-events-none z-[99999] transition-opacity duration-300 ${isHidden ? 'opacity-0' : 'opacity-100'}`}>
            {/* Inner Dot */}
            <motion.div
                className="fixed w-2 h-2 bg-[#00ff88] rounded-full mix-blend-difference"
                style={{
                    x: mouseX,
                    y: mouseY,
                    left: -4,
                    top: -4,
                }}
            />

            {/* Trailing Ring */}
            <motion.div
                className="fixed w-10 h-10 border border-[#00ff88]/40 rounded-full"
                style={{
                    x: ringX,
                    y: ringY,
                    left: -20,
                    top: -20,
                    scale: isHovering ? 2.5 : isPointer ? 1.5 : 1,
                    backgroundColor: isHovering ? 'rgba(0, 255, 136, 0.1)' : 'transparent',
                }}
                transition={{
                    scale: { type: 'spring', damping: 15, stiffness: 300 }
                }}
            >
                {/* Visual accents inside the ring */}
                <AnimatePresence>
                    {(isHovering || isPointer) && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0 }}
                            className="absolute inset-0 flex items-center justify-center"
                        >
                            <div className="w-1 h-1 bg-[#00ff88] rounded-full animate-ping" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Background Spotlight Glow (subtle) */}
            <motion.div
                className="fixed w-[400px] h-[400px] bg-[#00ff88]/5 rounded-full blur-[120px]"
                style={{
                    x: ringX,
                    y: ringY,
                    left: -200,
                    top: -200,
                }}
            />
        </div>
    )
}

export default CustomCursor
