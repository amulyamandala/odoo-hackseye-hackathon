/**
 * AppRoutes.jsx — Central route configuration
 *
 * Clean, predictable route definitions with explicit access control:
 *  - Guest/Public routes: accessible only when unauthenticated (/login)
 *  - Private routes: wrapped in PrivateRoute + Layout shell
 *  - Fallback routes: root redirect and 404 handling
 */

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Route Guards
import PrivateRoute from './PrivateRoute';
import PublicRoute  from './PublicRoute';

// Layout Shell
import Layout from '../components/layout/Layout';

// Pages
import Login        from '../pages/Login';
import Dashboard    from '../pages/Dashboard';
import Assets       from '../pages/Assets';
import AddAsset     from '../pages/AddAsset';
import AssetDetails from '../pages/AssetDetails';
import EditAsset    from '../pages/EditAsset';
import ScanQR       from '../pages/ScanQR';
import Reports      from '../pages/Reports';
import Settings     from '../pages/Settings';
import Users        from '../pages/Users';
import NotFound     from '../pages/NotFound';

const AppRoutes = () => {
  return (
    <Routes>
      {/* ── Public / Guest Routes ───────────────────────────────────────────── */}
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
      </Route>

      {/* ── Protected Application Routes (wrapped in Layout) ────────────────── */}
      <Route element={<PrivateRoute />}>
        <Route element={<Layout />}>
          <Route path="/dashboard"         element={<Dashboard />} />
          <Route path="/assets"            element={<Assets />} />
          <Route path="/assets/new"        element={<AddAsset />} />
          <Route path="/assets/:id"        element={<AssetDetails />} />
          <Route path="/assets/:id/edit"   element={<EditAsset />} />
          <Route path="/scan"              element={<ScanQR />} />
          <Route path="/reports"           element={<Reports />} />
          <Route path="/users"             element={<Users />} />
          <Route path="/settings"          element={<Settings />} />

          {/* Root landing redirect */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Route>

      {/* ── Catch-all / Not Found ───────────────────────────────────────────── */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
