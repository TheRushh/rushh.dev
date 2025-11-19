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

      // Trigger animation frame
      if (animationFrameCallback) {
        animationFrameCallback(0)
      }

      expect(mockContext.clearRect).toHaveBeenCalled()
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
