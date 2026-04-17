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
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 tracking-tight">
            Let's <span className="text-gradient">Connect</span>
          </h2>
          <div className="flex flex-col items-center gap-2">
            <p className="text-text-secondary max-w-2xl mx-auto">
              Currently open to internships and exciting collaborations. Whether you have a question or just want to say hi, my inbox is always open.
            </p>
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#00ff88]/40 animate-pulse">
              [ Protocol: Secure Link Active ]
            </div>
          </div>
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-accent-cyan to-transparent mx-auto mt-6 opacity-30"></div>
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
            <motion.div variants={itemVariants} className="relative group">
              <div className="absolute -left-6 top-0 w-1 h-full bg-gradient-to-b from-[#00ff88] to-transparent opacity-50"></div>
              <h3 className="text-3xl font-display font-bold mb-4 text-white tracking-tight">
                <span className="text-[#00ff88]">Establish</span> Connection
              </h3>
              <div className="space-y-4 text-text-secondary leading-relaxed backdrop-blur-sm bg-white/[0.02] p-4 rounded-xl border border-white/5">
                <p>
                  I'm currently based in <span className="text-white font-medium">India</span> and open to global opportunities in Software Engineering, Cybersecurity, and ML.
                </p>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-4 text-[10px] font-mono uppercase tracking-[0.2em] text-[#00ff88]/60">
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88]"></span>
                      Availability: Open
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88]"></span>
                      Response: ~24h
                    </span>
                  </div>
                  <motion.a
                    href="/resume.pdf"
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-[#00ff88]/30 bg-[#00ff88]/5 text-[#00ff88] font-mono text-xs uppercase tracking-widest hover:bg-[#00ff88]/10 transition-all w-full sm:w-auto"
                  >
                    <span className="text-lg">📄</span>
                    Download Resume
                  </motion.a>
                </div>
              </div>
            </motion.div>

            {/* Contact Methods - Modern Protocol Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  icon: '📧',
                  label: 'Gmail',
                  value: 'jadhavchetan848@gmail.com',
                  href: 'mailto:jadhavchetan848@gmail.com',
                  color: 'from-red-500/20 to-red-600/20',
                  borderColor: 'group-hover:border-red-500/50',
                  protocol: 'SMTP/GMAIL',
                  id: '01'
                },
                {
                  icon: '🏆',
                  label: 'LeetCode',
                  value: 'Chetan-1',
                  href: 'https://leetcode.com/u/Chetan-1/',
                  color: 'from-orange-500/20 to-orange-600/20',
                  borderColor: 'group-hover:border-orange-500/50',
                  protocol: 'HTTPS/LEETCODE',
                  id: '02'
                },
                {
                  icon: '💼',
                  label: 'LinkedIn',
                  value: 'chetan-jadhav',
                  href: 'https://in.linkedin.com/in/chetan-jadhav-861967289',
                  color: 'from-sky-500/20 to-sky-600/20',
                  borderColor: 'group-hover:border-sky-500/50',
                  protocol: 'HTTPS/LINKEDIN',
                  id: '03'
                },
                {
                  icon: '🐙',
                  label: 'GitHub',
                  value: 'Chetan-0101',
                  href: 'https://github.com/Chetan-0101',
                  color: 'from-indigo-500/20 to-indigo-600/20',
                  borderColor: 'group-hover:border-indigo-500/50',
                  protocol: 'HTTPS/GITHUB',
                  id: '04'
                },
              ].map((contact, idx) => (
                <motion.a
                  key={idx}
                  variants={itemVariants}
                  href={contact.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative block"
                >
                  <div className={`relative bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-xl p-4 transition-all duration-300 ${contact.borderColor} hover:bg-white/[0.06] hover:-translate-y-1`}>
                    {/* Corner Accent */}
                    <div className="absolute top-0 right-0 w-8 h-8 opacity-20 group-hover:opacity-100 transition-opacity overflow-hidden pointer-events-none">
                      <div className="absolute top-0 right-0 w-full h-[1px] bg-white"></div>
                      <div className="absolute top-0 right-0 h-full w-[1px] bg-white"></div>
                    </div>

                    <div className="flex items-center gap-4 mb-3">
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${contact.color} flex items-center justify-center text-2xl filter drop-shadow-lg group-hover:scale-110 transition-transform`}>
                        {contact.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-[10px] font-mono text-white/40 tracking-wider">PROTOCOL: {contact.protocol}</span>
                          <span className="text-[10px] font-mono text-[#00ff88]/60">#{contact.id}</span>
                        </div>
                        <h4 className="font-display font-bold text-white group-hover:text-[#00ff88] transition-colors">{contact.label}</h4>
                      </div>
                    </div>

                    <div className="bg-black/20 rounded-lg px-3 py-2 flex items-center justify-between group-hover:bg-black/40 transition-colors">
                      <p className="text-text-secondary font-mono text-[11px] truncate pr-4">
                        {contact.value}
                      </p>
                      <div className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-pulse"></div>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Social Links - Digital Footprint */}
            <motion.div variants={itemVariants} className="pt-4">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                <h4 className="font-display font-medium text-white/50 uppercase tracking-[0.3em] text-[10px]">Digital Footprint</h4>
                <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
              </div>

              <div className="flex flex-wrap gap-4">
                {[
                  { icon: '𝕏', href: 'https://twitter.com', label: 'Twitter', color: 'hover:text-white hover:bg-white/10' },
                  { icon: '💼', href: 'https://linkedin.com/in/chetanjadhav01', label: 'LinkedIn', color: 'hover:text-sky-400 hover:bg-sky-400/10' },
                  { icon: '🐙', href: 'https://github.com/Chetan-0101', label: 'GitHub', color: 'hover:text-purple-400 hover:bg-purple-400/10' },
                  { icon: '📸', href: 'https://instagram.com', label: 'Instagram', color: 'hover:text-pink-400 hover:bg-pink-400/10' },
                ].map((social, idx) => (
                  <motion.a
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ y: -4, scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-12 h-12 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center transition-all duration-300 ${social.color} group`}
                    title={social.label}
                  >
                    <span className="text-lg text-white/40 group-hover:scale-110 transition-transform">{social.icon}</span>
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
