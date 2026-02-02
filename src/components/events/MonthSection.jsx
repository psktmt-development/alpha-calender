import { memo } from 'react';
import EventsGrid from './EventsGrid';
import Pagination from '../navigation/Pagination';
import '../../styles/MonthSection.css';

/**
 * MonthSection - Container for a bi-monthly event section
 * Includes month header, events grid, and pagination
 */
const MonthSection = memo(({ 
  monthPeriod, 
  isActive, 
  currentIndex,
  totalSections,
  onNavigate,
  sectionIds = []
}) => {
  const { id, title, year, events } = monthPeriod;

  return (
    <section 
      id={id} 
      className={`month-section ${isActive ? 'active' : ''}`}
      aria-hidden={!isActive}
    >
      <header className="month-header">
        <h2 className="month-title">{title}</h2>
        <div className="month-subtitle">{year}</div>
      </header>
      
      <EventsGrid events={events} />
      
      <Pagination 
        totalItems={totalSections}
        activeIndex={currentIndex}
        onNavigate={onNavigate}
        sectionIds={sectionIds}
      />
    </section>
  );
});

MonthSection.displayName = 'MonthSection';

export default MonthSection;
