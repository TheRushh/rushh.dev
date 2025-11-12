import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const Experience = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };
  const experiences = [
    {
      title: "Senior Technical Lead",
      company: "BMO, Bank of Montreal",
      period: "Sept 2024 – Present",
      responsibilities: [
        "People Leadership: Oversees a team of 6 developers, assessing requirements, complexity, and time needed to complete tasks. Successfully onboarded multiple developers and mentored four junior developers.",
        "Cross-Functional Collaboration: Engages with external teams and APIs within the bank. Applies Agile methodology by spearheading bi-weekly sprint meetings to plan projects and resolve bottlenecks.",
        "Strategic Planning: Identifies performance and technical issues, designs algorithms and flowcharts. Reviews overall code quality through GitHub and collaborates with team members.",
        "Professional Development: Remains abreast of emerging technologies, conducting research and gaining insight into new tools and methodologies.",
        "Stakeholder & Vendor Relations: Engages with product owners and external technology vendors to meet their technical requirements."
      ]
    },
    {
      title: "Senior Development Lead",
      company: "BMO, Bank of Montreal",
      period: "Feb 2022 – Sept 2024",
      responsibilities: [
        "Successfully led the development and seamless integration of a scalable microservices platform for the BMO and Bank of the West merger, facilitating the onboarding of approximately 1.8 million new customers.",
        "Designed and implemented blue/green deployments to ensure zero downtime during application rollouts. Enabled integration with OpenSearch, ELK and Dynatrace to improve Observability.",
        "Completed migration projects of in-house Java/Spring Boot applications to AWS cloud services including CI/CD pipelines and cost optimization.",
        "Software Troubleshooting: Recreates technical issues in local environments, reviews deployment logs, runs applications in debug mode to isolate root causes and provide bug fixes.",
        "Technical Documentation: Drafts technical specification documents for backend microservices and creates RCA summary reports for common errors and resolutions."
      ]
    },
    {
      title: "Senior Software Developer",
      company: "BMO, Bank of Montreal",
      period: "June 2020 – Feb 2022",
      responsibilities: [
        "Led the 'Insights' project, predicting upcoming debit/credit transactions using Amazon SQS and SNS to notify customers about monthly activities and help identify unknown costs.",
        "Worked on 'Security Hub' project, developing security features using Oracle DB to store customer login metadata for suspicious login identification and mitigate security risks.",
        "Implemented SSO functionality for retail and small business customers using SAML and proprietary tokens for seamless vendor platform integration.",
        "Designed multithreaded solution for credit card calls, improving response times and reducing vendor communication by 25% while minimizing resource consumption.",
        "Optimized application performance by implementing distributed caching layer using JDG (JBoss Data Grid), reducing operational costs.",
        "Supported migration of Kafka Servers to AWS cloud, utilizing AES encryption for secure cloud connectivity."
      ]
    },
    {
      title: "Software Developer (Co-op)",
      company: "BMO Bank of Montreal",
      period: "Sept 2019 – April 2020"
    },
    {
      title: "Junior Android Developer",
      company: "Samay Software",
      period: "July 2017 – August 2018"
    }
  ];

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
