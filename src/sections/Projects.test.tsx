import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Projects from './Projects'

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    h2: ({ children, ...props }: React.ComponentPropsWithoutRef<'h2'>) => (
      <h2 {...props}>{children}</h2>
    ),
    div: ({ children, ...props }: React.ComponentPropsWithoutRef<'div'>) => (
      <div {...props}>{children}</div>
    ),
    a: ({ children, ...props }: React.ComponentPropsWithoutRef<'a'>) => (
      <a {...props}>{children}</a>
    ),
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))

// Mock the GitHub hook
vi.mock('@/hooks/useGitHubRepos', () => ({
  useGitHubRepos: () => ({
    repos: [
      {
        id: 1,
        name: 'TuneTray',
        description: 'A music tray application',
        html_url: 'https://github.com/TheRushh/TuneTray',
        homepage: null,
        language: 'JavaScript',
        stargazers_count: 1,
        forks_count: 0,
        topics: ['music', 'electron'],
        updated_at: '2024-01-01T00:00:00Z',
        fork: false,
      },
      {
        id: 2,
        name: 'banking-chat',
        description: 'Banking chatbot application',
        html_url: 'https://github.com/TheRushh/banking-chat',
        homepage: null,
        language: 'TypeScript',
        stargazers_count: 0,
        forks_count: 0,
        topics: [],
        updated_at: '2024-01-01T00:00:00Z',
        fork: false,
      },
    ],
    loading: false,
    error: null,
  }),
}))

// Mock react-icons
vi.mock('react-icons/si', async importOriginal => {
  const actual = (await importOriginal()) as Record<string, unknown>
  return {
    ...actual,
    SiAmazon: () => <span data-testid="icon-amazon">AWS</span>,
    SiOracle: () => <span data-testid="icon-oracle">Oracle</span>,
    SiAngular: () => <span data-testid="icon-angular">Angular</span>,
    SiSpringboot: () => <span data-testid="icon-springboot">Spring</span>,
    SiGithub: () => <span data-testid="icon-github">GitHub</span>,
  }
})

vi.mock('react-icons/fa', async importOriginal => {
  const actual = (await importOriginal()) as Record<string, unknown>
  return {
    ...actual,
    FaJava: () => <span data-testid="icon-java">Java</span>,
    FaShieldAlt: () => <span data-testid="icon-security">Security</span>,
    FaKey: () => <span data-testid="icon-key">SAML</span>,
    FaLayerGroup: () => <span data-testid="icon-layers">Layers</span>,
    FaExchangeAlt: () => <span data-testid="icon-exchange">Exchange</span>,
    FaRocket: () => <span data-testid="icon-rocket">Rocket</span>,
    FaCubes: () => <span data-testid="icon-cubes">Cubes</span>,
    FaStar: () => <span data-testid="icon-star">Star</span>,
    FaCodeBranch: () => <span data-testid="icon-branch">Branch</span>,
    FaExternalLinkAlt: () => <span data-testid="icon-external">External</span>,
    FaBriefcase: () => <span data-testid="icon-briefcase">Briefcase</span>,
  }
})

