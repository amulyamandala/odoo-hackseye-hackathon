import React from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  Settings as SettingsIcon, 
  LogOut, 
  Bell, 
  Search,
  Activity
} from 'lucide-react';
import '../styles/layout.css';

const PageLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    // In a real app, clear auth tokens here
    navigate('/login');
  };

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/assets', label: 'Assets', icon: Package },
    { path: '/users', label: 'Users', icon: Users },
    { path: '/settings', label: 'Settings', icon: SettingsIcon },
  ];

  return (
    <div className="layout-container animate-fade-in">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="logo">
            <Activity className="logo-icon" size={28} />
            AssetFlow
          </div>
        </div>
        
        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => 
                `nav-item ${isActive || (item.path !== '/dashboard' && location.pathname.startsWith(item.path)) ? 'active' : ''}`
              }
            >
              <item.icon size={20} />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button className="nav-item" onClick={handleLogout} style={{ width: '100%', background: 'transparent', border: 'none', textAlign: 'left' }}>
            <LogOut size={20} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Topbar */}
        <header className="topbar">
          <div className="topbar-search">
            <Search size={18} className="text-muted" />
            <input type="text" placeholder="Search assets, users..." />
          </div>

          <div className="topbar-actions">
            <button className="icon-btn">
              <Bell size={20} />
            </button>
            
            <div className="user-profile">
              <div className="avatar">JD</div>
              <div className="user-info">
                <span className="user-name">John Doe</span>
                <span className="user-role">Asset Manager</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content area where children render */}
        <div className="page-container">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default PageLayout;
