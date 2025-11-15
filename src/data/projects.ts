import type { Project } from "./types";

export const projects: Project[] = [
  {
    title: "Cloud-Native Insights Engine",
    description:
      "Predicted upcoming debit/credit transactions, notifying customers via Amazon SQS and SNS to provide insights on monthly activities.",
    tech: ["AWS SQS", "AWS SNS", "Java"],
  },
  {
    title: "Enterprise Security Hub",
    description:
      "Developed security features and a relational database (Oracle DB) to store login metadata, enabling suspicious login identification and mitigating security risks.",
    tech: ["Oracle DB", "Java", "Security"],
  },
  {
    title: "SSO Vendor Integration",
    description:
      "Implemented SSO (SAML) for retail/business customers, enabling seamless vendor platform access via iframes within the bank's Angular SPA.",
    tech: ["SAML", "Angular", "Java"],
  },
  {
    title: "Optimized Multithreaded Solution",
    description:
      "Designed a multithreaded solution for asynchronous calls, improving response times, reducing vendor communication by 25%, and minimizing resource consumption.",
    tech: ["Java", "Multithreading", "Async API"],
  },
  {
    title: "Cloud Migration & CI/CD",
    description:
      "Led migration of on-premise Java/Spring Boot applications to AWS, re-architecting services using Spring Cloud, AWS Lambdas, and building new CI/CD pipelines.",
    tech: ["AWS", "Spring Boot", "AWS Lambda", "CI/CD"],
  },
  {
    title: "BMO / Bank of the West Merger",
    description:
      "Led development and integration of a scalable microservices platform to facilitate the seamless onboarding of 1.8 million new customers post-merger.",
    tech: ["Microservices", "Java", "Spring Boot"],
  },
];
