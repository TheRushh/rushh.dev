import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import PhotographyDrawer from './PhotographyDrawer'
import type { UnsplashPhoto } from '@/data'

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.ComponentPropsWithoutRef<'div'>) => (
      <div {...props}>{children}</div>
    ),
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))

const { mockUseUnsplashPhotos } = vi.hoisted(() => ({
  mockUseUnsplashPhotos: vi.fn(),
}))

vi.mock('@/hooks/useUnsplashPhotos', () => ({
  useUnsplashPhotos: mockUseUnsplashPhotos,
}))

const makePhoto = (id: string, overrides: Partial<UnsplashPhoto> = {}): UnsplashPhoto => ({
  id,
  width: 4000,
  height: 3000,
  color: '#262626',
  alt_description: `Photo ${id}`,
  description: null,
  likes: 12,
  created_at: '2026-01-15T12:00:00Z',
  urls: {
    small: `https://images.unsplash.com/photo-${id}?w=400`,
    regular: `https://images.unsplash.com/photo-${id}?w=1080`,
  },
  links: {
    html: `https://unsplash.com/photos/${id}`,
  },
  ...overrides,
})

const setHookState = (state: {
  photos?: UnsplashPhoto[]
  loading?: boolean
  error?: string | null
}) => {
  mockUseUnsplashPhotos.mockReturnValue({
    photos: [],
    loading: false,
    error: null,
    ...state,
  })
}

const PROFILE_URL = 'https://unsplash.com/@therushh?utm_source=rushh_dev&utm_medium=referral'

const renderDrawer = ({ isOpen = true, onClose = vi.fn() } = {}) => {
  render(<PhotographyDrawer isOpen={isOpen} onClose={onClose} />)
  return { onClose }
}

const getDrawer = () => screen.getByRole('dialog', { name: 'Photography gallery' })

