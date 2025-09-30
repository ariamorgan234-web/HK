// src/pages/Services.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import ServiceCard from '../components/ServiceCard'; // Correctly import the component
import './Services.css';

// Data is well-structured and easy to manage
const servicesData = [
  {
    title: 'General Contracting',
    description:
      'We provide full-scale project management, ensuring your project is completed on time, within budget, and to the highest standards of quality.',
    icon: '🏗️',
    features: [
      'Project Management',
      'Budget Control',
      'Quality Assurance',
      'Timeline Management',
    ],
  },
  {
    title: 'Custom Home Building',
    description:
      "From concept to completion, we work with you to build the custom home you've always dreamed of, tailored to your unique lifestyle and preferences.",
    icon: '🏠',
    features: [
      'Custom Design',
      'Personalized Planning',
      'Quality Craftsmanship',
      'Dream Realization',
    ],
  },
  {
    title: 'Home Renovations',
    description:
      'Transform your existing space. We handle kitchen remodels, bathroom upgrades, basement finishing, and full-home renovations.',
    icon: '🔨',
    features: [
      'Kitchen Remodels',
      'Bathroom Upgrades',
      'Basement Finishing',
      'Full-home Renovations',
    ],
  },
  {
    title: 'Commercial Construction',
    description:
      'Our team has the expertise to manage commercial construction projects, including office buildings, retail spaces, and industrial facilities.',
    icon: '🏢',
    features: [
      'Office Buildings',
      'Retail Spaces',
      'Industrial Facilities',
      'Commercial Expertise',
    ],
  },
  {
    title: 'Deck & Patio Construction',
    description:
      'Extend your living space outdoors with a beautifully designed and expertly built deck or patio, perfect for relaxation and entertainment.',
    icon: '🌳',
    features: [
      'Outdoor Living',
      'Custom Designs',
      'Quality Materials',
      'Expert Installation',
    ],
  },
  {
    title: 'Roofing & Siding',
    description:
      'Protect your investment with our professional roofing and siding services, using durable materials to withstand the elements.',
    icon: '🛡️',
    features: [
      'Weather Protection',
      'Durable Materials',
      'Curb Appeal',
      'Long-lasting Results',
    ],
  },
  {
    title: 'Electrical Services',
    description:
      'Professional electrical installations, repairs, and upgrades to keep your property safe and up to code.',
    icon: '⚡',
    features: [
      'Safe Installations',
      'System Repairs',
      'Modern Upgrades',
      'Code Compliance',
    ],
  },
  {
    title: 'Plumbing Solutions',
    description:
      'Comprehensive plumbing services including installations, repairs, and maintenance for residential and commercial properties.',
    icon: '🔧',
    features: [
      'Fixture Installations',
      'Emergency Repairs',
      'Routine Maintenance',
      'Expert Solutions',
    ],
  },
];

const Services = () => {
  return (
    <main className='services-page'>
      <header className='services-hero'>
        <h1>Our Construction Services</h1>
        <p>
          From dream homes to commercial spaces, we bring your vision to life
          with quality craftsmanship and professional expertise.
        </p>
      </header>

      <section className='services-grid-container'>
        <div className='services-grid'>
          {servicesData.map((service) => (
            <ServiceCard
              key={service.title}
              icon={service.icon}
              title={service.title}
              description={service.description}
              features={service.features}
            />
          ))}
        </div>
      </section>

      <section className='services-cta'>
        <h3>Ready to Build Your Vision?</h3>
        <p>
          Get in touch with us today for a free consultation. Let's discuss how
          we can bring your construction project to life.
        </p>
        <Link to='/contact' className='cta-button'>
          Get a Free Estimate
        </Link>
      </section>
    </main>
  );
};

export default Services;
