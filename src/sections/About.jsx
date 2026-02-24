import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const About = () => {
  const statsRef = useRef(null)

  useEffect(() => {
    const stats = statsRef.current?.querySelectorAll('.stat-number')
    if (!stats) return

    stats.forEach((stat) => {
      ScrollTrigger.create({
        trigger: stat,
        onEnter: () => {
          const target = parseInt(stat.dataset.target)
          gsap.to(stat, {
            textContent: target,
            duration: 2,
            ease: 'power2.out',
            snap: { textContent: 1 },
            scrollTrigger: {
              trigger: stat,
              start: 'top 80%',
            },
          })
        },
        once: true,
      })
    })
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  }

  return (
    <section
      id="about"
      className="section-py bg-dark-bg relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-b from-accent-cyan/8 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-t from-accent-purple/5 to-transparent rounded-full blur-3xl"></div>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            About <span className="text-gradient">Me</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-accent-cyan to-accent-purple rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6"
          >
            <motion.p variants={itemVariants} className="text-lg leading-relaxed">
              I'm a 3rd-year Computer Engineering student with a passion for building scalable applications,
              designing secure systems, and creating intuitive user experiences. My journey spans across
              multiple domains, blending engineering depth with design thinking.
            </motion.p>

            <motion.p variants={itemVariants} className="text-lg leading-relaxed">
              I believe in the power of thoughtful engineering and beautiful design. Whether it's building
              Android apps, exploring cybersecurity vulnerabilities, crafting engaging interfaces, or training
              machine learning models, I approach every challenge with curiosity and precision.
            </motion.p>

            <motion.p variants={itemVariants} className="text-lg leading-relaxed text-text-secondary">
              When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects,
              or designing digital experiences that matter.
            </motion.p>

            <motion.div variants={itemVariants}>
              <a
                href="#contact"
                className="btn-secondary inline-block mt-4"
              >
                Let's Talk
              </a>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div
            ref={statsRef}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-6"
          >
            {[
              { label: 'Projects Shipped', target: 15, icon: '🚀' },
              { label: 'Tech Stack', target: 25, icon: '⚙️' },
              { label: 'Hackathons', target: 8, icon: '🏆' },
              { label: 'Years Coding', target: 3, icon: '📚' },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="glass-effect rounded-xl p-6 text-center group hover:border-accent-cyan/50 transition-all"
              >
                <div className="text-4xl mb-2 group-hover:scale-125 transition-transform duration-300">
                  {stat.icon}
                </div>
                <h3 className="stat-number text-3xl font-bold text-accent-cyan mb-2" data-target={stat.target}>
                  0
                </h3>
                <p className="text-text-secondary text-sm font-display">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About
