import { useState, useEffect } from 'react';

/**
 * Custom hook to track window width and detect mobile breakpoint
 * @param {number} breakpoint - Mobile breakpoint in pixels (default: 768)
 * @returns {object} - { isMobile, windowWidth }
 */
export const useWindowResize = (breakpoint = 768) => {
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1024
  );

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize, { passive: true });
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return {
    isMobile: windowWidth <= breakpoint,
    windowWidth
  };
};

export default useWindowResize;
