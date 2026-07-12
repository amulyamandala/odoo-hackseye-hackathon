import React from 'react';
import { Bell, Search } from 'lucide-react';

const Navbar = () => {
  return (
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
  );
};

export default Navbar;
