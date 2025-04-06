import { useState, useEffect } from 'react';
import { XMarkIcon, ArrowLeftIcon, ArrowRightIcon, ShareIcon } from '@heroicons/react/24/outline';
import terrazzo58 from './images/terrazzo58.jpg';
import terrazzo53 from './images/terrazzo18.jpg';
const ShopGallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    {
      id: 1,
      url: terrazzo58,
      title: 'Happy client',
      description: 'Designed a unique terrazzo pattern with a modern touch for a client'
    },

    {
      id: 2,
      url: terrazzo53,
      title: 'Vicodec highschool project',
      description: 'Completed a large-scale terrazzo installation in a high school'
    },

  ];

  useEffect(() => {
    images.forEach(img => {
      const image = new Image();
      image.src = img.url;
    });
  }, []);

  useEffect(() => {
    const handleBodyScroll = (shouldLock) => {
      document.body.style.overflow = shouldLock ? 'hidden' : 'auto';
      document.body.style.touchAction = shouldLock ? 'none' : 'auto';
    };

    if (selectedImage) {
      handleBodyScroll(true);
      window.scrollTo(0, 0);
    } else {
      handleBodyScroll(false);
    }

    return () => handleBodyScroll(false);
  }, [selectedImage]);

  const openImage = (index) => {
    setCurrentImageIndex(index);
    setSelectedImage(images[index]);
  };

  const navigate = (direction) => {
    const newIndex = (currentImageIndex + direction + images.length) % images.length;
    setCurrentImageIndex(newIndex);
    setSelectedImage(images[newIndex]);
  };

  return (
    <div className="gallery-container">
      <div className="image-grid">
        {images.map((img, index) => (
          <div 
            key={img.id}
            className="image-item"
            onMouseEnter={(e) => e.currentTarget.classList.add('hovered')}
            onMouseLeave={(e) => e.currentTarget.classList.remove('hovered')}
            onClick={() => openImage(index)}
          >
            <img 
              src={img.url} 
              alt={img.title}
              width={400}
              height={300}
              className="grid-image"
              loading="lazy"
            />
            <button className="view-button">View Details</button>
          </div>
        ))}
      </div>

      {selectedImage && (
        <div className="modal-overlay">
          <div 
            className="modal-content"
            onTouchMove={(e) => e.stopPropagation()}
            onScroll={(e) => e.stopPropagation()}
          >
            <button 
              className="close-btn" 
              onClick={() => setSelectedImage(null)}
              aria-label="Close"
            >
              <XMarkIcon className="icon" />
            </button>
            
            <button className="share-btn" aria-label="Share">
              <ShareIcon className="icon" />
            </button>

            <img 
              src={selectedImage.url} 
              alt={selectedImage.title}
              className="modal-image"
              width={1200}
              height={800}
            />
            
            <div className="image-info">
              <h3>{selectedImage.title}</h3>
              <p>{selectedImage.description}</p>
            </div>

            <button 
              className="nav-btn prev" 
              onClick={() => navigate(-1)}
              aria-label="Previous"
            >
              <ArrowLeftIcon className="icon" />
            </button>
            <button 
              className="nav-btn next" 
              onClick={() => navigate(1)}
              aria-label="Next"
            >
              <ArrowRightIcon className="icon" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = `
.gallery-container {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.image-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(300px, 100%), 1fr));
  gap: 1.5rem;
}

.image-item {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.3s ease;
  cursor: pointer;
  aspect-ratio: 4/3;
}

.grid-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  background: linear-gradient(110deg, #ececec 8%, #f5f5f5 18%, #ececec 33%);
  background-size: 200% 100%;
  animation: 1.5s shine linear infinite;
}

@keyframes shine {
  to {
    background-position-x: -200%;
  }
}

.image-item.hovered .grid-image {
  transform: scale(0.95);
  filter: blur(2px);
}

.view-button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) !important;
  padding: 12px 24px;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 25px;
  font-weight: 600;
  opacity: 0;
  transition: opacity 0.3s ease;
  cursor: pointer;
  z-index: 2;
  margin: 0 !important;
  white-space: nowrap;
}

.image-item.hovered .view-button {
  opacity: 1;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  overscroll-behavior: contain;
  -webkit-overflow-scrolling: touch;
  touch-action: none;
}

.modal-content {
  position: fixed;
  top: 50% !important;
  left: 50% !important;
  transform: translate(-50%, -50%) !important;
  max-width: 90%;
  max-height: 90vh;
  border-radius: 16px;
  overflow: hidden;
  background: #111;
  -webkit-transform: translateZ(0);
  scroll-behavior: smooth;
  scrollbar-width: none;
  -ms-overflow-style: none;
  backface-visibility: hidden;
  will-change: transform;
}

.modal-content::-webkit-scrollbar {
  display: none;
}

.modal-image {
  width: 100%;
  height: auto;
  max-height: 80vh;
  object-fit: contain;
}

.image-info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 2rem;
  background: linear-gradient(transparent 10%, rgba(0, 0, 0, 0.7) 40%);
  color: white;
  backdrop-filter: blur(2px);
}

.close-btn, .share-btn {
  position: absolute;
  top: 1rem;
  background: rgba(0, 0, 0, 0.5);
  border: none;
  padding: 0.5rem;
  border-radius: 50%;
  cursor: pointer;
  transition: background 0.3s ease;
  z-index: 2;
}

.close-btn {
  right: 1rem;
}

.share-btn {
  left: 1rem;
}

.close-btn:hover, .share-btn:hover {
  background: rgba(0, 0, 0, 0.8);
}

.icon {
  width: 24px;
  height: 24px;
  color: white;
}

.nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  border: none;
  padding: 1rem;
  cursor: pointer;
  transition: background 0.3s ease;
  z-index: 2;
}

.nav-btn:hover {
  background: rgba(0, 0, 0, 0.8);
}

.prev {
  left: 1rem;
}

.next {
  right: 1rem;
}

@media (max-width: 768px) {
  .modal-content {
    width: 95vw !important;
    height: auto !important;
    top: 50% !important;
    left: 50% !important;
    transform: translate(-50%, -50%) !important;
    margin: 0 !important;
    border-radius: 12px;
  }

  .modal-image {
    max-height: 65vh;
  }

  .image-info {
    padding: 1.5rem;
  }

  @supports (-webkit-touch-callout: none) {
    .modal-content {
      max-height: -webkit-fill-available;
    }
  }
}

@media (max-width: 480px) {
  .gallery-container {
    padding: 1rem;
  }

  .image-grid {
    grid-template-columns: 1fr;
  }

  .image-item {
    aspect-ratio: 3/2;
  }

  .view-button {
    font-size: 0.9rem;
    padding: 8px 16px;
  }

  .modal-content {
    border-radius: 8px;
  }

  .image-info {
    padding: 1rem;
  }

  .image-info h3 {
    font-size: 1.1rem;
  }

  .image-info p {
    font-size: 0.85rem;
  }
}

@media (max-width: 360px) {
  .image-item img {
    height: 200px;
  }

  .view-button {
    font-size: 0.8rem;
    padding: 6px 12px;
  }
}
`;

const styleSheet = document.createElement('style');
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default ShopGallery;