describe('Projects', () => {
  describe('Rendering', () => {
    it('should render the section heading', () => {
      render(<Projects />)
      expect(screen.getByRole('heading', { level: 2, name: 'Projects' })).toBeInTheDocument()
    })

    it('should render tab buttons', () => {
      render(<Projects />)
      expect(screen.getByRole('button', { name: /Work Projects/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /GitHub/i })).toBeInTheDocument()
    })

    it('should show GitHub tab by default', () => {
      render(<Projects />)
      expect(screen.getByText('TuneTray')).toBeInTheDocument()
    })

    it('should render all 6 work project titles when work tab is active', async () => {
      const user = userEvent.setup()
      render(<Projects />)
      await user.click(screen.getByRole('button', { name: /Work Projects/i }))
      const projectTitles = screen.getAllByRole('heading', { level: 3 })
      expect(projectTitles.length).toBe(6)
    })

    it('should render work project titles when work tab is active', async () => {
      const user = userEvent.setup()
      render(<Projects />)
      await user.click(screen.getByRole('button', { name: /Work Projects/i }))
      expect(screen.getByText('Cloud-Native Insights Engine')).toBeInTheDocument()
      expect(screen.getByText('Enterprise Security Hub')).toBeInTheDocument()
      expect(screen.getByText('SSO Vendor Integration')).toBeInTheDocument()
      expect(screen.getByText('Multithreaded Credit Card Processing')).toBeInTheDocument()
      expect(screen.getByText('Cloud Migration & CI/CD')).toBeInTheDocument()
      expect(screen.getByText('BMO / Bank of the West Merger')).toBeInTheDocument()
    })
  })

  describe('Tab switching', () => {
    it('should show GitHub content by default', () => {
      render(<Projects />)
      expect(screen.getByText('TuneTray')).toBeInTheDocument()
      expect(screen.getByText('banking-chat')).toBeInTheDocument()
    })

    it('should switch to work tab when clicked', async () => {
      const user = userEvent.setup()
      render(<Projects />)
      await user.click(screen.getByRole('button', { name: /Work Projects/i }))
      expect(screen.getByText('Cloud-Native Insights Engine')).toBeInTheDocument()
    })

    it('should switch back to github tab', async () => {
      const user = userEvent.setup()
      render(<Projects />)
      await user.click(screen.getByRole('button', { name: /Work Projects/i }))
      await user.click(screen.getByRole('button', { name: /GitHub/i }))
      expect(screen.getByText('TuneTray')).toBeInTheDocument()
    })
  })

  describe('Project descriptions', () => {
    it('should display Cloud-Native Insights Engine description', async () => {
      const user = userEvent.setup()
      render(<Projects />)
      await user.click(screen.getByRole('button', { name: /Work Projects/i }))
      expect(screen.getByText(/predicting debit\/credit transactions/i)).toBeInTheDocument()
    })

    it('should display Enterprise Security Hub description', async () => {
      const user = userEvent.setup()
      render(<Projects />)
      await user.click(screen.getByRole('button', { name: /Work Projects/i }))
      expect(screen.getByText(/Developed Security Hub with Oracle DB/i)).toBeInTheDocument()
    })

    it('should display SSO Vendor Integration description', async () => {
      const user = userEvent.setup()
      render(<Projects />)
      await user.click(screen.getByRole('button', { name: /Work Projects/i }))
      expect(screen.getByText(/Implemented SSO using SAML/i)).toBeInTheDocument()
    })
  })

  describe('Technology badges', () => {
    it('should display technology badges for Cloud-Native Insights Engine', async () => {
      const user = userEvent.setup()
      render(<Projects />)
      await user.click(screen.getByRole('button', { name: /Work Projects/i }))
      expect(screen.getByText('AWS SQS')).toBeInTheDocument()
      expect(screen.getByText('AWS SNS')).toBeInTheDocument()
      expect(screen.getAllByText('Java').length).toBeGreaterThan(0)
    })

    it('should display technology badges for Enterprise Security Hub', async () => {
      const user = userEvent.setup()
      render(<Projects />)
      await user.click(screen.getByRole('button', { name: /Work Projects/i }))
      expect(screen.getByText('Oracle DB')).toBeInTheDocument()
      const securityBadges = screen.getAllByText('Security')
      expect(securityBadges.length).toBeGreaterThan(0)
    })

    it('should display technology badges for SSO Vendor Integration', async () => {
      const user = userEvent.setup()
      render(<Projects />)
      await user.click(screen.getByRole('button', { name: /Work Projects/i }))
      const samlBadges = screen.getAllByText('SAML')
      expect(samlBadges.length).toBeGreaterThan(0)
      const angularBadges = screen.getAllByText('Angular')
      expect(angularBadges.length).toBeGreaterThan(0)
    })

    it('should display technology badges for Optimized Multithreaded Solution', async () => {
      const user = userEvent.setup()
      render(<Projects />)
      await user.click(screen.getByRole('button', { name: /Work Projects/i }))
      expect(screen.getByText('Multithreading')).toBeInTheDocument()
      expect(screen.getByText('Async API')).toBeInTheDocument()
    })

    it('should display technology badges for Cloud Migration & CI/CD', async () => {
      const user = userEvent.setup()
      render(<Projects />)
      await user.click(screen.getByRole('button', { name: /Work Projects/i }))
      const awsBadges = screen.getAllByText('AWS')
      expect(awsBadges.length).toBeGreaterThan(0)
      const springBootBadges = screen.getAllByText('Spring Boot')
      expect(springBootBadges.length).toBeGreaterThan(0)
      expect(screen.getByText('AWS Lambda')).toBeInTheDocument()
      expect(screen.getByText('CI/CD')).toBeInTheDocument()
    })

    it('should display technology badges for BMO merger project', async () => {
      const user = userEvent.setup()
      render(<Projects />)
      await user.click(screen.getByRole('button', { name: /Work Projects/i }))
      expect(screen.getByText('Microservices')).toBeInTheDocument()
    })
  })

  describe('Technology icons', () => {
    it('should render icons for technologies', async () => {
      const user = userEvent.setup()
      const { container } = render(<Projects />)
      await user.click(screen.getByRole('button', { name: /Work Projects/i }))
      const badges = container.querySelectorAll('.badge')
      expect(badges.length).toBeGreaterThan(0)
    })

    it('should display AWS icons', async () => {
      const user = userEvent.setup()
      render(<Projects />)
      await user.click(screen.getByRole('button', { name: /Work Projects/i }))
      const amazonIcons = screen.getAllByTestId('icon-amazon')
      expect(amazonIcons.length).toBeGreaterThan(0)
    })

    it('should display Java icons', async () => {
      const user = userEvent.setup()
      render(<Projects />)
      await user.click(screen.getByRole('button', { name: /Work Projects/i }))
      const javaIcons = screen.getAllByTestId('icon-java')
      expect(javaIcons.length).toBeGreaterThan(0)
    })
  })

  describe('GitHub tab', () => {
    it('should show repo name and description by default', () => {
      render(<Projects />)
      expect(screen.getByText('TuneTray')).toBeInTheDocument()
      expect(screen.getByText('A music tray application')).toBeInTheDocument()
    })

    it('should show language for repos', () => {
      render(<Projects />)
      expect(screen.getByText('JavaScript')).toBeInTheDocument()
      expect(screen.getByText('TypeScript')).toBeInTheDocument()
    })

    it('should show star count when > 0', () => {
      render(<Projects />)
      expect(screen.getByText('1')).toBeInTheDocument()
    })

    it('should render repo links', () => {
      render(<Projects />)
      const links = screen.getAllByRole('link')
      expect(links.some(l => l.getAttribute('href')?.includes('TuneTray'))).toBe(true)
    })
  })

  describe('Structure', () => {
    it('should have correct section ID', () => {
      const { container } = render(<Projects />)
      const section = container.querySelector('section')
      expect(section).toHaveAttribute('id', 'projects')
    })

    it('should use responsive grid layout on work tab', async () => {
      const user = userEvent.setup()
      const { container } = render(<Projects />)
      await user.click(screen.getByRole('button', { name: /Work Projects/i }))
      const grid = container.querySelector('.grid')
      expect(grid).toHaveClass('grid-cols-1')
      expect(grid).toHaveClass('md:grid-cols-2')
      expect(grid).toHaveClass('lg:grid-cols-3')
    })
  })

  describe('Visual styling', () => {
    it('should have hover effects on cards', () => {
      const { container } = render(<Projects />)
      const cards = container.querySelectorAll('.hover\\:bg-base-200')
      expect(cards.length).toBeGreaterThan(0)
    })

    it('should have transition effects', () => {
      const { container } = render(<Projects />)
      const cards = container.querySelectorAll('.transition-colors')
      expect(cards.length).toBeGreaterThan(0)
    })

    it('should have proper badge styling', async () => {
      const user = userEvent.setup()
      const { container } = render(<Projects />)
      await user.click(screen.getByRole('button', { name: /Work Projects/i }))
      const badges = container.querySelectorAll('.badge')
      badges.forEach(badge => {
        expect(badge).toHaveClass('badge-outline')
      })
    })
  })

  describe('Content validation', () => {
    it('should have non-empty descriptions for all work projects', async () => {
      const user = userEvent.setup()
      render(<Projects />)
      await user.click(screen.getByRole('button', { name: /Work Projects/i }))
      const descriptions = screen.getAllByText((_, element) => {
        return (
          element?.tagName.toLowerCase() === 'p' &&
          element.className.includes('text-base-content/70')
        )
      })
      expect(descriptions.length).toBe(6)
      descriptions.forEach(desc => {
        expect(desc.textContent).not.toBe('')
        expect(desc.textContent!.length).toBeGreaterThan(10)
      })
    })

    it('should have at least one technology per project', async () => {
      const user = userEvent.setup()
      const { container } = render(<Projects />)
      await user.click(screen.getByRole('button', { name: /Work Projects/i }))
      const badges = container.querySelectorAll('.badge')
      expect(badges.length).toBeGreaterThan(6)
    })
  })

  describe('Accessibility', () => {
    it('should have proper heading hierarchy', () => {
      render(<Projects />)
      const heading = screen.getByRole('heading', { level: 2, name: 'Projects' })
      expect(heading).toBeInTheDocument()
    })

    it('should have heading for each work project', async () => {
      const user = userEvent.setup()
      render(<Projects />)
      await user.click(screen.getByRole('button', { name: /Work Projects/i }))
      const projectTitles = screen.getAllByRole('heading', { level: 3 })
      expect(projectTitles.length).toBe(6)
    })
  })

  describe('Data consistency', () => {
    it('should not have duplicate project titles', async () => {
      const user = userEvent.setup()
      render(<Projects />)
      await user.click(screen.getByRole('button', { name: /Work Projects/i }))
      const titles = screen.getAllByRole('heading', { level: 3 }).map(el => el.textContent)
      const uniqueTitles = new Set(titles)
      expect(uniqueTitles.size).toBe(titles.length)
    })
  })
})
