import { memo, useCallback, useState } from 'react';
import '../../styles/EventCard.css';

/**
 * EventCard - Individual event card component
 * Displays event details with image, date, title, description, type, and location
 */
const EventCard = memo(({ event }) => {
  const [isHovered, setIsHovered] = useState(false);

  const {
    date,
    weekday,
    title,
    description,
    type,
    location,
    image,
    isVip
  } = event;

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  const handleDragStart = useCallback((e) => {
    e.preventDefault();
  }, []);

  return (
    <article 
      className={`event-card ${isVip ? 'vip' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ zIndex: isHovered ? 10 : 1 }}
    >
      <div 
        className="event-image" 
        style={{ backgroundImage: `url('${image}')` }}
        onDragStart={handleDragStart}
        role="img"
        aria-label={`Event image for ${title}`}
      />
      
      <div className="event-date-container">
        <div className="event-date">{date}</div>
        <div className="event-weekday">{weekday}</div>
      </div>
      
      <div className="event-content">
        <h3 className="event-title">{title}</h3>
        <p className="event-description">{description}</p>
        
        <div className="event-footer">
          <span className="event-type">{type}</span>
          <span className="event-location">{location}</span>
        </div>
      </div>
    </article>
  );
});

EventCard.displayName = 'EventCard';

export default EventCard;
