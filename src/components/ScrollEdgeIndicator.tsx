import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ScrollEdgeIndicator = () => {
  const [showTop, setShowTop] = useState(false)
  const [showBottom, setShowBottom] = useState(false)

  useEffect(() => {
    let scrollTimeout: number

    const handleScroll = () => {
      const scrollTop = window.scrollY
      const scrollHeight = document.documentElement.scrollHeight
      const clientHeight = window.innerHeight
      const scrollBottom = scrollTop + clientHeight

      // Check if at top (with small threshold)
      if (scrollTop <= 10) {
        setShowTop(true)
        clearTimeout(scrollTimeout)
        scrollTimeout = setTimeout(() => setShowTop(false), 800)
      }

      // Check if at bottom (with small threshold)
      if (scrollBottom >= scrollHeight - 10) {
        setShowBottom(true)
        clearTimeout(scrollTimeout)
        scrollTimeout = setTimeout(() => setShowBottom(false), 800)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(scrollTimeout)
    }
  }, [])

  return (
    <>
      {/* Top Edge Indicator */}
      <AnimatePresence>
        {showTop && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed top-0 left-0 right-0 h-3 z-[9999] pointer-events-none"
          >
            <div
              className="w-full h-full bg-gradient-to-b from-primary/80 via-primary/40 to-transparent"
              style={{ boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)' }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Edge Indicator */}
      <AnimatePresence>
        {showBottom && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-0 left-0 right-0 h-3 z-[9999] pointer-events-none"
          >
            <div
              className="w-full h-full bg-gradient-to-t from-primary/80 via-primary/40 to-transparent"
              style={{ boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)' }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default ScrollEdgeIndicator
