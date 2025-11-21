import { Suspense, lazy } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import MouseFollower from './components/MouseFollower'
import DotMatrixDisplay from './components/DotMatrixDisplay'

const Hero = lazy(() => import('./sections/Hero'))
const About = lazy(() => import('./sections/About'))
const Projects = lazy(() => import('./sections/Projects'))
const Experience = lazy(() => import('./sections/Experience'))
const Education = lazy(() => import('./sections/Education'))
const Contact = lazy(() => import('./sections/Contact'))

function App() {
  return (
    <div className="min-h-screen bg-base-100 text-base-content relative">
      <DotMatrixDisplay />
      <div className="relative z-10">
        <MouseFollower />
        <Header />
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
            <Projects />
            <Experience />
            <Education />
            <Contact />
          </Suspense>
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default App
