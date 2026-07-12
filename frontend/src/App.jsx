import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import useAuth from './hooks/useAuth';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import Layout from './components/layout/Layout';
import './App.css';

// ─── Protected route guard ────────────────────────────────────────────────────
// Redirects unauthenticated users to /login.
// Shows nothing while the session check is still in flight (isLoading).
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) return null;                          // wait for session init
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
};

// ─── App routes ───────────────────────────────────────────────────────────────
// AuthProvider is inside Router so it can call useNavigate internally.
function AppRoutes() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public */}
        <Route path="/login" element={<Login />} />

        {/* Protected — wrapped in shared Layout (Sidebar + Navbar + Footer) */}
        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/settings"  element={<Settings />} />
          <Route path="/"          element={<Navigate to="/dashboard" replace />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </AuthProvider>
  );
}

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
