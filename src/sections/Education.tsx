import { education } from '@/data'
import { useReveal } from '@/hooks/useReveal'

const Education = () => {
  const ref = useReveal()
  return (
    <section ref={ref as React.RefObject<HTMLElement>} id="education" className="reveal py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-4xl font-bold mb-12 text-center">Education & Certifications</h2>

        <div className="space-y-4">
          {education.map((edu, index) => (
            <div key={index}>
              <div className="relative p-6 rounded-2xl border border-base-content/5 bg-base-content/5 backdrop-blur-sm hover:bg-base-content/10 transition-colors group">
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
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Education
