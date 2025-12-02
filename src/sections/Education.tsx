import { motion } from 'framer-motion'
import { education } from '@/data'
import { useState, useEffect } from 'react'

const Education = () => {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const progress = Math.min(window.scrollY / 200, 1)
      setScrollProgress(progress)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  return (
    <section id="education" className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="text-4xl font-bold mb-12 text-center"
        >
          Education & Certifications
        </motion.h2>

        <div className="space-y-4">
          {education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05, ease: 'easeOut' }}
            >
              <div
                className="card bg-base-100 shadow-sm hover:shadow-md transition-shadow border border-base-300"
                style={{
                  backdropFilter: `blur(${scrollProgress * 4}px)`,
                  WebkitBackdropFilter: `blur(${scrollProgress * 4}px)`,
                }}
              >
                <div className="card-body">
                  <div className="flex items-start justify-between flex-wrap gap-4">
                    <div className="flex-1">
                      <h3 className="card-title text-lg mb-2">
                        {edu.link ? (
                          <a
                            href={edu.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-primary transition-colors"
                          >
                            {edu.title}
                          </a>
                        ) : (
                          edu.title
                        )}
                      </h3>
                      <p className="text-base-content/70">{edu.institution}</p>
                    </div>
                    <div className="badge badge-primary">
                      {edu.type === 'certification' ? 'Certification' : 'Degree'}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Education
