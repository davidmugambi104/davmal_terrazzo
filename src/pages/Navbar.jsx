import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./nav.css";

function Navbar() {
  const [nav, setNav] = useState(false);

  return (
    <header className="navbar-header">
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
          <NavLink to="/feedback" className="nav-link">
            <li className="nav-item">Feedback</li>
          </NavLink>
          <NavLink to="/contact" className="nav-link">
            <li className="nav-item">Contact</li>
          </NavLink>
        </div>
        <a
          href="https://github.com/PugazhendhiDev/"
          className="hire-button"
        >
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
              d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
            />
          </svg>
          <h1 className="hire-text">Hire</h1>
        </a>
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
            <NavLink to="/feedback" className="mobile-nav-link">
              <li className="mobile-nav-item">Feedback</li>
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