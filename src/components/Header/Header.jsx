// Header.jsx
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import './Header.css';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navItems = ['Home', 'Features', 'How it Works', 'Contact Us', 'Login'];

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-content">
          {/* Logo */}
          <div className="logo-container">
            <div className="logo">
              <div className="logo-circle">
                <span>GW</span>
              </div>
              <span className="company-name">Grey Water System</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="desktop-nav">
            <ul className="nav-list">
              {navItems.map((item) => (
                <li key={item} className="nav-item">
                  <a
                    href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                    className="nav-link"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile menu button */}
          <div className="mobile-menu-button">
            <button onClick={toggleMenu}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`mobile-nav ${isOpen ? 'active' : ''}`}>
          <ul className="mobile-nav-list">
            {navItems.map((item) => (
              <li key={item} className="mobile-nav-item">
                <a
                  href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                  className="mobile-nav-link"
                  onClick={() => setIsOpen(false)}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;