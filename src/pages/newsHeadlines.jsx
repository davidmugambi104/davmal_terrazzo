import { useState, useEffect } from 'react';

const GlowingTicker = () => {
  const [tickerItems] = useState([
    "New Terrazzo Collection Available Now",
    "Limited Time Installation Discount",
    "Featured Pattern: Cosmic Marble",
    "Eco-Friendly Materials Update"
  ]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % tickerItems.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [tickerItems.length]);

  return (
    <div className="ticker-container">
      <div className="ticker-track">
        <div className="ticker-content">
          <span className="ticker-text">{tickerItems[activeIndex]}</span>
          <div className="glowing-bar"></div>
        </div>
      </div>
    </div>
  );
};

export default GlowingTicker;

// Add this CSS to your stylesheet
const styles = `
.ticker-container {
  position: relative;
  width: 100%;
  height: 34vh;
  top: 0;
  z-index: 0;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  overflow: hidden;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.ticker-track {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.ticker-content {
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 20px;
}

.ticker-text {
  color: #fff;
  font-weight: 600;
  font-size: 2rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  position: relative;
  z-index: 2;
}

.glow-bar {
  position: absolute;
  top: 0;
  left: -100%;
  width: 50%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.3),
    transparent
  );
  animation: glow-run 3s infinite;
}

@keyframes glow-run {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(400%);
  }
}

/* Add these dynamic background animations */
.ticker-container::before {
  content: '';
  position: absolute;
  width: 150%;
  height: 150%;
  background: linear-gradient(
    45deg,
    #3AAFA9,
    #2A75B3,
    #7f00ff,
    #ff0080,
    #ff8c00
  );
  animation: rotate-back 10s linear infinite;
}

.ticker-container::after {
  content: '';
  position: absolute;
  inset: 2px;
  background:rgb(56, 53, 53);
  border-radius: 10px;
}

@keyframes rotate-back {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
`;

// Inject styles (or use CSS Modules/CSS-in-JS)
document.head.insertAdjacentHTML('beforeend', `<style>${styles}</style>`);