describe('PhotographyDrawer', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    document.body.style.overflow = 'unset'
  })

  describe('Pane shell', () => {
    it('renders nothing and fetches nothing while closed', () => {
      setHookState({})
      renderDrawer({ isOpen: false })

      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
      expect(mockUseUnsplashPhotos).not.toHaveBeenCalled()
    })

    it('renders the gallery pane with heading when open', () => {
      setHookState({})
      renderDrawer()

      expect(getDrawer()).toBeInTheDocument()
      expect(screen.getByRole('heading', { name: 'Photography' })).toBeInTheDocument()
    })

    it('locks page scroll while open and restores it on close', () => {
      setHookState({})
      const onClose = vi.fn()
      const { rerender } = render(<PhotographyDrawer isOpen={true} onClose={onClose} />)
      expect(document.body.style.overflow).toBe('hidden')

      rerender(<PhotographyDrawer isOpen={false} onClose={onClose} />)
      expect(document.body.style.overflow).toBe('unset')
    })

    it('closes via the close button', async () => {
      const user = userEvent.setup()
      setHookState({})
      const { onClose } = renderDrawer()

      await user.click(screen.getByRole('button', { name: 'Close photography' }))
      expect(onClose).toHaveBeenCalledTimes(1)
    })

    it('closes on Escape but ignores other keys', () => {
      setHookState({})
      const { onClose } = renderDrawer()

      fireEvent.keyDown(document, { key: 'Enter' })
      expect(onClose).not.toHaveBeenCalled()

      fireEvent.keyDown(document, { key: 'Escape' })
      expect(onClose).toHaveBeenCalledTimes(1)
    })

    it('shows a spinner while loading', () => {
      setHookState({ loading: true })
      renderDrawer()

      expect(document.querySelector('.loading-spinner')).toBeInTheDocument()
    })
  })

  describe('Fallback card', () => {
    it('renders a CTA card linking to the Unsplash profile on error', () => {
      setHookState({ error: 'Could not load photos' })
      renderDrawer()

      const cta = screen.getByRole('link', { name: 'View on Unsplash' })
      expect(cta).toHaveAttribute('href', PROFILE_URL)
      expect(cta).toHaveAttribute('target', '_blank')
      expect(cta).toHaveAttribute('rel', 'noopener noreferrer')
      // Only the pane's close button remains — no photo tiles
      expect(screen.queryAllByRole('button')).toHaveLength(1)
    })

    it('renders the CTA card when the photo list is empty', () => {
      setHookState({ photos: [] })
      renderDrawer()

      expect(screen.getByRole('link', { name: 'View on Unsplash' })).toBeInTheDocument()
    })
  })

  describe('Masonry grid', () => {
    it('renders a masonry tile per photo with responsive column classes', () => {
      const photos = [makePhoto('a'), makePhoto('b'), makePhoto('c')]
      setHookState({ photos })
      renderDrawer()

      const tiles = screen.getAllByRole('button', { name: /Photo/ })
      expect(tiles).toHaveLength(3)
      expect(tiles[0]).toHaveAccessibleName('Photo a')
      expect(tiles[0].parentElement).toHaveClass('columns-1', 'sm:columns-2', 'lg:columns-3')
    })

    it('renders images with responsive srcSet and reserved aspect ratio', () => {
      const photo = makePhoto('a')
      setHookState({ photos: [photo] })
      renderDrawer()

      const img = screen.getByAltText('Photo a')
      expect(img).toHaveAttribute('src', photo.urls.small)
      expect(img).toHaveAttribute('srcset', `${photo.urls.small} 400w, ${photo.urls.regular} 1080w`)
      expect(img).toHaveAttribute(
        'sizes',
        '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
      )
      expect(img).toHaveAttribute('loading', 'lazy')
      expect(img).toHaveAttribute('decoding', 'async')
      expect(img).toHaveAttribute('width', '4000')
      expect(img).toHaveAttribute('height', '3000')
      expect(img.getAttribute('style')).toContain('aspect-ratio')
    })

    it('staggers tile entrance delays and applies the color swatch', () => {
      const photos = [makePhoto('a'), makePhoto('b')]
      setHookState({ photos })
      renderDrawer()

      const tiles = screen.getAllByRole('button', { name: /Photo/ })
      expect(tiles[0]).toHaveClass('photo-tile')
      expect(tiles[0].style.animationDelay).toBe('0ms')
      expect(tiles[1].style.animationDelay).toBe('60ms')
      expect(tiles[0].getAttribute('style')).toContain('background-color')
    })

    it('falls back gracefully when alt text and color are missing', () => {
      setHookState({ photos: [makePhoto('x', { alt_description: null, color: null })] })
      renderDrawer()

      const tile = screen.getByRole('button', { name: 'View photo' })
      expect(tile.querySelector('img')).toHaveAttribute('alt', '')
      expect(tile.getAttribute('style') ?? '').not.toContain('background-color')
    })

    it('links to the full Unsplash collection below the grid', () => {
      setHookState({ photos: [makePhoto('a')] })
      renderDrawer()

      const link = screen.getByRole('link', { name: /full collection on Unsplash/i })
      expect(link).toHaveAttribute('href', PROFILE_URL)
    })
  })

  describe('Lightbox', () => {
    const openLightbox = async () => {
      const user = userEvent.setup()
      const photo = makePhoto('a')
      setHookState({ photos: [photo] })
      const { onClose } = renderDrawer()

      await user.click(screen.getByRole('button', { name: 'Photo a' }))
      return { user, photo, onClose, dialog: screen.getByRole('dialog', { name: 'Photo a' }) }
    }

    it('opens with the full-size image, metadata and attribution link', async () => {
      const { photo, dialog } = await openLightbox()

      expect(within(dialog).getByAltText('Photo a')).toHaveAttribute('src', photo.urls.regular)
      expect(within(dialog).getByText('12')).toBeInTheDocument()
      expect(within(dialog).getByText('Jan 15, 2026')).toBeInTheDocument()
      expect(within(dialog).getByText('Photo a')).toBeInTheDocument()

      const attribution = within(dialog).getByRole('link', { name: 'View on Unsplash' })
      expect(attribution).toHaveAttribute(
        'href',
        `${photo.links.html}?utm_source=rushh_dev&utm_medium=referral`
      )
      expect(attribution).toHaveAttribute('target', '_blank')
      expect(attribution).toHaveAttribute('rel', 'noopener noreferrer')
    })

    it('prefers the description over alt text as the caption', async () => {
      const user = userEvent.setup()
      setHookState({ photos: [makePhoto('a', { description: 'Golden hour over the bluffs' })] })
      renderDrawer()

      await user.click(screen.getByRole('button', { name: 'Photo a' }))
      expect(
        within(screen.getByRole('dialog', { name: 'Photo a' })).getByText(
          'Golden hour over the bluffs'
        )
      ).toBeInTheDocument()
    })

    it('omits the caption and uses a generic dialog label when text is missing', async () => {
      const user = userEvent.setup()
      setHookState({ photos: [makePhoto('a', { alt_description: null, description: null })] })
      renderDrawer()

      await user.click(screen.getByRole('button', { name: 'View photo' }))
      const dialog = screen.getByRole('dialog', { name: 'Photo' })
      expect(dialog.querySelector('p')).toBeNull()
    })

    it('closes via the close button and restores focus to the tile', async () => {
      const { user, dialog } = await openLightbox()

      const closeButton = within(dialog).getByRole('button', { name: 'Close' })
      expect(closeButton).toHaveFocus()

      await user.click(closeButton)
      expect(screen.queryByRole('dialog', { name: 'Photo a' })).not.toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Photo a' })).toHaveFocus()
    })

    it('closes when clicking outside the content', async () => {
      const { dialog } = await openLightbox()

      fireEvent.click(dialog)
      expect(screen.queryByRole('dialog', { name: 'Photo a' })).not.toBeInTheDocument()
    })

    it('closes when clicking the backdrop', async () => {
      await openLightbox()

      const backdrop = Array.from(document.body.querySelectorAll('div')).find(div =>
        div.classList.contains('z-[100]')
      )
      expect(backdrop).toBeDefined()
      fireEvent.click(backdrop as HTMLElement)
      expect(screen.queryByRole('dialog', { name: 'Photo a' })).not.toBeInTheDocument()
    })

    it('does not close when clicking the image itself', async () => {
      const { user, dialog } = await openLightbox()

      await user.click(within(dialog).getByAltText('Photo a'))
      expect(screen.getByRole('dialog', { name: 'Photo a' })).toBeInTheDocument()
    })

    it('Escape closes the lightbox first, then the pane', async () => {
      const { onClose } = await openLightbox()

      fireEvent.keyDown(document, { key: 'Escape' })
      expect(screen.queryByRole('dialog', { name: 'Photo a' })).not.toBeInTheDocument()
      expect(onClose).not.toHaveBeenCalled()
      expect(getDrawer()).toBeInTheDocument()

      fireEvent.keyDown(document, { key: 'Escape' })
      expect(onClose).toHaveBeenCalledTimes(1)
    })
  })
})
