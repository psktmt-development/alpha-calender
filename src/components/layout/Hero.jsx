import { memo } from 'react';
import '../../styles/Hero.css';

/**
 * Hero - Main hero section with title and tagline
 */
const Hero = memo(({ 
  title = 'THE ALPHA CIRCLE',
  tagline = 'Curated Experiences for Visionaries • An Invitation-Only Collective for Global Leaders and Legacy Builders',
  badgeText = 'INVITATION ONLY'
}) => {
  return (
    <section className="hero">
      <h1>{title}</h1>
      <p>{tagline}</p>
      <div className="exclusive-badge">{badgeText}</div>
    </section>
  );
});

Hero.displayName = 'Hero';

export default Hero;
