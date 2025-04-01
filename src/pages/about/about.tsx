import React, { useEffect, useRef, useState, ReactNode } from 'react';
import './AboutPage.css';

// ----- Types -----
interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  skills: string[];
  extendedBio?: string;
  social?: { twitter?: string; linkedin?: string };
}

interface TimelineEvent {
  year: number;
  title: string;
  description: string;
  milestones: string[];
}

interface Testimonial {
  id: string;
  name: string;
  quote: string;
  image: string;
}

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

// ----- Data (same as your original) -----
const teamMembers: TeamMember[] = [
  {
    id: 'tm-01',
    name: 'Dr. Amelia Chen',
    role: 'CEO & Co-Founder',
    bio: 'Ph.D. in Artificial Intelligence with 15+ years in tech leadership.',
    image: 'https://source.unsplash.com/400x400/?female-executive',
    skills: ['AI/ML', 'Strategic Planning', 'Leadership'],
    extendedBio:
      'Dr. Chen has led multiple Fortune 500 projects and is passionate about merging research with industry.',
    social: {
      twitter: 'https://twitter.com/amelia',
      linkedin: 'https://linkedin.com/in/amelia',
    },
  },
  // ...add more team members as needed
];

const timelineEvents: TimelineEvent[] = [
  {
    year: 2010,
    title: 'Company Foundation',
    description: 'Established with a vision to revolutionize enterprise technology.',
    milestones: ['Seed funding secured', 'First patent filed', 'Core team assembled'],
  },
  // ...additional timeline events
];

const testimonials: Testimonial[] = [
  {
    id: 'ts-01',
    name: 'Jordan Smith',
    quote: 'This company transformed our business with innovative solutions!',
    image: 'https://source.unsplash.com/100x100/?person',
  },
  {
    id: 'ts-02',
    name: 'Alex Lee',
    quote: 'Their expertise in technology is unmatched in the industry.',
    image: 'https://source.unsplash.com/100x100/?portrait',
  },
];

const faqs: FAQ[] = [
  {
    id: 'faq-01',
    question: 'What is your company’s mission?',
    answer: 'We aim to combine cutting-edge research with practical solutions for tomorrow’s challenges.',
  },
  {
    id: 'faq-02',
    question: 'How can I contact your team?',
    answer: 'Please use the contact form at the bottom of the page or email us directly.',
  },
];

// ----- Particle Background Component -----
const ParticleBackground: React.FC<{ count?: number }> = ({ count = 50 }) => {
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    left: Math.random() * 100, // %
    animationDelay: Math.random() * 5, // seconds
    animationDuration: 5 + Math.random() * 5, // seconds
  }));

  return (
    <>
      {particles.map((p) => (
        <div
          key={p.id}
          className="quantum-particle"
          style={{
            left: `${p.left}%`,
            animationDelay: `${p.animationDelay}s`,
            animationDuration: `${p.animationDuration}s`,
          }}
        />
      ))}
    </>
  );
};

// ----- AnimatedDiv Component -----
// This component uses the Intersection Observer API to trigger an animation
// by merging the initialStyle with animateStyle once the element is in view.
interface AnimatedDivProps {
  children: ReactNode;
  initialStyle: React.CSSProperties;
  animateStyle: React.CSSProperties;
  transition: string;
}
const AnimatedDiv: React.FC<AnimatedDivProps> = ({ children, initialStyle, animateStyle, transition }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ ...initialStyle, ...(inView ? animateStyle : {}), transition }}
    >
      {children}
    </div>
  );
};

