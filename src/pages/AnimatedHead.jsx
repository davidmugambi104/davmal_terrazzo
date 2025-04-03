// components/ResponsiveAnimatedHeading.tsx
'use client';

import { useEffect, useState } from 'react';
import './AnimatedHead.css';
export const ResponsiveAnimatedHeading = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Initial check
    handleResize();
    
    // Add resize listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const animationStyles = {
    '--typing-steps': isMobile ? '19' : '19',
    '--typing-duration': isMobile ? '2.5s' : '3s',
    '--cursor-width': isMobile ? '1px' : '2px'
  };

  return (
    <h1 
      className="h1 text-center animate-fade-in-up"
      style={animationStyles}
    >
      DAVMAL TERRAZZO ENT
    </h1>
  );
};
export default ResponsiveAnimatedHeading;