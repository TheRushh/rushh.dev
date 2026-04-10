import { useState, useRef, useEffect } from 'react'
import { useReveal } from '@/hooks/useReveal'
import { SiGithub } from 'react-icons/si'
import { FaStar, FaCodeBranch, FaExternalLinkAlt, FaBriefcase } from 'react-icons/fa'
import { projects, techIcons } from '@/data'
import { useGitHubRepos } from '@/hooks/useGitHubRepos'

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Python: '#3572A5',
  Java: '#b07219',
  Ruby: '#701516',
  Go: '#00ADD8',
  Rust: '#dea584',
  Swift: '#F05138',
  Kotlin: '#A97BFF',
  'C++': '#f34b7d',
  C: '#555555',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Shell: '#89e051',
}

type Tab = 'github' | 'work'

const Projects = () => {
  const [activeTab, setActiveTab] = useState<Tab>('github')
  const { repos, loading, error } = useGitHubRepos()
  const ref = useReveal()
  const scrollRef = useRef<HTMLDivElement>(null)

  const switchTab = (tab: Tab) => {
    setActiveTab(tab)
    const el = scrollRef.current
    if (!el) return
    const idx = tab === 'github' ? 0 : 1
    el.scrollTo({ left: idx * el.offsetWidth, behavior: 'smooth' })
  }

  // Sync scroll position when tab changes programmatically
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const idx = activeTab === 'github' ? 0 : 1
    el.scrollTo({ left: idx * el.offsetWidth, behavior: 'smooth' })
  }, [activeTab])

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="projects"
      className="reveal py-20 overflow-hidden"
    >
      <div className="container mx-auto max-w-6xl px-4">
        <h2 className="text-4xl font-bold mb-8 text-center">Projects</h2>

        {/* Tabs */}
        <div className="flex justify-center mb-10">
          <div className="flex gap-1 p-1 rounded-xl bg-base-content/5 border border-base-content/5">
            {(['github', 'work'] as Tab[]).map(tab => (
              <button
                key={tab}
                onClick={() => switchTab(tab)}
                className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeTab === tab
                    ? 'bg-primary text-primary-content shadow-sm'
                    : 'text-base-content/60 hover:text-base-content hover:bg-base-content/5'
                }`}
              >
                {tab === 'github' && <SiGithub className="w-3.5 h-3.5" />}
                {tab === 'work' && <FaBriefcase className="w-3.5 h-3.5" />}
                {tab === 'work' ? 'Work Projects' : 'GitHub'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Full-width scroll container */}
      <div
        ref={scrollRef}
        className="flex w-screen overflow-x-hidden pointer-events-none"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {/* GitHub panel */}
        <div className="w-screen shrink-0 pointer-events-auto" style={{ scrollSnapAlign: 'start' }}>
          <div className="container mx-auto max-w-6xl px-4">
            {loading && (
              <div className="flex justify-center py-16">
                <span className="loading loading-spinner loading-md text-primary" />
              </div>
            )}
            {error && <p className="text-center text-base-content/50 py-16">{error}</p>}
            {!loading && !error && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {repos.map(repo => (
                  <a
                    key={repo.id}
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative h-full p-6 rounded-2xl border border-base-content/5 bg-base-100/10 backdrop-blur-sm hover:bg-base-100/50 hover:border-base-content/10 transition-all group flex flex-col"
                  >
                    <div className="flex items-start justify-between mb-3 gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <SiGithub className="w-4 h-4 text-base-content/40 shrink-0" />
                        <span className="font-semibold text-base truncate group-hover:text-primary transition-colors">
                          {repo.name}
                        </span>
                      </div>
                      <FaExternalLinkAlt className="w-3 h-3 text-base-content/20 group-hover:text-base-content/50 transition-colors shrink-0 mt-1" />
                    </div>
                    <p className="text-sm text-base-content/60 flex-grow mb-4 leading-relaxed">
                      {repo.description || (
                        <span className="italic text-base-content/30">No description</span>
                      )}
                    </p>
                    {repo.topics.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {repo.topics.slice(0, 4).map(topic => (
                          <span
                            key={topic}
                            className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="flex items-center gap-4 text-xs text-base-content/40">
                      {repo.language && (
                        <span className="flex items-center gap-1.5">
                          <span
                            className="w-2.5 h-2.5 rounded-full shrink-0"
                            style={{ backgroundColor: LANGUAGE_COLORS[repo.language] ?? '#8b949e' }}
                          />
                          {repo.language}
                        </span>
                      )}
                      {repo.stargazers_count > 0 && (
                        <span className="flex items-center gap-1">
                          <FaStar className="w-3 h-3" />
                          {repo.stargazers_count}
                        </span>
                      )}
                      {repo.forks_count > 0 && (
                        <span className="flex items-center gap-1">
                          <FaCodeBranch className="w-3 h-3" />
                          {repo.forks_count}
                        </span>
                      )}
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Work panel */}
        <div className="w-screen shrink-0 pointer-events-auto" style={{ scrollSnapAlign: 'start' }}>
          <div className="container mx-auto max-w-6xl px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map(project => (
                <div
                  key={project.title}
                  className="relative h-full p-6 rounded-2xl border border-base-content/5 bg-base-100/10 backdrop-blur-sm hover:bg-base-100/50 transition-colors group"
                >
                  <div className="flex flex-col h-full">
                    <div className="flex items-start justify-between mb-3 gap-2">
                      <h3 className="text-lg font-bold leading-snug">{project.title}</h3>
                      <div className="flex gap-2 shrink-0">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-base-content/40 hover:text-base-content transition-colors"
                            aria-label="GitHub"
                          >
                            <SiGithub className="w-4 h-4" />
                          </a>
                        )}
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-base-content/40 hover:text-base-content transition-colors"
                            aria-label="Live site"
                          >
                            <FaExternalLinkAlt className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    </div>
                    <p className="text-sm mb-4 flex-grow text-base-content/70">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map(tech => {
                        const Icon = techIcons[tech]
                        return (
                          <span
                            key={tech}
                            className="badge badge-outline badge-sm gap-1.5 py-2.5 transition-colors duration-300"
                          >
                            {Icon && <Icon className="w-3 h-3 transition-colors duration-300" />}
                            {tech}
                          </span>
                        )
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Projects
