import { useState, useCallback, useMemo } from 'react';
import { 
  Header, 
  Footer, 
  Hero, 
  MonthSection, 
  Constellation 
} from './components';
import { monthPeriods, navigationItems, contactInfo } from './data/events';
import './styles/index.css';

/**
 * App - Main application component
 * Manages state for active section and coordinates navigation
 */
function App() {
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);

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
