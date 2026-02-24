import { Canvas } from '@react-three/fiber'
import { Suspense, Component } from 'react'
import { PerspectiveCamera } from '@react-three/drei'
import { motion } from 'framer-motion'
import TerminalHero from '../components/TerminalHero'
import HeroScene from './HeroScene'

class CanvasErrorBoundary extends Component {
  constructor(props) { super(props); this.state = { hasError: false } }
  static getDerivedStateFromError() { return { hasError: true } }
  render() {
    if (this.state.hasError) return (
      <div className="w-full h-full flex items-center justify-center">
        <span className="text-accent-cyan/30 text-xs font-mono">[ 3D UNAVAILABLE ]</span>
      </div>
    )
    return this.props.children
  }
}

const Hero = () => (
  <section
    id="hero"
    className="relative min-h-screen w-full overflow-hidden bg-dark-bg flex items-center"
    style={{ paddingTop: '72px' }}
  >
    {/* Very subtle cyber grid */}
    <div className="absolute inset-0 cyber-grid opacity-10 pointer-events-none" />
    <div className="scan-line top-0 opacity-5" />

    <div className="container-custom relative z-10 w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full items-center" style={{ minHeight: 'calc(100vh - 72px)' }}>

        {/* ── LEFT: Terminal ── */}
        <motion.div
          className="w-full py-6"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
        >
          <TerminalHero />
        </motion.div>

        {/* ── RIGHT: Neural Network + Card ── */}
        <motion.div
          className="relative w-full"
          style={{ height: '620px' }}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.1, ease: 'easeOut', delay: 0.15 }}
        >
          <CanvasErrorBoundary>
            <Canvas
              style={{ width: '100%', height: '100%' }}
              gl={{ antialias: true, powerPreference: 'high-performance' }}
              dpr={[1, 1.5]}
            >
              <Suspense fallback={null}>
                <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={55} />
                <HeroScene />
              </Suspense>
            </Canvas>
          </CanvasErrorBoundary>
        </motion.div>

      </div>
    </div>

    {/* Scroll indicator */}
    <motion.div
      animate={{ y: [0, 10, 0] }}
      transition={{ duration: 2, repeat: Infinity }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 pointer-events-none flex flex-col items-center gap-2 opacity-20"
    >
      <p className="text-accent-cyan text-[9px] font-mono uppercase tracking-widest">Scroll</p>
      <div className="w-px h-10 bg-gradient-to-b from-accent-cyan to-transparent" />
    </motion.div>
  </section>
)

export default Hero
