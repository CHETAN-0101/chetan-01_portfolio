import { motion } from 'framer-motion'

const timeline = [
  {
    year: '2025 July – Aug',
    icon: '🛡️',
    title: 'Cyber Security Intern',
    org: 'TheDropOrg',
    description: 'Specializing in vulnerability assessment, penetration testing, and security auditing for digital assets.',
    color: 'cyan',
    milestones: ['Vulnerability Assessment', 'Pentesting', 'Secure Coding Practices'],
  },
  {
    year: '2026 Jan – March',
    icon: '☁️',
    title: 'Virtual Internship',
    org: 'Zscaler',
    description: 'In-depth exploration of cloud security architectures, SASE, and zero-trust security models.',
    color: 'purple',
    milestones: ['Cloud Security', 'Zero Trust Architecture', 'Data Protection'],
  },
]

const achievements = [
  { icon: '🏆', label: 'LeetCode +400', detail: 'Problem Solver' },
  { icon: '🔐', label: 'Security Researcher', detail: 'Bug Bounty' },
  { icon: '🎨', label: 'Design System Lead', detail: 'End-to-end' },
  { icon: '🤖', label: 'ML Deployment', detail: 'Production' },
]

const COLOR = {
  cyan: { dot: '#00ff88', border: 'border-[#00ff88]/40', text: 'text-[#00ff88]', glow: 'shadow-[0_0_18px_rgba(0,255,136,0.25)]' },
  purple: { dot: '#a855f7', border: 'border-[#a855f7]/40', text: 'text-[#a855f7]', glow: 'shadow-[0_0_18px_rgba(168,85,247,0.25)]' },
}

const Experience = () => {
  return (
    <section
      id="experience"
      className="section-py bg-gradient-to-b from-dark-bg to-dark-secondary relative overflow-hidden"
    >
      {/* Background accent orb */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-gradient-to-l from-accent-cyan/8 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-gradient-to-r from-accent-purple/8 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="container-custom relative z-10">

        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Learning <span className="text-gradient">Journey</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-accent-cyan to-accent-purple rounded-full" />
        </motion.div>

        {/* ── Timeline ── */}
        <div className="relative">
          {/* Vertical spine */}
          <div className="absolute left-5 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#00ff88]/60 via-[#a855f7]/40 to-transparent" />

          <div className="space-y-10">
            {timeline.map((item, idx) => {
              const c = COLOR[item.color]
              const isRight = idx % 2 === 0

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  className={`relative flex items-start gap-6 md:gap-0 ${isRight ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  {/* ── Card ── */}
                  <div className={`pl-14 md:pl-0 md:w-[calc(50%-2rem)] ${isRight ? 'md:pr-10' : 'md:pl-10'}`}>
                    <motion.div
                      whileHover={{ y: -4, scale: 1.01 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                      className={`relative rounded-2xl p-6 border ${c.border} ${c.glow} transition-all duration-300`}
                      style={{
                        background: 'linear-gradient(135deg, rgba(5,12,5,0.85) 0%, rgba(10,20,10,0.70) 100%)',
                        backdropFilter: 'blur(12px)',
                      }}
                    >
                      {/* Year badge */}
                      <div className={`inline-flex items-center gap-2 text-xs font-mono font-bold ${c.text} mb-3 px-3 py-1 rounded-full`}
                        style={{ background: `${c.dot}14`, border: `1px solid ${c.dot}30` }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: c.dot }} />
                        {item.year}
                      </div>

                      {/* Title row */}
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">{item.icon}</span>
                        <div>
                          <h3 className="text-xl font-display font-bold text-white leading-tight">{item.title}</h3>
                          <p className={`inline-block text-[10px] font-mono mt-1 px-2 py-0.5 rounded border ${c.text} backdrop-blur-sm shadow-[0_0_10px_rgba(0,0,0,0.5)]`}
                            style={{
                              background: `${c.dot}10`,
                              borderColor: `${c.dot}40`,
                              letterSpacing: '0.1em'
                            }}
                          >
                            {item.org}
                          </p>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-sm text-white/55 mb-4 leading-relaxed">{item.description}</p>

                      {/* Milestones */}
                      <div className="space-y-1.5">
                        {item.milestones.map((m, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -8 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 * i }}
                            viewport={{ once: true }}
                            className="flex items-center gap-2"
                          >
                            <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: c.dot }} />
                            <span className="text-xs text-white/50">{m}</span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </div>

                  {/* ── Timeline node ── */}
                  <div className="absolute left-5 md:left-1/2 md:-translate-x-1/2 top-6 flex items-center justify-center z-10">
                    <motion.div
                      whileHover={{ scale: 1.4 }}
                      className="w-4 h-4 rounded-full border-2 bg-dark-bg"
                      style={{ borderColor: c.dot, boxShadow: `0 0 12px ${c.dot}80` }}
                    />
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* ── Achievements Grid ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-20 pt-12 border-t border-accent-cyan/15"
        >
          <h3 className="text-2xl font-display font-bold mb-8">
            Achievements &amp; <span className="text-gradient">Certifications</span>
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {achievements.map((a, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -4, borderColor: 'rgba(0,255,136,0.5)' }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 p-4 rounded-xl border border-accent-cyan/15 transition-all duration-300 cursor-default"
                style={{ background: 'rgba(5,12,5,0.6)', backdropFilter: 'blur(8px)' }}
              >
                <div className="text-2xl shrink-0">{a.icon}</div>
                <div>
                  <p className="text-sm font-semibold text-white/85 leading-tight">{a.label}</p>
                  <p className="text-xs text-accent-cyan/60 font-mono mt-0.5">{a.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}

export default Experience
