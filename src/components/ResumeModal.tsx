import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'
import { createPortal } from 'react-dom'
import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`

interface ResumeModalProps {
  isOpen: boolean
  onClose: () => void
}

const ResumeModal = ({ isOpen, onClose }: ResumeModalProps) => {
  const [numPages, setNumPages] = useState<number>(0)
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [containerWidth, setContainerWidth] = useState<number>(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages)
    setPageNumber(1)
  }

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth - 40)
      }
    }

    updateWidth()
    window.addEventListener('resize', updateWidth)
    return () => window.removeEventListener('resize', updateWidth)
  }, [isOpen])
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100]"
            style={{ backdropFilter: 'blur(5px)' }}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[101]"
            onClick={onClose}
          >
            <div className="w-full h-full flex flex-col">
              {/* Header */}
              <div className="flex-shrink-0 bg-base-100/80 backdrop-blur-lg" onClick={onClose}>
                <div
                  className="flex items-center justify-between p-4 container mx-auto max-w-7xl"
                  onClick={onClose}
                >
                  <div className="flex gap-2" onClick={e => e.stopPropagation()}>
                    <a
                      href="/resume.pdf"
                      download="Rushabh_Vakharwala_Resume.pdf"
                      className="btn btn-sm btn-ghost"
                      aria-label="Download Resume"
                      onClick={e => e.stopPropagation()}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                        />
                      </svg>
                      Download
                    </a>
                  </div>
                  <div onClick={e => e.stopPropagation()}>
                    <button
                      onClick={e => {
                        e.stopPropagation()
                        onClose()
                      }}
                      className="btn btn-sm btn-ghost btn-circle"
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
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* PDF Viewer */}
              <div className="flex-1 overflow-y-auto flex justify-center" style={{ minHeight: 0 }}>
                <div ref={containerRef} className="w-full max-w-7xl p-4">
                  <div onClick={e => e.stopPropagation()}>
                    <Document
                      file="/resume.pdf"
                      onLoadSuccess={onDocumentLoadSuccess}
                      loading={
                        <div className="flex items-center justify-center py-20">
                          <span className="loading loading-spinner loading-lg"></span>
                        </div>
                      }
                      error={
                        <div className="flex items-center justify-center py-20 text-error">
                          Failed to load PDF. Please try downloading instead.
                        </div>
                      }
                    >
                      <Page
                        pageNumber={pageNumber}
                        renderTextLayer={true}
                        renderAnnotationLayer={true}
                        className="shadow-xl w-full"
                        width={containerWidth > 0 ? containerWidth : undefined}
                      />
                    </Document>
                  </div>
                </div>
              </div>

              {/* Page Navigation */}
              {numPages > 1 && (
                <div className="flex items-center justify-center gap-4 p-3 bg-base-100/80 backdrop-blur-lg flex-shrink-0 container mx-auto max-w-7xl w-full">
                  <button
                    onClick={e => {
                      e.stopPropagation()
                      setPageNumber(Math.max(1, pageNumber - 1))
                    }}
                    disabled={pageNumber <= 1}
                    className="btn btn-sm btn-circle"
                    aria-label="Previous page"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>
                  <span className="text-sm">
                    Page {pageNumber} of {numPages}
                  </span>
                  <button
                    onClick={e => {
                      e.stopPropagation()
                      setPageNumber(Math.min(numPages, pageNumber + 1))
                    }}
                    disabled={pageNumber >= numPages}
                    className="btn btn-sm btn-circle"
                    aria-label="Next page"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  )
}

export default ResumeModal
