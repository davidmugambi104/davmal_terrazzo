import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import "./nav.css";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close menu on scroll and ESC key
  useEffect(() => {
    const handleScroll = () => setIsMenuOpen(false);
    const handleKeyPress = (e) => e.key === 'Escape' && setIsMenuOpen(false);
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('keydown', handleKeyPress);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return (
    <header className="navbar-header">
      <div className="navbar-container">
        <a href="/" className="navbar-brand">
          <span className="gradient-text">DAVMAL</span>
        </a>

        {/* Mobile Toggle Button (Visible only on small screens) */}
        <button 
          className={`hamburger ${isMenuOpen ? 'active' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Menu"
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>

        {/* Desktop Navigation (Left-aligned) */}
        <nav className="desktop-nav">
          <NavLink to="/" className="nav-link">Home</NavLink>
          <NavLink to="/about" className="nav-link">About</NavLink>
          <NavLink to="/portfolio" className="nav-link">Portfolio</NavLink>
          <NavLink to="/photos" className="nav-link">Gallery</NavLink>
          <NavLink to="/contact" className="nav-link">Contact</NavLink>
        </nav>

        {/* Mobile Navigation (Right-side drawer with animation) */}
        <motion.div 
          initial={{ x: "100%" }}
          animate={{ x: isMenuOpen ? "0%" : "100%" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className={`mobile-nav ${isMenuOpen ? 'active' : ''}`}
        >
          <div className="mobile-nav-glass">
            <button 
              className="close-button"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close"
            >
              <div className="close-icon"></div>
            </button>
            
            <div className="mobile-nav-content">
              <NavLink to="/" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>
                Home
              </NavLink>
              <NavLink to="/about" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>
                About
              </NavLink>
              <NavLink to="/portfolio" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>
                Portfolio
              </NavLink>
              <NavLink to="/photos" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>
                gallery
              </NavLink>
              <NavLink to="/contact" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>
                Contact
              </NavLink>
            </div>
          </div>
        </motion.div>
      </div>
    </header>
  );
}

export default Navbar;
