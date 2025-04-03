import React from 'react';
import './gallery.css';
import Navbar from '../pages/Navbar';
import terrazzo1 from './images/terrazzo1.jpg';
import terrazzo2 from './images/terrazzo2.jpg';
import terrazzo3 from './images/terrazzo3.jpg';
import terrazzo4 from './images/terrazzo4.jpg';
import terrazzo5 from './images/terrazzo5.jpg';
import terrazzo6 from './images/terrazzo6.jpg';
import terrazzo7 from './images/terrazzo7.jpg';
import terrazzo8 from './images/terrazzo8.jpg';
import terrazzo9 from './images/terrazzo9.jpg';
import terrazzo10 from './images/terrazzo10.jpg'
import terrazzo11 from './images/terrazzo11.jpg';
import terrazzo12 from './images/terrazzo12.jpg';
import terrazzo13 from './images/terrazzo13.jpg';
import terrazzo14 from './images/terrazzo14.jpg';
import terrazzo15 from './images/terrazzo15.jpg'
import terrazzo16 from './images/terrazzo16.jpg';
import terrazzo17 from './images/terrazzo17.jpg';
import terrazzo18 from './images/terrazzo18.jpg';
import terrazzo19 from './images/terrazzo19.jpg';
import terrazzo20 from './images/terrazzo20.jpg';
import terrazzo21 from './images/terrazzo21.jpg';
import terrazzo22 from './images/terrazzo22.jpg';
import terrazzo23 from './images/terrazzo23.jpg';
import terrazzo24 from './images/terrazzo24.jpg';
import terrazzo25 from './images/terrazzo25.jpg'
import terrazzo26 from './images/terrazzo26.jpg';
import terrazzo27 from './images/terrazzo27.jpg';
import terrazzo28 from './images/terrazzo28.jpg';
import terrazzo29 from './images/terrazzo29.jpg';
import terrazzo30 from './images/terrazzo30.jpg';
import terrazzo31 from './images/terrazzo31.jpg';
import terrazzo32 from './images/terrazzo32.jpg';
import terrazzo33 from './images/terrazzo33.jpg';
import Footer from './footer';

export const TerrazzoGallery = () => {
  const terrazzoImages = [
    terrazzo1, terrazzo2, terrazzo3, terrazzo4, terrazzo5,
    terrazzo6, terrazzo7, terrazzo8, terrazzo9, terrazzo10,
    terrazzo11, terrazzo12, terrazzo13, terrazzo14, terrazzo15,
    terrazzo16, terrazzo17, terrazzo18, terrazzo19, terrazzo20,
    terrazzo21, terrazzo22, terrazzo23, terrazzo24, terrazzo25,
    terrazzo26, terrazzo27, terrazzo28, terrazzo29, terrazzo30,
    terrazzo31, terrazzo32, terrazzo33
  ];

  return (
    <div className="terrazzo-gallery">
      <Navbar />
      <div className="gallery-header">
        <h1 className="gallery-title">Premium Terrazzo Designs</h1>
        <p className="gallery-subtitle">Experience Timeless Elegance in Every Pattern</p>
      </div>
      
      <div className="image-grid">
        {terrazzoImages.map((img, index) => (
          <div className="image-tile" key={index}>
            <img 
              src={`${img}?auto=format&fit=crop&w=400&h=400&q=80`} 
              alt={`Terrazzo design ${index + 1}`} 
              className="terrazzo-image"
            />
            <div className="image-overlay">
              <button className="inquiry-button">Request Sample</button>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  
  );
};

export default TerrazzoGallery;