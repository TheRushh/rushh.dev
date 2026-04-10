import type { Experience } from './types'

export const experiences: Experience[] = [
  {
    title: 'Senior Technical Lead (Full-Stack)',
    company: 'BMO Bank of Montreal',
    period: 'Feb 2022 – Present',
    description:
      'Leading 7 teams with 4-5 engineers each, managing cloud-native microservices across critical banking applications. Responsible for architectural decisions, code reviews, sprint planning, and mentoring junior developers.',
    responsibilities: [
      'Leading 7 teams with 4-5 engineers each, managing cloud-native microservices; conduct code reviews, sprint planning, and mentor 4 junior developers.',
      'Successfully onboarded 1.8M+ customers from BMO–Bank of the West merger, leading the full development of the migration platform.',
      'Led "Insights" project predicting debit/credit transactions using AWS SQS/SNS, notifying customers of account activities to help identify costs and improve financial planning.',
      'Developed Security Hub with Oracle DB to store login metadata for suspicious activity detection; implemented password strength assessment to prevent unauthorized access.',
      'Implemented SSO using SAML/proprietary tokens for retail and small business customers using iframes in Angular SPA for fluid cross-account transfers.',
      'Designed a multithreaded solution for credit card processing with asynchronous calls, reducing vendor communication by 25% and lowering CPU/memory consumption.',
      'Migrated Java/Spring Boot applications to AWS (Lambda, Spring Cloud) with CI/CD pipelines and blue/green deployments for zero downtime.',
      'Led Kafka migration to AWS MSK with AES encryption; integrated OpenSearch, ELK, Dynatrace and optimized performance using JDG distributed caching.',
    ],
  },
  {
    title: 'Software Developer',
    company: 'BMO Bank of Montreal',
    period: 'Jun 2020 – Feb 2022',
    description:
      'Built Backend-for-Frontend microservices using Java/Spring Boot with RESTful APIs for account management and payment processing.',
    responsibilities: [
      'Built Backend-for-Frontend (BFF) microservices using Java/Spring Boot with RESTful APIs for account management and payment processing.',
      'Developed integration layers connecting 15+ internal banking systems with caching strategies and database query optimization.',
      'Implemented secure data transmission protocols during cloud migration ensuring compliance with banking security standards.',
    ],
  },
  {
    title: 'Software Developer (Co-op)',
    company: 'BMO Bank of Montreal',
    period: 'Sep 2019 – Apr 2020',
    description:
      'Developed backend projects using Java and Spring Boot; participated in Agile sprints and feature implementations.',
  },
  {
    title: 'Junior Android Developer',
    company: 'Samay Software',
    period: 'Jul 2017 – Aug 2018',
    description:
      'Developed Android mobile applications using Java and Kotlin; implemented UI components and integrated RESTful APIs.',
  },
]
