import React from 'react';
import './gallery.css';
import Navbar from '../pages/Navbar';
import Footer from './footer';

const TerrazzoGallery = () => {
  // Dynamically import all terrazzo images using Vite's glob import
  const terrazzoImages = Object.values(import.meta.glob('./images/*.jpg', { 
    eager: true,
    query: {
      auto: 'format',
      fit: 'crop',
      w: '400',
      h: '400',
      q: '80'
    }
  })).map((mod) => mod.default);

  return (
    <div className="terrazzo-gallery">
      <Navbar />
      <div className="gallery-header">
        <h1 className="gallery-title">Premium Terrazzo Designs</h1>
        <p className="gallery-subtitle">Experience Timeless Elegance in Every Pattern</p>
      </div>
      
      <div className="image-grid">
        {terrazzoImages.map((img, index) => (
          <div className="image-tile" key={img}>
            <img 
              src={img}
              alt={`Terrazzo design ${index + 1}`} 
              className="terrazzo-image"
              loading="lazy"
            />
          <div className="image-overlay">
            <button 
              className="inquiry-button"
              onClick={() => { 
                alert('Redirecting to WhatsApp for inquiry...');
                // Replace with your actual WhatsApp number (include country code without + or 0)
                const whatsappNumber = '+254729159585'; // Example: 911234567890
                const defaultMessage = 'Hello! I would like to request a sample of this terrazzo design.';
                
                window.open(
                  `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(defaultMessage)}`,
                  '_blank'
                );
              }}
            >
              Request Sample
            </button>
          </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default TerrazzoGallery;