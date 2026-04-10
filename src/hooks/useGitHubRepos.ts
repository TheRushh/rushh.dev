import { useState, useEffect } from 'react'
import type { GitHubRepo } from '@/data'

const GITHUB_USERNAME = 'TheRushh'
const PINNED_REPOS = [
  'TuneTray',
  'banking-chat',
  'banking-ai-backend',
  'malware-detector',
  'Keystroke',
  'ACCProject-SearchEngine',
]

export function useGitHubRepos() {
  const [repos, setRepos] = useState<GitHubRepo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    async function fetchRepos() {
      try {
        const res = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`,
          { signal: controller.signal }
        )
        if (!res.ok) throw new Error('Failed to fetch repos')
        const data: GitHubRepo[] = await res.json()

        // Filter to only own (non-fork) repos, sorted by pinned order then stars
        const ownRepos = data.filter(r => !r.fork)
        const pinned = PINNED_REPOS.map(name => ownRepos.find(r => r.name === name)).filter(
          Boolean
        ) as GitHubRepo[]
        const rest = ownRepos
          .filter(r => !PINNED_REPOS.includes(r.name))
          .sort((a, b) => b.stargazers_count - a.stargazers_count)

        setRepos([...pinned, ...rest])
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          setError('Could not load GitHub repos')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchRepos()
    return () => controller.abort()
  }, [])

  return { repos, loading, error }
}
