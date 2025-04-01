import React, { useState, useEffect, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import NetworkStatistics from './NetworkStatistics';
import { motion, AnimatePresence } from 'framer-motion';
import { artisans as artisanData } from './artisans';
import ArtisanFilter from './ArtisanFilter';
import CertificationBadge from './CertificationBadge';
import './ArtisanNetwork.css';

// Fix leaflet marker icons
const DefaultIcon = L.icon({
  iconUrl: '/marker-icon.png',
  iconRetinaUrl: '/marker-icon-2x.png',
  shadowUrl: '/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

const ArtisanNetwork = () => {
  const [artisans] = useState(artisanData);
  const [filters, setFilters] = useState({
    region: '',
    craftType: '',
    experience: '',
  });
  const [stats, setStats] = useState({ 
    totalArtisans: 0, 
    averageExperience: 0, 
    countries: 0 
  });
  const [selectedArtisan, setSelectedArtisan] = useState(null);
  const [featuredArtisan, setFeaturedArtisan] = useState(null);
  const [mapCenter] = useState([20, 0]);

  const filteredArtisans = useMemo(() => (
    artisans.filter(artisan => (
      (!filters.region || artisan.region === filters.region) &&
      (!filters.craftType || artisan.craftType === filters.craftType) &&
      (!filters.experience || artisan.yearsExperience >= parseInt(filters.experience))
    ))
  ), [artisans, filters]);

  useEffect(() => {
    const calculateStatistics = () => {
      const total = filteredArtisans.length;
      const averageExp = total > 0 
        ? filteredArtisans.reduce((sum, a) => sum + a.yearsExperience, 0) / total 
        : 0;
      const countries = new Set(filteredArtisans.map(a => a.country)).size;
      
      setStats({ 
        totalArtisans: total, 
        averageExperience: Math.round(averageExp), 
        countries 
      });
    };

    calculateStatistics();
  }, [filteredArtisans]);

  useEffect(() => {
    const selectFeaturedArtisan = () => {
      if (filteredArtisans.length > 0) {
        const randomIndex = Math.floor(Math.random() * filteredArtisans.length);
        setFeaturedArtisan(filteredArtisans[randomIndex]);
      } else {
        setFeaturedArtisan(null);
      }
    };

    selectFeaturedArtisan();
  }, [filteredArtisans]);

  const handleFilterChange = useCallback((name, value) => {
    setFilters(prev => ({ ...prev, [name]: value }));
  }, []);

  const showNextArtisan = useCallback(() => {
    if (filteredArtisans.length > 1) {
      setFeaturedArtisan(prev => {
        const currentIndex = filteredArtisans.findIndex(a => a.id === prev?.id);
        const nextIndex = (currentIndex + 1) % filteredArtisans.length;
        return filteredArtisans[nextIndex];
      });
    }
  }, [filteredArtisans]);

  const craftTypeOptions = useMemo(
    () => [...new Set(artisans.map(a => a.craftType))], 
    [artisans]
  );

  const regionOptions = useMemo(
    () => [...new Set(artisans.map(a => a.region))], 
    [artisans]
  );

  return (
    <div className="artisan-network">
      <ErrorBoundary>
        <NetworkStatistics stats={stats} />
      </ErrorBoundary>

      <ErrorBoundary>
        <ArtisanFilter
          filters={filters}
          regions={regionOptions}
          craftTypes={craftTypeOptions}
          onFilterChange={handleFilterChange}
        />
      </ErrorBoundary>

      <AnimatePresence>
        {selectedArtisan && (
          <ArtisanDetailModal
            artisan={selectedArtisan}
            onClose={() => setSelectedArtisan(null)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {featuredArtisan && (
          <FeaturedArtisanCard
            artisan={featuredArtisan}
            onClose={() => setFeaturedArtisan(null)}
            onNext={showNextArtisan}
            totalResults={filteredArtisans.length}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

const ArtisanPopupContent = ({ artisan }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="artisan-popup">
      <div className="media-container">
        <img 
          src={artisan.profileImage || '/default-avatar.jpg'}
          alt={`${artisan.name}'s profile`}
          className={`popup-image ${imageLoaded ? '' : 'loading'}`}
          onLoad={() => setImageLoaded(true)}
          onError={(e) => {
            e.target.src = '/default-avatar.jpg';
            setImageLoaded(true);
          }}
        />
      </div>
      <h3>{artisan.name}</h3>
      <p className="craft-type">{artisan.craftType}</p>
      <CertificationBadge certifications={artisan.certifications} />
      <div className="popup-meta">
        <span className="experience">📌 {artisan.location}</span>
        <span className="experience">⏳ {artisan.yearsExperience} years experience</span>
      </div>
    </div>
  );
};

ArtisanPopupContent.propTypes = {
  artisan: PropTypes.shape({
    profileImage: PropTypes.string,
    name: PropTypes.string.isRequired,
    craftType: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    yearsExperience: PropTypes.number.isRequired,
    certifications: PropTypes.arrayOf(PropTypes.string),
  }).isRequired
};

const FeaturedArtisanCard = ({ artisan, onClose, onNext, totalResults }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <motion.div
      className="featured-artisan-container"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 120 }}
    >
      <div className="featured-artisan">
        <button 
          className="close-featured" 
          onClick={onClose}
          aria-label="Close featured artisan"
        >
          ×
        </button>
        
        <div className="media-container">
          <img 
            src={artisan.profileImage || '/default-avatar.jpg'}
            alt={`Featured artisan ${artisan.name}`}
            className={`profile-image ${imageLoaded ? '' : 'loading'}`}
            onLoad={() => setImageLoaded(true)}
            onError={(e) => {
              e.target.src = '/default-avatar.jpg';
              setImageLoaded(true);
            }}
          />
        </div>

        <div className="featured-details">
          <h3>{artisan.name}</h3>
          <p className="craft-type">{artisan.craftType} Specialist</p>
          
          <div className="sustainability-meter">
            <div 
              className="meter-fill"
              style={{ width: `${artisan.sustainabilityScore}%` }}
              aria-label={`Sustainability score: ${artisan.sustainabilityScore}%`}
            />
          </div>

          <div className="stats-grid">
            <StatItem icon="⭐" label="Rating" value={artisan.rating || '4.5'} />
            <StatItem icon="📌" label="Location" value={artisan.location} />
            <StatItem icon="⏳" label="Experience" value={`${artisan.yearsExperience} yrs`} />
            <StatItem icon="🌍" label="Products" value={`${artisan.productsSold}+ sold`} />
          </div>

          <p className="featured-bio">
            {truncateText(artisan.bio, 200)}
            {artisan.bio.length > 200 && (
              <button 
                className="read-more"
                onClick={() => setSelectedArtisan(artisan)}
              >
                ...Read more
              </button>
            )}
          </p>

          <div className="featured-actions">
            {totalResults > 1 && (
              <button 
                className="next-artisan-btn"
                onClick={onNext}
              >
                Next Artisan ({totalResults} available)
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

FeaturedArtisanCard.propTypes = {
  artisan: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  totalResults: PropTypes.number.isRequired
};

class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Component Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-fallback">
          ⚠️ Something went wrong. Please try refreshing the page.
        </div>
      );
    }
    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired
};

const StatItem = ({ icon, label, value }) => (
  <div className="stat-item">
    <span className="stat-icon">{icon}</span>
    <div className="stat-text">
      <span className="stat-value">{value}</span>
      <span className="stat-label">{label}</span>
    </div>
  </div>
);

StatItem.propTypes = {
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
};

const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return `${text.substr(0, text.lastIndexOf(' ', maxLength))}...`;
};

export default ArtisanNetwork;