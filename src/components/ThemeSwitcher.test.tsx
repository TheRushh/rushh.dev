import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ThemeSwitcher from './ThemeSwitcher'
import { ThemeProvider } from '../contexts/ThemeContext'

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    svg: ({ children, key, initial, animate, exit, transition, ...props }: any) => <svg {...props}>{children}</svg>,
  },
  AnimatePresence: ({ children, mode, initial }: any) => <>{children}</>,
}))

describe('ThemeSwitcher', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.removeAttribute('data-theme')
  })

  const renderThemeSwitcher = () => {
    return render(
      <ThemeProvider>
        <ThemeSwitcher />
      </ThemeProvider>
    )
  }

  describe('Rendering', () => {
    it('should render a button', () => {
      renderThemeSwitcher()
      const button = screen.getByRole('button', { name: /toggle theme/i })
      expect(button).toBeInTheDocument()
    })

    it('should have correct aria-label', () => {
      renderThemeSwitcher()
      const button = screen.getByLabelText('Toggle theme')
      expect(button).toBeInTheDocument()
    })

    it('should have correct button classes', () => {
      renderThemeSwitcher()
      const button = screen.getByRole('button', { name: /toggle theme/i })
      expect(button).toHaveClass('btn', 'btn-sm', 'btn-ghost', 'btn-circle')
    })
  })

  describe('Theme icon display', () => {
    it('should render sun icon when theme is dark', () => {
      renderThemeSwitcher()
      const svgs = document.querySelectorAll('svg')

      // Sun icon has a circle with cx="12" cy="12" r="4"
      const hasSunIcon = Array.from(svgs).some(svg => {
        const circles = svg.querySelectorAll('circle')
        return Array.from(circles).some(circle =>
          circle.getAttribute('cx') === '12' &&
          circle.getAttribute('cy') === '12' &&
          circle.getAttribute('r') === '4'
        )
      })

      expect(hasSunIcon).toBe(true)
    })

    it('should render moon icon when theme is light', async () => {
      const user = userEvent.setup()
      renderThemeSwitcher()

      const button = screen.getByRole('button', { name: /toggle theme/i })
      await user.click(button)

      await waitFor(() => {
        const svgs = document.querySelectorAll('svg')
        // Moon icon has a specific path with "M21 12.79A9 9 0 1 1 11.21 3"
        const hasMoonIcon = Array.from(svgs).some(svg => {
          const paths = svg.querySelectorAll('path')
          return Array.from(paths).some(path =>
            path.getAttribute('d')?.includes('M21 12.79A9 9 0 1 1 11.21 3')
          )
        })

        expect(hasMoonIcon).toBe(true)
      })
    })
  })

  describe('Theme toggle functionality', () => {
    it('should toggle theme when clicked', async () => {
      const user = userEvent.setup()
      renderThemeSwitcher()

      const button = screen.getByRole('button', { name: /toggle theme/i })

      // Initially dark theme
      expect(document.documentElement.getAttribute('data-theme')).toBe('dark')

      // Click to toggle to light
      await user.click(button)

      await waitFor(() => {
        expect(document.documentElement.getAttribute('data-theme')).toBe('light')
      })

      // Click to toggle back to dark
      await user.click(button)

      await waitFor(() => {
        expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
      })
    })

    it('should update localStorage when toggled', async () => {
      const user = userEvent.setup()
      localStorage.clear()

      renderThemeSwitcher()

      const button = screen.getByRole('button', { name: /toggle theme/i })

      await user.click(button)

      await waitFor(() => {
        expect(localStorage.getItem('theme')).toBe('light')
      })
    })
  })

  describe('Integration with ThemeContext', () => {
    it('should work correctly with multiple toggles', async () => {
      const user = userEvent.setup()
      renderThemeSwitcher()

      const button = screen.getByRole('button', { name: /toggle theme/i })

      // Toggle 3 times
      await user.click(button)
      await waitFor(() => {
        expect(document.documentElement.getAttribute('data-theme')).toBe('light')
      })

      await user.click(button)
      await waitFor(() => {
        expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
      })

      await user.click(button)
      await waitFor(() => {
        expect(document.documentElement.getAttribute('data-theme')).toBe('light')
      })
    })
  })

  describe('Accessibility', () => {
    it('should be keyboard accessible', async () => {
      const user = userEvent.setup()
      renderThemeSwitcher()

      const button = screen.getByRole('button', { name: /toggle theme/i })

      // Tab to the button
      await user.tab()

      // Press Enter to click
      await user.keyboard('{Enter}')

      await waitFor(() => {
        expect(document.documentElement.getAttribute('data-theme')).toBe('light')
      })
    })

    it('should be focusable', () => {
      renderThemeSwitcher()
      const button = screen.getByRole('button', { name: /toggle theme/i })

      button.focus()
      expect(document.activeElement).toBe(button)
    })
  })
})
