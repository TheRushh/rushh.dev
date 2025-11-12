const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer footer-center p-10 bg-base-300 text-base-content">
      <aside>
        <p className="font-mono">
          © {currentYear} Rushabh Vakharwala
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
