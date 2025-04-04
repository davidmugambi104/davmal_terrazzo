import { useEffect, useState, useContext, useMemo } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { debounce } from 'lodash';
import { useInView } from 'react-intersection-observer';
import PatternGenerator from '../pages/products/custom-design-lab/PatternGenerator';
import RealTimeRender from '../pages/products/custom-design-lab/RealTimeRender';
import YouTubeAntiquePlayer from './VideoPopup.jsx';
import ReviewAggregator from '../components/layout/SocialMediaSynergy/ReviewAggregator';
import TypeEffect from '../components/layout/SocialMediaSynergy/TypeEffect.jsx';
import Navbar from './Navbar';
import MovieCarousel from './MovieCarousel';
import ResponsiveAnimatedHeading from './AnimatedHead.jsx';
import AntiquePhotoFrame from './frame.jsx';
import Footer  from './footer.jsx';
import './home.css';

const HomePageErrorFallback = ({ error, resetErrorBoundary }) => (
  <div role="alert" className="p-8 bg-red-100 text-red-700 rounded-xl">
    <p className="text-lg font-semibold mb-2">Something went wrong:</p>
    <pre className="whitespace-pre-wrap mb-4">{error.message}</pre>
    <button 
      onClick={resetErrorBoundary}
      className="business-button bg-accent-color hover:bg-accent-color/90"
    >
      Try again
    </button>
  </div>
);

const HomePage = () => {
  // const { theme } = useContext(ThemeContext);
  const [threeEnv, setThreeEnv] = useState(null);
  const [sectionRef, isSectionVisible] = useInView({ threshold: 0.1, rootMargin: '200px' });
  const [loading, setLoading] = useState(false); // Preserved for future use

  // Configuration
  const envConfig = useMemo(() => ({
    textureResolution: '4k',
    // lightingPreset: theme === 'dark' ? 'moonlit' : 'sunny',
    shadowQuality: 'high',
    antialias: true
  }), []);

  // Three.js setup and resize handling
  useEffect(() => {
    const handleResize = debounce(() => {
      threeEnv?.updateCameraAspect(window.innerWidth / window.innerHeight);
    }, 200);

    const initializeEnvironment = () => {
      window.addEventListener('resize', handleResize);
    };

    initializeEnvironment();

    return () => {
      threeEnv?.dispose();
      window.removeEventListener('resize', handleResize);
      handleResize.cancel();
    };
  }, [envConfig, threeEnv]);

  // Loading skeleton (preserved)
  const renderLoadingSkeleton = () => (
    <div className="max-w-7xl mx-auto p-8 space-y-8">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="h-64 bg-gray-200/50 dark:bg-gray-800/50 animate-pulse rounded-xl" />
      ))}
    </div>
  );

  // Hero section
  const renderHeroSection = () => (
    <section className="hero-section relative h-[80vh] overflow-hidden">
      <div className="hero-overlay" />
      <canvas 
        id="threejs-canvas" 
        className="threejs-viewer absolute inset-0 w-full h-full"
        ref={canvas => threeEnv?.initialize(canvas)}
      />
      <div className="hero-content absolute bottom-0 left-0 right-0 p-8">
        <ResponsiveAnimatedHeading />
        <div className="max-w-2xl mx-auto mt-8">
          <TypeEffect />
        </div>
      </div>
    </section>
  );

  const renderRecommendations = () => (
    <section className="py-16 px-4">
      <h2 className="h2 text-center mb-12">Design Inspirations</h2>
      <div className="social-proof-grid max-w-7xl mx-auto gap-8">
        {[1].map(id => (
          <div className="business-card group overflow-hidden p-0" key={id}>
            <AntiquePhotoFrame imageUrl={`/placeholder-design-${id}.jpg`} />
          </div>
        ))}
      </div>
    </section>
  );
  // Social proof section
  const renderSocialProof = () => (
    <section ref={sectionRef} className="py-16 px-4">
      <div className="social-proof-grid max-w-7xl mx-auto gap-8">
        {isSectionVisible && (
          <>
            <div className="business-card p-6">
              <YouTubeAntiquePlayer/>
            </div>
            <div className="business-card md:col-span-2 p-6">
              <ReviewAggregator />
            </div>
          </>
        )}
      </div>
    </section>
  );

  // Recommendations section (restored with placeholder data)


  // Interactive design section
  const renderDesignSection = () => (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="h2 mb-8">Live Design Studio</h2>
        <div className="design-workspace grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
          <PatternGenerator 
            
            className="min-h-[500px]"
          />
          <RealTimeRender 
            resolution="1080p"
            qualityPreset="high"
            className="threejs-viewer h-[500px] rounded-xl"
          />
          <div className="mt-8 lg:col-span-2">
            <MovieCarousel />
          </div>
        </div>
      </div>
    </section>
  );

  // Community section (restored with placeholder content)
  const renderCommunitySection = () => (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="h2 mb-8">Community Creations</h2>
        <div className="social-proof-grid gap-6">
          <div className="business-card md:col-span-2 p-6">
            <YouTubeAntiquePlayer/>
          </div>
          <div className="business-card p-6">
            <h3 className="h3 mb-4">Featured Projects</h3>
            <TrendingProjectsCarousel />
          </div>
        </div>
      </div>
    </section>
  );

  return (
    <ErrorBoundary FallbackComponent={HomePageErrorFallback}>
      <div className="business-homepage min-h-screen transition-colors duration-300">
        <Navbar />
        {renderHeroSection()}
        
        {/* Loading state preserved for future use */}
        {loading ? renderLoadingSkeleton() : (
          <>
            {renderRecommendations()}
            {renderDesignSection()}
            {renderCommunitySection()}
            {renderSocialProof()}
            




          </>
        )}
        
     <Footer /> 
      </div>
    </ErrorBoundary>
  );
};

// Restored carousel component
const TrendingProjectsCarousel = () => (
  <div className="trend-carousel">
    {[1, 2, 3].map(id => (
      <div key={id} className="trend-item">
        <div className="h-32 bg-gray-100/50 dark:bg-gray-800/50 rounded-lg animate-pulse">
          <span className="sr-only">Loading project...</span>
        </div>
      </div>
    ))}
  </div>
);

export default HomePage;