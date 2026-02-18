import { motion } from 'framer-motion'
import { education } from '@/data'

const Education = () => {
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
              <div className="relative p-6 rounded-2xl border border-base-content/5 bg-base-100/10 backdrop-blur-sm hover:bg-base-100/50 transition-colors group">
                <div className="flex items-start justify-between flex-wrap gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold mb-2">
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Education
