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
}))

describe('Hero', () => {
  beforeEach(() => {
    // Reset DOM
    document.body.innerHTML = ''
  })

  describe('Rendering', () => {
    it('should render the main heading with name', () => {
      render(<Hero />)
      expect(screen.getByText('Rushabh Vakharwala')).toBeInTheDocument()
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

    it('should render the CTA button', () => {
      render(<Hero />)
      expect(screen.getByRole('button', { name: /explore my work/i })).toBeInTheDocument()
    })

    it('should render the profile image', () => {
      render(<Hero />)
      const image = screen.getByAltText('Rushabh Vakharwala')
      expect(image).toBeInTheDocument()
      expect(image).toHaveAttribute('src', '/images/profile.jpg')
    })
  })

  describe('Layout', () => {
    it('should use grid layout for content', () => {
      const { container } = render(<Hero />)
      const grid = container.querySelector('.grid')
      expect(grid).toBeInTheDocument()
    })

    it('should have responsive grid columns', () => {
      const { container } = render(<Hero />)
      const grid = container.querySelector('.grid')
      expect(grid).toHaveClass('grid-cols-1')
      expect(grid).toHaveClass('lg:grid-cols-2')
    })

    it('should have proper vertical centering', () => {
      const { container } = render(<Hero />)
      const section = container.querySelector('section')
      expect(section).toHaveClass('flex')
      expect(section).toHaveClass('items-center')
    })

    it('should have correct min-height excluding header', () => {
      const { container } = render(<Hero />)
      const section = container.querySelector('section')
      expect(section?.style.minHeight).toBe('calc(100vh - 73px)')
    })
  })

  describe('Content ordering', () => {
    it('should have text content with order-2 on mobile and order-1 on large screens', () => {
      const { container } = render(<Hero />)
      const textContent = container.querySelector('.order-2')
      expect(textContent).toHaveClass('lg:order-1')
    })

    it('should have image content with order-1 on mobile and order-2 on large screens', () => {
      const { container } = render(<Hero />)
      const imageContent = container.querySelector('.order-1')
      expect(imageContent).toHaveClass('lg:order-2')
    })
  })

  describe('Interactions', () => {
    it('should scroll to about section when CTA button is clicked', async () => {
      const user = userEvent.setup()

      // Create a mock about section
      const aboutSection = document.createElement('section')
      aboutSection.id = 'about'
      aboutSection.scrollIntoView = vi.fn()
      document.body.appendChild(aboutSection)

      render(<Hero />)
      const button = screen.getByRole('button', { name: /explore my work/i })
      await user.click(button)

      expect(aboutSection.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' })
    })

    it('should handle missing about section gracefully', async () => {
      const user = userEvent.setup()
      render(<Hero />)

      const button = screen.getByRole('button', { name: /explore my work/i })

      // Should not throw error
      await expect(user.click(button)).resolves.not.toThrow()
    })
  })

  describe('Image effects', () => {
    it('should have proper image aspect ratio', () => {
      const { container } = render(<Hero />)
      const imageWrapper = container.querySelector('.aspect-square')
      expect(imageWrapper).toBeInTheDocument()
    })

    it('should have rounded corners on image', () => {
      render(<Hero />)
      const image = screen.getByAltText('Rushabh Vakharwala')
      expect(image).toHaveClass('rounded-2xl')
    })

    it('should have glow effect element', () => {
      const { container } = render(<Hero />)
      const glowEffect = container.querySelector('.blur-2xl')
      expect(glowEffect).toBeInTheDocument()
    })
  })

  describe('Theme awareness', () => {
    it('should add dark overlay in dark mode', () => {
      document.documentElement.setAttribute('data-theme', 'dark')
      const { container } = render(<Hero />)

      const darkOverlay = container.querySelector('.bg-black\\/20')
      expect(darkOverlay).toBeInTheDocument()
    })

    it('should not add dark overlay in light mode', () => {
      document.documentElement.setAttribute('data-theme', 'light')
      const { container } = render(<Hero />)

      const darkOverlay = container.querySelector('.bg-black\\/20')
      expect(darkOverlay).not.toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('should have proper heading hierarchy', () => {
      render(<Hero />)
      const h1 = screen.getByRole('heading', { level: 1 })
      const h2 = screen.getByRole('heading', { level: 2 })

      expect(h1).toHaveTextContent('Rushabh Vakharwala')
      expect(h2).toHaveTextContent('Lead Software Developer')
    })

    it('should have accessible image alt text', () => {
      render(<Hero />)
      const image = screen.getByAltText('Rushabh Vakharwala')
      expect(image).toBeInTheDocument()
    })

    it('should have clickable button', () => {
      render(<Hero />)
      const button = screen.getByRole('button', { name: /explore my work/i })
      expect(button).toBeEnabled()
    })
  })

  describe('Responsive text sizing', () => {
    it('should have responsive heading classes', () => {
      render(<Hero />)
      const heading = screen.getByText('Rushabh Vakharwala')

      expect(heading).toHaveClass('text-4xl')
      expect(heading).toHaveClass('md:text-5xl')
      expect(heading).toHaveClass('lg:text-6xl')
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
      const button = screen.getByRole('button', { name: /explore my work/i })

      expect(button).toHaveClass('btn')
      expect(button).toHaveClass('btn-ghost')
      expect(button).toHaveClass('hover:bg-base-200')
    })

    it('should have proper spacing classes', () => {
      const { container } = render(<Hero />)
      const grid = container.querySelector('.grid')

      expect(grid).toHaveClass('gap-12')
    })
  })
})
