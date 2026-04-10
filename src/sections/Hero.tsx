import { useEffect, useState } from 'react'

const Hero = () => {
  const tagline =
    'Senior Technical Lead specializing in cloud-native microservices, distributed systems, and high-scale banking platforms.'
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
    { label: 'VENDOR LATENCY CUT', value: '25%' },
    { label: 'BANKING SYSTEMS', value: '15+' },
    { label: 'YEARS AT BMO', value: '5+' },
  ]

  return (
    <section
      id="hero"
      className="animate-fade-up flex flex-col justify-center min-h-screen py-20 px-4 relative"
    >
      <div className="container mx-auto px-4 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-7xl mx-auto">
          {/* Image Side */}
          <div className="order-1 flex justify-center lg:justify-end">
            <div className="relative w-72 h-72 md:w-96 md:h-96 lg:w-[32rem] lg:h-[32rem] group">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-secondary/30 to-accent/30 rounded-2xl blur-3xl opacity-50 group-hover:opacity-80 transition-opacity duration-400" />

              {/* Image with glass effect */}
              <div
                className="relative overflow-hidden rounded-3xl w-full h-full"
                style={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}
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
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="order-2 flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-base-200/50 border border-base-content/10 text-xs font-medium mb-6 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-success animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.5)]" />
              Senior Technical Lead at BMO
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 tracking-tight">
              Rushabh
              <br />
              <span className="text-base-content">Vakharwala</span>
            </h1>

            <h2 className="text-2xl md:text-3xl font-medium mb-6 text-primary">
              Senior Technical Lead
            </h2>

            <p className="text-lg md:text-xl mb-10 text-base-content/70 leading-relaxed max-w-lg">
              {tagline}
            </p>

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
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
                className="px-8 h-12 flex items-center justify-center text-base font-semibold rounded-2xl border border-base-content/5 bg-base-content/5 backdrop-blur-sm hover:bg-base-content/10 hover:-translate-y-0.5 transition-all text-base-content group focus:outline-none focus:ring-2 focus:ring-base-content/20"
              >
                Get in Touch
              </button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-6xl mx-auto mt-20">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="relative p-6 rounded-2xl border border-base-content/5 bg-base-content/5 backdrop-blur-sm hover:bg-base-content/10 transition-colors group"
            >
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform origin-left">
                {stat.value}
              </div>
              <div className="text-xs font-bold tracking-wider text-base-content/50 uppercase">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Hero
