import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import Contact from './Contact'

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    h2: ({ children, whileInView, viewport, ...props }: any) => <h2 {...props}>{children}</h2>,
    a: ({ children, whileInView, viewport, ...props }: any) => <a {...props}>{children}</a>,
  },
}))

describe('Contact', () => {
  describe('Rendering', () => {
    it('should render the section heading', () => {
      render(<Contact />)
      expect(screen.getByText('Get In Touch')).toBeInTheDocument()
    })

    it('should render all contact methods', () => {
      render(<Contact />)

      expect(screen.getByText('Email')).toBeInTheDocument()
      expect(screen.getByText('LinkedIn')).toBeInTheDocument()
      expect(screen.getByText('GitHub')).toBeInTheDocument()
    })

    it('should display correct email address', () => {
      render(<Contact />)
      expect(screen.getByText('rushhv@gmail.com')).toBeInTheDocument()
    })

    it('should display correct LinkedIn URL', () => {
      render(<Contact />)
      expect(screen.getByText('linkedin.com/in/rushabhvakharwala/')).toBeInTheDocument()
    })

    it('should display correct GitHub URL', () => {
      render(<Contact />)
      expect(screen.getByText('github.com/TheRushh')).toBeInTheDocument()
    })
  })

  describe('Links', () => {
    it('should have correct email link', () => {
      render(<Contact />)
      const emailCard = screen.getByText('rushhv@gmail.com').closest('a')

      expect(emailCard).toHaveAttribute('href', 'mailto:rushhv@gmail.com')
    })

    it('should have correct LinkedIn link', () => {
      render(<Contact />)
      const linkedinCard = screen.getByText('linkedin.com/in/rushabhvakharwala/').closest('a')

      expect(linkedinCard).toHaveAttribute('href', 'https://www.linkedin.com/in/rushabhvakharwala/')
    })

    it('should have correct GitHub link', () => {
      render(<Contact />)
      const githubCard = screen.getByText('github.com/TheRushh').closest('a')

      expect(githubCard).toHaveAttribute('href', 'https://github.com/TheRushh')
    })

    it('should open LinkedIn link in new tab', () => {
      render(<Contact />)
      const linkedinCard = screen.getByText('linkedin.com/in/rushabhvakharwala/').closest('a')

      expect(linkedinCard).toHaveAttribute('target', '_blank')
      expect(linkedinCard).toHaveAttribute('rel', 'noopener noreferrer')
    })

    it('should open GitHub link in new tab', () => {
      render(<Contact />)
      const githubCard = screen.getByText('github.com/TheRushh').closest('a')

      expect(githubCard).toHaveAttribute('target', '_blank')
      expect(githubCard).toHaveAttribute('rel', 'noopener noreferrer')
    })

    it('should NOT open email link in new tab', () => {
      render(<Contact />)
      const emailCard = screen.getByText('rushhv@gmail.com').closest('a')

      expect(emailCard).not.toHaveAttribute('target')
      expect(emailCard).not.toHaveAttribute('rel', 'noopener noreferrer')
    })
  })

  describe('Structure', () => {
    it('should have correct section ID', () => {
      const { container } = render(<Contact />)
      const section = container.querySelector('section')

      expect(section).toHaveAttribute('id', 'contact')
    })

    it('should render contact cards with correct classes', () => {
      const { container } = render(<Contact />)
      const cards = container.querySelectorAll('.card')

      expect(cards.length).toBe(3)
    })

    it('should have icons for each contact method', () => {
      const { container } = render(<Contact />)
      const svgs = container.querySelectorAll('svg')

      // Should have 3 SVG icons (one for each contact method)
      expect(svgs.length).toBe(3)
    })
  })

  describe('Responsive grid', () => {
    it('should use responsive grid classes', () => {
      const { container } = render(<Contact />)
      const grid = container.querySelector('.grid')

      expect(grid).toHaveClass('grid-cols-1')
      expect(grid).toHaveClass('md:grid-cols-3')
    })
  })

  describe('Accessibility', () => {
    it('should have proper heading hierarchy', () => {
      render(<Contact />)
      const heading = screen.getByRole('heading', { name: 'Get In Touch' })

      expect(heading.tagName).toBe('H2')
    })

    it('should have proper card titles', () => {
      render(<Contact />)

      const emailTitle = screen.getByText('Email').closest('h3')
      const linkedinTitle = screen.getByText('LinkedIn').closest('h3')
      const githubTitle = screen.getByText('GitHub').closest('h3')

      expect(emailTitle).toBeInTheDocument()
      expect(linkedinTitle).toBeInTheDocument()
      expect(githubTitle).toBeInTheDocument()
    })

    it('should have accessible links', () => {
      render(<Contact />)
      const links = screen.getAllByRole('link')

      // Should have 3 links
      expect(links.length).toBe(3)

      // All links should have href attributes
      links.forEach(link => {
        expect(link).toHaveAttribute('href')
      })
    })
  })

  describe('Visual styles', () => {
    it('should have hover effects on cards', () => {
      const { container } = render(<Contact />)
      const cards = container.querySelectorAll('.card')

      cards.forEach(card => {
        expect(card).toHaveClass('hover:shadow-md')
      })
    })

    it('should have transition classes', () => {
      const { container } = render(<Contact />)
      const cards = container.querySelectorAll('.card')

      cards.forEach(card => {
        expect(card).toHaveClass('transition-shadow')
      })
    })
  })
})
