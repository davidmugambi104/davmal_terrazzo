import React, { useState, useEffect, useRef } from 'react';
import './TypeEffect.css';
import { useNavigate } from 'react-router-dom';

const TypeEffect = () => {
  const [displayText, setDisplayText] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);
  const [showButton, setShowButton] = useState(false);
  const indexRef = useRef(0);
  const navigate = useNavigate();
  
  const message = "Tired of cracked tiles and the fading reliability of red oxide? Upgrade to durable, stylish, and long-lasting terrazzo floors! Our terrazzo flooring is not only beautiful but also easy to maintain, making it the perfect choice for your home or business. Say goodbye to constant repairs and hello to a stunning, low-maintenance solution.            call or whatsapp us +254 729159585";

  useEffect(() => {
    let timeoutId;
    let intervalId;
    const startTime = Date.now();
    const totalCharacters = message.length;
  
    const typeCharacter = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / 4000, 1); // 4 second total duration
      const currentIndex = Math.floor(progress * totalCharacters);
  
      if (currentIndex > indexRef.current) {
        setDisplayText(message.slice(0, currentIndex));
        indexRef.current = currentIndex;
      }
  
      if (progress < 1) {
        timeoutId = requestAnimationFrame(typeCharacter);
      } else {
        setDisplayText(message);
        intervalId = setInterval(() => {
          setCursorVisible(prev => !prev);
        }, 500);
        setShowButton(true);
      }
    };
  
    // Start typing immediately with RAF for smooth animation
    timeoutId = requestAnimationFrame(typeCharacter);
  
    return () => {
      cancelAnimationFrame(timeoutId);
      clearInterval(intervalId);
    };
  }, []);
  
  const handleContactClick = () => {
    alert('Redirecting to Contact Page');
    navigate('/contact'); // Programmatic navigation
  };

  return (
    <div className="typing-container">
      <div id="typing-text">
        {displayText}
        <span className="cursor" style={{ opacity: cursorVisible ? 1 : 0 }}>|</span>
      </div>
      {/* {showButton && (
        <button 
          className="contact-button" 
          onClick={handleContactClick}
        >
          Contact Us
        </button> */}
      {/* )} */}
    </div>
  );
};

export default TypeEffect;
