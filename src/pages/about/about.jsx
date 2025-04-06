import { useState } from 'react';
import './AboutPage.css'; // Create this CSS file for styling
import Navbar from '../Navbar';
import Footer from '../footer.jsx';
import '../gallery.css'
import { FaCertificate, FaShieldAlt, FaLeaf } from 'react-icons/fa';

import terrazzo1 from '../images/terrazzo1.jpg';
import terrazzo2 from '../images/terrazzo2.jpg';
import terrazzo3 from '../images/terrazzo3.jpg';
export const AboutUs = () => {
  const [loadedImages, setLoadedImages] = useState(0);

  // Add your image paths here
  const businessPhotos = [
    terrazzo1,
    terrazzo2,
    terrazzo3
  ];

  return (
    <div id="about-container"  className="professional-background">
        <Navbar />
      <section className="h1 hero-section">
        <h1>Terrazzo experts</h1>
      </section>

      {/* Brand Story Section */}
      <section className="content-section">
        <h2>Our Terrazzo Legacy</h2>
        <p>
          {`Since 2010, Davmal Terrazzo Enterprises has transformed floors across Nairobi city and beyond,
          into stunning terrazzo masterpieces. What began as a family passion for 
          durable, beautiful surfaces has grown into a specialized installation 
          service trusted by +254 729 159585 satisfied customers.`}
        </p>
      </section>

      {/* Photo Gallery */}
      <section className="photo-gallery">
        <h2>Our Work Speaks Volumes</h2>
        <div className="gallery-grid">
          {businessPhotos.map((photo, index) => (
            <div 
              key={index} 
              className="gallery-item"
              aria-label={`Terrazzo installation example ${index + 1}`}
            >
              {loadedImages > index ? null : <div className="image-placeholder" />}
              <img 
                src={photo}
                alt={`Terrazzo installation by Davmal Terrazzo Enterprises`}
                onLoad={() => setLoadedImages(prev => prev + 1)}
                style={{ display: loadedImages > index ? 'block' : 'none' }}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Who We Serve */}
      <section className="content-section highlighted">
        <h2>Perfecting Spaces For</h2>
        <ul className="service-list">
          <li>🏢 Commercial property owners needing durable flooring</li>
          <li>🏡 Homeowners wanting luxury finishes</li>
          <li>🏨 Hospitality venues requiring stunning first impressions</li>
          <li>🏛 Architects specifying premium materials</li>
        </ul>
      </section>

      {/* How We Operate */}
      <section className="process-section">
        <h2>Our Installation Excellence Process</h2>
        <div className="process-steps">
          <div className="step">
            <h3>1. Consultation</h3>
            <p>On-site evaluation and design recommendations</p>
          </div>
          <div className="step">
            <h3>2. Precision Preparation</h3>
            <p>Subfloor conditioning and pattern layout</p>
          </div>
          <div className="step">
            <h3>3. Expert Installation</h3>
            <p>Skilled craftsmen using specialized techniques</p>
          </div>
          <div className="step">
            <h3>4. Final Perfection</h3>
            <p>Grinding, polishing, and quality inspection</p>
          </div>
        </div>
      </section>

      <section className="materials-section">
        <h2>Premium Materials & Professional Equipment</h2>
        <p className="materials-intro">
            We invest in top-grade installation materials and tools to ensure lasting terrazzo beauty:
        </p>

        <div className="materials-grid">
            {/* Material Groups */}
            <div className="material-group">
            <h3>🏗️ Core Materials</h3>
            <ul>
                <li>ISO-Certified White Cement</li>
                <li>Marble Chips (White, Cream, Black, Red)</li>
                <li>Premium Oxide Pigments</li>
                <li>Durable Dividing Strips</li>
                <li>Quality Block Stone Bases</li>
            </ul>
            </div>

            <div className="material-group">
            <h3>✨ Finishing System</h3>
            <ul>
                <li>Industrial-Grade Flow Polish</li>
                <li>Professional HCl Acid Solutions</li>
                <li>High-Density Washing Pads</li>
                <li>Diamond-Encrusted Grading Disks</li>
            </ul>
            </div>

            <div className="material-group">
            <h3>🔧 Professional Equipment</h3>
            <ul>
                <li>Machine Diamonds for Precision Cutting</li>
                <li>Commercial-Grade Terrazzo Grinders</li>
                <li>Skirting Timber Templates</li>
                <li>Panel Pinning Systems</li>
                <li>Specialized Hand Brushes</li>
            </ul>
            </div>
        </div>


            <div className="quality-badges">
              <div className="badge">
                <FaCertificate className="badge-icon" style={{ color: '#2ecc71' }} />
                <span>Certified Materials</span>
              </div>
              <div className="badge">
                <FaShieldAlt className="badge-icon" style={{ color: '#3498db' }} />
                <span>10-Year Installation Warranty</span>
              </div>
              <div className="badge">
                <FaLeaf className="badge-icon" style={{ color: '#27ae60' }} />
                <span>Low-VOC Compounds</span>
              </div>
            </div>

        </section>

      {/* Persuasive CTA */}
      <section className="cta-section">
        <h2>Why Choose Our Installation Expertise?</h2>
        <div className="usp-grid">
          <div className="usp">
            <h3>25+ Years Combined Experience</h3>
            <p>Proven techniques for flawless results</p>
          </div>
          <div className="usp">
            <h3>10-Year Installation Guarantee</h3>
            <p>Confidence in our workmanship</p>
          </div>
        </div>
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
      </section>
      <Footer />
    </div>
  );
};

export default AboutUs;