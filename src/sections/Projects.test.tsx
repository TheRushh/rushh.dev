import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
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
  },
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
  }
})

describe('Projects', () => {
  describe('Rendering', () => {
    it('should render the section heading', () => {
      render(<Projects />)
      expect(screen.getByText('Projects')).toBeInTheDocument()
    })

    it('should render all 6 projects', () => {
      const { container } = render(<Projects />)
      const projectCards = container.querySelectorAll('.card')

      expect(projectCards.length).toBe(6)
    })

    it('should render project titles', () => {
      render(<Projects />)

      expect(screen.getByText('Cloud-Native Insights Engine')).toBeInTheDocument()
      expect(screen.getByText('Enterprise Security Hub')).toBeInTheDocument()
      expect(screen.getByText('SSO Vendor Integration')).toBeInTheDocument()
      expect(screen.getByText('Optimized Multithreaded Solution')).toBeInTheDocument()
      expect(screen.getByText('Cloud Migration & CI/CD')).toBeInTheDocument()
      expect(screen.getByText('BMO / Bank of the West Merger')).toBeInTheDocument()
    })
  })

  describe('Project descriptions', () => {
    it('should display Cloud-Native Insights Engine description', () => {
      render(<Projects />)
      expect(screen.getByText(/Predicted upcoming debit\/credit transactions/i)).toBeInTheDocument()
    })

    it('should display Enterprise Security Hub description', () => {
      render(<Projects />)
      expect(
        screen.getByText(/Developed security features and a relational database/i)
      ).toBeInTheDocument()
    })

    it('should display SSO Vendor Integration description', () => {
      render(<Projects />)
      expect(
        screen.getByText(/Implemented SSO \(SAML\) for retail\/business customers/i)
      ).toBeInTheDocument()
    })
  })

  describe('Technology badges', () => {
    it('should display technology badges for Cloud-Native Insights Engine', () => {
      render(<Projects />)

      expect(screen.getByText('AWS SQS')).toBeInTheDocument()
      expect(screen.getByText('AWS SNS')).toBeInTheDocument()
      expect(screen.getAllByText('Java').length).toBeGreaterThan(0)
    })

    it('should display technology badges for Enterprise Security Hub', () => {
      render(<Projects />)

      expect(screen.getByText('Oracle DB')).toBeInTheDocument()
      const securityBadges = screen.getAllByText('Security')
      expect(securityBadges.length).toBeGreaterThan(0)
    })

    it('should display technology badges for SSO Vendor Integration', () => {
      render(<Projects />)

      const samlBadges = screen.getAllByText('SAML')
      expect(samlBadges.length).toBeGreaterThan(0)
      const angularBadges = screen.getAllByText('Angular')
      expect(angularBadges.length).toBeGreaterThan(0)
    })

    it('should display technology badges for Optimized Multithreaded Solution', () => {
      render(<Projects />)

      expect(screen.getByText('Multithreading')).toBeInTheDocument()
      expect(screen.getByText('Async API')).toBeInTheDocument()
    })

    it('should display technology badges for Cloud Migration & CI/CD', () => {
      render(<Projects />)

      const awsBadges = screen.getAllByText('AWS')
      expect(awsBadges.length).toBeGreaterThan(0)
      const springBootBadges = screen.getAllByText('Spring Boot')
      expect(springBootBadges.length).toBeGreaterThan(0)
      expect(screen.getByText('AWS Lambda')).toBeInTheDocument()
      expect(screen.getByText('CI/CD')).toBeInTheDocument()
    })

    it('should display technology badges for BMO merger project', () => {
      render(<Projects />)

      expect(screen.getByText('Microservices')).toBeInTheDocument()
    })
  })

  describe('Technology icons', () => {
    it('should render icons for technologies', () => {
      const { container } = render(<Projects />)
      const badges = container.querySelectorAll('.badge')

      // Each badge should contain an icon or text
      expect(badges.length).toBeGreaterThan(0)
    })

    it('should display AWS icons', () => {
      render(<Projects />)
      const amazonIcons = screen.getAllByTestId('icon-amazon')

      // AWS icons should appear for AWS-related badges
      expect(amazonIcons.length).toBeGreaterThan(0)
    })

    it('should display Java icons', () => {
      render(<Projects />)
      const javaIcons = screen.getAllByTestId('icon-java')

      // Java icons should appear multiple times
      expect(javaIcons.length).toBeGreaterThan(0)
    })
  })

  describe('Structure', () => {
    it('should have correct section ID', () => {
      const { container } = render(<Projects />)
      const section = container.querySelector('section')

      expect(section).toHaveAttribute('id', 'projects')
    })

    it('should use responsive grid layout', () => {
      const { container } = render(<Projects />)
      const grid = container.querySelector('.grid')

      expect(grid).toHaveClass('grid-cols-1')
      expect(grid).toHaveClass('md:grid-cols-2')
      expect(grid).toHaveClass('lg:grid-cols-3')
    })

    it('should have card structure for each project', () => {
      const { container } = render(<Projects />)
      const cards = container.querySelectorAll('.card')

      cards.forEach(card => {
        const cardBody = card.querySelector('.card-body')
        expect(cardBody).toBeInTheDocument()
      })
    })
  })

  describe('Visual styling', () => {
    it('should have hover effects on cards', () => {
      const { container } = render(<Projects />)
      const cards = container.querySelectorAll('.card')

      cards.forEach(card => {
        expect(card).toHaveClass('hover:shadow-md')
      })
    })

    it('should have transition effects', () => {
      const { container } = render(<Projects />)
      const cards = container.querySelectorAll('.card')

      cards.forEach(card => {
        expect(card).toHaveClass('transition-shadow')
      })
    })

    it('should have proper badge styling', () => {
      const { container } = render(<Projects />)
      const badges = container.querySelectorAll('.badge')

      badges.forEach(badge => {
        expect(badge).toHaveClass('badge-outline')
      })
    })
  })

  describe('Content validation', () => {
    it('should have non-empty descriptions for all projects', () => {
      const { container } = render(<Projects />)
      const descriptions = container.querySelectorAll('.card-body p')

      descriptions.forEach(desc => {
        expect(desc.textContent).not.toBe('')
        expect(desc.textContent!.length).toBeGreaterThan(10)
      })
    })

    it('should have at least one technology per project', () => {
      const { container } = render(<Projects />)
      const cards = container.querySelectorAll('.card')

      cards.forEach(card => {
        const badges = card.querySelectorAll('.badge')
        expect(badges.length).toBeGreaterThan(0)
      })
    })
  })

  describe('Accessibility', () => {
    it('should have proper heading hierarchy', () => {
      render(<Projects />)
      const heading = screen.getByRole('heading', { name: 'Projects' })

      expect(heading.tagName).toBe('H2')
    })

    it('should have heading for each project', () => {
      const { container } = render(<Projects />)
      const projectTitles = container.querySelectorAll('.card-title')

      expect(projectTitles.length).toBe(6)
    })
  })

  describe('Data consistency', () => {
    it('should not have duplicate project titles', () => {
      const { container } = render(<Projects />)
      const titles = Array.from(container.querySelectorAll('.card-title')).map(el => el.textContent)

      const uniqueTitles = new Set(titles)
      expect(uniqueTitles.size).toBe(titles.length)
    })

    it('should have consistent card structure', () => {
      const { container } = render(<Projects />)
      const cards = container.querySelectorAll('.card')

      cards.forEach(card => {
        // Each card should have title, description, and tech badges
        expect(card.querySelector('.card-title')).toBeInTheDocument()
        expect(card.querySelector('.card-body p')).toBeInTheDocument()
        expect(card.querySelector('.card-actions')).toBeInTheDocument()
      })
    })
  })
})
