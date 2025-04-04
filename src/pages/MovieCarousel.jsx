import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useSwipeable } from 'react-swipeable';
import './MovieCarousel.css';

// Dynamically import all terrazzo images (adjust based on your actual file structure)
const importAll = (r) => r.keys().map(r);
// Replace the require.context import with Vite's import.meta.glob
const terrazzoImages = Object.values(import.meta.glob('./images/*.jpg', { eager: true })).map(mod => mod.default);

const MOVIE_TEMPLATES = [
  {
    title: "The Midnight Zone",
    description: "A sci-fi thriller exploring parallel dimensions",
    duration: 1
  },
  {
    title: "Cyber Revolution",
    description: "Futuristic warfare in a digital age",
    duration: 1
  },
  {
    title: "Ocean's Depth",
    description: "Mysterious creatures of the deep sea",
    duration: 1
  },
  {
    title: "Space Pioneers",
    description: "Colonizing Mars in 22nd century",
    duration: 1
  },
  {
    title: "Ancient Secrets",
    description: "Uncovering lost civilizations",
    duration: 1
  }
];

const generateMockData = (imageCount) => {
  return Array.from({ length: imageCount }, (_, i) => ({
    id: i + 1,
    ...MOVIE_TEMPLATES[i % MOVIE_TEMPLATES.length],
    image: terrazzoImages[i],
    thumbnail: terrazzoImages[i]
  }));
};

const useMovieData = () => {
  const [movies, setMovies] = useState([]);
  
  useEffect(() => {
    const loadMovies = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const mockData = generateMockData(69);
      setMovies(mockData);
      preloadImages(mockData);
    };
    
    loadMovies();
  }, []);

  return movies;
};

const preloadImages = (movies) => {
  movies.forEach(({ image, thumbnail }) => {
    new Image().src = image;
    new Image().src = thumbnail;
  });
};

const useCarouselControls = (movies, isPlaying) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef(null);

  const startInterval = useCallback(() => {
    const duration = (movies[currentIndex]?.duration || 8) * 1000;
    
    intervalRef.current = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % movies.length);
      setProgress(0);
    }, duration);

    return () => clearInterval(intervalRef.current);
  }, [movies, currentIndex]);

  useEffect(() => {
    if (isPlaying && movies.length) {
      startInterval();
    }
    return () => clearInterval(intervalRef.current);
  }, [isPlaying, movies, startInterval]);

  const resetProgress = useCallback(() => {
    setProgress(0);
    clearInterval(intervalRef.current);
    if (isPlaying) startInterval();
  }, [isPlaying, startInterval]);

  const handleNavigation = useCallback((direction) => {
    setCurrentIndex(prev => {
      const newIndex = (prev + direction + movies.length) % movies.length;
      return newIndex;
    });
    resetProgress();
  }, [movies.length, resetProgress]);

  return { currentIndex, progress, handleNavigation, resetProgress };
};

const TVFrame = ({ children }) => (
  <div className="tv-frame">
    <div className="tv-knob left" />
    <div className="tv-knob right" />
    <div className="tv-stand" />
    <div className="tv-status-led" />
    <div className="tv-screen">
      <div className="tv-laser" />
      {children}
    </div>
  </div>
);

const Slide = ({ movie, isActive }) => (
  <div className={`slide ${isActive ? 'active' : ''}`}>
    <div className="slide-image-container">
      <img src={movie.image} alt={movie.title} className="slide-image" />
      <div className="screen-curvature" />
      <div className="crt-overlay" />
    </div>
    <div className="movie-content">
      <div className="content-overlay" />
      <InfoPanel movie={movie} />
    </div>
  </div>
);

const InfoPanel = ({ movie }) => (
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
);

const Thumbnail = ({ movie, isActive, onClick }) => (
  <div className={`thumbnail ${isActive ? 'active' : ''}`} onClick={onClick}>
    <div className="thumbnail-hover-layer" />
    <img src={movie.thumbnail} alt={movie.title} className="thumbnail-image" />
    <div className="thumbnail-info">
      <span className="thumbnail-title">{movie.title}</span>
    </div>
  </div>
);

const ThumbnailCarousel = ({ movies, currentIndex, onThumbnailClick }) => {
  const containerRef = useRef(null);
  
  const visibleThumbnails = useMemo(() => {
    if (!containerRef.current) return 5;
    return Math.floor(containerRef.current.offsetWidth / 160);
  }, [containerRef.current?.offsetWidth]);

  const startIndex = Math.max(0, currentIndex - Math.floor(visibleThumbnails / 2));
  const endIndex = Math.min(movies.length, startIndex + visibleThumbnails);

  return (
    <div className="thumbnail-carousel" ref={containerRef}>
      {movies.slice(startIndex, endIndex).map((movie, index) => (
        <Thumbnail
          key={movie.id}
          movie={movie}
          isActive={startIndex + index === currentIndex}
          onClick={() => onThumbnailClick(startIndex + index)}
        />
      ))}
    </div>
  );
};

export const MovieCarousel = () => {
  const movies = useMovieData();
  const [isPlaying, setIsPlaying] = useState(true);
  const { currentIndex, progress, handleNavigation, resetProgress } = useCarouselControls(movies, isPlaying);
  const handlers = useSwipeable({
    onSwipedLeft: () => handleNavigation(1),
    onSwipedRight: () => handleNavigation(-1),
    trackMouse: true
  });

  if (!movies.length) return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>Loading Movies...</p>
    </div>
  );

  return (
    <TVFrame>
      <div {...handlers} className="main-display">
        {movies.map((movie, index) => (
          <Slide key={movie.id} movie={movie} isActive={index === currentIndex} />
        ))}
      </div>

      <ThumbnailCarousel
        movies={movies}
        currentIndex={currentIndex}
        onThumbnailClick={(index) => {
          setCurrentIndex(index);
          resetProgress();
        }}
      />
    </TVFrame>
  );
};

export default MovieCarousel;