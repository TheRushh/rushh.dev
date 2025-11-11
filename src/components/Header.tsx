import { motion } from "framer-motion";
import ThemeSwitcher from './ThemeSwitcher';

const Header = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const menuItems = ['about', 'projects', 'experience', 'education', 'contact'];

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="navbar bg-base-200/95 backdrop-blur-sm sticky top-0 z-50 shadow-sm border-b border-base-300 text-base-content"
    >
      <div className="navbar-start">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost lg:hidden text-base-content"
          >
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
            {menuItems.map((item) => (
              <li key={item}>
                <a onClick={() => scrollToSection(item)} className="capitalize text-base-content">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl font-semibold text-base-content">
          rushh.dev
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {menuItems.map((item) => (
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
      <div className="navbar-end">
        <ThemeSwitcher />
      </div>
    </motion.header>
  );
};

export default Header;
