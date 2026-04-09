import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'

const Contact = () => {
  const formRef = useRef(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitSuccess(true)
      gsap.to(formRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.5,
        onComplete: () => {
          setFormData({ name: '', email: '', message: '' })
        },
      })

      setTimeout(() => {
        gsap.to(formRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.5,
        })
        setSubmitSuccess(false)
      }, 2000)
    }, 1500)
  }

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
      id="contact"
      className="section-py bg-dark-secondary relative overflow-hidden"
    >
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-b from-accent-cyan/8 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-t from-accent-purple/8 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(0,255,136,0.03),transparent_70%)] pointer-events-none"></div>

      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Let's <span className="text-gradient">Connect</span>
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Currently open to internships and exciting collaborations. Whether you have a question or just want to say hi, my inbox is always open.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-accent-cyan to-accent-purple rounded-full mx-auto mt-4"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8"
          >
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-display font-bold mb-2 text-white">Get In Touch</h3>
              <p className="text-text-secondary">
                I'm currently based in India and looking for opportunities in Software Engineering, Cybersecurity, or ML.
              </p>
            </motion.div>

            {/* Contact Methods */}
            {[
              {
                icon: '📧',
                label: 'Email',
                value: 'chetan.jadhav@outlook.com',
                href: 'mailto:chetan.jadhav@outlook.com',
                theme: 'accent-cyan'
              },
              {
                icon: '💼',
                label: 'LinkedIn',
                value: 'linkedin.com/in/chetanjadhav01',
                href: 'https://linkedin.com/in/chetanjadhav01',
                theme: 'accent-blue'
              },
              {
                icon: '🐙',
                label: 'GitHub',
                value: 'github.com/Chetan-0101',
                href: 'https://github.com/Chetan-0101',
                theme: 'accent-purple'
              },
            ].map((contact, idx) => (
              <motion.a
                key={idx}
                variants={itemVariants}
                href={contact.href}
                target="_blank"
                rel="noreferrer"
                className="group relative block p-[1px] rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,255,136,0.15)]"
              >
                {/* Animated Border Gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/5 group-hover:from-accent-cyan/40 group-hover:to-accent-purple/40 transition-all duration-500" />

                <div className="relative bg-dark-bg/90 backdrop-blur-xl rounded-2xl p-6 transition-colors duration-300 group-hover:bg-dark-bg/40">
                  <div className="flex items-start gap-5">
                    <div className="text-4xl filter drop-shadow-[0_0_8px_rgba(255,255,255,0.2)] group-hover:scale-110 transition-transform duration-300">
                      {contact.icon}
                    </div>
                    <div>
                      <h4 className="font-display font-bold mb-1 text-white/90 group-hover:text-white transition-colors">
                        {contact.label}
                      </h4>
                      <p className="text-text-secondary font-mono text-sm group-hover:text-accent-cyan transition-colors">
                        {contact.value}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.a>
            ))}

            {/* Social Links */}
            <motion.div variants={itemVariants}>
              <h4 className="font-display font-bold mb-4 text-white/80 uppercase tracking-widest text-xs">Digital Footprint</h4>
              <div className="flex gap-4">
                {[
                  { icon: '𝕏', href: 'https://twitter.com', label: 'Twitter' },
                  { icon: 'in', href: 'https://linkedin.com/in/chetanjadhav01', label: 'LinkedIn' },
                  { icon: '⚙️', href: 'https://github.com/Chetan-0101', label: 'GitHub' },
                ].map((social, idx) => (
                  <motion.a
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{
                      scale: 1.15,
                      rotate: 8,
                      boxShadow: '0 0 20px rgba(0,255,136,0.3)'
                    }}
                    whileTap={{ scale: 0.9 }}
                    className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:border-accent-cyan/50 hover:bg-accent-cyan/5 transition-all duration-300"
                    title={social.label}
                  >
                    <span className="text-lg text-white/60 group-hover:text-white">{social.icon}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="relative p-[1px] rounded-3xl overflow-hidden bg-white/5 border border-white/5 hover:border-accent-cyan/20 transition-all duration-500 shadow-2xl"
            >
              {/* Internal glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent-cyan/5 via-transparent to-accent-purple/5 pointer-events-none" />

              <div className="relative bg-dark-bg/60 backdrop-blur-3xl p-8 rounded-3xl">
                {submitSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-12"
                  >
                    <div className="text-5xl mb-4 animate-bounce">✨</div>
                    <h3 className="text-2xl font-bold font-display mb-2 text-white">Transmission Received</h3>
                    <p className="text-text-secondary text-center font-mono text-sm">
                      Connecting to Chetan's neural index... <br />I'll get back to you soon.
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-6"
                  >
                    {/* Name Field */}
                    <motion.div variants={itemVariants}>
                      <label className="block text-xs font-mono font-bold mb-2 uppercase tracking-widest text-[#00ff88]">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="e.g. John Doe"
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/20 focus:border-accent-cyan focus:outline-none focus:ring-1 focus:ring-accent-cyan/20 transition-all font-mono text-sm"
                      />
                    </motion.div>

                    {/* Email Field */}
                    <motion.div variants={itemVariants}>
                      <label className="block text-xs font-mono font-bold mb-2 uppercase tracking-widest text-[#00ff88]">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="john@example.com"
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/20 focus:border-accent-cyan focus:outline-none focus:ring-1 focus:ring-accent-cyan/20 transition-all font-mono text-sm"
                      />
                    </motion.div>

                    {/* Message Field */}
                    <motion.div variants={itemVariants}>
                      <label className="block text-xs font-mono font-bold mb-2 uppercase tracking-widest text-[#00ff88]">
                        Message
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        placeholder="Type your message here..."
                        rows={5}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/20 focus:border-accent-cyan focus:outline-none focus:ring-1 focus:ring-accent-cyan/20 transition-all resize-none font-mono text-sm"
                      ></textarea>
                    </motion.div>

                    {/* Submit Button */}
                    <motion.button
                      variants={itemVariants}
                      whileHover={{
                        scale: 1.02,
                        boxShadow: '0 0 25px rgba(0,255,136,0.2)'
                      }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 rounded-xl font-mono font-bold text-sm tracking-[0.2em] uppercase transition-all duration-300 relative overflow-hidden group/btn"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-accent-cyan to-accent-purple opacity-90 group-hover/btn:opacity-100 transition-opacity" />
                      <span className="relative z-10 text-dark-bg flex items-center justify-center gap-2">
                        {isSubmitting ? 'Syncing...' : 'Initiate Contact'}
                        {!isSubmitting && <span className="opacity-50 tracking-normal">---&gt;</span>}
                      </span>
                    </motion.button>
                  </motion.div>
                )}
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact
