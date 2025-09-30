// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

// --- Data for Page Sections ---
const features = [
  {
    icon: '🏗️',
    title: 'Experienced Team',
    description:
      'Our team consists of certified professionals with years of experience in the industry.',
  },
  {
    icon: '⭐',
    title: 'Quality Materials',
    description:
      'We use only the highest quality materials to ensure durability and longevity.',
  },
  {
    icon: '⏱️',
    title: 'On-Time Delivery',
    description:
      'We are committed to completing your project on schedule and within budget.',
  },
  {
    icon: '💼',
    title: 'Fully Insured',
    description:
      'Comprehensive insurance coverage for your peace of mind and protection.',
  },
];

const services = [
  {
    img: 'https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&cs=tinysrgb&w=600',
    alt: 'General Contracting',
    title: 'General Contracting',
    description:
      'Comprehensive management for your entire construction project from start to finish.',
  },
  {
    img: 'https://images.pexels.com/photos/157811/pexels-photo-157811.jpeg?auto=compress&cs=tinysrgb&w=600',
    alt: 'Renovations',
    title: 'Renovations',
    description:
      'Transforming your existing spaces into something new and beautiful with modern designs.',
  },
  {
    img: 'https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=600',
    alt: 'Custom Homes',
    title: 'Custom Homes',
    description:
      'Building the home of your dreams from the ground up with personalized designs.',
    isHighlighted: true,
  },
];

// --- Reusable Child Components ---
const FeatureCard = ({ icon, title, description }) => (
  <div className='feature-card'>
    <div className='feature-icon'>{icon}</div>
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
);

const ServiceCard = ({ img, alt, title, description, isHighlighted }) => (
  <div
    className={`dark-service-card ${isHighlighted ? 'highlight-border' : ''}`}
  >
    <div className='service-image'>
      <img src={img} alt={alt} loading='lazy' />
    </div>
    <div className='service-content'>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  </div>
);

const CtaButton = ({ to, children, type = 'primary', size = '' }) => (
  <Link to={to} className={`cta-button ${type} ${size}`}>
    {children}
  </Link>
);

// --- Main Home Component ---
const Home = () => {
  return (
    <div className='home-page'>
      {/* Hero Section */}
      <section className='hero-section'>
        <div className='hero-overlay'></div>
        <div className='hero-content'>
          <h1>Building Your Future, Today.</h1>
          <p>
            Your trusted partner for high-quality construction and renovation
            projects.
          </p>
          <div className='hero-buttons'>
            <CtaButton to='/contact' type='primary'>
              Get a Free Estimate
            </CtaButton>
            <CtaButton to='/services' type='secondary'>
              Our Services
            </CtaButton>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className='page-section why-us-section'>
        <div className='section-container'>
          <header className='section-header'>
            <h2>Why Choose Us?</h2>
            <p>
              We deliver excellence and integrity in every project we undertake.
            </p>
          </header>
          <div className='features-grid'>
            {features.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Services Overview Section */}
      <section className='page-section services-overview-section'>
        <div className='section-container'>
          <header className='section-header'>
            <h2>Our Core Services</h2>
            <p>
              Comprehensive construction solutions for all your residential and
              commercial needs.
            </p>
          </header>
          <div className='services-grid'>
            {services.map((service) => (
              <ServiceCard
                key={service.title}
                img={service.img}
                alt={service.alt}
                title={service.title}
                description={service.description}
                isHighlighted={service.isHighlighted}
              />
            ))}
          </div>
          <div className='section-actions'>
            <CtaButton to='/services'>All Services</CtaButton>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className='cta-section'>
        <div className='section-container'>
          <h2>Ready to Start Your Project?</h2>
          <p>
            Contact us today for a free, no-obligation consultation and
            estimate.
          </p>
          <CtaButton to='/contact' type='secondary'>
            Get Started Now
          </CtaButton>
        </div>
      </section>
    </div>
  );
};

export default Home;
