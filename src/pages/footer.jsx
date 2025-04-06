import React from 'react';
import { FaWhatsapp, FaFacebookF, FaInstagram } from 'react-icons/fa';

export const Footer = () => {
  return (
    <footer className="social-footer" style={styles.footer}>
      <h3 style={styles.heading}>Follow Us On Social Media</h3>
      
      <div style={styles.socialContainer}>
      <a 
      href="https://wa.me/+254729159585?text=Hello%2C%20I%20need%20terrazzo%20%5Binstallation%5D%20or%20%5Bmaterials%5D"
      target="_blank" 
      rel="noopener noreferrer" 
      style={styles.socialLink}
      aria-label="WhatsApp"
    >
  <FaWhatsapp style={styles.icon} />
</a>
        
        <a
          href="https://www.facebook.com/profile.php?id=61568477566243"
          target="_blank"
          rel="noopener noreferrer"
          style={styles.socialLink}
          aria-label="Facebook"
        >
          <FaFacebookF style={styles.icon} />
        </a>
        
        <a
          href="https://www.instagram.com/yourprofile"
          target="_blank"
          rel="noopener noreferrer"
          style={styles.socialLink}
          aria-label="Instagram"
        >
          <FaInstagram style={styles.icon} />
        </a>
      </div>

      <p style={styles.copyright}>
        © {new Date().getFullYear()} davie developer. All rights reserved.
      </p>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: '#333',
    color: 'white',
    padding: '2rem 0',
    textAlign: 'center',
    marginTop: 'auto',
  },
  heading: {
    marginBottom: '1.5rem',
    fontSize: '1.5rem',
  },
  socialContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '2rem',
    marginBottom: '1.5rem',
  },
  socialLink: {
    color: 'white',
    textDecoration: 'none',
    transition: 'transform 0.3s ease',
  },
  icon: {
    fontSize: '2rem',
    transition: 'color 0.3s ease',
  },
  copyright: {
    fontSize: '0.9rem',
    opacity: '0.8',
    marginTop: '1rem',
  },
};

export default Footer;