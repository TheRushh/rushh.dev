import { motion } from 'framer-motion'
import { techIcons } from '@/data'
import { useEffect, useState } from 'react'

const brandColors: Record<string, { light: string; dark: string }> = {
  Java: { light: '#007396', dark: '#4A9FBD' },
  Python: { light: '#3776AB', dark: '#6FA8DC' },
  JavaScript: { light: '#F7DF1E', dark: '#F7DF1E' },
  TypeScript: { light: '#3178C6', dark: '#5B9DD9' },
  Go: { light: '#00ADD8', dark: '#4DD4F4' },
  Kotlin: { light: '#7F52FF', dark: '#A67EFF' },
  'C/C++': { light: '#00599C', dark: '#4A9FBD' },
  'C#': { light: '#239120', dark: '#5FBF4B' },
  'Objective C': { light: '#438EFF', dark: '#70AAFF' },
  HTML: { light: '#E34F26', dark: '#FF6B47' },
  CSS: { light: '#1572B6', dark: '#4A9FBD' },
  'Spring Boot': { light: '#6DB33F', dark: '#8FD65A' },
  Django: { light: '#092E20', dark: '#4A9F7C' },
  '.NET': { light: '#512BD4', dark: '#8A6AFF' },
  React: { light: '#61DAFB', dark: '#61DAFB' },
  Angular: { light: '#DD0031', dark: '#FF4465' },
  'Node.js': { light: '#339933', dark: '#68C15A' },
  'Express.js': { light: '#000000', dark: '#C0C0C0' },
  'Ember.js': { light: '#E04E39', dark: '#FF7159' },
  Bun: { light: '#D4C5A9', dark: '#FBF0DF' },
  Bootstrap: { light: '#7952B3', dark: '#A37DD9' },
  MySQL: { light: '#4479A1', dark: '#6FA8DC' },
  MongoDB: { light: '#47A248', dark: '#68C15A' },
  'Oracle SQL': { light: '#F80000', dark: '#FF4444' },
  'MS-SQL': { light: '#CC2927', dark: '#FF4D4A' },
  SQLite: { light: '#003B57', dark: '#4A9FBD' },
  'PL/SQL': { light: '#F80000', dark: '#FF4444' },
  Firebase: { light: '#FFCA28', dark: '#FFCA28' },
  GraphQL: { light: '#E10098', dark: '#FF4DC4' },
  JDBC: { light: '#007396', dark: '#4A9FBD' },
  AWS: { light: '#FF9900', dark: '#FFB84D' },
  Azure: { light: '#0078D4', dark: '#4A9FBD' },
  GCP: { light: '#4285F4', dark: '#70AAFF' },
  Docker: { light: '#2496ED', dark: '#5BB5FF' },
  Kubernetes: { light: '#326CE5', dark: '#6FA0FF' },
  Openshift: { light: '#EE0000', dark: '#FF4444' },
  Tomcat: { light: '#D4C000', dark: '#F8DC75' },
  Jenkins: { light: '#D24939', dark: '#FF6B5A' },
  Bamboo: { light: '#0052CC', dark: '#4A9FBD' },
  ArgoCD: { light: '#EF7B4D', dark: '#FF9D70' },
  Ansible: { light: '#EE0000', dark: '#FF4444' },
  Gradle: { light: '#02303A', dark: '#4A9FBD' },
  Maven: { light: '#C71A36', dark: '#FF4D5F' },
  Ant: { light: '#A81C7D', dark: '#D94DAE' },
  Github: { light: '#181717', dark: '#C0C0C0' },
  Bitbucket: { light: '#0052CC', dark: '#4A9FBD' },
}

