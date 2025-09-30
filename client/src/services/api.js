// src/services/api.js
import axios from 'axios';

const API_URL = 'https://hk-construction-1.onrender.com/api';

const login = (credentials) => {
  return axios.post(`${API_URL}/login`, credentials);
};

const getEstimates = (config) => {
  return axios.get(`${API_URL}/estimates`, config);
};

const createEstimate = (newEstimate) => {
  return axios.post(`${API_URL}/estimates`, newEstimate);
};

export default { login, getEstimates, createEstimate };
