import { useEffect, useRef, memo } from 'react';
import '../../styles/Constellation.css';

/**
 * Constellation - Animated star background effect
 * Creates a twinkling star field for visual appeal
 */
const Constellation = memo(({ starCount = 120 }) => {
  const constellationRef = useRef(null);

  useEffect(() => {
    const constellation = constellationRef.current;
    if (!constellation) return;

    // Clear any existing stars
    constellation.innerHTML = '';

    // Create stars
    for (let i = 0; i < starCount; i++) {
      const star = document.createElement('div');
      star.classList.add('star');
      
      // Random size between 0.8px and 2.8px
      const size = Math.random() * 2 + 0.8;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      
      // Random position
      star.style.top = `${Math.random() * 100}%`;
      star.style.left = `${Math.random() * 100}%`;
      
      // Random animation duration and delay
      star.style.setProperty('--duration', `${Math.random() * 3 + 2}s`);
      star.style.setProperty('--delay', `${Math.random() * 5}s`);
      
      constellation.appendChild(star);
    }

    // Cleanup
    return () => {
      if (constellation) {
        constellation.innerHTML = '';
      }
    };
  }, [starCount]);

  return <div className="constellation" ref={constellationRef} aria-hidden="true" />;
});

Constellation.displayName = 'Constellation';

export default Constellation;