const About = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')

  const getBrandColor = (skill: string): string => {
    const colors = brandColors[skill]
    if (!colors) return 'currentColor'
    return colors[theme]
  }

  useEffect(() => {
    const updateTheme = () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark'
      setTheme(currentTheme as 'light' | 'dark')
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
    <section id="about" className="py-20 px-4 bg-base-200/80 backdrop-blur-sm">
      <div className="container mx-auto max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="text-4xl font-bold mb-4 text-center"
        >
          About Me
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.1, ease: 'easeOut' }}
          className="text-lg text-center text-base-content/70 mb-12 max-w-3xl mx-auto"
        >
          Senior Software Developer with over 6 years of experience leading successful software
          design and development projects with a strong focus on cloud-native architectures.
        </motion.p>

        {/* My Journey & Contact Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {/* My Journey */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.2, ease: 'easeOut' }}
            className="card bg-base-100 shadow-sm border border-base-300"
          >
            <div className="card-body">
              <h3 className="card-title text-xl text-secondary mb-4">🚀 My Journey</h3>
              <div className="space-y-4 text-sm leading-relaxed text-base-content/80">
                <p>
                  📈 Over the last 6+ years, I've built and maintained production-grade systems for
                  banking applications serving millions of customers – from leading technical teams
                  to architecting scalable microservices platforms and completing critical cloud
                  migrations to AWS.
                </p>
                <p>
                  ☑️ I care about cost efficiency, developer experience, and real-world reliability.
                  I pick up new tools quickly and constantly look for ways to improve systems,
                  reduce costs, and boost team velocity.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.3, ease: 'easeOut' }}
            className="card bg-base-100 shadow-sm border border-base-300"
          >
            <div className="card-body">
              <h3 className="card-title text-xl text-info mb-4">📬 Contact Information</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-info"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span className="text-sm text-base-content/70">Toronto, Ontario, Canada</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-info"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <a
                    href="mailto:rushhv@gmail.com"
                    className="text-sm text-base-content/70 hover:text-info transition-colors"
                  >
                    rushhv@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-info"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                  <a
                    href="https://www.linkedin.com/in/rushabhvakharwala/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-base-content/70 hover:text-info transition-colors"
                  >
                    linkedin.com/in/rushabhvakharwala
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Key Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.4, ease: 'easeOut' }}
          className="card bg-base-100 shadow-sm border border-base-300 mb-12"
        >
          <div className="card-body">
            <h3 className="card-title text-xl text-secondary mb-4">🏆 Key Achievements</h3>
            <ul className="space-y-3 text-sm leading-relaxed">
              <li className="flex gap-3">
                <span className="text-secondary mt-1">•</span>
                <div>
                  <span className="font-semibold text-info">BMO & Bank of the West Merger:</span>{' '}
                  Led the development and seamless integration of a scalable microservices platform,
                  facilitating the onboarding of approximately 1.8 million new customers to the
                  bank.
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-secondary mt-1">•</span>
                <div>
                  <span className="font-semibold text-info">AWS Cloud Migration:</span> Completed
                  migration of in-house Java/Spring Boot applications and on-premise services to AWS
                  cloud, including CI/CD pipelines implementation and cloud cost optimization.
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-secondary mt-1">•</span>
                <div>
                  <span className="font-semibold text-info">Performance Optimization:</span>{' '}
                  Designed and executed optimized, multithreaded solution for credit card
                  processing, reducing vendor communication by 25% and minimizing CPU/memory
                  consumption.
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-secondary mt-1">•</span>
                <div>
                  <span className="font-semibold text-info">Zero Downtime Deployments:</span>{' '}
                  Designed and implemented blue/green deployments ensuring zero downtime during
                  application rollouts with OpenSearch, ELK, and Dynatrace integration.
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-secondary mt-1">•</span>
                <div>
                  <span className="font-semibold text-info">SSO Implementation:</span> Implemented
                  SSO functionality for retail and small business customers using SAML and
                  proprietary tokens, enabling seamless single sign-on to vendor platforms.
                </div>
              </li>
            </ul>
          </div>
        </motion.div>

        <div className="divider"></div>

        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="text-3xl font-bold mb-8 text-center"
        >
          Technical Stack
        </motion.h3>

        <div className="space-y-8">
          {/* Languages */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.1, ease: 'easeOut' }}
          >
            <h4 className="text-lg font-semibold mb-4 text-primary">Languages</h4>
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-4">
              {[
                'Java',
                'Python',
                'JavaScript',
                'TypeScript',
                'Go',
                'Kotlin',
                'C/C++',
                'C#',
                'Objective C',
                'HTML',
                'CSS',
              ].map((skill, idx) => {
                const Icon = techIcons[skill]
                if (!Icon) return null
                return (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: idx * 0.02, ease: 'easeOut' }}
                    whileHover={{ scale: 1.1, y: -4 }}
                    className="flex flex-col items-center justify-center p-3 bg-base-100 rounded-lg border border-base-300 hover:shadow-lg transition-all group"
                    title={skill}
                  >
                    <Icon
                      className="w-8 h-8 transition-transform"
                      style={{ color: getBrandColor(skill) }}
                    />
                    <span className="text-xs mt-2 text-base-content/60 transition-colors text-center">
                      {skill}
                    </span>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          {/* Frameworks & Libraries */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.2, ease: 'easeOut' }}
          >
            <h4 className="text-lg font-semibold mb-4 text-primary">Frameworks & Libraries</h4>
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-4">
              {[
                'Spring Boot',
                'Django',
                '.NET',
                'React',
                'Angular',
                'Node.js',
                'Express.js',
                'Ember.js',
                'Bun',
                'Bootstrap',
              ].map((skill, idx) => {
                const Icon = techIcons[skill]
                if (!Icon) return null
                return (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: idx * 0.02, ease: 'easeOut' }}
                    whileHover={{ scale: 1.1, y: -4 }}
                    className="flex flex-col items-center justify-center p-3 bg-base-100 rounded-lg border border-base-300 hover:shadow-lg transition-all group"
                    title={skill}
                  >
                    <Icon
                      className="w-8 h-8 transition-transform"
                      style={{ color: getBrandColor(skill) }}
                    />
                    <span className="text-xs mt-2 text-base-content/60 transition-colors text-center">
                      {skill}
                    </span>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          {/* Databases */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.3, ease: 'easeOut' }}
          >
            <h4 className="text-lg font-semibold mb-4 text-primary">Databases & APIs</h4>
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-4">
              {[
                'MySQL',
                'MongoDB',
                'Oracle SQL',
                'MS-SQL',
                'SQLite',
                'PL/SQL',
                'Firebase',
                'GraphQL',
                'JDBC',
              ].map((skill, idx) => {
                const Icon = techIcons[skill]
                if (!Icon) return null
                return (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: idx * 0.02, ease: 'easeOut' }}
                    whileHover={{ scale: 1.1, y: -4 }}
                    className="flex flex-col items-center justify-center p-3 bg-base-100 rounded-lg border border-base-300 hover:shadow-lg transition-all group"
                    title={skill}
                  >
                    <Icon
                      className="w-8 h-8 transition-transform"
                      style={{ color: getBrandColor(skill) }}
                    />
                    <span className="text-xs mt-2 text-base-content/60 transition-colors text-center">
                      {skill}
                    </span>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          {/* Cloud & Infrastructure */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.4, ease: 'easeOut' }}
          >
            <h4 className="text-lg font-semibold mb-4 text-primary">Cloud & Infrastructure</h4>
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-4">
              {['AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'Openshift', 'Tomcat'].map(
                (skill, idx) => {
                  const Icon = techIcons[skill]
                  if (!Icon) return null
                  return (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: idx * 0.02, ease: 'easeOut' }}
                      whileHover={{ scale: 1.1, y: -4 }}
                      className="flex flex-col items-center justify-center p-3 bg-base-100 rounded-lg border border-base-300 hover:shadow-lg transition-all group"
                      title={skill}
                    >
                      <Icon
                        className="w-8 h-8 transition-transform"
                        style={{ color: brandColors[skill]?.[theme] || 'currentColor' }}
                      />
                      <span className="text-xs mt-2 text-base-content/60 transition-colors text-center">
                        {skill}
                      </span>
                    </motion.div>
                  )
                }
              )}
            </div>
          </motion.div>

          {/* DevOps & Tools */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.5, ease: 'easeOut' }}
          >
            <h4 className="text-lg font-semibold mb-4 text-primary">DevOps & Tools</h4>
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-4">
              {[
                'Jenkins',
                'Bamboo',
                'ArgoCD',
                'Ansible',
                'Gradle',
                'Maven',
                'Ant',
                'Github',
                'Bitbucket',
              ].map((skill, idx) => {
                const Icon = techIcons[skill]
                if (!Icon) return null
                return (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: idx * 0.02, ease: 'easeOut' }}
                    whileHover={{ scale: 1.1, y: -4 }}
                    className="flex flex-col items-center justify-center p-3 bg-base-100 rounded-lg border border-base-300 hover:shadow-lg transition-all group"
                    title={skill}
                  >
                    <Icon
                      className="w-8 h-8 transition-transform"
                      style={{ color: getBrandColor(skill) }}
                    />
                    <span className="text-xs mt-2 text-base-content/60 transition-colors text-center">
                      {skill}
                    </span>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About
