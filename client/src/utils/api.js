// src/utils/api.js
// Use this instead of raw fetch() anywhere you call a protected API endpoint.
// It automatically attaches the JWT token from localStorage.

const BASE_URL = 'http://localhost:5000/api';

const getToken = () => localStorage.getItem('token');

const api = async (path, options = {}) => {
  const token = getToken();

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers,
  });

  // If the server says our token is invalid/expired, log the user out
  if (response.status === 401) {
    localStorage.clear();
    window.location.href = '/login';
    return;
  }

  return response;
};

export default api;