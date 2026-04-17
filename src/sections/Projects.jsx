import { motion } from 'framer-motion'
import { useState } from 'react'

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState('all')

  const projects = [
    {
      id: 1,
      title: 'SmartFileCompressor',
      category: 'utility',
      description: 'Efficient file compression tool utilizing Huffman coding and LZW algorithms for optimized storage.',
      tech: ['Python', 'C++', 'Data Structures', 'Algorithms'],
      github: 'https://github.com',
      demo: 'https://github.com',
      icon: '🗜️',
    },
    {
      id: 2,
      title: 'pyq_predictor',
      category: 'ml',
      description: 'Machine Learning model designed to predict important questions by analyzing patterns in previous year papers.',
      tech: ['Python', 'Scikit-Learn', 'NLP', 'Pandas'],
      github: 'https://github.com',
      demo: 'https://github.com',
      icon: '📈',
    },
    {
      id: 3,
      title: 'password_analyzer',
      category: 'security',
      description: 'Advanced security utility that evaluates password strength, entropy, and potential vulnerabilities.',
      tech: ['Python', 'Security', 'Regex', 'Cryptography'],
      github: 'https://github.com',
      demo: 'https://github.com',
      icon: '🛡️',
    },
    {
      id: 4,
      title: 'labdrop',
      category: 'productivity',
      description: 'Intelligent file management and smart drop technology for seamless laboratory collaboration.',
      tech: ['React', 'Node.js', 'Socket.io', 'TailwindCSS'],
      github: 'https://github.com',
      demo: 'https://github.com',
      icon: '💧',
    },
  ]

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'utility', label: 'Utilities' },
    { id: 'ml', label: 'Machine Learning' },
    { id: 'security', label: 'Cyber Security' },
    { id: 'productivity', label: 'Productivity' },
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
