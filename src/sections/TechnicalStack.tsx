import { techIcons } from '@/data'
import { useEffect, useState } from 'react'
import { useReveal } from '@/hooks/useReveal'

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
  Maven: { light: '#C71A36', dark: '#FF4D4A' },
  Ant: { light: '#A81C7D', dark: '#D94DAE' },
  Github: { light: '#181717', dark: '#C0C0C0' },
  Bitbucket: { light: '#0052CC', dark: '#4A9FBD' },
}

const SkillGrid = ({ skills, colorFn }: { skills: string[]; colorFn: (s: string) => string }) => (
  <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-4">
    {skills.map(skill => {
      const Icon = techIcons[skill]
      if (!Icon) return null
      return (
        <div
          key={skill}
          className="flex flex-col items-center justify-center p-4 rounded-2xl border border-base-content/5 bg-base-content/5 backdrop-blur-sm hover:bg-base-content/10 hover:-translate-y-1 transition-all group"
          title={skill}
        >
          <Icon className="w-8 h-8" style={{ color: colorFn(skill) }} />
          <span className="text-xs mt-2 text-base-content/60 transition-colors text-center">
            {skill}
          </span>
        </div>
      )
    })}
  </div>
)

const TechnicalStack = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')
  const ref = useReveal()

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
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="technical-stack"
      className="reveal py-20 px-4"
    >
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl font-bold mb-12 text-center">Technical Stack</h2>

        <div className="space-y-8">
          <div>
            <h4 className="text-lg font-semibold mb-4 text-primary">Languages</h4>
            <SkillGrid
              skills={[
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
              ]}
              colorFn={getBrandColor}
            />
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-primary">Frameworks & Libraries</h4>
            <SkillGrid
              skills={[
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
              ]}
              colorFn={getBrandColor}
            />
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-primary">Databases & APIs</h4>
            <SkillGrid
              skills={[
                'MySQL',
                'MongoDB',
                'Oracle SQL',
                'MS-SQL',
                'SQLite',
                'PL/SQL',
                'Firebase',
                'GraphQL',
                'JDBC',
              ]}
              colorFn={getBrandColor}
            />
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-primary">Cloud & Infrastructure</h4>
            <SkillGrid
              skills={['AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'Openshift', 'Tomcat']}
              colorFn={skill => brandColors[skill]?.[theme] || 'currentColor'}
            />
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-primary">DevOps & Tools</h4>
            <SkillGrid
              skills={[
                'Jenkins',
                'Bamboo',
                'ArgoCD',
                'Ansible',
                'Gradle',
                'Maven',
                'Ant',
                'Github',
                'Bitbucket',
              ]}
              colorFn={getBrandColor}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default TechnicalStack
