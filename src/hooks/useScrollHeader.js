import { useState, useEffect } from 'react';

/**
 * Custom hook to track scroll position and return whether header should be "scrolled"
 * @param {number} threshold - Scroll threshold in pixels (default: 40)
 * @returns {boolean} - Whether page is scrolled past threshold
 */
export const useScrollHeader = (threshold = 40) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > threshold);
    };

    // Check initial scroll position
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [threshold]);

  return isScrolled;
};

export default useScrollHeader;
