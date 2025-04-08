import React, { useState, useEffect } from 'react';
import './gallery.css';
import Navbar from '../pages/Navbar';
import Footer from './footer';

const TerrazzoGallery = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
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

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (selectedImageIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [selectedImageIndex]);

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
  };

  const closeFullscreen = () => {
    setSelectedImageIndex(null);
  };

  return (
    <div className="terrazzo-gallery">
      <Navbar />
      <div className="gallery-header">
        <h1 className="gallery-title">Premium Terrazzo Designs</h1>
        <p className="gallery-subtitle">Experience Timeless Elegance In Every Pattern</p>
      </div>
      
      <div className="image-grid">
        {terrazzoImages.map((img, index) => (
          <div 
            className="image-tile" 
            key={img}
            onClick={() => handleImageClick(index)}
          >
            <img 
              src={img}
              alt={`Terrazzo design ${index + 1}`} 
              className="terrazzo-image"
              loading="lazy"
            />
            <div className="image-overlay">
              <button 
                className="inquiry-button"
                onClick={(e) => { 
                  e.stopPropagation();
                  const whatsappNumber = '+254729159585';
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

      {selectedImageIndex !== null && (
        <div className="fullscreen-overlay" onClick={closeFullscreen}>
          <button 
            className="close-button"
            onClick={closeFullscreen}
            aria-label="Close image"
          >
            &times;
          </button>
          <img
            className="fullscreen-image"
            src={terrazzoImages[selectedImageIndex].replace('w=400', 'w=1920').replace('h=400', 'h=1080')}
            alt={`Fullscreen view - Terrazzo design ${selectedImageIndex + 1}`}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      <Footer />
    </div>
  );
};

export default TerrazzoGallery;