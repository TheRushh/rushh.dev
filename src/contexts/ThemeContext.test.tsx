import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { renderHook, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ThemeProvider } from './ThemeContext'
import { useTheme } from '../hooks/useTheme'

describe('ThemeContext', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear()
    // Clear the data-theme attribute
    document.documentElement.removeAttribute('data-theme')
  })

  describe('ThemeProvider', () => {
    it('should default to dark theme when no saved theme exists', () => {
      const { result } = renderHook(() => useTheme(), {
        wrapper: ThemeProvider,
      })

      expect(result.current.theme).toBe('dark')
    })

    it('should load saved theme from localStorage', () => {
      localStorage.setItem('theme', 'light')

      const { result } = renderHook(() => useTheme(), {
        wrapper: ThemeProvider,
      })

      expect(result.current.theme).toBe('light')
    })

    it('should save theme to localStorage when changed', async () => {
      const { result } = renderHook(() => useTheme(), {
        wrapper: ThemeProvider,
      })

      act(() => {
        result.current.toggleTheme()
      })

      await waitFor(() => {
        expect(localStorage.getItem('theme')).toBe('light')
      })
    })

    it('should set data-theme attribute on document element', () => {
      renderHook(() => useTheme(), {
        wrapper: ThemeProvider,
      })

      expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
    })

    it('should update data-theme attribute when theme changes', async () => {
      const { result } = renderHook(() => useTheme(), {
        wrapper: ThemeProvider,
      })

      act(() => {
        result.current.toggleTheme()
      })

      await waitFor(() => {
        expect(document.documentElement.getAttribute('data-theme')).toBe('light')
      })
    })
  })

  describe('toggleTheme', () => {
    it('should toggle from dark to light', () => {
      const { result } = renderHook(() => useTheme(), {
        wrapper: ThemeProvider,
      })

      expect(result.current.theme).toBe('dark')

      act(() => {
        result.current.toggleTheme()
      })

      expect(result.current.theme).toBe('light')
    })

    it('should toggle from light to dark', () => {
      localStorage.setItem('theme', 'light')

      const { result } = renderHook(() => useTheme(), {
        wrapper: ThemeProvider,
      })

      expect(result.current.theme).toBe('light')

      act(() => {
        result.current.toggleTheme()
      })

      expect(result.current.theme).toBe('dark')
    })

    it('should toggle multiple times correctly', () => {
      const { result } = renderHook(() => useTheme(), {
        wrapper: ThemeProvider,
      })

      expect(result.current.theme).toBe('dark')

      act(() => {
        result.current.toggleTheme()
      })
      expect(result.current.theme).toBe('light')

      act(() => {
        result.current.toggleTheme()
      })
      expect(result.current.theme).toBe('dark')

      act(() => {
        result.current.toggleTheme()
      })
      expect(result.current.theme).toBe('light')
    })
  })

  describe('useTheme hook', () => {
    it('should throw error when used outside ThemeProvider', () => {
      // Suppress console.error for this test
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

      expect(() => {
        renderHook(() => useTheme())
      }).toThrow('useTheme must be used within a ThemeProvider')

      consoleSpy.mockRestore()
    })

    it('should provide theme and toggleTheme function', () => {
      const { result } = renderHook(() => useTheme(), {
        wrapper: ThemeProvider,
      })

      expect(result.current).toHaveProperty('theme')
      expect(result.current).toHaveProperty('toggleTheme')
      expect(typeof result.current.toggleTheme).toBe('function')
    })
  })

  describe('Integration tests', () => {
    it('should work with a component that uses useTheme', async () => {
      const TestComponent = () => {
        const { theme, toggleTheme } = useTheme()
        return (
          <div>
            <span data-testid="theme">{theme}</span>
            <button onClick={toggleTheme}>Toggle</button>
          </div>
        )
      }

      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      )

      const themeDisplay = screen.getByTestId('theme')
      const button = screen.getByRole('button', { name: /toggle/i })

      expect(themeDisplay).toHaveTextContent('dark')

      await userEvent.click(button)

      expect(themeDisplay).toHaveTextContent('light')
    })
  })
})
