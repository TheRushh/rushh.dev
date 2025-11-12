import { motion } from "framer-motion";

const About = () => {
  const technicalSkills = {
    "Web Development": ["Spring Boot", ".NET", "Django", "Tomcat", "Node.js", "HTML", "CSS", "Angular", "ReactJS", "JavaScript", "TypeScript", "Bootstrap"],
    "Programming Languages": ["Java", "J2EE", "C/C++", "C#", "Go", "Python", "Kotlin", "Objective C", "JavaScript", "TypeScript"],
    "Containerization & Cloud": ["Docker", "Kubernetes", "Openshift", "AWS", "Azure", "GCP"],
    "Frameworks": ["Ember.js", "Express.js", "Angular", "React"],
    "Database Systems": ["MySQL", "SQLite", "PL/SQL", "Oracle SQL", "MS-SQL", "MongoDB", "Firebase", "JDBC", "GraphQL"],
    "DevOps Tools": ["Kubernetes", "Docker", "Openshift", "Ansible", "ArgoCD", "Jenkins", "Bamboo", "Gradle", "Maven", "Ant"],
    "Version Control": ["Github (Git)", "Bitbucket (Git)"]
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
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
                  {skills.map((skill) => (
                    <span key={skill} className="badge badge-outline badge-sm">
                      {skill}
                    </span>
                  ))}
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
