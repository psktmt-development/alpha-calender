import { memo, useCallback } from 'react';
import '../../styles/Pagination.css';

/**
 * Pagination - Prev/Next navigation for month sections
 */
const Pagination = memo(({ 
  totalItems, 
  activeIndex, 
  onNavigate,
  sectionIds = []
}) => {
  const scrollToSection = useCallback((index) => {
    onNavigate(index);
    
    // Smooth scroll to calendar section
    setTimeout(() => {
      const sectionId = sectionIds[index];
      const section = sectionId ? document.getElementById(sectionId) : null;
      if (section) {
        const headerHeight = 80;
        const sectionTop = section.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        window.scrollTo({
          top: sectionTop,
          behavior: 'smooth'
        });
      }
    }, 50);
  }, [onNavigate, sectionIds]);

  const handlePrev = useCallback(() => {
    if (activeIndex > 0) {
      scrollToSection(activeIndex - 1);
    }
  }, [activeIndex, scrollToSection]);

  const handleNext = useCallback(() => {
    if (activeIndex < totalItems - 1) {
      scrollToSection(activeIndex + 1);
    }
  }, [activeIndex, totalItems, scrollToSection]);

  return (
    <nav className="pagination" aria-label="Month section navigation">
      <button
        className={`nav-btn prev-btn ${activeIndex === 0 ? 'disabled' : ''}`}
        onClick={handlePrev}
        disabled={activeIndex === 0}
        aria-label="Previous section"
      >
        <span className="nav-arrow">&#8249;</span>
        <span className="nav-text">Prev</span>
      </button>
      
      <button
        className={`nav-btn next-btn ${activeIndex === totalItems - 1 ? 'disabled' : ''}`}
        onClick={handleNext}
        disabled={activeIndex === totalItems - 1}
        aria-label="Next section"
      >
        <span className="nav-text">Next</span>
        <span className="nav-arrow">&#8250;</span>
      </button>
    </nav>
  );
});

Pagination.displayName = 'Pagination';

export default Pagination;
