// src/components/ServiceCard.jsx
import React from 'react';
import './ServiceCard.css'; // We will create this CSS file next.

const ServiceCard = ({ icon, title, description, features }) => {
  return (
    <div className='service-card-item'>
      <div className='card-header'>
        <div className='card-icon'>{icon}</div>
        <h3 className='card-title'>{title}</h3>
      </div>
      <p className='card-description'>{description}</p>
      <ul className='card-features'>
        {features.map((feature, index) => (
          <li key={index} className='feature-item'>
            <span className='feature-checkmark'>✓</span>
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServiceCard;
