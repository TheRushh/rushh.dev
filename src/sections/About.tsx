import { motion } from "framer-motion";
import type { IconType } from "react-icons";
import {
  SiSpringboot, SiDotnet, SiDjango, SiApachetomcat, SiNodedotjs, SiBun, SiHtml5, SiCss3,
  SiAngular, SiReact, SiJavascript, SiTypescript, SiBootstrap,
  SiCplusplus, SiSharp, SiGo, SiPython, SiKotlin,
  SiDocker, SiKubernetes, SiRedhatopenshift, SiAmazon, SiGooglecloud,
  SiEmberdotjs, SiExpress,
  SiMysql, SiSqlite, SiOracle, SiMongodb, SiFirebase, SiGraphql,
  SiAnsible, SiArgo, SiJenkins, SiBamboo, SiGradle, SiApachemaven, SiApacheant,
  SiGithub, SiBitbucket
} from "react-icons/si";
import { FaJava, FaMicrosoft } from "react-icons/fa";

const About = () => {
  // Map technology names to their icons
  const techIcons: { [key: string]: IconType } = {
    "Spring Boot": SiSpringboot,
    ".NET": SiDotnet,
    "Django": SiDjango,
    "Tomcat": SiApachetomcat,
    "Node.js": SiNodedotjs,
    "Bun": SiBun,
    "HTML": SiHtml5,
    "CSS": SiCss3,
    "Angular": SiAngular,
    "ReactJS": SiReact,
    "React": SiReact,
    "JavaScript": SiJavascript,
    "TypeScript": SiTypescript,
    "Bootstrap": SiBootstrap,
    "Java": FaJava,
    "J2EE": FaJava,
    "C/C++": SiCplusplus,
    "C#": SiSharp,
    "Go": SiGo,
    "Python": SiPython,
    "Kotlin": SiKotlin,
    "Docker": SiDocker,
    "Kubernetes": SiKubernetes,
    "Openshift": SiRedhatopenshift,
    "AWS": SiAmazon,
    "Azure": FaMicrosoft,
    "GCP": SiGooglecloud,
    "Ember.js": SiEmberdotjs,
    "Express.js": SiExpress,
    "MySQL": SiMysql,
    "SQLite": SiSqlite,
    "Oracle SQL": SiOracle,
    "PL/SQL": SiOracle,
    "MongoDB": SiMongodb,
    "Firebase": SiFirebase,
    "GraphQL": SiGraphql,
    "Ansible": SiAnsible,
    "ArgoCD": SiArgo,
    "Jenkins": SiJenkins,
    "Bamboo": SiBamboo,
    "Gradle": SiGradle,
    "Maven": SiApachemaven,
    "Ant": SiApacheant,
    "Github (Git)": SiGithub,
    "Github": SiGithub,
    "Bitbucket (Git)": SiBitbucket,
    "Bitbucket": SiBitbucket,
  };

  const technicalSkills = {
    "Web Development": ["Spring Boot", ".NET", "Django", "Tomcat", "Node.js", "Bun", "React", "Angular", "Bootstrap", "Ember.js", "Express.js"],
    "Programming Languages": ["Java", "J2EE", "C/C++", "C#", "Go", "Python", "Kotlin", "Objective C", "JavaScript", "TypeScript",  "HTML", "CSS",],
    "Containerization & Cloud": ["Docker", "Kubernetes", "Openshift", "AWS", "Azure", "GCP"],
    "Database Systems": ["MySQL", "SQLite", "PL/SQL", "Oracle SQL", "MS-SQL", "MongoDB", "Firebase", "JDBC", "GraphQL"],
    "DevOps Tools": ["Kubernetes", "Docker", "Openshift", "Ansible", "ArgoCD", "Jenkins", "Bamboo", "Gradle", "Maven", "Ant"],
    "Version Control": ["Github", "Bitbucket"]
  };

  return (
    <section id="about" className="py-20 px-4 bg-base-200">
      <div className="container mx-auto max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="text-4xl font-bold mb-12 text-center"
        >
          About Me
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.1, ease: "easeOut" }}
          className="mb-12"
        >
          <p className="text-lg leading-relaxed text-base-content/80">
            Senior Software Developer with over 6 years of experience leading successful software design and development projects with a strong focus on cloud-native architectures. Proven track record in enhancing security features, implementing SSO functionality, insight & projection features and optimizing application performance. Adept at translating business requirements into scalable solutions and managing cross-functional teams to ensure high-quality deliverables.
          </p>
        </motion.div>

        <div className="divider"></div>

        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="text-3xl font-bold mb-8 text-center"
        >
          Technical Skills
        </motion.h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(technicalSkills).map(([category, skills], idx) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.05, ease: "easeOut" }}
              className="card bg-base-100 shadow-sm hover:shadow-md transition-shadow border border-base-300"
            >
              <div className="card-body">
                <h4 className="card-title text-lg mb-4">{category}</h4>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => {
                    const Icon = techIcons[skill];
                    return (
                      <span
                        key={skill}
                        className="badge badge-outline badge-md gap-2 py-3 transition-colors duration-300"
                      >
                        {Icon && <Icon className="w-4 h-4 transition-colors duration-300" />}
                        {skill}
                      </span>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
