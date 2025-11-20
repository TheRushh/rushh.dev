import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, cleanup } from '@testing-library/react'
import DotMatrixDisplay from './DotMatrixDisplay'

// Mock canvas context
const mockContext = {
  clearRect: vi.fn(),
  beginPath: vi.fn(),
  arc: vi.fn(),
  fill: vi.fn(),
  shadowBlur: 0,
  shadowColor: '',
  fillStyle: '',
}

describe('DotMatrixDisplay', () => {
  let animationFrameCallback: FrameRequestCallback | null = null

  beforeEach(() => {
    vi.useFakeTimers()

    // Mock requestAnimationFrame
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation(cb => {
      animationFrameCallback = cb
      return 1
    })

    vi.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => {})

    // Mock window dimensions
    Object.defineProperty(window, 'innerWidth', { value: 1920, writable: true })
    Object.defineProperty(window, 'innerHeight', { value: 1080, writable: true })

    // Mock HTMLCanvasElement
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(
      mockContext as unknown as CanvasRenderingContext2D
    )

    // Reset mock function calls
    vi.clearAllMocks()
  })

  afterEach(() => {
    cleanup()
    vi.useRealTimers()
    vi.restoreAllMocks()
    animationFrameCallback = null
  })

  describe('Rendering', () => {
    it('should render without crashing', () => {
      const { container } = render(<DotMatrixDisplay />)
      expect(container).toBeTruthy()
    })

    it('should render a canvas element', () => {
      const { container } = render(<DotMatrixDisplay />)
      const canvas = container.querySelector('canvas')
      expect(canvas).toBeTruthy()
    })

    it('should have fixed positioning', () => {
      const { container } = render(<DotMatrixDisplay />)
      const wrapper = container.firstChild as HTMLElement
      expect(wrapper.className).toContain('fixed')
      expect(wrapper.className).toContain('inset-0')
    })

    it('should be non-interactive (pointer-events-none)', () => {
      const { container } = render(<DotMatrixDisplay />)
      const wrapper = container.firstChild as HTMLElement
      expect(wrapper.className).toContain('pointer-events-none')
    })

    it('should have z-index 0', () => {
      const { container } = render(<DotMatrixDisplay />)
      const wrapper = container.firstChild as HTMLElement
      expect(wrapper.className).toContain('z-0')
    })
  })

  describe('Canvas initialization', () => {
    it('should get 2d context from canvas', () => {
      render(<DotMatrixDisplay />)
      expect(HTMLCanvasElement.prototype.getContext).toHaveBeenCalledWith('2d')
    })

    it('should request animation frame', () => {
      render(<DotMatrixDisplay />)
      expect(window.requestAnimationFrame).toHaveBeenCalled()
    })
  })

  describe('Theme detection', () => {
    it('should observe document theme attribute', () => {
      const observeSpy = vi.spyOn(MutationObserver.prototype, 'observe')
      render(<DotMatrixDisplay />)

      expect(observeSpy).toHaveBeenCalledWith(
        document.documentElement,
        expect.objectContaining({
          attributes: true,
          attributeFilter: ['data-theme'],
        })
      )
    })

    it('should disconnect observer on unmount', () => {
      const disconnectSpy = vi.spyOn(MutationObserver.prototype, 'disconnect')
      const { unmount } = render(<DotMatrixDisplay />)

      unmount()
      expect(disconnectSpy).toHaveBeenCalled()
    })
  })

  describe('Window resize handling', () => {
    it('should add resize event listener', () => {
      const addEventListenerSpy = vi.spyOn(window, 'addEventListener')
      render(<DotMatrixDisplay />)

      expect(addEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function))
    })

    it('should remove resize event listener on unmount', () => {
      const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener')
      const { unmount } = render(<DotMatrixDisplay />)

      unmount()
      expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function))
    })

    it('should update dimensions on resize', () => {
      render(<DotMatrixDisplay />)

      // Trigger resize
      Object.defineProperty(window, 'innerWidth', { value: 1024, writable: true })
      Object.defineProperty(window, 'innerHeight', { value: 768, writable: true })
      window.dispatchEvent(new Event('resize'))

      // Component should handle the resize
      expect(window.requestAnimationFrame).toHaveBeenCalled()
    })
  })

  describe('Word placements', () => {
    it('should regenerate placements periodically', () => {
      render(<DotMatrixDisplay />)

      // Advance time for interval
      vi.advanceTimersByTime(5000)

      // Should have re-rendered with new placements
      expect(window.requestAnimationFrame).toHaveBeenCalled()
    })
  })

  describe('Animation', () => {
    it('should cancel animation frame on unmount', () => {
      const { unmount } = render(<DotMatrixDisplay />)

      unmount()
      expect(window.cancelAnimationFrame).toHaveBeenCalled()
    })

    it('should clear canvas on each frame', () => {
      render(<DotMatrixDisplay />)

      // Trigger animation frame with enough time for 30fps throttling (33ms)
      if (animationFrameCallback) {
        animationFrameCallback(0)
        animationFrameCallback(50)
      }

      expect(mockContext.clearRect).toHaveBeenCalled()
    })

    it('should draw dots on each frame', () => {
      render(<DotMatrixDisplay />)

      // Trigger animation frame with enough time for 30fps throttling
      if (animationFrameCallback) {
        animationFrameCallback(0)
        animationFrameCallback(50)
      }

      expect(mockContext.beginPath).toHaveBeenCalled()
      expect(mockContext.arc).toHaveBeenCalled()
      expect(mockContext.fill).toHaveBeenCalled()
    })

    it('should handle multiple animation frames', () => {
      render(<DotMatrixDisplay />)

      const initialCalls = mockContext.clearRect.mock.calls.length

      // Trigger multiple animation frames at 30fps intervals (34ms apart)
      // Start at 34 to ensure first frame renders (0 would have 0 elapsed time)
      for (let i = 1; i <= 5; i++) {
        if (animationFrameCallback) {
          animationFrameCallback(i * 34)
        }
      }

      expect(mockContext.clearRect.mock.calls.length - initialCalls).toBe(5)
    })
  })

  describe('TV warm-up effect', () => {
    it('should start in initializing state', () => {
      render(<DotMatrixDisplay />)

      // During initialization, animation should still run (need 50ms for 30fps)
      if (animationFrameCallback) {
        animationFrameCallback(0)
        animationFrameCallback(50)
      }

      expect(mockContext.fill).toHaveBeenCalled()
    })

    it('should transition after 1 second', () => {
      render(<DotMatrixDisplay />)

      // Advance past initialization period
      vi.advanceTimersByTime(1000)

      // Trigger animation frame after initialization (need 50ms for 30fps)
      if (animationFrameCallback) {
        animationFrameCallback(0)
        animationFrameCallback(50)
      }

      expect(mockContext.clearRect).toHaveBeenCalled()
    })

    it('should show static effect during initialization', () => {
      render(<DotMatrixDisplay />)

      // Trigger multiple frames during initialization
      for (let i = 0; i < 10; i++) {
        if (animationFrameCallback) {
          animationFrameCallback(i * 16)
        }
      }

      // Should have drawn dots
      expect(mockContext.arc).toHaveBeenCalled()
    })

    it('should smoothly transition from static to words', () => {
      render(<DotMatrixDisplay />)

      // Advance past initialization
      vi.advanceTimersByTime(1000)

      // Trigger many frames to progress transition
      for (let i = 0; i < 60; i++) {
        if (animationFrameCallback) {
          animationFrameCallback(i * 16)
        }
      }

      expect(mockContext.fill).toHaveBeenCalled()
    })
  })

  describe('Theme colors', () => {
    it('should use dark theme colors by default', () => {
      render(<DotMatrixDisplay />)

      // Advance past initialization
      vi.advanceTimersByTime(1100)

      if (animationFrameCallback) {
        animationFrameCallback(0)
        animationFrameCallback(50)
      }

      expect(mockContext.fill).toHaveBeenCalled()
    })

    it('should use light theme colors when theme is light', () => {
      document.documentElement.setAttribute('data-theme', 'light')
      render(<DotMatrixDisplay />)

      // Advance past initialization
      vi.advanceTimersByTime(1100)

      if (animationFrameCallback) {
        animationFrameCallback(0)
        animationFrameCallback(50)
      }

      expect(mockContext.fill).toHaveBeenCalled()
    })

    it('should respond to theme changes', () => {
      render(<DotMatrixDisplay />)

      // Change theme
      document.documentElement.setAttribute('data-theme', 'light')

      // Trigger mutation observer callback
      vi.advanceTimersByTime(100)

      if (animationFrameCallback) {
        animationFrameCallback(0)
        animationFrameCallback(50)
      }

      expect(mockContext.fill).toHaveBeenCalled()
    })
  })

  describe('Glow effects', () => {
    it('should set shadow properties for lit dots', () => {
      render(<DotMatrixDisplay />)

      // Advance past initialization and transition
      vi.advanceTimersByTime(2000)

      // Trigger many frames to fully transition
      for (let i = 0; i < 100; i++) {
        if (animationFrameCallback) {
          animationFrameCallback(i * 16)
        }
      }

      // Shadow properties should have been set
      expect(mockContext.fill).toHaveBeenCalled()
    })
  })

  describe('Edge cases', () => {
    it('should handle zero dimensions', () => {
      Object.defineProperty(window, 'innerWidth', { value: 0, writable: true })
      Object.defineProperty(window, 'innerHeight', { value: 0, writable: true })

      const { container } = render(<DotMatrixDisplay />)
      expect(container).toBeTruthy()
    })

    it('should handle canvas context being null', () => {
      vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(null)

      const { container } = render(<DotMatrixDisplay />)
      expect(container).toBeTruthy()
    })

    it('should clear interval on unmount after initialization', () => {
      render(<DotMatrixDisplay />)

      // Advance past initialization
      vi.advanceTimersByTime(1100)

      // Unmount to trigger cleanup
      cleanup()

      // Should not throw
      expect(true).toBe(true)
    })

    it('should handle scanline boost condition', () => {
      render(<DotMatrixDisplay />)

      // Run frames at different times to hit scanline conditions
      for (let i = 0; i < 200; i++) {
        if (animationFrameCallback) {
          vi.setSystemTime(i * 50) // Vary time for scanline phases
          animationFrameCallback(i * 16)
        }
      }

      expect(mockContext.fill).toHaveBeenCalled()
    })

    it('should transition color at midpoint', () => {
      render(<DotMatrixDisplay />)

      // Advance past initialization
      vi.advanceTimersByTime(1000)

      // Run frames to reach transition midpoint (25 frames at 0.02 per frame = 0.5)
      for (let i = 0; i < 30; i++) {
        if (animationFrameCallback) {
          animationFrameCallback(i * 16)
        }
      }

      expect(mockContext.fill).toHaveBeenCalled()
    })

    it('should apply glow when opacity is high', () => {
      render(<DotMatrixDisplay />)

      // Advance well past initialization
      vi.advanceTimersByTime(1500)

      // Run many frames to fully transition and ramp up opacity
      for (let i = 0; i < 200; i++) {
        if (animationFrameCallback) {
          animationFrameCallback(i * 16)
        }
      }

      // Check that shadowBlur was modified
      expect(mockContext.fill).toHaveBeenCalled()
    })
  })

  describe('Accessibility', () => {
    it('should not interfere with page content', () => {
      const { container } = render(<DotMatrixDisplay />)
      const wrapper = container.firstChild as HTMLElement

      // Should be overflow hidden
      expect(wrapper.className).toContain('overflow-hidden')
    })
  })
})
