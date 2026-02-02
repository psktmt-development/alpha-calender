import { useState, useCallback, useEffect, memo } from 'react';
import { useScrollHeader, useWindowResize } from '../../hooks';
import '../../styles/Header.css';

/**
 * Header - Main navigation header with logo and nav links
 * Features: Scroll effect, mobile menu toggle, active section tracking
 */
const Header = memo(({ 
  activeSection, 
  onNavigate, 
  navigationItems = [] 
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isScrolled = useScrollHeader(40);
  const { isMobile } = useWindowResize(768);

  // Close mobile menu when window resizes to desktop
  useEffect(() => {
    if (!isMobile && isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  }, [isMobile, isMobileMenuOpen]);

  const handleNavClick = useCallback((sectionId) => {
    onNavigate(sectionId);
    setIsMobileMenuOpen(false);
    
    // Smooth scroll to calendar section (after hero)
    setTimeout(() => {
      const section = document.getElementById(sectionId);
      if (section) {
        const headerHeight = 80;
        const sectionTop = section.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        window.scrollTo({
          top: sectionTop,
          behavior: 'smooth'
        });
      }
    }, 50);
  }, [onNavigate]);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <a href="#" className="logo" onClick={(e) => e.preventDefault()}>
        <img src="/logo.png" alt="Alpha Circle" className="logo-img" />
      </a>
      
      <button 
        className="nav-toggle" 
        onClick={toggleMobileMenu}
        aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isMobileMenuOpen}
      >
        {isMobileMenuOpen ? '✕' : '☰'}
      </button>
      
      <ul className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
        {navigationItems.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={activeSection === item.id ? 'active' : ''}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(item.id);
              }}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </header>
  );
});

Header.displayName = 'Header';

export default Header;
