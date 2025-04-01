import { useEffect, useState, useContext, useMemo, useCallback } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import React from 'react';
import { debounce } from 'lodash';
import { useInView } from 'react-intersection-observer';
import { ThemeContext } from '../context/theme-context';
import { fetchSocialProof } from '../lib/facebook-api/social-proof';
import { getPersonalizedRecommendations } from '../lib/ai/recommendation-engine';
import { generateEnvironment } from '../lib/threejs/environment-map';
import { fetchTrendingPatterns } from '../services/patternService';
import PatternGenerator from '../pages/products/custom-design-lab/PatternGenerator';
import RealTimeRender from '../pages/products/custom-design-lab/RealTimeRender';
import LivePageFeed from '../components/layout/SocialMediaSynergy/LivePageFeed';
import ReviewAggregator from '../components/layout/SocialMediaSynergy/ReviewAggregator';
import CheckInWidget from '../components/layout/SocialMediaSynergy/CheckInWidget';
import './home.css';
import Navbar from './Navbar';
import MovieCarousel from './MovieCarousel';

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
  const { theme } = useContext(ThemeContext);
  const [recommendations, setRecommendations] = useState([]);
  const [socialProof, setSocialProof] = useState(null);
  const [threeEnv, setThreeEnv] = useState(null);
  const [patterns, setPatterns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const envConfig = useMemo(() => ({
    textureResolution: '4k',
    lightingPreset: theme === 'dark' ? 'moonlit' : 'sunny',
    shadowQuality: 'high',
    antialias: true
  }), [theme]);

  const handleResize = useCallback(debounce(() => {
    threeEnv?.updateCameraAspect(window.innerWidth / window.innerHeight);
  }, 200), [threeEnv]);

  const fetchData = useCallback(async () => {
    try {
      const [recs, proof, patterns] = await Promise.all([
        getPersonalizedRecommendations(),
        fetchSocialProof(),
        fetchTrendingPatterns(),
        new Promise(resolve => setTimeout(resolve, 1000))
      ]);
      
      setRecommendations(recs);
      setSocialProof(proof);
      setPatterns(patterns);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const env = generateEnvironment(envConfig);
    setThreeEnv(env);

    const resizeHandler = debounce(() => {
      env?.updateCameraAspect(window.innerWidth / window.innerHeight);
    }, 200);

    window.addEventListener('resize', resizeHandler);
    fetchData();

    return () => {
      env.dispose();
      window.removeEventListener('resize', resizeHandler);
      resizeHandler.cancel();
    };
  }, [envConfig, fetchData]);

  const [sectionRef, isSectionVisible] = useInView({
    threshold: 0.1,
    rootMargin: '200px'
  });

  if (error) return <HomePageErrorFallback error={error} resetErrorBoundary={fetchData} />;

  return (
    <ErrorBoundary FallbackComponent={HomePageErrorFallback}>
      <div 
        data-theme={theme}
        className="business-homepage min-h-screen transition-colors duration-300"
      >
      <div className="min-h-screen">
        <Navbar />
        {/* Your content */}
      </div>
        {/* Hero Section */}
        <section className="hero-section relative h-[80vh] overflow-hidden">
          <div className="hero-overlay" />
          <canvas 
              id="threejs-canvas" 
              className="threejs-viewer absolute inset-0 w-full h-full"
              ref={(canvas) => {
                if (!canvas) return; // Debug: ensure canvas is not null
                if (threeEnv && !threeEnv.initialized) {
                  threeEnv.initialize(canvas);
                }
              }}
            />

          <div className="hero-content absolute bottom-0 left-0 right-0 p-8">
            <h1 className="h1 text-center animate-fade-in-up">
              TERAZZO CENTRAL
            </h1>
            <div className="max-w-2xl mx-auto mt-8">
              <CheckInWidget theme={theme} />
            </div>
          </div>
        </section>

        {/* Loading Skeleton */}
        {loading && (
          <div className="max-w-7xl mx-auto p-8 space-y-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-64 bg-gray-200/50 dark:bg-gray-800/50 animate-pulse rounded-xl" />
            ))}
          </div>
        )}

        {/* Social Proof Section */}
        {!loading && socialProof && (
          <section ref={sectionRef} className="py-16 px-4">
            <div className="social-proof-grid max-w-7xl mx-auto gap-8">
              {isSectionVisible && (
                <>
                  <div className="business-card p-6">
                    <LivePageFeed 
                      posts={socialProof.livePosts} 
                      theme={theme}
                    />
                  </div>
                  <div className="business-card md:col-span-2 p-6">
                    <ReviewAggregator 
                      reviews={socialProof.recentReviews} 
                      theme={theme}
                    />
                  </div>
                </>
              )}
            </div>
          </section>
        )}

        {/* AI Recommendations */}
        {!loading && recommendations.length > 0 && (
          <section className="py-16 px-4">
            <h2 className="h2 text-center mb-12">Personalized For You</h2>
            <div className="social-proof-grid max-w-7xl mx-auto gap-8">
              {recommendations.map((rec) => (
                <div className="business-card group overflow-hidden p-0" key={rec.id}>
                  <MemoizedPatternCard rec={rec} theme={theme} />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Interactive Design Section */}
        {!loading && patterns.length > 0 && (
          <section className="py-16 px-4">
            <div className="max-w-7xl mx-auto">
              <h2 className="h2 mb-8">Live Design Studio</h2>
              <div className="design-workspace grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
                <PatternGenerator 
                  initialPattern={patterns[0]}
                  theme={theme}
                  className="min-h-[500px]"
                />
                <RealTimeRender 
                  resolution="1080p"
                  qualityPreset="high"
                  className="threejs-viewer h-[500px] rounded-xl"
                />
                <div className="mt-8">
                <MovieCarousel />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Community Activities */}
        {!loading && socialProof && (
          <section className="py-16 px-4">
            <div className="max-w-7xl mx-auto">
              <h2 className="h2 mb-8">Community Activities</h2>
              <div className="social-proof-grid gap-6">
                <div className="business-card md:col-span-2 p-6">
                  <LivePageFeed 
                    posts={socialProof.livePosts.slice(0, 2)} 
                    compact 
                    theme={theme}
                  />
                </div>
                <div className="business-card p-6">
                  <h3 className="h3">Trending Projects</h3>
                  <TrendingProjectsCarousel />
                </div>
                <div className="business-card checkin-widget p-6">
                  <h3 className="h3">Recent Check-ins</h3>
                  <CheckInWidget 
                    theme={theme}
                    compact
                  />
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </ErrorBoundary>
  );
};

const MemoizedPatternCard = React.memo(({ rec, theme }) => (
  <div className="relative group h-full w-full">
    <PatternGenerator
      basePattern={rec.pattern}
      constraints={rec.constraints}
      interactive={false}
      className="h-full w-full"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
      <h3 className="text-xl font-semibold text-white">{rec.title}</h3>
    </div>
  </div>
));

const TrendingProjectsCarousel = () => (
  <div className="trend-carousel">
    {[...Array(3)].map((_, i) => (
      <div key={i} className="trend-item">
        <div className="h-20 bg-gray-100/50 dark:bg-gray-800/50 rounded-lg animate-pulse" />
      </div>
    ))}
  </div>
);

export default HomePage;