import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FaHeart } from 'react-icons/fa'
import { useUnsplashPhotos } from '@/hooks/useUnsplashPhotos'
import type { UnsplashPhoto } from '@/data'

const UNSPLASH_PROFILE_URL =
  'https://unsplash.com/@therushh?utm_source=rushh_dev&utm_medium=referral'

const photoPageUrl = (photo: UnsplashPhoto) =>
  `${photo.links.html}?utm_source=rushh_dev&utm_medium=referral`

interface LightboxProps {
  photo: UnsplashPhoto | null
  onClose: () => void
}

const Lightbox = ({ photo, onClose }: LightboxProps) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (photo) {
      closeButtonRef.current?.focus()
    }
  }, [photo])

  return createPortal(
    <AnimatePresence>
      {photo && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-base-100/80"
            style={{ backdropFilter: 'blur(5px)' }}
          />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-modal="true"
            aria-label={photo.alt_description ?? 'Photo'}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4"
            onClick={onClose}
          >
            <div
              className="flex max-h-full max-w-4xl flex-col items-center gap-3"
              onClick={e => e.stopPropagation()}
            >
              <img
                src={photo.urls.regular}
                alt={photo.alt_description ?? ''}
                className="max-h-[80vh] w-auto rounded-xl object-contain"
                style={{ backgroundColor: photo.color ?? undefined }}
              />
              {(photo.description ?? photo.alt_description) && (
                <p className="max-w-xl text-center text-sm text-base-content/70">
                  {photo.description ?? photo.alt_description}
                </p>
              )}
              <div className="flex w-full items-center justify-between gap-4 rounded-xl border border-base-content/15 bg-base-300/80 px-4 py-2">
                <div className="flex items-center gap-4 text-xs text-base-content/60">
                  <span className="flex items-center gap-1.5">
                    <FaHeart className="h-3 w-3" />
                    {photo.likes}
                  </span>
                  <span>
                    {new Date(photo.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <a
                    href={photoPageUrl(photo)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-ghost btn-sm"
                  >
                    View on Unsplash
                  </a>
                  <button
                    ref={closeButtonRef}
                    onClick={onClose}
                    className="btn btn-ghost btn-sm btn-circle"
                    aria-label="Close"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  )
}

const DrawerContent = ({ onClose }: { onClose: () => void }) => {
  const { photos, loading, error } = useUnsplashPhotos()
  const [selected, setSelected] = useState<UnsplashPhoto | null>(null)
  const lastTileRef = useRef<HTMLButtonElement | null>(null)

  // Lock page scroll while the pane is open; the pane scrolls internally
  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [])

  // Single Escape handler so it closes the lightbox first, then the pane
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      if (selected) {
        setSelected(null)
        lastTileRef.current?.focus()
      } else {
        onClose()
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [selected, onClose])

  const openLightbox = (photo: UnsplashPhoto, e: React.MouseEvent<HTMLButtonElement>) => {
    lastTileRef.current = e.currentTarget
    setSelected(photo)
  }

  const closeLightbox = () => {
    setSelected(null)
    lastTileRef.current?.focus()
  }

  return (
    <div className="container mx-auto max-w-6xl px-4 pt-24 pb-16">
      <div className="mb-4 flex items-start justify-between gap-4">
        <h2 className="text-4xl font-bold">Photography</h2>
        <button
          onClick={onClose}
          className="btn btn-ghost btn-sm btn-circle"
          aria-label="Close photography"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <p className="text-base-content/60 mb-10 max-w-2xl">
        Moments I capture behind the lens — latest shots straight from my Unsplash profile.
      </p>

      {loading && (
        <div className="flex justify-center py-16">
          <span className="loading loading-spinner loading-md text-primary" />
        </div>
      )}

      {!loading && (error || photos.length === 0) && (
        <div className="mx-auto max-w-xl p-6 rounded-2xl border border-base-content/15 bg-base-300/80 hover:bg-base-200 transition-colors duration-300 text-center">
          <p className="text-sm text-base-content/70 mb-4">
            The gallery is taking a break — my full portfolio is always up on Unsplash.
          </p>
          <a
            href={UNSPLASH_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-sm"
          >
            View on Unsplash
          </a>
        </div>
      )}

      {!loading && !error && photos.length > 0 && (
        <>
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
            {photos.map((photo, index) => (
              <button
                key={photo.id}
                type="button"
                onClick={e => openLightbox(photo, e)}
                aria-label={photo.alt_description ?? 'View photo'}
                className="photo-tile group relative mb-4 block w-full break-inside-avoid overflow-hidden rounded-2xl border border-base-content/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                style={{
                  animationDelay: `${index * 60}ms`,
                  backgroundColor: photo.color ?? undefined,
                }}
              >
                <img
                  src={photo.urls.small}
                  srcSet={`${photo.urls.small} 400w, ${photo.urls.regular} 1080w`}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  alt={photo.alt_description ?? ''}
                  width={photo.width}
                  height={photo.height}
                  loading="lazy"
                  decoding="async"
                  style={{ aspectRatio: `${photo.width} / ${photo.height}` }}
                  className="w-full h-auto transition-transform duration-300 group-hover:scale-[1.03] motion-reduce:transform-none"
                />
              </button>
            ))}
          </div>
          <div className="mt-10 text-center">
            <a
              href={UNSPLASH_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-base-content/50 hover:text-primary transition-colors"
            >
              View the full collection on Unsplash →
            </a>
          </div>
        </>
      )}

      <Lightbox photo={selected} onClose={closeLightbox} />
    </div>
  )
}

interface PhotographyDrawerProps {
  isOpen: boolean
  onClose: () => void
}

const PhotographyDrawer = ({ isOpen, onClose }: PhotographyDrawerProps) => {
  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
          role="dialog"
          aria-modal="true"
          aria-label="Photography gallery"
          className="fixed inset-0 z-40 overflow-y-auto bg-base-100"
        >
          <DrawerContent onClose={onClose} />
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}

export default PhotographyDrawer
