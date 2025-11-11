import { motion } from "framer-motion";

const Experience = () => {
  const experiences = [
    {
      title: "Senior Technical Lead",
      company: "BMO, Bank of Montreal",
      period: "Sept 2024 – Present"
    },
    {
      title: "Senior Development Lead",
      company: "BMO, Bank of Montreal",
      period: "Feb 2022 – Sept 2024"
    },
    {
      title: "Senior Software Developer",
      company: "BMO, Bank of Montreal",
      period: "June 2020 – Feb 2022"
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
      <div className="container mx-auto max-w-4xl">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="text-4xl font-bold mb-12 text-center"
        >
          Professional Experience
        </motion.h2>

        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05, ease: "easeOut" }}
              className="flex gap-4"
            >
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 rounded-full bg-primary" />
                {index < experiences.length - 1 && (
                  <div className="w-px h-full bg-base-300 mt-2" />
                )}
              </div>
              <div className="flex-1 pb-6">
                <div className="card bg-base-100 shadow-sm hover:shadow-md transition-shadow border border-base-300">
                  <div className="card-body">
                    <h3 className="card-title text-lg">{exp.title}</h3>
                    <p className="text-primary font-medium">{exp.company}</p>
                    <p className="text-sm text-base-content/60">{exp.period}</p>
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

export default Experience;
