import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./nav.css";

function Navbar() {
  const [nav, setNav] = useState(false);

  return (
<header className="navbar-header artistic-background">
      <div className="navbar-container">
        <a href="/">
          <h1 className="navbar-brand">DAVMAL</h1>
        </a>
        <span className="mobile-menu-button" onClick={() => setNav(!nav)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="menu-icon"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
            />
          </svg>
        </span>

        <div className="nav-menu">
          <NavLink to="/" className="nav-link">
            <li className="nav-item">Home</li>
          </NavLink>
          <NavLink to="/about" className="nav-link">
            <li className="nav-item">About</li>
          </NavLink>
          <NavLink to="/portfolio" className="nav-link">
            <li className="nav-item">Portfolio</li>
          </NavLink>
          <NavLink to="/photos" className="nav-link">
            <li className="nav-item">Gallery</li>
          </NavLink>
          <NavLink to="/contact" className="nav-link">
            <li className="nav-item">Contact</li>
          </NavLink>
        </div>
        </div>
 
      {nav && (
        <div className="mobile-menu" onClick={() => setNav(!nav)}>
          <ul className="mobile-menu-list">
            <NavLink to="/" className="mobile-nav-link">
              <li className="mobile-nav-item">Home</li>
            </NavLink>
            <NavLink to="/about" className="mobile-nav-link">
              <li className="mobile-nav-item">About</li>
            </NavLink>
            <NavLink to="/portfolio" className="mobile-nav-link">
              <li className="mobile-nav-item">Portfolio</li>
            </NavLink>
            <NavLink to="/photos" className="mobile-nav-link">
              <li className="mobile-nav-item">Gallery</li>
            </NavLink>
            <NavLink to="/contact" className="mobile-nav-link">
              <li className="mobile-nav-item">Contact</li>
            </NavLink>
          </ul>
        </div>
        
      )}
    </header>
  );
}

export default Navbar;