import React from 'react';
import { Bell, Search, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const Navbar = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="topbar">
      <div className="topbar-search">
        <Search size={18} className="text-muted" />
        <input type="text" placeholder="Search assets, users..." />
      </div>

      <div className="topbar-actions" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <button
          onClick={toggleTheme}
          className="icon-btn"
          title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          style={{
            background: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(15, 23, 42, 0.08)',
            border: '1px solid var(--border-color)',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'var(--text-primary)',
            transition: 'all 0.25s ease'
          }}
        >
          {isDark ? <Sun size={20} color="#fbbf24" /> : <Moon size={20} color="#6366f1" />}
        </button>

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
  );
};

export default Navbar;
