import { useState } from 'react'
import Hero from './sections/Hero'
import About from './sections/About'
import Skills from './sections/Skills'
import Projects from './sections/Projects'
import Experience from './sections/Experience'
import Contact from './sections/Contact'
import Navigation from './components/Navigation'
import SmoothScroll from './utils/SmoothScroll'
import SplashScreen from './components/SplashScreen'
import CustomCursor from './components/CustomCursor'

function App() {
  const [isLoading, setIsLoading] = useState(true)

  if (isLoading) {
    return <SplashScreen finishLoading={() => setIsLoading(false)} />
  }

  return (
    <SmoothScroll>
      <CustomCursor />
      <Navigation />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
      <footer className="bg-dark-secondary border-t border-accent-cyan/10 py-10">
        <div className="container-custom text-center space-y-2">
          <p className="text-text-secondary text-sm font-mono">
            © 2026 <span className="text-accent-cyan font-semibold">Chetan Jadhav</span>. All rights reserved.
          </p>
          <p className="text-white/20 text-xs font-mono tracking-widest uppercase">
            Built with React · Three.js · GSAP · TailwindCSS
          </p>
        </div>
      </footer>
    </SmoothScroll>
  )
}

export default App
