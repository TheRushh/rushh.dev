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

  return (
    <section className="flex items-center justify-center min-h-screen">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="order-2 lg:order-2 flex items-center justify-center lg:justify-start w-full"
          >
            <div className="w-full text-center lg:text-left">
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1, ease: 'easeOut' }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-base-content"
              >
                Rushabh Vakharwala
              </motion.h1>

              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2, ease: 'easeOut' }}
                className="text-2xl md:text-3xl font-medium mb-6 text-primary"
              >
                Lead Software Developer
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.3, ease: 'easeOut' }}
                className="text-lg md:text-xl mb-8 text-base-content/80 leading-relaxed"
              >
                {tagline}
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.4, ease: 'easeOut' }}
                className="flex justify-center lg:justify-start"
              >
                <button
                  onClick={() => {
                    const element = document.getElementById('about')
                    if (element) element.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="btn px-8 py-4 text-lg font-semibold rounded-lg bg-primary/15 backdrop-blur-sm border border-primary/20 text-white hover:bg-primary/25 hover:border-primary/40 transition-all"
                >
                  Learn More
                </button>
              </motion.div>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
            className="order-1 lg:order-1 flex justify-center items-center"
          >
            <motion.div
              className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 group"
              whileHover={{ y: -8 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            >
              {/* Glow effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-primary/30 via-secondary/30 to-accent/30 rounded-2xl blur-2xl"
                initial={{ opacity: 0.5 }}
                whileHover={{ opacity: 1, scale: 1.05 }}
                transition={{ duration: 0.4 }}
              />

              {/* Image with glass effect */}
              <motion.div
                className="relative overflow-hidden rounded-2xl"
                style={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              >
                <img
                  src="/images/profile.jpg"
                  alt="Rushabh Vakharwala"
                  className="w-full h-full object-cover rounded-2xl"
                />
                {/* Dark mode overlay */}
                {theme === 'dark' && (
                  <div className="absolute inset-0 bg-black/20 rounded-2xl transition-opacity duration-300" />
                )}
                {/* Overlay gradient */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent rounded-2xl"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero
