/**
 * authService.js — Authentication API calls
 *
 * Mirrors the backend AuthService endpoints:
 *   POST   /api/auth/login
 *   POST   /api/auth/register
 *   GET    /api/auth/me
 *   POST   /api/auth/change-password
 *
 * All methods return the unwrapped `data` object from the server envelope.
 * Token storage / removal is handled here so AuthContext stays clean.
 */

import api, { TOKEN_KEY } from './api';

const authService = {
  /**
   * Login with email + password.
   * Persists JWT to localStorage on success.
   * @returns {{ token: string, user: object }}
   */
  login: async (email, password) => {
    const data = await api.post('/auth/login', { email, password });
    if (data?.token) {
      localStorage.setItem(TOKEN_KEY, data.token);
    }
    return data; // { token, user: { id, firstName, lastName, email, role, department } }
  },

  /**
   * Register a new employee (Admin-only in production).
   * @returns {{ id, firstName, lastName, email }}
   */
  register: async ({ firstName, lastName, email, password, roleId, departmentId }) => {
    return api.post('/auth/register', { firstName, lastName, email, password, roleId, departmentId });
  },

  /**
   * Fetch the currently authenticated user's profile.
   * Requires a valid JWT in localStorage.
   * @returns {object} user profile
   */
  getMe: async () => {
    return api.get('/auth/me');
  },

  /**
   * Change the authenticated user's password.
   * @param {string} oldPassword
   * @param {string} newPassword
   * @returns {boolean}
   */
  changePassword: async (oldPassword, newPassword) => {
    return api.post('/auth/change-password', { oldPassword, newPassword });
  },

  /**
   * Clear the JWT from localStorage (client-side logout).
   */
  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
  },

  /**
   * Check whether a JWT token exists in storage.
   * @returns {boolean}
   */
  isAuthenticated: () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) return false;

    // Basic JWT expiry check (decode payload, no signature verification)
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  },

  /**
   * Decode the JWT payload without verifying the signature.
   * Useful for extracting role/id without an API round-trip.
   * @returns {object|null}
   */
  decodeToken: () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) return null;
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch {
      return null;
    }
  },
};

export default authService;
