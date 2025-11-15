import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { experiences } from "@/data";

const Experience = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section id="experience" className="py-20 px-4 bg-base-200">
      <div className="container mx-auto max-w-7xl">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="text-4xl font-bold mb-12 text-center"
        >
          Professional Experience
        </motion.h2>

        <div className="relative">
          {/* Center timeline line for desktop */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-primary via-primary to-primary/50"></div>

          <div className="space-y-12">
            {experiences.map((exp, index) => {
              const isLeft = index % 2 === 0;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05, ease: "easeOut" }}
                  className="relative"
                >
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
                        className="card bg-base-100 shadow-sm hover:shadow-md transition-all border border-base-300 cursor-pointer"
                        onClick={() => exp.responsibilities && toggleExpand(index)}
                      >
                        <div className={`card-body transition-all ${expandedIndex === index ? 'py-6' : 'py-4'}`}>
                          <div className="flex items-center justify-between gap-3">
                            <div className="min-w-0 flex-1">
                              <h3 className="card-title text-base mb-1">{exp.title}</h3>
                              <p className="text-primary font-medium text-sm">{exp.company}</p>
                            </div>
                            <div className="flex items-center gap-2 flex-shrink-0">
                              <p className="text-xs text-base-content/60 whitespace-nowrap">{exp.period}</p>
                              {exp.responsibilities && (
                                <motion.svg
                                  animate={{ rotate: expandedIndex === index ? 180 : 0 }}
                                  transition={{ duration: 0.3 }}
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-5 w-5 text-base-content/60 flex-shrink-0"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </motion.svg>
                              )}
                            </div>
                          </div>
                          {exp.description && (
                            <p className="mt-3 text-sm text-base-content/70 leading-relaxed">{exp.description}</p>
                          )}
                          <AnimatePresence>
                            {exp.responsibilities && expandedIndex === index && (
                              <motion.ul
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="mt-4 space-y-2 text-sm text-base-content/80 overflow-hidden"
                              >
                                {exp.responsibilities.map((resp, idx) => (
                                  <li key={idx} className="flex gap-2">
                                    <span className="text-primary mt-1">•</span>
                                    <span>{resp}</span>
                                  </li>
                                ))}
                              </motion.ul>
                            )}
                          </AnimatePresence>
                        </div>
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
                            className="card bg-base-100 shadow-sm hover:shadow-md transition-all border border-base-300 w-full cursor-pointer"
                            onClick={() => exp.responsibilities && toggleExpand(index)}
                          >
                            <div className={`card-body transition-all ${expandedIndex === index ? 'py-6' : 'py-4'}`}>
                              <div className="flex items-center justify-between gap-3">
                                <div className="flex items-center gap-2 flex-shrink-0">
                                  {exp.responsibilities && (
                                    <motion.svg
                                      animate={{ rotate: expandedIndex === index ? 180 : 0 }}
                                      transition={{ duration: 0.3 }}
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="h-5 w-5 text-base-content/60 flex-shrink-0"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </motion.svg>
                                  )}
                                  <p className="text-xs text-base-content/60 whitespace-nowrap">{exp.period}</p>
                                </div>
                                <div className="min-w-0 flex-1 text-right">
                                  <h3 className="card-title text-base mb-1 justify-end">{exp.title}</h3>
                                  <p className="text-primary font-medium text-sm">{exp.company}</p>
                                </div>
                              </div>
                              {exp.description && (
                                <p className="mt-3 text-sm text-base-content/70 leading-relaxed text-right">{exp.description}</p>
                              )}
                              <AnimatePresence>
                                {exp.responsibilities && expandedIndex === index && (
                                  <motion.ul
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="mt-4 space-y-2 text-sm text-base-content/80 overflow-hidden"
                                  >
                                    {exp.responsibilities.map((resp, idx) => (
                                      <li key={idx} className="flex gap-2 justify-end text-right">
                                        <span>{resp}</span>
                                        <span className="text-primary mt-1">•</span>
                                      </li>
                                    ))}
                                  </motion.ul>
                                )}
                              </AnimatePresence>
                            </div>
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
                            className="card bg-base-100 shadow-sm hover:shadow-md transition-all border border-base-300 w-full cursor-pointer"
                            onClick={() => exp.responsibilities && toggleExpand(index)}
                          >
                            <div className={`card-body transition-all ${expandedIndex === index ? 'py-6' : 'py-4'}`}>
                              <div className="flex items-center justify-between gap-3">
                                <div className="min-w-0 flex-1">
                                  <h3 className="card-title text-base mb-1">{exp.title}</h3>
                                  <p className="text-primary font-medium text-sm">{exp.company}</p>
                                </div>
                                <div className="flex items-center gap-2 flex-shrink-0">
                                  <p className="text-xs text-base-content/60 whitespace-nowrap">{exp.period}</p>
                                  {exp.responsibilities && (
                                    <motion.svg
                                      animate={{ rotate: expandedIndex === index ? 180 : 0 }}
                                      transition={{ duration: 0.3 }}
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="h-5 w-5 text-base-content/60 flex-shrink-0"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </motion.svg>
                                  )}
                                </div>
                              </div>
                              {exp.description && (
                                <p className="mt-3 text-sm text-base-content/70 leading-relaxed">{exp.description}</p>
                              )}
                              <AnimatePresence>
                                {exp.responsibilities && expandedIndex === index && (
                                  <motion.ul
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="mt-4 space-y-2 text-sm text-base-content/80 overflow-hidden"
                                  >
                                    {exp.responsibilities.map((resp, idx) => (
                                      <li key={idx} className="flex gap-2">
                                        <span className="text-primary mt-1">•</span>
                                        <span>{resp}</span>
                                      </li>
                                    ))}
                                  </motion.ul>
                                )}
                              </AnimatePresence>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
