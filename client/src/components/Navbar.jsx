// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaUser, FaSignOutAlt } from 'react-icons/fa';
import './Navbar.css';

// --- Data and Helper Components ---
const publicNavItems = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/services', label: 'Services' },
  { path: '/contact', label: 'Contact' },
];

const authenticatedNavItems = [{ path: '/dashboard', label: 'Dashboard' }];

// Component for the authentication section (Login/Logout)
const AuthSection = ({ user, onLogout }) => {
  if (user) {
    return (
      <div className='navbar-auth'>
        <div className='user-info'>
          <FaUser />
          <span>Welcome, {user.name || 'Admin'}</span>
        </div>
        <button onClick={onLogout} className='auth-button' aria-label='Logout'>
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </div>
    );
  }
  return (
    <div className='navbar-auth'>
      <NavLink to='/login' className='auth-button'>
        <FaUser />
        <span>Admin Login</span>
      </NavLink>
    </div>
  );
};

// --- Main Navbar Component ---
const Navbar = ({ user, setUser }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Handle user logout
  const handleLogout = () => {
    window.localStorage.removeItem('loggedInUser');
    setUser(null);
    setIsMenuOpen(false);
    navigate('/');
  };

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Add/remove body scroll lock
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
  }, [isMenuOpen]);

  // Detect page scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const allNavItems = user
    ? [...publicNavItems, ...authenticatedNavItems]
    : publicNavItems;

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <NavLink to='/' className='navbar-brand'>
          HK Construction
        </NavLink>

        {/* Desktop Navigation */}
        <div className='navbar-content'>
          <div className='navbar-links'>
            {allNavItems.map((item) => (
              <NavLink key={item.path} to={item.path} end>
                {item.label}
              </NavLink>
            ))}
          </div>
          <AuthSection user={user} onLogout={handleLogout} />
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className='mobile-menu-toggle'
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label='Toggle menu'
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </nav>

      {/* Mobile Navigation Panel */}
      <div className={`mobile-nav-container ${isMenuOpen ? 'active' : ''}`}>
        <div className='navbar-links'>
          {allNavItems.map((item) => (
            <NavLink key={item.path} to={item.path} end>
              {item.label}
            </NavLink>
          ))}
        </div>
        <AuthSection user={user} onLogout={handleLogout} />
      </div>

      {/* Overlay */}
      <div
        className={`menu-overlay ${isMenuOpen ? 'active' : ''}`}
        onClick={() => setIsMenuOpen(false)}
      />
    </>
  );
};

export default Navbar;
