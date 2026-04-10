import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const Hero = () => {
  const tagline = 'Senior Software Developer with a focus on cloud-native architectures.'
  const [theme, setTheme] = useState<string>('dark')

  useEffect(() => {
    const updateTheme = () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark'
      setTheme(currentTheme)
    }

    updateTheme()

    const observer = new MutationObserver(updateTheme)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    })

    return () => observer.disconnect()
  }, [])

  const stats = [
    { label: 'USERS ONBOARDED', value: '1.8M+' },
    { label: 'TEAM SIZE LED', value: '4-6 Devs' },
    { label: 'SYSTEM UPTIME', value: '99.99%' },
    { label: 'EXPERIENCE', value: '7+ Years' },
  ]

  return (
    <section
      id="hero"
      className="flex flex-col justify-center min-h-screen py-20 relative overflow-hidden"
    >
      <div className="container mx-auto px-4 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-7xl mx-auto">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="order-1 flex justify-center lg:justify-end"
          >
            <motion.div
              className="relative w-72 h-72 md:w-96 md:h-96 lg:w-[32rem] lg:h-[32rem] group"
              whileHover={{ y: -8 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            >
              {/* Glow effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-primary/30 via-secondary/30 to-accent/30 rounded-2xl blur-3xl opacity-50"
                initial={{ opacity: 0.5 }}
                whileHover={{ opacity: 0.8, scale: 1.05 }}
                transition={{ duration: 0.4 }}
              />

              {/* Image with glass effect */}
              <motion.div
                className="relative overflow-hidden rounded-3xl w-full h-full"
                style={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              >
                <img
                  src="/images/profile.jpg"
                  alt="Rushabh Vakharwala"
                  className="w-full h-full object-cover"
                />
                {/* Dark mode overlay */}
                <div
                  className={`absolute inset-0 bg-black/10 transition-opacity duration-300 ${
                    theme === 'dark' ? 'opacity-100' : 'opacity-0'
                  }`}
                />
                {/* Overlay gradient */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
            className="order-2 flex flex-col items-center lg:items-start text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-base-200/50 border border-base-content/10 text-xs font-medium mb-6 backdrop-blur-sm"
            >
              <span className="w-2 h-2 rounded-full bg-success animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.5)]" />
              Leading Engineering Teams at BMO
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2, ease: 'easeOut' }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 tracking-tight"
            >
              Rushabh
              <br />
              <span className="text-base-content">Vakharwala</span>
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3, ease: 'easeOut' }}
              className="text-2xl md:text-3xl font-medium mb-6 text-primary"
            >
              Lead Software Developer
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.4, ease: 'easeOut' }}
              className="text-lg md:text-xl mb-10 text-base-content/70 leading-relaxed max-w-lg"
            >
              {tagline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5, ease: 'easeOut' }}
              className="flex flex-wrap gap-4 justify-center lg:justify-start"
            >
              <button
                onClick={() => {
                  document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="btn btn-primary px-8 h-12 text-base font-semibold rounded-xl bg-primary text-primary-content border-none hover:bg-primary/90 transition-all shadow-[0_4px_12px_rgba(59,130,246,0.25)] hover:shadow-[0_6px_20px_rgba(59,130,246,0.35)] hover:-translate-y-0.5"
              >
                Learn More
              </button>
              <button
                onClick={() => {
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="px-8 h-12 flex items-center justify-center text-base font-semibold rounded-2xl border border-base-content/5 bg-base-100/10 backdrop-blur-sm hover:bg-base-100/50 hover:-translate-y-0.5 transition-all text-base-content group focus:outline-none focus:ring-2 focus:ring-base-content/20"
              >
                Get in Touch
              </button>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6, ease: 'easeOut' }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-6xl mx-auto mt-20"
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="relative p-6 rounded-2xl border border-base-content/5 bg-base-100/10 backdrop-blur-sm hover:bg-base-100/50 transition-colors group"
            >
              <motion.div
                className="text-3xl md:text-4xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform origin-left"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
              >
                {stat.value}
              </motion.div>
              <div className="text-xs font-bold tracking-wider text-base-content/50 uppercase">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
