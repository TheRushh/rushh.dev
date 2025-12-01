import { motion } from 'framer-motion'
import { projects, techIcons } from '@/data'

const Projects = () => {
  return (
    <section id="projects" className="py-20 px-4 bg-base-100/80 backdrop-blur-sm">
      <div className="container mx-auto max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="text-4xl font-bold mb-12 text-center"
        >
          Projects
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, idx) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.05, ease: 'easeOut' }}
            >
              <div className="card bg-base-200 shadow-md hover:shadow-lg transition-shadow h-full border border-base-300">
                <div className="card-body">
                  <h3 className="card-title text-lg mb-3">{project.title}</h3>
                  <p className="text-sm mb-4 flex-grow text-base-content/70">
                    {project.description}
                  </p>
                  <div className="card-actions justify-start flex-wrap">
                    {project.tech.map(tech => {
                      const Icon = techIcons[tech]
                      return (
                        <span
                          key={tech}
                          className="badge badge-outline badge-sm gap-1.5 py-2.5 transition-colors duration-300"
                        >
                          {Icon && <Icon className="w-3 h-3 transition-colors duration-300" />}
                          {tech}
                        </span>
                      )
                    })}
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

export default Projects
