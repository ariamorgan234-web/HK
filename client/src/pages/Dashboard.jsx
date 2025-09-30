// src/pages/Dashboard.jsx
import React, { useState, useEffect, useMemo } from 'react';
import apiService from '../services/api'; // Correctly import your API service
import './Dashboard.css';

// --- Custom Hook with Corrected Data Fetching Logic ---
const useEstimates = () => {
  const [estimates, setEstimates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEstimates = async () => {
      try {
        // 1. Get token from localStorage
        const loggedInUserJSON = window.localStorage.getItem('loggedInUser');
        if (!loggedInUserJSON) {
          throw new Error('Authentication token not found. Please log in.');
        }
        const user = JSON.parse(loggedInUserJSON);
        const token = user.token;

        // 2. Set up authorization header
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };

        // 3. --- FIX: Use the apiService directly ---
        const response = await apiService.getEstimates(config);

        // The data from axios is in the `data` property of the response
        const estimatesData = response.data;

        // Final check to ensure we have an array
        if (!Array.isArray(estimatesData)) {
          throw new Error(
            'Invalid data format received from server. Expected an array.'
          );
        }

        setEstimates(estimatesData);
        // --- END FIX ---
      } catch (err) {
        let errorMessage = 'An unexpected error occurred.';
        if (
          err.response &&
          (err.response.status === 401 || err.response.status === 403)
        ) {
          errorMessage =
            'Authentication failed. Please log out and log back in.';
        } else if (err.message) {
          errorMessage = err.message;
        }
        setError(errorMessage);
        console.error('Dashboard fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEstimates();
  }, []); // Empty dependency array is correct, runs once on mount

  const stats = useMemo(
    () => ({
      total: estimates.length,
      withEmail: estimates.filter((est) => est.email).length,
      uniqueContacts: new Set(estimates.map((est) => est.phone)).size,
    }),
    [estimates]
  );

  return { estimates, stats, loading, error };
};

// --- Child Components (No changes needed) ---

const StatCard = ({ number, label }) => (
  <div className='stat-card'>
    <div className='stat-number'>{number}</div>
    <div className='stat-label'>{label}</div>
  </div>
);

const EstimatesTable = ({ estimates }) => (
  <table className='estimates-table'>
    <thead>
      <tr>
        <th>Date</th>
        <th>Name</th>
        <th>Phone</th>
        <th>Email</th>
        <th>Message</th>
      </tr>
    </thead>
    <tbody>
      {estimates.map((est) => (
        <tr key={est._id || est.id}>
          <td>{new Date(est.date).toLocaleDateString()}</td>
          <td>
            <strong>{est.name}</strong>
          </td>
          <td>
            <a href={`tel:${est.phone}`}>{est.phone}</a>
          </td>
          <td>
            {est.email ? (
              <a href={`mailto:${est.email}`}>{est.email}</a>
            ) : (
              'N/A'
            )}
          </td>
          <td>
            {est.message.length > 80
              ? `${est.message.substring(0, 80)}...`
              : est.message}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

const MobileEstimateCard = ({ estimate }) => (
  <div className='estimate-card'>
    <div className='card-field'>
      <span className='field-label'>Name:</span>
      <span className='field-value'>{estimate.name}</span>
    </div>
    <div className='card-field'>
      <span className='field-label'>Phone:</span>
      <span className='field-value'>
        <a href={`tel:${estimate.phone}`}>{estimate.phone}</a>
      </span>
    </div>
    <div className='card-field'>
      <span className='field-label'>Email:</span>
      <span className='field-value'>
        {estimate.email ? (
          <a href={`mailto:${estimate.email}`}>{estimate.email}</a>
        ) : (
          'N/A'
        )}
      </span>
    </div>
    <div className='card-field'>
      <span className='field-label'>Message:</span>
      <span className='field-value'>{estimate.message}</span>
    </div>
  </div>
);

// --- Main Dashboard Component (No changes needed) ---

const Dashboard = () => {
  const { estimates, stats, loading, error } = useEstimates();

  if (loading) {
    return (
      <div className='centered-state'>
        <div className='loading-spinner'></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='centered-state'>
        <div className='error-message'>{error}</div>
      </div>
    );
  }

  return (
    <div className='dashboard-container'>
      <header className='dashboard-header'>
        <h1>Customer Estimates</h1>
        <p>Manage and view all customer inquiries.</p>
      </header>

      <section className='dashboard-stats'>
        <StatCard number={stats.total} label='Total Estimates' />
        <StatCard number={stats.withEmail} label='With Email Address' />
        <StatCard number={stats.uniqueContacts} label='Unique Contacts' />
      </section>

      {estimates.length === 0 ? (
        <div className='centered-state'>
          <div className='no-data'>No estimates have been submitted yet.</div>
        </div>
      ) : (
        <section className='estimates-content'>
          <div className='estimates-table-container'>
            <EstimatesTable estimates={estimates} />
          </div>
          <div className='mobile-card-view'>
            {estimates.map((est) => (
              <MobileEstimateCard key={est._id || est.id} estimate={est} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default Dashboard;
