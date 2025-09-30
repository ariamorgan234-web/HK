// src/pages/Contact.jsx
import React, { useState } from 'react';
import './Contact.css';
// Note: The 'apiService' is assumed to be correctly configured elsewhere.
import apiService from '../services/api';

// --- Helper Components & Hooks ---

// Custom hook to encapsulate form logic
const useContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState({
    isSubmitting: false,
    message: '',
    type: '', // 'success' or 'error'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ isSubmitting: true, message: '', type: '' });

    try {
      // Mock API call for demonstration
      await apiService.createEstimate(formData);
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate network delay

      setStatus({
        isSubmitting: false,
        message: 'Thank you! Your request has been sent successfully.',
        type: 'success',
      });
      setFormData({ name: '', phone: '', email: '', message: '' }); // Reset form
    } catch (error) {
      console.error('Form submission error:', error);
      setStatus({
        isSubmitting: false,
        message: 'Sorry, there was an error. Please try again.',
        type: 'error',
      });
    }
  };

  return { formData, status, handleChange, handleSubmit };
};

// Reusable Input Component to reduce repetition
const FormInput = ({ id, label, ...props }) => (
  <div className='form-group'>
    <label htmlFor={id}>{label}</label>
    <input id={id} {...props} />
  </div>
);

// --- Main Contact Component ---

const Contact = () => {
  const { formData, status, handleChange, handleSubmit } = useContactForm();

  return (
    <div className='contact-page'>
      <div className='contact-form-container'>
        <div className='contact-header'>
          <h2>Contact Us for a Free Estimate</h2>
          <p>Fill out the form below, and we will get back to you shortly.</p>
        </div>

        <form onSubmit={handleSubmit} className='contact-form' noValidate>
          <div className='form-row'>
            <FormInput
              id='name'
              label='Full Name:'
              type='text'
              name='name'
              value={formData.name}
              onChange={handleChange}
              placeholder='e.g., John Doe'
              required
            />
            <FormInput
              id='phone'
              label='Phone Number:'
              type='tel'
              name='phone'
              value={formData.phone}
              onChange={handleChange}
              placeholder='(555) 555-5555'
              required
            />
          </div>

          <FormInput
            id='email'
            label='Email Address:'
            type='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            placeholder='you@example.com'
            required
          />

          <div className='form-group'>
            <label htmlFor='message'>How can we help you?</label>
            <textarea
              id='message'
              name='message'
              value={formData.message}
              onChange={handleChange}
              placeholder='Describe your project or inquiry...'
              rows='5'
              required
            />
          </div>

          <button
            type='submit'
            className='submit-btn'
            disabled={status.isSubmitting}
          >
            {status.isSubmitting ? (
              <>
                <span className='spinner'></span>
                <span>Submitting...</span>
              </>
            ) : (
              'Submit Request'
            )}
          </button>

          {status.message && (
            <div className={`status-message ${status.type}`}>
              {status.message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Contact;
