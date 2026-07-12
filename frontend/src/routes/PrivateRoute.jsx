/**
 * PrivateRoute.jsx — Auth guard for protected pages
 *
 * Wraps any route that requires authentication.
 *  - While the session check is in flight → renders nothing (avoids flash)
 *  - If unauthenticated → redirects to /login, preserving the intended URL
 *    in location state so the user can be redirected back after login
 *  - Optionally restricts by role(s) → redirects to /dashboard with a 403 hint
 *
 * Usage:
 *   <Route element={<PrivateRoute />}>        ← any authenticated user
 *   <Route element={<PrivateRoute roles={['Admin']} />}> ← Admin only
 */

import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const PrivateRoute = ({ roles, children }) => {
  const { isAuthenticated, isLoading, hasRole } = useAuth();
  const location = useLocation();

  // Still resolving the session — show nothing to prevent flash
  if (isLoading) return null;

  // Not logged in → bounce to login, remembering where they wanted to go
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Logged in but wrong role → bounce to dashboard
  if (roles && roles.length > 0 && !roles.some((r) => hasRole(r))) {
    return <Navigate to="/dashboard" replace />;
  }

  // Render children if passed directly, otherwise render <Outlet /> for nested routes
  return children || <Outlet />;
};

export default PrivateRoute;
