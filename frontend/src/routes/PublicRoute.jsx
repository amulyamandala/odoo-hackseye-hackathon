/**
 * PublicRoute.jsx — Guard for guest-only pages (Login, Register)
 *
 * If the user is already authenticated, they get redirected away from
 * pages like /login — no point showing a login form to a logged-in user.
 *
 * Redirect target priority:
 *   1. location.state.from (where they originally wanted to go)
 *   2. /dashboard (default landing)
 *
 * Usage:
 *   <Route element={<PublicRoute />}>
 *     <Route path="/login" element={<Login />} />
 *   </Route>
 */

import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const PublicRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  // Still resolving the session — show nothing to prevent flash
  if (isLoading) return null;

  // Already logged in → send them to wherever they came from, or dashboard
  if (isAuthenticated) {
    const destination = location.state?.from?.pathname || '/dashboard';
    return <Navigate to={destination} replace />;
  }

  return children || <Outlet />;
};

export default PublicRoute;
