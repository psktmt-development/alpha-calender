import { memo, useCallback } from 'react';
import '../../styles/Pagination.css';

/**
 * Pagination - Dot-style navigation for month sections
 */
const Pagination = memo(({ 
  totalItems, 
  activeIndex, 
  onNavigate,
  sectionIds = []
}) => {
  const handleClick = useCallback((index) => {
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

  return (
    <nav className="pagination" aria-label="Month section navigation">
      {Array.from({ length: totalItems }, (_, index) => (
        <button
          key={index}
          className={`page-btn ${activeIndex === index ? 'active' : ''}`}
          onClick={() => handleClick(index)}
          aria-label={`Go to section ${index + 1}`}
          aria-current={activeIndex === index ? 'true' : undefined}
        />
      ))}
    </nav>
  );
});

Pagination.displayName = 'Pagination';

export default Pagination;
