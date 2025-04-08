import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './portfolio.css';
import Navbar from '../Navbar.jsx';
import Footer from '../footer.jsx';
import terrazzo53 from '../images/terrazzo69.jpg';
import WhatsAppForm from '../porfolio/whatsapp.jsx';

export const BusinessPortfolio = () => {
  const [activeSection, setActiveSection] = useState('about');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMenuOpen(false);
  };


  // Sample data - replace with your actual content
  const portfolioData = {
    about: {
      title: "Terrazzo Installation Experts",
      bio: "With 15+ years specializing in premium terrazzo solutions, we transform spaces through meticulous craftsmanship and innovative material technology.",
      expertise: ["Custom Terrazzo Design", "Historic Restoration", "Large-Scale Commercial Installations"],
      stats: [
        { label: "Projects Completed", value: "850+" },
        { label: "Client Retention", value: "95%" },
        { label: "Material Efficiency", value: "98%" }
      ]
    },
    projects: [
      {
        title: "Vicodec highschool",
        image: terrazzo53,
        scope: "10,000 sqft • Custom Design",
        result: "15% reduction in material waste"
      },
      // Add more projects
    ],
    caseStudies: [
      {
        problem: "Failing 1930s terrazzo in historic museum",
        solution: "Custom-matched restoration technique",
        result: "Preserved architectural integrity + 40-year lifespan extension"
      }
    ],
    testimonials: [
      {
        text: "Their attention to detail transformed our corporate headquarters",
        author: "ABC Development Co.",
        role: "Commercial Property Manager"
      }
    ],
    skills: [
      { name: "Terrazzo Installation", level: 98 },
      { name: "Material Science", level: 95 }
    ],
    certifications: ["NTMA Certified Installer", "LEED Green Associate"]
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'work', 'cases', 'testimonials', 'skills'];
      const scrollPosition = window.scrollY + 100;
  
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && element.offsetTop <= scrollPosition && 
            element.offsetTop + element.offsetHeight > scrollPosition) {
          setActiveSection(section);
          break;
        }
      }
    };
  
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    
    <div className="portfolio-container">
      <Navbar />
        
      {/* Navigation */}
      

      {/* Hero Section */}
      <section id="about" className="portfolio-hero">
        <div className="hero-content">
          <h1>{portfolioData.about.title}</h1>
          <div className="stats-grid">
            {portfolioData.about.stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Work Samples */}
      <section id="work" className="portfolio-section">
        <h2>Signature Projects</h2>
        <div className="project-grid">
          {portfolioData.projects.map((project, index) => (
            <div key={index} className="project-card">
              <div className="project-image">
                <img src={project.image} alt={project.title} />
                <div className="project-hover">
                  <h3>{project.title}</h3>
                  <p>{project.scope}</p>
                  <div className="project-result">{project.result}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Case Studies */}
      <section id="cases" className="portfolio-section dark-bg">
        <h2>Success Stories</h2>
        <div className="case-studies">
          {portfolioData.caseStudies.map((caseStudy, index) => (
            <div key={index} className="case-card">
              <div className="case-problem">
                <h3>Challenge</h3>
                <p>{caseStudy.problem}</p>
              </div>
              <div className="case-solution">
                <h3>Our Approach</h3>
                <p>{caseStudy.solution}</p>
              </div>
              <div className="case-result">
                <h3>Outcome</h3>
                <p>{caseStudy.result}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills & Tools */}
      <section id="skills" className="portfolio-section">
        <h2>Technical Expertise</h2>
        <div className="skills-container">
          <div className="skill-chart">
            {portfolioData.skills.map((skill, index) => (
              <div key={index} className="skill-item">
                <div className="skill-label">{skill.name}</div>
                <div className="skill-bar">
                  <div 
                    className="skill-progress" 
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          <div className="tools-list">
            <h3>Specialized Equipment</h3>
            <ul>
              <li>Diamond Grinding Systems</li>
              <li>Laser Leveling Technology</li>
              <li>Custom Mixing Stations</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Contact & Social */}
      <footer className="portfolio-footer">
        <div className="contact-section">
          <h3>Start Your Project</h3>
          <WhatsAppForm />
        </div>
      </footer>
      {/* Testimonials */}
      <Footer />
    </div>
  );
};

export default BusinessPortfolio;