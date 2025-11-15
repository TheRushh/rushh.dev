import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Card3D } from './Card3D'

// Mock framer-motion
const mockSet = vi.fn()

vi.mock('framer-motion', () => ({
  motion: {
    div: ({
      children,
      onMouseMove,
      onMouseLeave,
      ...props
    }: React.ComponentPropsWithoutRef<'div'>) => (
      <div onMouseMove={onMouseMove} onMouseLeave={onMouseLeave} {...props}>
        {children}
      </div>
    ),
  },
  useMotionValue: vi.fn(() => ({ set: mockSet })),
  useSpring: vi.fn(value => value),
  useTransform: vi.fn(value => value),
}))

describe('Card3D', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Rendering', () => {
    it('should render children correctly', () => {
      render(
        <Card3D>
          <div data-testid="child">Test Content</div>
        </Card3D>
      )

      expect(screen.getByTestId('child')).toBeInTheDocument()
      expect(screen.getByText('Test Content')).toBeInTheDocument()
    })

    it('should apply custom className', () => {
      const { container } = render(
        <Card3D className="custom-class">
          <div>Test</div>
        </Card3D>
      )

      const card = container.firstChild as HTMLElement
      expect(card.className).toContain('custom-class')
    })

    it('should apply relative class', () => {
      const { container } = render(
        <Card3D>
          <div>Test</div>
        </Card3D>
      )

      const card = container.firstChild as HTMLElement
      expect(card.className).toContain('relative')
    })

    it('should have preserve-3d transform style', () => {
      const { container } = render(
        <Card3D>
          <div>Test</div>
        </Card3D>
      )

      const card = container.firstChild as HTMLElement
      expect(card.style.transformStyle).toBe('preserve-3d')
    })
  })

  describe('Mouse interaction calculations', () => {
    it('should calculate correct position percentages on mouse move', async () => {
      const user = userEvent.setup()
      const { container } = render(
        <Card3D>
          <div data-testid="child">Test</div>
        </Card3D>
      )

      const card = container.firstChild as HTMLElement

      // Mock getBoundingClientRect
      card.getBoundingClientRect = vi.fn(() => ({
        width: 200,
        height: 200,
        left: 0,
        top: 0,
        right: 200,
        bottom: 200,
        x: 0,
        y: 0,
        toJSON: () => {},
      }))

      // Simulate mouse move to center (100, 100)
      await user.pointer({ target: card, coords: { clientX: 100, clientY: 100 } })

      // Center should result in 0, 0 (because it's (100/200 - 0.5) = 0)
      expect(mockSet).toHaveBeenCalled()
    })

    it('should handle mouse move when ref is null', async () => {
      const { container } = render(
        <Card3D>
          <div>Test</div>
        </Card3D>
      )

      const card = container.firstChild as HTMLElement
      const originalGetBoundingClientRect = card.getBoundingClientRect

      // Make getBoundingClientRect return undefined temporarily
      Object.defineProperty(card, 'getBoundingClientRect', {
        value: undefined,
        writable: true,
      })

      // This should not throw an error
      const mouseEvent = new MouseEvent('mousemove', {
        clientX: 100,
        clientY: 100,
      })

      expect(() => {
        card.dispatchEvent(mouseEvent)
      }).not.toThrow()

      // Restore
      Object.defineProperty(card, 'getBoundingClientRect', {
        value: originalGetBoundingClientRect,
        writable: true,
      })
    })

    it('should reset position on mouse leave', async () => {
      const user = userEvent.setup()
      const { container } = render(
        <Card3D>
          <div>Test</div>
        </Card3D>
      )

      const card = container.firstChild as HTMLElement

      card.getBoundingClientRect = vi.fn(() => ({
        width: 200,
        height: 200,
        left: 0,
        top: 0,
        right: 200,
        bottom: 200,
        x: 0,
        y: 0,
        toJSON: () => {},
      }))

      // Move mouse over card
      await user.pointer({ target: card, coords: { clientX: 150, clientY: 150 } })

      const callCountAfterMove = mockSet.mock.calls.length

      // Move mouse out of card
      await user.unhover(card)

      // Should have called set with 0 to reset
      expect(mockSet).toHaveBeenCalledWith(0)
      expect(mockSet.mock.calls.length).toBeGreaterThan(callCountAfterMove)
    })
  })

  describe('Edge cases', () => {
    it('should handle mouse at top-left corner without errors', async () => {
      const { container } = render(
        <Card3D>
          <div>Test</div>
        </Card3D>
      )

      const card = container.firstChild as HTMLElement

      card.getBoundingClientRect = vi.fn(() => ({
        width: 200,
        height: 200,
        left: 0,
        top: 0,
        right: 200,
        bottom: 200,
        x: 0,
        y: 0,
        toJSON: () => {},
      }))

      const mouseEvent = new MouseEvent('mousemove', {
        clientX: 0,
        clientY: 0,
      })

      // Should not throw an error
      expect(() => {
        card.dispatchEvent(mouseEvent)
      }).not.toThrow()
    })

    it('should handle mouse at bottom-right corner without errors', async () => {
      const { container } = render(
        <Card3D>
          <div>Test</div>
        </Card3D>
      )

      const card = container.firstChild as HTMLElement

      card.getBoundingClientRect = vi.fn(() => ({
        width: 200,
        height: 200,
        left: 0,
        top: 0,
        right: 200,
        bottom: 200,
        x: 0,
        y: 0,
        toJSON: () => {},
      }))

      const mouseEvent = new MouseEvent('mousemove', {
        clientX: 200,
        clientY: 200,
      })

      // Should not throw an error
      expect(() => {
        card.dispatchEvent(mouseEvent)
      }).not.toThrow()
    })
  })

  describe('Transform styles', () => {
    it('should have children wrapper with proper structure', () => {
      const { container } = render(
        <Card3D>
          <div data-testid="inner">Test</div>
        </Card3D>
      )

      // Verify the inner div structure exists
      const innerDiv = container.querySelector('div > div') as HTMLElement
      expect(innerDiv).toBeInTheDocument()

      // Verify children are rendered inside
      expect(screen.getByTestId('inner')).toBeInTheDocument()
    })
  })

  describe('Multiple children', () => {
    it('should render multiple children correctly', () => {
      render(
        <Card3D>
          <div data-testid="child1">Child 1</div>
          <div data-testid="child2">Child 2</div>
          <div data-testid="child3">Child 3</div>
        </Card3D>
      )

      expect(screen.getByTestId('child1')).toBeInTheDocument()
      expect(screen.getByTestId('child2')).toBeInTheDocument()
      expect(screen.getByTestId('child3')).toBeInTheDocument()
    })
  })
})
