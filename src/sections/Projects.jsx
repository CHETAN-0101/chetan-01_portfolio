import { motion } from 'framer-motion'
import { useState } from 'react'

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState('all')

  const projects = [
    {
      id: 1,
      title: 'SecureChat App',
      category: 'app-dev',
      description: 'End-to-end encrypted messaging app with real-time database',
      tech: ['Kotlin', 'Firebase', 'Encryption', 'Android'],
      github: 'https://github.com',
      demo: 'https://github.com',
      icon: '🔐',
    },
    {
      id: 2,
      title: 'ML Image Classifier',
      category: 'ml',
      description: 'Deep learning model for medical image classification',
      tech: ['Python', 'TensorFlow', 'OpenCV', 'Data Science'],
      github: 'https://github.com',
      demo: 'https://github.com',
      icon: '🧠',
    },
    {
      id: 3,
      title: 'Design System UI Kit',
      category: 'design',
      description: 'Comprehensive UI component library with design tokens',
      tech: ['Figma', 'React', 'Storybook', 'Design Systems'],
      github: 'https://github.com',
      demo: 'https://github.com',
      icon: '🎨',
    },
    {
      id: 4,
      title: 'Network Analyzer Tool',
      category: 'security',
      description: 'Network packet analysis and security assessment tool',
      tech: ['Python', 'Scapy', 'Security', 'CLI'],
      github: 'https://github.com',
      demo: 'https://github.com',
      icon: '🛡️',
    },
    {
      id: 5,
      title: 'Cross-Platform Todo App',
      category: 'app-dev',
      description: 'Full-featured todo application with cloud sync',
      tech: ['Flutter', 'Firebase', 'Provider', 'iOS/Android'],
      github: 'https://github.com',
      demo: 'https://github.com',
      icon: '✓',
    },
    {
      id: 6,
      title: 'Cyber Threat Dashboard',
      category: 'security',
      description: 'Real-time security monitoring and threat visualization',
      tech: ['React', 'Node.js', 'D3.js', 'Cyber Security'],
      github: 'https://github.com',
      demo: 'https://github.com',
      icon: '📊',
    },
  ]

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'app-dev', label: 'App Development' },
    { id: 'security', label: 'Cyber Security' },
    { id: 'design', label: 'Design' },
    { id: 'ml', label: 'Machine Learning' },
  ]

  const filteredProjects =
    activeCategory === 'all'
      ? projects
      : projects.filter((p) => p.category === activeCategory)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.3 },
    },
  }

  return (
    <section
      id="projects"
      className="section-py bg-dark-secondary relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute top-20 left-0 w-80 h-80 bg-gradient-to-r from-accent-purple/10 to-transparent rounded-full blur-3xl"></div>

      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-accent-cyan to-accent-purple rounded-full"></div>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-3 mb-12"
        >
          {categories.map((cat) => (
            <motion.button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-2 rounded-full font-display font-medium transition-all duration-300 ${activeCategory === cat.id
                  ? 'bg-gradient-to-r from-accent-cyan to-accent-purple text-dark-bg shadow-[0_0_15px_rgba(0,255,136,0.3)]'
                  : 'border border-text-secondary/50 text-text-secondary hover:border-accent-cyan hover:text-accent-cyan'
                }`}
            >
              {cat.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              variants={cardVariants}
              layout
              className="group"
            >
              <div className="relative h-full rounded-xl overflow-hidden glass-effect border border-accent-cyan/20 hover:border-accent-cyan/50 transition-all duration-300">
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent-cyan/10 via-transparent to-accent-purple/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Content */}
                <div className="relative p-6 h-full flex flex-col">
                  {/* Icon & Title */}
                  <div className="mb-4">
                    <div className="text-5xl mb-3">{project.icon}</div>
                    <h3 className="text-xl font-bold font-display mb-2">{project.title}</h3>
                    <p className="text-text-secondary text-sm leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Tech Stack */}
                  <div className="my-4 flex flex-wrap gap-2">
                    {project.tech.map((t, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-2 py-1 rounded-full bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/30"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="mt-auto flex gap-3">
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      whileHover={{ scale: 1.05 }}
                      className="flex-1 px-4 py-2 rounded-lg text-center text-sm font-display font-medium border border-accent-cyan text-accent-cyan hover:bg-accent-cyan hover:text-dark-bg transition-all"
                    >
                      GitHub
                    </motion.a>
                    <motion.a
                      href={project.demo}
                      target="_blank"
                      rel="noreferrer"
                      whileHover={{ scale: 1.05 }}
                      className="flex-1 px-4 py-2 rounded-lg text-center text-sm font-display font-medium bg-gradient-to-r from-accent-cyan to-accent-blue text-dark-bg hover:shadow-lg transition-all"
                    >
                      Demo
                    </motion.a>
                  </div>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 border border-accent-cyan/50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Projects
