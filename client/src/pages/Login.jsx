// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/api';
import './Login.css';

// --- Custom Hook for Form Logic ---
const useLoginForm = (setUser) => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const [status, setStatus] = useState({ isLoading: false, error: null });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
    if (status.error) {
      setStatus((prev) => ({ ...prev, error: null })); // Clear error on new input
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!credentials.username || !credentials.password) {
      setStatus({ isLoading: false, error: 'Please fill in all fields.' });
      return;
    }
    setStatus({ isLoading: true, error: null });

    try {
      const response = await apiService.login(credentials);
      const loggedInUser = response.data;

      window.localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
      setUser(loggedInUser); // Update app-level state
      navigate('/dashboard'); // Redirect on success
    } catch (exception) {
      console.error('Login error:', exception);
      setStatus({ isLoading: false, error: 'Invalid username or password.' });
    }
  };

  return {
    credentials,
    status,
    showPassword,
    handleChange,
    handleSubmit,
    togglePassword: () => setShowPassword(!showPassword),
  };
};

// --- Main Login Component ---
const Login = ({ setUser }) => {
  const {
    credentials,
    status,
    showPassword,
    handleChange,
    handleSubmit,
    togglePassword,
  } = useLoginForm(setUser);

  return (
    <div className='login-page'>
      <div className='login-container'>
        <div className='login-card'>
          <header className='login-header'>
            <h2>Admin Login</h2>
            <p>Access your ConstructionCo dashboard</p>
          </header>

          <form onSubmit={handleSubmit} className='login-form' noValidate>
            {status.error && (
              <div className='error-message-box'>{status.error}</div>
            )}

            <div className='form-group'>
              <label htmlFor='username'>Username</label>
              <input
                type='text'
                id='username'
                name='username'
                value={credentials.username}
                onChange={handleChange}
                className='form-input'
                placeholder='Enter your username'
                disabled={status.isLoading}
                autoComplete='username'
                required
              />
            </div>

            <div className='form-group'>
              <label htmlFor='password'>Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                id='password'
                name='password'
                value={credentials.password}
                onChange={handleChange}
                className='form-input'
                placeholder='Enter your password'
                disabled={status.isLoading}
                autoComplete='current-password'
                required
              />
              <button
                type='button'
                className='password-toggle'
                onClick={togglePassword}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>

            <button
              type='submit'
              className='login-button'
              disabled={status.isLoading}
            >
              {status.isLoading && <span className='loading-spinner'></span>}
              <span>{status.isLoading ? 'Signing In...' : 'Sign In'}</span>
            </button>
          </form>

          <footer className='login-footer'>
            <p>&copy; {new Date().getFullYear()} ConstructionCo Management</p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Login;
