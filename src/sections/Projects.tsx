import { motion } from "framer-motion";
import type { IconType } from "react-icons";
import { SiAmazon, SiOracle, SiAngular, SiSpringboot } from "react-icons/si";
import {
  FaJava,
  FaShieldAlt,
  FaKey,
  FaLayerGroup,
  FaExchangeAlt,
  FaRocket,
  FaCubes
} from "react-icons/fa";

const Projects = () => {
  // Map technology names to their icons
  const techIcons: { [key: string]: IconType } = {
    "AWS SQS": SiAmazon,
    "AWS SNS": SiAmazon,
    "AWS": SiAmazon,
    "AWS Lambda": SiAmazon,
    "Java": FaJava,
    "Oracle DB": SiOracle,
    "Angular": SiAngular,
    "Spring Boot": SiSpringboot,
    "Security": FaShieldAlt,
    "SAML": FaKey,
    "Multithreading": FaLayerGroup,
    "Async API": FaExchangeAlt,
    "CI/CD": FaRocket,
    "Microservices": FaCubes,
  };

  const projects = [
    {
      title: "Cloud-Native Insights Engine",
      description: "Predicted upcoming debit/credit transactions, notifying customers via Amazon SQS and SNS to provide insights on monthly activities.",
      tech: ["AWS SQS", "AWS SNS", "Java"]
    },
    {
      title: "Enterprise Security Hub",
      description: "Developed security features and a relational database (Oracle DB) to store login metadata, enabling suspicious login identification and mitigating security risks.",
      tech: ["Oracle DB", "Java", "Security"]
    },
    {
      title: "SSO Vendor Integration",
      description: "Implemented SSO (SAML) for retail/business customers, enabling seamless vendor platform access via iframes within the bank's Angular SPA.",
      tech: ["SAML", "Angular", "Java"]
    },
    {
      title: "Optimized Multithreaded Solution",
      description: "Designed a multithreaded solution for asynchronous calls, improving response times, reducing vendor communication by 25%, and minimizing resource consumption.",
      tech: ["Java", "Multithreading", "Async API"]
    },
    {
      title: "Cloud Migration & CI/CD",
      description: "Led migration of on-premise Java/Spring Boot applications to AWS, re-architecting services using Spring Cloud, AWS Lambdas, and building new CI/CD pipelines.",
      tech: ["AWS", "Spring Boot", "AWS Lambda", "CI/CD"]
    },
    {
      title: "BMO / Bank of the West Merger",
      description: "Led development and integration of a scalable microservices platform to facilitate the seamless onboarding of 1.8 million new customers post-merger.",
      tech: ["Microservices", "Java", "Spring Boot"]
    }
  ];

  return (
    <section id="projects" className="py-20 px-4 bg-base-100">
      <div className="container mx-auto max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, ease: "easeOut" }}
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
              transition={{ duration: 0.3, delay: idx * 0.05, ease: "easeOut" }}
            >
              <div className="card bg-base-200 shadow-md hover:shadow-lg transition-shadow h-full border border-base-300">
                <div className="card-body">
                  <h3 className="card-title text-lg mb-3">
                    {project.title}
                  </h3>
                  <p className="text-sm mb-4 flex-grow text-base-content/70">
                    {project.description}
                  </p>
                  <div className="card-actions justify-start flex-wrap">
                    {project.tech.map((tech) => {
                      const Icon = techIcons[tech];
                      return (
                        <span key={tech} className="badge badge-outline badge-sm gap-1.5 py-2.5 transition-colors duration-300">
                          {Icon && <Icon className="w-3 h-3 transition-colors duration-300" />}
                          {tech}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
