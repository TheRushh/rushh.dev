import { motion } from 'framer-motion'
import { useState } from 'react'
import ThemeSwitcher from './ThemeSwitcher'
import ResumeModal from './ResumeModal'

const Header = () => {
  const [isResumeOpen, setIsResumeOpen] = useState(false)
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const menuItems = ['about', 'projects', 'experience', 'education', 'contact']

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="bg-base-200/95 backdrop-blur-sm sticky top-0 z-50 shadow-sm text-base-content"
        onClick={() => {
          if (isResumeOpen) {
            setIsResumeOpen(false)
          }
        }}
      >
        <div className="navbar container mx-auto max-w-7xl px-4">
          <div className="navbar-start">
            <div className="dropdown">
              <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden text-base-content">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-200 rounded-box w-52 text-base-content"
              >
                {menuItems.map(item => (
                  <li key={item}>
                    <a
                      onClick={() => scrollToSection(item)}
                      className="capitalize text-base-content"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <a className="btn btn-ghost text-xl font-bold text-base-content gap-0 font-meslo">
              <span className="text-base-content/60">(</span>
              <span className="text-base-content/90 inline">rushh</span>
              <span className="text-primary inline">.dev</span>
              <span className="text-base-content/60">)</span>
            </a>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              {menuItems.map(item => (
                <li key={item}>
                  <a
                    onClick={() => scrollToSection(item)}
                    className="capitalize text-base-content hover:text-primary transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="navbar-end gap-2">
            {/* GitHub Link */}
            <a
              href="https://github.com/therushh"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-sm btn-circle transition-all hover:bg-base-content/10 hover:ring-2 hover:ring-base-content/30 bg-transparent border-none"
              aria-label="GitHub"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"
                />
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
            </a>

            {/* Resume Button */}
            <button
              onClick={e => {
                e.stopPropagation()
                setIsResumeOpen(!isResumeOpen)
              }}
              className={`btn btn-sm btn-circle transition-all bg-transparent border-none hover:bg-base-content/10 hover:ring-2 hover:ring-base-content/30 ${
                isResumeOpen ? 'bg-base-content/10 ring-2 ring-base-content/30' : ''
              }`}
              aria-label="View Resume"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </button>

            {/* LinkedIn Link */}
            <a
              href="https://www.linkedin.com/in/rushabhvakharwala/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-sm btn-circle transition-all hover:bg-base-content/10 hover:ring-2 hover:ring-base-content/30 bg-transparent border-none"
              aria-label="LinkedIn"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
                />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>

            <ThemeSwitcher />
          </div>
        </div>
      </motion.header>
      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
    </>
  )
}

export default Header
