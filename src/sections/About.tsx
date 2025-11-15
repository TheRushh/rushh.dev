import { motion } from "framer-motion";
import { technicalSkills, techIcons } from "@/data";

const About = () => {

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
          {technicalSkills.map((skillCategory, idx) => (
            <motion.div
              key={skillCategory.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.05, ease: "easeOut" }}
              className="card bg-base-100 shadow-sm hover:shadow-md transition-shadow border border-base-300"
            >
              <div className="card-body">
                <h4 className="card-title text-lg mb-4">{skillCategory.category}</h4>
                <div className="flex flex-wrap gap-2">
                  {skillCategory.skills.map((skill) => {
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
