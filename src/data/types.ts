import type { IconType } from 'react-icons'

export interface Project {
  title: string
  description: string
  tech: string[]
  githubUrl?: string
  liveUrl?: string
}

export interface GitHubRepo {
  id: number
  name: string
  description: string | null
  html_url: string
  homepage: string | null
  language: string | null
  stargazers_count: number
  forks_count: number
  topics: string[]
  updated_at: string
  fork: boolean
}

export interface Experience {
  title: string
  company: string
  period: string
  description?: string
  responsibilities?: string[]
}

export interface Education {
  title: string
  institution: string
  link: string | null
  type: 'certification' | 'degree'
}

export interface TechnicalSkillCategory {
  category: string
  skills: string[]
}

export interface TechIconMap {
  [key: string]: IconType
}
