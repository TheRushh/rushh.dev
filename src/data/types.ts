import type { IconType } from 'react-icons'

export interface Project {
  title: string
  description: string
  tech: string[]
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
