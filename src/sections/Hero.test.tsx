import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Hero from './Hero'

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.ComponentPropsWithoutRef<'div'>) => (
      <div {...props}>{children}</div>
    ),
    h1: ({ children, ...props }: React.ComponentPropsWithoutRef<'h1'>) => (
      <h1 {...props}>{children}</h1>
    ),
    h2: ({ children, ...props }: React.ComponentPropsWithoutRef<'h2'>) => (
      <h2 {...props}>{children}</h2>
    ),
    p: ({ children, ...props }: React.ComponentPropsWithoutRef<'p'>) => (
      <p {...props}>{children}</p>
    ),
    button: ({ children, ...props }: React.ComponentPropsWithoutRef<'button'>) => (
      <button {...props}>{children}</button>
    ),
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))

describe('Hero', () => {
  beforeEach(() => {
    // Reset DOM
    document.body.innerHTML = ''
  })

  describe('Rendering', () => {
    it('should render the main heading with name', () => {
      render(<Hero />)
      expect(screen.getByText('Rushabh')).toBeInTheDocument()
      expect(screen.getByText('Vakharwala')).toBeInTheDocument()
    })

    it('should render the job title', () => {
      render(<Hero />)
      expect(screen.getByText('Lead Software Developer')).toBeInTheDocument()
    })

    it('should render the tagline', () => {
      render(<Hero />)
      expect(
        screen.getByText('Senior Software Developer with a focus on cloud-native architectures.')
      ).toBeInTheDocument()
    })

    it('should render the CTA buttons', () => {
      render(<Hero />)
      expect(screen.getByRole('button', { name: /learn more/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /get in touch/i })).toBeInTheDocument()
    })

    it('should render the profile image', () => {
      render(<Hero />)
      const image = screen.getByAltText('Rushabh Vakharwala')
      expect(image).toBeInTheDocument()
      expect(image).toHaveAttribute('src', '/images/profile.jpg')
    })

    it('should render the badge', () => {
      render(<Hero />)
      expect(screen.getByText('Leading Engineering Teams at BMO')).toBeInTheDocument()
    })
  })

  describe('Layout', () => {
    it('should use grid layout for content', () => {
      const { container } = render(<Hero />)
      const grid = container.querySelector('.grid')
      expect(grid).toBeInTheDocument()
    })

    it('should have proper vertical centering', () => {
      const { container } = render(<Hero />)
      const section = container.querySelector('section')
      expect(section).toHaveClass('flex')
      expect(section).toHaveClass('flex-col')
      expect(section).toHaveClass('justify-center')
    })

    it('should have correct min-height for full screen', () => {
      const { container } = render(<Hero />)
      const section = container.querySelector('section')
      expect(section).toHaveClass('min-h-screen')
    })
  })

  describe('Content ordering', () => {
    it('should have text content with order-2', () => {
      const { container } = render(<Hero />)
      const textContent = container.querySelector('.order-2')
      expect(textContent).toBeInTheDocument()
    })

    it('should have image content with order-1', () => {
      const { container } = render(<Hero />)
      const imageContent = container.querySelector('.order-1')
      expect(imageContent).toBeInTheDocument()
    })
  })

  describe('Interactions', () => {
    it('should scroll to about section when Learn More is clicked', async () => {
      const user = userEvent.setup()

      // Create a mock about section
      const aboutSection = document.createElement('section')
      aboutSection.id = 'about'
      aboutSection.scrollIntoView = vi.fn()
      document.body.appendChild(aboutSection)

      render(<Hero />)
      const button = screen.getByRole('button', { name: /learn more/i })
      await user.click(button)

      expect(aboutSection.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' })
    })

    it('should scroll to contact section when Get in Touch is clicked', async () => {
      const user = userEvent.setup()

      // Create a mock contact section
      const contactSection = document.createElement('section')
      contactSection.id = 'contact'
      contactSection.scrollIntoView = vi.fn()
      document.body.appendChild(contactSection)

      render(<Hero />)
      const button = screen.getByRole('button', { name: /get in touch/i })
      await user.click(button)

      expect(contactSection.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' })
    })

    it('should handle missing sections gracefully', async () => {
      const user = userEvent.setup()
      render(<Hero />)

      const learnMoreBtn = screen.getByRole('button', { name: /learn more/i })
      const contactBtn = screen.getByRole('button', { name: /get in touch/i })

      // Should not throw error
      await expect(user.click(learnMoreBtn)).resolves.not.toThrow()
      await expect(user.click(contactBtn)).resolves.not.toThrow()
    })
  })

  describe('Image effects', () => {
    it('should have proper image sizing', () => {
      const { container } = render(<Hero />)
      const imageWrapper = container.querySelector('.w-72.h-72')
      expect(imageWrapper).toBeInTheDocument()
    })

    it('should have glow effect element', () => {
      const { container } = render(<Hero />)
      const glowEffect = container.querySelector('.blur-3xl')
      expect(glowEffect).toBeInTheDocument()
    })
  })

  describe('Theme awareness', () => {
    it('should show dark overlay in dark mode', () => {
      document.documentElement.setAttribute('data-theme', 'dark')
      const { container } = render(<Hero />)

      const darkOverlay = container.querySelector('.bg-black\\/10')
      expect(darkOverlay).toBeInTheDocument()
      expect(darkOverlay).toHaveClass('opacity-100')
    })

    it('should hide dark overlay in light mode', () => {
      document.documentElement.setAttribute('data-theme', 'light')
      const { container } = render(<Hero />)

      const darkOverlay = container.querySelector('.bg-black\\/10')
      expect(darkOverlay).toBeInTheDocument()
      expect(darkOverlay).toHaveClass('opacity-0')
    })
  })

  describe('Stats Grid', () => {
    it('should render all stats stats', () => {
      render(<Hero />)
      expect(screen.getByText('USERS ONBOARDED')).toBeInTheDocument()
      expect(screen.getByText('1.8M+')).toBeInTheDocument()
      expect(screen.getByText('TEAM SIZE LED')).toBeInTheDocument()
      expect(screen.getByText('4-6 Devs')).toBeInTheDocument()
      expect(screen.getByText('SYSTEM UPTIME')).toBeInTheDocument()
      expect(screen.getByText('99.99%')).toBeInTheDocument()
      expect(screen.getByText('EXPERIENCE')).toBeInTheDocument()
      expect(screen.getByText('7+ Years')).toBeInTheDocument()
    })
  })

  describe('Responsive text sizing', () => {
    it('should have responsive heading classes', () => {
      render(<Hero />)
      const heading = screen.getByRole('heading', { level: 1 })

      expect(heading).toHaveClass('text-5xl')
      expect(heading).toHaveClass('md:text-6xl')
      expect(heading).toHaveClass('lg:text-7xl')
    })

    it('should have responsive subtitle classes', () => {
      render(<Hero />)
      const subtitle = screen.getByText('Lead Software Developer')

      expect(subtitle).toHaveClass('text-2xl')
      expect(subtitle).toHaveClass('md:text-3xl')
    })

    it('should have responsive tagline classes', () => {
      render(<Hero />)
      const tagline = screen.getByText(
        'Senior Software Developer with a focus on cloud-native architectures.'
      )

      expect(tagline).toHaveClass('text-lg')
      expect(tagline).toHaveClass('md:text-xl')
    })
  })

  describe('Visual styling', () => {
    it('should have primary color for job title', () => {
      render(<Hero />)
      const jobTitle = screen.getByText('Lead Software Developer')
      expect(jobTitle).toHaveClass('text-primary')
    })

    it('should have proper button styling', () => {
      render(<Hero />)
      const button = screen.getByRole('button', { name: /learn more/i })

      expect(button).toHaveClass('btn')
      expect(button).toHaveClass('btn-primary')
    })
  })
})
