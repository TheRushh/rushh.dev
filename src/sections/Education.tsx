import { motion } from "framer-motion";

const Education = () => {
  const education = [
    {
      title: "Certified AWS Developer Associate",
      institution: "Amazon Web Services",
      link: "https://www.credly.com/badges/7195af3f-fe69-464b-80df-6697db95a5d7/",
      type: "certification"
    },
    {
      title: "Master of Applied Computing",
      institution: "University of Windsor",
      link: null,
      type: "degree"
    },
    {
      title: "Bachelor of Computer Science & Engineering",
      institution: "Babaria Institute of Technology",
      link: null,
      type: "degree"
    }
  ];

  return (
    <section id="education" className="py-20 px-4 bg-base-100">
      <div className="container mx-auto max-w-4xl">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="text-4xl font-bold mb-12 text-center"
        >
          Education & Certifications
        </motion.h2>

        <div className="space-y-4">
          {education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05, ease: "easeOut" }}
            >
              <div className="card bg-base-200 shadow-sm hover:shadow-md transition-shadow border border-base-300">
                <div className="card-body">
                  <div className="flex items-start justify-between flex-wrap gap-4">
                    <div className="flex-1">
                      <h3 className="card-title text-lg mb-2">
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
