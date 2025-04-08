// import { useState, useRef, useEffect } from 'react';
// import "./youtube.css";
// import backgroundImage from './images/terrazzo19.jpg';
// const YouTubeAntiquePlayer = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isHovered, setIsHovered] = useState(false);
//   const iframeRef = useRef(null);
//   useEffect(() => {
//     const handleTouchMove = (e) => {
//       if (isOpen) e.preventDefault();
//     };

//     document.addEventListener('touchmove', handleTouchMove, { passive: false });
//     return () => document.removeEventListener('touchmove', handleTouchMove);
//   }, [isOpen]);

//   // Extracted correct video ID from YouTube Shorts URL
//   const videoId = "jeHWvQx3JC8";  
//   const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

//   const handleVideoOpen = () => {
//     setIsOpen(true);
//   };

//   const handleClose = () => {
//     setIsOpen(false);
//   };

//   return (
//     <div style={{
//       position: 'relative',
//       maxWidth: '300px',
//       margin: '20px',
//       padding: '20px',
//       borderRadius: '10px',
//       backgroundImage: `url(${backgroundImage})`,
//       backgroundSize: 'cover',
//       backgroundPosition: 'center',
//       boxShadow: '0 8px 20px rgba(0,0,0,0.3)'
//     }}>
//       {/* Antique Frame Container */}
//       <div
//         style={{
//           position: 'relative',
//           borderRadius: '8px',
//           overflow: 'hidden',
//           transform: isHovered ? 'scale(1.02)' : 'scale(1)',
//           transition: 'all 0.3s ease',
//           boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
//           border: '4px solid #000',
//           background: '#5a3d2b',
//           cursor: 'pointer'
//         }}
//         onMouseEnter={() => setIsHovered(true)}
//         onMouseLeave={() => setIsHovered(false)}
//         onClick={handleVideoOpen}
//       >
//         {/* Wood Texture Overlay */}
//         <div style={{
//           position: 'absolute',
//           top: 0,
//           left: 0,
//           right: 0,
//           bottom: 0,
//           backgroundImage: `
//             linear-gradient(62deg, #5a3d2b80 0%, #6b4b3780 100%),
//             repeating-linear-gradient(
//               -45deg,
//               transparent,
//               transparent 2px,
//               rgba(0,0,0,0.1) 2px,
//               rgba(0,0,0,0.1) 4px
//             )
//           `,
//           pointerEvents: 'none'
//         }} />

//         {/* Video Thumbnail */}
//         <div style={{
//           width: '100%',
//           paddingBottom: '56.25%', 
//           backgroundImage: `url(${backgroundImage})`,
//           backgroundSize: 'cover',
//           backgroundPosition: 'center',
//           filter: 'sepia(0.3) contrast(1.1)'
//         }} />

//         {/* Play Button */}
//         <div style={{
//           position: 'absolute',
//           top: '50%',
//           left: '50%',
//           transform: 'translate(-50%, -50%)',
//           opacity: isHovered ? 1 : 0.8,
//           transition: 'opacity 0.3s ease',
//         }}>
//           <div style={{
//             width: '60px',
//             height: '60px',
//             background: 'rgba(255, 0, 0, 0.8)',
//             borderRadius: '50%',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             boxShadow: '0 0 20px rgba(0,0,0,0.3)'
//           }}>
//             <svg 
//               width="24" 
//               height="24" 
//               viewBox="0 0 24 24"
//               style={{ fill: '#ffffff', marginLeft: '4px' }}
//             >
//               <path d="M8 5v14l11-7z"/>
//             </svg>
//           </div>
//         </div>
//       </div>

//       {/* Video Modal */}
//       {isOpen && (
//         <div style={{
//           position: 'fixed',
//           top: 0,
//           left: 0,
//           width: '100vw',
//           height: '100vh',
//           backgroundColor: 'rgba(0, 0, 0, 0.9)',
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           zIndex: 1000,
//         }} onClick={handleClose}>
//           <div style={{
//             width: '80%',
//             maxWidth: '800px',
//             position: 'relative',
//             border: '12px solid #5a3d2b',
//             borderRadius: '8px',
//             overflow: 'hidden',
//             background: '#5a3d2b',
//             boxShadow: '0 0 40px rgba(0,0,0,0.5)'
//           }}>
//             <div style={{
//               position: 'relative',
//               paddingBottom: '56.25%', // 16:9 aspect ratio
//               height: 0
//             }}>
//               <iframe
//                 ref={iframeRef}
//                 width="100%"
//                 height="100%"
//                 style={{
//                   position: 'absolute',
//                   top: 0,
//                   left: 0,
//                   border: 'none'
//                 }}
//                 src={`https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1`}
//                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                 allowFullScreen
//               />
//             </div>
//             <button
//               style={{
//                 position: 'absolute',
//                 top: '-15px',
//                 right: '-15px',
//                 backgroundColor: '#5a3d2b',
//                 border: '2px solid #fff',
//                 color: '#fff',
//                 fontSize: '1.5rem',
//                 width: '40px',
//                 height: '40px',
//                 borderRadius: '50%',
//                 cursor: 'pointer',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 boxShadow: '0 2px 10px rgba(0,0,0,0.3)'
//               }}
//               onClick={handleClose}
//             >
//               ×
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default YouTubeAntiquePlayer;
import { useState, useRef, useEffect } from 'react';
import "./YouTubeAntiquePlayer.css";
import backgroundImage from './images/terrazzo19.jpg';

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

const videoId = "jeHWvQx3JC8";  


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
