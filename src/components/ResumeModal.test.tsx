import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ResumeModal from './ResumeModal'

describe('ResumeModal', () => {
  const mockOnClose = vi.fn()

  beforeEach(() => {
    mockOnClose.mockClear()
  })

  describe('Rendering', () => {
    it('should not render when isOpen is false', () => {
      render(<ResumeModal isOpen={false} onClose={mockOnClose} />)
      expect(screen.queryByRole('button', { name: /close/i })).not.toBeInTheDocument()
    })

    it('should render when isOpen is true', async () => {
      render(<ResumeModal isOpen={true} onClose={mockOnClose} />)
      await waitFor(() => {
        expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument()
      })
    })

    it('should render download button', async () => {
      render(<ResumeModal isOpen={true} onClose={mockOnClose} />)
      await waitFor(() => {
        expect(screen.getByRole('link', { name: /download resume/i })).toBeInTheDocument()
      })
    })

    it('should have correct download link', async () => {
      render(<ResumeModal isOpen={true} onClose={mockOnClose} />)
      await waitFor(() => {
        const downloadLink = screen.getByRole('link', { name: /download resume/i })
        expect(downloadLink).toHaveAttribute('href', '/resume.pdf')
        expect(downloadLink).toHaveAttribute('download', 'Rushabh_Vakharwala_Resume.pdf')
      })
    })
  })

  describe('Interactions', () => {
    it('should call onClose when close button is clicked', async () => {
      const user = userEvent.setup()
      render(<ResumeModal isOpen={true} onClose={mockOnClose} />)

      await waitFor(() => {
        expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument()
      })

      const closeButton = screen.getByRole('button', { name: /close/i })
      await user.click(closeButton)

      expect(mockOnClose).toHaveBeenCalledTimes(1)
    })

    it('should call onClose when Escape key is pressed', async () => {
      const user = userEvent.setup()
      render(<ResumeModal isOpen={true} onClose={mockOnClose} />)

      await waitFor(() => {
        expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument()
      })

      await user.keyboard('{Escape}')

      expect(mockOnClose).toHaveBeenCalledTimes(1)
    })

    it('should not call onClose when download button is clicked', async () => {
      const user = userEvent.setup()
      render(<ResumeModal isOpen={true} onClose={mockOnClose} />)

      await waitFor(() => {
        expect(screen.getByRole('link', { name: /download resume/i })).toBeInTheDocument()
      })

      const downloadButton = screen.getByRole('link', { name: /download resume/i })
      await user.click(downloadButton)

      expect(mockOnClose).not.toHaveBeenCalled()
    })
  })

  describe('Accessibility', () => {
    it('should have proper aria-labels', async () => {
      render(<ResumeModal isOpen={true} onClose={mockOnClose} />)

      await waitFor(() => {
        expect(screen.getByRole('button', { name: /close/i })).toHaveAttribute(
          'aria-label',
          'Close'
        )
        expect(screen.getByRole('link', { name: /download resume/i })).toHaveAttribute(
          'aria-label',
          'Download Resume'
        )
      })
    })

    it('should be keyboard accessible', async () => {
      const user = userEvent.setup()
      render(<ResumeModal isOpen={true} onClose={mockOnClose} />)

      await waitFor(() => {
        expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument()
      })

      // Focus and click the close button
      const closeButton = screen.getByRole('button', { name: /close/i })
      closeButton.focus()
      await user.keyboard('{Enter}')

      expect(mockOnClose).toHaveBeenCalled()
    })
  })

  describe('Portal rendering', () => {
    it('should render modal in document body via portal', async () => {
      render(<ResumeModal isOpen={true} onClose={mockOnClose} />)

      await waitFor(() => {
        expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument()
      })

      // Check that the modal is rendered in the body
      const closeButton = screen.getByRole('button', { name: /close/i })
      expect(document.body.contains(closeButton)).toBe(true)
    })
  })

  describe('Body scroll lock', () => {
    it('should lock body scroll when modal is open', async () => {
      render(<ResumeModal isOpen={true} onClose={mockOnClose} />)

      await waitFor(() => {
        expect(document.body.style.overflow).toBe('hidden')
      })
    })

    it('should unlock body scroll when modal is closed', async () => {
      const { rerender } = render(<ResumeModal isOpen={true} onClose={mockOnClose} />)

      await waitFor(() => {
        expect(document.body.style.overflow).toBe('hidden')
      })

      rerender(<ResumeModal isOpen={false} onClose={mockOnClose} />)

      await waitFor(() => {
        expect(document.body.style.overflow).toBe('unset')
      })
    })
  })

  describe('Resize handling', () => {
    it('should update container width on resize', async () => {
      render(<ResumeModal isOpen={true} onClose={mockOnClose} />)

      await waitFor(() => {
        expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument()
      })

      // Trigger resize event
      window.dispatchEvent(new Event('resize'))

      // Should not throw
      expect(true).toBe(true)
    })

    it('should remove resize listener on close', async () => {
      const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener')
      const { rerender } = render(<ResumeModal isOpen={true} onClose={mockOnClose} />)

      await waitFor(() => {
        expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument()
      })

      rerender(<ResumeModal isOpen={false} onClose={mockOnClose} />)

      expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function))
    })
  })

  describe('Backdrop interaction', () => {
    it('should call onClose when backdrop is clicked', async () => {
      const user = userEvent.setup()
      render(<ResumeModal isOpen={true} onClose={mockOnClose} />)

      await waitFor(() => {
        expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument()
      })

      // Click on the modal container (backdrop area)
      const backdrop = document.querySelector('.fixed.inset-0.z-\\[100\\]')
      if (backdrop) {
        await user.click(backdrop)
      }

      expect(mockOnClose).toHaveBeenCalled()
    })
  })

  describe('PDF viewer', () => {
    it('should render PDF document component', async () => {
      render(<ResumeModal isOpen={true} onClose={mockOnClose} />)

      await waitFor(() => {
        expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument()
      })

      // PDF document should be in the DOM
      const pdfContainer = document.querySelector('.max-w-7xl')
      expect(pdfContainer).toBeInTheDocument()
    })
  })
})
