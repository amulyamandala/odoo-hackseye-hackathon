// Central environment configuration for the frontend.
// Vite exposes env vars prefixed with VITE_ via import.meta.env.
// Create a .env file at the frontend root with:
//   VITE_API_BASE_URL=http://localhost:5000/api

const env = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  NODE_ENV: import.meta.env.MODE || 'development',
};

export default env;
