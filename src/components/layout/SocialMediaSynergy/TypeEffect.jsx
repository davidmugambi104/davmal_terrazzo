import React, { useState, useEffect, useRef } from 'react';
import './TypeEffect.css';
import { useNavigate } from 'react-router-dom';

const TypeEffect = () => {
  const [displayText, setDisplayText] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);
  const [showButton, setShowButton] = useState(false);
  const indexRef = useRef(0);
  const navigate = useNavigate();
  
  const message = "Tired of cracked tiles and the fading reliability of red oxide? Upgrade to durable, stylish, and long-lasting terrazzo floors! Our terrazzo flooring is not only beautiful but also easy to maintain, making it the perfect choice for your home or business. Say goodbye to constant repairs and hello to a stunning, low-maintenance solution.";

  useEffect(() => {
    let timeoutId;
    let intervalId;

    const typeCharacter = () => {
      if (indexRef.current < message.length) {
        const currentChar = message[indexRef.current];
        const nextChar = message[indexRef.current + 1];

        setDisplayText(prev => prev + currentChar);

        let delay = Math.random() * 150 + 50;
        
        if (currentChar.match(/[.,!?\n]/)) delay += 300;
        if (currentChar === ' ' && nextChar === ' ') delay += 200;

        if (Math.random() < 0.02) {
          timeoutId = setTimeout(() => {
            setDisplayText(prev => prev.slice(0, -1));
            timeoutId = setTimeout(typeCharacter, 100);
          }, delay);
          return;
        }

        indexRef.current++;
        timeoutId = setTimeout(typeCharacter, delay);
      } else {
        intervalId = setInterval(() => {
          setCursorVisible(prev => !prev);
        }, 700);
        
        setTimeout(() => setShowButton(true), 1000);
      }
    };

    timeoutId = setTimeout(typeCharacter, 1000);

    return () => {
      clearTimeout(timeoutId);
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
      {showButton && (
        <button 
          className="contact-button" 
          onClick={handleContactClick}
        >
          Contact Us
        </button>
      )}
    </div>
  );
};

export default TypeEffect;
