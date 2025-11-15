import type { Experience } from './types'

export const experiences: Experience[] = [
  {
    title: 'Senior Technical Lead',
    company: 'BMO, Bank of Montreal',
    period: 'Sept 2024 – Present',
    description:
      'Leading technical direction and team management for critical banking applications serving millions of customers. Responsible for architectural decisions, team development, and ensuring high-quality deliverables through modern development practices and cross-functional collaboration.',
    responsibilities: [
      'People Leadership: Oversees a team of 6 developers, assessing requirements, complexity, and time needed to complete tasks. Successfully onboarded multiple developers and mentored four junior developers.',
      'Cross-Functional Collaboration: Engages with external teams and APIs within the bank. Applies Agile methodology by spearheading bi-weekly sprint meetings to plan projects and resolve bottlenecks.',
      'Strategic Planning: Identifies performance and technical issues, designs algorithms and flowcharts. Reviews overall code quality through GitHub and collaborates with team members.',
      'Professional Development: Remains abreast of emerging technologies, conducting research and gaining insight into new tools and methodologies.',
      'Stakeholder & Vendor Relations: Engages with product owners and external technology vendors to meet their technical requirements.',
    ],
  },
  {
    title: 'Senior Development Lead',
    company: 'BMO, Bank of Montreal',
    period: 'Feb 2022 – Sept 2024',
    description:
      'Transitioned from Backend Software Developer (Backend for Frontend pattern) to a lead role in Full-Stack development, supervising three different teams in executing software development projects involving cloud technologies, feature enhancement, and application optimization. Manages team workflow, analyzes code daily, and provides insight to solutions architects on system design and enhancement.',
    responsibilities: [
      'Led the development and seamless integration of a scalable microservices platform for the BMO and Bank of the West merger, facilitating the onboarding of approximately 1.8 million new customers to the bank.',
      'Designed and implemented blue/green deployments to ensure zero downtime during application rollouts. Enabled integration with OpenSearch, ELK, and Dynatrace to improve observability and identify issues proactively.',
      'Completed migration of in-house Java/Spring Boot applications and on-premise services to AWS cloud using Spring Cloud and AWS Lambdas, including CI/CD pipelines implementation and cloud cost optimization.',
      'Led the migration of Kafka Servers to AWS cloud, configuring servers and managing configuration discrepancies to enable message queuing and audit logging. Implemented custom AES encryption solution with private and public key algorithms for secure cloud connectivity.',
    ],
  },
  {
    title: 'Senior Software Developer',
    company: 'BMO, Bank of Montreal',
    period: 'June 2020 – Feb 2022',
    description:
      'Advanced from backend development to full-stack role, focusing on building secure, scalable banking applications with emphasis on cloud technologies, performance optimization, and customer-facing features.',
    responsibilities: [
      "Led the 'Insights' project to predict upcoming debit and credit transactions using Amazon SQS and SNS to notify customers, enabling better financial planning and identification of unknown account costs.",
      "Developed 'Security Hub' project features including relational database design using Oracle DB to store customer login metadata for suspicious login identification. Proactively assessed client password strength to improve security measures and prevent unauthorized access.",
      "Implemented SSO functionality for retail and small business customers using SAML and proprietary tokens, enabling seamless single sign-on to vendor platforms through iframes in the bank's Angular SPA while minimizing delays and hold times.",
      'Designed and executed optimized, multithreaded solution for credit card processing, enabling multiple asynchronous calls queued under 1 second. Improved response times, reduced vendor communication by 25%, and minimized costs while reducing CPU and memory consumption.',
      'Optimized application performance by implementing distributed caching layer using JDG (JBoss Data Grid). Strategically cached frequently accessed frontend data to improve response times, reduce resource load, and lower operational costs.',
    ],
  },
  {
    title: 'Software Developer (Co-op)',
    company: 'BMO Bank of Montreal',
    period: 'Sept 2019 – April 2020',
  },
  {
    title: 'Junior Android Developer',
    company: 'Samay Software',
    period: 'July 2017 – August 2018',
  },
]
