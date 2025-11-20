import Header from './components/Header'
import Footer from './components/Footer'
import MouseFollower from './components/MouseFollower'
import DotMatrixDisplay from './components/DotMatrixDisplay'
import Hero from './sections/Hero'
import About from './sections/About'
import Projects from './sections/Projects'
import Experience from './sections/Experience'
import Education from './sections/Education'
import Contact from './sections/Contact'

function App() {
  return (
    <div className="min-h-screen bg-base-100 text-base-content relative">
      <DotMatrixDisplay />
      <div className="relative z-10">
        <MouseFollower />
        <Header />
        <main>
          <Hero />
          <About />
          <Projects />
          <Experience />
          <Education />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default App
