/**
 * AuthContext.jsx — Global authentication state
 *
 * Provides:
 *   user          — The authenticated user object (or null)
 *   isAuthenticated — Boolean derived from token validity
 *   isLoading     — True while the initial session check runs
 *   login(email, password) → Promise  — Calls authService.login, updates state
 *   logout()               → void     — Clears token, resets state, redirects
 *   updateUser(patch)      → void     — Merge local user updates (e.g. profile edits)
 *   changePassword(old, new) → Promise
 *
 * Usage:
 *   Wrap <App /> with <AuthProvider />.
 *   Consume via the useAuth() hook (see hooks/useAuth.js).
 */

import React, { createContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser]           = useState(null);
  const [isLoading, setIsLoading] = useState(true); // true until initial session resolved

  // ─── On mount: validate existing token ──────────────────────────────────────
  useEffect(() => {
    const initSession = async () => {
      if (authService.isAuthenticated()) {
        try {
          const profile = await authService.getMe();
          setUser(profile);
        } catch {
          // Token invalid / expired — clear silently
          authService.logout();
          setUser(null);
        }
      }
      setIsLoading(false);
    };

    initSession();
  }, []);

  // ─── Login ───────────────────────────────────────────────────────────────────
  const login = useCallback(async (email, password) => {
    setIsLoading(true);
    try {
      const { user: profile } = await authService.login(email, password);
      setUser(profile);
      navigate('/dashboard', { replace: true });
      return { success: true };
    } catch (err) {
      return { success: false, message: err.message || 'Login failed' };
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  // ─── Logout ──────────────────────────────────────────────────────────────────
  const logout = useCallback(() => {
    authService.logout();
    setUser(null);
    navigate('/login', { replace: true });
  }, [navigate]);

  // ─── Optimistic local user update (for profile/settings edits) ───────────────
  const updateUser = useCallback((patch) => {
    setUser((prev) => (prev ? { ...prev, ...patch } : prev));
  }, []);

  // ─── Change Password ─────────────────────────────────────────────────────────
  const changePassword = useCallback(async (oldPassword, newPassword) => {
    try {
      await authService.changePassword(oldPassword, newPassword);
      return { success: true };
    } catch (err) {
      return { success: false, message: err.message || 'Password change failed' };
    }
  }, []);

  // ─── Role helpers ────────────────────────────────────────────────────────────
  const hasRole = useCallback((role) => {
    if (!user?.role) return false;
    if (Array.isArray(role)) return role.includes(user.role);
    return user.role === role;
  }, [user]);

  const isAdmin        = hasRole('Admin');
  const isAssetManager = hasRole('Asset Manager');

  // ─── Context value ───────────────────────────────────────────────────────────
  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    isAdmin,
    isAssetManager,
    login,
    logout,
    updateUser,
    changePassword,
    hasRole,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
