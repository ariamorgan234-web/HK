// src/components/Header.jsx
import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import './Header.css';

// Data for navigation items makes it easy to manage links
const navItems = [
  { path: '/', label: 'Home' },
  { path: '/services', label: 'Services' },
  { path: '/about', label: 'About' },
  { path: '/contact', label: 'Contact' },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Effect to handle scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Effect to close the mobile menu when the route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Effect to prevent body scroll when the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto'; // Cleanup on component unmount
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header className={`main-header ${isScrolled ? 'scrolled' : ''}`}>
        <div className='logo'>
          <Link to='/'>ConstructionCo</Link>
        </div>

        <nav id='main-nav' className={`main-nav ${isMenuOpen ? 'active' : ''}`}>
          {navItems.map((item) => (
            // Using NavLink automatically adds an 'active' class for the current page
            <NavLink key={item.path} to={item.path} end>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <button
          className='menu-toggle'
          onClick={toggleMenu}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
          aria-controls='main-nav'
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </header>
      {/* Overlay to cover the page content when the mobile menu is open */}
      <div
        className={`menu-overlay ${isMenuOpen ? 'active' : ''}`}
        onClick={toggleMenu}
        role='button'
        tabIndex='-1'
        aria-label='Close menu'
      ></div>
    </>
  );
};

export default Header;
