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
            Have an exciting project or opportunity? I'd love to hear from you. Reach out and let's create something amazing together.
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
              <h3 className="text-2xl font-display font-bold mb-2">Get In Touch</h3>
              <p className="text-text-secondary">
                Whether it's a question or just a friendly hello, feel free to reach out!
              </p>
            </motion.div>

            {/* Contact Methods */}
            {[
              {
                icon: '📧',
                label: 'Email',
                value: 'chetan.jadhav@example.com',
                href: 'mailto:chetan.jadhav@example.com',
              },
              {
                icon: '💼',
                label: 'LinkedIn',
                value: 'linkedin.com/in/chetanjadhav',
                href: 'https://linkedin.com',
              },
              {
                icon: '🐙',
                label: 'GitHub',
                value: 'github.com/chetanjadhav',
                href: 'https://github.com',
              },
            ].map((contact, idx) => (
              <motion.a
                key={idx}
                variants={itemVariants}
                href={contact.href}
                target="_blank"
                rel="noreferrer"
                className="glass-effect rounded-lg p-6 group hover:border-accent-cyan/50 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="text-3xl mt-1">{contact.icon}</div>
                  <div>
                    <h4 className="font-display font-bold mb-1">{contact.label}</h4>
                    <p className="text-text-secondary group-hover:text-accent-cyan transition-colors">
                      {contact.value}
                    </p>
                  </div>
                </div>
              </motion.a>
            ))}

            {/* Social Links */}
            <motion.div variants={itemVariants}>
              <h4 className="font-display font-bold mb-4">Follow Me</h4>
              <div className="flex gap-4">
                {[
                  { icon: '𝕏', href: 'https://twitter.com', label: 'Twitter' },
                  { icon: 'in', href: 'https://linkedin.com', label: 'LinkedIn' },
                  { icon: '⚙️', href: 'https://github.com', label: 'GitHub' },
                ].map((social, idx) => (
                  <motion.a
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-12 h-12 rounded-full glass-effect flex items-center justify-center hover:border-accent-cyan/50 transition-all"
                    title={social.label}
                  >
                    {social.icon}
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
              className="glass-effect rounded-xl p-8 border border-accent-cyan/20"
            >
              {submitSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12"
                >
                  <div className="text-5xl mb-4">✨</div>
                  <h3 className="text-2xl font-bold font-display mb-2">Thank You!</h3>
                  <p className="text-text-secondary text-center">
                    I'll get back to you as soon as possible.
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
                    <label className="block text-sm font-display font-bold mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your name"
                      className="w-full bg-dark-bg border border-accent-cyan/30 rounded-lg px-4 py-3 text-white placeholder-text-secondary focus:border-accent-cyan focus:outline-none transition-all"
                    />
                  </motion.div>

                  {/* Email Field */}
                  <motion.div variants={itemVariants}>
                    <label className="block text-sm font-display font-bold mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="your@email.com"
                      className="w-full bg-dark-bg border border-accent-cyan/30 rounded-lg px-4 py-3 text-white placeholder-text-secondary focus:border-accent-cyan focus:outline-none transition-all"
                    />
                  </motion.div>

                  {/* Message Field */}
                  <motion.div variants={itemVariants}>
                    <label className="block text-sm font-display font-bold mb-2">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Tell me about your project or opportunity..."
                      rows={5}
                      className="w-full bg-dark-bg border border-accent-cyan/30 rounded-lg px-4 py-3 text-white placeholder-text-secondary focus:border-accent-cyan focus:outline-none transition-all resize-none"
                    ></textarea>
                  </motion.div>

                  {/* Submit Button */}
                  <motion.button
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </motion.button>
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact
