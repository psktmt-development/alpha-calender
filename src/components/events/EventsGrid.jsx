import { memo } from 'react';
import EventCard from './EventCard';

/**
 * EventsGrid - Grid container for event cards
 * Renders a responsive grid of EventCard components
 */
const EventsGrid = memo(({ events = [] }) => {
  if (!events.length) {
    return (
      <div className="events-grid">
        <p style={{ textAlign: 'center', color: 'var(--alpha-silver)' }}>
          No events scheduled for this period.
        </p>
      </div>
    );
  }

  return (
    <div className="events-grid">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
});

EventsGrid.displayName = 'EventsGrid';

export default EventsGrid;
