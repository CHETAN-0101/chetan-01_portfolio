import { motion } from 'framer-motion'
import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import NeuralLink from '../components/NeuralLink'
import TechStackSlider from '../components/TechStackSlider'

gsap.registerPlugin(ScrollTrigger)

const Skills = () => {
  const skillsRef = useRef(null)

  const skillCategories = [
    {
      name: 'App Development',
      icon: '📱',
      color: 'from-accent-cyan to-accent-purple',
      skills: ['Android (Kotlin)', 'Flutter', 'React Native', 'Firebase', 'REST APIs'],
    },
    {
      name: 'Cyber Security',
      icon: '🔒',
      color: 'from-accent-purple to-accent-cyan',
      skills: ['Network Security', 'OWASP Top 10', 'Penetration Testing', 'Cryptography', 'Web Security'],
    },
    {
      name: 'UI/UX Design',
      icon: '🎨',
      color: 'from-accent-cyan/80 to-accent-purple',
      skills: ['Figma', 'Design Systems', 'Prototyping', 'User Research', 'Responsive Design'],
    },
    {
      name: 'Machine Learning',
      icon: '🤖',
      color: 'from-accent-purple to-accent-cyan',
      skills: ['Python', 'TensorFlow', 'Data Analysis', 'ML Models', 'Data Visualization'],
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
    hover: {
      y: -10,
      transition: { duration: 0.3 },
    },
  }

  return (
    <section
      id="skills"
      className="section-py bg-gradient-to-b from-dark-bg to-dark-secondary relative overflow-hidden"
    >
      {/* Background Gradient */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-t from-accent-blue/10 to-transparent rounded-full blur-3xl"></div>

      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Skills &<span className="text-gradient"> Expertise</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-accent-cyan to-accent-purple rounded-full"></div>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          ref={skillsRef}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {skillCategories.map((category, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              whileHover="hover"
              className="group relative"
            >
              {/* Gradient Border */}
              <div className={`absolute inset-0 bg-gradient-to-r ${category.color} rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>

              {/* Content */}
              <div className="relative bg-dark-secondary rounded-xl p-6 border border-transparent group-hover:border-accent-cyan/50 transition-all duration-300">
                <div className="text-5xl mb-4">{category.icon}</div>

                <h3 className="text-xl font-bold font-display mb-4 text-white">
                  {category.name}
                </h3>

                <ul className="space-y-2">
                  {category.skills.map((skill, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * i }}
                      className="flex items-center gap-2"
                    >
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${category.color}`}></div>
                      <span className="text-text-secondary text-sm">{skill}</span>
                    </motion.li>
                  ))}
                </ul>

                {/* Hover Glow */}
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-30 group-hover:shadow-lg group-hover:shadow-accent-cyan/20 transition-all duration-300"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Tech Stack Cloud - Replaced with Neural Link */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 pt-12 border-t border-accent-cyan/20"
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-display font-bold">Neural Link: Technology Universe</h3>
            <span className="text-xs text-accent-cyan/60 mono uppercase tracking-tighter hidden md:block">Interactive 3D Visualization</span>
          </div>

          <div className="relative rounded-2xl overflow-hidden border border-white/5 bg-black/20">
            <NeuralLink />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Skills
