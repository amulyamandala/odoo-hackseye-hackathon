/**
 * PublicRoute.jsx — Guard for guest-only pages (Login, Register)
 *
 * Prevents authenticated users from accessing login/guest routes.
 * Safely redirects to intended location or /dashboard without redirect loops.
 */

import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const PublicRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) return null;

  if (isAuthenticated) {
    let destination = location.state?.from?.pathname || '/dashboard';
    if (destination === '/login' || destination === '/') {
      destination = '/dashboard';
    }
    return <Navigate to={destination} replace />;
  }

  return children || <Outlet />;
};

export default PublicRoute;
