import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const useScrollBlur = () => {
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

  return scrollProgress
}

const About = () => {
  const scrollProgress = useScrollBlur()

  return (
    <section id="about" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="text-4xl font-bold mb-12 text-center"
        >
          About Me
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.1, ease: 'easeOut' }}
          className="text-lg text-center text-base-content/70 mb-8 max-w-3xl mx-auto"
        >
          Senior Software Developer with over 6 years of experience leading successful software
          design and development projects with a strong focus on cloud-native architectures.
        </motion.p>

        {/* My Journey */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.2, ease: 'easeOut' }}
          className="card bg-base-100 shadow-sm border border-base-300 mb-8"
          style={{
            backdropFilter: `blur(${scrollProgress * 4}px)`,
            WebkitBackdropFilter: `blur(${scrollProgress * 4}px)`,
          }}
        >
          <div className="card-body">
            <h3 className="card-title text-xl mb-4">My Journey</h3>
            <div className="space-y-4 text-sm leading-relaxed text-base-content/80">
              <p>
                Over the last 6+ years, I've built and maintained production-grade systems for
                banking applications serving millions of customers – from leading technical teams to
                architecting scalable microservices platforms and completing critical cloud
                migrations to AWS.
              </p>
              <p>
                I care about cost efficiency, developer experience, and real-world reliability. I
                pick up new tools quickly and constantly look for ways to improve systems, reduce
                costs, and boost team velocity.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Key Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.4, ease: 'easeOut' }}
          className="card bg-base-100 shadow-sm border border-base-300 mb-8"
          style={{
            backdropFilter: `blur(${scrollProgress * 4}px)`,
            WebkitBackdropFilter: `blur(${scrollProgress * 4}px)`,
          }}
        >
          <div className="card-body">
            <h3 className="card-title text-xl mb-4">Key Achievements</h3>
            <ul className="space-y-3 text-sm leading-relaxed">
              <li className="flex gap-3">
                <span className="text-primary mt-1">•</span>
                <div>
                  <span className="font-semibold">BMO & Bank of the West Merger:</span> Led the
                  development and seamless integration of a scalable microservices platform,
                  facilitating the onboarding of approximately 1.8 million new customers to the
                  bank.
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary mt-1">•</span>
                <div>
                  <span className="font-semibold">AWS Cloud Migration:</span> Completed migration of
                  in-house Java/Spring Boot applications and on-premise services to AWS cloud,
                  including CI/CD pipelines implementation and cloud cost optimization.
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary mt-1">•</span>
                <div>
                  <span className="font-semibold">Performance Optimization:</span> Designed and
                  executed optimized, multithreaded solution for credit card processing, reducing
                  vendor communication by 25% and minimizing CPU/memory consumption.
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary mt-1">•</span>
                <div>
                  <span className="font-semibold">Zero Downtime Deployments:</span> Designed and
                  implemented blue/green deployments ensuring zero downtime during application
                  rollouts with OpenSearch, ELK, and Dynatrace integration.
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary mt-1">•</span>
                <div>
                  <span className="font-semibold">SSO Implementation:</span> Implemented SSO
                  functionality for retail and small business customers using SAML and proprietary
                  tokens, enabling seamless single sign-on to vendor platforms.
                </div>
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About
