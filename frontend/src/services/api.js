import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor to attach Authorization token if present
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to format error responses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorResponse = {
      message: 'An unexpected error occurred.',
      status: error.response?.status,
      data: error.response?.data,
    };

    if (error.response) {
      errorResponse.message = error.response.data?.message || `Request failed with status ${error.response.status}`;
    } else if (error.request) {
      errorResponse.message = 'No response received from server. Please check your network connection.';
    } else {
      errorResponse.message = error.message;
    }

    return Promise.reject(errorResponse);
  }
);

export default api;
