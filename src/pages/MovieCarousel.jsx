import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSwipeable } from 'react-swipeable';
import './MovieCarousel.css';

// Temporary image imports - replace with actual images
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

export const MovieCarousel = () => {
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchMovies = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockData = [
        {
          id: 1,
          title: "The Midnight Zone",
          description: "A sci-fi thriller exploring parallel dimensions",
          image: terrazzo1,
          thumbnail: terrazzo1,
          duration: 1
        },
        {
          id: 2,
          title: "Cyber Revolution",
          description: "Futuristic warfare in a digital age",
          image: terrazzo2,
          thumbnail: terrazzo2,
          duration: 1
        },
        {
          id: 3,
          title: "Ocean's Depth",
          description: "Mysterious creatures of the deep sea",
          image: terrazzo3,
          thumbnail: terrazzo3,
          duration: 1
        },
        {
          id: 4,
          title: "Space Pioneers",
          description: "Colonizing Mars in 22nd century",
          image: terrazzo4,
          thumbnail: terrazzo4,
          duration: 1
        },
        {
          id: 5,
          title: "Ancient Secrets",
          description: "Uncovering lost civilizations",
          image: terrazzo5,
          thumbnail: terrazzo5,
          duration: 1
        },
        {
          id: 6,
          title: "The Midnight Zone",
          description: "A sci-fi thriller exploring parallel dimensions",
          image: terrazzo6,
          thumbnail: terrazzo6,
          duration: 1
        },
        {
          id: 7,
          title: "Cyber Revolution",
          description: "Futuristic warfare in a digital age",
          image: terrazzo7,
          thumbnail: terrazzo7,
          duration: 1
        },
        {
          id: 8,
          title: "Ocean's Depth",
          description: "Mysterious creatures of the deep sea",
          image: terrazzo8,
          thumbnail: terrazzo8,
          duration: 1
        },
        {
          id: 9,
          title: "Space Pioneers",
          description: "Colonizing Mars in 22nd century",
          image: terrazzo9,
          thumbnail: terrazzo9,
          duration: 1
        },
        {
          id: 10,
          title: "Ancient Secrets",
          description: "Uncovering lost civilizations",
          image: terrazzo10,
          thumbnail: terrazzo10,
          duration: 1
        },
        {
          id: 11,
          title: "The Midnight Zone",
          description: "A sci-fi thriller exploring parallel dimensions",
          image: terrazzo11,
          thumbnail: terrazzo11,
          duration: 1
        },
        {
          id: 12,
          title: "Cyber Revolution",
          description: "Futuristic warfare in a digital age",
          image: terrazzo12,
          thumbnail: terrazzo12,
          duration: 1
        },
        {
          id: 13,
          title: "Ocean's Depth",
          description: "Mysterious creatures of the deep sea",
          image: terrazzo13,
          thumbnail: terrazzo13,
          duration: 1
        },
        {
          id: 14,
          title: "Space Pioneers",
          description: "Colonizing Mars in 22nd century",
          image: terrazzo14,
          thumbnail: terrazzo14,
          duration: 1
        },
        {
          id: 15,
          title: "Ancient Secrets",
          description: "Uncovering lost civilizations",
          image: terrazzo15,
          thumbnail: terrazzo15,
          duration: 1
        },
        {
          id: 16,
          title: "The Midnight Zone",
          description: "A sci-fi thriller exploring parallel dimensions",
          image: terrazzo16,
          thumbnail: terrazzo16,
          duration: 1
        },
        {
          id: 17,
          title: "Cyber Revolution",
          description: "Futuristic warfare in a digital age",
          image: terrazzo17,
          thumbnail: terrazzo17,
          duration: 1
        },
        {
          id: 18,
          title: "Ocean's Depth",
          description: "Mysterious creatures of the deep sea",
          image: terrazzo18,
          thumbnail: terrazzo18,
          duration: 1
        },
        {
          id: 19,
          title: "Space Pioneers",
          description: "Colonizing Mars in 22nd century",
          image: terrazzo19,
          thumbnail: terrazzo19,
          duration: 1
        },
        {
          id: 20,
          title: "Ancient Secrets",
          description: "Uncovering lost civilizations",
          image: terrazzo20,
          thumbnail: terrazzo20,
          duration: 1
        },
        {
          id: 21,
          title: "Ancient Secrets",
          description: "Uncovering lost civilizations",
          image: terrazzo21,
          thumbnail: terrazzo21,
          duration: 1
        },
        {
        id: 22,
        title: "Ancient Secrets",
        description: "Uncovering lost civilizations",
        image: terrazzo22,
        thumbnail: terrazzo22,
        duration: 1
      },
      {
        id: 23,
        title: "The Midnight Zone",
        description: "A sci-fi thriller exploring parallel dimensions",
        image: terrazzo23,
        thumbnail: terrazzo23,
        duration: 1
      },
      {
        id: 24,
        title: "Cyber Revolution",
        description: "Futuristic warfare in a digital age",
        image: terrazzo24,
        thumbnail: terrazzo24,
        duration: 1
      },
      {
        id: 25,
        title: "Ocean's Depth",
        description: "Mysterious creatures of the deep sea",
        image: terrazzo25,
        thumbnail: terrazzo25,
        duration: 1
      },
      {
        id: 26,
        title: "Space Pioneers",
        description: "Colonizing Mars in 22nd century",
        image: terrazzo26,
        thumbnail: terrazzo26,
        duration: 1
      },
      {
        id: 27,
        title: "Ancient Secrets",
        description: "Uncovering lost civilizations",
        image: terrazzo27,
        thumbnail: terrazzo27,
        duration: 1
      },
      {
        id: 28,
        title: "The Midnight Zone",
        description: "A sci-fi thriller exploring parallel dimensions",
        image: terrazzo28,
        thumbnail: terrazzo28,
        duration: 1
      },
      {
        id: 29,
        title: "Cyber Revolution",
        description: "Futuristic warfare in a digital age",
        image: terrazzo29,
        thumbnail: terrazzo29,
        duration: 1 
      },
      {
        id: 30,
        title: "Ocean's Depth",
        description: "Mysterious creatures of the deep sea",
        image: terrazzo30,
        thumbnail: terrazzo30,
        duration: 1
      },
      {
        id: 31,
        title: "Space Pioneers",
        description: "Colonizing Mars in 22nd century",
        image: terrazzo31,
        thumbnail: terrazzo31,
        duration: 1
      },
      {
        id: 32,
        title: "Ancient Secrets",
        description: "Uncovering lost civilizations",
        image: terrazzo32,
        thumbnail: terrazzo32,
        duration: 1
      },
      {
        id: 33,
        title: "Ancient Secrets",
        description: "Uncovering lost civilizations",
        image: terrazzo33,
        thumbnail: terrazzo33,
        duration: 1
      }
    
    ];
      
      // Simulate a network request
      

      
      setMovies(mockData);
      preloadImages(mockData);
    };

    fetchMovies();
  }, []);

  const preloadImages = (movies) => {
    movies.forEach(movie => {
      const img = new Image();
      img.src = movie.image;
      const thumb = new Image();
      thumb.src = movie.thumbnail;
    });
  };

  const startInterval = useCallback(() => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % movies.length);
      setProgress(0);
    }, movies[currentIndex]?.duration * 1000 || 8000);
  }, [movies, currentIndex]);

  useEffect(() => {
    if (isPlaying && movies.length > 0) {
      startInterval();
    }
    return () => clearInterval(intervalRef.current);
  }, [isPlaying, movies, startInterval]);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const step = 100 / ((movies[currentIndex]?.duration || 8) * 10);
        return prev >= 100 ? 0 : prev + step;
      });
    }, 100);

    return () => clearInterval(progressInterval);
  }, [currentIndex, movies]);

  const handlers = useSwipeable({
    onSwipedLeft: () => handleNext(),
    onSwipedRight: () => handlePrev(),
    trackMouse: true
  });

  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % movies.length);
    resetProgress();
  };

  const handlePrev = () => {
    setCurrentIndex(prev => (prev - 1 + movies.length) % movies.length);
    resetProgress();
  };

  const resetProgress = () => {
    setProgress(0);
    clearInterval(intervalRef.current);
    if (isPlaying) startInterval();
  };

  const getVisibleThumbnails = () => {
    if (!containerRef.current) return 5;
    const containerWidth = containerRef.current.offsetWidth;
    return Math.floor(containerWidth / 160);
  };

  if (movies.length === 0) return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>Loading Movies...</p>
    </div>
  );

  return (
    <div className="tv-frame">
    <div className="tv-knob left" />
    <div className="tv-knob right" />
    <div className="tv-stand" />
    <div className="tv-status-led" />
    <div className="tv-screen" {...handlers}>
    <div className="tv-laser" />
  {/* ... rest of the TV screen content ... */}
      <div className="main-display">
        {movies.map((movie, index) => (
          <div
            key={movie.id}
            className={`slide ${index === currentIndex ? 'active' : ''}`}
          >
            <div className="slide-image-container">
              <img 
                src={movie.image} 
                alt={movie.title}
                className="slide-image"
              />
              <div className="screen-curvature" />
              <div className="crt-overlay" />
            </div>
            
            <div className="movie-content">
              <div className="content-overlay" />
              <div className="info-panel">
                <h2 className="movie-title">{movie.title}</h2>
                <p className="movie-description">{movie.description}</p>
                <div className="action-buttons">
                  <button className="play-button">▶ Play</button>
                  <button className="info-button">ⓘ More Info</button>
                </div>
                <div className="metadata">
                  <span className="duration">⏳ {movie.duration}h</span>
                  <span className="rating">⭐ {movie.rating || '8.5'}/10</span>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Progress and controls remain similar */}
      </div>

      <div className="thumbnail-carousel" ref={containerRef}>
        {/* Thumbnail structure updated */}
        {movies.map((movie, index) => (
          <div
            key={movie.id}
            className={`thumbnail ${index === currentIndex ? 'active' : ''}`}
            onClick={() => {
              setCurrentIndex(index);
              resetProgress();
            }}
          >
            <div className="thumbnail-hover-layer" />
            <img 
              src={movie.thumbnail} 
              alt={movie.title}
              className="thumbnail-image"
            />
            <div className="thumbnail-info">
              <span className="thumbnail-title">{movie.title}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
};

export default MovieCarousel;