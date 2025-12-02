const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer footer-center py-8 px-4 text-base-content border-t border-base-300">
      <aside>
        <p className="text-sm text-base-content/60">
          © {currentYear} Rushabh Vakharwala. Built with React & TypeScript.
        </p>
      </aside>
    </footer>
  )
}

export default Footer