// ----- Modal Component -----
// The modal uses inline styles to animate scale and opacity when mounted.
const Modal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  member: TeamMember | null;
}> = ({ isOpen, onClose, member }) => {
  const [animate, setAnimate] = useState(false);
  useEffect(() => {
    if (isOpen) setAnimate(true);
  }, [isOpen]);

  if (!isOpen || !member) return null;

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      style={{ opacity: animate ? 1 : 0, transition: 'opacity 0.3s ease' }}
    >
      <div
        className="modal-content holographic-card neon-border"
        onClick={(e) => e.stopPropagation()}
        style={{
          transform: animate ? 'scale(1)' : 'scale(0.9)',
          opacity: animate ? 1 : 0,
          transition: 'all 0.3s ease',
        }}
      >
        <button onClick={onClose} className="modal-close">
          &times;
        </button>
        <div className="modal-body">
          <img src={member.image} alt={member.name} className="modal-image" />
          <h3>{member.name}</h3>
          <p className="role">{member.role}</p>
          <p className="bio">{member.extendedBio || member.bio}</p>
          {member.social && (
            <div className="social-links">
              {member.social.twitter && (
                <a href={member.social.twitter} target="_blank" rel="noopener noreferrer">
                  Twitter
                </a>
              )}
              {member.social.linkedin && (
                <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ----- Main Component -----
export const AboutPage: React.FC = () => {
  const [activeMember, setActiveMember] = useState<TeamMember | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDarkMode, setDarkMode] = useState<boolean>(false);

  // Hero Section Scroll Effects (mimicking framer-motion's scrollYProgress & transform)
  const [scrollProgress, setScrollProgress] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const threshold = 200; // adjust as needed
      const progress = Math.min(window.scrollY / threshold, 1);
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const heroStyle = {
    opacity: scrollProgress,
    transform: `scale(${0.95 + 0.05 * scrollProgress})`,
    transition: 'all 0.3s ease',
  };

  // Dark mode toggle effect on the HTML element
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) root.classList.add('dark');
    else root.classList.remove('dark');
  }, [isDarkMode]);

  // Open modal for team member details
  const handleMemberClick = (member: TeamMember) => {
    setActiveMember(member);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setActiveMember(null);
  };

  return (
    <div className="about-page-container">
      {/* Particle Background */}
      <ParticleBackground count={40} />

      {/* ----- Navbar ----- */}
      <nav className="navbar">
        <div className="navbar-inner">
          <h1>About Our Company</h1>
          <button onClick={() => setDarkMode(!isDarkMode)} aria-label="Toggle Dark Mode">
            {isDarkMode ? <span>☀️</span> : <span>🌙</span>}
          </button>
        </div>
      </nav>

      {/* ----- Hero Section ----- */}
      <header className="hero-section" style={heroStyle}>
        <h1 className="hero-title">
          Shaping the Future of Technology
        </h1>
        <p className="hero-subtitle">
          We combine cutting–edge research with practical solutions to solve tomorrow’s challenges today.
        </p>
      </header>

      {/* ----- Timeline Section ----- */}
      <section className="timeline-section">
        <div className="timeline-line" />
        {timelineEvents.map((event, index) => (
          <AnimatedDiv
            key={event.year}
            initialStyle={{ opacity: 0, transform: `translateX(${index % 2 === 0 ? '-50px' : '50px'})` }}
            animateStyle={{ opacity: 1, transform: 'translateX(0)' }}
            transition="all 0.6s ease"
          >
            <div className="timeline-event holographic-card neon-border">
              <h3>{event.year}</h3>
              <div className="timeline-content">
                <h4>{event.title}</h4>
                <p>{event.description}</p>
                <ul>
                  {event.milestones.map((milestone) => (
                    <li key={milestone}>{milestone}</li>
                  ))}
                </ul>
              </div>
            </div>
          </AnimatedDiv>
        ))}
      </section>

      {/* ----- Team Section ----- */}
      <section className="team-section">
        <h2>Executive Leadership</h2>
        <div className="team-grid">
          {teamMembers.map((member) => (
            <AnimatedDiv
              key={member.id}
              initialStyle={{ opacity: 0, transform: 'translateY(50px)' }}
              animateStyle={{ opacity: 1, transform: 'translateY(0)' }}
              transition="all 0.4s ease"
            >
              <div className="team-card" onClick={() => handleMemberClick(member)}>
                <div className="team-card-image-wrapper">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="team-card-image"
                    loading="lazy"
                  />
                  <div className="image-overlay" />
                </div>
                <div className="team-card-content">
                  <h3>{member.name}</h3>
                  <p className="team-role">{member.role}</p>
                  <p>{member.bio}</p>
                  <div className="skills">
                    {member.skills.map((skill) => (
                      <span key={skill} className="skill-badge">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedDiv>
          ))}
        </div>
      </section>

      {/* ----- Testimonials Section ----- */}
      <section className="testimonials-section">
        <h2>What Our Clients Say</h2>
        <div className="testimonials-grid">
          {testimonials.map((t) => (
            <AnimatedDiv
              key={t.id}
              initialStyle={{ opacity: 0, transform: 'translateY(30px)' }}
              animateStyle={{ opacity: 1, transform: 'translateY(0)' }}
              transition="all 0.5s ease"
            >
              <div className="testimonial-card holographic-card neon-border">
                <div className="testimonial-header">
                  <img src={t.image} alt={t.name} className="testimonial-image" />
                  <h4>{t.name}</h4>
                </div>
                <p className="testimonial-quote">"{t.quote}"</p>
              </div>
            </AnimatedDiv>
          ))}
        </div>
      </section>

      {/* ----- FAQ Section ----- */}
      <section className="faq-section">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-list">
          {faqs.map((faq) => (
            <AnimatedDiv
              key={faq.id}
              initialStyle={{ opacity: 0, transform: 'translateX(-20px)' }}
              animateStyle={{ opacity: 1, transform: 'translateX(0)' }}
              transition="all 0.4s ease"
            >
              <div className="faq-item holographic-card neon-border">
                <h4>{faq.question}</h4>
                <p>{faq.answer}</p>
              </div>
            </AnimatedDiv>
          ))}
        </div>
      </section>

      {/* ----- Contact Section ----- */}
      <section className="contact-section">
        <h2>Get in Touch</h2>
        <form className="contact-form">
          <div className="form-field">
            <label>Name</label>
            <input type="text" placeholder="Your Name" />
          </div>
          <div className="form-field">
            <label>Email</label>
            <input type="email" placeholder="you@example.com" />
          </div>
          <div className="form-field">
            <label>Message</label>
            <textarea placeholder="Your message..." rows={4} />
          </div>
          <button type="submit" className="submit-button">
            Send Message
          </button>
        </form>
      </section>

      {/* ----- Stats Section ----- */}
      <section className="stats-section">
        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-number">150+</div>
            <div className="stat-label">Patents Filed</div>
          </div>
          {/* Add more stat items if needed */}
        </div>
      </section>

      {/* ----- Modal for Team Member Details ----- */}
      <Modal isOpen={isModalOpen} onClose={closeModal} member={activeMember} />
    </div>
  );
};