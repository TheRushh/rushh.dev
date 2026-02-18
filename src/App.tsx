import { Suspense, lazy } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import DotMatrixDisplay from './components/DotMatrixDisplay'

const Hero = lazy(() => import('./sections/Hero'))
const About = lazy(() => import('./sections/About'))
const Projects = lazy(() => import('./sections/Projects'))
const Experience = lazy(() => import('./sections/Experience'))
const TechnicalStack = lazy(() => import('./sections/TechnicalStack'))
const Education = lazy(() => import('./sections/Education'))
const Contact = lazy(() => import('./sections/Contact'))

function App() {
  return (
    <div className="min-h-screen bg-base-100 text-base-content relative overflow-x-hidden">
      {/* Global Background Ambience */}
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none z-0 transition-all duration-500 linear" />
      <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[100px] pointer-events-none z-0 transition-all duration-500 linear" />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[120px] pointer-events-none z-0 opacity-40 transition-all duration-500 linear" />

      <DotMatrixDisplay />
      <div className="relative z-10">
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
            <div className="container mx-auto max-w-7xl px-4">
              <div className="divider my-0"></div>
            </div>
            <Projects />
            <div className="container mx-auto max-w-7xl px-4">
              <div className="divider my-0"></div>
            </div>
            <Experience />
            <div className="container mx-auto max-w-7xl px-4">
              <div className="divider my-0"></div>
            </div>
            <TechnicalStack />
            <div className="container mx-auto max-w-7xl px-4">
              <div className="divider my-0"></div>
            </div>
            <Education />
            <div className="container mx-auto max-w-7xl px-4">
              <div className="divider my-0"></div>
            </div>
            <Contact />
          </Suspense>
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default App
