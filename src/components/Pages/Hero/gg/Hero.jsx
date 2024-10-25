// HeroSection.jsx
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero-section">
      <div className="hero-overlay">
        <div className="hero-content">
          <h1 className="hero-title">Efficient Grey Water Management for a Sustainable Future</h1>
          <p className="hero-description">
            Monitor your water usage in real-time, optimize resources, and reduce environmental impact with our innovative grey water management system.
          </p>
          <a href="#dashboard" className="cta-button">Get Started</a>
        </div>
      </div>
    </section>
  );
};

export default Hero;