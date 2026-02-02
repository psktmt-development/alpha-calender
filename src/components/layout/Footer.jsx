import { memo } from 'react';
import '../../styles/Footer.css';

/**
 * Footer - Site footer with contact info and copyright
 */
const Footer = memo(({ contactInfo }) => {
  const { locations, address, phone, email, copyright } = contactInfo;

  return (
    <footer className="footer">
      <div className="footer-logo">
        ALPHA<span>CIRCLE</span>
      </div>
      
      <div className="divider" />
      
      <div className="contact-info">
        <div>{locations}</div>
        <div>{address}</div>
        <div>
          <a href={`tel:${phone.replace(/\s/g, '')}`}>{phone}</a>
          {' • '}
          <a href={`mailto:${email}`}>{email}</a>
        </div>
      </div>
      
      <div className="copyright">
        {copyright}
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';

export default Footer;
