import type { Project } from './types'

export const projects: Project[] = [
  {
    title: 'Cloud-Native Insights Engine',
    description:
      'Led "Insights" project predicting debit/credit transactions using AWS SQS/SNS, notifying customers of account activities to help identify costs and improve financial planning.',
    tech: ['AWS SQS', 'AWS SNS', 'Java', 'Spring Boot'],
  },
  {
    title: 'Enterprise Security Hub',
    description:
      'Developed Security Hub with Oracle DB to store login metadata for suspicious activity detection; implemented password strength assessment to prevent unauthorized access.',
    tech: ['Oracle DB', 'Java', 'Security'],
  },
  {
    title: 'SSO Vendor Integration',
    description:
      "Implemented SSO using SAML/proprietary tokens for retail and small business customers via iframes in the bank's Angular SPA for fluid cross-account transfers.",
    tech: ['SAML', 'Angular', 'Java'],
  },
  {
    title: 'Multithreaded Credit Card Processing',
    description:
      'Designed a multithreaded solution for credit card processing with asynchronous calls, reducing vendor communication by 25% and lowering CPU/memory consumption.',
    tech: ['Java', 'Multithreading', 'Async API'],
  },
  {
    title: 'Cloud Migration & CI/CD',
    description:
      'Migrated Java/Spring Boot applications to AWS (Lambda, Spring Cloud) with CI/CD pipelines and blue/green deployments for zero downtime.',
    tech: ['AWS', 'Spring Boot', 'AWS Lambda', 'CI/CD'],
  },
  {
    title: 'BMO / Bank of the West Merger',
    description:
      'Led development of a scalable microservices migration platform, successfully onboarding 1.8M+ new customers post-merger. Led Kafka migration to AWS MSK with AES encryption.',
    tech: ['Microservices', 'Java', 'Spring Boot', 'AWS'],
  },
]
