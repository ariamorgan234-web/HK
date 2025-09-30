// src/pages/About.jsx
import React from 'react';
import './About.css';

// Component for individual feature items to keep the main component clean
const Feature = ({ title, description }) => (
  <div className='feature-item'>
    <h4>{title}</h4>
    <p>{description}</p>
  </div>
);

// Data for the page is stored in objects, making it easy to update
const aboutData = {
  imageUrl:
    'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  imageAlt: 'Our construction team working on a project',
  story:
    'Founded in 2010, ConstructionCo started with a simple mission: to build with integrity, quality, and a commitment to our clients. Over the past decade, we have grown from a small local team into a reputable construction company known for our dedication to excellence.',
  mission:
    'Our mission is to deliver superior construction services by creating a partnership with our clients throughout the entire process. We aim to exceed expectations and gain trust through exceptional performance by every member of our construction team.',
  features: [
    {
      title: 'Quality Assurance',
      description: 'We never compromise on quality and materials.',
    },
    {
      title: 'Timely Delivery',
      description: 'All projects are completed within the specified deadline.',
    },
    {
      title: 'Expert Team',
      description:
        'Our team consists of experienced and skilled professionals.',
    },
    {
      title: 'Client-Centric',
      description: 'We prioritize client satisfaction above all else.',
    },
  ],
};

const About = () => {
  return (
    <div className='about-page'>
      <h2>About ConstructionCo</h2>
      <div className='about-container'>
        <div className='about-image'>
          <img
            src={aboutData.imageUrl}
            alt={aboutData.imageAlt}
            loading='lazy'
          />
        </div>
        <div className='about-text'>
          <h3>Our Story</h3>
          <p>{aboutData.story}</p>
          <h3>Our Mission</h3>
          <p>{aboutData.mission}</p>
        </div>
      </div>

      {/* Features are now rendered in a separate section for better structure */}
      <div className='about-features'>
        {aboutData.features.map((feature) => (
          <Feature
            key={feature.title}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </div>
  );
};

export default About;
