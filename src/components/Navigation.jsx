import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'

const Navigation = () => {
  const navRef = useRef(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [active, setActive] = useState('hero')

  useEffect(() => {
    const onScroll = () => {
      if (!navRef.current) return
      if (window.scrollY > 60) {
        gsap.to(navRef.current, { background: 'rgba(4,10,4,0.97)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(0,255,136,0.1)', duration: 0.3 })
      } else {
        gsap.to(navRef.current, { background: 'transparent', borderBottom: '1px solid transparent', duration: 0.3 })
      }
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const ids = ['hero', 'about', 'skills', 'projects', 'experience', 'contact']
    const obs = ids.map(id => {
      const el = document.getElementById(id)
      if (!el) return null
      const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setActive(id) }, { threshold: 0.35 })
      o.observe(el)
      return o
    }).filter(Boolean)
    return () => obs.forEach(o => o.disconnect())
  }, [])

  const scrollTo = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); setMobileOpen(false) }

  const navItems = [
    { label: 'Home', id: 'hero' },
    { label: 'About', id: 'about' },
    { label: 'Skills', id: 'skills' },
    { label: 'Projects', id: 'projects' },
    { label: 'Journey', id: 'experience' },
    { label: 'Contact', id: 'contact' },
  ]

  return (
    <motion.nav
      ref={navRef}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    >
      <div className="container-custom flex items-center gap-6 py-4">

        {/* ── Logo: CJ avatar + CHETAN_ ──────────────────────── */}
        <motion.div
          className="flex items-center gap-2 cursor-pointer shrink-0"
          whileHover={{ scale: 1.03 }}
          onClick={() => scrollTo('hero')}
        >
          {/* Circle avatar */}
          <div style={{
            width: 36, height: 36,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #00ff88 0%, #10b981 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 12, fontWeight: 900, color: '#050f05',
            fontFamily: 'monospace', letterSpacing: '-0.02em',
            boxShadow: '0 0 14px rgba(0,255,136,0.4)',
            flexShrink: 0,
          }}>CJ</div>
          {/* CHETAN_ wordmark */}
          <span style={{
            fontFamily: 'monospace',
            fontWeight: 700,
            fontSize: 17,
            color: '#e8ffe8',
            letterSpacing: '0.08em',
          }}>
            CHETAN<span style={{ color: '#00ff88' }}>_</span>
          </span>
        </motion.div>

        {/* ── Pill nav ────────────────────────────────────────── */}
        <div
          className="hidden md:flex items-center gap-1 px-2 py-1.5 rounded-full flex-1 justify-center"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            maxWidth: 560,
            margin: '0 auto',
          }}
        >
          {navItems.map(item => {
            const isActive = active === item.id
            return (
              <motion.button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="relative px-4 py-1.5 rounded-full text-xs font-mono font-semibold uppercase tracking-widest transition-colors"
                style={{ color: isActive ? '#050f05' : 'rgba(255,255,255,0.45)' }}
                whileHover={{ scale: 1.04 }}
              >
                {isActive && (
                  <motion.span
                    layoutId="pill"
                    className="absolute inset-0 rounded-full"
                    style={{ background: '#00ff88' }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </motion.button>
            )
          })}
        </div>

        {/* ── CTA ─────────────────────────────────────────────── */}
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: '0 0 22px rgba(0,255,136,0.4)' }}
          whileTap={{ scale: 0.95 }}
          onClick={() => scrollTo('contact')}
          className="hidden md:block shrink-0 px-5 py-2 rounded-full text-xs font-mono font-bold uppercase tracking-widest"
          style={{
            background: '#00ff88',
            color: '#050f05',
            border: 'none',
          }}
        >
          Get In Touch
        </motion.button>

        {/* ── Hamburger ─── */}
        <button className="md:hidden flex flex-col gap-1.5 p-2 ml-auto" onClick={() => setMobileOpen(v => !v)}>
          <motion.span animate={{ rotate: mobileOpen ? 45 : 0, y: mobileOpen ? 7 : 0 }} className="block w-5 h-0.5 bg-white origin-center" />
          <motion.span animate={{ opacity: mobileOpen ? 0 : 1 }} className="block w-5 h-0.5 bg-white" />
          <motion.span animate={{ rotate: mobileOpen ? -45 : 0, y: mobileOpen ? -7 : 0 }} className="block w-5 h-0.5 bg-white origin-center" />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden"
            style={{ background: 'rgba(4,10,4,0.97)', borderTop: '1px solid rgba(0,255,136,0.1)' }}
          >
            <div className="container-custom flex flex-col gap-1 py-4">
              {navItems.map((item, i) => (
                <motion.button key={item.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                  onClick={() => scrollTo(item.id)}
                  className="text-left px-4 py-3 text-sm font-mono uppercase tracking-widest rounded-lg hover:bg-white/5 transition-colors"
                  style={{ color: active === item.id ? '#00ff88' : 'rgba(255,255,255,0.5)' }}
                >
                  {item.label}
                </motion.button>
              ))}
              <button onClick={() => scrollTo('contact')}
                className="mt-3 py-2.5 rounded-full text-xs font-mono font-bold uppercase tracking-widest"
                style={{ background: '#00ff88', color: '#050f05' }}
              >
                Get In Touch
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default Navigation
