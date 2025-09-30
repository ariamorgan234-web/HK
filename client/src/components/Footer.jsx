// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

// --- Data for Footer Sections ---
const quickLinks = [
  { to: '/', text: 'Home' },
  { to: '/about', text: 'About Us' },
  { to: '/services', text: 'Services' },
  { to: '/contact', text: 'Contact' },
];

const serviceLinks = [
  { to: '/services', text: 'General Contracting' },
  { to: '/services', text: 'Custom Homes' },
  { to: '/services', text: 'Renovations' },
  { to: '/services', text: 'Commercial' },
];

const contactInfo = [
  { icon: '📍', text: '123 Construction St, Build City, BC 12345' },
  { icon: '📞', text: '(555) 123-4567' },
  { icon: '✉️', text: 'info@constructionco.com' },
  { icon: '🕒', text: 'Mon - Fri: 8:00 AM - 6:00 PM' },
];

const socialLinks = [
  { href: '#', label: 'Facebook', icon: '📘' },
  { href: '#', label: 'Twitter', icon: '🐦' },
  { href: '#', label: 'Instagram', icon: '📷' },
  { href: '#', label: 'LinkedIn', icon: '💼' },
];

// --- Reusable Child Components for Footer ---
const FooterLinkSection = ({ title, links }) => (
  <div className='footer-section'>
    <h4>{title}</h4>
    <ul className='footer-links'>
      {links.map((link) => (
        <li key={link.text}>
          <Link to={link.to}>{link.text}</Link>
        </li>
      ))}
    </ul>
  </div>
);

// --- Main Footer Component ---
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='main-footer'>
      <div className='footer-content'>
        {/* Brand Section */}
        <div className='footer-brand'>
          <div className='footer-logo'>
            Construction<span>Co</span>
          </div>
          <p className='footer-description'>
            Building your future with quality craftsmanship, innovative
            solutions, and unwavering commitment to excellence.
          </p>
          <div className='footer-social'>
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                className='social-link'
                aria-label={social.label}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Link Sections */}
        <FooterLinkSection title='Quick Links' links={quickLinks} />
        <FooterLinkSection title='Our Services' links={serviceLinks} />

        {/* Contact Info Section */}
        <div className='footer-section'>
          <h4>Contact Info</h4>
          <div className='footer-contact'>
            {contactInfo.map((item) => (
              <div key={item.text} className='contact-item'>
                <span className='contact-icon'>{item.icon}</span>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className='footer-bottom'>
        <p className='copyright'>
          &copy; {currentYear} ConstructionCo. All Rights Reserved.
        </p>
        <div className='footer-legal'>
          <Link to='/privacy'>Privacy Policy</Link>
          <Link to='/terms'>Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
