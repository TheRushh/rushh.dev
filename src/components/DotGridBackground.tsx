import { useEffect, useState } from 'react'

const DotGridBackground = () => {
  const [theme, setTheme] = useState<string>('dark')

  useEffect(() => {
    const updateTheme = () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark'
      setTheme(currentTheme)
    }

    // Set initial theme
    updateTheme()

    // Watch for theme changes
    const observer = new MutationObserver(updateTheme)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    })

    return () => observer.disconnect()
  }, [])

  const isLight = theme === 'light'

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {isLight ? (
        /* Light mode: dark dots */
        <div
          className="absolute inset-0 transition-opacity duration-300"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(0, 0, 0, 0.3) 1.5px, transparent 1.5px)`,
            backgroundSize: '30px 30px',
            maskImage: 'linear-gradient(to bottom, black 0%, rgba(0, 0, 0, 0.15) 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 0%, rgba(0, 0, 0, 0.15) 100%)',
          }}
        />
      ) : (
        /* Dark mode: light dots */
        <div
          className="absolute inset-0 transition-opacity duration-300"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(255, 255, 255, 0.3) 1.5px, transparent 1.5px)`,
            backgroundSize: '30px 30px',
            maskImage: 'linear-gradient(to bottom, black 0%, rgba(0, 0, 0, 0.15) 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 0%, rgba(0, 0, 0, 0.15) 100%)',
          }}
        />
      )}
    </div>
  )
}

export default DotGridBackground
