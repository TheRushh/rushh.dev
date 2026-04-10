import { useReveal } from '@/hooks/useReveal'

const About = () => {
  const ref = useReveal()
  return (
    <section ref={ref as React.RefObject<HTMLElement>} id="about" className="reveal py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl font-bold mb-12 text-center">About Me</h2>

        <p className="text-lg text-center text-base-content/70 mb-8 max-w-3xl mx-auto">
          Senior Software Developer with over 6 years of experience leading successful software
          design and development projects with a strong focus on cloud-native architectures.
        </p>

        {/* My Journey */}
        <div className="relative p-6 rounded-2xl border border-base-content/5 bg-base-100/10 backdrop-blur-sm hover:bg-base-100/50 transition-colors mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4">My Journey</h3>
            <div className="space-y-4 text-sm leading-relaxed text-base-content/80">
              <p>
                Over the last 7+ years, I've built and maintained production-grade systems for
                banking applications serving millions of customers – from leading technical teams to
                architecting scalable microservices platforms and completing critical cloud
                migrations to AWS.
              </p>
              <p>
                I care about cost efficiency, developer experience, and real-world reliability. I
                pick up new tools quickly and constantly look for ways to improve systems, reduce
                costs, and boost team velocity.
              </p>
            </div>
          </div>
        </div>

        {/* Key Achievements */}
        <div className="relative p-6 rounded-2xl border border-base-content/5 bg-base-100/10 backdrop-blur-sm hover:bg-base-100/50 transition-colors mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Key Achievements</h3>
            <ul className="space-y-3 text-sm leading-relaxed">
              <li className="flex gap-3">
                <span className="text-primary mt-1">•</span>
                <div>
                  <span className="font-semibold">BMO & Bank of the West Merger:</span> Led the
                  development and seamless integration of a scalable microservices platform,
                  facilitating the onboarding of approximately 1.8 million new customers to the
                  bank.
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary mt-1">•</span>
                <div>
                  <span className="font-semibold">AWS Cloud Migration:</span> Completed migration of
                  in-house Java/Spring Boot applications and on-premise services to AWS cloud,
                  including CI/CD pipelines implementation and cloud cost optimization.
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary mt-1">•</span>
                <div>
                  <span className="font-semibold">Performance Optimization:</span> Designed and
                  executed optimized, multithreaded solution for credit card processing, reducing
                  vendor communication by 25% and minimizing CPU/memory consumption.
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary mt-1">•</span>
                <div>
                  <span className="font-semibold">Zero Downtime Deployments:</span> Designed and
                  implemented blue/green deployments ensuring zero downtime during application
                  rollouts with OpenSearch, ELK, and Dynatrace integration.
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary mt-1">•</span>
                <div>
                  <span className="font-semibold">SSO Implementation:</span> Implemented SSO
                  functionality for retail and small business customers using SAML and proprietary
                  tokens, enabling seamless single sign-on to vendor platforms.
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
