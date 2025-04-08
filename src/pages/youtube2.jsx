import { useState, useRef, useEffect } from 'react';
import "./YouTubeAntiquePlayer.css";
import backgroundImage from './images/terrazzo18.jpg';

const YouTubeAntiquePlayer1 = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const iframeRef = useRef(null);

  useEffect(() => {
    const handleTouchMove = (e) => {
      if (isOpen) e.preventDefault();
    };

    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    return () => document.removeEventListener('touchmove', handleTouchMove);
  }, [isOpen]);

  const videoId = "2UI-X8Ufzm0";

  const handleVideoOpen = () => {
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const handleClose = () => {
    setIsOpen(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <div className="youtube-antique-container">
      {/* Thumbnail Frame */}
      <div
        className={`antique-frame ${isHovered ? 'hovered' : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleVideoOpen}
      >
        <div className="wood-overlay" />
        <div 
          className="video-thumbnail"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
        <div className="play-button">
          <div className="play-icon">
            <svg width="24" height="24" viewBox="0 0 24 24">
              <path fill="#ffffff" d="M8 5v14l11-7z"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Full-screen Video Modal */}
      {isOpen && (
        <div className="youtube-modal-overlay">
          <div className="youtube-modal-container">
            <div className="youtube-iframe-wrapper">
              <iframe
                ref={iframeRef}
                className="youtube-iframe"
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <button
              className="youtube-close-button"
              onClick={handleClose}
              aria-label="Close video"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default YouTubeAntiquePlayer1;