/**
 * useAuth.js — Convenience hook for consuming AuthContext
 *
 * Throws a descriptive error if used outside of <AuthProvider />,
 * making mis-use immediately obvious during development.
 *
 * Returns the full AuthContext value:
 *   user, isAuthenticated, isLoading,
 *   isAdmin, isAssetManager,
 *   login, logout, updateUser, changePassword, hasRole
 *
 * Example:
 *   const { user, login, logout, isAuthenticated } = useAuth();
 */

import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === null) {
    throw new Error(
      '[useAuth] must be used inside an <AuthProvider />. ' +
      'Make sure <AuthProvider> wraps your component tree in App.jsx.'
    );
  }

  return context;
};

export default useAuth;
