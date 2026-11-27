import { Suspense, lazy, useEffect, useState } from 'react'
import { Analytics } from '@vercel/analytics/react'
import Header from './components/Header'
import Footer from './components/Footer'
import DotMatrixDisplay from './components/DotMatrixDisplay'
import PhotographyDrawer from './components/PhotographyDrawer'
import { useSmoothWheelScroll } from './hooks/useSmoothWheelScroll'

const Hero = lazy(() => import('./sections/Hero'))
const About = lazy(() => import('./sections/About'))
const Projects = lazy(() => import('./sections/Projects'))
const Experience = lazy(() => import('./sections/Experience'))
const TechnicalStack = lazy(() => import('./sections/TechnicalStack'))
const Education = lazy(() => import('./sections/Education'))
const Contact = lazy(() => import('./sections/Contact'))

function App() {
  useSmoothWheelScroll()
  const [photographyOpen, setPhotographyOpen] = useState(false)

  useEffect(() => {
    const previousScrollRestoration = window.history.scrollRestoration
    window.history.scrollRestoration = 'manual'
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })

    return () => {
      window.history.scrollRestoration = previousScrollRestoration
    }
  }, [])

  return (
    <div className="min-h-screen bg-base-100 text-base-content relative">
      <DotMatrixDisplay />
      <div className="relative">
        <Header photographyOpen={photographyOpen} onPhotographyOpenChange={setPhotographyOpen} />
        {/* Main pane slides left while the photography pane slides in from the right */}
        <div
          className={`transition-transform duration-[450ms] ease-in-out ${
            photographyOpen ? '-translate-x-1/4' : 'translate-x-0'
          }`}
        >
          <main>
            <Suspense
              fallback={
                <div className="flex items-center justify-center min-h-screen">
                  <span className="loading loading-spinner loading-lg text-primary"></span>
                </div>
              }
            >
              <Hero />
              <About />
              <div className="container mx-auto max-w-7xl px-4">
                <div className="divider my-0 before:bg-base-content/5 after:bg-base-content/5"></div>
              </div>
              <Projects />
              <div className="container mx-auto max-w-7xl px-4">
                <div className="divider my-0 before:bg-base-content/5 after:bg-base-content/5"></div>
              </div>
              <Experience />
              <div className="container mx-auto max-w-7xl px-4">
                <div className="divider my-0 before:bg-base-content/5 after:bg-base-content/5"></div>
              </div>
              <TechnicalStack />
              <div className="container mx-auto max-w-7xl px-4">
                <div className="divider my-0 before:bg-base-content/5 after:bg-base-content/5"></div>
              </div>
              <Education />
              <div className="container mx-auto max-w-7xl px-4">
                <div className="divider my-0 before:bg-base-content/5 after:bg-base-content/5"></div>
              </div>
              <Contact />
            </Suspense>
          </main>
          <Footer />
        </div>
        <PhotographyDrawer isOpen={photographyOpen} onClose={() => setPhotographyOpen(false)} />
      </div>
      <Analytics />
    </div>
  )
}

export default App
