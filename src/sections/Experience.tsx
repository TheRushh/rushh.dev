import { useState } from 'react'
import { experiences } from '@/data'
import { useReveal } from '@/hooks/useReveal'

const Experience = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
  const ref = useReveal()

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index)
  }

  const Chevron = ({ expanded }: { expanded: boolean }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`h-5 w-5 text-base-content/60 flex-shrink-0 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  )

  const ResponsibilityList = ({
    responsibilities,
    expanded,
    align = 'left',
  }: {
    responsibilities: string[]
    expanded: boolean
    align?: 'left' | 'right'
  }) => (
    <div
      className={`grid transition-all duration-300 ease-in-out ${expanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
    >
      <ul className="overflow-hidden mt-4 space-y-2 text-sm text-base-content/80">
        {responsibilities.map((resp, idx) =>
          align === 'right' ? (
            <li key={idx} className="flex gap-2 justify-end text-right">
              <span>{resp}</span>
              <span className="text-primary mt-1">•</span>
            </li>
          ) : (
            <li key={idx} className="flex gap-2">
              <span className="text-primary mt-1">•</span>
              <span>{resp}</span>
            </li>
          )
        )}
      </ul>
    </div>
  )

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="experience"
      className="reveal py-20 px-4"
    >
      <div className="container mx-auto max-w-7xl">
        <h2 className="text-4xl font-bold mb-12 text-center">Professional Experience</h2>

        <div className="relative">
          {/* Center timeline line for desktop */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-primary via-primary to-primary/50"></div>

          <div className="space-y-12">
            {experiences.map((exp, index) => {
              const isLeft = index % 2 === 0
              const expanded = expandedIndex === index
              return (
                <div key={index} className="relative">
                  {/* Mobile layout - single column */}
                  <div className="md:hidden flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 rounded-full bg-primary shadow-sm" />
                      {index < experiences.length - 1 && (
                        <div className="w-0.5 h-full bg-gradient-to-b from-primary to-primary/50 mt-2" />
                      )}
                    </div>
                    <div className="flex-1 pb-6">
                      <div
                        className="relative p-6 rounded-2xl border border-base-content/5 bg-base-content/5 backdrop-blur-sm hover:bg-base-content/10 transition-colors cursor-pointer w-full group"
                        onClick={() => exp.responsibilities && toggleExpand(index)}
                      >
                        <div className="flex items-center justify-between gap-3 mb-4">
                          <div className="min-w-0 flex-1">
                            <h3 className="text-base font-bold mb-1">{exp.title}</h3>
                            <p className="text-primary font-medium text-sm">{exp.company}</p>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <p className="text-xs text-base-content/60 whitespace-nowrap">
                              {exp.period}
                            </p>
                            {exp.responsibilities && <Chevron expanded={expanded} />}
                          </div>
                        </div>
                        {exp.description && (
                          <p className="mt-3 text-sm text-base-content/70 leading-relaxed">
                            {exp.description}
                          </p>
                        )}
                        {exp.responsibilities && (
                          <ResponsibilityList
                            responsibilities={exp.responsibilities}
                            expanded={expanded}
                          />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Desktop layout - alternating left/right */}
                  <div className="hidden md:grid md:grid-cols-2 md:gap-8 items-center">
                    {isLeft ? (
                      <>
                        {/* Content on left */}
                        <div className="text-right pr-8 w-full">
                          <div
                            className="relative p-6 rounded-2xl border border-base-content/5 bg-base-content/5 backdrop-blur-sm hover:bg-base-content/10 transition-colors cursor-pointer w-full group"
                            onClick={() => exp.responsibilities && toggleExpand(index)}
                          >
                            <div className="flex items-center justify-between gap-3 mb-4">
                              <div className="flex items-center gap-2 flex-shrink-0">
                                {exp.responsibilities && <Chevron expanded={expanded} />}
                                <p className="text-xs text-base-content/60 whitespace-nowrap">
                                  {exp.period}
                                </p>
                              </div>
                              <div className="min-w-0 flex-1 text-right">
                                <h3 className="text-base font-bold mb-1 justify-end">
                                  {exp.title}
                                </h3>
                                <p className="text-primary font-medium text-sm">{exp.company}</p>
                              </div>
                            </div>
                            {exp.description && (
                              <p className="mt-3 text-sm text-base-content/70 leading-relaxed text-right">
                                {exp.description}
                              </p>
                            )}
                            {exp.responsibilities && (
                              <ResponsibilityList
                                responsibilities={exp.responsibilities}
                                expanded={expanded}
                                align="right"
                              />
                            )}
                          </div>
                        </div>
                        {/* Center dot */}
                        <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-primary shadow-lg border-4 border-base-200 z-10" />
                        {/* Empty space on right */}
                        <div></div>
                      </>
                    ) : (
                      <>
                        {/* Empty space on left */}
                        <div></div>
                        {/* Center dot */}
                        <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-primary shadow-lg border-4 border-base-200 z-10" />
                        {/* Content on right */}
                        <div className="pl-8 w-full">
                          <div
                            className="relative p-6 rounded-2xl border border-base-content/5 bg-base-content/5 backdrop-blur-sm hover:bg-base-content/10 transition-colors cursor-pointer w-full group"
                            onClick={() => exp.responsibilities && toggleExpand(index)}
                          >
                            <div className="flex items-center justify-between gap-3 mb-4">
                              <div className="min-w-0 flex-1">
                                <h3 className="text-base font-bold mb-1">{exp.title}</h3>
                                <p className="text-primary font-medium text-sm">{exp.company}</p>
                              </div>
                              <div className="flex items-center gap-2 flex-shrink-0">
                                <p className="text-xs text-base-content/60 whitespace-nowrap">
                                  {exp.period}
                                </p>
                                {exp.responsibilities && <Chevron expanded={expanded} />}
                              </div>
                            </div>
                            {exp.description && (
                              <p className="mt-3 text-sm text-base-content/70 leading-relaxed">
                                {exp.description}
                              </p>
                            )}
                            {exp.responsibilities && (
                              <ResponsibilityList
                                responsibilities={exp.responsibilities}
                                expanded={expanded}
                              />
                            )}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Experience
