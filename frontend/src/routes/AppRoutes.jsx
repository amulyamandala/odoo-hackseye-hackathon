/**
 * AppRoutes.jsx — Central route configuration
 *
 * Single source of truth for every route in the application.
 * Uses PrivateRoute and PublicRoute guards for access control,
 * and the shared Layout shell for authenticated pages.
 *
 * Adding a new page:
 *   1. Import the page component
 *   2. Add a <Route> inside the appropriate guard section
 *   3. Optionally pass `roles` to PrivateRoute for RBAC
 */

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import PublicRoute  from './PublicRoute';

import Layout    from '../components/layout/Layout';
import Login     from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import Settings  from '../pages/Settings';

const AppRoutes = () => {
  return (
    <Routes>
      {/* ── Public routes (guest-only) ─────────────────────────────────────── */}
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
      </Route>

      {/* ── Private routes (authenticated, wrapped in Layout shell) ────────── */}
      <Route element={<PrivateRoute />}>
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/settings"  element={<Settings />} />

          {/* Default authenticated landing */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Route>

      {/* ── Fallback — redirect unknown paths ──────────────────────────────── */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;
