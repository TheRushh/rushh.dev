import { motion } from 'framer-motion'

const Hero = () => {
  const tagline = 'Senior Software Developer with a focus on cloud-native architectures.'

  const stats = [
    { label: 'Users Onboarded', value: '1.8M+' },
    { label: 'Team Size Led', value: '4-6 Devs' },
    { label: 'System Uptime', value: '99.99%' },
    { label: 'Experience', value: '7+ Years' },
  ]

  return (
    <section className="relative flex flex-col justify-center min-h-screen py-12 lg:py-20 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[100px] -z-10" />

      <div className="container mx-auto px-4 z-10">
        {/* Top Row: Image (Left) and Text (Right) on Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-6xl mx-auto mb-16 lg:mb-24">
          {/* Image Area - LEFT on Desktop */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center lg:justify-end items-center order-1 lg:order-1"
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-[400px] lg:h-[400px]">
              {/* Main Image Container */}
              <motion.div
                className="relative w-full h-full rounded-[2rem] overflow-hidden z-10 group"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
              >
                <div className="absolute inset-0 bg-base-content/5 group-hover:bg-base-content/0 transition-colors z-20 pointer-events-none" />
                <img
                  src="/images/profile.jpg"
                  alt="Rushabh Vakharwala"
                  className="w-full h-full object-cover rounded-[2rem] shadow-2xl"
                />

                {/* Image Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-base-100/60 via-transparent to-transparent opacity-80" />
              </motion.div>

              {/* Glowing Background Blob behind image */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-primary/30 via-secondary/30 to-accent/30 rounded-full blur-3xl -z-10 opacity-60" />
            </div>
          </motion.div>

          {/* Text Content - RIGHT on Desktop */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-2"
          >
            {/* Current Focus Banner */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 mb-6 rounded-full bg-base-content/5 border border-base-content/10 backdrop-blur-sm hover:bg-base-content/10 transition-colors cursor-default max-w-full"
            >
              <span className="relative flex h-2 w-2 flex-shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
              </span>
              <span className="text-xs md:text-sm font-medium text-base-content/70 whitespace-normal text-left leading-tight">
                Leading Engineering Teams at{' '}
                <span className="text-base-content font-bold">BMO</span>
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 tracking-tight leading-tight w-full"
            >
              Rushabh
              <br className="hidden lg:block" />
              <span className="block lg:inline lg:ml-0 ml-2">Vakharwala</span>
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="text-xl md:text-3xl font-medium mb-6 text-base-content/80"
            >
              Lead Software Developer
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="text-base md:text-xl mb-8 text-base-content/60 leading-relaxed max-w-lg mx-auto lg:mx-0"
            >
              {tagline}
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-4 sm:px-0"
            >
              <button
                onClick={() =>
                  document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
                }
                className="btn bg-primary hover:bg-primary/80 text-primary-content font-bold text-lg rounded-full px-8 py-3 h-auto min-h-[3rem] shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all duration-300 border-none w-full sm:w-auto"
              >
                Learn More
              </button>
              <button
                onClick={() =>
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                }
                className="btn btn-ghost text-base-content text-lg rounded-full px-8 py-3 h-auto min-h-[3rem] border border-base-content/20 hover:bg-base-content/10 transition-all duration-300 w-full sm:w-auto"
              >
                Get in Touch
              </button>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats Grid - Full Width Bottom, Centered Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="max-w-6xl mx-auto w-full"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="group flex flex-col items-center justify-center p-6 rounded-2xl bg-base-100/40 backdrop-blur-md border border-base-content/5 hover:border-primary/20 hover:bg-base-100/60 transition-all duration-300 text-center h-full min-h-[140px]"
              >
                <div className="text-xl md:text-2xl lg:text-3xl font-bold text-primary group-hover:scale-105 transition-transform">
                  {stat.value}
                </div>
                <div className="text-xs text-base-content/60 font-semibold uppercase tracking-wider mt-2 leading-snug">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
