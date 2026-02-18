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
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Rushabh/i)
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Vakharwala/i)
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
      expect(screen.getByRole('button', { name: /learn more/i })).toBeInTheDocument()
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
      expect(section).toHaveClass('justify-center')
    })

    it('should have correct min-height for full screen', () => {
      const { container } = render(<Hero />)
      const section = container.querySelector('section')
      expect(section).toHaveClass('min-h-screen')
    })
  })

  describe('Content ordering', () => {
    it('should have text content with order-2 on desktop', () => {
      const { container } = render(<Hero />)
      const textContent = container.querySelector('.order-2.lg\\:order-2')
      expect(textContent).toBeInTheDocument()
    })

    it('should have image content with order-1 on desktop', () => {
      const { container } = render(<Hero />)
      const imageContent = container.querySelector('.order-1.lg\\:order-1')
      expect(imageContent).toBeInTheDocument()
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
      const button = screen.getByRole('button', { name: /learn more/i })
      await user.click(button)

      expect(aboutSection.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' })
    })

    it('should handle missing about section gracefully', async () => {
      const user = userEvent.setup()
      render(<Hero />)

      const button = screen.getByRole('button', { name: /learn more/i })

      // Should not throw error
      await expect(user.click(button)).resolves.not.toThrow()
    })
  })

  describe('Image effects', () => {
    it('should have proper image sizing', () => {
      const { container } = render(<Hero />)
      const imageWrapper = container.querySelector('.w-64.h-64')
      expect(imageWrapper).toBeInTheDocument()
    })

    it('should have rounded corners on image', () => {
      render(<Hero />)
      const image = screen.getByAltText('Rushabh Vakharwala')
      // Implementation uses rounded-[2rem]
      expect(image.className).toContain('rounded-[2rem]')
    })

    it('should have glow effect element', () => {
      const { container } = render(<Hero />)
      // Implementation uses blur-3xl for the glow behind image
      const glowEffect = container.querySelector('.blur-3xl')
      expect(glowEffect).toBeInTheDocument()
    })
  })

  describe('Theme awareness', () => {
    // Overlays were removed in favor of consistent styling
    it('should have background ambience elements', () => {
      const { container } = render(<Hero />)
      const blurredBlob = container.querySelector('.blur-\\[100px\\]')
      expect(blurredBlob).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('should have proper heading hierarchy', () => {
      render(<Hero />)
      const h1 = screen.getByRole('heading', { level: 1 })
      const h2 = screen.getByRole('heading', { level: 2 })

      expect(h1).toHaveTextContent(/Rushabh/i)
      expect(h2).toHaveTextContent('Lead Software Developer')
    })

    it('should have accessible image alt text', () => {
      render(<Hero />)
      const image = screen.getByAltText('Rushabh Vakharwala')
      expect(image).toBeInTheDocument()
    })

    it('should have clickable button', () => {
      render(<Hero />)
      const button = screen.getByRole('button', { name: /learn more/i })
      expect(button).toBeEnabled()
    })
  })

  describe('Responsive text sizing', () => {
    it('should have responsive heading classes', () => {
      render(<Hero />)
      const heading = screen.getByRole('heading', { level: 1 })

      expect(heading).toHaveClass('text-4xl')
      expect(heading).toHaveClass('md:text-6xl')
      expect(heading).toHaveClass('lg:text-7xl')
    })

    it('should have responsive subtitle classes', () => {
      render(<Hero />)
      const subtitle = screen.getByText('Lead Software Developer')

      expect(subtitle).toHaveClass('text-xl')
      expect(subtitle).toHaveClass('md:text-3xl')
    })
  })

  describe('Visual styling', () => {
    it('should have proper button styling', () => {
      render(<Hero />)
      const button = screen.getByRole('button', { name: /learn more/i })

      expect(button).toHaveClass('btn')
      expect(button).toHaveClass('bg-primary')
    })

    it('should have proper spacing classes', () => {
      const { container } = render(<Hero />)
      const grid = container.querySelector('.grid')

      expect(grid.className).toContain('gap-12')
    })
  })
})
