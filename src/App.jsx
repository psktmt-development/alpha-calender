import { useState, useCallback, useMemo, useEffect } from 'react';
import { 
  Header, 
  Footer, 
  Hero, 
  MonthSection, 
  Constellation 
} from './components';
import { monthPeriods, navigationItems, contactInfo } from './data/events';
import { preloadImages } from './hooks';
import './styles/index.css';

// Extract all image URLs for preloading
const allImageUrls = monthPeriods.flatMap(period => 
  period.events.map(event => event.image)
);

// Preload images immediately on module load (before React mounts)
preloadImages(allImageUrls);

/**
 * App - Main application component
 * Manages state for active section and coordinates navigation
 */
function App() {
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);

  // Additional eager preload on mount for maximum cache hits
  useEffect(() => {
    allImageUrls.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  // Derive active section ID from index
  const activeSectionId = useMemo(() => {
    return monthPeriods[activeSectionIndex]?.id || monthPeriods[0].id;
  }, [activeSectionIndex]);

  // Navigation items with labels formatted for display
  const navItems = useMemo(() => {
    return navigationItems.map((item) => ({
      ...item,
      label: item.id.toUpperCase().replace('-', '-')
    }));
  }, []);

  // Section IDs for pagination scroll
  const sectionIds = useMemo(() => {
    return monthPeriods.map(period => period.id);
  }, []);

  // Handle navigation from header nav links
  const handleNavigation = useCallback((sectionId) => {
    const index = monthPeriods.findIndex(period => period.id === sectionId);
    if (index !== -1) {
      setActiveSectionIndex(index);
    }
  }, []);

  // Handle navigation from pagination
  const handlePaginationNavigate = useCallback((index) => {
    setActiveSectionIndex(index);
  }, []);

  return (
    <>
      {/* Background Effects */}
      <Constellation starCount={120} />
      
      {/* Header */}
      <Header 
        activeSection={activeSectionId}
        onNavigate={handleNavigation}
        navigationItems={navItems}
      />
      
      {/* Hero Section */}
      <Hero />
      
      {/* Month Sections */}
      {monthPeriods.map((period, index) => (
        <MonthSection
          key={period.id}
          monthPeriod={period}
          isActive={index === activeSectionIndex}
          currentIndex={activeSectionIndex}
          totalSections={monthPeriods.length}
          onNavigate={handlePaginationNavigate}
          sectionIds={sectionIds}
        />
      ))}
      
      {/* Footer */}
      <Footer contactInfo={contactInfo} />
    </>
  );
}

export default App;
