import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Header from './Header'
import { ThemeProvider } from '../contexts/ThemeContext'

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    header: ({ children, ...props }: any) => <header {...props}>{children}</header>,
    svg: ({ children, ...props }: any) => <svg {...props}>{children}</svg>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}))

describe('Header', () => {
  beforeEach(() => {
    // Clear any existing elements with test IDs
    document.body.innerHTML = ''
  })

  const renderHeader = () => {
    return render(
      <ThemeProvider>
        <Header />
      </ThemeProvider>
    )
  }

  describe('Rendering', () => {
    it('should render the logo', () => {
      renderHeader()
      expect(screen.getByText(/rushh/i)).toBeInTheDocument()
      expect(screen.getByText(/\.dev/i)).toBeInTheDocument()
    })

    it('should render all menu items', () => {
      renderHeader()
      const menuItems = ['about', 'projects', 'experience', 'education', 'contact']

      menuItems.forEach((item) => {
        const elements = screen.getAllByText(item, { exact: false })
        expect(elements.length).toBeGreaterThan(0)
      })
    })

    it('should render GitHub link with correct attributes', () => {
      renderHeader()
      const githubLink = screen.getByLabelText('GitHub')

      expect(githubLink).toHaveAttribute('href', 'https://github.com/therushh')
      expect(githubLink).toHaveAttribute('target', '_blank')
      expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer')
    })

    it('should render LinkedIn link with correct attributes', () => {
      renderHeader()
      const linkedinLink = screen.getByLabelText('LinkedIn')

      expect(linkedinLink).toHaveAttribute('href', 'https://www.linkedin.com/in/rushabhvakharwala/')
      expect(linkedinLink).toHaveAttribute('target', '_blank')
      expect(linkedinLink).toHaveAttribute('rel', 'noopener noreferrer')
    })

    it('should render theme switcher', () => {
      renderHeader()
      const themeSwitcher = screen.getByLabelText('Toggle theme')
      expect(themeSwitcher).toBeInTheDocument()
    })
  })

  describe('Navigation', () => {
    it('should call scrollIntoView when menu item is clicked', async () => {
      const user = userEvent.setup()

      // Create mock sections
      const aboutSection = document.createElement('div')
      aboutSection.id = 'about'
      aboutSection.scrollIntoView = vi.fn()
      document.body.appendChild(aboutSection)

      renderHeader()

      // Find and click the about link in the desktop menu
      const aboutLinks = screen.getAllByText('about', { exact: false })
      // Filter to get the desktop menu link (not in dropdown)
      const desktopLink = aboutLinks.find(link =>
        link.closest('.menu-horizontal')
      )

      if (desktopLink) {
        await user.click(desktopLink)
        expect(aboutSection.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' })
      }
    })

    it('should handle missing section gracefully', async () => {
      const user = userEvent.setup()
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

      renderHeader()

      // Click a menu item when the section doesn't exist
      const aboutLinks = screen.getAllByText('about', { exact: false })
      const desktopLink = aboutLinks.find(link =>
        link.closest('.menu-horizontal')
      )

      if (desktopLink) {
        await user.click(desktopLink)
        // Should not throw an error
        expect(consoleSpy).not.toHaveBeenCalled()
      }

      consoleSpy.mockRestore()
    })
  })

  describe('Responsive behavior', () => {
    it('should render mobile menu button', () => {
      renderHeader()
      const mobileMenuButton = screen.getByRole('button', { name: '' })
      expect(mobileMenuButton).toHaveClass('btn-ghost')
    })

    it('should have dropdown menu for mobile', () => {
      renderHeader()
      const dropdown = document.querySelector('.dropdown')
      expect(dropdown).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('should have proper aria-labels', () => {
      renderHeader()

      expect(screen.getByLabelText('GitHub')).toBeInTheDocument()
      expect(screen.getByLabelText('LinkedIn')).toBeInTheDocument()
      expect(screen.getByLabelText('Toggle theme')).toBeInTheDocument()
    })

    it('should have clickable menu items', () => {
      renderHeader()
      const menuItems = ['about', 'projects', 'experience', 'education', 'contact']

      menuItems.forEach((item) => {
        const elements = screen.getAllByText(item, { exact: false })
        elements.forEach((element) => {
          // Check if it's a clickable element
          expect(element.tagName).toBe('A')
        })
      })
    })
  })
})
