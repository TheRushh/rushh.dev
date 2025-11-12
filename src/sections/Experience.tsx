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
      description: "Leading technical direction and team management for critical banking applications serving millions of customers. Responsible for architectural decisions, team development, and ensuring high-quality deliverables through modern development practices and cross-functional collaboration.",
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
      description: "Transitioned from Backend Software Developer (Backend for Frontend pattern) to a lead role in Full-Stack development, supervising three different teams in executing software development projects involving cloud technologies, feature enhancement, and application optimization. Manages team workflow, analyzes code daily, and provides insight to solutions architects on system design and enhancement.",
      responsibilities: [
        "Led the development and seamless integration of a scalable microservices platform for the BMO and Bank of the West merger, facilitating the onboarding of approximately 1.8 million new customers to the bank.",
        "Designed and implemented blue/green deployments to ensure zero downtime during application rollouts. Enabled integration with OpenSearch, ELK, and Dynatrace to improve observability and identify issues proactively.",
        "Completed migration of in-house Java/Spring Boot applications and on-premise services to AWS cloud using Spring Cloud and AWS Lambdas, including CI/CD pipelines implementation and cloud cost optimization.",
        "Led the migration of Kafka Servers to AWS cloud, configuring servers and managing configuration discrepancies to enable message queuing and audit logging. Implemented custom AES encryption solution with private and public key algorithms for secure cloud connectivity."
      ]
    },
    {
      title: "Senior Software Developer",
      company: "BMO, Bank of Montreal",
      period: "June 2020 – Feb 2022",
      description: "Advanced from backend development to full-stack role, focusing on building secure, scalable banking applications with emphasis on cloud technologies, performance optimization, and customer-facing features.",
      responsibilities: [
        "Led the 'Insights' project to predict upcoming debit and credit transactions using Amazon SQS and SNS to notify customers, enabling better financial planning and identification of unknown account costs.",
        "Developed 'Security Hub' project features including relational database design using Oracle DB to store customer login metadata for suspicious login identification. Proactively assessed client password strength to improve security measures and prevent unauthorized access.",
        "Implemented SSO functionality for retail and small business customers using SAML and proprietary tokens, enabling seamless single sign-on to vendor platforms through iframes in the bank's Angular SPA while minimizing delays and hold times.",
        "Designed and executed optimized, multithreaded solution for credit card processing, enabling multiple asynchronous calls queued under 1 second. Improved response times, reduced vendor communication by 25%, and minimized costs while reducing CPU and memory consumption.",
        "Optimized application performance by implementing distributed caching layer using JDG (JBoss Data Grid). Strategically cached frequently accessed frontend data to improve response times, reduce resource load, and lower operational costs."
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
